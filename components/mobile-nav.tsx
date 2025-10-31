"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Search, FileText, DollarSign, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"

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
  {
    title: "Universities",
    icon: Building2,
    href: "/universities",
  },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[60px]",
                isActive
                  ? "text-foreground bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.title}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
