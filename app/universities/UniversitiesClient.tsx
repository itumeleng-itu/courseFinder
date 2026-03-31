"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Globe, Calendar, Info, CreditCard, ExternalLink, GraduationCap } from "lucide-react"
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

export default function UniversitiesClient({ universities }: { universities: UniData[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const getLogo = (id: string) => {
    const logoMap: Record<string, string> = {
      "uct": "/logos/University_of_Cape_Town-logo.webp",
      "tut": "/logos/Tshwane_University_of_Technology-logo.webp",
      "spu": "/logos/Sol_Plaatje_University-logo.webp",
      "smu": "/logos/Sefako_Makgatho_University-logo.webp",
      "ru": "/logos/Rhodes_University-logo.webp",
      "nwu": "/logos/North_West_University-logo.webp",
      "nmu": "/logos/Nelson_Mandela_University-logo.webp",
      "mut": "/logos/Mangosuthu_University_of_Technology-logo.webp",
      "dut": "/logos/Durban_University_of_Technology-logo.webp",
      "cut": "/logos/Central_University_of_Technology_logo.webp",
      "cput": "/logos/Cape_Peninsula_University_of_Technology-logo.webp",
      "ump": "/logos/University_of_Mpumalanga-logo.webp",
      "ul": "/logos/University_of_Limpopo-logo.webp",
      "ukzn": "/logos/University_of_KwaZulu_Natal-logo.webp",
      "uj": "/logos/University_of_Johannesburg-logo.webp",
      "ufh": "/logos/University_of_Fort_Hare-logo.webp",
      "su": "/logos/University_of_Stellenbosch-logo.webp",
      "unisa": "/logos/University_of_South_Africa-logo.webp",
      "up": "/logos/University_of_Pretoria-logo.webp",
      "ufs": "/logos/University_of_the_Free_State-logo.webp",
      "uwc": "/logos/University_of_the_Western_Cape-logo.webp",
      "wsu": "/logos/Walter_Sisulu_University-logo.webp",
      "vut": "/logos/Vaal_University_of_Technology-logo.webp",
      "unizulu": "/logos/University_of_Zululand-logo.webp",
      "wits": "/logos/University_of_Witwatersrand_logo.webp",
      "univen": "/logos/University_of_Venda-logo.webp"
    }
    return logoMap[id] || undefined
  }

  type UniAppInfo = {
    open: string;
    close: Record<string, string>;
    fee: { local: string, international: string | null };
    link: string;
  }

  const getUniAppInfo = (id: string): UniAppInfo | undefined => {
    const infoMap: Record<string, UniAppInfo> = {
      "nmu": { open: "1 April 2026", close: { "Health Sciences": "30 June 2026", "All other Faculties": "30 September 2026" }, fee: { local: "Free (online)", international: "R500" }, link: "https://www.mandela.ac.za/Study-at-Mandela/Application/Academic-admission" },
      "ru": { open: "1 April 2026", close: { "All programmes": "30 September 2026" }, fee: { local: "R100", international: null }, link: "https://www.ru.ac.za/admissiongateway/" },
      "ufh": { open: "1 April 2026", close: { "All programmes": "30 September 2026" }, fee: { local: "Free (online)", international: "R500" }, link: "https://www.ufh.ac.za/apply/" },
      "wsu": { open: "1 April 2026", close: { "Health Sciences": "30 September 2026", "All other Faculties": "31 October 2026" }, fee: { local: "Free (online)", international: null }, link: "https://applications.wsu.ac.za/" },
      "cut": { open: "1 April 2026", close: { "All programmes": "30 September 2026" }, fee: { local: "Free (online)", international: null }, link: "https://www.cut.ac.za/application-process" },
      "ufs": { open: "1 April 2026", close: { "Health Sciences": "31 May 2026", "Architecture, Social Work, Nursing": "31 July 2026", "Other programmes": "30 September 2026" }, fee: { local: "Free (online)", international: null }, link: "https://apply.ufs.ac.za/Application/Start" },
      "smu": { open: "1 April 2026", close: { "All programmes": "31 July 2026" }, fee: { local: "R300", international: null }, link: "https://www.smu.ac.za/students/apply/online-application/" },
      "tut": { open: "1 April 2026", close: { "Arts, Agric, Ed, Health, Humanities": "31 July 2026", "All other applications": "30 September 2026" }, fee: { local: "R250", international: null }, link: "https://applications-prod.tut.ac.za/" },
      "uj": { open: "1 April 2026", close: { "All programmes": "31 October 2026 (12:00)" }, fee: { local: "Free (online)", international: null }, link: "https://www.uj.ac.za/admission-aid/undergraduate/" },
      "up": { open: "1 April 2026", close: { "Veterinary Science": "31 May 2026", "All other programmes": "30 June 2026" }, fee: { local: "R300", international: null }, link: "https://www.up.ac.za/online-application" },
      "wits": { open: "1 March 2026", close: { "Health Sci, Architecture, Audiology, Film/TV": "30 June 2026", "All other programmes": "30 September 2026" }, fee: { local: "R100", international: "R700" }, link: "https://www.wits.ac.za/undergraduate/apply-to-wits/" },
      "vut": { open: "1 April 2026", close: { "All programmes": "30 September 2026" }, fee: { local: "R250", international: null }, link: "https://www.vut.ac.za/apply-to-vut/" },
      "dut": { open: "1 March 2026", close: { "Faculty of Arts, Health Science": "31 July 2026", "All other applications": "30 September 2026" }, fee: { local: "R250", international: "R300" }, link: "http://www.cao.ac.za" },
      "mut": { open: "1 March 2026", close: { "All programmes": "30 September 2026" }, fee: { local: "R250", international: "R300" }, link: "http://www.cao.ac.za" },
      "ukzn": { open: "1 March 2026", close: { "Medicine (MBChB)": "30 June 2026", "All other courses": "30 September 2026" }, fee: { local: "R250", international: "R300" }, link: "http://www.cao.ac.za" },
      "unizulu": { open: "1 April 2026", close: { "Health Sciences, Social Work": "30 August 2026", "Nursing and other programmes": "30 September 2026" }, fee: { local: "R250", international: "R300" }, link: "http://www.cao.ac.za" },
      "ul": { open: "1 April 2026", close: { "MBChB programme": "20 June 2026", "All other programmes": "30 September 2026" }, fee: { local: "R200", international: "R750" }, link: "https://www.ul.ac.za/admissions/undergraduate-studies/" },
      "univen": { open: "1 May 2026", close: { "All programmes": "25 September 2026" }, fee: { local: "Free (online)", international: null }, link: "https://www.univen.ac.za/students/student-support-services/how-to-apply/apply-online/" },
      "ump": { open: "1 June 2026", close: { "All programmes": "30 November 2026" }, fee: { local: "R200", international: "R550" }, link: "https://www.ump.ac.za/Study-with-us/Application-Process/Online-Applications" },
      "nwu": { open: "1 April 2026", close: { "Health Sciences": "30 June 2026", "All other Faculties": "31 August 2026" }, fee: { local: "Free (online)", international: "R600" }, link: "https://applynow.nwu.ac.za/OnlineApplication/" },
      "spu": { open: "1 April 2026", close: { "All programmes": "30 September 2026" }, fee: { local: "R100", international: null }, link: "https://www.spu.ac.za/index.php/how-to-apply/" },
      "cput": { open: "1 April 2026", close: { "All applications": "31 August 2026", "Late applications": "30 September 2026" }, fee: { local: "Free (online)", international: null }, link: "https://www.cput.ac.za/study" },
      "uct": { open: "1 April 2026", close: { "All programmes": "31 July 2026" }, fee: { local: "R100", international: "R300" }, link: "https://uct.ac.za/students/applications-apply-undergraduate-qualifications/application-procedure" },
      "su": { open: "1 April 2026", close: { "All programmes": "31 July 2026" }, fee: { local: "R100", international: "R400" }, link: "https://www.su.ac.za/en/apply/undergrad" },
      "uwc": { open: "1 May 2026", close: { "All programmes": "30 September 2026" }, fee: { local: "Free (online)", international: null }, link: "https://www.uwc.ac.za/admission-and-financial-aid/apply/undergraduate-applications" },
      "unisa": { open: "1 August 2026", close: { "All programmes": "10 October 2026" }, fee: { local: "R120", international: null }, link: "https://www.unisa.ac.za/sites/corporate/default/Apply-for-admission/Undergraduate-qualifications" }
    };
    return infoMap[id];
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">South African Universities</h1>
          <p className="text-muted-foreground text-lg">Browse application dates, overviews, and locations for public universities.</p>
        </div>
        <RequiredDocumentsModal />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {universities.map((uni) => {
          const appInfo = getUniAppInfo(uni.id)
          const logoUrl = getLogo(uni.id) || uni.logo
          const isExpanded = expandedId === uni.id

          return (
            <Card 
              key={uni.id} 
              className={`transition-all duration-300 flex flex-col ${isExpanded ? "ring-2 ring-primary shadow-lg scale-[1.02] dark:bg-card dark:ring-primary/50" : "hover:border-primary/50"}`}
            >
              <CardHeader className="pb-3 flex-none">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <CardTitle className="text-xl">{uni.shortName}</CardTitle>
                    <CardDescription className="text-sm mt-1 line-clamp-2" title={uni.name}>{uni.name}</CardDescription>
                  </div>
                  {logoUrl && (
                    <div className="h-12 w-12 bg-white rounded-md flex px-1 py-1 shrink-0 items-center justify-center border shadow-sm">
                      <img 
                        src={logoUrl} 
                        alt={uni.shortName} 
                        className="object-contain w-full h-full" 
                        onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                      />
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="flex-grow flex flex-col">
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-primary font-medium bg-primary/10 dark:bg-primary/20 p-2.5 rounded-md">
                    <Calendar className="w-4 h-4 mr-2 shrink-0" />
                    <span className="truncate">Opens: {appInfo ? appInfo.open : "1 April 2026"}</span>
                  </div>
                  
                  {isExpanded && (
                    <div className="pt-2 border-t space-y-4 animate-in slide-in-from-top-2 fade-in duration-300">
                      
                      {appInfo && (
                        <div className="space-y-3">
                          <div className="bg-muted/30 p-3 rounded-md border text-sm space-y-2">
                            <p className="font-semibold flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Closing Dates:</p>
                            <ul className="space-y-1.5 ml-5 list-disc text-muted-foreground">
                              {Object.entries(appInfo.close).map(([faculty, date], idx) => (
                                <li key={idx}><span className="font-medium text-foreground">{faculty}:</span> {date}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex flex-col gap-2 pt-1">
                            <div className="flex items-start text-sm">
                              <CreditCard className="w-4 h-4 mr-2 mt-0.5 text-muted-foreground shrink-0" />
                              <div className="flex flex-col">
                                <span className="font-medium">Application Fee:</span>
                                <span className="text-muted-foreground">{appInfo.fee.local} (Local) {appInfo.fee.international && ` / ${appInfo.fee.international} (Intl)`}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                       <div className="flex items-start text-sm pt-1">
                        <MapPin className="w-4 h-4 mr-2 mt-0.5 text-muted-foreground shrink-0" />
                        <span>{uni.locationString}</span>
                      </div>

                      {appInfo?.link ? (
                        <div className="flex items-center text-sm pt-1 pb-1">
                          <ExternalLink className="w-4 h-4 mr-2 text-muted-foreground shrink-0" />
                          <a href={appInfo.link} target="_blank" rel="noreferrer" className="text-primary font-medium hover:underline truncate">
                            Apply Online Now
                          </a>
                        </div>
                      ) : uni.website ? (
                        <div className="flex items-center text-sm pt-1 pb-1">
                          <Globe className="w-4 h-4 mr-2 text-muted-foreground shrink-0" />
                          <a href={uni.website} target="_blank" rel="noreferrer" className="text-primary hover:underline truncate">
                            {uni.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                          </a>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="pt-0 mt-auto">
                <Button 
                  variant={isExpanded ? "secondary" : "outline"} 
                  className="w-full flex items-center justify-center" 
                  onClick={() => setExpandedId(isExpanded ? null : uni.id)}
                >
                  <Info className="w-4 h-4 mr-2 shrink-0" />
                  <span className="truncate">{isExpanded ? "Hide Details" : "View Details"}</span>
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
