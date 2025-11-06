import type { Course as DetailedCourse } from "@/lib/types"

// Simplified Course shape used by the public universities index
export interface Course {
  name: string
  faculty: string
  apsRequired: number
  description?: string
  requirements?: string[]
  // Carry subject requirements to the index for filtering
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
  courses: Course[]
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

  // Each concrete university defines its own _courses list using the detailed Course type
  protected readonly _courses: DetailedCourse[] = []

  // Public getter for courses
  get courses(): DetailedCourse[] {
    return this._courses
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
