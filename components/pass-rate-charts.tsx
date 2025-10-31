"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { TrendingUp, Users, Target, GraduationCap, Award, ScrollText } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

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
  qualifications?: {
    bachelors: number
    diplomas: number
    higherCertificate: number
  }
}

export function PassRateCharts() {
  const [stats, setStats] = useState<MatricStats | null>(null)
  const [loading, setLoading] = useState(true)
  const isMobile = useIsMobile()

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
              // Mock qualification data - in a real app, this would come from the API
              qualifications: {
                bachelors: Math.round(Number(nscJson.passes) * 0.45), // ~45% qualify for bachelors
                diplomas: Math.round(Number(nscJson.passes) * 0.35), // ~35% qualify for diplomas
                higherCertificate: Math.round(Number(nscJson.passes) * 0.20), // ~20% qualify for HC
              }
            }
          }
        }

        if (statsRes.status === "fulfilled" && !data) {
          const statsJson = await statsRes.value.json()
          if (statsJson?.success) {
            data = {
              ...statsJson.stats,
              qualifications: {
                bachelors: Math.round(statsJson.stats.national.totalCandidates * statsJson.stats.national.passRate * 0.45 / 100),
                diplomas: Math.round(statsJson.stats.national.totalCandidates * statsJson.stats.national.passRate * 0.35 / 100),
                higherCertificate: Math.round(statsJson.stats.national.totalCandidates * statsJson.stats.national.passRate * 0.20 / 100),
              }
            }
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
      <div className={isMobile ? "grid gap-4 grid-cols-2" : "grid gap-4 md:grid-cols-2 lg:grid-cols-6"}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
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
    <div className={isMobile ? "grid gap-4 grid-cols-2" : "grid gap-4 md:grid-cols-2 lg:grid-cols-6"}>
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

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Bachelors</CardTitle>
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{stats.qualifications?.bachelors?.toLocaleString() || "0"}</div>
          <p className="text-xs text-muted-foreground mt-1">Qualify for degree</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Diplomas</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{stats.qualifications?.diplomas?.toLocaleString() || "0"}</div>
          <p className="text-xs text-muted-foreground mt-1">Qualify for diploma</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Higher Certificate</CardTitle>
          <ScrollText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{stats.qualifications?.higherCertificate?.toLocaleString() || "0"}</div>
          <p className="text-xs text-muted-foreground mt-1">Qualify for HC</p>
        </CardContent>
      </Card>
    </div>
  )
}
