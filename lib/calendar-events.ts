import { events2024 } from "./calendar/data-2024"
import { events2025 } from "./calendar/data-2025"
import {
  getUpcomingEvents as getUpcoming,
  getAllEventsWithStatus as getAllWithStatus,
  eventsToNotifications as toNotifications,
  detectConflictsForDate as detectConflicts
} from "./calendar/utils"
import { CalendarEvent, CalendarNotification } from "./calendar/types"

export * from "./calendar/types"

export const calendarEvents: CalendarEvent[] = [...events2024, ...events2025]

export const getUpcomingEvents = (daysAhead: number = 7) => getUpcoming(calendarEvents, daysAhead)
export const getAllEventsWithStatus = () => getAllWithStatus(calendarEvents)
export const eventsToNotifications = (events: CalendarEvent[]) => toNotifications(events)
export const getCalendarNotifications = (daysAhead: number = 7) => toNotifications(getUpcomingEvents(daysAhead))
export const detectConflictsForDate = (date: Date, events?: CalendarEvent[]) => detectConflicts(date, events ?? calendarEvents)
