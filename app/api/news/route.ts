import { NextResponse } from "next/server"
import { NewsArticle, FALLBACK_ARTICLES } from "@/data/fallback-news"
import { isWithin48Hours, isRelevantToStudents, buildImageForArticle } from "@/lib/news-utils"

export const dynamic = "force-dynamic"
export const revalidate = 3600

const NEWS_API_KEY = process.env.NEWS_API_KEY

async function fetchRealNews(): Promise<NewsArticle[]> {
  try {
    if (!NEWS_API_KEY) {
      console.warn("NEWS_API_KEY not found in environment variables")
      return []
    }

    const url = `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&country=za&language=en&category=top,politics,education,technology,science&image=1`

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(10000)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("News API error:", response.status, errorText)
      return []
    }

    const data = await response.json()

    if (data.status === "error") {
      console.error("News API error:", data.results?.message || "Unknown error")
      return []
    }

    if (!data.results || !Array.isArray(data.results)) {
      console.warn("No news results found")
      return []
    }

    const articles = data.results
      .filter(isRelevantToStudents)
      .filter((item: any) => item.image_url)
      .map((item: any) => ({
        title: item.title || "No title",
        description: item.description || item.content || "No description available",
        link: item.link || "#",
        pubDate: item.pubDate || new Date().toISOString(),
        source_id: item.source_id || item.source_name || "Unknown",
        category: item.category || ["education"],
        image_url: item.image_url,
        alt_text: item.title || "News image",
      }))

    return articles
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
      .filter((a) => isWithin48Hours(a.pubDate))
      .slice(0, MAX)

    if (normalized.length < 1) {
      normalized = FALLBACK_ARTICLES.map(article => {
        const { image_url, alt_text } = buildImageForArticle(article)
        return {
          ...article,
          image_url: article.image_url || image_url,
          alt_text: article.alt_text || alt_text
        }
      })
    }

    return NextResponse.json(
      {
        success: true,
        articles: normalized,
        source: fetchedArticles.length > 0 ? "Live Feed" : "Fallback",
        count: normalized.length
      },
      { headers: { "Cache-Control": "public, s-maxage=3600" } }
    )
  } catch (error) {
    console.error("News API GET error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch news" },
      { status: 500 }
    )
  }
}
