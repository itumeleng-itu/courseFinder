"use client"

import { useMemo, useState } from "react"
import { useNSCValidation } from "@/hooks/useNSCValidation"
import { SubjectValidator } from "@/lib/utils/subject-validator"
import { DashboardSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Search, GraduationCap, X, Plus, Calculator, CheckCircle2, AlertCircle, Edit2, Check, X as XIcon } from "lucide-react"

import { getAllUniversities } from "@/data/universities"
import type { Course, University, BaseUniversity } from "@/data/universities/base-university"
import { getAllColleges, collegeToUniversityFormat } from "@/data/colleges"
import { Chatbot } from "@/components/chatbot"
import { evaluateNSC, type NSCResult } from "@/lib/nsc"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import SecondChanceCard from "@/components/SecondChanceCard"
import { calculateAPS as calculateAPSFromLib } from "@/lib/aps-calculator"
import type { SubjectEntry } from "@/lib/types"

type Subject = {
  id: string
  name: string
  percentage: number
}

// Support both simple and complex requirement types
type RequirementAlternative = { subject: string; level: number }
type RequirementLevel = number | { alternatives: RequirementAlternative[] }

const hasAlternatives = (val: RequirementLevel): val is { alternatives: RequirementAlternative[] } => {
  return typeof val === "object" && val !== null && Array.isArray((val as { alternatives?: unknown }).alternatives)
}

// Extended Course interface supporting multiple university formats
interface ExtendedCourse extends Omit<Course, 'requirements'> {
  apsMin?: number
  apsRequired?: number
  subjectRequirements?: Record<string, RequirementLevel>
  additionalRequirements?: string
  requirements?: string
  careers?: string
  careerOpportunities?: string | string[]
}

type CourseMatch = {
  course: ExtendedCourse
  university: University
  meetsRequirements: boolean
  missingRequirements: string[]
  metRequirements: string[]
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
  "Tourism",
  "Consumer Studies",
]

function percentageToNSCLevel(percentage: number): number {
  if (percentage >= 80) return 7
  if (percentage >= 70) return 6
  if (percentage >= 60) return 5
  if (percentage >= 50) return 4
  if (percentage >= 40) return 3
  if (percentage >= 30) return 2
  return 1
}

function nscLevelToPercentage(level: number): string {
  const ranges: Record<number, string> = {
    7: "80-100%",
    6: "70-79%",
    5: "60-69%",
    4: "50-59%",
    3: "40-49%",
    2: "30-39%",
    1: "0-29%",
  }
  return ranges[level] || "Unknown"
}

