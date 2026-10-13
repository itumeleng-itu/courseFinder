/**
 * @jest-environment node
 */
import { NextRequest } from "next/server"
import { GET } from "@/app/api/programmes/[institution]/[code]/route"

function mockUpstream(response: { ok?: boolean; status?: number; jsonBody: unknown }) {
  ;(global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: response.ok ?? true,
    status: response.status ?? 200,
    json: async () => response.jsonBody,
  })
}

const params = (institution: string, code: string) =>
  ({ params: Promise.resolve({ institution, code }) })

const req = (url = "http://localhost/api/programmes/wits/CBA10/") =>
  new NextRequest(url)

const DETAIL = {
  institution: "wits",
  qualification_code: "CBA10",
  name: "Bachelor of Commerce in Information Systems",
  streams: [{
    name: null, source_page: 51, curriculum_notes: [], transcription_withheld: null,
    curriculum: { first_year: [{ choice: false, name: "Business Accounting I", options: null }] },
  }],
}

describe("GET /api/programmes/[institution]/[code]", () => {
  it("forwards to the API's own /v1/programmes detail route", async () => {
    mockUpstream({ jsonBody: DETAIL })

    await GET(req(), params("wits", "CBA10"))

    const [url] = (global.fetch as jest.Mock).mock.calls[0]
    expect(url).toMatch(/\/v1\/programmes\/wits\/CBA10$/)
  })

  it("forwards academic_year rather than defaulting it here", async () => {
    // Hardcoding a year in the proxy would 404 every programme the day
    // the data moves to 2028. The API's own default is the latest year
    // with data, so an absent year must stay absent.
    mockUpstream({ jsonBody: DETAIL })

    await GET(
      req("http://localhost/api/programmes/wits/CBA10/?academic_year=2027"),
      params("wits", "CBA10"),
    )

    const [url] = (global.fetch as jest.Mock).mock.calls[0]
    expect(url).toMatch(/\?academic_year=2027$/)
  })

  it("sends no query string when no year is asked for", async () => {
    mockUpstream({ jsonBody: DETAIL })

    await GET(req(), params("wits", "CBA10"))

    const [url] = (global.fetch as jest.Mock).mock.calls[0]
    expect(url).not.toContain("?")
  })

  it("returns the course list verbatim, including the choice shape", async () => {
    // The load-bearing assertion: a `choice` entry carrying `options`
    // must arrive intact. Flattening it into separate courses would turn
    // an "X or Y" in the prospectus into two compulsory courses.
    const withChoice = {
      ...DETAIL,
      streams: [{
        ...DETAIL.streams[0],
        curriculum: {
          first_year: [
            { choice: false, name: "Business Accounting I", options: null },
            { choice: true, name: null, options: ["Economics IB", "Economic Theory IA"] },
          ],
        },
      }],
    }
    mockUpstream({ jsonBody: withChoice })

    const response = await GET(req(), params("wits", "CBA10"))

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual(withChoice)
  })

  it("marks the response cacheable -- it depends on nothing the learner typed", async () => {
    mockUpstream({ jsonBody: DETAIL })

    const response = await GET(req(), params("wits", "CBA10"))

    expect(response.headers.get("Cache-Control")).toMatch(/max-age=\d+/)
  })

  it("passes a 404 through, because most programmes have no course list yet", async () => {
    mockUpstream({ ok: false, status: 404, jsonBody: { detail: "Not Found" } })

    const response = await GET(req(), params("wits", "NOPE"))

    expect(response.status).toBe(404)
  })

  it("returns 502 when the API is unreachable, without throwing", async () => {
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error("ECONNREFUSED"))

    const response = await GET(req(), params("wits", "CBA10"))

    expect(response.status).toBe(502)
    expect((await response.json()).error).toMatch(/unreachable/i)
  })

  it("url-encodes a code with characters that would break the path", async () => {
    mockUpstream({ jsonBody: DETAIL })

    await GET(req(), params("wits", "CB A/10"))

    const [url] = (global.fetch as jest.Mock).mock.calls[0]
    expect(url).toContain("CB%20A%2F10")
  })
})
