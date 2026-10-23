"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Search, FileText, Landmark } from "lucide-react"
import { cn } from "@/lib/utils"
// Theme toggle removed; using system default configured in ThemeProvider

/**
 * The fourth slot used to be a "Study Tools" dropdown over past papers,
 * the calendar and study tips. Those modules are gone, and a dropdown
 * was the wrong shape for a bottom bar anyway -- it needed two taps to
 * reach anything. Universities is a single destination, so it is a
 * plain link like the other three.
 */
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
    title: "Universities",
    icon: Landmark,
    href: "/universities",
  },
]

export function MobileNav() {
  const pathname = usePathname()

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
          </div>

          {/* Theme toggle removed: using system default */}
        </div>
      </nav>
    </>
  )
}
