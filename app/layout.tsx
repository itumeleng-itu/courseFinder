import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { GoogleAnalytics } from "@/components/GoogleAnalytics"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "CourseFinder South Africa",
  description: "Find South African university courses you qualify for based on your NSC results",
  generator: "v0.dev",
  metadataBase: new URL("https://www.coursefind.co.za"),
  openGraph: {
    title: "CourseFinder South Africa",
    description: "Find South African university courses you qualify for based on your NSC results",
    url: "https://www.coursefind.co.za",
    siteName: "CourseFinder South Africa",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CourseFinder South Africa",
    description: "Find South African university courses you qualify for based on your NSC results",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Fallback Google Analytics in head */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-3C11RRX3FV"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3C11RRX3FV');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics />
        <Suspense>{children}</Suspense>
        <Toaster />
      </body>
    </html>
  )
}
