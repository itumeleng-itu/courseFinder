import { checkSubjectRequirements } from "@/app/find-course/utils"
import { getAllUniversityInstances } from "@/data/universities"
import { percentageToLevel } from "@/lib/aps/utils"
import { ExtendedCourse } from "@/app/find-course/types"
import { CourseMatch } from "@/app/find-course/types"
import { SubjectEntry } from "@/lib/types"

async function run() {
  const subjects: SubjectEntry[] = [
    { id: "1", name: "English Home Language", percentage: 95 }, // Level 7
    { id: "2", name: "Mathematics", percentage: 95 }, // Level 7
    { id: "3", name: "Physical Sciences", percentage: 95 }, // Level 7
    { id: "4", name: "Life Sciences", percentage: 95 }, // Level 7
    { id: "5", name: "Accounting", percentage: 95 }, // Level 7
    { id: "6", name: "Afrikaans First Additional Language", percentage: 95 }, // Level 7
    { id: "7", name: "Life Orientation", percentage: 95 } // Level 7
  ]

  const studentLevels: Record<string, number> = Object.fromEntries(
    subjects.map((s) => [s.name, percentageToLevel(s.percentage)])
  )

  const studentPercentages: Record<string, number> = Object.fromEntries(
    subjects.map((s) => [s.name, s.percentage])
  )

  const instances = getAllUniversityInstances()
  const wits = instances.find(u => u.id === "wits")
  
  if (!wits) return
  
  console.log("Testing Wits First Course:")
  const course = wits.courses[0] as ExtendedCourse
  console.log("Course:", course.name, course.subjectRequirements)
  
  const calculatedAPS = wits.calculateApsScore(studentLevels, course, studentPercentages)
  console.log("Calculated APS:", calculatedAPS, "Required:", course.apsMin)
  
  const requirementCheck = checkSubjectRequirements(subjects, course.subjectRequirements)
  console.log("Requirement check:", requirementCheck)
}

run().catch(console.error)
