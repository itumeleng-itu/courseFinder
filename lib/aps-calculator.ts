/**
 * APS Calculator for South African Universities
 * Based on official 2026 prospectus information
 */

import type { SubjectEntry } from "./types"

export interface SubjectGrade {
  name: string
  percentage: number
}

export interface APSResult {
  aps: number
  method: string
  breakdown: string[]
  eligibleSubjects: SubjectGrade[]
}

// APS calculation based on South African university standards
export function calculateAPS(subjects: SubjectEntry[], universityId: string): APSResult {
  const validSubjects = subjects.filter((s) => s.name && s.percentage > 0)

  if (validSubjects.length === 0) return { aps: 0, method: "", breakdown: [], eligibleSubjects: [] }

  const lifeOrientationSubject = validSubjects.find((s) => s.name.toLowerCase() === "life orientation")
  const otherSubjects = validSubjects.filter((s) => s.name.toLowerCase() !== "life orientation")

  otherSubjects.sort((a, b) => b.percentage - a.percentage)

  const top6 = otherSubjects.slice(0, 6)
  let total = top6.reduce((sum, s) => sum + s.percentage, 0)

  if (lifeOrientationSubject && top6.length < 6) {
    total += lifeOrientationSubject.percentage
  }

  switch (universityId.toLowerCase()) {
    case "uct":
      return {
        aps: total,
        method: "UCT: Sum of 6 best subject percentages (max 600)",
        breakdown: top6.map((s) => `${s.name}: ${s.percentage}%`),
        eligibleSubjects: top6,
      }
    case "rhodes":
    case "ru":
      return {
        aps: Math.round((total / 10) * 10) / 10,
        method: "Rhodes: Sum of 6 best subjects ÷ 10 (max ~60)",
        breakdown: top6.map((s) => `${s.name}: ${s.percentage}% = ${(s.percentage / 10).toFixed(1)} pts`),
        eligibleSubjects: top6,
      }
    case "nmu":
      return {
        aps: total,
        method: "NMU: Sum of 6 best subject percentages (max 600, +7 bonus possible)",
        breakdown: top6.map((s) => `${s.name}: ${s.percentage}%`),
        eligibleSubjects: top6,
      }
    case "wits":
      return calculateWitsAPS(subjects)
    case "stellenbosch":
    case "sun":
      return {
        aps: Math.round((total / 6) * 10) / 10,
        method: "Stellenbosch: Average of 6 best subjects (percentage)",
        breakdown: top6.map((s) => `${s.name}: ${s.percentage}%`),
        eligibleSubjects: top6,
      }
    case "uwc":
      return calculateUWCAPS(subjects)
    case "ufh":
      return calculateUFHAPS(subjects)
    case "mut":
      return calculateMUTAPS(subjects)
    case "cut":
      return calculateCUTAPS(subjects)
    default:
      // Standard method for most universities (UP, UJ, UNIVEN, VUT, WSU, NWU, UL, etc.)
      return {
        aps: calculateStandardAPS(subjects),
        method: "Standard: NSC 1-7 scale, 6 subjects (excluding LO) (max 42)",
        breakdown: top6.map((s) => `${s.name}: ${s.percentage}% = ${percentageToLevel(Number(s.percentage))} pts`),
        eligibleSubjects: top6,
      }
  }
}

/**
 * Calculate APS score from subjects using the standard NSC 1-7 scale
 */
function calculateStandardAPS(subjects: SubjectEntry[]): number {
  // Filter out invalid subjects
  const validSubjects = subjects.filter(
    (s) => s.name && s.percentage !== undefined && s.percentage !== null && s.percentage > 0,
  )

  if (validSubjects.length === 0) return 0

  // Exclude Life Orientation
  const subjectsWithoutLO = validSubjects.filter((s) => s.name.toLowerCase() !== "life orientation")

  // Sort by percentage descending
  subjectsWithoutLO.sort((a, b) => Number(b.percentage) - Number(a.percentage))

  // Take top 6 subjects
  const top6 = subjectsWithoutLO.slice(0, 6)

  // Convert percentages to APS points (1-7 scale)
  const apsPoints = top6.map((subject) => {
    const percentage = Number(subject.percentage)
    if (percentage >= 80) return 7
    if (percentage >= 70) return 6
    if (percentage >= 60) return 5
    if (percentage >= 50) return 4
    if (percentage >= 40) return 3
    if (percentage >= 30) return 2
    return 1
  })

  // Sum up the points
  return apsPoints.reduce((sum, points) => sum + points, 0)
}

/**
 * Convert percentage to NSC Achievement Level (1-7 scale)
 */
