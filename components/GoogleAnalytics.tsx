"use client"

import Script from "next/script"
import { useEffect } from "react"

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

export function GoogleAnalytics() {
  useEffect(() => {
    // Ensure gtag is available
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || []
      function gtag(...args: unknown[]) {
        window.dataLayer.push(args)
      }
      gtag("js", new Date())
      gtag("config", "G-3C11RRX3FV")
    }
  }, [])

  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-3C11RRX3FV" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-3C11RRX3FV');
        `}
      </Script>
    </>
  )
}
