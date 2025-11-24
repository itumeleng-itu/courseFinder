import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * Sefako Makgatho Health Sciences University (SMU) class
 *
 * SMU is a health sciences university located in Pretoria, Gauteng.
 * It offers a range of health sciences programs including Medicine, Dentistry,
 * Pharmacy, Nursing, and other allied health professions.
 */
export class SMU extends BaseUniversity {
  readonly id = "smu"
  readonly name = "Sefako Makgatho Health Sciences University"
  readonly shortName = "SMU"
  readonly website = "https://www.smu.ac.za"
  readonly logo = "/logos/smu.png"
  readonly location = {
    city: "Pretoria",
    province: "Gauteng",
    coordinates: {
      latitude: -25.627,
      longitude: 28.0199,
    },
  }

  /**
   * SMU APS Calculation Method:
   * - NSC Rating 7 (80-100%): 7 points
   * - NSC Rating 6 (70-79%): 6 points
   * - NSC Rating 5 (60-69%): 5 points
   * - NSC Rating 4 (50-59%): 4 points
   * - NSC Rating 3 (40-49%): 3 points
   * - NSC Rating 2 (30-39%): 2 points
   * - NSC Rating 1 (0-29%): 1 point
   *
   * Life Orientation is included in the APS calculation for most programs
   * APS is calculated by adding the performance ratings of all NSC subjects
   */
  protected readonly _courses: Course[] = [
    // School of Medicine
    {
      id: "smu-mbchb",
      name: "Bachelor of Medicine and Bachelor of Surgery (MBChB)",
      faculty: "Medicine",
      apsMin: 38,
      duration: "6 years",
      subjectRequirements: {
        Mathematics: 6,
        "Physical Sciences": 6,
        "Life Sciences": 6,
        English: 6,
      },
      requirements: [
        "Minimum APS score of 38",
        "Mathematics: Level 6",
        "Physical Sciences: Level 6",
        "Life Sciences: Level 6",
        "English: Level 6",
        "Additional Subject 1: Level 5",
        "Additional Subject 2: Level 4",
        "Life Orientation: Level 5",
        "Entry is highly competitive and may require scores higher than the minimum",
      ],
      campus: "Ga-Rankuwa",
      careerOpportunities: [
        "Clinical practice as a medical doctor",
        "Specialization in various medical disciplines",
        "Medical research and innovation",
        "Academic medicine",
        "Healthcare administration",
      ],
    },
    {
      id: "smu-mbchb-ecp",
      name: "Bachelor of Medicine and Bachelor of Surgery Extended Curriculum (MBChB-ECP)",
      faculty: "Medicine",
      apsMin: 32,
      duration: "7 years",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
        "Life Sciences": 5,
        English: 5,
      },
      requirements: [
        "Minimum APS score of 32",
        "Mathematics: Level 5",
        "Physical Sciences: Level 5",
        "Life Sciences: Level 5",
        "English: Level 5",
        "Life Orientation: Level 4",
        "Additional Subject 1: Level 4",
        "Additional Subject 2: Level 4",
        "Reserved for South African Black learners from Quintile 1 and 2 schools",
        "Applicants must not have previous tertiary education",
        "Only 50 spaces available on a competitive basis",
        "After completing the one-year foundation program, students enter the mainstream MBChB program",
      ],
      campus: "Ga-Rankuwa",
    },

