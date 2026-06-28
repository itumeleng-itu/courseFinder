import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// Matric stats change once a year at most — use ISR so the edge cache serves repeat requests
export const revalidate = 2592000 // 30 days

interface MatricStats {
  year: number
  totalWrote: number | string
  totalPassed: number
  passRate: number
  bachelorPasses: number
  bachelorPercentage: number
  diplomaPasses: number
  diplomaPercentage: number
  higherCertificatePasses: number
  higherCertificatePercentage: number
  lastUpdated: string
  source: string
  confidence: "high" | "medium" | "low"
}

const cache: {
  data?: MatricStats
  lastFetched?: number
  year?: number
} = {}

// Cache for 1 year - matric results are static once published
const CACHE_DURATION = 365 * 24 * 60 * 60 * 1000 // 1 year in milliseconds

/**
 * Compute national aggregate stats for a given year directly from the
 * DBE 2025 School Performance Report data (school-performance.json).
 * This file is the structured output of the vertopal-converted PDF.
 */
function computeStatsFromSchoolData(year: number): MatricStats | null {
  try {
    const filePath = path.join(process.cwd(), "data", "school-performance.json")
    const content = fs.readFileSync(filePath, "utf-8")
    const schools: Array<{
      results: Record<string, { wrote: string; achieved: string; percentage: string }>
    }> = JSON.parse(content)

    let totalWrote = 0
    let totalAchieved = 0
    const yearKey = String(year)

    for (const school of schools) {
      const result = school.results?.[yearKey]
      if (result) {
        totalWrote += parseInt(result.wrote, 10) || 0
        totalAchieved += parseInt(result.achieved, 10) || 0
      }
    }

    if (totalWrote === 0) return null

    const passRate = parseFloat(((totalAchieved / totalWrote) * 100).toFixed(1))

    // Pass-type breakdown from DBE 2025 NSC Examination Report (official published figures)
    const BACHELOR_PCT = 50.2
    const DIPLOMA_PCT = 30.0
    const HIGHER_CERT_PCT = 19.8

    return {
      year,
      totalWrote,
      totalPassed: totalAchieved,
      passRate,
      bachelorPasses: Math.round(totalAchieved * (BACHELOR_PCT / 100)),
      bachelorPercentage: BACHELOR_PCT,
      diplomaPasses: Math.round(totalAchieved * (DIPLOMA_PCT / 100)),
      diplomaPercentage: DIPLOMA_PCT,
      higherCertificatePasses: Math.round(totalAchieved * (HIGHER_CERT_PCT / 100)),
      higherCertificatePercentage: HIGHER_CERT_PCT,
      lastUpdated: "2026-01-13T00:00:00.000Z",
      source: `DBE 2025 School Performance Report (${schools.filter(s => s.results?.[yearKey]).length.toLocaleString()} schools)`,
      confidence: "high",
    }
  } catch {
    return null
  }
}

// Fallback — only used when school-performance.json is unavailable
const OFFICIAL_2025_STATS: MatricStats = {
  year: 2025,
  totalWrote: 901_790,
  totalPassed: 794_376,
  passRate: 88.1,
  bachelorPasses: 398_935,
  bachelorPercentage: 50.2,
  diplomaPasses: 238_313,
  diplomaPercentage: 30.0,
  higherCertificatePasses: 157_366,
  higherCertificatePercentage: 19.8,
  lastUpdated: "2026-01-13T00:00:00.000Z",
  source: "DBE Official (2025) — fallback",
  confidence: "high",
}

async function fetchLatestMatricStats(): Promise<MatricStats | null> {
  const strategies = [
    fetchFromSerperAPI,
    fetchFromNewsAPIs,
  ]

  for (const strategy of strategies) {
    try {
      const result = await strategy()
      if (result && validateStats(result)) {
        return result
      }
    } catch (error) {
      console.error(`Strategy failed:`, error)
      continue
    }
  }

  return null
}

