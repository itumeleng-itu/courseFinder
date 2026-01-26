"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PlusCircle, FileText, AlertCircle, RefreshCw } from "lucide-react"
import { calculateAPS } from "@/lib/aps-calculator"
import type { SubjectEntry } from "@/lib/types"
import { SUBJECT_CATEGORIES } from "@/data/subjects"
import SubjectList from "@/components/subject-list"
import { useCourseMatcher } from "@/hooks/use-course-matcher"
import CourseList from "@/components/course-list"

// Adapt CourseMatch to what CourseList expects if necessary
// CourseList expects: { name, university, minAps, faculty, duration, requirements }
// CourseMatch has: { course (ExtendedCourse), university (University), ... }

export default function SubjectForm() {
  const [subjects, setSubjects] = useState<SubjectEntry[]>([])
  const [currentSubject, setCurrentSubject] = useState<{ name: string; percentage: string }>({
    name: "",
    percentage: "",
  })
  const [showResults, setShowResults] = useState(false)

  // Calculate default APS (standard 1-7 scale)
  const apsResult = useMemo(() => {
    if (subjects.length === 0) return null
    return calculateAPS(subjects, "standard")
  }, [subjects])

  const apsScore = apsResult?.aps ?? 0

  // Use the course matcher hook
  const { qualifyingCourses, findCourses: findQualifyingCourses } = useCourseMatcher(
    subjects.map(s => ({ ...s, percentage: Number(s.percentage) })), 
    apsScore
  )

  const handleAddSubject = () => {
    if (!currentSubject.name || !currentSubject.percentage) {
      alert("Please select a subject and enter a percentage")
      return
    }

    const percentage = Number(currentSubject.percentage)
    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      alert("Please enter a valid percentage between 0 and 100")
      return
    }

    if (subjects.some((s) => s.name === currentSubject.name)) {
      alert("This subject has already been added")
      return
    }

    const newId = (subjects.length + 1).toString()
    setSubjects([...subjects, { id: newId, name: currentSubject.name, percentage }])
    setCurrentSubject({ name: "", percentage: "" })
  }

  const handleRemoveSubject = (id: string | number) => {
    const stringId = id.toString()
    setSubjects(subjects.filter((subject) => subject.id !== stringId))
  }

  const handleFindCourses = () => {
    if (subjects.filter(s => s.name.toLowerCase() !== "life orientation").length < 6) {
      alert("Please add at least 6 subjects excluding Life Orientation")
      return
    }
    findQualifyingCourses()
    setShowResults(true)
  }

  const resetForm = () => {
    setShowResults(false)
  }

  // Map CourseMatch to CourseList format
  const mappedCourses = useMemo(() => {
    return qualifyingCourses.map(m => ({
      name: m.course.name,
      university: m.university.name,
      minAps: m.course.apsMin ?? m.course.apsRequired ?? 0,
      faculty: m.course.faculty,
      duration: (m.course as any).duration || m.course.extendedDuration,
      requirements: m.metRequirements
    }))
  }, [qualifyingCourses])

  return (
    <div className="space-y-6">
      {!showResults ? (
        <Card className="bg-white/10 backdrop-blur-sm border-none text-white overflow-hidden">
          <CardHeader className="bg-white/5">
            <CardTitle className="text-2xl flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Enter your NSC Subject Results
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-medium text-white/70">Select Subject</label>
                  <Select
                    value={currentSubject.name}
                    onValueChange={(value) => setCurrentSubject({ ...currentSubject, name: value })}
                  >
                    <SelectTrigger className="bg-white/20 border-none text-white h-12">
                      <SelectValue placeholder="Identify Subject..." />
                    </SelectTrigger>
                    <SelectContent>
                      {SUBJECT_CATEGORIES.map((category) => (
                        <SelectGroup key={category.label}>
                          <SelectLabel className="text-primary font-bold">{category.label}</SelectLabel>
                          {category.options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full md:w-32 space-y-2">
                  <label className="text-sm font-medium text-white/70">Mark (%)</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="%"
                    value={currentSubject.percentage}
                    onChange={(e) => setCurrentSubject({ ...currentSubject, percentage: e.target.value })}
                    className="bg-white/20 border-none text-white placeholder:text-white/40 h-12 text-lg"
                  />
                </div>
                <Button 
                   onClick={handleAddSubject} 
                   className="bg-primary hover:bg-primary/90 text-white h-12 px-6"
                >
                  <PlusCircle className="mr-2 h-5 w-5" /> Add
                </Button>
              </div>

              {subjects.length > 0 && (
                <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                  <SubjectList subjects={subjects} onRemove={(id) => handleRemoveSubject(id)} />
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-4 pt-4 border-t border-white/10">
                <Button
                  onClick={handleFindCourses}
                  className="bg-white text-primary hover:bg-white/90 font-bold"
                  size="lg"
                  disabled={subjects.length < 6}
                >
                  <FileText className="mr-2 h-5 w-5" /> Find My Courses
                </Button>
                
                {apsScore > 0 && (
                  <div className="flex items-center gap-3 px-4 py-2 bg-white/10 rounded-lg">
                    <span className="text-sm text-white/60">Calculated APS:</span>
                    <span className="text-xl font-bold text-white">{apsScore}</span>
                  </div>
                )}
              </div>

              <div className="flex items-start gap-2 text-xs text-white/60 bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                <AlertCircle className="h-4 w-4 text-blue-400 mt-0.5" />
                <p>
                  Add at least 6 common subjects (excluding Life Orientation) to get an accurate APS score and see qualifying courses.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Your Results</h1>
              <p className="text-white/60">Based on an APS of <span className="text-white font-bold">{apsScore}</span></p>
            </div>
            <Button variant="outline" onClick={resetForm} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <RefreshCw className="mr-2 h-4 w-4" /> Recalculate
            </Button>
          </div>
          
          <CourseList courses={mappedCourses as any} />
        </div>
      )}
    </div>
  )
}
