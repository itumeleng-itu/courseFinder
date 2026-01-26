import type { SubjectEntry } from "../types"
import { APSResult } from "./types"
import { percentageToLevel, percentageToLevel8 } from "./utils"

export function calculateWitsAPS(subjects: SubjectEntry[]): APSResult {
    const sortedSubjects = [...subjects].sort((a, b) => Number(b.percentage) - Number(a.percentage))
    const bestSeven = sortedSubjects.slice(0, 7)
    let aps = 0
    const breakdown: string[] = []

    bestSeven.forEach((subject) => {
        let points = percentageToLevel8(Number(subject.percentage))
        if (subject.name.toLowerCase() === "life orientation") {
            points = Math.floor(points / 2)
            breakdown.push(`${subject.name}: ${subject.percentage}% = Level ${percentageToLevel8(Number(subject.percentage))} ÷ 2 = ${points} pts`)
        } else {
            breakdown.push(`${subject.name}: ${subject.percentage}% = Level ${percentageToLevel8(Number(subject.percentage))} = ${points} pts`)
        }
        aps += points
    })

    return { aps, method: "Wits: NSC 1-8 scale, best 7 subjects (LO counts half)", breakdown, eligibleSubjects: bestSeven }
}

export function calculateUWCAPS(subjects: SubjectEntry[]): APSResult {
    let aps = 0
    const breakdown: string[] = []
    subjects.forEach((subject) => {
        const name = subject.name.toLowerCase()
        let points = 0
        if (name.includes("english") || name.includes("mathematics")) {
            points = Math.min(15, Math.floor((Number(subject.percentage) / 100) * 15))
            breakdown.push(`${subject.name}: ${subject.percentage}% = ${points}/15 pts`)
        } else if (name === "life orientation") {
            points = Math.min(3, Math.floor((Number(subject.percentage) / 100) * 3))
            breakdown.push(`${subject.name}: ${subject.percentage}% = ${points}/3 pts`)
        } else {
            points = Math.min(8, Math.floor((Number(subject.percentage) / 100) * 8))
            breakdown.push(`${subject.name}: ${subject.percentage}% = ${points}/8 pts`)
        }
        aps += points
    })
    return { aps, method: "UWC: Weighted points (Eng/Math: 15, Others: 8, LO: 3)", breakdown, eligibleSubjects: subjects }
}

export function calculateUFHAPS(subjects: SubjectEntry[]): APSResult {
    const nonLOSubjects = subjects.filter((s) => s.name.toLowerCase() !== "life orientation")
    const lifeOrientation = subjects.find((s) => s.name.toLowerCase() === "life orientation")
    const bestFive = [...nonLOSubjects].sort((a, b) => Number(b.percentage) - Number(a.percentage)).slice(0, 5)

    let aps = bestFive.reduce((sum, s) => sum + percentageToLevel(Number(s.percentage)), 0)
    const breakdown = bestFive.map((s) => `${s.name}: ${s.percentage}% = Level ${percentageToLevel(Number(s.percentage))}`)
    const eligibleSubjects = [...bestFive]

    if (lifeOrientation) {
        const loLevel = Math.min(4, percentageToLevel(Number(lifeOrientation.percentage)))
        aps += loLevel
        breakdown.push(`${lifeOrientation.name}: ${lifeOrientation.percentage}% = Level ${loLevel} (capped at 4)`)
        eligibleSubjects.push(lifeOrientation)
    }
    return { aps, method: "UFH: Best 5 subjects + LO (capped at Level 4) (max 39)", breakdown, eligibleSubjects }
}

export function calculateMUTAPS(subjects: SubjectEntry[]): APSResult {
    const eligibleSubjects = subjects.filter((s) => s.name.toLowerCase() !== "life orientation")
        .sort((a, b) => Number(b.percentage) - Number(a.percentage)).slice(0, 5)

    const getMUTPoints = (percentage: number): number => {
        if (percentage >= 90) return 8
        if (percentage >= 80) return 7
        if (percentage >= 70) return 6
        if (percentage >= 60) return 5
        if (percentage >= 50) return 4
        if (percentage >= 40) return 3
        return 0
    }

    const aps = eligibleSubjects.reduce((sum, s) => sum + getMUTPoints(Number(s.percentage)), 0)
    return { aps, method: "MUT: Best 5 subjects, MUT point table (max 40)", breakdown: eligibleSubjects.map((s) => `${s.name}: ${s.percentage}% = ${getMUTPoints(Number(s.percentage))} pts`), eligibleSubjects }
}

export function calculateCUTAPS(subjects: SubjectEntry[]): APSResult {
    const nonLOSubjects = subjects.filter((s) => s.name.toLowerCase() !== "life orientation")
    const lifeOrientation = subjects.find((s) => s.name.toLowerCase() === "life orientation")
    const bestSix = [...nonLOSubjects].sort((a, b) => Number(b.percentage) - Number(a.percentage)).slice(0, 6)

    let aps = bestSix.reduce((sum, s) => sum + percentageToLevel(Number(s.percentage)), 0)
    const breakdown = bestSix.map((s) => `${s.name}: ${s.percentage}% = Level ${percentageToLevel(Number(s.percentage))}`)
    const eligibleSubjects = [...bestSix]

    if (lifeOrientation) {
        aps += 1
        breakdown.push(`${lifeOrientation.name}: ${lifeOrientation.percentage}% = 1 pt (fixed)`)
        eligibleSubjects.push(lifeOrientation)
    }
    return { aps, method: "CUT: Best 6 subjects + LO (1 point) (max 43)", breakdown, eligibleSubjects }
}
