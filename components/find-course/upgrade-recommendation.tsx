import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, AlertCircle, BookOpen, ExternalLink } from "lucide-react"
import { NSCResult } from "@/lib/nsc"

/**
 * How few options count as thin enough to raise the rewrite route.
 *
 * Was 5, which only caught learners who had almost nothing. A learner
 * with six or seven matches is still badly constrained -- one bad
 * subject mark can be the only thing between them and a far wider
 * field -- and they were being shown nothing at all. Ten is the point
 * at which the list stops being a real choice.
 */
export const THIN_RESULTS_THRESHOLD = 10

/** Department of Basic Education, Second Chance Matric Programme. */
const SCMP_URL = "https://www.education.gov.za/Programmes/SecondChanceProgramme.aspx"

interface UpgradeRecommendationProps {
  nscResult: NSCResult | null
  qualifiedCount: number
}

export function UpgradeRecommendation({ nscResult, qualifiedCount }: UpgradeRecommendationProps) {
  if (qualifiedCount >= THIN_RESULTS_THRESHOLD) return null

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
              A second chance could widen this list
            </CardTitle>
            <CardDescription className="text-orange-700/80 dark:text-orange-400/80">
              {qualifiedCount === 0
                ? "Your current marks do not yet meet the requirements for any programme here"
                : `You qualify for ${qualifiedCount} ${qualifiedCount === 1 ? "programme" : "programmes"} right now`}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-white/60 dark:bg-black/20 p-4 rounded-lg text-sm border border-orange-100 dark:border-orange-900/30 space-y-3">
            {nscResult && nscResult.passLevel !== "bachelor" && (
              <div className="flex items-center gap-2 text-sm font-medium">
                <GraduationCap className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <span>Current pass level: {nscResult.passLevel.replace("_", " ").toUpperCase()}</span>
              </div>
            )}

            <p className="text-foreground/80">
              Rewriting is not starting over. You can rewrite individual
              subjects, and most programmes here turn on one or two of them —
              usually Mathematics, Physical Sciences or a language. Lifting a
              single subject by one level often opens far more than one course.
            </p>

            <p className="text-foreground/80">
              The{" "}
              <span className="font-semibold text-orange-700 dark:text-orange-400">
                Second Chance Matric Programme
              </span>{" "}
              is run by the Department of Basic Education for candidates who did
              not meet the NSC or Senior Certificate requirements, and for
              part-time candidates who wrote the NSC after 2008 and want to
              improve. It provides classes, past papers and broadcast lessons,
              and you write in the May/June or November sitting.
            </p>

            <p className="text-xs text-muted-foreground">
              Come back and run your marks again after a rewrite — the list
              above is recalculated from whatever you enter.
            </p>
          </div>

          <Button
            asChild
            className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white border-0"
          >
            <a href={SCMP_URL} target="_blank" rel="noreferrer">
              <BookOpen className="w-4 h-4 mr-2" />
              Second Chance Matric Programme
              <ExternalLink className="w-3.5 h-3.5 ml-2" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
