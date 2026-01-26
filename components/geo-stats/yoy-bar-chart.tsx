import { ResponsiveContainer, BarChart, XAxis, Tooltip as ReTooltip, Bar, Cell } from "recharts"
import { SeriesPoint, ApiResponse } from "@/hooks/use-geo-stats"
import { rateFormat } from "@/lib/geo-constants"

interface YoYBarChartProps {
  data: ApiResponse
  yoy: Array<{ year: number; delta: number }>
}

export function YoYBarChart({ data, yoy }: YoYBarChartProps) {
  const latestDelta = yoy[yoy.length - 1]
  const latestPassRate = data.provinceSeries[data.provinceSeries.length - 1]?.passRate || 0

  return (
    <div className="mt-6 p-4 rounded-lg border bg-card" aria-label="Year-over-year performance">
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-2xl font-bold text-foreground">{rateFormat(latestPassRate)}</div>
          <div className="text-sm text-muted-foreground">Latest pass rate</div>
        </div>
        {latestDelta && (
          <div className="text-sm font-medium px-2 py-1 rounded bg-muted text-foreground">
            {latestDelta.delta >= 0 ? "↗" : "↘"} {latestDelta.delta >= 0 ? "+" : ""}{latestDelta.delta.toFixed(1)}%
          </div>
        )}
      </div>

      <div className="w-full h-32 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data.provinceSeries.map((point: SeriesPoint, index: number) => ({
              year: point.year.toString(),
              passRate: point.passRate,
              isLatest: index === data.provinceSeries.length - 1,
            }))}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <XAxis dataKey="year" tick={{ fontSize: 11, fill: "currentColor" }} axisLine={false} tickLine={false} className="text-muted-foreground" />
            <ReTooltip
              formatter={(value: number) => [`${value.toFixed(1)}%`, "Pass Rate"]}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                color: "hsl(var(--foreground))",
              }}
              cursor={{ fill: "hsl(var(--muted))" }}
            />
            <Bar dataKey="passRate" radius={[2, 2, 0, 0]} maxBarSize={24}>
              {data.provinceSeries.map((_, index) => {
                const isLatest = index === data.provinceSeries.length - 1
                return <Cell key={`bar-${index}`} fill="currentColor" opacity={isLatest ? 1 : 0.25} className="text-foreground" />
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
