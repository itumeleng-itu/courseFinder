import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { CalendarEvent } from "@/lib/calendar-events"

export function EventCard({ event }: { event: CalendarEvent }) {
  return (
    <div className={cn("p-3 rounded-lg border bg-card", event.isPast && "opacity-50 grayscale")}>
      <div className="flex items-center gap-2 mb-2">
        <Badge variant={event.type === 'public' ? 'destructive' : 'default'}
               className={cn(event.type === 'academic' ? 'bg-blue-500' : event.type === 'exam' ? 'bg-orange-500' : '')}>
          {event.type.toUpperCase()}
        </Badge>
        {event.time && <Badge variant="outline" className="text-xs">{event.time}</Badge>}
      </div>
      <h4 className="font-medium text-base">{event.name}</h4>
      {event.description && <p className="text-sm text-muted-foreground mt-1">{event.description}</p>}
    </div>
  )
}
