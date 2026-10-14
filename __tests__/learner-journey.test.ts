/** @jest-environment node */
/**
 * What a learner actually sees after entering their marks.
 *
 * Uses the same path app/find-course/page.tsx runs through
 * hooks/use-course-matcher.ts: fetchCoveredInstitutions, then
 * fetchQualification, then response.qualified filtered by
 * isUndergraduateCourse. Needs a coursefind-data API on port 8099.
 */
import * as http from "http"
import { fetchQualification, fetchCoveredInstitutions } from "@/lib/qualify-api"

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

beforeAll(() => {
  // jest.setup.js mocks global.fetch; stand in for the Next.js proxy routes.
  global.fetch = ((input: any, init?: any) => {
    const url = typeof input === "string" ? input : input.url
    if (url.startsWith("/api/qualify/meta")) return nodeFetch("http://127.0.0.1:8099/v1/meta", init)
    if (url.startsWith("/api/qualify")) return nodeFetch("http://127.0.0.1:8099/v1/qualify", init)
    return nodeFetch(url, init)
  }) as any
})
afterAll(() => { global.fetch = realFetch })

/** The exact predicate hooks/use-course-matcher.ts applies to the API's
 * qualified list before building course cards. */
const isUndergraduateCourse = (name: string) => {
  const n = name.toLowerCase()
  const exclude = ["honours", "postgraduate", "pgdip", "pgcert", "master", "masters",
                   "msc", "ma ", "llm", "phd", "doctor", "doctorate", "mba"]
  if (exclude.some((t) => n.includes(t))) return false
  const include = ["bachelor", "bsc", "ba ", "beng", "bcom", "diploma",
                   "higher certificate", "national diploma", "advanced diploma", "undergraduate"]
  return include.some((t) => n.includes(t)) || !exclude.some((t) => n.includes(t))
}

const STRONG = [
  { name: "English Home Language", percentage: 82 },
  { name: "Afrikaans First Additional Language", percentage: 74 },
  { name: "Mathematics", percentage: 78 },
  { name: "Physical Sciences", percentage: 71 },
  { name: "Life Sciences", percentage: 68 },
  { name: "Geography", percentage: 66 },
  { name: "Life Orientation", percentage: 85 },
] as any

/** The three real statements of results pasted into this session, as the
 * learner would type them into the form. */
const CERT_2017 = [
  { name: "IsiZulu Home Language", percentage: 77 },
  { name: "English First Additional Language", percentage: 75 },
  { name: "Mathematics", percentage: 8 },
  { name: "Life Orientation", percentage: 83 },
  { name: "Geography", percentage: 72 },
  { name: "History", percentage: 78 },
  { name: "Life Sciences", percentage: 50 },
] as any

const CERT_2022 = [
  { name: "IsiZulu Home Language", percentage: 76 },
  { name: "English First Additional Language", percentage: 61 },
  { name: "Mathematical Literacy", percentage: 40 },
  { name: "Life Orientation", percentage: 73 },
  { name: "Business Studies", percentage: 67 },
  { name: "Economics", percentage: 64 },
  { name: "Tourism", percentage: 48 },
] as any

const CERT_2024 = [
  { name: "IsiZulu Home Language", percentage: 83 },
  { name: "English First Additional Language", percentage: 75 },
  { name: "Mathematics", percentage: 41 },
  { name: "Life Orientation", percentage: 87 },
  { name: "Geography", percentage: 51 },
  { name: "Life Sciences", percentage: 54 },
  { name: "Physical Sciences", percentage: 30 },
] as any

