export interface Subject {
    name: string
    percentage: number
    code?: string
    achievementLevel?: number
}

export interface ValidationResult {
    isValid: boolean
    warnings: string[]
    errors: string[]
    statistics: {
        totalSubjects: number
        averagePercentage: number
        bachelorPassEligible: boolean
        distinctionCount: number
    }
    subjectValidation: Array<{
        subject: Subject
        isValid: boolean
        warnings: string[]
        errors: string[]
    }>
}