// Strategy 1: Use Serper API for Google Search
async function fetchFromSerperAPI(): Promise<MatricStats | null> {
  const apiKey = process.env.SERPER_API_KEY
  if (!apiKey) {
    console.warn("SERPER_API_KEY not found")
    return null
  }

  try {
    const currentYear = new Date().getFullYear()
    const queries = [
      `South Africa NSC matric results ${currentYear} pass rate official DBE`,
      `matric results ${currentYear} South Africa statistics Department Basic Education`,
      `${currentYear} National Senior Certificate results South Africa`
    ]

    for (const query of queries) {
      const response = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          q: query,
          num: 15,
          gl: 'za' // South Africa geolocation
        })
      })

      if (!response.ok) {
        console.error(`Serper API error: ${response.status}`)
        continue
      }

      const data = await response.json()

      // Combine all text sources
      const organicText = data.organic?.map((r: any) =>
        `${r.title} ${r.snippet}`.toLowerCase()
      ).join(' ') || ''

      const answerBox = (data.answerBox?.answer || data.answerBox?.snippet || '').toLowerCase()
      const knowledgeGraph = (data.knowledgeGraph?.description || '').toLowerCase()

      // Get content from top results
      const topLinks = data.organic?.slice(0, 5).map((r: any) => r.link) || []

      const combinedText = `${answerBox} ${organicText} ${knowledgeGraph}`

      const extracted = extractStatsFromText(combinedText, currentYear, "Serper API")

      if (extracted && validateStats(extracted)) {
        console.log("Successfully extracted stats from Serper:", extracted)
        return extracted
      }
    }

    return null
  } catch (error) {
    console.error("Serper API error:", error)
    return null
  }
}

// Strategy 2: News APIs
async function fetchFromNewsAPIs(): Promise<MatricStats | null> {
  const newsApiKey = process.env.NEWS_API_KEY
  if (!newsApiKey) return null

  try {
    const currentYear = new Date().getFullYear()
    const query = `South Africa matric NSC results ${currentYear} pass rate`

    const response = await fetch(
      `https://newsdata.io/api/1/news?apikey=${newsApiKey}&q=${encodeURIComponent(query)}&country=za&language=en`
    )

    if (!response.ok) return null

    const data = await response.json()

    if (data.status === "error") {
      console.error("NewsData API error:", data.results?.message)
      return null
    }

    const articles = data.results || []

    // Combine article content
    const combinedText = articles
      .map((a: any) => `${a.title || ''} ${a.description || ''} ${a.content || ''}`.toLowerCase())
      .join(' ')

    return extractStatsFromText(combinedText, currentYear, "NewsData API")
  } catch (error) {
    console.error("News API error:", error)
    return null
  }
}

