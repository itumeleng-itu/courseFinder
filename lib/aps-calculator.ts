import type { SubjectEntry } from "./types"
import { APSResult } from "./aps/types"
import { percentageToLevel } from "./aps/utils"
import {
  calculateWitsAPS,
  calculateUWCAPS,
  calculateUFHAPS,
  calculateMUTAPS,
  calculateCUTAPS
} from "./aps/methods"

export * from "./aps/types"
export * from "./aps/utils"

export function calculateAPS(subjects: SubjectEntry[], universityId: string): APSResult {
  const validSubjects = subjects.filter((s) => s.name && s.percentage > 0)
  if (validSubjects.length === 0) return { aps: 0, method: "", breakdown: [], eligibleSubjects: [] }

  const loSub = validSubjects.find((s) => s.name.toLowerCase() === "life orientation")
  const others = validSubjects.filter((s) => s.name.toLowerCase() !== "life orientation")
  others.sort((a, b) => b.percentage - a.percentage)
  const top6 = others.slice(0, 6)
  let total = top6.reduce((sum, s) => sum + s.percentage, 0)
  if (loSub && top6.length < 6) total += loSub.percentage

  const id = universityId.toLowerCase()
  if (id === "wits") return calculateWitsAPS(subjects)
  if (id === "uwc") return calculateUWCAPS(subjects)
  if (id === "ufh") return calculateUFHAPS(subjects)
  if (id === "mut") return calculateMUTAPS(subjects)
  if (id === "cut") return calculateCUTAPS(subjects)

  switch (id) {
    case "uct":
    case "nmu":
      return { aps: total, method: `${id.toUpperCase()}: Sum of 6 best subject percentages`, breakdown: top6.map(s => `${s.name}: ${s.percentage}%`), eligibleSubjects: top6 }
    case "rhodes":
    case "ru":
      return { aps: Math.round(total / 10), method: "Rhodes: Sum of 6 best subjects ÷ 10", breakdown: top6.map(s => `${s.name}: ${s.percentage}% = ${(s.percentage / 10).toFixed(1)} pts`), eligibleSubjects: top6 }
    case "stellenbosch":
    case "sun":
      return { aps: Math.round(total / 6), method: "Stellenbosch: Average of 6 best subjects", breakdown: top6.map(s => `${s.name}: ${s.percentage}%`), eligibleSubjects: top6 }
    default:
      const aps = top6.reduce((sum, s) => sum + percentageToLevel(Number(s.percentage)), 0)
      return { aps, method: "Standard: NSC 1-7 scale, 6 subjects (excluding LO)", breakdown: top6.map(s => `${s.name}: ${s.percentage}% = ${percentageToLevel(Number(s.percentage))} pts`), eligibleSubjects: top6 }
  }
}

export function getUniversityAPSInfo(universityId: string) {
  const info: Record<string, { method: string; maxPoints: number; notes: string }> = {
    uct: { method: "Sum of percentages", maxPoints: 600, notes: "LO excluded" },
    wits: { method: "Best 7 subjects (1-8)", maxPoints: 56, notes: "LO half" },
    up: { method: "Best 6 subjects (1-7)", maxPoints: 42, notes: "Standard" },
    stellenbosch: { method: "Average (%)", maxPoints: 100, notes: "Average" },
    uwc: { method: "Weighted", maxPoints: 67, notes: "Eng/Mat: 15" }
  }
  return info[universityId.toLowerCase()] || { method: "Standard NSC", maxPoints: 42, notes: "Best 6" }
}