describe("what the learner sees", () => {
  it("picks Wits up from /v1/meta with no code change", async () => {
    expect((await fetchCoveredInstitutions()).has("wits")).toBe(true)
  })

  it("shows Wits programmes to a learner who qualifies", async () => {
    const r = await fetchQualification(STRONG)
    const shown = r.qualified.filter((x) => isUndergraduateCourse(x.name))
    const wits = shown.filter((x) => x.institution === "wits")
    expect(wits.length).toBeGreaterThan(0)
    console.log(`\n  scores ${JSON.stringify(r.scores)} -> ${wits.length} Wits cards, e.g.`)
    for (const w of wits.slice(0, 4)) console.log(`     ${w.qualification_code}  ${w.name}`)
    // the name filter drops none of them
    expect(shown.length).toBe(r.qualified.length)
  })

  it.each([["2017", CERT_2017, 15], ["2022", CERT_2022, 20], ["2024", CERT_2024, 40]])(
    "gives the real certificate %s somewhere to go, now TUT is loaded",
    async (label, marks, atLeast) => {
      // The point of adding TUT. These three learners qualified for
      // NOTHING at Wits -- correctly, its bars run 33-43 and they score
      // 29-33 -- and saw an empty page. TUT's run 18-30, the band they
      // are actually in. A floor rather than an exact count, so a data
      // refresh that adds programmes does not fail this, but one that
      // empties their results does.
      const r = await fetchQualification(marks as any)
      const tut = r.qualified.filter((x) => x.institution === "tut")
      expect(tut.length).toBeGreaterThanOrEqual(atLeast)
      console.log(`\n  cert ${label}: TUT APS ${r.scores.tut} -> ` +
                  `${tut.length} TUT cards (Wits: ` +
                  `${r.qualified.filter((x) => x.institution === "wits").length})`)
    })

  it("shows no course list for a TUT programme, and does not pretend otherwise", async () => {
    // TUT's source document carries admission requirements only -- no
    // curriculum anywhere in its 20 pages. So a TUT card must say the
    // outline is not published rather than failing or showing an empty
    // section as if something were missing.
    const r = await fetchQualification(CERT_2024 as any)
    const tut = r.qualified.filter((x) => x.institution === "tut")
    expect(tut.length).toBeGreaterThan(0)

    const { GET } = await import("@/app/api/programmes/[institution]/[code]/route")
    const { NextRequest } = await import("next/server")
    const code = tut[0].qualification_code
    const body = await (await GET(
      new NextRequest(`http://localhost/api/programmes/tut/${code}/`),
      { params: Promise.resolve({ institution: "tut", code }) },
    )).json()

    const courses = body.streams.flatMap((s: any) => Object.values(s.curriculum).flat())
    expect(courses).toEqual([])
    expect(body.source_doc).toContain("tut")
  })

  it.each([["2017", CERT_2017], ["2022", CERT_2022], ["2024", CERT_2024]])(
    "shows no Wits cards at all for the real certificate %s",
    async (_label, marks) => {
      const r = await fetchQualification(marks as any)
      const w = (b: keyof typeof r) =>
        (r[b] as any[]).filter((x) => x.institution === "wits")
      expect(w("qualified").length).toBe(0)
      // Not requested, so not computed and not sent. Nothing renders
      // near misses, and for a learner who qualifies for nothing they
      // were 73% of the response.
      expect(r.near_misses).toEqual([])
      console.log(
        `\n  cert ${_label}: APS ${r.scores.wits} -> 0 Wits cards, ` +
        `${w("requires_additional_assessment").length} assessment-gated\n`)
    })

  it("does not ask the API for near misses", async () => {
    // The default is what matters: every caller in the app relies on
    // it, so a change back to true would quietly restore the cost on
    // every search. Asserted on the request body, not the response,
    // because an empty near_misses list cannot distinguish "not asked
    // for" from "asked for and none found".
    const sent: any[] = []
    const inner = global.fetch
    global.fetch = ((input: any, init?: any) => {
      if (init?.body) sent.push(JSON.parse(init.body))
      return (inner as any)(input, init)
    }) as any
    try {
      await fetchQualification(STRONG)
    } finally {
      global.fetch = inner
    }
    expect(sent[0].include_near_misses).toBe(false)
  })

  it("still returns them when a caller explicitly asks", async () => {
    // The capability stays; only the default changed. A future screen
    // that renders them opts in rather than reinstating the cost for
    // everyone.
    const r = await fetchQualification(CERT_2017, { includeNearMisses: true })
    expect(r.near_misses.length).toBeGreaterThan(0)
  })
})
