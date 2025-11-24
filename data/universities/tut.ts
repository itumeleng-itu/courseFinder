import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * Tshwane University of Technology (TUT) class
 */
export class TUT extends BaseUniversity {
  readonly id = "tut"
  readonly name = "Tshwane University of Technology"
  readonly shortName = "TUT"
  readonly website = "https://www.tut.ac.za"
  readonly logo = "/logos/tut.png"
  readonly location = {
    city: "Pretoria",
    province: "Gauteng",
    coordinates: {
      latitude: -25.7312,
      longitude: 28.1642,
    },
  }

  protected readonly _courses: Course[] = [
    // Faculty of Arts and Design
    {
      id: "tut-dip-commercial-photography",
      name: "Diploma in Commercial Photography",
      faculty: "Arts and Design",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        English: 3,
      },
    },
    {
      id: "tut-dip-fashion-design",
      name: "Diploma in Fashion Design and Technology",
      faculty: "Arts and Design",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        English: 3,
      },
    },
    {
      id: "tut-dip-fine-applied-arts",
      name: "Diploma in Fine and Applied Arts",
      faculty: "Arts and Design",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        English: 3,
      },
    },
    {
      id: "tut-dip-integrated-communication-design",
      name: "Diploma in Integrated Communication Design",
      faculty: "Arts and Design",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "tut-dip-interior-design",
      name: "Diploma in Interior Design",
      faculty: "Arts and Design",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "tut-dip-jewellery-design",
      name: "Diploma in Jewellery Design and Manufacture",
      faculty: "Arts and Design",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        English: 3,
      },
    },
    {
      id: "tut-dip-motion-picture-production",
      name: "Diploma in Motion Picture Production",
      faculty: "Arts and Design",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "tut-dip-performing-arts-dance",
      name: "Diploma in Performing Arts (Dance)",
      faculty: "Arts and Design",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "tut-dip-performing-arts-jazz",
      name: "Diploma in Performing Arts (Jazz Music)",
      faculty: "Arts and Design",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "tut-dip-performing-arts-opera",
      name: "Diploma in Performing Arts (Opera)",
      faculty: "Arts and Design",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "tut-dip-performing-arts-technical",
      name: "Diploma in Performing Arts (Technical Theatre and Design)",
      faculty: "Arts and Design",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "tut-dip-performing-arts-theatre",
      name: "Diploma in Performing Arts (Theatre Arts and Performance)",
      faculty: "Arts and Design",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
      },
    },

    // Faculty of Economics and Finance
    {
      id: "tut-dip-accounting",
      name: "Diploma in Accounting",
      faculty: "Economics and Finance",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Accounting", level: 3 },
            { subject: "Mathematics", level: 3 },
            { subject: "Technical Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
    },
    {
      id: "tut-dip-economics",
      name: "Diploma in Economics",
      faculty: "Economics and Finance",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Technical Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 6 },
          ],
        },
      },
    },
    {
      id: "tut-dip-financial-management",
      name: "Diploma in Financial Management",
      faculty: "Economics and Finance",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Accounting", level: 3 },
            { subject: "Mathematics", level: 3 },
            { subject: "Technical Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
    },
    {
      id: "tut-dip-financial-planning",
      name: "Diploma in Financial Planning",
      faculty: "Economics and Finance",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Accounting", level: 3 },
            { subject: "Mathematics", level: 3 },
            { subject: "Technical Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
    },
    {
      id: "tut-dip-internal-auditing",
      name: "Diploma in Internal Auditing",
      faculty: "Economics and Finance",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Accounting", level: 3 },
            { subject: "Mathematics", level: 3 },
            { subject: "Technical Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
    },
    {
      id: "tut-dip-public-finance",
      name: "Diploma in Public Finance",
      faculty: "Economics and Finance",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Accounting", level: 4 },
            { subject: "Mathematics", level: 3 },
            { subject: "Technical Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
    },

    // Faculty of Engineering and the Built Environment
    {
      id: "tut-bachelor-architecture",
      name: "Bachelor of Architecture",
      faculty: "Engineering and the Built Environment",
      apsMin: 25,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "tut-bgeomatics",
      name: "Bachelor of Geomatics",
      faculty: "Engineering and the Built Environment",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Technical Mathematics", level: 5 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 4 },
            { subject: "Technical Sciences", level: 4 },
          ],
        },
      },
    },
    {
      id: "tut-bengtech-chemical",
      name: "Bachelor of Engineering Technology in Chemical Engineering",
      faculty: "Engineering and the Built Environment",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Technical Mathematics", level: 5 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 5 },
            { subject: "Technical Sciences", level: 5 },
          ],
        },
      },
    },
    {
      id: "tut-bengtech-civil",
      name: "Bachelor of Engineering Technology in Civil Engineering",
      faculty: "Engineering and the Built Environment",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Technical Mathematics", level: 5 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 5 },
            { subject: "Technical Sciences", level: 5 },
          ],
        },
      },
    },
    {
      id: "tut-bengtech-electrical",
      name: "Bachelor of Engineering Technology in Electrical Engineering",
      faculty: "Engineering and the Built Environment",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Technical Mathematics", level: 5 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 5 },
            { subject: "Technical Sciences", level: 5 },
          ],
        },
      },
    },
    {
      id: "tut-bengtech-industrial",
      name: "Bachelor of Engineering Technology in Industrial Engineering",
      faculty: "Engineering and the Built Environment",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Technical Mathematics", level: 5 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 5 },
            { subject: "Technical Sciences", level: 5 },
          ],
        },
      },
    },
    {
      id: "tut-bengtech-mechanical",
      name: "Bachelor of Engineering Technology in Mechanical Engineering",
      faculty: "Engineering and the Built Environment",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Technical Mathematics", level: 5 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 5 },
            { subject: "Technical Sciences", level: 5 },
          ],
        },
      },
    },
    {
      id: "tut-dip-building-science",
      name: "Diploma in Building Science",
      faculty: "Engineering and the Built Environment",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Technical Mathematics", level: 3 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 3 },
            { subject: "Technical Sciences", level: 3 },
          ],
        },
      },
    },
    {
      id: "tut-dip-electrical-engineering",
      name: "Diploma in Electrical Engineering",
      faculty: "Engineering and the Built Environment",
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
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 4 },
            { subject: "Technical Sciences", level: 4 },
          ],
        },
      },
    },
    {
      id: "tut-dip-geomatics",
      name: "Diploma in Geomatics",
      faculty: "Engineering and the Built Environment",
      apsMin: 23,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Technical Mathematics", level: 4 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 3 },
            { subject: "Technical Sciences", level: 3 },
          ],
        },
      },
    },
    {
      id: "tut-dip-industrial-design",
      name: "Diploma in Industrial Design",
      faculty: "Engineering and the Built Environment",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
      },
    },

    // Faculty of Humanities
    {
      id: "tut-bed-foundation-phase",
      name: "Bachelor of Education in Foundation Phase Teaching",
      faculty: "Humanities",
      apsMin: 25,
      duration: "4 years",
      subjectRequirements: {
        "Home Language": 5,
        "First Additional Language": 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
    },
    {
      id: "tut-bed-intermediate-phase",
      name: "Bachelor of Education in Intermediate Phase Teaching",
      faculty: "Humanities",
      apsMin: 25,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
    },
    {
      id: "tut-bed-senior-phase-agriculture",
      name: "Bachelor of Education in Senior Phase and Further Education and Training Teaching (Agriculture)",
      faculty: "Humanities",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Technical Mathematics", level: 4 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
        "Agricultural Sciences": 4,
      },
    },
    {
      id: "tut-bed-senior-phase-consumer-sciences",
      name: "Bachelor of Education in Senior Phase and Further Education and Training Teaching (Consumer Sciences)",
      faculty: "Humanities",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Technical Mathematics", level: 4 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
      },
    },
    {
      id: "tut-bed-senior-phase-economics",
      name: "Bachelor of Education in Senior Phase and Further Education and Training Teaching (Economic and Management Sciences)",
      faculty: "Humanities",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Technical Mathematics", level: 4 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
      },
    },
    {
      id: "tut-bed-senior-phase-it",
      name: "Bachelor of Education in Senior Phase and Further Education and Training Teaching (Information Technology)",
      faculty: "Humanities",
      apsMin: 24,
      duration: "4 years",
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
    {
      id: "tut-bed-senior-phase-mathematics",
      name: "Bachelor of Education in Senior Phase and Further Education and Training Teaching (Mathematics)",
      faculty: "Humanities",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
      },
    },
    {
      id: "tut-dip-integrated-communication",
      name: "Diploma in Integrated Communication",
      faculty: "Humanities",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
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
      id: "tut-dip-journalism",
      name: "Diploma in Journalism",
      faculty: "Humanities",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "tut-dip-language-practice",
      name: "Diploma in Language Practice",
      faculty: "Humanities",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        "South African Language": 4,
      },
    },
    {
      id: "tut-dip-law",
      name: "Diploma in Law",
      faculty: "Humanities",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "tut-dip-legal-support",
      name: "Diploma in Legal Support",
      faculty: "Humanities",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        "Additional Language": 3,
      },
    },
    {
      id: "tut-dip-policing",
      name: "Diploma in Policing",
      faculty: "Humanities",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        English: 3,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Technical Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 3 },
          ],
        },
      },
    },
    {
      id: "tut-dip-public-affairs",
      name: "Diploma in Public Affairs",
      faculty: "Humanities",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        English: 3,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 3 },
          ],
        },
      },
    },
    {
      id: "tut-dip-traffic-safety",
      name: "Diploma in Traffic Safety and Municipal Police Management",
      faculty: "Humanities",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        English: 3,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Technical Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 3 },
          ],
        },
      },
    },

    // Faculty of ICT
    {
      id: "tut-dip-computer-science",
      name: "Diploma in Computer Science",
      faculty: "Information and Communication Technology",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Technical Mathematics", level: 5 },
            { subject: "Mathematical Literacy", level: 7 },
          ],
        },
      },
    },
    {
      id: "tut-dip-computer-systems-engineering",
      name: "Diploma in Computer Systems Engineering",
      faculty: "Information and Communication Technology",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Technical Mathematics", level: 5 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 4 },
            { subject: "Technical Sciences", level: 4 },
          ],
        },
      },
    },
    {
      id: "tut-dip-informatics",
      name: "Diploma in Informatics",
      faculty: "Information and Communication Technology",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Technical Mathematics", level: 5 },
            { subject: "Mathematical Literacy", level: 7 },
          ],
        },
      },
    },
    {
      id: "tut-dip-information-technology",
      name: "Diploma in Information Technology",
      faculty: "Information and Communication Technology",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Technical Mathematics", level: 5 },
            { subject: "Mathematical Literacy", level: 7 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 3 },
            { subject: "Technical Sciences", level: 3 },
          ],
        },
      },
    },
    {
      id: "tut-dip-multimedia-computing",
      name: "Diploma in Multimedia Computing",
      faculty: "Information and Communication Technology",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Technical Mathematics", level: 5 },
            { subject: "Mathematical Literacy", level: 7 },
          ],
        },
      },
    },

    // Faculty of Management Sciences
    {
      id: "tut-dip-administrative-information-management",
      name: "Diploma in Administrative Information Management",
      faculty: "Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Technical Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 3 },
          ],
        },
      },
    },
    {
      id: "tut-dip-administrative-management-finance",
      name: "Diploma in Administrative Management (Finance)",
      faculty: "Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Technical Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
        Accounting: 3,
      },
    },
    {
      id: "tut-dip-adventure-tourism-management",
      name: "Diploma in Adventure Tourism Management",
      faculty: "Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
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
      id: "tut-dip-entrepreneurship",
      name: "Diploma in Entrepreneurship",
      faculty: "Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Technical Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 3 },
          ],
        },
      },
    },
    {
      id: "tut-dip-hospitality-management",
      name: "Diploma in Hospitality Management",
      faculty: "Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        English: 3,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Technical Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 3 },
          ],
        },
      },
    },
    {
      id: "tut-dip-human-resource-management",
      name: "Diploma in Human Resource Management",
      faculty: "Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Technical Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 3 },
          ],
        },
      },
    },
    {
      id: "tut-dip-marketing",
      name: "Diploma in Marketing",
      faculty: "Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
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
      id: "tut-dip-tourism-management",
      name: "Diploma in Tourism Management",
      faculty: "Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Technical Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
      },
    },

    // Faculty of Science - Agricultural Sciences
    {
      id: "tut-dip-animal-sciences",
      name: "Diploma in Animal Sciences",
      faculty: "Science - Agricultural Sciences",
      apsMin: 19,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
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
      id: "tut-dip-crop-production",
      name: "Diploma in Crop Production",
      faculty: "Science - Agricultural Sciences",
      apsMin: 19,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
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
      id: "tut-dip-nature-conservation",
      name: "Diploma in Nature Conservation",
      faculty: "Science - Agricultural Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
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
      id: "tut-dip-wildlife-management",
      name: "Diploma in Wildlife Management",
      faculty: "Science - Agricultural Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Technical Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
      },
    },

    // Faculty of Science - Health Sciences
    {
      id: "tut-benvironmental-health",
      name: "Bachelor of Environmental Health",
      faculty: "Science - Health Sciences",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Technical Mathematics", level: 4 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 4 },
            { subject: "Technical Sciences", level: 4 },
          ],
        },
        "Life Sciences": 4,
      },
    },
    {
      id: "tut-bnursing",
      name: "Bachelor of Nursing",
      faculty: "Science - Health Sciences",
      apsMin: 27,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Technical Mathematics", level: 4 },
          ],
        },
        "Life Sciences": 4,
      },
    },
    {
      id: "tut-bpharm",
      name: "Bachelor of Pharmacy",
      faculty: "Science - Health Sciences",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Technical Mathematics", level: 4 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 4 },
            { subject: "Technical Sciences", level: 4 },
          ],
        },
        "Life Sciences": 4,
      },
    },
    {
      id: "tut-bhsci-biokinetics",
      name: "Bachelor of Health Science in Biokinetics",
      faculty: "Science - Health Sciences",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Technical Mathematics", level: 4 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 4 },
            { subject: "Technical Sciences", level: 4 },
          ],
        },
        "Life Sciences": 4,
      },
    },
    {
      id: "tut-bhsci-medical-laboratory-science",
      name: "Bachelor of Health Science in Medical Laboratory Science",
      faculty: "Science - Health Sciences",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Technical Mathematics", level: 4 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 4 },
            { subject: "Technical Sciences", level: 4 },
          ],
        },
        "Life Sciences": 4,
      },
    },
    {
      id: "tut-dip-somatic-therapy",
      name: "Diploma in Somatic Therapy",
      faculty: "Science - Health Sciences",
      apsMin: 22,
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
        "Life Sciences": 4,
      },
    },

    // Faculty of Science - Natural Sciences
    {
      id: "tut-bsc-industrial-chemistry",
      name: "Bachelor of Science in Industrial Chemistry",
      faculty: "Science - Natural Sciences",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "tut-dip-analytical-chemistry",
      name: "Diploma in Analytical Chemistry",
      faculty: "Science - Natural Sciences",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Technical Mathematics", level: 4 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 4 },
            { subject: "Technical Sciences", level: 4 },
          ],
        },
      },
    },
    {
      id: "tut-dip-biotechnology",
      name: "Diploma in Biotechnology",
      faculty: "Science - Natural Sciences",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Technical Mathematics", level: 4 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 4 },
            { subject: "Technical Sciences", level: 4 },
          ],
        },
        "Life Sciences": 3,
      },
    },
    {
      id: "tut-dip-environmental-sciences",
      name: "Diploma in Environmental Sciences",
      faculty: "Science - Natural Sciences",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Technical Mathematics", level: 4 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 4 },
            { subject: "Technical Sciences", level: 4 },
          ],
        },
      },
    },
    {
      id: "tut-dip-food-technology",
      name: "Diploma in Food Technology",
      faculty: "Science - Natural Sciences",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Technical Mathematics", level: 4 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 4 },
            { subject: "Technical Sciences", level: 4 },
          ],
        },
        "Life Sciences": 3,
      },
    },
    {
      id: "tut-dip-geology",
      name: "Diploma in Geology",
      faculty: "Science - Natural Sciences",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Technical Mathematics", level: 4 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 4 },
            { subject: "Technical Sciences", level: 4 },
          ],
        },
      },
    },
  ]

  /**
   * TUT-specific APS calculation
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