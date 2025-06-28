"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, FileText, Trash2 } from "lucide-react"
import type { Subject } from "@/components/SubjectSelect"
import SubjectSelect from "@/components/SubjectSelect"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface SubjectsFormProps {
  subjects: Subject[]
  selectedSubjects: string[]
  onAddSubject: () => void
  onCalculate: () => void
  onSubjectChange: (index: number, name: string) => void
  onPercentageChange: (index: number, percentage: string) => void
  onRemoveSubject: (index: number) => void
  canCalculate: boolean
  loading: boolean
}

export default function SubjectsForm({
  subjects,
  selectedSubjects,
  onAddSubject,
  onCalculate,
  onSubjectChange,
  onPercentageChange,
  onRemoveSubject,
  canCalculate,
  loading,
}: SubjectsFormProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Enter your NSC Subject Results</h2>

      {subjects.map((subject, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="flex-1">
            <SubjectSelect
              value={subject.name}
              onChange={(value) => onSubjectChange(index, value)}
              selectedSubjects={selectedSubjects}
              disabled={loading}
            />
          </div>
          <div className="w-24">
            <Input
              type="number"
              min="0"
              max="100"
              placeholder="%"
              value={subject.percentage}
              onChange={(e) => onPercentageChange(index, e.target.value)}
              className="bg-white/20 border-none text-white placeholder:text-white/70"
              disabled={loading}
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemoveSubject(index)}
            className="text-white hover:bg-white/20"
            disabled={loading}
          >
            <Trash2 className="h-5 w-5" />
            <span className="sr-only">Remove subject</span>
          </Button>
        </div>
      ))}

      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={onAddSubject} className="bg-white/20 hover:bg-white/30 text-white" disabled={loading}>
          <PlusCircle className="mr-2 h-5 w-5" /> Add Subject
        </Button>

        <Button
          onClick={onCalculate}
          className="bg-white/20 hover:bg-white/30 text-white"
          disabled={!canCalculate || loading}
        >
          <FileText className="mr-2 h-5 w-5" /> Find Courses
          {loading && <span className="ml-2">...</span>}
        </Button>

        <Link href="/bursaries" passHref legacyBehavior>
          <Button
            as="a"
            className="bg-white/20 hover:bg-white/30 text-white"
            disabled={loading}
          >
            Bursaries
          </Button>
        </Link>
        <Link href="/colleges" passHref legacyBehavior>
          <Button
            as="a"
            className="bg-white/20 hover:bg-white/30 text-white"
            disabled={loading}
          >
            Private Institutions
          </Button>
        </Link>
      </div>

      <p className="text-sm text-white/80">Add at least 6 subjects excluding Life Orientation for APS calculation</p>

      {subjects.length > 0 && selectedSubjects.length !== new Set(selectedSubjects).size && (
        <Badge variant="destructive" className="bg-red-500/80">
          Duplicate subjects detected. Please select unique subjects.
        </Badge>
      )}
    </div>
  )
}
