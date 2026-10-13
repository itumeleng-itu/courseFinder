import type { SubjectEntry } from "../types"
import { APSResult } from "./types"
import { percentageToLevel, percentageToLevel8 } from "./utils"
import { toSubjectSlug } from "@/lib/subject-slugs"

/**
 * Wits APS, exactly as prospectus page 13 prints it.
 *
 * This MUST agree with coursefind-data's custom_points_with_bonus under
 * the Wits scoring_config (seeds/institutions.json), because that is what
 * /v1/qualify uses to decide admission. A learner shown one number here
 * and judged on another is being misled.
 *
 * Three things make Wits different from the national NSC scale, and the
 * previous implementation got all three wrong:
 *
 *   1. 0-39% SCORES ZERO, not NSC level 1 or 2. percentageToLevel8 pays
 *      2 points for a 35% mark; Wits pays nothing.
 *
 *   2. ENGLISH AND MATHEMATICS EARN +2, from 60% upward only. The column
 *      is headed "Wits APS for English and Mathematics". It attaches to
 *      the SUBJECT English -- Home Language or First Additional -- and to
 *      Mathematics, never to whichever language a learner happens to
 *      offer as their Home Language. isiZulu HL at 77% is worth 6 while
 *      English FAL at 75% is worth 8: a higher mark, fewer points.
 *      Awarding the bonus to any Home Language inflates the score of most
 *      South African learners.
 *
 *   3. LIFE ORIENTATION USES ITS OWN COMPRESSED 0-4 SCALE, and is always
 *      one of the seven -- "the best seven subjects including Life
 *      Orientation". Halving the ordinary band is close but not equal,
 *      and letting LO compete for a place drops it the moment a learner
 *      offers an eighth subject, overstating them.
 *
 * Checked against the live API for six certificates in
 * __tests__/wits-aps-drift.test.ts, including the three real ones.
 */
const WITS_BANDS: [number, number][] = [
    [90, 8], [80, 7], [70, 6], [60, 5], [50, 4], [40, 3], [0, 0],
]
const WITS_LO_BANDS: [number, number][] = [
    [90, 4], [80, 3], [70, 2], [60, 1], [0, 0],
]
/** Slugs the +2 attaches to. Names are mapped through toSubjectSlug so
 * "English First Additional Language" and "English Home Language" both
 * qualify and "IsiZulu Home Language" does not. */
const WITS_BONUS_SLUGS = new Set(["english_hl", "english_fal", "mathematics"])
const WITS_BONUS_FROM = 60
const WITS_SUBJECT_COUNT = 7

function witsPoints(percentage: number, bands: [number, number][]): number {
    for (const [floor, points] of bands) if (percentage >= floor) return points
    return 0
}

export function calculateWitsAPS(subjects: SubjectEntry[]): APSResult {
    const scored = subjects
        .filter((s) => s.name && Number(s.percentage) >= 0)
        .map((s) => {
            const percentage = Number(s.percentage)
            const slug = toSubjectSlug(s.name)
            const isLO = slug === "life_orientation"
            const base = witsPoints(percentage, isLO ? WITS_LO_BANDS : WITS_BANDS)
            const bonus =
                !isLO && slug && WITS_BONUS_SLUGS.has(slug) && percentage >= WITS_BONUS_FROM
                    ? 2
                    : 0
            return { subject: s, slug, isLO, percentage, points: base + bonus, base, bonus }
        })

    // Life Orientation takes one of the seven places before anything
    // competes for the rest -- page 13's "including Life Orientation".
    const lo = scored.filter((s) => s.isLO)
    const rest = scored
        .filter((s) => !s.isLO)
        .sort((a, b) => b.points - a.points)
    const counted = [...lo, ...rest].slice(0, WITS_SUBJECT_COUNT)

    const aps = counted.reduce((sum, s) => sum + s.points, 0)
    const breakdown = counted.map((s) =>
        s.isLO
            ? `${s.subject.name}: ${s.percentage}% = ${s.points} pts (Life Orientation scale, max 4)`
            : s.bonus
              ? `${s.subject.name}: ${s.percentage}% = ${s.base} +${s.bonus} = ${s.points} pts`
              : `${s.subject.name}: ${s.percentage}% = ${s.points} pts`,
    )

    return {
        aps,
        method: "Wits: best 7 including Life Orientation, +2 for English and Mathematics from 60%",
        breakdown,
        eligibleSubjects: counted.map((s) => s.subject),
    }
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
