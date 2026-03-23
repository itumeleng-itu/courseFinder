---
name: sa-university-admissions
description: >
  Build a South African university admissions matching system from any official
  university prospectus PDF. Use this skill whenever the user wants to: parse
  admission requirements from a university prospectus, build a programme
  eligibility matcher for NSC (matric) results, generate a JSON database of
  university programmes, create an API for APS/subject matching, or check
  whether a student qualifies for any SA university programme. Trigger this
  skill any time the user mentions APS, NSC results, matric admission,
  university programmes, a prospectus PDF, or wants to build any tool that maps
  South African matric subjects and levels to university entry requirements —
  even if they only mention one specific university (e.g. TUT, UCT, Wits, UJ,
  UP, UNISA, DUT, CUT, NWU, SU, Rhodes, UFH, UL, UMP, UZ, WSU, MUT, SMU, VUT).
---

# SA University Admissions Skill

Automates building a complete university admissions matching system for **any**
South African university — from a prospectus PDF to a JSON data file and
matching API/utility functions.

## Core Architecture Principle

> **APS calculation rules live in the university's JSON, not in the API code.**
> The API is a rules interpreter. Each university JSON is self-describing —
> it defines exactly how its APS is calculated. Adding a new university means
> adding a new JSON file only. No code changes ever needed.

TUT is the reference implementation throughout this skill.

---

## What This Skill Produces

| File | Purpose |
|---|---|
| `data/universities/{abbr}.json` | University data — programmes + APS rules |
| `lib/admissions/calculateAPS.ts` | Rules interpreter — reads JSON, calculates APS |
| `lib/admissions/checkEligibility.ts` | Matches student subjects against a programme |
| `app/api/admissions/match/route.ts` | POST /api/admissions/match |
| `app/api/admissions/aps/route.ts` | POST /api/admissions/aps |

> If building a standalone Express API instead of Next.js, all logic goes in
> `server.js`. The function signatures and JSON schema are identical.

---

## Step 1 — Extract APS Rules from the Prospectus

Before extracting programme data, read the prospectus for the university's
specific APS rules. Document them in the JSON `aps_rules` block.

### Rules to look for

| Rule | What to check | Common values |
|---|---|---|
| `life_orientation` | How is LO treated? | `"excluded"`, `"capped:4"`, `"included"` |
| `level_1_exclusion` | Are level-1 subjects ignored? | `true` / `false` |
| `subjects_counted` | How many subjects count toward APS? | `"all"`, `"top_6"`, `"top_7"` |
| `additional_tests` | Are external tests required? | `"NBT"`, `"none"` |

### Known rules per university (verify against current prospectus)

| University | LO | Level 1 | Subjects counted | Extra tests |
|---|---|---|---|---|
| TUT | excluded | excluded | all | none |
| UCT | excluded | excluded | top 6 | NBT |
| Wits | excluded | excluded | top 6 | NBT |
| UJ | excluded | excluded | all | none |
| UP | capped at 4 | excluded | top 6 | none |
| NWU | excluded | excluded | top 6 | none |
| SU (Stellenbosch) | capped at 4 | excluded | top 6 | none |
| DUT | excluded | excluded | all | none |
| CUT | excluded | excluded | all | none |
| UNISA | excluded | excluded | top 6 | none |

---

## Step 2 — JSON Schema

### File location
```
data/universities/tut.json
data/universities/uct.json
data/universities/wits.json
```

### Top-level structure

```json
{
  "university": {
    "name": "Tshwane University of Technology",
    "abbreviation": "TUT",
    "year": 2027,
    "website": "https://www.tut.ac.za",
    "aps_rules": {
      "life_orientation": "excluded",
      "level_1_exclusion": true,
      "subjects_counted": "all",
      "additional_tests": "none",
      "notes": "Mathematical Literacy requires a higher APS than pure Mathematics for most programmes"
    }
  },
  "programmes": []
}
```

### `aps_rules` field reference

