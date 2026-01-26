import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle, Bookmark } from "lucide-react"
import { CourseMatch } from "@/app/find-course/types"

interface CourseMatchCardProps {
  match: CourseMatch
  index: number
}

export function CourseMatchCard({ match, index }: CourseMatchCardProps) {
  const { course, university, meetsRequirements, missingRequirements, metRequirements } = match
  const apsToDisplay = course.apsMin ?? course.apsRequired ?? "N/A"
  
  const formatCareers = (careers: string | string[] | undefined): string => {
    if (!careers) return ""
    if (Array.isArray(careers)) return careers.join(", ")
    return careers
  }
  
  const careersToDisplay = formatCareers(course.careerOpportunities ?? course.careers)

  return (
    <Card
      className={`glass-card ${
        meetsRequirements
          ? "border-green-200 bg-green-50/50"
          : "border-amber-200 bg-amber-50/50"
      }`}
    >
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              {meetsRequirements ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
              )}
              <CardTitle className="text-base md:text-lg">{course.name}</CardTitle>
            </div>
            <CardDescription className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
              <span className="font-medium">{university.shortName}</span>
              <span className="text-muted-foreground">•</span>
              <span>APS Required: {apsToDisplay}</span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {careersToDisplay && (
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <GraduationCap className="h-3 w-3" /> Potential Careers
            </p>
            <p className="text-xs md:text-sm line-clamp-2">{careersToDisplay}</p>
          </div>
        )}

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Requirements Status</p>
          <div className="flex flex-wrap gap-1.5">
            {metRequirements.slice(0, 3).map((req, i) => (
              <Badge key={i} variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-none text-[10px]">
                {req}
              </Badge>
            ))}
            {missingRequirements.slice(0, 2).map((req, i) => (
              <Badge key={i} variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none text-[10px]">
                Missing: {req}
              </Badge>
            ))}
            {(metRequirements.length > 3 || missingRequirements.length > 2) && (
              <span className="text-[10px] text-muted-foreground self-center">
                +{metRequirements.length + missingRequirements.length - 5} more
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

import { GraduationCap } from "lucide-react"
