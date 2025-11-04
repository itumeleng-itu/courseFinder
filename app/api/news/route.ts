import { NextResponse } from "next/server"

// Revalidate every 24 hours
export const revalidate = 86400

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

const FORTY_EIGHT_HOURS_MS = 48 * 60 * 60 * 1000

// NewsData.io API key
const NEWS_API_KEY = process.env.NEWSDATA_API_KEY

// Keywords relevant to matric/grade 11 learners
const STUDENT_RELEVANT_KEYWORDS = [
  "matric",
  "grade 11",
  "grade 12",
  "education",
  "school",
  "university",
  "student",
  "exam",
  "tertiary",
  "bursary",
  "scholarship",
  "study",
  "career",
  "apprenticeship",
  "learner",
  "graduation",
  "college",
  "nsc",
  "subject choice",
  "career guidance",
  "tvet",
  "learnership",
  "youth unemployment",
  "gap year",
  "study tips",
  "final exam",
  "university application",
  "nbts",
  "university acceptance",
]

function isWithin48Hours(pubDate: string): boolean {
  const now = Date.now()
  const date = new Date(pubDate).getTime()
  if (isNaN(date)) return false
  return now - date <= FORTY_EIGHT_HOURS_MS && date <= now
}

function isRelevantToStudents(article: any): boolean {
  const searchText = `${article.title} ${article.description}`.toLowerCase()

  // Check if article contains any student-relevant keywords
  return STUDENT_RELEVANT_KEYWORDS.some((keyword) => searchText.includes(keyword.toLowerCase()))
}

function buildImageForArticle(article: NewsArticle): { image_url: string; alt_text: string } {
  const title = article.title.toLowerCase()
  const description = article.description.toLowerCase()
  const fullText = `${title} ${description}`

  // Analyze the article content to determine the main topic
  let query = ""
  let imageDescription = ""

  // Student-specific topics (highly specific matching)
  if (fullText.includes("matric results") || fullText.includes("nsc results")) {
    query = "student,celebration,graduation,success"
    imageDescription = "Students celebrating their results"
  } else if (
    fullText.includes("matric exam") ||
    fullText.includes("final exam") ||
    fullText.includes("grade 12 exam")
  ) {
    query = "student,studying,exam,classroom"
    imageDescription = "Students writing exams"
  } else if (fullText.includes("bursary") || fullText.includes("scholarship") || fullText.includes("financial aid")) {
    query = "student,laptop,studying,books"
    imageDescription = "Student studying with scholarship opportunities"
  } else if (fullText.includes("university application") || fullText.includes("tertiary application")) {
    query = "university,campus,students,building"
    imageDescription = "University campus"
  } else if (fullText.includes("career") || fullText.includes("job") || fullText.includes("employment")) {
    query = "career,professional,office,young-adult"
    imageDescription = "Career and employment opportunities"
  } else if (fullText.includes("university") || fullText.includes("tertiary") || fullText.includes("college")) {
    query = "university,campus,students,library"
    imageDescription = "University campus and students"
  } else if (fullText.includes("teacher") || fullText.includes("educator")) {
    query = "teacher,classroom,education,students"
    imageDescription = "Teacher in classroom"
  } else if (fullText.includes("school") && fullText.includes("violence")) {
    query = "school,safety,security,education"
    imageDescription = "School safety concerns"
  } else if (fullText.includes("protest") || fullText.includes("strike")) {
    query = "protest,students,youth,demonstration"
    imageDescription = "Student protest"
  } else if (fullText.includes("dropout") || fullText.includes("retention")) {
    query = "student,sad,dropout,education"
    imageDescription = "Education challenges"
  } else if (fullText.includes("technology") || fullText.includes("coding") || fullText.includes("computer")) {
    query = "technology,computer,programming,student"
    imageDescription = "Technology and learning"
  } else if (fullText.includes("science") || fullText.includes("stem") || fullText.includes("mathematics")) {
    query = "science,laboratory,student,experiment"
    imageDescription = "Science education"
  } else if (fullText.includes("reading") || fullText.includes("literacy") || fullText.includes("books")) {
    query = "books,reading,library,student"
    imageDescription = "Reading and literacy"
  } else if (fullText.includes("sport") || fullText.includes("athletics") || fullText.includes("physical education")) {
    query = "sport,student,athletics,team"
    imageDescription = "Student sports and athletics"
  } else if (fullText.includes("mental health") || fullText.includes("stress") || fullText.includes("anxiety")) {
    query = "mental-health,student,wellness,young"
    imageDescription = "Student mental health and wellness"
  } else if (fullText.includes("covid") || fullText.includes("pandemic") || fullText.includes("online learning")) {
    query = "online-learning,laptop,student,home"
    imageDescription = "Online learning"
  } else if (fullText.includes("infrastructure") || fullText.includes("facilities") || fullText.includes("buildings")) {
    query = "school,building,infrastructure,education"
    imageDescription = "School infrastructure"
  } else if (fullText.includes("curriculum") || fullText.includes("subject") || fullText.includes("syllabus")) {
    query = "classroom,teaching,curriculum,education"
    imageDescription = "Education curriculum"
  } else if (fullText.includes("grade 11") || fullText.includes("grade 12")) {
    query = "high-school,students,classroom,learning"
    imageDescription = "High school students"
  } else if (fullText.includes("matric") || fullText.includes("education")) {
    query = "student,graduation,success,education"
    imageDescription = "Education and students"
  } else {
    // Default fallback for any other education-related news
    query = "education,student,learning,school"
    imageDescription = "Education and learning"
  }

  const image_url = `https://source.unsplash.com/800x600/?${encodeURIComponent(query)}`
  const alt_text = imageDescription
  return { image_url, alt_text }
}

