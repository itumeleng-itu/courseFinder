import { fetchQualification, fetchCoveredInstitutions, QualifyApiError, QualifyResponse } from "@/lib/qualify-api"
import type { SubjectEntry } from "@/lib/types"

function mockFetchOnce(response: Partial<Response> & { jsonBody?: unknown }) {
  ;(global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: response.ok ?? true,
    status: response.status ?? 200,
    json: async () => response.jsonBody ?? {},
  })
}

const SEVEN_SUBJECTS: SubjectEntry[] = [
  { id: "1", name: "English Home Language", percentage: 65 },
  { id: "2", name: "Mathematics", percentage: 55 },
  { id: "3", name: "Physical Sciences", percentage: 50 },
  { id: "4", name: "Life Sciences", percentage: 70 },
  { id: "5", name: "Geography", percentage: 60 },
  { id: "6", name: "Afrikaans First Additional Language", percentage: 52 },
  { id: "7", name: "Life Orientation", percentage: 80 },
]

const EMPTY_RESPONSE: QualifyResponse = {
  scores: {}, qualified: [], near_misses: [], requires_additional_assessment: [], evaluated_count: 0,
}

describe("fetchQualification", () => {
  it("sends subjects translated to API slugs, not display names", async () => {
    mockFetchOnce({ jsonBody: EMPTY_RESPONSE })
    await fetchQualification(SEVEN_SUBJECTS)

    const [, init] = (global.fetch as jest.Mock).mock.calls[0]
    const body = JSON.parse(init.body)
    const sentSlugs = body.subjects.map((s: { subject: string }) => s.subject)
    expect(sentSlugs).toEqual([
      "english_hl", "mathematics", "physical_sciences", "life_sciences",
      "geography", "afrikaans_fal", "life_orientation",
    ])
  })

  it("calls this app's own /api/qualify proxy, never the external API directly", async () => {
    mockFetchOnce({ jsonBody: EMPTY_RESPONSE })
    await fetchQualification(SEVEN_SUBJECTS)
    const [url] = (global.fetch as jest.Mock).mock.calls[0]
    // Trailing slash: this project's next.config.js sets trailingSlash:
    // true, so the bare path would 308-redirect on every single request.
    expect(url).toBe("/api/qualify/")
  })

  it("rounds percentages to the nearest integer (the API expects int 0-100)", async () => {
    mockFetchOnce({ jsonBody: EMPTY_RESPONSE })
    await fetchQualification([{ id: "1", name: "Mathematics", percentage: 65.7 }, ...SEVEN_SUBJECTS.slice(1)])
    const [, init] = (global.fetch as jest.Mock).mock.calls[0]
    const body = JSON.parse(init.body)
    expect(body.subjects[0].percentage).toBe(66)
  })

  it("drops a subject with no known API slug rather than sending garbage", async () => {
    mockFetchOnce({ jsonBody: EMPTY_RESPONSE })
    const withUnknown: SubjectEntry[] = [
      ...SEVEN_SUBJECTS,
      { id: "8", name: "Underwater Basket Weaving", percentage: 90 },
    ]
    await fetchQualification(withUnknown)
    const [, init] = (global.fetch as jest.Mock).mock.calls[0]
    const body = JSON.parse(init.body)
    expect(body.subjects).toHaveLength(7)
  })

  it("throws QualifyApiError without ever calling fetch when fewer than 6 subjects translate", async () => {
    await expect(fetchQualification(SEVEN_SUBJECTS.slice(0, 3))).rejects.toBeInstanceOf(QualifyApiError)
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it("returns the parsed QualifyResponse on success", async () => {
    const response: QualifyResponse = {
      scores: { uj: 41 },
      qualified: [{
        institution: "uj", qualification_code: "B2M52Q", name: "Actuarial Science",
        faculty: "Science", campus: ["APK"], duration_years: 3,
        score_required: 40, score_actual: 41, margin: 1, selection_notes: [], failures: [],
      }],
      near_misses: [], requires_additional_assessment: [], evaluated_count: 29,
    }
    mockFetchOnce({ jsonBody: response })
    const result = await fetchQualification(SEVEN_SUBJECTS)
    expect(result).toEqual(response)
  })

  it("throws QualifyApiError with the proxy's error message on a non-2xx response", async () => {
    mockFetchOnce({ ok: false, status: 502, jsonBody: { error: "The course-matching service is unreachable." } })
    await expect(fetchQualification(SEVEN_SUBJECTS)).rejects.toThrow(
      "The course-matching service is unreachable.",
    )
  })

  it("throws QualifyApiError if fetch itself rejects (network failure)", async () => {
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error("network down"))
    await expect(fetchQualification(SEVEN_SUBJECTS)).rejects.toBeInstanceOf(QualifyApiError)
  })
})

describe("fetchCoveredInstitutions", () => {
  it("returns the institution ids the API reports in /v1/meta", async () => {
    mockFetchOnce({ jsonBody: { institutions: { uj: [2027], cput: [2027] } } })
    const result = await fetchCoveredInstitutions()
    expect(result).toEqual(new Set(["uj", "cput"]))
  })

  it("returns an empty set (not a throw) on a non-2xx response", async () => {
    mockFetchOnce({ ok: false, status: 502, jsonBody: { error: "unreachable" } })
    const result = await fetchCoveredInstitutions()
    expect(result).toEqual(new Set())
  })

  it("returns an empty set (not a throw) if fetch itself rejects", async () => {
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error("network down"))
    const result = await fetchCoveredInstitutions()
    expect(result).toEqual(new Set())
  })
})
