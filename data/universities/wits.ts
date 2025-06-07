import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * University of the Witwatersrand (Wits) class
 */
export class Wits extends BaseUniversity {
  readonly id = "wits"
  readonly name = "University of the Witwatersrand"
  readonly shortName = "Wits"
  readonly website = "https://www.wits.ac.za"
  readonly logo = "/logos/wits.png"
  readonly location = {
    city: "Johannesburg",
    province: "Gauteng",
    coordinates: {
      latitude: -26.1929,
      longitude: 28.0305,
    },
  }

  /**
   * Wits APS Calculation:
   * - English and Mathematics get +2 bonus points
   * - Life Orientation gets max 4 points (50-59% = 1, 60-69% = 2, 70-79% = 3, 80-100% = 4)
   * - Other subjects: 80-100% = 8, 70-79% = 7, 60-69% = 6, 50-59% = 5, 40-49% = 4, 30-39% = 3, 0-29% = 0
   */
  protected readonly _courses: Course[] = [
    // Faculty of Commerce, Law and Management
    {
      id: "wits-bcom-general",
      name: "Bachelor of Commerce (General)",
      faculty: "Commerce, Law and Management",
      apsMin: 38,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
      },
    },
    {
      id: "wits-bcom-accounting",
      name: "Bachelor of Commerce (in the field of Accounting)",
      faculty: "Commerce, Law and Management",
      apsMin: 38,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
      },
    },
    {
      id: "wits-baccsc",
      name: "Bachelor of Accounting Science",
      faculty: "Commerce, Law and Management",
      apsMin: 44,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 6,
      },
    },
    {
      id: "wits-bcom-law",
      name: "Bachelor of Commerce (in the field of Law)",
      faculty: "Commerce, Law and Management",
      apsMin: 43,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
      },
    },
    {
      id: "wits-beconsc",
      name: "Bachelor of Economic Science",
      faculty: "Commerce, Law and Management",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 7,
      },
    },
    {
      id: "wits-llb-4year",
      name: "Bachelor of Laws (Four-year stream)",
      faculty: "Commerce, Law and Management",
      apsMin: 46,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 6,
        "English First Additional": 6,
        Mathematics: 4,
        "Mathematical Literacy": 6,
      },
    },

    // Faculty of Engineering and the Built Environment
    {
      id: "wits-bsc-eng-chemical",
      name: "Bachelor of Science in Engineering in Chemical Engineering",
      faculty: "Engineering and the Built Environment",
      apsMin: 42,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "wits-bsc-eng-civil",
      name: "Bachelor of Science in Engineering in Civil Engineering",
      faculty: "Engineering and the Built Environment",
      apsMin: 42,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "wits-bsc-eng-electrical",
      name: "Bachelor of Science in Engineering in Electrical Engineering",
      faculty: "Engineering and the Built Environment",
      apsMin: 42,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "wits-bsc-eng-mechanical",
      name: "Bachelor of Science in Engineering in Mechanical Engineering",
      faculty: "Engineering and the Built Environment",
      apsMin: 42,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "wits-bas",
      name: "Bachelor of Architectural Studies",
      faculty: "Engineering and the Built Environment",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
      },
    },

    // Faculty of Health Sciences
    {
      id: "wits-mbbch",
      name: "Bachelor of Medicine and Bachelor of Surgery",
      faculty: "Health Sciences",
      apsMin: 0, // Special selection process with composite index
      duration: "6 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
        "Life Sciences": {
          alternatives: [
            { subject: "Life Sciences", level: 5 },
            { subject: "Physical Sciences", level: 5 },
          ],
        },
      },
    },
    {
      id: "wits-bpharm",
      name: "Bachelor of Pharmacy",
      faculty: "Health Sciences",
      apsMin: 0, // Special selection process with composite index
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
        "Life Sciences": {
          alternatives: [
            { subject: "Life Sciences", level: 5 },
            { subject: "Physical Sciences", level: 5 },
          ],
        },
      },
    },
    {
      id: "wits-bsc-physiotherapy",
      name: "Bachelor of Science in Physiotherapy",
      faculty: "Health Sciences",
      apsMin: 0, // Special selection process with composite index
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
        "Life Sciences": {
          alternatives: [
            { subject: "Life Sciences", level: 5 },
            { subject: "Physical Sciences", level: 5 },
          ],
        },
      },
    },

    // Faculty of Humanities
    {
      id: "wits-ba-general",
      name: "Bachelor of Arts (General)",
      faculty: "Humanities",
      apsMin: 36,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
      },
    },
    {
      id: "wits-ba-law",
      name: "Bachelor of Arts (Law)",
      faculty: "Humanities",
      apsMin: 43,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 3,
        "Mathematical Literacy": 4,
      },
    },
    {
      id: "wits-ba-fine-arts",
      name: "Bachelor of Arts in Fine Arts",
      faculty: "Humanities",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
      },
    },
    {
      id: "wits-bed-foundation",
      name: "Bachelor of Education: Foundation Phase Teaching",
      faculty: "Humanities",
      apsMin: 37,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 4,
        "Mathematical Literacy": 5,
        "Technical Mathematics": 5,
      },
    },

    // Faculty of Science
    {
      id: "wits-bsc-general",
      name: "Bachelor of Science (General)",
      faculty: "Science",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
      },
    },
    {
      id: "wits-bsc-biological",
      name: "Bachelor of Science in the field of Biological Sciences",
      faculty: "Science",
      apsMin: 43,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
      },
    },
    {
      id: "wits-bsc-actuarial",
      name: "Bachelor of Science in the field of Actuarial Science",
      faculty: "Science",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 7,
        "English First Additional": 7,
        Mathematics: 7,
        "Physical Sciences": 7,
      },
    },
    {
      id: "wits-bsc-computer-science",
      name: "Bachelor of Science in the field of Computer Science",
      faculty: "Science",
      apsMin: 44,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 6,
      },
    },
    {
      id: "wits-bsc-physics",
      name: "Bachelor of Science in the field of Physical Sciences (Physics)",
      faculty: "Science",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 6,
        "Physical Sciences": 5,
      },
    },
    {
      id: "wits-bsc-chemistry",
      name: "Bachelor of Science in the field of Physical Sciences (Chemistry)",
      faculty: "Science",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 6,
        "Physical Sciences": 5,
      },
    },
  ]
}