async function fetchRealNews(): Promise<NewsArticle[]> {
  try {
    // Fetch general South African news
    const url = `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&country=za&language=en&category=top,politics,education,technology,science`

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Important: Don't cache the external API call itself
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`News API failed: ${response.status}`)
    }

    const data = await response.json()

    if (!data.results || !Array.isArray(data.results)) {
      throw new Error("Invalid response from news API")
    }

    // Transform and filter for student-relevant articles
    const articles: NewsArticle[] = data.results.filter(isRelevantToStudents).map((item: any) => ({
      title: item.title || "No title",
      description: item.description || item.content || "No description available",
      link: item.link || "#",
      pubDate: item.pubDate || new Date().toISOString(),
      source_id: item.source_id || "Unknown",
      category: item.category || ["education"],
      image_url: item.image_url || "",
      alt_text: item.title || "News image",
    }))

    // If not enough student-relevant news found, fetch education-specific news
    if (articles.length < 5) {
      const eduUrl = `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&country=za&language=en&q=matric OR education OR student OR university&category=education`

      const eduResponse = await fetch(eduUrl, { cache: "no-store" })
      if (eduResponse.ok) {
        const eduData = await eduResponse.json()
        if (eduData.results) {
          const eduArticles = eduData.results.map((item: any) => ({
            title: item.title || "No title",
            description: item.description || item.content || "No description available",
            link: item.link || "#",
            pubDate: item.pubDate || new Date().toISOString(),
            source_id: item.source_id || "Unknown",
            category: ["education"],
            image_url: item.image_url || "",
            alt_text: item.title || "News image",
          }))
          articles.push(...eduArticles)
        }
      }
    }

    return articles
  } catch (error) {
    console.error("Real news fetch error:", error)
    throw error
  }
}

export async function GET() {
  try {
    console.log("Fetching news from API (will be cached by Vercel CDN for 24 hours)")

    // Fetch fresh news from API
    const fetchedArticles = await fetchRealNews()

    // Process articles
    const now = new Date()
    const normalized: NewsArticle[] = fetchedArticles
      .map((a) => {
        let pubDate = a.pubDate
        if (!pubDate || isNaN(new Date(pubDate).getTime())) {
          pubDate = now.toISOString()
        }

        // Use existing image or generate fallback
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

    console.log(`Returning ${normalized.length} articles (cached by Vercel for 24h)`)

    return NextResponse.json(
      {
        success: true,
        articles: normalized,
        source: "Live News Feed (Cached at Vercel for 24h)",
        year: new Date().getFullYear(),
        cacheInfo: "This response is cached globally by Vercel and shared across all users",
        nextUpdate: new Date(Date.now() + 86400000).toISOString(),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
        },
      },
    )
  } catch (error) {
    console.error("News API Error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch news",
        message: "Unable to load news at this time. Please try again later.",
        year: new Date().getFullYear(),
      },
      {
        status: 500,
        headers: {
          // Don't cache errors
          "Cache-Control": "no-store",
        },
      },
    )
  }
}
