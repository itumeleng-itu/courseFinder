"use client"

import { DashboardSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BreadcrumbNavigation } from "@/components/breadcrumb-navigation"
import { universities } from "@/data/universities"
import { Building2, ExternalLink, School } from "lucide-react"
import { Chatbot } from "@/components/chatbot"

export default function UniversitiesPage() {
  return (
    <>
      <DashboardSidebar />
      <SidebarInset>
        <div className="container mx-auto px-4 pt-3">
          <BreadcrumbNavigation />
        </div>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <School className="h-5 w-5 text-indigo-600" />
            <h1 className="text-lg font-semibold">Universities</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {universities.map((university) => (
              <Card key={university.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                    <Building2 className="h-5 w-5" />
                    {university.shortName}
                  </CardTitle>
                  <CardDescription className="text-sm">{university.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="text-xs">{university.courses.length} Courses</Badge>
                    {university.website && (
                      <a
                        href={university.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                      >
                        Visit Website <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <Chatbot />
      </SidebarInset>
    </>
  )
}
