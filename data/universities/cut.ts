import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * Central University of Technology (CUT) class
 */
export class CUT extends BaseUniversity {
  readonly id = "cut"
  readonly name = "Central University of Technology"
  readonly shortName = "CUT"
  readonly website = "https://www.cut.ac.za"
  readonly logo = "/logos/cut.png"
  readonly location = {
    city: "Bloemfontein",
    province: "Free State",
    coordinates: {
      latitude: -29.1188,
      longitude: 26.2147,
    },
  }

  protected readonly _courses: Course[] = [
    {
      id: "cut-dip-it",
      name: "Diploma in Information Technology",
      faculty: "Engineering and Information Technology",
      apsMin: 27,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
      },
    },
    {
      id: "cut-dip-marketing",
      name: "Diploma in Marketing",
      faculty: "Management Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {},
    },
    {
      id: "cut-btech-civil",
      name: "BTech Civil Engineering",
      faculty: "Engineering and Information Technology",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "cut-dip-hospitality",
      name: "Diploma in Hospitality Management",
      faculty: "Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {},
    },
  ]
}
