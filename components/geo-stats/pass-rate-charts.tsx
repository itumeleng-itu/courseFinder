import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  Legend,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
} from "recharts"
import { SeriesPoint, ApiResponse } from "@/hooks/use-geo-stats"
import { rateFormat } from "@/lib/geo-constants"

interface PassRateChartsProps {
  isMobile: boolean
  province: string | null
  data: ApiResponse
}

export function PassRateCharts({ isMobile, province, data }: PassRateChartsProps) {
  const chartData = data.provinceSeries.map((p: SeriesPoint, i: number) => ({
    year: p.year,
    province: p.passRate,
    national: data.nationalSeries[i]?.passRate ?? null,
  }))

  if (isMobile) {
    return (
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 24, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis domain={[60, 95]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <ReTooltip formatter={(v: number | string) => rateFormat(Number(v))} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="province" name={province || "Province"} fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            <Bar dataKey="national" name="National" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="0" vertical={false} className="stroke-muted" />
          <XAxis dataKey="year" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} dy={10} className="text-muted-foreground" />
          <YAxis domain={[60, 95]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} dx={-5} className="text-muted-foreground" />
          <ReTooltip
            formatter={(v: number | string) => rateFormat(Number(v))}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              padding: "8px 12px",
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 15 }} iconType="circle" />
          <Line
            type="natural"
            dataKey="province"
            name={province || "Province"}
            stroke="currentColor"
            strokeWidth={2.5}
            dot={false}
            className="text-foreground"
            activeDot={{ r: 5, strokeWidth: 2, className: "fill-foreground stroke-background" }}
          />
          <Line
            type="natural"
            dataKey="national"
            name="National"
            stroke="currentColor"
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={false}
            className="text-muted-foreground"
            activeDot={{ r: 5, strokeWidth: 2, className: "fill-muted-foreground stroke-background" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
