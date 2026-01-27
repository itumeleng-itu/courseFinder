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
    totalPassed?: number
    failed?: number
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
        const [statsRes, nscRes] = await Promise.allSettled([fetch("/api/matric-stats"), fetch("/api/nsc-2025")])

        let data: MatricStats | null = null

        if (nscRes.status === "fulfilled") {
          const nscJson = await nscRes.value.json()
          if (nscJson?.success) {
            data = {
              national: {
                passRate: Number(nscJson.passRate),
                totalCandidates: Number(nscJson.wrote),
                totalPassed: Number(nscJson.passes), // Map explicit passes
                failed: Number(nscJson.failed), // Map explicit failed
                year: Number(nscJson.year),
              },
              provinces: [],
              qualifications: {
                bachelors: nscJson.bachelorPasses || Math.round(Number(nscJson.passes) * 0.548),
                diplomas: nscJson.diplomaPasses || Math.round(Number(nscJson.passes) * 0.28),
                higherCertificate: nscJson.higherCertificatePasses || Math.round(Number(nscJson.passes) * 0.135),
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
                bachelors: statsJson.stats.national.bachelorPasses || Math.round(statsJson.stats.national.totalCandidates * 0.478),
                diplomas: statsJson.stats.national.diplomaPasses || Math.round(statsJson.stats.national.totalCandidates * 0.28),
                higherCertificate: statsJson.stats.national.higherCertificatePasses || Math.round(statsJson.stats.national.totalCandidates * 0.135),
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

  const passed = stats.national.totalPassed || Math.round((stats.national.totalCandidates * stats.national.passRate) / 100)
  const failed = stats.national.failed || (stats.national.totalCandidates - passed)

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
