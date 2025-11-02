"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { isSameDay } from "date-fns"
import { cn } from "@/lib/utils"
import { getAllEventsWithStatus } from "@/lib/calendar-events"

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
              {selectedDateEvents.map((event, index) => (
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
                  <p className="text-xs font-medium line-clamp-2">{event.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">No events</p>
          )}
        </Card>
      )}
    </div>
  )
}
