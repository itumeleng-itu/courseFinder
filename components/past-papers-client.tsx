"use client"

import { useState, useMemo } from "react"
import { BookOpen, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DashboardSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Chatbot } from "@/components/chatbot"
import { getDownloadUrl, type QuestionPaper } from "@/lib/appwrite"
import { PaperCard } from "./past-papers/paper-card"
import { SearchFilters } from "./past-papers/search-filters"

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
        <div className="flex flex-col h-full bg-background/50 backdrop-blur-3xl">
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto px-6 py-8 space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight">Past Question Papers</h1>
                <p className="text-muted-foreground text-lg">
                  Search and download past examination papers sourced from <a href="https://www.teachme2.com/matric-past-exam-papers" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">TeachMe2.com</a>.
                </p>
              </div>

              <SearchFilters 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm}
                selectedSubject={selectedSubject}
                setSelectedSubject={setSelectedSubject}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
              />

              <div className="space-y-4">
                {!hasActiveFilters ? (
                  <Card className="border-dashed bg-muted/50">
                    <CardContent className="p-12 text-center">
                      <BookOpen className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                      <h3 className="text-xl font-semibold mb-2 text-foreground">Search for Question Papers</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Use the search bar or filters above to find past examination papers. You can search by subject,
                        year, or keywords.
                      </p>
                    </CardContent>
                  </Card>
                ) : filteredPapers.length === 0 ? (
                  <Card className="bg-muted/30 border-dashed">
                    <CardContent className="p-12 text-center">
                      <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2 text-foreground">No Papers Found</h3>
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
                        <PaperCard 
                          key={paper.id} 
                          paper={paper} 
                          isDownloading={downloadingIds.has(paper.id)}
                          onDownload={handleDownload}
                        />
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
