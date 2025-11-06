import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { MobileNav } from "@/components/mobile-nav"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "CourseFinder - Find Your Perfect University Course",
  description: "Calculate your APS score and discover South African university courses you qualify for",
  keywords: "APS calculator, university courses, South Africa, matric results, course finder",
  generator: "v0.app",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CourseFinder",
  },
  formatDetection: {
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="CourseFinder" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SidebarProvider>{children}</SidebarProvider>
          <MobileNav />
          <PWAInstallPrompt />
          <Toaster />
        </ThemeProvider>

        <Analytics />

        {process.env.NODE_ENV === "production" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.register('/service-worker.js').then(() => {
                    console.log('[PWA] Service Worker registered successfully')
                  }).catch((error) => {
                    console.error('[PWA] Service Worker registration failed:', error)
                  })
                }
              `,
            }}
          />
        )}

        {process.env.NODE_ENV !== "production" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Dev mode: ensure no SW remains registered to avoid chunk caching issues
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.getRegistrations().then(regs => {
                    regs.forEach(reg => reg.unregister())
                  })
                  if (window.caches) {
                    caches.keys().then(names => names.forEach(name => caches.delete(name)))
                  }
                  console.log('[PWA] Dev: unregistered Service Workers and cleared caches')
                }
              `,
            }}
          />
        )}
      </body>
    </html>
  )
}
