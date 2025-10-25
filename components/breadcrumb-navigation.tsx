"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// Route mapping for proper page titles and descriptions
const routeMap: Record<string, { title: string; description?: string }> = {
  "/": { title: "Dashboard", description: "Home dashboard" },
  "/find-course": { title: "Find Course", description: "Search for university courses" },
  "/matric-results": { title: "Matric Results", description: "View matric examination results" },
  "/bursaries": { title: "Bursaries", description: "Available bursary opportunities" },
  "/universities": { title: "Universities", description: "South African universities" },
  "/colleges": { title: "Colleges", description: "Technical and vocational colleges" },
}

interface BreadcrumbItem {
  title: string
  href: string
  isCurrentPage: boolean
}

export function BreadcrumbNavigation() {
  const pathname = usePathname()

  // Generate breadcrumb items from current path
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split("/").filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = []

    // Always include home/dashboard as first item (unless we're already on home)
    if (pathname !== "/") {
      breadcrumbs.push({
        title: "Dashboard",
        href: "/",
        isCurrentPage: false,
      })
    }

    // Build breadcrumbs from path segments
    let currentPath = ""
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const isLast = index === pathSegments.length - 1
      const routeInfo = routeMap[currentPath]

      if (routeInfo) {
        breadcrumbs.push({
          title: routeInfo.title,
          href: currentPath,
          isCurrentPage: isLast,
        })
      } else {
        // Fallback for unmapped routes - capitalize and format segment
        const formattedTitle = segment
          .split("-")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
        
        breadcrumbs.push({
          title: formattedTitle,
          href: currentPath,
          isCurrentPage: isLast,
        })
      }
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  // Don't show breadcrumbs on home page if there's only one item
  if (breadcrumbs.length <= 1 && pathname === "/") {
    return null
  }

  // Handle long breadcrumb chains (more than 3 items)
  const shouldCollapse = breadcrumbs.length > 3
  const displayBreadcrumbs = shouldCollapse
    ? [
        breadcrumbs[0], // First item (Dashboard)
        ...breadcrumbs.slice(-2), // Last two items
      ]
    : breadcrumbs

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        {shouldCollapse && breadcrumbs.length > 3 && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={breadcrumbs[0].href} className="flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  <span className="sr-only">{breadcrumbs[0].title}</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {breadcrumbs.slice(-2).map((item, index) => (
              <div key={item.href} className="flex items-center">
                <BreadcrumbItem>
                  {item.isCurrentPage ? (
                    <BreadcrumbPage>{item.title}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={item.href}>{item.title}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.slice(-2).length - 1 && <BreadcrumbSeparator />}
              </div>
            ))}
          </>
        )}

        {!shouldCollapse &&
          displayBreadcrumbs.map((item, index) => (
            <div key={item.href} className="flex items-center">
              <BreadcrumbItem>
                {item.isCurrentPage ? (
                  <BreadcrumbPage>{item.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href} className="flex items-center gap-1">
                      {index === 0 && pathname !== "/" && (
                        <Home className="h-4 w-4" />
                      )}
                      {item.title}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < displayBreadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </div>
          ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

// Hook to get current page info for additional context
export function useCurrentPageInfo() {
  const pathname = usePathname()
  return routeMap[pathname] || { title: "Page", description: undefined }
}