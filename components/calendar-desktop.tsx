"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { isSameDay } from "date-fns"
import { cn } from "@/lib/utils"
import { getAllEventsWithStatus, detectConflictsForDate } from "@/lib/calendar-events"

const calendarEvents = getAllEventsWithStatus()

export function CalendarDesktop() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const getEventsForDate = (date: Date) => {
    return calendarEvents.filter((event) => isSameDay(event.date, date))
  }

  const getEventsForMonth = (date: Date) => {
    return calendarEvents.filter(
      (event) => event.date.getMonth() === date.getMonth() && event.date.getFullYear() === date.getFullYear(),
    )
  }

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : []
  const currentMonthEvents = selectedDate ? getEventsForMonth(selectedDate) : []

  const modifiers = {
    event: calendarEvents.map((e) => e.date),
    publicHoliday: calendarEvents.filter((e) => e.type === "public").map((e) => e.date),
    academicEvent: calendarEvents.filter((e) => e.type === "academic").map((e) => e.date),
    examDate: calendarEvents.filter((e) => e.type === "exam").map((e) => e.date),
    pastEvent: calendarEvents.filter((e) => e.isPast).map((e) => e.date),
  }

  const modifiersStyles = {
    publicHoliday: {
      color:"red",
      fontWeight: "bold",
    },
    academicEvent: {
      color: "white",
      fontWeight: "bold",
    },
    examDate: {
      color: "#ffa200ff",
      fontWeight: "bold",
    },
    pastEvent: {
      opacity: "0.7",
    },
  }

  const getDateBorderColor = (events: any[]) => {
    if (events.length === 0) return "border-black/50 dark:border-white/50"
    
    // Priority: public holiday > exam > academic
    if (events.some(e => e.type === "public")) return "border-red-500 dark:border-red-500"
    if (events.some(e => e.type === "exam")) return "border-[#ffa200ff] dark:border-[#ffa200ff]"
    if (events.some(e => e.type === "academic")) return "border-blue-500 dark:border-blue-500"
    
    return "border-black/50 dark:border-white/50"
  }

  return (
    <div className="grid gap-5 items-start lg:grid-cols-[2fr_1fr]">
      {/* Main Calendar with Liquid Glass */}
      <div className="min-w-0 space-y-4">
        <Card className="glass-light dark:glass-dark p-6">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            className={cn(
              "rounded-md w-full max-w-full overflow-hidden",
              "[--cell-size:theme(spacing.16)]",
              "min-h-[500px]",
              "[&_.rdp-day]:min-h-16 [&_.rdp-day]:p-2",
              "[&_.rdp-day_button]:w-full [&_.rdp-day_button]:h-full [&_.rdp-day_button]:min-h-16",
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
                      "relative w-full h-full min-h-16 p-2 flex flex-col items-start justify-start gap-2 text-left rounded transition-all",
                      "border-[1.2px]",
                      getDateBorderColor(dayEvents),
                      "hover:bg-accent/50 hover:backdrop-blur",
                      "focus:outline-none focus:ring-2 focus:ring-ring",
                      isSelected && "glass-light dark:glass-dark ring-2 ring-primary",
                      modifiers.today && "bg-primary/10 font-semibold",
                      modifiers.outside && "text-muted-foreground opacity-50",
                      modifiers.disabled && "opacity-50 cursor-not-allowed",
                    )}
                  >
                    {(conflictSummary.hard || conflictSummary.soft) && (
                      <span
                        aria-label={conflictSummary.hard ? "Hard conflict detected" : "Potential scheduling conflict"}
                        className={cn(
                          "absolute top-1 right-1 h-2 w-2 rounded-full",
                          conflictSummary.hard ? "bg-red-500" : "bg-amber-500",
                        )}
                      />
                    )}
                    <span className={cn(
                      "text-sm font-medium",
                      dayEvents.length > 0 && "text-primary font-bold"
                    )}>
                      {day.date.getDate()}
                    </span>
                    {dayEvents.length > 0 && (
                      <div className="flex flex-col gap-1 w-full text-xs">
                        {dayEvents.slice(0, 2).map((event, index) => (
                          <div
                            key={index}
                            className="px-1.5 py-0.5 rounded text-foreground/70 font-medium truncate bg-transparent"
                            title={event.name}
                          >
                            {event.name.substring(0, 10)}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <span className="text-xs text-muted-foreground">+{dayEvents.length - 2}</span>
                        )}
                      </div>
                    )}
                  </button>
                )
              },
            }}
          />
        </Card>

        <div className="flex gap-2">
          <Badge variant="destructive" className="text-xs">
            Holiday
          </Badge>
          <Badge className="bg-blue-500 text-xs">Academic</Badge>
          <Badge className="bg-orange-500 border-2 border-slate-500 text-slate-500 text-xs">Exam</Badge>
        </div>
      </div>

      {/* Sidebar with Events */}
      <div className="space-y-4 min-w-0">
        {/* Selected Date Events */}
        {selectedDate && (
          <Card className="glass-light dark:glass-dark p-4">
            <h3 className="font-semibold text-sm mb-3">
              {selectedDate.toLocaleDateString("en-ZA", {
                weekday: "short",
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
                  <div
                    key={index}
                    className="p-2 rounded border border-border/30 bg-background/40 dark:bg-background/20 hover:bg-background/60 dark:hover:bg-background/40 transition-colors"
                  >
                    <Badge variant="outline" className="text-xs mb-1">
                      {event.type}
                    </Badge>
                    {conflictType && (
                      <Badge
                        variant={conflictType === "hard" ? "destructive" : "secondary"}
                        className={cn("text-xs mb-1 ml-2", conflictType === "soft" && "bg-amber-500 text-white")}
                      >
                        Conflict
                      </Badge>
                    )}
                    <p className="text-xs font-medium line-clamp-2">{event.name}</p>
                    {event.time && <p className="text-xs text-muted-foreground mt-1">{event.time}</p>}
                  </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">No events</p>
            )}
          </Card>
        )}

        {/* Month Events */}
        <Card className="glass-light dark:glass-dark p-4">
          <h3 className="font-semibold text-sm mb-3">
            {(selectedDate || new Date()).toLocaleDateString("en-ZA", { month: "long" })} Events
          </h3>
          {currentMonthEvents.length > 0 ? (
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {currentMonthEvents
                .sort((a, b) => a.date.getDate() - b.date.getDate())
                .map((event, index) => (
                  <div
                    key={index}
                    className="p-2 rounded border border-border/30 bg-background/40 dark:bg-background/20 hover:bg-background/60 dark:hover:bg-background/40 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {event.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{event.date.getDate()}</span>
                    </div>
                    <p className="text-xs font-medium line-clamp-1">{event.name}</p>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">No events</p>
          )}
        </Card>
      </div>
    </div>
  )
}
