import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { SUBJECT_CATEGORIES } from "@/data/subjects"

interface SubjectInputFormProps {
  currentSubject: string
  setCurrentSubject: (val: string) => void
  currentPercentage: string
  setCurrentPercentage: (val: string) => void
  isSubjectDisabled: (name: string) => boolean
  onAddSubject: () => void
  subjectsCount: number
}


export function SubjectInputForm({
  currentSubject,
  setCurrentSubject,
  currentPercentage,
  setCurrentPercentage,
  isSubjectDisabled,
  onAddSubject,
  subjectsCount,
}: SubjectInputFormProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentSubject && currentPercentage) {
      onAddSubject()
    }
  }

  return (
    <div className="border-t bg-card/50 backdrop-blur-sm p-4 sticky bottom-0 z-10">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground mb-1">Add a Subject</p>
        <div className="flex gap-2">
          <Select value={currentSubject} onValueChange={setCurrentSubject}>
            <SelectTrigger className="flex-1 glass-input">
              <SelectValue placeholder="Select subject..." />
            </SelectTrigger>
            <SelectContent className="glass-modal max-h-[300px]">
              {SUBJECT_CATEGORIES.map((category) => (
                <SelectGroup key={category.label}>
                  <SelectLabel className="text-primary font-bold sticky top-0 bg-background/95 backdrop-blur z-10 py-2">{category.label}</SelectLabel>
                  {category.options.map((option) => {
                    const disabled = isSubjectDisabled(option.value)
                    return (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        disabled={disabled}
                        className={disabled ? "opacity-50 cursor-not-allowed" : ""}
                      >
                        {option.label}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <div className="relative w-24 flex-shrink-0">
             <Input
              type="number"
              placeholder="%"
              value={currentPercentage}
              onChange={(e) => setCurrentPercentage(e.target.value)}
              onKeyDown={handleKeyDown}
              min="0"
              max="100"
              className="glass-input pr-6"
            />
             <span className="absolute right-3 top-2.5 text-xs text-muted-foreground pointer-events-none">%</span>
          </div>
         
          <Button
            onClick={onAddSubject}
            disabled={!currentSubject || !currentPercentage}
            className="flex-1 glass-button"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Subject
          </Button>
        </div>
      </div>
    </div>
  )
}
