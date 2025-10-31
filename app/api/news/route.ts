import { NextResponse } from "next/server"

export const revalidate = 0

interface NewsArticle {
  title: string
  description: string
  link: string
  pubDate: string
  source_id: string
  category: string[]
  image_url: string
  alt_text?: string
}

// Server-side cache with 24-hour TTL
let newsCache: { data: NewsArticle[]; timestamp: number } | null = null
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

async function fetchNewsWithAI(): Promise<NewsArticle[]> {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer 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",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "minimax/minimax-m2:free",
        messages: [
          {
            role: "user",
            content: `Generate 8 recent and realistic South African news articles from various categories (politics, business, sports, entertainment, technology, health, crime, education). 

For each article, provide:
- A compelling, realistic title
- A detailed 2-3 sentence description
- A realistic news source (News24, IOL, TimesLive, Daily Maverick, etc.)
- Current date
- Appropriate category
- A relevant Unsplash image URL (use actual Unsplash URLs with appropriate search terms)

Format as JSON array with this structure:
[{
  "title": "string",
  "description": "string", 
  "link": "https://www.news24.com/news/article",
  "pubDate": "2025-01-31T10:00:00Z",
  "source_id": "News24",
  "category": ["politics"],
  "image_url": "https://images.unsplash.com/photo-...",
  "alt_text": "Description of image"
}]

Make the news diverse, current, and realistic for South Africa in January 2025.`,
          },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenRouter API failed: ${response.status}`)
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content

    if (!content) {
      throw new Error("No content in AI response")
    }

    // Parse JSON from AI response
    const jsonMatch = content.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      throw new Error("Could not parse JSON from AI response")
    }

    const articles: NewsArticle[] = JSON.parse(jsonMatch[0])
    return articles
  } catch (error) {
    console.error("AI news fetch error:", error)
    throw error
  }
}

export async function GET() {
  try {
    // Check if cache is valid (less than 24 hours old)
    if (newsCache && Date.now() - newsCache.timestamp < CACHE_DURATION) {
      return NextResponse.json(
        {
          success: true,
          articles: newsCache.data,
          cached: true,
          cacheAge: Math.floor((Date.now() - newsCache.timestamp) / 1000 / 60), // minutes
          nextRefresh: Math.floor((CACHE_DURATION - (Date.now() - newsCache.timestamp)) / 1000 / 60), // minutes
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
          },
        },
      )
    }

    // Fetch fresh news from AI
    const articles = await fetchNewsWithAI()

    // Update cache
    newsCache = {
      data: articles,
      timestamp: Date.now(),
    }

    return NextResponse.json(
      {
        success: true,
        articles,
        cached: false,
        source: "AI Generated (OpenRouter)",
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
        },
      },
    )
  } catch (error) {
    console.error("News API Error:", error)

    // Return cached data if available, even if expired
    if (newsCache) {
      return NextResponse.json({
        success: true,
        articles: newsCache.data,
        cached: true,
        stale: true,
        message: "Using cached news due to API error",
      })
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch news",
        message: "Unable to load news at this time",
      },
      { status: 500 },
    )
  }
}
