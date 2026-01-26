"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import type { SubjectEntry } from "@/lib/types"

interface SubjectListProps {
  subjects: SubjectEntry[]
  onRemove: (id: string | number) => void
}

export default function SubjectList({ subjects, onRemove }: SubjectListProps) {
  // Function to format subject name for display
  const formatSubjectName = (name: string) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div>
      <h3 className="font-semibold mb-3">Added Subjects:</h3>
      <div className="flex flex-wrap gap-2">
        {subjects.map((subject) => (
          <Badge key={subject.id} variant="secondary" className="py-2 px-3 bg-white/20 text-white">
            {formatSubjectName(subject.name)}: {subject.percentage}%
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(subject.id)}
              className="ml-2 h-5 w-5 p-0 text-white hover:bg-white/10 hover:text-white"
            >
              <Trash2 className="h-3 w-3" />
              <span className="sr-only">Remove</span>
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  )
}
