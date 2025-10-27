"use client"

import { useEffect, useMemo, useRef, useState, useCallback } from "react"
import * as echarts from "echarts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Province list used across the app (ensure names match geoBoundaries shapeName)
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
] as const

// Color schemes for professional-grade visuals
const COLOR_SCHEMES: Record<string, string[]> = {
  Viridis: ["#440154", "#482878", "#3E4989", "#31688E", "#26828E", "#1F9E89", "#35B779", "#6CCE59", "#B8DE29", "#FDE725"],
  Warm: ["#5b1a18", "#8c2d04", "#cc4c02", "#ec7014", "#fe9929", "#fec44f", "#fee391", "#fff7bc"],
  Cool: ["#023858", "#045a8d", "#0570b0", "#3690c0", "#74a9cf", "#a6bddb", "#d0d1e6", "#e0e9f3"],
  HighContrast: ["#0b1026", "#193170", "#2657a6", "#2ea3f2", "#58d5ff", "#95e8ff", "#c2f3ff"],
  Grayscale: ["#f5f5f5", "#e5e5e5", "#d4d4d4", "#a3a3a3", "#737373", "#525252", "#404040", "#262626", "#171717", "#0a0a0a"],
}

// Session cache helpers
const SESSION_KEYS = {
  geojson: "evilcharts-provinces-geojson",
  geojsonTTL: "evilcharts-provinces-geojson-ttl",
  data: "evilcharts-provinces-data",
  dataTTL: "evilcharts-provinces-data-ttl",
}

type ProvinceValueMap = Record<(typeof PROVINCES)[number], number>

interface ProvinceSeriesPoint { year: number; passRate: number }
interface ProvinceSeriesResponse {
  success: boolean
  province: string
  endYear: number
  provinceSeries: ProvinceSeriesPoint[]
  nationalSeries: ProvinceSeriesPoint[]
  provinceAvg: number
  nationalAvg: number
}

