"use client"

/**
 * The courses a learner would actually study, on the results card.
 *
 * Collapsed by default and fetched only when opened -- see
 * hooks/use-programme-courses.ts for why (a results page can hold ~90
 * programmes and ~1,700 courses behind them; a learner opens two or
 * three).
 *
 * TWO THINGS THIS GETS RIGHT THAT A NAIVE RENDER WOULD NOT
 *
 * 1. A programme can have several STREAMS -- majors sharing one degree
 *    code, each with its own three-year curriculum on its own prospectus
 *    page. Wits' BSc in Biological Sciences (SBA11) has six. Rendering
 *    them as one list produces a nonsense curriculum with "Introductory
 *    Life Sciences" repeated six times, so when there is more than one
 *    the learner picks the major first.
 *
 * 2. A course entry is either compulsory or a CHOICE between options.
 *    Listing a choice's options as separate courses turns the
 *    prospectus's "Economics IB or Economic Theory IA" into two
 *    compulsory courses, which is a wrong course list rather than an
 *    untidy one. A choice is rendered as one item reading "X or Y".
 */
import { useState } from "react"
import { BookOpen, ChevronDown, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useProgrammeCourses } from "@/hooks/use-programme-courses"
import {
  orderedStages,
  stageLabel,
  countCourses,
  type CourseRequirement,
  type ProgrammeStream,
} from "@/lib/qualify-api"

interface ProgrammeCoursesProps {
  /** Institution id as the API knows it, e.g. "wits". */
  institution: string
  /** The programme's qualification_code, e.g. "SBA11". */
  qualificationCode: string
  academicYear?: number
}

function CourseLine({ entry }: { entry: CourseRequirement }) {
  if (!entry.choice) {
    return <li className="text-xs md:text-sm leading-relaxed">{entry.name}</li>
  }
  return (
    <li className="text-xs md:text-sm leading-relaxed">
      <span className="text-muted-foreground">One of: </span>
      {(entry.options ?? []).join(" or ")}
    </li>
  )
}

function StreamCourses({ stream }: { stream: ProgrammeStream }) {
  const stages = orderedStages(stream)

  if (stream.transcription_withheld) {
    return (
      <p className="text-xs text-muted-foreground">
        The prospectus prints a course list for this programme, but it has not
        been captured yet.
      </p>
    )
  }
  if (!stages.length) {
    return (
      <p className="text-xs text-muted-foreground">
        The prospectus does not publish a course outline for this programme.
      </p>
    )
  }

  return (
    <div className="space-y-3">
      {stages.map(([stage, courses]) => (
        <div key={stage} className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {stageLabel(stage)}
          </p>
          <ul className="list-disc pl-5 space-y-0.5">
            {courses.map((entry, i) => (
              <CourseLine key={i} entry={entry} />
            ))}
          </ul>
        </div>
      ))}
      {stream.curriculum_notes.map((note, i) => (
        <p key={i} className="text-xs italic text-muted-foreground">
          {note}
        </p>
      ))}
    </div>
  )
}

export function ProgrammeCourses({
  institution,
  qualificationCode,
  academicYear,
}: ProgrammeCoursesProps) {
  const [open, setOpen] = useState(false)
  const [streamIndex, setStreamIndex] = useState(0)
  const { detail, loading, unavailable, error } = useProgrammeCourses(
    institution,
    qualificationCode,
    { enabled: open, academicYear },
  )

  const streams = detail?.streams ?? []
  // Guards the index against a detail that arrives with fewer streams
  // than the one the learner had selected on a previous programme.
  const stream = streams[Math.min(streamIndex, Math.max(streams.length - 1, 0))]

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="space-y-2">
      <CollapsibleTrigger className="flex w-full items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors">
        <BookOpen className="h-3 w-3" />
        What you&apos;d study
        {loading && <Loader2 className="h-3 w-3 animate-spin" />}
        <ChevronDown
          className={`h-3 w-3 ml-auto transition-transform ${open ? "rotate-180" : ""}`}
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="space-y-3">
        {loading && (
          <div className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
          </div>
        )}

        {/* A programme with no published course list is an ordinary
            answer, not a failure, and says so in those words. */}
        {unavailable && (
          <p className="text-xs text-muted-foreground">
            The prospectus does not publish a course outline for this
            programme.
          </p>
        )}

        {error && (
          <p className="text-xs text-muted-foreground">
            The course list could not be loaded just now. Reopening this
            section will try again.
          </p>
        )}

        {detail && !streams.length && (
          <p className="text-xs text-muted-foreground">
            The prospectus does not publish a course outline for this
            programme.
          </p>
        )}

        {/* Several majors under one degree code: pick one. Only shown
            when there is actually a choice to make. */}
        {streams.length > 1 && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">
              {streams.length} majors share this degree — courses differ by
              major.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {streams.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setStreamIndex(i)}
                  aria-pressed={i === streamIndex}
                  className={`rounded-full px-2.5 py-1 text-[10px] border transition-colors ${
                    i === streamIndex
                      ? "bg-green-100 text-green-800 border-green-300"
                      : "bg-background text-muted-foreground border-border hover:bg-muted"
                  }`}
                >
                  {s.name ?? `Option ${i + 1}`}
                </button>
              ))}
            </div>
          </div>
        )}

        {stream && <StreamCourses stream={stream} />}

        {/* Provenance, so a learner (or you) can check any line against
            the prospectus page it was read from. */}
        {stream && countCourses(stream) > 0 && detail?.source_doc && (
          <p className="text-[10px] text-muted-foreground">
            From the {detail.institution.toUpperCase()} {detail.academic_year}{" "}
            prospectus
            {stream.source_page ? `, p${stream.source_page}` : ""}.
            {detail.confidence === "verified" && (
              <Badge
                variant="secondary"
                className="ml-1.5 bg-green-100 text-green-700 border-none text-[9px]"
              >
                verified
              </Badge>
            )}
          </p>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}
