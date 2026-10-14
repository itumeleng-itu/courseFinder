/** @jest-environment node */
/**
 * The TypeScript rules engine against the Python one it was ported
 * from, over thousands of mark sets.
 *
 * WHY THIS TEST IS THE WHOLE JUSTIFICATION FOR THE PORT
 * -----------------------------------------------------
 * Moving the engine into this repo bought a free deploy and removed a
 * network hop, and it cost a second implementation of the admission
 * rules. A second implementation is exactly how the Wits APS silently
 * drifted 4 points from the API's on strong candidates -- it agreed on
 * the three real certificates and disagreed where nobody was looking.
 *
 * A handful of example-based tests cannot catch that. This compares the
 * two engines field for field -- scores, which programmes land in which
 * bucket, every margin, and every failure MESSAGE as a string -- over
 * the real certificates plus thousands of generated certificates built
 * to hit the places the rules actually branch:
 *
 *   - the band edges (29/30, 39/40, 59/60, 79/80) where a level flips
 *   - Wits' +2 bonus, which starts at exactly 60 and only on English
 *     and Mathematics
 *   - Life Orientation, which Wits counts and everyone else drops
 *   - Mathematics vs Mathematical Literacy, which select different
 *     score thresholds entirely
 *   - Home Language vs First Additional Language for the same language
 *   - subject counts from 6 to 9, since best-N and required_subjects
 *     interact
 *
 * Needs the Python API on port 8099, serving the SAME dataset this repo
 * bundles. Override with LIVE_QUALIFY_API_URL. It is skipped when the
 * API is unreachable, so CI without it stays green -- but then the port
 * is unverified, which the skip message says out loud.
 */
import * as http from "http"
import { runQualify } from "@/lib/qualify/engine"
import { PROGRAMMES, INSTITUTIONS_BY_ID, DATA_VERSION } from "@/lib/qualify/data"

const API = process.env.LIVE_QUALIFY_API_URL ?? "http://127.0.0.1:8099"

function post(path: string, body: unknown): Promise<any> {
  const t = new URL(API + path)
  const payload = JSON.stringify(body)
  return new Promise((res, rej) => {
    const r = http.request(
      { hostname: t.hostname, port: t.port, path: t.pathname, method: "POST",
        headers: { "Content-Type": "application/json",
                   "Content-Length": Buffer.byteLength(payload) } },
      (x) => { let d = ""
               x.on("data", (c) => (d += c))
               x.on("end", () => {
                 try { res({ status: x.statusCode, body: JSON.parse(d) }) }
                 catch { res({ status: x.statusCode, body: null }) }
               }) },
    )
    r.on("error", rej)
    r.write(payload)
    r.end()
  })
}

function get(path: string): Promise<any> {
  return new Promise((res, rej) => {
    const t = new URL(API + path)
    http.get({ hostname: t.hostname, port: t.port, path: t.pathname }, (x) => {
      let d = ""
      x.on("data", (c) => (d += c))
      x.on("end", () => { try { res(JSON.parse(d)) } catch { res(null) } })
    }).on("error", rej)
  })
}

/** Deterministic, so a failure is reproducible from the seed alone. */
function makeRandom(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 0x100000000
  }
}

const LANGUAGES = ["english", "afrikaans", "isizulu", "isixhosa", "sepedi",
                   "sesotho", "setswana", "xitsonga", "siswati", "tshivenda",
                   "isindebele"]
const ELECTIVES = ["physical_sciences", "life_sciences", "geography", "history",
                   "accounting", "business_studies", "economics", "tourism",
                   "consumer_studies", "visual_arts", "dramatic_arts", "music",
                   "information_technology", "computer_applications_technology",
                   "engineering_graphics_and_design", "agricultural_sciences",
                   "religion_studies", "technical_sciences", "design"]
/** Percentages clustered on the band edges, where a level flips and the
 * bonus switches on -- uniform random marks would mostly land in the
 * middle of a band and test nothing. */