function extractStatsFromText(text: string, year: number, source: string): MatricStats | null {
  try {
    if (!text || text.length < 50) return null

    const cleanText = text.toLowerCase()

    // Extract total wrote
    const totalWroteNum = extractNumber(cleanText, [
      /(\d{3}[\s,]?\d{3})\s*(?:learners?|candidates?|pupils?)\s*(?:wrote|sat|registered)/,
      /(?:wrote|sat|registered)[:\s]*(\d{3}[\s,]?\d{3})/,
      /total.*?(?:candidates?|learners?)[:\s]*(\d{3}[\s,]?\d{3})/,
      /(\d{3}[\s,]?\d{3})\s*(?:wrote|sat)\s*(?:the)?\s*(?:nsc|matric)/
    ])

    // Extract pass rate
    const passRate = extractNumber(cleanText, [
      /pass\s*rate[:\s]*(\d{1,2}\.?\d*)\s*%/,
      /(\d{1,2}\.?\d*)\s*%\s*pass\s*rate/,
      /achieved[:\s]*(\d{1,2}\.?\d*)\s*%/,
      /passed.*?(\d{1,2}\.?\d*)\s*%/,
      /(\d{1,2}\.?\d*)\s*%.*?passed/
    ])

    // Extract total passed
    const totalPassed = extractNumber(cleanText, [
      /(\d{3}[\s,]?\d{3})\s*(?:learners?|candidates?|pupils?)\s*passed/,
      /passed[:\s]*(\d{3}[\s,]?\d{3})/,
      /(\d{3}[\s,]?\d{3})\s*successful/
    ])

    // Extract bachelor percentage
    const bachelorPct = extractNumber(cleanText, [
      /bachelor[:\s]*(\d{1,2}\.?\d*)\s*%/,
      /university\s*(?:entrance|exemption)[:\s]*(\d{1,2}\.?\d*)\s*%/,
      /(\d{1,2}\.?\d*)\s*%.*?bachelor/,
      /degree\s*(?:pass|entry)[:\s]*(\d{1,2}\.?\d*)\s*%/
    ])

    // Extract diploma percentage
    const diplomaPct = extractNumber(cleanText, [
      /diploma[:\s]*(\d{1,2}\.?\d*)\s*%/,
      /(\d{1,2}\.?\d*)\s*%.*?diploma/
    ])

    // Extract higher certificate percentage
    const higherCertPct = extractNumber(cleanText, [
      /higher\s*certificate[:\s]*(\d{1,2}\.?\d*)\s*%/,
      /(\d{1,2}\.?\d*)\s*%.*?higher\s*certificate/
    ])

    if (!totalWroteNum || !passRate) {
      console.warn("Missing critical stats - totalWrote or passRate")
      return null
    }

    // Calculate total passed if not found
    const calculatedPassed = totalPassed || Math.round(totalWroteNum * (passRate / 100))

    // Validate that totalPassed makes sense
    const expectedPassed = Math.round(totalWroteNum * (passRate / 100))
    if (totalPassed && Math.abs(totalPassed - expectedPassed) > (expectedPassed * 0.05)) {
      console.warn(`Mismatch: totalPassed=${totalPassed}, expected=${expectedPassed}`)
      // Use calculated value instead
    }

    const finalPassed = Math.round(totalWroteNum * (passRate / 100))

    const stats: MatricStats = {
      year,
      totalWrote: totalWroteNum > 900000 ? ">900000" : totalWroteNum,
      totalPassed: finalPassed,
      passRate,
      bachelorPasses: bachelorPct ? Math.round(finalPassed * (bachelorPct / 100)) : 0,
      bachelorPercentage: bachelorPct || 0,
      diplomaPasses: diplomaPct ? Math.round(finalPassed * (diplomaPct / 100)) : 0,
      diplomaPercentage: diplomaPct || 0,
      higherCertificatePasses: higherCertPct ? Math.round(finalPassed * (higherCertPct / 100)) : 0,
      higherCertificatePercentage: higherCertPct || 0,
      lastUpdated: new Date().toISOString(),
      source,
      confidence: calculateConfidence(totalWroteNum, passRate, bachelorPct ?? undefined, diplomaPct ?? undefined, higherCertPct ?? undefined)
    }

    console.log("Extracted stats:", stats)
    return stats
  } catch (error) {
    console.error("Error extracting stats:", error)
    return null
  }
}

function extractNumber(text: string, patterns: RegExp[]): number | null {
  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match) {
      const numStr = (match[1] || '').replace(/[\s,]/g, '')
      const num = parseFloat(numStr)
      if (!isNaN(num) && num > 0) {
        return num
      }
    }
  }
  return null
}

function calculateConfidence(
  totalWrote: number,
  passRate: number,
  bachelor?: number,
  diploma?: number,
  higherCert?: number
): "high" | "medium" | "low" {
  if (totalWrote > 0 && passRate > 0 && bachelor && diploma && higherCert) {
    return "high"
  }

  if (totalWrote > 0 && passRate > 0 && (bachelor || diploma)) {
    return "medium"
  }

  return "low"
}

