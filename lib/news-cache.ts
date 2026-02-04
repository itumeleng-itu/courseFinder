import { NewsArticle, FALLBACK_ARTICLES } from "@/data/fallback-news"

interface NewsCache {
    articles: NewsArticle[]
    lastUpdated: Date | null
}

// In-memory cache for news articles
const cache: NewsCache = {
    articles: [],
    lastUpdated: null
}

/**
 * Save successfully fetched news to cache
 */
export function saveToCache(articles: NewsArticle[]): void {
    if (articles.length > 0) {
        cache.articles = articles
        cache.lastUpdated = new Date()
    }
}

/**
 * Get cached news articles, falling back to static articles if cache is empty
 */
export function getCachedNews(): NewsArticle[] {
    if (cache.articles.length > 0) {
        return cache.articles
    }
    return FALLBACK_ARTICLES
}

/**
 * Check if cache has dynamic content (vs static fallback)
 */
export function hasCachedNews(): boolean {
    return cache.articles.length > 0
}

/**
 * Get cache metadata for debugging
 */
export function getCacheInfo(): { hasCachedNews: boolean; lastUpdated: Date | null; count: number } {
    return {
        hasCachedNews: cache.articles.length > 0,
        lastUpdated: cache.lastUpdated,
        count: cache.articles.length
    }
}
