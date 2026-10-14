/**
 * @jest-environment node
 *
 * GET /api/programmes/[institution]/[code], now served from the bundled
 * dataset rather than proxied.
 *
 * The load-bearing assertion is not "returns 200". It is that a course
 * list which exists in the data arrives INTACT at a client, with the
 * choice shape preserved -- the same thing the Python API's own
 * test_programmes.py guards, for the same reason: the curriculum was
 * once loaded, validated, and then dropped on the floor because nothing
 * returned it.
 */
import { NextRequest } from "next/server"
import { GET } from "@/app/api/programmes/[institution]/[code]/route"

const params = (institution: string, code: string) =>
  ({ params: Promise.resolve({ institution, code }) })

const req = (url = "http://localhost/api/programmes/wits/CBA10/") => new NextRequest(url)

describe("GET /api/programmes/[institution]/[code]", () => {
  it("serves a real course list from the bundled data", async () => {
    const r = await GET(req(), params("wits", "CBA10"))
    expect(r.status).toBe(200)
    const body = await r.json()

    expect(body.qualification_code).toBe("CBA10")
    expect(body.institution).toBe("wits")
    expect(body.streams.length).toBeGreaterThan(0)
    const courses = body.streams.flatMap((s: any) => Object.values(s.curriculum).flat())
    expect(courses.length).toBeGreaterThan(0)
  })

  it("keeps a choice as one requirement with options, not two courses", async () => {
    // Flattening "Economics IB or Economic Theory IA" into separate
    // bullets turns an either/or into two compulsory courses -- a wrong
    // course list, not an untidy one.
    const body = await (await GET(req(), params("wits", "CBA10"))).json()
    const entries = body.streams.flatMap((s: any) => Object.values(s.curriculum).flat()) as any[]
    const choices = entries.filter((e) => e.choice)
    expect(choices.length).toBeGreaterThan(0)
    for (const c of choices) {
      expect(c.name).toBeNull()
      expect(c.options.length).toBeGreaterThan(1)
    }
    for (const c of entries.filter((e) => !e.choice)) expect(c.name).toBeTruthy()
  })

  it("keeps a multi-stream programme's majors apart", async () => {
    const body = await (await GET(req(), params("wits", "SBA11"))).json()
    expect(body.streams.length).toBe(6)
    expect(body.streams.every((s: any) => s.name)).toBe(true)
    expect(new Set(body.streams.map((s: any) => s.source_page)).size).toBe(6)
  })

  it("carries provenance, so a line stays checkable against its page", async () => {
    const body = await (await GET(req(), params("wits", "CBA10"))).json()
    expect(body.source_doc).toBeTruthy()
    expect(body.confidence).toMatch(/^(extracted|verified)$/)
    for (const s of body.streams) expect(s.source_page).toBeGreaterThan(0)
  })

  it("404s on an unknown code", async () => {
    const r = await GET(req(), params("wits", "NO-SUCH-CODE"))
    expect(r.status).toBe(404)
  })

  it("404s on an unknown institution", async () => {
    const r = await GET(req(), params("nosuchuni", "CBA10"))
    expect(r.status).toBe(404)
  })

  it("404s on a year with no data, rather than serving another year", async () => {
    const r = await GET(
      req("http://localhost/api/programmes/wits/CBA10/?academic_year=1999"),
      params("wits", "CBA10"))
    expect(r.status).toBe(404)
  })

  it("serves the requested year when it exists", async () => {
    const r = await GET(
      req("http://localhost/api/programmes/wits/CBA10/?academic_year=2027"),
      params("wits", "CBA10"))
    expect(r.status).toBe(200)
    expect((await r.json()).academic_year).toBe(2027)
  })

  it("is cacheable -- it depends on nothing the learner typed", async () => {
    const r = await GET(req(), params("wits", "CBA10"))
    expect(r.headers.get("Cache-Control")).toMatch(/max-age=\d+/)
  })

  it("answers for a programme the prospectus publishes no outline for", async () => {
    // ABA00 exists and is matchable; its page prints requirements and
    // careers and no course list. That is an empty streams/curriculum,
    // not a 404 and not an error.
    const r = await GET(req(), params("wits", "ABA00"))
    expect(r.status).toBe(200)
    const body = await r.json()
    const courses = body.streams.flatMap((s: any) => Object.values(s.curriculum).flat())
    expect(courses).toEqual([])
  })
})
