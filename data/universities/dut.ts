import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * Durban University of Technology (DUT) class
 */
export class DUT extends BaseUniversity {
  readonly id = "dut"
  readonly name = "Durban University of Technology"
  readonly shortName = "DUT"
  readonly website = "https://www.dut.ac.za"
  readonly logo = "/logos/dut.png"
  readonly location = {
    city: "Durban",
    province: "KwaZulu-Natal",
    coordinates: {
      latitude: -29.8536,
      longitude: 31.0066,
    },
  }

  /**
   * Calculate APS score based on DUT's requirements
   * DUT uses NSC points system where each subject level contributes to the total
   */
  calculateAPSScore(subjects: Record<string, number>): number {
    // Filter out Life Orientation as per standard practice
    const filteredSubjects = Object.entries(subjects).filter(
      ([subject]) => subject.toLowerCase() !== "life orientation",
    )

    // Calculate total APS from subject levels
    const totalAPS = filteredSubjects.reduce((total, [_, level]) => total + level, 0)

    return totalAPS
  }

  protected readonly _courses: Course[] = [
    // Faculty of Accounting and Informatics
    {
      id: "dut-bict",
      name: "Bachelor of Information and Communications Technology",
      faculty: "Accounting and Informatics",
      department: "Information Technology",
      apsMin: 28,
      duration: "3 years",
      location: "Durban",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 4,
      },
      additionalRequirements:
        "At least three of the designated 20 credit subjects at level 4 (not more than one language)",
      careers: "Software development, systems analysis, network administration, IT management",
    },
    {
      id: "dut-bict-iot",
      name: "Bachelor of ICT: Internet of Things (IoT)",
      faculty: "Accounting and Informatics",
      department: "Information Technology",
      apsMin: 28,
      duration: "3 years",
      location: "Durban",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Information Technology": 4,
      },
      additionalRequirements:
        "Physical Sciences OR Information Technology at level 4, and two designated 20 credit subjects at level 4 (not more than one language)",
      careers: "IoT specialist, embedded systems developer, smart systems engineer",
    },
    {
      id: "dut-dip-app-dev",
      name: "Diploma ICT: Applications Development",
      faculty: "Accounting and Informatics",
      department: "Information Technology",
      apsMin: 25,
      duration: "3 years",
      location: "Durban",
      subjectRequirements: {
        "English Home Language": 3,
        "English First Additional Language": 4,
        Mathematics: 3,
        "Mathematical Literacy": 6,
      },
      additionalRequirements: "Three 20 credit subjects (not more than one language) at level 3",
      careers: "Software developer, programmer, web developer, mobile app developer",
    },
    {
      id: "dut-dip-app-dev-indumiso",
      name: "Diploma ICT: Applications Development (Indumiso)",
      faculty: "Accounting and Informatics",
      department: "Information Technology",
      apsMin: 25,
      duration: "3 years",
      location: "Pietermaritzburg (Indumiso)",
      subjectRequirements: {
        "English Home Language": 3,
        "English First Additional Language": 4,
        Mathematics: 3,
        "Mathematical Literacy": 6,
      },
      additionalRequirements: "Three 20 credit subjects (not more than one language) at level 3",
      careers: "Software developer, programmer, web developer, mobile app developer",
    },
    {
      id: "dut-dip-business-analysis",
      name: "Diploma ICT: Business Analysis",
      faculty: "Accounting and Informatics",
      department: "Information Technology",
      apsMin: 25,
      duration: "3 years",
      location: "Durban",
      subjectRequirements: {
        "English Home Language": 3,
        "English First Additional Language": 4,
        Mathematics: 3,
        "Mathematical Literacy": 6,
      },
      additionalRequirements: "Three 20 credit subjects (not more than one language) at level 3",
      careers: "Business analyst, systems analyst, IT consultant",
    },
    {
      id: "dut-dip-business-info-management",
      name: "Diploma Business & Information Management",
      faculty: "Accounting and Informatics",
      department: "Information and Corporate Management",
      apsMin: 24,
      duration: "3 years",
      location: "Durban",
      subjectRequirements: {
        "English Home Language": 3,
        "English First Additional Language": 4,
        Mathematics: 3,
        "Mathematical Literacy": 4,
      },
      additionalRequirements:
        "Four 20 credit subjects (excluding Life Orientation & not more than one language) at level 3",
      careers: "Information manager, business administrator, office manager",
    },
    {
      id: "dut-dip-accounting",
      name: "Diploma in Accounting",
      faculty: "Accounting and Informatics",
      department: "Financial Accounting",
      apsMin: 25,
      duration: "3 years",
      location: "Durban",
      subjectRequirements: {
        "English Home Language": 3,
        "English First Additional Language": 4,
        Mathematics: 3,
        "Mathematical Literacy": 5,
        Accounting: 4,
      },
      additionalRequirements:
        "Mathematics 3 OR Mathematical Literacy 5 OR Accounting 4, and three 20 credit subjects (not more than one language) at level 3",
      careers: "Accountant, financial administrator, bookkeeper, auditing clerk",
    },
    {
      id: "dut-dip-internal-auditing",
      name: "Diploma in Internal Auditing",
      faculty: "Accounting and Informatics",
      department: "Auditing and Taxation",
      apsMin: 25,
      duration: "3 years",
      location: "Durban",
      subjectRequirements: {
        "English Home Language": 3,
        "English First Additional Language": 4,
        Mathematics: 4,
        "Mathematical Literacy": 5,
        Accounting: 4,
      },
      additionalRequirements:
        "Mathematics 4 OR (Mathematics 3/Mathematical Literacy 5 AND Accounting 4), and three 20 credit subjects (not more than one language) at level 3",
      careers: "Internal auditor, risk management officer, compliance officer",
    },
    {
      id: "dut-dip-management-accounting",
      name: "Diploma in Management Accounting",
      faculty: "Accounting and Informatics",
      department: "Management Accounting",
      apsMin: 25,
      duration: "3 years",
      location: "Durban",
      subjectRequirements: {
        "English Home Language": 3,
        "English First Additional Language": 4,
        Mathematics: 3,
        "Mathematical Literacy": 5,
        Accounting: 4,
      },
      additionalRequirements:
        "Mathematics 3 OR Accounting 4 OR (Mathematical Literacy 5 AND Accounting 4), and three 20 credit subjects at level 3",
      careers: "Management accountant, cost accountant, financial manager",
    },

    // Faculty of Applied Sciences
    {
      id: "dut-bachelor-biotechnology",
      name: "Bachelor of Applied Science in Biotechnology",
      faculty: "Applied Sciences",
      department: "Biotechnology and Food Science",
      apsMin: 28,
      duration: "3 years",
      location: "Durban",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Life Sciences": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: "One additional 20 credit subject at level 4 (not more than one language)",
      careers: "Biotechnologist, laboratory technician, research scientist, quality control analyst",
    },
    {
      id: "dut-bachelor-food-science",
      name: "Bachelor of Applied Science in Food Science and Technology",
      faculty: "Applied Sciences",
      department: "Biotechnology and Food Science",
      apsMin: 28,
      duration: "3 years",
      location: "Durban",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Life Sciences": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: "One additional 20 credit subject at level 4 (not more than one language)",
      careers: "Food technologist, quality assurance manager, product developer, food safety specialist",
    },
    {
      id: "dut-dip-analytical-chemistry",
      name: "Diploma in Analytical Chemistry",
      faculty: "Applied Sciences",
      department: "Chemistry",
      apsMin: 25,
      duration: "3 years",
      location: "Durban",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 3,
      },
      additionalRequirements: "Two additional 20 credit subjects at level 3",
      careers: "Analytical chemist, laboratory technician, quality control analyst",
    },
    {
      id: "dut-dip-consumer-sciences",
      name: "Diploma in Consumer Sciences in Food and Nutrition",
      faculty: "Applied Sciences",
      department: "Food and Nutrition",
      apsMin: 24,
      duration: "3 years",
      location: "Durban",
      subjectRequirements: {
        "English Home Language": 3,
        "English First Additional Language": 4,
        Mathematics: 3,
        "Mathematical Literacy": 4,
      },
      additionalRequirements:
        "One of Accounting, Business Studies, Consumer Studies, Physical Sciences or Life Sciences at level 3, and three 20 credit subjects (not more than one language) at level 3",
      careers: "Food and nutrition advisor, consumer scientist, food service manager",
    },

    // Faculty of Engineering and the Built Environment
    {
      id: "dut-bachelor-civil-engineering",
      name: "Bachelor of Engineering Technology in Civil Engineering",
      faculty: "Engineering and the Built Environment",
      department: "Civil Engineering",
      apsMin: 28,
      duration: "3 years",
      location: "Durban",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
      additionalRequirements:
        "Technical Mathematics 5 can substitute for Mathematics 4, and Technical Sciences 5 can substitute for Physical Sciences 4. Three additional 20 credit subjects (not more than one language) at level 4",
      careers: "Civil engineer, structural engineer, construction manager, project manager",
    },
    {
      id: "dut-bachelor-mechanical-engineering",
      name: "Bachelor of Engineering Technology in Mechanical Engineering",
      faculty: "Engineering and the Built Environment",
      department: "Mechanical Engineering",
      apsMin: 28,
      duration: "3 years",
      location: "Durban",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
      additionalRequirements:
        "Technical Mathematics 5 can substitute for Mathematics 4, and Technical Sciences 5 can substitute for Physical Sciences 4. Three additional 20 credit subjects (not more than one language) at level 4",
      careers: "Mechanical engineer, design engineer, manufacturing engineer, project manager",
    },
    {
      id: "dut-bachelor-architecture",
      name: "Bachelor of the Built Environment in Architecture",
      faculty: "Engineering and the Built Environment",
      department: "Architecture",
      apsMin: 28,
      duration: "3 years",
      location: "Durban",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 4,
      },
      additionalRequirements: "Three additional 20 credit subjects at level 4 (not more than one language)",
      careers: "Architectural technologist, architectural designer, building designer",
    },

    // Faculty of Health Sciences
    {
      id: "dut-bachelor-nursing",
      name: "Bachelor in Nursing",
      faculty: "Health Sciences",
      department: "Nursing",
      apsMin: 28,
      duration: "4 years",
      location: "Pietermaritzburg (Indumiso)",
      subjectRequirements: {
        English: 4,
        "Life Sciences": 4,
        Mathematics: 4,
        "Mathematical Literacy": 6,
        "Physical Sciences": 4,
      },
      additionalRequirements:
        "Mathematics 4 OR Mathematical Literacy 6 OR Physical Sciences 4, and two additional 20 credit subjects (only one of which may be an additional language) at level 4",
      careers: "Registered nurse, healthcare practitioner, clinical specialist",
    },
    {
      id: "dut-bachelor-radiography",
      name: "Bachelor of Health Sciences in Radiography: Diagnostic",
      faculty: "Health Sciences",
      department: "Radiography",
      apsMin: 28,
      duration: "4 years",
      location: "Durban",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Life Sciences": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: "One additional 20 credit subject (not more than one language) at level 4",
      careers: "Diagnostic radiographer, medical imaging specialist",
    },
    {
      id: "dut-dip-somatology",
      name: "Diploma in Somatology",
      faculty: "Health Sciences",
      department: "Somatology",
      apsMin: 24,
      duration: "3 years",
      location: "Durban",
      subjectRequirements: {
        "English Home Language": 3,
        "English First Additional Language": 3,
        "Life Sciences": 4,
        Mathematics: 3,
        "Mathematical Literacy": 5,
      },
      additionalRequirements: "Two additional 20 credit subjects (only one of which may be a language) at level 3",
      careers: "Somatologist, skincare therapist, spa manager, wellness consultant",
    },

    // Faculty of Management Sciences
    {
      id: "dut-dip-management-business-admin",
      name: "Diploma in Management Sciences: Business Administration",
      faculty: "Management Sciences",
      department: "Business Administration",
      apsMin: 25,
      duration: "3 years",
      location: "Durban",
      subjectRequirements: {
        "English Home Language": 3,
        "English First Additional Language": 4,
        Mathematics: 3,
        "Mathematical Literacy": 4,
      },
      additionalRequirements: "Three additional 20 credit subjects (not more than one language) at level 3",
      careers: "Business administrator, office manager, operations coordinator",
    },
    {
      id: "dut-dip-management-human-resources",
      name: "Diploma in Management Sciences: Human Resources",
      faculty: "Management Sciences",
      department: "Human Resources",
      apsMin: 25,
      duration: "3 years",
      location: "Durban",
      subjectRequirements: {
        "English Home Language": 3,
        "English First Additional Language": 4,
        Mathematics: 3,
        "Mathematical Literacy": 4,
      },
      additionalRequirements: "Three additional 20 credit subjects (not more than one language) at level 3",
      careers: "HR officer, recruitment specialist, training coordinator, employee relations officer",
    },
    {
      id: "dut-dip-management-marketing",
      name: "Diploma in Management Sciences: Marketing",
      faculty: "Management Sciences",
      department: "Marketing",
      apsMin: 25,
      duration: "3 years",
      location: "Durban",
      subjectRequirements: {
        "English Home Language": 3,
        "English First Additional Language": 4,
        Mathematics: 3,
        "Mathematical Literacy": 4,
      },
      additionalRequirements: "Three additional 20 credit subjects (not more than one language) at level 3",
      careers: "Marketing coordinator, brand assistant, sales representative, digital marketing specialist",
    },
    {
      id: "dut-dip-tourism-management",
      name: "Diploma in Tourism Management",
      faculty: "Management Sciences",
      department: "Tourism and Hospitality",
      apsMin: 26,
      duration: "3 years",
      location: "Durban",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 2,
        "Mathematical Literacy": 3,
        Accounting: 3,
      },
      additionalRequirements:
        "Mathematics 2 OR Mathematical Literacy 3 OR Accounting 3, and three additional 20 credit subjects (not more than one language) at level 3",
      careers: "Tourism manager, tour operator, travel consultant, destination manager",
    },
    {
      id: "dut-dip-hospitality-management",
      name: "Diploma in Hospitality Management",
      faculty: "Management Sciences",
      department: "Tourism and Hospitality",
      apsMin: 24,
      duration: "3 years",
      location: "Durban",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 2,
        "Mathematical Literacy": 3,
        Accounting: 3,
      },
      additionalRequirements:
        "Mathematics 2 OR Mathematical Literacy 3 OR Accounting 3, and three additional 20 credit subjects (not more than one language) at level 3",
      careers: "Hotel manager, food and beverage manager, events coordinator, guest relations manager",
    },

    // Faculty of Arts and Design
    {
      id: "dut-bachelor-journalism",
      name: "Bachelor of Journalism",
      faculty: "Arts and Design",
      department: "Media, Language and Communication",
      apsMin: 28,
      duration: "3 years",
      location: "Durban",
      subjectRequirements: {
        English: 5,
        "Another Official Language": 4,
      },
      additionalRequirements: "Three additional 20 credit subjects at level 4",
      careers: "Journalist, reporter, editor, content creator, media specialist",
    },
    {
      id: "dut-dip-fashion-design",
      name: "Diploma in Fashion Design",
      faculty: "Arts and Design",
      department: "Fashion and Textiles",
      apsMin: 24,
      duration: "3 years",
      location: "Durban",
      subjectRequirements: {
        English: 3,
      },
      additionalRequirements: "Four additional 20 credit subjects (not more than one language) at level 3",
      careers: "Fashion designer, pattern maker, fashion buyer, stylist, fashion merchandiser",
    },
    {
      id: "dut-dip-fine-art",
      name: "Diploma in Fine Art",
      faculty: "Arts and Design",
      department: "Fine Art and Jewelry Design",
      apsMin: 24,
      duration: "3 years",
      location: "Durban",
      subjectRequirements: {
        English: 3,
      },
      additionalRequirements: "Four additional 20 credit subjects (not more than one language) at level 3",
      careers: "Artist, art educator, gallery curator, art director",
    },
  ]
}
