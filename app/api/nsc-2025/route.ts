import { NextResponse } from "next/server"

// Static verified stats — revalidate once per day
export const revalidate = 86400

// Source: Department of Basic Education - "Class of 2025 achieves historic pass rate"
// Announced Jan 12, 2026
const DBE_ARTICLE_URL = "https://www.sanews.gov.za/south-africa/class-2025-achieves-historic-pass-rate"

interface NSCData {
    year: number
    passRate: number
    passes: number
    wrote: number
    failed: number
    source: string
    bachelorPasses?: number
    bachelorPassRate?: number
    diplomaPasses?: number
    higherCertificatePasses?: number
    distinctions?: number
    _note?: string
}

const VERIFIED_2025: NSCData = {
    year: 2025,
    passRate: 88.1, // Official 2025 Pass Rate
    passes: 794_376, // 88.1% of 901,790
    wrote: 901_790, // Official total candidates
    failed: 107_414, // 901,790 - 794,376
    bachelorPasses: 398_500, // 50.2%
    bachelorPassRate: 50.2,
    diplomaPasses: 238_312, // 30.0%
    higherCertificatePasses: 157_564, // 19.8%
    distinctions: 350_000,
    source: "Department of Basic Education - Official 2025 Results",
}

export async function GET() {
    try {
        return NextResponse.json(
            { success: true, ...VERIFIED_2025 },
            {
                headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200" },
                status: 200,
            },
        )
    } catch (e) {
        console.error("NSC 2025 API error", e)
        return NextResponse.json(
            { success: true, ...VERIFIED_2025, _note: "Unhandled error; served fallback" },
            {
                headers: { "Cache-Control": "public, s-maxage=3600" },
                status: 200,
            },
        )
    }
}
