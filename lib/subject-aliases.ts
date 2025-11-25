/**
 * Subject Alias System for Course Matching
 * 
 * Handles subject name variations while maintaining distinctions between
 * subjects that can be alternatives (e.g., Mathematics vs Mathematical Literacy)
 */

export type LanguageLevel = 'HL' | 'FAL' | 'SAL' | 'ANY'

/**
 * Subject aliases - maps canonical names to accepted variations
 * IMPORTANT: Mathematics, Technical Mathematics, and Mathematical Literacy
 * are kept SEPARATE (not aliases of each other) because courses may require
 * one OR the other at different levels
 */
export const SUBJECT_ALIASES = new Map<string, string[]>([
    // Mathematics (Pure/Core) - distinct from Math Lit and Technical Math
    ['mathematics', ['maths', 'pure mathematics', 'mathematics core', 'math', 'core mathematics']],

    // Technical Mathematics - distinct subject
    ['technical mathematics', ['technical maths', 'tech mathematics', 'tech maths']],

    // Mathematical Literacy - distinct subject
    ['mathematical literacy', ['maths literacy', 'maths lit', 'math literacy', 'math lit', 'mathematics literacy']],

    // Sciences
    ['physical sciences', ['physics', 'physical science', 'physics and chemistry']],
    ['life sciences', ['biology', 'life science', 'bio', 'life sciences (biology)']],
    ['agricultural sciences', ['agricultural science', 'agric sciences', 'agriculture', 'agricultural studies']],

    // Technical Sciences
    ['technical sciences', ['technical science', 'tech sciences', 'tech science']],

    // Languages - English
    ['english home language', ['english hl', 'english (home)', 'english home', 'english (hl)']],
    ['english first additional language', ['english fal', 'english (fal)', 'english 1st additional', 'english first additional']],
    ['english second additional language', ['english sal', 'english (sal)', 'english 2nd additional']],

    // Languages - Afrikaans  
    ['afrikaans home language', ['afrikaans hl', 'afrikaans (home)', 'afrikaans home', 'afrikaans (hl)']],
    ['afrikaans first additional language', ['afrikaans fal', 'afrikaans (fal)', 'afrikaans 1st additional']],
    ['afrikaans second additional language', ['afrikaans sal', 'afrikaans (sal)']],

    // Languages - IsiZulu
    ['isizulu home language', ['isizulu hl', 'zulu hl', 'zulu home', 'isizulu (hl)', 'zulu home language']],
    ['isizulu first additional language', ['isizulu fal', 'zulu fal', 'isizulu (fal)']],

    // Languages - Other South African
    ['isixhosa home language', ['isixhosa hl', 'xhosa hl', 'isixhosa (hl)']],
    ['sesotho home language', ['sesotho hl', 'sotho hl']],
    ['setswana home language', ['setswana hl', 'tswana hl']],
    ['sepedi home language', ['sepedi hl', 'pedi hl']],

    // Technical subjects
    ['engineering graphics and design', ['egd', 'engineering graphics', 'graphics and design', 'technical drawing', 'eng graphics']],
    ['information technology', ['it', 'information tech']],
    ['computer applications technology', ['cat', 'computer applications', 'computer apps']],

    // Business subjects
    ['accounting', ['accountancy', 'financial accounting', 'acc']],
    ['business studies', ['business', 'business management', 'business admin']],
    ['economics', ['eco', 'economic studies', 'econ']],

    // Other subjects
    ['life orientation', ['lo', 'life skills']],
    ['consumer studies', ['consumer science', 'consumer sciences']],
    ['tourism', ['travel and tourism', 'tourism studies']],
    ['geography', ['geo', 'geographical studies']],
    ['history', ['hist', 'historical studies']],
    ['dramatic arts', ['drama', 'theatre studies']],
    ['music', ['musical arts']],
    ['visual arts', ['art', 'visual art', 'fine art']],
    ['design', ['art and design']],

    // Catch-all for generic "English" without level specified
    ['english', ['eng']],
])

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
    for (const [canonical, aliases] of SUBJECT_ALIASES) {
        if (canonical === normalized) return canonical
        if (aliases.includes(normalized)) return canonical
    }

    return normalized
}

/**
 * Checks if two subject names refer to the same subject
 * IMPORTANT: Returns false for Mathematics vs Mathematical Literacy
 * (they are alternatives, not aliases)
 */
export function matchSubjects(studentSubject: string, requiredSubject: string): boolean {
    const studentNorm = normalizeSubjectName(studentSubject)
    const requiredNorm = normalizeSubjectName(requiredSubject)

    // Exact match after normalization
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

    // Check for Home Language
    if (normalized.includes('home language') || normalized.match(/\bhl\b/) || normalized.includes('(hl)')) {
        const lang = normalized
            .replace(/home language|hl|\(|\)/gi, '')
            .trim()
            .replace(/\s+/g, ' ')
        return { language: lang, level: 'HL' }
    }

    // Check for First Additional Language
    if (normalized.includes('first additional') || normalized.match(/\bfal\b/) || normalized.includes('(fal)')) {
        const lang = normalized
            .replace(/first additional language|fal|\(|\)/gi, '')
            .trim()
            .replace(/\s+/g, ' ')
        return { language: lang, level: 'FAL' }
    }

    // Check for Second Additional Language
    if (normalized.includes('second additional') || normalized.match(/\bsal\b/) || normalized.includes('(sal)')) {
        const lang = normalized
            .replace(/second additional language|sal|\(|\)/gi, '')
            .trim()
            .replace(/\s+/g, ' ')
        return { language: lang, level: 'SAL' }
    }

    return { language: normalized, level: 'ANY' }
}

/**
 * Checks if a student's language subject matches a required language
 * Handles HL/FAL/SAL levels properly
 */
export function languageMatches(studentSubject: string, requiredSubject: string): boolean {
    const student = parseLanguageLevel(studentSubject)
    const required = parseLanguageLevel(requiredSubject)

    // Normalize language names for comparison
    const studentLang = normalizeSubjectName(student.language)
    const requiredLang = normalizeSubjectName(required.language)

    // Language must match
    if (studentLang !== requiredLang) return false

    // If requirement specifies HL, student must have HL
    if (required.level === 'HL') {
        return student.level === 'HL'
    }

    // If requirement specifies FAL, student must have HL or FAL (HL is better)
    if (required.level === 'FAL') {
        return student.level === 'HL' || student.level === 'FAL'
    }

    // If requirement specifies SAL, any level works
    if (required.level === 'SAL') {
        return student.level === 'HL' || student.level === 'FAL' || student.level === 'SAL'
    }

    // If requirement doesn't specify level (ANY), any level is acceptable
    return true
}

/**
 * Finds a student's subject that matches the required subject
 * Uses both subject alias matching and language-specific matching
 */
export function findMatchingSubject(
    studentSubjects: Array<{ name: string; percentage: number }>,
    requiredSubject: string
): { name: string; percentage: number } | undefined {
    return studentSubjects.find(student => {
        // Try exact match (after normalization)
        if (matchSubjects(student.name, requiredSubject)) return true

        // Try language-specific matching (handles HL/FAL/SAL)
        if (languageMatches(student.name, requiredSubject)) return true

        return false
    })
}
