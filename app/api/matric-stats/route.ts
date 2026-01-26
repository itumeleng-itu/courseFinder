import { NextResponse } from "next/server"
import { modelConfig, type ModelType } from "@/lib/model-config"
import { FALLBACK_DATA } from "@/data/fallback-matric-stats"
import { fetchMatricStatsWithGoogleSearch } from "@/lib/matric-stats-utils"

export const dynamic = "force-dynamic"

const cache: { data?: typeof FALLBACK_DATA; year?: number; lastFetched?: string; source?: string } = {}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const requestedModel = searchParams.get("model") as ModelType | null
    const forceRefresh = searchParams.get("refresh") === "true"
    const currentYear = new Date().getFullYear()

    if (cache.data && cache.year === currentYear && !forceRefresh) {
      return NextResponse.json({ success: true, stats: cache.data, _metadata: { source: cache.source, timestamp: new Date().toISOString() } },
        { headers: { "Cache-Control": "public, s-maxage=31536000" } })
    }

    const config = modelConfig.getModelConfig(requestedModel || undefined)
    const fetched = await fetchMatricStatsWithGoogleSearch(config.name)
    const statsData = fetched || FALLBACK_DATA

    cache.data = statsData
    cache.year = currentYear
    cache.lastFetched = new Date().toISOString()
    cache.source = fetched ? config.displayName : "Fallback"

    return NextResponse.json({ success: true, stats: statsData, _metadata: { source: cache.source, year: currentYear } },
      { headers: { "Cache-Control": "public, s-maxage=31536000" } })
  } catch (error) {
    return NextResponse.json({ success: true, stats: cache.data || FALLBACK_DATA, _metadata: { source: "Error Fallback" } })
  }
}

export async function POST(request: Request) {
  const adminSecret = process.env.ADMIN_SECRET
  if (adminSecret && request.headers.get("authorization") !== `Bearer ${adminSecret}`) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  cache.data = undefined; cache.year = undefined
  return NextResponse.json({ success: true, message: "Cache cleared" })
}
