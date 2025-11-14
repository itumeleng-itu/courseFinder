/**
 * Matric Results Validation
 * Based on official Department of Basic Education standards
 * Source: https://www.sanews.gov.za/south-africa/class-2024-achieves-historic-pass-rate
 */

export interface Subject {
  name: string
  percentage: number
  code?: string
  achievementLevel?: number
}

export interface ValidationResult {
  isValid: boolean
  warnings: string[]
  errors: string[]
  statistics: {
    totalSubjects: number
    averagePercentage: number
    bachelorPassEligible: boolean
    distinctionCount: number
  }
  subjectValidation: Array<{
    subject: Subject
    isValid: boolean
    warnings: string[]
    errors: string[]
  }>
}

// Official subject codes and names from Department of Basic Education
const OFFICIAL_SUBJECTS: Record<string, string[]> = {
  // Home Languages
  "ZULHL": ["isiZulu Home Language", "Zulu Home Language"],
  "XHHL": ["isiXhosa Home Language", "Xhosa Home Language"],
  "AFHL": ["Afrikaans Home Language"],
  "ENGHL": ["English Home Language"],
  "SOTHO": ["Sesotho", "Sesotho Home Language"],
  "NSOTHO": ["Northern Sotho", "Sepedi"],
  "SSOTHO": ["Southern Sotho"],
  "SETSWANA": ["Setswana", "Tswana"],
  "XITSONGA": ["Xitsonga", "Tsonga"],
  "TSHIVENDA": ["Tshivenda", "Venda"],
  
  // Additional Languages
  "ENGFA": ["English First Additional Language"],
  "ENGLA": ["English Second Additional Language"],
  
  // Mathematics
  "MATH": ["Mathematics"],
  "MATHLIT": ["Mathematical Literacy"],
  
  // Sciences
  "LIFE": ["Life Sciences"],
  "PHYS": ["Physical Sciences"],
  "CHEM": ["Chemistry"],
  "BIOLOGY": ["Biology"],
  
  // Other subjects
  "GEOG": ["Geography"],
  "HIST": ["History"],
  "BUSINESS": ["Business Studies"],
  "ACCOUNTING": ["Accounting"],
  "ECONOMICS": ["Economics"],
  "CAT": ["Computer Applications Technology"],
  "IT": ["Information Technology"],
  "LIFEOR": ["Life Orientation"],
  "AGRIC": ["Agricultural Sciences"],
  "TOURISM": ["Tourism"],
  "CONSUMER": ["Consumer Studies"],
  "DRAAD": ["Dramatic Arts"],
  "MUSIC": ["Music"],
  "VISUAL": ["Visual Arts"],
}

// Achievement levels (1-8) based on percentage ranges
const ACHIEVEMENT_LEVELS = {
  8: { min: 0, max: 29, label: "Not Achieved" },
  7: { min: 30, max: 39, label: "Elementary Achievement" },
  6: { min: 40, max: 49, label: "Moderate Achievement" },
  5: { min: 50, max: 59, label: "Adequate Achievement" },
  4: { min: 60, max: 69, label: "Substantial Achievement" },
  3: { min: 70, max: 79, label: "Meritorious Achievement" },
  2: { min: 80, max: 89, label: "Outstanding Achievement" },
  1: { min: 90, max: 100, label: "Outstanding Achievement" },
}

// Statistics from 2024 matric results
const OFFICIAL_STATISTICS = {
  overallPassRate: 87.3,
  bachelorPassRate: 47.8,
  mathematicsPassRate: 69.1,
  physicalSciencesPassRate: 75.6,
  distinctionRate: 10.8, // KwaZulu-Natal achieved highest at 10.8%
}

/**
 * Calculate achievement level from percentage
 */
export function calculateAchievementLevel(percentage: number): number {
  for (const [level, range] of Object.entries(ACHIEVEMENT_LEVELS)) {
    if (percentage >= range.min && percentage <= range.max) {
      return parseInt(level)
    }
  }
  return 8 // Default to "Not Achieved" if out of range
}

/**
 * Validate a single subject
 */
