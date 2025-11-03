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
                {commonSubjects.map((subjectName) => (
                  <SelectItem key={subjectName} value={subjectName}>
                    {subjectName}
                  </SelectItem>
                ))}
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
