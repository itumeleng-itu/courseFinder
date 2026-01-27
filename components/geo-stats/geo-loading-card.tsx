import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin } from "lucide-react"

export function GeoLoadingCard() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-5 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-2/5" />
              <Skeleton className="h-3 w-3/5" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10 space-y-4">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
            <MapPin className="h-8 w-8 text-primary animate-pulse relative" />
          </div>
          <p className="text-sm font-medium animate-pulse text-muted-foreground">
            Identifying your province...
          </p>
          <Skeleton className="h-40 w-full rounded-xl" />
        </CardContent>
      </Card>
    </div>
  )
}
