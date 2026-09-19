import { Wrench } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { COURSE_DATA_MAINTENANCE } from "@/lib/maintenance"

interface MaintenanceNoticeProps {
  /** Defaults to the site-wide flag in lib/maintenance.ts. */
  active?: boolean
}

/**
 * Tells learners the course listings are still being rebuilt, so a missing or
 * short list of matches is not read as "you don't qualify for anything".
 * role="status" (polite) rather than the Alert default of "alert": this is
 * standing information, not something to interrupt a screen reader for.
 */
export function MaintenanceNotice({ active = COURSE_DATA_MAINTENANCE }: MaintenanceNoticeProps) {
  if (!active) return null

  return (
    <Alert
      role="status"
      className="border-amber-500/50 bg-amber-50 text-amber-950 dark:bg-amber-950/30 dark:text-amber-100 [&>svg]:text-amber-600"
    >
      <Wrench className="h-4 w-4" />
      <AlertTitle>Course data is under maintenance</AlertTitle>
      <AlertDescription>
        We&apos;re rebuilding and re-checking the course requirements for each university, so your results may be
        incomplete or temporarily unavailable. Please check the university&apos;s official website before you apply.
      </AlertDescription>
    </Alert>
  )
}
