import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || ""
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"
const MODEL = "google/gemini-2.0-flash-exp:free"

interface MatricPassRateNews {
  title: string
  description: string
  link: string
  pubDate: string
  source_id: string
  category: string[]
  image_url: string
  alt_text?: string
}

// In-memory cache for the fetched news (persists until server restart)
// In production, consider using a database or external storage
const newsCache: {
  articles?: MatricPassRateNews[]
  fetchYear?: number
  lastFetched?: string
} = {}

/**
 * Fetches latest Matric Pass Rates news using OpenRouter AI
 * This should be called once per year on January 31st
 */
async function fetchMatricPassRatesNews(): Promise<MatricPassRateNews[]> {
  if (!OPENROUTER_API_KEY) {
    console.error("Missing OPENROUTER_API_KEY")
    return []
  }

  const currentYear = new Date().getFullYear()
  const previousYear = currentYear - 1 // Most recent completed exam year

  const prompt = `You are a news assistant. Find and provide the latest news articles about South Africa's Matric Pass Rates for ${previousYear} (the most recent completed exam year).

Return a JSON array of news articles in this exact format:
[
  {
    "title": "Article title here",
    "description": "Brief description of the article content",
    "link": "URL to the article if available, or a relevant government/education website",
    "pubDate": "ISO 8601 date string (YYYY-MM-DDTHH:mm:ssZ)",
    "source_id": "Source name (e.g., 'Department of Basic Education', 'SAnews.gov.za')",
    "category": ["education", "matric"],
    "image_url": "",
    "alt_text": "Description of image"
  }
]

Requirements:
- Focus on official Matric Pass Rate announcements from Department of Basic Education
- Include national pass rates, provincial breakdowns, and key statistics
- Use recent, accurate information from ${previousYear} results
- Return 3-5 high-quality articles
- Ensure all dates are valid ISO 8601 format
- If you cannot find real articles, return an empty array

Return ONLY valid JSON, no other text.`

  try {
    const start = Date.now()
    const resp = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://coursefinder-sa.vercel.app",
        "X-Title": "CourseFinder SA",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: "You are a helpful assistant that returns strictly valid JSON only. Never include explanations or markdown formatting." },
          { role: "user", content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 2048
      })
    })

    if (!resp.ok) {
      const body = await resp.text()
      console.error("OpenRouter error (matric-pass-rates-news)", {
        status: resp.status,
        statusText: resp.statusText,
        body: body?.slice(0, 200)
      })
      return []
    }

    const json = await resp.json()
    const content = json?.choices?.[0]?.message?.content || ""

    // Extract JSON array from response
    const match = typeof content === "string" ? content.match(/\[[\s\S]*\]/) : null
    if (!match) {
      console.error("No JSON array found in OpenRouter response for matric-pass-rates-news")
      return []
    }

    let articles: any[]
    try {
      articles = JSON.parse(match[0])
    } catch (e) {
      console.error("Failed to parse JSON from OpenRouter matric-pass-rates-news", e)
      return []
    }

    // Validate and transform articles
    const validatedArticles: MatricPassRateNews[] = articles
      .filter((article: any) => article.title && article.description)
      .map((article: any) => ({
        title: String(article.title || ""),
        description: String(article.description || ""),
        link: String(article.link || "#"),
        pubDate: article.pubDate || new Date().toISOString(),
        source_id: String(article.source_id || "OpenRouter AI"),
        category: Array.isArray(article.category) ? article.category : ["education", "matric"],
        image_url: String(article.image_url || ""),
        alt_text: String(article.alt_text || article.title || "Matric pass rates news")
      }))
      .slice(0, 5) // Limit to 5 articles

    console.log(`Fetched ${validatedArticles.length} Matric Pass Rates news articles in ${Date.now() - start}ms`)
    return validatedArticles
  } catch (error) {
    console.error("Error fetching Matric Pass Rates news:", error)
    return []
  }
}

/**
 * GET endpoint to retrieve cached Matric Pass Rates news
 * This is called by the frontend to display the news
 * Also handles cron job triggers on January 31st
 */
export async function GET() {
  try {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const month = currentDate.getMonth() // 0-11, January is 0
    const day = currentDate.getDate()

    // Check if it's January 31st and we need to fetch new news
    if (month === 0 && day === 31) {
      // Check if we've already fetched for this year
      if (newsCache.fetchYear !== currentYear) {
        console.log(`Cron job triggered: Fetching Matric Pass Rates news for ${currentYear} on January 31st`)
        
        // Fetch new articles
        const articles = await fetchMatricPassRatesNews()

        // Cache the results
        newsCache.articles = articles
        newsCache.fetchYear = currentYear
        newsCache.lastFetched = new Date().toISOString()

        console.log(`Successfully fetched and cached ${articles.length} Matric Pass Rates news articles for ${currentYear}`)
      }
    }

    // Return cached news if available
    if (newsCache.articles && newsCache.fetchYear) {
      // If we have news from this year or last year, return it
      if (newsCache.fetchYear >= currentYear - 1) {
        return NextResponse.json({
          success: true,
          articles: newsCache.articles,
          fetchYear: newsCache.fetchYear,
          lastFetched: newsCache.lastFetched,
          source: "Cached Matric Pass Rates News"
        }, {
          headers: {
            "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200"
          }
        })
      }
    }

    // No cached news available
    return NextResponse.json({
      success: true,
      articles: [],
      message: "No Matric Pass Rates news available yet. News will be fetched on January 31st each year.",
      source: "No data"
    }, {
      headers: {
        "Cache-Control": "public, s-maxage=3600"
      }
    })
  } catch (error) {
    console.error("Matric Pass Rates News API Error:", error)
    return NextResponse.json({
      success: false,
      error: "Failed to fetch Matric Pass Rates news",
      articles: []
    }, { status: 500 })
  }
}

/**
 * POST endpoint to trigger news fetch (called by cron job)
 * This should only be called on January 31st each year
 */
export async function POST(request?: Request) {
  try {
    // Verify this is a cron job request (optional: add authentication)
    const authHeader = request?.headers.get("authorization")
    const cronSecret = process.env.CRON_SECRET
    
    // If CRON_SECRET is set, verify the request
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const month = currentDate.getMonth() // 0-11, January is 0
    const day = currentDate.getDate()

    // Check if it's January 31st
    if (month !== 0 || day !== 31) {
      return NextResponse.json({
        success: false,
        message: `This endpoint should only be called on January 31st. Today is ${currentDate.toLocaleDateString()}`
      }, { status: 400 })
    }

    // Check if we've already fetched for this year
    if (newsCache.fetchYear === currentYear) {
      return NextResponse.json({
        success: true,
        message: `Matric Pass Rates news for ${currentYear} has already been fetched`,
        articles: newsCache.articles,
        fetchYear: newsCache.fetchYear
      })
    }

    // Fetch new articles
    console.log(`Fetching Matric Pass Rates news for ${currentYear} on January 31st`)
    const articles = await fetchMatricPassRatesNews()

    // Cache the results
    newsCache.articles = articles
    newsCache.fetchYear = currentYear
    newsCache.lastFetched = new Date().toISOString()

    return NextResponse.json({
      success: true,
      message: `Successfully fetched ${articles.length} Matric Pass Rates news articles for ${currentYear}`,
      articles,
      fetchYear: currentYear,
      lastFetched: newsCache.lastFetched
    })
  } catch (error) {
    console.error("Error in POST /api/matric-pass-rates-news:", error)
    return NextResponse.json({
      success: false,
      error: "Failed to fetch Matric Pass Rates news"
    }, { status: 500 })
  }
}

