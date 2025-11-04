"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { DollarSign, LayoutDashboard, Search, FileText, Building2, BookOpen, Calendar, Lightbulb } from "lucide-react"
import { Logo } from "@/components/logo"
import type { Route } from "./nav-main"
import DashboardNavigation from "@/components/nav-main"
import { NotificationsPopover } from "@/components/nav-notifications"
import { Personalise } from "@/components/personalise"
import { getCalendarNotifications } from "@/lib/calendar-events"

// No sample notifications - using only calendar events
const sampleNotifications: never[] = []

const dashboardRoutes: Route[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <LayoutDashboard className="size-4" />,
    link: "/",
  },
  {
    id: "find-course",
    title: "Find Course",
    icon: <Search className="size-4" />,
    link: "/find-course",
  },
  {
    id: "matric-results",
    title: "Matric Results",
    icon: <FileText className="size-4" />,
    link: "/matric-results",
  },
  {
    id: "study-tools",
    title: "Study Tools",
    icon: <BookOpen className="size-4" />,
    link: "/study-tools",
    subs: [
      {
        title: "Past Question Papers",
        icon: <FileText className="size-4" />,
        link: "/past-papers",
      },
      {
        title: "Calendar",
        icon: <Calendar className="size-4" />,
        link: "/calendar",
      },
      {
        title: "Study Tips",
        icon: <Lightbulb className="size-4" />,
        link: "/study-tips",
      },
    ],
  },
  {
    id: "bursaries",
    title: "Bursaries",
    icon: <DollarSign className="size-4" />,
    link: "/bursaries",
  },
  {
    id: "universities",
    title: "Universities",
    icon: <Building2 className="size-4" />,
    link: "/universities",
  },
]

export function DashboardSidebar() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  // Combine regular notifications with calendar events
  const calendarNotifications = getCalendarNotifications(1) // Get events for next 24 hours
  const allNotifications = [...sampleNotifications, ...calendarNotifications]

  return (
    <Sidebar variant="inset" collapsible="icon" className={cn("glass-sidebar hidden lg:flex")}>
      <SidebarHeader
        className={cn(
          "flex md:pt-3.5",
          isCollapsed
            ? "flex-row items-center justify-between gap-y-4 md:flex-col md:items-start md:justify-start"
            : "flex-row items-center justify-between",
        )}
      >
        <a href="#" className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          {!isCollapsed && <span className="font-semibold text-black dark:text-white">CourseFinder</span>}
        </a>

        <motion.div
          key={isCollapsed ? "header-collapsed" : "header-expanded"}
          className={cn("flex items-center gap-2", isCollapsed ? "flex-row md:flex-col-reverse" : "flex-row")}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <NotificationsPopover notifications={allNotifications} />
          <SidebarTrigger className="ml-auto" />
        </motion.div>
      </SidebarHeader>
      <SidebarContent className="gap-4 px-2 py-4">
        <DashboardNavigation routes={dashboardRoutes} />
      </SidebarContent>
      <SidebarFooter className="px-2">
        <Personalise />
      </SidebarFooter>
    </Sidebar>
  )
}
