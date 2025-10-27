import { NextResponse } from "next/server"
import { getNetworkTime } from "@/lib/time-sync"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const tz = url.searchParams.get("tz") || "Africa/Johannesburg"
  try {
    const { networkTime, source } = await getNetworkTime()
    const serverTime = new Date()
    const driftMs = networkTime.getTime() - serverTime.getTime()

    return NextResponse.json({
      success: true,
      networkTimeUtc: networkTime.toISOString(),
      serverLocalTimeUtc: serverTime.toISOString(),
      driftMs,
      source,
      timezone: tz,
    })
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err?.message || "Failed to synchronize time",
    }, { status: 500 })
  }
}