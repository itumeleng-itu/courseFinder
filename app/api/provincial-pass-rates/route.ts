import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// In-memory cache keyed by province+years
const cache = new Map<string, { data: any; timestamp: number }>()
const TTL_MS = 6 * 60 * 60 * 1000 // 6 hours

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

function buildSeriesForProvince(province: string, years: number, endYear: number) {
  const rng = seededRandom(province)
  const startYear = endYear - years + 1

  // Base national trend around low-80s with gentle variation
  const nationalSeries = Array.from({ length: years }, (_, i) => {
    const year = startYear + i
    const base = 80 + (i * 0.4) + (rng() - 0.5) * 1.2 // slight upward trend
    return { year, passRate: Number(base.toFixed(1)) }
  })

  // Province-specific offset and variance
  const provinceOffsets: Record<string, number> = {
    "Gauteng": 5.0,
    "Western Cape": 3.0,
    "Free State": 2.0,
    "North West": -1.0,
    "Mpumalanga": -0.5,
    "KwaZulu-Natal": -0.8,
    "Northern Cape": -1.5,
    "Limpopo": -3.0,
    "Eastern Cape": -5.0,
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

    const data = buildSeriesForProvince(normalized, years, endYear)

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
