import type { Course } from "@/lib/types"

/**
 * Base University class that all university classes extend
 */
export abstract class BaseUniversity {
  abstract readonly id: string
  abstract readonly name: string
  abstract readonly shortName: string
  abstract readonly website: string
  abstract readonly logo: string
  abstract readonly location: {
    city: string
    province: string
    coordinates: {
      latitude: number
      longitude: number
    }
  }

  protected abstract readonly _courses: Course[]

  /**
   * Get all courses for this university
   */
  get courses(): Course[] {
    return this._courses
  }

  /**
   * Get a course by ID
   */
  getCourse(id: string): Course | undefined {
    return this._courses.find((course) => course.id === id)
  }

  /**
   * Get courses by faculty
   */
  getCoursesByFaculty(faculty: string): Course[] {
    return this._courses.filter((course) => course.faculty === faculty)
  }

  /**
   * Get all faculties
   */
  get faculties(): string[] {
    return Array.from(new Set(this._courses.map((course) => course.faculty).filter(Boolean)))
  }

  /**
   * Get qualifying courses based on APS score and subject levels
   */
  getQualifyingCourses(apsScore: number, subjectLevels: Record<string, number>): Course[] {
    return this._courses.filter((course) => {
      // Check if APS score meets minimum requirement
      if (apsScore < course.apsMin) {
        return false
      }

      // Check subject-specific requirements if they exist
      if (course.subjectRequirements && Object.keys(course.subjectRequirements).length > 0) {
        return this.meetsSubjectRequirements(subjectLevels, course.subjectRequirements)
      }

      // If no subject requirements, just check APS
      return true
    })
  }

  /**
   * Check if subject levels meet requirements
   */
  private meetsSubjectRequirements(
    subjectLevels: Record<string, number>,
    requirements: Record<string, number | { alternatives: Array<{ subject: string; level: number }> }>,
  ): boolean {
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
              break
            }
          }
        }

        if (!foundMatch) {
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
                break
              }
            }
          }

          if (meetsAnyAlternative) break
        }

        if (!meetsAnyAlternative) {
          return false
        }
      }
    }
    return true
  }
}
