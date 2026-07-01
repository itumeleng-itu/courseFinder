/**
 * Official PDF URLs for each university's prospectus/admission guide.
 * Last updated: 2026-06-30
 *
 * Update these URLs each year when new prospectuses are published.
 * Set to null if no PDF found — those universities are skipped.
 */
export const PROSPECTUS_URLS: Record<string, string | null> = {

  // ── 2027 Confirmed ──────────────────────────────────────────────────────────
  tut:          "https://www.tut.ac.za/media/tshwane-interim/site-content/documents/First-Year-Course_Information.pdf",
  up:           "https://drupalwebprod-files.up.ac.za/Public/2026-01/UP_UG%20Prospectus%202027_NSC-IEB_DevV5_web_0.pdf",
  ukzn:         "https://applications.ukzn.ac.za/wp-content/uploads/2026/05/2027-Undergrad.pdf",
  ufs:          "https://www.ufs.ac.za/docs/librariesprovider44/prospectus/ug-prospectus-2027.pdf",
  dut:          "https://www.dut.ac.za/wp-content/uploads/2026/06/Study-Opportunities-2027.pdf",
  ul:           "https://www.ul.ac.za/wp-content/uploads/2025/03/Undergraduate-Prospectus-2027.pdf",
  univen:       "https://www.univen.ac.za/wp-content/uploads/2026/03/2027-Univen-Undergraduate-Prospectus.pdf",
  wsu:          "https://wsu.ac.za/media/attachments/2026/05/27/2027-information-brochure-admission-requirements.pdf",
  vut:          "https://vut.ac.za/wp-content/uploads/2026/03/2027-Undergraduate-Minimum-Admission-Requirements.pdf",
  wits:         "https://www.wits.ac.za/media/wits-university/study/undergraduate/documents/2027-Guide-for-Undergrad-Applicants.pdf",
  uct:          "https://uct.ac.za/sites/default/files/media/documents/ug-directions-for-applicants-2027.pdf",
  stellenbosch: "https://files.su.ac.za/public/undergraduate-maties/documents/2026-01/su-admissions-booklet-2027.pdf", // image-scan PDF; text extraction may be limited
  uwc:          "https://assets.apply.org.za/u-files/Prospectuses/UWC2027.pdf", // unofficial aggregator; uwc.ac.za app guide has no course listings, this aggregator has full prospectus
  ufh:          "https://www.ufh.ac.za/study-guide-2027",

  // ── 2026 (Latest Available) ─────────────────────────────────────────────────
  rhodes:       "https://www.ru.ac.za/media/rhodesuniversity/content/registrar/documents/information/studentrecruitment/RU_READY_Undergraduate_Prospectus_2026_DIGITAL_A5_Landscape_24pp_18Mar2026.pdf",
  unizulu:      "https://www.unizulu.ac.za/wp-content/uploads/2026/01/2027-Brochure-for-undergraduate.pdf",
  spu:          "https://www.spu.ac.za/wp-content/uploads/2025/04/2026-Undergraduate-Prospectus.pdf",
  nmu:          "https://publications.mandela.ac.za/publications/media/Store/documents/Prospective%20students/2026-MandelaUni-Undergraduate-Guide.pdf",
  mut:          "https://assets.apply.org.za/u-files/Prospectuses/MUT2026.pdf", // unofficial aggregator; check mut.ac.za annually

  // ── Best Available (no year confirmed) ────────────────────────────────────
  ump:          "https://www.ump.ac.za/getattachment/Study-with-us/Application-Process/Online-Applications/Undergraduate-Programmes.pdf.aspx?lang=en-US",

  // ── 2027 via apply.org.za aggregator ────────────────────────────────────────
  nwu:          "https://assets.apply.org.za/u-files/Prospectuses/NWU2027.pdf", // unofficial aggregator; verify against studies.nwu.ac.za annually
  uj:           "https://assets.apply.org.za/u-files/Prospectuses/UJ2027.pdf",  // unofficial aggregator; verify against uj.ac.za annually
  cput:         "https://assets.apply.org.za/u-files/Prospectuses/CPUT2027.pdf", // unofficial aggregator (Issuu has no direct PDF); verify annually
  smu:          "https://assets.apply.org.za/u-files/Prospectuses/SMU2027.pdf", // unofficial aggregator; verify against smu.ac.za annually

  // ── No PDF Found (online-only or locked) — add URLs when available ───────────
  unisa:        null, // no single undergraduate prospectus PDF
  cut:          null, // no 2026/2027 PDF found; only 2018/2023 on site; check cut.ac.za/prospective-student annually
}
