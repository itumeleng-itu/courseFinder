import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap } from "lucide-react"

export function SessionPlanner() {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-blue-600" />
          Quick Study Session Planner
        </CardTitle>
        <CardDescription>Use this guide to structure your study sessions effectively</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Before You Start (5 min)</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Set specific goals</li>
              <li>• Gather all materials</li>
              <li>• Eliminate distractions</li>
              <li>• Choose your method</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-sm">During Study (25-50 min)</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Stay focused on one topic</li>
              <li>• Take notes actively</li>
              <li>• Test yourself regularly</li>
              <li>• Ask questions</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-sm">After Study (5-10 min)</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Review what you learned</li>
              <li>• Plan next session</li>
              <li>• Take a proper break</li>
              <li>• Reward yourself</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
