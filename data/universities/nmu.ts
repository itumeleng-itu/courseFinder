import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * Nelson Mandela University (NMU) class
 */
export class NMU extends BaseUniversity {
  readonly id = "nmu"
  readonly name = "Nelson Mandela University"
  readonly shortName = "NMU"
  readonly website = "https://www.mandela.ac.za"
  readonly logo = "/logos/nmu.png"
  readonly location = {
    city: "Port Elizabeth",
    province: "Eastern Cape",
    coordinates: {
      latitude: -34.0007,
      longitude: 25.6735,
    },
  }

  protected readonly _courses: Course[] = [
    {
      id: "nmu-bsc",
      name: "Bachelor of Science",
      faculty: "Science",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 4,
      },
    },
    {
      id: "nmu-ba",
      name: "Bachelor of Arts",
      faculty: "Arts",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {},
    },
    {
      id: "nmu-bcom",
      name: "Bachelor of Commerce",
      faculty: "Business and Economic Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
      },
    },
    {
      id: "nmu-llb",
      name: "Bachelor of Laws",
      faculty: "Law",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
      },
    },
  ]
}
