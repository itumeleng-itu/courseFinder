import { ACHIEVEMENT_LEVELS } from "./constants"

export function calculateAchievementLevel(percentage: number): number {
    for (const [level, range] of Object.entries(ACHIEVEMENT_LEVELS)) {
        if (percentage >= range.min && percentage <= range.max) {
            return parseInt(level)
        }
    }
    return 8
}
