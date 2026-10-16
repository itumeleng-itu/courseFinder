import { NewsArticle, STUDENT_RELEVANT_KEYWORDS } from "@/data/fallback-news"

// ─── Relevance Filter ─────────────────────────────────────────────────────────
/**
 * WHY THIS IS A KEYWORD TEST AND NOT A CATEGORY TEST
 *
 * It used to pass any article carrying one of a dozen broad categories --
 * "top", "world", "technology", "health", "politics", "business", "sports",
 * "entertainment". newsdata.io tags nearly everything with at least one of
 * those, and "top" is close to a default, so the filter rejected nothing and
 * the keyword list beneath it was dead code.
 *
 * What a learner actually saw on the homepage: the Pope's lung cancer surgery
 * (twice, from two syndicating sources), a phone comparison, Alibaba's GPU
 * scheduling, a Huawei EV brake recall and a PRASA bus launch. Two of eight
 * slots were about school, and those two were duplicates of each other.
 *
 * So relevance is now decided by what the article is ABOUT -- its words --
 * and category is only ever corroborating evidence. "education" alone is not
 * enough either: a story filed under education about a school fire is not
 * what this feed is for.
 */

/** Bursaries a matriculant can actually apply to, plus the funders who run
 * them. Terms skew deliberately towards school-leaver and first-year intake,
 * because a postgraduate-only bursary is noise to this audience. */
export const BURSARY_KEYWORDS = [
    "bursary", "bursaries", "scholarship", "scholarships",
    "nsfas", "funza lushaka", "financial aid", "student funding",
    "study funding", "fee waiver", "tuition assistance",
    "undergraduate funding", "first-year funding", "school leaver bursary",
]

/** Signals that a funding story is open to someone finishing matric now,
 * rather than to current students or postgraduates. */
export const FIRST_YEAR_SIGNALS = [
    "matric", "grade 12", "grade twelve", "school leaver", "school-leaver",
    "first-year", "first year", "undergraduate", "nsc", "applications open",
    "apply now", "2027 intake", "2027 applications",
]

/** University and admissions news proper -- who is opening, closing,
 * changing requirements, striking, registering. */
export const UNIVERSITY_KEYWORDS = [
    "university", "universities", "tvet college", "admission", "admissions",
    "application window", "applications open", "applications close",
    "registration", "prospectus", "faculty", "aps score", "admission point",
    "higher education", "dhet", "usaf", "wits", "tuks", "ukzn", "unisa",
    "stellenbosch", "rhodes university", "walk-in", "clearing",
]

export type ArticleTopic = "bursary" | "university" | "schooling"

