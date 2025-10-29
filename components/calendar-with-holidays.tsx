"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { isSameDay } from "date-fns"
import { cn } from "@/lib/utils"

// South African Public Holidays for 2024 and 2025
const southAfricanHolidays = [
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

  // 2025 NSC Examination Dates (October/November) - Validated to avoid weekends
  { date: new Date(2025, 9, 17), name: "Matric Pledge Signing", type: "exam", description: "Matric learners participate in pledge signing ceremony" },
  { date: new Date(2025, 9, 20), name: "NSC Exams Begin", type: "exam", description: "National Senior Certificate examinations commence" },
  { date: new Date(2025, 9, 24), name: "Information Technology P2", type: "exam", description: "IT P2 Theory (3hrs) - 09:00 (Moved from Saturday to Friday)" },
  { date: new Date(2025, 9, 27), name: "Dance Studies & Languages", type: "exam", description: "Dance Studies, Electrical Tech, Portuguese/German/Hebrew P1 - 09:00 & 14:00 (Moved from Sunday to Monday)" },
  { date: new Date(2025, 9, 28), name: "History P1 & Languages", type: "exam", description: "History P1 (3hrs), Maritime Economics, Various Languages P1 - 09:00 & 14:00" },
  { date: new Date(2025, 9, 29), name: "Afrikaans P1", type: "exam", description: "Afrikaans HL and FAL P1 (2hrs) - 09:00" },
  { date: new Date(2025, 9, 30), name: "Mathematics P1", type: "exam", description: "Mathematics P1 (3hrs), Mathematical Literacy P1 (3hrs) - 09:00" },
  { date: new Date(2025, 9, 31), name: "Mathematics P2", type: "exam", description: "Mathematics P2 (3hrs), Mathematical Literacy P2 (3hrs) - 09:00 & 14:00 (Moved from Saturday to Friday)" },
  { date: new Date(2025, 10, 3), name: "English P1 & EGD P1", type: "exam", description: "English HL/FAL P1 (2hrs), Engineering Graphics P1 (3hrs) - 09:00 & 14:00 (Moved from Sunday to Monday)" },
  { date: new Date(2025, 10, 4), name: "African Languages P1 & EGD P2", type: "exam", description: "isiZulu, isiXhosa, Siswati, isiNdebele P1, Engineering Graphics P2 - 09:00 & 14:00" },
  { date: new Date(2025, 10, 5), name: "Agricultural Science P1", type: "exam", description: "Agricultural Science P1 (2½hrs), Nautical Science P1 - 09:00" },
  { date: new Date(2025, 10, 6), name: "Agricultural Science P2 & Visual Arts", type: "exam", description: "Agricultural Science P2 (2½hrs), Visual Arts (3hrs) - 09:00 & 14:00" },
  { date: new Date(2025, 10, 7), name: "Afrikaans P2 & African Languages P1", type: "exam", description: "Afrikaans P2, Sepedi/Sesotho/Setswana/Xitsonga/Tshivenda P1 - 09:00 & 14:00" },
  { date: new Date(2025, 10, 10), name: "Economics & Mechanical Technology", type: "exam", description: "Economics (3hrs), Mechanical Technology (3hrs) - 09:00 & 14:00" },
  { date: new Date(2025, 10, 11), name: "English P2 & Languages P3", type: "exam", description: "English P2, Portuguese/German P3 - 09:00 & 14:00" },
  { date: new Date(2025, 10, 12), name: "Physical Science P1", type: "exam", description: "Physical Science (Physics) P1 (3hrs) - 09:00" },
  { date: new Date(2025, 10, 13), name: "Physical Science P2 & Languages P3", type: "exam", description: "Physical Science (Chemistry) P2 (3hrs), Various Languages P3 - 09:00 & 14:00" },
  { date: new Date(2025, 10, 14), name: "English P3 & Music P1", type: "exam", description: "English P3 (2½hrs), Music P1 Theory (3hrs) - 09:00 & 14:00" },
  { date: new Date(2025, 10, 17), name: "History P2 & Agricultural Technology", type: "exam", description: "History P2 (3hrs), Agricultural Technology (3hrs) - 09:00 & 14:00" },
  { date: new Date(2025, 10, 18), name: "Life Sciences P1 & Afrikaans P3", type: "exam", description: "Life Sciences P1 (2½hrs), Afrikaans P3 (2½hrs) - 09:00 & 14:00" },
  { date: new Date(2025, 10, 19), name: "Life Sciences P2 & Religion Studies", type: "exam", description: "Life Sciences P2 (2½hrs), Religion Studies P1 (2hrs) - 09:00 & 14:00" },
  { date: new Date(2025, 10, 20), name: "Tourism & Mathematics P3", type: "exam", description: "Tourism (3hrs), Mathematics P3 (2hrs) - 09:00 & 14:00" },
  { date: new Date(2025, 10, 21), name: "Accounting & Agriculture Management", type: "exam", description: "Accounting (3hrs), Agriculture Management Practices (2½hrs) - 09:00 & 14:00" },
  { date: new Date(2025, 10, 24), name: "African Languages P2 & Design", type: "exam", description: "isiZulu/isiXhosa/Siswati/isiNdebele P2, Design (3hrs) - 09:00 & 14:00" },
  { date: new Date(2025, 10, 25), name: "NSC Exams End", type: "exam", description: "National Senior Certificate examinations conclude" },

  // 2025 May/June Supplementary Exams
  { date: new Date(2025, 4, 12), name: "May/June Supplementary Exams Begin", type: "exam", description: "Supplementary examinations for NSC candidates" },
  { date: new Date(2025, 5, 20), name: "May/June Supplementary Exams End", type: "exam", description: "Supplementary examinations conclude" },
]

