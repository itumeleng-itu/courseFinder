import { checkSubjectRequirements } from "@/app/find-course/utils"
import { getAllUniversityInstances } from "@/data/universities"
import { percentageToLevel } from "@/lib/aps/utils"
import { ExtendedCourse } from "@/app/find-course/types"
import { CourseMatch } from "@/app/find-course/types"
import { SubjectEntry } from "@/lib/types"

async function run() {
  const universityInstances = getAllUniversityInstances()
  
  console.log("Checking courses per university...")
  universityInstances.forEach((uni) => {
    console.log(`- ${uni.id.toUpperCase()}: ${uni.courses?.length || 0} courses loaded`)
  })
}

run().catch(console.error)
