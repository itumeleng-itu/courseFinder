"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"
import type { SubjectEntry } from "@/lib/types"

interface SubjectsFormProps {
  onSubjectsChange: (subjects: SubjectEntry[]) => void
}

const commonSubjects = [
  "Mathematics",
  "Mathematical Literacy",
  "English Home Language",
  "English First Additional Language",
  "Physical Sciences",
  "Life Sciences",
  "Accounting",
  "Business Studies",
  "Economics",
  "Geography",
  "History",
  "Life Orientation",
  "Information Technology",
  "Computer Applications Technology",
  "Agricultural Sciences",
  "Engineering Graphics and Design",
  "Visual Arts",
  "Music",
  "Dramatic Arts",
  "Afrikaans Home Language",
  "Afrikaans First Additional Language",
  "IsiZulu Home Language",
  "IsiZulu First Additional Language",
  "IsiXhosa Home Language",
  "IsiXhosa First Additional Language",
  "Sepedi",
  "Sesotho",
  "Setswana",
]

export default function SubjectsForm({ onSubjectsChange }: SubjectsFormProps) {
  const [subjects, setSubjects] = useState<SubjectEntry[]>([{ id: "1", name: "", percentage: 0 }])

  // Get currently selected subject names for mutual exclusivity logic
  const selectedSubjectNames = subjects.map(s => s.name).filter(name => name !== "")
  
  // Check mutual exclusivity for Mathematics subjects
  const hasMathematics = selectedSubjectNames.includes("Mathematics")
  const hasMathematicalLiteracy = selectedSubjectNames.includes("Mathematical Literacy")

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
    let updatedSubjects = subjects.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    
    // Handle mutual exclusivity when updating subject name
    if (field === "name") {
      if (value === "Mathematics") {
        // Remove Mathematical Literacy if Mathematics is selected
        updatedSubjects = updatedSubjects.map(s => 
          s.name === "Mathematical Literacy" ? { ...s, name: "", percentage: 0 } : s
        )
      } else if (value === "Mathematical Literacy") {
        // Remove Mathematics if Mathematical Literacy is selected
        updatedSubjects = updatedSubjects.map(s => 
          s.name === "Mathematics" ? { ...s, name: "", percentage: 0 } : s
        )
      }
    }
    
    setSubjects(updatedSubjects)
    onSubjectsChange(updatedSubjects)
  }

  return (
    <div className="space-y-4">
      {subjects.map((subject, index) => (
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
                  // Check if this subject should be disabled due to mutual exclusivity
                  const isDisabled = 
                    selectedSubjectNames.includes(subjectName) ||
                    (subjectName === "Mathematics" && hasMathematicalLiteracy && subject.name !== "Mathematics") ||
                    (subjectName === "Mathematical Literacy" && hasMathematics && subject.name !== "Mathematical Literacy")
                  
                  return (
                    <SelectItem 
                       key={subjectName} 
                       value={subjectName}
                       disabled={isDisabled}
                       className={isDisabled ? "opacity-50 cursor-not-allowed text-gray-400" : ""}
                       aria-label={
                         isDisabled && (subjectName === "Mathematics" || subjectName === "Mathematical Literacy")
                           ? `${subjectName} - Disabled due to mutual exclusivity with ${
                               subjectName === "Mathematics" ? "Mathematical Literacy" : "Mathematics"
                             }`
                           : subjectName
                       }
                     >
                       {subjectName}
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
      ))}

      {subjects.length < 7 && (
        <Button type="button" variant="outline" onClick={addSubject} className="w-full bg-transparent">
          <Plus className="h-4 w-4 mr-2" />
          Add Subject
        </Button>
      )}
    </div>
  )
}
