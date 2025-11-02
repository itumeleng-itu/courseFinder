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
  "Technical Mathematics",
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

// Define subject groups
const MATH_SUBJECTS = ["Mathematics", "Mathematical Literacy", "Technical Mathematics"]

const HOME_LANGUAGES = [
  "English Home Language",
  "Afrikaans Home Language",
  "IsiZulu Home Language",
  "IsiXhosa Home Language",
  "Sepedi",
  "Sesotho",
  "Setswana",
]

const FIRST_ADDITIONAL_LANGUAGES = [
  "English First Additional Language",
  "Afrikaans First Additional Language",
  "IsiZulu First Additional Language",
  "IsiXhosa First Additional Language",
]

// Helper function to get the corresponding first additional language for a home language
const getCorrespondingFAL = (homeLang: string): string | null => {
  if (homeLang === "English Home Language") return "English First Additional Language"
  if (homeLang === "Afrikaans Home Language") return "Afrikaans First Additional Language"
  if (homeLang === "IsiZulu Home Language") return "IsiZulu First Additional Language"
  if (homeLang === "IsiXhosa Home Language") return "IsiXhosa First Additional Language"
  return null
}

// Helper function to get the corresponding home language for a first additional language
const getCorrespondingHomeLang = (fal: string): string | null => {
  if (fal === "English First Additional Language") return "English Home Language"
  if (fal === "Afrikaans First Additional Language") return "Afrikaans Home Language"
  if (fal === "IsiZulu First Additional Language") return "IsiZulu Home Language"
  if (fal === "IsiXhosa First Additional Language") return "IsiXhosa Home Language"
  return null
}

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
    // If updating the name field, check for conflicts
    if (field === "name") {
      const otherSubjects = subjects.filter((s) => s.id !== id).map((s) => s.name)
      const newSubjectName = value as string

      // Check if another subject already has this name
      if (otherSubjects.includes(newSubjectName)) {
        alert("This subject has already been selected")
        return
      }

      // Check mathematics conflicts
      if (MATH_SUBJECTS.includes(newSubjectName)) {
        const hasMathSubject = otherSubjects.some((name) => MATH_SUBJECTS.includes(name))
        if (hasMathSubject) {
          alert("You can only select ONE type of mathematics")
          return
        }
      }

      // Check home language conflicts
      if (HOME_LANGUAGES.includes(newSubjectName)) {
        const hasHomeLanguage = otherSubjects.some((name) => HOME_LANGUAGES.includes(name))
        if (hasHomeLanguage) {
          alert("You can only select ONE home language")
          return
        }
      }

      // Check first additional language conflicts
      if (FIRST_ADDITIONAL_LANGUAGES.includes(newSubjectName)) {
        const hasFAL = otherSubjects.some((name) => FIRST_ADDITIONAL_LANGUAGES.includes(name))
        if (hasFAL) {
          alert("You can only select ONE first additional language")
          return
        }
        
        // Check if the same language is already selected as home language
        const correspondingHomeLang = getCorrespondingHomeLang(newSubjectName)
        if (correspondingHomeLang && otherSubjects.includes(correspondingHomeLang)) {
          alert(`You cannot choose the same language (${correspondingHomeLang.replace(" Home Language", "")}) as both home language and first additional language`)
          return
        }
      }

      // Check if selecting a home language conflicts with the same language as first additional
      if (HOME_LANGUAGES.includes(newSubjectName)) {
        const correspondingFAL = getCorrespondingFAL(newSubjectName)
        if (correspondingFAL && otherSubjects.includes(correspondingFAL)) {
          alert(`You cannot choose the same language (${newSubjectName.replace(" Home Language", "")}) as both home language and first additional language`)
          return
        }
      }
    }

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
                {commonSubjects
                  .filter((subjectName) => {
                    // Get other selected subjects (excluding the current one being edited)
                    const otherSelectedSubjects = subjects
                      .filter((s) => s.id !== subject.id && s.name)
                      .map((s) => s.name)

                    // Don't show if already selected by another subject
                    if (otherSelectedSubjects.includes(subjectName)) return false

                    // If a mathematics subject is already selected elsewhere, don't show other mathematics subjects
                    const hasMathSubject = otherSelectedSubjects.some((name) => MATH_SUBJECTS.includes(name))
                    if (hasMathSubject && MATH_SUBJECTS.includes(subjectName) && !MATH_SUBJECTS.includes(subject.name)) {
                      return false
                    }

                    // If a home language is already selected elsewhere, don't show other home languages
                    const hasHomeLanguage = otherSelectedSubjects.some((name) => HOME_LANGUAGES.includes(name))
                    if (hasHomeLanguage && HOME_LANGUAGES.includes(subjectName) && !HOME_LANGUAGES.includes(subject.name)) {
                      return false
                    }

                    // If a first additional language is already selected elsewhere, don't show other first additional languages
                    const hasFAL = otherSelectedSubjects.some((name) => FIRST_ADDITIONAL_LANGUAGES.includes(name))
                    if (hasFAL && FIRST_ADDITIONAL_LANGUAGES.includes(subjectName) && !FIRST_ADDITIONAL_LANGUAGES.includes(subject.name)) {
                      return false
                    }

                    // If a home language is selected elsewhere, don't show the corresponding first additional language
                    if (FIRST_ADDITIONAL_LANGUAGES.includes(subjectName)) {
                      const correspondingHomeLang = getCorrespondingHomeLang(subjectName)
                      if (correspondingHomeLang && otherSelectedSubjects.includes(correspondingHomeLang)) {
                        return false
                      }
                    }

                    // If a first additional language is selected elsewhere, don't show the corresponding home language
                    if (HOME_LANGUAGES.includes(subjectName)) {
                      const correspondingFAL = getCorrespondingFAL(subjectName)
                      if (correspondingFAL && otherSelectedSubjects.includes(correspondingFAL)) {
                        return false
                      }
                    }

                    return true
                  })
                  .map((subjectName) => (
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
