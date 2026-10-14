/**
 * Ported from coursefind-data api/src/app/evaluator.py.
 *
 * Decides "does this learner qualify for this programme?" by walking the
 * requirement tree stored on each programme. Returns an empty list when
 * they qualify, or specific reasons why not -- the messages here are
 * what a learner actually reads, so they are ported verbatim, down to
 * the punctuation. The differential test compares them string for
 * string against the Python.
 *
 * Pure and total: a malformed rule degrades to a Failure, never a throw.
 *
 * EXCLUDED SUBJECTS
 * An excluded subject cannot SATISFY a requirement and cannot count
 * toward the score, but merely holding one is never itself a failure --
 * lookups treat those keys as absent.
 *
 * LANGUAGE CONSUMPTION
 * When a language rule passes, that family is "consumed" so a sibling
 * any_additional_language rule cannot also accept it. Threaded
 * explicitly, never inferred by scanning the tree -- inference is
 * fragile and breaks under reordering.
 */
import { LANGUAGE_FAMILIES, percentageToLevel } from "./subjects"
import type { Marks } from "./scoring"

export interface Failure {
  kind: string
  message: string
  required: number | null
  actual: number | null
  subject: string | null
}

export type Rule = Record<string, any>

/** The percentage each level starts at. Used only for human-readable
 * messages; comparisons go through percentageToLevel. */
export const MIN_PCT_FOR_LEVEL: Record<number, number> =
  { 1: 0, 2: 30, 3: 40, 4: 50, 5: 60, 6: 70, 7: 80 }

const LANGUAGE_DISPLAY_NAMES: Record<string, string> = {
  english: "English", afrikaans: "Afrikaans", isizulu: "isiZulu",
  isixhosa: "isiXhosa", sepedi: "Sepedi", sesotho: "Sesotho",
  setswana: "Setswana", xitsonga: "Xitsonga", siswati: "siSwati",
  tshivenda: "Tshivenda", isindebele: "isiNdebele",
}

const SUBJECT_DISPLAY_NAMES: Record<string, string> = {
  mathematics: "Mathematics",
  mathematical_literacy: "Mathematical Literacy",
  technical_mathematics: "Technical Mathematics",
  physical_sciences: "Physical Sciences",
  technical_sciences: "Technical Sciences",
  life_sciences: "Life Sciences",
  life_orientation: "Life Orientation",
  accounting: "Accounting",
  business_studies: "Business Studies",
  economics: "Economics",
  geography: "Geography",
  history: "History",
  tourism: "Tourism",
  consumer_studies: "Consumer Studies",
  visual_arts: "Visual Arts",
  dramatic_arts: "Dramatic Arts",
  music: "Music",
  design: "Design",
  information_technology: "Information Technology",
  computer_applications_technology: "Computer Applications Technology",
  engineering_graphics_and_design: "Engineering Graphics and Design",
  agricultural_sciences: "Agricultural Sciences",
  hospitality_studies: "Hospitality Studies",
  religion_studies: "Religion Studies",
}

const LANGUAGE_SUFFIXES: Array<[string, string]> = [
  ["_hl", "Home Language"],
  ["_fal", "First Additional Language"],
]

/** Python's str.title(): capitalise the first letter of each run of
 * letters and lowercase the rest. Only reached for keys with no display
 * name, but it has to match or a fallback message would differ. */
