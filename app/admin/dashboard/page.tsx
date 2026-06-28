"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, GraduationCap, FileText, TrendingUp, ArrowRight, Activity, Clock } from "lucide-react"

interface SystemStatus {
  universities: {
    count: number
    lastUpdate: string | null
  }
  performance: {
    schoolCount: number
    lastUpdate: string | null
    yearsAvailable: string[]
  }
}

export default function DashboardOverview() {
  const [status, setStatus] = useState<SystemStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/status")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (data) setStatus(data) })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  const formatDate = (dateString: string | null) =>
    dateString
      ? new Date(dateString).toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" })
      : "Never"

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
        <p className="text-muted-foreground mt-1 text-base">
          Manage and monitor CourseFinder's core datasets.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Universities card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">Universities & Courses</CardTitle>
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Building2 className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-16 flex items-center">
                <div className="h-8 w-20 bg-muted rounded animate-pulse" />
              </div>
            ) : (
              <div className="space-y-3 mt-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold tracking-tight">{status?.universities.count ?? 0}</span>
                  <span className="text-muted-foreground text-sm">Institutions</span>
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Last updated: {formatDate(status?.universities.lastUpdate ?? null)}
                </div>
              </div>
            )}
            <div className="mt-6 pt-4 border-t">
              <Link href="/admin/dashboard/prospectus">
                <Button className="w-full" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Upload Prospectus
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Performance card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">School Performance</CardTitle>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <GraduationCap className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-16 flex items-center">
                <div className="h-8 w-20 bg-muted rounded animate-pulse" />
              </div>
            ) : (
              <div className="space-y-3 mt-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold tracking-tight">
                    {(status?.performance.schoolCount ?? 0).toLocaleString()}
                  </span>
                  <span className="text-muted-foreground text-sm">Schools</span>
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  Years: {status?.performance.yearsAvailable.join(", ") || "None"}
                </div>
              </div>
            )}
            <div className="mt-6 pt-4 border-t">
              <Link href="/admin/dashboard/performance">
                <Button className="w-full" variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Upload Report
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
