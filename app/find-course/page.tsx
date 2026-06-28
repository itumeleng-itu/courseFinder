"use client"

import { useMemo, useState } from "react"
import { useNSCValidation } from "@/hooks/useNSCValidation"
import { SubjectValidator } from "@/lib/utils/subject-validator"
import { SidebarInset } from "@/components/ui/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Calculator, GraduationCap, Search, PlusCircle, BookOpen, School } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { calculateAPS as calculateAPSFromLib } from "@/lib/aps-calculator"
import { evaluateNSC } from "@/lib/nsc"
import type { SubjectEntry } from "@/lib/types"

import { Subject, CourseMatch } from "./types"
import { useCourseMatcher } from "@/hooks/use-course-matcher"
import { DashboardSidebar } from "@/components/app-sidebar"
import { APSDisplay } from "@/components/find-course/aps-display"
import { SubjectItem } from "@/components/find-course/subject-item"
import { SubjectInputForm } from "@/components/find-course/subject-input-form"
import { CourseFilters } from "@/components/find-course/course-filters"
import { CourseMatchCard } from "@/components/find-course/course-match-card"
import { UpgradeRecommendation } from "@/components/find-course/upgrade-recommendation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function FindCoursePage() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [currentSubject, setCurrentSubject] = useState("")
  const [currentPercentage, setCurrentPercentage] = useState("")
  const [apsScore, setApsScore] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [hasCalculated, setHasCalculated] = useState(false)
  const [nscResult, setNscResult] = useState(null)
  const [editingSubjectId, setEditingSubjectId] = useState<string | null>(null)
  const [editingPercentage, setEditingPercentage] = useState("")
  const [visibleCount, setVisibleCount] = useState(48)
  const { toast } = useToast()

  const validator = useMemo(() => new SubjectValidator(subjects), [subjects])
  const { canCalculate } = useNSCValidation(subjects)

  const calculatedDefaultAPS = useMemo(() => {
    const libSubjects: SubjectEntry[] = subjects.map((s) => ({ id: s.id, name: s.name, percentage: s.percentage }))
    return Number(calculateAPSFromLib(libSubjects, "default").aps || 0)
  }, [subjects])

  const {
    qualifyingCourses,
    recommendedColleges,
    extendedPrograms,
    findCourses: runMatcher,
    setQualifyingCourses,
    setRecommendedColleges,
    setExtendedPrograms,
  } = useCourseMatcher(subjects, calculatedDefaultAPS)

  const addSubject = () => {
    if (!currentSubject || !currentPercentage) return
    const percentage = parseFloat(currentPercentage)
    const disabledReason = validator.getDisabledReason(currentSubject)
    if (disabledReason) {
      toast({ title: "Subject conflict", description: disabledReason, variant: "destructive" })
      return
    }
    setSubjects([...subjects, { id: Date.now().toString(), name: currentSubject, percentage }])
    setCurrentSubject(""); setCurrentPercentage(""); setHasCalculated(false)
  }

  const findCourses = () => {
    if (subjects.length < 7) {
      toast({ title: "Add more subjects", description: "Please add at least 7 subjects." })
      return
    }
    setApsScore(calculatedDefaultAPS)
    setNscResult(evaluateNSC(subjects) as any)
    setVisibleCount(48)
    runMatcher()
    setHasCalculated(true)
  }

  const filteredCourses = useMemo(() => {
    const q = searchQuery.toLowerCase()
    return qualifyingCourses.filter((m) => {
      const matchSearch = m.course.name.toLowerCase().includes(q) || m.university.name.toLowerCase().includes(q)
      return matchSearch
    })
  }, [qualifyingCourses, searchQuery])

  const qualifiedCount = qualifyingCourses.filter((c) => c.meetsRequirements).length

  return (
    <>
      <DashboardSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 hidden xl:flex">
          <Separator orientation="vertical" className="mr-2 h-4" /><Search className="h-5 w-5 text-purple-600" /><h1 className="text-lg font-semibold">Find a Course</h1>
        </header>

        <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-4rem)] lg:overflow-hidden">
          <div className="w-full lg:w-[400px] border-b lg:border-r bg-card flex-shrink-0 flex flex-col h-auto lg:h-full lg:overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-bold">Calculate Your APS</h2>
            </div>
            <div className="flex-1 overflow-y-auto min-h-0 bg-muted/10">
              <div className="p-4 space-y-4">
                <APSDisplay apsScore={apsScore} nscResult={nscResult} />
                
                {subjects.length > 0 ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground px-1 mb-2">
                      <span>{subjects.length}/7 Subjects</span>
                      {subjects.length < 7 && <span className="text-orange-600 font-medium">Add {7 - subjects.length} more</span>}
                    </div>
                    {subjects.map((s) => (
                      <SubjectItem
                        key={s.id}
                        subject={s}
                        editingSubjectId={editingSubjectId}
                        editingPercentage={editingPercentage}
                        setEditingPercentage={setEditingPercentage}
                        onSaveEdit={(id) => {
                          const p = parseFloat(editingPercentage)
                          setSubjects(subjects.map(sub => sub.id === id ? { ...sub, percentage: p } : sub))
                          setEditingSubjectId(null)
                          setHasCalculated(false)
                        }}
                        onCancelEdit={() => setEditingSubjectId(null)}
                        onStartEditing={(sub) => {
                          setEditingSubjectId(sub.id)
                          setEditingPercentage(sub.percentage.toString())
                        }}
                        onRemove={(id) => {
                          setSubjects(subjects.filter(sub => sub.id !== id))
                          setHasCalculated(false)
                        }}
                      />
                    ))}
                    <div className="pt-4 space-y-3">
                      <Button onClick={findCourses} className="w-full glass-button text-lg font-bold h-12 shadow-lg hover:shadow-xl transition-all" size="lg" disabled={!canCalculate}>
                        <Calculator className="h-5 w-5 mr-2" />
                        Calculate APS
                      </Button>
                      <Button onClick={() => { setSubjects([]); setHasCalculated(false); setQualifyingCourses([]); setRecommendedColleges([]); setExtendedPrograms([]); setVisibleCount(48) }} variant="ghost" className="w-full text-muted-foreground hover:text-destructive">
                        Reset All Subjects
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 px-4 rounded-xl border-2 border-dashed border-muted/50 bg-card/30">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <GraduationCap className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Start your journey</h3>
                    <p className="text-sm text-muted-foreground mb-6 max-w-[250px] mx-auto">
                      Add your matric subjects to see which courses you qualify for.
                    </p>
                    <Button 
                      onClick={() => {
                        const core = [
                          { id: Date.now().toString(), name: "Life Orientation", percentage: 50 }
                        ];
                        setSubjects(core);
                      }} 
                      variant="outline" 
                      className="glass-button w-full sm:w-auto"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Life Orientation
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <SubjectInputForm
              currentSubject={currentSubject}
              setCurrentSubject={setCurrentSubject}
              currentPercentage={currentPercentage}
              setCurrentPercentage={setCurrentPercentage}
              isSubjectDisabled={(name) => validator.isSubjectDisabled(name)}
              onAddSubject={addSubject}
              subjectsCount={subjects.length}
            />
          </div>

          <div className="flex-1 flex flex-col lg:overflow-hidden h-auto">
            {hasCalculated && (
              <>
                <CourseFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery} qualifiedCount={qualifiedCount} />
                <ScrollArea className="lg:flex-1 h-auto">
                  <div className="p-4 md:p-6">
                    <UpgradeRecommendation nscResult={nscResult} qualifiedCount={qualifiedCount} />
                    
                    {filteredCourses.length === 0 && extendedPrograms.length === 0 && recommendedColleges.length === 0 ? (
                      <Card><CardContent className="pt-6 text-center py-8 text-muted-foreground">No qualifying courses found for your APS score. Consider checking extended curriculum programmes below.</CardContent></Card>
                    ) : (
                      <>
                        {filteredCourses.length > 0 && (
                          <div>
                            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                              {filteredCourses.slice(0, visibleCount).map((m, i) => <CourseMatchCard key={i} match={m} index={i} />)}
                            </div>
                            {visibleCount < filteredCourses.length && (
                              <div className="mt-6 text-center">
                                <Button variant="outline" onClick={() => setVisibleCount(v => v + 48)}>
                                  Load more ({filteredCourses.length - visibleCount} remaining)
                                </Button>
                              </div>
                            )}
                          </div>
                        )}

                        {extendedPrograms.length > 0 && (
                          <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-5 w-5 text-amber-500" />
                              <h3 className="text-base font-semibold">Extended Curriculum Programmes</h3>
                              <span className="text-xs text-muted-foreground">({extendedPrograms.length} options — includes foundation year)</span>
                            </div>
                            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                              {extendedPrograms.map((m, i) => <CourseMatchCard key={`ext-${i}`} match={m} index={i} />)}
                            </div>
                          </div>
                        )}

                        {recommendedColleges.length > 0 && (
                          <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-2">
                              <School className="h-5 w-5 text-blue-500" />
                              <h3 className="text-base font-semibold">TVET College Programmes</h3>
                              <span className="text-xs text-muted-foreground">({recommendedColleges.length} options)</span>
                            </div>
                            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                              {recommendedColleges.map((m, i) => <CourseMatchCard key={`col-${i}`} match={m} index={i} />)}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </ScrollArea>
              </>
            )}
          </div>
        </div>
      </SidebarInset>
    </>
  )
}
