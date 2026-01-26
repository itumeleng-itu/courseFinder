import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Target } from "lucide-react"

interface TipCategory {
  category: string
  tips: string[]
}

export function GeneralTipsSection({ tips }: { tips: TipCategory[] }) {
  return (
    <section className="mb-8">
      <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <Target className="h-6 w-6 text-green-600" />
        General Study Tips
      </h3>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {tips.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{category.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {category.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="text-sm text-gray-600 flex items-start gap-2">
                    <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