export function percentageToLevel(percentage: number): number {
  if (percentage >= 80) return 7
  if (percentage >= 70) return 6
  if (percentage >= 60) return 5
  if (percentage >= 50) return 4
  if (percentage >= 40) return 3
  if (percentage >= 30) return 2
  return 1
}

/**
 * Convert percentage to NSC Achievement Level (1-8 scale for some universities)
 */
export function percentageToLevel8(percentage: number): number {
  if (percentage >= 90) return 8
  if (percentage >= 80) return 7
  if (percentage >= 70) return 6
  if (percentage >= 60) return 5
  if (percentage >= 50) return 4
  if (percentage >= 40) return 3
  if (percentage >= 30) return 2
  return 1
}

/**
 * Calculate APS for University of the Witwatersrand (Wits)
 * Method: NSC 1-8 scale using best 7 subjects including LO (LO counts half)
 * Maximum: Variable based on 7 subjects
 */
export function calculateWitsAPS(subjects: SubjectEntry[]): APSResult {
  // Sort all subjects by percentage
  const sortedSubjects = subjects.sort((a, b) => {
    const percentageA = Number(a.percentage)
    const percentageB = Number(b.percentage)
    return percentageB - percentageA
  })

  // Take best 7 subjects
  const bestSeven = sortedSubjects.slice(0, 7)

  let aps = 0
  const breakdown: string[] = []

  bestSeven.forEach((subject) => {
    let points = percentageToLevel8(Number(subject.percentage))

    // Life Orientation counts as half
    if (subject.name.toLowerCase() === "life orientation") {
      points = Math.floor(points / 2)
      breakdown.push(
        `${subject.name}: ${subject.percentage}% = Level ${percentageToLevel8(Number(subject.percentage))} ÷ 2 = ${points} pts`,
      )
    } else {
      breakdown.push(
        `${subject.name}: ${subject.percentage}% = Level ${percentageToLevel8(Number(subject.percentage))} = ${points} pts`,
      )
    }

    aps += points
  })

  return {
    aps,
    method: "Wits: NSC 1-8 scale, best 7 subjects (LO counts half)",
    breakdown,
    eligibleSubjects: bestSeven,
  }
}

/**
 * Calculate APS for University of the Western Cape (UWC)
 * Method: Weighted point system (English/Math up to 15, others up to 8, LO up to 3)
 */
export function calculateUWCAPS(subjects: SubjectEntry[]): APSResult {
  let aps = 0
  const breakdown: string[] = []
  const eligibleSubjects: SubjectEntry[] = []

  subjects.forEach((subject) => {
    const name = subject.name.toLowerCase()
    let points = 0

    if (name.includes("english") || name.includes("mathematics")) {
      // English and Mathematics: up to 15 points
      points = Math.min(15, Math.floor((Number(subject.percentage) / 100) * 15))
      breakdown.push(`${subject.name}: ${subject.percentage}% = ${points}/15 pts`)
    } else if (name === "life orientation") {
      // Life Orientation: up to 3 points
      points = Math.min(3, Math.floor((Number(subject.percentage) / 100) * 3))
      breakdown.push(`${subject.name}: ${subject.percentage}% = ${points}/3 pts`)
    } else {
      // Other subjects: up to 8 points
      points = Math.min(8, Math.floor((Number(subject.percentage) / 100) * 8))
      breakdown.push(`${subject.name}: ${subject.percentage}% = ${points}/8 pts`)
    }

    aps += points
    eligibleSubjects.push(subject)
  })

  return {
    aps,
    method: "UWC: Weighted points (Eng/Math: 15, Others: 8, LO: 3)",
    breakdown,
    eligibleSubjects,
  }
}

/**
 * Calculate APS for Fort Hare (UFH)
 * Method: Best 6 subjects with Life Orientation capped at Level 4
 */
export function calculateUFHAPS(subjects: SubjectEntry[]): APSResult {
  const nonLOSubjects = subjects.filter((s) => s.name.toLowerCase() !== "life orientation")
  const lifeOrientation = subjects.find((s) => s.name.toLowerCase() === "life orientation")

  // Take best 5 non-LO subjects
  const bestFive = nonLOSubjects
    .sort((a, b) => {
      const percentageA = Number(a.percentage)
      const percentageB = Number(b.percentage)
      return percentageB - percentageA
    })
    .slice(0, 5)

  let aps = bestFive.reduce((sum, subject) => sum + percentageToLevel(Number(subject.percentage)), 0)
  const breakdown = bestFive.map(
    (s) => `${s.name}: ${s.percentage}% = Level ${percentageToLevel(Number(s.percentage))}`,
  )
  const eligibleSubjects = [...bestFive]

  // Add Life Orientation (capped at Level 4)
  if (lifeOrientation) {
    const loLevel = Math.min(4, percentageToLevel(Number(lifeOrientation.percentage)))
    aps += loLevel
    breakdown.push(`${lifeOrientation.name}: ${lifeOrientation.percentage}% = Level ${loLevel} (capped at 4)`)
    eligibleSubjects.push(lifeOrientation)
  }

  return {
    aps,
    method: "UFH: Best 5 subjects + LO (capped at Level 4) (max 39)",
    breakdown,
    eligibleSubjects,
  }
}

