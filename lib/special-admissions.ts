/**
 * Special Admission Routes Detection
 * 
 * Identifies courses with special admission requirements beyond
 * standard APS and subject requirements.
 */

import type { Course } from './types'

export interface SpecialRequirements {
    requiresNBT: boolean
    requiresPortfolio: boolean
    requiresAudition: boolean
    requiresInterview: boolean
    requiresPlacementTest: boolean
    hasCompositeIndex: boolean
    requiresJobShadowing: boolean
    otherRequirements: string[]
}

/**
 * Detects special admission requirements for a course
 */
export function detectSpecialRequirements(course: Course): SpecialRequirements {
    const requirements = course.additionalRequirements
    const reqText = Array.isArray(requirements)
        ? requirements.join(' ').toLowerCase()
        : (requirements || '').toLowerCase()

    return {
        requiresNBT: /nbt|national benchmark/.test(reqText),
        requiresPortfolio: /portfolio/.test(reqText),
        requiresAudition: /audition/.test(reqText),
        requiresInterview: /interview/.test(reqText),
        requiresPlacementTest: /placement test|aptitude test/.test(reqText),
        hasCompositeIndex: /composite index|composite score/.test(reqText),
        requiresJobShadowing: /job shadowing/.test(reqText),
        otherRequirements: extractOtherRequirements(reqText)
    }
}

/**
 * Extracts other notable requirements
 */
function extractOtherRequirements(reqText: string): string[] {
    const other: string[] = []

    if (/written assignment|essay/.test(reqText)) {
        other.push('Written assignment')
    }

    if (/music theory/.test(reqText)) {
        other.push('Music theory qualification')
    }

    if (/grade \d+ standard/.test(reqText)) {
        other.push('Specific grade standards')
    }

    if (/closing date|deadline/.test(reqText)) {
        other.push('Early application deadline')
    }

    return other
}

/**
 * Gets user-friendly label for special requirements
 */
export function getSpecialRequirementLabels(special: SpecialRequirements): string[] {
    const labels: string[] = []

    if (special.requiresNBT) labels.push('NBT Required')
    if (special.requiresPortfolio) labels.push('Portfolio Required')
    if (special.requiresAudition) labels.push('Audition Required')
    if (special.requiresInterview) labels.push('Interview Required')
    if (special.requiresPlacementTest) labels.push('Placement Test')
    if (special.hasCompositeIndex) labels.push('Composite Index')
    if (special.requiresJobShadowing) labels.push('Job Shadowing')

    labels.push(...special.otherRequirements)

    return labels
}

/**
 * Checks if a course has any special requirements
 */
export function hasSpecialRequirements(course: Course): boolean {
    const special = detectSpecialRequirements(course)
    return special.requiresNBT ||
        special.requiresPortfolio ||
        special.requiresAudition ||
        special.requiresInterview ||
        special.requiresPlacementTest ||
        special.hasCompositeIndex ||
        special.requiresJobShadowing ||
        special.otherRequirements.length > 0
}
