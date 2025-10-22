"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calculator } from "lucide-react"
import type { SubjectEntry } from "@/lib/types"

interface APSScoreDisplayProps {
  score: number
  subjects: SubjectEntry[]
}

export default function APSScoreDisplay({ score, subjects }: APSScoreDisplayProps) {
  const getScoreCategory = (score: number) => {
    if (score >= 36) return { label: "Excellent", color: "bg-green-500" }
    if (score >= 30) return { label: "Very Good", color: "bg-blue-500" }
    if (score >= 24) return { label: "Good", color: "bg-yellow-500" }
    if (score >= 18) return { label: "Average", color: "bg-orange-500" }
    return { label: "Below Average", color: "bg-red-500" }
  }

  const category = getScoreCategory(score)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600" />
          Your APS Score
        </CardTitle>
        <CardDescription>Based on {subjects.length} subjects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="text-4xl font-bold">{score}</div>
          <Badge className={category.color}>{category.label}</Badge>
        </div>
        <div className="space-y-2">
          {subjects.map((subject) => (
            <div key={subject.id} className="flex justify-between text-sm">
              <span className="text-gray-600">{subject.name}</span>
              <span className="font-semibold">{subject.percentage}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