const EDGY = [0, 1, 29, 30, 31, 39, 40, 41, 49, 50, 51, 59, 60, 61,
              69, 70, 71, 79, 80, 81, 89, 90, 99, 100]

function certificate(rand: () => number): Array<{ subject: string; percentage: number }> {
  const pick = <T,>(xs: T[]): T => xs[Math.floor(rand() * xs.length)]
  const pct = () => (rand() < 0.75 ? pick(EDGY) : Math.floor(rand() * 101))

  const subjects = new Map<string, number>()
  // A real NSC certificate: a Home Language, a second language, a
  // mathematics, Life Orientation, and electives on top.
  const homeLang = pick(LANGUAGES)
  subjects.set(`${homeLang}_hl`, pct())
  const second = pick(LANGUAGES.filter((l) => l !== homeLang))
  subjects.set(`${second}_fal`, pct())
  subjects.set(pick(["mathematics", "mathematical_literacy", "technical_mathematics"]), pct())
  subjects.set("life_orientation", pct())

  const target = 6 + Math.floor(rand() * 4)   // 6..9, the API's own bounds
  const pool = [...ELECTIVES]
  while (subjects.size < target && pool.length) {
    const i = Math.floor(rand() * pool.length)
    subjects.set(pool.splice(i, 1)[0], pct())
  }
  return [...subjects].map(([subject, percentage]) => ({ subject, percentage }))
}

const REAL: Array<{ label: string; marks: Record<string, number> }> = [
  { label: "cert 2017", marks: { isizulu_hl: 77, english_fal: 75, mathematics: 8,
      life_orientation: 83, geography: 72, history: 78, life_sciences: 50 } },
  { label: "cert 2022", marks: { isizulu_hl: 76, english_fal: 61, mathematical_literacy: 40,
      life_orientation: 73, business_studies: 67, economics: 64, tourism: 48 } },
  { label: "cert 2024", marks: { isizulu_hl: 83, english_fal: 75, mathematics: 41,
      life_orientation: 87, geography: 51, life_sciences: 54, physical_sciences: 30 } },
  { label: "strong", marks: { english_hl: 82, afrikaans_fal: 74, mathematics: 78,
      physical_sciences: 71, life_sciences: 68, geography: 66, life_orientation: 85 } },
  { label: "afrikaans HL", marks: { afrikaans_hl: 80, english_fal: 72, mathematics: 65,
      accounting: 70, business_studies: 68, economics: 64, life_orientation: 77 } },
]

function toSubjects(marks: Record<string, number>) {
  return Object.entries(marks).map(([subject, percentage]) => ({ subject, percentage }))
}

function local(subjects: Array<{ subject: string; percentage: number }>, nearMisses = true) {
  const marks: Record<string, number> = {}
  for (const s of subjects) marks[s.subject] = s.percentage
  return runQualify(marks, PROGRAMMES, INSTITUTIONS_BY_ID, {
    academicYear: 2027, includeNearMisses: nearMisses,
  })
}

/** Compares everything a learner could see. Bucket membership is
 * compared as a set so an ordering difference among equal margins is
 * not reported as a disagreement -- but the margins, messages and
 * scores themselves must match exactly. */
function compare(a: any, b: any) {
  expect(b.scores).toEqual(a.scores)
  expect(b.evaluated_count).toBe(a.evaluated_count)
  for (const bucket of ["qualified", "near_misses", "requires_additional_assessment"]) {
    const key = (p: any) => `${p.institution}/${p.qualification_code}`
    const byKey = (list: any[]) => Object.fromEntries(list.map((p) => [key(p), p]))
    const pa = byKey(a[bucket])
    const pb = byKey(b[bucket])
    expect(Object.keys(pb).sort()).toEqual(Object.keys(pa).sort())
    for (const k of Object.keys(pa)) {
      expect({ k, ...pb[k] }).toEqual({ k, ...pa[k] })
    }
  }
}

let reachable = false
let pyMeta: any = null

