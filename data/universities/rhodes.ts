import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * Rhodes University class
 */
export class Rhodes extends BaseUniversity {
  readonly id = "ru"
  readonly name = "Rhodes University"
  readonly shortName = "Rhodes"
  readonly website = "https://www.ru.ac.za"
  readonly logo = "/logos/rhodes.png"
  readonly location = {
    city: "Makhanda (Grahamstown)",
    province: "Eastern Cape",
    coordinates: {
      latitude: -33.311,
      longitude: 26.5225,
    },
  }

  protected readonly _courses: Course[] = [
    {
      id: "ru-bsc",
      name: "Bachelor of Science",
      faculty: "Science",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 5,
      },
    },
    {
      id: "ru-ba",
      name: "Bachelor of Arts",
      faculty: "Humanities",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {},
    },
    {
      id: "ru-bjour",
      name: "Bachelor of Journalism",
      faculty: "Journalism and Media Studies",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
      },
    },
    {
      id: "ru-bcom",
      name: "Bachelor of Commerce",
      faculty: "Commerce",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 5,
      },
    },
  ]
}
