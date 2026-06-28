import { Input } from "@/components/ui/input"
import { Search, CheckCircle2 } from "lucide-react"

interface CourseFiltersProps {
  searchQuery: string
  setSearchQuery: (val: string) => void
  qualifiedCount: number
}

export function CourseFilters({
  searchQuery,
  setSearchQuery,
  qualifiedCount,
}: CourseFiltersProps) {
  return (
    <div className="p-4 md:p-6 border-b glass-nav">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 glass-input"
          />
        </div>
      </div>
      <div className="flex gap-4 mt-4 text-sm flex-wrap">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span className="font-medium">{qualifiedCount} Courses</span>
        </div>
      </div>
    </div>
  )
}
