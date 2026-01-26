"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PROVINCES } from "@/lib/geo-constants"
import { useGeoStats } from "@/hooks/use-geo-stats"
import { GeoLoadingCard } from "./geo-stats/geo-loading-card"
import { GeoErrorCard } from "./geo-stats/geo-error-card"
import { PassRateCharts } from "./geo-stats/pass-rate-charts"
import { GeoStatsSummary } from "./geo-stats/geo-stats-summary"
import { YoYBarChart } from "./geo-stats/yoy-bar-chart"

export function GeoProvincialPass() {
  const isMobile = useIsMobile()
  const {
    loading,
    phase,
    error,
    province,
    data,
    yoy,
    handleRetry,
    handleManualSelect,
  } = useGeoStats()

  if (loading) {
    return <GeoLoadingCard />
  }

  if (phase === "error" || !data) {
    return (
      <GeoErrorCard 
        error={error} 
        onRetry={handleRetry} 
        onManualSelect={handleManualSelect} 
      />
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" aria-hidden="true" />
            Your Province: {province}
          </CardTitle>
          <Select onValueChange={handleManualSelect}>
            <SelectTrigger className="w-[140px] h-8 text-xs">
              <SelectValue placeholder="Change" />
            </SelectTrigger>
            <SelectContent>
              {PROVINCES.map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <CardDescription>
          Provincial pass rates vs national (last 5 years)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PassRateCharts 
          isMobile={isMobile} 
          province={province} 
          data={data} 
        />
        
        <GeoStatsSummary 
          data={data} 
          yoy={yoy} 
        />

        <YoYBarChart 
          data={data} 
          yoy={yoy} 
        />
      </CardContent>
    </Card>
  )
}