function validateSubject(subject: Subject): { isValid: boolean; warnings: string[]; errors: string[] } {
  const warnings: string[] = []
  const errors: string[] = []

  // Validate percentage
  if (subject.percentage < 0 || subject.percentage > 100) {
    errors.push(`Invalid percentage: ${subject.percentage}. Must be between 0-100.`)
  }

  // Validate achievement level if provided
  if (subject.achievementLevel !== undefined) {
    if (subject.achievementLevel < 1 || subject.achievementLevel > 8) {
      errors.push(`Invalid achievement level: ${subject.achievementLevel}. Must be between 1-8.`)
    } else {
      // Check if achievement level matches percentage
      const expectedLevel = calculateAchievementLevel(subject.percentage)
      if (subject.achievementLevel !== expectedLevel) {
        warnings.push(
          `Achievement level ${subject.achievementLevel} doesn't match percentage ${subject.percentage}% (expected level ${expectedLevel})`
        )
      }
    }
  }

  // Validate subject name
  if (!subject.name || subject.name.trim().length < 3) {
    errors.push(`Invalid subject name: "${subject.name}"`)
  }

  // Check if subject name matches official subjects
  const subjectNameUpper = subject.name.toUpperCase()
  let foundMatch = false

  for (const [code, names] of Object.entries(OFFICIAL_SUBJECTS)) {
    for (const officialName of names) {
      if (subjectNameUpper.includes(officialName.toUpperCase()) || 
          officialName.toUpperCase().includes(subjectNameUpper)) {
        foundMatch = true
        if (subject.code && subject.code !== code) {
          warnings.push(`Subject code mismatch: found "${subject.code}" but expected "${code}" for "${subject.name}"`)
        }
        break
      }
    }
    if (foundMatch) break
  }

  if (!foundMatch && subject.name.length > 5) {
    warnings.push(`Subject name "${subject.name}" may not match official subject names`)
  }

  // Check for common OCR errors
  const commonErrors: Record<string, string> = {
    "MATHEMATICS": "MATH",
    "MATHS": "MATH",
    "PHYSICAL SCIENCE": "PHYS",
    "LIFE SCIENCE": "LIFE",
    "ENGLISH": "ENGFA",
    "AFRIKAANS": "AFHL",
  }

  for (const [errorName, correctCode] of Object.entries(commonErrors)) {
    if (subjectNameUpper.includes(errorName) && subject.code && subject.code !== correctCode) {
      warnings.push(`Possible OCR error: subject may be "${correctCode}" instead of "${subject.code}"`)
    }
  }

  return {
    isValid: errors.length === 0,
    warnings,
    errors,
  }
}

/**
 * Validate matric results against official standards
 */
export function validateMatricResults(subjects: Subject[]): ValidationResult {
  const warnings: string[] = []
  const errors: string[] = []
  const subjectValidation: ValidationResult["subjectValidation"] = []

  // Validate each subject
  subjects.forEach((subject) => {
    const validation = validateSubject(subject)
    subjectValidation.push({
      subject,
      isValid: validation.isValid,
      warnings: validation.warnings,
      errors: validation.errors,
    })

    errors.push(...validation.errors)
    warnings.push(...validation.warnings)
  })

  // Calculate statistics
  const validSubjects = subjects.filter((_, idx) => subjectValidation[idx].isValid)
  const totalSubjects = validSubjects.length
  const averagePercentage =
    totalSubjects > 0
      ? validSubjects.reduce((sum, s) => sum + s.percentage, 0) / totalSubjects
      : 0

  // Bachelor pass eligibility (need at least 7 subjects with minimum requirements)
  // According to 2024 stats: 47.8% achieved Bachelor passes
  const bachelorPassEligible =
    totalSubjects >= 7 &&
    validSubjects.filter((s) => s.percentage >= 30).length >= 7 &&
    validSubjects.some((s) => s.name.toUpperCase().includes("MATH") || s.name.toUpperCase().includes("MATHEMATICAL")) &&
    validSubjects.some((s) => s.name.toUpperCase().includes("LIFE") || s.name.toUpperCase().includes("PHYSICAL"))

  // Count distinctions (80% and above)
  const distinctionCount = validSubjects.filter((s) => s.percentage >= 80).length

  // Overall validation checks
  if (totalSubjects < 7) {
    errors.push(`Insufficient subjects: Found ${totalSubjects}, need at least 7 for NSC`)
  }

  if (totalSubjects > 9) {
    warnings.push(`Unusual number of subjects: ${totalSubjects}. Most students take 7-8 subjects.`)
  }

  // Check against 2024 statistics
  const distinctionRate = totalSubjects > 0 ? (distinctionCount / totalSubjects) * 100 : 0
  if (distinctionRate > 15) {
    warnings.push(
      `High distinction rate: ${distinctionRate.toFixed(1)}%. National average was ${OFFICIAL_STATISTICS.distinctionRate}% in 2024.`
    )
  }

  // Validate Mathematics performance
  const mathSubjects = validSubjects.filter(
    (s) => s.name.toUpperCase().includes("MATH") && !s.name.toUpperCase().includes("LITERACY")
  )
  if (mathSubjects.length > 0) {
    const mathPassRate = (mathSubjects.filter((s) => s.percentage >= 30).length / mathSubjects.length) * 100
    if (mathPassRate < OFFICIAL_STATISTICS.mathematicsPassRate - 20) {
      warnings.push(
        `Mathematics pass rate (${mathPassRate.toFixed(1)}%) is significantly below national average (${OFFICIAL_STATISTICS.mathematicsPassRate}%)`
      )
    }
  }

  return {
    isValid: errors.length === 0,
    warnings,
    errors,
    statistics: {
      totalSubjects,
      averagePercentage: Math.round(averagePercentage * 10) / 10,
      bachelorPassEligible,
      distinctionCount,
    },
    subjectValidation,
  }
}

/**
 * Get official subject information
 */
export function getOfficialSubjects(): typeof OFFICIAL_SUBJECTS {
  return OFFICIAL_SUBJECTS
}

/**
 * Get official statistics
 */
export function getOfficialStatistics(): typeof OFFICIAL_STATISTICS {
  return OFFICIAL_STATISTICS
}


