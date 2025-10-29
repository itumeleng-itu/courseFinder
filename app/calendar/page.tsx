"use client"

import { DashboardSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar as CalendarIcon } from "lucide-react"
import { Chatbot } from "@/components/chatbot"
import { CalendarWithHolidays } from "@/components/calendar-with-holidays"

export default function CalendarPage() {
  return (
    <>
      <DashboardSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-blue-600" />
            <h1 className="text-lg font-semibold">Calendar</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Academic Calendar
              </CardTitle>
              <CardDescription>
                View important dates and South African public holidays
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CalendarWithHolidays />
            </CardContent>
          </Card>
        </div>
        <Chatbot />
      </SidebarInset>
    </>
  )
}