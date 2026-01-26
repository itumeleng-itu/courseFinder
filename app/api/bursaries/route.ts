import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import {
    Bursary,
    getCurrentMonthKey,
    getCurrentMonthYear,
    isClosingInCurrentMonth,
    isBursaryClosed
} from "@/lib/bursary-utils"
import { FALLBACK_BURSARIES } from "@/data/fallback-bursaries"

export const dynamic = "force-dynamic"

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const genAI = GOOGLE_API_KEY ? new GoogleGenerativeAI(GOOGLE_API_KEY) : null

// In-memory cache for bursaries
const bursariesCache: {
    data?: Bursary[]
    lastFetched?: string
    fetchMonth?: string
} = {}

const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000 // 30 days

async function fetchBursariesWithGoogleSearch(): Promise<Bursary[] | null> {
    if (!genAI || !GOOGLE_API_KEY) return null

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })
        const { month, year } = getCurrentMonthYear()

        const prompt = `Search and extract undergraduate bursaries for ${month} ${year} from zabursaries.co.za and bursaries.co.za. 
        Return ONLY a JSON array of 55+ OPEN bursaries. Include id, title, provider, amount, eligibility (array), closingDate, field, link, and description.`

        const result = await model.generateContent(prompt)
        const text = result.response.text()
        const jsonMatch = text.match(/\[[\s\S]*\]/)
        if (!jsonMatch) return null

        let data = JSON.parse(jsonMatch[0]) as Bursary[]
        data = data.filter(b => b.id === "sources" || (!isBursaryClosed(b.closingDate) && isClosingInCurrentMonth(b.closingDate)))

        if (data.length < 50) return null

        if (!data.some(b => b.id === "sources")) {
            data.push({
                id: "sources",
                title: "📚 Bursary Data Sources & References",
                provider: "Multiple Verified Sources",
                amount: "N/A",
                eligibility: ["Aggregated from official SA platforms"],
                closingDate: "N/A",
                field: "Information",
                link: "https://www.zabursaries.co.za/",
                description: `Data sourced from ZA Bursaries and official websites for ${month} ${year}.`
            })
        }
        return data
    } catch (error) {
        console.error("Gemini fetch error:", error)
        return null
    }
}

export async function GET() {
    try {
        const now = Date.now()
        const currentMonth = getCurrentMonthKey()

        if (bursariesCache.data && bursariesCache.fetchMonth === currentMonth && bursariesCache.lastFetched &&
            now - new Date(bursariesCache.lastFetched).getTime() < CACHE_DURATION) {
            return NextResponse.json({ success: true, bursaries: bursariesCache.data, _metadata: { source: "Cached", count: bursariesCache.data.length } },
                { headers: { "Cache-Control": "public, s-maxage=2592000" } })
        }

        let fetchedData = await fetchBursariesWithGoogleSearch()
        const bursariesData = fetchedData || FALLBACK_BURSARIES

        bursariesCache.data = bursariesData
        bursariesCache.lastFetched = new Date().toISOString()
        bursariesCache.fetchMonth = currentMonth

        return NextResponse.json({
            success: true,
            bursaries: bursariesData,
            _metadata: {
                source: fetchedData ? "Live Search" : "Fallback Data",
                count: bursariesData.length,
            }
        }, { headers: { "Cache-Control": "public, s-maxage=2592000" } })
    } catch (error) {
        const data = bursariesCache.data || FALLBACK_BURSARIES
        return NextResponse.json({ success: true, bursaries: data, _metadata: { source: "Error Fallback", count: data.length } })
    }
}
