"use client"

import * as React from "react"
import { useState } from "react"
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay 
} from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { getAllEventsWithStatus } from "@/lib/calendar-events"

const calendarEvents = getAllEventsWithStatus()

export function CalendarMobile() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  // Calendar Logic
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }) // Monday start
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 })

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  })

  // Navigation
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))

  // Event checking
  const getEventsForDate = (date: Date) => {
    return calendarEvents.filter((event) => isSameDay(event.date, date))
  }

  // Selected Date Info
  const displayDate = selectedDate.getDate()
  const displayMonth = format(selectedDate, "MMMM").toUpperCase()
  const displayYear = format(selectedDate, "yyyy")
  const displayDayName = format(selectedDate, "EEE")

  return (
    <div className="flex flex-col w-full mx-auto bg-[#EBEBEB] text-[#111111] overflow-hidden rounded-xl shadow-sm min-h-[500px] font-sans">
      
      {/* Header Section */}
      <div className="pt-8 pb-4 px-6 flex justify-between items-start">
        <div className="flex flex-col">
          {/* Big Date Number */}
          <span className="text-[6rem] leading-[0.9] font-bold tracking-tighter">
            {displayDate}
          </span>
          
          {/* Month and Year */}
          <div className="mt-2 text-xl font-normal tracking-wide space-y-0">
            <div className="uppercase">{displayMonth}</div>
            <div className="text-black/60">{displayYear}</div>
          </div>
        </div>

        {/* Day Name (Sun, Mon, etc) */}
        <div className="pt-2">
          <span className="text-xl font-medium">{displayDayName}</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-8 px-8 py-4">
        <button onClick={prevMonth} className="p-2 hover:bg-black/5 rounded-full transition-colors">
          <ChevronLeft className="w-5 h-5 text-black" />
        </button>
        <button onClick={nextMonth} className="p-2 hover:bg-black/5 rounded-full transition-colors">
          <ChevronRight className="w-5 h-5 text-black" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="flex flex-col px-6 mt-4">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 mb-4">
          {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
            <div key={i} className="text-center text-xs font-semibold text-black/50">
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-y-4 justify-items-center">
          {calendarDays.map((day, dayIdx) => {
            const isSelected = isSameDay(day, selectedDate)
            const isCurrentMonth = isSameMonth(day, monthStart)
            const events = getEventsForDate(day)
            const hasEvents = events.length > 0
            
            // "Grid of circles" aesthetic
            // Selected: Orange circle
            // Others: Black circle (filled) or text? 
            // Based on Braun aesthetics, likely black filled circles for generic 'active' elements, 
            // but for a calendar, you need to read the numbers.
            // I'll stick to: Standard days are readable numbers. 
            // The "dots" look might be achieved by the high contrast circles.

            return (
              <button
                key={day.toString()}
                onClick={() => setSelectedDate(day)}
                className={cn(
                  "relative w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200",
                  !isCurrentMonth && "opacity-20",
                  isSelected 
                    ? "bg-[#FF5F00] text-white shadow-md scale-110" // Distinctive orange
                    : "bg-[#1A1A1A] text-white hover:bg-black/80" // Dark circles for all other days to match "grid of circles" description
                )}
              >
                {format(day, "d")}
                
                {/* Event Dot (if not selected, since selected helps visibility) */}
                {hasEvents && !isSelected && (
                  <div className="absolute -bottom-1 w-1 h-1 bg-[#FF5F00] rounded-full" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      {/* Selected Day Events */}
      <div className="mt-auto p-6 bg-white/50 border-t border-black/5 min-h-[120px]">
        {getEventsForDate(selectedDate).length > 0 ? (
          <div className="space-y-3">
            {getEventsForDate(selectedDate).map((event, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${event.type === 'public' ? 'bg-[#FF5F00]' : 'bg-blue-600'}`} />
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">{event.name}</h4>
                  {event.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{event.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-center text-gray-400 py-2">No events scheduled</p>
        )}
      </div>
    </div>
  )
}
