/** @jest-environment node */
/**
 * What the homepage news feed is allowed to show a matriculant.
 *
 * The fixtures below are the eight articles coursefind.co.za/api/news
 * actually returned on 16 October 2026, headlines unchanged. Six had nothing
 * to do with school, two were about school and were duplicates of each other,
 * and not one concerned a bursary or a university. That is the regression
 * these tests exist to hold shut.
 */
import { classifyArticle, dedupeArticles, isFreshForTopic, looksOpenToMatriculants } from "@/lib/news-utils"
import { selectArticles } from "@/app/api/news/route"
import type { NewsArticle } from "@/data/fallback-news"

const hoursAgo = (h: number) =>
  new Date(Date.now() - h * 3600_000).toISOString().replace("T", " ").slice(0, 19)

let seq = 0
const article = (over: Partial<NewsArticle> & { title: string }): NewsArticle => ({
  article_id: `a${seq++}`,
  link: `https://example.test/${seq}`,
  description: "",
  pubDate: hoursAgo(2),
  pubDateTZ: "UTC",
  source_id: "src",
  source_name: "Src",
  source_url: null,
  source_icon: null,
  source_priority: null,
  category: ["top"],
  language: "en",
  country: ["south africa"],
  keywords: null,
  datatype: "news",
  duplicate: false,
  image_url: null,
  video_url: null,
  alt_text: over.title,
  ...over,
})

/** Verbatim from the live feed, 16 October 2026. */
const LIVE_FEED_THAT_SHIPPED = [
  article({ title: "Pixel 10a vs Galaxy A57: What $599 Buys After the Price Hikes", category: ["technology"] }),
  article({ title: "PRASA showcases rail recovery and launches new long-distance bus fleet", category: ["top", "technology"] }),
  article({ title: "Alibaba's AI Agents Now Work 4-Hour Shifts. QwenGyre Is How It Stops Paying GPUs to Wait", category: ["technology"] }),
  article({ title: "China investigates reported brake pedal bracket fracture in Huawei-backed Maextro EV", category: ["top", "technology"] }),
  article({ title: "Pope Leo recovering as planned after lung cancer surgery, doctors say", source_id: "timeslive", category: ["top", "health"] }),
  article({ title: "Pope Leo recovering as planned after lung cancer surgery, doctors say", source_id: "sowetanlive", category: ["top", "health"] }),
  article({ title: "WATCH: Orient Islamic School matrics share reactions to English Paper 3", source_id: "pretorianews", category: ["education"] }),
  article({ title: "Orient Islamic School matrics share reactions to English Paper 3", source_id: "businessreport_co_za", category: ["top", "education"] }),
]

describe("relevance", () => {
  it("rejects the six off-topic articles the feed was shipping", () => {
    const offTopic = LIVE_FEED_THAT_SHIPPED.slice(0, 6)

    expect(offTopic.filter((a) => classifyArticle(a) !== null)).toEqual([])
  })

  it("still keeps the school story, which is the point of the feed", () => {
    expect(classifyArticle(LIVE_FEED_THAT_SHIPPED[6])).toBe("schooling")
  })

  it("does not let a broad category alone carry an article through", () => {
    // The old filter passed anything tagged top/technology/health/world.
    // Category is corroboration now, never the decision.
    expect(classifyArticle(article({ title: "Rand firms against dollar", category: ["top", "business"] }))).toBeNull()
    // Nor does "education" rescue a story that is not about leaving
    // school. This assertion used to expect "schooling", which
    // contradicted the rule stated in lib/news-utils.ts a few lines from
    // where it was written -- a school fire is news, but it is not one
    // of eight slots belonging to a learner choosing a course.
    expect(classifyArticle(article({ title: "School fire guts Limpopo classroom block", category: ["education"] }))).toBeNull()
    expect(classifyArticle(article({ title: "Matric pupils evacuated after Limpopo school fire", category: ["education"] }))).toBe("schooling")
  })

  it("picks bursary out of a funding headline, and university out of an admissions one", () => {
    expect(classifyArticle(article({ title: "Sasol opens 2027 bursary applications" }))).toBe("bursary")
    expect(classifyArticle(article({ title: "Wits admissions close early this year" }))).toBe("university")
  })

  it("reads keywords as well as the headline", () => {
    const a = article({ title: "Funding call announced", keywords: ["NSFAS", "undergraduate"] })
    expect(classifyArticle(a)).toBe("bursary")
  })
})

/** The second live feed, 17 October 2026 -- after the relevance filter
 * shipped and before whole-word matching did. Five of eight were on
 * topic, a real improvement on the Pope, but three still were not, and
 * each got in through a substring. */
