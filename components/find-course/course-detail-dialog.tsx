"use client"

/**
 * Everything known about one programme, in a modal.
 *
 * The results grid shows dozens of cards at once, so a card carries only
 * what a learner scans by -- name, institution, APS -- and the detail
 * lives here, one programme at a time, where it has room to be read.
 *
 * The courses are fetched only while this dialog is open. That is not
 * only a page-weight argument: with the detail inline on every card, a
 * learner opening five course lists made five requests whether or not
 * they meant to. Here the click that costs a request is the click that
 * asks for it.
 */
import { CheckCircle2, AlertCircle, GraduationCap, MapPin, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { ProgrammeCourseList } from "@/components/find-course/programme-courses"
import type { CourseMatch } from "@/app/find-course/types"

interface CourseDetailDialogProps {
  match: CourseMatch
  open: boolean
  onOpenChange: (open: boolean) => void
}

function Section({ title, icon, children }: {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
        {icon}
        {title}
      </p>
      {children}
    </div>
  )
}

export function CourseDetailDialog({ match, open, onOpenChange }: CourseDetailDialogProps) {
  const { course, university, meetsRequirements, missingRequirements, metRequirements } = match
  const apsToDisplay = course.apsMin ?? course.apsRequired ?? "N/A"
  const canShowCourses = Boolean(match.apiBacked && course.id && university.id)

  // Bound once, then narrowed -- Array.isArray on a ?? expression
  // re-evaluates it and narrows nothing, which is how the string[]
  // branch ended up typed as string | string[].
  const rawCareers = course.careerOpportunities ?? course.careers
  const careers = Array.isArray(rawCareers) ? rawCareers.join(", ") : rawCareers

  const campuses = Array.isArray(course.campus) ? course.campus : course.campus ? [course.campus] : []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl pr-6 flex items-start gap-2">
            {meetsRequirements
              ? <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              : <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />}
            <span>{course.name}</span>
          </DialogTitle>
          <DialogDescription asChild>
            {/* Separators are drawn BEFORE each item after the first,
                never after one. A trailing "•" left dangling at the end
                of a wrapped line otherwise reads as a missing field. */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs md:text-sm pl-7">
              {[
                university.name || university.shortName,
                `APS required: ${apsToDisplay}`,
                course.faculty,
              ]
                .filter(Boolean)
                .map((part, i) => (
                  <span key={i} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden="true">•</span>}
                    <span className={i === 0 ? "font-medium text-foreground" : undefined}>{part}</span>
                  </span>
                ))}
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            {course.duration && (
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{course.duration}</span>
            )}
            {campuses.length > 0 && (
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{campuses.join(", ")}</span>
            )}
          </div>

          <Section title="Requirements status">
            <div className="flex flex-wrap gap-1.5">
              {metRequirements.map((req, i) => (
                <Badge key={`met-${i}`} variant="secondary"
                       className="bg-green-100 text-green-700 hover:bg-green-100 border-none text-[10px]">
                  {req}
                </Badge>
              ))}
              {/* Shown in full rather than truncated: on a card there is
                  no room, but this is the screen a learner opens to find
                  out exactly what is standing in their way. */}
              {missingRequirements.map((req, i) => (
                <Badge key={`miss-${i}`} variant="secondary"
                       className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none text-[10px]">
                  {req}
                </Badge>
              ))}
            </div>
          </Section>

          {careers && (
            <Section title="Potential careers" icon={<GraduationCap className="h-3 w-3" />}>
              <p className="text-xs md:text-sm leading-relaxed">{careers}</p>
            </Section>
          )}

          {canShowCourses && (
            <Section title="What you'd study">
              <ProgrammeCourseList
                institution={university.id}
                qualificationCode={course.id!}
                enabled={open}
              />
            </Section>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
