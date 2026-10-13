/**
 * @jest-environment node
 *
 * Needs real network access: jsdom does not wire fetch to the network,
 * and this suite talks to a running coursefind-data API.
 */
/**
 * End-to-end against a LIVE coursefind-data API carrying the Wits 2027
 * extraction, through the frontend's OWN client.
 *
 * Nothing about the request or the response parsing is reimplemented
 * here: fetchQualification does the subject-name -> slug mapping, builds
 * the body and validates the response. Only the transport is stood in
 * for -- global.fetch forwards "/api/qualify/" to the real service the
 * same way app/api/qualify/route.ts does server-side.
 *
 * lib/qualify-api.ts says its types "mirror coursefind-data's Pydantic
 * response models field-for-field. Keep them in sync if that contract
 * changes -- there is no shared schema package between the two repos."
 * Nothing enforced that. This does.
 */
import {
  fetchQualification,
  fetchCoveredInstitutions,
  type QualifyProgrammeResult,
} from "@/lib/qualify-api"
import type { Subject } from "@/app/find-course/types"

const API = process.env.LIVE_QUALIFY_API_URL ?? "http://127.0.0.1:8099"

// jest.setup.js replaces global.fetch with a mock for every suite, so a
// real request needs its own transport. Node's http module is the one
// thing the setup cannot stand in front of.
import * as http from "http"

function nodeFetch(url: string, init?: any): Promise<any> {
  const target = new URL(url)
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: target.hostname,
        port: target.port,
        path: target.pathname + target.search,
        method: init?.method ?? "GET",
        headers: init?.headers ?? {},
      },
      (res) => {
        let data = ""
        res.on("data", (c) => (data += c))
        res.on("end", () =>
          resolve({
            ok: (res.statusCode ?? 500) < 400,
            status: res.statusCode,
            json: async () => JSON.parse(data),
            text: async () => data,
          }),
        )
      },
    )
    req.on("error", reject)
    if (init?.body) req.write(init.body)
    req.end()
  })
}

/** jest.setup.js's mock, put back afterwards -- nodeFetch below is a
 * transport, not the global fetch, and leaving it installed would hand
 * the next suite a fetch that talks to a real port. */
const originalFetch = global.fetch

beforeAll(() => {
  // Stand in for the Next.js proxy routes, which forward verbatim.
  global.fetch = ((input: any, init?: any) => {
    const url = typeof input === "string" ? input : input.url
    if (url.startsWith("/api/qualify/meta")) return nodeFetch(`${API}/v1/meta`, init)
    if (url.startsWith("/api/qualify")) return nodeFetch(`${API}/v1/qualify`, init)
    return nodeFetch(input, init)
  }) as typeof fetch
})
afterAll(() => { global.fetch = originalFetch })

// Subject names exactly as a learner picks them in the UI, not slugs.
const CERT = [
  { name: "IsiZulu Home Language", percentage: 77 },
  { name: "English First Additional Language", percentage: 75 },
  { name: "Mathematics", percentage: 8 },
  { name: "Life Orientation", percentage: 83 },
  { name: "Geography", percentage: 72 },
  { name: "History", percentage: 78 },
  { name: "Life Sciences", percentage: 50 },
] as unknown as Subject[]

describe("live API, Wits 2027", () => {
  it("reports wits among the covered institutions", async () => {
    const covered = await fetchCoveredInstitutions()
    expect(covered.has("wits")).toBe(true)
  })

  it("accepts the UI's own subject names and scores them as the prospectus does", async () => {
    const body = await fetchQualification(CERT, {
      academicYear: 2027, institutions: ["wits"],
    })
    expect(body.scores.wits).toBe(33)
    expect(body.evaluated_count).toBe(60)
  })

  it("returns results the card renderer can read without falling back", async () => {
    // includeNearMisses is opted into here, against the app's default:
    // this checks the SHAPE of a programme result, and this certificate
    // qualifies for nothing, so near misses are the only sample of that
    // shape available. The app itself does not ask for them.
    const body = await fetchQualification(CERT, {
      academicYear: 2027, institutions: ["wits"], includeNearMisses: true,
    })
    const all: QualifyProgrammeResult[] = [...body.qualified, ...body.near_misses]
    expect(all.length).toBeGreaterThan(0)
    for (const r of all) {
      // every field hooks/use-course-matcher.ts's toCourseMatch touches
      expect(typeof r.institution).toBe("string")
      expect(typeof r.qualification_code).toBe("string")
      expect(r.name.trim().length).toBeGreaterThan(3)
      expect(Array.isArray(r.campus)).toBe(true)
      expect(r.faculty === null || typeof r.faculty === "string").toBe(true)
      expect(r.duration_years === null || typeof r.duration_years === "number").toBe(true)
      expect(typeof r.score_actual).toBe("number")
      expect(Array.isArray(r.selection_notes)).toBe(true)
      expect(Array.isArray(r.failures)).toBe(true)
    }
  })

  it("gives a learner a reason, not just a rejection", async () => {
    // Also opted in: the reasons are what a future "what would get you
    // in" screen would be built from, so the API must keep producing
    // them even though nothing renders them today.
    const body = await fetchQualification(CERT, {
      academicYear: 2027, institutions: ["wits"], includeNearMisses: true,
    })
    expect(body.near_misses.length).toBeGreaterThan(0)
    for (const r of body.near_misses) {
      expect(r.failures.length).toBeGreaterThan(0)
      for (const f of r.failures) {
        expect(typeof f.message).toBe("string")
        expect(f.message.length).toBeGreaterThan(10)
      }
    }
  })

  it("serves Wits course lists through the programmes endpoint", async () => {
    const list = await (await nodeFetch(
      `${API}/v1/programmes?institution=wits&with_curriculum=true`)).json()
    expect(list.length).toBe(57)

    const detail = await (await nodeFetch(`${API}/v1/programmes/wits/EFA03`)).json()
    expect(detail.streams.map((s: any) => s.name))
      .toEqual(["Electrical Engineering", "Information Engineering"])

    const courses = detail.streams.flatMap(
      (s: any) => Object.values(s.curriculum).flat()) as any[]
    expect(courses.length).toBeGreaterThan(80)
    expect(courses.some((c) => c.name === "Data Structures and Algorithms")).toBe(true)
    // the fusion that used to be served in its place
    expect(courses.some((c) => c.name === "Data Structures and Electronics I")).toBe(false)
  })
})
