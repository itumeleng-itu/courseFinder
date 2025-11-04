"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
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
import { getAllColleges, collegeToUniversityFormat } from "@/data/colleges"
import { Chatbot } from "@/components/chatbot"

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
  "English Home Language",
  "English First Additional Language",
  "Afrikaans Home Language",
  "Afrikaans First Additional Language",
  "IsiZulu Home Language",
  "IsiZulu First Additional Language",
  "IsiXhosa Home Language",
  "IsiXhosa First Additional Language",
  "Sepedi",
  "Sesotho",
  "Setswana",
  "Tshivenda",
  "Xitsonga",
  "SiSwati",
  "Accounting",
  "Business Studies",
  "Economics",
  "Geography",
  "History",
  "Life Orientation",
  "Information Technology",
  "Computer Applications Technology",
  "Agricultural Sciences",
  "Engineering Graphics and Design",
  "Visual Arts",
  "Dramatic Arts",
  "Music",
]

// Define conflicting subject groups - students can only select one from each group
const CONFLICTING_SUBJECTS = [
  ["Mathematics", "Mathematical Literacy"],
  ["English Home Language", "English First Additional Language"],
  ["Afrikaans Home Language", "Afrikaans First Additional Language"],
  ["IsiZulu Home Language", "IsiZulu First Additional Language"],
  ["IsiXhosa Home Language", "IsiXhosa First Additional Language"],
  ["Information Technology", "Computer Applications Technology"],
]

