/** @jest-environment node */
/**
 * The courses, end to end: a learner's marks in, real Wits course lists
 * out, through the same client code the browser runs.
 *
 * This is the gap the proxy closes. Before it, the 1,703 Wits courses
 * were in the data, loaded in memory, validated by Pydantic, and served
 * at /v1/programmes -- and unreachable from the browser, because nothing
 * asked for them. Every check here would have failed, not by erroring,
 * but by there being no route to call.
 *
 * Needs a coursefind-data API on port 8099:
 *     PROGRAMMES_DATA_PATH=... uvicorn app.main:app --port 8099
 * Override with LIVE_QUALIFY_API_URL.
 */
import * as http from "http"
import {
  fetchQualification,
  fetchProgrammeDetail,
  ProgrammeNotFoundError,
  orderedStages,
  stageLabel,
  countCourses,
} from "@/lib/qualify-api"

const API = process.env.LIVE_QUALIFY_API_URL ?? "http://127.0.0.1:8099"
const realFetch = global.fetch

function nodeFetch(url: string, init?: any): Promise<any> {
  const t = new URL(url)
  return new Promise((res, rej) => {
    const r = http.request(
      { hostname: t.hostname, port: t.port, path: t.pathname + t.search,
        method: init?.method ?? "GET", headers: init?.headers ?? {} },
      (x) => { let d = ""
               x.on("data", (c) => (d += c))
               x.on("end", () => res({ ok: (x.statusCode ?? 500) < 400,
                                       status: x.statusCode,
                                       json: async () => JSON.parse(d),
                                       text: async () => d })) },
    )
    r.on("error", rej)
    if (init?.body) r.write(init.body)
    r.end()
  })
}

/** jest.setup.js mocks global.fetch, so the app-relative paths the client
 * uses are routed here exactly as the Next.js proxy routes would route
 * them -- same paths, same upstream, no mocked payloads. */
beforeAll(() => {
  global.fetch = ((input: any, init?: any) => {
    const url = typeof input === "string" ? input : input.url
    const m = url.match(/^\/api\/programmes\/([^/]+)\/([^/?]+)\/?(\?.*)?$/)
    if (m) return nodeFetch(`${API}/v1/programmes/${m[1]}/${m[2]}${m[3] ?? ""}`, init)
    if (url.startsWith("/api/qualify/meta")) return nodeFetch(`${API}/v1/meta`, init)
    if (url.startsWith("/api/qualify")) return nodeFetch(`${API}/v1/qualify`, init)
    return nodeFetch(url, init)
  }) as any
})
afterAll(() => { global.fetch = realFetch })

const STRONG = [
  { name: "English Home Language", percentage: 82 },
  { name: "Afrikaans First Additional Language", percentage: 74 },
  { name: "Mathematics", percentage: 78 },
  { name: "Physical Sciences", percentage: 71 },
  { name: "Life Sciences", percentage: 68 },
  { name: "Geography", percentage: 66 },
  { name: "Life Orientation", percentage: 85 },
] as any

