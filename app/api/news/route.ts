import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 1800 // 30 minutes

const FALLBACK_NEWS = [
  {
    title: "South Africa's 2023 Matric Results Show Improvement",
    description:
      "The Department of Basic Education announces improved matric pass rates across most provinces, with particular gains in Mathematics and Physical Sciences.",
    link: "https://www.education.gov.za",
    pubDate: new Date().toISOString(),
    source_id: "DBE",
    category: ["education"],
    image_url: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Universities Announce 2024 Application Deadlines",
    description:
      "Major South African universities including Wits, UCT, and UP have released their application deadlines for the 2024 academic year.",
    link: "https://www.wits.ac.za",
    pubDate: new Date().toISOString(),
    source_id: "Universities SA",
    category: ["education"],
    image_url: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "New Bursary Programs Announced for STEM Students",
    description:
      "Several organizations have launched new bursary programs targeting students pursuing Science, Technology, Engineering, and Mathematics degrees.",
    link: "https://www.nsfas.org.za",
    pubDate: new Date().toISOString(),
    source_id: "NSFAS",
    category: ["education"],
    image_url: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Guide: How to Calculate Your APS Score",
    description:
      "A comprehensive guide to understanding and calculating your Admission Point Score (APS) for university applications in South Africa.",
    link: "#",
    pubDate: new Date().toISOString(),
    source_id: "Education Portal",
    category: ["education"],
    image_url: "/placeholder.svg?height=200&width=400",
  },
]

export async function GET() {
  try {
    const response = await fetch(
      "https://newsdata.io/api/1/news?apikey=pub_8a9b800f8fab404c9b5c0e08708897b3&country=za&category=education&language=en",
      {
        next: { revalidate: 1800 },
      },
    )

    if (!response.ok) {
      throw new Error(`News API responded with status ${response.status}`)
    }

    const data = await response.json()

    if (data.status === "success" && data.results && data.results.length > 0) {
      // Return only the first 4 articles
      const articles = data.results.slice(0, 4).map((article: any) => ({
        title: article.title || "No title",
        description: article.description || article.content || "No description available",
        link: article.link || "#",
        pubDate: article.pubDate || new Date().toISOString(),
        source_id: article.source_id || "Unknown",
        category: article.category || ["education"],
        image_url: article.image_url || "/placeholder.svg?height=200&width=400",
      }))

      return NextResponse.json(
        {
          success: true,
          articles,
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=900",
          },
        },
      )
    }

    // If no results, return fallback
    return NextResponse.json({
      success: true,
      articles: FALLBACK_NEWS,
    })
  } catch (error) {
    console.error("News API Error:", error)

    // Return fallback news on error
    return NextResponse.json({
      success: true,
      articles: FALLBACK_NEWS,
    })
  }
}
