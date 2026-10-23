import { institutionCampuses } from "@/lib/campuses"
import { PROGRAMMES } from "@/lib/qualify/data"

/**
 * Campuses are derived from the programme bundle, so these guard the
 * three things the raw data gets wrong on its own.
 */

describe("campuses derived from the bundle", () => {
  it("expands UJ's campus codes into names a learner would recognise", () => {
    const names = institutionCampuses("uj").map((c) => c.name)

    expect(names).toContain("Auckland Park Kingsway")
    expect(names).toContain("Doornfontein")
    expect(names).toContain("Soweto")
    // The raw codes must not reach the page.
    expect(names).not.toContain("APK")
    expect(names).not.toContain("DFC")
  })

  it("splits TUT's combined campus into the two real ones", () => {
    const names = institutionCampuses("tut").map((c) => c.name)

    expect(names).toContain("Arcadia Campus")
    expect(names).toContain("Pretoria Campus")
    // "Arcadia and Pretoria Campuses" is one printed value meaning
    // both; left alone it renders as a third campus that does not exist.
    expect(names).not.toContain("Arcadia and Pretoria Campuses")
  })

  it("counts a programme once per campus, not once per faculty", () => {
    // Stellenbosch teaches everything on one campus, so its count must
    // equal its record count. Summing faculty tallies instead gave 68
    // against 65 records, because the interfaculty BDatSci is listed
    // under four faculties.
    const su = institutionCampuses("su")
    const records = (PROGRAMMES as unknown as Array<Record<string, unknown>>)
      .filter((p) => p.institution_id === "su").length

    expect(su).toHaveLength(1)
    expect(su[0].programmeCount).toBe(records)
  })

  it("returns nothing for an institution whose source carries no campus", () => {
    // Wits ships programmes with no campus field. The page must say
    // nothing rather than invent one.
    expect(institutionCampuses("wits")).toEqual([])
  })

  it("returns nothing for an institution that is not in the bundle", () => {
    expect(institutionCampuses("uct")).toEqual([])
  })

  it("orders campuses by size and lists faculties commonest first", () => {
    const campuses = institutionCampuses("uj")

    const counts = campuses.map((c) => c.programmeCount)
    expect([...counts].sort((a, b) => b - a)).toEqual(counts)

    for (const campus of campuses) {
      const facultyCounts = campus.faculties.map((f) => f.count)
      expect([...facultyCounts].sort((a, b) => b - a)).toEqual(facultyCounts)
    }
  })
})
