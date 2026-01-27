import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Info } from "lucide-react"

interface GeoPermissionCardProps {
  onAllow: () => void
  onManualSelect: (prov: string) => void
}

export function GeoPermissionCard({ onAllow }: GeoPermissionCardProps) {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <MapPin className="h-5 w-5" aria-hidden="true" />
          Location Personalization
        </CardTitle>
        <CardDescription>
          We use your location to automatically show relevant matric results and education trends for your specific province.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border text-sm text-muted-foreground">
          <Info className="h-4 w-4 mt-0.5 text-primary shrink-0" />
          <p>
            This helps us compare your local provincial performance against national benchmarks without you having to manually search.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={onAllow} className="flex-1 shadow-md hover:shadow-lg transition-all">
            Find My Province
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
