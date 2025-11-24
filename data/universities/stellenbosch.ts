import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * Stellenbosch University (SU) class
 */
export class Stellenbosch extends BaseUniversity {
  readonly id = "su"
  readonly name = "Stellenbosch University"
  readonly shortName = "SU"
  readonly website = "https://www.sun.ac.za"
  readonly logo = "/logos/stellenbosch.png"
  readonly location = {
    city: "Stellenbosch",
    province: "Western Cape",
    coordinates: {
      latitude: -33.9328,
      longitude: 18.8644,
    },
  }

  protected readonly _courses: Course[] = [
    // Faculty of AgriSciences
    {
      id: "su-bagric-agribusiness",
      name: "BAgric in Agribusiness Management",
      faculty: "AgriSciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 3,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-bscagric-agricultural-economics",
      name: "BScAgric in Agricultural Economics",
      faculty: "AgriSciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 3,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-bscfor",
      name: "BSc in Forestry (Forestry and Wood Sciences)",
      faculty: "AgriSciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 3,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-bscagric-plant-soil",
      name: "BScAgric in Plant and Soil Science",
      faculty: "AgriSciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 3,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-bscagric-viticulture",
      name: "BScAgric in Viticulture and Oenology",
      faculty: "AgriSciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 3,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-bscagric-animal",
      name: "BScAgric in Animal Production Systems",
      faculty: "AgriSciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 3,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-bsc-conservation",
      name: "BSc in Conservation Ecology",
      faculty: "AgriSciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 3,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-bsc-food-science",
      name: "BSc in Food Science",
      faculty: "AgriSciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 3,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },

    // Faculty of Arts and Social Sciences
    {
      id: "su-ba-humanities",
      name: "BA in Humanities",
      faculty: "Arts and Social Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-ba-language-culture",
      name: "BA in Language and Culture",
      faculty: "Arts and Social Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-ba-development-environment",
      name: "BA in Development and the Environment",
      faculty: "Arts and Social Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-ba-music",
      name: "BA in Music",
      faculty: "Arts and Social Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-ba-drama",
      name: "BA in Drama and Theatre Studies",
      faculty: "Arts and Social Sciences",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        alternatives: [
          {
            English: 4,
          },
          {
            Afrikaans: 4,
          },
        ],
      },
    },
    {
      id: "su-ba-hr",
      name: "BA in Human Resource Management",
      faculty: "Arts and Social Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        alternatives: [
          {
            Mathematics: 3,
            English: 3,
          },
          {
            "Mathematical Literacy": 5,
            English: 3,
          },
          {
            Mathematics: 3,
            Afrikaans: 3,
          },
          {
            "Mathematical Literacy": 5,
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-ba-international",
      name: "BA in International Studies",
      faculty: "Arts and Social Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-bmus",
      name: "Bachelor of Music (BMus)",
      faculty: "Arts and Social Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-ba-ppe",
      name: "BA in Political, Philosophical and Economic Studies (PPE)",
      faculty: "Arts and Social Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-bsw",
      name: "Bachelor of Social Work",
      faculty: "Arts and Social Sciences",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-ba-visual-arts",
      name: "BA in Visual Arts",
      faculty: "Arts and Social Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },

    // Faculty of Economic and Management Sciences
    {
      id: "su-bcom-economic-sciences",
      name: "BCom (Economic Sciences)",
      faculty: "Economic and Management Sciences",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-bcom-management-sciences",
      name: "BCom (Management Sciences)",
      faculty: "Economic and Management Sciences",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-bcom-mathematical-sciences",
      name: "BCom (Mathematical Sciences)",
      faculty: "Economic and Management Sciences",
      apsMin: 35,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 5,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-bcom-international-business",
      name: "BCom (International Business)",
      faculty: "Economic and Management Sciences",
      apsMin: 40,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 5,
        English: 5,
      },
    },
    {
      id: "su-bcom-actuarial-science",
      name: "BCom (Actuarial Science)",
      faculty: "Economic and Management Sciences",
      apsMin: 40,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 6,
        alternatives: [
          {
            English: 4,
          },
          {
            Afrikaans: 4,
          },
        ],
      },
    },
    {
      id: "su-bcom-industrial-psychology",
      name: "BCom (Industrial Psychology)",
      faculty: "Economic and Management Sciences",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-bacc",
      name: "BAcc",
      faculty: "Economic and Management Sciences",
      apsMin: 35,
      duration: "3 years",
      subjectRequirements: {
        alternatives: [
          {
            Mathematics: 5,
          },
          {
            Mathematics: 4,
            Accounting: 5,
          },
        ],
      },
    },
    {
      id: "su-bcom-management-accounting",
      name: "BCom (Management Accounting)",
      faculty: "Economic and Management Sciences",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-bcom-financial-accounting",
      name: "BCom (Financial Accounting)",
      faculty: "Economic and Management Sciences",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },

    // Faculty of Education
    {
      id: "su-bed-foundation",
      name: "BEd (Foundation Phase Education)",
      faculty: "Education",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        alternatives: [
          {
            Mathematics: 3,
            English: 4,
          },
          {
            "Mathematical Literacy": 4,
            English: 4,
          },
          {
            Mathematics: 3,
            Afrikaans: 4,
          },
          {
            "Mathematical Literacy": 4,
            Afrikaans: 4,
          },
        ],
      },
    },
    {
      id: "su-bed-intermediate",
      name: "BEd (Intermediate Phase Education)",
      faculty: "Education",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        alternatives: [
          {
            Mathematics: 3,
            English: 4,
          },
          {
            "Mathematical Literacy": 4,
            English: 4,
          },
          {
            Mathematics: 3,
            Afrikaans: 4,
          },
          {
            "Mathematical Literacy": 4,
            Afrikaans: 4,
          },
        ],
      },
    },

    // Faculty of Engineering
    {
      id: "su-beng-chemical",
      name: "BEng (Chemical)",
      faculty: "Engineering",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 4,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-beng-civil",
      name: "BEng (Civil)",
      faculty: "Engineering",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 4,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-beng-electrical-electronic",
      name: "BEng (Electrical and Electronic)",
      faculty: "Engineering",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 4,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-beng-industrial",
      name: "BEng (Industrial)",
      faculty: "Engineering",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 4,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-beng-mechanical",
      name: "BEng (Mechanical)",
      faculty: "Engineering",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 4,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-beng-mechatronic",
      name: "BEng (Mechatronic)",
      faculty: "Engineering",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 4,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },

    // Faculty of Law
    {
      id: "su-llb",
      name: "LLB (4-year)",
      faculty: "Law",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        alternatives: [
          {
            English: 4,
          },
          {
            Afrikaans: 4,
          },
        ],
      },
    },
    {
      id: "su-ba-law",
      name: "BA (Law)",
      faculty: "Law",
      apsMin: 35,
      duration: "3 years",
      subjectRequirements: {
        alternatives: [
          {
            English: 4,
          },
          {
            Afrikaans: 4,
          },
        ],
      },
    },
    {
      id: "su-bcom-law",
      name: "BCom (Law)",
      faculty: "Law",
      apsMin: 35,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
        alternatives: [
          {
            English: 4,
          },
          {
            Afrikaans: 4,
          },
        ],
      },
    },
    {
      id: "su-baccllb",
      name: "BAccLLB",
      faculty: "Law",
      apsMin: 40,
      duration: "5 years",
      subjectRequirements: {
        alternatives: [
          {
            Mathematics: 5,
          },
          {
            Mathematics: 4,
            Accounting: 5,
          },
        ],
      },
    },

    // Faculty of Medicine and Health Sciences
    {
      id: "su-mbchb",
      name: "MBChB",
      faculty: "Medicine and Health Sciences",
      apsMin: 38,
      duration: "6 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 3,
        "Life Sciences": 3,
      },
    },
    {
      id: "su-bnursing",
      name: "Bachelor of Nursing",
      faculty: "Medicine and Health Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "Life Sciences": 3,
        alternatives: [
          {
            Mathematics: 3,
          },
          {
            "Mathematical Literacy": 5,
          },
        ],
      },
    },
    {
      id: "su-bsc-dietetics",
      name: "BSc in Dietetics",
      faculty: "Medicine and Health Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 3,
        "Physical Sciences": 3,
        "Life Sciences": 3,
      },
    },
    {
      id: "su-boccupational-therapy",
      name: "Bachelor of Occupational Therapy",
      faculty: "Medicine and Health Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 3,
        "Life Sciences": 3,
      },
    },
    {
      id: "su-bsc-physiotherapy",
      name: "BSc in Physiotherapy",
      faculty: "Medicine and Health Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 3,
      },
    },
    {
      id: "su-bspeech-language",
      name: "Bachelor of Speech-Language and Hearing Therapy",
      faculty: "Medicine and Health Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        alternatives: [
          {
            "Physical Sciences": 3,
          },
          {
            "Life Sciences": 3,
          },
        ],
      },
    },

    // Faculty of Science
    {
      id: "su-bsc-biodiversity",
      name: "BSc Biodiversity and Ecology",
      faculty: "Science",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 3,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-bsc-human-life",
      name: "BSc Human Life Sciences",
      faculty: "Science",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 3,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-bsc-molecular-biology",
      name: "BSc Molecular Biology and Biotechnology",
      faculty: "Science",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 3,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-bsc-sport-science",
      name: "BSc Sport Science",
      faculty: "Science",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 3,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-bsc-chemistry",
      name: "BSc Chemistry",
      faculty: "Science",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 3,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-bsc-earth-science",
      name: "BSc Earth Science",
      faculty: "Science",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 3,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-bsc-geoinformatics",
      name: "BSc GeoInformatics",
      faculty: "Science",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 3,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-bsc-physics",
      name: "BSc Physics",
      faculty: "Science",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 3,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-bsc-mathematical-sciences",
      name: "BSc Mathematical Sciences",
      faculty: "Science",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 5,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-bsc-computer-science",
      name: "BSc Computer Science",
      faculty: "Science",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 5,
        alternatives: [
          {
            English: 3,
          },
          {
            Afrikaans: 3,
          },
        ],
      },
    },
    {
      id: "su-bdatsci",
      name: "Bachelor of Data Science (BDatSci)",
      faculty: "Science",
      apsMin: 40,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 6,
        alternatives: [
          {
            English: 4,
          },
          {
            Afrikaans: 4,
          },
        ],
      },
    },

    // Faculty of Theology
    {
      id: "su-bth",
      name: "BTh (Bachelor of Theology)",
      faculty: "Theology",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {},
    },
    {
      id: "su-bdiv",
      name: "BDiv (Bachelor of Divinity)",
      faculty: "Theology",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {},
    },
  ]

  /**
   * Stellenbosch-specific APS calculation
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
