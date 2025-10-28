"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { TrendingUp, Users, Target } from "lucide-react"

interface MatricStats {
  national: {
    passRate: number
    totalCandidates: number
    year: number
  }
  provinces: Array<{
    name: string
    passRate: number
    candidates: number
  }>
}

export function PassRateCharts() {
  const [stats, setStats] = useState<MatricStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [statsRes, nscRes] = await Promise.allSettled([fetch("/api/matric-stats"), fetch("/api/nsc-2024")])

        let data: MatricStats | null = null

        if (nscRes.status === "fulfilled") {
          const nscJson = await nscRes.value.json()
          if (nscJson?.success) {
            data = {
              national: {
                passRate: Number(nscJson.passRate),
                totalCandidates: Number(nscJson.wrote),
                year: Number(nscJson.year),
              },
              provinces: [],
            }
          }
        }

        if (statsRes.status === "fulfilled" && !data) {
          const statsJson = await statsRes.value.json()
          if (statsJson?.success) {
            data = statsJson.stats
          }
        }

        setStats(data)
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
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!stats) {
    return null
  }

  const passed = Math.round((stats.national.totalCandidates * stats.national.passRate) / 100)
  const failed = stats.national.totalCandidates - passed

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{stats.national.passRate}%</div>
          <p className="text-xs text-muted-foreground mt-1">National Average {stats.national.year}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{stats.national.totalCandidates.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">Wrote NSC exams</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Passed</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{passed.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">{failed.toLocaleString()} failed</p>
        </CardContent>
      </Card>
    </div>
  )
}
