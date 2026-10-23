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
import { DollarSign, LayoutDashboard, Search, FileText, Landmark } from "lucide-react"
import { Logo } from "@/components/logo"
import type { Route } from "./nav-main"
import DashboardNavigation from "@/components/nav-main"
import { Personalise } from "@/components/personalise"

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
    id: "universities",
    title: "Universities",
    icon: <Landmark className="size-4" />,
    link: "/universities",
  },
]

export function DashboardSidebar() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar variant="inset" collapsible="icon" className={cn("glass-sidebar hidden xl:flex")}>
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
