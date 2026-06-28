import { findMatchingSubject } from "@/lib/subject-aliases"
import { Subject } from "./types"
import { RequirementLevel, hasAlternatives, RequirementAlternative } from "@/lib/types"
import { percentageToLevel } from "@/lib/aps/utils"

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
            return percentageToLevel(studentSub.percentage) >= requiredLevel
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
