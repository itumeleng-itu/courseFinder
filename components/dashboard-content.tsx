"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NewsGrid } from "@/components/news-grid"
import { PassRateCharts } from "@/components/pass-rate-charts"
import { GeoProvincialPass } from "@/components/geo-provincial-pass"
import { Badge } from "@/components/ui/badge"

export function DashboardContent() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid gap-4">
        <div className="flex items-center"><Badge variant="secondary">Filtered: 2024 Only</Badge></div>
        <PassRateCharts />
        <GeoProvincialPass />
        <Card>
          <CardHeader>
            <CardTitle>Latest Education News</CardTitle>
            <CardDescription>Stay updated with the latest news and announcements</CardDescription>
          </CardHeader>
          <CardContent>
            <NewsGrid />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
