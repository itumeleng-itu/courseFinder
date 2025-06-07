import { UCT } from "./uct"
import { Wits } from "./wits"
import { UP } from "./up"
import { Stellenbosch } from "./stellenbosch"
import { UKZN } from "./ukzn"
import { UJ } from "./uj"
import { NWU } from "./nwu"
import { Rhodes } from "./rhodes"
import { UFS } from "./ufs"
import { UWC } from "./uwc"
import { UFH } from "./ufh"
import { UniZulu } from "./unizulu"
import { WSU } from "./wsu"
import { CUT } from "./cut"
import { DUT } from "./dut"
import { VUT } from "./vut"
import { UMP } from "./ump"
import { SPU } from "./spu"
import { SMU } from "./smu"
import { UNIVEN } from "./univen"
import { CPUT } from "./cput"
import { TUT } from "./tut"
import { UL } from "./ul"
import { MUT } from "./mut"
import { NMU } from "./nmu"
import { UNISA } from "./unisa"
import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

// Export all universities
export const universities = [
  new UCT(),
  new Wits(),
  new UP(),
  new Stellenbosch(),
  new UKZN(),
  new UJ(),
  new NWU(),
  new Rhodes(),
  new UFS(),
  new UWC(),
  new UFH(),
  new UniZulu(),
  new WSU(),
  new CUT(),
  new DUT(),
  new VUT(),
  new UMP(),
  new SPU(),
  new SMU(),
  new UNIVEN(),
  new CPUT(),
  new TUT(),
  new UL(),
  new MUT(),
  new NMU(),
  new UNISA(),
]

export const getAllCourses = () => {
  const allCourses: Array<Course & { university: string }> = []
  for (const university of universities) {
    for (const course of university.courses) {
      allCourses.push({ ...course, university: university.name })
    }
  }
  return allCourses
}

export { BaseUniversity }
