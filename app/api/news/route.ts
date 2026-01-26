import { NextResponse } from "next/server"
import { NewsArticle, FALLBACK_ARTICLES } from "@/data/fallback-news"
import { isWithin48Hours, isRelevantToStudents, buildImageForArticle } from "@/lib/news-utils"

export const dynamic = "force-dynamic"
export const revalidate = 86400

const NEWS_API_KEY = process.env.NEWSDATA_API_KEY

async function fetchRealNews(): Promise<NewsArticle[]> {
  try {
    if (!NEWS_API_KEY) return []
    const url = `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&country=za&language=en&category=top,politics,education,technology,science`
    const response = await fetch(url, { method: "GET", headers: { "Content-Type": "application/json" }, cache: "no-store", signal: AbortSignal.timeout(8000) })

    if (!response.ok) return []
    const data = await response.json()
    if (!data.results || !Array.isArray(data.results)) return []

    return data.results.filter(isRelevantToStudents).map((item: any) => ({
      title: item.title || "No title",
      description: item.description || item.content || "No description available",
      link: item.link || "#",
      pubDate: item.pubDate || new Date().toISOString(),
      source_id: item.source_id || "Unknown",
      category: item.category || ["education"],
      image_url: item.image_url || "",
      alt_text: item.title || "News image",
    }))
  } catch (error) {
    console.error("News fetch error:", error)
    return []
  }
}

export async function GET() {
  try {
    const fetchedArticles = await fetchRealNews()
    const MAX = 8
    let normalized = fetchedArticles
      .map((a) => {
        const { image_url, alt_text } = buildImageForArticle(a)
        return { ...a, image_url: a.image_url || image_url, alt_text: a.alt_text || alt_text }
      })
      .filter((a) => isWithin48Hours(a.pubDate))
      .slice(0, MAX)

    if (normalized.length < 1) {
      normalized = FALLBACK_ARTICLES.map(a => {
        const { image_url, alt_text } = buildImageForArticle(a)
        return { ...a, image_url: a.image_url || image_url, alt_text: a.alt_text || alt_text }
      })
    }

    return NextResponse.json({ success: true, articles: normalized, source: fetchedArticles.length > 0 ? "Live Feed" : "Fallback" },
      { headers: { "Cache-Control": "public, s-maxage=86400" } })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch news" }, { status: 500 })
  }
}
