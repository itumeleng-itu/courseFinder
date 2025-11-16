import { addDays, isAfter, isBefore, format, isSameDay } from "date-fns"

export type CalendarEvent = {
  date: Date
  name: string
  type: "public" | "academic" | "exam"
  description?: string
  time?: string // Specific time for exam entries
  isPast?: boolean // Flag to indicate if event has passed
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

// South African Public Holidays and Academic Events
export const calendarEvents: CalendarEvent[] = [
  // 2024 Holidays
  { date: new Date(2024, 0, 1), name: "New Year's Day", type: "public" },
  { date: new Date(2024, 2, 21), name: "Human Rights Day", type: "public" },
  { date: new Date(2024, 2, 29), name: "Good Friday", type: "public" },
  { date: new Date(2024, 3, 1), name: "Family Day", type: "public" },
  { date: new Date(2024, 3, 27), name: "Freedom Day", type: "public" },
  { date: new Date(2024, 4, 1), name: "Workers' Day", type: "public" },
  { date: new Date(2024, 5, 16), name: "Youth Day", type: "public" },
  { date: new Date(2024, 7, 9), name: "National Women's Day", type: "public" },
  { date: new Date(2024, 8, 24), name: "Heritage Day", type: "public" },
  { date: new Date(2024, 11, 16), name: "Day of Reconciliation", type: "public" },
  { date: new Date(2024, 11, 25), name: "Christmas Day", type: "public" },
  { date: new Date(2024, 11, 26), name: "Day of Goodwill", type: "public" },
  
  // 2025 Holidays
  { date: new Date(2025, 0, 1), name: "New Year's Day", type: "public" },
  { date: new Date(2025, 2, 21), name: "Human Rights Day", type: "public" },
  { date: new Date(2025, 3, 18), name: "Good Friday", type: "public" },
  { date: new Date(2025, 3, 21), name: "Family Day", type: "public" },
  { date: new Date(2025, 3, 27), name: "Freedom Day", type: "public" },
  { date: new Date(2025, 4, 1), name: "Workers' Day", type: "public" },
  { date: new Date(2025, 5, 16), name: "Youth Day", type: "public" },
  { date: new Date(2025, 7, 9), name: "National Women's Day", type: "public" },
  { date: new Date(2025, 8, 24), name: "Heritage Day", type: "public" },
  { date: new Date(2025, 11, 16), name: "Day of Reconciliation", type: "public" },
  { date: new Date(2025, 11, 25), name: "Christmas Day", type: "public" },
  { date: new Date(2025, 11, 26), name: "Day of Goodwill", type: "public" },
  
  // Academic Calendar Events
  { date: new Date(2024, 0, 15), name: "Schools Reopen", type: "academic" },
  { date: new Date(2024, 2, 22), name: "Term 1 Ends", type: "academic" },
  { date: new Date(2024, 3, 8), name: "Term 2 Begins", type: "academic" },
  { date: new Date(2024, 5, 28), name: "Term 2 Ends", type: "academic" },
  { date: new Date(2024, 6, 15), name: "Term 3 Begins", type: "academic" },
  { date: new Date(2024, 8, 20), name: "Term 3 Ends", type: "academic" },
  { date: new Date(2024, 9, 7), name: "Term 4 Begins", type: "academic" },
  { date: new Date(2024, 11, 13), name: "Schools Close", type: "academic" },
  
  // 2025 Academic Calendar
  { date: new Date(2025, 0, 15), name: "Schools Reopen", type: "academic" },
  { date: new Date(2025, 2, 28), name: "Term 1 Ends", type: "academic" },
  { date: new Date(2025, 3, 14), name: "Term 2 Begins", type: "academic" },
  { date: new Date(2025, 5, 27), name: "Term 2 Ends", type: "academic" },
  { date: new Date(2025, 6, 14), name: "Term 3 Begins", type: "academic" },
  { date: new Date(2025, 8, 19), name: "Term 3 Ends", type: "academic" },
  { date: new Date(2025, 9, 6), name: "Term 4 Begins", type: "academic" },
  { date: new Date(2025, 11, 12), name: "Schools Close", type: "academic" },

  // 2025 NSC Examination Dates (October/November)
  { date: new Date(2025, 9, 17), name: "Matric Pledge Signing", type: "exam", time: "10:00", description: "Matric learners participate in pledge signing ceremony" },
  { date: new Date(2025, 9, 20), name: "NSC Exams Begin", type: "exam", time: "09:00", description: "National Senior Certificate examinations commence" },
  { date: new Date(2025, 9, 24), name: "Information Technology P2", type: "exam", time: "09:00", description: "IT P2 Theory (3hrs)" },
  { date: new Date(2025, 9, 27), name: "Dance Studies", type: "exam", time: "09:00", description: "Dance Studies, Electrical Tech" },
  { date: new Date(2025, 9, 27), name: "Languages P1", type: "exam", time: "14:00", description: "Portuguese/German/Hebrew P1" },
  { date: new Date(2025, 9, 28), name: "History P1", type: "exam", time: "09:00", description: "History P1 (3hrs), Maritime Economics" },
  { date: new Date(2025, 9, 28), name: "Various Languages P1", type: "exam", time: "14:00", description: "Various Languages P1" },
  { date: new Date(2025, 9, 29), name: "Afrikaans P1", type: "exam", time: "09:00", description: "Afrikaans HL and FAL P1 (2hrs)" },
  { date: new Date(2025, 9, 30), name: "Mathematics P1", type: "exam", time: "09:00", description: "Mathematics P1 (3hrs), Mathematical Literacy P1 (3hrs)" },
  { date: new Date(2025, 9, 31), name: "Mathematics P2", type: "exam", time: "09:00", description: "Mathematics P2 (3hrs)" },
  { date: new Date(2025, 9, 31), name: "Mathematical Literacy P2", type: "exam", time: "14:00", description: "Mathematical Literacy P2 (3hrs)" },
  { date: new Date(2025, 10, 3), name: "English P1", type: "exam", time: "09:00", description: "English HL/FAL P1 (2hrs)" },
  { date: new Date(2025, 10, 3), name: "Engineering Graphics P1", type: "exam", time: "14:00", description: "Engineering Graphics P1 (3hrs)" },
  { date: new Date(2025, 10, 4), name: "African Languages P1", type: "exam", time: "09:00", description: "isiZulu, isiXhosa, Siswati, isiNdebele P1" },
  { date: new Date(2025, 10, 4), name: "Engineering Graphics P2", type: "exam", time: "14:00", description: "Engineering Graphics P2" },
  { date: new Date(2025, 10, 5), name: "Agricultural Science P1", type: "exam", time: "09:00", description: "Agricultural Science P1 (2½hrs), Nautical Science P1" },
  { date: new Date(2025, 10, 6), name: "Agricultural Science P2", type: "exam", time: "09:00", description: "Agricultural Science P2 (2½hrs)" },
  { date: new Date(2025, 10, 6), name: "Visual Arts", type: "exam", time: "14:00", description: "Visual Arts (3hrs)" },
  { date: new Date(2025, 10, 7), name: "Afrikaans P2", type: "exam", time: "09:00", description: "Afrikaans P2" },
  { date: new Date(2025, 10, 7), name: "African Languages P1", type: "exam", time: "14:00", description: "Sepedi/Sesotho/Setswana/Xitsonga/Tshivenda P1" },
  { date: new Date(2025, 10, 10), name: "Economics", type: "exam", time: "09:00", description: "Economics (3hrs)" },
  { date: new Date(2025, 10, 10), name: "Mechanical Technology", type: "exam", time: "14:00", description: "Mechanical Technology (3hrs)" },
  { date: new Date(2025, 10, 11), name: "English P2", type: "exam", time: "09:00", description: "English P2" },
  { date: new Date(2025, 10, 11), name: "Languages P3", type: "exam", time: "14:00", description: "Portuguese/German P3" },
  { date: new Date(2025, 10, 12), name: "Physical Science P1", type: "exam", time: "09:00", description: "Physical Science (Physics) P1 (3hrs)" },
  { date: new Date(2025, 10, 13), name: "Physical Science P2", type: "exam", time: "09:00", description: "Physical Science (Chemistry) P2 (3hrs)" },
  { date: new Date(2025, 10, 13), name: "Various Languages P3", type: "exam", time: "14:00", description: "Various Languages P3" },
  { date: new Date(2025, 10, 14), name: "English P3", type: "exam", time: "09:00", description: "English P3 (2½hrs)" },
  { date: new Date(2025, 10, 14), name: "Music P1", type: "exam", time: "14:00", description: "Music P1 Theory (3hrs)" },
  { date: new Date(2025, 10, 17), name: "History P2", type: "exam", time: "09:00", description: "History P2 (3hrs)" },
  { date: new Date(2025, 10, 17), name: "Agricultural Technology", type: "exam", time: "14:00", description: "Agricultural Technology (3hrs)" },
  { date: new Date(2025, 10, 18), name: "Life Sciences P1", type: "exam", time: "09:00", description: "Life Sciences P1 (2½hrs)" },
  { date: new Date(2025, 10, 18), name: "Afrikaans P3", type: "exam", time: "14:00", description: "Afrikaans P3 (2½hrs)" },
  { date: new Date(2025, 10, 19), name: "Life Sciences P2", type: "exam", time: "09:00", description: "Life Sciences P2 (2½hrs)" },
  { date: new Date(2025, 10, 19), name: "Religion Studies", type: "exam", time: "14:00", description: "Religion Studies P1 (2hrs)" },
  { date: new Date(2025, 10, 20), name: "Tourism", type: "exam", time: "09:00", description: "Tourism (3hrs)" },
  { date: new Date(2025, 10, 20), name: "Mathematics P3", type: "exam", time: "14:00", description: "Mathematics P3 (2hrs)" },
  { date: new Date(2025, 10, 21), name: "Accounting", type: "exam", time: "09:00", description: "Accounting (3hrs)" },
  { date: new Date(2025, 10, 21), name: "Agriculture Management", type: "exam", time: "14:00", description: "Agriculture Management Practices (2½hrs)" },
  { date: new Date(2025, 10, 24), name: "African Languages P2", type: "exam", time: "09:00", description: "isiZulu/isiXhosa/Siswati/isiNdebele P2" },
  { date: new Date(2025, 10, 24), name: "Design", type: "exam", time: "14:00", description: "Design (3hrs)" },
  { date: new Date(2025, 10, 25), name: "NSC Exams End", type: "exam", time: "17:00", description: "National Senior Certificate examinations conclude" },

  // 2025 May/June Supplementary Exams
  { date: new Date(2025, 4, 12), name: "May/June Supplementary Exams Begin", type: "exam", time: "09:00", description: "Supplementary examinations for NSC candidates" },
  { date: new Date(2025, 5, 20), name: "May/June Supplementary Exams End", type: "exam", time: "17:00", description: "Supplementary examinations conclude" },
]

/**
 * Get upcoming calendar events within the specified number of days
 * Excludes past events from notifications
 * @param daysAhead Number of days to look ahead (default: 7)
 * @returns Array of upcoming calendar events
 */
export function getUpcomingEvents(daysAhead: number = 7): CalendarEvent[] {
  const now = new Date()
  const futureDate = addDays(now, daysAhead)
  
  return calendarEvents
    .filter(event => {
      let eventDateTime = event.date
      
      // If event has a specific time (like exams), create proper datetime
      if (event.time) {
        const [hours, minutes] = event.time.split(':').map(Number)
        eventDateTime = new Date(event.date)
        eventDateTime.setHours(hours, minutes, 0, 0)
      }
      
      // Only include future events for notifications
      return isAfter(eventDateTime, now) && isBefore(eventDateTime, futureDate)
    })
    .sort((a, b) => {
      // Sort by actual datetime for events with times
      const aDateTime = a.time ? 
        new Date(a.date.getFullYear(), a.date.getMonth(), a.date.getDate(), 
                 ...a.time.split(':').map(Number), 0, 0) : a.date
      const bDateTime = b.time ? 
        new Date(b.date.getFullYear(), b.date.getMonth(), b.date.getDate(), 
                 ...b.time.split(':').map(Number), 0, 0) : b.date
      return aDateTime.getTime() - bDateTime.getTime()
    })
}

/**
 * Get all calendar events with past status marked
 * Used for calendar display where past events should be greyed out
 * @returns Array of all calendar events with isPast flag
 */
export function getAllEventsWithStatus(): CalendarEvent[] {
  const now = new Date()
  
  return calendarEvents.map(event => {
    let eventDateTime = event.date
    
    // If event has a specific time (like exams), create proper datetime
    if (event.time) {
      const [hours, minutes] = event.time.split(':').map(Number)
      eventDateTime = new Date(event.date)
      eventDateTime.setHours(hours, minutes, 0, 0)
    } else {
      // For events without specific time, consider them past only if the entire day has passed
      eventDateTime = new Date(event.date)
      eventDateTime.setHours(23, 59, 59, 999) // End of day
    }
    
    return {
      ...event,
      isPast: isBefore(eventDateTime, now)
    }
  })
}

/**
 * Convert calendar events to notification format
 * @param events Array of calendar events
 * @returns Array of calendar notifications
 */
export function eventsToNotifications(events: CalendarEvent[]): CalendarNotification[] {
  return events.map((event, index) => {
    // Format the date as "December 15, 2024"
    let timeText = format(event.date, "MMMM d, yyyy")
    
    // Add specific time for exam entries
    if (event.type === "exam" && event.time) {
      timeText += ` at ${event.time}`
    }
    
    // Get appropriate avatar and fallback based on event type
    const getEventIcon = (type: CalendarEvent["type"]) => {
      switch (type) {
        case "public":
          return { avatar: "", fallback: "🏛️" }
        case "academic":
          return { avatar: "", fallback: "🎓" }
        case "exam":
          return { avatar: "", fallback: "📝" }
        default:
          return { avatar: "", fallback: "📅" }
      }
    }
    
    const { avatar, fallback } = getEventIcon(event.type)
    
    return {
      id: `calendar-${index}-${event.date.getTime()}`,
      avatar,
      fallback,
      text: event.name,
      time: timeText,
      type: "calendar" as const,
      eventType: event.type,
      date: event.date,
    }
  })
}

/**
 * Get calendar notifications for upcoming events
 * @param daysAhead Number of days to look ahead (default: 7)
 * @returns Array of calendar notifications
 */
export function getCalendarNotifications(daysAhead: number = 7): CalendarNotification[] {
  const upcomingEvents = getUpcomingEvents(daysAhead)
  return eventsToNotifications(upcomingEvents)
}

// --- Conflict Detection Utilities ---

export type ConflictType = "hard" | "soft"

type EventInterval = {
  event: CalendarEvent
  start: Date
  end: Date
  allDay: boolean
}

function parseDurationHours(description?: string): number {
  if (!description) return 2 // default duration when unspecified
  // Match formats like "3hrs", "2 hr", and handle half-hours like "2½hrs"
  const hrsMatch = description.match(/(\d+)\s*(?:½)?\s*hr[s]?/i)
  if (hrsMatch) {
    let hours = parseInt(hrsMatch[1], 10)
    if (/½/.test(description)) hours += 0.5
    return hours
  }
  return 2
}

function toEventInterval(event: CalendarEvent): EventInterval {
  if (event.time) {
    const [hours, minutes] = event.time.split(":").map(Number)
    const start = new Date(event.date)
    start.setHours(hours ?? 0, minutes ?? 0, 0, 0)
    const durationHours = parseDurationHours(event.description)
    const end = new Date(start)
    end.setMinutes(start.getMinutes() + Math.round(durationHours * 60))
    return { event, start, end, allDay: false }
  }
  const dayStart = new Date(event.date)
  dayStart.setHours(0, 0, 0, 0)
  const dayEnd = new Date(event.date)
  dayEnd.setHours(23, 59, 59, 999)
  return { event, start: dayStart, end: dayEnd, allDay: true }
}

/**
 * Detect conflicts for a given date among provided or global calendarEvents.
 * - hard: overlapping timed events (interval overlap)
 * - soft: multiple all-day events or mix of all-day and timed events on same date
 */
export function detectConflictsForDate(
  date: Date,
  events?: CalendarEvent[],
): {
  hard: boolean
  soft: boolean
  eventConflictMap: Record<string, ConflictType>
  groups: { type: ConflictType; events: string[] }[]
  dayEvents: CalendarEvent[]
} {
  const source = events ?? calendarEvents
  const dayEvents = source.filter((e) => isSameDay(e.date, date))
  const intervals = dayEvents.map(toEventInterval)
  const timed = intervals.filter((i) => !i.allDay)
  const allDay = intervals.filter((i) => i.allDay)

  const eventConflictMap: Record<string, ConflictType> = {}
  const groups: { type: ConflictType; events: string[] }[] = []

  // Hard conflicts: overlapping timed events
  timed.sort((a, b) => a.start.getTime() - b.start.getTime())
  for (let i = 0; i < timed.length; i++) {
    for (let j = i + 1; j < timed.length; j++) {
      if (timed[j].start.getTime() < timed[i].end.getTime()) {
        const names = [timed[i].event.name, timed[j].event.name]
        groups.push({ type: "hard", events: names })
        eventConflictMap[timed[i].event.name] = "hard"
        eventConflictMap[timed[j].event.name] = "hard"
      } else {
        // sorted by start; if next starts after current ends, subsequent ones won't overlap
        break
      }
    }
  }

  // Soft conflicts: multiple all-day events on the same date
  if (allDay.length > 1) {
    const names = allDay.map((i) => i.event.name)
    groups.push({ type: "soft", events: names })
    for (const i of allDay) {
      if (!eventConflictMap[i.event.name]) eventConflictMap[i.event.name] = "soft"
    }
  }

  // Soft conflicts: mix of all-day and timed events on the same date
  if (allDay.length >= 1 && timed.length >= 1) {
    const names = [...allDay.map((i) => i.event.name), ...timed.map((i) => i.event.name)]
    groups.push({ type: "soft", events: names })
    for (const i of allDay) {
      if (!eventConflictMap[i.event.name]) eventConflictMap[i.event.name] = "soft"
    }
  }

  const hard = Object.values(eventConflictMap).some((t) => t === "hard")
  const soft = groups.some((g) => g.type === "soft")

  return { hard, soft, eventConflictMap, groups, dayEvents }
}
