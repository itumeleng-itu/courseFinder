export type CalendarEvent = {
    date: Date
    name: string
    type: "public" | "academic" | "exam"
    description?: string
    time?: string
    isPast?: boolean
}

export type CalendarNotification = {
    id: string
    avatar: string
    fallback: string
    text: string
    time: string
    type: "calendar"
    eventType: "public" | "academic" | "exam"
    date: Date
}

export type ConflictType = "hard" | "soft"
