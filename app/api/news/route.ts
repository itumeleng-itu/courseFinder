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
const apiKey = process.env.OPENROUTER_API_KEY_NEWS;
const FORTY_EIGHT_HOURS_MS = 48 * 60 * 60 * 1000

function isWithin48Hours(pubDate: string): boolean {
  const now = Date.now()
  const date = new Date(pubDate).getTime()
  if (isNaN(date)) return false
  return now - date <= FORTY_EIGHT_HOURS_MS && date <= now
}

function buildImageForArticle(article: NewsArticle): { image_url: string; alt_text: string } {
  const category = (article.category?.[0] || "news").toLowerCase()
  const title = article.title.toLowerCase()

  // Basic keyword/category mapping to keep images relevant to the article
  const queryByCategory: Record<string, string> = {
    politics: "south-africa,parliament,government",
    business: "south-africa,business,stock-market",
    sports: "south-africa,soccer,stadium",
    entertainment: "south-africa,entertainment,concert",
    technology: "south-africa,technology,innovation",
    health: "south-africa,health,hospital",
    crime: "south-africa,police,crime",
    education: "south-africa,students,school",
    news: "south-africa,city,people",
  }

  let query = queryByCategory[category] || queryByCategory["news"]

  // Enhance query with title keywords where sensible
  if (title.includes("matric") || title.includes("education")) {
    query = "south-africa,students,graduation"
  } else if (title.includes("university")) {
    query = "south-africa,university,campus"
  } else if (title.includes("load shedding") || title.includes("electricity")) {
    query = "south-africa,power,energy"
  }

  const image_url = `https://source.unsplash.com/800x600/?${encodeURIComponent(query)}`
  const alt_text = `Image related to ${category}: ${article.title}`
  return { image_url, alt_text }
}

async function fetchNewsWithAI(): Promise<NewsArticle[]> {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
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
          year: new Date().getFullYear(),
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
          },
        },
      )
    }

    // Fetch fresh news from AI
    const generated = await fetchNewsWithAI()

    // Normalize, enforce images, and filter to last 48 hours
    const now = new Date()
    const normalized: NewsArticle[] = generated
      .map((a) => {
        // Ensure valid pubDate within last 48 hours; if invalid/missing, set to now
        let pubDate = a.pubDate
        if (!pubDate || isNaN(new Date(pubDate).getTime())) {
          pubDate = now.toISOString()
        }

        const { image_url, alt_text } = buildImageForArticle(a)
        const finalImage = a.image_url && a.image_url.trim().length > 0 ? a.image_url : image_url
        const finalAlt = a.alt_text && a.alt_text.trim().length > 0 ? a.alt_text : alt_text

        return {
          title: a.title,
          description: a.description,
          link: a.link,
          pubDate,
          source_id: a.source_id,
          category: a.category,
          image_url: finalImage,
          alt_text: finalAlt,
        }
      })
      .filter((a) => isWithin48Hours(a.pubDate))
      .slice(0, 8)

    // Update cache
    newsCache = {
      data: normalized,
      timestamp: Date.now(),
    }

    return NextResponse.json(
      {
        success: true,
        articles: normalized,
        cached: false,
        source: "AI Generated (OpenRouter)",
        year: new Date().getFullYear(),
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
        year: new Date().getFullYear(),
      })
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch news",
        message: "Unable to load news at this time",
        year: new Date().getFullYear(),
      },
      { status: 500 },
    )
  }
}
