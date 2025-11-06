export interface SubjectEntry {
  id: string
  name: string
  percentage: number
}

// Subject requirement types support numeric levels or alternative subject options
export interface RequirementAlternative {
  subject: string
  level: number
}

export type RequirementLevel = number | { alternatives: RequirementAlternative[] }

export interface Course {
  id?: string
  name: string
  faculty?: string
  // Different datasets use different APS field names; keep them optional here
  minimumAPS?: number
  apsMin?: number
  apsRequired?: number
  // Structured subject requirements per course
  subjectRequirements?: Record<string, RequirementLevel>
  requirements?: string[]
  duration?: string
  description?: string
}

export interface University {
  id: string
  name: string
  shortName: string
  location: string
  website: string
  courses: Course[]
}
