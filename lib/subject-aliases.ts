/**
 * Subject Alias System for Course Matching
 * Handles subject name variations while maintaining distinctions
 */

import { SUBJECT_ALIAS_DATA } from "@/data/subject-aliases"

export type LanguageLevel = 'HL' | 'FAL' | 'SAL' | 'ANY'

/**
 * Normalizes a subject name to its canonical form
 */
export function normalizeSubjectName(subject: string): string {
    const normalized = subject
        .toLowerCase()
        .trim()
        .replace(/\s+/g, ' ')
        .replace(/&/g, 'and')
        .replace(/\(/g, '')
        .replace(/\)/g, '')

    // Find canonical name
    for (const [canonical, aliases] of SUBJECT_ALIAS_DATA) {
        if (canonical === normalized) return canonical
        if (aliases.includes(normalized)) return canonical
    }

    return normalized
}

/**
 * Checks if two subject names refer to the same subject
 */
export function matchSubjects(studentSubject: string, requiredSubject: string): boolean {
    const studentNorm = normalizeSubjectName(studentSubject)
    const requiredNorm = normalizeSubjectName(requiredSubject)
    return studentNorm === requiredNorm
}

/**
 * Parses language level from subject name
 */
export function parseLanguageLevel(subjectName: string): {
    language: string
    level: LanguageLevel
} {
    const normalized = subjectName.toLowerCase()

    if (normalized.includes('home language') || normalized.match(/\bhl\b/) || normalized.includes('(hl)')) {
        const lang = normalized.replace(/home language|hl|\(|\)/gi, '').trim().replace(/\s+/g, ' ')
        return { language: lang, level: 'HL' }
    }

    if (normalized.includes('first additional') || normalized.match(/\bfal\b/) || normalized.includes('(fal)')) {
        const lang = normalized.replace(/first additional language|fal|\(|\)/gi, '').trim().replace(/\s+/g, ' ')
        return { language: lang, level: 'FAL' }
    }

    if (normalized.includes('second additional') || normalized.match(/\bsal\b/) || normalized.includes('(sal)')) {
        const lang = normalized.replace(/second additional language|sal|\(|\)/gi, '').trim().replace(/\s+/g, ' ')
        return { language: lang, level: 'SAL' }
    }

    return { language: normalized, level: 'ANY' }
}

/**
 * Checks if a student's language subject matches a required language
 */
export function languageMatches(studentSubject: string, requiredSubject: string): boolean {
    const student = parseLanguageLevel(studentSubject)
    const required = parseLanguageLevel(requiredSubject)
    const studentLang = normalizeSubjectName(student.language)
    const requiredLang = normalizeSubjectName(required.language)

    if (studentLang !== requiredLang) return false
    if (required.level === 'HL') return student.level === 'HL'
    if (required.level === 'FAL') return student.level === 'HL' || student.level === 'FAL'
    if (required.level === 'SAL') return student.level === 'HL' || student.level === 'FAL' || student.level === 'SAL'
    return true
}

/**
 * Finds a student's subject that matches the required subject
 */
export function findMatchingSubject(
    studentSubjects: Array<{ name: string; percentage: number }> | string,
    requiredSubject: string
): { name: string; percentage: number } | boolean | undefined {
    if (typeof studentSubjects === 'string') {
        return matchSubjects(studentSubjects, requiredSubject) || languageMatches(studentSubjects, requiredSubject)
    }

    return studentSubjects.find(student => {
        if (matchSubjects(student.name, requiredSubject)) return true
        if (languageMatches(student.name, requiredSubject)) return true
        return false
    })
}