const LIVE_FEED_AFTER_THE_FIRST_FIX = [
  article({ title: "Is crypto a gateway to offshore gambling or a way to curb it?",
            description: "Analysts point to one example of offshore flows.", source_id: "moneyweb" }),
  article({ title: "AI is a tool, and using it doesn't transfer clinical responsibility",
            description: "For example, a clinician remains accountable.", source_id: "bmj" }),
  article({ title: "Changing Expectations, Empowering Girls: Dr. Rasha Kelej of Merck Foundation",
            description: "A programme on girls' education across Africa.", source_id: "africa_newsroom" }),
  article({ title: "South Africa: Higher Education Committee Concerned by CETA",
            source_id: "africa_newsroom" }),
  article({ title: "A VIEW OF THE WEEK: One brutal exam does not make a bad matric",
            source_id: "citizen" }),
  article({ title: "Education Department dismisses fake matric exam paper leak",
            source_id: "capetownetc" }),
]

describe("whole-word matching", () => {
  it("does not read \"for example\" as an exam", () => {
    // "exam" is a substring of "example". This is how a crypto-gambling
    // story and a clinical-liability one held two of eight slots.
    expect(classifyArticle(LIVE_FEED_AFTER_THE_FIRST_FIX[0])).toBeNull()
    expect(classifyArticle(LIVE_FEED_AFTER_THE_FIRST_FIX[1])).toBeNull()
  })

  it("does not read \"unscheduled\" or \"sunscreen\" as NSC", () => {
    expect(classifyArticle(article({ title: "Unscheduled outage hits the line" }))).toBeNull()
    expect(classifyArticle(article({ title: "Sunscreen recall widens" }))).toBeNull()
  })

  it("still matches the real words", () => {
    expect(classifyArticle(article({ title: "Matric exam results released" }))).toBe("schooling")
    expect(classifyArticle(article({ title: "NSC pass rate climbs" }))).toBe("schooling")
  })

  it("drops education stories that are not about school-leaving", () => {
    // A worthy story, and not one of the eight slots a matriculant
    // choosing a course has to spend.
    expect(classifyArticle(LIVE_FEED_AFTER_THE_FIRST_FIX[2])).toBeNull()
  })

  it("keeps the ones that belong", () => {
    expect(classifyArticle(LIVE_FEED_AFTER_THE_FIRST_FIX[3])).toBe("university")
    expect(classifyArticle(LIVE_FEED_AFTER_THE_FIRST_FIX[4])).toBe("schooling")
    expect(classifyArticle(LIVE_FEED_AFTER_THE_FIRST_FIX[5])).toBe("schooling")
  })

  it("admits half of that feed, where the filter admitted all of it", () => {
    const kept = LIVE_FEED_AFTER_THE_FIRST_FIX.filter((a) => classifyArticle(a) !== null)
    expect(kept).toHaveLength(3)
  })
})

describe("deduplication", () => {
  it("collapses the same story syndicated across mastheads", () => {
    // Both Pope copies and both matric copies occupied separate slots,
    // and newsdata.io's own `duplicate` flag caught neither pair.
    const titles = dedupeArticles(LIVE_FEED_THAT_SHIPPED).map((a) => a.title)

    expect(titles.filter((t) => t.includes("Pope Leo"))).toHaveLength(1)
    expect(titles.filter((t) => t.includes("English Paper 3"))).toHaveLength(1)
  })
})

describe("freshness by topic", () => {
  it("keeps a bursary call that is weeks old, because it is still open", () => {
    // Under the old flat 48-hour window a bursary was visible for one day of
    // an application window that runs for months.
    expect(isFreshForTopic(hoursAgo(20 * 24), "bursary")).toBe(true)
    expect(isFreshForTopic(hoursAgo(40 * 24), "bursary")).toBe(false)
  })

  it("still holds daily schooling news to 48 hours", () => {
    expect(isFreshForTopic(hoursAgo(12), "schooling")).toBe(true)
    expect(isFreshForTopic(hoursAgo(72), "schooling")).toBe(false)
  })
})

describe("first-year signals", () => {
  it("separates a matric-intake bursary from a postgraduate one", () => {
    expect(looksOpenToMatriculants(article({ title: "Bursary open to Grade 12 learners for 2027 intake" }))).toBe(true)
    expect(looksOpenToMatriculants(article({ title: "PhD research bursary for staff" }))).toBe(false)
  })
})

