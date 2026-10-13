/**
 * Fetches the courses behind one programme, on demand.
 *
 * WHY ON DEMAND
 * -------------
 * /v1/qualify returns up to ~90 programmes and carries no course lists.
 * Behind them sit ~1,700 courses. Fetching all of those up front would
 * mean ~90 requests, or one enormous response, for a learner who will
 * open two or three cards. So this hook does nothing until `enabled`
 * turns true -- pass the card's own open/expanded state.
 *
 * CACHING
 * -------
 * A module-level cache keyed by institution + code + year, shared by
 * every instance of the hook. A learner who opens a card, closes it and
 * opens it again makes one request, not three; and the same programme
 * appearing in two places on the page is fetched once. It is deliberately
 * not in state: the data is immutable for the life of the page (a
 * programme's courses change when the prospectus does), so there is
 * nothing to invalidate and nothing to re-render on.
 */
import { useEffect, useState } from "react"
import {
  fetchProgrammeDetail,
  ProgrammeNotFoundError,
  type ProgrammeDetail,
} from "@/lib/qualify-api"

const cache = new Map<string, Promise<ProgrammeDetail>>()

function key(institution: string, code: string, year?: number) {
  return `${institution}/${code}/${year ?? "latest"}`
}

/** Exported for tests, and for a client that needs a clean slate after
 * the data version changes under it. */
export function clearProgrammeCourseCache() {
  cache.clear()
}

export interface ProgrammeCoursesState {
  detail: ProgrammeDetail | null
  loading: boolean
  /** Set when the API has no course list for this programme -- the
   * common case, and not an error to report as a failure. A client
   * should say "not available yet", which is true, rather than
   * "something went wrong", which is not. */
  unavailable: boolean
  /** A real failure: unreachable service, or a non-404 response. */
  error: string | null
}

export function useProgrammeCourses(
  institution: string,
  qualificationCode: string,
  options: { enabled?: boolean; academicYear?: number } = {},
): ProgrammeCoursesState {
  const { enabled = true, academicYear } = options
  const [state, setState] = useState<ProgrammeCoursesState>({
    detail: null, loading: false, unavailable: false, error: null,
  })

  useEffect(() => {
    if (!enabled || !institution || !qualificationCode) return

    const k = key(institution, qualificationCode, academicYear)
    let promise = cache.get(k)
    if (!promise) {
      promise = fetchProgrammeDetail(institution, qualificationCode, academicYear)
      cache.set(k, promise)
      // A failed fetch must not be cached -- otherwise a single network
      // blip makes the courses permanently unavailable for the rest of
      // the session, with no way for the learner to retry. A 404 is
      // different: it is a stable fact about the data, so it stays
      // cached and a reopened card does not re-ask.
      promise.catch((e) => {
        if (!(e instanceof ProgrammeNotFoundError)) cache.delete(k)
      })
    }

    // Guards against the response of an abandoned fetch landing in the
    // state of a card that has since been pointed at another programme.
    let current = true
    setState({ detail: null, loading: true, unavailable: false, error: null })

    promise.then(
      (detail) => {
        if (current) setState({ detail, loading: false, unavailable: false, error: null })
      },
      (e: unknown) => {
        if (!current) return
        if (e instanceof ProgrammeNotFoundError) {
          setState({ detail: null, loading: false, unavailable: true, error: null })
        } else {
          setState({
            detail: null, loading: false, unavailable: false,
            error: e instanceof Error ? e.message : "Could not load the course list.",
          })
        }
      },
    )

    return () => { current = false }
  }, [enabled, institution, qualificationCode, academicYear])

  return state
}