/**
 * Calculate APS for MUT (Mangosuthu University of Technology)
 * Method: Best 5 subjects using MUT's point table (max 40)
 */
export function calculateMUTAPS(subjects: SubjectEntry[]): APSResult {
  const eligibleSubjects = subjects
    .filter((s) => s.name.toLowerCase() !== "life orientation")
    .sort((a, b) => {
      const percentageA = Number(a.percentage)
      const percentageB = Number(b.percentage)
      return percentageB - percentageA
    })
    .slice(0, 5)

  // MUT's point table: 90-100%=8, 80-89%=7, 70-79%=6, 60-69%=5, 50-59%=4, 40-49%=3
  const getMUTPoints = (percentage: number): number => {
    if (percentage >= 90) return 8
    if (percentage >= 80) return 7
    if (percentage >= 70) return 6
    if (percentage >= 60) return 5
    if (percentage >= 50) return 4
    if (percentage >= 40) return 3
    return 0
  }

  const aps = eligibleSubjects.reduce((sum, subject) => sum + getMUTPoints(Number(subject.percentage)), 0)

  return {
    aps,
    method: "MUT: Best 5 subjects, MUT point table (max 40)",
    breakdown: eligibleSubjects.map((s) => `${s.name}: ${s.percentage}% = ${getMUTPoints(Number(s.percentage))} pts`),
    eligibleSubjects,
  }
}

/**
 * Calculate APS for CUT (Central University of Technology)
 * Method: NSC 1-7 scale + Life Orientation counts as 1 point
 */
export function calculateCUTAPS(subjects: SubjectEntry[]): APSResult {
  const nonLOSubjects = subjects.filter((s) => s.name.toLowerCase() !== "life orientation")
  const lifeOrientation = subjects.find((s) => s.name.toLowerCase() === "life orientation")

  // Take best 6 non-LO subjects
  const bestSix = nonLOSubjects
    .sort((a, b) => {
      const percentageA = Number(a.percentage)
      const percentageB = Number(b.percentage)
      return percentageB - percentageA
    })
    .slice(0, 6)

  let aps = bestSix.reduce((sum, subject) => sum + percentageToLevel(Number(subject.percentage)), 0)
  const breakdown = bestSix.map((s) => `${s.name}: ${s.percentage}% = Level ${percentageToLevel(Number(s.percentage))}`)
  const eligibleSubjects = [...bestSix]

  // Add Life Orientation (always counts as 1 point)
  if (lifeOrientation) {
    aps += 1
    breakdown.push(`${lifeOrientation.name}: ${lifeOrientation.percentage}% = 1 pt (fixed)`)
    eligibleSubjects.push(lifeOrientation)
  }

  return {
    aps,
    method: "CUT: Best 6 subjects + LO (1 point) (max 43)",
    breakdown,
    eligibleSubjects,
  }
}

/**
 * Get university-specific APS information
 */
export function getUniversityAPSInfo(universityId: string): { method: string; maxPoints: number; notes: string } {
  const apsInfo: Record<
    string,
    {
      method: string
      maxPoints: number
      notes: string
    }
  > = {
    uct: {
      method: "Sum of 6 best subject percentages",
      maxPoints: 600,
      notes: "Life Orientation excluded",
    },
    wits: {
      method: "Best 7 subjects (1-8 scale)",
      maxPoints: 56,
      notes: "Life Orientation counts half",
    },
    up: {
      method: "Best 6 subjects (1-7 scale)",
      maxPoints: 42,
      notes: "Standard NSC scale",
    },
    stellenbosch: {
      method: "Average of 6 best subjects",
      maxPoints: 100,
      notes: "Percentage-based",
    },
    rhodes: {
      method: "Sum of 6 best ÷ 10",
      maxPoints: 60,
      notes: "Percentage-based",
    },
    nmu: {
      method: "Sum of 6 best percentages",
      maxPoints: 600,
      notes: "Plus disadvantage bonus",
    },
    uwc: {
      method: "Weighted point system",
      maxPoints: 67,
      notes: "Eng/Math: 15pts, Others: 8pts",
    },
  }

  return (
    apsInfo[universityId.toLowerCase()] || {
      method: "Standard NSC scale",
      maxPoints: 42,
      notes: "Best 6 subjects",
    }
  )
}
