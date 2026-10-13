/**
 * Server-side proxy to the CourseFind data API's
 * GET /v1/programmes/{institution}/{code}.
 *
 * Same reason as app/api/qualify/route.ts: the API has no CORS
 * configuration, so it can only be called server-side, and this keeps
 * QUALIFY_API_URL out of the client bundle.
 *
 * WHY THIS ROUTE EXISTS
 * ---------------------
 * /v1/qualify answers "which programmes can this learner get into" and
 * deliberately carries no course lists -- inlining them would put ~1,700
 * courses into a response of ~90 programmes on every single search. So
 * the courses behind a programme live here, fetched one programme at a
 * time, only when a learner asks to see them.
 *
 * Without this route the course lists are unreachable from the browser:
 * they are in the data, loaded in memory, served by the API, and no
 * client ever asks for them.
 *
 * ON CACHING
 * ----------
 * Unlike /api/qualify, this response depends on nothing the learner
 * typed -- a programme's course list is the same for everyone and
 * changes only when the data version does. So it is cacheable, and is
 * cached for an hour at the edge. That matters because a learner
 * expanding five cards would otherwise make five uncached round trips
 * through this app to the API for data that cannot have changed between
 * them.
 */
import { NextRequest, NextResponse } from "next/server"

const QUALIFY_API_URL = process.env.QUALIFY_API_URL || "http://localhost:8000"

/** One hour, then revalidate. A programme's courses change when the
 * prospectus does, i.e. once a year. */
const CACHE_CONTROL = "public, max-age=3600, stale-while-revalidate=86400"

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ institution: string; code: string }> },
) {
  const { institution, code } = await context.params

  // Forwarded rather than defaulted: the API's own default is "the most
  // recent year with data", and hardcoding a year here would silently
  // 404 every programme the day the data moves to 2028.
  const year = request.nextUrl.searchParams.get("academic_year")
  const query = year ? `?academic_year=${encodeURIComponent(year)}` : ""
  const target =
    `${QUALIFY_API_URL}/v1/programmes` +
    `/${encodeURIComponent(institution)}/${encodeURIComponent(code)}${query}`

  let upstream: Response
  try {
    upstream = await fetch(target, { cache: "no-store" })
  } catch (error) {
    console.error("[programmes proxy] could not reach coursefind-data API:", error)
    return NextResponse.json(
      { error: "The course-matching service is unreachable. Please try again shortly." },
      { status: 502 },
    )
  }

  const payload = await upstream.json().catch(() => null)

  // A 404 here is an ordinary answer, not a fault: most programmes have
  // no transcribed course list yet. Passed through as-is so the client
  // can say "not available yet" rather than "something went wrong".
  if (!upstream.ok) {
    if (upstream.status !== 404) {
      console.error("[programmes proxy] upstream error", upstream.status, payload)
    }
    return NextResponse.json(
      { error: "No course list is available for this programme.", detail: payload },
      { status: upstream.status },
    )
  }

  return NextResponse.json(payload, { headers: { "Cache-Control": CACHE_CONTROL } })
}
