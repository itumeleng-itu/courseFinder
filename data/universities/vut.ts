import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * Vaal University of Technology (VUT) class
 */
export class VUT extends BaseUniversity {
  readonly id = "vut"
  readonly name = "Vaal University of Technology"
  readonly shortName = "VUT"
  readonly website = "https://www.vut.ac.za"
  readonly logo = "/logos/vut.png"
  readonly location = {
    city: "Vanderbijlpark",
    province: "Gauteng",
    coordinates: {
      latitude: -26.7091,
      longitude: 27.8543,
    },
  }

  protected readonly _courses: Course[] = [
    {
      id: "vut-dip-it",
      name: "Diploma in Information Technology",
      faculty: "Applied and Computer Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
      },
    },
    {
      id: "vut-dip-management",
      name: "Diploma in Management Sciences",
      faculty: "Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {},
    },
    {
      id: "vut-btech-civil",
      name: "BTech Civil Engineering",
      faculty: "Engineering and Technology",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "vut-dip-hospitality",
      name: "Diploma in Hospitality Management",
      faculty: "Human Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {},
    },
  ]
}
