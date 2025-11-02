"use client"

import { DashboardSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon } from "lucide-react"
import { Chatbot } from "@/components/chatbot"
import { CalendarMobile } from "@/components/calendar-mobile"
import { CalendarDesktop } from "@/components/calendar-desktop"

export default function CalendarPage() {
  return (
    <>
      <DashboardSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 hidden lg:flex">
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-blue-600" />
            <h1 className="text-lg font-semibold">Academic Calendar</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Mobile/Tablet View */}
          <div className="lg:hidden">
            <Card className="glass-light dark:glass-dark">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CalendarIcon className="h-5 w-5" />
                  Academic Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CalendarMobile />
              </CardContent>
            </Card>
          </div>

          {/* Desktop View */}
          <div className="hidden lg:block">
            <CalendarDesktop />
          </div>
        </div>
        <Chatbot />
      </SidebarInset>
    </>
  )
}