    // School of Dentistry
    {
      id: "smu-bds",
      name: "Bachelor of Dental Surgery (BDS)",
      faculty: "Dentistry",
      apsMin: 37,
      duration: "5 years",
      subjectRequirements: {
        Mathematics: 6,
        "Physical Sciences": 6,
        "Life Sciences": 6,
        English: 5,
      },
      requirements: [
        "Minimum APS score of 37",
        "Mathematics: Level 6",
        "Physical Sciences: Level 6",
        "Life Sciences: Level 6",
        "English: Level 5",
        "Additional Subject 1: Level 5",
        "Additional Subject 2: Level 4",
        "Life Orientation: Level 5",
      ],
      campus: "Ga-Rankuwa",
      careerOpportunities: [
        "Private dental practice",
        "Public dental and oral health services",
        "Academic dentistry",
        "Specialization in oral surgery, orthodontics, periodontics, oral medicine, oral pathology, prosthodontics, or community dentistry",
      ],
    },
    {
      id: "smu-bdt",
      name: "Bachelor of Dental Therapy (BDT)",
      faculty: "Dentistry",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
        English: 4,
      },
      requirements: [
        "Minimum APS score of 28",
        "Mathematics: Level 4",
        "Physical Sciences: Level 4",
        "Life Sciences: Level 4",
        "English: Level 4",
        "Additional Subject 1: Level 4",
        "Additional Subject 2: Level 4",
        "Life Orientation: Level 4",
      ],
      campus: "Ga-Rankuwa",
      careerOpportunities: [
        "Performing basic dental procedures (tooth extractions, cleaning and polishing teeth, x-rays)",
        "Private practice",
        "Public dental services",
        "Academic dentistry",
      ],
    },
    {
      id: "smu-boh",
      name: "Bachelor of Oral Hygiene (BOH)",
      faculty: "Dentistry",
      apsMin: 31,
      duration: "3 years",
      subjectRequirements: {
        "Mathematical Literacy": 7,
        "Physical Sciences": 4,
        "Life Sciences": 4,
        English: 4,
      },
      requirements: [
        "Minimum APS score of 31",
        "Mathematical Literacy: Level 7",
        "Physical Sciences: Level 4",
        "Life Sciences: Level 4",
        "English: Level 4",
        "Additional Subject 1: Level 4",
        "Additional Subject 2: Level 4",
        "Life Orientation: Level 4",
      ],
      campus: "Ga-Rankuwa",
      careerOpportunities: [
        "Cleaning and polishing teeth",
        "Taking x-rays",
        "Performing preventative procedures",
        "Health promotion",
        "Private practice",
        "Public dental services",
        "Academic dentistry",
      ],
    },
    {
      id: "smu-boh-math",
      name: "Bachelor of Oral Hygiene (BOH) - Mathematics Route",
      faculty: "Dentistry",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
        English: 4,
      },
      requirements: [
        "Minimum APS score of 28",
        "Mathematics: Level 4",
        "Physical Sciences: Level 4",
        "Life Sciences: Level 4",
        "English: Level 4",
        "Additional Subject 1: Level 4",
        "Additional Subject 2: Level 4",
        "Life Orientation: Level 4",
      ],
      campus: "Ga-Rankuwa",
    },

    // School of Pharmacy
    {
      id: "smu-bpharm",
      name: "Bachelor of Pharmacy (BPharm)",
      faculty: "Pharmacy",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
        "Life Sciences": 5,
        English: 5,
      },
      requirements: [
        "Minimum APS score of 32",
        "Mathematics: Level 5",
        "Physical Sciences: Level 5",
        "Life Sciences: Level 5",
        "English: Level 5",
        "Additional Subject 1 (preferably Accounting): Level 4",
        "Additional Subject 2 (preferably Economics): Level 4",
        "Life Orientation: Level 4",
        "Students must register with the South African Pharmacy Council before 31 March of the first year",
        "After qualification, graduates must undertake one year of internship",
        "Graduates must complete one year in the public sector as a community service pharmacist before full registration",
      ],
      campus: "Ga-Rankuwa",
      careerOpportunities: [
        "Community pharmacy",
        "Hospital pharmacy",
        "Industrial pharmacy",
        "Regulatory affairs",
        "Clinical pharmacy",
        "Academic pharmacy",
        "Research and development",
      ],
    },
    {
      id: "smu-hcert-vacc",
      name: "Higher Certificate in Vaccinology",
      faculty: "Pharmacy",
      apsMin: 0, // Special requirements
      duration: "1 year",
      subjectRequirements: {},
      requirements: [
        "Registered General Nurse and Midwife with the SA Nursing Council, or",
        "3-year qualification in health sciences from a tertiary institution registered with the Health Professions Council of South Africa",
        "Priority given to in-service healthcare workers currently working in vaccination",
        "Applicants must write a motivation explaining why they should be accepted",
      ],
      campus: "Online",
      careerOpportunities: [
        "Running vaccination clinics",
        "Healthcare workers with enhanced vaccination expertise",
        "Public health services",
        "Primary healthcare facilities",
      ],
    },

    // School of Health Care Sciences
    {
      id: "smu-bnam",
      name: "Bachelor of Nursing and Midwifery (BNAM)",
      faculty: "Health Sciences",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
        English: 4,
      },
      requirements: [
        "Minimum APS score of 26",
        "Mathematics: Level 4",
        "Physical Sciences: Level 4",
        "Life Sciences: Level 4",
        "English: Level 4",
        "Additional Subject 1: Level 4",
        "Additional Subject 2: Level 3",
        "Life Orientation: Level 3",
      ],
      campus: "Ga-Rankuwa",
      careerOpportunities: [
        "General nursing",
        "Midwifery",
        "Public or private hospitals",
        "Primary healthcare facilities",
        "Corporate healthcare",
        "Specialization in Community Health Nursing, Primary Health Care Nursing, Psychiatric Nursing, Critical Care Nursing",
        "Nursing Education",
        "Health Service Management",
        "Research",
      ],
    },
    {
      id: "smu-b-occ-ther",
      name: "Bachelor of Occupational Therapy (B OCC THER)",
      faculty: "Health Sciences",
      apsMin: 25,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
        English: 4,
      },
      requirements: [
        "Minimum APS score of 25",
        "Mathematics: Level 4",
        "Physical Sciences: Level 4",
        "Life Sciences: Level 4",
        "English: Level 4",
        "Additional Subject 1: Level 3",
        "Additional Subject 2: Level 3",
        "Life Orientation: Level 3",
        "Upon completion, graduates must register with the Health Professions Council of South Africa (HPCSA)",
      ],
      campus: "Ga-Rankuwa",
      careerOpportunities: [
        "Working with disabled and ill people in various settings",
        "Home and work environments",
        "Clinics and hospitals",
        "Schools for disabled children",
        "Mental health facilities",
        "Consulting for industry (mines)",
        "Medico-legal consulting",
        "Consulting for architects and urban/town planners",
      ],
    },
    {
      id: "smu-bsc-physio",
      name: "Bachelor of Science in Physiotherapy (BSc Physio)",
      faculty: "Health Sciences",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
        English: 4,
      },
      requirements: [
        "Minimum APS score of 28",
        "Mathematics: Level 4",
        "Physical Sciences: Level 4",
        "Life Sciences: Level 4",
        "English: Level 4",
        "Additional Subject 1: Level 4",
        "Additional Subject 2: Level 4",
        "Life Orientation: Level 4",
      ],
      campus: "Ga-Rankuwa",
      careerOpportunities: [
        "Self-employment (private practice)",
        "Public and private hospitals",
        "Clinics and health care centers",
        "Day-care centers, crèches, and schools for children with special needs",
        "Nursing homes and centers for people with physical disabilities",
        "Sports centers and sports teams",
        "Tertiary training institutions",
        "Research units",
        "Occupational health units",
      ],
    },
    {
      id: "smu-b-aud",
      name: "Bachelor of Audiology (B AUD)",
      faculty: "Health Sciences",
      apsMin: 25,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 4,
        English: 4,
        "Life Sciences": 4,
      },
      requirements: [
        "Minimum APS score of 25",
        "Mathematics: Level 4",
        "English: Level 4",
        "Life Sciences: Level 4",
        "Any Home Language or First Additional Language: Level 4",
        "Life Orientation: Level 3",
        "Additional Subject 1: Level 3",
        "Additional Subject 2: Level 3",
        "Students are required to observe at hospitals, private practices and/or clinics regarding the Audiologist's scope of practice before selection",
      ],
      campus: "Ga-Rankuwa",
      careerOpportunities: [
        "Prevention, identification, assessment, and treatment of individuals with hearing and/or balance disorders",
        "Private practice",
        "Private hospitals",
        "Government hospitals",
        "Rural clinics",
        "Tertiary institutions",
        "Schools",
        "Industries",
        "Communities",
        "Home environments",
      ],
    },
    {
      id: "smu-b-slp",
      name: "Bachelor of Speech-Language Pathology",
      faculty: "Health Sciences",
      apsMin: 25,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 4,
        English: 4,
        "Life Sciences": 4,
      },
      requirements: [
        "Minimum APS score of 25",
        "Mathematics: Level 4",
        "English: Level 4",
        "Life Sciences: Level 4",
        "Any Home Language or First Additional Language: Level 4",
        "Life Orientation: Level 3",
        "Additional Subject 1: Level 3",
        "Additional Subject 2: Level 3",
        "Students are required to observe at hospitals, private practices and/or clinics regarding the Speech-Language Pathologist's scope of practice before selection",
      ],
      campus: "Ga-Rankuwa",
      careerOpportunities: [
        "Assessment, diagnosis, and treatment of individuals with communication, speech, language, and swallowing disorders",
        "Private practice",
        "Private hospitals",
        "Government hospitals",
        "Rural clinics",
        "Tertiary institutions",
        "Schools",
        "Industries",
        "Communities",
        "Home environments",
      ],
    },
    {
      id: "smu-bsc-dietetics",
      name: "Bachelor of Science in Dietetics (BSc Dietetics)",
      faculty: "Health Sciences",
      apsMin: 25,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
        English: 4,
      },
      requirements: [
        "Minimum APS score of 25",
        "Mathematics: Level 4",
        "Physical Sciences: Level 4",
        "Life Sciences: Level 4",
        "English: Level 4",
        "Additional Subject 1: Level 3",
        "Additional Subject 2: Level 3",
        "Life Orientation: Level 3",
        "Includes thirty-four weeks of integrated internship, of which twenty-three weeks are continuous during the fourth year",
        "Upon completion, students are required to complete one year of community service",
      ],
      campus: "Ga-Rankuwa",
      careerOpportunities: [
        "Hospitals and health care centers providing nutritional care",
        "Medical and pharmaceutical companies manufacturing specialized nutrition products",
        "Food services and catering companies",
        "Private practice providing individualized dietary care",
        "Community nutrition services",
        "Research and development",
        "Food industry",
      ],
    },
    {
      id: "smu-b-rad",
      name: "Bachelor of Diagnostic Radiography (B RAD)",
      faculty: "Health Sciences",
      apsMin: 16, // Minimum of 4 in each of the 4 required subjects
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
        English: 4,
      },
      requirements: [
        "Minimum APS score of 16 (minimum of 4 in each of the 4 required subjects)",
        "Mathematics: Level 4",
        "Physical Sciences: Level 4",
        "Life Sciences: Level 4",
        "English: Level 4",
        "Life Orientation: Level 3",
        "Other subjects with minimum points of 6",
        "Clinical training is done at accredited hospitals in Gauteng, Limpopo and North West provinces",
      ],
      campus: "Ga-Rankuwa",
      careerOpportunities: [
        "Public hospitals",
        "Private hospitals",
        "Mining industry",
        "Radiography Education",
        "Self-employment",
        "Corporate (Marketing App Specialist)",
        "Specialization in Ultrasonography, Mammography, Radiotherapy, Nuclear Medicine",
        "Advanced studies in Computed Tomography, MRI, etc.",
      ],
    },

    // Emergency Medical Care
    {
      id: "smu-dip-emc",
      name: "Diploma in Emergency Medical Care (DIP EMC)",
      faculty: "Health Sciences",
      apsMin: 18,
      duration: "2 years",
      subjectRequirements: {
        English: 3,
        Mathematics: 3,
        "Life Sciences": 3,
        "Physical Sciences": 3,
      },
      requirements: [
        "Minimum APS score of 18",
        "English: Level 3",
        "Mathematics: Level 3",
        "Life Sciences: Level 3",
        "Physical Sciences: Level 3",
        "Additional Subject 1: Level 3",
        "Additional Subject 2: Level 3",
        "Must pass Medical Fitness and Physical Fitness Evaluations",
      ],
      campus: "Ga-Rankuwa",
      careerOpportunities: [
        "Mid-level emergency care worker in Emergency Medical Services (EMS)",
        "Registration with the HPCSA as a Paramedic",
        "Professional and personal development to a bachelor's degree in Emergency Medical Care (EMC)",
      ],
    },
    {
      id: "smu-hcert-emc",
      name: "Higher Certificate in Emergency Medical Care (HCERT EMC)",
      faculty: "Health Sciences",
      apsMin: 15,
      duration: "1 year",
      subjectRequirements: {
        English: 3,
        Mathematics: 3,
        "Life Sciences": 3,
      },
      requirements: [
        "Minimum APS score of 15",
        "English: Level 3",
        "Mathematics: Level 3 or Mathematical Literacy: Level 4",
        "Life Sciences: Level 3 and/or Physical Sciences: Level 3",
        "Additional Subject 1: Level 3",
        "Additional Subject 2: Level 3",
        "Must pass Medical Fitness and Physical Fitness Evaluations",
      ],
      campus: "Ga-Rankuwa",
      careerOpportunities: [
        "Entry-level emergency care worker in Emergency Medical Services (EMS)",
        "Registration with the HPCSA as an Emergency Care Assistant (ECA)",
        "Professional and personal development to a Diploma in EMC and a bachelor's degree in EMC",
      ],
    },

    // School of Science and Technology
    {
      id: "smu-bsc",
      name: "Bachelor of Science (BSc)",
      faculty: "Science and Technology",
      apsMin: 0, // Not explicitly specified in the document
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 4,
        "Life Sciences": 4,
        English: 4,
      },
      requirements: [
        "Mathematics: Level 5",
        "Physical Sciences: Level 4",
        "Life Sciences: Level 4",
        "English: Level 4",
        "Two other NSC subjects with a minimum NSC score of 4 each",
      ],
      campus: "Ga-Rankuwa",
      careerOpportunities: [
        "Chemistry and Chemical Technology: Academic institutions, pharmaceutical, mining, manufacturing, government, and private laboratories",
        "Biochemistry and Chemical Technology: Teaching, research, quality control, sales production, agricultural/crop development, pharmaceuticals, water treatment, food industries",
        "Mathematics and Applied Mathematics: Teaching, research, engineering, ICT, computer programming, system analysis",
        "Statistics and Operations Research: Teaching, research, consulting, financial institutions, census offices, market research",
        "Computer Science: Programming, system analysis, database management, network specialists, ICT",
        "Physics: Teaching, research, medical physics, nuclear physics, engineering, industry",
        "Biology and Environmental Sciences: Nature conservation, education, government departments, laboratories, private sector",
      ],
    },
    {
      id: "smu-bsc-ecp",
      name: "Bachelor of Science - Extended Curriculum Programme (BSc-ECP)",
      faculty: "Science and Technology",
      apsMin: 0, // Not explicitly specified in the document
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
        English: 4,
      },
      requirements: [
        "Mathematics: Level 4",
        "Physical Sciences: Level 4",
        "Life Sciences: Level 4",
        "English: Level 4",
        "Two other NSC subjects with a minimum NSC score of 4 each",
      ],
      campus: "Ga-Rankuwa",
      careerOpportunities: [
        "Chemistry and Chemical Technology: Academic institutions, pharmaceutical, mining, manufacturing, government, and private laboratories",
        "Biochemistry and Chemical Technology: Teaching, research, quality control, sales production, agricultural/crop development, pharmaceuticals, water treatment, food industries",
        "Mathematics and Applied Mathematics: Teaching, research, engineering, ICT, computer programming, system analysis",
        "Statistics and Operations Research: Teaching, research, consulting, financial institutions, census offices, market research",
        "Computer Science: Programming, system analysis, database management, network specialists, ICT",
        "Physics: Teaching, research, medical physics, nuclear physics, engineering, industry",
        "Biology and Environmental Sciences: Nature conservation, education, government departments, laboratories, private sector",
      ],
    },
  ]

  /**
   * SMU has specific selection processes for many programs, especially in Medicine and Dentistry.
   * For example, the BPharm selection process includes:
   *
   * 1. 90% of students from:
   *    - Pre-selected students who maintained their performance
   *    - Students selected from the remaining pool of applicants
   * 2. 4% who have completed their first degree at SMU
   * 3. 4% who have excelled in BSc or equivalent first-year courses at SMU
   * 4. 2% who have completed a first degree at another University
   *
   * Many programs also have alternative admission routes for mature students, graduates, and transfer students.
   */

  /**
   * Get courses by faculty
   * @param faculty Faculty name
   * @returns Array of courses in the specified faculty
   */
  getCoursesByFaculty(faculty: string): Course[] {
    return this._courses.filter((course) => course.faculty === faculty)
  }

  /**
   * Get all faculties
   * @returns Array of faculty names
   */
  get faculties(): string[] {
    return Array.from(new Set(this._courses.map((course) => course.faculty).filter(Boolean)))
  }

  /**
   * SMU-specific APS calculation
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