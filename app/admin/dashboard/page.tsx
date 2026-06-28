"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Building2, GraduationCap, FileText, TrendingUp, ArrowRight, Activity, Clock, Layers } from "lucide-react"

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

function StatCard({
  title,
  icon: Icon,
  value,
  sub,
  accentClass,
  isLoading,
}: {
  title: string
  icon: React.ElementType
  value: string
  sub: string
  accentClass: string
  isLoading: boolean
}) {
  return (
    <div className="rounded-2xl bg-zinc-800/60 border border-zinc-700/50 p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">{title}</span>
        <div className={`p-2 rounded-xl ${accentClass}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      {isLoading ? (
        <div className="h-8 w-24 bg-zinc-700 rounded animate-pulse mb-1" />
      ) : (
        <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
      )}
      <div className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
        {isLoading ? (
          <div className="h-3 w-32 bg-zinc-700 rounded animate-pulse" />
        ) : (
          <>{sub}</>
        )}
      </div>
    </div>
  )
}

export default function DashboardOverview() {
  const [status, setStatus] = useState<SystemStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/status")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (data) setStatus(data) })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  const formatDate = (d: string | null) =>
    d ? new Date(d).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" }) : "Never"

  return (
    <div className="space-y-6 text-white">
      <div>
        <h1 className="text-xl font-bold">System Overview</h1>
        <p className="text-zinc-400 text-sm mt-0.5">CourseFinder data management.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          title="Universities"
          icon={Building2}
          value={String(status?.universities.count ?? 0)}
          sub={`Updated ${formatDate(status?.universities.lastUpdate ?? null)}`}
          accentClass="bg-blue-500/20 text-blue-400"
          isLoading={isLoading}
        />
        <StatCard
          title="Schools"
          icon={GraduationCap}
          value={(status?.performance.schoolCount ?? 0).toLocaleString()}
          sub={`Years: ${status?.performance.yearsAvailable.join(", ") || "None"}`}
          accentClass="bg-emerald-500/20 text-emerald-400"
          isLoading={isLoading}
        />
      </div>

      {/* Activity chip */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-800/40 border border-zinc-700/50 text-xs text-zinc-400">
        <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span>
          Performance report last updated:{" "}
          <span className="text-white">{formatDate(status?.performance.lastUpdate ?? null)}</span>
        </span>
      </div>

      {/* Quick actions */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Quick Actions</p>
        <div className="space-y-2">
          <Link
            href="/admin/dashboard/prospectus"
            className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-800/60 border border-zinc-700/50 hover:border-zinc-600 active:scale-[0.98] transition-all"
          >
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">Upload Prospectus</p>
              <p className="text-xs text-zinc-400 mt-0.5">Add or update university course data</p>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-500 shrink-0" />
          </Link>

          <Link
            href="/admin/dashboard/performance"
            className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-800/60 border border-zinc-700/50 hover:border-zinc-600 active:scale-[0.98] transition-all"
          >
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">Upload Performance Report</p>
              <p className="text-xs text-zinc-400 mt-0.5">Merge new NSC school performance data</p>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-500 shrink-0" />
          </Link>
        </div>
      </div>

      {/* System info strip */}
      <div className="flex items-center gap-2 text-xs text-zinc-600">
        <Layers className="w-3.5 h-3.5" />
        <span>CourseFinder SA &mdash; Admin build</span>
      </div>
    </div>
  )
}
