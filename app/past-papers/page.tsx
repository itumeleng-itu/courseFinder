"use client"

import { useState, useEffect } from "react"
import { DashboardSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Chatbot } from "@/components/chatbot"
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  Calendar,
  BookOpen,
  ExternalLink,
  AlertCircle,
  CheckCircle2
} from "lucide-react"

interface PastPaper {
  id: string
  filename: string
  url: string
  year: number
  period: string
  subject: string
  paper_type: string
  language: string
  grade: number
}

const SUBJECTS = [
  "Mathematics",
  "Mathematical Literacy", 
  "Physical Sciences",
  "Life Sciences",
  "English Home Language",
  "English First Additional Language",
  "Afrikaans Home Language",
  "Afrikaans First Additional Language",
  "Accounting",
  "Business Studies",
  "Economics",
  "Geography",
  "History",
  "Information Technology",
  "Computer Applications Technology",
  "Agricultural Sciences",
  "Tourism",
  "Consumer Studies",
  "Dramatic Arts",
  "Music",
  "Visual Arts"
]

const YEARS = Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - i)
const GRADES = [10, 11, 12]
const LANGUAGES = ["English", "Afrikaans"]

export default function PastPapersPage() {
  const [papers, setPapers] = useState<PastPaper[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState<string>("all")
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [selectedGrade, setSelectedGrade] = useState<string>("12")
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all")
  const [downloadingIds, setDownloadingIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchPapers()
  }, [selectedSubject, selectedYear, selectedGrade, selectedLanguage])

  const fetchPapers = async () => {
    setLoading(true)
    try {
      // Fetch papers from the JSON database
      const response = await fetch('/papers_database.json')
      if (response.ok) {
        const data = await response.json()
        setPapers(data || [])
      } else {
        console.error('Failed to fetch papers')
        setPapers([])
      }
    } catch (error) {
      console.error('Error fetching papers:', error)
      setPapers([])
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (paper: PastPaper) => {
    setDownloadingIds(prev => new Set(prev).add(paper.id))
    
    try {
      // Direct download from the paper's URL
      window.open(paper.url, '_blank')
    } catch (error) {
      console.error('Download error:', error)
    } finally {
      setDownloadingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(paper.id)
        return newSet
      })
    }
  }

  const filteredPapers = papers.filter(paper => {
    const matchesSearch = paper.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.paper_type.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSubject = selectedSubject === "all" || paper.subject === selectedSubject
    const matchesYear = selectedYear === "all" || paper.year.toString() === selectedYear
    const matchesGrade = selectedGrade === "all" || paper.grade.toString() === selectedGrade
    const matchesLanguage = selectedLanguage === "all" || paper.language === selectedLanguage
    
    return matchesSearch && matchesSubject && matchesYear && matchesGrade && matchesLanguage
  })

  const groupedPapers = filteredPapers.reduce((acc, paper) => {
    const key = `${paper.subject}-${paper.year}-${paper.grade}`
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(paper)
    return acc
  }, {} as Record<string, PastPaper[]>)

  return (
    <>
      <DashboardSidebar />
      <SidebarInset>
        <div className="flex flex-col h-full">
          {/* Header */}
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
            <div className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4" />
              <span className="font-semibold">Past Question Papers</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="mx-auto max-w-7xl p-6 space-y-6">
              {/* Header Section */}
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight">Past Question Papers</h1>
                <p className="text-muted-foreground">
                  Download past examination papers and memorandums from the Department of Basic Education and other sources
                </p>
              </div>

              {/* Filters Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filter Papers
                  </CardTitle>
                  <CardDescription>
                    Use the filters below to find specific papers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Search</label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search papers..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Grade</label>
                      <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Grades</SelectItem>
                          {GRADES.map(grade => (
                            <SelectItem key={grade} value={grade.toString()}>
                              Grade {grade}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject</label>
                      <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Subjects</SelectItem>
                          {SUBJECTS.map(subject => (
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
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Years</SelectItem>
                          {YEARS.map(year => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Language</label>
                      <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Languages</SelectItem>
                          {LANGUAGES.map(language => (
                            <SelectItem key={language} value={language}>
                              {language}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    Available Papers ({filteredPapers.length})
                  </h2>
                  <Button 
                    variant="outline" 
                    onClick={fetchPapers}
                    disabled={loading}
                  >
                    Refresh
                  </Button>
                </div>

                {loading ? (
                  <div className="grid gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Card key={i}>
                        <CardContent className="p-6">
                          <div className="space-y-3">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <div className="flex gap-2">
                              <Skeleton className="h-8 w-20" />
                              <Skeleton className="h-8 w-20" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : Object.keys(groupedPapers).length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Papers Found</h3>
                      <p className="text-muted-foreground mb-4">
                        No papers match your current filters. Try adjusting your search criteria.
                      </p>
                      <Button onClick={() => {
                        setSearchTerm("")
                        setSelectedSubject("all")
                        setSelectedYear("all")
                        setSelectedLanguage("all")
                      }}>
                        Clear Filters
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-6">
                    {Object.entries(groupedPapers).map(([key, paperGroup]) => {
                      const [subject, year, grade] = key.split('-')
                      return (
                        <Card key={key}>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <BookOpen className="h-5 w-5" />
                              {subject} - Grade {grade} ({year})
                            </CardTitle>
                            <CardDescription>
                              Available papers and memorandums for {subject}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid gap-3">
                              {paperGroup.map((paper) => (
                                <div
                                  key={paper.id}
                                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    <FileText className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                      <div className="font-medium">
                                        {paper.paper_type === 'memo' ? 'Memorandum' : `Paper ${paper.paper_type.replace('paper', '')}`} - {paper.period}
                                      </div>
                                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                                        <span>{paper.language}</span>
                                        <Badge variant="outline" className="ml-2">
                                          DBE
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                  <Button
                                    onClick={() => handleDownload(paper)}
                                    disabled={downloadingIds.has(paper.id)}
                                    size="sm"
                                    className="flex items-center gap-2"
                                  >
                                    {downloadingIds.has(paper.id) ? (
                                      <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                                        Downloading...
                                      </>
                                    ) : (
                                      <>
                                        <Download className="h-4 w-4" />
                                        Download
                                      </>
                                    )}
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Info Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Important Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Official Sources</p>
                      <p className="text-sm text-muted-foreground">
                        Papers are sourced from the Department of Basic Education
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Free Downloads</p>
                      <p className="text-sm text-muted-foreground">
                        All papers are available for free download for educational purposes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Regular Updates</p>
                      <p className="text-sm text-muted-foreground">
                        New papers are added as they become available from official sources
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
        <Chatbot />
      </SidebarInset>
    </>
  )
}