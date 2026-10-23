import { PROGRAMMES, INSTITUTIONS_BY_ID } from "@/lib/qualify/data"
import { subjectDisplayName, MIN_PCT_FOR_LEVEL } from "@/lib/qualify/evaluator"
import { careerPathsFor } from "@/lib/career-paths"
import { appInfoMap } from "@/data/university-applications"
import { institutionCampuses } from "@/lib/campuses"

/**
 * Answers to the questions the chatbot used to deflect.
 *
 * It had the whole dataset available and still replied "visit the
 * Find Course page", because the only thing it was ever given was a
 * per-university summary — name, location, course count, APS range.
 * The route said so in a comment: full course lists were too large
 * for the free models' token budget, so courses were left out and
 * the model had nothing to answer from.
 *
 * Stuffing all 428 programmes into every prompt is not the fix. This
 * module retrieves the handful of records a question is actually
 * about and answers from them directly, which means:
 *
 *   - the answer is the data, not the model's recollection of it
 *   - it costs no tokens and works with no API key at all
 *   - what it cannot answer still reaches the model, now with the
 *     relevant records attached instead of a summary
 */

type Programme = {
  institution_id: string
  qualification_code: string
  name: string
  faculty?: string | null
  campus?: string[]
  duration_years?: number | null
  career_text?: string | null
  selection_notes?: string[]
  scoreable?: boolean
  requirements: { nsc: Record<string, unknown> }
}

const ALL = PROGRAMMES as unknown as Programme[]

const INSTITUTION_NAMES: Record<string, string> = {
  uj: "University of Johannesburg",
  tut: "Tshwane University of Technology",
  su: "Stellenbosch University",
  wits: "University of the Witwatersrand",
}

/** Spellings a learner actually types, mapped to institution ids. */
const INSTITUTION_ALIASES: Record<string, string> = {
  uj: "uj", johannesburg: "uj", "university of johannesburg": "uj",
  tut: "tut", tshwane: "tut", "tshwane university of technology": "tut",
  su: "su", stellenbosch: "su", maties: "su", stellies: "su",
  wits: "wits", witwatersrand: "wits",
  up: "up", tuks: "up", pretoria: "up",
  uct: "uct", "cape town": "uct",
  ukzn: "ukzn", unisa: "unisa", nwu: "nwu", ufs: "ufs", uwc: "uwc",
  rhodes: "ru", ru: "ru", nmu: "nmu", mandela: "nmu", dut: "dut",
  cput: "cput", vut: "vut", cut: "cut", ul: "ul", limpopo: "ul",
  univen: "univen", venda: "univen", unizulu: "unizulu", zululand: "unizulu",
  wsu: "wsu", ufh: "ufh", "fort hare": "ufh", smu: "smu", spu: "spu",
  mut: "mut", ump: "ump", mpumalanga: "ump",
}

const normalise = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim()

// ── Requirements, in words ───────────────────────────────────────────

function levelPhrase(level: number): string {
  return `level ${level} (${MIN_PCT_FOR_LEVEL[level] ?? "?"}%+)`
}

/**
 * One rule node rendered as a phrase a learner can act on.
 *
 * `depth` exists to bracket nested groups. Stellenbosch's Engineering
 * language rule is an "any" whose last branch is itself an "and", and
 * flattened it read as
 *
 *   one of: English HL 50%; or English FAL 60%; or English FAL 50%;
 *   and Afrikaans HL 50%
 *
 * where the final "and" looks like a separate requirement for
 * everybody rather than part of the last alternative. Bracketing the
 * nested group is the difference between a rule a learner can check
 * themselves against and one they cannot.
 */