export function CalendarWithHolidays() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  
  // Get holidays for the selected date
  const getHolidaysForDate = (date: Date) => {
    return southAfricanHolidays.filter(holiday => 
      isSameDay(holiday.date, date)
    )
  }
  
  // Get all holidays for the current month
  const getHolidaysForMonth = (date: Date) => {
    return southAfricanHolidays.filter(holiday => 
      holiday.date.getMonth() === date.getMonth() && 
      holiday.date.getFullYear() === date.getFullYear()
    )
  }
  
  const selectedDateHolidays = selectedDate ? getHolidaysForDate(selectedDate) : []
  const currentMonthHolidays = selectedDate ? getHolidaysForMonth(selectedDate) : []
  
  // Custom day renderer to highlight holidays
  const modifiers = {
    holiday: southAfricanHolidays.map(h => h.date),
    publicHoliday: southAfricanHolidays.filter(h => h.type === 'public').map(h => h.date),
    academicEvent: southAfricanHolidays.filter(h => h.type === 'academic').map(h => h.date),
    examDate: southAfricanHolidays.filter(h => h.type === 'exam').map(h => h.date),
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
              const dayHolidays = getHolidaysForDate(day.date)
              const isSelected = modifiers.selected
              
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
                  )}
                >
                  <span className="text-sm font-medium leading-none">
                    {day.date.getDate()}
                  </span>
                  {dayHolidays.length > 0 && (
                    <div className="flex flex-col gap-0.5 w-full">
                      {dayHolidays.slice(0, 2).map((holiday, index) => (
                        <div
                          key={index}
                          className={cn(
                            "text-xs px-1 py-0.5 rounded text-white font-medium truncate w-full",
                            holiday.type === 'public' ? "bg-red-500" : 
                            holiday.type === 'academic' ? "bg-blue-500" : 
                            holiday.type === 'exam' ? "bg-orange-500" : "bg-gray-500"
                          )}
                          title={holiday.name}
                        >
                          {holiday.name.length > 12 ? `${holiday.name.substring(0, 12)}...` : holiday.name}
                        </div>
                      ))}
                      {dayHolidays.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{dayHolidays.length - 2} more
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
            {selectedDateHolidays.length > 0 ? (
              <div className="space-y-3">
                {selectedDateHolidays.map((holiday, index) => (
                  <div key={index} className="p-3 rounded-lg border bg-card">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge 
                        variant={holiday.type === 'public' ? 'destructive' : 'default'}
                        className={
                          holiday.type === 'academic' ? 'bg-blue-500' : 
                          holiday.type === 'exam' ? 'bg-orange-500' : ''
                        }
                      >
                        {holiday.type === 'public' ? 'Public Holiday' : 
                         holiday.type === 'academic' ? 'Academic Event' : 
                         holiday.type === 'exam' ? 'Exam Date' : 'Event'}
                      </Badge>
                    </div>
                    <h4 className="font-medium text-base">{holiday.name}</h4>
                    {holiday.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {holiday.description}
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
           {currentMonthHolidays.length > 0 ? (
             <div className="space-y-3">
               {currentMonthHolidays
                 .sort((a, b) => a.date.getDate() - b.date.getDate())
                 .map((holiday, index) => (
                   <div key={index} className="p-3 rounded-lg border bg-card">
                     <div className="flex items-center justify-between gap-2 mb-2">
                       <Badge 
                         variant={holiday.type === 'public' ? 'destructive' : 'default'}
                         className={
                           holiday.type === 'academic' ? 'bg-blue-500' : 
                           holiday.type === 'exam' ? 'bg-orange-500' : ''
                         }
                       >
                         {holiday.type === 'public' ? 'Public Holiday' : 
                          holiday.type === 'academic' ? 'Academic Event' : 
                          holiday.type === 'exam' ? 'Exam Date' : 'Event'}
                       </Badge>
                       <span className="text-sm text-muted-foreground">
                         {holiday.date.getDate()}
                       </span>
                     </div>
                     <h4 className="font-medium text-base">{holiday.name}</h4>
                     {holiday.description && (
                       <p className="text-sm text-muted-foreground mt-1">
                         {holiday.description}
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