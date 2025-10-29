"use client"

import { DashboardSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { NewsGrid } from "@/components/news-grid"
import { PassRateCharts } from "@/components/pass-rate-charts"
import { GeoProvincialPass } from "@/components/geo-provincial-pass"
import { Chatbot } from "@/components/chatbot"
import { LayoutDashboard } from "lucide-react"

export default function DashboardPage() {
  return (
    <>
      <DashboardSidebar />
      <SidebarInset>
        <div className="flex flex-col h-full">
          {/* Header */}
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
            <div className="flex items-center gap-2 text-sm">
              <LayoutDashboard className="h-4 w-4" />
              <span className="font-semibold">Dashboard</span>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="mx-auto max-w-7xl p-6 space-y-8 animate-fadeIn">
              {/* Welcome Section */}
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
                <p className="text-muted-foreground">Here's an overview of your university search dashboard</p>
              </div>

              {/* News Section - First Priority */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold">Latest Education News</h2>
                <NewsGrid />
              </section>

              <Separator />

              {/* Pass Rate Charts - Second Priority */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Matric Pass Rates</h2>
                </div>
                <PassRateCharts />
              </section>

              <Separator />

              {/* Provincial Map - Third Priority */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold">Provincial Performance</h2>
                <GeoProvincialPass />
              </section>
            </div>
          </main>
        </div>
        <Chatbot />
      </SidebarInset>
    </>
  )
}
