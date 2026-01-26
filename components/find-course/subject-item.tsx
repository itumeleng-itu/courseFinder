import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Edit2, X, X as XIcon } from "lucide-react"
import { Subject } from "@/app/find-course/types"
import { percentageToNSCLevel } from "@/app/find-course/utils"

interface SubjectItemProps {
  subject: Subject
  editingSubjectId: string | null
  editingPercentage: string
  setEditingPercentage: (val: string) => void
  onSaveEdit: (id: string) => void
  onCancelEdit: () => void
  onStartEditing: (subject: Subject) => void
  onRemove: (id: string) => void
}

export function SubjectItem({
  subject,
  editingSubjectId,
  editingPercentage,
  setEditingPercentage,
  onSaveEdit,
  onCancelEdit,
  onStartEditing,
  onRemove,
}: SubjectItemProps) {
  const isEditing = editingSubjectId === subject.id

  return (
    <div className="flex items-center justify-between p-2 glass-button rounded-md gap-2">
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{subject.name}</p>
        {isEditing ? (
          <div className="flex items-center gap-2 mt-1">
            <Input
              type="number"
              value={editingPercentage}
              onChange={(e) => setEditingPercentage(e.target.value)}
              min="0"
              max="100"
              className="h-7 text-xs w-20"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                    onSaveEdit(subject.id)
                } else if (e.key === "Escape") {
                    onCancelEdit()
                }
              }}
            />
            <span className="text-xs text-muted-foreground">%</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSaveEdit(subject.id)}
              className="h-6 w-6 p-0"
            >
              <Check className="h-3 w-3 text-green-600" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancelEdit}
              className="h-6 w-6 p-0"
            >
              <XIcon className="h-3 w-3 text-red-600" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2 mt-1">
            <p className="text-xs text-muted-foreground">
              {subject.percentage}% (Level {percentageToNSCLevel(subject.percentage)})
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onStartEditing(subject)}
              className="h-6 w-6 p-0"
              title="Edit mark"
            >
              <Edit2 className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
      {!isEditing && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(subject.id)}
          className="h-8 w-8 p-0 glass-hover flex-shrink-0"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
