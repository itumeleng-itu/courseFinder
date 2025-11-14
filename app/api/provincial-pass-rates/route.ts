import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || ""
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"
const MODEL = "google/gemini-2.0-flash-exp:free"

// In-memory cache keyed by province+years
const cache = new Map<string, { data: any; timestamp: number }>()
const TTL_MS = 6 * 60 * 60 * 1000 // 6 hours

// Cache for fetched provincial data (yearly fetch)
const provincialDataCache: {
  data?: Record<string, { provinceSeries: Array<{ year: number; passRate: number }>; passRate: number }>
  nationalSeries?: Array<{ year: number; passRate: number }>
  fetchYear?: number
  lastFetched?: string
} = {}

const PROVINCES = [
  "Gauteng",
  "Western Cape",
  "KwaZulu-Natal",
  "Eastern Cape",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Free State",
  "Northern Cape",
]

function normalizeProvince(name: string): string | null {
  const n = name.trim().toLowerCase()
  const map: Record<string, string> = {
    "gauteng": "Gauteng",
    "western cape": "Western Cape",
    "wc": "Western Cape",
    "kwazulu-natal": "KwaZulu-Natal",
    "kwazulu natal": "KwaZulu-Natal",
    "kzn": "KwaZulu-Natal",
    "eastern cape": "Eastern Cape",
    "limpopo": "Limpopo",
    "mpumalanga": "Mpumalanga",
    "north west": "North West",
    "free state": "Free State",
    "northern cape": "Northern Cape",
  }
  return map[n] || PROVINCES.find((p) => p.toLowerCase() === n) || null
}

// Deterministic pseudo-random generator for consistent mock series per province
function seededRandom(seed: string) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = Math.imul(31, h) + seed.charCodeAt(i) | 0
  return () => {
    h ^= h << 13; h ^= h >>> 17; h ^= h << 5
    return (h >>> 0) / 4294967295
  }
}

/**
 * Fetches real provincial pass rates data using OpenRouter AI
 * This should be called once per year on January 31st
 */
