/**
 * Generates TypeScript university class files matching the existing
 * BaseUniversity pattern used throughout the codebase.
 */

import type { ProspectusData } from "./validators"

/**
 * Convert a string to PascalCase for class names.
 * e.g. "tut" → "TUT", "uct" → "UCT", "nwu" → "NWU"
 */
function toClassName(id: string): string {
  // Handle known abbreviation patterns
  const upper = id.toUpperCase()
  if (upper.length <= 5) return upper

  // For longer names, PascalCase each word
  return id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("")
}

/**
 * Escape a string for safe inclusion in TypeScript template literals.
 */
function escapeTs(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/`/g, "\\`")
}

/**
 * Format subject requirements as TypeScript code.
 */
function formatSubjectRequirements(
  requirements: Record<string, number | { alternatives: Array<{ subject: string; level: number }> }>
): string {
  const entries: string[] = []

  for (const [subject, requirement] of Object.entries(requirements)) {
    if (typeof requirement === "number") {
      entries.push(`        "${escapeTs(subject)}": ${requirement},`)
    } else if (requirement.alternatives) {
      const alts = requirement.alternatives
        .map(
          (alt) =>
            `            { subject: "${escapeTs(alt.subject)}", level: ${alt.level} },`
        )
        .join("\n")
      entries.push(
        `        "${escapeTs(subject)}": {\n          alternatives: [\n${alts}\n          ],\n        },`
      )
    }
  }

  return entries.join("\n")
}

/**
 * Format a single course as TypeScript object literal.
 */
function formatCourse(course: ProspectusData["courses"][0]): string {
  const lines: string[] = []
  lines.push(`    {`)
  lines.push(`      id: "${escapeTs(course.id)}",`)
  lines.push(`      name: "${escapeTs(course.name)}",`)
  lines.push(`      faculty: "${escapeTs(course.faculty)}",`)
  lines.push(`      apsMin: ${course.apsMin},`)
  lines.push(`      duration: "${escapeTs(course.duration)}",`)

  if (course.subjectRequirements && Object.keys(course.subjectRequirements).length > 0) {
    lines.push(`      subjectRequirements: {`)
    lines.push(formatSubjectRequirements(course.subjectRequirements))
    lines.push(`      },`)
  }

  if (course.additionalRequirements) {
    const reqArray = Array.isArray(course.additionalRequirements)
      ? course.additionalRequirements
      : [course.additionalRequirements]
    if (reqArray.length > 0) {
      const reqs = reqArray.map((r) => `"${escapeTs(r)}"`).join(", ")
      lines.push(`      additionalRequirements: [${reqs}],`)
    }
  }

  if (course.campus) {
    lines.push(`      campus: "${escapeTs(course.campus)}",`)
  }

  const rawCareers = course.careerOpportunities ?? course.careers
  if (rawCareers) {
    const careersArray = Array.isArray(rawCareers) ? rawCareers : [rawCareers]
    if (careersArray.length > 0) {
      const careers = careersArray.map((c) => `"${escapeTs(c)}"`).join(", ")
      lines.push(`      careerOpportunities: [${careers}],`)
    }
  }

  if (course.isExtendedCurriculum) {
    lines.push(`      isExtendedCurriculum: true,`)
    if (course.standardProgramId) {
      lines.push(`      standardProgramId: "${escapeTs(course.standardProgramId)}",`)
    }
  }

  lines.push(`    },`)
  return lines.join("\n")
}

/**
 * Generate a complete TypeScript file for a university.
 */
