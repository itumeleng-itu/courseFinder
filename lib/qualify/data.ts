/**
 * The programme dataset, bundled rather than fetched.
 *
 * WHY IT IS IN THE REPO
 * This file is the exact artifact coursefind-data's CI exports and
 * bakes into its Docker image, copied in at a known version. It is
 * static: the API that used to serve it loaded it once at boot and
 * never reloaded, because "new data means a new image tag, not a live
 * reload". Importing it here keeps that property and removes a network
 * hop, a second service and a cold start from every search.
 *
 * KEEPING IT HONEST
 * DATA_VERSION below must match the release the file came from. Updating
 * the data is: copy the file from a cf-data release, bump DATA_VERSION,
 * run the differential test against that release's API, commit.
 */
import raw from "@/data/qualify/programmes.json"
import type { Institution, Programme } from "./engine"

/** The cf-data release this file was exported from. */
export const DATA_VERSION = "2027.1"

interface DataFile {
  institutions: Institution[]
  programmes: Programme[]
}

const data = raw as unknown as DataFile

export const PROGRAMMES: Programme[] = data.programmes
export const INSTITUTIONS: Institution[] = data.institutions

export const INSTITUTIONS_BY_ID: Record<string, Institution> =
  Object.fromEntries(INSTITUTIONS.map((i) => [i.id, i]))

/** Which academic years each institution has data for -- the shape
 * /v1/meta returned, which fetchCoveredInstitutions() reads. */
export function institutionYears(): Record<string, number[]> {
  const out: Record<string, Set<number>> = {}
  for (const p of PROGRAMMES) {
    ;(out[p.institution_id] ??= new Set()).add(p.academic_year)
  }
  return Object.fromEntries(
    Object.entries(out).map(([id, years]) => [id, [...years].sort((a, b) => a - b)]),
  )
}

export function academicYears(): number[] {
  return [...new Set(PROGRAMMES.map((p) => p.academic_year))].sort((a, b) => a - b)
}

/** A programme has a transcribed course list if ANY of its streams
 * does. A stream carrying an empty curriculum counts as not
 * transcribed, not as a programme with no courses. */
export function hasCourses(p: Programme): boolean {
  return (p.streams ?? []).some(
    (s: any) => s?.curriculum && Object.keys(s.curriculum).length > 0,
  )
}

export function findProgramme(
  institution: string, code: string, academicYear?: number | null,
): Programme | null {
  const matches = PROGRAMMES.filter(
    (p) => p.institution_id === institution && p.qualification_code === code,
  )
  if (!matches.length) return null
  if (academicYear !== null && academicYear !== undefined) {
    return matches.find((p) => p.academic_year === academicYear) ?? null
  }
  // No year asked for: the most recent one with data, as the API did.
  return matches.reduce((a, b) => (b.academic_year > a.academic_year ? b : a))
}
