"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"

// Types
interface SubjectEntry {
  id: string
  name: string
  percentage: number
}

interface SubjectsFormProps {
  onSubjectsChange: (subjects: SubjectEntry[]) => void
}

// Subject groupings for mutual exclusivity
const SUBJECT_GROUPS: Record<string, string[]> = {
  mathematics: ['Mathematics', 'Mathematical Literacy', 'Technical Mathematics'],
  english: ['English Home Language', 'English First Additional Language'],
  afrikaans: ['Afrikaans Home Language', 'Afrikaans First Additional Language'],
  isizulu: ['IsiZulu Home Language', 'IsiZulu First Additional Language'],
  isixhosa: ['IsiXhosa Home Language', 'IsiXhosa First Additional Language'],
  sepedi: ['Sepedi Home Language', 'Sepedi First Additional Language'],
  sesotho: ['Sesotho Home Language', 'Sesotho First Additional Language'],
  setswana: ['Setswana Home Language', 'Setswana First Additional Language'],
  xitsonga: ['Xitsonga Home Language', 'Xitsonga First Additional Language'],
  siswati: ['SiSwati Home Language', 'SiSwati First Additional Language'],
  tshivenda: ['Tshivenda Home Language', 'Tshivenda First Additional Language'],
  ndebele: ['isiNdebele Home Language', 'isiNdebele First Additional Language'],
}

const commonSubjects = [
  // Mathematics (mutually exclusive)
  "Mathematics",
  "Mathematical Literacy",
  "Technical Mathematics",
  
  // English (mutually exclusive)
  "English Home Language",
  "English First Additional Language",
  
  // Afrikaans (mutually exclusive)
  "Afrikaans Home Language",
  "Afrikaans First Additional Language",
  
  // IsiZulu (mutually exclusive)
  "IsiZulu Home Language",
  "IsiZulu First Additional Language",
  
  // IsiXhosa (mutually exclusive)
  "IsiXhosa Home Language",
  "IsiXhosa First Additional Language",
  
  // Sepedi (mutually exclusive)
  "Sepedi Home Language",
  "Sepedi First Additional Language",
  
  // Sesotho (mutually exclusive)
  "Sesotho Home Language",
  "Sesotho First Additional Language",
  
  // Setswana (mutually exclusive)
  "Setswana Home Language",
  "Setswana First Additional Language",
  
  // Xitsonga (mutually exclusive)
  "Xitsonga Home Language",
  "Xitsonga First Additional Language",
  
  // SiSwati (mutually exclusive)
  "SiSwati Home Language",
  "SiSwati First Additional Language",
  
  // Tshivenda (mutually exclusive)
  "Tshivenda Home Language",
  "Tshivenda First Additional Language",
  
  // isiNdebele (mutually exclusive)
  "isiNdebele Home Language",
  "isiNdebele First Additional Language",
  
  // Sciences
  "Physical Sciences",
  "Life Sciences",
  "Agricultural Sciences",
  "Technical Sciences",
  
  // Commerce
  "Accounting",
  "Business Studies",
  "Economics",
  
  // Humanities
  "Geography",
  "History",
  "Life Orientation",
  "Religion Studies",
  
  // Technology & Arts
  "Information Technology",
  "Computer Applications Technology",
  "Engineering Graphics and Design",
  "Visual Arts",
  "Music",
  "Dramatic Arts",
  "Consumer Studies",
  "Tourism",
]

export default function SubjectsForm({ onSubjectsChange }: SubjectsFormProps) {
  const [subjects, setSubjects] = useState<SubjectEntry[]>([{ id: "1", name: "", percentage: 0 }])

  // Get currently selected subject names (excluding empty entries and current row)
  const getSelectedSubjects = (excludeId?: string) => {
    return subjects
      .filter(s => s.name !== "" && s.id !== excludeId)
      .map(s => s.name)
  }

  // Determine which subjects should be disabled for a specific row
  const getDisabledSubjects = (currentSubjectId: string) => {
    const selectedSubjects = getSelectedSubjects(currentSubjectId)
    const disabled = new Set<string>()

    selectedSubjects.forEach(selectedSubject => {
      // Add the already selected subject
      disabled.add(selectedSubject)

      // Find which group this subject belongs to and disable all others in that group
      Object.values(SUBJECT_GROUPS).forEach(group => {
        if (group.includes(selectedSubject)) {
          group.forEach(subject => {
            if (subject !== selectedSubject) {
              disabled.add(subject)
            }
          })
        }
      })
    })

    return disabled
  }

  const addSubject = () => {
    const newSubject: SubjectEntry = {
      id: Date.now().toString(),
      name: "",
      percentage: 0,
    }
    const updatedSubjects = [...subjects, newSubject]
    setSubjects(updatedSubjects)
  }

  const removeSubject = (id: string) => {
    const updatedSubjects = subjects.filter((s) => s.id !== id)
    setSubjects(updatedSubjects)
    onSubjectsChange(updatedSubjects)
  }

  const updateSubject = (id: string, field: "name" | "percentage", value: string | number) => {
    const updatedSubjects = subjects.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    setSubjects(updatedSubjects)
    onSubjectsChange(updatedSubjects)
  }

  return (
    <div className="space-y-4">
      {subjects.map((subject, index) => {
        const disabledSubjects = getDisabledSubjects(subject.id)
        
        return (
          <div key={subject.id} className="space-y-3 p-4 border rounded-lg bg-gray-50">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Subject {index + 1}</Label>
              {subjects.length > 1 && (
                <Button type="button" variant="ghost" size="sm" onClick={() => removeSubject(subject.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`subject-${subject.id}`} className="text-xs">
                Subject Name
              </Label>
              <Select value={subject.name} onValueChange={(value) => updateSubject(subject.id, "name", value)}>
                <SelectTrigger id={`subject-${subject.id}`}>
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {commonSubjects.map((subjectName) => {
                    const isDisabled = disabledSubjects.has(subjectName)
                    const isInMathGroup = SUBJECT_GROUPS.mathematics.includes(subjectName)
                    
                    return (
                      <SelectItem 
                        key={subjectName} 
                        value={subjectName}
                        disabled={isDisabled}
                        className={isDisabled ? "opacity-50 cursor-not-allowed" : ""}
                      >
                        {subjectName}
                        {isDisabled && isInMathGroup && " (conflicts with selected math subject)"}
                        {isDisabled && !isInMathGroup && disabledSubjects.has(subjectName) && " (already selected or conflicts)"}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`percentage-${subject.id}`} className="text-xs">
                Percentage (%)
              </Label>
              <Input
                id={`percentage-${subject.id}`}
                type="number"
                min="0"
                max="100"
                value={subject.percentage || ""}
                onChange={(e) => updateSubject(subject.id, "percentage", Number(e.target.value))}
                placeholder="Enter percentage"
              />
            </div>
          </div>
        )
      })}

      {subjects.length < 7 && (
        <Button type="button" variant="outline" onClick={addSubject} className="w-full bg-transparent">
          <Plus className="h-4 w-4 mr-2" />
          Add Subject
        </Button>
      )}

      {subjects.length > 0 && subjects.some(s => s.name !== "") && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>Note:</strong> You cannot select both versions of the same subject (e.g., Home Language and First Additional Language) or multiple mathematics subjects.
          </p>
        </div>
      )}
    </div>
  )
}
