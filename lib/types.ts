export interface SubjectEntry {
  id: number
  name: string
  percentage: string
}

export interface Course {
  id: string
  name: string
  faculty?: string
  apsMin: number
  duration?: string
  requirements?: string[]
  subjectRequirements: Record<string, number | AlternativeRequirement>
}

export interface AlternativeRequirement {
  alternatives: Array<{ subject: string; level: number }>
}

export interface CourseResult extends Course {
  apsGap?: number
}
