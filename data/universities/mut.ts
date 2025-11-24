import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * Mangosuthu University of Technology (MUT) class
 */
export class MUT extends BaseUniversity {
  readonly id = "mut"
  readonly name = "Mangosuthu University of Technology"
  readonly shortName = "MUT"
  readonly website = "https://www.mut.ac.za"
  readonly logo = "/logos/mut.png"
  readonly location = {
    city: "Durban",
    province: "KwaZulu-Natal",
    coordinates: {
      latitude: -29.9689,
      longitude: 30.9149,
    },
  }

  protected readonly _courses: Course[] = [
    // Faculty of Engineering
    {
      id: "mut-dip-chemical-engineering",
      name: "Diploma in Chemical Engineering",
      faculty: "Engineering",
      apsMin: 26, // Estimated APS based on requirements
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 4,
        "English FAL": 4,
      },
    },
    {
      id: "mut-dip-civil-engineering",
      name: "Diploma in Civil Engineering",
      faculty: "Engineering",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 4,
        "English FAL": 4,
      },
    },
    {
      id: "mut-dip-surveying",
      name: "Diploma in Surveying",
      faculty: "Engineering",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 4,
        "English FAL": 4,
      },
    },
    {
      id: "mut-dip-building",
      name: "Diploma in Building",
      faculty: "Engineering",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 4,
        "English FAL": 4,
      },
    },
    {
      id: "mut-dip-electrical-engineering",
      name: "Diploma in Electrical Engineering",
      faculty: "Engineering",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 4,
        "English FAL": 4,
      },
    },
    {
      id: "mut-dip-mechanical-engineering",
      name: "Diploma in Mechanical Engineering",
      faculty: "Engineering",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 4,
        "English FAL": 4,
        "Engineering Graphics & Design": 4,
      },
    },

    // Faculty of Management Sciences
    {
      id: "mut-dip-accounting",
      name: "Diploma in Accounting",
      faculty: "Management Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English Home": {
          alternatives: [
            { subject: "English Home", level: 4 },
            { subject: "English FAL", level: 5 },
          ],
        },
        Accounting: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 6 },
          ],
        },
      },
    },
    {
      id: "mut-dip-finance-accounting-public",
      name: "Diploma in Finance & Accounting: Public",
      faculty: "Management Sciences",
      apsMin: 25,
      duration: "4 years",
      subjectRequirements: {
        "English Home": {
          alternatives: [
            { subject: "English Home", level: 4 },
            { subject: "English FAL", level: 5 },
          ],
        },
        Accounting: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 6 },
          ],
        },
      },
    },
    {
      id: "mut-dip-human-resource-management",
      name: "Diploma in Human Resource Management",
      faculty: "Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "English Home": {
          alternatives: [
            { subject: "English Home", level: 3 },
            { subject: "English FAL", level: 4 },
          ],
        },
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
      },
    },
    {
      id: "mut-dip-marketing",
      name: "Diploma in Marketing",
      faculty: "Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "English Home": {
          alternatives: [
            { subject: "English Home", level: 4 },
            { subject: "English FAL", level: 5 },
          ],
        },
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
        Accounting: 3,
      },
    },
    {
      id: "mut-dip-office-management",
      name: "Diploma in Office Management & Technology",
      faculty: "Management Sciences",
      apsMin: 25, // Based on 25 points requirement
      duration: "3 years",
      subjectRequirements: {
        "English Home": {
          alternatives: [
            { subject: "English Home", level: 3 },
            { subject: "English FAL", level: 4 },
          ],
        },
      },
    },
    {
      id: "mut-dip-public-management",
      name: "Diploma in Public Management",
      faculty: "Management Sciences",
      apsMin: 25, // Based on 25 points requirement
      duration: "3 years",
      subjectRequirements: {
        "English FAL": 4,
      },
    },

    // Faculty of Natural Sciences
    {
      id: "mut-bsc-environmental-health",
      name: "BSc in Environmental Health",
      faculty: "Natural Sciences",
      apsMin: 28, // Estimated based on Bachelor pass requirement
      duration: "4 years",
      subjectRequirements: {
        "English Home": {
          alternatives: [
            { subject: "English Home", level: 4 },
            { subject: "English FAL", level: 4 },
          ],
        },
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 4 },
            { subject: "Life Sciences", level: 4 },
          ],
        },
      },
    },
    {
      id: "mut-bhsc-medical-laboratory-sciences",
      name: "Bachelor of Health Science - Medical Laboratory Sciences",
      faculty: "Natural Sciences",
      apsMin: 30, // Estimated based on multiple level 4 requirements
      duration: "4 years",
      subjectRequirements: {
        "English Home": 4,
        "Life Sciences": 4,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "mut-dip-agriculture",
      name: "Diploma in Agriculture",
      faculty: "Natural Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "Agricultural Science": {
          alternatives: [
            { subject: "Agricultural Science", level: 4 },
            { subject: "Life Sciences", level: 4 },
          ],
        },
        "English Home": {
          alternatives: [
            { subject: "English Home", level: 4 },
            { subject: "English FAL", level: 4 },
          ],
        },
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
        "Physical Sciences": 3,
      },
    },
    {
      id: "mut-dip-biomedical-science",
      name: "Diploma in Biomedical Science",
      faculty: "Natural Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English Home": {
          alternatives: [
            { subject: "English Home", level: 4 },
            { subject: "English FAL", level: 4 },
          ],
        },
        Mathematics: 4,
        "Life Sciences": {
          alternatives: [
            { subject: "Life Sciences", level: 4 },
            { subject: "Physical Sciences", level: 4 },
          ],
        },
      },
    },
    {
      id: "mut-dip-analytical-chemistry",
      name: "Diploma in Analytical Chemistry",
      faculty: "Natural Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English Home": {
          alternatives: [
            { subject: "English Home", level: 4 },
            { subject: "English FAL", level: 4 },
          ],
        },
        Mathematics: 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "mut-dip-community-extension",
      name: "Diploma in Community Extension",
      faculty: "Natural Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "Subject Group": {
          alternatives: [
            { subject: "Agricultural Science", level: 4 },
            { subject: "Consumer Studies", level: 4 },
            { subject: "Life Sciences", level: 4 },
            { subject: "Geography", level: 4 },
            { subject: "Economics", level: 4 },
          ],
        },
      },
    },
    {
      id: "mut-dip-nature-conservation",
      name: "Diploma in Nature Conservation",
      faculty: "Natural Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "English FAL": 4,
        "Agricultural Science": {
          alternatives: [
            { subject: "Agricultural Science", level: 4 },
            { subject: "Life Sciences", level: 4 },
          ],
        },
        Mathematics: 3,
      },
    },
    {
      id: "mut-dip-information-technology",
      name: "Diploma in Information Technology",
      faculty: "Natural Sciences",
      apsMin: 23, // Based on 23 points requirement
      duration: "3 years",
      subjectRequirements: {
        "English Home": {
          alternatives: [
            { subject: "English Home", level: 3 },
            { subject: "English FAL", level: 3 },
          ],
        },
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
      },
    },
  ]

  /**
   * MUT-specific APS calculation
   * Uses standard South African APS system
   * - Best 6 subjects excluding Life Orientation
   * - Standard 7-point NSC scale
   */
  calculateApsScore(subjects: Record<string, number>): number {
    const subjectScores: number[] = []
    
    for (const [subjectName, percentage] of Object.entries(subjects)) {
      if (subjectName.toLowerCase().includes('life orientation')) {
        continue
      }
      
      let points = 0
      if (percentage >= 80) points = 7
      else if (percentage >= 70) points = 6
      else if (percentage >= 60) points = 5
      else if (percentage >= 50) points = 4
      else if (percentage >= 40) points = 3
      else if (percentage >= 30) points = 2
      else if (percentage >= 0) points = 1
      
      subjectScores.push(points)
    }
    
    subjectScores.sort((a, b) => b - a)
    const top6 = subjectScores.slice(0, 6)
    
    return top6.reduce((sum, score) => sum + score, 0)
  }
}