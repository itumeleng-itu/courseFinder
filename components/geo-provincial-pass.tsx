"use client"

import { useEffect, useMemo, useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { TrendingUp, MapPin } from "lucide-react"
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
} from "recharts"
import { useIsMobile } from "@/hooks/use-mobile"

interface SeriesPoint { year: number; passRate: number }
interface ApiResponse {
  success: boolean
  province: string
  endYear: number
  provinceSeries: SeriesPoint[]
  nationalSeries: SeriesPoint[]
  provinceAvg: number
  nationalAvg: number
}

const PROVINCES = [
  "Gauteng",
  "Western Cape",
  "KwaZulu-Natal",
  "Eastern Cape",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Free State",
  "Northern Cape",
]

function normalizeProvince(name: string): string | null {
  const n = name.trim().toLowerCase()
  const map: Record<string, string> = {
    "gauteng": "Gauteng",
    "western cape": "Western Cape",
    "wc": "Western Cape",
    "kwazulu-natal": "KwaZulu-Natal",
    "kwazulu natal": "KwaZulu-Natal",
    "kzn": "KwaZulu-Natal",
    "eastern cape": "Eastern Cape",
    "limpopo": "Limpopo",
    "mpumalanga": "Mpumalanga",
    "north west": "North West",
    "free state": "Free State",
    "northern cape": "Northern Cape",
  }
  return map[n] || PROVINCES.find((p) => p.toLowerCase() === n) || null
}

function rateFormat(v: number) {
  return `${v.toFixed(1)}%`
}

