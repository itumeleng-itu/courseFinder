"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, RefreshCw, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import * as echarts from "echarts"
import { useAutoRefresh } from "@/hooks/use-auto-refresh"
import { useTimeSync, formatInTimeZone } from "@/hooks/use-time-sync"
import { logEvent } from "@/lib/logger"

interface ProvinceStats {
  name: string
  passRate: number
  candidates: number
}

interface MatricStats {
  national: {
    passRate: number
    totalCandidates: number
    year: number
  }
  provinces: ProvinceStats[]
}

export function PassRateCharts() {
  const [stats, setStats] = useState<MatricStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedProvince, setSelectedProvince] = useState<string>("national")
  const [error, setError] = useState<string | null>(null)
  const [passedFailed, setPassedFailed] = useState<{ passed: number; failed: number } | null>(null)
  const [bachelor, setBachelor] = useState<{ percent: number; count: number } | null>(null)
  const [diploma, setDiploma] = useState<{ percent: number; count: number } | null>(null)
  const [higherCert, setHigherCert] = useState<{ percent: number; count: number } | null>(null)
  const pieRef = useRef<HTMLDivElement | null>(null)
  const pieChartRef = useRef<echarts.ECharts | null>(null)

  const REFRESH_INTERVAL_MS = Number(process.env.NEXT_PUBLIC_STATS_REFRESH_INTERVAL_MS ?? 60_000)
  const [isPending, startTransition] = useTransition()
  const { syncing: timeSyncing, error: timeError, networkTime, driftMs, timezone } = useTimeSync(Number(process.env.NEXT_PUBLIC_NTP_SYNC_INTERVAL_MS ?? 300_000))

  const fetchStats = async (signal?: AbortSignal) => {
    setLoading(true)
    try {
        const [statsRes, passRes, nscRes] = await Promise.allSettled([
          fetch("/api/matric-stats", { cache: "no-store", signal }),
          fetch("/api/matric-pass-rate", { cache: "no-store", signal }),
          fetch("/api/nsc-2024", { cache: "no-store", signal }),
        ])

        let nextStats: MatricStats | null = null
        let nsc2024: { 
          year: number; 
          passRate: number; 
          passes: number; 
          wrote: number; 
          failed: number; 
          bachelorPercent?: number; 
          bachelorPasses?: number;
          diplomaPercent?: number;
          diplomaPasses?: number;
          hcPercent?: number;
          hcPasses?: number;
        } | null = null

        if (statsRes.status === "fulfilled") {
          try {
            const statsJson = await statsRes.value.json()
            if (statsJson?.success && statsJson?.stats) {
              nextStats = statsJson.stats as MatricStats
            }
          } catch {}
        }

        if (passRes.status === "fulfilled") {
          try {
            const passJson = await passRes.value.json()
            if (passJson?.success && Number(passJson.year) === 2024) {
              if (nextStats) {
                nextStats = {
                  ...nextStats,
                  national: {
                    ...nextStats.national,
                    passRate: Number(passJson.nationalPassRate),
                    year: 2024,
                  },
                }
              } else {
                nextStats = {
                  national: {
                    passRate: Number(passJson.nationalPassRate),
                    totalCandidates: 0,
                    year: 2024,
                  },
                  provinces: [],
                }
              }
            }
          } catch {}
        }

        if (nscRes.status === "fulfilled") {
          try {
            const nscJson = await nscRes.value.json()
            if (nscJson?.success) {
              nsc2024 = {
                year: Number(nscJson.year),
                passRate: Number(nscJson.passRate),
                passes: Number(nscJson.passes),
                wrote: Number(nscJson.wrote),
                failed: Number(nscJson.failed),
                bachelorPercent: nscJson.bachelorPercent !== undefined ? Number(nscJson.bachelorPercent) : undefined,
                bachelorPasses: nscJson.bachelorPasses !== undefined ? Number(nscJson.bachelorPasses) : undefined,
                diplomaPercent: nscJson.diplomaPercent !== undefined ? Number(nscJson.diplomaPercent) : undefined,
                diplomaPasses: nscJson.diplomaPasses !== undefined ? Number(nscJson.diplomaPasses) : undefined,
                hcPercent: nscJson.hcPercent !== undefined ? Number(nscJson.hcPercent) : undefined,
                hcPasses: nscJson.hcPasses !== undefined ? Number(nscJson.hcPasses) : undefined,
              }
              // Prefer official 2024 figures for national section
              if (nextStats) {
                nextStats = {
                  ...nextStats,
                  national: {
                    passRate: nsc2024.passRate,
                    totalCandidates: nsc2024.wrote,
                    year: nsc2024.year,
                  },
                }
              } else {
                nextStats = {
                  national: {
                    passRate: nsc2024.passRate,
                    totalCandidates: nsc2024.wrote,
                    year: nsc2024.year,
                  },
                  provinces: [],
                }
              }
            }
          } catch {}
        }

        // Enforce 2024-only: discard any non-2024 data
        if (nextStats && nextStats.national?.year !== 2024) {
          nextStats = null
        }

        if (!nextStats) {
          setError("Unable to load matric statistics at this time.")
        }

        if (nsc2024) {
          setPassedFailed({ passed: nsc2024.passes, failed: nsc2024.failed })
          if (typeof nsc2024.bachelorPercent === "number" && typeof nsc2024.bachelorPasses === "number") {
            setBachelor({ percent: nsc2024.bachelorPercent, count: nsc2024.bachelorPasses })
          }
          if (typeof nsc2024.diplomaPercent === "number" && typeof nsc2024.diplomaPasses === "number") {
            setDiploma({ percent: nsc2024.diplomaPercent, count: nsc2024.diplomaPasses })
          }
          if (typeof nsc2024.hcPercent === "number" && typeof nsc2024.hcPasses === "number") {
            setHigherCert({ percent: nsc2024.hcPercent, count: nsc2024.hcPasses })
          }
        }

        // Build provincial pass rates using the provincial-pass-rates API
        try {
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

          const results = await Promise.allSettled(
            PROVINCES.map(async (prov) => {
              const res = await fetch(`/api/provincial-pass-rates?province=${encodeURIComponent(prov)}&years=5`, { cache: "no-store", signal })
              const json = await res.json()
              return json
            })
          )

          const provinces: ProvinceStats[] = results
            .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled" && r.value?.success)
            .map((r) => {
              const data = r.value
              const latest = Array.isArray(data?.provinceSeries)
                ? data.provinceSeries.find((sp: any) => sp.year === data.endYear) ?? data.provinceSeries[data.provinceSeries.length - 1]
                : null
              const passRate = typeof latest?.passRate === "number" ? Number(latest.passRate) : 0
              return { name: String(data.province || ""), passRate, candidates: 0 }
            })
            .sort((a, b) => b.passRate - a.passRate)

          if (nextStats) {
            nextStats = { ...nextStats, provinces }
          }
        } catch (e) {
          // Silently ignore provincial errors to avoid breaking national view
        }

        startTransition(() => {
          setStats(nextStats)
        })
      } catch (err) {
        console.error("Error fetching stats:", err)
        setError("Something went wrong while loading pass rates.")
      } finally {
        setLoading(false)
      }
  }

  useEffect(() => {
    void fetchStats()
  }, [])

  // Log time sync results at top-level to preserve hook order
  useEffect(() => {
    if (timeError) logEvent("timeSync:error", { message: timeError })
    else if (driftMs != null) logEvent("timeSync:success", { driftMs, timezone })
  }, [timeError, driftMs, timezone])

  const { refreshing, lastUpdated, start, stop } = useAutoRefresh(fetchStats, REFRESH_INTERVAL_MS, { immediate: false, onEvent: (event, detail) => logEvent(event, detail) })

  useEffect(() => {
    start()
    return () => stop()
  }, [start, stop])

  useEffect(() => {
    // Initialize or update the pie chart when data is ready
    if (!pieRef.current || !passedFailed) return

    if (!pieChartRef.current) {
      pieChartRef.current = echarts.init(pieRef.current)
    }

    const option: echarts.EChartsCoreOption = {
      tooltip: { trigger: "item" },
      legend: { show: false },
      series: [
        {
          name: "2024 Results",
          type: "pie",
          radius: ["50%", "80%"],
          avoidLabelOverlap: true,
          label: { show: true, position: "outside", formatter: "{b}: {d}%" },
          data: [
            { value: passedFailed.passed, name: "Passed" },
            { value: passedFailed.failed, name: "Failed" },
          ],
        },
      ],
    }

    pieChartRef.current.setOption(option)
    // Responsive resize
    const handle = () => pieChartRef.current?.resize()
    window.addEventListener("resize", handle)
    return () => window.removeEventListener("resize", handle)
  }, [passedFailed])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!stats) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">{error ?? "Unable to load statistics"}</p>
        </CardContent>
      </Card>
    )
  }

  const selectedStats =
    selectedProvince === "national"
      ? { name: "National", passRate: stats.national.passRate, candidates: stats.national.totalCandidates }
      : stats.provinces.find((p) => p.name === selectedProvince)


  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Badge variant="outline">Current Year: 2024</Badge>
        {refreshing && (
          <Badge variant="outline" aria-live="polite"><RefreshCw className="mr-1 h-3 w-3 animate-spin" /> Updating…</Badge>
        )}
        {lastUpdated && (
          <Badge variant="outline" title="Last data refresh time">
            Last updated: {formatInTimeZone(lastUpdated, Intl.DateTimeFormat().resolvedOptions().timeZone || "Africa/Johannesburg", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </Badge>
        )}
        {timeSyncing && (
          <Badge variant="outline" aria-live="polite"><Clock className="mr-1 h-3 w-3 animate-spin" /> Syncing time…</Badge>
        )}
        {!timeSyncing && timeError && (
          <Badge variant="outline" className="text-red-600" title={timeError}>Time sync error</Badge>
        )}
        {!timeError && networkTime && (
          <Badge variant="outline" title={`Timezone: ${timezone} • Drift: ${driftMs ?? 0}ms`}>
            Network time: {formatInTimeZone(networkTime, timezone)}
          </Badge>
        )}
      </div>
      {/* Province Selector */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <Select value={selectedProvince} onValueChange={setSelectedProvince}>
          <SelectTrigger className="w-full sm:w-[280px]">
            <SelectValue placeholder="Select province" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="national">National Overview</SelectItem>
            {stats.provinces.map((province) => (
              <SelectItem key={province.name} value={province.name}>
                {province.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {/* Pass Rate Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Pass Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{selectedStats?.passRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">{selectedStats?.name}</p>
            {selectedProvince === "national" && (
              <p className="mt-1 text-[11px] text-muted-foreground">Source: education.gov.za (2024 NSC)</p>
            )}
          </CardContent>
        </Card>

        {/* Candidates + Pie Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Candidates</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="text-xl sm:text-2xl font-bold">{selectedStats?.candidates.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Wrote exams in {stats.national.year}</p>
              </div>
              {selectedProvince === "national" && (
                <div className="w-28 h-28" ref={pieRef} />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Bachelor Passes Card (National Only) */}
        {selectedProvince === "national" && bachelor && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Bachelor Passes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{bachelor.percent.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Count: {bachelor.count.toLocaleString()}</p>
              <div className="mt-2 space-y-1">
                <p className="text-xs text-muted-foreground">Requirements:</p>
                <ul className="text-[11px] text-muted-foreground list-disc pl-4">
                  <li>Min. 50% in 4 subjects</li>
                  <li>Min. 30% in language of learning</li>
                  <li>Pass in 7 subjects</li>
                </ul>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">Source: education.gov.za; corroborated by gov.za</p>
            </CardContent>
          </Card>
        )}

        {/* Diploma Passes Card (National Only) */}
        {selectedProvince === "national" && diploma && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Diploma Passes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{diploma.percent.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Count: {diploma.count.toLocaleString()}</p>
              <div className="mt-2 space-y-1">
                <p className="text-xs text-muted-foreground">Requirements:</p>
                <ul className="text-[11px] text-muted-foreground list-disc pl-4">
                  <li>Min. 40% in 4 subjects</li>
                  <li>Min. 30% in language of learning</li>
                  <li>Pass in 6 subjects</li>
                </ul>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">Source: education.gov.za (2024 NSC)</p>
            </CardContent>
          </Card>
        )}

        {/* Higher Certificate Passes Card (National Only) */}
        {selectedProvince === "national" && higherCert && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Higher Certificate Passes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{higherCert.percent.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Count: {higherCert.count.toLocaleString()}</p>
              <div className="mt-2 space-y-1">
                <p className="text-xs text-muted-foreground">Requirements:</p>
                <ul className="text-[11px] text-muted-foreground list-disc pl-4">
                  <li>Min. 30% in language of learning</li>
                  <li>Pass in 6 subjects</li>
                </ul>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">Source: education.gov.za (2024 NSC)</p>
            </CardContent>
          </Card>
        )}

        {/* Ranking Card (only for provinces) */}
        {selectedProvince !== "national" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Provincial Ranking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                #
                {stats.provinces.sort((a, b) => b.passRate - a.passRate).findIndex((p) => p.name === selectedProvince) +
                  1}
              </div>
              <p className="text-xs text-muted-foreground">Out of 9 provinces</p>
            </CardContent>
          </Card>
        )}
      </div>



      {/* Provincial Comparison - Only show on national view */}
      {selectedProvince === "national" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Provincial Pass Rates</CardTitle>
            <CardDescription>Comparison across all provinces</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.provinces
                .sort((a, b) => b.passRate - a.passRate)
                .map((province) => (
                  <div key={province.name} className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-sm font-medium">{province.name}</span>
                      <span className="text-sm text-muted-foreground ml-2">{province.passRate.toFixed(1)}%</span>
                    </div>
                    <div className="w-full sm:w-48 bg-secondary rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full transition-all"
                        style={{ width: `${province.passRate}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
