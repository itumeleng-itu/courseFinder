import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PROVINCES } from "@/lib/geo-constants"

interface GeoErrorCardProps {
  error: string | null
  onRetry: () => void
  onManualSelect: (prov: string) => void
}

export function GeoErrorCard({ error, onRetry, onManualSelect }: GeoErrorCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-destructive" aria-hidden="true" />
          Location Service
        </CardTitle>
        <CardDescription>
          {error || "We couldn't determine your province automatically."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select your province manually:</label>
          <Select onValueChange={onManualSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a province..." />
            </SelectTrigger>
            <SelectContent>
              {PROVINCES.map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onRetry}>
            Try auto-detect again
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
