import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * University of the Free State (UFS) class
 */
export class UFS extends BaseUniversity {
  readonly id = "ufs"
  readonly name = "University of the Free State"
  readonly shortName = "UFS"
  readonly website = "https://www.ufs.ac.za"
  readonly logo = "/logos/ufs.png"
  readonly location = {
    city: "Bloemfontein",
    province: "Free State",
    coordinates: {
      latitude: -29.1076,
      longitude: 26.1857,
    },
  }

  protected readonly _courses: Course[] = [
    {
      id: "ufs-mbchb",
      name: "Bachelor of Medicine and Bachelor of Surgery (MBChB)",
      faculty: "Health Sciences",
      apsMin: 36,
      duration: "5 years",
      subjectRequirements: {
        Mathematics: 5,
        "Life Sciences": 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "ufs-bcom",
      name: "BCom (General)",
      faculty: "Economic & Management Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
      },
    },
    {
      id: "ufs-llb",
      name: "Bachelor of Laws",
      faculty: "Law",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {},
    },
    {
      id: "ufs-bsc-agric",
      name: "BSc Agriculture",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 5,
        "Life Sciences": 5,
      },
    },
  ]
}
