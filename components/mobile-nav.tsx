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

  return (
    // Visible on mobile and tablet (hide on large and above)
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background lg:hidden">
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

        {/* Study Tools dropdown replacing Universities */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[60px]",
                "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
              aria-label="Study Tools"
            >
              <BookOpen className="h-5 w-5" />
              <span className="text-[10px] font-medium">Study Tools</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="min-w-[180px]">
            <DropdownMenuItem asChild>
              <a href="/past-papers" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Past Papers
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/calendar" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Calendar
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/study-tips" className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Study Tools
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
