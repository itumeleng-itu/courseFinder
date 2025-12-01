"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Search, FileText, DollarSign, BookOpen, Calendar, Lightbulb } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
// Theme toggle removed; using system default configured in ThemeProvider

const mobileNavItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Find Course",
    icon: Search,
    href: "/find-course",
  },
  {
    title: "Results",
    icon: FileText,
    href: "/matric-results",
  },
  {
    title: "Bursaries",
    icon: DollarSign,
    href: "/bursaries",
  },
  // The last item will be replaced by a Study Tools menu
]

export function MobileNav() {
  const pathname = usePathname()
  
  // Check if current path is in study tools dropdown
  const studyToolsPaths = ["/past-papers", "/calendar", "/study-tips"]
  const isStudyToolsActive = studyToolsPaths.includes(pathname)

  return (
    <>
      {/* Bottom padding for content to prevent hiding behind bottom bar */}
      <div className="h-16 xl:hidden" />
      
      {/* Visible on mobile and tablet (hide on xl and above) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass-nav xl:hidden">
        <div className="flex items-center justify-between h-16 px-2">
          <div className="flex items-center justify-around flex-1">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 min-w-[60px]",
                isActive
                  ? "text-primary bg-white/30 dark:bg-white/20 backdrop-blur-md shadow-lg scale-105"
                  : "text-muted-foreground hover:text-foreground glass-hover",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.title}</span>
            </Link>
          )
        })}

            {/* Study Tools dropdown replacing Universities */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 min-w-[60px]",
                    isStudyToolsActive
                      ? "text-primary bg-white/30 dark:bg-white/20 backdrop-blur-md shadow-lg scale-105"
                      : "text-muted-foreground hover:text-foreground glass-hover"
                  )}
                  aria-label="Study Tools"
                >
                  <BookOpen className="h-5 w-5" />
                  <span className="text-[10px] font-medium">Study Tools</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="min-w-[180px] glass-modal">
                <DropdownMenuItem asChild>
                  <a 
                    href="/past-papers" 
                    className={cn(
                      "flex items-center gap-2 rounded-lg transition-all duration-300",
                      pathname === "/past-papers" && "bg-white/30 dark:bg-white/20 text-primary backdrop-blur-md"
                    )}
                  >
                    <FileText className="h-4 w-4" />
                    Past Papers
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a 
                    href="/calendar" 
                    className={cn(
                      "flex items-center gap-2 rounded-lg transition-all duration-300",
                      pathname === "/calendar" && "bg-white/30 dark:bg-white/20 text-primary backdrop-blur-md"
                    )}
                  >
                    <Calendar className="h-4 w-4" />
                    Calendar
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a 
                    href="/study-tips" 
                    className={cn(
                      "flex items-center gap-2 rounded-lg transition-all duration-300",
                      pathname === "/study-tips" && "bg-white/30 dark:bg-white/20 text-primary backdrop-blur-md"
                    )}
                  >
                    <Lightbulb className="h-4 w-4" />
                    Study Tips
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Theme toggle removed: using system default */}
        </div>
      </nav>
    </>
  )
}