function renderRule(node: unknown, depth = 0): string | null {
  if (!node || typeof node !== "object") return null
  const rule = node as Record<string, unknown>

  if (rule.kind === "subject") {
    const level = rule.min_level as number | undefined
    if (typeof level !== "number") return null
    if (typeof rule.language === "string") {
      const fal = rule.min_level_fal as number | undefined
      const base = subjectDisplayName(rule.language)
      return typeof fal === "number" && fal !== level
        ? `${base} Home Language ${levelPhrase(level)}, or First Additional Language ${levelPhrase(fal)}`
        : `${base} ${levelPhrase(level)}`
    }
    if (typeof rule.subject === "string") {
      return `${subjectDisplayName(rule.subject)} ${levelPhrase(level)}`
    }
    return null
  }

  if (rule.kind === "any_additional_language") {
    const level = rule.min_level as number | undefined
    return typeof level === "number" ? `a second language ${levelPhrase(level)}` : null
  }

  const children = (rule.rules as unknown[]) ?? []

  // "Home Language 50%" with no language named is stored as an `any`
  // over all eleven official languages, which is exact and unreadable:
  // eleven alternatives differing only in the language. Collapse it
  // back to the sentence the prospectus actually printed.
  const collapsed = collapseLanguageFan(rule.kind as string, children)
  if (collapsed) return collapsed

  const parts = children
    .map((child) => renderRule(child, depth + 1))
    .filter((p): p is string => Boolean(p))
  if (parts.length === 0) return null
  if (parts.length === 1) return parts[0]

  const joined =
    rule.kind === "any"
      ? parts.length > 2 && depth === 0
        ? `one of: ${parts.join("; or ")}`
        : parts.join(", or ")
      : parts.join(" and ")

  return depth > 0 ? `(${joined})` : joined
}

/**
 * Recognises an `any` whose branches are the same bar on every
 * official language's Home or First Additional variant.
 */
function collapseLanguageFan(kind: string, children: unknown[]): string | null {
  if (kind !== "any" || children.length < 8) return null

  const levels = new Set<number>()
  const variants = new Set<string>()

  for (const child of children) {
    const rule = child as Record<string, unknown>
    if (rule?.kind !== "subject" || typeof rule.subject !== "string") return null
    const match = /_(hl|fal)$/.exec(rule.subject)
    if (!match || typeof rule.min_level !== "number") return null
    variants.add(match[1])
    levels.add(rule.min_level)
  }

  if (variants.size !== 1 || levels.size !== 1) return null
  const level = [...levels][0]
  const label = [...variants][0] === "hl" ? "Home Language" : "First Additional Language"
  return `any ${label} ${levelPhrase(level)}`
}

export function describeRequirements(programme: Programme): string[] {
  const nsc = programme.requirements?.nsc ?? {}
  const lines: string[] = []

  const score = nsc.score as Array<{ min_score?: number }> | undefined
  const institution = (INSTITUTIONS_BY_ID as Record<string, { scoring_strategy?: string }>)[
    programme.institution_id
  ]
  const isPercentage = institution?.scoring_strategy === "percentage_sum_div_10"

  for (const threshold of score ?? []) {
    if (typeof threshold.min_score !== "number") continue
    lines.push(
      isPercentage
        ? `An average of at least ${threshold.min_score}% (excluding Life Orientation)`
        : `An APS of at least ${threshold.min_score}`,
    )
  }

  const subjects = renderRule(nsc.subjects)
  if (subjects) lines.push(subjects)

  const excluded = (nsc.excluded_subjects as string[] | undefined) ?? []
  if (excluded.length) {
    lines.push(`Not accepted: ${excluded.map(subjectDisplayName).join(", ")}`)
  }

  return lines
}

// ── Finding things ───────────────────────────────────────────────────

export function institutionFromQuery(query: string): string | null {
  const q = normalise(query)
  // Longest alias first, so "university of johannesburg" wins over "uj".
  const aliases = Object.keys(INSTITUTION_ALIASES).sort((a, b) => b.length - a.length)
  for (const alias of aliases) {
    if (new RegExp(`(^|[^a-z])${alias.replace(/\s+/g, "\\s+")}([^a-z]|$)`).test(q)) {
      return INSTITUTION_ALIASES[alias]
    }
  }
  return null
}

