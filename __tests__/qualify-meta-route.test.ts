/**
 * @jest-environment node
 *
 * GET /api/qualify/meta, now answered from the bundled dataset.
 *
 * The shape is load-bearing beyond this route: fetchCoveredInstitutions()
 * reads `institutions` to decide, per university, whether to trust the
 * matcher's list or fall back to this app's local data. A renamed or
 * empty field there does not throw -- it silently empties the main
 * course list for every institution.
 */
import { GET } from "@/app/api/qualify/meta/route"
import { PROGRAMMES } from "@/lib/qualify/data"

describe("GET /api/qualify/meta", () => {
  it("reports the dataset actually bundled, not a hardcoded list", async () => {
    const body = await (await GET()).json()

    expect(body.programme_count).toBe(PROGRAMMES.length)
    expect(Object.keys(body.institutions).sort())
      .toEqual([...new Set(PROGRAMMES.map((p) => p.institution_id))].sort())
  })

  it("covers Wits, which is what the frontend checks before showing it", async () => {
    const body = await (await GET()).json()
    expect(body.institutions.wits).toContain(2027)
  })

  it("names the cf-data release the data came from", async () => {
    // Without this a mismatched programmes.json is undetectable from
    // outside -- the numbers would simply be wrong.
    const body = await (await GET()).json()
    expect(body.data_version).toMatch(/^\d{4}\.\d+$/)
  })

  it("keeps every field the client's QualifyMetaResponse declares", async () => {
    const body = await (await GET()).json()
    expect(Object.keys(body).sort()).toEqual([
      "academic_years", "data_version", "institutions", "programme_count",
    ])
    expect(Array.isArray(body.academic_years)).toBe(true)
    expect(body.academic_years).toContain(2027)
  })
})
