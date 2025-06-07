import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * University of the Western Cape (UWC) class
 */
export class UWC extends BaseUniversity {
  readonly id = "uwc"
  readonly name = "University of the Western Cape"
  readonly shortName = "UWC"
  readonly website = "https://www.uwc.ac.za"
  readonly logo = "/logos/uwc.png"
  readonly location = {
    city: "Cape Town",
    province: "Western Cape",
    coordinates: {
      latitude: -33.9333,
      longitude: 18.6333,
    },
  }

  protected readonly _courses: Course[] = [
    {
      id: "uwc-bsc",
      name: "Bachelor of Science",
      faculty: "Natural Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 4,
      },
    },
    {
      id: "uwc-ba",
      name: "Bachelor of Arts",
      faculty: "Arts",
      apsMin: 27,
      duration: "3 years",
      subjectRequirements: {},
    },
    {
      id: "uwc-bcom",
      name: "Bachelor of Commerce",
      faculty: "Economic and Management Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
      },
    },
    {
      id: "uwc-llb",
      name: "Bachelor of Laws",
      faculty: "Law",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
      },
    },
  ]
}