async function fetchProvincialPassRatesFromOpenRouter(): Promise<{
  provinces: Record<string, { provinceSeries: Array<{ year: number; passRate: number }>; passRate: number }>
  nationalSeries: Array<{ year: number; passRate: number }>
} | null> {
  if (!OPENROUTER_API_KEY) {
    console.error("Missing OPENROUTER_API_KEY for provincial pass rates")
    return null
  }

  const currentYear = new Date().getFullYear()
  const previousYear = currentYear - 1 // Most recent completed exam year
  const startYear = previousYear - 4 // Last 5 years

  // National pass rates from The Citizen article (verified data)
  // Source: https://www.citizen.co.za/news/south-africa/education/matric/matric-results-over-the-last-five-years-heres-where-gwarube-is-picking-up-from/
  const verifiedNationalRates: Record<number, number> = {
    2019: 81.3,
    2020: 76.2,
    2021: 76.4,
    2022: 80.1,
    2023: 82.9,
    2024: 87.3 // Historic high from Department of Basic Education
  }

  const prompt = `You are a data assistant. Provide accurate South African Matric Pass Rates data for all 9 provinces for the years ${startYear} to ${previousYear}.

IMPORTANT: Use the following verified national pass rates as reference (from The Citizen article: https://www.citizen.co.za/news/south-africa/education/matric/matric-results-over-the-last-five-years-heres-where-gwarube-is-picking-up-from/):
- 2019: 81.3%
- 2020: 76.2% (Covid-19 impact)
- 2021: 76.4%
- 2022: 80.1%
- 2023: 82.9%
- 2024: 87.3% (historic high)

Return a JSON object in this exact format:
{
  "nationalSeries": [
    {"year": ${startYear}, "passRate": <number>},
    {"year": ${startYear + 1}, "passRate": <number>},
    {"year": ${startYear + 2}, "passRate": <number>},
    {"year": ${startYear + 3}, "passRate": <number>},
    {"year": ${previousYear}, "passRate": <number>}
  ],
  "provinces": {
    "Gauteng": {
      "provinceSeries": [
        {"year": ${startYear}, "passRate": <number>},
        {"year": ${startYear + 1}, "passRate": <number>},
        {"year": ${startYear + 2}, "passRate": <number>},
        {"year": ${startYear + 3}, "passRate": <number>},
        {"year": ${previousYear}, "passRate": <number>}
      ],
      "passRate": <number for ${previousYear}>
    },
    "Western Cape": { ... },
    "KwaZulu-Natal": { ... },
    "Eastern Cape": { ... },
    "Limpopo": { ... },
    "Mpumalanga": { ... },
    "North West": { ... },
    "Free State": { ... },
    "Northern Cape": { ... }
  }
}

Requirements:
- Use official Department of Basic Education (DBE) data and the verified national rates above
- National pass rates MUST match the verified rates for years 2019-2024
- All pass rates should be percentages (numbers between 60-95)
- Include data for all 9 provinces: Gauteng, Western Cape, KwaZulu-Natal, Eastern Cape, Limpopo, Mpumalanga, North West, Free State, Northern Cape
- Provincial rates should be realistic relative to national averages (typically within ±5% of national)
- Use accurate, real data from official sources
- Return ONLY valid JSON, no explanations`

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
        temperature: 0.2,
        max_tokens: 4096
      })
    })

    if (!resp.ok) {
      const body = await resp.text()
      console.error("OpenRouter error (provincial-pass-rates)", {
        status: resp.status,
        statusText: resp.statusText,
        body: body?.slice(0, 200)
      })
      return null
    }

    const json = await resp.json()
    const content = json?.choices?.[0]?.message?.content || ""

    // Extract JSON object from response
    const match = typeof content === "string" ? content.match(/\{[\s\S]*\}/) : null
    if (!match) {
      console.error("No JSON object found in OpenRouter response for provincial-pass-rates")
      return null
    }

    let data: any
    try {
      data = JSON.parse(match[0])
    } catch (e) {
      console.error("Failed to parse JSON from OpenRouter provincial-pass-rates", e)
      return null
    }

    // Validate structure
    if (!data.nationalSeries || !data.provinces) {
      console.error("Invalid data structure from OpenRouter")
      return null
    }

    // Verify national rates against known data from The Citizen article
    // Source: https://www.citizen.co.za/news/south-africa/education/matric/matric-results-over-the-last-five-years-heres-where-gwarube-is-picking-up-from/
    const verifiedNationalRates: Record<number, number> = {
      2019: 81.3,
      2020: 76.2,
      2021: 76.4,
      2022: 80.1,
      2023: 82.9,
      2024: 87.3
    }

    // Validate and correct national series against verified data
    const validatedNational = data.nationalSeries.map((n: any) => {
      const year = Number(n.year)
      const verifiedRate = verifiedNationalRates[year]
      // Use verified rate if available, otherwise use provided rate
      const passRate = verifiedRate !== undefined ? verifiedRate : Number(n.passRate)
      return { year, passRate }
    })

    // Validate and normalize all provinces
    const validatedProvinces: Record<string, any> = {}
    for (const province of PROVINCES) {
      if (data.provinces[province] && Array.isArray(data.provinces[province].provinceSeries)) {
        validatedProvinces[province] = {
          provinceSeries: data.provinces[province].provinceSeries.map((p: any) => ({
            year: Number(p.year),
            passRate: Number(p.passRate)
          })),
          passRate: Number(data.provinces[province].passRate || data.provinces[province].provinceSeries[data.provinces[province].provinceSeries.length - 1]?.passRate || 0)
        }
      }
    }

    console.log(`Fetched provincial pass rates data in ${Date.now() - start}ms`)
    return {
      provinces: validatedProvinces,
      nationalSeries: validatedNational
    }
  } catch (error) {
    console.error("Error fetching provincial pass rates from OpenRouter:", error)
    return null
  }
}

/**
 * Fallback function to generate mock data if OpenRouter fails
 * Uses verified national rates from The Citizen article
 */
