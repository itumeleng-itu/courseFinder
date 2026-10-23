import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Building2, Calendar, CreditCard, ExternalLink, Globe, MapPin, Monitor } from "lucide-react"

import { getAllUniversityInstances } from "@/data/universities"
import { appInfoMap } from "@/data/university-applications"
import { institutionCampusDetail, institutionOnlineOffering } from "@/lib/campuses"
import { cycleIsHistorical, getDateLineStatus, isOpeningDateUpcoming } from "@/lib/application-dates"
import { DashboardSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Chatbot } from "@/components/chatbot"

/**
 * One university, in full.
 *
 * The list page can only afford two campuses per card before
 * twenty-six of them become unreadable, and it used to hide the rest
 * behind "Show 8 more" — an in-card expander that pushed every card
 * below it down the page and still had nowhere to put the 69
 * programmes taught on TUT's Pretoria campus. This is where that
 * detail belongs.
 */

type Params = { params: Promise<{ id: string }> }

function universityById(id: string) {
  return getAllUniversityInstances().find((u) => u.id === id) ?? null
}

export function generateStaticParams() {
  return getAllUniversityInstances().map((u) => ({ id: u.id }))
}

export async function generateMetadata({ params }: Params) {
  const { id } = await params
  const uni = universityById(id)
  if (!uni) return { title: "University not found | CourseFinder" }
  return {
    title: `${uni.shortName} — campuses and application dates | CourseFinder`,
    description: `Campuses, faculties and 2027 application dates for ${uni.name}.`,
  }
}

export default async function UniversityPage({ params }: Params) {
  const { id } = await params
  const uni = universityById(id)
  if (!uni) notFound()

  const appInfo = appInfoMap[uni.id]
  const campuses = institutionCampusDetail(uni.id)
  // Not a campus. Both TUT and UJ record online delivery in their
  // campus column, so it has its own section below rather than a card
  // among the places a learner could move to.
  const online = institutionOnlineOffering(uni.id)
  const stale = cycleIsHistorical()
  const location = [uni.location?.city, uni.location?.province].filter(Boolean).join(", ")

  return (
    <>
      <DashboardSidebar />
      <SidebarInset>
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl">
          <Link
            href="/universities"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All universities
          </Link>

          <div className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight">{uni.name}</h1>
              {location && (
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground mt-2">
                  <MapPin className="w-4 h-4 shrink-0" />
                  {location}
                </p>
              )}
            </div>
          </div>

          {appInfo && (
            <Card>
              <CardHeader className="pb-3">
                <h2 className="font-semibold">Applications</h2>
              </CardHeader>
              <CardContent className="space-y-3">
                {isOpeningDateUpcoming(appInfo.open) && (
                  <p className="flex items-center gap-2 text-sm text-primary font-medium">
                    <Calendar className="w-4 h-4 shrink-0" />
                    Opens: {appInfo.open}
                  </p>
                )}

                <div className="space-y-1.5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {stale ? "Closing dates (last intake)" : "Closing dates"}
                  </p>
                  {Object.entries(appInfo.close).map(([faculty, date]) => {
                    const status = stale ? "open" : getDateLineStatus(date)
                    return (
                      <div key={faculty} className="flex items-start justify-between gap-4 text-sm">
                        <span className="text-muted-foreground">{faculty}</span>
                        <span
                          className={
                            status === "past"
                              ? "line-through text-destructive opacity-70 shrink-0"
                              : status === "soon"
                                ? "text-amber-600 dark:text-amber-400 shrink-0"
                                : "shrink-0"
                          }
                        >
                          {date}
                        </span>
                      </div>
                    )
                  })}
                  {stale && (
                    <p role="status" className="text-xs text-muted-foreground pt-1">
                      These are the last intake&apos;s dates. The next cycle has not been
                      published here yet — check the university&apos;s own page.
                    </p>
                  )}
                </div>

                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CreditCard className="w-4 h-4 shrink-0" />
                  Application fee: {appInfo.fee.local}
                  {appInfo.fee.international && ` (local) / ${appInfo.fee.international} (international)`}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  <Button asChild size="sm">
                    <a href={appInfo.link} target="_blank" rel="noreferrer">
                      Apply online <ExternalLink className="w-3.5 h-3.5 ml-2" />
                    </a>
                  </Button>
                  {uni.website && (
                    <Button asChild size="sm" variant="outline">
                      <a href={uni.website} target="_blank" rel="noreferrer">
                        University website <Globe className="w-3.5 h-3.5 ml-2" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <section className="space-y-4">
            <h2 className="font-semibold">
              {campuses.length === 0
                ? "Campuses"
                : `Campuses (${campuses.length})`}
            </h2>

            {campuses.length === 0 ? (
              // Said plainly rather than left blank. Several
              // institutions have no programme data behind them yet,
              // and Wits ships programmes carrying no campus at all.
              <p className="text-sm text-muted-foreground">
                We have not recorded campus information for {uni.shortName} yet. The
                university&apos;s own website lists its campuses and what each one offers.
              </p>
            ) : (
              campuses.map((campus) => (
                <Card key={campus.name}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="flex items-center gap-2 font-semibold">
                        <Building2 className="w-4 h-4 shrink-0 text-muted-foreground" />
                        {campus.name}
                      </h3>
                      <span className="text-sm text-muted-foreground shrink-0">
                        {campus.programmeCount}{" "}
                        {campus.programmeCount === 1 ? "programme" : "programmes"}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground pt-1">
                      {campus.faculties.map((f) => `${f.name} (${f.count})`).join(" · ")}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid gap-x-6 gap-y-1 sm:grid-cols-2 text-sm">
                      {campus.programmes.map((programme) => (
                        <li key={programme.code} className="text-muted-foreground">
                          {programme.name}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))
            )}
          </section>

          {online && online.programmeCount > 0 && (
            <section className="space-y-4">
              <h2 className="font-semibold">Studied online</h2>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="flex items-center gap-2 font-semibold">
                      <Monitor className="w-4 h-4 shrink-0 text-muted-foreground" />
                      No campus attendance
                    </h3>
                    <span className="text-sm text-muted-foreground shrink-0">
                      {online.programmeCount}{" "}
                      {online.programmeCount === 1 ? "programme" : "programmes"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground pt-1">
                    {online.faculties.map((f) => `${f.name} (${f.count})`).join(" · ")}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-x-6 gap-y-1 sm:grid-cols-2 text-sm">
                    {online.programmes.map((programme) => (
                      <li key={programme.code} className="text-muted-foreground">
                        {programme.name}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>
          )}
        </div>
      </SidebarInset>
      <Chatbot />
    </>
  )
}
