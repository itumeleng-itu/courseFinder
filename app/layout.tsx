import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { GoogleAnalytics } from "@/components/GoogleAnalytics"
import { Suspense } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"

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
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PVJ9QBLV');
            `,
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-3C11RRX3FV"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3C11RRX3FV');

              document.addEventListener('DOMContentLoaded', function() {
                document.querySelectorAll('a').forEach(link => {
                  link.addEventListener('click', function(e) {
                    gtag('event', 'click', {
                      'event_category': 'Outbound Link',
                      'event_label': this.href,
                      'transport_type': 'beacon'
                    });
                  });
                });
              });
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PVJ9QBLV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <GoogleAnalytics />
        <SidebarProvider>
          <Suspense>{children}</Suspense>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  )
}
