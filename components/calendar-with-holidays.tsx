"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { isSameDay } from "date-fns"
import { cn } from "@/lib/utils"
import { getAllEventsWithStatus } from "@/lib/calendar-events"
import { useIsMobile } from "@/hooks/use-mobile"
import { DayCell } from "./calendar/day-cell"
import { EventCard } from "./calendar/event-card"

const calendarEvents = getAllEventsWithStatus()

export function CalendarWithHolidays() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const isMobile = useIsMobile()
  
  const getEventsForDate = (date: Date) => calendarEvents.filter(e => isSameDay(e.date, date))
  const getEventsForMonth = (date: Date) => calendarEvents.filter(e => e.date.getMonth() === date.getMonth() && e.date.getFullYear() === date.getFullYear())
  
  const selectedEvents = selectedDate ? getEventsForDate(selectedDate) : []
  const monthEvents = selectedDate ? getEventsForMonth(selectedDate) : []

  return (
    <div className={cn("grid gap-4", isMobile ? "grid-cols-1" : "lg:grid-cols-3 xl:grid-cols-2")}>
      <div className={cn("space-y-4", !isMobile && "lg:col-span-2 xl:col-span-1")}>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border w-full h-full"
          components={{
            DayButton: ({ day, modifiers, ...props }) => (
              <button {...props} className="w-full h-full">
                <DayCell date={day.date} events={getEventsForDate(day.date)} isSelected={!!modifiers.selected} isToday={!!modifiers.today} isOutside={!!modifiers.outside} isPast={!!modifiers.pastEvent} isMobile={isMobile} />
              </button>
            )
          }}
        />
        <div className="flex flex-wrap gap-3">
          <Badge variant="destructive">Public Holiday</Badge>
          <Badge className="bg-blue-500">Academic Event</Badge>
          <Badge className="bg-orange-500">Exam Date</Badge>
        </div>
      </div>
      
      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">{selectedDate?.toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
          <div className="space-y-3">
            {selectedEvents.length > 0 ? selectedEvents.map((e, i) => <EventCard key={i} event={e} />) : <p className="text-muted-foreground">No events.</p>}
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">{selectedDate?.toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' })} Events</h3>
          <div className="space-y-3">
            {monthEvents.length > 0 ? monthEvents.sort((a,b)=>a.date.getTime()-b.date.getTime()).map((e, i) => <EventCard key={i} event={e} />) : <p className="text-muted-foreground">No events this month.</p>}
          </div>
        </Card>
      </div>
    </div>
  )
}
