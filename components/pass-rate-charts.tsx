"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { MapPin, TrendingUp } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface MatricStats {
  year: number
  national: {
    passRate: number
  }
  provincial: Array<{
    province: string
    passRate: number
  }>
}

export function PassRateCharts() {
  const [stats, setStats] = useState<MatricStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [userProvince, setUserProvince] = useState<string>("Gauteng")

  useEffect(() => {
    fetchStats()
    detectUserProvince()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/matric-stats")
      const data = await response.json()

      if (data.success) {
        setStats(data.data)
      }
    } catch (error) {
      console.error("Error fetching matric statistics:", error)
    } finally {
      setLoading(false)
    }
  }

  const detectUserProvince = () => {
    // Simple province detection - could be enhanced with geolocation
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

    // Default to Gauteng or use localStorage
    const saved = localStorage.getItem("userProvince")
    if (saved && provinces.includes(saved)) {
      setUserProvince(saved)
    }
  }

  const handleProvinceChange = (province: string) => {
    setUserProvince(province)
    localStorage.setItem("userProvince", province)
  }

  if (loading || !stats) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64 mt-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64 mt-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  const provincialData = stats.provincial.sort((a, b) => b.passRate - a.passRate)

  const userProvinceData = stats.provincial.find((p) => p.province === userProvince)

  return (
    <div className="space-y-4">
      {/* National Pass Rate Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            National Pass Rate {stats.year}
          </CardTitle>
          <CardDescription>Overall South African matric performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold text-blue-600 mb-2">{stats.national.passRate.toFixed(1)}%</div>
          <p className="text-sm text-gray-600">
            {stats.national.passRate > 80
              ? "Strong national performance"
              : stats.national.passRate > 75
                ? "Good national performance"
                : "Improving national results"}
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Provincial Rankings */}
        <Card>
          <CardHeader>
            <CardTitle>Provincial Pass Rates {stats.year}</CardTitle>
            <CardDescription>All 9 provinces ranked by performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                passRate: {
                  label: "Pass Rate %",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[350px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={provincialData} layout="vertical" margin={{ left: 10, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis
                    dataKey="province"
                    type="category"
                    width={100}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => value.replace(" ", "\n")}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="passRate" fill="var(--color-passRate)" name="Pass Rate %" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* User Province Detail */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {userProvince} Performance
            </CardTitle>
            <CardDescription>Your province's detailed statistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
              <div className="text-4xl font-bold text-purple-600 mb-2">{userProvinceData?.passRate.toFixed(1)}%</div>
              <p className="text-sm text-gray-600">Pass rate for {stats.year}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">National Average</span>
                <span className="text-sm font-bold">{stats.national.passRate.toFixed(1)}%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Difference</span>
                <span
                  className={`text-sm font-bold ${
                    (userProvinceData?.passRate || 0) >= stats.national.passRate ? "text-green-600" : "text-orange-600"
                  }`}
                >
                  {((userProvinceData?.passRate || 0) - stats.national.passRate).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">National Ranking</span>
                <span className="text-sm font-bold">
                  #{provincialData.findIndex((p) => p.province === userProvince) + 1} of 9
                </span>
              </div>
            </div>

            {/* Province Selector */}
            <div className="pt-4 border-t">
              <label className="text-xs font-medium text-gray-600 mb-2 block">Change Province</label>
              <select
                value={userProvince}
                onChange={(e) => handleProvinceChange(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
              >
                {provincialData.map((province) => (
                  <option key={province.province} value={province.province}>
                    {province.province} ({province.passRate.toFixed(1)}%)
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
