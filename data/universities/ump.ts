import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * University of Mpumalanga (UMP) class
 */
export class UMP extends BaseUniversity {
  readonly id = "ump"
  readonly name = "University of Mpumalanga"
  readonly shortName = "UMP"
  readonly website = "https://www.ump.ac.za"
  readonly logo = "/logos/ump.png"
  readonly location = {
    city: "Mbombela",
    province: "Mpumalanga",
    coordinates: {
      latitude: -25.4478,
      longitude: 30.9699,
    },
  }

  protected readonly _courses: Course[] = [
    {
      id: "ump-bsc-agriculture",
      name: "Bachelor of Science in Agriculture",
      faculty: "Agriculture, Science and Technology",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 4,
        "Life Sciences": 4,
      },
    },
    {
      id: "ump-ba-development",
      name: "Bachelor of Arts in Development Studies",
      faculty: "Humanities and Social Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {},
    },
    {
      id: "ump-bed",
      name: "Bachelor of Education",
      faculty: "Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {},
    },
    {
      id: "ump-bsc-nature-conservation",
      name: "Bachelor of Science in Nature Conservation",
      faculty: "Agriculture, Science and Technology",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
        "Life Sciences": 4,
      },
    },
  ]
}
