import { TrendingUp } from "lucide-react"
import { ApiResponse } from "@/hooks/use-geo-stats"
import { rateFormat } from "@/lib/geo-constants"

interface GeoStatsSummaryProps {
  data: ApiResponse
  yoy: Array<{ year: number; delta: number }>
}

export function GeoStatsSummary({ data, yoy }: GeoStatsSummaryProps) {
  const latestDelta = yoy[yoy.length - 1]

  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3" aria-label="Summary statistics">
      <div className="p-3 rounded-md border">
        <div className="text-sm text-muted-foreground">Province avg</div>
        <div className="text-lg font-semibold">{rateFormat(data.provinceAvg)}</div>
      </div>
      <div className="p-3 rounded-md border">
        <div className="text-sm text-muted-foreground">National avg</div>
        <div className="text-lg font-semibold">{rateFormat(data.nationalAvg)}</div>
      </div>
      <div className="p-3 rounded-md border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4" /> YoY change (latest)
        </div>
        <div className="text-lg font-semibold">
          {latestDelta ? `${latestDelta.delta >= 0 ? "+" : ""}${latestDelta.delta.toFixed(1)}%` : "—"}
        </div>
      </div>
    </div>
  )
}
