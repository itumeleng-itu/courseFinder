"use client"

import { DashboardSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { NewsGrid } from "@/components/news-grid"
import { PassRateCharts } from "@/components/pass-rate-charts"
import { GeoProvincialPass } from "@/components/geo-provincial-pass"
import { Chatbot } from "@/components/chatbot"
import { BreadcrumbNavigation } from "@/components/breadcrumb-navigation"
import { LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  return (
    <>
      <DashboardSidebar />
      <SidebarInset className="transition-all duration-300 ease-in-out">
        <div className="container mx-auto px-4 pt-3">
          <BreadcrumbNavigation />
        </div>
        <header className={cn(
          "flex h-16 shrink-0 items-center gap-2 border-b px-4",
          "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          "border-border/40 shadow-sm"
        )}>
          <Separator orientation="vertical" className="mr-2 h-4 bg-border/60" />
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-r from-zinc-900 to-slate-700 text-white shadow-sm">
              <LayoutDashboard className="h-4 w-4" />
            </div>
            <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
          </div>
        </header>

        <div className="flex-1 overflow-auto bg-background">
          <div className="container mx-auto p-6 space-y-8 max-w-7xl main-content content-transition">

            {/* Welcome Section */}
            <div className={cn(
              "space-y-3 p-6 rounded-xl border border-border/50",
              "bg-white",
              "dark:from-blue-950/20 dark:to-indigo-950/20",
              "shadow-sm"
            )}>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-black bg-clip-text text-transparent">
                Welcome to CourseFinder
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                Your gateway to South African university courses and educational resources
              </p>
            </div>

            {/* Latest News Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-black rounded-full"></div>
                <h3 className="text-2xl font-semibold text-foreground">Latest Education News</h3>
              </div>
              <NewsGrid />
            </div>

            <Separator className="my-8 bg-border/60" />

            {/* Matric Pass Rate Statistics */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-black rounded-full"></div>
                <h3 className="text-2xl font-semibold text-foreground">Matric Pass Rates</h3>
              </div>
              <PassRateCharts />
              <GeoProvincialPass />
            </div>
          </div>
        </div>
        <Chatbot />
      </SidebarInset>
    </>
  )
}
