import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * University of Pretoria (UP) class
 */
export class UP extends BaseUniversity {
  readonly id = "up"
  readonly name = "University of Pretoria"
  readonly shortName = "UP"
  readonly website = "https://www.up.ac.za"
  readonly logo = "/logos/up.png"
  readonly location = {
    city: "Pretoria",
    province: "Gauteng",
    coordinates: {
      latitude: -25.7545,
      longitude: 28.2314,
    },
  }

  protected readonly _courses: Course[] = [
    {
      id: "up-bsc-it",
      name: "BSc Information Technology",
      faculty: "Engineering, Built Environment & IT",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 5,
      },
    },
    {
      id: "up-bcom",
      name: "BCom Accounting Sciences",
      faculty: "Economic & Management Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 6,
      },
    },
    {
      id: "up-llb",
      name: "Bachelor of Laws (LLB)",
      faculty: "Law",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {},
    },
    {
      id: "up-mbchb",
      name: "MBChB",
      faculty: "Health Sciences",
      apsMin: 35,
      duration: "6 years",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
  ]
}