const haystack = (article: {
    title?: string
    description?: string
    keywords?: string[] | null
}): string =>
    [article.title, article.description, ...(article.keywords ?? [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()

const matches = (text: string, terms: string[]) =>
    terms.some((t) => text.includes(t.toLowerCase()))

/**
 * Which bucket an article belongs to, or null if it is not for this audience.
 * The route uses this to reserve slots, so bursary news cannot be crowded out
 * by whatever happens to be fresher on the day.
 */
export function classifyArticle(article: {
    title?: string
    description?: string
    keywords?: string[] | null
    category?: string[]
}): ArticleTopic | null {
    const text = haystack(article)

    if (matches(text, BURSARY_KEYWORDS)) return "bursary"
    if (matches(text, UNIVERSITY_KEYWORDS)) return "university"
    if (matches(text, STUDENT_RELEVANT_KEYWORDS)) return "schooling"
    return null
}

export function isRelevantToStudents(article: {
    title?: string
    description?: string
    content?: string
    keywords?: string[] | null
    category?: string[]
}): boolean {
    return classifyArticle(article) !== null
}

/**
 * Whether a funding story looks open to someone writing matric now.
 *
 * This is a HINT, not a determination -- eligibility lives in the bursary's
 * own terms, not its headline, so the UI must not promise a learner they
 * qualify. It is used only to order bursary items, putting the ones that
 * mention matric, school leavers or first-year intake above those that read
 * as postgraduate or staff funding.
 */
export function looksOpenToMatriculants(article: {
    title?: string
    description?: string
    keywords?: string[] | null
}): boolean {
    return matches(haystack(article), FIRST_YEAR_SIGNALS)
}

// ─── Time Filter ──────────────────────────────────────────────────────────────
/**
 * newsdata.io's free plan delays articles by roughly 12 hours, so even
 * general news needs a window wider than a day.
 *
 * Bursaries need a far wider one. A call for applications is announced once
 * and then stays open for weeks or months; under a 48-hour cutoff it is
 * visible for a single day of its life and invisible for the rest, which is
 * exactly backwards for the learner who needs it. Hence MAX_AGE_HOURS below.
 */
export const MAX_AGE_HOURS: Record<ArticleTopic, number> = {
    bursary: 30 * 24,
    university: 7 * 24,
    schooling: 48,
}

export function hoursSincePublished(pubDate: string): number | null {
    if (!pubDate) return null

    try {
        // newsdata.io returns "2026-03-19 19:35:00" -- no timezone suffix.
        // Force UTC parsing by replacing space with T and appending Z,
        // but only when the string doesn't already contain T or a timezone.
        const normalized = pubDate.includes("T")
            ? pubDate
            : pubDate.replace(" ", "T") + "Z"

        const articleDate = new Date(normalized)
        if (isNaN(articleDate.getTime())) return null

        return (Date.now() - articleDate.getTime()) / (1000 * 60 * 60)
    } catch {
        console.warn("[News] Invalid pubDate format:", pubDate)
        return null
    }
}

export function isWithinHours(pubDate: string, hours: number): boolean {
    const age = hoursSincePublished(pubDate)
    if (age === null) return false
    return age >= 0 && age <= hours
}

export function isWithin48Hours(pubDate: string): boolean {
    return isWithinHours(pubDate, 48)
}

/** Fresh enough for its own topic, rather than one window for everything. */
export function isFreshForTopic(pubDate: string, topic: ArticleTopic): boolean {
    return isWithinHours(pubDate, MAX_AGE_HOURS[topic])
}

// ─── Deduplication ────────────────────────────────────────────────────────────
/**
 * Syndication puts the same story out under several mastheads -- the live
 * feed carried the identical Pope headline from timeslive and sowetanlive,
 * and the same matric story from pretorianews and businessreport. Two of
 * eight slots each. newsdata.io's own `duplicate` flag caught none of them.
 *
 * So dedupe on the headline itself, keeping whichever copy arrives first
 * (the sweeps run highest-value first, so that is the better-targeted one).
 */
/**
 * Strips a leading wire label before comparing.
 *
 * The identical matric story ran as "WATCH: Orient Islamic School matrics
 * share reactions to English Paper 3" on one masthead and without the prefix
 * on another, so comparing raw headlines kept both. Desk labels like WATCH,
 * LISTEN, BREAKING, UPDATE and IN PICTURES are added per publication and
 * carry no story content, so they must not distinguish two copies.
 *
 * This only ever builds a comparison key -- the title a learner reads is
 * never rewritten.
 */
const normaliseTitle = (title: string) =>
    title
        .replace(/^\s*[A-Z][A-Z\s]{1,24}[:|]\s*/, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim()

export function dedupeArticles<T extends { title: string; link?: string; article_id?: string }>(
    articles: T[],
): T[] {
    const seen = new Set<string>()
    const out: T[] = []

    for (const a of articles) {
        const keys = [
            a.article_id ? `id:${a.article_id}` : null,
            a.link && a.link !== "#" ? `url:${a.link}` : null,
            `title:${normaliseTitle(a.title)}`,
        ].filter(Boolean) as string[]

        if (keys.some((k) => seen.has(k))) continue
        keys.forEach((k) => seen.add(k))
        out.push(a)
    }

    return out
}

// ─── Image Fallback ───────────────────────────────────────────────────────────
// Returns a category-appropriate placeholder when the API provides no image_url
const CATEGORY_IMAGES: Record<string, { image_url: string; alt_text: string }> = {
    education: { image_url: "/images/news/education.jpg", alt_text: "Education news" },
    technology: { image_url: "/images/news/technology.jpg", alt_text: "Technology news" },
    science: { image_url: "/images/news/science.jpg", alt_text: "Science news" },
    politics: { image_url: "/images/news/politics.jpg", alt_text: "Politics news" },
    business: { image_url: "/images/news/business.jpg", alt_text: "Business news" },
    health: { image_url: "/images/news/health.jpg", alt_text: "Health news" },
    sports: { image_url: "/images/news/sports.jpg", alt_text: "Sports news" },
    environment: { image_url: "/images/news/environment.jpg", alt_text: "Environment news" },
    default: { image_url: "/images/news/default.jpg", alt_text: "News" },
}

export function buildImageForArticle(article: Pick<NewsArticle, "category" | "title">): {
    image_url: string
    alt_text: string
} {
    const match = article.category?.find(cat => CATEGORY_IMAGES[cat.toLowerCase()])
    const key = match?.toLowerCase() ?? "default"
    return {
        image_url: CATEGORY_IMAGES[key].image_url,
        alt_text: article.title || CATEGORY_IMAGES[key].alt_text,
    }
}