```
life_orientation:
  "excluded"    — LO is not counted at all
  "capped:4"    — LO counted but capped at 4 points (e.g. UP, Stellenbosch)
  "included"    — LO counted at face value

level_1_exclusion:
  true          — level 1 subjects contribute 0 and are not counted
  false         — level 1 subjects contribute 1 point

subjects_counted:
  "all"         — all eligible subjects summed (e.g. TUT, UJ, DUT)
  "top_6"       — only the 6 highest eligible subjects summed (e.g. UCT, Wits, UP)
  "top_7"       — only the 7 highest eligible subjects summed

additional_tests:
  "none"        — no additional tests required
  "NBT"         — National Benchmark Test required (flag in response, don't block match)
```

### Programme schema

```json
{
  "id": "diploma-information-technology",
  "name": "Diploma in Information Technology",
  "faculty": "Faculty of Information and Communication Technology",
  "department": "Department of Computer Science",
  "qualification_type": "Diploma",
  "duration_years": 3,
  "main_campus": "Pretoria",
  "other_campuses": ["Soshanguve", "Mbombela"],
  "application_deadline": "2026-09-30",
  "admission_requirements": {
    "min_aps": 24,
    "aps_conditions": [
      { "condition": "With Mathematical Literacy", "min_aps": 28 },
      { "condition": "With Mathematics or Technical Mathematics", "min_aps": 24 }
    ],
    "compulsory_subjects": [
      {
        "label": "English",
        "subject_group": "one of",
        "subjects": [
          { "subject": "English Home Language", "min_level": 4 },
          { "subject": "English First Additional Language", "min_level": 4 }
        ]
      },
      {
        "label": "Mathematics",
        "subject_group": "one of",
        "subjects": [
          { "subject": "Mathematics", "min_level": 3 },
          { "subject": "Technical Mathematics", "min_level": 3 },
          { "subject": "Mathematical Literacy", "min_level": 4 }
        ]
      }
    ],
    "special_requirements": null,
    "special_entry": null
  },
  "careers": ["Software Developer", "Systems Analyst"],
  "further_studies": ["Advanced Diploma in IT", "B.Tech Information Technology"]
}
```

### Schema field notes

- `aps_conditions` — conditional thresholds selected by the API based on the
  student's actual subjects. Leave as `[]` if APS is unconditional.
- `subject_group: "one of"` — student must meet ANY ONE subject in the group
- `subject_group: "one of the combinations"` — student must meet a matching pair/set
- `special_entry` — alternative route (RPL, employed, mature age). Use `null`
  if not applicable:
  ```json
  {
    "description": "For employed law enforcement officers",
    "min_aps": 20,
    "compulsory_subjects": []
  }
  ```

---

## Step 3 — APS Calculator (rules-driven)

The calculator reads `university.aps_rules` and applies them. No university
name or hardcoded logic inside this function.

```typescript
// lib/admissions/calculateAPS.ts

export interface APSRules {
  life_orientation: string        // "excluded" | "capped:N" | "included"
  level_1_exclusion: boolean
  subjects_counted: string        // "all" | "top_6" | "top_7"
  additional_tests: string
}

export interface APSResult {
  total: number
  breakdown: Record<string, {
    level: number
    counted: boolean
    contribution: number
    reason?: string
  }>
}

export function calculateAPS(
  subjects: Record<string, number>,
  rules: APSRules
): APSResult {
  const breakdown: APSResult['breakdown'] = {}
  const eligible: Array<{ name: string; level: number }> = []

  for (const [subject, level] of Object.entries(subjects)) {
    const lvl = typeof level === 'string' ? parseInt(level as string) : level
    const isLO = subject.toLowerCase().includes('life orientation')

    if (isLO) {
      if (rules.life_orientation === 'excluded') {
        breakdown[subject] = { level: lvl, counted: false, contribution: 0, reason: 'Life Orientation excluded' }
        continue
      }
      if (rules.life_orientation.startsWith('capped:')) {
        const cap = parseInt(rules.life_orientation.split(':')[1])
        const contribution = Math.min(lvl, cap)
        breakdown[subject] = { level: lvl, counted: true, contribution }
        eligible.push({ name: subject, level: contribution })
        continue
      }
    }

    if (rules.level_1_exclusion && lvl <= 1) {
      breakdown[subject] = { level: lvl, counted: false, contribution: 0, reason: 'Level 1 excluded' }
      continue
    }

    eligible.push({ name: subject, level: lvl })
    breakdown[subject] = { level: lvl, counted: true, contribution: lvl }
  }

  // Apply subjects_counted cap (top_6, top_7, or all)
  const limit = rules.subjects_counted === 'top_6' ? 6
              : rules.subjects_counted === 'top_7' ? 7
              : Infinity

  const sorted = [...eligible].sort((a, b) => b.level - a.level)
  const counted = sorted.slice(0, limit)
  const dropped = new Set(sorted.slice(limit).map(s => s.name))

  for (const name of dropped) {
    breakdown[name].counted = false
    breakdown[name].contribution = 0
    breakdown[name].reason = `Not in top ${limit}`
  }

  const total = counted.reduce((sum, s) => sum + s.level, 0)
  return { total, breakdown }
}
```

