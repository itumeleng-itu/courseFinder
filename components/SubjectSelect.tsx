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
  // Check if any math subject is already selected (to enforce mutual exclusivity)
  const hasMathSubject = selectedSubjects.some(
    (subject) =>
      subject === "Mathematics" || subject === "Mathematical Literacy" || subject === "Technical Mathematics",
  )

  // Current subject is a math subject
  const isCurrentMathSubject =
    value === "Mathematics" || value === "Mathematical Literacy" || value === "Technical Mathematics"

  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="bg-white/20 border-none text-white">
        <SelectValue placeholder="Select Subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          <SelectItem value="English Home" disabled={selectedSubjects.includes("English Home")}>
            English Home Language
          </SelectItem>
          <SelectItem value="English FAL" disabled={selectedSubjects.includes("English FAL")}>
            English First Additional Language
          </SelectItem>
          <SelectItem value="Afrikaans Home" disabled={selectedSubjects.includes("Afrikaans Home")}>
            Afrikaans Home Language
          </SelectItem>
          <SelectItem value="Afrikaans FAL" disabled={selectedSubjects.includes("Afrikaans FAL")}>
            Afrikaans First Additional Language
          </SelectItem>
          <SelectItem value="IsiZulu Home" disabled={selectedSubjects.includes("IsiZulu Home")}>
            IsiZulu Home Language
          </SelectItem>
          <SelectItem value="IsiZulu FAL" disabled={selectedSubjects.includes("IsiZulu FAL")}>
            IsiZulu First Additional Language
          </SelectItem>
          <SelectItem value="IsiXhosa Home" disabled={selectedSubjects.includes("IsiXhosa Home")}>
            IsiXhosa Home Language
          </SelectItem>
          <SelectItem value="IsiXhosa FAL" disabled={selectedSubjects.includes("IsiXhosa FAL")}>
            IsiXhosa First Additional Language
          </SelectItem>
          <SelectItem value="Sepedi Home" disabled={selectedSubjects.includes("Sepedi Home")}>
            Sepedi Home Language
          </SelectItem>
          <SelectItem value="Sepedi FAL" disabled={selectedSubjects.includes("Sepedi FAL")}>
            Sepedi First Additional Language
          </SelectItem>
          <SelectItem value="Setswana Home" disabled={selectedSubjects.includes("Setswana Home")}>
            Setswana Home Language
          </SelectItem>
          <SelectItem value="Setswana FAL" disabled={selectedSubjects.includes("Setswana FAL")}>
            Setswana First Additional Language
          </SelectItem>
          <SelectItem value="Sesotho Home" disabled={selectedSubjects.includes("Sesotho Home")}>
            Sesotho Home Language
          </SelectItem>
          <SelectItem value="Sesotho FAL" disabled={selectedSubjects.includes("Sesotho FAL")}>
            Sesotho First Additional Language
          </SelectItem>
          <SelectItem value="Xitsonga Home" disabled={selectedSubjects.includes("Xitsonga Home")}>
            Xitsonga Home Language
          </SelectItem>
          <SelectItem value="Xitsonga FAL" disabled={selectedSubjects.includes("Xitsonga FAL")}>
            Xitsonga First Additional Language
          </SelectItem>
          <SelectItem value="SiSwati Home" disabled={selectedSubjects.includes("SiSwati Home")}>
            SiSwati Home Language
          </SelectItem>
          <SelectItem value="SiSwati FAL" disabled={selectedSubjects.includes("SiSwati FAL")}>
            SiSwati First Additional Language
          </SelectItem>
          <SelectItem value="Tshivenda Home" disabled={selectedSubjects.includes("Tshivenda Home")}>
            Tshivenda Home Language
          </SelectItem>
          <SelectItem value="Tshivenda FAL" disabled={selectedSubjects.includes("Tshivenda FAL")}>
            Tshivenda First Additional Language
          </SelectItem>
          <SelectItem value="IsiNdebele Home" disabled={selectedSubjects.includes("IsiNdebele Home")}>
            IsiNdebele Home Language
          </SelectItem>
          <SelectItem value="IsiNdebele FAL" disabled={selectedSubjects.includes("IsiNdebele FAL")}>
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
