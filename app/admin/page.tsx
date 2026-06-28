"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, Loader2, ShieldCheck, Smartphone } from "lucide-react"

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

export default function AdminLoginPage() {
  const [secret, setSecret] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = searchParams?.get("redirect") || "/admin/dashboard"

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret }),
      })
      const data = await res.json()
      if (res.ok) {
        window.location.href = redirectPath
      } else {
        setError(data.error || "Authentication failed")
      }
    } catch {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isMobile === null) return null
  if (!isMobile) return <DesktopBlocked />

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-white">
      {/* Header stripe */}
      <div className="flex items-center justify-center gap-2 py-5 border-b border-zinc-800">
        <ShieldCheck className="w-5 h-5 text-emerald-400" />
        <span className="font-semibold text-sm tracking-wide uppercase text-zinc-300">CourseFinder Admin</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-800 mb-2">
              <Lock className="w-7 h-7 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold">Sign in</h1>
            <p className="text-zinc-400 text-sm">Enter your admin secret key to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Secret key"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              required
              disabled={isLoading}
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 text-center tracking-[0.3em] h-14 text-lg focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
              autoComplete="off"
            />
            {error && (
              <p className="text-sm text-red-400 text-center animate-in slide-in-from-top-2">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full h-12 text-base bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
              disabled={isLoading || !secret}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating…
                </>
              ) : (
                "Access Dashboard"
              )}
            </Button>
          </form>
        </div>
      </div>

      <div className="py-4 text-center">
        <p className="text-xs text-zinc-600">CourseFinder SA &copy; {new Date().getFullYear()}</p>
      </div>
    </div>
  )
}
