import { University } from "@/lib/types"

export interface Subject {
    id: string
    name: string
    percentage: number
}

export interface RequirementAlternative {
    subject: string
    level: number
}

export type RequirementLevel = number | { alternatives: RequirementAlternative[] }

export function hasAlternatives(val: RequirementLevel): val is { alternatives: RequirementAlternative[] } {
    return typeof val === "object" && val !== null && "alternatives" in val
}

export interface ExtendedCourse {
    name: string
    university: string
    faculty?: string
    apsMin?: number
    apsRequired?: number
    subjectRequirements?: Record<string, RequirementLevel>
    additionalRequirements?: string
    requirements?: string
    careers?: string
    careerOpportunities?: string | string[]
    extendedDuration?: string
    foundationYear?: {
        subjects?: string[]
        description?: string
    }
    subjects?: string[]
    description?: string
}

export interface CourseMatch {
    course: ExtendedCourse
    university: University
    meetsRequirements: boolean
    missingRequirements: string[]
    metRequirements: string[]
}
