import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, AlertCircle, BookOpen } from "lucide-react"
import { Subject, CourseMatch } from "@/app/find-course/types"
import { NSCResult } from "@/lib/nsc"

interface UpgradeRecommendationProps {
  nscResult: NSCResult | null
  qualifiedCount: number
}

export function UpgradeRecommendation({ nscResult, qualifiedCount }: UpgradeRecommendationProps) {
  if (qualifiedCount >= 5) return null

  return (
    <Card className="mb-6 border-orange-200 bg-orange-50/50 dark:bg-orange-950/20 dark:border-orange-900/50 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-orange-100 dark:bg-orange-900/40 rounded-full">
            <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <CardTitle className="text-orange-800 dark:text-orange-300 text-lg">
              Unlock More Options
            </CardTitle>
            <CardDescription className="text-orange-700/80 dark:text-orange-400/80">
              You only qualify for {qualifiedCount} {qualifiedCount === 1 ? 'course' : 'courses'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-white/60 dark:bg-black/20 p-4 rounded-lg text-sm border border-orange-100 dark:border-orange-900/30">
            <p className="mb-3 text-foreground/80">
              Many university programmes require higher achievement levels, especially in Mathematics, Physical Sciences, or English.
            </p>
            {nscResult && nscResult.passLevel !== "bachelor" && (
              <div className="flex items-center gap-2 text-sm font-medium mb-2">
                <GraduationCap className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <span>Current Pass Level: {nscResult.passLevel.replace("_", " ").toUpperCase()}</span>
              </div>
            )}
            <p className="text-foreground/80">
              Consider the <span className="font-semibold text-orange-700 dark:text-orange-400">Second Chance Matric Programme (SCMP)</span> to upgrade your results and unlock degrees that require a Bachelor's pass or specific subject levels.
            </p>
          </div>
          <Button className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white border-0">
            <BookOpen className="w-4 h-4 mr-2" />
            Learn About Matric Upgrading
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
