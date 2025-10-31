"use client"

import type React from "react"

import { useState } from "react"
import { DashboardSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, FileText, Lock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()

  const handleLogin = () => {
    if (password === "CourseFinder2025!Admin") {
      setIsAuthenticated(true)
      toast({
        title: "Access granted",
        description: "Welcome to the admin panel",
      })
    } else {
      toast({
        title: "Access denied",
        description: "Incorrect password",
        variant: "destructive",
      })
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "paper" | "prospectus") => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("type", type)

        const response = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) throw new Error("Upload failed")
      }

      toast({
        title: "Upload successful",
        description: `${files.length} file(s) uploaded successfully`,
      })
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload files",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <>
        <DashboardSidebar />
        <SidebarInset>
          <div className="flex items-center justify-center min-h-screen p-4 sm:p-6">
            <Card className="w-full max-w-md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  <CardTitle>Admin Access</CardTitle>
                </div>
                <CardDescription>Enter password to access admin panel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    className="w-full"
                  />
                </div>
                <Button onClick={handleLogin} className="w-full">
                  Login
                </Button>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </>
    )
  }

  return (
    <>
      <DashboardSidebar />
      <SidebarInset>
        <div className="flex flex-col h-full">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6 hidden lg:flex">
            <div className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4" />
              <span className="font-semibold">Admin Panel</span>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-4 sm:p-6">
            <div className="mx-auto max-w-4xl space-y-6 sm:space-y-8">
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Content Management</h1>
                <p className="text-sm sm:text-base text-muted-foreground">Upload question papers and prospectuses</p>
              </div>

              {/* Upload Question Papers */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Upload Question Papers</CardTitle>
                  <CardDescription className="text-sm">Upload PDF files for past exam papers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="paper-file" className="text-sm sm:text-base">
                      Select Files
                    </Label>
                    <Input
                      id="paper-file"
                      type="file"
                      accept=".pdf"
                      multiple
                      onChange={(e) => handleFileUpload(e, "paper")}
                      disabled={uploading}
                      className="w-full"
                    />
                  </div>
                  <Button disabled={uploading} className="w-full sm:w-auto">
                    <Upload className="h-4 w-4 mr-2" />
                    {uploading ? "Uploading..." : "Upload Papers"}
                  </Button>
                </CardContent>
              </Card>

              {/* Upload Prospectuses */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Upload Prospectuses</CardTitle>
                  <CardDescription className="text-sm">Upload university prospectus documents</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="prospectus-file" className="text-sm sm:text-base">
                      Select Files
                    </Label>
                    <Input
                      id="prospectus-file"
                      type="file"
                      accept=".pdf"
                      multiple
                      onChange={(e) => handleFileUpload(e, "prospectus")}
                      disabled={uploading}
                      className="w-full"
                    />
                  </div>
                  <Button disabled={uploading} className="w-full sm:w-auto">
                    <Upload className="h-4 w-4 mr-2" />
                    {uploading ? "Uploading..." : "Upload Prospectuses"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </SidebarInset>
    </>
  )
}
