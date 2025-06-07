import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * North-West University (NWU) class
 */
export class NWU extends BaseUniversity {
  readonly id = "nwu"
  readonly name = "North-West University"
  readonly shortName = "NWU"
  readonly website = "https://www.nwu.ac.za"
  readonly logo = "/logos/nwu.png"
  readonly location = {
    city: "Potchefstroom",
    province: "North West",
    coordinates: {
      latitude: -26.6819,
      longitude: 27.0949,
    },
  }

  protected readonly _courses: Course[] = [
    {
      id: "nwu-bsc",
      name: "BSc (Physical & Chemical Sciences)",
      faculty: "Natural & Agricultural Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "nwu-bed",
      name: "Bachelor of Education",
      faculty: "Education",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {},
    },
    {
      id: "nwu-bcom",
      name: "BCom (Economics)",
      faculty: "Economic and Management Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
      },
    },
    {
      id: "nwu-llb",
      name: "Bachelor of Laws",
      faculty: "Law",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 4,
      },
    },
  ]
}