function pyTitle(s: string): string {
  return s.replace(/[A-Za-z]+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
}

export function subjectDisplayName(key: string): string {
  if (key in SUBJECT_DISPLAY_NAMES) return SUBJECT_DISPLAY_NAMES[key]
  for (const [suffix, label] of LANGUAGE_SUFFIXES) {
    if (key.endsWith(suffix)) {
      const base = key.slice(0, -suffix.length)
      return `${LANGUAGE_DISPLAY_NAMES[base] ?? pyTitle(base)} ${label}`
    }
  }
  return LANGUAGE_DISPLAY_NAMES[key] ?? pyTitle(key.replace(/_/g, " "))
}

function safeLevel(pct: unknown): number | null {
  if (pct === null || pct === undefined) return null
  if (typeof pct !== "number" || !Number.isFinite(pct)) return null
  try {
    return percentageToLevel(pct)
  } catch {
    return null
  }
}

/** A "required level" from the data is only usable if it is a whole
 * number from 1 to 7. */
function validLevel(value: unknown): number | null {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 7
    ? value
    : null
}

function lookup(key: string, marks: Marks, excluded: Set<string>): number | null {
  if (excluded.has(key)) return null
  return safeLevel(marks[key])
}

function malformed(kind: string, message: string): Failure[] {
  return [{ kind, message, required: null, actual: null, subject: null }]
}

/** Python's repr() for the values min_level can hold, so a malformed
 * rule's message matches the Python's byte for byte. */
function pyRepr(v: unknown): string {
  if (v === null || v === undefined) return "None"
  if (typeof v === "string") return `'${v}'`
  if (typeof v === "boolean") return v ? "True" : "False"
  return String(v)
}

export function evaluate(
  rule: Rule,
  marks: Marks,
  excluded: Set<string>,
  consumedLanguage: string | null = null,
): Failure[] {
  if (rule === null || typeof rule !== "object" || Array.isArray(rule)) {
    const t = rule === null ? "NoneType" : Array.isArray(rule) ? "list" : typeof rule
    return malformed("unknown", `Malformed rule: expected an object, got ${t}`)
  }
  const kind = rule.kind
  if (kind === "all") return evaluateAll(rule, marks, excluded, consumedLanguage)
  if (kind === "any") return evaluateAny(rule, marks, excluded, consumedLanguage)
  if (kind === "subject") return evaluateSubject(rule, marks, excluded)
  if (kind === "any_additional_language") {
    return evaluateAnyAdditionalLanguage(rule, marks, excluded, consumedLanguage)
  }
  return malformed(String(kind), `Unknown rule kind '${kind}'`)
}

function isLanguageSubjectNode(child: unknown): boolean {
  return (
    typeof child === "object" && child !== null &&
    (child as Rule).kind === "subject" &&
    "language" in (child as Rule) &&
    !("subject" in (child as Rule))
  )
}

function evaluateAll(
  rule: Rule, marks: Marks, excluded: Set<string>, consumedLanguage: string | null,
): Failure[] {
  const failures: Failure[] = []
  let currentConsumed = consumedLanguage
  for (const child of rule.rules ?? []) {
    if (isLanguageSubjectNode(child)) {
      const [childFailures, newlyConsumed] = evaluateLanguageSubject(child, marks, excluded)
      failures.push(...childFailures)
      if (newlyConsumed !== null) currentConsumed = newlyConsumed
    } else {
      failures.push(...evaluate(child, marks, excluded, currentConsumed))
    }
  }
  return failures
}

const SUBJECT_ABSENT_PENALTY = 100

/** How far a learner is from satisfying one branch of an "any" group.
 *
 * Counting failures alone cannot tell two single-rule branches apart,
 * and the first-written one then wins by default. For "Mathematics
 * level 4 OR Mathematical Literacy level 5" that told a learner holding
 * Mathematical Literacy at level 3 "Requires Mathematics as a matric
 * subject" -- naming the one branch they can do nothing about and
 * hiding the one they were two levels from. So distance is (rules
 * unmet, how far short), where not holding a subject at all is further
 * than any shortfall in one you do hold. */
function branchDistance(failures: Failure[]): [number, number] {
  let shortfall = 0
  for (const failure of failures) {
    if (failure.actual === null) shortfall += SUBJECT_ABSENT_PENALTY
    else if (failure.required !== null) {
      shortfall += Math.max(0, failure.required - failure.actual)
    }
  }
  return [failures.length, shortfall]
}

/** One message naming every alternative, for the common case where an
 * "any" group is a plain set of subject rules. The prospectus prints
 * these as one requirement with several ways to satisfy it, and the
 * alternatives are exactly what a learner needs to see. Returns null
 * for anything more complex, where the nearest branch's own message is
 * already the clearest thing to say. */
function combinedAnyMessage(
  children: Rule[], branches: Failure[][], nearest: Failure[],
): string | null {
  if (children.length < 2 || branches.some((b) => b.length !== 1)) return null
  const options: string[] = []
  for (const child of children) {
    if (!(typeof child === "object" && child !== null &&
          child.kind === "subject" && "subject" in child)) {
      return null
    }
    const level = validLevel(child.min_level)
    if (level === null) return null
    options.push(
      `${subjectDisplayName(child.subject)} level ${level} (${MIN_PCT_FOR_LEVEL[level]}%+)`,
    )
  }
  const requirement = options.length === 2
    ? `${options[0]} or ${options[1]}`
    : `${options.slice(0, -1).join(", ")}, or ${options[options.length - 1]}`
  const held = nearest.filter((f) => f.actual !== null)
  const have = held.length
    ? `you have ${subjectDisplayName(held[0].subject as string)} level ${held[0].actual}`
    : "you have none of these"
  return `Requires ${requirement}; ${have}`
}

function evaluateAny(
  rule: Rule, marks: Marks, excluded: Set<string>, consumedLanguage: string | null,
): Failure[] {
  const children: Rule[] = rule.rules
  if (!children || children.length === 0) {
    return malformed("any", "Malformed rule: 'any' node has no branches")
  }
  const branches = children.map((child) => evaluate(child, marks, excluded, consumedLanguage))
  if (branches.some((b) => b.length === 0)) return []

  // Python's min() keeps the FIRST minimum; a plain sort would not
  // guarantee that, so the scan is explicit.
  let nearest = branches[0]
  let best = branchDistance(nearest)
  for (const branch of branches.slice(1)) {
    const d = branchDistance(branch)
    if (d[0] < best[0] || (d[0] === best[0] && d[1] < best[1])) {
      nearest = branch
      best = d
    }
  }

  const combined = combinedAnyMessage(children, branches, nearest)
  if (combined === null) return nearest
  // Keep required/actual from the nearest branch so the numeric fields
  // stay meaningful; only the prose gains the alternatives.
  return [{
    kind: nearest[0].kind, message: combined,
    required: nearest[0].required, actual: nearest[0].actual,
    subject: nearest[0].subject,
  }]
}

function evaluateSubject(rule: Rule, marks: Marks, excluded: Set<string>): Failure[] {
  const hasSubject = "subject" in rule
  const hasLanguage = "language" in rule
  if (hasSubject === hasLanguage) {
    return malformed("subject", "Malformed rule: set exactly one of subject/language")
  }
  if (hasSubject) {
    const minLevel = validLevel(rule.min_level)
    if (minLevel === null) {
      return malformed("subject", `Malformed rule: invalid min_level ${pyRepr(rule.min_level)}`)
    }
    return evaluateSubjectKey(rule.subject, minLevel, marks, excluded)
  }
  return evaluateLanguageSubject(rule, marks, excluded)[0]
}

function evaluateSubjectKey(
  key: string, minLevel: number, marks: Marks, excluded: Set<string>,
  subjectField: string | null = null,
): Failure[] {
  const level = lookup(key, marks, excluded)
  const field = subjectField !== null ? subjectField : key
  if (level !== null && level >= minLevel) return []
  const name = subjectDisplayName(key)
  let message: string
  if (level === null) {
    message = `Requires ${name} as a matric subject`
  } else {
    const threshold = MIN_PCT_FOR_LEVEL[minLevel]
    message = `Requires ${name} level ${minLevel} (${threshold}%+); you have level ${level} (${marks[key]}%)`
  }
  return [{ kind: "subject", message, required: minLevel, actual: level, subject: field }]
}

/** A learner takes only ONE of Home Language or First Additional
 * Language for a given language, so this checks whichever they hold --
 * and if they somehow hold both, whichever is closer to passing.
 * Returns [failures, familyConsumedIfPassed]. */
function evaluateLanguageSubject(
  rule: Rule, marks: Marks, excluded: Set<string>,
): [Failure[], string | null] {
  const language = rule.language
  if (!LANGUAGE_FAMILIES.has(language)) {
    return [malformed("subject", `Malformed rule: unknown language family '${language}'`), null]
  }
  const minLevel = validLevel(rule.min_level)
  if (minLevel === null) {
    return [malformed("subject", `Malformed rule: invalid min_level ${pyRepr(rule.min_level)}`), null]
  }
  // Python: `_valid_level(rule.get("min_level_fal", min_level)) or min_level`
  // -- an invalid or absent value falls back to min_level.
  const minLevelFal =
    validLevel("min_level_fal" in rule ? rule.min_level_fal : minLevel) ?? minLevel

  const [hlKey, falKey] = LANGUAGE_FAMILIES.get(language) as [string, string]
  const hlLevel = lookup(hlKey, marks, excluded)
  const falLevel = lookup(falKey, marks, excluded)

  if (hlLevel !== null && hlLevel >= minLevel) return [[], language]
  if (falLevel !== null && falLevel >= minLevelFal) return [[], language]

  if (falLevel !== null && hlLevel === null) {
    return [evaluateSubjectKey(falKey, minLevelFal, marks, excluded, language), null]
  }
  if (hlLevel !== null && falLevel === null) {
    return [evaluateSubjectKey(hlKey, minLevel, marks, excluded, language), null]
  }
  if (hlLevel !== null && falLevel !== null) {
    const hlDeficit = minLevel - hlLevel
    const falDeficit = minLevelFal - falLevel
    if (hlDeficit <= falDeficit) {
      return [evaluateSubjectKey(hlKey, minLevel, marks, excluded, language), null]
    }
    return [evaluateSubjectKey(falKey, minLevelFal, marks, excluded, language), null]
  }

  const display = LANGUAGE_DISPLAY_NAMES[language] ?? language
  return [[{
    kind: "subject",
    message: `Requires ${display} as a matric subject`,
    required: minLevel, actual: null, subject: language,
  }], null]
}

/** "Some SECOND language at level X", skipping whichever language
 * already satisfied an earlier requirement so one cannot count twice. */
function evaluateAnyAdditionalLanguage(
  rule: Rule, marks: Marks, excluded: Set<string>, consumedLanguage: string | null,
): Failure[] {
  const minLevel = validLevel(rule.min_level)
  if (minLevel === null) {
    return malformed(
      "any_additional_language",
      `Malformed rule: invalid min_level ${pyRepr(rule.min_level)}`,
    )
  }
  let bestLevel: number | null = null
  for (const [base, [hlKey, falKey]] of LANGUAGE_FAMILIES) {
    if (base === consumedLanguage) continue
    for (const key of [hlKey, falKey]) {
      const level = lookup(key, marks, excluded)
      if (level === null) continue
      if (level >= minLevel) return []
      if (bestLevel === null || level > bestLevel) bestLevel = level
    }
  }
  const threshold = MIN_PCT_FOR_LEVEL[minLevel]
  const message = bestLevel === null
    ? `Requires an additional language at level ${minLevel} (${threshold}%+); you do not offer a second language`
    : `Requires an additional language at level ${minLevel} (${threshold}%+); your best additional language is level ${bestLevel}`
  return [{
    kind: "any_additional_language", message,
    required: minLevel, actual: bestLevel, subject: null,
  }]
}
