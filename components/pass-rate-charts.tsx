"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { TrendingUp, Users, Target, GraduationCap, Award, ScrollText } from "lucide-react"

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
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 sm:grid sm:gap-4 sm:grid-cols-2 lg:grid-cols-6 sm:pb-0 sm:mx-0 sm:px-0 scrollbar-hide">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="min-w-[85vw] snap-center sm:min-w-0">
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

  const cards = [
    {
      title: "Pass Rate",
      icon: TrendingUp,
      value: `${stats.national.passRate}%`,
      subText: `National Average ${stats.national.year}`
    },
    {
      title: "Total Candidates",
      icon: Users,
      value: stats.national.totalCandidates.toLocaleString(),
      subText: "Wrote NSC exams"
    },
    {
      title: "Passed",
      icon: Target,
      value: passed.toLocaleString(),
      subText: `${failed.toLocaleString()} failed`
    },
    {
      title: "Bachelors",
      icon: GraduationCap,
      value: stats.qualifications?.bachelors?.toLocaleString() || "0",
      subText: "Qualify for degree"
    },
    {
      title: "Diplomas",
      icon: Award,
      value: stats.qualifications?.diplomas?.toLocaleString() || "0",
      subText: "Qualify for diploma"
    },
    {
      title: "Higher Certificate",
      icon: ScrollText,
      value: stats.qualifications?.higherCertificate?.toLocaleString() || "0",
      subText: "Qualify for HC"
    }
  ]

  return (
    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 sm:grid sm:gap-4 sm:grid-cols-2 lg:grid-cols-6 sm:pb-0 sm:mx-0 sm:px-0 scrollbar-hide">
      {cards.map((card, index) => (
        <Card key={index} className="min-w-[85vw] snap-center sm:min-w-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{card.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{card.subText}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
