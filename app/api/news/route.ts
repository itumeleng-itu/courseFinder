import { NextResponse } from "next/server"
import { NewsArticle, FALLBACK_ARTICLES } from "@/data/fallback-news"
import {
  buildImageForArticle,
  classifyArticle,
  dedupeArticles,
  hoursSincePublished,
  isFreshForTopic,
  looksOpenToMatriculants,
  type ArticleTopic,
} from "@/lib/news-utils"

// ─── In-memory cache (survives warm instances, resets on cold start) ──────────
let _memoryCache: { articles: NewsArticle[]; savedAt: number } | null = null
const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour

function saveToCache(articles: NewsArticle[]) {
  _memoryCache = { articles, savedAt: Date.now() }
}

function getCachedNews(): NewsArticle[] {
  return _memoryCache?.articles ?? []
}

function hasFreshCache(): boolean {
  if (!_memoryCache || _memoryCache.articles.length === 0) return false
  return Date.now() - _memoryCache.savedAt < CACHE_TTL_MS
}

// ─── Config ───────────────────────────────────────────────────────────────────
/**
 * This route must run per request. It used to carry `revalidate = 3600`
 * and nothing else, which made Next PRERENDER IT AS STATIC CONTENT:
 *
 *     Route (app)        Revalidate  Expire
 *     o /api/news                1h      1y
 *
 * A static route is served from one snapshot whatever the query string,
 * so ?v=2 and ?v=3 came back byte-identical, and with Expire 1y the
 * snapshot could outlive any reasonable idea of "news". Two deploys in a
 * row looked like they had not landed; both had, and the frozen build
 * output was being served over them. That is the second time in this
 * codebase a caching default has made a healthy deploy look broken.
 *
 * Credit use is still bounded, by the in-memory cache below (one upstream
 * fetch per warm instance per hour) and by s-maxage on the response.
 * revalidate and force-dynamic conflict, so the former is gone.
 */
export const dynamic = "force-dynamic"

const NEWS_API_KEY = process.env.NEWS_API_KEY

const MAX = 8

/** An hour fresh at the edge, ten minutes stale while revalidating.
 *
 * s-maxage stays at an hour because that is what keeps upstream credit
 * use to roughly one fetch an hour. The old value paired it with
 * stale-while-revalidate=86400, which allowed a full day of serving
 * yesterday's news while a refresh happened somewhere behind it. */
const NEWS_CACHE = "public, s-maxage=3600, stale-while-revalidate=600"

/**
 * How many of the MAX slots each topic is guaranteed, in order.
 *
 * Without reservations the feed is simply whatever is freshest, and general
 * schooling news is published daily while a bursary call is announced once.
 * Sorting by date alone therefore buries exactly the item a matriculant most
 * needs. Unused slots fall through to the next topic, so a quiet bursary week
 * costs nothing.
 */
const SLOTS: Array<{ topic: ArticleTopic; reserved: number }> = [
  { topic: "bursary", reserved: 3 },
  { topic: "university", reserved: 3 },
  { topic: "schooling", reserved: 2 },
]

/**
 * Three targeted sweeps instead of one broad category request.
 *
 * The old call asked for category=education,technology,science,health and
 * nothing else, so bursary and university stories only appeared by accident.
 * newsdata.io's `q` is what actually searches, and it is the only way to ask
 * for funding news specifically.
 *
 * Ordered by value to a matriculant: the bursary sweep runs first, so when
 * the same story is syndicated across mastheads the copy kept is the one
 * found by the best-targeted query.
 *
 * Cost: three requests per cache miss rather than one. The hour-long cache
 * bounds that at roughly 72 requests a day. If the plan's daily credits run
 * short, drop the schooling sweep first -- the broad education category is
 * the one that produced the Pope's surgery.
 */
const SWEEPS: Array<{ label: string; params: Record<string, string> }> = [
  // One term per sweep.
  //
  // The first version sent boolean queries ('bursary OR bursaries OR
  // scholarship OR NSFAS OR "student funding"'). Those returned nothing
  // recognisable as a bursary across a full day of hourly fetches, and
  // from outside there is no way to tell a query the plan rejected from
  // a genuinely quiet news day. A single plain term is the form least
  // likely to be refused, and the per-sweep counts reported below say
  // which ones are actually producing.
  { label: "bursary", params: { q: "bursary" } },
  { label: "bursaries", params: { q: "bursaries" } },
  { label: "nsfas", params: { q: "NSFAS" } },
  { label: "university", params: { q: "university" } },
  { label: "schooling", params: { category: "education" } },
]

function toArticle(item: any): NewsArticle {
  // Build fallback image only if API didn't supply one
  const fallback = !item.image_url ? buildImageForArticle(item) : null

  return {
    // ── Identity ──────────────────────────────────────────────────────
    article_id: item.article_id,                            // "da149f92..."
    link: item.link || "#",                           // full article URL

    // ── Content ───────────────────────────────────────────────────────
    title: item.title || "No title",
    // item.content === "ONLY AVAILABLE IN PAID PLANS" on free tier — never use it
    description: item.description || "No description available",

    // ── Dates ─────────────────────────────────────────────────────────
    pubDate: item.pubDate || new Date().toISOString(), // "2026-03-19 19:35:00"
    pubDateTZ: item.pubDateTZ || "UTC",                    // "UTC"

    // ── Source ────────────────────────────────────────────────────────
    source_id: item.source_id || "unknown",          // "landeszeitung"
    source_name: item.source_name || item.source_id || "Unknown", // "Lz – Landeszeitung"
    source_url: item.source_url || null,
    source_icon: item.source_icon || null,
    source_priority: item.source_priority ?? null,

    // ── Taxonomy ──────────────────────────────────────────────────────
    category: Array.isArray(item.category) ? item.category : ["top"], // ["top","lifestyle"]
    language: item.language || "en",
    country: Array.isArray(item.country) ? item.country : [],      // ["germany"]
    keywords: Array.isArray(item.keywords) ? item.keywords : null,
    datatype: item.datatype || "news",
    duplicate: item.duplicate ?? false,

    // ── Media ─────────────────────────────────────────────────────────
    image_url: item.image_url || fallback?.image_url || null,
    video_url: item.video_url || null,
    alt_text: item.title || fallback?.alt_text || "News image",
  }
}

