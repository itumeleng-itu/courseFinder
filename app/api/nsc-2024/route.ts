import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// Source: DBE article "Historic NSC pass rate reflects the continued upward trajectory of the education system"
// https://www.education.gov.za/ArchivedDocuments/ArchivedArticles/HistoricNSCpassrate.aspx
const DBE_ARTICLE_URL = "https://www.education.gov.za/ArchivedDocuments/ArchivedArticles/HistoricNSCpassrate.aspx"

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

    // If the article contains an explicit "registered learners who sat" number that is clearly the wrote count, try to use it.
    // Pattern example: "registered learners who sat for the 2024 NSC examination, 697,502 are social grant beneficiaries, representing 79% of registered learners"
    // The first figure (e.g., 697,502) is beneficiaries; the denominator may also appear (e.g., 882,336), but is "registered" not necessarily "wrote".
    const satDenominatorMatch = html.match(/representing\s+(\d{1,3})%\s+of\s+registered\s+learners\s*\((?:i\.e\.)?\s*([\d,]+)\)/i)
    const explicitRegisteredMatch = html.match(/registered\s+learners\s+who\s+sat[^\d]*([\d,]+)/i)

    if (explicitRegisteredMatch) {
      const val = parseInt(explicitRegisteredMatch[1].replace(/,/g, ""), 10)
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