// Define home languages - only ONE can be selected at a time
const HOME_LANGUAGES = [
  "English Home Language",
  "Afrikaans Home Language", 
  "IsiZulu Home Language",
  "IsiXhosa Home Language",
  "Sepedi",
  "Sesotho", 
  "Setswana",
  "Tshivenda",
  "Xitsonga",
  "SiSwati"
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

  // Check if adding a subject would create a conflict
  const checkSubjectConflict = (newSubjectName: string, existingSubjects: Subject[]) => {
    // Check home language conflicts - only one home language allowed
    if (HOME_LANGUAGES.includes(newSubjectName)) {
      const existingHomeLanguage = existingSubjects.find(subject => 
        HOME_LANGUAGES.includes(subject.name)
      )
      if (existingHomeLanguage) {
        return existingHomeLanguage.name
      }
    }

    // Check other conflicting subject groups
    for (const conflictGroup of CONFLICTING_SUBJECTS) {
      if (conflictGroup.includes(newSubjectName)) {
        // Check if any existing subject is in the same conflict group
        const conflictingSubject = existingSubjects.find(subject => 
          conflictGroup.includes(subject.name) && subject.name !== newSubjectName
        )
        if (conflictingSubject) {
          return conflictingSubject.name
        }
      }
    }
    return null
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

    // Check for conflicting subjects
    const conflictingSubject = checkSubjectConflict(currentSubject, subjects)
    if (conflictingSubject) {
      // Check if it's a home language conflict
      if (HOME_LANGUAGES.includes(currentSubject) && HOME_LANGUAGES.includes(conflictingSubject)) {
        alert(`Cannot add ${currentSubject} because you have already selected ${conflictingSubject}. You can only choose ONE home language.`)
      } else {
        alert(`Cannot add ${currentSubject} because you have already selected ${conflictingSubject}. You can only choose one from this subject group.`)
      }
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

    // If courses are 15 or fewer, add college options
    if (matches.length <= 15) {
      const colleges = getAllColleges()
      colleges.forEach((college) => {
        const universityFormatCollege = collegeToUniversityFormat(college)
        universityFormatCollege.courses.forEach((course) => {
          if (calculatedAPS >= course.apsRequired) {
            matches.push({ course, university: universityFormatCollege })
          }
        })
      })
    }

    matches.sort((a, b) => b.course.apsRequired - a.course.apsRequired)
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
    <>
      <DashboardSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 hidden lg:flex">
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-purple-600" />
            <h1 className="text-lg font-semibold">Find a Course</h1>
          </div>
        </header>

        {/* Mobile/Desktop Layout */}
        <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] overflow-hidden">

          {/* Left Panel - Stacks on mobile, side-by-side on desktop */}
          <div className="w-full lg:w-[400px] border-b lg:border-b-0 lg:border-r bg-card flex-shrink-0">

            <ScrollArea className="h-[50vh] lg:h-full">
              <div className="p-4 space-y-4">
                <div>
                  <h2 className="text-lg md:text-xl font-bold mb-2">Calculate Your APS</h2>
                  <p className="text-sm text-muted-foreground">
                    Enter your matric subjects and marks to find qualifying courses
                  </p>
                </div>

                <Separator />

                <Card className="glass-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Add Subject</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Select value={currentSubject} onValueChange={setCurrentSubject}>
                      <SelectTrigger className="text-sm glass-input">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent className="glass-modal">
                        {SUBJECTS.filter((s) => {
                          // Don't show subjects that are already selected
                          if (subjects.some((sub) => sub.name === s)) return false
                          
                          // If a home language is already selected, don't show other home languages
                          const hasHomeLanguage = subjects.some(subject => HOME_LANGUAGES.includes(subject.name))
                          if (hasHomeLanguage && HOME_LANGUAGES.includes(s)) return false
                          
                          return true
                        }).map((subject) => (
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
                      className="text-sm glass-input"
                    />
                    <Button
                      onClick={addSubject}
                      disabled={!currentSubject || !currentPercentage}
                      className="w-full text-sm glass-button"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Subject ({subjects.length}/7)
                    </Button>
                  </CardContent>
                </Card>

                {subjects.length > 0 && (
                  <Card className="glass-card">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Your Subjects</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 max-h-[200px] overflow-y-auto">
                        {subjects.map((subject) => (
                          <div
                            key={subject.id}
                            className="flex items-center justify-between p-2 glass-button rounded-md"
                          >
                            <div className="flex-1">
                              <p className="font-medium text-sm">{subject.name}</p>
                              <p className="text-xs text-muted-foreground">{subject.percentage}%</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSubject(subject.id)}
                              className="h-8 w-8 p-0 glass-hover"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {subjects.length > 0 && (
                  <div className="space-y-2">
                    <Button onClick={findCourses} className="w-full glass-button" size="lg">
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate APS & Find Courses
                    </Button>
                    <Button onClick={reset} variant="outline" className="w-full glass-button">
                      Reset All
                    </Button>
                  </div>
                )}

                {apsScore !== null && (
                  <Card className="glass-card liquid-gradient liquid-border">
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

          {/* Right Panel - Results */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {!hasCalculated ? (
              <div className="flex-1 flex items-center justify-center p-4 md:p-8">
                <div className="text-center max-w-md">
                  <GraduationCap className="h-12 w-12 md:h-16 md:w-16 mx-auto text-muted-foreground mb-4" />
                  <h2 className="text-xl md:text-2xl font-bold mb-2">Ready to Find Your Course?</h2>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Add your matric subjects and marks on the left, then click "Calculate APS & Find Courses" to
                    discover which university programs you qualify for.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="p-4 md:p-6 border-b glass-nav">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 glass-input"
                      />
                    </div>
                    <div className="text-sm text-muted-foreground text-center sm:text-left whitespace-nowrap">
                      {filteredCourses.length} courses found
                    </div>
                  </div>
                </div>

                <ScrollArea className="flex-1">
                  <div className="p-4 md:p-6">
                    {filteredCourses.length === 0 ? (
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center py-8">
                            <p className="text-muted-foreground">
                              {searchQuery
                                ? "No courses match your search"
                                : "No courses found matching your APS score"}
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
                          <Card key={index} className="glass-card hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                            <CardHeader>
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                <div className="space-y-1 flex-1">
                                  <CardTitle className="text-base md:text-lg">{course.name}</CardTitle>
                                  <CardDescription className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
                                    <span className="font-medium">{university.shortName}</span>
                                    <span className="hidden sm:inline">•</span>
                                    <span className="block sm:inline w-full sm:w-auto">{university.location}</span>
                                  </CardDescription>
                                </div>
                                <Badge variant="secondary" className="self-start sm:ml-4 glass-button">
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
        <Chatbot />
      </SidebarInset>
    </>
  )
}