describe("fetching the courses behind a qualifying programme", () => {
  it("gets a real Wits course list for a programme the learner qualifies for", async () => {
    const r = await fetchQualification(STRONG)
    const wits = r.qualified.filter((p) => p.institution === "wits")
    expect(wits.length).toBeGreaterThan(0)

    const detail = await fetchProgrammeDetail("wits", wits[0].qualification_code)

    expect(detail.qualification_code).toBe(wits[0].qualification_code)
    expect(detail.name).toBe(wits[0].name)
    expect(detail.streams.length).toBeGreaterThan(0)
    expect(countCourses(detail.streams[0])).toBeGreaterThan(0)
    // Provenance survives to the client, so a served course list stays
    // checkable against the prospectus page it was read from.
    expect(detail.source_doc).toBeTruthy()
    expect(detail.streams[0].source_page).toBeGreaterThan(0)

    const stages = orderedStages(detail.streams[0])
    console.log(`\n  ${detail.qualification_code} ${detail.name}` +
                `  (p${detail.streams[0].source_page})`)
    for (const [stage, courses] of stages) {
      console.log(`    ${stageLabel(stage)} — ${courses.length} courses`)
      for (const c of courses.slice(0, 3)) {
        console.log(`       ${c.choice ? c.options!.join("  OR  ") : c.name}`)
      }
    }
  })

  it("orders the years the way the prospectus prints them", async () => {
    const d = await fetchProgrammeDetail("wits", "CBA10")
    const stages = orderedStages(d.streams[0]).map(([s]) => s)
    const known = ["first_year", "second_year", "third_year",
                   "fourth_year", "fifth_year", "sixth_year"]
    const ranks = stages.map((s) => known.indexOf(s)).filter((i) => i !== -1)
    expect(ranks).toEqual([...ranks].sort((a, b) => a - b))
    expect(stages[0]).toBe("first_year")
  })

  it("keeps a multi-stream programme's majors apart", async () => {
    // SBA11 runs over six prospectus pages, one per major. Keying its
    // course list on the degree code alone concatenated them into 62
    // undifferentiated courses with "Introductory Life Sciences" six
    // times over. Every stream must be named and carry its own page.
    const d = await fetchProgrammeDetail("wits", "SBA11")
    expect(d.streams.length).toBe(6)
    expect(d.streams.every((s) => s.name)).toBe(true)
    expect(new Set(d.streams.map((s) => s.source_page)).size).toBe(6)
    console.log(`\n  ${d.qualification_code} ${d.name}`)
    for (const s of d.streams) {
      console.log(`    ${s.name}  (p${s.source_page}, ${countCourses(s)} courses)`)
    }
  })

  it("delivers a choice as one requirement with options, not as two courses", async () => {
    // An "X or Y" line flattened into separate entries is a wrong course
    // list, not an untidy one. At least one Wits programme prints such a
    // line, so the shape has to survive the whole way out.
    const codes = (await fetchQualification(STRONG)).qualified
      .filter((p) => p.institution === "wits").map((p) => p.qualification_code)
    let found = 0
    for (const code of codes) {
      const d = await fetchProgrammeDetail("wits", code)
      for (const s of d.streams) {
        for (const list of Object.values(s.curriculum)) {
          for (const c of list) {
            if (!c.choice) { expect(c.name).toBeTruthy(); continue }
            found++
            expect(c.name).toBeNull()
            expect(c.options!.length).toBeGreaterThan(1)
          }
        }
      }
    }
    expect(found).toBeGreaterThan(0)
    console.log(`\n  ${found} "one of these" requirements across ${codes.length} programmes\n`)
  })

  it("says not-available rather than failing, for a programme with no course list", async () => {
    await expect(fetchProgrammeDetail("wits", "NO-SUCH-CODE"))
      .rejects.toBeInstanceOf(ProgrammeNotFoundError)
  })

  /** The three Wits records that carry no course list, and why -- all
   * three are the prospectus's own doing, not a gap in the fetch.
   *
   *   ABA00  BA        page 89 prints requirements and careers and no
   *   ABA02  BA (Law)  page 94 course outline; the extraction recorded
   *                    0 courses for both rather than inventing any.
   *   WITS-BSC-GEN     appears ONLY in the admissions table on page 24
   *                    ("Bachelor of Science (BSc) General  3  42+  5
   *                    5"), with no programme page anywhere in the
   *                    document -- confirmed by searching all 68 pages
   *                    for the name, which matches once. Its
   *                    qualification code is synthetic for the same
   *                    reason: Wits publishes none for it.
   *
   * So a client must say "not published" here, never "failed". */
  const NO_COURSE_LIST = new Set(["ABA00", "ABA02", "WITS-BSC-GEN"])

  it("reaches every course list the learner's qualifying programmes have", async () => {
    // The whole point, measured: how much of the 1,703 actually arrives
    // at a client for one learner.
    const wits = (await fetchQualification(STRONG)).qualified
      .filter((p) => p.institution === "wits")
    const served: string[] = []
    const bare: string[] = []
    let courses = 0

    for (const p of wits) {
      const d = await fetchProgrammeDetail("wits", p.qualification_code)
        .catch((e) => { if (e instanceof ProgrammeNotFoundError) return null; throw e })
      const n = d ? d.streams.reduce((a, s) => a + countCourses(s), 0) : 0
      if (n === 0) { bare.push(p.qualification_code); continue }
      served.push(p.qualification_code)
      courses += n
    }

    // Every programme that has a course list hands it over. The ones
    // that don't are exactly the known three -- enumerated, so a NEW
    // empty programme fails this instead of being absorbed into a
    // tolerance.
    expect(bare.every((c) => NO_COURSE_LIST.has(c))).toBe(true)
    expect(served.length).toBe(wits.length - bare.length)
    expect(courses).toBeGreaterThan(500)

    console.log(`\n  ${served.length}/${wits.length} qualifying Wits programmes ` +
                `served a course list — ${courses} courses reached the client`)
    console.log(`  ${bare.length} print no outline in the prospectus: ` +
                `${bare.join(", ")}\n`)
  })
})
