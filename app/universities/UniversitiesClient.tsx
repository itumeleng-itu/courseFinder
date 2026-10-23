"use client"

import React from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, CreditCard, ExternalLink, Globe, AlertCircle, Clock, CheckCircle2 } from "lucide-react"
import { RequiredDocumentsModal } from "@/components/universities/required-documents-modal"
import type { CampusOffering } from "@/lib/campuses"
import { CampusList } from "@/components/universities/campus-list"
import { appInfoMap, type UniAppInfo } from "@/data/university-applications"

export type UniData = {
  id: string
  name: string
  shortName: string
  logo?: string
  website?: string
  city: string
  province: string
  courseCount: number
  locationString: string
  /** Derived from the programme bundle on the server, so the 1MB
   * dataset is not shipped to the browser just to list campuses. */
  campuses?: CampusOffering[]
}

type DateStatus = "closed" | "some-closed" | "closing-soon" | "open"

function parseDateStr(dateStr: string): Date | null {
  const cleaned = dateStr.replace(/\s*\([^)]*\)/, "").trim()
  const d = new Date(cleaned)
  return isNaN(d.getTime()) ? null : d
}

function getUniversityDateStatus(close: Record<string, string>): DateStatus {
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

function getDateLineStatus(dateStr: string): "past" | "soon" | "open" {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const d = parseDateStr(dateStr)
  if (!d) return "open"
  if (d < today) return "past"
  if ((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24) <= 30) return "soon"
  return "open"
}

const logoMap: Record<string, string> = {
  uct: "/logos/University_of_Cape_Town-logo.webp",
  tut: "/logos/Tshwane_University_of_Technology-logo.webp",
  spu: "/logos/Sol_Plaatje_University-logo.webp",
  smu: "/logos/Sefako_Makgatho_University-logo.webp",
  ru: "/logos/Rhodes_University-logo.webp",
  nwu: "/logos/North_West_University-logo.webp",
  nmu: "/logos/Nelson_Mandela_University-logo.webp",
  mut: "/logos/Mangosuthu_University_of_Technology-logo.webp",
  dut: "/logos/Durban_University_of_Technology-logo.webp",
  cut: "/logos/Central_University_of_Technology_logo.webp",
  cput: "/logos/Cape_Peninsula_University_of_Technology-logo.webp",
  ump: "/logos/University_of_Mpumalanga-logo.webp",
  ul: "/logos/University_of_Limpopo-logo.webp",
  ukzn: "/logos/University_of_KwaZulu_Natal-logo.webp",
  uj: "/logos/University_of_Johannesburg-logo.webp",
  ufh: "/logos/University_of_Fort_Hare-logo.webp",
  su: "/logos/University_of_Stellenbosch-logo.webp",
  unisa: "/logos/University_of_South_Africa-logo.webp",
  up: "/logos/University_of_Pretoria-logo.webp",
  ufs: "/logos/University_of_the_Free_State-logo.webp",
  uwc: "/logos/University_of_the_Western_Cape-logo.webp",
  wsu: "/logos/Walter_Sisulu_University-logo.webp",
  vut: "/logos/Vaal_University_of_Technology-logo.webp",
  unizulu: "/logos/University_of_Zululand-logo.webp",
  wits: "/logos/University_of_Witwatersrand_logo.webp",
  univen: "/logos/University_of_Venda-logo.webp",
}


export default function UniversitiesClient({ universities }: { universities: UniData[] }) {
  const stale = cycleIsHistorical()
  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">South African Universities</h1>
          <p className="text-muted-foreground text-lg">Browse application dates, fees, and locations for all 26 public universities.</p>
        </div>
        <RequiredDocumentsModal />
      </div>

      {stale && (
        <div
          role="status"
          className="rounded-md border border-amber-500/50 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:bg-amber-950/30 dark:text-amber-100"
        >
          <span className="font-medium">These are last intake&apos;s dates.</span>{" "}
          Every application window listed below has closed, which means the next
          cycle&apos;s dates have not been published here yet — not that applications
          are shut everywhere. Check each university&apos;s own site for the current
          dates.
        </div>
      )}

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {universities.map((uni) => {
          const appInfo = appInfoMap[uni.id]
          const logoUrl = logoMap[uni.id] || uni.logo
          const dateStatus = appInfo ? getUniversityDateStatus(appInfo.close) : "open"
          // A "Closed" badge on every card is the page asserting
          // something it cannot know once the cycle is over.
          const showStatus = !stale

          const statusBadge = {
            closed: (
              <Badge variant="destructive" className="flex items-center gap-1 text-xs">
                <AlertCircle className="w-3 h-3" /> Closed
              </Badge>
            ),
            "some-closed": (
              <Badge className="flex items-center gap-1 text-xs bg-orange-500 hover:bg-orange-600 text-white">
                <AlertCircle className="w-3 h-3" /> Some Closed
              </Badge>
            ),
            "closing-soon": (
              <Badge className="flex items-center gap-1 text-xs bg-amber-500 hover:bg-amber-600 text-white">
                <Clock className="w-3 h-3" /> Closing Soon
              </Badge>
            ),
            open: (
              <Badge className="flex items-center gap-1 text-xs bg-green-600 hover:bg-green-700 text-white">
                <CheckCircle2 className="w-3 h-3" /> Open
              </Badge>
            ),
          }[dateStatus]

          return (
            <Card key={uni.id} className="flex flex-col hover:border-primary/50 transition-colors duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-4">
                  {logoUrl ? (
                    <div className="h-16 w-16 bg-white rounded-xl flex items-center justify-center border shadow-sm shrink-0 p-1.5">
                      <img
                        src={logoUrl}
                        alt={`${uni.shortName} logo`}
                        className="object-contain w-full h-full"
                        onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = "none" }}
                      />
                    </div>
                  ) : (
                    <div className="h-16 w-16 bg-muted rounded-xl flex items-center justify-center border shrink-0">
                      <span className="text-lg font-bold text-muted-foreground">{uni.shortName.slice(0, 2)}</span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <h3 className="text-lg font-bold leading-tight">{uni.shortName}</h3>
                      {showStatus && statusBadge}
                    </div>
                    <p className="text-sm text-muted-foreground leading-snug">{uni.name}</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-1.5">
                      <MapPin className="w-3 h-3 mr-1 shrink-0" />
                      {uni.locationString}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-grow space-y-3 pb-3">
                {isOpeningDateUpcoming(appInfo?.open) && (
                  <div className="flex items-center text-sm text-primary font-medium bg-primary/10 dark:bg-primary/20 px-3 py-2 rounded-md">
                    <Calendar className="w-4 h-4 mr-2 shrink-0" />
                    Opens: {appInfo!.open}
                  </div>
                )}

                {appInfo && (
                  <div className="rounded-md border bg-muted/30 p-3 space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {stale ? "Closing Dates (last intake)" : "Closing Dates"}
                    </p>
                    {Object.entries(appInfo.close).map(([faculty, date], idx) => {
                      const s = stale ? "open" : getDateLineStatus(date)
                      return (
                        <div key={idx} className="flex items-start justify-between gap-3 text-sm">
                          <span className="text-muted-foreground text-xs leading-relaxed">{faculty}</span>
                          <span className={`text-xs font-medium shrink-0 text-right ${
                            s === "past" ? "line-through text-destructive opacity-70" :
                            s === "soon" ? "text-amber-600 dark:text-amber-400" :
                            "text-foreground"
                          }`}>
                            {date}
                            {s === "past" && <span className="block not-italic text-destructive no-underline">(Closed)</span>}
                            {s === "soon" && <span className="block text-amber-600 dark:text-amber-400">(Soon)</span>}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )}

                <CampusList campuses={uni.campuses ?? []} />

                {appInfo && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                    <CreditCard className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      <span className="font-medium">Application fee:</span>{" "}
                      {appInfo.fee.local}
                      {appInfo.fee.international && ` (Local) / ${appInfo.fee.international} (Intl)`}
                    </span>
                  </div>
                )}
              </CardContent>

              <CardFooter className="pt-0 mt-auto">
                {appInfo?.link ? (
                  <Button asChild className="w-full" size="sm">
                    <a href={appInfo.link} target="_blank" rel="noreferrer">
                      Apply Online <ExternalLink className="w-3.5 h-3.5 ml-2" />
                    </a>
                  </Button>
                ) : uni.website ? (
                  <Button asChild variant="outline" className="w-full" size="sm">
                    <a href={uni.website} target="_blank" rel="noreferrer">
                      Visit Website <Globe className="w-3.5 h-3.5 ml-2" />
                    </a>
                  </Button>
                ) : null}
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
