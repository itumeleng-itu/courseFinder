import { findMatchingSubject } from "@/lib/subject-aliases"
import { Subject, RequirementLevel, hasAlternatives, RequirementAlternative } from "./types"

export function percentageToNSCLevel(percentage: number): number {
    if (percentage >= 80) return 7
    if (percentage >= 70) return 6
    if (percentage >= 60) return 5
    if (percentage >= 50) return 4
    if (percentage >= 40) return 3
    if (percentage >= 30) return 2
    return 1
}

export function nscLevelToPercentage(level: number): string {
    switch (level) {
        case 7: return "80-100%"
        case 6: return "70-79%"
        case 5: return "60-69%"
        case 4: return "50-59%"
        case 3: return "40-49%"
        case 2: return "30-39%"
        case 1: return "0-29%"
        default: return "0%"
    }
}

export function checkSubjectRequirements(
    studentSubjects: Subject[],
    courseRequirements: Record<string, RequirementLevel> | undefined,
): { meets: boolean; missing: string[]; met: string[] } {
    if (!courseRequirements) return { meets: true, missing: [], met: [] }

    const missing: string[] = []
    const met: string[] = []

    for (const [requiredSubject, levelReq] of Object.entries(courseRequirements)) {
        const findStudentSubject = (name: string) => {
            return studentSubjects.find((s) => findMatchingSubject(s.name, name))
        }

        const evaluateNumberRequirement = (subjectName: string, requiredLevel: number) => {
            const studentSub = findStudentSubject(subjectName)
            if (!studentSub) return false
            return percentageToNSCLevel(studentSub.percentage) >= requiredLevel
        }

        const evaluateAlternatives = (alts: RequirementAlternative[]) => {
            return alts.some((alt) => evaluateNumberRequirement(alt.subject, alt.level))
        }

        if (hasAlternatives(levelReq)) {
            if (evaluateAlternatives(levelReq.alternatives)) {
                met.push(requiredSubject)
            } else {
                const altStrings = levelReq.alternatives.map((a) => `${a.subject} (Level ${a.level})`)
                missing.push(altStrings.join(" OR "))
            }
        } else {
            if (evaluateNumberRequirement(requiredSubject, levelReq)) {
                met.push(requiredSubject)
            } else {
                missing.push(`${requiredSubject} (Level ${levelReq})`)
            }
        }
    }

    return {
        meets: missing.length === 0,
        missing,
        met,
    }
}
