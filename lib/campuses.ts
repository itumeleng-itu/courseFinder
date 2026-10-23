import { PROGRAMMES } from "@/lib/qualify/data"

/**
 * Which campuses an institution teaches at, and what each one offers.
 *
 * Derived from the programme bundle rather than hand-maintained. Every
 * programme record already carries the campus it is taught at, so the
 * mapping is a fact about the data we ship; a separate table would be
 * one more thing to forget to update when a prospectus changes.
 *
 * Two things in the source need normalising before it reads properly:
 *
 *  - UJ publishes campus CODES ("APK", "DFC"). They are meaningless to
 *    a matriculant choosing where to study, so they are expanded.
 *
 *  - Both TUT and UJ use the campus column to record online delivery.
 *    "Online" is a mode, not a place: counted as a campus it told a
 *    learner TUT has ten campuses when it has nine, and it cannot
 *    answer the question a campus list exists to answer, which is
 *    where they would have to live. It is split out here and reported
 *    separately by institutionOnlineOffering.
 *
 * TUT used to need more treatment here -- it shipped "Arcadia and
 * Pretoria Campuses" as a single value and omitted Polokwane,
 * Mbombela and eMalahleni entirely. That is now fixed in
 * coursefind-data's TUT converter, which reads the prospectus's
 * per-programme campus column, so nothing is needed for it here. UJ
 * would be better fixed the same way, upstream, whenever its
 * converter is next touched.
 *
 * Wits ships no campus data at all. That is a gap in the source, not
 * something to paper over: institutionCampuses returns an empty list
 * and the UI says nothing rather than inventing a campus.
 */

export type CampusOffering = {
  /** Campus name as a learner would recognise it. */
  name: string
  /** How many bundled programmes are taught here. */
  programmeCount: number
  /** Faculties present on this campus, commonest first. */
  faculties: { name: string; count: number }[]
}

export type CampusProgramme = {
  code: string
  name: string
  faculty: string | null
}

export type CampusDetail = CampusOffering & {
  /** Every bundled programme taught here, alphabetical. */
  programmes: CampusProgramme[]
}

/** UJ publishes codes; these are the campuses they stand for. */
const UJ_CAMPUS_NAMES: Record<string, string> = {
  APK: "Auckland Park Kingsway",
  APB: "Auckland Park Bunting Road",
  DFC: "Doornfontein",
  SWC: "Soweto",
}

/**
 * The value both sources use for online delivery.
 *
 * Kept as the source prints it -- the converters record what the
 * prospectus says and that is right -- and separated at the point of
 * presentation, which is where the distinction matters.
 */
export const ONLINE = "Online"

function normaliseCampus(institutionId: string, raw: string): string {
  if (raw === ONLINE) return ONLINE
  if (institutionId === "uj") return UJ_CAMPUS_NAMES[raw] ?? raw
  return raw
}

/**
 * Every campus value for an institution, online included, largest
 * first. The two exported readers split online out of this.
 */
function offerings(institutionId: string): CampusDetail[] {
  const byCampus = new Map<
    string,
    { faculties: Map<string, number>; programmes: Map<string, CampusProgramme> }
  >()

  for (const programme of PROGRAMMES as unknown as Array<Record<string, unknown>>) {
    if (programme.institution_id !== institutionId) continue
    const raw = (programme.campus as string[] | undefined) ?? []
    if (raw.length === 0) continue

    const faculty = (programme.faculty as string | null) ?? "Other"
    const code = String(programme.qualification_code)

    const campuses = new Set(raw.map((value) => normaliseCampus(institutionId, value)))
    for (const campus of campuses) {
      const entry = byCampus.get(campus) ?? {
        faculties: new Map<string, number>(),
        programmes: new Map<string, CampusProgramme>(),
      }
      // Programmes are counted by qualification code, not by summing
      // the faculty tallies. An interfaculty programme belongs to
      // several faculties at once -- Stellenbosch's BDatSci is listed
      // under four -- and summing counted it four times, so SU
      // reported 68 programmes against 65 records.
      entry.programmes.set(code, {
        code,
        name: String(programme.name),
        faculty: (programme.faculty as string | null) ?? null,
      })
      for (const part of faculty.split(";").map((f) => f.trim()).filter(Boolean)) {
        entry.faculties.set(part, (entry.faculties.get(part) ?? 0) + 1)
      }
      byCampus.set(campus, entry)
    }
  }

  return [...byCampus.entries()]
    .map(([name, { faculties, programmes }]) => ({
      name,
      programmeCount: programmes.size,
      faculties: [...faculties.entries()]
        .map(([facultyName, count]) => ({ name: facultyName, count }))
        .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)),
      programmes: [...programmes.values()].sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => b.programmeCount - a.programmeCount || a.name.localeCompare(b.name))
}

/**
 * The campuses of one institution, largest first.
 *
 * Returns an empty array when the source carries no campus data, which
 * the caller should treat as "not published" rather than "none".
 */
export function institutionCampuses(institutionId: string): CampusOffering[] {
  return offerings(institutionId)
    .filter((campus) => campus.name !== ONLINE)
    .map(({ name, programmeCount, faculties }) => ({ name, programmeCount, faculties }))
}

/**
 * The same campuses, with the programme list filled in.
 *
 * Separate from institutionCampuses because the list page shows 26
 * universities at once and only needs the counts; carrying every
 * programme name for all of them would be a lot of markup nobody
 * reads. A single university's page shows one institution and can
 * afford the detail.
 */
export function institutionCampusDetail(institutionId: string): CampusDetail[] {
  return offerings(institutionId).filter((campus) => campus.name !== ONLINE)
}

/**
 * What the institution teaches online, or null if nothing.
 *
 * Shaped like a campus because it carries the same facts -- a
 * programme count and the faculties behind it -- but reported
 * separately so it is never counted as a place.
 */
export function institutionOnlineOffering(institutionId: string): CampusDetail | null {
  return offerings(institutionId).find((campus) => campus.name === ONLINE) ?? null
}
