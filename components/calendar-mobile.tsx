"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { isSameDay } from "date-fns"
import { cn } from "@/lib/utils"
import { getAllEventsWithStatus, detectConflictsForDate } from "@/lib/calendar-events"

const calendarEvents = getAllEventsWithStatus()

export function CalendarMobile() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const getEventsForDate = (date: Date) => {
    return calendarEvents.filter((event) => isSameDay(event.date, date))
  }

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : []

  return (
    <div className="space-y-4">
      {/* Compact Calendar for Mobile */}
      <div className="glass-light dark:glass-dark p-4 rounded-lg">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className={cn(
            "w-full",
            "[&_.rdp-day]:text-xs",
            "[&_.rdp-day_button]:p-1",
            "[&_.rdp-cell]:p-0",
            "[&_.rdp-month]:w-full",
            "[&_.rdp-caption]:text-sm",
            "[&_.rdp-head_cell]:text-xs py-1",
          )}
          components={{
            DayButton: ({ day, modifiers, ...props }) => {
              const dayEvents = getEventsForDate(day.date)
              const conflictSummary = detectConflictsForDate(day.date, dayEvents)
              const isSelected = modifiers.selected
              return (
                <button
                  {...props}
                  className={cn(
                    "relative w-full h-full min-h-12 p-1 flex flex-col items-start justify-start gap-1 text-left rounded transition-all",
                    "hover:bg-accent/50",
                    isSelected && "bg-primary text-primary-foreground",
                    modifiers.outside && "text-muted-foreground opacity-50",
                    modifiers.disabled && "opacity-50 cursor-not-allowed",
                  )}
                >
                  {(conflictSummary.hard || conflictSummary.soft) && (
                    <span
                      aria-label={conflictSummary.hard ? "Hard conflict detected" : "Potential scheduling conflict"}
                      className={cn(
                        "absolute top-1 right-1 h-1.5 w-1.5 rounded-full",
                        conflictSummary.hard ? "bg-red-500" : "bg-amber-500",
                      )}
                    />
                  )}
                  <span className="text-xs font-medium">{day.date.getDate()}</span>
                  {dayEvents.length > 0 && (
                    <div className="flex flex-col gap-0.5 w-full">
                      {dayEvents.slice(0, 1).map((event, index) => (
                        <div key={index} className="text-[10px] truncate opacity-80">
                          {event.name.length > 8 ? `${event.name.substring(0, 8)}...` : event.name}
                        </div>
                      ))}
                      {dayEvents.length > 1 && (
                        <div className="text-[10px] text-muted-foreground">+{dayEvents.length - 1}</div>
                      )}
                    </div>
                  )}
                </button>
              )
            },
          }}
        />
      </div>

      {/* Events for Selected Date */}
      {selectedDate && (
        <Card className="glass-light dark:glass-dark p-4 space-y-3">
          <h3 className="font-semibold text-sm">
            {selectedDate.toLocaleDateString("en-ZA", {
              month: "short",
              day: "numeric",
            })}
          </h3>
          {selectedDateEvents.length > 0 ? (
            <div className="space-y-2">
              {selectedDateEvents.map((event, index) => {
                const conflictMap = detectConflictsForDate(selectedDate!, selectedDateEvents).eventConflictMap
                const conflictType = conflictMap[event.name]
                return (
                <div key={index} className="p-2 bg-background/50 dark:bg-background/30 rounded border border-border/50">
                  <Badge className="text-xs mb-1" variant={event.type === "public" ? "destructive" : "default"}>
                    {event.type === "public"
                      ? "Holiday"
                      : event.type === "academic"
                        ? "Academic"
                        : event.type === "exam"
                          ? "Exam"
                          : "Event"}
                  </Badge>
                  {conflictType && (
                    <Badge
                      variant={conflictType === "hard" ? "destructive" : "secondary"}
                      className={cn("text-[10px] mb-1 ml-2", conflictType === "soft" && "bg-amber-500 text-white")}
                    >
                      Conflict
                    </Badge>
                  )}
                  <p className="text-xs font-medium line-clamp-2">{event.name}</p>
                </div>
              )})}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">No events</p>
          )}
        </Card>
      )}
    </div>
  )
}
