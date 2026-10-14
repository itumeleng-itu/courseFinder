/**
 * POST /api/qualify — admission matching, computed here.
 *
 * This used to proxy to a separately hosted coursefind-data API. It no
 * longer does: the rules engine is in lib/qualify and the dataset is in
 * data/qualify/programmes.json, both versioned in this repo. That
 * removes a second service to host and pay for, a network hop on every
 * search, and a cold start that reached a learner as a page that hung.
 *
 * The request and response shapes are unchanged, so lib/qualify-api.ts
 * and every caller above it work exactly as before.
 *
 * The matching logic itself is NOT reimplemented from the prospectus --
 * it is a line-by-line port of the Python, verified by a differential
 * test that runs both engines over the real certificates and thousands
 * of generated mark sets and compares every field, messages included.
 * See __tests__/engine-differential.test.ts.
 */
import { NextRequest, NextResponse } from "next/server"
import { runQualify } from "@/lib/qualify/engine"
import { PROGRAMMES, INSTITUTIONS_BY_ID } from "@/lib/qualify/data"
import { VALID_SUBJECTS } from "@/lib/qualify/subjects"

export const dynamic = "force-dynamic"

interface SubjectMark {
  subject: string
  percentage: number
}

/** Mirrors the Pydantic validation the API did, so a malformed request
 * is still refused rather than quietly scored on partial marks. */
function validate(body: any): string | null {
  if (!body || typeof body !== "object") return "Request body must be a JSON object"
  const subjects = body.subjects
  if (!Array.isArray(subjects)) return "subjects must be a list"
  if (subjects.length < 6) return "At least 6 subjects are required"
  if (subjects.length > 9) return "At most 9 subjects are allowed"
  for (const s of subjects) {
    if (!s || typeof s !== "object") return "Each subject must be an object"
    if (typeof s.subject !== "string" || !VALID_SUBJECTS.has(s.subject)) {
      return `Unknown subject '${s?.subject}'`
    }
    if (!Number.isInteger(s.percentage) || s.percentage < 0 || s.percentage > 100) {
      return `Percentage for '${s.subject}' must be a whole number from 0 to 100`
    }
  }
  return null
}

export async function POST(request: NextRequest) {
  let body: any
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON" }, { status: 400 })
  }

  const problem = validate(body)
  if (problem) {
    return NextResponse.json({ error: problem }, { status: 422 })
  }

  // Insertion order is preserved deliberately: the Wits scorer forces
  // required subjects into the counted set and then takes the best of
  // the rest, and the Python it was ported from iterates the marks dict
  // in request order.
  const marks: Record<string, number> = {}
  for (const s of body.subjects as SubjectMark[]) marks[s.subject] = s.percentage

  try {
    const result = runQualify(marks, PROGRAMMES, INSTITUTIONS_BY_ID, {
      academicYear: body.academic_year ?? null,
      institutions: body.institutions ?? null,
      includeNearMisses: body.include_near_misses ?? true,
    })
    return NextResponse.json(result)
  } catch (error) {
    console.error("[qualify] evaluation failed:", error)
    return NextResponse.json(
      { error: "The course-matching service failed to evaluate these marks." },
      { status: 500 },
    )
  }
}
