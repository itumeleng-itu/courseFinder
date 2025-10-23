"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Search, GraduationCap, X, Plus, Calculator } from "lucide-react"
import { getAllUniversities } from "@/data/universities"
import type { Course, University } from "@/data/universities/base-university"

type Subject = {
  id: string
  name: string
  percentage: number
}

const SUBJECTS = [
  "Mathematics",
  "Mathematical Literacy",
  "Physical Sciences",
  "Life Sciences",
  "Accounting",
  "Business Studies",
  "Economics",
  "Geography",
  "History",
  "English Home Language",
  "English First Additional Language",
  "Afrikaans Home Language",
  "Afrikaans First Additional Language",
  "Information Technology",
  "Computer Applications Technology",
  "Agricultural Sciences",
  "Engineering Graphics and Design",
  "Visual Arts",
  "Dramatic Arts",
  "Music",
]

export default function FindCoursePage() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [currentSubject, setCurrentSubject] = useState("")
  const [currentPercentage, setCurrentPercentage] = useState("")
  const [apsScore, setApsScore] = useState<number | null>(null)
  const [qualifyingCourses, setQualifyingCourses] = useState<Array<{ course: Course; university: University }>>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [hasCalculated, setHasCalculated] = useState(false)

  const calculateAPS = (subjectList: Subject[]) => {
    let total = 0
    subjectList.forEach((subject) => {
      if (subject.percentage >= 80) total += 7
      else if (subject.percentage >= 70) total += 6
      else if (subject.percentage >= 60) total += 5
      else if (subject.percentage >= 50) total += 4
      else if (subject.percentage >= 40) total += 3
      else if (subject.percentage >= 30) total += 2
      else total += 1
    })
    return total
  }

  const addSubject = () => {
    if (!currentSubject || !currentPercentage) {
      alert("Please select a subject and enter a percentage")
      return
    }

    const percentage = Number.parseFloat(currentPercentage)
    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      alert("Please enter a valid percentage (0-100)")
      return
    }

    if (subjects.some((s) => s.name === currentSubject)) {
      alert("Subject already added")
      return
    }

    if (subjects.length >= 7) {
      alert("Maximum 7 subjects allowed")
      return
    }

    const newSubjects = [
      ...subjects,
      {
        id: Date.now().toString(),
        name: currentSubject,
        percentage,
      },
    ]

    setSubjects(newSubjects)
    setCurrentSubject("")
    setCurrentPercentage("")
    setHasCalculated(false)
  }

  const removeSubject = (id: string) => {
    setSubjects(subjects.filter((s) => s.id !== id))
    setHasCalculated(false)
    setApsScore(null)
    setQualifyingCourses([])
  }

  const findCourses = () => {
    if (subjects.length === 0) {
      alert("Please add at least one subject")
      return
    }

    const calculatedAPS = calculateAPS(subjects)
    setApsScore(calculatedAPS)

    const universities = getAllUniversities()
    const matches: Array<{ course: Course; university: University }> = []

    universities.forEach((university) => {
      university.courses.forEach((course) => {
        if (calculatedAPS >= course.apsRequired) {
          matches.push({ course, university })
        }
      })
    })

    matches.sort((a, b) => a.course.apsRequired - b.course.apsRequired)
    setQualifyingCourses(matches)
    setHasCalculated(true)
  }

  const reset = () => {
    setSubjects([])
    setCurrentSubject("")
    setCurrentPercentage("")
    setApsScore(null)
    setQualifyingCourses([])
    setSearchQuery("")
    setHasCalculated(false)
  }

  const filteredCourses = qualifyingCourses.filter(
    ({ course, university }) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.faculty.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Left Panel - Fixed Width with Internal Scroll */}
      <div className="w-[400px] border-r bg-card flex-shrink-0">
        <ScrollArea className="h-full">
          <div className="p-6 space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">Find Your Course</h1>
              <p className="text-sm text-muted-foreground">
                Enter your matric subjects and marks to find qualifying university courses
              </p>
            </div>

            <Separator />

            {/* Add Subject Form */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Add Subject</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Select value={currentSubject} onValueChange={setCurrentSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUBJECTS.filter((s) => !subjects.some((sub) => sub.name === s)).map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  type="number"
                  placeholder="Percentage (0-100)"
                  value={currentPercentage}
                  onChange={(e) => setCurrentPercentage(e.target.value)}
                  min="0"
                  max="100"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      addSubject()
                    }
                  }}
                />

                <Button onClick={addSubject} className="w-full" disabled={subjects.length >= 7}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Subject ({subjects.length}/7)
                </Button>
              </CardContent>
            </Card>

            {/* Subjects List */}
            {subjects.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Your Subjects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {subjects.map((subject) => (
                      <div key={subject.id} className="flex items-center justify-between p-2 bg-secondary rounded-md">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{subject.name}</p>
                          <p className="text-xs text-muted-foreground">{subject.percentage}%</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSubject(subject.id)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            {subjects.length > 0 && (
              <div className="space-y-2">
                <Button onClick={findCourses} className="w-full" size="lg">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate APS & Find Courses
                </Button>
                <Button onClick={reset} variant="outline" className="w-full bg-transparent">
                  Reset All
                </Button>
              </div>
            )}

            {/* APS Score Display */}
            {apsScore !== null && (
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm font-medium mb-1">Your APS Score</p>
                    <p className="text-4xl font-bold">{apsScore}</p>
                    <p className="text-xs mt-1 opacity-90">Out of 42 possible points</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Right Panel - Results with Internal Scroll */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {!hasCalculated ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-md">
              <GraduationCap className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2">Ready to Find Your Course?</h2>
              <p className="text-muted-foreground">
                Add your matric subjects and marks on the left, then click "Find Courses" to discover which university
                programs you qualify for.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Search Header - Fixed */}
            <div className="p-6 border-b bg-background">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses, universities, or faculties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="text-sm text-muted-foreground whitespace-nowrap">
                  {filteredCourses.length} courses found
                </div>
              </div>
            </div>

            {/* Results List - Scrollable */}
            <ScrollArea className="flex-1">
              <div className="p-6">
                {filteredCourses.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          {searchQuery ? "No courses match your search" : "No courses found matching your APS score"}
                        </p>
                        {!searchQuery && (
                          <p className="text-sm text-muted-foreground mt-2">
                            Try adjusting your subject marks or explore alternative study options
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {filteredCourses.map(({ course, university }, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-1 flex-1">
                              <CardTitle className="text-lg">{course.name}</CardTitle>
                              <CardDescription className="flex items-center gap-2">
                                <span className="font-medium">{university.name}</span>
                                <span>•</span>
                                <span>{university.location}</span>
                              </CardDescription>
                            </div>
                            <Badge variant="secondary" className="ml-4">
                              APS: {course.apsRequired}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div>
                              <span className="text-sm font-medium">Faculty: </span>
                              <span className="text-sm text-muted-foreground">{course.faculty}</span>
                            </div>
                            {course.description && (
                              <p className="text-sm text-muted-foreground">{course.description}</p>
                            )}
                            {course.requirements && course.requirements.length > 0 && (
                              <div>
                                <span className="text-sm font-medium">Requirements:</span>
                                <ul className="text-sm text-muted-foreground mt-1 ml-4 list-disc">
                                  {course.requirements.map((req, i) => (
                                    <li key={i}>{req}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
          </>
        )}
      </div>
    </div>
  )
}
