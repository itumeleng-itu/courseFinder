import type { University, Course } from "./base-university"
import { BaseUniversity } from "./base-university"

// Import all university classes
import { UCT } from "./uct"
import { Wits } from "./wits"
import { UP } from "./up"
import { Stellenbosch } from "./stellenbosch"
import { UKZN } from "./ukzn"
import { UJ } from "./uj"
import { NWU } from "./nwu"
import { Rhodes } from "./rhodes"
import { CPUT } from "./cput"
import { CUT } from "./cut"
import { DUT } from "./dut"
import { MUT } from "./mut"
import { NMU } from "./nmu"
import { UWC } from "./uwc"
import { UMP } from "./ump"
import { UFH } from "./ufh"
import { VUT } from "./vut"
import { UNISA } from "./unisa"
import { UNIVEN } from "./univen"
import { UniZulu } from "./unizulu"
import { UFS } from "./ufs"
import { SMU } from "./smu"
import { UL } from "./ul"
import { WSU } from "./wsu"
import { TUT } from "./tut"
import { SPU } from "./spu"

// Helper to normalize APS field across varying course shapes
// Returns null if no valid APS field is found (to indicate invalid/missing APS requirement)
function normalizeAps(course: any): number | null {
  const aps = course?.apsMin ??
    course?.minimumAPS ??
    course?.apsRequired ??
    course?.minAps ??
    null
  
  // Return null if APS is missing or invalid (0 or negative is invalid)
  if (aps === null || aps === undefined || aps <= 0) {
    return null
  }
  
  return aps
}

// Map detailed course to simplified index course
// Returns null if course has invalid/missing APS requirement
function toIndexCourse(course: any): Course | null {
  const apsRequired = normalizeAps(course)
  
  // Filter out courses with invalid or missing APS requirements
  if (apsRequired === null || apsRequired <= 0) {
    // Log warning for missing APS (only in development)
    if (process.env.NODE_ENV === 'development' && course?.name) {
      console.warn(`Course "${course.name}" has invalid or missing APS requirement and will be filtered out.`)
    }
    return null
  }
  
  return {
    name: course?.name ?? "",
    faculty: course?.faculty ?? "",
    apsRequired,
    description: course?.description,
    requirements: Array.isArray(course?.requirements) ? course.requirements : undefined,
  }
}

// Instantiate all university classes
const instances: BaseUniversity[] = [
  new UCT(),
  new Wits(),
  new UP(),
  new Stellenbosch(),
  new UKZN(),
  new UJ(),
  new NWU(),
  new Rhodes(),
  new CPUT(),
  new CUT(),
  new DUT(),
  new MUT(),
  new NMU(),
  new UWC(),
  new UMP(),
  new UFH(),
  new VUT(),
  new UNISA(),
  new UNIVEN(),
  new UniZulu(),
  new UFS(),
  new SMU(),
  new UL(),
  new WSU(),
  new TUT(),
  new SPU(),
]

// Aggregate to simple index format
export const universities: University[] = instances.map((uni) => ({
  id: uni.id,
  name: uni.name,
  shortName: uni.shortName,
  location: typeof (uni as any).getLocationString === "function" ? (uni as any).getLocationString() : String((uni as any).location?.city ?? ""),
  website: uni.website,
  courses: (uni.courses ?? [])
    .map(toIndexCourse)
    .filter((course): course is Course => course !== null), // Filter out null courses (invalid APS)
}))

export function getAllUniversities(): University[] {
  return universities
}

export function getUniversityById(id: string): University | undefined {
  return universities.find((uni) => uni.id === id)
}

export type { University as UniversityIndexType, Course as UniversityIndexCourse } from "./base-university"
