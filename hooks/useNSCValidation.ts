"use client"

import { useMemo } from "react"
import { evaluateNSC } from "@/lib/nsc"

export type Subject = { id: string; name: string; percentage: number }

const HOME_LANGUAGES = [
  "English Home Language",
  "Afrikaans Home Language",
  "IsiZulu Home Language",
  "IsiXhosa Home Language",
  "Sepedi Home Language",
  "Sesotho Home Language",
  "Setswana Home Language",
  "Tshivenda Home Language",
  "Xitsonga Home Language",
  "SiSwati Home Language",
]

const FIRST_ADDITIONAL_LANGUAGES = [
  "English First Additional Language",
  "Afrikaans First Additional Language",
  "IsiZulu First Additional Language",
  "IsiXhosa First Additional Language",
  "Sepedi First Additional Language",
  "Sesotho First Additional Language",
  "Setswana First Additional Language",
  "Tshivenda First Additional Language",
  "Xitsonga First Additional Language",
  "SiSwati First Additional Language",
]

function getLanguageBase(name: string) {
  return name.split(" ")[0]
}

export interface ProgressItem {
  key: string
  label: string
  status: "done" | "missing" | "warning"
  detail?: string
}

export interface UseNSCValidationResult {
  homeLanguage: Subject | null
  firstAdditionalLanguage: Subject | null
  hasMath: boolean
  hasMathLit: boolean
  hasLifeOrientation: boolean
  hasSelectionConflicts: boolean
  compulsorySelectionsValid: boolean
  electiveCount: number
  meetsNSCMinimums: boolean
  canCalculate: boolean
  progress: ProgressItem[]
  errors: string[]
}

