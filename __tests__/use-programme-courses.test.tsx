/**
 * The behaviour the hook exists for, rather than the fetch it wraps:
 * nothing is requested until a card is opened, the same programme is
 * fetched once however many cards show it, a 404 reads as "not
 * published" rather than as a failure, and a network blip does not make
 * the courses permanently unavailable for the rest of the session.
 */
import { renderHook, waitFor } from "@testing-library/react"
import {
  useProgrammeCourses,
  clearProgrammeCourseCache,
} from "@/hooks/use-programme-courses"

const DETAIL = {
  institution: "wits",
  qualification_code: "CBA10",
  name: "Bachelor of Commerce in Information Systems",
  streams: [{
    name: null, source_page: 51, curriculum_notes: [], transcription_withheld: null,
    curriculum: { first_year: [{ choice: false, name: "Business Accounting I", options: null }] },
  }],
}

const ok = () => ({ ok: true, status: 200, json: async () => DETAIL })
const notFound = () => ({ ok: false, status: 404, json: async () => ({ detail: "Not Found" }) })

beforeEach(() => {
  clearProgrammeCourseCache()
  ;(global.fetch as jest.Mock).mockReset()
})

describe("useProgrammeCourses", () => {
  it("fetches nothing while the card is closed", () => {
    renderHook(() => useProgrammeCourses("wits", "CBA10", { enabled: false }))
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it("fetches the course list once the card opens", async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue(ok())

    const { result } = renderHook(() => useProgrammeCourses("wits", "CBA10"))

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.detail?.qualification_code).toBe("CBA10")
    expect(result.current.error).toBeNull()
    const [url] = (global.fetch as jest.Mock).mock.calls[0]
    expect(url).toBe("/api/programmes/wits/CBA10/")
  })

  it("fetches one programme once, however many cards ask for it", async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue(ok())

    const a = renderHook(() => useProgrammeCourses("wits", "CBA10"))
    const b = renderHook(() => useProgrammeCourses("wits", "CBA10"))
    await waitFor(() => expect(a.result.current.loading).toBe(false))
    await waitFor(() => expect(b.result.current.loading).toBe(false))

    expect((global.fetch as jest.Mock).mock.calls.length).toBe(1)
    expect(b.result.current.detail?.name).toBe(DETAIL.name)
  })

  it("reports a missing course list as unavailable, not as an error", async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue(notFound())

    const { result } = renderHook(() => useProgrammeCourses("wits", "ABA00"))

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.unavailable).toBe(true)
    expect(result.current.error).toBeNull()
    expect(result.current.detail).toBeNull()
  })

  it("lets a failed fetch be retried instead of caching the failure", async () => {
    // A single network blip must not make the courses unavailable for
    // the rest of the session with no way to retry.
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error("ECONNRESET"))

    const first = renderHook(() => useProgrammeCourses("wits", "CBA10"))
    await waitFor(() => expect(first.result.current.error).toBeTruthy())

    ;(global.fetch as jest.Mock).mockResolvedValue(ok())
    const second = renderHook(() => useProgrammeCourses("wits", "CBA10"))

    await waitFor(() => expect(second.result.current.loading).toBe(false))
    expect(second.result.current.detail?.qualification_code).toBe("CBA10")
  })

  it("keeps caching a 404, which is a stable fact rather than a blip", async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue(notFound())

    const a = renderHook(() => useProgrammeCourses("wits", "ABA00"))
    await waitFor(() => expect(a.result.current.unavailable).toBe(true))
    const b = renderHook(() => useProgrammeCourses("wits", "ABA00"))
    await waitFor(() => expect(b.result.current.unavailable).toBe(true))

    expect((global.fetch as jest.Mock).mock.calls.length).toBe(1)
  })

  it("passes the academic year through, and keys the cache on it", async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue(ok())

    renderHook(() => useProgrammeCourses("wits", "CBA10", { academicYear: 2027 }))
    await waitFor(() => expect(global.fetch).toHaveBeenCalled())
    expect((global.fetch as jest.Mock).mock.calls[0][0])
      .toBe("/api/programmes/wits/CBA10/?academic_year=2027")

    renderHook(() => useProgrammeCourses("wits", "CBA10", { academicYear: 2028 }))
    await waitFor(() => expect((global.fetch as jest.Mock).mock.calls.length).toBe(2))
  })
})
