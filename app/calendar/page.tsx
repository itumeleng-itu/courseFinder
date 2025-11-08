"use client"

import { DashboardSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon } from "lucide-react"
import { Chatbot } from "@/components/chatbot"
import { CalendarMobile } from "@/components/calendar-mobile"
import { CalendarDesktop } from "@/components/calendar-desktop"
import { useIsMobile } from "@/hooks/use-mobile"

export default function CalendarPage() {
  const isMobile = useIsMobile()
  return (
    <>
      <DashboardSidebar />
      <SidebarInset className="w-full">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 hidden lg:flex">
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-blue-600" />
            <h1 className="text-lg font-semibold">Academic Calendar</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-2 sm:p-4 lg:p-4">
          {/* Conditionally render only one calendar to avoid double mounting */}
          {isMobile ? (
            <Card className="glass-light dark:glass-dark">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  Academic Calendar
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-4">
                <CalendarMobile />
              </CardContent>
            </Card>
          ) : (
            <CalendarDesktop />
          )}
        </div>
        <Chatbot />
      </SidebarInset>
    </>
  )
}
