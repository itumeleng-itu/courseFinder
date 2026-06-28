/**
 * Admin data validators for prospectus and performance report uploads.
 * Uses Zod for schema validation with detailed error reporting.
 */

import { z } from "zod"

// ─── Subject aliases for cross-referencing ────────────────────────────────────

const VALID_SUBJECT_KEYWORDS = [
  "english", "afrikaans", "isizulu", "isixhosa", "sesotho", "setswana",
  "sepedi", "xitsonga", "tshivenda", "isindebele", "siswati",
  "mathematics", "mathematical literacy", "technical mathematics",
  "physical sciences", "technical sciences", "life sciences",
  "accounting", "business studies", "economics",
  "geography", "history", "tourism",
  "agricultural sciences", "consumer studies",
  "information technology", "computer applications technology",
  "engineering graphics and design", "civil technology",
  "electrical technology", "mechanical technology",
  "dramatic arts", "music", "visual arts", "dance studies",
  "religion studies", "life orientation",
  "home language", "first additional language", "second additional language",
  "south african language", "additional language",
]

// ─── Prospectus Schemas ──────────────────────────────────────────────────────

const SubjectAlternativeSchema = z.object({
  subject: z.string().min(1, "Subject name required"),
  level: z.number().int().min(1).max(7, "Level must be 1-7"),
})

const SubjectRequirementSchema = z.union([
  z.number().int().min(1).max(7),
  z.object({
    alternatives: z.array(SubjectAlternativeSchema).min(1, "At least one alternative required"),
  }),
])

const CourseSchema = z.object({
  id: z.string().min(1, "Course ID required"),
  name: z.string().min(3, "Course name too short"),
  faculty: z.string().min(1, "Faculty required"),
  apsMin: z.number().int().min(0).max(100, "APS must be 0-100"),
  duration: z.string().min(1, "Duration required"),
  subjectRequirements: z.record(z.string(), SubjectRequirementSchema).optional(),
  description: z.string().optional(),
  campus: z.string().optional(),
  careers: z.union([z.string(), z.array(z.string())]).optional(),
  careerOpportunities: z.union([z.string(), z.array(z.string())]).optional(),
  additionalRequirements: z.union([z.string(), z.array(z.string())]).optional(),
  isExtendedCurriculum: z.boolean().optional(),
  standardProgramId: z.string().optional(),
  extendedDuration: z.string().optional(),
})

const UniversityLocationSchema = z.object({
  city: z.string().min(1),
  province: z.string().min(1),
  coordinates: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }).optional(),
})

const APSRulesSchema = z.object({
  life_orientation: z.enum(["excluded", "included"]).or(
    z.string().regex(/^capped:\d+$/, "Must be 'excluded', 'included', or 'capped:N'")
  ),
  level_1_exclusion: z.boolean(),
  subjects_counted: z.enum(["all", "top_6", "top_7"]),
  additional_tests: z.enum(["none", "NBT"]),
  notes: z.string().optional(),
})

export const ProspectusDataSchema = z.object({
  id: z.string().min(1).regex(/^[a-z0-9-]+$/, "ID must be lowercase alphanumeric with dashes"),
  name: z.string().min(3),
  shortName: z.string().min(2).max(10),
  website: z.string().url().optional(),
  location: UniversityLocationSchema,
  apsRules: APSRulesSchema.optional(),
  courses: z.array(CourseSchema).min(1, "At least one course required"),
})

export type ProspectusData = z.infer<typeof ProspectusDataSchema>

// ─── Performance Report Schemas ──────────────────────────────────────────────

const YearResultSchema = z.object({
  progressed: z.string().regex(/^\d+$/, "Must be numeric string"),
  wrote: z.string().regex(/^\d+$/, "Must be numeric string"),
  achieved: z.string().regex(/^\d+$/, "Must be numeric string"),
  percentage: z.string().regex(/^\d+(\.\d+)?$/, "Must be numeric string"),
})

