"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink, DollarSign, Calendar, Users, Award, Search, RefreshCw } from "lucide-react"
import { Chatbot } from "@/components/chatbot"

interface Bursary {
  title: string
  provider: string
  description: string
  deadline: string
  link: string
  value?: string
}

export default function BursariesPage() {
  const [bursaries, setBursaries] = useState<Bursary[]>([])
  const [filteredBursaries, setFilteredBursaries] = useState<Bursary[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchBursaries()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = bursaries.filter(
        (b) =>
          b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredBursaries(filtered)
    } else {
      setFilteredBursaries(bursaries)
    }
  }, [searchTerm, bursaries])

  const fetchBursaries = async (search?: string) => {
    try {
      setLoading(true)
      const url = search ? `/api/bursaries?search=${encodeURIComponent(search)}` : "/api/bursaries"
      const response = await fetch(url)
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

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-lg font-semibold">Bursaries & Financial Aid</h1>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Search Bar */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search bursaries by name, provider, or field of study..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button onClick={() => fetchBursaries()} variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
              {searchTerm && (
                <p className="text-sm text-gray-600 mt-2">
                  Found {filteredBursaries.length} bursaries matching "{searchTerm}"
                </p>
              )}
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Bursaries</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{bursaries.length}</div>
                <p className="text-xs text-muted-foreground">Available opportunities</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Showing</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{filteredBursaries.length}</div>
                <p className="text-xs text-muted-foreground">After filters</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Source</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Live</div>
                <p className="text-xs text-muted-foreground">From zabursaries.co.za</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Updated</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Now</div>
                <p className="text-xs text-muted-foreground">Real-time data</p>
              </CardContent>
            </Card>
          </div>

          {/* Bursaries List */}
          <ScrollArea className="h-[calc(100vh-350px)]">
            {loading ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2 mt-2" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-20 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredBursaries.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Search className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500 mb-4">No bursaries found matching your search</p>
                  <Button onClick={() => setSearchTerm("")} variant="outline">
                    Clear Search
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredBursaries.map((bursary, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="default">{bursary.provider}</Badge>
                        {bursary.value && <Badge variant="outline">{bursary.value}</Badge>}
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{bursary.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{bursary.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span className="font-medium">Deadline:</span>
                        <span>{bursary.deadline}</span>
                      </div>

                      <Button asChild className="w-full" size="sm">
                        <a href={bursary.link} target="_blank" rel="noopener noreferrer">
                          View Details
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>

          {/* Info Card */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5" />
                About This Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-gray-700">
                Bursary information is sourced from{" "}
                <a
                  href="https://www.zabursaries.co.za/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  zabursaries.co.za
                </a>
                , updated in real-time.
              </p>
              <p className="text-sm text-gray-700">
                Always verify application deadlines and requirements directly with the bursary provider.
              </p>
            </CardContent>
          </Card>
        </div>
        <Chatbot />
      </SidebarInset>
    </>
  )
}
