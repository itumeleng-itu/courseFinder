"use client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface Subject {
  name: string
  percentage: string
}

interface SubjectSelectProps {
  value: string
  onChange: (value: string) => void
  selectedSubjects: string[]
  disabled?: boolean
}

export default function SubjectSelect({ value, onChange, selectedSubjects, disabled }: SubjectSelectProps) {
  // Define subject groups
  const MATH_SUBJECTS = ["Mathematics", "Mathematical Literacy", "Technical Mathematics"]
  const HOME_LANGUAGE_VALUES = [
    "English Home", "Afrikaans Home", "IsiZulu Home", "IsiXhosa Home",
    "Sepedi Home", "Setswana Home", "Sesotho Home", "Xitsonga Home",
    "SiSwati Home", "Tshivenda Home", "IsiNdebele Home"
  ]
  const FIRST_ADDITIONAL_LANGUAGE_VALUES = [
    "English FAL", "Afrikaans FAL", "IsiZulu FAL", "IsiXhosa FAL",
    "Sepedi FAL", "Setswana FAL", "Sesotho FAL", "Xitsonga FAL",
    "SiSwati FAL", "Tshivenda FAL", "IsiNdebele FAL"
  ]

  // Helper function to get corresponding first additional language for a home language value
  const getCorrespondingFAL = (homeLangValue: string): string | null => {
    const mapping: Record<string, string> = {
      "English Home": "English FAL",
      "Afrikaans Home": "Afrikaans FAL",
      "IsiZulu Home": "IsiZulu FAL",
      "IsiXhosa Home": "IsiXhosa FAL",
      "Sepedi Home": "Sepedi FAL",
      "Setswana Home": "Setswana FAL",
      "Sesotho Home": "Sesotho FAL",
      "Xitsonga Home": "Xitsonga FAL",
      "SiSwati Home": "SiSwati FAL",
      "Tshivenda Home": "Tshivenda FAL",
      "IsiNdebele Home": "IsiNdebele FAL",
    }
    return mapping[homeLangValue] || null
  }

  // Helper function to get corresponding home language for a first additional language value
  const getCorrespondingHomeLang = (falValue: string): string | null => {
    const mapping: Record<string, string> = {
      "English FAL": "English Home",
      "Afrikaans FAL": "Afrikaans Home",
      "IsiZulu FAL": "IsiZulu Home",
      "IsiXhosa FAL": "IsiXhosa Home",
      "Sepedi FAL": "Sepedi Home",
      "Setswana FAL": "Setswana Home",
      "Sesotho FAL": "Sesotho Home",
      "Xitsonga FAL": "Xitsonga Home",
      "SiSwati FAL": "SiSwati Home",
      "Tshivenda FAL": "Tshivenda Home",
      "IsiNdebele FAL": "IsiNdebele Home",
    }
    return mapping[falValue] || null
  }

  // Check if any math subject is already selected (to enforce mutual exclusivity)
  const hasMathSubject = selectedSubjects.some((subject) => MATH_SUBJECTS.includes(subject))

  // Check if any home language is already selected
  const hasHomeLanguage = selectedSubjects.some((subject) => HOME_LANGUAGE_VALUES.includes(subject))

  // Check if any first additional language is already selected
  const hasFAL = selectedSubjects.some((subject) => FIRST_ADDITIONAL_LANGUAGE_VALUES.includes(subject))

  // Current subject type checks
  const isCurrentMathSubject = MATH_SUBJECTS.includes(value)
  const isCurrentHomeLanguage = HOME_LANGUAGE_VALUES.includes(value)
  const isCurrentFAL = FIRST_ADDITIONAL_LANGUAGE_VALUES.includes(value)
  
  // Helper to check if a language's corresponding home/FAL is selected
  const hasCorrespondingLanguage = (langValue: string): boolean => {
    if (HOME_LANGUAGE_VALUES.includes(langValue)) {
      const correspondingFAL = getCorrespondingFAL(langValue)
      return correspondingFAL ? selectedSubjects.includes(correspondingFAL) : false
    }
    if (FIRST_ADDITIONAL_LANGUAGE_VALUES.includes(langValue)) {
      const correspondingHome = getCorrespondingHomeLang(langValue)
      return correspondingHome ? selectedSubjects.includes(correspondingHome) : false
    }
    return false
  }

  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="bg-white/20 border-none text-white">
        <SelectValue placeholder="Select Subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          <SelectItem value="English Home" disabled={selectedSubjects.includes("English Home") || (hasHomeLanguage && !isCurrentHomeLanguage) || hasCorrespondingLanguage("English Home")}>
            English Home Language
          </SelectItem>
          <SelectItem value="English FAL" disabled={selectedSubjects.includes("English FAL") || (hasFAL && !isCurrentFAL) || hasCorrespondingLanguage("English FAL")}>
            English First Additional Language
          </SelectItem>
          <SelectItem value="Afrikaans Home" disabled={selectedSubjects.includes("Afrikaans Home") || (hasHomeLanguage && !isCurrentHomeLanguage) || hasCorrespondingLanguage("Afrikaans Home")}>
            Afrikaans Home Language
          </SelectItem>
          <SelectItem value="Afrikaans FAL" disabled={selectedSubjects.includes("Afrikaans FAL") || (hasFAL && !isCurrentFAL) || hasCorrespondingLanguage("Afrikaans FAL")}>
            Afrikaans First Additional Language
          </SelectItem>
          <SelectItem value="IsiZulu Home" disabled={selectedSubjects.includes("IsiZulu Home") || (hasHomeLanguage && !isCurrentHomeLanguage) || hasCorrespondingLanguage("IsiZulu Home")}>
            IsiZulu Home Language
          </SelectItem>
          <SelectItem value="IsiZulu FAL" disabled={selectedSubjects.includes("IsiZulu FAL") || (hasFAL && !isCurrentFAL) || hasCorrespondingLanguage("IsiZulu FAL")}>
            IsiZulu First Additional Language
          </SelectItem>
          <SelectItem value="IsiXhosa Home" disabled={selectedSubjects.includes("IsiXhosa Home") || (hasHomeLanguage && !isCurrentHomeLanguage) || hasCorrespondingLanguage("IsiXhosa Home")}>
            IsiXhosa Home Language
          </SelectItem>
          <SelectItem value="IsiXhosa FAL" disabled={selectedSubjects.includes("IsiXhosa FAL") || (hasFAL && !isCurrentFAL) || hasCorrespondingLanguage("IsiXhosa FAL")}>
            IsiXhosa First Additional Language
          </SelectItem>
          <SelectItem value="Sepedi Home" disabled={selectedSubjects.includes("Sepedi Home") || (hasHomeLanguage && !isCurrentHomeLanguage) || hasCorrespondingLanguage("Sepedi Home")}>
            Sepedi Home Language
          </SelectItem>
          <SelectItem value="Sepedi FAL" disabled={selectedSubjects.includes("Sepedi FAL") || (hasFAL && !isCurrentFAL) || hasCorrespondingLanguage("Sepedi FAL")}>
            Sepedi First Additional Language
          </SelectItem>
          <SelectItem value="Setswana Home" disabled={selectedSubjects.includes("Setswana Home") || (hasHomeLanguage && !isCurrentHomeLanguage) || hasCorrespondingLanguage("Setswana Home")}>
            Setswana Home Language
          </SelectItem>
          <SelectItem value="Setswana FAL" disabled={selectedSubjects.includes("Setswana FAL") || (hasFAL && !isCurrentFAL) || hasCorrespondingLanguage("Setswana FAL")}>
            Setswana First Additional Language
          </SelectItem>
          <SelectItem value="Sesotho Home" disabled={selectedSubjects.includes("Sesotho Home") || (hasHomeLanguage && !isCurrentHomeLanguage) || hasCorrespondingLanguage("Sesotho Home")}>
            Sesotho Home Language
          </SelectItem>
          <SelectItem value="Sesotho FAL" disabled={selectedSubjects.includes("Sesotho FAL") || (hasFAL && !isCurrentFAL) || hasCorrespondingLanguage("Sesotho FAL")}>
            Sesotho First Additional Language
          </SelectItem>
          <SelectItem value="Xitsonga Home" disabled={selectedSubjects.includes("Xitsonga Home") || (hasHomeLanguage && !isCurrentHomeLanguage) || hasCorrespondingLanguage("Xitsonga Home")}>
            Xitsonga Home Language
          </SelectItem>
          <SelectItem value="Xitsonga FAL" disabled={selectedSubjects.includes("Xitsonga FAL") || (hasFAL && !isCurrentFAL) || hasCorrespondingLanguage("Xitsonga FAL")}>
            Xitsonga First Additional Language
          </SelectItem>
          <SelectItem value="SiSwati Home" disabled={selectedSubjects.includes("SiSwati Home") || (hasHomeLanguage && !isCurrentHomeLanguage) || hasCorrespondingLanguage("SiSwati Home")}>
            SiSwati Home Language
          </SelectItem>
          <SelectItem value="SiSwati FAL" disabled={selectedSubjects.includes("SiSwati FAL") || (hasFAL && !isCurrentFAL) || hasCorrespondingLanguage("SiSwati FAL")}>
            SiSwati First Additional Language
          </SelectItem>
          <SelectItem value="Tshivenda Home" disabled={selectedSubjects.includes("Tshivenda Home") || (hasHomeLanguage && !isCurrentHomeLanguage) || hasCorrespondingLanguage("Tshivenda Home")}>
            Tshivenda Home Language
          </SelectItem>
          <SelectItem value="Tshivenda FAL" disabled={selectedSubjects.includes("Tshivenda FAL") || (hasFAL && !isCurrentFAL) || hasCorrespondingLanguage("Tshivenda FAL")}>
            Tshivenda First Additional Language
          </SelectItem>
          <SelectItem value="IsiNdebele Home" disabled={selectedSubjects.includes("IsiNdebele Home") || (hasHomeLanguage && !isCurrentHomeLanguage) || hasCorrespondingLanguage("IsiNdebele Home")}>
            IsiNdebele Home Language
          </SelectItem>
          <SelectItem value="IsiNdebele FAL" disabled={selectedSubjects.includes("IsiNdebele FAL") || (hasFAL && !isCurrentFAL) || hasCorrespondingLanguage("IsiNdebele FAL")}>
            IsiNdebele First Additional Language
          </SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Mathematics</SelectLabel>
          <SelectItem
            value="Mathematics"
            disabled={selectedSubjects.includes("Mathematics") || (hasMathSubject && !isCurrentMathSubject)}
          >
            Mathematics
          </SelectItem>
          <SelectItem
            value="Mathematical Literacy"
            disabled={selectedSubjects.includes("Mathematical Literacy") || (hasMathSubject && !isCurrentMathSubject)}
          >
            Mathematical Literacy
          </SelectItem>
          <SelectItem
            value="Technical Mathematics"
            disabled={selectedSubjects.includes("Technical Mathematics") || (hasMathSubject && !isCurrentMathSubject)}
          >
            Technical Mathematics
          </SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Sciences</SelectLabel>
          <SelectItem value="Physical Sciences" disabled={selectedSubjects.includes("Physical Sciences")}>
            Physical Sciences
          </SelectItem>
          <SelectItem value="Life Sciences" disabled={selectedSubjects.includes("Life Sciences")}>
            Life Sciences
          </SelectItem>
          <SelectItem value="Agricultural Sciences" disabled={selectedSubjects.includes("Agricultural Sciences")}>
            Agricultural Sciences
          </SelectItem>
          <SelectItem value="Technical Sciences" disabled={selectedSubjects.includes("Technical Sciences")}>
            Technical Sciences
          </SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Commerce</SelectLabel>
          <SelectItem value="Accounting" disabled={selectedSubjects.includes("Accounting")}>
            Accounting
          </SelectItem>
          <SelectItem value="Business Studies" disabled={selectedSubjects.includes("Business Studies")}>
            Business Studies
          </SelectItem>
          <SelectItem value="Economics" disabled={selectedSubjects.includes("Economics")}>
            Economics
          </SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Humanities</SelectLabel>
          <SelectItem value="History" disabled={selectedSubjects.includes("History")}>
            History
          </SelectItem>
          <SelectItem value="Geography" disabled={selectedSubjects.includes("Geography")}>
            Geography
          </SelectItem>
          <SelectItem value="Life Orientation" disabled={selectedSubjects.includes("Life Orientation")}>
            Life Orientation
          </SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Other</SelectLabel>
          <SelectItem value="Consumer Studies" disabled={selectedSubjects.includes("Consumer Studies")}>
            Consumer Studies
          </SelectItem>
          <SelectItem value="Tourism" disabled={selectedSubjects.includes("Tourism")}>
            Tourism
          </SelectItem>
          <SelectItem value="CAT" disabled={selectedSubjects.includes("CAT")}>
            Computer Applications Technology
          </SelectItem>
          <SelectItem value="Information Technology" disabled={selectedSubjects.includes("Information Technology")}>
            Information Technology
          </SelectItem>
          <SelectItem
            value="Engineering Graphics & Design"
            disabled={selectedSubjects.includes("Engineering Graphics & Design")}
          >
            Engineering Graphics & Design
          </SelectItem>
          <SelectItem value="Visual Arts" disabled={selectedSubjects.includes("Visual Arts")}>
            Visual Arts
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
