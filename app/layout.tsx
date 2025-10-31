import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { MobileNav } from "@/components/mobile-nav"

export const metadata: Metadata = {
  title: "CourseFinder - Find Your Perfect University Course",
  description: "Calculate your APS score and discover South African university courses you qualify for",
  keywords: "APS calculator, university courses, South Africa, matric results, course finder",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SidebarProvider>{children}</SidebarProvider>
          <MobileNav />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
