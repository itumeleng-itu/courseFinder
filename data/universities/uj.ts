import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * University of Johannesburg (UJ) class
 */
export class UJ extends BaseUniversity {
  readonly id = "uj"
  readonly name = "University of Johannesburg"
  readonly shortName = "UJ"
  readonly website = "https://www.uj.ac.za"
  readonly logo = "/logos/uj.png"
  readonly location = {
    city: "Johannesburg",
    province: "Gauteng",
    coordinates: {
      latitude: -26.1829,
      longitude: 27.9992,
    },
  }

  protected readonly _courses: Course[] = [
    // Faculty of Art, Design and Architecture
    {
      id: "uj-b-architecture",
      name: "Bachelor of Architecture",
      faculty: "Art, Design and Architecture",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
      },
    },
    {
      id: "uj-ba-communication-design",
      name: "BA (Communication Design)",
      faculty: "Art, Design and Architecture",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
    },
    {
      id: "uj-ba-digital-media-design",
      name: "BA (Digital Media Design)",
      faculty: "Art, Design and Architecture",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
    },
    {
      id: "uj-ba-industrial-design",
      name: "BA (Industrial Design)",
      faculty: "Art, Design and Architecture",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Mathematical Literacy", level: 6 },
          ],
        },
      },
    },
    {
      id: "uj-ba-interior-design",
      name: "BA (Interior Design)",
      faculty: "Art, Design and Architecture",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Mathematical Literacy", level: 6 },
          ],
        },
      },
    },
    {
      id: "uj-ba-fashion-design",
      name: "BA (Fashion Design)",
      faculty: "Art, Design and Architecture",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Mathematical Literacy", level: 6 },
          ],
        },
      },
    },
    {
      id: "uj-ba-visual-art",
      name: "BA (Visual Art)",
      faculty: "Art, Design and Architecture",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 4 },
            { subject: "Technical Mathematics", level: 3 },
          ],
        },
      },
    },

    // College of Business and Economics
    {
      id: "uj-b-accounting-ca",
      name: "Bachelor of Accounting (CA)",
      faculty: "Business and Economics",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 5,
      },
    },
    {
      id: "uj-b-hospitality-management",
      name: "Bachelor of Hospitality Management",
      faculty: "Business and Economics",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Technical Mathematics", level: 4 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
    },
    {
      id: "uj-b-human-resource-management",
      name: "Bachelor of Human Resource Management",
      faculty: "Business and Economics",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Technical Mathematics", level: 4 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
    },
    {
      id: "uj-b-tourism-development-management",
      name: "Bachelor of Tourism Development and Management",
      faculty: "Business and Economics",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Technical Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
      },
    },
    {
      id: "uj-bcom-accounting",
      name: "BCom (Accounting)",
      faculty: "Business and Economics",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
      },
    },
    {
      id: "uj-bcom-economics-econometrics",
      name: "BCom (Economics and Econometrics)",
      faculty: "Business and Economics",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
      },
    },
    {
      id: "uj-bcom-finance",
      name: "BCom (Finance)",
      faculty: "Business and Economics",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
      },
    },
    {
      id: "uj-bcom-information-systems",
      name: "BCom (Information Systems)",
      faculty: "Business and Economics",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Technical Mathematics", level: 4 },
          ],
        },
      },
    },

    // Faculty of Education
    {
      id: "uj-bed-foundation-phase",
      name: "BEd (Foundation Phase Teaching)",
      faculty: "Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        English: {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 6 },
          ],
        },
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 5 },
            { subject: "Technical Mathematics", level: 3 },
          ],
        },
      },
    },
    {
      id: "uj-bed-intermediate-phase",
      name: "BEd (Intermediate Phase Teaching)",
      faculty: "Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        English: {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 6 },
          ],
        },
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 5 },
            { subject: "Technical Mathematics", level: 3 },
          ],
        },
      },
    },

    // Faculty of Engineering and the Built Environment
    {
      id: "uj-beng-civil",
      name: "BEng (Civil Engineering)",
      faculty: "Engineering and the Built Environment",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "uj-beng-electrical-electronic",
      name: "BEng (Electrical and Electronic Engineering)",
      faculty: "Engineering and the Built Environment",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "uj-beng-mechanical",
      name: "BEng (Mechanical Engineering)",
      faculty: "Engineering and the Built Environment",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "uj-bengtech-chemical",
      name: "BEngTech (Chemical Engineering)",
      faculty: "Engineering and the Built Environment",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "uj-bengtech-civil",
      name: "BEngTech (Civil Engineering)",
      faculty: "Engineering and the Built Environment",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 5,
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 5 },
            { subject: "Technical Science", level: 5 },
          ],
        },
      },
    },

    // Faculty of Health Sciences
    {
      id: "uj-b-nursing",
      name: "Bachelor of Nursing",
      faculty: "Health Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
    },
    {
      id: "uj-b-optometry",
      name: "Bachelor of Optometry",
      faculty: "Health Sciences",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
        "Life Sciences": 5,
      },
    },
    {
      id: "uj-b-environmental-health",
      name: "Bachelor of Environmental Health",
      faculty: "Health Sciences",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
    },

    // Faculty of Humanities
    {
      id: "uj-ba-general",
      name: "Bachelor of Arts",
      faculty: "Humanities",
      apsMin: 27,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
      },
    },
    {
      id: "uj-ba-language-practice",
      name: "BA (Language Practice)",
      faculty: "Humanities",
      apsMin: 27,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
      },
    },
    {
      id: "uj-ba-politics-economics-technology",
      name: "BA (Politics, Economics and Technology)",
      faculty: "Humanities",
      apsMin: 27,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 4,
      },
    },
    {
      id: "uj-b-social-work",
      name: "Bachelor of Social Work",
      faculty: "Humanities",
      apsMin: 31,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
      },
    },

    // Faculty of Law
    {
      id: "uj-ba-law",
      name: "BA (Law)",
      faculty: "Law",
      apsMin: 31,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        "Additional Language": 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
      },
    },
    {
      id: "uj-bcom-law",
      name: "BCom (Law)",
      faculty: "Law",
      apsMin: 31,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        "Additional Language": 4,
        Mathematics: 4,
      },
    },
    {
      id: "uj-llb",
      name: "LLB",
      faculty: "Law",
      apsMin: 31,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
        "Additional Language": 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
      },
    },

    // Faculty of Science
    {
      id: "uj-bsc-it",
      name: "BSc (Information Technology)",
      faculty: "Science",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 6,
      },
    },
    {
      id: "uj-bsc-computer-science",
      name: "BSc (Computer Science and Informatics)",
      faculty: "Science",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 6,
      },
    },
    {
      id: "uj-bsc-actuarial-science",
      name: "BSc (Actuarial Science)",
      faculty: "Science",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 7,
      },
    },
    {
      id: "uj-bsc-biochemistry-botany",
      name: "BSc (Biochemistry and Botany)",
      faculty: "Science",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Mathematics", level: 6 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 4 },
            { subject: "Physical Sciences", level: 5 },
          ],
        },
        "Life Sciences": 4,
      },
    },
  ]

  /**
   * UJ-specific APS calculation
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