export function generateUniversityTS(data: ProspectusData): string {
  const className = toClassName(data.shortName || data.id)

  // Group courses by faculty for readability
  const coursesByFaculty = new Map<string, typeof data.courses>()
  for (const course of data.courses) {
    const faculty = course.faculty || "Other"
    if (!coursesByFaculty.has(faculty)) {
      coursesByFaculty.set(faculty, [])
    }
    coursesByFaculty.get(faculty)!.push(course)
  }

  // Build the courses array with faculty comments
  const coursesCode: string[] = []
  for (const [faculty, courses] of coursesByFaculty) {
    coursesCode.push(`\n    // ${faculty}`)
    for (const course of courses) {
      coursesCode.push(formatCourse(course))
    }
  }

  const locationCode = data.location.coordinates
    ? `  readonly location = {
    city: "${escapeTs(data.location.city)}",
    province: "${escapeTs(data.location.province)}",
    coordinates: {
      latitude: ${data.location.coordinates.latitude},
      longitude: ${data.location.coordinates.longitude},
    },
  }`
    : `  readonly location = {
    city: "${escapeTs(data.location.city)}",
    province: "${escapeTs(data.location.province)}",
  }`

  const calculateApsBody = generateCalculateApsMethod(data)

  return `import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"
import { percentageToLevel } from "@/lib/aps/utils"

/**
 * ${data.name} (${data.shortName}) class
 * Auto-generated from prospectus upload on ${new Date().toISOString().split("T")[0]}
 */
export class ${className} extends BaseUniversity {
  readonly id = "${escapeTs(data.id)}"
  readonly name = "${escapeTs(data.name)}"
  readonly shortName = "${escapeTs(data.shortName)}"
  readonly website = "${escapeTs(data.website || `https://www.${data.id}.ac.za`)}"
${locationCode}

  protected readonly _courses: Course[] = [${coursesCode.join("\n")}
  ]

${calculateApsBody}
}
`
}

/**
 * Generate the calculateApsScore method based on APS rules.
 */
function generateCalculateApsMethod(data: ProspectusData): string {
  if (!data.apsRules) {
    // Default: standard APS (sum top 6, exclude LO, exclude level 1)
    return `  calculateApsScore(subjects: Record<string, number>): number {
    const entries = Object.entries(subjects)
    let total = 0
    const eligible: number[] = []

    for (const [name, rawVal] of entries) {
      const level = rawVal > 7 ? percentageToLevel(rawVal) : rawVal
      if (name.toLowerCase().includes("life orientation")) continue
      if (level <= 1) continue
      eligible.push(level)
    }

    eligible.sort((a, b) => b - a)
    const top = eligible.slice(0, 6)
    total = top.reduce((sum, lvl) => sum + lvl, 0)
    return total
  }`
  }

  const rules = data.apsRules
  const loHandling =
    rules.life_orientation === "excluded"
      ? `if (name.toLowerCase().includes("life orientation")) continue`
      : rules.life_orientation.startsWith("capped:")
        ? `if (name.toLowerCase().includes("life orientation")) {
        eligible.push(Math.min(level, ${rules.life_orientation.split(":")[1]}))
        continue
      }`
        : "" // "included" — no special handling

  const levelExclusion = rules.level_1_exclusion
    ? `if (level <= 1) continue`
    : ""

  const subjectsCounted =
    rules.subjects_counted === "top_6"
      ? 6
      : rules.subjects_counted === "top_7"
        ? 7
        : null // "all" — no slicing

  const slicing = subjectsCounted
    ? `eligible.sort((a, b) => b - a)
    const top = eligible.slice(0, ${subjectsCounted})
    total = top.reduce((sum, lvl) => sum + lvl, 0)`
    : `total = eligible.reduce((sum, lvl) => sum + lvl, 0)`

  return `  calculateApsScore(subjects: Record<string, number>): number {
    const entries = Object.entries(subjects)
    let total = 0
    const eligible: number[] = []

    for (const [name, rawVal] of entries) {
      const level = rawVal > 7 ? percentageToLevel(rawVal) : rawVal
      ${loHandling}
      ${levelExclusion}
      eligible.push(level)
    }

    ${slicing}
    return total
  }`
}

/**
 * Generate the import line for index.ts
 */
export function generateImportLine(data: ProspectusData): string {
  const className = toClassName(data.shortName || data.id)
  return `import { ${className} } from "./${data.id}"`
}

/**
 * Generate the instance line for the instances array
 */
export function generateInstanceLine(data: ProspectusData): string {
  const className = toClassName(data.shortName || data.id)
  return `  new ${className}(),`
}
