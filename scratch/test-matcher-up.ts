import { checkSubjectRequirements } from "@/app/find-course/utils"
import { getAllUniversityInstances } from "@/data/universities"
import { percentageToLevel } from "@/lib/aps/utils"
import { ExtendedCourse } from "@/app/find-course/types"

async function run() {
  const subjects = [
    { id: "1", name: "English Home Language", percentage: 95 },
    { id: "2", name: "English First Additional Language", percentage: 95 },
    { id: "3", name: "Mathematics", percentage: 95 },
    { id: "4", name: "Physical Sciences", percentage: 95 },
    { id: "5", name: "Life Sciences", percentage: 95 },
    { id: "6", name: "Accounting", percentage: 95 },
    { id: "7", name: "Life Orientation", percentage: 95 }
  ]

  const studentLevels: Record<string, number> = Object.fromEntries(
    subjects.map((s) => [s.name, percentageToLevel(s.percentage)])
  )

  const studentPercentages: Record<string, number> = Object.fromEntries(
    subjects.map((s) => [s.name, s.percentage])
  )

  const instances = getAllUniversityInstances()
  const up = instances.find(u => u.id === "up")
  
  if (!up) return
  
  console.log("Testing UP First Course:")
  const course = up.courses[0] as ExtendedCourse
  console.log("Course:", course.name, course.subjectRequirements)
  
  const calculatedAPS = up.calculateApsScore(studentLevels, course, studentPercentages)
  console.log("Calculated APS:", calculatedAPS, "Required:", course.apsMin)
  
  const requirementCheck = checkSubjectRequirements(subjects, course.subjectRequirements)
  console.log("Requirement check:", requirementCheck)
}

run().catch(console.error)
