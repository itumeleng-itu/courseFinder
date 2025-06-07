import type { SubjectEntry } from "./types"

// APS calculation based on South African university standards
export function calculateAPS(subjects: SubjectEntry[]): number {
  // Filter out Life Orientation
  const filteredSubjects = subjects.filter((subject) => subject.name !== "life-orientation")

  // Sort subjects by percentage (highest to lowest)
  const sortedSubjects = [...filteredSubjects].sort((a, b) => {
    const percentageA = Number(a.percentage)
    const percentageB = Number(b.percentage)
    return percentageB - percentageA
  })

  // Calculate APS for each subject
  const apsValues = sortedSubjects.map((subject) => {
    const percentage = Number(subject.percentage)

    // Standard APS calculation
    if (percentage >= 90) return 8 // Level 8: 90-100%
    if (percentage >= 80) return 7 // Level 7: 80-89%
    if (percentage >= 70) return 6 // Level 6: 70-79%
    if (percentage >= 60) return 5 // Level 5: 60-69%
    if (percentage >= 50) return 4 // Level 4: 50-59%
    if (percentage >= 40) return 3 // Level 3: 40-49%
    if (percentage >= 30) return 2 // Level 2: 30-39%
    return 1 // Level 1: 0-29%
  })

  // Take the top 6 subjects
  const topSubjects = apsValues.slice(0, 6)

  // Sum the APS values
  return topSubjects.reduce((sum, aps) => sum + aps, 0)
}
