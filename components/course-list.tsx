import type { CourseResult } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SecondChanceCard from "@/components/SecondChanceCard"

interface CourseListProps {
  courses: CourseResult[]
}

export default function CourseList({ courses }: CourseListProps) {
  // Group courses by university
  const coursesByUniversity: Record<string, CourseResult[]> = {}

  courses.forEach((course) => {
    if (!coursesByUniversity[course.university]) {
      coursesByUniversity[course.university] = []
    }
    coursesByUniversity[course.university].push(course)
  })

  const universities = Object.keys(coursesByUniversity)

  if (courses.length === 0) {
    return (
      <div className="py-8 flex justify-center">
        <div className="space-y-4 text-center">
          <p className="text-lg text-muted-foreground">No qualifying courses found with your current APS score.</p>
          <SecondChanceCard />
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Qualifying Courses ({courses.length})</h2>

      <Tabs defaultValue={universities[0] || "all"}>
        <TabsList className="mb-4 flex flex-wrap">
          <TabsTrigger value="all">All Universities</TabsTrigger>
          {universities.map((university) => (
            <TabsTrigger key={university} value={university}>
              {university}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          <div className="grid gap-4 md:grid-cols-2">
            {courses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        </TabsContent>

        {universities.map((university) => (
          <TabsContent key={university} value={university}>
            <div className="grid gap-4 md:grid-cols-2">
              {coursesByUniversity[university].map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function CourseCard({ course }: { course: CourseResult }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{course.name}</CardTitle>
        <CardDescription>{course.university}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge variant="outline">Min APS: {course.minAps}</Badge>
          {course.faculty && <Badge variant="secondary">{course.faculty}</Badge>}
          {course.duration && <Badge variant="outline">{course.duration}</Badge>}
        </div>
        {course.requirements && (
          <div className="mt-2 text-sm">
            <p className="font-medium">Requirements:</p>
            <ul className="list-disc list-inside text-gray-600">
              {course.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
