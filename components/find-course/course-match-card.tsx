"use client"

/**
 * One result in the grid: enough to scan by, and nothing else.
 *
 * The grid shows dozens of these at once, so everything a learner does
 * not scan by -- careers, the full requirements list, the course
 * outline -- lives in CourseDetailDialog instead. Keeping it on the
 * card made rows ragged (cards grew to whatever their longest section
 * needed) and buried the two facts that actually drive the decision:
 * what the programme is, and whether they got in.
 */
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle, ChevronRight } from "lucide-react"
import { CourseMatch } from "@/app/find-course/types"
import { CourseDetailDialog } from "@/components/find-course/course-detail-dialog"

interface CourseMatchCardProps {
  match: CourseMatch
  index: number
}

export function CourseMatchCard({ match, index }: CourseMatchCardProps) {
  const [open, setOpen] = useState(false)
  const { course, university, meetsRequirements } = match
  const apsToDisplay = course.apsMin ?? course.apsRequired ?? "N/A"

  return (
    <>
      {/* A button, not a div with onClick: the whole card is one
          control, so it must be reachable and operable by keyboard and
          announced as a control by a screen reader. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="text-left w-full h-full group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60"
      >
        <Card className="glass-card border-green-200 bg-green-50/50 h-full transition-shadow group-hover:shadow-md">
          <CardContent className="p-4 flex flex-col gap-2 h-full">
            <div className="flex items-start gap-2">
              {meetsRequirements
                ? <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                : <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />}
              {/* Clamped so every card in a row is the same height
                  whatever the programme is called -- Wits prints some
                  very long ones. */}
              <h3 className="text-sm md:text-base font-semibold leading-snug line-clamp-2">
                {course.name}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground pl-6">
              <span className="font-medium text-foreground">{university.shortName}</span>
              <span>•</span>
              <span>APS {apsToDisplay}</span>
              {course.duration && (<><span>•</span><span>{course.duration}</span></>)}
            </div>

            <div className="flex items-center justify-between gap-2 pl-6 mt-auto pt-1">
              {match.metRequirements[0] && (
                <Badge variant="secondary"
                       className="bg-green-100 text-green-700 hover:bg-green-100 border-none text-[10px]">
                  {match.metRequirements[0]}
                </Badge>
              )}
              <span className="text-[11px] text-muted-foreground flex items-center gap-0.5 shrink-0 ml-auto">
                Details
                <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </CardContent>
        </Card>
      </button>

      <CourseDetailDialog match={match} open={open} onOpenChange={setOpen} />
    </>
  )
}
