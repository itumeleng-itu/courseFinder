import { NewsArticle, STUDENT_RELEVANT_KEYWORDS } from "@/data/fallback-news"

// ─── Relevance Filter ─────────────────────────────────────────────────────────
// Single source of truth — keywords live in fallback-news.ts (STUDENT_RELEVANT_KEYWORDS)
// Categories are broad to maximise results on the free plan (10 articles/request)

const RELEVANT_CATEGORIES = [
    "education", "science", "technology", "politics",
    "business", "health", "entertainment", "sports",
    "world", "top", "environment", "innovation",
]

export function isRelevantToStudents(article: {
    title?: string
    description?: string
    content?: string
    category?: string[]
}): boolean {
    // 1. Pass if already in a relevant category
    if (article.category?.some(cat =>
        RELEVANT_CATEGORIES.some(rel => cat.toLowerCase().includes(rel))
    )) {
        return true
    }

    // 2. Keyword match against shared STUDENT_RELEVANT_KEYWORDS
    const text = [article.title, article.description]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()

    return STUDENT_RELEVANT_KEYWORDS.some(keyword => text.includes(keyword.toLowerCase()))
}

// ─── Time Filter ──────────────────────────────────────────────────────────────
// NewsData free plan delays articles by ~12hrs — 48hr window is safe
export function isWithin48Hours(pubDate: string): boolean {
    if (!pubDate) return false

    try {
        // newsdata.io returns "2026-03-19 19:35:00" — no timezone suffix.
        // Force UTC parsing by replacing space with T and appending Z,
        // but only when the string doesn't already contain T or a timezone.
        const normalized = pubDate.includes("T")
            ? pubDate
            : pubDate.replace(" ", "T") + "Z"

        const articleDate = new Date(normalized)
        if (isNaN(articleDate.getTime())) return false // guard bad dates

        const diffMs = Date.now() - articleDate.getTime()
        const diffHours = diffMs / (1000 * 60 * 60)
        return diffHours >= 0 && diffHours <= 48
    } catch {
        console.warn("[News] Invalid pubDate format:", pubDate)
        return false
    }
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