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
import { log } from "@/lib/log"
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

/** One line of a programme's course list, which is one of two things:
 *
 *     compulsory   { choice: false, name: "Business Accounting I" }
 *     a choice     { choice: true,  options: ["Economics IB", "Economic Theory IA"] }
 *
 * A choice is ONE requirement with several ways to satisfy it, which is
 * why it arrives as a single entry carrying `options` rather than as
 * several entries. Rendering the options as separate courses would turn
 * an "X or Y" in the prospectus into two compulsory courses -- a wrong
 * course list, not merely an untidy one. Use `choice` to branch; do not
 * flatten. */
export interface CourseRequirement {
  choice: boolean
  name: string | null
  options: string[] | null
}

/** One stream (major/specialisation) of a programme and its courses.
 *
 * `name` is null when the programme has a single stream -- there is
 * nothing to distinguish it from. When a programme has several, every
 * one is named, and each was read from its own prospectus page.
 *
 * `curriculum` is keyed by the stage the prospectus organises courses
 * under, usually a year of study: "first_year", "second_year", ... Treat
 * the keys as data, not as a fixed enum -- a programme can run to a
 * sixth year, and a stage need not be a year at all. */
export interface ProgrammeStream {
  name: string | null
  source_page: number | null
  curriculum: Record<string, CourseRequirement[]>
  curriculum_notes: string[]
  /** Set only when the prospectus page DOES print a course list that was
   * deliberately not transcribed. Null otherwise. Lets a client say "not
   * available yet" rather than implying the programme has no courses. */
  transcription_withheld: string | null
}

export interface ProgrammeDetail {
  institution: string
  academic_year: number
  qualification_code: string
  name: string
  faculty: string | null
  campus: string[]
  duration_years: number | null
  extended: boolean
  selection_notes: string[]
  career_text: string | null
  /** Empty for a programme whose course list has not been transcribed,
   * which is NOT the same as a programme with no courses. */
  streams: ProgrammeStream[]
  source_doc: string | null
  source_page: number | null
  confidence: string
}

export class QualifyApiError extends Error {}

/** Thrown when the API has no course list for a programme -- the common
 * case, not a fault, so it is a distinct type callers can treat as "not
 * available yet" instead of as an error to report. */
export class ProgrammeNotFoundError extends QualifyApiError {}

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
        log.warn(`[qualify-api] no API slug for subject "${s.name}" -- omitted from request`)
        return null
      }
      return { subject: slug, percentage: Math.round(s.percentage) }
    })
    .filter((s): s is { subject: string; percentage: number } => s !== null)
}

export interface FetchQualificationOptions {
  academicYear?: number
  institutions?: string[]
  /** Ask the API for programmes the learner did NOT get into but failed
   * two or fewer requirements on. Defaults to FALSE, and should stay
   * that way unless something is actually going to render them.
   *
   * Measured against the live API: for a learner who qualifies for
   * nothing -- the case where the bucket sounds most useful -- near
   * misses are 30 of the response's 41 KB, 73% of a payload that is
   * then discarded. For a strong learner it is 7 of 40 KB. Compute is
   * negligible either way (~0.4 ms); the cost is bandwidth, paid on
   * every search by every learner.
   *
   * Note that "near" counts UNMET REQUIREMENTS, not distance: a
   * programme missed by 13 APS points is a near miss because it failed
   * on one front, while one missed by a point on three fronts is not.
   * Anything built on this bucket needs to sort by margin itself. */
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
        include_near_misses: options.includeNearMisses ?? false,
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

/** Fetches ONE programme's course lists, via this app's own
 * /api/programmes proxy. Call it when a learner asks to see the courses
 * behind a card -- not up front for every result, which is the whole
 * reason /v1/qualify omits them.
 *
 * Throws ProgrammeNotFoundError when the API has no course list for the
 * programme (the common case: most are not transcribed yet) and
 * QualifyApiError for anything else. */
export async function fetchProgrammeDetail(
  institution: string,
  qualificationCode: string,
  academicYear?: number,
): Promise<ProgrammeDetail> {
  // Trailing slash before the query string, to match next.config.js's
  // trailingSlash: true -- without it every call eats a 308 redirect,
  // the same reason fetchQualification posts to "/api/qualify/".
  const path =
    `/api/programmes/${encodeURIComponent(institution)}` +
    `/${encodeURIComponent(qualificationCode)}/` +
    (academicYear ? `?academic_year=${academicYear}` : "")

  let response: Response
  try {
    response = await fetch(path)
  } catch (error) {
    throw new QualifyApiError("Could not reach the course-matching service.", { cause: error })
  }

  if (response.status === 404) {
    throw new ProgrammeNotFoundError(
      `No course list is available for ${institution} ${qualificationCode}.`,
    )
  }
  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new QualifyApiError(
      body?.error || `Course-matching service returned ${response.status}.`,
    )
  }

  return response.json() as Promise<ProgrammeDetail>
}

/** Flattens one stream's curriculum into ordered [stage, courses] pairs,
 * so a component can render the years in the order the prospectus prints
 * them rather than whatever order the JSON object happens to iterate in.
 *
 * Stages not in the known list sort last, alphabetically, instead of
 * being dropped -- an unrecognised stage is a reason to show it in an
 * odd position, never a reason to hide courses the learner would take. */
const STAGE_ORDER = [
  "first_year", "second_year", "third_year",
  "fourth_year", "fifth_year", "sixth_year",
]

export function orderedStages(
  stream: ProgrammeStream,
): [string, CourseRequirement[]][] {
  const rank = (k: string) => {
    const i = STAGE_ORDER.indexOf(k)
    return i === -1 ? STAGE_ORDER.length : i
  }
  return Object.entries(stream.curriculum).sort(([a], [b]) =>
    rank(a) - rank(b) || a.localeCompare(b),
  )
}

/** "first_year" -> "First Year". */
export function stageLabel(stage: string): string {
  return stage
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

/** How many courses a stream holds, counting a choice as the one
 * requirement it is rather than as each of its options. */
export function countCourses(stream: ProgrammeStream): number {
  return Object.values(stream.curriculum).reduce((n, list) => n + list.length, 0)
}
