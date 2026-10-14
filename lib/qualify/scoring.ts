/**
 * Ported from coursefind-data api/src/app/scoring.py.
 *
 * A learner's overall admission score -- the single number most South
 * African universities use as a first filter. Every institution does it
 * differently, so this is a small library of ALGORITHMS, each
 * parameterised by a scoring_config from the data rather than hardcoded
 * to one university.
 *
 * WHY SCORES ARE FLOORED TO AN INTEGER
 * Thresholds (min_score) are always whole numbers, and for any integer
 * n, floor(x) >= n exactly when x >= n. Flooring can therefore never
 * flip a qualify/fail outcome, and it keeps a float out of the margin
 * arithmetic and the response.
 *
 * ORDER AND TIES
 * Python's sorted() is stable and so is Array.prototype.sort in every
 * engine this runs on, so equal-scoring subjects keep the order the
 * marks came in. That ordering never changes a total anyway -- equal
 * points contribute equally whichever is picked -- but the two
 * implementations agreeing on it keeps the differential test exact.
 */
import { percentageToLevel } from "./subjects"

const LIFE_ORIENTATION = "life_orientation"

/** Marks as the engine passes them around: subject slug -> percentage,
 * in the order the learner's request listed them. */
export type Marks = Record<string, number>
export type ScoringConfig = Record<string, any>

function descending(values: number[]): number[] {
  return [...values].sort((a, b) => b - a)
}

function levelFromBands(pct: number, bands: Array<Record<string, number>>): number {
  for (const band of bands) {
    if (band.min <= pct && pct <= band.max) return band.level
  }
  // Falls back to level 1 when no band matches, mirroring the reference
  // evaluator this was cross-checked against.
  return 1
}

/** Sum of the N highest achievement LEVELS, certain subjects never
 * counted. UJ's rule, and the most common shape nationally. */
function apsBest6ExclLo(marks: Marks, config: ScoringConfig): number {
  const subjectCount = config.subject_count ?? 6
  const exclude = new Set<string>(config.exclude_subjects ?? [LIFE_ORIENTATION])
  const zeroBelow = config.zero_below_level ?? null
  const bands = config.level_bands ?? null
  const levelOf = bands
    ? (pct: number) => levelFromBands(pct, bands)
    : percentageToLevel

  let levels = descending(
    Object.entries(marks)
      .filter(([subject]) => !exclude.has(subject))
      .map(([, pct]) => levelOf(pct)),
  )
  if (zeroBelow !== null && zeroBelow !== undefined) {
    // A weak subject still occupies a slot; it just adds nothing.
    levels = levels.map((level) => (level < zeroBelow ? 0 : level))
  }
  return levels.slice(0, subjectCount).reduce((a, b) => a + b, 0)
}

/** Sum of the N highest RAW PERCENTAGES divided by a divisor. CPUT's
 * Method 1. Integer division, as in the Python. */
function percentageSumDiv10(marks: Marks, config: ScoringConfig): number {
  const subjectCount = config.subject_count ?? 6
  const divisor = config.divisor ?? 10
  const exclude = new Set<string>(config.exclude_subjects ?? [LIFE_ORIENTATION])
  const percentages = descending(
    Object.entries(marks)
      .filter(([subject]) => !exclude.has(subject))
      .map(([, pct]) => pct),
  )
  const total = percentages.slice(0, subjectCount).reduce((a, b) => a + b, 0)
  return Math.floor(total / divisor)
}

/** Sum of the N highest WEIGHTED levels. Weight 0 excludes a subject
 * outright -- "counts for nothing" and "is excluded" are one outcome. */
function weightedLevels(marks: Marks, config: ScoringConfig): number {
  const weights: Record<string, number> = config.weights ?? {}
  const defaultWeight = config.default_weight ?? 1
  const subjectCount = config.subject_count ?? 6
  const weighted = descending(
    Object.entries(marks).map(
      ([subject, pct]) => percentageToLevel(pct) * (weights[subject] ?? defaultWeight),
    ),
  )
  return weighted.slice(0, subjectCount).reduce((a, b) => a + b, 0)
}

/** Points for the highest threshold pct meets, or 0 if it meets none.
 * The table may be in any order. */
function pointsFor(pct: number, table: Array<[number, number]>): number {
  let best = 0
  for (const [minPct, points] of table) {
    if (pct >= minPct && points > best) best = points
  }
  return best
}

/** Institution-specific points table, Life Orientation scored on its own
 * scale and COMPETING for a place rather than dropped, and bonus points
 * for named subjects. This is Wits' shape. */
function customPointsWithBonus(marks: Marks, config: ScoringConfig): number {
  const pointsTable: Array<[number, number]> = config.points_table ?? []
  const loTable: Array<[number, number]> =
    config.life_orientation_points_table ?? pointsTable
  const loSubject: string = config.life_orientation_subject ?? LIFE_ORIENTATION
  const bonusRules: Record<string, Array<[number, number]>> = config.bonus ?? {}
  const hlBonusRule: Array<[number, number]> | null =
    config.bonus_for_home_language ?? null
  const subjectCount: number = config.subject_count ?? 7
  const required: string[] = config.required_subjects ?? []

  const scored: Array<[string, number]> = []
  for (const [subject, pct] of Object.entries(marks)) {
    if (subject === loSubject) {
      scored.push([subject, pointsFor(pct, loTable)])
      continue
    }
    let points = pointsFor(pct, pointsTable)
    if (subject in bonusRules) {
      points += pointsFor(pct, bonusRules[subject])
    } else if (hlBonusRule && subject.endsWith("_hl")) {
      points += pointsFor(pct, hlBonusRule)
    }
    scored.push([subject, points])
  }

  // Required subjects take their places first, however weak, then the
  // best of the rest fill what is left. Without this, best-N silently
  // drops a weak compulsory subject and OVERSTATES the score.
  const requiredSet = new Set(required)
  const forced = scored.filter(([s]) => requiredSet.has(s))
  const rest = scored
    .filter(([s]) => !requiredSet.has(s))
    .sort((a, b) => b[1] - a[1])
  const counted = [
    ...forced.slice(0, subjectCount),
    ...rest.slice(0, Math.max(0, subjectCount - forced.length)),
  ]
  return counted.reduce((sum, [, p]) => sum + p, 0)
}

export const SCORERS: Record<string, (marks: Marks, config: ScoringConfig) => number> = {
  aps_best6_excl_lo: apsBest6ExclLo,
  percentage_sum_div_10: percentageSumDiv10,
  weighted_levels: weightedLevels,
  custom_points_with_bonus: customPointsWithBonus,
}
