export type Subject = { id: string; name: string; percentage: number }

export const HOME_LANGUAGES = [
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

export const FIRST_ADDITIONAL_LANGUAGES = [
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

const CONFLICTING_SUBJECTS: string[][] = [
  ["Mathematics", "Mathematical Literacy"],
  ["English Home Language", "English First Additional Language"],
  ["Afrikaans Home Language", "Afrikaans First Additional Language"],
  ["IsiZulu Home Language", "IsiZulu First Additional Language"],
  ["IsiXhosa Home Language", "IsiXhosa First Additional Language"],
  ["Sepedi Home Language", "Sepedi First Additional Language"],
  ["Sesotho Home Language", "Sesotho First Additional Language"],
  ["Setswana Home Language", "Setswana First Additional Language"],
  ["Tshivenda Home Language", "Tshivenda First Additional Language"],
  ["Xitsonga Home Language", "Xitsonga First Additional Language"],
  ["SiSwati Home Language", "SiSwati First Additional Language"],
  ["Information Technology", "Computer Applications Technology"],
]

function getLanguageBase(name: string) {
  return name.split(" ")[0]
}

export class SubjectValidator {
  private readonly subjects: Subject[]

  constructor(subjects: Subject[]) {
    this.subjects = subjects
  }

  homeLanguage(): Subject | null {
    return this.subjects.find((s) => HOME_LANGUAGES.includes(s.name)) || null
  }

  firstAdditionalLanguage(): Subject | null {
    return this.subjects.find((s) => FIRST_ADDITIONAL_LANGUAGES.includes(s.name)) || null
  }

  hasMath(): boolean {
    return this.subjects.some((s) => s.name === "Mathematics")
  }

  hasMathLit(): boolean {
    return this.subjects.some((s) => s.name === "Mathematical Literacy")
  }

  hasLifeOrientation(): boolean {
    return this.subjects.some((s) => s.name === "Life Orientation")
  }

  hasConflicts(): boolean {
    const hl = this.homeLanguage()
    const fal = this.firstAdditionalLanguage()
    if (hl && fal && getLanguageBase(hl.name) === getLanguageBase(fal.name)) return true
    if (this.hasMath() && this.hasMathLit()) return true
    return false
  }

  isSubjectDisabled(subjectName: string): boolean {
    // Already selected
    if (this.subjects.some((s) => s.name === subjectName)) return true

    // Home language: allow only one
    if (HOME_LANGUAGES.includes(subjectName)) {
      const hasHomeLanguage = this.subjects.some((subject) => HOME_LANGUAGES.includes(subject.name))
      if (hasHomeLanguage) return true
    }

    // First Additional Language: allow only one across all languages
    if (FIRST_ADDITIONAL_LANGUAGES.includes(subjectName)) {
      const hasFirstAdditionalLanguage = this.subjects.some((subject) =>
        FIRST_ADDITIONAL_LANGUAGES.includes(subject.name),
      )
      if (hasFirstAdditionalLanguage) return true
    }

    // Other conflict groups
    for (const group of CONFLICTING_SUBJECTS) {
      if (group.includes(subjectName)) {
        const hasConflict = this.subjects.some((s) => group.includes(s.name) && s.name !== subjectName)
        if (hasConflict) return true
      }
    }

    return false
  }

  getDisabledReason(subjectName: string): string | null {
    if (this.subjects.some((s) => s.name === subjectName)) {
      return "This subject is already added"
    }

    // Home language conflicts
    if (HOME_LANGUAGES.includes(subjectName)) {
      const existingHomeLanguage = this.subjects.find((s) => HOME_LANGUAGES.includes(s.name))
      if (existingHomeLanguage) {
        return `You can only choose ONE home language. Currently selected: ${existingHomeLanguage.name}.`
      }
    }

    // First Additional Language conflicts (only one allowed)
    if (FIRST_ADDITIONAL_LANGUAGES.includes(subjectName)) {
      const existingFAL = this.subjects.find((s) => FIRST_ADDITIONAL_LANGUAGES.includes(s.name))
      if (existingFAL) {
        return `You can only choose ONE first additional language. Currently selected: ${existingFAL.name}.`
      }
    }

    // Other conflict groups
    for (const group of CONFLICTING_SUBJECTS) {
      if (group.includes(subjectName)) {
        const conflictingSubject = this.subjects.find((s) => group.includes(s.name) && s.name !== subjectName)
        if (conflictingSubject) {
          return `Cannot add ${subjectName} because ${conflictingSubject.name} is already selected.`
        }
      }
    }

    return null
  }
}