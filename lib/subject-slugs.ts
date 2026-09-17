/**
 * Maps this app's subject dropdown values (data/subjects.ts, e.g.
 * "English Home Language") to the exact taxonomy slugs the CourseFind
 * data/qualify API expects (e.g. "english_hl") -- see
 * coursefind-data/api/src/app/subjects.py's Subject enum, which this
 * table is a manual, exhaustive mirror of.
 *
 * This mapping exists ONLY at the API boundary. Nothing else in this app
 * needs to know the API's slug format -- subjects stay human-readable
 * strings everywhere else (state, the dropdown, the AI-assisted
 * certificate reader), and get translated once, right before the
 * qualify request goes out. See lib/qualify-api.ts.
 *
 * Every value in data/subjects.ts's SUBJECT_CATEGORIES MUST have an
 * entry here -- a subject a learner can pick but this map can't
 * translate would silently vanish from their qualify request. This is
 * asserted at module load (see the check at the bottom of this file),
 * not just hoped for.
 */

export const SUBJECT_SLUGS: Record<string, string> = {
  // Languages -- Home Language / First Additional Language pairs.
  "English Home Language": "english_hl",
  "English First Additional Language": "english_fal",
  "Afrikaans Home Language": "afrikaans_hl",
  "Afrikaans First Additional Language": "afrikaans_fal",
  "IsiZulu Home Language": "isizulu_hl",
  "IsiZulu First Additional Language": "isizulu_fal",
  "IsiXhosa Home Language": "isixhosa_hl",
  "IsiXhosa First Additional Language": "isixhosa_fal",
  "Sepedi Home Language": "sepedi_hl",
  "Sepedi First Additional Language": "sepedi_fal",
  "Setswana Home Language": "setswana_hl",
  "Setswana First Additional Language": "setswana_fal",
  "Sesotho Home Language": "sesotho_hl",
  "Sesotho First Additional Language": "sesotho_fal",
  "Xitsonga Home Language": "xitsonga_hl",
  "Xitsonga First Additional Language": "xitsonga_fal",
  "SiSwati Home Language": "siswati_hl",
  "SiSwati First Additional Language": "siswati_fal",
  "Tshivenda Home Language": "tshivenda_hl",
  "Tshivenda First Additional Language": "tshivenda_fal",
  "isiNdebele Home Language": "isindebele_hl",
  "isiNdebele First Additional Language": "isindebele_fal",

  // Mathematics
  "Mathematics": "mathematics",
  "Mathematical Literacy": "mathematical_literacy",
  "Technical Mathematics": "technical_mathematics",

  // Sciences
  "Physical Sciences": "physical_sciences",
  "Life Sciences": "life_sciences",
  "Agricultural Sciences": "agricultural_sciences",
  "Technical Sciences": "technical_sciences",

  // Commerce
  "Accounting": "accounting",
  "Business Studies": "business_studies",
  "Economics": "economics",

  // Humanities
  "History": "history",
  "Geography": "geography",
  "Religion Studies": "religion_studies",
  "Life Orientation": "life_orientation",

  // Other
  "Consumer Studies": "consumer_studies",
  "Tourism": "tourism",
  "Computer Applications Technology": "computer_applications_technology",
  "Information Technology": "information_technology",
  "Engineering Graphics & Design": "engineering_graphics_and_design",
  "Visual Arts": "visual_arts",
  "Music": "music",
  "Dramatic Arts": "dramatic_arts",
}

/**
 * The API also recognises "design" and "hospitality_studies" as subject
 * slugs, but data/subjects.ts's dropdown has no entry for either -- a
 * learner can never select them, so no course requiring Design or
 * Hospitality Studies as a named subject can ever show as qualified or
 * near-miss. Known gap, not something this mapping can fix on its own;
 * add the dropdown option first if it needs closing.
 */

/** Converts a display-string subject name to its API slug. Returns
 * undefined for anything not in the table above -- callers must decide
 * whether to drop the subject or surface an error, never guess a slug. */
export function toSubjectSlug(displayName: string): string | undefined {
  return SUBJECT_SLUGS[displayName]
}

if (process.env.NODE_ENV !== "production") {
  // Fails loudly, at import time, in dev/test -- not silently at request
  // time when a learner happens to pick the one subject this table
  // forgot. Requires data/subjects.ts's SUBJECT_CATEGORIES; imported
  // lazily via require() so this file has no circular top-level import
  // with data/subjects.ts (which does not import this file, but keeping
  // the check self-contained avoids ever having to worry about it).
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { SUBJECT_CATEGORIES } = require("@/data/subjects") as typeof import("@/data/subjects")
  const missing = SUBJECT_CATEGORIES.flatMap((category) => category.options)
    .map((option) => option.value)
    .filter((value) => !(value in SUBJECT_SLUGS))
  if (missing.length > 0) {
    throw new Error(
      `lib/subject-slugs.ts is missing an API slug mapping for: ${missing.join(", ")}. ` +
        `A learner selecting one of these would silently disappear from every qualify request.`,
    )
  }
}
