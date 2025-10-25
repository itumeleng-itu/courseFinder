import { NextResponse } from "next/server"

// Removed dynamic export due to conflict with output: "export" in next.config.js
// export const dynamic = "force-dynamic"
export const revalidate = 900 // 15 minutes for more frequent updates

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

// Enhanced fallback news with better images and alt text
const FALLBACK_NEWS: NewsArticle[] = [
  {
    title: "South Africa's 2023 Matric Results Show Improvement",
    description:
      "The Department of Basic Education announces improved matric pass rates across most provinces, with particular gains in Mathematics and Physical Sciences.",
    link: "https://www.education.gov.za",
    pubDate: new Date().toISOString(),
    source_id: "DBE",
    category: ["education"],
    image_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop&crop=center",
    alt_text: "Students in graduation caps celebrating academic achievement",
  },
  {
    title: "Universities Announce 2024 Application Deadlines",
    description:
      "Major South African universities including Wits, UCT, and UP have released their application deadlines for the 2024 academic year.",
    link: "https://www.wits.ac.za",
    pubDate: new Date().toISOString(),
    source_id: "Universities SA",
    category: ["education"],
    image_url: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop&crop=center",
    alt_text: "University campus building with students walking",
  },
  {
    title: "New Bursary Programs Announced for STEM Students",
    description:
      "Several organizations have launched new bursary programs targeting students pursuing Science, Technology, Engineering, and Mathematics degrees.",
    link: "https://www.nsfas.org.za",
    pubDate: new Date().toISOString(),
    source_id: "NSFAS",
    category: ["education"],
    image_url: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=200&fit=crop&crop=center",
    alt_text: "Science laboratory equipment and research materials",
  },
  {
    title: "Guide: How to Calculate Your APS Score",
    description:
      "A comprehensive guide to understanding and calculating your Admission Point Score (APS) for university applications in South Africa.",
    link: "#",
    pubDate: new Date().toISOString(),
    source_id: "Education Portal",
    category: ["education"],
    image_url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop&crop=center",
    alt_text: "Calculator and academic papers for APS calculation",
  },
]

// Cache for storing processed news data
const newsCache = new Map<string, { data: NewsArticle[], timestamp: number }>()
const CACHE_DURATION = 15 * 60 * 1000 // 15 minutes

// Supported image formats
const SUPPORTED_IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'webp', 'gif']

// Function to validate and process image URLs - prioritize original images
async function validateImageUrl(url: string): Promise<string> {
  // If no URL provided, use placeholder
  if (!url || url === '/placeholder.svg?height=200&width=400') {
    return generatePlaceholderImage()
  }

  try {
    // Check if URL is valid
    const urlObj = new URL(url)
    
    // For most news sources, trust the original image URL
    // Only validate format, don't do network checks that might fail due to CORS
    const extension = url.split('.').pop()?.toLowerCase()
    const hasValidExtension = !extension || SUPPORTED_IMAGE_FORMATS.includes(extension)
    
    // If it's a proper URL and has a valid extension (or no extension), use it
    if (urlObj.protocol === 'https:' && hasValidExtension) {
      return url
    }
    
    // Only for obviously invalid URLs, fall back to placeholder
    if (urlObj.protocol !== 'https:' && urlObj.protocol !== 'http:') {
      return generatePlaceholderImage()
    }
    
    // For http URLs or questionable formats, still try the original first
    return url
    
  } catch (error) {
    console.warn(`Image URL parsing failed for ${url}:`, error)
    // Even if URL parsing fails, if it looks like an image URL, try it
    if (url.includes('http') && (url.includes('.jpg') || url.includes('.jpeg') || url.includes('.png') || url.includes('.webp'))) {
      return url
    }
  }

  return generatePlaceholderImage()
}

// Generate high-quality placeholder images using Unsplash
function generatePlaceholderImage(): string {
  const educationImages = [
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop&crop=center", // Library
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop&crop=center", // Graduation
    "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop&crop=center", // University
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop&crop=center", // Study materials
    "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=200&fit=crop&crop=center", // Science lab
  ]
  
  return educationImages[Math.floor(Math.random() * educationImages.length)]
}

// Generate alt text based on article content
function generateAltText(article: any): string {
  const title = article.title || ""
  const description = article.description || ""
  
  // Extract key terms for better alt text
  const keyTerms = []
  
  if (title.toLowerCase().includes('university') || title.toLowerCase().includes('college')) {
    keyTerms.push('university campus')
  }
  if (title.toLowerCase().includes('student') || title.toLowerCase().includes('education')) {
    keyTerms.push('students studying')
  }
  if (title.toLowerCase().includes('science') || title.toLowerCase().includes('stem')) {
    keyTerms.push('science and technology')
  }
  if (title.toLowerCase().includes('graduation') || title.toLowerCase().includes('matric')) {
    keyTerms.push('graduation ceremony')
  }
  
  if (keyTerms.length > 0) {
    return `Education news image showing ${keyTerms.join(', ')}`
  }
  
  return `Education news: ${title.substring(0, 50)}${title.length > 50 ? '...' : ''}`
}

export async function GET() {
  try {
    // Check cache first
    const cacheKey = 'education_news_2024'
    const cached = newsCache.get(cacheKey)
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return NextResponse.json(
        {
          success: true,
          articles: cached.data,
          cached: true,
          year: 2024,
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=900, stale-while-revalidate=450",
          },
        },
      )
    }

    const response = await fetch(
      "https://newsdata.io/api/1/news?apikey=pub_8a9b800f8fab404c9b5c0e08708897b3&country=za&category=education&language=en",
      {
        next: { revalidate: 900 },
      },
    )

    if (!response.ok) {
      throw new Error(`News API responded with status ${response.status}`)
    }

    const data = await response.json()

    if (data.status === "success" && data.results && data.results.length > 0) {
      // Process articles with enhanced image handling
      const processedArticles = await Promise.all(
        data.results.map(async (article: any) => {
          const validatedImageUrl = await validateImageUrl(article.image_url)
          const altText = generateAltText(article)
          const pubDate = article.pubDate || new Date().toISOString()
          
          return {
            title: article.title || "No title",
            description: article.description || article.content || "No description available",
            link: article.link || "#",
            pubDate,
            source_id: article.source_id || "Unknown",
            category: article.category || ["education"],
            image_url: validatedImageUrl,
            alt_text: altText,
          }
        })
      )

      const start = new Date(Date.UTC(2024, 0, 1, 0, 0, 0)).getTime()
      const end = new Date(Date.UTC(2024, 11, 31, 23, 59, 59)).getTime()
      const filteredArticles = processedArticles
        .filter(a => {
          const t = new Date(a.pubDate).getTime()
          return !isNaN(t) && t >= start && t <= end
        })
        .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
        .slice(0, 8)

      // Cache the 2024-filtered articles
      newsCache.set(cacheKey, {
        data: filteredArticles,
        timestamp: Date.now(),
      })

      return NextResponse.json(
        {
          success: true,
          articles: filteredArticles,
          cached: false,
          year: 2024,
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=900, stale-while-revalidate=450",
          },
        },
      )
    }

    // If no results, honor 2024-only by returning an empty list
    return NextResponse.json({
      success: true,
      articles: [],
      fallback: false,
      year: 2024,
      message: "No education news items in 2024 for the selected filters.",
    })
  } catch (error) {
    console.error("News API Error:", error)

    // On error, respect 2024-only requirement by returning empty list
    return NextResponse.json({
      success: true,
      articles: [],
      error: true,
      year: 2024,
      message: "Unable to load 2024-only education news.",
    })
  }
}
