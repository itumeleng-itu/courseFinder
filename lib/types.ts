export interface SubjectEntry {
  id: string
  name: string
  percentage: number
}

export interface Course {
  name: string
  faculty?: string
  minimumAPS: number
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
