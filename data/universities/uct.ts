import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * University of Cape Town (UCT) class
 */
export class UCT extends BaseUniversity {
  readonly id = "uct"
  readonly name = "University of Cape Town"
  readonly shortName = "UCT"
  readonly website = "https://www.uct.ac.za"
  readonly logo = "/logos/uct.png"
  readonly location = {
    city: "Cape Town",
    province: "Western Cape",
    coordinates: {
      latitude: -33.9579,
      longitude: 18.4611,
    },
  }

  protected readonly _courses: Course[] = [
    {
      id: "uct-bsc-eng-mech",
      name: "BSc Engineering (Mechanical)",
      faculty: "Engineering & the Built Environment",
      apsMin: 42,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 6,
        "Physical Sciences": 6,
      },
    },
    {
      id: "uct-bcom",
      name: "Bachelor of Commerce",
      faculty: "Commerce",
      apsMin: 38,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 5,
      },
    },
    {
      id: "uct-ba",
      name: "Bachelor of Arts",
      faculty: "Humanities",
      apsMin: 36,
      duration: "3 years",
      subjectRequirements: {},
    },
    {
      id: "uct-bsc",
      name: "Bachelor of Science",
      faculty: "Science",
      apsMin: 38,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
  ]
}
