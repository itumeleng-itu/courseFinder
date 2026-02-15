import { NewsArticle, FALLBACK_ARTICLES } from "@/data/fallback-news"
import * as fs from "fs"
import * as path from "path"

// Use /tmp for serverless environments (Vercel) or os.tmpdir() fallback
const CACHE_FILE = path.join(
    process.env.VERCEL ? "/tmp" : require("os").tmpdir(),
    "coursefinder-news-cache.json"
)

interface PersistedCache {
    articles: NewsArticle[]
    lastUpdated: string
}

/**
 * Save successfully fetched news to persistent cache (filesystem).
 * Called every time the news API successfully retrieves articles,
 * ensuring the cache always has the latest data.
 */
export function saveToCache(articles: NewsArticle[]): void {
    if (articles.length === 0) return
    try {
        const payload: PersistedCache = {
            articles,
            lastUpdated: new Date().toISOString(),
        }
        fs.writeFileSync(CACHE_FILE, JSON.stringify(payload), "utf-8")
        console.log(`[News Cache] Saved ${articles.length} articles to ${CACHE_FILE}`)
    } catch (error) {
        console.error("[News Cache] Failed to write cache file:", error)
    }
}

/**
 * Read the persisted cache from disk.
 * Returns null if the file doesn't exist or is unreadable.
 */
function readCache(): PersistedCache | null {
    try {
        if (!fs.existsSync(CACHE_FILE)) return null
        const raw = fs.readFileSync(CACHE_FILE, "utf-8")
        const parsed: PersistedCache = JSON.parse(raw)
        if (!Array.isArray(parsed.articles) || parsed.articles.length === 0) return null
        return parsed
    } catch {
        return null
    }
}

/**
 * Get cached news articles, falling back to static articles if cache is empty.
 */
export function getCachedNews(): NewsArticle[] {
    const cached = readCache()
    if (cached) return cached.articles
    return FALLBACK_ARTICLES
}

/**
 * Check if cache has dynamic content (vs static fallback).
 */
export function hasCachedNews(): boolean {
    return readCache() !== null
}

/**
 * Get cache metadata for debugging.
 */
export function getCacheInfo(): { hasCachedNews: boolean; lastUpdated: string | null; count: number } {
    const cached = readCache()
    return {
        hasCachedNews: cached !== null,
        lastUpdated: cached?.lastUpdated ?? null,
        count: cached?.articles.length ?? 0,
    }
}