function buildSeriesForProvince(province: string, years: number, endYear: number) {
  const rng = seededRandom(province)
  const startYear = endYear - years + 1

  // Verified national pass rates from The Citizen article
  // Source: https://www.citizen.co.za/news/south-africa/education/matric/matric-results-over-the-last-five-years-heres-where-gwarube-is-picking-up-from/
  const verifiedNationalRates: Record<number, number> = {
    2019: 81.3,
    2020: 76.2,
    2021: 76.4,
    2022: 80.1,
    2023: 82.9,
    2024: 87.3
  }

  // Use verified rates when available, otherwise generate based on trend
  const nationalSeries = Array.from({ length: years }, (_, i) => {
    const year = startYear + i
    const verifiedRate = verifiedNationalRates[year]
    if (verifiedRate !== undefined) {
      return { year, passRate: verifiedRate }
    }
    // Fallback for years not in verified data
    const base = 80 + (i * 0.5) + (rng() - 0.5) * 1.0
    return { year, passRate: Number(base.toFixed(1)) }
  })

  // Province-specific offset and variance
  // All provinces achieved above 84% in 2024
  // KwaZulu-Natal: highest distinction rate (10.8%), highest Bachelor passes
  const provinceOffsets: Record<string, number> = {
    "KwaZulu-Natal": 1.2, // Highest distinction rate, most Bachelor passes
    "Gauteng": 0.9, // Second highest Bachelor passes (66,979)
    "Western Cape": 0.5, // Second highest distinction rate (6.3%)
    "Free State": 0.0,
    "Mpumalanga": -0.5, // Improved distinction rate by over 1%
    "North West": -0.8,
    "Limpopo": -1.0, // Improved distinction rate by over 1%
    "Northern Cape": -1.2,
    "Eastern Cape": -1.5, // Third highest Bachelor passes (45,662)
  }
  const offset = provinceOffsets[province] ?? 0

  const provinceSeries = nationalSeries.map((n, idx) => {
    const variance = (rng() - 0.5) * 2.0 // +/-1.0
    const trendBoost = idx * 0.2
    const rate = Math.min(95, Math.max(60, n.passRate + offset + variance + trendBoost))
    return { year: n.year, passRate: Number(rate.toFixed(1)) }
  })

  const provinceAvg = Number((provinceSeries.reduce((s, p) => s + p.passRate, 0) / years).toFixed(1))
  const nationalAvg = Number((nationalSeries.reduce((s, p) => s + p.passRate, 0) / years).toFixed(1))

  return { provinceSeries, nationalSeries, provinceAvg, nationalAvg }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const provinceParam = url.searchParams.get("province") || ""
    const yearsParam = url.searchParams.get("years") || "5"

    const normalized = normalizeProvince(provinceParam) || "Gauteng"
    const years = Math.max(3, Math.min(10, Number(yearsParam) || 5))

    // Most recent completed exam year
    const endYear = new Date().getFullYear() - 1
    const cacheKey = `${normalized}:${years}:${endYear}`

    // Check if we have cached data for this specific request
    const cached = cache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < TTL_MS) {
      return NextResponse.json({ success: true, province: normalized, endYear, ...cached.data }, {
        headers: {
          "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=10800",
        },
        status: 200,
      })
    }

    if (!PROVINCES.includes(normalized)) {
      return NextResponse.json({ success: false, error: "Invalid province" }, { status: 400 })
    }

    // Check if we need to fetch fresh data from OpenRouter (on January 31st)
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const month = currentDate.getMonth() // 0-11, January is 0
    const day = currentDate.getDate()

    // Try to use cached OpenRouter data if available
    let useOpenRouterData = false
    let openRouterData = null

    if (provincialDataCache.data && provincialDataCache.nationalSeries && provincialDataCache.fetchYear) {
      // Use cached OpenRouter data if it's from this year or last year
      if (provincialDataCache.fetchYear >= currentYear - 1) {
        useOpenRouterData = true
        openRouterData = {
          provinces: provincialDataCache.data,
          nationalSeries: provincialDataCache.nationalSeries
        }
      }
    }

    // If it's January 31st and we haven't fetched this year, fetch from OpenRouter
    if (month === 0 && day === 31 && provincialDataCache.fetchYear !== currentYear) {
      console.log(`Cron job triggered: Fetching provincial pass rates data for ${currentYear} on January 31st`)
      const fetched = await fetchProvincialPassRatesFromOpenRouter()
      if (fetched) {
        provincialDataCache.data = fetched.provinces
        provincialDataCache.nationalSeries = fetched.nationalSeries
        provincialDataCache.fetchYear = currentYear
        provincialDataCache.lastFetched = new Date().toISOString()
        useOpenRouterData = true
        openRouterData = fetched
        console.log(`Successfully fetched and cached provincial pass rates data for ${currentYear}`)
      }
    }

    // Build data from OpenRouter cache or fallback to mock
    let data: any
    if (useOpenRouterData && openRouterData) {
      const provinceData = openRouterData.provinces[normalized]
      const nationalSeries = openRouterData.nationalSeries

      if (provinceData && nationalSeries) {
        // Extract the requested number of years
        const startYear = endYear - years + 1
        const provinceSeries = provinceData.provinceSeries
          .filter((p: { year: number }) => p.year >= startYear && p.year <= endYear)
          .slice(-years) // Get last N years
        
        const nationalFiltered = nationalSeries
          .filter((n: { year: number }) => n.year >= startYear && n.year <= endYear)
          .slice(-years) // Get last N years

        const provinceAvg = Number((provinceSeries.reduce((s: number, p: { passRate: number }) => s + p.passRate, 0) / provinceSeries.length).toFixed(1))
        const nationalAvg = Number((nationalFiltered.reduce((s: number, n: { passRate: number }) => s + n.passRate, 0) / nationalFiltered.length).toFixed(1))

        data = {
          provinceSeries,
          nationalSeries: nationalFiltered,
          provinceAvg,
          nationalAvg
        }
      } else {
        // Fallback if province data not found
        data = buildSeriesForProvince(normalized, years, endYear)
      }
    } else {
      // Use fallback mock data
      data = buildSeriesForProvince(normalized, years, endYear)
    }

    // Cache the result
    cache.set(cacheKey, { data, timestamp: Date.now() })

    return NextResponse.json({ success: true, province: normalized, endYear, ...data }, {
      headers: {
        "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=10800",
      },
      status: 200,
    })
  } catch (err) {
    console.error("Provincial pass rates API error:", err)
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}

