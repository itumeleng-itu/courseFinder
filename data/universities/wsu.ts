import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * Walter Sisulu University (WSU) class
 */
export class WSU extends BaseUniversity {
  readonly id = "wsu"
  readonly name = "Walter Sisulu University"
  readonly shortName = "WSU"
  readonly website = "https://www.wsu.ac.za"
  readonly logo = "/logos/wsu.png"
  readonly location = {
    city: "Mthatha",
    province: "Eastern Cape",
    coordinates: {
      latitude: -31.5889,
      longitude: 28.7731,
    },
  }

  protected readonly _courses: Course[] = [
    {
      id: "wsu-bsc",
      name: "Bachelor of Science",
      faculty: "Natural Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "wsu-ba",
      name: "Bachelor of Arts",
      faculty: "Humanities and Social Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {},
    },
    {
      id: "wsu-bcom",
      name: "Bachelor of Commerce",
      faculty: "Commerce and Administration",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
      },
    },
    {
      id: "wsu-llb",
      name: "Bachelor of Laws",
      faculty: "Law",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 4,
      },
    },
  ]
}