export function useNSCValidation(subjects: Subject[]): UseNSCValidationResult {
  const homeLanguage = useMemo(
    () => subjects.find((s) => HOME_LANGUAGES.includes(s.name)) || null,
    [subjects],
  )

  const firstAdditionalLanguage = useMemo(
    () => subjects.find((s) => FIRST_ADDITIONAL_LANGUAGES.includes(s.name)) || null,
    [subjects],
  )

  const hasMath = useMemo(() => subjects.some((s) => s.name === "Mathematics"), [subjects])
  const hasMathLit = useMemo(() => subjects.some((s) => s.name === "Mathematical Literacy"), [subjects])
  const hasLifeOrientation = useMemo(() => subjects.some((s) => s.name === "Life Orientation"), [subjects])

  const hasSelectionConflicts = useMemo(() => {
    if (homeLanguage && firstAdditionalLanguage) {
      if (getLanguageBase(homeLanguage.name) === getLanguageBase(firstAdditionalLanguage.name)) return true
    }
    if (hasMath && hasMathLit) return true
    return false
  }, [homeLanguage, firstAdditionalLanguage, hasMath, hasMathLit])

  const compulsorySelectionsValid = useMemo(() => {
    if (!homeLanguage || !firstAdditionalLanguage || !hasLifeOrientation) return false
    const differentLanguage = getLanguageBase(homeLanguage.name) !== getLanguageBase(firstAdditionalLanguage.name)
    const exactlyOneMathChoice = (hasMath ? 1 : 0) + (hasMathLit ? 1 : 0) === 1
    const isEnglishOrAfrikaans = (name: string) => name.startsWith("English") || name.startsWith("Afrikaans")
    const loltConstraint =
      isEnglishOrAfrikaans(homeLanguage.name) || isEnglishOrAfrikaans(firstAdditionalLanguage.name)
    return differentLanguage && exactlyOneMathChoice && loltConstraint
  }, [homeLanguage, firstAdditionalLanguage, hasMath, hasMathLit, hasLifeOrientation])

  const electiveCount = useMemo(() => {
    const compulsoryNames = new Set<string>()
    if (homeLanguage) compulsoryNames.add(homeLanguage.name)
    if (firstAdditionalLanguage) compulsoryNames.add(firstAdditionalLanguage.name)
    if (hasMath) compulsoryNames.add("Mathematics")
    if (hasMathLit) compulsoryNames.add("Mathematical Literacy")
    if (hasLifeOrientation) compulsoryNames.add("Life Orientation")
    return subjects.filter((s) => !compulsoryNames.has(s.name)).length
  }, [subjects, homeLanguage, firstAdditionalLanguage, hasMath, hasMathLit, hasLifeOrientation])

  const meetsNSCMinimums = useMemo(() => evaluateNSC(subjects).meetsBasicNSC, [subjects])

  const canCalculate = useMemo(() => {
    const hasSevenSubjects = subjects.length === 7
    return (
      hasSevenSubjects &&
      compulsorySelectionsValid &&
      electiveCount >= 3 &&
      !hasSelectionConflicts &&
      meetsNSCMinimums
    )
  }, [subjects.length, compulsorySelectionsValid, electiveCount, hasSelectionConflicts, meetsNSCMinimums])

  const errors: string[] = []
  // Actionable errors
  if (homeLanguage && firstAdditionalLanguage) {
    if (getLanguageBase(homeLanguage.name) === getLanguageBase(firstAdditionalLanguage.name)) {
      errors.push("Home Language and First Additional Language must be different languages.")
    }
  }
  if (hasMath && hasMathLit) {
    errors.push("Choose either Mathematics OR Mathematical Literacy, not both.")
  }
  if (!homeLanguage) errors.push("Select a Home Language.")
  if (!firstAdditionalLanguage) errors.push("Select a First Additional Language.")
  if (!hasLifeOrientation) errors.push("Add Life Orientation.")
  if ((hasMath ? 1 : 0) + (hasMathLit ? 1 : 0) !== 1) errors.push("Choose Mathematics or Mathematical Literacy.")
  if (!meetsNSCMinimums) errors.push("NSC minimums not met yet.")
  if (subjects.length !== 7) errors.push("You must enter exactly 7 subjects.")
  if (electiveCount < 3) errors.push("You need at least three elective subjects.")

  const progress: ProgressItem[] = [
    {
      key: "hl",
      label: "Home Language selected (≥40%)",
      status: homeLanguage ? "done" : "missing",
      detail: homeLanguage ? `${homeLanguage.name} - ${homeLanguage.percentage}%` : undefined,
    },
    {
      key: "fal",
      label: "First Additional Language selected",
      status: firstAdditionalLanguage ? "done" : "missing",
      detail: firstAdditionalLanguage ? `${firstAdditionalLanguage.name}` : undefined,
    },
    {
      key: "math",
      label: "Mathematics OR Mathematical Literacy (choose one)",
      status: (hasMath ? 1 : 0) + (hasMathLit ? 1 : 0) === 1 ? "done" : hasMath && hasMathLit ? "warning" : "missing",
      detail: hasMath ? "Mathematics selected" : hasMathLit ? "Mathematical Literacy selected" : undefined,
    },
    { key: "lo", label: "Life Orientation added", status: hasLifeOrientation ? "done" : "missing" },
    {
      key: "lolt",
      label: "Language of Learning & Teaching (English/Afrikaans in HL/FAL)",
      status:
        homeLanguage && firstAdditionalLanguage &&
        (homeLanguage.name.startsWith("English") ||
          homeLanguage.name.startsWith("Afrikaans") ||
          firstAdditionalLanguage.name.startsWith("English") ||
          firstAdditionalLanguage.name.startsWith("Afrikaans"))
          ? "done"
          : "missing",
    },
    {
      key: "count",
      label: "Exactly 7 subjects",
      status: subjects.length === 7 ? "done" : "missing",
      detail: `${subjects.length}/7 selected`,
    },
    {
      key: "electives",
      label: "At least 3 electives",
      status: electiveCount >= 3 ? "done" : "missing",
      detail: `${electiveCount} elective${electiveCount === 1 ? "" : "s"}`,
    },
    { key: "nsc", label: "NSC minimums met", status: meetsNSCMinimums ? "done" : "missing" },
  ]

  return {
    homeLanguage,
    firstAdditionalLanguage,
    hasMath,
    hasMathLit,
    hasLifeOrientation,
    hasSelectionConflicts,
    compulsorySelectionsValid,
    electiveCount,
    meetsNSCMinimums,
    canCalculate,
    progress,
    errors,
  }
}