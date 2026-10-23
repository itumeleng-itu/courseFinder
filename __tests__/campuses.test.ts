import { institutionCampuses, institutionCampusDetail, institutionOnlineOffering } from "@/lib/campuses"
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

  it("carries every TUT campus, including the regional ones", () => {
    const names = institutionCampuses("tut").map((c) => c.name)

    // TUT's prospectus prints a per-programme campus column that the
    // converter used to drop into a prose note, so four campuses
    // appeared nowhere and "Arcadia and Pretoria Campuses" rendered
    // as a third campus that does not exist.
    for (const campus of [
      "Pretoria Campus",
      "Arcadia Campus",
      "Arts Campus",
      "Soshanguve North Campus",
      "Soshanguve South Campus",
      "Ga-Rankuwa Campus",
      "eMalahleni Campus",
      "Mbombela Campus",
      "Polokwane Campus",
    ]) {
      expect(names).toContain(campus)
    }

    expect(names).not.toContain("Arcadia and Pretoria Campuses")
    expect(names).not.toContain("Soshanguve Campus")
    // Nine campuses, and no tenth. TUT has exactly these.
    expect(names).toHaveLength(9)
  })

  it("files a Mbombela-only programme at Mbombela, not at its page banner", () => {
    const mbombela = institutionCampuses("tut").find((c) => c.name === "Mbombela Campus")!
    const pretoria = institutionCampuses("tut").find((c) => c.name === "Pretoria Campus")!

    // Three programmes are named "(Only Mbombela Campus)" and were
    // filed under Pretoria, because the page banner won over the
    // programme's own name.
    expect(mbombela.programmeCount).toBeGreaterThanOrEqual(3)
    expect(pretoria.programmeCount).toBeLessThan(72)
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

  it("keeps online delivery out of the campus list and its count", () => {
    // TUT and UJ both use the campus column to record online
    // delivery. Counted as a campus it told a learner TUT has ten
    // campuses when it has nine, and it answers nothing a campus
    // list is read for -- which is where they would have to live.
    for (const institution of ["tut", "uj"]) {
      expect(institutionCampuses(institution).map((c) => c.name)).not.toContain("Online")
      expect(institutionCampusDetail(institution).map((c) => c.name)).not.toContain("Online")
    }
  })

  it("still reports what is taught online, separately", () => {
    // Dropping it from the campus list must not lose it: three TUT
    // programmes and two UJ ones are online-only, and a learner who
    // cannot move to Pretoria needs to see them.
    const tut = institutionOnlineOffering("tut")!
    expect(tut.name).toBe("Online")
    expect(tut.programmeCount).toBeGreaterThan(0)
    expect(tut.programmes).toHaveLength(tut.programmeCount)

    expect(institutionOnlineOffering("uj")?.programmeCount).toBeGreaterThan(0)
  })

  it("reports no online offering for an institution that has none", () => {
    expect(institutionOnlineOffering("su")).toBeNull()
    expect(institutionOnlineOffering("wits")).toBeNull()
    expect(institutionOnlineOffering("uct")).toBeNull()
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
