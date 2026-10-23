import { appInfoMap, type UniAppInfo } from "@/data/university-applications"

/**
 * Reading the hand-maintained application dates.
 *
 * Shared between the universities list and a single university's
 * page. Two copies of "has this closed yet" would eventually
 * disagree, and the one a learner happened to land on would decide
 * whether they thought they could still apply.
 */

export type DateStatus = "closed" | "some-closed" | "closing-soon" | "open"

export function parseDateStr(dateStr: string): Date | null {
  const cleaned = dateStr.replace(/\s*\([^)]*\)/, "").trim()
  const d = new Date(cleaned)
  return isNaN(d.getTime()) ? null : d
}

export function getUniversityDateStatus(close: Record<string, string>): DateStatus {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dates = Object.values(close).map(parseDateStr).filter((d): d is Date => d !== null)
  if (dates.length === 0) return "open"
  const allPast = dates.every(d => d < today)
  if (allPast) return "closed"
  const somePast = dates.some(d => d < today)
  if (somePast) return "some-closed"
  const daysUntil = (Math.min(...dates.map(d => d.getTime())) - today.getTime()) / (1000 * 60 * 60 * 24)
  if (daysUntil <= 30) return "closing-soon"
  return "open"
}

/**
 * Whether an application-opening date is still ahead of us.
 *
 * Closing dates earn a "(Closed)" strikethrough when they pass, because a
 * learner needs to know the door shut. An opening date is different: once it
 * is behind us it carries no information at all, and "Opens: 1 March 2026"
 * shown in October 2026 actively misleads -- it reads as an upcoming date to
 * anyone skimming, and it is the university's PREVIOUS intake.
 *
 * So the row is rendered only for a date we can parse AND that is still to
 * come. An unparseable or missing date is also not shown: we cannot claim a
 * cycle is upcoming when we do not know that it is. The dates below are
 * maintained by hand, so they go stale every year; this keeps the page silent
 * rather than wrong until the new cycle's dates are filled in.
 */
/**
 * Whether the whole table belongs to an intake cycle that is over.
 *
 * A single university whose deadlines have all passed really is closed,
 * and "(Closed)" is the right thing to say. But these dates are typed in
 * by hand for one intake, and when that intake ends they do not expire --
 * they just sit there. Come early 2027 every card would read "Closed",
 * and the page would be telling matriculants that every university in
 * South Africa is shut, when the truth is only that next cycle's dates
 * have not been entered.
 *
 * The signal is the table as a whole: if not one closing date anywhere
 * across all 26 universities is still ahead, the data is stale rather
 * than the country being closed.
 */
export function cycleIsHistorical(info: Record<string, UniAppInfo> = appInfoMap): boolean {
    const dates = Object.values(info)
        .flatMap((i) => Object.values(i.close))
        .map(parseDateStr)
        .filter((d): d is Date => d !== null)
    if (!dates.length) return false
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return dates.every((d) => d < today)
}


export function isOpeningDateUpcoming(dateStr: string | undefined | null): boolean {
  if (!dateStr) return false
  const d = parseDateStr(dateStr)
  if (!d) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return d >= today
}

export function getDateLineStatus(dateStr: string): "past" | "soon" | "open" {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const d = parseDateStr(dateStr)
  if (!d) return "open"
  if (d < today) return "past"
  if ((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24) <= 30) return "soon"
  return "open"
}

