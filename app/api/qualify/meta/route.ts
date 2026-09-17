/**
 * Server-side proxy to the CourseFind data/qualify API's GET /v1/meta.
 *
 * Same reason as app/api/qualify/route.ts: the API has no CORS
 * configuration, so this must be called server-side.
 *
 * Used by lib/qualify-api.ts's fetchCoveredInstitutions() so the frontend
 * knows which institutions the API actually has data for, without
 * hardcoding "uj" -- see that function's docstring for why this matters:
 * without it, every institution the API doesn't cover yet loses its main
 * course list entirely instead of falling back to local matching.
 */
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const QUALIFY_API_URL = process.env.QUALIFY_API_URL || "http://localhost:8000"

export async function GET() {
  let upstream: Response
  try {
    upstream = await fetch(`${QUALIFY_API_URL}/v1/meta`, { cache: "no-store" })
  } catch (error) {
    console.error("[qualify meta proxy] could not reach coursefind-data API:", error)
    return NextResponse.json(
      { error: "The course-matching service is unreachable. Please try again shortly." },
      { status: 502 },
    )
  }

  const payload = await upstream.json().catch(() => null)
  if (!upstream.ok) {
    console.error("[qualify meta proxy] upstream error", upstream.status, payload)
    return NextResponse.json(
      { error: "The course-matching service rejected the request.", detail: payload },
      { status: upstream.status },
    )
  }

  return NextResponse.json(payload)
}
