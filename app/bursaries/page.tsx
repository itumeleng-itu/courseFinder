"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DashboardSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { BreadcrumbNavigation } from "@/components/breadcrumb-navigation"
import { Search, ExternalLink, Calendar, DollarSign, GraduationCap, CheckCircle2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface Bursary {
  id: string
  title: string
  provider: string
  amount: string
  description: string
  eligibility: string[]
  closingDate: string
  field: string
  link: string
}

export default function BursariesPage() {
  const [bursaries, setBursaries] = useState<Bursary[]>([])
  const [filteredBursaries, setFilteredBursaries] = useState<Bursary[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBursaries() {
      try {
        const response = await fetch("/api/bursaries")
        const data = await response.json()

        if (data.success) {
          setBursaries(data.bursaries)
          setFilteredBursaries(data.bursaries)
        }
      } catch (error) {
        console.error("Error fetching bursaries:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBursaries()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredBursaries(bursaries)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = bursaries.filter(
        (bursary) =>
          bursary.title.toLowerCase().includes(query) ||
          bursary.provider.toLowerCase().includes(query) ||
          bursary.field.toLowerCase().includes(query) ||
          bursary.description.toLowerCase().includes(query),
      )
      setFilteredBursaries(filtered)
    }
  }, [searchQuery, bursaries])

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
            <GraduationCap className="h-5 w-5 text-blue-600" />
            <h1 className="text-lg font-semibold">Bursaries</h1>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 max-w-7xl">

            {/* Header Section */}
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Available Bursaries</h2>
              <p className="text-gray-600 text-sm md:text-base">Search and filter through available bursaries for South African students</p>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search by title, provider, or field of study..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="mb-6 flex gap-4 text-sm text-muted-foreground">
              <span>
                Showing {filteredBursaries.length} of {bursaries.length} bursaries
              </span>
              {searchQuery && <span className="text-blue-600">• Filtered by: "{searchQuery}"</span>}
            </div>

            {/* Bursaries Grid */}
            {loading ? (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2 mt-2" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-5/6" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredBursaries.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Search className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No bursaries found</h3>
                  <p className="text-muted-foreground text-center">
                    Try adjusting your search query or clear filters to see all bursaries
                  </p>
                  {searchQuery && (
                    <Button onClick={() => setSearchQuery("")} variant="outline" className="mt-4">
                      Clear Search
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                {filteredBursaries.map((bursary) => (
                  <Card key={bursary.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-xl">{bursary.title}</CardTitle>
                        <Badge variant="secondary">{bursary.field}</Badge>
                      </div>
                      <CardDescription className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        {bursary.provider}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="font-semibold text-green-600">{bursary.amount}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{bursary.description}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">Eligibility:</h4>
                        <ul className="space-y-1">
                          {bursary.eligibility.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                              <span className="text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Closes: {bursary.closingDate}</span>
                        </div>
                        <Button asChild size="sm">
                          <a href={bursary.link} target="_blank" rel="noopener noreferrer">
                            Apply
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </SidebarInset>
    </>
  )
}
