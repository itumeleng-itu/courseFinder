export interface Course {
  name: string
  faculty: string
  apsRequired: number
  description?: string
  requirements?: string[]
}

export interface University {
  id: string
  name: string
  shortName: string
  location: string
  website?: string
  courses: Course[]
}

export const universities: University[] = []
