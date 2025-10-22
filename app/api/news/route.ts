import { NextResponse } from "next/server"

const NEWS_API_URL = "https://newsdata.io/api/1/news"
const NEWS_API_KEY = "pub_8a9b800f8fab404c9b5c0e08708897b3"

export const dynamic = "force-dynamic"
export const revalidate = 1800 // Cache for 30 minutes

export async function GET() {
  try {
    const params = new URLSearchParams({
      apikey: NEWS_API_KEY,
      country: "za",
      category: "education",
      language: "en",
    })

    const response = await fetch(`${NEWS_API_URL}?${params.toString()}`, {
      next: { revalidate: 1800 },
    })

    if (!response.ok) {
      console.error(`News API error: ${response.status}`)
      return NextResponse.json(
        {
          success: false,
          results: [],
          error: "Failed to fetch news",
        },
        { status: response.status },
      )
    }

    const data = await response.json()

    // Return only the first 4 articles
    return NextResponse.json({
      success: true,
      results: data.results ? data.results.slice(0, 4) : [],
      nextPage: data.nextPage || null,
    })
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json(
      {
        success: false,
        results: [],
        error: "Failed to fetch news",
      },
      { status: 500 },
    )
  }
}
