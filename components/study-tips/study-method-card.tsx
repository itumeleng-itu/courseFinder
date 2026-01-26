import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Lightbulb, Clock, Star, LucideIcon } from "lucide-react"

interface StudyMethod {
  id: string
  title: string
  description: string
  icon: LucideIcon
  difficulty: string
  timeRequired: string
  effectiveness: number
  techniques: string[]
  bestFor: string[]
  tips: string[]
}

export function StudyMethodCard({ method }: { method: StudyMethod }) {
  const IconComponent = method.icon
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <IconComponent className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{method.title}</CardTitle>
              <CardDescription className="text-sm">{method.description}</CardDescription>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge variant="outline" className="text-xs">{method.difficulty}</Badge>
          <Badge variant="outline" className="text-xs"><Clock className="h-3 w-3 mr-1" />{method.timeRequired}</Badge>
          <Badge variant="outline" className="text-xs"><Star className="h-3 w-3 mr-1" />{method.effectiveness}/5</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium text-sm mb-2">How to do it:</h4>
          <ul className="space-y-1">
            {method.techniques.slice(0, 3).map((technique, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                {technique}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-sm mb-2">Best for:</h4>
          <div className="flex flex-wrap gap-1">
            {method.bestFor.map((item, index) => (
              <Badge key={index} variant="secondary" className="text-xs">{item}</Badge>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium text-sm mb-2">Pro Tips:</h4>
          <ul className="space-y-1">
            {method.tips.slice(0, 2).map((tip, index) => (
              <li key={index} className="text-xs text-gray-600 flex items-start gap-2">
                <Lightbulb className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
