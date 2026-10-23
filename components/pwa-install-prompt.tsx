"use client"

import { useEffect, useState } from "react"
import { X, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PWAInstallPrompt() {
  const [isVisible, setIsVisible] = useState(false)
  type BeforeInstallPromptEvent = Event & {
    prompt: () => void
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
  }
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const SHOWN_KEY = "pwa-install-prompt-shown"

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      return
    }

    const alreadyOffered = () => {
      try {
        return sessionStorage.getItem(SHOWN_KEY) === "1"
      } catch {
        return false
      }
    }

    /**
     * preventDefault() is called ONLY when we are about to show our
     * own prompt.
     *
     * It used to run first, before the once-per-session guard. So on
     * every navigation after the first, this suppressed Chrome's
     * install banner and then returned without ever calling prompt(),
     * and Chrome logged "Banner not shown:
     * beforeinstallpromptevent.preventDefault() called. The page must
     * call beforeinstallpromptevent.prompt()" — on each page, for the
     * rest of the session.
     *
     * Suppressing the banner is a promise to show our own instead. If
     * we are not going to, the honest thing is to leave the event
     * alone and let the browser offer its native banner.
     */
    const handleBeforeInstallPrompt = (event: Event) => {
      if (alreadyOffered()) return

      event.preventDefault()
      setDeferredPrompt(event as BeforeInstallPromptEvent)
      setIsVisible(true)
      try {
        sessionStorage.setItem(SHOWN_KEY, "1")
      } catch {}
    }

    const handleInstalled = () => {
      setIsVisible(false)
      setDeferredPrompt(null)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      // Was never removed, so each mount added another listener.
      window.removeEventListener("appinstalled", handleInstalled)
    }
  }, [])

  if (!isVisible || !deferredPrompt) {
    return null
  }

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice



    if (outcome === "accepted") {
      setIsVisible(false)
    }

    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setIsVisible(false)
    setDeferredPrompt(null)
    // Ensure the prompt won't reappear in this session
    try {
      sessionStorage.setItem(SHOWN_KEY, "1")
    } catch {}
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 md:bottom-4 md:left-4 md:right-auto md:max-w-sm z-40 animate-in slide-in-from-bottom">
      <div className="bg-gradient-to-br from-black to-gray-900 border border-white/20 rounded-lg p-4 shadow-2xl backdrop-blur-sm">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-white text-sm">Install CourseFinder</h3>
            <p className="text-xs text-gray-300 mt-1">Get instant access to your courses and tools offline</p>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-white transition-colors mt-1"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleInstall} className="flex-1 bg-white text-black hover:bg-gray-100 h-8 text-xs gap-2">
            <Download className="w-3 h-3" />
            Install
          </Button>
          <Button
            onClick={handleDismiss}
            variant="outline"
            className="flex-1 border-white/20 text-white hover:bg-white/10 h-8 text-xs bg-transparent"
          >
            Later
          </Button>
        </div>
      </div>
    </div>
  )
}
