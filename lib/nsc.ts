import type { SubjectEntry } from "@/lib/types"

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

export type PassLevel = "none" | "higher_certificate" | "diploma" | "bachelor"

export interface NSCResult {
  meetsBasicNSC: boolean
  passLevel: PassLevel
  reasons: string[]
}

function isEnglishOrAfrikaansLanguage(name: string) {
  return name.startsWith("English") || name.startsWith("Afrikaans")
}

export function evaluateNSC(subjects: SubjectEntry[]): NSCResult {
  const reasons: string[] = []

  const hl = subjects.find((s) => HOME_LANGUAGES.includes(s.name))
  const fal = subjects.find((s) => FIRST_ADDITIONAL_LANGUAGES.includes(s.name))
  const lo = subjects.find((s) => s.name === "Life Orientation")

  if (!hl) reasons.push("No Home Language selected")
  if (!fal) reasons.push("No First Additional Language selected")
  if (!lo) reasons.push("Life Orientation not selected")

  const passes30 = subjects.filter((s) => s.percentage >= 30)

  const hlMet = !!hl && hl.percentage >= 40
  if (hl && hl.percentage < 40) reasons.push("Home Language must be at least 40%")

  const othersExcludingHL = subjects.filter((s) => s !== hl)
  const othersExcludingLOAndHL = subjects.filter((s) => s !== hl && s.name !== "Life Orientation")

  // Basic NSC: HL >=40, two other subjects >=40, three other subjects >=30, pass at least 6 subjects
  const other40CountBasic = othersExcludingHL.filter((s) => s.percentage >= 40).length
  const other30CountBasic = othersExcludingHL.filter((s) => s.percentage >= 30).length
  const passAtLeastSix = passes30.length >= 6

  const meetsBasicNSC = hlMet && other40CountBasic >= 2 && other30CountBasic >= 3 && passAtLeastSix
  if (!passAtLeastSix) reasons.push("You must pass at least 6 subjects (>=30%)")

  // Pass levels (LO excluded for Diploma and Bachelor thresholds where specified)
  const bachelor50Count = othersExcludingLOAndHL.filter((s) => s.percentage >= 50).length
  const bachelor30Count = othersExcludingLOAndHL.filter((s) => s.percentage >= 30).length
  const meetsBachelor = hlMet && bachelor50Count >= 4 && bachelor30Count >= 2

  const diploma40Count = othersExcludingLOAndHL.filter((s) => s.percentage >= 40).length
  const diploma30Count = othersExcludingHL.filter((s) => s.percentage >= 30).length
  const meetsDiploma = hlMet && diploma40Count >= 3 && diploma30Count >= 2

  const hc40Others = othersExcludingHL.filter((s) => s.percentage >= 40).length
  const hc30Others = othersExcludingHL.filter((s) => s.percentage >= 30).length
  const languageRequirementForHC = !!hl && !!fal && (isEnglishOrAfrikaansLanguage(hl.name) || isEnglishOrAfrikaansLanguage(fal.name))
  const meetsHC = hlMet && hc40Others >= 2 && hc30Others >= 3 && passAtLeastSix && languageRequirementForHC
  if (!languageRequirementForHC) {
    reasons.push("One of HL or FAL must be English or Afrikaans for Higher Certificate")
  }

  let passLevel: PassLevel = "none"
  if (meetsBachelor) passLevel = "bachelor"
  else if (meetsDiploma) passLevel = "diploma"
  else if (meetsHC) passLevel = "higher_certificate"

  return { meetsBasicNSC, passLevel, reasons }
}
