/**
 * Client for CourseFind's actual admission-rules engine (coursefind-data,
 * POST /v1/qualify), called through this app's own /api/qualify proxy
 * (see app/api/qualify/route.ts for why it's a proxy, not a direct call).
 *
 * This REPLACES the local matching that used to live in
 * app/find-course/utils.ts's checkSubjectRequirements for the main
 * university course list. That local logic could not correctly express
 * "English Home Language level 5 OR First Additional Language level 6"
 * (it required both simultaneously) or "a second, unspecified language"
 * (LLB's "Additional Language" requirement matched no real subject at
 * all) -- both are handled correctly server-side by evaluator.py, which
 * this app no longer needs to reimplement.
 *
 * The types below mirror coursefind-data/api/src/app/main.py's Pydantic
 * response models field-for-field. Keep them in sync if that contract
 * changes -- there is no shared schema package between the two repos.
 */
import type { Subject as SubjectEntry } from "@/app/find-course/types"
import { toSubjectSlug } from "@/lib/subject-slugs"

export interface QualifyFailure {
  kind: string
  message: string
  required_level: number | null
  actual_level: number | null
}

export interface QualifyProgrammeResult {
  institution: string
  qualification_code: string
  name: string
  faculty: string | null
  campus: string[]
  duration_years: number | null
  score_required: number | null
  score_actual: number
  margin: number | null
  selection_notes: string[]
  failures: QualifyFailure[]
}

export interface QualifyUnscoreableResult {
  institution: string
  qualification_code: string
  name: string
  faculty: string | null
  campus: string[]
  duration_years: number | null
  selection_notes: string[]
}

export interface QualifyResponse {
  scores: Record<string, number>
  qualified: QualifyProgrammeResult[]
  near_misses: QualifyProgrammeResult[]
  requires_additional_assessment: QualifyUnscoreableResult[]
  evaluated_count: number
}

export interface QualifyMetaResponse {
  data_version: string
  academic_years: number[]
  institutions: Record<string, number[]>
  programme_count: number
}

export class QualifyApiError extends Error {}

/** Which institution ids the API actually has data for right now (e.g.
 * `{"uj"}`) -- NOT hardcoded, because the set grows over time as more
 * institutions are onboarded (see coursefind-data's own migration plan).
 * Callers use this to decide, per institution, whether to trust the API's
 * main course list or fall back to this app's local data -- without it,
 * every institution the API doesn't cover yet would silently lose its main
 * course list the moment the API integration is used unconditionally.
 *
 * Returns an empty set on any failure (network error, non-2xx, malformed
 * JSON) rather than throwing -- an unreachable API should degrade to "treat
 * every institution as locally-sourced," the same behaviour as before this
 * integration existed, not to a blank result for institutions no one has
 * confirmed the API covers. */
export async function fetchCoveredInstitutions(): Promise<Set<string>> {
  try {
    const response = await fetch("/api/qualify/meta/")
    if (!response.ok) return new Set()
    const meta = (await response.json()) as QualifyMetaResponse
    return new Set(Object.keys(meta.institutions ?? {}))
  } catch (error) {
    console.error("[qualify-api] could not fetch /v1/meta -- treating no institution as API-covered:", error)
    return new Set()
  }
}

/** Drops any subject this app's slug table can't translate, rather than
 * sending the API a value it won't recognise. In practice this should
 * never happen -- lib/subject-slugs.ts asserts completeness against the
 * dropdown at import time -- but a request must never silently 422 on a
 * malformed subject the user had no way to avoid picking. */
function toApiSubjects(subjects: SubjectEntry[]): { subject: string; percentage: number }[] {
  return subjects
    .map((s) => {
      const slug = toSubjectSlug(s.name)
      if (!slug) {
        console.warn(`[qualify-api] no API slug for subject "${s.name}" -- omitted from request`)
        return null
      }
      return { subject: slug, percentage: Math.round(s.percentage) }
    })
    .filter((s): s is { subject: string; percentage: number } => s !== null)
}

export interface FetchQualificationOptions {
  academicYear?: number
  institutions?: string[]
  includeNearMisses?: boolean
}

/** Calls /v1/qualify (via this app's own /api/qualify proxy) for one
 * learner's subjects. Throws QualifyApiError on any failure -- network,
 * a non-2xx response, or fewer than 6 translatable subjects (the API's
 * own minimum) -- callers decide how to surface that to the user. */
export async function fetchQualification(
  subjects: SubjectEntry[],
  options: FetchQualificationOptions = {},
): Promise<QualifyResponse> {
  const apiSubjects = toApiSubjects(subjects)
  if (apiSubjects.length < 6) {
    throw new QualifyApiError(
      `At least 6 recognised subjects are required (have ${apiSubjects.length}).`,
    )
  }

  let response: Response
  try {
    // Trailing slash matches next.config.js's trailingSlash: true --
    // without it, every call eats an extra 308-redirect round trip
    // (confirmed directly: POSTing "/api/qualify" redirects to
    // "/api/qualify/" here, same as every other route in this app).
    response = await fetch("/api/qualify/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subjects: apiSubjects,
        academic_year: options.academicYear,
        institutions: options.institutions,
        include_near_misses: options.includeNearMisses ?? true,
      }),
    })
  } catch (error) {
    throw new QualifyApiError("Could not reach the course-matching service.", { cause: error })
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new QualifyApiError(
      body?.error || `Course-matching service returned ${response.status}.`,
    )
  }

  return response.json() as Promise<QualifyResponse>
}
