import { checkSubjectRequirements } from "@/app/find-course/utils"
import { getAllUniversityInstances } from "@/data/universities"
import { percentageToLevel } from "@/lib/aps/utils"
import { ExtendedCourse } from "@/app/find-course/types"
import { CourseMatch } from "@/app/find-course/types"
import { SubjectEntry } from "@/lib/types"

async function run() {
  console.log("Starting mock evaluation for a TOP ACHIEVER student (to see all universities)...")
  
  // A student who scored 95% in everything
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

  const universityInstances = getAllUniversityInstances()
  const uniMatches: CourseMatch[] = []

  let totalUniversitiesChecked = 0
  let totalCoursesChecked = 0

  universityInstances.forEach((universityInstance) => {
    totalUniversitiesChecked++
    
    universityInstance.courses.forEach((course) => {
      totalCoursesChecked++
      const extendedCourse = course as ExtendedCourse
      const calculatedAPS = universityInstance.calculateApsScore(studentLevels, course)
      
      const apsRequired = extendedCourse.apsMin ?? extendedCourse.apsRequired ?? 0
      if (apsRequired <= 0 || calculatedAPS <= 0) return
      
      const requirementCheck = checkSubjectRequirements(subjects, extendedCourse.subjectRequirements)
      const apsMet = calculatedAPS >= apsRequired
      const meetsAll = apsMet && requirementCheck.meets

      if (meetsAll) {
        uniMatches.push({
          course: extendedCourse,
          university: { id: universityInstance.id } as any,
          meetsRequirements: true,
          missingRequirements: [],
          metRequirements: requirementCheck.met,
        })
      }
    })
  })

  console.log(`\nChecked ${totalCoursesChecked} courses across ${totalUniversitiesChecked} universities.`)
  console.log(`Found ${uniMatches.length} fully qualified courses for this top-achieving mock student.`)
  
  const matchesByUni = uniMatches.reduce((acc, match) => {
    acc[match.university.id] = (acc[match.university.id] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  console.log("\nMatches breakdown by university:")
  
  // Sort the universities by number of matches
  const sortedMatches = Object.entries(matchesByUni).sort((a, b) => b[1] - a[1])
  sortedMatches.forEach(([uni, count]) => {
    console.log(`- ${uni.toUpperCase()}: ${count} courses`)
  })
}

run().catch(console.error)
