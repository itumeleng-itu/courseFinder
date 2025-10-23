"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, RefreshCw } from "lucide-react"

interface ProvinceData {
  province: string
  passRate: number
  rank: number
}

interface StatsData {
  nationalPassRate: number
  provinces: ProvinceData[]
  year: number
}

const provinces = [
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

export function PassRateCharts() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProvince, setSelectedProvince] = useState<string>("")

  const fetchStats = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/matric-stats")
      if (!response.ok) throw new Error("Failed to fetch statistics")
      const data = await response.json()
      setStats(data)

      // Auto-detect user's province from localStorage or default to first
      const savedProvince = localStorage.getItem("userProvince")
      if (savedProvince && provinces.includes(savedProvince)) {
        setSelectedProvince(savedProvince)
      } else if (data.provinces && data.provinces.length > 0) {
        setSelectedProvince(data.provinces[0].province)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load statistics")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  useEffect(() => {
    if (selectedProvince) {
      localStorage.setItem("userProvince", selectedProvince)
    }
  }, [selectedProvince])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">{error || "No statistics available"}</p>
            <Button onClick={fetchStats} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const selectedProvinceData = stats.provinces.find((p) => p.province === selectedProvince)

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* National Pass Rate */}
      <Card>
        <CardHeader>
          <CardTitle>National Pass Rate {stats.year}</CardTitle>
          <CardDescription>Overall matric performance across South Africa</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary">{stats.nationalPassRate}%</div>
                <p className="text-sm text-muted-foreground mt-2">National Average</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
              <TrendingUp className="h-4 w-4" />
              <span>Strong performance compared to previous years</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Provincial Comparison */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Provincial Pass Rates</CardTitle>
              <CardDescription>Compare performance across provinces</CardDescription>
            </div>
            <Select value={selectedProvince} onValueChange={setSelectedProvince}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select province" />
              </SelectTrigger>
              <SelectContent>
                {provinces.map((province) => (
                  <SelectItem key={province} value={province}>
                    {province}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {selectedProvinceData && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{selectedProvinceData.province}</p>
                  <p className="text-2xl font-bold text-primary">{selectedProvinceData.passRate}%</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Rank</p>
                  <p className="text-2xl font-bold">#{selectedProvinceData.rank}</p>
                </div>
              </div>
            </div>
          )}
          <ChartContainer
            config={{
              passRate: {
                label: "Pass Rate",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[250px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.provinces}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="province" angle={-45} textAnchor="end" height={80} fontSize={11} />
                <YAxis domain={[0, 100]} fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="passRate" fill="var(--color-passRate)" radius={[4, 4, 0, 0]} name="Pass Rate (%)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
