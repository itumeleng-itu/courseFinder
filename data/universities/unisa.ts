import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * University of South Africa (UNISA) class
 */
export class UNISA extends BaseUniversity {
  readonly id = "unisa"
  readonly name = "University of South Africa"
  readonly shortName = "UNISA"
  readonly website = "https://www.unisa.ac.za"
  readonly logo = "/logos/unisa.png"
  readonly location = {
    city: "Pretoria",
    province: "Gauteng",
    coordinates: {
      latitude: -25.7679,
      longitude: 28.2015,
    },
  }

  protected readonly _courses: Course[] = [
    {
      id: "unisa-bsc",
      name: "Bachelor of Science",
      faculty: "Science, Engineering and Technology",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "unisa-ba",
      name: "Bachelor of Arts",
      faculty: "Human Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {},
    },
    {
      id: "unisa-bcom",
      name: "Bachelor of Commerce",
      faculty: "Economic and Management Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
      },
    },
    {
      id: "unisa-llb",
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
