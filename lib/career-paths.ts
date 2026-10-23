/**
 * What a qualification leads to.
 *
 * TUT publishes career outcomes per programme and those 109 records
 * carry them verbatim in `career_text`; they are always preferred,
 * because they are the institution's own words about its own
 * qualification. The other 319 programmes ship none, so this fills
 * the gap by field.
 *
 * Two tiers, specific first:
 *
 *   FIELD_CAREERS   matched on the programme name. "BSc Computer
 *                   Science" and "BSc Sport Science" share a faculty
 *                   and almost nothing else, so faculty alone is too
 *                   coarse to answer with.
 *   FACULTY_CAREERS matched on the faculty, for anything the name
 *                   patterns miss.
 *
 * These are the careers the field leads to, not a promise about one
 * institution's graduates, and `source` says which kind of answer the
 * caller is holding so the UI can attribute it honestly.
 */

export type CareerAnswer = {
  careers: string[]
  /** "institution" when the source published it, "field" when it is ours. */
  source: "institution" | "field"
  /** Present only for institution text: exactly what they printed. */
  published?: string
}

type Rule = { match: RegExp; careers: string[] }

/**
 * Matched in order, so put the specific before the general: "Chemical
 * Engineering" must be tested before the bare "Chemistry" rule.
 */
const FIELD_CAREERS: Rule[] = [
  {
    match: /chemical engineering|beng \(chemical\)/i,
    careers: ["Process engineer", "Plant or production engineer", "Petrochemical and refining", "Water treatment", "Pharmaceutical manufacturing", "Minerals processing"],
  },
  {
    match: /civil engineering|beng \(civil\)/i,
    careers: ["Structural engineer", "Water and sanitation engineer", "Transport and roads engineer", "Construction project manager", "Municipal infrastructure", "Consulting engineer"],
  },
  {
    match: /electrical|electronic/i,
    careers: ["Electrical engineer", "Power systems and grid engineer", "Electronics and embedded systems", "Telecommunications", "Control and automation", "Renewable energy"],
  },
  {
    match: /mechanical|mechatronic/i,
    careers: ["Mechanical engineer", "Design engineer", "Manufacturing and production", "Maintenance and reliability engineer", "Robotics and automation", "Automotive and aerospace"],
  },
  {
    match: /industrial engineering|beng \(industrial\)/i,
    careers: ["Industrial engineer", "Operations and supply chain analyst", "Quality assurance", "Process improvement", "Logistics planning"],
  },
  {
    match: /mining|metallurg/i,
    careers: ["Mining engineer", "Metallurgist", "Mine planning", "Minerals processing", "Mine health and safety"],
  },
  {
    match: /computer science|informatics|information technology|software|computing|data science/i,
    careers: ["Software developer", "Data scientist or analyst", "Systems or cloud engineer", "Cybersecurity analyst", "Machine learning engineer", "Database administrator", "IT project manager"],
  },
  {
    match: /mbchb|medicine and bachelor of surgery|medical practice/i,
    careers: ["Medical doctor", "Specialist after postgraduate training", "Public health", "Medical research", "Hospital or clinic practice"],
  },
  {
    match: /nursing/i,
    careers: ["Professional nurse", "Clinical nurse specialist", "Midwife", "Community health nursing", "Nursing management"],
  },
  {
    match: /pharmac/i,
    careers: ["Pharmacist", "Hospital or community pharmacy", "Pharmaceutical industry", "Regulatory affairs", "Clinical trials"],
  },
  {
    match: /physiotherap/i,
    careers: ["Physiotherapist", "Sports rehabilitation", "Hospital or private practice", "Occupational health"],
  },
  {
    match: /occupational therap/i,
    careers: ["Occupational therapist", "Rehabilitation services", "Paediatric or psychiatric practice", "Community-based rehabilitation"],
  },
  {
    match: /dietetic|nutrition/i,
    careers: ["Dietitian", "Clinical nutrition", "Food service management", "Community nutrition", "Food industry"],
  },
  {
    match: /speech|audiolog|hearing/i,
    careers: ["Speech-language therapist", "Audiologist", "Schools and early intervention", "Hospital practice"],
  },
  {
    match: /dental|oral health/i,
    careers: ["Dentist", "Oral hygienist", "Dental practice", "Public oral health"],
  },
  {
    match: /radiograph|medical imaging/i,
    careers: ["Radiographer", "Diagnostic imaging", "Radiation therapy", "Ultrasound"],
  },
  {
    match: /actuarial/i,
    careers: ["Actuary (after professional exams)", "Insurance and reinsurance", "Pensions and employee benefits", "Risk management", "Investment analysis"],
  },
  {
    match: /accounting|baccllb|\bbacc\b/i,
    careers: ["Chartered Accountant (after SAICA board exams)", "Auditor", "Financial manager", "Management accountant", "Tax consultant", "Financial analyst"],
  },
  {
    match: /\blaw\b|\bllb\b|jurisprudence/i,
    careers: ["Attorney", "Advocate", "Legal advisor or in-house counsel", "Prosecutor", "Magistrate", "Compliance officer", "Legal academic"],
  },
  {
    match: /economic|econometr/i,
    careers: ["Economist", "Economic analyst", "Policy researcher", "Banking and financial services", "Development economics"],
  },
  {
    match: /finance|financial management|investment|banking/i,
    careers: ["Financial analyst", "Investment analyst", "Banking", "Treasury", "Financial planner"],
  },
  {
    match: /marketing|advertis/i,
    careers: ["Marketing manager", "Brand manager", "Digital marketing", "Market researcher", "Advertising and media"],
  },
  {
    match: /human resource|industrial psycholog/i,
    careers: ["Human resources manager", "Talent acquisition", "Organisational development", "Industrial psychologist (after registration)", "Labour relations"],
  },
  {
    match: /logistics|supply chain|transport economics/i,
    careers: ["Supply chain manager", "Logistics planner", "Procurement", "Warehousing and distribution", "Freight and transport"],
  },
  {
    match: /tourism|hospitality|hotel|catering/i,
    careers: ["Hospitality manager", "Tourism operations", "Events management", "Food and beverage management", "Travel and destination marketing"],
  },
  {
    match: /education|teaching|\bbed\b|pgce/i,
    careers: ["Schoolteacher in your phase and subjects", "Head of department", "School management", "Curriculum development", "Education policy or training"],
  },
  {
    match: /social work/i,
    careers: ["Social worker", "Child protection", "Community development", "Probation and correctional services", "NGO and welfare services"],
  },
  {
    match: /psycholog/i,
    careers: ["Psychologist (after postgraduate training and registration)", "Counselling", "Human resources", "Research", "Community mental health"],
  },
  {
    match: /architect|built environment|quantity survey|construction management|urban|town and regional planning/i,
    careers: ["Architect or architectural technologist", "Quantity surveyor", "Urban or town planner", "Construction manager", "Property development"],
  },
  {
    match: /agric|animal production|plant and soil|viticulture|oenology|forestry|food science/i,
    careers: ["Agricultural scientist or advisor", "Farm or production manager", "Agribusiness and agricultural economics", "Food technologist", "Extension officer", "Agricultural research"],
  },
  {
    match: /veterinary/i,
    careers: ["Veterinarian", "Veterinary practice", "Animal health and welfare", "State veterinary services"],
  },
  {
    match: /chemistry|biochem|polymer/i,
    careers: ["Chemist", "Analytical or quality control laboratory", "Chemical and pharmaceutical industry", "Research scientist", "Forensic chemistry"],
  },
  {
    match: /physics|astronom/i,
    careers: ["Physicist", "Research scientist", "Data and quantitative analysis", "Instrumentation and measurement", "Energy and nuclear sector"],
  },
  {
    match: /mathemat|statistic/i,
    careers: ["Statistician", "Data analyst", "Quantitative analyst", "Operations researcher", "Risk modelling", "Teaching and research"],
  },
  {
    match: /biolog|biotechnolog|microbiolog|genetic|biodiversity|ecolog|zoolog|botan|conservation/i,
    careers: ["Research scientist", "Laboratory scientist", "Environmental or conservation officer", "Biotechnology industry", "Science communication"],
  },
  {
    match: /environmental|earth science|geolog|geoinformatic|geograph/i,
    careers: ["Environmental scientist", "Geologist", "GIS specialist", "Environmental impact assessment", "Mining or exploration geology", "Water resource management"],
  },
  {
    match: /sport science|human movement|biokinetic/i,
    careers: ["Biokineticist (after postgraduate training)", "Sports scientist", "Strength and conditioning coach", "Sports administration", "Health and fitness industry"],
  },
  {
    match: /journalis|media|communication studies|public relations/i,
    careers: ["Journalist", "Communications or PR officer", "Content producer", "Media production", "Corporate communications"],
  },
  {
    match: /fine art|visual art|design|fashion|photograph|graphic|jewellery|interior/i,
    careers: ["Practising designer or artist", "Studio or agency work", "Art direction", "Freelance commissions", "Teaching and curation"],
  },
  {
    match: /music|drama|theatre|performing art|dance/i,
    careers: ["Performer", "Teacher or private tutor", "Director or producer", "Arts administration", "Production and technical theatre"],
  },
  {
    match: /theolog|divinity/i,
    careers: ["Minister of religion", "Chaplaincy", "Community and welfare work", "Religious education", "Counselling"],
  },
  {
    match: /language|linguistic|translat|literature/i,
    careers: ["Translator or interpreter", "Editor or copywriter", "Language practitioner", "Teaching", "Publishing"],
  },
  {
    match: /politic|international studies|international relations|governance|public administration/i,
    careers: ["Public service and government", "Policy analyst", "Diplomatic service", "NGO and development sector", "Political risk analysis"],
  },
  {
    match: /police|policing|forensic|correctional|safety management/i,
    careers: ["Policing and law enforcement", "Forensic investigation", "Correctional services", "Private security management", "Criminal justice"],
  },
]