const SchoolPerformanceSchema = z.object({
  district: z.string().min(1, "District required"),
  emis: z.string().min(1, "EMIS number required"),
  centreNo: z.string().min(1, "Centre number required"),
  name: z.string().min(1, "School name required"),
  quintile: z.string().regex(/^[1-5]|99$/, "Quintile must be 1-5 or 99"),
  results: z.record(z.string(), YearResultSchema),
})

export const PerformanceReportSchema = z.array(SchoolPerformanceSchema)

export type SchoolPerformance = z.infer<typeof SchoolPerformanceSchema>

// ─── Validation Functions ─────────────────────────────────────────────────────

export interface ValidationIssue {
  path: string
  message: string
  severity: "error" | "warning"
}

/**
 * Validate prospectus data with detailed issue reporting
 */
export function validateProspectusData(data: unknown): {
  valid: boolean
  data?: ProspectusData
  issues: ValidationIssue[]
} {
  const issues: ValidationIssue[] = []

  // Schema validation
  const result = ProspectusDataSchema.safeParse(data)

  if (!result.success) {
    for (const error of result.error.issues) {
      issues.push({
        path: error.path.join("."),
        message: error.message,
        severity: "error",
      })
    }
    return { valid: false, issues }
  }

  const parsed = result.data

  // Check for duplicate course IDs
  const courseIds = new Set<string>()
  for (const course of parsed.courses) {
    if (courseIds.has(course.id)) {
      issues.push({
        path: `courses.${course.id}`,
        message: `Duplicate course ID: ${course.id}`,
        severity: "error",
      })
    }
    courseIds.add(course.id)
  }

  // Check subject names against known subjects
  for (let i = 0; i < parsed.courses.length; i++) {
    const course = parsed.courses[i]
    if (course.subjectRequirements) {
      for (const [subjectKey, req] of Object.entries(course.subjectRequirements)) {
        const keyLower = subjectKey.toLowerCase()
        const isKnown = VALID_SUBJECT_KEYWORDS.some(
          (s) => keyLower.includes(s) || s.includes(keyLower)
        )
        if (!isKnown) {
          issues.push({
            path: `courses[${i}].subjectRequirements.${subjectKey}`,
            message: `Unknown subject: "${subjectKey}" — verify this is a valid NSC subject`,
            severity: "warning",
          })
        }

        // Check alternatives subjects too
        if (typeof req === "object" && "alternatives" in req) {
          for (const alt of req.alternatives) {
            const altLower = alt.subject.toLowerCase()
            const altKnown = VALID_SUBJECT_KEYWORDS.some(
              (s) => altLower.includes(s) || s.includes(altLower)
            )
            if (!altKnown) {
              issues.push({
                path: `courses[${i}].subjectRequirements.${subjectKey}.alternatives`,
                message: `Unknown alternative subject: "${alt.subject}"`,
                severity: "warning",
              })
            }
          }
        }
      }
    }
  }

  // Check APS values are reasonable
  for (let i = 0; i < parsed.courses.length; i++) {
    const course = parsed.courses[i]
    if (course.apsMin > 50) {
      issues.push({
        path: `courses[${i}].apsMin`,
        message: `High APS value (${course.apsMin}) — verify this is correct for a standard NSC scale`,
        severity: "warning",
      })
    }
    if (course.apsMin === 0) {
      issues.push({
        path: `courses[${i}].apsMin`,
        message: `APS is 0 — this may indicate missing data`,
        severity: "warning",
      })
    }
  }

  const hasErrors = issues.some((i) => i.severity === "error")
  return { valid: !hasErrors, data: parsed, issues }
}

/**
 * Validate a single school performance entry
 */
