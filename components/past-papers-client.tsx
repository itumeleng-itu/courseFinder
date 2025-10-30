'use client'

import { useState, useMemo } from 'react'
import { Search, Download, BookOpen, FileText, AlertCircle, CheckCircle2, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { DashboardSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Chatbot } from '@/components/chatbot'
import { getDownloadUrl, type QuestionPaper } from '@/lib/appwrite'

// Types
interface PastPaper {
  id: string
  file_id: string
  bucket_id: string
  subject: string
  year: number
  paper_type: string
  session: string
  language: string
  filename: string
  url?: string
}

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
  "Visual Arts"
]

const YEARS = Array.from({ length: 15 }, (_, i) => 2024 - i)
const LANGUAGES = ["English", "Afrikaans"]

export function PastPapersClient({ papers }: { papers: QuestionPaper[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState<string>("all")
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all")
  const [downloadingIds, setDownloadingIds] = useState<Set<string>>(new Set())

  const handleDownload = async (paper: PastPaper) => {
    setDownloadingIds(prev => new Set(prev).add(paper.id))
    
    try {
      // Get download URL from Appwrite
      const downloadUrl = getDownloadUrl(paper.url!)
      window.open(downloadUrl, '_blank')
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

  const filteredPapers = useMemo(() => {
    return papers.filter(paper => {
      const matchesSearch = paper.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           paper.paper_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           paper.year.toString().includes(searchTerm)
      
      const matchesSubject = selectedSubject === "all" || paper.subject === selectedSubject
      const matchesYear = selectedYear === "all" || paper.year.toString() === selectedYear
      const matchesLanguage = selectedLanguage === "all" || paper.language === selectedLanguage
      
        return matchesSearch && matchesSubject && matchesYear && matchesLanguage
      })
    }, [papers, searchTerm, selectedSubject, selectedYear, selectedLanguage])

  const groupedPapers = filteredPapers.reduce((acc, paper) => {
    const key = `${paper.subject}-${paper.year}-${paper.session}`
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(paper)
    return acc
  }, {} as Record<string, PastPaper[]>)

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <div className="flex flex-col h-full">

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto px-6 py-8 space-y-8">
              {/* Header Section */}
              <div className="space-y-4">
                <h1 className="text-3xl font-bold">Past Question Papers</h1>
                <p className="text-muted-foreground text-lg">
                  Download past examination papers and memorandums from the Department of Basic Education and other sources
                </p>

              </div>

              {/* Search and Filter Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Search & Filter
                  </CardTitle>
                  <CardDescription>
                    Find specific papers by searching or using the filters below
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Search</label>
                      <Input
                        placeholder="Search papers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full"
                      />
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
                </div>

                {Object.keys(groupedPapers).length === 0 ? (
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
                      const [subject, year, session] = key.split('-')
                      return (
                        <Card key={key}>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <BookOpen className="h-5 w-5" />
                              {subject} - {session} ({year})
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
                                        {paper.paper_type === 'memo' ? 'Memorandum' : `Paper ${paper.paper_type.replace('paper', '')}`} - {paper.session}
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
                        Papers are sourced from the Department of Basic Education and teachme2.com
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
    </SidebarProvider>
  )
}