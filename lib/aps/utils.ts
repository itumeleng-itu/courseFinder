export function percentageToLevel(percentage: number): number {
    if (percentage >= 80) return 7
    if (percentage >= 70) return 6
    if (percentage >= 60) return 5
    if (percentage >= 50) return 4
    if (percentage >= 40) return 3
    if (percentage >= 30) return 2
    return 1
}

export function percentageToLevel8(percentage: number): number {
    if (percentage >= 90) return 8
    if (percentage >= 80) return 7
    if (percentage >= 70) return 6
    if (percentage >= 60) return 5
    if (percentage >= 50) return 4
    if (percentage >= 40) return 3
    if (percentage >= 30) return 2
    return 1
}
