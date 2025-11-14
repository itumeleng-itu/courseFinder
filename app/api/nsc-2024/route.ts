import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// Source: SAnews.gov.za - "Class of 2024 achieves historic pass rate"
// https://www.sanews.gov.za/south-africa/class-2024-achieves-historic-pass-rate
const DBE_ARTICLE_URL = "https://www.sanews.gov.za/south-africa/class-2024-achieves-historic-pass-rate"

// 24h cache
const cache: { data?: any; ts?: number } = {}
const TTL_MS = 24 * 60 * 60 * 1000

const FALLBACK = {
  year: 2024,
  passRate: 87.3, // Official 2024 pass rate - highest in history (up from 82.9% in 2023)
  passes: 615_429, // Total learners who passed
  wrote: 705_291, // Full-time candidates who wrote
  failed: 89_862, // Calculated: wrote - passes
  bachelorPasses: 337_158, // 47.8% of candidates qualified for Bachelor studies
  bachelorPassRate: 47.8, // Percentage who qualified for Bachelor studies
  distinctions: 319_651, // Total distinctions achieved
  source: "Department of Basic Education - 2024 NSC Results (SAnews.gov.za)",
}

export async function GET() {
  try {
    if (cache.data && cache.ts && Date.now() - cache.ts < TTL_MS) {
      return NextResponse.json(
        { success: true, ...cache.data },
        {
          headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200" },
          status: 200,
        },
      )
    }

    const resp = await fetch(DBE_ARTICLE_URL, { next: { revalidate: 86400 } })
    if (!resp.ok) {
      console.warn("DBE fetch failed for NSC 2024", { status: resp.status })
      return NextResponse.json(
        { success: true, ...FALLBACK, _note: "API error; served fallback" },
        {
          headers: { "Cache-Control": "public, s-maxage=3600" },
          status: 200,
        },
      )
    }

    const html = await resp.text()

    // Try to extract pass rate (e.g., "overall pass rate ... to 82.2%")
    const passRateMatch = html.match(/pass rate[^%]*?(\d{2,3}\.\d)%/i)
    // Try to extract total passes (e.g., "A total of 505,868 learners passed")
    const passesMatch = html.match(/total\s+of\s+([\d,]+)\s+learners\s+passed/i)

    const passRate = passRateMatch ? Number.parseFloat(passRateMatch[1]) : FALLBACK.passRate
    const passes = passesMatch ? Number.parseInt(passesMatch[1].replace(/,/g, ""), 10) : FALLBACK.passes

    // Compute wrote using passRate and passes. If page later exposes wrote explicitly, prefer that.
    let wrote = Math.round(passes / (passRate / 100))

    // If the article contains an explicit "registered learners who sat" number that is clearly the wrote count, try to use it.
    const satDenominatorMatch = html.match(
      /representing\s+(\d{1,3})%\s+of\s+registered\s+learners\s*$$(?:i\.e\.)?\s*([\d,]+)$$/i,
    )
    const explicitRegisteredMatch = html.match(/registered\s+learners\s+who\s+sat[^\d]*([\d,]+)/i)

    if (explicitRegisteredMatch) {
      const val = Number.parseInt(explicitRegisteredMatch[1].replace(/,/g, ""), 10)
      // Use only if it does not wildly contradict passes/passRate (guard with 10% tolerance)
      const derived = wrote
      const diff = Math.abs(val - derived) / derived
      if (diff < 0.1) {
        wrote = val
      }
    }

    const failed = wrote - passes

    const data = { year: 2024, passRate, passes, wrote, failed, source: DBE_ARTICLE_URL }
    cache.data = data
    cache.ts = Date.now()

    return NextResponse.json(
      { success: true, ...data },
      {
        headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200" },
        status: 200,
      },
    )
  } catch (e) {
    console.error("NSC 2024 API error", e)
    return NextResponse.json(
      { success: true, ...FALLBACK, _note: "Unhandled error; served fallback" },
      {
        headers: { "Cache-Control": "public, s-maxage=3600" },
        status: 200,
      },
    )
  }
}
