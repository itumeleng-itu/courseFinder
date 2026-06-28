import { UWC } from "../data/universities/uwc"
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

const uwc = new UWC()
let reqFailCount = 0
let apsFailCount = 0

console.log("=== UWC ===")
uwc.courses.forEach(course => {
  const reqCheck = checkSubjectRequirements(subjects, course.subjectRequirements)
  if (!reqCheck.meets) {
    console.log(`[REQ FAIL] ${course.name}. Missing: ${reqCheck.missing.join(', ')}`)
    reqFailCount++
  }

  const apsCheck = uwc.calculateApsScore(
    subjects.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.percentage }), {}),
    course,
    subjects.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.percentage }), {})
  )
  if (apsCheck < (course.apsMin ?? 0)) {
    console.log(`[APS FAIL] ${course.name}. Required: ${course.apsMin}, Got: ${apsCheck}`)
    apsFailCount++
  }
})

console.log(`Req Fails: ${reqFailCount}, APS Fails: ${apsFailCount} (Total: ${uwc.courses.length})`)
