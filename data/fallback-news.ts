export interface NewsArticle {
    // ── Identity ────────────────────────────────────────────────────────────────
    article_id: string           // "da149f9291a8b899b13037b71fd354fc"
    link: string           // full article URL

    // ── Content ─────────────────────────────────────────────────────────────────
    title: string
    description: string           // item.content is paywalled on free tier — never use it

    // ── Dates ───────────────────────────────────────────────────────────────────
    pubDate: string           // "2026-03-19 19:35:00"
    pubDateTZ: string           // "UTC"

    // ── Source ──────────────────────────────────────────────────────────────────
    source_id: string           // "landeszeitung"
    source_name: string           // "Lz – Landeszeitung"
    source_url: string | null
    source_icon: string | null
    source_priority: number | null

    // ── Taxonomy ────────────────────────────────────────────────────────────────
    category: string[]         // ["top", "lifestyle"]
    language: string           // "german"
    country: string[]         // ["germany"]
    keywords: string[] | null
    datatype: string           // "news"
    duplicate: boolean

    // ── Media ───────────────────────────────────────────────────────────────────
    image_url: string | null    // null when not provided by API
    video_url: string | null
    alt_text: string           // fallback to title
}

export const STUDENT_RELEVANT_KEYWORDS = [
    "matric", "grade 11", "grade 12", "education", "school", "university",
    "student", "exam", "tertiary", "bursary", "scholarship", "study",
    "career", "apprenticeship", "learner", "graduation", "college", "nsc",
    "subject choice", "career guidance", "tvet", "learnership", "youth unemployment",
    "gap year", "study tips", "final exam", "university application", "nbts", "university acceptance",
]

export const FALLBACK_ARTICLES: NewsArticle[] = [];
