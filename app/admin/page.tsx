"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Loader2 } from "lucide-react"

export default function AdminLoginPage() {
  const [secret, setSecret] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = searchParams?.get("redirect") || "/admin/dashboard"

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
        // Force a hard navigation to bypass router cache for protected routes
        window.location.href = redirectPath
      } else {
        setError(data.error || "Authentication failed")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 pb-6 pt-6">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Lock className="w-7 h-7 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center tracking-tight">Admin Authentication</CardTitle>
          <CardDescription className="text-center">
            Enter the admin secret key to access the data management dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Secret key"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              required
              disabled={isLoading}
              className="w-full py-5 text-center text-lg tracking-[0.3em]"
              autoComplete="off"
            />
            {error && (
              <p className="text-sm text-destructive text-center animate-in slide-in-from-top-2">
                {error}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={isLoading || !secret}>
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
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4 pb-4">
          <p className="text-xs text-muted-foreground">
            CourseFinder SA &copy; {new Date().getFullYear()}
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
