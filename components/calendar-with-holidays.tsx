"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { isSameDay } from "date-fns"
import { cn } from "@/lib/utils"
import { getAllEventsWithStatus } from "@/lib/calendar-events"

// Get all calendar events with past status
const calendarEvents = getAllEventsWithStatus()

export function CalendarWithHolidays() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  
  // Get events for the selected date
  const getEventsForDate = (date: Date) => {
    return calendarEvents.filter(event => 
      isSameDay(event.date, date)
    )
  }
  
  // Get all events for the current month
  const getEventsForMonth = (date: Date) => {
    return calendarEvents.filter(event => 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
    )
  }
  
  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : []
  const currentMonthEvents = selectedDate ? getEventsForMonth(selectedDate) : []
  
  // Custom day renderer to highlight events
  const modifiers = {
    event: calendarEvents.map(e => e.date),
    publicHoliday: calendarEvents.filter(e => e.type === 'public').map(e => e.date),
    academicEvent: calendarEvents.filter(e => e.type === 'academic').map(e => e.date),
    examDate: calendarEvents.filter(e => e.type === 'exam').map(e => e.date),
    pastEvent: calendarEvents.filter(e => e.isPast).map(e => e.date),
  }
  
  const modifiersStyles = {
    publicHoliday: {
      backgroundColor: '#ef4444',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '0.75rem',
      padding: '2px 4px',
      borderRadius: '4px',
      minHeight: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    academicEvent: {
      backgroundColor: '#3b82f6',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '0.75rem',
      padding: '2px 4px',
      borderRadius: '4px',
      minHeight: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    examDate: {
      backgroundColor: '#f59e0b',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '0.75rem',
      padding: '2px 4px',
      borderRadius: '4px',
      minHeight: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    pastEvent: {
      opacity: '0.5',
      filter: 'grayscale(100%)',
    },
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3 xl:grid-cols-2">
      <div className="space-y-6 lg:col-span-2 xl:col-span-1">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          className={cn(
            "rounded-md border w-full max-w-none",
            "[--cell-size:theme(spacing.16)]", // Increased from default spacing.8 to spacing.16 (64px)
            "min-h-[600px]", // Minimum height for better visibility
            "[&_.rdp-day]:min-h-16", // Minimum height for day cells
            "[&_.rdp-day]:p-2", // Padding for day cells
            "[&_.rdp-day]:flex", // Flex layout for day cells
            "[&_.rdp-day]:flex-col", // Column layout for stacking content
            "[&_.rdp-day]:items-start", // Align items to start
            "[&_.rdp-day]:justify-start", // Justify content to start
            "[&_.rdp-day]:gap-1", // Gap between elements in day cells
            "[&_.rdp-day]:text-left", // Left align text
            "[&_.rdp-day]:overflow-hidden", // Hide overflow
            "[&_.rdp-day_button]:w-full", // Full width buttons
            "[&_.rdp-day_button]:h-full", // Full height buttons
            "[&_.rdp-day_button]:min-h-16", // Minimum button height
            "[&_.rdp-day_button]:flex", // Flex layout for buttons
            "[&_.rdp-day_button]:flex-col", // Column layout for button content
            "[&_.rdp-day_button]:items-start", // Align button items to start
            "[&_.rdp-day_button]:justify-start", // Justify button content to start
            "[&_.rdp-day_button]:p-2", // Padding for buttons
            "[&_.rdp-day_button]:gap-1", // Gap between button elements
            "[&_.rdp-day_button]:text-left", // Left align button text
            "[&_.rdp-table]:w-full", // Full width table
            "[&_.rdp-week]:gap-1", // Gap between week days
            "[&_.rdp-weekday]:min-h-8", // Minimum height for weekday headers
            "[&_.rdp-weekday]:flex", // Flex layout for weekday headers
            "[&_.rdp-weekday]:items-center", // Center weekday header content
            "[&_.rdp-weekday]:justify-center", // Center weekday header text
            "sm:[--cell-size:theme(spacing.20)]", // Even larger on small screens and up (80px)
            "md:[--cell-size:theme(spacing.24)]", // Larger on medium screens and up (96px)
            "lg:[--cell-size:theme(spacing.28)]", // Largest on large screens and up (112px)
          )}
          components={{
            DayButton: ({ day, modifiers, ...props }) => {
              const dayEvents = getEventsForDate(day.date)
              const isSelected = modifiers.selected
              const isPastEvent = modifiers.pastEvent
              
              return (
                <button
                  {...props}
                  className={cn(
                    "relative w-full h-full min-h-16 p-2 flex flex-col items-start justify-start gap-1 text-left",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    "transition-colors duration-200",
                    isSelected && "bg-primary text-primary-foreground",
                    modifiers.today && "bg-accent text-accent-foreground font-semibold",
                    modifiers.outside && "text-muted-foreground opacity-50",
                    modifiers.disabled && "opacity-50 cursor-not-allowed",
                    isPastEvent && "opacity-50 grayscale",
                  )}
                >
                  <span className="text-sm font-medium leading-none">
                    {day.date.getDate()}
                  </span>
                  {dayEvents.length > 0 && (
                    <div className="flex flex-col gap-0.5 w-full">
                      {dayEvents.slice(0, 2).map((event, index) => (
                        <div
                          key={index}
                          className={cn(
                            "text-xs px-1 py-0.5 rounded text-white font-medium truncate w-full",
                            event.type === 'public' ? "bg-red-500" : 
                            event.type === 'academic' ? "bg-blue-500" : 
                            event.type === 'exam' ? "bg-orange-500" : "bg-gray-500",
                            event.isPast && "opacity-50 grayscale"
                          )}
                          title={`${event.name}${event.time ? ` at ${event.time}` : ''}${event.description ? ` - ${event.description}` : ''}`}
                        >
                          {event.name.length > 12 ? `${event.name.substring(0, 12)}...` : event.name}
                          {event.time && event.type === 'exam' && (
                            <div className="text-xs opacity-90 mt-0.5">
                              {event.time}
                            </div>
                          )}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  )}
                </button>
              )
            }
          }}
        />
        
        <div className="flex flex-wrap gap-3">
          <Badge variant="destructive" className="text-sm px-3 py-1">
            Public Holiday
          </Badge>
          <Badge variant="default" className="text-sm px-3 py-1 bg-blue-500">
            Academic Event
          </Badge>
          <Badge variant="default" className="text-sm px-3 py-1 bg-orange-500">
            Exam Date
          </Badge>
        </div>
      </div>
      
      <div className="space-y-6">
        {selectedDate && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              {selectedDate.toLocaleDateString('en-ZA', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedDateEvents.map((event, index) => (
                  <div key={index} className={cn(
                    "p-3 rounded-lg border bg-card",
                    event.isPast && "opacity-50 grayscale"
                  )}>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge 
                        variant={event.type === 'public' ? 'destructive' : 'default'}
                        className={cn(
                          event.type === 'academic' ? 'bg-blue-500' : 
                          event.type === 'exam' ? 'bg-orange-500' : '',
                          event.isPast && "opacity-50"
                        )}
                      >
                        {event.type === 'public' ? 'Public Holiday' : 
                         event.type === 'academic' ? 'Academic Event' : 
                         event.type === 'exam' ? 'Exam Date' : 'Event'}
                      </Badge>
                      {event.time && event.type === 'exam' && (
                        <Badge variant="outline" className={cn(
                          "text-xs",
                          event.isPast && "opacity-50"
                        )}>
                          {event.time}
                        </Badge>
                      )}
                    </div>
                    <h4 className="font-medium text-base">{event.name}</h4>
                    {event.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {event.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No events on this date.</p>
            )}
          </Card>
        )}
        
        <Card className="p-6">
           <h3 className="text-lg font-semibold mb-4">
             {(selectedDate || new Date()).toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' })} Events
           </h3>
           {currentMonthEvents.length > 0 ? (
             <div className="space-y-3">
               {currentMonthEvents
                 .sort((a, b) => a.date.getDate() - b.date.getDate())
                 .map((event, index) => (
                   <div key={index} className={cn(
                     "p-3 rounded-lg border bg-card",
                     event.isPast && "opacity-50 grayscale"
                   )}>
                     <div className="flex items-center justify-between gap-2 mb-2">
                       <div className="flex items-center gap-2">
                         <Badge 
                           variant={event.type === 'public' ? 'destructive' : 'default'}
                           className={cn(
                             event.type === 'academic' ? 'bg-blue-500' : 
                             event.type === 'exam' ? 'bg-orange-500' : '',
                             event.isPast && "opacity-50"
                           )}
                         >
                           {event.type === 'public' ? 'Public Holiday' : 
                            event.type === 'academic' ? 'Academic Event' : 
                            event.type === 'exam' ? 'Exam Date' : 'Event'}
                         </Badge>
                         {event.time && event.type === 'exam' && (
                           <Badge variant="outline" className={cn(
                             "text-xs",
                             event.isPast && "opacity-50"
                           )}>
                             {event.time}
                           </Badge>
                         )}
                       </div>
                       <span className="text-sm text-muted-foreground">
                         {event.date.getDate()}
                       </span>
                     </div>
                     <h4 className="font-medium text-base">{event.name}</h4>
                     {event.description && (
                       <p className="text-sm text-muted-foreground mt-1">
                         {event.description}
                       </p>
                     )}
                   </div>
                 ))}
             </div>
           ) : (
             <p className="text-muted-foreground">No events this month.</p>
           )}
         </Card>
      </div>
    </div>
  )
}