function checkSubjectRequirements(
  studentSubjects: Subject[],
  courseRequirements: Record<string, RequirementLevel> | undefined,
): { meets: boolean; missing: string[]; met: string[] } {
  if (!courseRequirements || Object.keys(courseRequirements).length === 0) {
    return { meets: true, missing: [], met: [] }
  }

  const missing: string[] = []
  const met: string[] = []

  const normalize = (s: string) =>
    s
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/language/g, "")
      .replace(/first additional/g, "fal")
      .replace(/\s+/g, " ")
      .trim()

  const matchesName = (studentName: string, reqName: string) => {
    const sn = normalize(studentName)
    const rn = normalize(reqName)
    if (rn === "english") return sn.includes("english")
    if (rn.includes("english home")) return sn.includes("english home")
    if (rn.includes("english fal")) return sn.includes("english fal")
    if (rn.includes("engineering graphics and design")) return sn.includes("engineering graphics and design")
    if (rn.includes("agricultural science")) return sn.includes("agricultural science")
    return sn.includes(rn) || rn.includes(sn)
  }

  const evaluateNumberRequirement = (requiredSubject: string, requiredLevelNumber: number) => {
    const studentSubject = studentSubjects.find((s) => matchesName(s.name, requiredSubject))
    if (!studentSubject) {
      missing.push(`${requiredSubject} (Level ${requiredLevelNumber}: ${nscLevelToPercentage(requiredLevelNumber)})`)
      return
    }
    const studentLevel = percentageToNSCLevel(studentSubject.percentage)
    if (studentLevel < requiredLevelNumber) {
      missing.push(
        `${requiredSubject} Level ${requiredLevelNumber} (${nscLevelToPercentage(requiredLevelNumber)}) - you have Level ${studentLevel} (${studentSubject.percentage}%)`,
      )
    } else {
      met.push(`${requiredSubject} Level ${requiredLevelNumber}+ ✓ (you have ${studentSubject.percentage}%)`)
    }
  }

  const evaluateAlternatives = (requiredSubject: string, alts: RequirementAlternative[]) => {
    let satisfied = false
    for (const alt of alts) {
      const studentSubject = studentSubjects.find((s) => matchesName(s.name, alt.subject))
      if (!studentSubject) continue
      const studentLevel = percentageToNSCLevel(studentSubject.percentage)
      if (studentLevel >= alt.level) {
        satisfied = true
        met.push(`${alt.subject} Level ${alt.level}+ ✓ (you have ${studentSubject.percentage}%)`)
        break
      }
    }
    if (!satisfied) {
      const list = alts.map((a) => `${a.subject} (Level ${a.level})`).join(" OR ")
      missing.push(`${requiredSubject}: need one of ${list}`)
    }
  }

  for (const [requiredSubject, requiredValue] of Object.entries(courseRequirements)) {
    if (typeof requiredValue === "number") {
      evaluateNumberRequirement(requiredSubject, requiredValue)
    } else if (hasAlternatives(requiredValue)) {
      evaluateAlternatives(requiredSubject, requiredValue.alternatives)
    } else {
      missing.push(`${requiredSubject}: invalid requirement definition`)
    }
  }

  return {
    meets: missing.length === 0,
    missing,
    met,
  }
}

