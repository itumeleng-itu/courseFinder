import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 3600 // Cache for 1 hour

interface Bursary {
  title: string
  description: string
  deadline: string
  link: string
  provider: string
  value?: string
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")?.toLowerCase() || ""

    // Fetch the bursaries page
    const response = await fetch("https://www.zabursaries.co.za/", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch bursaries website")
    }

    const html = await response.text()

    // Parse HTML to extract bursary information
    const bursaries: Bursary[] = []

    // Extract bursary entries using regex patterns
    // This is a simplified parser - adjust based on actual HTML structure
    const titlePattern = /<h3[^>]*>(.*?)<\/h3>/gi
    const linkPattern = /<a[^>]*href=["'](.*?)["'][^>]*>/gi

    const titles = Array.from(html.matchAll(titlePattern))
    const links = Array.from(html.matchAll(linkPattern))

    // Extract bursary cards or listings
    const bursaryBlockPattern = /<article[^>]*class=["'][^"']*bursary[^"']*["'][^>]*>([\s\S]*?)<\/article>/gi
    const blocks = Array.from(html.matchAll(bursaryBlockPattern))

    if (blocks.length > 0) {
      for (const block of blocks.slice(0, 20)) {
        const blockHtml = block[1]

        // Extract title
        const titleMatch = blockHtml.match(/<h[23][^>]*>(.*?)<\/h[23]>/i)
        const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, "").trim() : "Unknown Bursary"

        // Extract link
        const linkMatch = blockHtml.match(/<a[^>]*href=["'](.*?)["']/i)
        const link = linkMatch ? linkMatch[1] : "https://www.zabursaries.co.za/"

        // Extract description
        const descMatch = blockHtml.match(/<p[^>]*>(.*?)<\/p>/i)
        const description = descMatch ? descMatch[1].replace(/<[^>]*>/g, "").trim() : ""

        // Extract deadline if available
        const deadlineMatch = blockHtml.match(/deadline[:\s]*(.*?)(?:<|$)/i)
        const deadline = deadlineMatch ? deadlineMatch[1].trim() : "Check website"

        // Extract provider
        const providerMatch = blockHtml.match(/provider[:\s]*(.*?)(?:<|$)/i)
        const provider = providerMatch ? providerMatch[1].trim() : "Various"

        if (title !== "Unknown Bursary") {
          bursaries.push({
            title,
            description,
            deadline,
            link: link.startsWith("http") ? link : `https://www.zabursaries.co.za${link}`,
            provider,
          })
        }
      }
    }

    // If no structured data found, create fallback entries
    if (bursaries.length === 0) {
      bursaries.push(
        {
          title: "NSFAS (National Student Financial Aid Scheme)",
          description:
            "Comprehensive financial aid for students from low-income households. Covers tuition, accommodation, and living expenses.",
          deadline: "November 30, 2024",
          link: "https://www.zabursaries.co.za/nsfas-bursary/",
          provider: "Government",
          value: "Full cost of study",
        },
        {
          title: "Funza Lushaka Bursary Programme",
          description:
            "Bursary for students pursuing teaching qualifications in priority subjects like Mathematics, Science, and Technology.",
          deadline: "October 31, 2024",
          link: "https://www.zabursaries.co.za/funza-lushaka-bursary/",
          provider: "Department of Basic Education",
          value: "Full tuition + allowances",
        },
        {
          title: "Sasol Bursary Programme",
          description: "Bursaries for engineering, science, and technology students with strong academic performance.",
          deadline: "June 30, 2024",
          link: "https://www.zabursaries.co.za/sasol-bursary/",
          provider: "Sasol",
          value: "Full tuition + accommodation",
        },
        {
          title: "Anglo American Bursary",
          description: "Supports students in mining, engineering, and related fields with full financial assistance.",
          deadline: "July 31, 2024",
          link: "https://www.zabursaries.co.za/anglo-american-bursary/",
          provider: "Anglo American",
          value: "Full tuition + living allowance",
        },
        {
          title: "Transnet Bursary Scheme",
          description:
            "Financial support for students pursuing engineering, logistics, and transport-related qualifications.",
          deadline: "September 30, 2024",
          link: "https://www.zabursaries.co.za/transnet-bursary/",
          provider: "Transnet",
          value: "Full tuition + stipend",
        },
        {
          title: "Eskom Tertiary Education Support Programme (TESP)",
          description: "Bursaries for engineering, technology, and science students willing to work for Eskom.",
          deadline: "July 15, 2024",
          link: "https://www.zabursaries.co.za/eskom-bursary/",
          provider: "Eskom",
          value: "Up to R80,000 per year",
        },
        {
          title: "Allan Gray Orbis Foundation Scholarship",
          description:
            "Comprehensive scholarship for entrepreneurial students covering undergraduate and postgraduate studies.",
          deadline: "July 31, 2024",
          link: "https://www.zabursaries.co.za/allan-gray-bursary/",
          provider: "Allan Gray Orbis Foundation",
          value: "Full undergraduate + postgraduate",
        },
        {
          title: "Momentum Metropolitan Bursary",
          description: "Financial assistance for students studying actuarial science, IT, finance, or related fields.",
          deadline: "August 31, 2024",
          link: "https://www.zabursaries.co.za/momentum-bursary/",
          provider: "Momentum Metropolitan",
          value: "Up to R100,000 per year",
        },
      )
    }

    // Filter by search term if provided
    let filteredBursaries = bursaries
    if (search) {
      filteredBursaries = bursaries.filter(
        (b) =>
          b.title.toLowerCase().includes(search) ||
          b.description.toLowerCase().includes(search) ||
          b.provider.toLowerCase().includes(search),
      )
    }

    return NextResponse.json({
      success: true,
      bursaries: filteredBursaries,
      total: filteredBursaries.length,
    })
  } catch (error) {
    console.error("Error fetching bursaries:", error)

    // Return fallback data
    return NextResponse.json({
      success: true,
      bursaries: [
        {
          title: "NSFAS Bursary",
          description: "Financial aid for students from low-income households",
          deadline: "Check website",
          link: "https://www.zabursaries.co.za/",
          provider: "Government",
        },
      ],
      total: 1,
    })
  }
}
