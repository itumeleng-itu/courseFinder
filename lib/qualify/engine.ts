/**
 * Ported from coursefind-data api/src/app/main.py (the qualify loop) and
 * qualify.py (threshold selection).
 *
 * Takes a learner's marks and the programme dataset and produces the
 * same three buckets the Python API produces -- qualified, near misses,
 * and programmes no formula can score. The response shape is the one
 * lib/qualify-api.ts already consumed when this was a hosted service,
 * so nothing downstream changed.
 */
import { SCORERS, type Marks, type ScoringConfig } from "./scoring"
import { evaluate, subjectDisplayName, type Failure } from "./evaluator"
import { percentageToLevel } from "./subjects"

export interface Institution {
  id: string
  name?: string
  scoring_strategy: string
  scoring_config?: ScoringConfig
  [k: string]: any
}

export interface Programme {
  institution_id: string
  academic_year: number
  qualification_code: string
  name: string
  faculty: string | null
  campus?: string[]
  duration_years?: number | null
  requirements: { nsc: Record<string, any> }
  selection_notes?: string[]
  scoring_override?: ScoringConfig | null
  scoring_strategy_override?: string | null
  scoreable?: boolean
  streams?: any[]
  [k: string]: any
}

export interface FailureOut {
  kind: string
  message: string
  required_level: number | null
  actual_level: number | null
}

export interface ProgrammeResult {
  institution: string
  qualification_code: string
  name: string
  faculty: string | null
  campus: string[]
  duration_years: number | null
  score_required: number | null
  score_actual: number
  margin: number | null
  selection_notes: string[]
  failures: FailureOut[]
}

export interface UnscoreableResult {
  institution: string
  qualification_code: string
  name: string
  faculty: string | null
  campus: string[]
  duration_years: number | null
  selection_notes: string[]
}

export interface QualifyResult {
  scores: Record<string, number>
  qualified: ProgrammeResult[]
  near_misses: ProgrammeResult[]
  requires_additional_assessment: UnscoreableResult[]
  evaluated_count: number
}

/** The LOWEST published threshold that applies to this learner, or null
 * if none does -- e.g. every threshold requires Mathematics or
 * Mathematical Literacy and they took neither. The caller must treat
 * null as a failure, never fall back to an arbitrary threshold.
 *
 * `requires_subject` alone means "appears on the certificate at all".
 * The optional `requires_level` closes the gap where a learner holds a
 * weak subject (present, below that route's own minimum) alongside a
 * strong alternative, and the weak one's lower threshold would
 * otherwise apply. */
export function selectScoreThreshold(
  scoreEntries: Array<Record<string, any>>, marks: Marks,
): number | null {
  const applicable: number[] = []
  for (const entry of scoreEntries) {
    const subject = entry.requires_subject ?? null
    if (subject === null) {
      applicable.push(entry.min_score)
      continue
    }
    if (!(subject in marks)) continue
    const minLevel = entry.requires_level ?? null
    if (minLevel !== null && percentageToLevel(marks[subject]) < minLevel) continue
    applicable.push(entry.min_score)
  }
  return applicable.length ? Math.min(...applicable) : null
}

function unscoreableResult(p: Programme): UnscoreableResult {
  return {
    institution: p.institution_id,
    qualification_code: p.qualification_code,
    name: p.name,
    faculty: p.faculty ?? null,
    campus: p.campus ?? [],
    duration_years: p.duration_years ?? null,
    selection_notes: p.selection_notes ?? [],
  }
}

/** The institution's strategy and config, unless the programme itself
 * overrides one or both. */
function resolveScoring(
  institution: Institution, programme: Programme,
): [string, ScoringConfig] {
  const strategy = programme.scoring_strategy_override || institution.scoring_strategy
  const config = { ...(institution.scoring_config ?? {}), ...(programme.scoring_override ?? {}) }
  return [strategy, config]
}