export function validateSchoolEntry(entry: SchoolPerformance): ValidationIssue[] {
  const issues: ValidationIssue[] = []

  for (const [year, result] of Object.entries(entry.results)) {
    const wrote = parseInt(result.wrote)
    const achieved = parseInt(result.achieved)
    const percentage = parseFloat(result.percentage)
    const progressed = parseInt(result.progressed)

    if (achieved > wrote) {
      issues.push({
        path: `${entry.emis}.results.${year}`,
        message: `Achieved (${achieved}) > Wrote (${wrote})`,
        severity: "error",
      })
    }

    if (wrote > 0) {
      const calculatedPct = (achieved / wrote) * 100
      if (Math.abs(calculatedPct - percentage) > 0.5) {
        issues.push({
          path: `${entry.emis}.results.${year}.percentage`,
          message: `Percentage mismatch: reported ${percentage}%, calculated ${calculatedPct.toFixed(1)}%`,
          severity: "warning",
        })
      }
    }

    if (percentage > 100) {
      issues.push({
        path: `${entry.emis}.results.${year}.percentage`,
        message: `Pass rate exceeds 100%: ${percentage}%`,
        severity: "error",
      })
    }

    if (progressed < 0 || wrote < 0 || achieved < 0) {
      issues.push({
        path: `${entry.emis}.results.${year}`,
        message: `Negative values detected`,
        severity: "error",
      })
    }
  }

  return issues
}

/**
 * Validate the full performance report
 */
export function validatePerformanceReport(data: unknown): {
  valid: boolean
  data?: SchoolPerformance[]
  issues: ValidationIssue[]
  stats: {
    totalSchools: number
    districts: number
    years: string[]
  }
} {
  const issues: ValidationIssue[] = []

  const result = PerformanceReportSchema.safeParse(data)

  if (!result.success) {
    for (const error of result.error.issues) {
      issues.push({
        path: error.path.join("."),
        message: error.message,
        severity: "error",
      })
    }
    return {
      valid: false,
      issues,
      stats: { totalSchools: 0, districts: 0, years: [] },
    }
  }

  const parsed = result.data

  // Check for duplicate EMIS numbers
  const emisSet = new Set<string>()
  for (const school of parsed) {
    if (emisSet.has(school.emis)) {
      issues.push({
        path: school.emis,
        message: `Duplicate EMIS number: ${school.emis} (${school.name})`,
        severity: "warning",
      })
    }
    emisSet.add(school.emis)

    // Validate each school entry
    const entryIssues = validateSchoolEntry(school)
    issues.push(...entryIssues)
  }

  // Collect stats
  const districts = new Set(parsed.map((s) => s.district))
  const years = new Set<string>()
  for (const school of parsed) {
    for (const year of Object.keys(school.results)) {
      years.add(year)
    }
  }

  const hasErrors = issues.some((i) => i.severity === "error")
  return {
    valid: !hasErrors,
    data: parsed,
    issues,
    stats: {
      totalSchools: parsed.length,
      districts: districts.size,
      years: Array.from(years).sort(),
    },
  }
}

import { normalizeSubjectName } from "@/lib/subject-aliases"
import { RequirementLevel } from "@/lib/types"

/**
 * Normalizes subject names in a parsed course to their canonical names.
 * This ensures matching logic works correctly with AI-extracted data.
 */
export function normalizeExtractedSubjectNames(course: ProspectusData['courses'][0]): ProspectusData['courses'][0] {
  if (!course.subjectRequirements) return course

  const normalizedReqs: Record<string, RequirementLevel> = {}

  for (const [key, req] of Object.entries(course.subjectRequirements)) {
    const canonicalKey = normalizeSubjectName(key)
    
    if (typeof req === "object" && "alternatives" in req) {
      normalizedReqs[canonicalKey] = {
        alternatives: req.alternatives.map(alt => ({
          subject: normalizeSubjectName(alt.subject),
          level: alt.level
        }))
      }
    } else {
      normalizedReqs[canonicalKey] = req as number
    }
  }

  return {
    ...course,
    subjectRequirements: normalizedReqs
  }
}
