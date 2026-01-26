import { addDays, isAfter, isBefore, format, isSameDay } from "date-fns"
import { CalendarEvent, CalendarNotification, ConflictType } from "./types"

export function getUpcomingEvents(source: CalendarEvent[], daysAhead: number = 7): CalendarEvent[] {
    const now = new Date()
    const futureDate = addDays(now, daysAhead)
    return source.filter(event => {
        let dt = event.date
        if (event.time) {
            const [h, m] = event.time.split(':').map(Number)
            dt = new Date(event.date); dt.setHours(h, m, 0, 0)
        }
        return isAfter(dt, now) && isBefore(dt, futureDate)
    }).sort((a, b) => a.date.getTime() - b.date.getTime())
}

export function getAllEventsWithStatus(source: CalendarEvent[]): CalendarEvent[] {
    const now = new Date()
    return source.map(event => {
        let dt = event.date
        if (event.time) {
            const [h, m] = event.time.split(':').map(Number)
            dt = new Date(event.date); dt.setHours(h, m, 0, 0)
        } else {
            dt = new Date(event.date); dt.setHours(23, 59, 59, 999)
        }
        return { ...event, isPast: isBefore(dt, now) }
    })
}

export function eventsToNotifications(events: CalendarEvent[]): CalendarNotification[] {
    return events.map((e, i) => {
        let txt = format(e.date, "MMMM d, yyyy")
        if (e.type === "exam" && e.time) txt += ` at ${e.time}`
        const icon = e.type === "public" ? "🏛️" : e.type === "academic" ? "🎓" : "📝"
        return { id: `calendar-${i}-${e.date.getTime()}`, avatar: "", fallback: icon, text: e.name, time: txt, type: "calendar", eventType: e.type, date: e.date }
    })
}

function parseDurationHours(desc?: string): number {
    if (!desc) return 2
    const match = desc.match(/(\d+)\s*(?:½)?\s*hr/i)
    if (match) {
        let h = parseInt(match[1], 10); if (/½/.test(desc)) h += 0.5
        return h
    }
    return 2
}

export function detectConflictsForDate(date: Date, source: CalendarEvent[]) {
    const dayEvents = source.filter(e => isSameDay(e.date, date))
    const timed = dayEvents.filter(e => !!e.time).map(e => {
        const [h, m] = e.time!.split(":").map(Number)
        const start = new Date(e.date); start.setHours(h, m, 0, 0)
        const end = new Date(start); end.setMinutes(start.getMinutes() + Math.round(parseDurationHours(e.description) * 60))
        return { e, start, end }
    })
    const allDay = dayEvents.filter(e => !e.time)

    const map: Record<string, ConflictType> = {}
    const groups: any[] = []

    timed.sort((a, b) => a.start.getTime() - b.start.getTime())
    for (let i = 0; i < timed.length; i++) {
        for (let j = i + 1; j < timed.length; j++) {
            if (timed[j].start.getTime() < timed[i].end.getTime()) {
                groups.push({ type: "hard", events: [timed[i].e.name, timed[j].e.name] })
                map[timed[i].e.name] = "hard"; map[timed[j].e.name] = "hard"
            } else break
        }
    }

    if (allDay.length > 1 || (allDay.length >= 1 && timed.length >= 1)) {
        const names = [...allDay.map(i => i.name), ...timed.map(i => i.e.name)]
        groups.push({ type: "soft", events: names })
        names.forEach(n => { if (!map[n]) map[n] = "soft" })
    }

    return { hard: Object.values(map).includes("hard"), soft: groups.some(g => g.type === "soft"), eventConflictMap: map, groups, dayEvents }
}