/** Words that carry no signal when matching a programme name. */
const STOP = new Set([
  "what","are","the","for","of","a","an","is","do","i","to","can","you","me","my","in","at","and","or",
  "requirements","requirement","need","study","studying","course","courses","programme","programmes",
  "degree","tell","about","with","how","get","into","apply","does","offer","where","which","it","that",
  "aps","points","score","there","this","on","be","want","like","please","good","best",
])

export function searchProgrammes(query: string, limit = 5): Programme[] {
  const q = normalise(query)
  const terms = q.split(/[^a-z0-9]+/).filter((t) => t.length > 2 && !STOP.has(t))
  if (terms.length === 0) return []

  const institution = institutionFromQuery(query)

  const scored = ALL.map((programme) => {
    const name = normalise(programme.name)
    let score = 0
    for (const term of terms) {
      if (name.includes(term)) score += term.length >= 5 ? 3 : 2
      else if (normalise(programme.faculty ?? "").includes(term)) score += 1
    }
    // An institution named in the question is a filter, not a tiebreak:
    // "does Wits offer law" must not answer with UJ's law degree.
    if (institution) {
      if (programme.institution_id !== institution) return { programme, score: 0 }
      score += 1
    }
    return { programme, score }
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || a.programme.name.length - b.programme.name.length)

  return scored.slice(0, limit).map((s) => s.programme)
}

export function institutionLabel(id: string): string {
  return INSTITUTION_NAMES[id] ?? id.toUpperCase()
}

// ── Rendered answers ─────────────────────────────────────────────────

export function programmeAnswer(programme: Programme): string {
  const where = institutionLabel(programme.institution_id)
  const lines: string[] = [`**${programme.name}** — ${where}`]

  const bits: string[] = []
  if (programme.faculty) bits.push(programme.faculty)
  if (programme.duration_years) bits.push(`${programme.duration_years} years`)
  if (programme.campus?.length) bits.push(programme.campus.join(", "))
  if (bits.length) lines.push(`*${bits.join(" · ")}*`)

  const requirements = describeRequirements(programme)
  if (requirements.length) {
    lines.push("", "**Entry requirements**", ...requirements.map((r) => `- ${r}`))
  } else if (programme.scoreable === false) {
    lines.push("", "Admission is by selection rather than a points score — check with the faculty.")
  }

  const careers = careerPathsFor(programme)
  if (careers) {
    lines.push("", "**Where it can lead**", ...careers.careers.slice(0, 6).map((c) => `- ${c}`))
    if (careers.source === "field") {
      lines.push("", "*Career paths are typical of the field rather than published by the institution.*")
    }
  }

  const notes = (programme.selection_notes ?? []).filter((n) => n.length < 320)
  if (notes.length) {
    lines.push("", "**Also worth knowing**", ...notes.slice(0, 3).map((n) => `- ${n}`))
  }

  return lines.join("\n")
}

export function closingDatesAnswer(institutionId: string): string | null {
  const info = appInfoMap[institutionId]
  if (!info) return null

  const name = institutionLabel(institutionId)
  const lines = [`**${name} — 2027 undergraduate applications**`, "", `Opens: ${info.open}`]

  for (const [faculty, date] of Object.entries(info.close)) {
    lines.push(`Closes — ${faculty}: ${date}`)
  }

  lines.push("", `Application fee: ${info.fee.local}${info.fee.international ? ` (local) / ${info.fee.international} (international)` : ""}`)
  lines.push(`Apply: ${info.link}`)
  lines.push("", "*Always confirm on the university's own page before you rely on a date.*")
  return lines.join("\n")
}

export function campusAnswer(institutionId: string): string | null {
  const campuses = institutionCampuses(institutionId)
  if (campuses.length === 0) return null

  const lines = [`**${institutionLabel(institutionId)} — campuses**`, ""]
  for (const campus of campuses) {
    lines.push(`**${campus.name}** (${campus.programmeCount} programmes)`)
    lines.push(campus.faculties.slice(0, 5).map((f) => f.name).join(" · "))
    lines.push("")
  }
  return lines.join("\n").trim()
}

// ── Intent ───────────────────────────────────────────────────────────

const ASKS_DATES = /closing date|close[sd]?\b|deadline|when.*(apply|close|open)|application date|opening date|still open|last day/i
const ASKS_CAMPUS = /campus|campuses/i
const ASKS_CAREER = /career|job|work as|become|what can i do with|where.*lead|employ/i
const ASKS_REQUIREMENTS = /requirement|what do i need|how many points|aps|subjects? (do|for)|qualify for|get into|admission/i
const ASKS_WHERE = /where can i study|which universit|who offers|where.*offered/i

/**
 * A complete answer from the data, or null to let the model handle it.
 *
 * Deterministic on purpose. These are questions with one correct
 * answer sitting in a file we ship, and a model paraphrasing that
 * file can only make it worse.
 */
export function answerFromData(query: string): string | null {
  const institution = institutionFromQuery(query)

  if (ASKS_DATES.test(query)) {
    if (institution) {
      const answer = closingDatesAnswer(institution)
      if (answer) return answer
    }
    return null
  }

  if (ASKS_CAMPUS.test(query) && institution) {
    const answer = campusAnswer(institution)
    if (answer) return answer
  }

  const matches = searchProgrammes(query)
  if (matches.length === 0) return null

  if (ASKS_WHERE.test(query) && matches.length > 1) {
    const lines = [`**${matches.length} programmes match that**`, ""]
    for (const programme of matches) {
      const requirements = describeRequirements(programme)
      lines.push(`- **${programme.name}** — ${institutionLabel(programme.institution_id)}${requirements[0] ? ` · ${requirements[0]}` : ""}`)
    }
    lines.push("", "Ask about any one of them for the full requirements.")
    return lines.join("\n")
  }

  if (ASKS_CAREER.test(query)) {
    const programme = matches[0]
    const careers = careerPathsFor(programme)
    if (!careers) return null
    const lines = [
      `**${programme.name}** — ${institutionLabel(programme.institution_id)}`,
      "",
      ...careers.careers.map((c) => `- ${c}`),
    ]
    if (careers.source === "field") {
      lines.push("", "*Typical of the field rather than published by the institution.*")
    }
    return lines.join("\n")
  }

  // Anything else that named a programme gets answered with that
  // programme. Falling through to the model here was the original
  // complaint: "tell me about BCom Actuarial Science" matched a real
  // record and still got a redirect, because the question happened
  // not to contain the word "requirements".
  const best = programmeAnswer(matches[0])
  if (matches.length === 1) return best
  const others = matches.slice(1, 4).map((p) => `- ${p.name} (${institutionLabel(p.institution_id)})`)
  return [best, "", "**Also matching your question**", ...others].join("\n")
}

/**
 * The records a question is about, for the model to answer from.
 *
 * Used when answerFromData declines: far smaller than the whole
 * dataset and far more useful than the per-university summary the
 * route used to send.
 */
export function retrieveContext(query: string): Record<string, unknown> | null {
  const institution = institutionFromQuery(query)
  const matches = searchProgrammes(query, 6)
  if (matches.length === 0 && !institution) return null

  return {
    matchedProgrammes: matches.map((p) => ({
      name: p.name,
      institution: institutionLabel(p.institution_id),
      faculty: p.faculty,
      campus: p.campus,
      durationYears: p.duration_years,
      requirements: describeRequirements(p),
      careers: careerPathsFor(p)?.careers.slice(0, 6),
    })),
    applicationDates: institution ? appInfoMap[institution] ?? null : null,
    campuses: institution ? institutionCampuses(institution) : null,
  }
}
