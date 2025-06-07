import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface APSScoreDisplayProps {
  score: number
}

export default function APSScoreDisplay({ score }: APSScoreDisplayProps) {
  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardTitle className="text-2xl">Your APS Score: {score}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-gray-600">
          This score is calculated based on your top 6 subjects, excluding Life Orientation.
        </p>
      </CardContent>
    </Card>
  )
}