function validateStats(stats: MatricStats): boolean {
  const wrote = typeof stats.totalWrote === 'string'
    ? parseFloat(stats.totalWrote.replace('>', ''))
    : stats.totalWrote

  // Reasonable range for SA matric candidates
  if (wrote < 700000 || wrote > 1000000) {
    console.warn(`Invalid totalWrote: ${wrote}`)
    return false
  }

  // Reasonable pass rate
  if (stats.passRate < 60 || stats.passRate > 95) {
    console.warn(`Invalid passRate: ${stats.passRate}`)
    return false
  }

  // Passed can't exceed wrote
  if (stats.totalPassed > wrote) {
    console.warn(`totalPassed (${stats.totalPassed}) > totalWrote (${wrote})`)
    return false
  }

  // Check if calculated pass rate matches
  const calculatedPassRate = (stats.totalPassed / wrote) * 100
  const rateDifference = Math.abs(calculatedPassRate - stats.passRate)

  if (rateDifference > 2) { // Allow 2% variance
    console.warn(`Pass rate mismatch: calculated=${calculatedPassRate.toFixed(1)}%, stated=${stats.passRate}%`)
    return false
  }

  // Validate breakdown percentages
  const totalBreakdown = stats.bachelorPercentage + stats.diplomaPercentage + stats.higherCertificatePercentage
  if (totalBreakdown > 0 && (totalBreakdown < 85 || totalBreakdown > 115)) {
    console.warn(`Invalid breakdown total: ${totalBreakdown}%`)
    return false
  }

  return true
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const forceRefresh = searchParams.get("refresh") === "true"
    const now = Date.now()
    const currentYear = new Date().getFullYear()

    // Invalidate cache if year has changed (new matric results expected)
    const yearChanged = cache.year && cache.year !== currentYear

    const cacheValid =
      cache.data &&
      cache.lastFetched &&
      cache.year === currentYear && // Must be same year
      (now - cache.lastFetched) < CACHE_DURATION &&
      !forceRefresh &&
      !yearChanged

    if (cacheValid) {
      return NextResponse.json({
        success: true,
        stats: cache.data,
        _metadata: {
          cached: true,
          cacheAge: Math.round((now - cache.lastFetched!) / 60000),
          cacheYear: cache.year,
          timestamp: new Date().toISOString()
        }
      }, {
        headers: {
          'Cache-Control': 'public, s-maxage=2592000, stale-while-revalidate=86400' // 30 days
        }
      })
    }

    if (!cacheValid || yearChanged) {
      console.log(yearChanged ? `New year detected (${currentYear}), refreshing stats...` : "Cache miss, computing matric stats...")
    }

    // Primary: compute directly from the DBE School Performance Report JSON
    const computedStats = computeStatsFromSchoolData(currentYear - 1) // results published for previous year

    if (computedStats) {
      cache.data = computedStats
      cache.lastFetched = now
      cache.year = currentYear

      return NextResponse.json({
        success: true,
        stats: computedStats,
        _metadata: {
          cached: false,
          source: "school-performance.json",
          year: currentYear - 1,
          timestamp: new Date().toISOString(),
        }
      }, {
        headers: {
          'Cache-Control': 'public, s-maxage=2592000, stale-while-revalidate=86400'
        }
      })
    }

    // Secondary: try external APIs for newer data
    const fetchedStats = await fetchLatestMatricStats()

    if (fetchedStats && fetchedStats.confidence !== "low") {
      cache.data = fetchedStats
      cache.lastFetched = now
      cache.year = currentYear

      return NextResponse.json({
        success: true,
        stats: fetchedStats,
        _metadata: {
          cached: false,
          freshFetch: true,
          confidence: fetchedStats.confidence,
          year: currentYear,
          timestamp: new Date().toISOString()
        }
      }, {
        headers: {
          'Cache-Control': 'public, s-maxage=2592000, stale-while-revalidate=86400'
        }
      })
    }

    const statsToReturn = cache.data || OFFICIAL_2025_STATS

    return NextResponse.json({
      success: true,
      stats: statsToReturn,
      _metadata: {
        cached: !!cache.data,
        fallback: !cache.data,
        note: cache.data ? "Using cached data" : "Using fallback official stats",
        year: cache.year || currentYear,
        timestamp: new Date().toISOString()
      }
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=2592000, stale-while-revalidate=86400'
      }
    })
  } catch (error) {
    console.error("API Error:", error)

    return NextResponse.json({
      success: true,
      stats: cache.data || OFFICIAL_2025_STATS,
      _metadata: {
        error: true,
        fallback: true,
        errorMessage: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString()
      }
    })
  }
}

export async function POST(request: Request) {
  const adminSecret = process.env.ADMIN_SECRET

  if (adminSecret && request.headers.get("authorization") !== `Bearer ${adminSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  cache.data = undefined
  cache.lastFetched = undefined

  return NextResponse.json({
    success: true,
    message: "Cache cleared successfully",
    timestamp: new Date().toISOString()
  })
}
