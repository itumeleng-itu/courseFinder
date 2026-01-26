import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Building2, TrendingUp, Clock, Info, Star } from "lucide-react"

export interface CourseWithUniversity {
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

const getAPSBadgeColor = (aps: number) => {
  if (aps >= 35) return "bg-red-100 text-red-800 border-red-200"
  if (aps >= 30) return "bg-orange-100 text-orange-800 border-orange-200"
  if (aps >= 25) return "bg-yellow-100 text-yellow-800 border-yellow-200"
  if (aps >= 20) return "bg-green-100 text-green-800 border-green-200"
  return "bg-blue-100 text-blue-800 border-blue-200"
}

export function CourseCard({ course, onClick }: { course: CourseWithUniversity, onClick: () => void }) {
  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-l-4 border-l-blue-500 bg-gradient-to-br from-white to-blue-50/30" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-blue-600" />
              <CardTitle className="text-base group-hover:text-blue-700 transition-colors line-clamp-2">{course.name}</CardTitle>
            </div>
            <CardDescription className="flex items-center gap-2 text-xs">
              <Building2 className="h-3 w-3" /> <span className="font-medium">{course.universityShortName}</span>
              {course.faculty && <><span>•</span><span className="truncate">{course.faculty}</span></>}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge className={`${getAPSBadgeColor(course.minimumAPS)} text-xs`}><TrendingUp className="h-3 w-3 mr-1" />APS: {course.minimumAPS}</Badge>
          {course.duration && <Badge variant="outline" className="text-xs bg-indigo-100 text-indigo-800"><Clock className="h-3 w-3 mr-1" />{course.duration}</Badge>}
        </div>
        {course.description && <p className="text-xs text-gray-600 line-clamp-2">{course.description}</p>}
        <div className="flex items-center justify-between pt-2">
          <Button variant="ghost" size="sm" className="text-xs text-blue-600 hover:text-blue-700 p-0 h-auto"><Info className="h-3 w-3 mr-1" />View Details</Button>
          <div className="flex items-center gap-1"><Star className="h-3 w-3 text-yellow-500 fill-current" /><span className="text-xs text-gray-500">4.{Math.floor(Math.random() * 9)}</span></div>
        </div>
      </CardContent>
    </Card>
  )
}
