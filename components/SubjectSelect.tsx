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

import { SUBJECT_CATEGORIES } from "@/data/subjects"

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
        {SUBJECT_CATEGORIES.map((category) => (
          <SelectGroup key={category.label}>
            <SelectLabel>{category.label}</SelectLabel>
            {category.options.map((option) => {
              // Special logic for Math mutual exclusivity
              const isMathOption = 
                option.value === "Mathematics" || 
                option.value === "Mathematical Literacy" || 
                option.value === "Technical Mathematics";
              
              const isDisabled = 
                selectedSubjects.includes(option.value) || 
                (isMathOption && hasMathSubject && !isCurrentMathSubject);

              return (
                <SelectItem 
                  key={option.value} 
                  value={option.value} 
                  disabled={isDisabled}
                >
                  {option.label}
                </SelectItem>
              );
            })}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  )
}