---

## Step 4 — Subject Matching

> **Use the project's existing subject alias system** (`data/subject-aliases.ts`
> / `lib/matric/constants.ts`) for subject lookups. Do NOT use raw `.includes()`
> substring matching — it produces false positives and misses valid aliases
> (e.g. a user typing "maths" vs "Mathematics", or "acc" vs "Accounting").

```typescript
// lib/admissions/checkEligibility.ts

import { calculateAPS, APSRules } from './calculateAPS'
import { resolveSubjectName } from '@/lib/matric/constants' // existing alias system

function findSubjectLevel(
  studentSubjects: Record<string, number>,
  searchName: string
): number | null {
  const canonical = resolveSubjectName(searchName)
  for (const [name, level] of Object.entries(studentSubjects)) {
    if (resolveSubjectName(name) === canonical) return level
  }
  return null
}

export function checkEligibility(
  programme: any,
  studentSubjects: Record<string, number>,
  apsRules: APSRules
) {
  const issues: string[] = []
  const { total: studentAPS } = calculateAPS(studentSubjects, apsRules)

  // 1. Check compulsory subject groups
  for (const req of programme.admission_requirements.compulsory_subjects) {
    if (req.subject_group === 'one of' || req.subject_group === 'one of the combinations') {
      const groupMet = req.subjects.some((option: any) => {
        const lvl = findSubjectLevel(studentSubjects, option.subject)
        return lvl !== null && lvl >= option.min_level
      })
      if (!groupMet) {
        const opts = req.subjects.map((s: any) => `${s.subject} (L${s.min_level}+)`).join(' OR ')
        issues.push(`Missing: ${opts}`)
      }
    }
  }

  // 2. Select conditional APS threshold based on student's subjects
  let requiredAPS = programme.admission_requirements.min_aps
  let appliedCondition: string | null = null

  for (const cond of (programme.admission_requirements.aps_conditions ?? [])) {
    const c = cond.condition.toLowerCase()
    const hasMathLit  = findSubjectLevel(studentSubjects, 'Mathematical Literacy') !== null
    const hasMaths    = findSubjectLevel(studentSubjects, 'Mathematics') !== null
    const hasTechMath = findSubjectLevel(studentSubjects, 'Technical Mathematics') !== null

    if (hasMathLit && c.includes('mathematical literacy')) {
      requiredAPS = cond.min_aps; appliedCondition = cond.condition; break
    }
    if ((hasMaths || hasTechMath) && c.includes('mathematics') && !c.includes('mathematical literacy')) {
      requiredAPS = cond.min_aps; appliedCondition = cond.condition; break
    }
  }

  // 3. APS check
  if (studentAPS < requiredAPS) {
    issues.push(`APS: have ${studentAPS}, need ${requiredAPS}${appliedCondition ? \` (\${appliedCondition})\` : ''}`)
  }

  return {
    eligible: issues.length === 0,
    programme_id: programme.id,
    programme_name: programme.name,
    faculty: programme.faculty,
    qualification_type: programme.qualification_type,
    duration_years: programme.duration_years,
    main_campus: programme.main_campus,
    other_campuses: programme.other_campuses,
    application_deadline: programme.application_deadline,
    aps_achieved: studentAPS,
    aps_required: requiredAPS,
    aps_margin: studentAPS - requiredAPS,
    aps_condition_applied: appliedCondition,
    additional_tests_required: apsRules.additional_tests !== 'none' ? apsRules.additional_tests : null,
    issues,
    careers: programme.careers,
    further_studies: programme.further_studies,
    special_requirements: programme.admission_requirements.special_requirements ?? null
  }
}
```

---

## Step 5 — API Routes (Next.js)

### `POST /api/admissions/match`

```typescript
// app/api/admissions/match/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { checkEligibility } from '@/lib/admissions/checkEligibility'

