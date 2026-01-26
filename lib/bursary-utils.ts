export interface Bursary {
    id: string
    title: string
    provider: string
    amount: string
    eligibility: string[]
    closingDate: string
    field: string
    link: string
    description: string
}

export function getCurrentMonthKey(): string {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
}

export function getCurrentMonthYear(): { month: string; year: number; monthNumber: number } {
    const now = new Date()
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    return {
        month: months[now.getMonth()],
        year: now.getFullYear(),
        monthNumber: now.getMonth() + 1
    }
}

export function isClosingInCurrentMonth(closingDate: string): boolean {
    const { month, year, monthNumber } = getCurrentMonthYear()
    const lowerDate = closingDate.toLowerCase()

    if (lowerDate.includes("ongoing") || lowerDate.includes("open") || lowerDate.includes("n/a") || lowerDate.includes("rolling")) {
        return true
    }

    const monthLower = month.toLowerCase()
    const hasCurrentMonth = lowerDate.includes(monthLower) || lowerDate.includes(`${monthNumber}/`) || lowerDate.includes(`/${monthNumber}/`)
    const hasCurrentYear = lowerDate.includes(year.toString())

    if (hasCurrentMonth && hasCurrentYear) {
        return true
    }

    const datePatterns = [
        new RegExp(`\\b${monthNumber}\\/${year}\\b`),
        new RegExp(`\\b${year}-${String(monthNumber).padStart(2, '0')}\\b`),
        new RegExp(`\\b${String(monthNumber).padStart(2, '0')}\\/${year}\\b`),
    ]

    for (const pattern of datePatterns) {
        if (pattern.test(closingDate)) {
            return true
        }
    }

    return false
}

export function isBursaryClosed(closingDate: string): boolean {
    const lowerDate = closingDate.toLowerCase()

    if (lowerDate.includes("ongoing") || lowerDate.includes("open") || lowerDate.includes("n/a") || lowerDate.includes("rolling")) {
        return false
    }

    try {
        const dateMatch = closingDate.match(/(\d{1,2})\s+(\w+)\s+(\d{4})/)
        if (dateMatch) {
            const [, day, monthStr, year] = dateMatch
            const months: { [key: string]: number } = {
                january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
                july: 6, august: 7, september: 8, october: 9, november: 10, december: 11
            }
            const monthNum = months[monthStr.toLowerCase()]
            if (monthNum !== undefined) {
                const closingDateObj = new Date(parseInt(year), monthNum, parseInt(day))
                return closingDateObj < new Date()
            }
        }

        const slashMatch = closingDate.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/)
        if (slashMatch) {
            const [, first, second, year] = slashMatch
            const closingDateObj = new Date(parseInt(year), parseInt(second) - 1, parseInt(first))
            return closingDateObj < new Date()
        }
    } catch {
        return false
    }

    return false
}
