"use client"

import React from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, CreditCard, ExternalLink, Globe, AlertCircle, Clock, CheckCircle2 } from "lucide-react"
import { RequiredDocumentsModal } from "@/components/universities/required-documents-modal"

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

type UniAppInfo = {
  open: string
  close: Record<string, string>
  fee: { local: string; international: string | null }
  link: string
}

const appInfoMap: Record<string, UniAppInfo> = {
  nmu: { open: "1 April 2026", close: { "Health Sciences": "30 June 2026", "All other Faculties": "30 September 2026" }, fee: { local: "Free (online)", international: "R500" }, link: "https://www.mandela.ac.za/Study-at-Mandela/Application/Academic-admission" },
  ru: { open: "1 April 2026", close: { "All programmes": "30 September 2026" }, fee: { local: "R100", international: null }, link: "https://www.ru.ac.za/admissiongateway/" },
  ufh: { open: "1 April 2026", close: { "All programmes": "30 September 2026" }, fee: { local: "Free (online)", international: "R500" }, link: "https://www.ufh.ac.za/apply/" },
  wsu: { open: "1 April 2026", close: { "Health Sciences": "30 September 2026", "All other Faculties": "31 October 2026" }, fee: { local: "Free (online)", international: null }, link: "https://applications.wsu.ac.za/" },
  cut: { open: "1 April 2026", close: { "All programmes": "30 September 2026" }, fee: { local: "Free (online)", international: null }, link: "https://www.cut.ac.za/application-process" },
  ufs: { open: "1 April 2026", close: { "Health Sciences": "31 May 2026", "Architecture, Social Work, Nursing": "31 July 2026", "Other programmes": "30 September 2026" }, fee: { local: "Free (online)", international: null }, link: "https://apply.ufs.ac.za/Application/Start" },
  smu: { open: "1 April 2026", close: { "All programmes": "31 July 2026" }, fee: { local: "R300", international: null }, link: "https://www.smu.ac.za/students/apply/online-application/" },
  tut: { open: "1 April 2026", close: { "Arts, Agric, Ed, Health, Humanities": "31 July 2026", "All other applications": "30 September 2026" }, fee: { local: "R250", international: null }, link: "https://applications-prod.tut.ac.za/" },
  uj: { open: "1 April 2026", close: { "All programmes": "31 October 2026 (12:00)" }, fee: { local: "Free (online)", international: null }, link: "https://www.uj.ac.za/admission-aid/undergraduate/" },
  up: { open: "1 April 2026", close: { "Veterinary Science": "31 May 2026", "All other programmes": "30 June 2026" }, fee: { local: "R300", international: null }, link: "https://www.up.ac.za/online-application" },
  wits: { open: "1 March 2026", close: { "Health Sci, Architecture, Audiology, Film/TV": "30 June 2026", "All other programmes": "30 September 2026" }, fee: { local: "R100", international: "R700" }, link: "https://www.wits.ac.za/undergraduate/apply-to-wits/" },
  vut: { open: "1 April 2026", close: { "All programmes": "30 September 2026" }, fee: { local: "R250", international: null }, link: "https://www.vut.ac.za/apply-to-vut/" },
  dut: { open: "1 March 2026", close: { "Faculty of Arts, Health Science": "31 July 2026", "All other applications": "30 September 2026" }, fee: { local: "R250", international: "R300" }, link: "http://www.cao.ac.za" },
  mut: { open: "1 March 2026", close: { "All programmes": "30 September 2026" }, fee: { local: "R250", international: "R300" }, link: "http://www.cao.ac.za" },
  ukzn: { open: "1 March 2026", close: { "Medicine (MBChB)": "30 June 2026", "All other courses": "30 September 2026" }, fee: { local: "R250", international: "R300" }, link: "http://www.cao.ac.za" },
  unizulu: { open: "1 April 2026", close: { "Health Sciences, Social Work": "30 August 2026", "Nursing and other programmes": "30 September 2026" }, fee: { local: "R250", international: "R300" }, link: "http://www.cao.ac.za" },
  ul: { open: "1 April 2026", close: { "MBChB programme": "20 June 2026", "All other programmes": "30 September 2026" }, fee: { local: "R200", international: "R750" }, link: "https://www.ul.ac.za/admissions/undergraduate-studies/" },
  univen: { open: "1 May 2026", close: { "All programmes": "25 September 2026" }, fee: { local: "Free (online)", international: null }, link: "https://www.univen.ac.za/students/student-support-services/how-to-apply/apply-online/" },
  ump: { open: "1 June 2026", close: { "All programmes": "30 November 2026" }, fee: { local: "R200", international: "R550" }, link: "https://www.ump.ac.za/Study-with-us/Application-Process/Online-Applications" },
  nwu: { open: "1 April 2026", close: { "Health Sciences": "30 June 2026", "All other Faculties": "31 August 2026" }, fee: { local: "Free (online)", international: "R600" }, link: "https://applynow.nwu.ac.za/OnlineApplication/" },
  spu: { open: "1 April 2026", close: { "All programmes": "30 September 2026" }, fee: { local: "R100", international: null }, link: "https://www.spu.ac.za/index.php/how-to-apply/" },
  cput: { open: "1 April 2026", close: { "All applications": "31 August 2026", "Late applications": "30 September 2026" }, fee: { local: "Free (online)", international: null }, link: "https://www.cput.ac.za/study" },
  uct: { open: "1 April 2026", close: { "All programmes": "31 July 2026" }, fee: { local: "R100", international: "R300" }, link: "https://uct.ac.za/students/applications-apply-undergraduate-qualifications/application-procedure" },
  su: { open: "1 April 2026", close: { "All programmes": "31 July 2026" }, fee: { local: "R100", international: "R400" }, link: "https://www.su.ac.za/en/apply/undergrad" },
  uwc: { open: "1 May 2026", close: { "All programmes": "30 September 2026" }, fee: { local: "Free (online)", international: null }, link: "https://www.uwc.ac.za/admission-and-financial-aid/apply/undergraduate-applications" },
  unisa: { open: "1 August 2026", close: { "All programmes": "10 October 2026" }, fee: { local: "R120", international: null }, link: "https://www.unisa.ac.za/sites/corporate/default/Apply-for-admission/Undergraduate-qualifications" },
}

export default function UniversitiesClient({ universities }: { universities: UniData[] }) {
  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">South African Universities</h1>
          <p className="text-muted-foreground text-lg">Browse application dates, fees, and locations for all 26 public universities.</p>
        </div>
        <RequiredDocumentsModal />
      </div>

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {universities.map((uni) => {
          const appInfo = appInfoMap[uni.id]
          const logoUrl = logoMap[uni.id] || uni.logo
          const dateStatus = appInfo ? getUniversityDateStatus(appInfo.close) : "open"

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
                      {statusBadge}
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
                <div className="flex items-center text-sm text-primary font-medium bg-primary/10 dark:bg-primary/20 px-3 py-2 rounded-md">
                  <Calendar className="w-4 h-4 mr-2 shrink-0" />
                  Opens: {appInfo?.open ?? "1 April 2026"}
                </div>

                {appInfo && (
                  <div className="rounded-md border bg-muted/30 p-3 space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Closing Dates</p>
                    {Object.entries(appInfo.close).map(([faculty, date], idx) => {
                      const s = getDateLineStatus(date)
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