const FACULTY_CAREERS: Rule[] = [
  { match: /engineering|built environment/i, careers: ["Engineer in your discipline", "Technologist or technician", "Project management", "Consulting", "Manufacturing and infrastructure"] },
  { match: /health|medicine/i, careers: ["Registered health practitioner in your discipline", "Hospital or clinic practice", "Community health services", "Health research"] },
  { match: /science|agrisciences|ict/i, careers: ["Research or laboratory scientist", "Data and analysis roles", "Technical specialist in industry", "Postgraduate study", "Teaching"] },
  { match: /commerce|business|economic|management|finance/i, careers: ["Business or financial analyst", "Management and operations", "Consulting", "Banking and financial services", "Entrepreneurship"] },
  { match: /law/i, careers: ["Legal practice", "Legal advisor", "Compliance and regulation", "Public service"] },
  { match: /education/i, careers: ["Teaching", "School leadership", "Curriculum and training"] },
  { match: /human|social|art|design|theolog/i, careers: ["Public and NGO sector", "Communications and media", "Research and policy", "Teaching", "Creative and cultural industries"] },
]

function matchRules(rules: Rule[], text: string): string[] | null {
  for (const rule of rules) if (rule.match.test(text)) return rule.careers
  return null
}

/**
 * Careers for one programme, preferring what the institution published.
 *
 * Returns null only when the name matches no field rule and the
 * faculty matches none either, which the caller should treat as "we
 * do not know" rather than filling in something plausible.
 */
export function careerPathsFor(programme: {
  name: string
  faculty?: string | null
  career_text?: string | null
}): CareerAnswer | null {
  const published = programme.career_text?.trim()
  if (published) {
    return {
      // TUT separates outcomes with semicolons, commas or newlines.
      careers: published
        .split(/[;\n]|,(?=\s*[A-Z])/)
        .map((c) => c.trim().replace(/\.$/, ""))
        .filter((c) => c.length > 1),
      source: "institution",
      published,
    }
  }

  const byName = matchRules(FIELD_CAREERS, programme.name)
  if (byName) return { careers: byName, source: "field" }

  const byFaculty = programme.faculty ? matchRules(FACULTY_CAREERS, programme.faculty) : null
  if (byFaculty) return { careers: byFaculty, source: "field" }

  return null
}
