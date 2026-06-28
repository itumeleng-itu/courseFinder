"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileText, TrendingUp, LogOut, ShieldCheck, Smartphone } from "lucide-react"

const navItems = [
  { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Prospectus", href: "/admin/dashboard/prospectus", icon: FileText },
  { name: "Reports", href: "/admin/dashboard/performance", icon: TrendingUp },
]

function DesktopBlocked() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-white p-8 text-center">
      <div className="p-4 bg-zinc-800 rounded-full mb-6">
        <Smartphone className="w-10 h-10 text-zinc-400" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Mobile Access Only</h1>
      <p className="text-zinc-400 text-sm max-w-xs leading-relaxed">
        The CourseFinder admin portal is only accessible on mobile devices. Open this page on your phone to continue.
      </p>
    </div>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await fetch("/api/admin/auth", { method: "DELETE" })
      window.location.href = "/admin"
    } catch {
      setIsLoggingOut(false)
    }
  }

  if (isMobile === null) return null
  if (!isMobile) return <DesktopBlocked />

  return (
    <div className="flex flex-col min-h-screen min-h-dvh bg-zinc-950 text-white">
      {/* Top header */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 h-14 bg-zinc-950 border-b border-zinc-800 shrink-0">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-sm tracking-wide">Admin Portal</span>
        </div>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-red-400 transition-colors disabled:opacity-50 py-2 px-1"
        >
          <LogOut className="w-3.5 h-3.5" />
          {isLoggingOut ? "Signing out…" : "Sign out"}
        </button>
      </header>

      {/* Scrollable content — force dark so shadcn components render in dark mode */}
      <main className="flex-1 overflow-y-auto pb-24 dark bg-zinc-950">
        <div className="max-w-2xl mx-auto px-4 pt-6 pb-4 text-white">
          {children}
        </div>
      </main>

      {/* Fixed bottom tab bar */}
      <nav className="fixed bottom-0 inset-x-0 z-20 h-16 bg-zinc-950 border-t border-zinc-800 safe-area-bottom">
        <div className="grid grid-cols-3 h-full">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors ${
                  isActive
                    ? "text-emerald-400"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-emerald-400" : ""}`} />
                {item.name}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
