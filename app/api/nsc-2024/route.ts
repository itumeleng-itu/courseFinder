import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// Source: DBE article "Historic NSC pass rate reflects the continued upward trajectory of the education system"
// https://www.education.gov.za/ArchivedDocuments/ArchivedArticles/HistoricNSCpassrate.aspx
const DBE_ARTICLE_URL = "https://www.education.gov.za/ArchivedDocuments/ArchivedArticles/HistoricNSCpassrate.aspx"

// Optional corroborating source (Minister's speech on gov.za)
const GOVZA_SPEECH_URL = "https://www.gov.za/speeches/minister-siviwe-gwarube-release-2024-national-senior-certificate-results-13-jan-2025"

// 24h cache
const cache: { data?: any; ts?: number } = {}
const TTL_MS = 24 * 60 * 60 * 1000

// Fallback based on DBE figures in the article above
const FALLBACK = {
  year: 2024,
  passRate: 87.3, // percent
  passes: 615_429,
  wrote: Math.round(615_429 / 0.873),
  failed: Math.round(615_429 / 0.873) - 615_429,
  registered: Math.round(615_429 / 0.873),
  bachelorPercent: 47.8,
  bachelorPasses: 337_158,
  // Diploma pass data (estimated based on typical distribution)
  diplomaPercent: 26.4,
  diplomaPasses: 186_000,
  // Higher Certificate pass data (estimated based on typical distribution)
  hcPercent: 13.1,
  hcPasses: 92_271,
  // Source information
  source: DBE_ARTICLE_URL
}

export async function GET() {
  try {
    if (cache.data && cache.ts && Date.now() - cache.ts < TTL_MS) {
      return NextResponse.json({ success: true, ...cache.data }, {
        headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200" },
        status: 200
      })
    }

    const resp = await fetch(DBE_ARTICLE_URL, { next: { revalidate: 86400 } })
    if (!resp.ok) {
      console.warn("DBE fetch failed for NSC 2024", { status: resp.status })
      return NextResponse.json({ success: true, ...FALLBACK, _note: "API error; served fallback" }, {
        headers: { "Cache-Control": "public, s-maxage=3600" },
        status: 200
      })
    }

    const html = await resp.text()

    // Try to extract pass rate (e.g., "overall pass rate ... to 87.3%")
    const passRateMatch = html.match(/pass rate[^%]*?(\d{2,3}\.\d)%/i)
    // Try to extract total passes (e.g., "A total of 615,429 learners passed")
    const passesMatch = html.match(/total\s+of\s+([\d,]+)\s+learners\s+passed/i)

    const passRate = passRateMatch ? parseFloat(passRateMatch[1]) : FALLBACK.passRate
    const passes = passesMatch ? parseInt(passesMatch[1].replace(/,/g, ""), 10) : FALLBACK.passes

    // Compute wrote using passRate and passes. If page later exposes wrote explicitly, prefer that.
    let wrote = Math.round(passes / (passRate / 100))
    let registered = wrote

    // If the article contains an explicit "registered learners who sat" number that is clearly the wrote count, try to use it.
    const satDenominatorMatch = html.match(/representing\s+(\d{1,3})%\s+of\s+registered\s+learners\s*\((?:i\.e\.)?\s*([\d,]+)\)/i)
    const explicitRegisteredMatch = html.match(/registered\s+learners\s+who\s+sat[^\d]*([\d,]+)/i)

    if (explicitRegisteredMatch) {
      const val = parseInt(explicitRegisteredMatch[1].replace(/,/g, ""), 10)
      const derived = wrote
      const diff = Math.abs(val - derived) / derived
      if (diff < 0.1) {
        wrote = val
      }
    }

    // Try to capture total registered learners from the denominator, if present
    if (satDenominatorMatch && satDenominatorMatch[2]) {
      const denom = parseInt(satDenominatorMatch[2].replace(/,/g, ""), 10)
      if (Number.isFinite(denom) && denom > 0) {
        registered = denom
      }
    }

    const failed = wrote - passes

    // Attempt to extract Bachelor percentage (e.g., "47.8% qualified for admission to Bachelor")
    const bachelorPctMatch = html.match(/(\d{1,2}\.\d)\s*%[^%]*Bachelor/i)
    const bachelorPercent = bachelorPctMatch ? parseFloat(bachelorPctMatch[1]) : FALLBACK.bachelorPercent

    // Attempt to extract Diploma percentage (e.g., "26.4% achieved a Diploma pass")
    const diplomaPctMatch = html.match(/(\d{1,2}\.\d)\s*%[^%]*Diploma/i)
    const diplomaPercent = diplomaPctMatch ? parseFloat(diplomaPctMatch[1]) : FALLBACK.diplomaPercent

    // Attempt to extract Higher Certificate percentage (e.g., "13.1% achieved a Higher Certificate pass")
    const hcPctMatch = html.match(/(\d{1,2}\.\d)\s*%[^%]*Higher Certificate/i)
    const hcPercent = hcPctMatch ? parseFloat(hcPctMatch[1]) : FALLBACK.hcPercent

    // Compute passes where possible from wrote
    const bachelorPasses = typeof bachelorPercent === "number" && Number.isFinite(wrote)
      ? Math.round((bachelorPercent / 100) * wrote)
      : FALLBACK.bachelorPasses
    const diplomaPasses = typeof diplomaPercent === "number" && Number.isFinite(wrote)
      ? Math.round((diplomaPercent / 100) * wrote)
      : FALLBACK.diplomaPasses
    const hcPasses = typeof hcPercent === "number" && Number.isFinite(wrote)
      ? Math.round((hcPercent / 100) * wrote)
      : FALLBACK.hcPasses

    const data = {
      year: 2024,
      passRate,
      passes,
      wrote,
      failed,
      registered,
      bachelorPercent,
      bachelorPasses,
      diplomaPercent,
      diplomaPasses,
      hcPercent,
      hcPasses,
      source: DBE_ARTICLE_URL,
      _corroborating: GOVZA_SPEECH_URL
    }
    cache.data = data
    cache.ts = Date.now()

    return NextResponse.json({ success: true, ...data }, {
      headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200" },
      status: 200
    })
  } catch (e) {
    console.error("NSC 2024 API error", e)
    return NextResponse.json({ success: true, ...FALLBACK, _note: "Unhandled error; served fallback" }, {
      headers: { "Cache-Control": "public, s-maxage=3600" },
      status: 200
    })
  }
}