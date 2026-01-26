import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, CheckCircle2, AlertCircle } from "lucide-react"

interface CourseFiltersProps {
  searchQuery: string
  setSearchQuery: (val: string) => void
  showOnlyQualified: boolean
  setShowOnlyQualified: (val: boolean) => void
  qualifiedCount: number
  partialCount: number
}

export function CourseFilters({
  searchQuery,
  setSearchQuery,
  showOnlyQualified,
  setShowOnlyQualified,
  qualifiedCount,
  partialCount,
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
        <Button
          variant={showOnlyQualified ? "default" : "outline"}
          onClick={() => setShowOnlyQualified(!showOnlyQualified)}
          className="glass-button"
        >
          {showOnlyQualified ? "Show All Courses" : "Fully Qualified Only"}
        </Button>
      </div>
      <div className="flex gap-4 mt-4 text-sm flex-wrap">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span className="font-medium">{qualifiedCount} Fully Qualified</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <span className="font-medium">{partialCount} Partial Match</span>
        </div>
      </div>
    </div>
  )
}
