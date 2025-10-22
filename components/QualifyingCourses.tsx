"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GraduationCap, Search, ExternalLink } from "lucide-react"
import type { SubjectEntry } from "@/lib/types"
import { universities } from "@/data/universities"

interface QualifyingCoursesProps {
  apsScore: number
  subjects: SubjectEntry[]
}

export default function QualifyingCourses({ apsScore, subjects }: QualifyingCoursesProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Get all courses from all universities
  const allCourses = universities.flatMap((uni) =>
    uni.courses.map((course) => ({
      ...course,
      universityName: uni.name,
      universityShortName: uni.shortName,
      universityWebsite: uni.website,
    })),
  )

  // Filter courses based on APS score and search query
  const qualifyingCourses = allCourses.filter((course) => {
    const meetsAPS = apsScore >= course.minimumAPS
    const matchesSearch =
      searchQuery === "" ||
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.universityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.faculty?.toLowerCase().includes(searchQuery.toLowerCase())

    return meetsAPS && matchesSearch
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-blue-600" />
          Qualifying Courses
        </CardTitle>
        <CardDescription>
          {qualifyingCourses.length} course{qualifyingCourses.length !== 1 ? "s" : ""} available with your APS score of{" "}
          {apsScore}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search courses or universities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <ScrollArea className="h-[500px] pr-4">
            {qualifyingCourses.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No courses found matching your criteria.</p>
                <p className="text-sm mt-2">Try adjusting your search or improving your APS score.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {qualifyingCourses.map((course, index) => (
                  <Card key={`${course.universityShortName}-${course.name}-${index}`} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{course.name}</CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            {course.universityName}
                            {course.faculty && (
                              <>
                                <span>•</span>
                                <span>{course.faculty}</span>
                              </>
                            )}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary" className="shrink-0">
                          APS: {course.minimumAPS}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {course.description && <p className="text-sm text-gray-600">{course.description}</p>}

                      {course.duration && (
                        <div className="text-sm">
                          <span className="font-medium">Duration:</span> {course.duration}
                        </div>
                      )}

                      {course.requirements && course.requirements.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Requirements:</div>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {course.requirements.map((req, reqIndex) => (
                              <li key={reqIndex}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
                        <a href={course.universityWebsite} target="_blank" rel="noopener noreferrer">
                          Visit {course.universityShortName} Website
                          <ExternalLink className="h-3 w-3 ml-2" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
}
