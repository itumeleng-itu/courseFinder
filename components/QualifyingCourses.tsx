"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { GraduationCap, MapPin, Clock, Info, TrendingUp } from "lucide-react"
import CourseInfoModal from "./CourseInfoModal"
import type { Course } from "@/lib/types"

interface QualifyingCoursesProps {
  courses: Array<Course & { university: string }>
  loading: boolean
}

export default function QualifyingCourses({ courses, loading }: QualifyingCoursesProps) {
  const [selectedCourse, setSelectedCourse] = useState<(Course & { university: string }) | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCourseInfo = (course: Course & { university: string }) => {
    setSelectedCourse(course)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedCourse(null)
  }

  const getDurationBadgeColor = (duration: string) => {
    if (duration.includes("3")) return "bg-green-100 text-green-800"
    if (duration.includes("4")) return "bg-blue-100 text-blue-800"
    if (duration.includes("5")) return "bg-orange-100 text-orange-800"
    if (duration.includes("6")) return "bg-red-100 text-red-800"
    return "bg-gray-100 text-gray-800"
  }

  const getAPSBadgeColor = (aps: number) => {
    if (aps >= 35) return "bg-red-100 text-red-800"
    if (aps >= 30) return "bg-orange-100 text-orange-800"
    if (aps >= 25) return "bg-yellow-100 text-yellow-800"
    return "bg-green-100 text-green-800"
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Qualifying Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (courses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Qualifying Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">No qualifying courses found</p>
            <p className="text-sm text-gray-500">Try improving your marks or consider alternative study paths</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Group courses by university
  const coursesByUniversity = courses.reduce(
    (acc, course) => {
      if (!acc[course.university]) {
        acc[course.university] = []
      }
      acc[course.university].push(course)
      return acc
    },
    {} as Record<string, Array<Course & { university: string }>>,
  )

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Qualifying Courses ({courses.length})
          </CardTitle>
          <p className="text-sm text-gray-600">Based on your APS score and subject requirements</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(coursesByUniversity).map(([university, universityCourses]) => (
              <div key={university}>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <h3 className="font-semibold text-lg">{university}</h3>
                  <Badge variant="outline">{universityCourses.length} courses</Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {universityCourses.map((course) => (
                    <Card key={course.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-sm leading-tight mb-2">{course.name}</h4>
                            {course.faculty && <p className="text-xs text-gray-600 mb-2">{course.faculty}</p>}
                          </div>

                          <div className="flex flex-wrap gap-1">
                            <Badge className={`text-xs ${getAPSBadgeColor(course.apsMin)}`}>
                              <TrendingUp className="h-3 w-3 mr-1" />
                              APS: {course.apsMin}
                            </Badge>
                            {course.duration && (
                              <Badge className={`text-xs ${getDurationBadgeColor(course.duration)}`}>
                                <Clock className="h-3 w-3 mr-1" />
                                {course.duration}
                              </Badge>
                            )}
                          </div>

                          {course.subjectRequirements && Object.keys(course.subjectRequirements).length > 0 && (
                            <div className="text-xs text-gray-600">
                              <p className="font-medium">Key subjects:</p>
                              <p className="truncate">
                                {Object.keys(course.subjectRequirements).slice(0, 2).join(", ")}
                                {Object.keys(course.subjectRequirements).length > 2 && "..."}
                              </p>
                            </div>
                          )}

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCourseInfo(course)}
                            className="w-full text-xs"
                          >
                            <Info className="h-3 w-3 mr-1" />
                            Course Information
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <CourseInfoModal course={selectedCourse} isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}
