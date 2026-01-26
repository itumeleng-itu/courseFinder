import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NSCResult } from "@/lib/nsc"

interface APSDisplayProps {
  apsScore: number | null
  nscResult: NSCResult | null
}

export function APSDisplay({ apsScore, nscResult }: APSDisplayProps) {
  if (apsScore === null) return null

  return (
    <Card className="glass-card liquid-gradient liquid-border">
      <CardContent className="pt-6">
        <div className="text-center">
          <p className="text-sm font-medium mb-1">Your APS Score</p>
          <p className="text-4xl font-bold">{apsScore}</p>
          <p className="text-xs mt-1 opacity-90">
            Universities may calculate APS differently
          </p>
          {nscResult && nscResult.passLevel !== "none" && (
            <div className="mt-3 flex justify-center">
              <Badge variant="secondary">
                {nscResult.passLevel === "bachelor"
                  ? "Bachelor's Pass"
                  : nscResult.passLevel === "diploma"
                    ? "Diploma Pass"
                    : "Higher Certificate Pass"}
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
