"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator } from "lucide-react"
import SubjectsForm from "@/components/SubjectsForm"
import QualifyingCourses from "@/components/QualifyingCourses"
import APSScoreDisplay from "@/components/APSScoreDisplay"
import { calculateAPS } from "@/lib/aps-calculator"
import type { SubjectEntry } from "@/lib/types"
import { Chatbot } from "@/components/chatbot"

export default function FindCoursePage() {
  const [subjects, setSubjects] = useState<SubjectEntry[]>([])
  const [apsScore, setApsScore] = useState<number>(0)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (subjects.length > 0) {
      const score = calculateAPS(subjects)
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
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-lg font-semibold">Find Course</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
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

            <div className="lg:col-span-2">
              {showResults ? (
                <div className="space-y-6">
                  <APSScoreDisplay score={apsScore} subjects={subjects} />
                  <Separator />
                  <QualifyingCourses apsScore={apsScore} subjects={subjects} />
                </div>
              ) : (
                <Card className="h-full">
                  <CardContent className="flex flex-col items-center justify-center text-center p-12">
                    <div className="bg-muted p-6 rounded-full mb-6">
                      <Calculator className="h-12 w-12" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">Ready to Find Your Course?</h3>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      Start by entering your matric subject results on the left. We'll calculate your APS score and show
                      you all the courses you qualify for.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
        <Chatbot />
      </SidebarInset>
    </>
  )
}
