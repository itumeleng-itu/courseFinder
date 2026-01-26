import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { GraduationCap, MapPin, Users, Clock, TrendingUp, BookOpen, ExternalLink } from "lucide-react"
import { CourseWithUniversity } from "./course-card"

interface CourseModalProps {
  course: CourseWithUniversity | null
  isOpen: boolean
  onClose: () => void
}

const getAPSBadgeColor = (aps: number) => {
  if (aps >= 35) return "bg-red-100 text-red-800 border-red-200"
  if (aps >= 30) return "bg-orange-100 text-orange-800 border-orange-200"
  if (aps >= 25) return "bg-yellow-100 text-yellow-800 border-yellow-200"
  if (aps >= 20) return "bg-green-100 text-green-800 border-green-200"
  return "bg-blue-100 text-blue-800 border-blue-200"
}

export function CourseModal({ course, isOpen, onClose }: CourseModalProps) {
  if (!course) return null
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader><DialogTitle className="flex items-center gap-2 text-xl"><GraduationCap className="h-6 w-6 text-blue-600" />{course.name}</DialogTitle></DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline"><MapPin className="h-3 w-3" />{course.universityName}</Badge>
              {course.faculty && <Badge variant="outline"><Users className="h-3 w-3" />{course.faculty}</Badge>}
              <Badge className={`${getAPSBadgeColor(course.minimumAPS)}`}><TrendingUp className="h-3 w-3" />APS: {course.minimumAPS}</Badge>
            </div>
            {course.description && <div><h3 className="text-lg font-semibold mb-2">Course Description</h3><p className="text-gray-700 leading-relaxed">{course.description}</p></div>}
            {course.requirements && course.requirements.length > 0 && (
              <div><h3 className="text-lg font-semibold mb-3">Entry Requirements</h3><div className="bg-blue-50 p-4 rounded-lg"><ul className="space-y-2">{course.requirements.map((r, i) => (<li key={i} className="flex items-start gap-2 text-sm"><BookOpen className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />{r}</li>))}</ul></div></div>
            )}
            <div>
              <h3 className="text-lg font-semibold mb-3">Study Tips & Advice</h3>
              <div className="bg-green-50 p-4 rounded-lg space-y-3">
                <div className="flex items-start gap-2">
                  <div className="bg-green-100 p-1 rounded"><TrendingUp className="h-4 w-4 text-green-600" /></div>
                  <div><p className="text-sm font-medium text-green-800">Aim Higher</p><p className="text-sm text-green-700">Aim for marks 10-15% above the minimum for better admission chances.</p></div>
                </div>
                <Separator />
                <div className="flex items-start gap-2">
                  <div className="bg-green-100 p-1 rounded"><Clock className="h-4 w-4 text-green-600" /></div>
                  <div><p className="text-sm font-medium text-green-800">Apply Early</p><p className="text-sm text-green-700">Apply between March and August as spots fill up quickly.</p></div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button asChild className="flex-1 text-white"><a href={course.universityWebsite} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4 mr-2" />Visit {course.universityShortName} Website</a></Button>
              <Button variant="outline" onClick={onClose}>Close</Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
