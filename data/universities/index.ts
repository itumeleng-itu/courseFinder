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
function normalizeAps(course: any): number {
  return (
    course?.apsMin ??
    course?.minimumAPS ??
    course?.apsRequired ??
    course?.minAps ??
    0
  )
}

// Map detailed course to simplified index course
function toIndexCourse(course: any): Course {
  return {
    name: course?.name ?? "",
    faculty: course?.faculty ?? "",
    apsRequired: normalizeAps(course),
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
  courses: (uni.courses ?? []).map(toIndexCourse),
}))

export function getAllUniversities(): University[] {
  return universities
}

export function getUniversityById(id: string): University | undefined {
  return universities.find((uni) => uni.id === id)
}

export type { University as UniversityIndexType, Course as UniversityIndexCourse } from "./base-university"
