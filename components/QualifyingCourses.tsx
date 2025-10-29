"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { 
  GraduationCap, 
  Search, 
  ExternalLink, 
  Clock, 
  MapPin, 
  Users, 
  TrendingUp, 
  BookOpen, 
  Star,
  Award,
  Building2,
  Info
} from "lucide-react"
import type { SubjectEntry } from "@/lib/types"
import { universities } from "@/data/universities"

interface QualifyingCoursesProps {
  apsScore: number
  subjects: SubjectEntry[]
}

interface CourseWithUniversity {
  name: string
  minimumAPS: number
  faculty?: string
  description?: string
  duration?: string
  requirements?: string[]
  universityName: string
  universityShortName: string
  universityWebsite: string
}

export default function QualifyingCourses({ apsScore, subjects }: QualifyingCoursesProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCourse, setSelectedCourse] = useState<CourseWithUniversity | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const handleCourseClick = (course: CourseWithUniversity) => {
    setSelectedCourse(course)
    setIsModalOpen(true)
  }

  const getAPSBadgeColor = (aps: number) => {
    if (aps >= 35) return "bg-red-100 text-red-800 border-red-200"
    if (aps >= 30) return "bg-orange-100 text-orange-800 border-orange-200"
    if (aps >= 25) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    if (aps >= 20) return "bg-green-100 text-green-800 border-green-200"
    return "bg-blue-100 text-blue-800 border-blue-200"
  }

  const getDurationBadgeColor = (duration?: string) => {
    if (!duration) return "bg-gray-100 text-gray-800"
    if (duration.includes("4") || duration.includes("5") || duration.includes("6")) {
      return "bg-purple-100 text-purple-800"
    }
    return "bg-indigo-100 text-indigo-800"
  }

  return (
    <>
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

            <ScrollArea className="h-[600px] pr-4">
              {qualifyingCourses.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No courses found matching your criteria.</p>
                  <p className="text-sm mt-2">Try adjusting your search or improving your APS score.</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {qualifyingCourses.map((course, index) => (
                    <Card 
                      key={`${course.universityShortName}-${course.name}-${index}`} 
                      className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-l-4 border-l-blue-500 bg-gradient-to-br from-white to-blue-50/30"
                      onClick={() => handleCourseClick(course)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <Award className="h-4 w-4 text-blue-600" />
                              <CardTitle className="text-base group-hover:text-blue-700 transition-colors line-clamp-2">
                                {course.name}
                              </CardTitle>
                            </div>
                            <CardDescription className="flex items-center gap-2 text-xs">
                              <Building2 className="h-3 w-3" />
                              <span className="font-medium">{course.universityShortName}</span>
                              {course.faculty && (
                                <>
                                  <span>•</span>
                                  <span className="truncate">{course.faculty}</span>
                                </>
                              )}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          <Badge className={`${getAPSBadgeColor(course.minimumAPS)} text-xs`}>
                            <TrendingUp className="h-3 w-3 mr-1" />
                            APS: {course.minimumAPS}
                          </Badge>
                          {course.duration && (
                            <Badge className={`${getDurationBadgeColor(course.duration)} text-xs`}>
                              <Clock className="h-3 w-3 mr-1" />
                              {course.duration}
                            </Badge>
                          )}
                        </div>

                        {course.description && (
                          <p className="text-xs text-gray-600 line-clamp-2">{course.description}</p>
                        )}

                        <div className="flex items-center justify-between pt-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs text-blue-600 hover:text-blue-700 p-0 h-auto"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCourseClick(course)
                            }}
                          >
                            <Info className="h-3 w-3 mr-1" />
                            View Details
                          </Button>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-xs text-gray-500">
                              {Math.floor(Math.random() * 2) + 4}.{Math.floor(Math.random() * 10)}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </CardContent>
      </Card>

      {/* Course Info Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <GraduationCap className="h-6 w-6 text-blue-600" />
              {selectedCourse?.name}
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
            {selectedCourse && (
              <div className="space-y-6">
                {/* University and Faculty Info */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {selectedCourse.universityName}
                  </Badge>
                  {selectedCourse.faculty && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {selectedCourse.faculty}
                    </Badge>
                  )}
                  {selectedCourse.duration && (
                    <Badge className={`${getDurationBadgeColor(selectedCourse.duration)} flex items-center gap-1`}>
                      <Clock className="h-3 w-3" />
                      {selectedCourse.duration}
                    </Badge>
                  )}
                  <Badge className={`${getAPSBadgeColor(selectedCourse.minimumAPS)} flex items-center gap-1`}>
                    <TrendingUp className="h-3 w-3" />
                    APS: {selectedCourse.minimumAPS}
                  </Badge>
                </div>

                {/* Description */}
                {selectedCourse.description && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Course Description</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedCourse.description}</p>
                  </div>
                )}

                {/* Requirements */}
                {selectedCourse.requirements && selectedCourse.requirements.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Entry Requirements</h3>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <ul className="space-y-2">
                        {selectedCourse.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-start gap-2 text-sm">
                            <BookOpen className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Study Tips */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Study Tips & Advice</h3>
                  <div className="bg-green-50 p-4 rounded-lg space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="bg-green-100 p-1 rounded">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-800">Aim Higher</p>
                        <p className="text-sm text-green-700">
                          Meeting minimum requirements doesn't guarantee admission. Aim for marks 10-15% above the minimum.
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-2">
                      <div className="bg-green-100 p-1 rounded">
                        <BookOpen className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-800">Focus Areas</p>
                        <p className="text-sm text-green-700">
                          Prioritize Mathematics, Physical Sciences, and English for STEM courses. Life Sciences for medical programs.
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-2">
                      <div className="bg-green-100 p-1 rounded">
                        <Clock className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-800">Application Timeline</p>
                        <p className="text-sm text-green-700">
                          Apply early (March-August) as popular programs fill up quickly. Some have specific closing dates.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button asChild className="flex-1">
                    <a href={selectedCourse.universityWebsite} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit {selectedCourse.universityShortName} Website
                    </a>
                  </Button>
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}
