"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Loader2 } from "lucide-react"
import type { Course } from "@/lib/types"

interface QualifyingCoursesProps {
  courses: Array<Course & { university: string }>
  loading: boolean
}

export default function QualifyingCourses({ courses, loading }: QualifyingCoursesProps) {
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Filter courses based on search query
  const filteredCourses = courses.filter((course) => {
    const query = searchQuery.toLowerCase()
    return (
      course.name.toLowerCase().includes(query) ||
      course.university.toLowerCase().includes(query) ||
      (course.faculty && course.faculty.toLowerCase().includes(query))
    )
  })

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </CardContent>
      </Card>
    )
  }

  if (courses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Qualifying Courses Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Based on your APS score and subject requirements, no matching courses were found. Try improving your subject
            percentages or adding different subjects.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Qualifying Courses ({courses.length})</CardTitle>
        <CardDescription>These courses match your APS score and subject requirements</CardDescription>
        <div className="relative mt-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search by university, course name, or faculty..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => <CourseCard key={index} course={course} />)
          ) : (
            <div className="col-span-2 text-center py-8">
              <p className="text-gray-500">No courses match your search. Try a different query.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function CourseCard({ course }: { course: Course & { university: string } }) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{course.name}</CardTitle>
        <CardDescription>{course.university}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge variant="outline">Min APS: {course.apsMin}</Badge>
          {course.faculty && <Badge variant="secondary">{course.faculty}</Badge>}
          {course.duration && <Badge variant="outline">{course.duration}</Badge>}
        </div>
        {course.subjectRequirements && Object.keys(course.subjectRequirements).length > 0 && (
          <div className="mt-2 text-sm">
            <p className="font-medium">Requirements:</p>
            <ul className="list-disc list-inside text-gray-600">
              {Object.entries(course.subjectRequirements).map(([subject, requirement], i) => (
                <li key={i}>
                  {typeof requirement === "number" ? (
                    // Simple requirement
                    `${subject}: Level ${requirement}`
                  ) : (
                    // Alternative requirements
                    <>
                      {requirement.alternatives
                        ? requirement.alternatives.map((alt, j) => (
                            <span key={j}>
                              {j > 0 ? " OR " : ""}
                              {alt.subject}: Level {alt.level}
                            </span>
                          ))
                        : `${subject}: ${JSON.stringify(requirement)}`}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