beforeAll(async () => {
  try {
    pyMeta = await get("/v1/meta")
    reachable = Boolean(pyMeta?.programme_count)
  } catch {
    reachable = false
  }
  if (!reachable) {
    console.warn(
      `\n  !! The Python API at ${API} is unreachable, so the TypeScript engine ` +
      `is UNVERIFIED in this run.\n     Start it with:  PYTHONPATH=src ` +
      `PROGRAMMES_DATA_PATH=src/app/data/programmes.json uvicorn app.main:app --port 8099\n`)
  }
})

const maybe = (name: string, fn: any, timeout?: number) =>
  it(name, async () => {
    if (!reachable) { console.warn(`  skipped (API unreachable): ${name}`); return }
    await fn()
  }, timeout)

describe("the ported engine against the Python it came from", () => {
  maybe("is serving the same dataset, or nothing below means anything", async () => {
    expect(pyMeta.programme_count).toBe(PROGRAMMES.length)
    expect(Object.keys(pyMeta.institutions).sort())
      .toEqual([...new Set(PROGRAMMES.map((p) => p.institution_id))].sort())
    console.log(`\n  dataset ${DATA_VERSION}: ${PROGRAMMES.length} programmes, ` +
                `${Object.keys(pyMeta.institutions).length} institutions`)
  })

  maybe("agrees on every real certificate, field for field", async () => {
    for (const { label, marks } of REAL) {
      const subjects = toSubjects(marks)
      const py = await post("/v1/qualify", {
        subjects, academic_year: 2027, include_near_misses: true,
      })
      expect(py.status).toBe(200)
      const ts = local(subjects)
      try {
        compare(py.body, ts)
      } catch (e) {
        throw new Error(`${label} disagrees:\n${(e as Error).message}`)
      }
      console.log(`  ${label.padEnd(13)} scores ${JSON.stringify(py.body.scores)} ` +
                  `qualified ${py.body.qualified.length} near ${py.body.near_misses.length}  ok`)
    }
  }, 60_000)

  maybe("agrees on 1500 generated certificates", async () => {
    const rand = makeRandom(20261014)
    let checked = 0
    for (let i = 0; i < 1500; i++) {
      const subjects = certificate(rand)
      const py = await post("/v1/qualify", {
        subjects, academic_year: 2027, include_near_misses: true,
      })
      // The generator can emit a certificate the API itself rejects
      // (e.g. two variants of one language). Those are not interesting
      // disagreements -- the route validates the same way.
      if (py.status !== 200) continue
      try {
        compare(py.body, local(subjects))
      } catch (e) {
        throw new Error(
          `disagreement on generated certificate #${i}\n` +
          `${JSON.stringify(subjects)}\n${(e as Error).message}`)
      }
      checked++
    }
    expect(checked).toBeGreaterThan(1200)
    console.log(`\n  ${checked} generated certificates agreed on every field\n`)
  }, 600_000)

  maybe("serves a course list with the same keys the API did", async () => {
    // Caught a real gap: the stored data OMITS absent keys, while
    // Pydantic emitted every declared optional as an explicit null. A
    // client reading entry.name got `undefined` where it used to get
    // `null` -- no error, no test failure, just a quietly different
    // contract. The route normalises for that now; this holds it there.
    const { GET } = await import("@/app/api/programmes/[institution]/[code]/route")
    const { NextRequest } = await import("next/server")

    for (const code of ["CBA10", "SBA11", "EFA03", "ABA00"]) {
      const py = await get(`/v1/programmes/wits/${code}`)
      const mine = await (await GET(
        new NextRequest(`http://localhost/api/programmes/wits/${code}/`),
        { params: Promise.resolve({ institution: "wits", code }) },
      )).json()
      expect(mine).toEqual(py)
    }
  }, 60_000)

  maybe("agrees when near misses are switched off", async () => {
    const subjects = toSubjects(REAL[0].marks)
    const py = await post("/v1/qualify", {
      subjects, academic_year: 2027, include_near_misses: false,
    })
    compare(py.body, local(subjects, false))
    expect(py.body.near_misses).toEqual([])
  }, 30_000)
})
