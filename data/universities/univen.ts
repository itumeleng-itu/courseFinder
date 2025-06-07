import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * University of Venda (UNIVEN) class
 */
export class UNIVEN extends BaseUniversity {
  readonly id = "univen"
  readonly name = "University of Venda"
  readonly shortName = "UNIVEN"
  readonly website = "https://www.univen.ac.za"
  readonly logo = "/logos/univen.png"
  readonly location = {
    city: "Thohoyandou",
    province: "Limpopo",
    coordinates: {
      latitude: -22.9761,
      longitude: 30.4465,
    },
  }

  protected readonly _courses: Course[] = [
    // Faculty of Humanities, Social Sciences and Education
    {
      id: "univen-ba-media-studies",
      name: "Bachelor of Arts in Media Studies",
      faculty: "Humanities, Social Sciences and Education",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
      },
    },
    {
      id: "univen-ba-development-studies",
      name: "Bachelor of Arts in Development Studies",
      faculty: "Humanities, Social Sciences and Education",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        History: 4,
        Economics: 4,
      },
    },
    {
      id: "univen-ba",
      name: "Bachelor of Arts",
      faculty: "Humanities, Social Sciences and Education",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
      },
    },
    {
      id: "univen-bsw",
      name: "Bachelor of Social Work",
      faculty: "Humanities, Social Sciences and Education",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
      },
    },
    {
      id: "univen-bed-senior-phase",
      name: "Bachelor of Education in Senior Phase and Further Education and Training",
      faculty: "Humanities, Social Sciences and Education",
      apsMin: 36,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
    },
    {
      id: "univen-bed-foundation-phase",
      name: "Bachelor of Education in Foundation Phase Teaching",
      faculty: "Humanities, Social Sciences and Education",
      apsMin: 36,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        "Mathematics Literacy": 4,
        Mathematics: 3,
      },
    },

    // Faculty of Health Sciences
    {
      id: "univen-bn",
      name: "Bachelor of Nursing",
      faculty: "Health Sciences",
      apsMin: 36,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
        "Life Sciences": 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "univen-bsc-nutrition",
      name: "BSc in Nutrition",
      faculty: "Health Sciences",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
        "Life Sciences": 4,
        "Physical Sciences": 4,
        "Agricultural Sciences": 4,
      },
    },
    {
      id: "univen-bsc-sports",
      name: "BSc in Sports and Exercise Science",
      faculty: "Health Sciences",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        "Life Sciences": 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "univen-bp",
      name: "Bachelor of Psychology",
      faculty: "Health Sciences",
      apsMin: 36,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
      },
    },

    // Faculty of Management, Commerce and Law
    {
      id: "univen-badmin",
      name: "Bachelor of Administration",
      faculty: "Management, Commerce and Law",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
      },
    },
    {
      id: "univen-bcom-accounting-sciences",
      name: "Bachelor of Commerce in Accounting Sciences",
      faculty: "Management, Commerce and Law",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 5,
        Accounting: 5,
      },
    },
    {
      id: "univen-bcom-accounting",
      name: "Bachelor of Commerce in Accounting",
      faculty: "Management, Commerce and Law",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
        Accounting: 4,
      },
    },
    {
      id: "univen-llb",
      name: "Bachelor of Laws (LLB)",
      faculty: "Management, Commerce and Law",
      apsMin: 38,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
      },
    },

    // Faculty of Science, Engineering and Agriculture
    {
      id: "univen-bsc-biochemistry-microbiology",
      name: "BSc in Biochemistry and Microbiology",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
    },
    {
      id: "univen-bsc-computer-science",
      name: "BSc in Computer Science",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
    },
    {
      id: "univen-bsc-agriculture-economics",
      name: "Bachelor of Science in Agriculture (Agricultural Economics)",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
        "Agricultural Sciences": 4,
      },
    },
    {
      id: "univen-bes",
      name: "Bachelor of Environmental Sciences",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
        Geography: 4,
        "Agricultural Sciences": 4,
      },
    },
    {
      id: "univen-bes-mining-geology",
      name: "Bachelor of Earth Sciences in Mining and Environmental Geology",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
  ]
}