async function runSweep(params: Record<string, string>): Promise<NewsArticle[]> {
  const url = new URL("https://newsdata.io/api/1/news")
  url.searchParams.set("apikey", NEWS_API_KEY as string)
  url.searchParams.set("country", "za")
  url.searchParams.set("language", "en")
  url.searchParams.set("size", "10") // max on free plan
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      signal: AbortSignal.timeout(10000),
      // No cache: "no-store" — let Next.js ISR handle caching naturally
    })

    if (!response.ok) {
      console.error(`[News] HTTP ${response.status}:`, await response.text())
      return []
    }

    const data = await response.json()

    if (data.status === "error") {
      console.error("[News] API error:", data.results?.code, data.results?.message)
      return []
    }

    return (data.results ?? []).map(toArticle)
  } catch (error) {
    console.error("[News] Fetch error:", error)
    return []
  }
}

// ─── Fetcher ──────────────────────────────────────────────────────────────────
/** How many raw articles each sweep returned on the last live fetch.
 *
 * Reported on the response so the feed can be diagnosed from outside.
 * Without it, "no bursary articles" is indistinguishable between a query
 * the provider refused, a plan limit, and a quiet week -- and the logs
 * that would say which are not reachable from here. Counts only; no
 * content, nothing a caller could mistake for data. */
const lastSweepCounts: Record<string, number> = {}

async function fetchRealNews(): Promise<NewsArticle[]> {
  if (!NEWS_API_KEY) {
    console.warn("[News] NEWS_API_KEY not set — skipping live fetch")
    return []
  }

  // One sweep failing must not take the others down with it.
  const results = await Promise.all(SWEEPS.map((s) => runSweep(s.params)))
  SWEEPS.forEach((s, i) => (lastSweepCounts[s.label] = results[i].length))
  return dedupeArticles(results.flat())
}

/**
 * Fill the feed topic by topic, newest first within each topic.
 *
 * Bursary items that mention matric, school leavers or first-year intake sort
 * above those that read as postgraduate funding. That is ordering only: the
 * headline cannot establish eligibility, so nothing here tells a learner they
 * qualify -- it just puts the likelier ones where they will be seen.
 */
export function selectArticles(articles: NewsArticle[], max = MAX): NewsArticle[] {
  const byTopic = new Map<ArticleTopic, NewsArticle[]>()

  for (const a of dedupeArticles(articles)) {
    const topic = classifyArticle(a)
    if (!topic) continue
    if (!isFreshForTopic(a.pubDate, topic)) continue
    byTopic.set(topic, [...(byTopic.get(topic) ?? []), a])
  }

  for (const [topic, list] of byTopic) {
    list.sort((x, y) => {
      if (topic === "bursary") {
        const d = Number(looksOpenToMatriculants(y)) - Number(looksOpenToMatriculants(x))
        if (d !== 0) return d
      }
      return (hoursSincePublished(x.pubDate) ?? Infinity) - (hoursSincePublished(y.pubDate) ?? Infinity)
    })
  }

  const picked: NewsArticle[] = []
  // First pass: each topic's reserved share.
  for (const { topic, reserved } of SLOTS) {
    picked.push(...(byTopic.get(topic) ?? []).slice(0, reserved))
  }
  // Second pass: hand unclaimed slots to whoever has articles left.
  for (const { topic, reserved } of SLOTS) {
    if (picked.length >= max) break
    picked.push(...(byTopic.get(topic) ?? []).slice(reserved, reserved + (max - picked.length)))
  }

  return picked.slice(0, max)
}

// ─── Route Handler ────────────────────────────────────────────────────────────
export async function GET() {
  try {
    // Serve from memory cache if still fresh — avoids burning daily API credits
    if (hasFreshCache()) {
      const cached = getCachedNews()
      return NextResponse.json(
        { success: true, articles: cached, source: "Cached", count: cached.length,
          sweeps: lastSweepCounts },
        { headers: { "Cache-Control": NEWS_CACHE } }
      )
    }

    const fetchedArticles = await fetchRealNews()

    if (fetchedArticles.length > 0) {
      saveToCache(fetchedArticles)
    }

    let normalized = selectArticles(fetchedArticles)
    let source: "Live Feed" | "Cached" | "Static Fallback" = "Live Feed"

    if (normalized.length === 0) {
      // Fall back to cached articles without the freshness filter — best
      // available data, still topic-filtered so the feed cannot silently
      // revert to general news.
      const cachedNews = getCachedNews().filter((a) => classifyArticle(a) !== null)
      if (cachedNews.length > 0) {
        normalized = cachedNews.slice(0, MAX)
        source = "Cached"
      } else {
        // Last resort — use static fallback (auto-rotated on successful fetches)
        normalized = FALLBACK_ARTICLES.slice(0, MAX)
        source = "Static Fallback"
      }
    }

    return NextResponse.json(
      { success: true, articles: normalized, source, count: normalized.length,
        sweeps: lastSweepCounts },
      { headers: { "Cache-Control": NEWS_CACHE } }
    )
  } catch (error) {
    console.error("[News] GET handler error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch news" },
      { status: 500 }
    )
  }
}
