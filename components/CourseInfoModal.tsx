"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { GraduationCap, Clock, MapPin, Users, TrendingUp, BookOpen, AlertCircle } from "lucide-react"
import type { Course } from "@/lib/types"

interface CourseInfoModalProps {
  course: (Course & { university: string }) | null
  isOpen: boolean
  onClose: () => void
}

export default function CourseInfoModal({ course, isOpen, onClose }: CourseInfoModalProps) {
  if (!course) return null

  const getRequirementText = (requirement: any): string => {
    if (typeof requirement === "number") {
      return `Level ${requirement} (${requirement === 7 ? "80-100%" : requirement === 6 ? "70-79%" : requirement === 5 ? "60-69%" : requirement === 4 ? "50-59%" : requirement === 3 ? "40-49%" : requirement === 2 ? "30-39%" : "0-29%"})`
    }
    if (requirement.alternatives) {
      return requirement.alternatives.map((alt: any) => `${alt.subject} Level ${alt.level}`).join(" OR ")
    }
    return "Not specified"
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

  const getUniversityShortName = (university: string): string => {
    const universityMap: Record<string, string> = {
      "Cape Peninsula University of Technology": "cput",
      // Add more mappings as needed
    };
    return universityMap[university] || university.toLowerCase().replace(/\s+/g, "");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <GraduationCap className="h-6 w-6 text-blue-600" />
            {course.name}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
          <div className="space-y-6">
            {/* University and Faculty Info */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {course.university}
              </Badge>
              {course.faculty && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {course.faculty}
                </Badge>
              )}
              {course.duration && (
                <Badge className={`${getDurationBadgeColor(course.duration)} flex items-center gap-1`}>
                  <Clock className="h-3 w-3" />
                  {course.duration}
                </Badge>
              )}
              <Badge className={`${getAPSBadgeColor(course.apsMin)} flex items-center gap-1`}>
                <TrendingUp className="h-3 w-3" />
                APS: {course.apsMin}
              </Badge>
            </div>

            <Separator />

            {/* Admission Requirements */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Admission Requirements
              </h3>
              <div className="space-y-3">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-medium text-blue-900">Minimum APS Required: {course.apsMin}</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Your APS is calculated from your best 6 subjects (excluding Life Orientation)
                  </p>
                </div>

                {course.subjectRequirements && Object.keys(course.subjectRequirements).length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Subject Requirements:</h4>
                    <div className="space-y-2">
                      {Object.entries(course.subjectRequirements).map(([subject, requirement]) => (
                        <div key={subject} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="font-medium">{subject}</span>
                          <span className="text-sm text-gray-600">{getRequirementText(requirement)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Additional Requirements */}
            {course.requirements && course.requirements.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  Additional Requirements
                </h3>
                <ul className="space-y-2">
                  {course.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Course Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3">About This Course</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  This {course.duration || "degree"} programme is offered by the {course.faculty || "university"}
                  and requires a minimum APS of {course.apsMin}.
                  {course.subjectRequirements && Object.keys(course.subjectRequirements).length > 0
                    ? " Specific subject requirements must be met in addition to the APS requirement."
                    : " No specific subject requirements beyond the APS score."}
                </p>
              </div>
            </div>

            {/* Study Tips */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Study Tips</h3>
              <div className="bg-green-50 p-4 rounded-lg space-y-2">
                <p className="text-sm text-green-800">
                  <strong>💡 Tip:</strong> Meeting the minimum requirements doesn't guarantee admission. Aim for higher
                  marks to improve your chances!
                </p>
                <p className="text-sm text-green-800">
                  <strong>📚 Preparation:</strong> Focus on your core subjects, especially those required for this
                  course.
                </p>
                <p className="text-sm text-green-800">
                  <strong>🎯 Application:</strong> Apply early as most programmes have limited spaces available.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={() =>
                  window.open(`https://${getUniversityShortName(course.university)}.ac.za`, "_blank")
                }
                className="flex-1"
              >
                Visit University Website
              </Button>
              <Button variant="outline" onClick={onClose} className="flex-1">
                Close
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