export async function POST(req: NextRequest) {
  const { subjects, university: uniAbbr = 'tut', faculty, qualification_type } = await req.json()

  if (!subjects || !Object.keys(subjects).length) {
    return NextResponse.json({ error: 'subjects object required' }, { status: 400 })
  }

  const data = await import(`@/data/universities/${uniAbbr.toLowerCase()}.json`)
  const { university, programmes: all } = data

  let programmes = all
  if (faculty) programmes = programmes.filter((p: any) => p.faculty.toLowerCase().includes(faculty.toLowerCase()))
  if (qualification_type) programmes = programmes.filter((p: any) => p.qualification_type.toLowerCase().includes(qualification_type.toLowerCase()))

  const results = programmes.map((p: any) => checkEligibility(p, subjects, university.aps_rules))
  const eligible   = results.filter((r: any) =>  r.eligible).sort((a: any, b: any) => b.aps_margin - a.aps_margin)
  const ineligible = results.filter((r: any) => !r.eligible).sort((a: any, b: any) => b.aps_margin - a.aps_margin)

  return NextResponse.json({
    university: university.name,
    student_aps: results[0]?.aps_achieved ?? 0,
    subjects_submitted: subjects,
    summary: { total_checked: results.length, eligible_count: eligible.length, ineligible_count: ineligible.length },
    eligible_programmes: eligible,
    ineligible_programmes: ineligible
  })
}
```

### `POST /api/admissions/aps`

```typescript
// app/api/admissions/aps/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { calculateAPS } from '@/lib/admissions/calculateAPS'

export async function POST(req: NextRequest) {
  const { subjects, university: uniAbbr = 'tut' } = await req.json()
  const data = await import(`@/data/universities/${uniAbbr.toLowerCase()}.json`)
  const result = calculateAPS(subjects, data.university.aps_rules)
  return NextResponse.json({ university: data.university.name, aps_rules: data.university.aps_rules, ...result })
}
```

---

## Step 6 — Adding a New University

1. Create `data/universities/{abbr}.json`
2. Read the prospectus and fill in `university.aps_rules` (Step 1)
3. Extract all programmes into the `programmes` array (Step 2)
4. Done — no code changes needed anywhere

```
data/universities/
├── tut.json     ← excluded LO, excluded L1, sum all
├── uct.json     ← excluded LO, excluded L1, top 6, NBT
├── wits.json    ← excluded LO, excluded L1, top 6, NBT
├── up.json      ← capped LO:4, excluded L1, top 6
└── index.ts     ← re-exports for static imports if needed
```

---

## Checklist

### Per university JSON
- [ ] `university.aps_rules` fully populated from the prospectus
- [ ] `life_orientation` value confirmed (`excluded` / `capped:N` / `included`)
- [ ] `level_1_exclusion` confirmed (`true` / `false`)
- [ ] `subjects_counted` confirmed (`all` / `top_6` / `top_7`)
- [ ] `additional_tests` set (`none` / `NBT`)
- [ ] All faculties and programmes included
- [ ] `aps_conditions` array used for programmes with maths-type thresholds
- [ ] Compulsory subject groups use correct `subject_group` type
- [ ] `special_entry` populated or explicitly `null`

### API / functions
- [ ] `calculateAPS` reads all rules from JSON — zero hardcoded university logic
- [ ] `top_6` / `top_7` correctly sorts descending and drops lowest subjects
- [ ] `capped:N` correctly applies `Math.min(level, N)` for Life Orientation
- [ ] Subject matching uses alias system, not raw `.includes()`
- [ ] Conditional APS selects correct threshold per student's maths type
- [ ] Results sorted by `aps_margin` descending (closest misses near top)
- [ ] NBT flagged in response, not used to block eligibility
