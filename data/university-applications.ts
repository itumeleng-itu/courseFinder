/**
 * When each university opens and closes undergraduate applications,
 * what it charges, and where to apply.
 *
 * Lifted out of the universities page component so it is not trapped
 * behind "use client": the chatbot answers closing-date questions from
 * this same table, and two copies would drift the moment one intake
 * changed.
 *
 * Hand-maintained from each institution's own admissions page. The
 * dates belong to one intake and do not expire on their own, which is
 * what cycleIsHistorical() in the universities page exists to detect.
 */

export type UniAppInfo = {
  open: string
  close: Record<string, string>
  fee: { local: string; international: string | null }
  link: string
}

export const appInfoMap: Record<string, UniAppInfo> = {
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
