import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * University of Fort Hare (UFH) class
 */
export class UFH extends BaseUniversity {
  readonly id = "ufh"
  readonly name = "University of Fort Hare"
  readonly shortName = "UFH"
  readonly website = "https://www.ufh.ac.za"
  readonly logo = "/logos/ufh.png"
  readonly location = {
    city: "Alice",
    province: "Eastern Cape",
    coordinates: {
      latitude: -32.7833,
      longitude: 26.85,
    },
  }

  protected readonly _courses: Course[] = [
    {
      id: "ufh-bsc",
      name: "Bachelor of Science",
      faculty: "Science and Agriculture",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "ufh-ba",
      name: "Bachelor of Arts",
      faculty: "Social Sciences and Humanities",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {},
    },
    {
      id: "ufh-bcom",
      name: "Bachelor of Commerce",
      faculty: "Management and Commerce",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
      },
    },
    {
      id: "ufh-llb",
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
