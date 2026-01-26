import type { SubjectEntry } from "../types"

export interface SubjectGrade {
    name: string
    percentage: number
}

export interface APSResult {
    aps: number
    method: string
    breakdown: string[]
    eligibleSubjects: SubjectGrade[]
}