export default function FindCoursePage() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [currentSubject, setCurrentSubject] = useState("")
  const [currentPercentage, setCurrentPercentage] = useState("")
  const [apsScore, setApsScore] = useState<number | null>(null)
  const [qualifyingCourses, setQualifyingCourses] = useState<CourseMatch[]>([])
  const [recommendedColleges, setRecommendedColleges] = useState<CourseMatch[]>([])
  const [compareKeys] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [hasCalculated, setHasCalculated] = useState(false)
  const [nscResult, setNscResult] = useState<NSCResult | null>(null)
  const [showOnlyQualified, setShowOnlyQualified] = useState(false)
  const [showSecondChanceInfo, setShowSecondChanceInfo] = useState(true)
  const { toast } = useToast()

  const validator = useMemo(() => new SubjectValidator(subjects), [subjects])
  const nsc = useNSCValidation(subjects)

  const calculateDefaultAPSForDisplay = (subjectList: Subject[]) => {
    const libSubjects: SubjectEntry[] = subjectList.map((s) => ({ id: s.id, name: s.name, percentage: s.percentage }))
    const result = calculateAPSFromLib(libSubjects, "default")
    return Number(result.aps || 0)
  }

  const isSubjectDisabled = (subjectName: string) => validator.isSubjectDisabled(subjectName)
  const getDisabledReason = (subjectName: string) => validator.getDisabledReason(subjectName)
  const { canCalculate } = nsc

  const addSubject = () => {
    if (!currentSubject || !currentPercentage) {
      toast({
        title: "Subject and percentage required",
        description: "Please select a subject and enter a valid percentage (0-100).",
        variant: "destructive",
      })
      return
    }

    const percentage = Number.parseFloat(currentPercentage)
    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      toast({
        title: "Invalid percentage",
        description: "Enter a number between 0 and 100.",
        variant: "destructive",
      })
      return
    }

    const disabledReason = getDisabledReason(currentSubject)
    if (disabledReason) {
      toast({
        title: "Subject conflict",
        description: disabledReason,
        variant: "destructive",
      })
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

  const [editingSubjectId, setEditingSubjectId] = useState<string | null>(null)
  const [editingPercentage, setEditingPercentage] = useState<string>("")

  const startEditing = (subject: Subject) => {
    setEditingSubjectId(subject.id)
    setEditingPercentage(subject.percentage.toString())
  }

  const saveEdit = (id: string) => {
    const percentage = Number.parseFloat(editingPercentage)
    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      toast({
        title: "Invalid percentage",
        description: "Enter a number between 0 and 100.",
        variant: "destructive",
      })
      return
    }

    setSubjects(
      subjects.map((s) => (s.id === id ? { ...s, percentage } : s))
    )
    setEditingSubjectId(null)
    setEditingPercentage("")
    setHasCalculated(false)
    toast({
      title: "Subject updated",
      description: "Mark has been updated.",
    })
  }

  const cancelEdit = () => {
    setEditingSubjectId(null)
    setEditingPercentage("")
  }

  const findCourses = () => {
    if (subjects.length < 7) {
      toast({
        title: "Add more subjects",
        description: "Please add at least 7 subjects before calculating.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      })
      return
    }

    const calculatedDefaultAPS = calculateDefaultAPSForDisplay(subjects)
    setApsScore(calculatedDefaultAPS)
    setNscResult(evaluateNSC(subjects))

    // Guard: avoid generating matches when APS is zero or invalid
    if (!calculatedDefaultAPS || calculatedDefaultAPS <= 0) {
      toast({
        title: "APS is 0",
        description: "Please review your subject marks and ensure valid percentages.",
        variant: "destructive",
      })
      setQualifyingCourses([])
      setRecommendedColleges([])
      setHasCalculated(true)
      return
    }

    const studentLevels: Record<string, number> = Object.fromEntries(
      subjects.map((s) => [s.name, percentageToNSCLevel(s.percentage)]),
    )

    const universities = getAllUniversities()
    const uniMatches: CourseMatch[] = []

    const isUndergraduateCourse = (name: string) => {
      const n = name.toLowerCase()
      const exclude = [
        "honours",
        "postgraduate",
        "pgdip",
        "pgcert",
        "master",
        "masters",
        "msc",
        "ma ",
        "llm",
        "phd",
        "doctor",
        "doctorate",
        "mba",
      ]
      if (exclude.some((t) => n.includes(t))) return false
      const include = [
        "bachelor",
        "bsc",
        "ba ",
        "beng",
        "bcom",
        "diploma",
        "higher certificate",
        "national diploma",
        "advanced diploma",
        "undergraduate",
      ]
      return include.some((t) => n.includes(t)) || !exclude.some((t) => n.includes(t))
    }

    const meetsAdditionalAcademicRequirements = (
      reqs: string[] | string | undefined,
      studentSubjects: Subject[],
    ): boolean => {
      if (!reqs) return true
      const reqList = Array.isArray(reqs) ? reqs : [reqs]
      const findSubject = (needle: string) =>
        studentSubjects.find((s) => s.name.toLowerCase().includes(needle.toLowerCase()))

      for (const r of reqList) {
        const text = r.toLowerCase()
        if (/(portfolio|interview|assessment|admission test|entrance test)/.test(text)) continue

        const percMatch = text.match(/(mathematics|mathematical literacy|english|afrikaans|physical sciences|life sciences)[^\d]*(\d{2})%/)
        if (percMatch) {
          const subj = percMatch[1]
          const minPerc = Number(percMatch[2])
          const student = findSubject(subj)
          if (!student || student.percentage < minPerc) return false
          continue
        }

        const levelMatch = text.match(/(mathematics|mathematical literacy|english|afrikaans|physical sciences|life sciences)[^\d]*level\s*(\d+)/)
        if (levelMatch) {
          const subj = levelMatch[1]
          const minLevel = Number(levelMatch[2])
          const student = findSubject(subj)
          const studentLevel = student ? percentageToNSCLevel(student.percentage) : 0
          if (studentLevel < minLevel) return false
          continue
        }
      }
      return true
    }

    universities.forEach((university) => {
      university.courses.forEach((course) => {
        const extendedCourse = course as ExtendedCourse
      
        // Use university-specific APS calculation if available
        const calculatedAPS = (university as unknown as BaseUniversity).calculateApsScore
          ? (university as unknown as BaseUniversity).calculateApsScore(studentLevels, extendedCourse as Course)
          : calculatedDefaultAPS

        const apsRequired = extendedCourse.apsMin ?? extendedCourse.apsRequired ?? 0
        const requirementCheck = checkSubjectRequirements(subjects, extendedCourse.subjectRequirements)
        const additionalReqs = extendedCourse.requirements ?? extendedCourse.additionalRequirements

        // Skip courses with missing/invalid APS requirements and invalid calculated APS
        if (apsRequired <= 0 || calculatedAPS <= 0) {
          return
        }
        const apsMet = calculatedAPS >= apsRequired
        const meetsAll = apsMet && requirementCheck.meets && meetsAdditionalAcademicRequirements(additionalReqs, subjects)

        if (isUndergraduateCourse(extendedCourse.name)) {
          uniMatches.push({
            course: extendedCourse,
            university,
            meetsRequirements: meetsAll,
            missingRequirements: requirementCheck.missing,
            metRequirements: requirementCheck.met,
          })
        }
      })
    })

    const collegeMatches: CourseMatch[] = []
    const fullyQualifiedUniCount = uniMatches.filter((m) => m.meetsRequirements).length
    if (fullyQualifiedUniCount < 30) {
      const colleges = getAllColleges()
      colleges.forEach((college) => {
        const universityFormatCollege = collegeToUniversityFormat(college)
  
        universityFormatCollege.courses.forEach((course) => {
          const extendedCourse = course as ExtendedCourse
        
          const calculatedAPS = (universityFormatCollege as unknown as BaseUniversity).calculateApsScore
            ? (universityFormatCollege as unknown as BaseUniversity).calculateApsScore(studentLevels, extendedCourse as Course)
            : calculatedDefaultAPS
        
          const apsRequired = extendedCourse.apsMin ?? extendedCourse.apsRequired ?? 0
          const requirementCheck = checkSubjectRequirements(subjects, extendedCourse.subjectRequirements)
          const additionalReqs = extendedCourse.requirements ?? extendedCourse.additionalRequirements

          if (
            isUndergraduateCourse(extendedCourse.name) &&
            apsRequired > 0 &&
            calculatedAPS > 0 &&
            calculatedAPS >= apsRequired &&
            requirementCheck.meets &&
            meetsAdditionalAcademicRequirements(additionalReqs, subjects)
          ) {
            collegeMatches.push({
              course: extendedCourse,
              university: universityFormatCollege,
              meetsRequirements: true,
              missingRequirements: [],
              metRequirements: requirementCheck.met,
            })
          }
        })
      })
    }

    uniMatches.sort((a, b) => {
      if (a.meetsRequirements && !b.meetsRequirements) return -1
      if (!a.meetsRequirements && b.meetsRequirements) return 1
      const apsA = a.course.apsMin ?? a.course.apsRequired ?? 0
      const apsB = b.course.apsMin ?? b.course.apsRequired ?? 0
      return apsB - apsA
    })
    collegeMatches.sort((a, b) => {
      const apsA = a.course.apsMin ?? a.course.apsRequired ?? 0
      const apsB = b.course.apsMin ?? b.course.apsRequired ?? 0
      return apsB - apsA
    })

    setQualifyingCourses(
      uniMatches.filter(
        ({ course }) =>
          !!course.name &&
          course.name.trim().length > 0 &&
          (course.apsMin ?? course.apsRequired ?? 0) > 0,
      ),
    )
    setRecommendedColleges(
      collegeMatches.filter(
        ({ course }) => (course.apsMin ?? course.apsRequired ?? 0) > 0 && !!course.name && course.name.trim().length > 0,
      ),
    )
    setHasCalculated(true)
  }

  const reset = () => {
    setSubjects([])
    setCurrentSubject("")
    setCurrentPercentage("")
    setApsScore(null)
    setQualifyingCourses([])
    setRecommendedColleges([])
    setSearchQuery("")
    setHasCalculated(false)
    setShowOnlyQualified(false)
    setShowSecondChanceInfo(true)
  }

  const filteredUniversities = useMemo(() => {
    const normalizeText = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    const stripVowels = (s: string) => s.replace(/[aeiou]/g, "")

    const qNorm = normalizeText(searchQuery)
    const qNoVowels = stripVowels(qNorm)

    return qualifyingCourses.filter(({ course, university, meetsRequirements }) => {
      // Empty query should match everything
      if (!qNorm) {
        return showOnlyQualified ? meetsRequirements : true
      }

      const fields = [course.name, university.name, course.faculty ?? ""]
      const fieldsNorm = fields.map((f) => normalizeText(f))
      const fieldsNoVowels = fieldsNorm.map((f) => stripVowels(f))

      const matchesSearch =
        fieldsNorm.some((f) => f.includes(qNorm)) ||
        fieldsNoVowels.some((f) => f.includes(qNoVowels))

      if (!matchesSearch) return false
      if (showOnlyQualified) return meetsRequirements
      return true
    })
  }, [qualifyingCourses, searchQuery, showOnlyQualified])

  const filteredCollegeCourses = useMemo(() => {
    const normalizeText = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    const stripVowels = (s: string) => s.replace(/[aeiou]/g, "")

    const qNorm = normalizeText(searchQuery)
    const qNoVowels = stripVowels(qNorm)

    return recommendedColleges.filter(({ course, university }) => {
      if (!qNorm) return true

      const fields = [course.name, university.name, course.faculty ?? ""]
      const fieldsNorm = fields.map((f) => normalizeText(f))
      const fieldsNoVowels = fieldsNorm.map((f) => stripVowels(f))

      return (
        fieldsNorm.some((f) => f.includes(qNorm)) ||
        fieldsNoVowels.some((f) => f.includes(qNoVowels))
      )
    })
  }, [recommendedColleges, searchQuery])

  const filteredColleges = useMemo(() => {
    const byId = new Map<string, University>()
    for (const { university } of filteredCollegeCourses) {
      if (university?.id && !byId.has(university.id)) {
        byId.set(university.id, university)
      }
    }
    return Array.from(byId.values())
  }, [filteredCollegeCourses])

  const courseKey = (course: ExtendedCourse, university: University) => `${university.id}::${course.name}`
  const isCompared = (course: ExtendedCourse, university: University) => compareKeys.includes(courseKey(course, university))

  const qualifiedCount = qualifyingCourses.filter((c) => c.meetsRequirements).length
  const partialCount = qualifyingCourses.length - qualifiedCount

  const formatCareers = (careers: string | string[] | undefined): string => {
    if (!careers) return ""
    if (Array.isArray(careers)) {
      return careers.join(", ")
    }
    return careers
  }

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

        <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] overflow-hidden">
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

                <div className="space-y-3">
                  {/* <div>
                    <h3 className="text-sm font-medium mb-2">Upload Matric Results</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      Upload an image of your matric results to automatically extract subjects and marks
                    </p>
                    <Alert className="mb-3" aria-live="polite">
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                      <AlertTitle>⚠️ OCR Disclaimer</AlertTitle>
                      <AlertDescription>
                        Please verify scanned results as OCR (Optical Character Recognition) accuracy may vary depending on
                        document quality and formatting.
                      </AlertDescription>
                    </Alert>
                    <SubjectDropzone onSubjectsExtracted={handleSubjectsExtracted} />
                  </div> */}

                  <Separator />

                  <Card className="glass-card">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Add Subject Manually</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Select value={currentSubject} onValueChange={setCurrentSubject}>
                        <SelectTrigger className="text-sm glass-input">
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent className="glass-modal">
                          {SUBJECTS.map((subject) => {
                            const disabled = isSubjectDisabled(subject)
                            return (
                              <SelectItem
                                key={subject}
                                value={subject}
                                disabled={disabled}
                                className={disabled ? "opacity-50 cursor-not-allowed" : ""}
                              >
                                {subject}
                              </SelectItem>
                            )
                          })}
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
                        Add Subject ({subjects.length})
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {subjects.length > 0 && (
                  <Card className="glass-card">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Your Subjects</CardTitle>

                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 max-h-[300px] overflow-y-auto">
                        {subjects.map((subject) => (
                          <div
                            key={subject.id}
                            className="flex items-center justify-between p-2 glass-button rounded-md gap-2"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{subject.name}</p>
                              {editingSubjectId === subject.id ? (
                                <div className="flex items-center gap-2 mt-1">
                                  <Input
                                    type="number"
                                    value={editingPercentage}
                                    onChange={(e) => setEditingPercentage(e.target.value)}
                                    min="0"
                                    max="100"
                                    className="h-7 text-xs w-20"
                                    autoFocus
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        saveEdit(subject.id)
                                      } else if (e.key === "Escape") {
                                        cancelEdit()
                                      }
                                    }}
                                  />
                                  <span className="text-xs text-muted-foreground">%</span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => saveEdit(subject.id)}
                                    className="h-6 w-6 p-0"
                                  >
                                    <Check className="h-3 w-3 text-green-600" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={cancelEdit}
                                    className="h-6 w-6 p-0"
                                  >
                                    <XIcon className="h-3 w-3 text-red-600" />
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 mt-1">
                                  <p className="text-xs text-muted-foreground">
                                    {subject.percentage}% (Level {percentageToNSCLevel(subject.percentage)})
                                  </p>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => startEditing(subject)}
                                    className="h-6 w-6 p-0"
                                    title="Edit mark"
                                  >
                                    <Edit2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              )}
                            </div>
                            {editingSubjectId !== subject.id && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeSubject(subject.id)}
                                className="h-8 w-8 p-0 glass-hover flex-shrink-0"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {subjects.length > 0 && (
                  <div className="space-y-2">
                    <Button onClick={findCourses} className="w-full glass-button" size="lg" disabled={!canCalculate}>
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
                        <p className="text-xs mt-1 opacity-90">
                          Universities may calculate APS differently
                        </p>
                        {nscResult && nscResult.passLevel !== "none" && (
                          <div className="mt-3 flex justify-center">
                            <Badge variant="secondary">
                              {nscResult.passLevel === "bachelor"
                                ? "Bachelor's Pass"
                                : nscResult.passLevel === "diploma"
                                  ? "Diploma Pass"
                                  : "Higher Certificate Pass"}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </ScrollArea>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            {!hasCalculated ? (
              <div className="hidden md:flex flex-1 items-center justify-center p-4 md:p-8">
                <div className="text-center max-w-md">
                  <GraduationCap className="h-12 w-12 md:h-16 md:w-16 mx-auto text-muted-foreground mb-4" />
                  <h2 className="text-xl md:text-2xl font-bold mb-2">Ready to Find Your Course?</h2>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Add your matric subjects and marks on the left, then click &quot;Calculate APS & Find Courses&quot; to
                    discover which university programs you qualify for based on both APS scores and subject
                    requirements.
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
                    <Button
                      variant={showOnlyQualified ? "default" : "outline"}
                      onClick={() => setShowOnlyQualified(!showOnlyQualified)}
                      className="glass-button"
                    >
                      {showOnlyQualified ? "Show All Courses" : "Fully Qualified Only"}
                    </Button>
                  </div>
                  <div className="flex gap-4 mt-4 text-sm flex-wrap">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="font-medium">{qualifiedCount} Fully Qualified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                      <span className="font-medium">{partialCount} Partial Match</span>
                    </div>
                  </div>
                </div>

                {showSecondChanceInfo && (
                  <div className="px-4 md:px-6 mt-4">
                    <SecondChanceCard showUnlink onUnlink={() => setShowSecondChanceInfo(false)} />
                  </div>
                )}

                <ScrollArea className="flex-1">
                  <div className="p-4 md:p-6">
                    {filteredUniversities.length === 0 ? (
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center py-8">
                            <p className="text-muted-foreground">
                              {searchQuery
                                ? "No courses match your search"
                                : showOnlyQualified
                                  ? "No courses found where you meet all requirements. Try toggling to 'Show All Courses' to see partial matches."
                                  : "No courses found matching your APS score"}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                        {filteredUniversities.map(
                          ({ course, university, meetsRequirements }, index) => {
                            const apsToDisplay = course.apsMin ?? course.apsRequired ?? "N/A"
                            const careersToDisplay = formatCareers(course.careerOpportunities ?? course.careers)
                          
                            return (
                              <Card
                                key={index}
                                className={`glass-card ${
                                  meetsRequirements
                                    ? "border-green-200 bg-green-50/50"
                                    : "border-amber-200 bg-amber-50/50"
                                }`}
                              >
                                <CardHeader>
                                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                    <div className="space-y-1 flex-1">
                                      <div className="flex items-center gap-2">
                                        {meetsRequirements ? (
                                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        ) : (
                                          <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                                        )}
                                        <CardTitle className="text-base md:text-lg">{course.name}</CardTitle>
                                      </div>
                                      <CardDescription className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
                                        <span className="font-medium">{university.shortName}</span>
                                        <span className="hidden sm:inline">•</span>
                                        <span className="block sm:inline w-full sm:w-auto">{university.location}</span>
                                        {course.faculty && (
                                          <>
                                            <span className="hidden sm:inline">•</span>
                                            <span className="block sm:inline w-full sm:w-auto">{course.faculty}</span>
                                          </>
                                        )}
                                      </CardDescription>
                                    </div>
                                    <div className="flex items-center gap-2 self-start sm:ml-4">
                                      <Badge variant="secondary" className="glass-button">
                                        APS: {apsToDisplay}
                                      </Badge>
                                    </div>
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-3">
                                    {course.description && (
                                      <p className="text-sm text-muted-foreground">{course.description}</p>
                                    )}

                                    {/* Qualification banner and additional requirements intentionally hidden */}

                                    {careersToDisplay && (
                                      <div className="text-xs text-muted-foreground">
                                        <span className="font-medium">Career Paths: </span>
                                        {careersToDisplay}
                                      </div>
                                    )}

                                    {course.duration && (
                                      <div className="text-xs text-muted-foreground">
                                        <span className="font-medium">Duration: </span>
                                        {course.duration}
                                      </div>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            )
                          },
                        )}
                      </div>
                    )}

                    {qualifiedCount < 30 && filteredColleges.length > 0 && (
                      <>
                        <Separator className="my-6" />
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold">Recommended Colleges</h3>
                          <p className="text-sm text-muted-foreground">Explore colleges closely aligned with your subjects.</p>
                        </div>
                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 auto-rows-fr">
                          {filteredColleges.map((university, index) => (
                            <Card
                              key={`college-card-${university.id}`}
                              className={`group overflow-hidden glass-card border-blue-200 bg-blue-50/50 ${index === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}
                            >
                              <div className={`relative overflow-hidden bg-muted ${index === 0 ? "aspect-[16/10]" : "aspect-[16/9]"}`} />
                              <CardHeader className="space-y-2 p-4 sm:p-6">
                                <CardTitle className={`${index === 0 ? "text-sm sm:text-base" : "text-xs sm:text-sm"}`}>
                                  {university.name}
                                </CardTitle>
                                <CardDescription className="text-xs">{university.location}</CardDescription>
                              </CardHeader>
                              <CardContent className="p-4 sm:p-6 pt-0">
                                {university.website ? (
                                  <Button
                                    asChild
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-start px-0 h-auto font-normal text-xs sm:text-sm"
                                  >
                                    <a href={university.website} target="_blank" rel="noopener noreferrer">Visit website</a>
                                  </Button>
                                ) : (
                                  <div className="text-xs text-muted-foreground">Website not available</div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </>
                    )}

                    {compareKeys.length > 0 && (
                      <>
                        <Separator className="my-6" />
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold">Compare Selected</h3>
                          <p className="text-sm text-muted-foreground">Side-by-side comparison of selected courses.</p>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          {qualifyingCourses
                            .filter(({ course, university }) => isCompared(course, university))
                            .map(({ course, university }, index) => {
                              const apsToDisplay = course.apsMin ?? course.apsRequired ?? "N/A"
                              return (
                                <Card key={`cmp-${index}`} className="glass-card">
                                  <CardHeader>
                                    <CardTitle className="text-base">{course.name}</CardTitle>
                                    <CardDescription>{university.shortName}</CardDescription>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                      <Badge variant="outline">APS: {apsToDisplay}</Badge>
                                      {course.faculty && <Badge variant="secondary">{course.faculty}</Badge>}
                                      {course.duration && <Badge variant="outline">{course.duration}</Badge>}
                                    </div>
                                    {course.description && (
                                      <p className="text-sm text-muted-foreground">{course.description}</p>
                                    )}
                                  </CardContent>
                                </Card>
                              )
                            })}
                        </div>
                      </>
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
