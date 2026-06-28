import { DUT } from "../data/universities/dut"
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

const dut = new DUT()
let reqFailCount = 0

console.log("=== DUT ===")
dut.courses.forEach(course => {
  const reqCheck = checkSubjectRequirements(subjects, course.subjectRequirements)
  if (!reqCheck.meets) {
    console.log(`[REQ FAIL] ${course.name}. Missing: ${reqCheck.missing.join(', ')}`)
    reqFailCount++
  }
})

console.log(`Req Fails: ${reqFailCount} (Total: ${dut.courses.length})`)
