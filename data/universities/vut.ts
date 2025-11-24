import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * Vaal University of Technology (VUT) class
 */
export class VUT extends BaseUniversity {
  readonly id = "vut"
  readonly name = "Vaal University of Technology"
  readonly shortName = "VUT"
  readonly website = "https://www.vut.ac.za"
  readonly logo = "/logos/vut.png"
  readonly location = {
    city: "Vanderbijlpark",
    province: "Gauteng",
    coordinates: {
      latitude: -26.7091,
      longitude: 27.8543,
    },
  }

  protected readonly _courses: Course[] = [
    // Faculty of Applied & Computer Sciences
    {
      id: "vut-dip-analytical-chemistry",
      name: "Diploma in Analytical Chemistry",
      faculty: "Applied & Computer Sciences",
      department: "Natural Sciences",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
      additionalRequirements:
        "Technical Mathematics (4) can be used instead of Mathematics. Engineering Mathematics (TVET N4) with 60% can be used instead of Mathematics. Engineering Sciences (TVET N4) with 60% can be used instead of Physical Sciences.",
    },
    {
      id: "vut-dip-agricultural-management",
      name: "Diploma in Agricultural Management",
      faculty: "Applied & Computer Sciences",
      department: "Natural Sciences",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
      },
      additionalRequirements:
        "Technical Mathematics (3) can be used instead of Mathematics. Mathematical Literacy (4) can be used instead of Mathematics (APS increases to 22). Agriculture/Life Science (3) is required.",
      careerOpportunities: "Agricultural management, farming operations, agribusiness",
    },
    {
      id: "vut-dip-biotechnology",
      name: "Diploma in Biotechnology",
      faculty: "Applied & Computer Sciences",
      department: "Natural Sciences",
      apsMin: 23,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
      additionalRequirements:
        "Engineering Mathematics (60%) can be used instead of Mathematics. Engineering Science (60%) can be used instead of Physical Sciences.",
    },
    {
      id: "vut-dip-non-destructive-testing",
      name: "Diploma in Non-Destructive Testing",
      faculty: "Applied & Computer Sciences",
      department: "Applied Physical Sciences",
      apsMin: 19,
      duration: "3 years",
      subjectRequirements: {
        English: 3,
        Mathematics: 3,
        "Physical Sciences": 4,
      },
      additionalRequirements:
        "Technical Mathematics (3) can be used instead of Mathematics. Technical Science (4) can be used instead of Physical Sciences.",
    },
    {
      id: "vut-dip-information-technology",
      name: "Diploma in Information Technology",
      faculty: "Applied & Computer Sciences",
      department: "Computer Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
      },
      additionalRequirements:
        "Technical Mathematics (4) or Information Technology (4) can be used instead of Mathematics. Mathematical Literacy (6) can be used instead of Mathematics (APS increases to 26).",
      careerOpportunities: "Software development, IT support, systems analysis",
    },
    {
      id: "vut-dip-environmental-science",
      name: "Diploma in Environmental Science",
      faculty: "Applied & Computer Sciences",
      department: "Natural Sciences",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "vut-bhsc-medical-lab-science",
      name: "Bachelor of Health Sciences: Medical Laboratory Science",
      faculty: "Applied & Computer Sciences",
      department: "Health Sciences",
      apsMin: 27,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 5,
      },
      additionalRequirements:
        "Applicants may be required to have industrial knowledge (i.e. job shadowing) and may undergo placement testing.",
    },

    // Faculty of Management Sciences
    {
      id: "vut-dip-financial-info-systems",
      name: "Diploma in Financial Information Systems",
      faculty: "Management Sciences",
      department: "Accountancy",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Accounting: 4,
        Mathematics: 3,
      },
      additionalRequirements:
        "Technical Mathematics (3) can be used instead of Mathematics. Mathematical Literacy (5) can be used instead of Mathematics (APS increases to 22).",
    },
    {
      id: "vut-dip-cost-management-accounting",
      name: "Diploma in Cost & Management Accounting",
      faculty: "Management Sciences",
      department: "Accountancy",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Accounting: 4,
        Mathematics: 3,
      },
      additionalRequirements:
        "Technical Mathematics (3) can be used instead of Mathematics. Mathematical Literacy (5) can be used instead of Mathematics (APS increases to 22).",
    },
    {
      id: "vut-dip-internal-auditing",
      name: "Diploma in Internal Auditing",
      faculty: "Management Sciences",
      department: "Accountancy",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Accounting: 4,
        Mathematics: 3,
      },
      additionalRequirements:
        "Technical Mathematics (3) can be used instead of Mathematics. Mathematical Literacy (6) can be used instead of Mathematics (APS increases to 23).",
    },
    {
      id: "vut-dip-human-resources-management",
      name: "Diploma in Human Resources Management",
      faculty: "Management Sciences",
      department: "Human Resources Management",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
      },
      additionalRequirements:
        "Technical Mathematics (3) can be used instead of Mathematics. Mathematical Literacy (4) can be used instead of Mathematics (APS increases to 21). One other subject (4) is required.",
    },
    {
      id: "vut-dip-logistics-supply-chain-management",
      name: "Diploma in Logistics and Supply Chain Management",
      faculty: "Management Sciences",
      department: "Logistics and Supply Chain Management",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
      },
      additionalRequirements:
        "Technical Mathematics (3) can be used instead of Mathematics. Mathematical Literacy (4) can be used instead of Mathematics (APS increases to 21). One other subject (4) is required.",
    },
    {
      id: "vut-dip-marketing",
      name: "Diploma in Marketing",
      faculty: "Management Sciences",
      department: "Marketing, Retail Business & Sport Management",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
      },
      additionalRequirements:
        "Technical Mathematics (3) can be used instead of Mathematics. Mathematical Literacy (4) can be used instead of Mathematics (APS increases to 21). One other subject (4) is required.",
    },
    {
      id: "vut-dip-retail-business-management",
      name: "Diploma in Retail Business Management",
      faculty: "Management Sciences",
      department: "Marketing, Retail Business & Sport Management",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
      },
      additionalRequirements:
        "Technical Mathematics (3) can be used instead of Mathematics. Mathematical Literacy (4) can be used instead of Mathematics (APS increases to 21). One other subject (4) is required.",
    },
    {
      id: "vut-dip-sport-management",
      name: "Diploma in Sport Management",
      faculty: "Management Sciences",
      department: "Marketing, Retail Business & Sport Management",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
      },
      additionalRequirements:
        "Technical Mathematics (3) can be used instead of Mathematics. Mathematical Literacy (4) can be used instead of Mathematics (APS increases to 21). One other subject (4) is required.",
    },

    // Faculty of Human Sciences
    {
      id: "vut-dip-fashion",
      name: "Diploma in Fashion",
      faculty: "Human Sciences",
      department: "Visual Arts and Design",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 2,
      },
      additionalRequirements:
        "Technical Mathematics (2) can be used instead of Mathematics. Mathematical Literacy (3) can be used instead of Mathematics (APS increases to 22). Additional compulsory selection criteria: Practical interview and portfolio submission.",
    },
    {
      id: "vut-dip-graphic-design",
      name: "Diploma in Graphic Design",
      faculty: "Human Sciences",
      department: "Visual Arts and Design",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 2,
      },
      additionalRequirements:
        "Technical Mathematics (2) can be used instead of Mathematics. Mathematical Literacy (3) can be used instead of Mathematics (APS increases to 22). Additional compulsory selection criteria: Practical interview and portfolio submission.",
    },
    {
      id: "vut-dip-fine-art",
      name: "Diploma in Fine Art",
      faculty: "Human Sciences",
      department: "Visual Arts and Design",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 2,
      },
      additionalRequirements:
        "Technical Mathematics (2) can be used instead of Mathematics. Mathematical Literacy (3) can be used instead of Mathematics (APS increases to 22). Additional compulsory selection criteria: Practical interview and portfolio submission.",
    },
    {
      id: "vut-dip-photography",
      name: "Diploma in Photography",
      faculty: "Human Sciences",
      department: "Visual Arts and Design",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 2,
      },
      additionalRequirements:
        "Technical Mathematics (2) can be used instead of Mathematics. Mathematical Literacy (3) can be used instead of Mathematics (APS increases to 22). Additional compulsory selection criteria: Practical interview and portfolio submission.",
    },
    {
      id: "vut-dip-food-service-management",
      name: "Diploma in Food Service Management",
      faculty: "Human Sciences",
      department: "Hospitality and Tourism",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
      },
      additionalRequirements:
        "Technical Mathematics (3) can be used instead of Mathematics. Mathematical Literacy (4) can be used instead of Mathematics (APS increases to 21). One other subject (4) from Hospitality, Hotel, Tourism, Catering, Accounting, Business Studies & Consumer Studies is required. A branded uniform is compulsory to wear during practicals.",
    },
    {
      id: "vut-dip-public-relations",
      name: "Diploma in Public Relations",
      faculty: "Human Sciences",
      department: "Communication",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
      },
      additionalRequirements:
        "Technical Mathematics (3) can be used instead of Mathematics. Mathematical Literacy (4) can be used instead of Mathematics (APS increases to 21). Other Language (4) is required.",
    },
    {
      id: "vut-dip-tourism-management",
      name: "Diploma in Tourism Management",
      faculty: "Human Sciences",
      department: "Hospitality and Tourism",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
      },
      additionalRequirements:
        "Technical Mathematics (3) can be used instead of Mathematics. Mathematical Literacy (4) can be used instead of Mathematics (APS increases to 21). One compulsory subject (4) from Tourism, Geography, Business Studies & History is required.",
    },
    {
      id: "vut-dip-ecotourism-management",
      name: "Diploma in Ecotourism Management",
      faculty: "Human Sciences",
      department: "Hospitality and Tourism",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
        "Life Sciences": 4,
      },
      additionalRequirements:
        "Technical Mathematics (3) can be used instead of Mathematics. Mathematical Literacy (4) can be used instead of Mathematics (APS increases to 21).",
    },
    {
      id: "vut-dip-labour-law",
      name: "Diploma in Labour Law",
      faculty: "Human Sciences",
      department: "Legal Sciences",
      apsMin: 23,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 3,
      },
      additionalRequirements:
        "Technical Mathematics (3) can be used instead of Mathematics. Mathematical Literacy (4) can be used instead of Mathematics (APS increases to 24). Other Language (3) is required.",
    },
    {
      id: "vut-dip-legal-assistance",
      name: "Diploma in Legal Assistance",
      faculty: "Human Sciences",
      department: "Legal Sciences",
      apsMin: 23,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 3,
      },
      additionalRequirements:
        "Technical Mathematics (3) can be used instead of Mathematics. Mathematical Literacy (4) can be used instead of Mathematics (APS increases to 24). Other Language (3) is required.",
    },
    {
      id: "vut-dip-safety-management",
      name: "Diploma in Safety Management",
      faculty: "Human Sciences",
      department: "Applied Sciences",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
      },
      additionalRequirements:
        "Technical Mathematics (3) can be used instead of Mathematics. Mathematical Literacy (4) can be used instead of Mathematics (APS increases to 21). Other Language (3) is required.",
    },
    {
      id: "vut-dip-policing",
      name: "Diploma in Policing",
      faculty: "Human Sciences",
      department: "Legal Sciences",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
      },
      additionalRequirements:
        "Technical Mathematics (3) can be used instead of Mathematics. Mathematical Literacy (4) can be used instead of Mathematics (APS increases to 21). Other Language (4) is required.",
    },
    {
      id: "vut-b-communication-studies",
      name: "Bachelor of Communication Studies",
      faculty: "Human Sciences",
      department: "Communication",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 3,
      },
      additionalRequirements:
        "Technical Mathematics (3) can be used instead of Mathematics. Mathematical Literacy (4) can be used instead of Mathematics (APS increases to 21). Additional Language (4) is required.",
    },
    {
      id: "vut-bed-senior-phase-fet",
      name: "Bachelor of Education (Senior Phase & FET Teaching)",
      faculty: "Human Sciences",
      department: "Education",
      apsMin: 22,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 3,
      },
      additionalRequirements:
        "Technical Mathematics (4) can be used instead of Mathematics. Mathematical Literacy (6) can be used instead of Mathematics (APS increases to 24). Technical Science (3) can be used instead of Physical Sciences.",
    },

    // Faculty of Engineering & Technology
    {
      id: "vut-dip-chemical-engineering",
      name: "Diploma in Chemical Engineering",
      faculty: "Engineering & Technology",
      department: "Chemical Engineering",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "vut-dip-civil-engineering",
      name: "Diploma in Civil Engineering",
      faculty: "Engineering & Technology",
      department: "Civil Engineering",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "vut-dip-industrial-engineering",
      name: "Diploma in Industrial Engineering",
      faculty: "Engineering & Technology",
      department: "Industrial Engineering",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "vut-dip-mechanical-engineering",
      name: "Diploma in Mechanical Engineering",
      faculty: "Engineering & Technology",
      department: "Mechanical Engineering",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "vut-dip-metallurgical-engineering",
      name: "Diploma in Metallurgical Engineering",
      faculty: "Engineering & Technology",
      department: "Metallurgical Engineering",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "vut-dip-electronic-engineering",
      name: "Diploma in Electronic Engineering",
      faculty: "Engineering & Technology",
      department: "Electrical Engineering",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "vut-dip-power-engineering",
      name: "Diploma in Power Engineering",
      faculty: "Engineering & Technology",
      department: "Electrical Engineering",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "vut-dip-process-control-engineering",
      name: "Diploma in Process Control Engineering",
      faculty: "Engineering & Technology",
      department: "Electrical Engineering",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "vut-dip-computer-systems-engineering",
      name: "Diploma in Computer Systems Engineering",
      faculty: "Engineering & Technology",
      department: "Electrical Engineering",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "vut-dip-operations-management",
      name: "Diploma in Operations Management",
      faculty: "Engineering & Technology",
      department: "Industrial Engineering",
      apsMin: 23,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Physical Sciences": 3,
      },
    },
    // Extended Programs (4-year variants)
    {
      id: "vut-dip-chemical-engineering-extended",
      name: "Diploma in Chemical Engineering (Extended)",
      faculty: "Engineering & Technology",
      department: "Chemical Engineering",
      apsMin: 22,
      duration: "4 years",
      subjectRequirements: {
        English: 3,
        Mathematics: 3,
        "Physical Sciences": 3,
      },
    },
    {
      id: "vut-dip-civil-engineering-extended",
      name: "Diploma in Civil Engineering (Extended)",
      faculty: "Engineering & Technology",
      department: "Civil Engineering",
      apsMin: 22,
      duration: "4 years",
      subjectRequirements: {
        English: 3,
        Mathematics: 3,
        "Physical Sciences": 3,
      },
    },
    {
      id: "vut-dip-industrial-engineering-extended",
      name: "Diploma in Industrial Engineering (Extended)",
      faculty: "Engineering & Technology",
      department: "Industrial Engineering",
      apsMin: 22,
      duration: "4 years",
      subjectRequirements: {
        English: 3,
        Mathematics: 3,
        "Physical Sciences": 3,
      },
    },
    {
      id: "vut-dip-mechanical-engineering-extended",
      name: "Diploma in Mechanical Engineering (Extended)",
      faculty: "Engineering & Technology",
      department: "Mechanical Engineering",
      apsMin: 22,
      duration: "4 years",
      subjectRequirements: {
        English: 3,
        Mathematics: 3,
        "Physical Sciences": 3,
      },
    },
    {
      id: "vut-dip-metallurgical-engineering-extended",
      name: "Diploma in Metallurgical Engineering (Extended)",
      faculty: "Engineering & Technology",
      department: "Metallurgical Engineering",
      apsMin: 22,
      duration: "4 years",
      subjectRequirements: {
        English: 3,
        Mathematics: 3,
        "Physical Sciences": 3,
      },
    },
    {
      id: "vut-dip-electronic-engineering-extended",
      name: "Diploma in Electronic Engineering (Extended)",
      faculty: "Engineering & Technology",
      department: "Electrical Engineering",
      apsMin: 22,
      duration: "4 years",
      subjectRequirements: {
        English: 3,
        Mathematics: 3,
        "Physical Sciences": 3,
      },
    },
    {
      id: "vut-dip-power-engineering-extended",
      name: "Diploma in Power Engineering (Extended)",
      faculty: "Engineering & Technology",
      department: "Electrical Engineering",
      apsMin: 22,
      duration: "4 years",
      subjectRequirements: {
        English: 3,
        Mathematics: 3,
        "Physical Sciences": 3,
      },
    },
    {
      id: "vut-dip-process-control-engineering-extended",
      name: "Diploma in Process Control Engineering (Extended)",
      faculty: "Engineering & Technology",
      department: "Electrical Engineering",
      apsMin: 22,
      duration: "4 years",
      subjectRequirements: {
        English: 3,
        Mathematics: 3,
        "Physical Sciences": 3,
      },
    },
    {
      id: "vut-dip-computer-systems-engineering-extended",
      name: "Diploma in Computer Systems Engineering (Extended)",
      faculty: "Engineering & Technology",
      department: "Electrical Engineering",
      apsMin: 22,
      duration: "4 years",
      subjectRequirements: {
        English: 3,
        Mathematics: 3,
        "Physical Sciences": 3,
      },
    },
  ]

  /**
   * VUT-specific APS calculation
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