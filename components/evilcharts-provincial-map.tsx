"use client"

import { useEffect, useMemo, useRef, useState, useCallback } from "react"
import * as echarts from "echarts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PROVINCES, COLOR_SCHEMES } from "@/lib/map/constants"
import { ProvinceValueMap, ProvinceSeriesResponse, SAProvincesGeoJSON } from "@/lib/map/types"
import { loadZAProvincesGeoJSON, prefetchAllProvinceSeries } from "@/lib/map/utils"

export function EvilChartsProvincialMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<echarts.ECharts | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [colorScheme, setColorScheme] = useState<keyof typeof COLOR_SCHEMES>("Viridis")
  const [threshold, setThreshold] = useState<number>(60)
  const [selectedProvince, setSelectedProvince] = useState<(typeof PROVINCES)[number] | null>(null)
  const [years, setYears] = useState<number[]>([])
  const [year, setYear] = useState<number | null>(null)
  const [seriesCache, setSeriesCache] = useState<Record<string, ProvinceSeriesResponse>>({})
  const [geoJSON, setGeoJSON] = useState<SAProvincesGeoJSON | null>(null)

  const provinceValues = useMemo(() => {
    const values: any = {}
    for (const p of PROVINCES) {
      const resp = seriesCache[p]; const point = resp?.provinceSeries?.find(sp => sp.year === year) || resp?.provinceSeries?.slice(-1)[0]
      values[p] = point ? point.passRate : NaN
    }
    return values as ProvinceValueMap
  }, [seriesCache, year])

  useEffect(() => {
    let cancelled = false
    async function init() {
      try {
        const [geo, data] = await Promise.all([loadZAProvincesGeoJSON(), prefetchAllProvinceSeries()])
        if (cancelled) return; setGeoJSON(geo); setSeriesCache(data)
        const yr = (data[PROVINCES[0]]?.provinceSeries || []).map(d => d.year); setYears(yr); setYear(yr[yr.length - 1])
      } catch (e: any) { setError(e.message) } finally { setLoading(false) }
    }
    init(); return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (!containerRef.current || !geoJSON || !year) return
    try { echarts.registerMap("SA", geoJSON, { nameProperty: "shapeName" }) } catch {}
    const chart = echarts.init(containerRef.current); chartRef.current = chart
    const resize = () => chart.resize(); window.addEventListener("resize", resize)
    chart.on("click", (params: any) => { if (PROVINCES.includes(params.name)) setSelectedProvince(params.name) })
    return () => { window.removeEventListener("resize", resize); chart.dispose(); chartRef.current = null }
  }, [geoJSON, year])

  useEffect(() => {
    if (!chartRef.current || !year) return
    const data = PROVINCES.map(p => ({ name: p, value: provinceValues[p] }))
    chartRef.current.setOption({
      backgroundColor: "transparent",
      title: { text: `Provincial Pass Rates (${year})`, left: "center", top: 8, textStyle: { fontSize: 14 } },
      tooltip: { trigger: "item", formatter: (p: any) => {
        const resp = seriesCache[p.name]; const cur = resp?.provinceSeries?.find(s => s.year === year); const prev = resp?.provinceSeries?.find(s => s.year === year! - 1)
        const yoy = cur && prev ? cur.passRate - prev.passRate : null
        return `${p.name}<br/>Pass rate: ${cur?.passRate.toFixed(1)}%${yoy !== null ? `<br/>YoY: ${yoy >= 0 ? "+" : ""}${yoy.toFixed(1)}%` : ""}`
      }},
      visualMap: { min: threshold, max: 100, left: 10, bottom: 20, calculable: true, inRange: { color: COLOR_SCHEMES[colorScheme] }, outOfRange: { color: "#e5e7eb" }, text: ["High", "Low"] },
      geo: { map: "SA", roam: true, zoom: 1.05, label: { show: true, fontSize: 10 }, itemStyle: { borderColor: "#9ca3af" } },
      series: [{ type: "map", map: "SA", selectedMode: "single", data }]
    })
  }, [colorScheme, threshold, provinceValues, seriesCache, year])

  if (loading) return <Card><CardHeader><CardTitle>Provincial Map</CardTitle></CardHeader><CardContent><Skeleton className="h-[360px] w-full" /></CardContent></Card>
  if (error) return <Alert><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interactive Provincial Map</CardTitle>
        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={String(year)} onValueChange={v => setYear(Number(v))}><SelectTrigger className="w-28"><SelectValue /></SelectTrigger><SelectContent>{years.map(y => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}</SelectContent></Select>
          <Select value={colorScheme} onValueChange={v => setColorScheme(v as any)}><SelectTrigger className="w-36"><SelectValue /></SelectTrigger><SelectContent>{Object.keys(COLOR_SCHEMES).map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}</SelectContent></Select>
          <div className="flex items-center gap-3"><label className="text-sm">Min %</label><input type="range" min={0} max={100} value={threshold} onChange={e => setThreshold(Number(e.target.value))} className="w-40" /><span>{threshold}</span></div>
        </div>
      </CardHeader>
      <CardContent><div className="w-full h-[420px]" ref={containerRef} /></CardContent>
    </Card>
  )
}
