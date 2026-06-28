import { checkSubjectRequirements } from "@/app/find-course/utils"
import { getAllUniversityInstances } from "@/data/universities"
import { percentageToLevel } from "@/lib/aps/utils"
import { ExtendedCourse } from "@/app/find-course/types"

async function run() {
  const subjects = [
    { id: "1", name: "English Home Language", percentage: 95 },
    { id: "2", name: "English First Additional Language", percentage: 95 }, // Needed for WITS bug
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
  
  let totalCourses = 0
  let qualifiedCourses = 0
  const resultsByUni: Record<string, { total: number, qualified: number }> = {}

  instances.forEach((uni) => {
    let uniQualified = 0
    let uniTotal = 0

    uni.courses.forEach((c) => {
      uniTotal++
      const course = c as ExtendedCourse
      const calculatedAPS = uni.calculateApsScore(studentPercentages, course, studentPercentages)
      const apsRequired = course.apsMin ?? course.apsRequired ?? 0
      
      let reqMeets = false
      const requirementCheck = checkSubjectRequirements(subjects, course.subjectRequirements)
      if (requirementCheck.meets) {
        reqMeets = true
      }

      if (apsRequired === 0 || calculatedAPS >= apsRequired) {
        if (reqMeets) uniQualified++
      } else if (reqMeets) {
        console.log(`[APS FAIL] ${uni.name} ${course.name}. Req: ${apsRequired}, Got: ${calculatedAPS}`)
      }
    })

    resultsByUni[uni.name] = { total: uniTotal, qualified: uniQualified }
    totalCourses += uniTotal
    qualifiedCourses += uniQualified
  })

  console.log(`\n=== RESULTS FOR TOP ACHIEVER (95% AVERAGE) ===`)
  console.log(`Total Courses in System: ${totalCourses}`)
  console.log(`Total Qualified Courses: ${qualifiedCourses} (${Math.round(qualifiedCourses/totalCourses*100)}%)\n`)
  
  console.log("=== BREAKDOWN BY UNIVERSITY ===")
  const sortedUnis = Object.entries(resultsByUni)
    .sort((a, b) => b[1].qualified - a[1].qualified)
    
  sortedUnis.forEach(([name, stats]) => {
    console.log(`${name.padEnd(50)} : ${stats.qualified.toString().padStart(3)} / ${stats.total.toString().padStart(3)} courses qualified`)
  })
}

run().catch(console.error)
