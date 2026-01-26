import { cn } from "@/lib/utils"
import { CalendarEvent } from "@/lib/calendar-events"

interface DayCellProps {
  date: Date
  events: CalendarEvent[]
  isSelected: boolean
  isToday: boolean
  isOutside: boolean
  isPast: boolean
  isMobile: boolean
}

export function DayCell({ date, events, isSelected, isToday, isOutside, isPast, isMobile }: DayCellProps) {
  return (
    <div className={cn(
      "relative w-full h-full flex flex-col items-start justify-start gap-1 text-left p-1",
      isMobile ? "min-h-12" : "min-h-16 p-2",
      isSelected && "bg-primary text-primary-foreground",
      isToday && "bg-accent text-accent-foreground font-semibold",
      isOutside && "text-muted-foreground opacity-50",
      isPast && "opacity-50 grayscale",
    )}>
      <span className={cn("font-medium", isMobile ? "text-xs" : "text-sm")}>
        {date.getDate()}
      </span>
      {events.length > 0 && (
        <div className="flex flex-col gap-0.5 w-full">
          {events.slice(0, isMobile ? 1 : 2).map((e, i) => (
            <div key={i} className={cn(
              "px-1 py-0.5 rounded text-white font-medium truncate w-full text-[10px]",
              !isMobile && "text-xs",
              e.type === 'public' ? "bg-red-500" : e.type === 'academic' ? "bg-blue-500" : "bg-orange-500"
            )}>
              {e.name}
            </div>
          ))}
          {events.length > (isMobile ? 1 : 2) && (
            <div className="text-muted-foreground text-[10px]">+{events.length - (isMobile ? 1 : 2)}</div>
          )}
        </div>
      )}
    </div>
  )
}
