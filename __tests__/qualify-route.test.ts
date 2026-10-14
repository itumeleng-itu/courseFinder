/**
 * @jest-environment node
 *
 * POST /api/qualify, which now evaluates here instead of proxying.
 *
 * What changed and what did not: the route used to forward a body to a
 * hosted service and hand back whatever came out, so the only things
 * worth testing were "did it forward" and "did it survive a 502". It
 * now does the matching itself, so the tests are about the two things
 * that can actually hurt a learner -- a malformed request being scored
 * anyway, and the response shape drifting from what
 * lib/qualify-api.ts's callers expect.
 *
 * Whether the ANSWERS are right is not this file's job: that is
 * engine-differential.test.ts, which compares every field against the
 * Python engine over thousands of certificates.
 */
import { NextRequest } from "next/server"
import { POST } from "@/app/api/qualify/route"

const STRONG = [
  { subject: "english_hl", percentage: 82 },
  { subject: "afrikaans_fal", percentage: 74 },
  { subject: "mathematics", percentage: 78 },
  { subject: "physical_sciences", percentage: 71 },
  { subject: "life_sciences", percentage: 68 },
  { subject: "geography", percentage: 66 },
  { subject: "life_orientation", percentage: 85 },
]

function req(body: unknown) {
  return new NextRequest("http://localhost/api/qualify/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  })
}

describe("POST /api/qualify", () => {
  it("matches a real learner against the bundled dataset", async () => {
    const r = await POST(req({ subjects: STRONG, academic_year: 2027 }))
    expect(r.status).toBe(200)
    const body = await r.json()

    expect(body.scores.wits).toBe(42)
    expect(body.qualified.length).toBeGreaterThan(0)
    expect(body.qualified.some((p: any) => p.institution === "wits")).toBe(true)
    expect(body.evaluated_count).toBeGreaterThan(0)
  })

  it("returns every field the client's types declare", async () => {
    // lib/qualify-api.ts mirrors these names; a rename here would break
    // the UI silently rather than loudly.
    const body = await (await POST(req({ subjects: STRONG, academic_year: 2027 }))).json()
    expect(Object.keys(body).sort()).toEqual([
      "evaluated_count", "near_misses", "qualified",
      "requires_additional_assessment", "scores",
    ])
    const p = body.qualified[0]
    expect(Object.keys(p).sort()).toEqual([
      "campus", "duration_years", "faculty", "failures", "institution",
      "margin", "name", "qualification_code", "score_actual",
      "score_required", "selection_notes",
    ])
  })

  it("carries no curriculum, which is why the programmes route exists", async () => {
    const body = await (await POST(req({ subjects: STRONG, academic_year: 2027 }))).json()
    for (const bucket of ["qualified", "near_misses", "requires_additional_assessment"]) {
      for (const p of body[bucket]) {
        expect(p).not.toHaveProperty("curriculum")
        expect(p).not.toHaveProperty("streams")
      }
    }
  })

  it("omits near misses when they are not asked for", async () => {
    const body = await (await POST(req({
      subjects: STRONG, academic_year: 2027, include_near_misses: false,
    }))).json()
    expect(body.near_misses).toEqual([])
  })

  // --- the request has to be refused, not scored on what survived ---

  it("rejects fewer than six subjects", async () => {
    const r = await POST(req({ subjects: STRONG.slice(0, 5) }))
    expect(r.status).toBe(422)
    expect((await r.json()).error).toMatch(/6 subjects/i)
  })

  it("rejects more than nine", async () => {
    const extra = [...STRONG,
      { subject: "history", percentage: 60 }, { subject: "tourism", percentage: 60 },
      { subject: "economics", percentage: 60 }]
    const r = await POST(req({ subjects: extra }))
    expect(r.status).toBe(422)
  })

  it("rejects a subject it does not know", async () => {
    const r = await POST(req({
      subjects: [...STRONG.slice(1), { subject: "underwater_basket_weaving", percentage: 90 }],
    }))
    expect(r.status).toBe(422)
    expect((await r.json()).error).toMatch(/underwater_basket_weaving/)
  })

  it.each([[-1], [101], [50.5], ["80"]])(
    "rejects an impossible percentage (%p)", async (percentage) => {
      const bad = [{ subject: "english_hl", percentage }, ...STRONG.slice(1)]
      const r = await POST(req({ subjects: bad }))
      expect(r.status).toBe(422)
    })

  it("rejects a body that is not JSON", async () => {
    const r = await POST(req("not json at all"))
    expect(r.status).toBe(400)
  })

  it("rejects a body with no subjects at all", async () => {
    const r = await POST(req({ academic_year: 2027 }))
    expect(r.status).toBe(422)
  })
})
