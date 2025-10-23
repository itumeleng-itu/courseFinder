"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { NewsGrid } from "@/components/news-grid"
import { PassRateCharts } from "@/components/pass-rate-charts"
import { Chatbot } from "@/components/chatbot"
import { LayoutDashboard } from "lucide-react"

export default function DashboardPage() {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <LayoutDashboard className="h-5 w-5" />
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 md:p-6 space-y-6">
            {/* Welcome Section */}
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Welcome to CourseFinder</h2>
              <p className="text-muted-foreground">
                Your gateway to South African university courses and educational resources
              </p>
            </div>

            {/* Latest News Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Latest Education News</h3>
              <NewsGrid />
            </div>

            <Separator />

            {/* Matric Pass Rate Statistics */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">2023 Matric Pass Rates</h3>
              <PassRateCharts />
            </div>
          </div>
        </div>
        <Chatbot />
      </SidebarInset>
    </>
  )
}
