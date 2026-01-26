import { OFFICIAL_SUBJECTS, OFFICIAL_STATISTICS } from "./matric/constants"
import { Subject, ValidationResult } from "./matric/types"
import { calculateAchievementLevel } from "./matric/utils"

export * from "./matric/types"
export * from "./matric/utils"

function validateSubject(subject: Subject): { isValid: boolean; warnings: string[]; errors: string[] } {
  const warnings: string[] = []
  const errors: string[] = []

  if (subject.percentage < 0 || subject.percentage > 100) errors.push(`Invalid percentage: ${subject.percentage}`)
  if (subject.achievementLevel !== undefined) {
    const expected = calculateAchievementLevel(subject.percentage)
    if (subject.achievementLevel !== expected) warnings.push(`Level mismatch: expected ${expected}`)
  }
  if (!subject.name || subject.name.trim().length < 3) errors.push(`Invalid name: "${subject.name}"`)

  const nameUpper = subject.name.toUpperCase()
  let match = false
  for (const [code, names] of Object.entries(OFFICIAL_SUBJECTS)) {
    if (names.some(n => nameUpper.includes(n.toUpperCase()) || n.toUpperCase().includes(nameUpper))) {
      match = true; if (subject.code && subject.code !== code) warnings.push(`Code mismatch: expected ${code}`)
      break
    }
  }
  if (!match && subject.name.length > 5) warnings.push(`Unrecognized subject: ${subject.name}`)
  return { isValid: errors.length === 0, warnings, errors }
}

export function validateMatricResults(subjects: Subject[]): ValidationResult {
  const warnings: string[] = [], errors: string[] = [], subjectValidation: any[] = []
  subjects.forEach((s) => {
    const v = validateSubject(s); subjectValidation.push({ subject: s, ...v })
    errors.push(...v.errors); warnings.push(...v.warnings)
  })

  const valid = subjects.filter((_, i) => subjectValidation[i].isValid)
  const avg = valid.length > 0 ? valid.reduce((sum, s) => sum + s.percentage, 0) / valid.length : 0
  const bachelor = valid.length >= 7 && valid.filter(s => s.percentage >= 30).length >= 7 &&
    valid.some(s => s.name.toUpperCase().includes("MATH")) &&
    valid.some(s => s.name.toUpperCase().includes("LIFE") || s.name.toUpperCase().includes("PHYS"))

  const distinctions = valid.filter(s => s.percentage >= 80).length
  if (valid.length < 7) errors.push(`Need 7 subjects, found ${valid.length}`)

  return {
    isValid: errors.length === 0, warnings, errors,
    statistics: { totalSubjects: valid.length, averagePercentage: Math.round(avg * 10) / 10, bachelorPassEligible: bachelor, distinctionCount: distinctions },
    subjectValidation
  }
}

export const getOfficialSubjects = () => OFFICIAL_SUBJECTS
export const getOfficialStatistics = () => OFFICIAL_STATISTICS
