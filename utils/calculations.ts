export function getAPSPoints(percentage: number): number {
  if (percentage >= 90) return 8 // Level 8: 90-100%
  if (percentage >= 80) return 7 // Level 7: 80-89%
  if (percentage >= 70) return 6 // Level 6: 70-79%
  if (percentage >= 60) return 5 // Level 5: 60-69%
  if (percentage >= 50) return 4 // Level 4: 50-59%
  if (percentage >= 40) return 3 // Level 3: 40-49%
  if (percentage >= 30) return 2 // Level 2: 30-39%
  return 1 // Level 1: 0-29%
}

export interface AlternativeRequirement {
  alternatives: { subject: string; level: number }[]
}

// This function is now moved to the BaseUniversity class
export function meetsSubjectRequirements(
  subjectLevels: Record<string, number>,
  requirements: Record<string, number | AlternativeRequirement>,
): boolean {
  // Debug the subject levels and requirements
  console.log("Checking subject requirements:", { subjectLevels, requirements })

  for (const [subject, requirement] of Object.entries(requirements)) {
    // Case 1: Simple requirement (e.g., Mathematics: 5)
    if (typeof requirement === "number") {
      // Check if any subject matches (case-insensitive and partial match)
      let foundMatch = false
      for (const [studentSubject, level] of Object.entries(subjectLevels)) {
        // Normalize subject names for comparison
        const normalizedRequirement = subject.toLowerCase()
        const normalizedStudentSubject = studentSubject.toLowerCase()

        // Check for exact match or if student subject contains the requirement
        if (
          normalizedStudentSubject === normalizedRequirement ||
          normalizedStudentSubject.includes(normalizedRequirement) ||
          normalizedRequirement.includes(normalizedStudentSubject)
        ) {
          if (level >= requirement) {
            foundMatch = true
            console.log(
              `Subject match found: ${studentSubject} (level ${level}) matches ${subject} (required level ${requirement})`,
            )
            break
          }
        }
      }

      if (!foundMatch) {
        console.log(`Failed to find match for ${subject} with level ${requirement}`)
        return false
      }
    }
    // Case 2: Alternative requirements (e.g., Mathematics OR Mathematical Literacy)
    else if (requirement.alternatives) {
      // Check if at least one alternative is met
      let meetsAnyAlternative = false

      for (const alt of requirement.alternatives) {
        // Check if any subject matches (case-insensitive and partial match)
        for (const [studentSubject, level] of Object.entries(subjectLevels)) {
          // Normalize subject names for comparison
          const normalizedRequirement = alt.subject.toLowerCase()
          const normalizedStudentSubject = studentSubject.toLowerCase()

          // Check for exact match or if student subject contains the requirement
          if (
            normalizedStudentSubject === normalizedRequirement ||
            normalizedStudentSubject.includes(normalizedRequirement) ||
            normalizedRequirement.includes(normalizedStudentSubject)
          ) {
            if (level >= alt.level) {
              meetsAnyAlternative = true
              console.log(
                `Alternative match found: ${studentSubject} (level ${level}) matches ${alt.subject} (required level ${alt.level})`,
              )
              break
            }
          }
        }

        if (meetsAnyAlternative) break
      }

      if (!meetsAnyAlternative) {
        console.log(`Failed to meet any alternative for ${subject}`)
        return false
      }
    }
  }
  return true
}
