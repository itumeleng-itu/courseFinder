"use client"

import { useState, useMemo } from "react"
import { Search, Download, BookOpen, FileText, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DashboardSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Chatbot } from "@/components/chatbot"
import { getDownloadUrl, type QuestionPaper } from "@/lib/appwrite"

const SUBJECTS = [
  "Mathematics",
  "Physical Sciences",
  "Life Sciences",
  "English Home Language",
  "English First Additional Language",
  "Afrikaans Home Language",
  "Afrikaans First Additional Language",
  "IsiZulu Home Language",
  "IsiZulu First Additional Language",
  "IsiXhosa Home Language",
  "IsiXhosa First Additional Language",
  "Sepedi Home Language",
  "Sepedi First Additional Language",
  "Sesotho Home Language",
  "Sesotho First Additional Language",
  "Setswana Home Language",
  "Setswana First Additional Language",
  "Tshivenda Home Language",
  "Tshivenda First Additional Language",
  "Xitsonga Home Language",
  "Xitsonga First Additional Language",
  "SiSwati Home Language",
  "SiSwati First Additional Language",
  "Accounting",
  "Agricultural Sciences",
  "Business Studies",
  "Computer Applications Technology",
  "Consumer Studies",
  "Dramatic Arts",
  "Economics",
  "Electrical Technology",
  "Engineering Graphics and Design",
  "Geography",
  "History",
  "Hospitality Studies",
  "Information Technology",
  "Life Orientation",
  "Mathematical Literacy",
  "Mechanical Technology",
  "Music",
  "Religion Studies",
  "Tourism",
  "Visual Arts",
]

const YEARS = Array.from({ length: 15 }, (_, i) => 2024 - i)

const getYearColor = (year: number): string => {
  if (year >= 2023) return "bg-blue-500/10 border-blue-500/20 hover:border-blue-500/40"
  if (year >= 2020) return "bg-green-500/10 border-green-500/20 hover:border-green-500/40"
  if (year >= 2017) return "bg-yellow-500/10 border-yellow-500/20 hover:border-yellow-500/40"
  if (year >= 2014) return "bg-orange-500/10 border-orange-500/20 hover:border-orange-500/40"
  return "bg-red-500/10 border-red-500/20 hover:border-red-500/40"
}

const getYearBadgeColor = (year: number): string => {
  if (year >= 2023) return "bg-blue-500 text-white"
  if (year >= 2020) return "bg-green-500 text-white"
  if (year >= 2017) return "bg-yellow-500 text-white"
  if (year >= 2014) return "bg-orange-500 text-white"
  return "bg-red-500 text-white"
}

export function PastPapersClient({ papers }: { papers: QuestionPaper[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState<string>("all")
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [downloadingIds, setDownloadingIds] = useState<Set<string>>(new Set())

  const handleDownload = async (paper: QuestionPaper) => {
    setDownloadingIds((prev) => new Set(prev).add(paper.id))

    try {
      const downloadUrl = getDownloadUrl(paper.file_id, paper.bucket_id)
      window.open(downloadUrl, "_blank")
    } catch (error) {
      console.error("Download error:", error)
    } finally {
      setDownloadingIds((prev) => {
        const newSet = new Set(prev)
        newSet.delete(paper.id)
        return newSet
      })
    }
  }

  const hasActiveFilters = searchTerm !== "" || selectedSubject !== "all" || selectedYear !== "all"

  const filteredPapers = useMemo(() => {
    if (!hasActiveFilters) return []

    return papers.filter((paper) => {
      const matchesSearch =
        paper.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.paper_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.year.toString().includes(searchTerm)

      const matchesSubject =
        selectedSubject === "all" || paper.subject.toLowerCase().includes(selectedSubject.toLowerCase())
      const matchesYear = selectedYear === "all" || paper.year.toString() === selectedYear

      return matchesSearch && matchesSubject && matchesYear
    })
  }, [papers, searchTerm, selectedSubject, selectedYear, hasActiveFilters])

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <div className="flex flex-col h-full">
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto px-6 py-8 space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight">Past Question Papers</h1>
                <p className="text-muted-foreground text-lg">
                  Search and download past examination papers from the Department of Basic Education
                </p>
              </div>

              {/* Search and Filter */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Search Papers
                  </CardTitle>
                  <CardDescription>Use the search and filters below to find specific papers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Search</label>
                      <Input
                        placeholder="Search by subject, year, or filename..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject</label>
                      <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                        <SelectTrigger>
                          <SelectValue placeholder="All subjects" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Subjects</SelectItem>
                          {SUBJECTS.map((subject) => (
                            <SelectItem key={subject} value={subject}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Year</label>
                      <Select value={selectedYear} onValueChange={setSelectedYear}>
                        <SelectTrigger>
                          <SelectValue placeholder="All years" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Years</SelectItem>
                          {YEARS.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results */}
              <div className="space-y-4">
                {!hasActiveFilters ? (
                  <Card className="border-dashed">
                    <CardContent className="p-12 text-center">
                      <BookOpen className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Search for Question Papers</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Use the search bar or filters above to find past examination papers. You can search by subject,
                        year, or keywords.
                      </p>
                    </CardContent>
                  </Card>
                ) : filteredPapers.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Papers Found</h3>
                      <p className="text-muted-foreground mb-4">
                        No papers match your search criteria. Try adjusting your filters or search terms.
                      </p>
                      <Button
                        onClick={() => {
                          setSearchTerm("")
                          setSelectedSubject("all")
                          setSelectedYear("all")
                        }}
                        variant="outline"
                      >
                        Clear Filters
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">
                        Found {filteredPapers.length} {filteredPapers.length === 1 ? "paper" : "papers"}
                      </h2>
                      <Button
                        onClick={() => {
                          setSearchTerm("")
                          setSelectedSubject("all")
                          setSelectedYear("all")
                        }}
                        variant="ghost"
                        size="sm"
                      >
                        Clear Filters
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {filteredPapers.map((paper) => (
                        <Card
                          key={paper.id}
                          className={`transition-all duration-200 border-2 ${getYearColor(paper.year)}`}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <Badge className={`${getYearBadgeColor(paper.year)} text-xs font-semibold`}>
                                {paper.year}
                              </Badge>
                              <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            </div>
                            <CardTitle className="text-base line-clamp-2 leading-tight">{paper.subject}</CardTitle>
                            <CardDescription className="text-xs">
                              {paper.paper_type} • {paper.session}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <Button
                              onClick={() => handleDownload(paper)}
                              disabled={downloadingIds.has(paper.id)}
                              size="sm"
                              className="w-full"
                            >
                              {downloadingIds.has(paper.id) ? (
                                <>
                                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current mr-2" />
                                  Downloading...
                                </>
                              ) : (
                                <>
                                  <Download className="h-3 w-3 mr-2" />
                                  Download
                                </>
                              )}
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </main>
        </div>
        <Chatbot />
      </SidebarInset>
    </SidebarProvider>
  )
}
