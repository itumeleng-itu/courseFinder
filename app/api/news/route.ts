import { NextResponse } from "next/server"
import { NewsArticle, FALLBACK_ARTICLES } from "@/data/fallback-news"
import { isWithin48Hours, buildImageForArticle, isRelevantToStudents } from "@/lib/news-utils"
import fs from "fs"
import path from "path"

// ─── Auto-rotate fallback articles ───────────────────────────────────────────
// When the API fetches successfully, overwrite fallback-news.ts with the latest
// articles so fallbacks stay fresh. Silently skips on read-only filesystems
// (Vercel/Netlify prod) — memory cache handles resilience there instead.
function rotateFallbackArticles(articles: NewsArticle[]) {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "fallback-news.ts")
    const content = `// AUTO-GENERATED — last rotated ${new Date().toISOString()}
// Do not edit manually. Overwritten automatically when the news API fetches successfully.
import { NewsArticle } from "@/data/fallback-news"

export const FALLBACK_ARTICLES: NewsArticle[] = ${JSON.stringify(articles, null, 2)}
`
    fs.writeFileSync(filePath, content, "utf-8")
    console.log(`[News Fallback] Rotated ${articles.length} articles into fallback-news.ts`)
  } catch {
    console.log("[News Fallback] Filesystem read-only — skipping rotation (expected in prod)")
  }
}

// ─── In-memory cache (survives warm instances, resets on cold start) ──────────
let _memoryCache: { articles: NewsArticle[]; savedAt: number } | null = null
const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour

function saveToCache(articles: NewsArticle[]) {
  _memoryCache = { articles, savedAt: Date.now() }
  console.log(`[News Cache] Saved ${articles.length} articles to memory cache`)
}

function getCachedNews(): NewsArticle[] {
  return _memoryCache?.articles ?? []
}

function hasFreshCache(): boolean {
  if (!_memoryCache || _memoryCache.articles.length === 0) return false
  return Date.now() - _memoryCache.savedAt < CACHE_TTL_MS
}

// ─── Config ───────────────────────────────────────────────────────────────────
// Do NOT combine revalidate with force-dynamic — they conflict
export const revalidate = 3600 // 1 hour ISR

const NEWS_API_KEY = process.env.NEWS_API_KEY

// ─── Fetcher ──────────────────────────────────────────────────────────────────
async function fetchRealNews(): Promise<NewsArticle[]> {
  if (!NEWS_API_KEY) {
    console.warn("[News] NEWS_API_KEY not set — skipping live fetch")
    return []
  }

  const url = new URL("https://newsdata.io/api/1/news")
  url.searchParams.set("apikey", NEWS_API_KEY)
  url.searchParams.set("country", "za")
  url.searchParams.set("language", "en")
  // Broad category set — more results per credit on free plan
  url.searchParams.set(
    "category",
    "education,technology,science,health"
  )
  url.searchParams.set("size", "10") // max on free plan

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      signal: AbortSignal.timeout(10000),
      // No cache: "no-store" — let Next.js ISR handle caching naturally
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`[News] HTTP ${response.status}:`, errorText)
      return []
    }

    const data = await response.json()

    if (data.status === "error") {
      console.error("[News] API error:", data.results?.code, data.results?.message)
      return []
    }

    const raw: any[] = data.results ?? []
    console.log(`[News Debug] Raw articles from API: ${raw.length}`)

    const filtered = raw.filter(isRelevantToStudents)
    console.log(`[News Debug] After relevance filter: ${filtered.length}`)

    const articles: NewsArticle[] = filtered.map((item: any) => {
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
    })

    return articles
  } catch (error) {
    console.error("[News] Fetch error:", error)
    return []
  }
}

// ─── Route Handler ────────────────────────────────────────────────────────────
export async function GET() {
  try {
    // Serve from memory cache if still fresh — avoids burning daily API credits
    if (hasFreshCache()) {
      const cached = getCachedNews()
      console.log(`[News] Serving ${cached.length} articles from memory cache`)
      return NextResponse.json(
        { success: true, articles: cached, source: "Cached", count: cached.length },
        { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
      )
    }

    const fetchedArticles = await fetchRealNews()
    const MAX = 8

    if (fetchedArticles.length > 0) {
      // 1. Persist to in-memory cache (fast, works on all platforms)
      saveToCache(fetchedArticles)
      // 2. Rotate fallback-news.ts with latest articles (local dev only —
      //    silently skips on Vercel/read-only prod filesystems)
      rotateFallbackArticles(fetchedArticles)
    }

    // Prefer articles within 48 hours (free plan has 12hr delay — this window is safe)
    const fresh = fetchedArticles.filter((a) => isWithin48Hours(a.pubDate))
    console.log(`[News Debug] After 48hr filter: ${fresh.length}`)
    console.log(`[News Debug] Sample pubDate: ${fetchedArticles[0]?.pubDate}`)
    console.log(`[News Debug] Server UTC time: ${new Date().toISOString()}`)

    let normalized = fresh.slice(0, MAX)
    let source: "Live Feed" | "Cached" | "Static Fallback" = "Live Feed"

    if (normalized.length === 0) {
      // Fall back to cached articles without time filter — best available data
      const cachedNews = getCachedNews()
      if (cachedNews.length > 0) {
        normalized = cachedNews.slice(0, MAX)
        source = "Cached"
      } else {
        // Last resort — use static fallback (auto-rotated on successful fetches)
        normalized = FALLBACK_ARTICLES.slice(0, MAX)
        source = "Static Fallback"
      }
      console.log(`[News] Falling back to ${source} (${normalized.length} articles)`)
    }

    return NextResponse.json(
      { success: true, articles: normalized, source, count: normalized.length },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
    )
  } catch (error) {
    console.error("[News] GET handler error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch news" },
      { status: 500 }
    )
  }
}