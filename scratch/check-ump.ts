import { UMP } from "../data/universities/ump"
import { checkSubjectRequirements } from "../app/find-course/utils"

const subjects = [
  { name: "English Home Language", percentage: 95 },
  { name: "Mathematics", percentage: 95 },
  { name: "Life Orientation", percentage: 95 },
  { name: "Physical Sciences", percentage: 95 },
  { name: "Life Sciences", percentage: 95 },
  { name: "Geography", percentage: 95 },
  { name: "Accounting", percentage: 95 }
]

const studentPercentages = subjects.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.percentage }), {})

const ump = new UMP()
let reqFailCount = 0

console.log("=== UMP ===")
ump.courses.forEach(course => {
  const reqCheck = checkSubjectRequirements(subjects, course.subjectRequirements)
  if (!reqCheck.meets) {
    console.log(`[REQ FAIL] ${course.name}. Missing: ${reqCheck.missing.join(', ')}`)
    reqFailCount++
  }

  const calculatedAPS = ump.calculateApsScore(studentPercentages)
  const apsRequired = course.apsMin ?? 0
  if (calculatedAPS < apsRequired) {
    console.log(`[APS FAIL] ${course.name}. Req: ${apsRequired}, Got: ${calculatedAPS}`)
  }
})

console.log(`Req Fails: ${reqFailCount} (Total: ${ump.courses.length})`)
