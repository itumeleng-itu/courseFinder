"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GraduationCap, Search } from "lucide-react"
import type { SubjectEntry } from "@/lib/types"
import { universities } from "@/data/universities"
import { evaluateNSC } from "@/lib/nsc"
import SecondChanceCard from "@/components/SecondChanceCard"
import { CourseCard, CourseWithUniversity } from "./qualifying-courses/course-card"
import { CourseModal } from "./qualifying-courses/course-modal"

interface QualifyingCoursesProps {
  apsScore: number
  subjects: SubjectEntry[]
}

export default function QualifyingCourses({ apsScore, subjects }: QualifyingCoursesProps) {
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<CourseWithUniversity | null>(null)
  
  const allCourses = universities.flatMap(u => u.courses.map(c => ({ ...c, universityName: u.name, universityShortName: u.shortName, universityWebsite: u.website })))
  const qualifying = allCourses.filter(c => apsScore >= c.minimumAPS && (query === "" || c.name.toLowerCase().includes(query.toLowerCase()) || c.universityName.toLowerCase().includes(query.toLowerCase()) || c.faculty?.toLowerCase().includes(query.toLowerCase())))

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><GraduationCap className="h-5 w-5 text-blue-600" />Qualifying Courses</CardTitle>
          <CardDescription>{qualifying.length} course{qualifying.length !== 1 ? "s" : ""} available with your APS score of {apsScore}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative"><Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><Input placeholder="Search courses or universities..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" /></div>
            <ScrollArea className="h-[600px] pr-4">
              {qualifying.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" /><p>No courses found matching your criteria.</p>
                  {subjects.length > 0 && !evaluateNSC(subjects).meetsBasicNSC && <div className="mt-4 flex justify-center"><SecondChanceCard /></div>}
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                  {qualifying.map((c, i) => <CourseCard key={i} course={c} onClick={() => setSelected(c)} />)}
                </div>
              )}
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
      <CourseModal course={selected} isOpen={!!selected} onClose={() => setSelected(null)} />
    </>
  )
}