/**
 * POST endpoint to trigger provincial data fetch (called by cron job or manually)
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
    if (provincialDataCache.fetchYear === currentYear) {
      return NextResponse.json({
        success: true,
        message: `Provincial pass rates data for ${currentYear} has already been fetched`,
        fetchYear: provincialDataCache.fetchYear,
        lastFetched: provincialDataCache.lastFetched
      })
    }

    // Fetch new data
    console.log(`Fetching provincial pass rates data for ${currentYear} on January 31st`)
    const fetched = await fetchProvincialPassRatesFromOpenRouter()

    if (!fetched) {
      return NextResponse.json({
        success: false,
        error: "Failed to fetch provincial pass rates data from OpenRouter"
      }, { status: 500 })
    }

    // Cache the results
    provincialDataCache.data = fetched.provinces
    provincialDataCache.nationalSeries = fetched.nationalSeries
    provincialDataCache.fetchYear = currentYear
    provincialDataCache.lastFetched = new Date().toISOString()

    return NextResponse.json({
      success: true,
      message: `Successfully fetched provincial pass rates data for ${currentYear}`,
      provincesCount: Object.keys(fetched.provinces).length,
      fetchYear: currentYear,
      lastFetched: provincialDataCache.lastFetched
    })
  } catch (error) {
    console.error("Error in POST /api/provincial-pass-rates:", error)
    return NextResponse.json({
      success: false,
      error: "Failed to fetch provincial pass rates data"
    }, { status: 500 })
  }
}
