import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * University of Limpopo (UL) class
 */
export class UL extends BaseUniversity {
  readonly id = "ul"
  readonly name = "University of Limpopo"
  readonly shortName = "UL"
  readonly website = "https://www.ul.ac.za"
  readonly logo = "/logos/ul.png"
  readonly location = {
    city: "Polokwane",
    province: "Limpopo",
    coordinates: {
      latitude: -23.8779,
      longitude: 29.7404,
    },
  }

  protected readonly _courses: Course[] = [
    // Faculty of Humanities - Education
    {
      id: "ul-bed-sp-fet-languages",
      name: "BEd (SP & FET Teaching) - Languages and Life Orientation",
      faculty: "Humanities - Education",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "Life Orientation": 3,
        English: 4,
        "First Language": 5,
      },
    },
    {
      id: "ul-bed-sp-fet-social-sciences",
      name: "BEd (SP & FET Teaching) - Languages and Social Sciences",
      faculty: "Humanities - Education",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "Life Orientation": 3,
        English: {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "English Home", level: 4 },
          ],
        },
        "Social Sciences": 4,
      },
    },
    {
      id: "ul-bed-sp-fet-economics",
      name: "BEd (SP & FET Teaching) - Economics and Management Studies",
      faculty: "Humanities - Education",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "Life Orientation": 3,
        English: 3,
        "Economics/Business Studies": 4,
      },
    },
    {
      id: "ul-bed-sp-fet-mathematics",
      name: "BEd (SP & FET Teaching) - Mathematics, Science & Technology",
      faculty: "Humanities - Education",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "Life Orientation": 3,
        English: 3,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "ul-bed-fp-teaching",
      name: "BEd (Foundation Phase Teaching)",
      faculty: "Humanities - Education",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "Life Orientation": 3,
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
      },
    },

    // Faculty of Humanities - Social Sciences
    {
      id: "ul-ba-criminology-psychology",
      name: "BA (Criminology and Psychology)",
      faculty: "Humanities - Social Sciences",
      apsMin: 23,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        "Additional Language": 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
    },
    {
      id: "ul-ba-cultural-studies",
      name: "BA (Cultural Studies)",
      faculty: "Humanities - Social Sciences",
      apsMin: 23,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        "Additional Language": 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
    },
    {
      id: "ul-ba-sociology-anthropology",
      name: "BA (Sociology and Anthropology)",
      faculty: "Humanities - Social Sciences",
      apsMin: 23,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        "Additional Language": 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
    },
    {
      id: "ul-ba-political-studies",
      name: "BA (Political Studies)",
      faculty: "Humanities - Social Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "ul-bpsych",
      name: "BPsych (Bachelor of Psychology)",
      faculty: "Humanities - Social Sciences",
      apsMin: 23,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        "Additional Language": 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
    },
    {
      id: "ul-bsw",
      name: "BSW (Bachelor of Social Work)",
      faculty: "Humanities - Social Sciences",
      apsMin: 23,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        "Additional Language": 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
    },

    // Faculty of Humanities - Language and Communication Studies
    {
      id: "ul-ba-languages",
      name: "BA (Languages stream)",
      faculty: "Humanities - Language and Communication Studies",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        "Another Language": 5,
      },
    },
    {
      id: "ul-ba-translation-linguistics",
      name: "BA (Translation and Linguistics)",
      faculty: "Humanities - Language and Communication Studies",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        "Another Language": 5,
      },
    },
    {
      id: "ul-ba-performing-arts",
      name: "BA (Performing Arts)",
      faculty: "Humanities - Language and Communication Studies",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        "Another Language": 5,
      },
    },
    {
      id: "ul-binfst",
      name: "BInfSt (Bachelor of Information Studies)",
      faculty: "Humanities - Language and Communication Studies",
      apsMin: 25,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        "Another Language": 5,
      },
    },
    {
      id: "ul-ba-contemporary-english",
      name: "BA (Contemporary English and Multilingual Studies)",
      faculty: "Humanities - Language and Communication Studies",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        "Another Language": 5,
      },
    },
    {
      id: "ul-ba-communication-studies",
      name: "BA (Communication Studies)",
      faculty: "Humanities - Language and Communication Studies",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        "Another Language": 5,
      },
    },
    {
      id: "ul-ba-media-studies",
      name: "BA (Media Studies)",
      faculty: "Humanities - Language and Communication Studies",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        "Another Language": 5,
      },
    },

    // Faculty of Science & Agriculture - Physical & Mineral Sciences
    {
      id: "ul-bsc-physical-sciences",
      name: "BSc (Physical Sciences stream)",
      faculty: "Science & Agriculture - Physical & Mineral Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "ul-bsc-geology",
      name: "BSc (Geology)",
      faculty: "Science & Agriculture - Physical & Mineral Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },

    // Faculty of Science & Agriculture - Mathematical and Computer Sciences
    {
      id: "ul-bsc-mathematical-sciences",
      name: "BSc (Mathematical Sciences stream)",
      faculty: "Science & Agriculture - Mathematical and Computer Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 5,
      },
    },

    // Faculty of Science & Agriculture - Molecular & Life Sciences
    {
      id: "ul-bsc-life-sciences",
      name: "BSc (Life Sciences Stream)",
      faculty: "Science & Agriculture - Molecular & Life Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 5,
        "Physical Sciences": 5,
        "Life Sciences": 4,
      },
    },

    // Faculty of Science & Agriculture - Agriculture and Environmental Sciences
    {
      id: "ul-bagricman",
      name: "BAgricMan (Bachelor of Agricultural Management)",
      faculty: "Science & Agriculture - Agriculture and Environmental Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
        "Life Sciences": 4,
        "Agricultural Science": 4,
      },
    },
    {
      id: "ul-bsc-agriculture-economics",
      name: "BSc (Agriculture) (Agricultural Economics)",
      faculty: "Science & Agriculture - Agriculture and Environmental Sciences",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "ul-bsc-agriculture-plant-production",
      name: "BSc (Agriculture) (Plant Production)",
      faculty: "Science & Agriculture - Agriculture and Environmental Sciences",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
    },
    {
      id: "ul-bsc-agriculture-animal-production",
      name: "BSc (Agriculture) (Animal Production)",
      faculty: "Science & Agriculture - Agriculture and Environmental Sciences",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
    },
    {
      id: "ul-bsc-agriculture-soil-science",
      name: "BSc (Agriculture) (Soil Science)",
      faculty: "Science & Agriculture - Agriculture and Environmental Sciences",
      apsMin: 25,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 5,
        "Life Sciences": 4,
      },
    },
    {
      id: "ul-bsc-environmental-resource-studies",
      name: "BSc (Environmental & Resource Studies)",
      faculty: "Science & Agriculture - Agriculture and Environmental Sciences",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        Geography: 4,
      },
    },
    {
      id: "ul-bsc-water-sanitation-sciences",
      name: "BSc (Water & Sanitation Sciences)",
      faculty: "Science & Agriculture - Agriculture and Environmental Sciences",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 5,
        "Physical Sciences": 5,
        "Life Sciences": 4,
      },
    },

    // Faculty of Management & Law - Accountancy
    {
      id: "ul-bacc",
      name: "BAcc (Bachelor of Accountancy)",
      faculty: "Management & Law - Accountancy",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
      },
    },
    {
      id: "ul-bcom-accountancy",
      name: "BCom (Accountancy)",
      faculty: "Management & Law - Accountancy",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
      },
    },

    // Faculty of Management & Law - Economics and Management
    {
      id: "ul-bcom-business-management",
      name: "BCom (Business Management)",
      faculty: "Management & Law - Economics and Management",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
      },
    },
    {
      id: "ul-bcom-human-resource-management",
      name: "BCom (Human Resource Management)",
      faculty: "Management & Law - Economics and Management",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
      },
    },
    {
      id: "ul-bcom-economics",
      name: "BCom (Economics)",
      faculty: "Management & Law - Economics and Management",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
        Economics: 4,
      },
    },
    {
      id: "ul-badmin",
      name: "BAdmin (Bachelor of Administration)",
      faculty: "Management & Law - Economics and Management",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "ul-badmin-local-government",
      name: "BAdmin (Local Government)",
      faculty: "Management & Law - Economics and Management",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "ul-bdev-planning-management",
      name: "BDev (Planning and Management)",
      faculty: "Management & Law - Economics and Management",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
    },

    // Faculty of Management & Law - Law
    {
      id: "ul-llb",
      name: "LLB (Bachelor of Laws)",
      faculty: "Management & Law - Law",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
      },
    },

    // Faculty of Health Sciences - Medicine
    {
      id: "ul-mbchb",
      name: "MBChB (Bachelor of Medicine & Bachelor of Surgery)",
      faculty: "Health Sciences - Medicine",
      apsMin: 27,
      duration: "6 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 5,
        "Physical Sciences": 5,
        "Life Sciences": 5,
      },
    },

    // Faculty of Health Sciences - Healthcare Sciences
    {
      id: "ul-bsc-dietetics",
      name: "BSc (Dietetics)",
      faculty: "Health Sciences - Healthcare Sciences",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 5,
        "Life Sciences": 5,
      },
    },
    {
      id: "ul-boptom",
      name: "BOptom (Bachelor of Optometry)",
      faculty: "Health Sciences - Healthcare Sciences",
      apsMin: 27,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 5,
        "Physical Sciences": 5,
        "Life Sciences": 5,
      },
    },
    {
      id: "ul-bsc-medical-sciences",
      name: "BSc (Medical Sciences)",
      faculty: "Health Sciences - Healthcare Sciences",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 5,
        "Life Sciences": 5,
      },
    },
    {
      id: "ul-bnurs",
      name: "BNurs (Bachelor of Nursing)",
      faculty: "Health Sciences - Healthcare Sciences",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 5,
        "Life Sciences": 5,
      },
    },
    {
      id: "ul-bpharm",
      name: "BPharm (Bachelor of Pharmacy)",
      faculty: "Health Sciences - Healthcare Sciences",
      apsMin: 27,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 5,
        "Physical Sciences": 5,
        "Life Sciences": 5,
      },
    },
  ]
}
