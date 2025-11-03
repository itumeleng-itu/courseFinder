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

// Subject groupings for mutual exclusivity
const SUBJECT_GROUPS: Record<string, string[]> = {
  mathematics: ['Mathematics', 'Mathematical Literacy', 'Technical Mathematics'],
  english: ['English Home', 'English FAL'],
  afrikaans: ['Afrikaans Home', 'Afrikaans FAL'],
  isizulu: ['IsiZulu Home', 'IsiZulu FAL'],
  isixhosa: ['IsiXhosa Home', 'IsiXhosa FAL'],
  sepedi: ['Sepedi Home', 'Sepedi FAL'],
  setswana: ['Setswana Home', 'Setswana FAL'],
  sesotho: ['Sesotho Home', 'Sesotho FAL'],
  xitsonga: ['Xitsonga Home', 'Xitsonga FAL'],
  siswati: ['SiSwati Home', 'SiSwati FAL'],
  tshivenda: ['Tshivenda Home', 'Tshivenda FAL'],
  isindebele: ['IsiNdebele Home', 'IsiNdebele FAL'],
}

export default function SubjectSelect({ value, onChange, selectedSubjects, disabled }: SubjectSelectProps) {
  // Ensure selectedSubjects is always an array
  const safeSelectedSubjects = selectedSubjects || []

  // Helper function to check if a subject should be disabled
  const isSubjectDisabled = (subjectName: string): boolean => {
    // If the subject is already in the selected list (and not the current value), disable it
    if (safeSelectedSubjects.includes(subjectName) && value !== subjectName) {
      return true
    }

    // Check if any subject from the same group is selected
    for (const group of Object.values(SUBJECT_GROUPS)) {
      if (group.includes(subjectName)) {
        // Check if any other subject in this group is selected
        const hasConflict = safeSelectedSubjects.some(
          selected => group.includes(selected) && selected !== subjectName && selected !== value
        )
        if (hasConflict) {
          return true
        }
      }
    }

    return false
  }

  // Get conflict message for a subject
  const getConflictMessage = (subjectName: string): string => {
    for (const [groupName, group] of Object.entries(SUBJECT_GROUPS)) {
      if (group.includes(subjectName)) {
        const conflictingSubject = safeSelectedSubjects.find(
          selected => group.includes(selected) && selected !== subjectName && selected !== value
        )
        if (conflictingSubject) {
          if (groupName === 'mathematics') {
            return ` (conflicts with ${conflictingSubject})`
          }
          return ` (conflicts with selected ${groupName} subject)`
        }
      }
    }
    return ''
  }

  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="bg-white/20 border-none text-white">
        <SelectValue placeholder="Select Subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          <SelectItem 
            value="English Home" 
            disabled={isSubjectDisabled("English Home")}
            className={isSubjectDisabled("English Home") ? "opacity-50 cursor-not-allowed" : ""}
          >
            English Home Language{getConflictMessage("English Home")}
          </SelectItem>
          <SelectItem 
            value="English FAL" 
            disabled={isSubjectDisabled("English FAL")}
            className={isSubjectDisabled("English FAL") ? "opacity-50 cursor-not-allowed" : ""}
          >
            English First Additional Language{getConflictMessage("English FAL")}
          </SelectItem>
          <SelectItem 
            value="Afrikaans Home" 
            disabled={isSubjectDisabled("Afrikaans Home")}
            className={isSubjectDisabled("Afrikaans Home") ? "opacity-50 cursor-not-allowed" : ""}
          >
            Afrikaans Home Language{getConflictMessage("Afrikaans Home")}
          </SelectItem>
          <SelectItem 
            value="Afrikaans FAL" 
            disabled={isSubjectDisabled("Afrikaans FAL")}
            className={isSubjectDisabled("Afrikaans FAL") ? "opacity-50 cursor-not-allowed" : ""}
          >
            Afrikaans First Additional Language{getConflictMessage("Afrikaans FAL")}
          </SelectItem>
          <SelectItem 
            value="IsiZulu Home" 
            disabled={isSubjectDisabled("IsiZulu Home")}
            className={isSubjectDisabled("IsiZulu Home") ? "opacity-50 cursor-not-allowed" : ""}
          >
            IsiZulu Home Language{getConflictMessage("IsiZulu Home")}
          </SelectItem>
          <SelectItem 
            value="IsiZulu FAL" 
            disabled={isSubjectDisabled("IsiZulu FAL")}
            className={isSubjectDisabled("IsiZulu FAL") ? "opacity-50 cursor-not-allowed" : ""}
          >
            IsiZulu First Additional Language{getConflictMessage("IsiZulu FAL")}
          </SelectItem>
          <SelectItem 
            value="IsiXhosa Home" 
            disabled={isSubjectDisabled("IsiXhosa Home")}
            className={isSubjectDisabled("IsiXhosa Home") ? "opacity-50 cursor-not-allowed" : ""}
          >
            IsiXhosa Home Language{getConflictMessage("IsiXhosa Home")}
          </SelectItem>
          <SelectItem 
            value="IsiXhosa FAL" 
            disabled={isSubjectDisabled("IsiXhosa FAL")}
            className={isSubjectDisabled("IsiXhosa FAL") ? "opacity-50 cursor-not-allowed" : ""}
          >
            IsiXhosa First Additional Language{getConflictMessage("IsiXhosa FAL")}
          </SelectItem>
          <SelectItem 
            value="Sepedi Home" 
            disabled={isSubjectDisabled("Sepedi Home")}
            className={isSubjectDisabled("Sepedi Home") ? "opacity-50 cursor-not-allowed" : ""}
          >
            Sepedi Home Language{getConflictMessage("Sepedi Home")}
          </SelectItem>
          <SelectItem 
            value="Sepedi FAL" 
            disabled={isSubjectDisabled("Sepedi FAL")}
            className={isSubjectDisabled("Sepedi FAL") ? "opacity-50 cursor-not-allowed" : ""}
          >
            Sepedi First Additional Language{getConflictMessage("Sepedi FAL")}
          </SelectItem>
          <SelectItem 
            value="Setswana Home" 
            disabled={isSubjectDisabled("Setswana Home")}
            className={isSubjectDisabled("Setswana Home") ? "opacity-50 cursor-not-allowed" : ""}
          >
            Setswana Home Language{getConflictMessage("Setswana Home")}
          </SelectItem>
          <SelectItem 
            value="Setswana FAL" 
            disabled={isSubjectDisabled("Setswana FAL")}
            className={isSubjectDisabled("Setswana FAL") ? "opacity-50 cursor-not-allowed" : ""}
          >
            Setswana First Additional Language{getConflictMessage("Setswana FAL")}
          </SelectItem>
          <SelectItem 
            value="Sesotho Home" 
            disabled={isSubjectDisabled("Sesotho Home")}
            className={isSubjectDisabled("Sesotho Home") ? "opacity-50 cursor-not-allowed" : ""}
          >
            Sesotho Home Language{getConflictMessage("Sesotho Home")}
          </SelectItem>
          <SelectItem 
            value="Sesotho FAL" 
            disabled={isSubjectDisabled("Sesotho FAL")}
            className={isSubjectDisabled("Sesotho FAL") ? "opacity-50 cursor-not-allowed" : ""}
          >
            Sesotho First Additional Language{getConflictMessage("Sesotho FAL")}
          </SelectItem>
          <SelectItem 
            value="Xitsonga Home" 
            disabled={isSubjectDisabled("Xitsonga Home")}
            className={isSubjectDisabled("Xitsonga Home") ? "opacity-50 cursor-not-allowed" : ""}
          >
            Xitsonga Home Language{getConflictMessage("Xitsonga Home")}
          </SelectItem>
          <SelectItem 
            value="Xitsonga FAL" 
            disabled={isSubjectDisabled("Xitsonga FAL")}
            className={isSubjectDisabled("Xitsonga FAL") ? "opacity-50 cursor-not-allowed" : ""}
          >
            Xitsonga First Additional Language{getConflictMessage("Xitsonga FAL")}
          </SelectItem>
          <SelectItem 
            value="SiSwati Home" 
            disabled={isSubjectDisabled("SiSwati Home")}
            className={isSubjectDisabled("SiSwati Home") ? "opacity-50 cursor-not-allowed" : ""}
          >
            SiSwati Home Language{getConflictMessage("SiSwati Home")}
          </SelectItem>
          <SelectItem 
            value="SiSwati FAL" 
            disabled={isSubjectDisabled("SiSwati FAL")}
            className={isSubjectDisabled("SiSwati FAL") ? "opacity-50 cursor-not-allowed" : ""}
          >
            SiSwati First Additional Language{getConflictMessage("SiSwati FAL")}
          </SelectItem>
          <SelectItem 
            value="Tshivenda Home" 
            disabled={isSubjectDisabled("Tshivenda Home")}
            className={isSubjectDisabled("Tshivenda Home") ? "opacity-50 cursor-not-allowed" : ""}
          >
            Tshivenda Home Language{getConflictMessage("Tshivenda Home")}
          </SelectItem>
          <SelectItem 
            value="Tshivenda FAL" 
            disabled={isSubjectDisabled("Tshivenda FAL")}
            className={isSubjectDisabled("Tshivenda FAL") ? "opacity-50 cursor-not-allowed" : ""}
          >
            Tshivenda First Additional Language{getConflictMessage("Tshivenda FAL")}
          </SelectItem>
          <SelectItem 
            value="IsiNdebele Home" 
            disabled={isSubjectDisabled("IsiNdebele Home")}
            className={isSubjectDisabled("IsiNdebele Home") ? "opacity-50 cursor-not-allowed" : ""}
          >
            IsiNdebele Home Language{getConflictMessage("IsiNdebele Home")}
          </SelectItem>
          <SelectItem 
            value="IsiNdebele FAL" 
            disabled={isSubjectDisabled("IsiNdebele FAL")}
            className={isSubjectDisabled("IsiNdebele FAL") ? "opacity-50 cursor-not-allowed" : ""}
          >
            IsiNdebele First Additional Language{getConflictMessage("IsiNdebele FAL")}
          </SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Mathematics</SelectLabel>
          <SelectItem
            value="Mathematics"
            disabled={isSubjectDisabled("Mathematics")}
            className={isSubjectDisabled("Mathematics") ? "opacity-50 cursor-not-allowed" : ""}
            aria-label={
              isSubjectDisabled("Mathematics")
                ? `Mathematics - Disabled${getConflictMessage("Mathematics")}`
                : "Mathematics"
            }
          >
            Mathematics{getConflictMessage("Mathematics")}
          </SelectItem>
          <SelectItem
            value="Mathematical Literacy"
            disabled={isSubjectDisabled("Mathematical Literacy")}
            className={isSubjectDisabled("Mathematical Literacy") ? "opacity-50 cursor-not-allowed" : ""}
            aria-label={
              isSubjectDisabled("Mathematical Literacy")
                ? `Mathematical Literacy - Disabled${getConflictMessage("Mathematical Literacy")}`
                : "Mathematical Literacy"
            }
          >
            Mathematical Literacy{getConflictMessage("Mathematical Literacy")}
          </SelectItem>
          <SelectItem
            value="Technical Mathematics"
            disabled={isSubjectDisabled("Technical Mathematics")}
            className={isSubjectDisabled("Technical Mathematics") ? "opacity-50 cursor-not-allowed" : ""}
            aria-label={
              isSubjectDisabled("Technical Mathematics")
                ? `Technical Mathematics - Disabled${getConflictMessage("Technical Mathematics")}`
                : "Technical Mathematics"
            }
          >
            Technical Mathematics{getConflictMessage("Technical Mathematics")}
          </SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Sciences</SelectLabel>
          <SelectItem 
            value="Physical Sciences" 
            disabled={isSubjectDisabled("Physical Sciences")}
            className={isSubjectDisabled("Physical Sciences") ? "opacity-50 cursor-not-allowed" : ""}
          >
            Physical Sciences
          </SelectItem>
          <SelectItem 
            value="Life Sciences" 
            disabled={isSubjectDisabled("Life Sciences")}
            className={isSubjectDisabled("Life Sciences") ? "opacity-50 cursor-not-allowed" : ""}
          >
            Life Sciences
          </SelectItem>
          <SelectItem 
            value="Agricultural Sciences" 
            disabled={isSubjectDisabled("Agricultural Sciences")}
            className={isSubjectDisabled("Agricultural Sciences") ? "opacity-50 cursor-not-allowed" : ""}
          >
            Agricultural Sciences
          </SelectItem>
          <SelectItem 
            value="Technical Sciences" 
            disabled={isSubjectDisabled("Technical Sciences")}
            className={isSubjectDisabled("Technical Sciences") ? "opacity-50 cursor-not-allowed" : ""}
          >
            Technical Sciences
          </SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Commerce</SelectLabel>
          <SelectItem 
            value="Accounting" 
            disabled={isSubjectDisabled("Accounting")}
            className={isSubjectDisabled("Accounting") ? "opacity-50 cursor-not-allowed" : ""}
          >
            Accounting
          </SelectItem>
          <SelectItem 
            value="Business Studies" 
            disabled={isSubjectDisabled("Business Studies")}
            className={isSubjectDisabled("Business Studies") ? "opacity-50 cursor-not-allowed" : ""}
          >
            Business Studies
          </SelectItem>
          <SelectItem 
            value="Economics" 
            disabled={isSubjectDisabled("Economics")}
            className={isSubjectDisabled("Economics") ? "opacity-50 cursor-not-allowed" : ""}
          >
            Economics
          </SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Humanities</SelectLabel>
          <SelectItem 
            value="History" 
            disabled={isSubjectDisabled("History")}
            className={isSubjectDisabled("History") ? "opacity-50 cursor-not-allowed" : ""}
          >
            History
          </SelectItem>
          <SelectItem 
            value="Geography" 
            disabled={isSubjectDisabled("Geography")}
            className={isSubjectDisabled("Geography") ? "opacity-50 cursor-not-allowed" : ""}
          >
            Geography
          </SelectItem>
          <SelectItem 
            value="Life Orientation" 
            disabled={isSubjectDisabled("Life Orientation")}
            className={isSubjectDisabled("Life Orientation") ? "opacity-50 cursor-not-allowed" : ""}
          >
            Life Orientation
          </SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Other</SelectLabel>
          <SelectItem 
            value="Consumer Studies" 
            disabled={isSubjectDisabled("Consumer Studies")}
            className={isSubjectDisabled("Consumer Studies") ? "opacity-50 cursor-not-allowed" : ""}
          >
            Consumer Studies
          </SelectItem>
          <SelectItem 
            value="Tourism" 
            disabled={isSubjectDisabled("Tourism")}
            className={isSubjectDisabled("Tourism") ? "opacity-50 cursor-not-allowed" : ""}
          >
            Tourism
          </SelectItem>
          <SelectItem 
            value="CAT" 
            disabled={isSubjectDisabled("CAT")}
            className={isSubjectDisabled("CAT") ? "opacity-50 cursor-not-allowed" : ""}
          >
            Computer Applications Technology
          </SelectItem>
          <SelectItem 
            value="Information Technology" 
            disabled={isSubjectDisabled("Information Technology")}
            className={isSubjectDisabled("Information Technology") ? "opacity-50 cursor-not-allowed" : ""}
          >
            Information Technology
          </SelectItem>
          <SelectItem
            value="Engineering Graphics & Design"
            disabled={isSubjectDisabled("Engineering Graphics & Design")}
            className={isSubjectDisabled("Engineering Graphics & Design") ? "opacity-50 cursor-not-allowed" : ""}
          >
            Engineering Graphics & Design
          </SelectItem>
          <SelectItem 
            value="Visual Arts" 
            disabled={isSubjectDisabled("Visual Arts")}
            className={isSubjectDisabled("Visual Arts") ? "opacity-50 cursor-not-allowed" : ""}
          >
            Visual Arts
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