function evaluateProgramme(
  programme: Programme, marks: Marks, achieved: number,
): ProgrammeResult {
  const nsc = programme.requirements.nsc
  const excluded = new Set<string>(nsc.excluded_subjects ?? [])
  const required = selectScoreThreshold(nsc.score, marks)

  const failures: Failure[] = []
  if (required === null) {
    // No score entry applies at all. That is a failure, not a pass via
    // some fallback threshold.
    const requiredNames = (nsc.score as Array<Record<string, any>>)
      .filter((e) => e.requires_subject)
      .map((e) => subjectDisplayName(e.requires_subject))
    failures.push({
      kind: "score",
      message: `Requires ${requiredNames.join(" or ")} to determine eligibility for this programme`,
      required: null, actual: achieved, subject: null,
    })
  } else if (achieved < required) {
    failures.push({
      kind: "score",
      message: `Requires an APS of ${required}; you have ${achieved}`,
      required, actual: achieved, subject: null,
    })
  }
  failures.push(...evaluate(nsc.subjects, marks, excluded))

  return {
    institution: programme.institution_id,
    qualification_code: programme.qualification_code,
    name: programme.name,
    faculty: programme.faculty ?? null,
    campus: programme.campus ?? [],
    duration_years: programme.duration_years ?? null,
    score_required: required,
    score_actual: achieved,
    margin: required !== null ? achieved - required : null,
    selection_notes: programme.selection_notes ?? [],
    failures: failures.map((f) => ({
      kind: f.kind, message: f.message,
      required_level: f.required, actual_level: f.actual,
    })),
  }
}

export interface QualifyOptions {
  academicYear?: number | null
  institutions?: string[] | null
  includeNearMisses?: boolean
}

export function runQualify(
  marks: Marks,
  programmes: Programme[],
  institutionsById: Record<string, Institution>,
  options: QualifyOptions = {},
): QualifyResult {
  const { academicYear = null, institutions = null, includeNearMisses = true } = options

  let candidates = programmes
  if (academicYear !== null && academicYear !== undefined) {
    candidates = candidates.filter((p) => p.academic_year === academicYear)
  }
  if (institutions && institutions.length) {
    const wanted = new Set(institutions)
    candidates = candidates.filter((p) => wanted.has(p.institution_id))
  }

  const scores: Record<string, number> = {}
  // A university usually offers many programmes and its score only
  // needs computing once, so both the institution score and any
  // per-programme override are cached.
  const overrideScores = new Map<string, number>()
  const qualified: ProgrammeResult[] = []
  const nearMisses: ProgrammeResult[] = []
  const requiresAdditionalAssessment: UnscoreableResult[] = []

  for (const programme of candidates) {
    const institutionId = programme.institution_id
    const institution = institutionsById[institutionId]
    if (!institution) continue
    if (!(institutionId in scores)) {
      const strategy = institution.scoring_strategy
      scores[institutionId] = SCORERS[strategy](marks, institution.scoring_config ?? {})
    }

    if (programme.scoreable === false) {
      requiresAdditionalAssessment.push(unscoreableResult(programme))
      continue
    }

    let achieved: number
    if (programme.scoring_override || programme.scoring_strategy_override) {
      const [strategy, config] = resolveScoring(institution, programme)
      const cacheKey = `${strategy}\u0000${stableStringify(config)}`
      if (!overrideScores.has(cacheKey)) {
        overrideScores.set(cacheKey, SCORERS[strategy](marks, config))
      }
      achieved = overrideScores.get(cacheKey) as number
    } else {
      achieved = scores[institutionId]
    }

    const result = evaluateProgramme(programme, marks, achieved)
    if (result.failures.length === 0) qualified.push(result)
    else if (includeNearMisses && result.failures.length <= 2) nearMisses.push(result)
  }

  // Stable, like Python's sort, so equal margins keep dataset order.
  qualified.sort((a, b) => (b.margin ?? 0) - (a.margin ?? 0))

  return {
    scores,
    qualified,
    near_misses: nearMisses,
    requires_additional_assessment: requiresAdditionalAssessment,
    evaluated_count: candidates.length,
  }
}

/** Key-sorted JSON, matching the Python's json.dumps(sort_keys=True)
 * cache key so two equivalent configs share one computed score. */
function stableStringify(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value) ?? "null"
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`
  const entries = Object.entries(value as Record<string, unknown>).sort(
    ([a], [b]) => (a < b ? -1 : a > b ? 1 : 0),
  )
  return `{${entries.map(([k, v]) => `${JSON.stringify(k)}:${stableStringify(v)}`).join(",")}}`
}
