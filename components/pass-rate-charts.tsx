"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { TrendingUp, Users } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/matric-stats")
        const data = await response.json()

        if (data.success) {
          setStats(data.stats)
        }
      } catch (err) {
        console.error("Error fetching stats:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

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
          <p className="text-center text-muted-foreground">Unable to load statistics</p>
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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Pass Rate Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{selectedStats?.passRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">{selectedStats?.name}</p>
          </CardContent>
        </Card>

        {/* Candidates Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{selectedStats?.candidates.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Wrote exams in {stats.national.year}</p>
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
