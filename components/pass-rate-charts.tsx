"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import * as echarts from "echarts"

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
  const pieRef = useRef<HTMLDivElement | null>(null)
  const pieChartRef = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    async function fetchStats() {
      setLoading(true)
      try {
        const [statsRes, passRes, nscRes] = await Promise.allSettled([
          fetch("/api/matric-stats"),
          fetch("/api/matric-pass-rate"),
          fetch("/api/nsc-2024"),
        ])

        let nextStats: MatricStats | null = null
        let nsc2024: { year: number; passRate: number; passes: number; wrote: number; failed: number } | null = null

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
        }

        setStats(nextStats)
      } catch (err) {
        console.error("Error fetching stats:", err)
        setError("Something went wrong while loading pass rates.")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

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
      <div className="flex items-center"><Badge variant="outline">Current Year: 2024</Badge></div>
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
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
