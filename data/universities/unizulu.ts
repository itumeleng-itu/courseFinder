import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * University of Zululand (UniZulu) class
 */
export class UniZulu extends BaseUniversity {
  readonly id = "unizulu"
  readonly name = "University of Zululand"
  readonly shortName = "UniZulu"
  readonly website = "https://www.unizulu.ac.za"
  readonly logo = "/logos/unizulu.png"
  readonly location = {
    city: "KwaDlangezwa",
    province: "KwaZulu-Natal",
    coordinates: {
      latitude: -28.8558,
      longitude: 31.8476,
    },
  }

  protected readonly _courses: Course[] = [
    {
      id: "unizulu-bsc",
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
      id: "unizulu-ba",
      name: "Bachelor of Arts",
      faculty: "Arts",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {},
    },
    {
      id: "unizulu-bcom",
      name: "Bachelor of Commerce",
      faculty: "Commerce, Administration and Law",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
      },
    },
    {
      id: "unizulu-bed",
      name: "Bachelor of Education",
      faculty: "Education",
      apsMin: 25,
      duration: "4 years",
      subjectRequirements: {},
    },
  ]
}
