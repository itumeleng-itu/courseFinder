//
// 📍
// src/data/universities/base-university.ts
//
import type { Course as DetailedCourse } from "@/lib/types"

// Simplified Course shape used by the public universities index
export interface Course {
  name: string
  faculty: string
  apsRequired?: number
  apsMin?: number
  description?: string
  requirements?: string[]
  subjectRequirements?: Record<string, number | { alternatives: { subject: string; level: number }[] }>
  duration?: string
}

// Public University shape for aggregated listing
export interface University {
  id: string
  name: string
  shortName: string
  location: string
  website?: string
  courses: Course[] // Uses the simplified course
}

// Internal location shape used by class-based universities
export interface UniversityLocation {
  city: string
  province?: string
  coordinates?: {
    latitude: number
    longitude: number
  }
}

// Base class for all university data files
export abstract class BaseUniversity {
  abstract readonly id: string
  abstract readonly name: string
  abstract readonly shortName: string
  readonly website?: string
  readonly logo?: string
  abstract readonly location: UniversityLocation

  // Each concrete university defines its own _courses list
  protected readonly _courses: DetailedCourse[] = []

  // Public getter for courses
  get courses(): DetailedCourse[] {
    return this._courses
  }

  /**
   * Calculates the APS score based on the specific university's rules.
   * @param subjects A record of subject names and their NSC levels (1-7).
   * @param course (Optional) The specific course being checked, as some
   * universities (like CPUT) use different APS methods for different courses.
   * @returns The calculated university-specific APS score.
   */
  abstract calculateApsScore(subjects: Record<string, number>, course?: DetailedCourse): number

  /**
   * Gets extended curriculum programs available at this university.
   * Extended programs have lower APS requirements and add a foundation year.
   * @returns Array of extended curriculum courses
   */
  getExtendedCurriculumPrograms(): DetailedCourse[] {
    return this._courses.filter(course => {
      // Check explicit flag first
      if (course.isExtendedCurriculum === true) return true

      // Fallback to name/requirements matching for legacy data
      const nameMatch = course.name.toLowerCase().includes('extended curriculum') ||
        course.name.toLowerCase().includes('extended programme') ||
        course.name.toLowerCase().includes('extended program')

      const requirementsMatch = typeof course.additionalRequirements === 'string'
        ? course.additionalRequirements.toLowerCase().includes('extended')
        : Array.isArray(course.additionalRequirements)
          ? course.additionalRequirements.some(req => req.toLowerCase().includes('extended'))
          : false

      return nameMatch || requirementsMatch
    })
  }

  /**
   * Finds the extended program alternative for a standard course.
   * @param standardCourseId The ID of the standard (3/4-year) course
   * @returns The linked extended curriculum course, or undefined
   */
  findExtendedAlternative(standardCourseId: string): DetailedCourse | undefined {
    return this._courses.find(course =>
      course.isExtendedCurriculum === true &&
      course.standardProgramId === standardCourseId
    )
  }

  // Helper: format location as a human-readable string
  getLocationString(): string {
    const city = this.location?.city ?? ""
    const province = this.location?.province ?? ""
    return [city, province].filter(Boolean).join(", ")
  }
}

// Placeholder export to preserve existing imports (not used by class-based files)
export const universities: University[] = []
