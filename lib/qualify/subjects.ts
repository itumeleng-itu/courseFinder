/**
 * Ported from coursefind-data api/src/app/subjects.py.
 *
 * The fixed NSC subject list and the percentage-to-level table every
 * South African university uses. Frozen taxonomy: never rename a key,
 * only add. These strings are the API contract.
 *
 * See lib/qualify/README.md for why this engine now lives here rather
 * than behind a hosted Python service, and what keeps the two in step.
 */

export const SUBJECT_KEYS = [
  "english_hl", "english_fal",
  "afrikaans_hl", "afrikaans_fal",
  "isizulu_hl", "isizulu_fal",
  "isixhosa_hl", "isixhosa_fal",
  "sepedi_hl", "sepedi_fal",
  "sesotho_hl", "sesotho_fal",
  "setswana_hl", "setswana_fal",
  "xitsonga_hl", "xitsonga_fal",
  "siswati_hl", "siswati_fal",
  "tshivenda_hl", "tshivenda_fal",
  "isindebele_hl", "isindebele_fal",
  "mathematics", "mathematical_literacy", "technical_mathematics",
  "physical_sciences", "technical_sciences", "life_sciences", "life_orientation",
  "accounting", "business_studies", "economics", "geography", "history",
  "tourism", "consumer_studies", "visual_arts", "dramatic_arts", "music",
  "design", "information_technology", "computer_applications_technology",
  "engineering_graphics_and_design", "agricultural_sciences",
  "hospitality_studies", "religion_studies",
  "agricultural_technology", "civil_technology", "electrical_technology",
  "mechanical_technology", "engineering_mathematics_n3",
  "engineering_mathematics_n4", "engineering_science_n4", "catering", "hotel",
] as const

export const VALID_SUBJECTS: ReadonlySet<string> = new Set(SUBJECT_KEYS)

/** Home Language / First Additional Language pairs, so the rest of the
 * engine can ask "did they meet the English requirement?" without caring
 * which variant the learner wrote. Insertion order matters: it is the
 * order any_additional_language scans in, and the Python dict it was
 * ported from is ordered the same way. */
export const LANGUAGE_FAMILIES: ReadonlyMap<string, [string, string]> = new Map([
  ["english", ["english_hl", "english_fal"]],
  ["afrikaans", ["afrikaans_hl", "afrikaans_fal"]],
  ["isizulu", ["isizulu_hl", "isizulu_fal"]],
  ["isixhosa", ["isixhosa_hl", "isixhosa_fal"]],
  ["sepedi", ["sepedi_hl", "sepedi_fal"]],
  ["sesotho", ["sesotho_hl", "sesotho_fal"]],
  ["setswana", ["setswana_hl", "setswana_fal"]],
  ["xitsonga", ["xitsonga_hl", "xitsonga_fal"]],
  ["siswati", ["siswati_hl", "siswati_fal"]],
  ["tshivenda", ["tshivenda_hl", "tshivenda_fal"]],
  ["isindebele", ["isindebele_hl", "isindebele_fal"]],
] as [string, [string, string]][])

/** Raw matric mark (0-100) to the official NSC achievement level (1-7).
 * Throws on an out-of-range percentage exactly as the Python does --
 * callers that handle untrusted data catch it (see safeLevel). */
export function percentageToLevel(pct: number): number {
  if (!(pct >= 0 && pct <= 100)) {
    throw new RangeError(`percentage out of range 0-100: ${pct}`)
  }
  if (pct >= 80) return 7
  if (pct >= 70) return 6
  if (pct >= 60) return 5
  if (pct >= 50) return 4
  if (pct >= 40) return 3
  if (pct >= 30) return 2
  return 1
}
