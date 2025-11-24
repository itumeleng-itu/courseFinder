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
      name: "Bachelor of Arts (Media Studies)",
      faculty: "Humanities, Social Sciences and Education",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        "African Languages": 4,
      },
    },
    {
      id: "univen-ba-development-studies",
      name: "Bachelor of Arts (Development Studies)",
      faculty: "Humanities, Social Sciences and Education",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
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
        English: 4,
      },
    },
    {
      id: "univen-biks",
      name: "Bachelor of Indigenous Knowledge Systems",
      faculty: "Humanities, Social Sciences and Education",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "univen-ba-language-practice",
      name: "Bachelor of Arts in Language Practice",
      faculty: "Humanities, Social Sciences and Education",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "African Languages": 4,
        English: 4,
      },
    },
    {
      id: "univen-ba-english-literature",
      name: "Bachelor of Arts (English and Literature)",
      faculty: "Humanities, Social Sciences and Education",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "univen-ba-ir",
      name: "Bachelor of Arts in International Relations",
      faculty: "Humanities, Social Sciences and Education",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        History: 4,
        Economics: 4,
        English: 4,
      },
    },
    {
      id: "univen-ba-youth-dev",
      name: "Bachelor of Arts, Youth in Development",
      faculty: "Humanities, Social Sciences and Education",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "univen-ba-history",
      name: "Bachelor of Arts (History)",
      faculty: "Humanities, Social Sciences and Education",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        History: 4,
        English: 4,
      },
    },
    {
      id: "univen-bth",
      name: "Bachelor of Theology",
      faculty: "Humanities, Social Sciences and Education",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "univen-hcm",
      name: "Higher Certificate in Music",
      faculty: "Humanities, Social Sciences and Education",
      apsMin: 30,
      duration: "1 year",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "univen-bsw",
      name: "Bachelor of Social Work",
      faculty: "Humanities, Social Sciences and Education",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "univen-bed-senior-phase",
      name: "Bachelor of Education in Senior Phase and Further Education and Training Teaching",
      faculty: "Humanities, Social Sciences and Education",
      apsMin: 36,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
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
        English: 4,
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
        English: 4,
        Mathematics: 4,
        "Life Sciences": 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "univen-dpn",
      name: "Diploma in Nursing",
      faculty: "Health Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        "Life Sciences": 4,
        "Physical Sciences": 4,
        Mathematics: 3,
      },
    },
    {
      id: "univen-bsc-nutrition",
      name: "BSc in Nutrition",
      faculty: "Health Sciences",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Life Sciences": 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "univen-bsc-sports",
      name: "BSc in Sports and Exercise Science",
      faculty: "Health Sciences",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        "Life Sciences": 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "univen-bsc-rls",
      name: "BSc in Recreation and Leisure Studies",
      faculty: "Health Sciences",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "univen-bp",
      name: "Bachelor of Psychology",
      faculty: "Health Sciences",
      apsMin: 36,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        "Life Sciences": 4,
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
        English: 4,
      },
    },
    {
      id: "univen-bcom-accounting-sciences",
      name: "Bachelor of Commerce in Accounting Sciences",
      faculty: "Management, Commerce and Law",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
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
        English: 4,
        Mathematics: 4,
        Accounting: 4,
      },
    },
    {
      id: "univen-bcom-bis",
      name: "Bachelor of Commerce in Business Information Systems",
      faculty: "Management, Commerce and Law",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
        "Mathematical Literacy": 4,
        Accounting: 4,
        "Business Studies": 4,
        Economics: 4,
        "Information Technology": 4,
      },
    },
    {
      id: "univen-bcom-bm",
      name: "Bachelor of Commerce in Business Management",
      faculty: "Management, Commerce and Law",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        "Business Studies": 4,
        Accounting: 3,
        Economics: 3,
        "Information Technology": 3,
        Mathematics: 3,
      },
    },
    {
      id: "univen-bcom-cma",
      name: "Bachelor of Commerce in Cost and Management Accounting",
      faculty: "Management, Commerce and Law",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        Accounting: 4,
      },
    },
    {
      id: "univen-bcom-econ",
      name: "Bachelor of Commerce in Economics",
      faculty: "Management, Commerce and Law",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Economics: 4,
        Mathematics: 4,
        Accounting: 3,
        "Business Studies": 3,
        "Information Technology": 3,
      },
    },
    {
      id: "univen-bcom-hrm",
      name: "Bachelor of Commerce in Human Resource Management",
      faculty: "Management, Commerce and Law",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Accounting: 3,
        "Business Studies": 3,
        Economics: 3,
        "Information Technology": 3,
        Mathematics: 3,
      },
    },
    {
      id: "univen-bcom-ip",
      name: "Bachelor of Commerce in Industrial Psychology",
      faculty: "Management, Commerce and Law",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Accounting: 3,
        "Business Studies": 3,
        Economics: 3,
        "Information Technology": 3,
        Mathematics: 3,
      },
    },
    {
      id: "univen-bcom-tm",
      name: "Bachelor of Commerce in Tourism Management",
      faculty: "Management, Commerce and Law",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        "Mathematical Literacy": 4,
        Mathematics: 3,
        Accounting: 3,
        "Business Studies": 3,
        Economics: 3,
        "Information Technology": 3,
        Geography: 3,
        Tourism: 3,
      },
    },
    {
      id: "univen-llb",
      name: "Bachelor of Laws",
      faculty: "Management, Commerce and Law",
      apsMin: 38,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
      },
    },
    {
      id: "univen-bacj",
      name: "Bachelor of Arts in Criminal Justice",
      faculty: "Management, Commerce and Law",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
      },
    },

    {
      id: "univen-ext-badmin",
      name: "Extended Bachelor of Administration",
      faculty: "Management, Commerce and Law",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        English: 3,
      },
    },
    {
      id: "univen-ext-bcom-accounting",
      name: "Extended Bachelor of Commerce in Accounting",
      faculty: "Management, Commerce and Law",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        English: 3,
        Mathematics: 3,
        Accounting: 3,
      },
    },
    {
      id: "univen-ext-bcom-bis",
      name: "Extended Bachelor of Commerce in Business Information Systems",
      faculty: "Management, Commerce and Law",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        English: 3,
        Mathematics: 3,
        "Information Technology": 3,
      },
    },
    {
      id: "univen-ext-bcom-bm",
      name: "Extended Bachelor of Commerce in Business Management",
      faculty: "Management, Commerce and Law",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        English: 3,
        "Business Studies": 3,
      },
    },
    {
      id: "univen-ext-bcom-cma",
      name: "Extended Bachelor of Commerce in Cost and Management Accounting",
      faculty: "Management, Commerce and Law",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        English: 3,
        Accounting: 3,
      },
    },
    {
      id: "univen-ext-bcom-econ",
      name: "Extended Bachelor of Commerce in Economics",
      faculty: "Management, Commerce and Law",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        English: 3,
        Economics: 3,
      },
    },
    {
      id: "univen-ext-bcom-hrm",
      name: "Extended Bachelor of Commerce in Human Resources Management",
      faculty: "Management, Commerce and Law",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        English: 3,
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
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
    },
    {
      id: "univen-bsc-biochemistry-biology",
      name: "BSc in Biochemistry and Biology",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
    },
    {
      id: "univen-bsc-microbiology-botany",
      name: "BSc in Microbiology and Botany",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
    },
    {
      id: "univen-bsc-math-applied",
      name: "BSc in Mathematics and Applied Mathematics",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
    },
    {
      id: "univen-bsc-math-physics",
      name: "BSc in Mathematics and Physics",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
    },
    {
      id: "univen-bsc-math-stats",
      name: "BSc in Mathematics and Statistics",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
    },
    {
      id: "univen-bsc-physics-chemistry",
      name: "BSc in Physics and Chemistry",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
    },
    {
      id: "univen-bsc-chemistry-math",
      name: "BSc in Chemistry and Mathematics",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
    },
    {
      id: "univen-bsc-chemistry-biochemistry",
      name: "BSc in Chemistry and Biochemistry",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
    },
    {
      id: "univen-bsc-chemistry",
      name: "BSc in Chemistry",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
    },
    {
      id: "univen-bsc-botany-zoology",
      name: "BSc in Botany and Zoology",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
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
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
    },
    {
      id: "univen-bsc-cs-math",
      name: "BSc in Computer Science and Mathematics",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
    },

    {
      id: "univen-dpt-freshwater",
      name: "Diploma in Freshwater Technology",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        English: 3,
        "Life Sciences": 4,
        "Agricultural Sciences": 4,
        "Physical Sciences": 4,
        Geography: 4,
      },
    },

    // Environmental Sciences
    {
      id: "univen-bes",
      name: "Bachelor of Environmental Sciences",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
    },
    {
      id: "univen-bes-mining-geology",
      name: "Bachelor of Earth Sciences in Mining and Environmental Geology",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "univen-bes-hydrology",
      name: "Bachelor of Earth Sciences in Hydrology and Water Resources",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "univen-burp",
      name: "Bachelor of Urban and Regional Planning",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Physical Sciences": 5,
        "Technical Drawing": 5,
        Geography: 5,
      },
    },
    {
      id: "univen-bes-drr",
      name: "Bachelor of Environmental Sciences in Disaster Risk Reduction",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        Geography: 5,
        Mathematics: 5,
        "Life Sciences": 5,
        English: 4,
        "Physical Sciences": 4,
        Economics: 4,
      },
    },

    // Agriculture Stream
    {
      id: "univen-bsa-ae",
      name: "Bachelor of Science in Agriculture (Agricultural Economics)",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "univen-bsa-abm",
      name: "Bachelor of Science in Agriculture (Agribusiness Management)",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
    },
    {
      id: "univen-bsa-as",
      name: "Bachelor of Science in Agriculture (Animal Science)",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
    },
    {
      id: "univen-bsa-hs",
      name: "Bachelor of Science in Agriculture (Horticultural Sciences)",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
    },
    {
      id: "univen-bsa-pp",
      name: "Bachelor of Science in Agriculture (Plant Production)",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
    },
    {
      id: "univen-bsa-ss",
      name: "Bachelor of Science in Soil Science",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
    },
    {
      id: "univen-bsa-forestry",
      name: "Bachelor of Science in Forestry",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
    },
    {
      id: "univen-bsa-abe",
      name: "Bachelor of Science in Agricultural and Biosystems Engineering",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },

    {
      id: "univen-ext-bsc-biochem-micro",
      name: "Extended BSc in Biochemistry and Microbiology",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        English: 3,
        Mathematics: 3,
        "Physical Sciences": 3,
      },
    },
    {
      id: "univen-ext-bsc-biochem-bio",
      name: "Extended BSc in Biochemistry and Biology",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        English: 3,
        Mathematics: 3,
        "Physical Sciences": 3,
      },
    },
    {
      id: "univen-ext-bsc-micro-botany",
      name: "Extended BSc in Microbiology and Botany",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        English: 3,
        Mathematics: 3,
        "Physical Sciences": 3,
      },
    },
    {
      id: "univen-ext-bsc-math-applied",
      name: "Extended BSc in Mathematics and Applied Mathematics",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        English: 3,
        Mathematics: 3,
        "Physical Sciences": 3,
      },
    },
    {
      id: "univen-ext-bsc-math-physics",
      name: "Extended BSc in Mathematics and Physics",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        English: 3,
        Mathematics: 3,
      },
    },
    {
      id: "univen-ext-bsc-math-stats",
      name: "Extended BSc in Mathematics and Statistics",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        English: 3,
        Mathematics: 3,
      },
    },
    {
      id: "univen-ext-bsc-physics-chem",
      name: "Extended BSc in Physics and Chemistry",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        English: 3,
        Mathematics: 3,
      },
    },
    {
      id: "univen-ext-bsc-chem-math",
      name: "Extended BSc in Chemistry and Mathematics",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        English: 3,
        Mathematics: 3,
      },
    },
    {
      id: "univen-ext-bsc-chem-biochem",
      name: "Extended BSc in Chemistry and Biochemistry",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        English: 3,
        Mathematics: 3,
      },
    },
    {
      id: "univen-ext-bsc-chem-app",
      name: "Extended BSc in Chemistry and Applied Chemistry",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        English: 3,
        Mathematics: 3,
        "Physical Sciences": 3,
      },
    },
    {
      id: "univen-ext-bsc-botany-zool",
      name: "Extended BSc in Botany and Zoology",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        English: 3,
        Mathematics: 3,
        "Physical Sciences": 3,
      },
    },
    {
      id: "univen-ext-bsc-cs",
      name: "Extended BSc in Computer Science",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        English: 3,
        Mathematics: 3,
        "Physical Sciences": 3,
      },
    },
    {
      id: "univen-ext-bsc-cs-math",
      name: "Extended BSc in Computer Science and Mathematics",
      faculty: "Science, Engineering and Agriculture",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        English: 3,
        Mathematics: 3,
        "Physical Sciences": 3,
      },
    },
  ]

  /**
   * UNIVEN-specific APS calculation
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