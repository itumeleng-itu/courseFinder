/**
 * Server-side proxy to the CourseFind data/qualify API's POST /v1/qualify.
 *
 * Why a proxy instead of calling the API directly from the browser: the
 * API (coursefind-data) has no CORS configuration, and adding one is out
 * of scope for this change (frontend-only). A same-origin Next.js route
 * calling it server-side sidesteps CORS entirely -- the browser only
 * ever talks to this app's own origin, exactly like every other external
 * integration here (see app/api/chat/route.ts, app/api/bursaries/route.ts).
 * This also keeps QUALIFY_API_URL out of the client bundle.
 *
 * This route does no matching logic of its own -- it forwards the
 * request body verbatim and returns the response verbatim. All subject-
 * requirement evaluation (including the Home Language / First Additional
 * Language distinction that the old local checkSubjectRequirements got
 * wrong for BEd Foundation Phase, BEd isiZulu, and LLB) happens in
 * coursefind-data's evaluator.py, once, correctly.
 */
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const QUALIFY_API_URL = process.env.QUALIFY_API_URL || "http://localhost:8000"

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON" }, { status: 400 })
  }

  let upstream: Response
  try {
    upstream = await fetch(`${QUALIFY_API_URL}/v1/qualify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    })
  } catch (error) {
    console.error("[qualify proxy] could not reach coursefind-data API:", error)
    return NextResponse.json(
      { error: "The course-matching service is unreachable. Please try again shortly." },
      { status: 502 },
    )
  }

  const payload = await upstream.json().catch(() => null)
  if (!upstream.ok) {
    console.error("[qualify proxy] upstream error", upstream.status, payload)
    return NextResponse.json(
      { error: "The course-matching service rejected the request.", detail: payload },
      { status: upstream.status },
    )
  }

  return NextResponse.json(payload)
}