export function GeoProvincialPass() {
  const isMobile = useIsMobile()
  const [loading, setLoading] = useState(true)
  const [phase, setPhase] = useState<"idle" | "locating" | "geocoding" | "fetching" | "done" | "error">("idle")
  const [error, setError] = useState<string | null>(null)
  const [province, setProvince] = useState<string | null>(null)
  const [data, setData] = useState<ApiResponse | null>(null)

  const cacheKey = "geoProvince:v1"
  const cacheTTL = 4 * 60 * 60 * 1000 // 4 hours, sessionStorage only

  const loadFromCache = useCallback(() => {
    try {
      const raw = sessionStorage.getItem(cacheKey)
      if (!raw) return null
      const parsed = JSON.parse(raw)
      if (Date.now() - parsed.timestamp > cacheTTL) return null
      return typeof parsed.province === "string" ? parsed.province : null
    } catch { return null }
  }, [])

  const saveToCache = useCallback((prov: string) => {
    try {
      sessionStorage.setItem(cacheKey, JSON.stringify({ province: prov, timestamp: Date.now() }))
    } catch {}
  }, [])

  const detectLocation = useCallback(async () => {
    setPhase("locating")
    setError(null)
    return new Promise<GeolocationPosition>((resolve, reject) => {
      if (!("geolocation" in navigator)) {
        reject(new Error("Geolocation is not supported on this device."))
        return
      }
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      })
    })
  }, [])

  const reverseGeocode = useCallback(async (lat: number, lon: number) => {
    setPhase("geocoding")
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`
    const resp = await fetch(url, {
      headers: { "Accept": "application/json" },
    })
    if (!resp.ok) throw new Error(`Reverse geocoding failed (${resp.status})`)
    const json: any = await resp.json()
    const candidates = [json?.address?.state, json?.address?.county, json?.address?.region, json?.address?.province]
      .filter(Boolean)
      .map((s: string) => normalizeProvince(s))
      .filter(Boolean)
    const prov = candidates[0] || null
    if (!prov) throw new Error("Unable to determine province from coordinates.")
    return prov as string
  }, [])

  const fetchSeries = useCallback(async (prov: string) => {
    setPhase("fetching")
    const resp = await fetch(`/api/provincial-pass-rates?province=${encodeURIComponent(prov)}&years=5`)
    if (!resp.ok) throw new Error("Failed to load provincial pass rates.")
    const json = await resp.json()
    if (!json?.success) throw new Error("Provincial data unavailable.")
    return json as ApiResponse
  }, [])

  const handleRetry = useCallback(() => {
    setError(null)
    setLoading(true)
    setData(null)
    setProvince(null)
  }, [])

  useEffect(() => {
    let cancelled = false
    async function run() {
      try {
        setLoading(true)
        const cached = loadFromCache()
        let prov = cached
        if (!prov) {
          const pos = await detectLocation()
          prov = await reverseGeocode(pos.coords.latitude, pos.coords.longitude)
          saveToCache(prov)
        }
        if (cancelled) return
        setProvince(prov)
        const series = await fetchSeries(prov)
        if (cancelled) return
        setData(series)
        setPhase("done")
      } catch (e: any) {
        console.error("GeoProvincialPass error:", e)
        setError(e?.message || "Unable to detect location.")
        setPhase("error")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => { cancelled = true }
  }, [detectLocation, reverseGeocode, fetchSeries, loadFromCache, saveToCache])

  const yoy = useMemo(() => {
    if (!data?.provinceSeries) return [] as Array<{ year: number; delta: number }>
    const arr: Array<{ year: number; delta: number }> = []
    for (let i = 1; i < data.provinceSeries.length; i++) {
      const prev = data.provinceSeries[i - 1]
      const curr = data.provinceSeries[i]
      arr.push({ year: curr.year, delta: Number((curr.passRate - prev.passRate).toFixed(1)) })
    }
    return arr
  }, [data])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-3 w-3/5" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-48 w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (phase === "error" || !data) {
    return (
      <Alert variant="destructive" aria-live="polite">
        <AlertTitle>Location unavailable</AlertTitle>
        <AlertDescription>
          {error || "We couldn’t determine your province."}
          <div className="mt-3">
            <Button variant="outline" onClick={handleRetry}>Try again</Button>
          </div>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" aria-hidden="true" />
          Your Province: {province}
        </CardTitle>
        <CardDescription>
          Provincial pass rates vs national (last 5 years)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            {isMobile ? (
              <BarChart
                data={data.provinceSeries.map((p, i) => ({
                  year: p.year,
                  province: p.passRate,
                  national: data.nationalSeries[i]?.passRate ?? null,
                }))}
                margin={{ top: 10, right: 24, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis domain={[60, 95]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 12 }} />
                <ReTooltip formatter={(v: any) => rateFormat(Number(v))} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="province" name={province || "Province"} fill="#0ea5e9" />
                <Bar dataKey="national" name="National" fill="#10b981" />
              </BarChart>
            ) : (
              <LineChart
                data={data.provinceSeries.map((p, i) => ({
                  year: p.year,
                  province: p.passRate,
                  national: data.nationalSeries[i]?.passRate ?? null,
                }))}
                margin={{ top: 10, right: 24, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis domain={[60, 95]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 12 }} />
                <ReTooltip formatter={(v: any) => rateFormat(Number(v))} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="province" name={province || "Province"} stroke="#0ea5e9" strokeWidth={2} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="national" name="National" stroke="#10b981" strokeWidth={2} dot={{ r: 2 }} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

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
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><TrendingUp className="h-4 w-4" /> YoY change (latest)</div>
            <div className="text-lg font-semibold">
              {(() => {
                const latest = yoy[yoy.length - 1]
                if (!latest) return "—"
                const sign = latest.delta >= 0 ? "+" : ""
                return `${sign}${latest.delta.toFixed(1)}%`
              })()}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-5 gap-2" aria-label="Year-over-year changes">
          {yoy.map((y) => (
            <div key={y.year} className="p-2 rounded-md border flex items-center justify-between">
              <span className="text-sm">{y.year}</span>
              <span className={"text-sm font-medium " + (y.delta >= 0 ? "text-green-600" : "text-red-600")}>
                {y.delta >= 0 ? "↑" : "↓"} {Math.abs(y.delta).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
