"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Calculator, GraduationCap, Users, TrendingUp, AlertCircle } from "lucide-react"
import SubjectsForm from "@/components/SubjectsForm"
import QualifyingCourses from "@/components/QualifyingCourses"
import APSScoreDisplay from "@/components/APSScoreDisplay"
import type { SubjectEntry } from "@/lib/types"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { NewsGrid } from "@/components/news-grid"
import { PassRateCharts } from "@/components/pass-rate-charts"

// Simple APS calculation function
function calculateSimpleAPS(subjects: SubjectEntry[]): number {
  const validSubjects = subjects.filter(
    (s) => s.name && s.percentage !== undefined && s.percentage !== null && s.percentage > 0,
  )

  if (validSubjects.length === 0) return 0

  // Exclude Life Orientation
  const subjectsWithoutLO = validSubjects.filter((s) => s.name.toLowerCase() !== "life orientation")

  // Sort by percentage descending
  subjectsWithoutLO.sort((a, b) => Number(b.percentage) - Number(a.percentage))

  // Take top 6 subjects
  const top6 = subjectsWithoutLO.slice(0, 6)

  // Convert percentages to APS points (1-7 scale)
  const apsPoints = top6.map((subject) => {
    const percentage = Number(subject.percentage)
    if (percentage >= 80) return 7
    if (percentage >= 70) return 6
    if (percentage >= 60) return 5
    if (percentage >= 50) return 4
    if (percentage >= 40) return 3
    if (percentage >= 30) return 2
    return 1
  })

  // Sum up the points
  return apsPoints.reduce((sum, points) => sum + points, 0)
}

export default function Home() {
  const [subjects, setSubjects] = useState<SubjectEntry[]>([])
  const [apsScore, setApsScore] = useState<number>(0)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (subjects.length > 0) {
      const score = calculateSimpleAPS(subjects)
      setApsScore(score)
      setShowResults(true)
    } else {
      setShowResults(false)
      setApsScore(0)
    }
  }, [subjects])

  const handleSubjectsChange = (newSubjects: SubjectEntry[]) => {
    setSubjects(newSubjects)
  }

  const handleReset = () => {
    setSubjects([])
    setShowResults(false)
    setApsScore(0)
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Course Finder</h1>
                <p className="text-sm text-gray-600">Find your perfect university course</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="hidden sm:flex">
                <Users className="h-3 w-3 mr-1" />
                26 Universities
              </Badge>
              <Badge variant="outline" className="hidden sm:flex">
                <BookOpen className="h-3 w-3 mr-1" />
                1000+ Courses
              </Badge>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Discover Your Academic Future</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Enter your matric results to find university courses that match your APS score and subject requirements
                across South African universities.
              </p>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Input Form */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-blue-600" />
                      Enter Your Results
                    </CardTitle>
                    <CardDescription>Add your matric subject results to calculate your APS score</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SubjectsForm onSubjectsChange={handleSubjectsChange} />

                    {subjects.length > 0 && (
                      <div className="mt-6 pt-6 border-t">
                        <Button onClick={handleReset} variant="outline" className="w-full bg-transparent">
                          Reset All
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Results */}
              <div className="lg:col-span-2">
                {showResults ? (
                  <div className="space-y-6">
                    {/* APS Score Display */}
                    <APSScoreDisplay score={apsScore} subjects={subjects} />

                    <Separator />

                    {/* Qualifying Courses */}
                    <QualifyingCourses apsScore={apsScore} subjects={subjects} />
                  </div>
                ) : (
                  /* Welcome Card */
                  <Card className="h-full">
                    <CardContent className="flex flex-col items-center justify-center text-center p-12">
                      <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-full mb-6">
                        <TrendingUp className="h-12 w-12 text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-4">Ready to Find Your Course?</h3>
                      <p className="text-gray-600 mb-6 max-w-md">
                        Start by entering your matric subject results on the left. We'll calculate your APS score and
                        show you all the courses you qualify for.
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Instant APS calculation
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          Subject matching
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          Multiple universities
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          Career guidance
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-green-600" />
                    APS Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    Our calculator uses the standard South African APS system, taking your best 6 subjects (excluding
                    Life Orientation) to determine your score.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    Course Matching
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    We match your subjects and APS score against admission requirements from major South African
                    universities to find your perfect fit.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    Important Note
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    Meeting minimum requirements doesn't guarantee admission. Universities may have additional selection
                    criteria and limited spaces.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Latest News Section */}
            <section className="space-y-4 mt-12">
              <div>
                <h3 className="text-2xl font-semibold">Latest Education News</h3>
                <p className="text-sm text-gray-600">Stay updated with the latest from South African education</p>
              </div>
              <NewsGrid />
            </section>

            {/* Pass Rate Statistics Section */}
            <section className="space-y-4 mt-12">
              <div>
                <h3 className="text-2xl font-semibold">Matric Pass Rates 2023</h3>
                <p className="text-sm text-gray-600">View national and provincial statistics</p>
              </div>
              <PassRateCharts />
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200 mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-gray-600">
              <p className="text-sm">Course Finder - Helping South African students find their academic path</p>
              <p className="text-xs mt-2">Always verify admission requirements directly with universities</p>
            </div>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  )
}