// Fetch helper with robust error handling
async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { next: { revalidate: 0 } })
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`)
  }
  return (await res.json()) as T
}

// Load South Africa ADM1 GeoJSON via geoBoundaries API
async function loadZAProvincesGeoJSON(): Promise<any> {
  // Try session cache first
  try {
    const ttlStr = typeof window !== "undefined" ? sessionStorage.getItem(SESSION_KEYS.geojsonTTL) : null
    const cached = typeof window !== "undefined" ? sessionStorage.getItem(SESSION_KEYS.geojson) : null
    if (cached && ttlStr && Number(ttlStr) > Date.now()) {
      return JSON.parse(cached)
    }
  } catch {}

  // Get metadata to obtain gjDownloadURL
  const meta = await fetchJSON<any[]>(
    "https://www.geoboundaries.org/api/current/gbOpen/ZAF/ADM1/"
  )
  const gj = meta?.[0]?.gjDownloadURL as string | undefined
  if (!gj) throw new Error("GeoBoundaries ADM1 gjDownloadURL not found for ZAF")
  const geo = await fetchJSON<any>(gj)

  // Cache for 24 hours in sessionStorage
  try {
    sessionStorage.setItem(SESSION_KEYS.geojson, JSON.stringify(geo))
    sessionStorage.setItem(SESSION_KEYS.geojsonTTL, String(Date.now() + 24 * 60 * 60 * 1000))
  } catch {}

  return geo
}

// Prefetch series for all provinces (9 calls), cache for 2 hours
async function prefetchAllProvinceSeries(): Promise<Record<string, ProvinceSeriesResponse>> {
  try {
    const ttlStr = typeof window !== "undefined" ? sessionStorage.getItem(SESSION_KEYS.dataTTL) : null
    const cached = typeof window !== "undefined" ? sessionStorage.getItem(SESSION_KEYS.data) : null
    if (cached && ttlStr && Number(ttlStr) > Date.now()) {
      return JSON.parse(cached)
    }
  } catch {}

  const results = await Promise.all(
    PROVINCES.map(async (p) => {
      const r = await fetchJSON<ProvinceSeriesResponse>(`/api/provincial-pass-rates?province=${encodeURIComponent(p)}`)
      return [p, r] as const
    })
  )

  const map: Record<string, ProvinceSeriesResponse> = Object.fromEntries(results)

  try {
    sessionStorage.setItem(SESSION_KEYS.data, JSON.stringify(map))
    sessionStorage.setItem(SESSION_KEYS.dataTTL, String(Date.now() + 2 * 60 * 60 * 1000))
  } catch {}

  return map
}

export function EvilChartsProvincialMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<echarts.ECharts | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [colorScheme, setColorScheme] = useState<keyof typeof COLOR_SCHEMES>("Grayscale")
  const [threshold, setThreshold] = useState<number>(60)
  const [selectedProvince, setSelectedProvince] = useState<(typeof PROVINCES)[number] | null>(null)

  const [years, setYears] = useState<number[]>([])
  const [year, setYear] = useState<number | null>(null)
  const [seriesCache, setSeriesCache] = useState<Record<string, ProvinceSeriesResponse>>({})
  const [geoJSON, setGeoJSON] = useState<any | null>(null)

  const computeProvinceValues = useCallback(
    (y: number | null): ProvinceValueMap => {
      const values: Partial<ProvinceValueMap> = {}
      for (const p of PROVINCES) {
        const resp = seriesCache[p]
        const point = resp?.provinceSeries?.find((sp) => sp.year === y) || resp?.provinceSeries?.slice(-1)[0]
        values[p] = point ? point.passRate : NaN
      }
      return values as ProvinceValueMap
    },
    [seriesCache]
  )

  const provinceValues = useMemo(() => computeProvinceValues(year), [computeProvinceValues, year])

  // Initialize geo & data
  useEffect(() => {
    let cancelled = false
    async function init() {
      setLoading(true)
      setError(null)
      try {
        const [geo, data] = await Promise.all([loadZAProvincesGeoJSON(), prefetchAllProvinceSeries()])
        if (cancelled) return
        setGeoJSON(geo)
        setSeriesCache(data)
        // Determine years from one province (assume consistent)
        const yr = (data[PROVINCES[0]]?.provinceSeries || []).map((d) => d.year)
        setYears(yr)
        setYear(yr[yr.length - 1])
      } catch (e: any) {
        console.error(e)
        setError(e?.message || "Failed to load map and data")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    init()
    return () => {
      cancelled = true
    }
  }, [])

  // Register map and create chart
  useEffect(() => {
    if (!containerRef.current || !geoJSON || !year) return

    // Register map with shapeName as the name property
    try {
      echarts.registerMap("SouthAfricaProvinces", geoJSON, { nameProperty: "shapeName" })
    } catch {}

    const chart = echarts.init(containerRef.current)
    chartRef.current = chart

    const resize = () => chart.resize()
    window.addEventListener("resize", resize)

    chart.on("click", (params: any) => {
      if (params?.name && PROVINCES.includes(params.name)) {
        setSelectedProvince(params.name as (typeof PROVINCES)[number])
      }
    })

    return () => {
      window.removeEventListener("resize", resize)
      chart.dispose()
      chartRef.current = null
    }
  }, [geoJSON, year])

  // Update chart options whenever dependencies change
  useEffect(() => {
    if (!chartRef.current || !year) return

    const scheme = COLOR_SCHEMES[colorScheme]

    const data = PROVINCES.map((p) => ({ name: p, value: provinceValues[p] }))

    const options: echarts.EChartsOption = {
      backgroundColor: "transparent",
      title: {
        text: `Provincial Pass Rates (${year})`,
        left: "center",
        top: 8,
        textStyle: { fontSize: 14, fontWeight: 600 },
      },
      tooltip: {
        trigger: "item",
        formatter: (params: any) => {
          const resp = seriesCache[params.name]
          const latest = resp?.provinceSeries?.find((sp) => sp.year === year)
          const prev = resp?.provinceSeries?.find((sp) => sp.year === year! - 1)
          const yoy = latest && prev ? latest.passRate - prev.passRate : null
          const fmt = (n: number | null | undefined) => (typeof n === "number" ? `${n.toFixed(1)}%` : "N/A")
          return `${params.name}<br/>Pass rate: ${fmt(latest?.passRate)}${
            yoy !== null ? `<br/>YoY: ${yoy >= 0 ? "+" : ""}${fmt(yoy)}` : ""
          }`
        },
      },
      visualMap: {
        min: threshold,
        max: 100,
        left: 10,
        bottom: 20,
        calculable: true,
        inRange: { color: scheme },
        outOfRange: { color: "#e5e7eb" },
        text: ["High", "Low"],
        textStyle: { fontSize: 12 },
      },
      geo: {
        map: "SouthAfricaProvinces",
        roam: true,
        zoom: 1.05,
        top: 28,
        bottom: 60,
        label: {
          show: true,
          color: "#374151",
          fontSize: 10,
        },
        itemStyle: {
          borderColor: "#9ca3af",
          borderWidth: 0.8,
        },
        emphasis: {
          label: { show: true, color: "#111827", fontWeight: "bold" },
          itemStyle: { areaColor: "#d1d5db" },
        },
      },
      series: [
        {
          type: "map",
          name: "Pass Rate",
          map: "SouthAfricaProvinces",
          selectedMode: "single",
          data,
          // Highlight selected province
          emphasis: { focus: "self" },
        },
      ],
    }

    chartRef.current.setOption(options)
  }, [colorScheme, threshold, provinceValues, seriesCache, year])

  const refreshData = async () => {
    try {
      setLoading(true)
      const data = await prefetchAllProvinceSeries()
      setSeriesCache(data)
      // Keep same year if available; otherwise fall back to last available
      const yr = (data[PROVINCES[0]]?.provinceSeries || []).map((d) => d.year)
      setYears(yr)
      if (!yr.includes(year!)) setYear(yr[yr.length - 1])
    } catch (e: any) {
      setError(e?.message || "Failed to refresh data")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Provincial Map</CardTitle>
          <CardDescription>Loading geographic data and provincial series</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[360px] w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert>
        <AlertTitle>Failed to load provincial visualization</AlertTitle>
        <AlertDescription>
          {error}
          <div className="mt-3">
            <Button size="sm" onClick={() => refreshData()}>Retry</Button>
          </div>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Card>
      <CardHeader className="space-y-2">
        <CardTitle>Interactive Provincial Map</CardTitle>
        <CardDescription>
          Explore South African provincial boundaries with live pass rate data, tooltips, zoom/pan, and filtering.
        </CardDescription>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Year</span>
            <Select value={String(year ?? "")} onValueChange={(v) => setYear(Number(v))}>
              <SelectTrigger className="w-28">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((y) => (
                  <SelectItem key={y} value={String(y)}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Colors</span>
            <Select value={colorScheme} onValueChange={(v) => setColorScheme(v as keyof typeof COLOR_SCHEMES)}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Scheme" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(COLOR_SCHEMES).map((k) => (
                  <SelectItem key={k} value={k}>
                    {k}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="threshold" className="text-sm text-muted-foreground">
              Min pass %
            </label>
            <input
              id="threshold"
              type="range"
              min={0}
              max={100}
              step={1}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-40"
            />
            <span className="text-sm tabular-nums w-10 text-right">{threshold}</span>
          </div>

          <div className="ml-auto">
            <Button variant="outline" size="sm" onClick={refreshData}>
              Refresh Data
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[420px]" ref={containerRef} aria-label="Provincial interactive map" />

        {/* Selection details */}
        {selectedProvince && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-md border">
              <div className="text-sm text-muted-foreground">Selected Province</div>
              <div className="text-lg font-semibold">{selectedProvince}</div>
            </div>
            <div className="p-3 rounded-md border">
              <div className="text-sm text-muted-foreground">Pass Rate ({year})</div>
              <div className="text-lg font-semibold">
                {(() => {
                  const v = provinceValues[selectedProvince]
                  return isFinite(v) ? `${v.toFixed(1)}%` : "N/A"
                })()}
              </div>
            </div>
            <div className="p-3 rounded-md border">
              <div className="text-sm text-muted-foreground">YoY Change</div>
              <div className="text-lg font-semibold">
                {(() => {
                  const resp = seriesCache[selectedProvince]
                  const latest = resp?.provinceSeries?.find((sp) => sp.year === year)
                  const prev = resp?.provinceSeries?.find((sp) => sp.year === (year ?? 0) - 1)
                  const yoy = latest && prev ? latest.passRate - prev.passRate : null
                  if (yoy === null) return "N/A"
                  const sign = yoy >= 0 ? "+" : ""
                  return `${sign}${yoy.toFixed(1)}%`
                })()}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
