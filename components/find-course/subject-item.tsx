import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Edit2, X, X as XIcon } from "lucide-react"
import { Subject } from "@/app/find-course/types"
import { percentageToNSCLevel } from "@/app/find-course/utils"
import { cn } from "@/lib/utils"

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

function getLevelColor(level: number) {
  if (level >= 7) return "text-green-600 font-bold"
  if (level >= 5) return "text-emerald-500 font-medium"
  if (level >= 4) return "text-yellow-600"
  if (level >= 3) return "text-orange-600"
  return "text-red-600"
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
  const level = percentageToNSCLevel(subject.percentage)

  return (
    <div className="flex items-center justify-between p-3 glass-card hover:bg-muted/40 transition-colors rounded-lg gap-3 mb-2">
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="font-semibold text-sm truncate text-foreground">{subject.name}</p>
        </div>
        
        {isEditing ? (
          <div className="flex items-center gap-2">
            <div className="relative">
              <Input
                type="number"
                value={editingPercentage}
                onChange={(e) => setEditingPercentage(e.target.value)}
                min="0"
                max="100"
                className="h-8 text-sm w-20 pr-6"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSaveEdit(subject.id)
                  else if (e.key === "Escape") onCancelEdit()
                }}
              />
              <span className="absolute right-2 top-1.5 text-xs text-muted-foreground">%</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSaveEdit(subject.id)}
              className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onCancelEdit}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-primary">{subject.percentage}%</span>
              <span className={cn("text-xs px-2 py-0.5 rounded-full bg-muted", getLevelColor(level))}>
                Level {level}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onStartEditing(subject)}
              className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
            >
              <Edit2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </div>
      
      {!isEditing && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(subject.id)}
          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors self-start -mt-1 -mr-1"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