describe("selectArticles", () => {
  it("shows a bursary even when general news is fresher", () => {
    const feed = [
      ...Array.from({ length: 8 }, (_, i) =>
        article({ title: `Matric exam timetable update ${i}`, pubDate: hoursAgo(1) })),
      article({ title: "Funza Lushaka bursary applications open to matriculants", pubDate: hoursAgo(300) }),
    ]

    const titles = selectArticles(feed).map((a) => a.title)
    expect(titles).toContain("Funza Lushaka bursary applications open to matriculants")
  })

  it("puts matric-eligible bursaries above postgraduate ones", () => {
    const feed = [
      article({ title: "Postgraduate bursary for doctoral candidates", pubDate: hoursAgo(1) }),
      article({ title: "NSFAS bursary opens for Grade 12 school leavers", pubDate: hoursAgo(50) }),
    ]

    expect(selectArticles(feed)[0].title).toBe("NSFAS bursary opens for Grade 12 school leavers")
  })

  it("admits nothing off-topic, even with slots going spare", () => {
    const feed = [...LIVE_FEED_THAT_SHIPPED]
    const picked = selectArticles(feed)

    expect(picked.every((a) => classifyArticle(a) !== null)).toBe(true)
    expect(picked.map((a) => a.title)).toEqual([
      "WATCH: Orient Islamic School matrics share reactions to English Paper 3",
    ])
  })

  it("gives spare slots away rather than leaving the feed short", () => {
    // Bursary reserves 3; with only one bursary the other two must go to
    // university and schooling, not go unused.
    const feed = [
      article({ title: "Sasol bursary opens for matriculants" }),
      ...Array.from({ length: 6 }, (_, i) => article({ title: `University admissions change ${i}` })),
      ...Array.from({ length: 4 }, (_, i) => article({ title: `Matric exam news ${i}` })),
    ]

    expect(selectArticles(feed)).toHaveLength(8)
  })

  it("never exceeds the slot count", () => {
    const feed = Array.from({ length: 40 }, (_, i) => article({ title: `Bursary announcement ${i}` }))
    expect(selectArticles(feed)).toHaveLength(8)
  })
})

describe("the route's own caching", () => {
  it("is dynamic, not a build-time snapshot", async () => {
    // `revalidate` alone made Next prerender this route as static
    // content, served from one snapshot for every query string and
    // allowed to go a year stale. Two deploys in a row appeared not to
    // land because of it.
    const mod = await import("@/app/api/news/route")
    expect((mod as any).dynamic).toBe("force-dynamic")
    expect((mod as any).revalidate).toBeUndefined()
  })

  it("does not let the edge serve a day-old feed", async () => {
    const mod = await import("@/app/api/news/route")
    const res = await (mod as any).GET()
    const cc = res.headers.get("Cache-Control") ?? ""
    const swr = Number(/stale-while-revalidate=(\d+)/.exec(cc)?.[1] ?? "0")
    expect(swr).toBeGreaterThan(0)
    expect(swr).toBeLessThanOrEqual(900)
  })
})

describe("the cache-hit path", () => {
  /**
   * The cache holds RAW sweep results -- everything all five queries
   * returned, unfiltered and uncapped. Served directly it put 27
   * articles on the homepage, among them Brazilian elections, a Turkish
   * salt lake and uranium mining, because selectArticles is the only
   * thing that applies the topic filter, the slot reservations and the
   * cap.
   *
   * The earlier code filtered inside the fetch, so only relevant
   * articles ever reached the cache. Moving the filter out made the
   * cache raw and left this path behind it.
   */
  const RAW_SWEEP_RESULTS = [
    article({ title: "NSFAS bursary applications open for 2027 matriculants" }),
    article({ title: "Wits admissions close early this year" }),
    article({ title: "Matric exam results released" }),
    article({ title: "Turkey's Salt Lake, life in the shadow of drought" }),
    article({ title: "Brazil's left rallies as Lula closes gap before runoff" }),
    article({ title: "Uranium American, DISA Partner to Recover Uranium Waste" }),
    article({ title: "Tenders Closing Today: Deadlines and Closing Times" }),
    ...Array.from({ length: 20 }, (_, i) => article({ title: `Mining update ${i}` })),
  ]

  it("filters and caps what the cache holds", () => {
    const picked = selectArticles(RAW_SWEEP_RESULTS)
    expect(picked).toHaveLength(3)
    expect(picked.map((a) => a.title)).toEqual(
      expect.arrayContaining([expect.stringContaining("NSFAS bursary")]),
    )
  })

  it("lets nothing off-topic through from the cache", () => {
    for (const title of ["Turkey's Salt Lake", "Brazil's left", "Uranium American", "Tenders Closing"]) {
      expect(selectArticles(RAW_SWEEP_RESULTS).some((a) => a.title.includes(title))).toBe(false)
    }
  })

  it("can ignore age without ignoring relevance", () => {
    // The stale-cache fallback: better an old bursary call than a fresh
    // article about something else.
    const old = [
      article({ title: "Matric exam results released", pubDate: hoursAgo(1000) }),
      article({ title: "Uranium American recovers waste", pubDate: hoursAgo(1) }),
    ]
    expect(selectArticles(old)).toHaveLength(0)
    const relaxed = selectArticles(old, 8, { ignoreAge: true })
    expect(relaxed).toHaveLength(1)
    expect(relaxed[0].title).toContain("Matric")
  })
})
