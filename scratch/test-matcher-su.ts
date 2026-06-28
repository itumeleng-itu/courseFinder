import { Stellenbosch } from "../data/universities/stellenbosch"

const subjects = [
  { name: "English Home Language", percentage: 95 },
  { name: "Mathematics", percentage: 95 },
  { name: "Life Orientation", percentage: 95 },
  { name: "Physical Sciences", percentage: 95 },
  { name: "Life Sciences", percentage: 95 },
  { name: "Geography", percentage: 95 },
  { name: "Accounting", percentage: 95 }
]

const su = new Stellenbosch()

console.log(`\n=== STELLENBOSCH REJECTED COURSES ===`)
let rejectedCount = 0
su.courses.forEach(course => {
  const calculatedAPS = su.calculateApsScore(
    subjects.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.percentage }), {}),
    course,
    subjects.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.percentage }), {})
  )

  const apsRequired = course.apsMin ?? course.apsRequired ?? 0
  
  if (calculatedAPS < apsRequired) {
    console.log(`[APS TOO LOW] ${course.name}: needed ${apsRequired}, got ${calculatedAPS}`)
    rejectedCount++
    return
  }

  // We don't have the subject checker here, so let's just log what we have
  console.log(`[PASS APS] ${course.name}: needed ${apsRequired}, got ${calculatedAPS}. Req: ${JSON.stringify(course.subjectRequirements)}`)
})

console.log(`Total rejected: ${rejectedCount} / ${su.courses.length}`)
