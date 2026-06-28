"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, FileText, TrendingUp, LogOut, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

const navItems = [
  { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Prospectus Upload", href: "/admin/dashboard/prospectus", icon: FileText },
  { name: "Performance Reports", href: "/admin/dashboard/performance", icon: TrendingUp },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await fetch("/api/admin/auth", { method: "DELETE" })
      window.location.href = "/admin"
    } catch {
      setIsLoggingOut(false)
    }
  }

  return (
    <>
      <DashboardSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-3 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
          <SidebarTrigger className="-ml-1 hidden xl:flex" />
          <Separator orientation="vertical" className="mr-1 h-4 hidden xl:block" />
          <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold text-sm">Admin Portal</span>
          <div className="ml-auto">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-destructive"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              {isLoggingOut ? "Signing out…" : "Sign Out"}
            </Button>
          </div>
        </header>

        {/* Admin sub-nav */}
        <div className="flex gap-1 px-4 pt-3 pb-1 border-b overflow-x-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className="gap-2 whitespace-nowrap"
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Button>
              </Link>
            )
          })}
        </div>

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
            {children}
          </div>
        </main>
      </SidebarInset>
    </>
  )
}
