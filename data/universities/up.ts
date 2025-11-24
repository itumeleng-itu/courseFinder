import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * University of Pretoria (UP) class
 */
export class UP extends BaseUniversity {
  readonly id = "up"
  readonly name = "University of Pretoria"
  readonly shortName = "UP"
  readonly website = "https://www.up.ac.za"
  readonly logo = "/logos/up.png"
  readonly location = {
    city: "Pretoria",
    province: "Gauteng",
    coordinates: {
      latitude: -25.7545,
      longitude: 28.2314,
    },
  }

  protected readonly _courses: Course[] = [
    // Faculty of Economic and Management Sciences
    {
      id: "up-badmin-public",
      name: "Bachelor of Administration specialising in Public Administration",
      faculty: "Economic and Management Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
      },
    },
    {
      id: "up-bcom-accounting",
      name: "Bachelor of Commerce in Accounting Sciences",
      faculty: "Economic and Management Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 6,
      },
    },
    {
      id: "up-bcom-investment",
      name: "Bachelor of Commerce specialising in Investment Management",
      faculty: "Economic and Management Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 6,
      },
    },
    {
      id: "up-bcom-financial",
      name: "Bachelor of Commerce specialising in Financial Management Sciences",
      faculty: "Economic and Management Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
      },
    },
    {
      id: "up-bcom-econometrics",
      name: "Bachelor of Commerce specialising in Econometrics",
      faculty: "Economic and Management Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 6,
      },
    },
    {
      id: "up-bcom-economics",
      name: "Bachelor of Commerce specialising in Economics",
      faculty: "Economic and Management Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
      },
    },
    {
      id: "up-bcom-law",
      name: "Bachelor of Commerce specialising in Law",
      faculty: "Economic and Management Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
      },
    },
    {
      id: "up-bcom-stats",
      name: "Bachelor of Commerce specialising in Statistics and Data Science",
      faculty: "Economic and Management Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
      },
    },
    {
      id: "up-bcom-is",
      name: "Bachelor of Commerce specialising in Information Systems",
      faculty: "Economic and Management Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
      },
    },
    {
      id: "up-bcom-agribusiness",
      name: "Bachelor of Commerce specialising in Agribusiness Management",
      faculty: "Economic and Management Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
      },
    },
    {
      id: "up-bcom-business",
      name: "Bachelor of Commerce specialising in Business Management",
      faculty: "Economic and Management Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 4,
      },
    },
    {
      id: "up-bcom-supply",
      name: "Bachelor of Commerce specialising in Supply Chain Management",
      faculty: "Economic and Management Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 4,
      },
    },
    {
      id: "up-bcom-marketing",
      name: "Bachelor of Commerce specialising in Marketing Management",
      faculty: "Economic and Management Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 4,
      },
    },
    {
      id: "up-bcom-hr",
      name: "Bachelor of Commerce specialising in Human Resource Management",
      faculty: "Economic and Management Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 4,
      },
    },
    {
      id: "up-bcom-general",
      name: "Bachelor of Commerce",
      faculty: "Economic and Management Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 4,
      },
    },
    {
      id: "up-bcom-4year",
      name: "Bachelor of Commerce (4-year programme)",
      faculty: "Economic and Management Sciences",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
      },
    },

    // Faculty of Education
    {
      id: "up-bed-ece",
      name: "Bachelor of Education in Early Childhood Care and Education",
      faculty: "Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "up-bed-foundation",
      name: "Bachelor of Education in Foundation Phase Teaching",
      faculty: "Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "up-bed-intermediate",
      name: "Bachelor of Education in Intermediate Phase Teaching",
      faculty: "Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "up-bed-senior",
      name: "Bachelor of Education in Senior Phase and Further Education and Training Teaching",
      faculty: "Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "up-hcss-1year",
      name: "Higher Certificate in Sports Sciences (1 year)",
      faculty: "Education",
      apsMin: 20,
      duration: "1 year",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "up-hcss-2year",
      name: "Higher Certificate in Sports Sciences (2 years online)",
      faculty: "Education",
      apsMin: 20,
      duration: "2 years",
      subjectRequirements: {
        English: 4,
      },
    },

    // Faculty of Engineering, Built Environment and Information Technology
    // School of Engineering
    {
      id: "up-beng-chemical",
      name: "Bachelor of Engineering in Chemical Engineering",
      faculty: "Engineering, Built Environment and Information Technology",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 6,
        "Physical Sciences": 6,
      },
    },
    {
      id: "up-beng-civil",
      name: "Bachelor of Engineering in Civil Engineering",
      faculty: "Engineering, Built Environment and Information Technology",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 6,
        "Physical Sciences": 6,
      },
    },
    {
      id: "up-beng-computer",
      name: "Bachelor of Engineering in Computer Engineering",
      faculty: "Engineering, Built Environment and Information Technology",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 6,
        "Physical Sciences": 6,
      },
    },
    {
      id: "up-beng-electrical",
      name: "Bachelor of Engineering in Electrical Engineering",
      faculty: "Engineering, Built Environment and Information Technology",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 6,
        "Physical Sciences": 6,
      },
    },
    {
      id: "up-beng-electronic",
      name: "Bachelor of Engineering in Electronic Engineering",
      faculty: "Engineering, Built Environment and Information Technology",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 6,
        "Physical Sciences": 6,
      },
    },
    {
      id: "up-beng-industrial",
      name: "Bachelor of Engineering in Industrial Engineering",
      faculty: "Engineering, Built Environment and Information Technology",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 6,
        "Physical Sciences": 6,
      },
    },
    {
      id: "up-beng-mechanical",
      name: "Bachelor of Engineering in Mechanical Engineering",
      faculty: "Engineering, Built Environment and Information Technology",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 6,
        "Physical Sciences": 6,
      },
    },
    {
      id: "up-beng-metallurgical",
      name: "Bachelor of Engineering in Metallurgical Engineering",
      faculty: "Engineering, Built Environment and Information Technology",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 6,
        "Physical Sciences": 6,
      },
    },
    {
      id: "up-beng-mining",
      name: "Bachelor of Engineering in Mining Engineering",
      faculty: "Engineering, Built Environment and Information Technology",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 6,
        "Physical Sciences": 6,
      },
    },
    {
      id: "up-beng-5year",
      name: "Bachelor of Engineering (5-year programme)",
      faculty: "Engineering, Built Environment and Information Technology",
      apsMin: 33,
      duration: "5 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 6,
        "Physical Sciences": 6,
      },
    },

    // School for the Built Environment
    {
      id: "up-bsc-architecture",
      name: "Bachelor of Science in Architecture",
      faculty: "Engineering, Built Environment and Information Technology",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "up-bsc-construction",
      name: "Bachelor of Science in Construction Management",
      faculty: "Engineering, Built Environment and Information Technology",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Accounting", level: 4 },
          ],
        },
      },
    },
    {
      id: "up-bsc-real-estate",
      name: "Bachelor of Science in Real Estate",
      faculty: "Engineering, Built Environment and Information Technology",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Accounting", level: 4 },
          ],
        },
      },
    },
    {
      id: "up-bsc-quantity",
      name: "Bachelor of Science in Quantity Surveying",
      faculty: "Engineering, Built Environment and Information Technology",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Accounting", level: 4 },
          ],
        },
      },
    },
    {
      id: "up-btrp",
      name: "Bachelor of Town and Regional Planning",
      faculty: "Engineering, Built Environment and Information Technology",
      apsMin: 27,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 4,
      },
    },

    // School of Information Technology
    {
      id: "up-bis",
      name: "Bachelor of Information Science",
      faculty: "Engineering, Built Environment and Information Technology",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "up-bis-publishing",
      name: "Bachelor of Information Science specialising in Publishing",
      faculty: "Engineering, Built Environment and Information Technology",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
      },
    },
    {
      id: "up-bis-multimedia",
      name: "Bachelor of Information Science specialising in Multimedia",
      faculty: "Engineering, Built Environment and Information Technology",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 5,
      },
    },
    {
      id: "up-bit-is",
      name: "Bachelor of Information Technology in Information Systems",
      faculty: "Engineering, Built Environment and Information Technology",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
      },
    },
    {
      id: "up-bsc-cs",
      name: "Bachelor of Science in Computer Science",
      faculty: "Engineering, Built Environment and Information Technology",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 6,
      },
    },
    {
      id: "up-bsc-it-iks",
      name: "Bachelor of Science in Information Technology in Information and Knowledge Systems",
      faculty: "Engineering, Built Environment and Information Technology",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 6,
      },
    },

    // Faculty of Health Sciences
    {
      id: "up-bds",
      name: "Bachelor of Dental Surgery",
      faculty: "Health Sciences",
      apsMin: 35,
      duration: "5 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 6,
        "Physical Sciences": 5,
      },
    },
    {
      id: "up-boh",
      name: "Bachelor of Oral Hygiene",
      faculty: "Health Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "up-bdiet",
      name: "Bachelor of Dietetics",
      faculty: "Health Sciences",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "up-bnurs",
      name: "Bachelor of Nursing Science",
      faculty: "Health Sciences",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Life Sciences": 4,
      },
    },
    {
      id: "up-bot",
      name: "Bachelor of Occupational Therapy",
      faculty: "Health Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "up-bphysio",
      name: "Bachelor of Physiotherapy",
      faculty: "Health Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "up-brad",
      name: "Bachelor of Radiography in Diagnostics",
      faculty: "Health Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "up-bcmp",
      name: "Bachelor of Clinical Medical Practice",
      faculty: "Health Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 4 },
            { subject: "Life Sciences", level: 4 },
          ],
        },
      },
    },
    {
      id: "up-mbchb",
      name: "Bachelor of Medicine and Surgery (MBChB)",
      faculty: "Health Sciences",
      apsMin: 35,
      duration: "6 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 6,
        "Physical Sciences": 5,
      },
    },
    {
      id: "up-bsports",
      name: "Bachelor of Sports Science",
      faculty: "Health Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 4 },
            { subject: "Life Sciences", level: 4 },
          ],
        },
      },
    },

    // Faculty of Humanities
    {
      id: "up-ba-slp",
      name: "Bachelor of Arts in Speech-Language Pathology",
      faculty: "Humanities",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 4,
      },
    },
    {
      id: "up-ba-audiology",
      name: "Bachelor of Arts in Audiology",
      faculty: "Humanities",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 4,
      },
    },
    {
      id: "up-ba-info-design",
      name: "Bachelor of Arts in Information Design",
      faculty: "Humanities",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
      },
    },
    {
      id: "up-ba",
      name: "Bachelor of Arts",
      faculty: "Humanities",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
      },
    },
    {
      id: "up-bsw",
      name: "Bachelor of Social Work",
      faculty: "Humanities",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
      },
    },
    {
      id: "up-ba-law",
      name: "Bachelor of Arts specialising in Law",
      faculty: "Humanities",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
      },
    },
    {
      id: "up-ba-languages",
      name: "Bachelor of Arts specialising in Languages",
      faculty: "Humanities",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
      },
    },
    {
      id: "up-bss-industrial",
      name: "Bachelor of Social Science specialising in Industrial Sociology and Labour Studies",
      faculty: "Humanities",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
      },
    },
    {
      id: "up-bss-heritage",
      name: "Bachelor of Social Science in Heritage and Cultural Sciences",
      faculty: "Humanities",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
      },
    },
    {
      id: "up-bmus-4year",
      name: "Bachelor of Music (4 years)",
      faculty: "Humanities",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
      },
    },
    {
      id: "up-bmus-5year",
      name: "Bachelor of Music (5 years)",
      faculty: "Humanities",
      apsMin: 26,
      duration: "5 years",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "up-bdrama-3year",
      name: "Bachelor of Drama (3 years)",
      faculty: "Humanities",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
      },
    },
    {
      id: "up-bdrama-4year",
      name: "Bachelor of Drama (4 years)",
      faculty: "Humanities",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "up-ba-ppe",
      name: "Bachelor of Arts specialising in Philosophy, Politics and Economics",
      faculty: "Humanities",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
      },
    },
    {
      id: "up-bps-international",
      name: "Bachelor of Political Science specialising in International Studies",
      faculty: "Humanities",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
      },
    },
    {
      id: "up-bps-political",
      name: "Bachelor of Political Science specialising in Political Studies",
      faculty: "Humanities",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
      },
    },
    {
      id: "up-bfa-4year",
      name: "Bachelor of Arts in Fine Arts (4 years)",
      faculty: "Humanities",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
      },
    },
    {
      id: "up-bfa-5year",
      name: "Bachelor of Arts in Fine Arts (5 years)",
      faculty: "Humanities",
      apsMin: 26,
      duration: "5 years",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "up-ba-visual",
      name: "Bachelor of Arts specialising in Visual Studies",
      faculty: "Humanities",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
      },
    },

    // Faculty of Law
    {
      id: "up-llb",
      name: "Bachelor of Laws (LLB)",
      faculty: "Law",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        English: 6,
      },
    },

    // Faculty of Theology and Religion
    {
      id: "up-bth",
      name: "Bachelor of Theology",
      faculty: "Theology and Religion",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "up-bdiv",
      name: "Bachelor of Divinity",
      faculty: "Theology and Religion",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "up-dip-theology",
      name: "Diploma in Theology",
      faculty: "Theology and Religion",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        English: 3,
      },
    },

    // Faculty of Natural and Agricultural Sciences
    // Agricultural and Food Sciences
    {
      id: "up-bsc-agric-econ",
      name: "Bachelor of Science in Agriculture in Agricultural Economics in Agribusiness Management",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "up-bsc-agric-animal",
      name: "Bachelor of Science in Agriculture in Animal Science",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "up-bsc-agric-plant",
      name: "Bachelor of Science in Agriculture in Applied Plant and Soil Sciences",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "up-bsc-agric-pathology",
      name: "Bachelor of Science in Agriculture in Plant Pathology",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "up-bsc-food-culinary",
      name: "Bachelor of Science in Food Management (Culinary Science)",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "up-bsc-food-nutrition",
      name: "Bachelor of Science in Food Management (Nutritional Science)",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "up-bsc-food-science",
      name: "Bachelor of Science in Food Science",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },

    // Biological Sciences
    {
      id: "up-bsc-biochemistry",
      name: "Bachelor of Science in Biochemistry",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "up-bsc-biotechnology",
      name: "Bachelor of Science in Biotechnology",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "up-bsc-ecology",
      name: "Bachelor of Science in Ecology",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "up-bsc-entomology",
      name: "Bachelor of Science in Entomology",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "up-bsc-genetics",
      name: "Bachelor of Science in Genetics",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "up-bsc-human-genetics",
      name: "Bachelor of Science in Human Genetics",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "up-bsc-human-physiology",
      name: "Bachelor of Science in Human Physiology",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "up-bsc-human-physiology-gp",
      name: "Bachelor of Science in Human Physiology, Genetics and Psychology",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "up-bsc-medical-sciences",
      name: "Bachelor of Science in Medical Sciences",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "up-bsc-microbiology",
      name: "Bachelor of Science in Microbiology",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "up-bsc-plant-science",
      name: "Bachelor of Science in Plant Science",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "up-bsc-zoology",
      name: "Bachelor of Science in Zoology",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },

    // Consumer Science
    {
      id: "up-bcs-clothing",
      name: "Bachelor of Consumer Science specialising in Clothing Retail Management",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 4,
      },
    },
    {
      id: "up-bcs-food",
      name: "Bachelor of Consumer Science specialising in Food Management",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 4,
      },
    },

    // Mathematical Sciences
    {
      id: "up-bsc-actuarial",
      name: "Bachelor of Science in Actuarial and Financial Mathematics",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 36,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 7,
      },
    },
    {
      id: "up-bsc-mathematics",
      name: "Bachelor of Science in Mathematics",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 6,
      },
    },
    {
      id: "up-bsc-applied-math",
      name: "Bachelor of Science in Applied Mathematics",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 6,
      },
    },
    {
      id: "up-bsc-math-stats",
      name: "Bachelor of Science in Mathematical Statistics",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 6,
      },
    },

    // Physical Sciences
    {
      id: "up-bsc-chemistry",
      name: "Bachelor of Science in Chemistry",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "up-bsc-env-geology",
      name: "Bachelor of Science in Environmental and Engineering Geology",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "up-bsc-geography",
      name: "Bachelor of Science in Geography (Geography and Environmental Science)",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "up-bsc-geoinformatics",
      name: "Bachelor of Science in Geoinformatics",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "up-bsc-geology",
      name: "Bachelor of Science in Geology",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "up-bsc-meteorology",
      name: "Bachelor of Science in Meteorology",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "up-bsc-physics",
      name: "Bachelor of Science in Physics",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },

    // Extended programmes (4-year and 5-year with lower requirements)
    {
      id: "up-bsc-math-extended",
      name: "Bachelor of Science in Mathematics (4-year extended)",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 6,
      },
    },

    // Faculty of Veterinary Science
    {
      id: "up-bvsc",
      name: "Bachelor of Veterinary Science",
      faculty: "Veterinary Science",
      apsMin: 35,
      duration: "6 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "up-bvet-nursing",
      name: "Bachelor of Veterinary Nursing",
      faculty: "Veterinary Science",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 4 },
            { subject: "Life Sciences", level: 4 },
          ],
        },
      },
    },
  ]

  /**
   * UP-specific APS calculation
   * Uses  standard South African APS system
   * - Best 6 subjects excluding Life Orientation
   * - Standard 7-point NSC scale
   */
  calculateApsScore(subjects: Record<string, number>): number {
    const subjectScores: number[] = []

    for (const [subjectName, percentage] of Object.entries(subjects)) {
      // Skip Life Orientation
      if (subjectName.toLowerCase().includes('life orientation')) {
        continue
      }

      // Standard 7-point scale
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

    // Sort descending and take top 6 subjects
    subjectScores.sort((a, b) => b - a)
    const top6 = subjectScores.slice(0, 6)

    return top6.reduce((sum, score) => sum + score, 0)
  }
}
