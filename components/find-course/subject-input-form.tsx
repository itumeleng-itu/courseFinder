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
  return (
    <div className="border-t bg-card p-4">
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Add Subject Manually</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Select value={currentSubject} onValueChange={setCurrentSubject}>
            <SelectTrigger className="text-sm glass-input">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent className="glass-modal">
              {SUBJECT_CATEGORIES.map((category) => (
                <SelectGroup key={category.label}>
                  <SelectLabel className="text-primary font-bold">{category.label}</SelectLabel>
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

          <Input
            type="number"
            placeholder="Percentage (0-100)"
            value={currentPercentage}
            onChange={(e) => setCurrentPercentage(e.target.value)}
            min="0"
            max="100"
            className="text-sm glass-input"
          />
          <Button
            onClick={onAddSubject}
            disabled={!currentSubject || !currentPercentage}
            className="w-full text-sm glass-button"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Subject ({subjectsCount})
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
