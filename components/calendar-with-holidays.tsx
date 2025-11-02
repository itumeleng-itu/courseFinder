"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { isSameDay } from "date-fns"
import { cn } from "@/lib/utils"
import { getAllEventsWithStatus } from "@/lib/calendar-events"
import { useIsMobile } from "@/hooks/use-mobile"

// Get all calendar events with past status
const calendarEvents = getAllEventsWithStatus()

export function CalendarWithHolidays() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const isMobile = useIsMobile()
  
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
    <div className={cn(
      "grid gap-4",
      isMobile 
        ? "grid-cols-1" 
        : "md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-2"
    )}>
      <div className={cn(
        "space-y-4",
        !isMobile && "lg:col-span-2 xl:col-span-1"
      )}>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          className={cn(
            "rounded-md border w-full max-w-none",
            // Responsive cell sizes
            isMobile 
              ? "[--cell-size:theme(spacing.12)] min-h-[400px]" // Smaller on mobile (48px)
              : "[--cell-size:theme(spacing.16)] min-h-[600px]", // Larger on desktop (64px)
            // Day cell styling
            "[&_.rdp-day]:flex [&_.rdp-day]:flex-col [&_.rdp-day]:items-start [&_.rdp-day]:justify-start",
            "[&_.rdp-day]:gap-1 [&_.rdp-day]:text-left [&_.rdp-day]:overflow-hidden",
            isMobile 
              ? "[&_.rdp-day]:min-h-12 [&_.rdp-day]:p-1" // Smaller padding on mobile
              : "[&_.rdp-day]:min-h-16 [&_.rdp-day]:p-2", // Larger padding on desktop
            // Button styling
            "[&_.rdp-day_button]:w-full [&_.rdp-day_button]:h-full [&_.rdp-day_button]:flex",
            "[&_.rdp-day_button]:flex-col [&_.rdp-day_button]:items-start [&_.rdp-day_button]:justify-start",
            "[&_.rdp-day_button]:gap-1 [&_.rdp-day_button]:text-left",
            isMobile 
              ? "[&_.rdp-day_button]:min-h-12 [&_.rdp-day_button]:p-1" // Smaller on mobile
              : "[&_.rdp-day_button]:min-h-16 [&_.rdp-day_button]:p-2", // Larger on desktop
            // Table and week styling
            "[&_.rdp-table]:w-full [&_.rdp-week]:gap-1",
            "[&_.rdp-weekday]:flex [&_.rdp-weekday]:items-center [&_.rdp-weekday]:justify-center",
            isMobile 
              ? "[&_.rdp-weekday]:min-h-6 [&_.rdp-weekday]:text-xs" // Smaller weekday headers on mobile
              : "[&_.rdp-weekday]:min-h-8 [&_.rdp-weekday]:text-sm", // Larger on desktop
            // Responsive breakpoint adjustments
            !isMobile && "sm:[--cell-size:theme(spacing.20)] md:[--cell-size:theme(spacing.24)] lg:[--cell-size:theme(spacing.28)]"
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
                    "relative w-full h-full flex flex-col items-start justify-start gap-1 text-left",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    "transition-colors duration-200",
                    isMobile 
                      ? "min-h-12 p-1" // Smaller on mobile
                      : "min-h-16 p-2", // Larger on desktop
                    isSelected && "bg-primary text-primary-foreground",
                    modifiers.today && "bg-accent text-accent-foreground font-semibold",
                    modifiers.outside && "text-muted-foreground opacity-50",
                    modifiers.disabled && "opacity-50 cursor-not-allowed",
                    isPastEvent && "opacity-50 grayscale",
                  )}
                >
                  <span className={cn(
                    "font-medium leading-none",
                    isMobile ? "text-xs" : "text-sm"
                  )}>
                    {day.date.getDate()}
                  </span>
                  {dayEvents.length > 0 && (
                    <div className="flex flex-col gap-0.5 w-full">
                      {dayEvents.slice(0, isMobile ? 1 : 2).map((event, index) => (
                        <div
                          key={index}
                          className={cn(
                            "px-1 py-0.5 rounded text-white font-medium truncate w-full",
                            isMobile ? "text-[10px]" : "text-xs",
                            event.type === 'public' ? "bg-red-500" : 
                            event.type === 'academic' ? "bg-blue-500" : 
                            event.type === 'exam' ? "bg-orange-500" : "bg-gray-500",
                            event.isPast && "opacity-50 grayscale"
                          )}
                          title={`${event.name}${event.time ? ` at ${event.time}` : ''}${event.description ? ` - ${event.description}` : ''}`}
                        >
                          {isMobile 
                            ? (event.name.length > 8 ? `${event.name.substring(0, 8)}...` : event.name)
                            : (event.name.length > 12 ? `${event.name.substring(0, 12)}...` : event.name)
                          }
                          {event.time && event.type === 'exam' && !isMobile && (
                            <div className="text-xs opacity-90 mt-0.5">
                              {event.time}
                            </div>
                          )}
                        </div>
                      ))}
                      {dayEvents.length > (isMobile ? 1 : 2) && (
                        <div className={cn(
                          "text-muted-foreground",
                          isMobile ? "text-[10px]" : "text-xs"
                        )}>
                          +{dayEvents.length - (isMobile ? 1 : 2)} more
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
