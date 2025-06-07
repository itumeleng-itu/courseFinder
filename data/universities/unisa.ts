import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * University of South Africa (UNISA) class
 */
export class UNISA extends BaseUniversity {
  readonly id = "unisa"
  readonly name = "University of South Africa"
  readonly shortName = "UNISA"
  readonly website = "https://www.unisa.ac.za"
  readonly logo = "/logos/unisa.png"
  readonly location = {
    city: "Pretoria",
    province: "Gauteng",
    coordinates: {
      latitude: -25.7679,
      longitude: 28.2015,
    },
  }

  /**
   * UNISA APS calculation method
   * UNISA uses the standard APS calculation where points are assigned based on percentage achievements
   * Life Orientation is excluded from the APS calculation
   */
  calculateAPS(subjects: Record<string, number>): number {
    let totalPoints = 0
    let subjectCount = 0

    for (const [subject, score] of Object.entries(subjects)) {
      // Skip Life Orientation
      if (subject.toLowerCase() === "life orientation") continue

      totalPoints += score
      subjectCount++
    }

    return totalPoints
  }

  protected readonly _courses: Course[] = [
    // College of Accounting Sciences
    {
      id: "unisa-bcom-accounting",
      name: "Bachelor of Commerce in Accounting",
      faculty: "College of Accounting Sciences",
      department: "Accounting",
      apsMin: 28,
      duration: "3 years",
      studyMode: "Distance Learning",
      subjectRequirements: {
        Mathematics: 4,
        English: 4,
      },
      careerOpportunities: ["Accountant", "Financial Manager", "Auditor", "Tax Consultant", "Financial Analyst"],
      additionalRequirements: "Access to a computer and internet is essential for this programme.",
    },
    {
      id: "unisa-bcom-financial-accounting",
      name: "Bachelor of Commerce in Financial Accounting",
      faculty: "College of Accounting Sciences",
      department: "Financial Accounting",
      apsMin: 28,
      duration: "3 years",
      studyMode: "Distance Learning",
      subjectRequirements: {
        Mathematics: 4,
        English: 4,
      },
      careerOpportunities: ["Financial Accountant", "Management Accountant", "Financial Manager", "Budget Analyst"],
      additionalRequirements: "Access to a computer and internet is essential for this programme.",
    },
    {
      id: "unisa-bcom-accounting-sciences",
      name: "Bachelor of Commerce in Accounting Sciences",
      faculty: "College of Accounting Sciences",
      department: "Accounting Sciences",
      apsMin: 28,
      duration: "4 years",
      studyMode: "Distance Learning",
      subjectRequirements: {
        Mathematics: 4,
        English: 4,
      },
      careerOpportunities: [
        "Chartered Accountant (after completing SAICA requirements)",
        "Financial Manager",
        "Auditor",
        "Tax Specialist",
      ],
      additionalRequirements:
        "This programme is accredited by the South African Institute of Chartered Accountants (SAICA).",
    },

    // College of Agriculture and Environmental Sciences
    {
      id: "unisa-bsc-agriculture",
      name: "Bachelor of Science in Agriculture",
      faculty: "College of Agriculture and Environmental Sciences",
      department: "Agriculture and Animal Health",
      apsMin: 26,
      duration: "3 years",
      studyMode: "Distance Learning",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
      careerOpportunities: [
        "Agricultural Scientist",
        "Farm Manager",
        "Agricultural Consultant",
        "Agricultural Researcher",
      ],
      additionalRequirements: "Practical components may require attendance at specific venues.",
    },
    {
      id: "unisa-bsc-environmental-management",
      name: "Bachelor of Science in Environmental Management",
      faculty: "College of Agriculture and Environmental Sciences",
      department: "Environmental Sciences",
      apsMin: 26,
      duration: "3 years",
      studyMode: "Distance Learning",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
      careerOpportunities: [
        "Environmental Manager",
        "Environmental Consultant",
        "Conservation Officer",
        "Sustainability Specialist",
      ],
      additionalRequirements: "Field trips may be required for practical components.",
    },

    // College of Economic and Management Sciences
    {
      id: "unisa-bcom-economics",
      name: "Bachelor of Commerce in Economics",
      faculty: "College of Economic and Management Sciences",
      department: "Economics",
      apsMin: 28,
      duration: "3 years",
      studyMode: "Distance Learning",
      subjectRequirements: {
        Mathematics: 4,
        English: 4,
      },
      careerOpportunities: [
        "Economist",
        "Economic Analyst",
        "Policy Advisor",
        "Market Researcher",
        "Financial Analyst",
      ],
      additionalRequirements: "Access to a computer and internet is essential for this programme.",
    },
    {
      id: "unisa-bcom-business-management",
      name: "Bachelor of Commerce in Business Management",
      faculty: "College of Economic and Management Sciences",
      department: "Business Management",
      apsMin: 28,
      duration: "3 years",
      studyMode: "Distance Learning",
      subjectRequirements: {
        Mathematics: 3,
        "Mathematical Literacy": 6,
        English: 4,
      },
      careerOpportunities: [
        "Business Manager",
        "Entrepreneur",
        "Business Consultant",
        "Project Manager",
        "Operations Manager",
      ],
      additionalRequirements: "Access to a computer and internet is essential for this programme.",
    },
    {
      id: "unisa-bcom-marketing",
      name: "Bachelor of Commerce in Marketing Management",
      faculty: "College of Economic and Management Sciences",
      department: "Marketing and Retail Management",
      apsMin: 28,
      duration: "3 years",
      studyMode: "Distance Learning",
      subjectRequirements: {
        Mathematics: 3,
        "Mathematical Literacy": 6,
        English: 4,
      },
      careerOpportunities: [
        "Marketing Manager",
        "Brand Manager",
        "Market Researcher",
        "Digital Marketing Specialist",
        "Product Manager",
      ],
      additionalRequirements: "Access to a computer and internet is essential for this programme.",
    },
    {
      id: "unisa-bcom-human-resource",
      name: "Bachelor of Commerce in Human Resource Management",
      faculty: "College of Economic and Management Sciences",
      department: "Human Resource Management",
      apsMin: 28,
      duration: "3 years",
      studyMode: "Distance Learning",
      subjectRequirements: {
        Mathematics: 3,
        "Mathematical Literacy": 6,
        English: 4,
      },
      careerOpportunities: [
        "HR Manager",
        "Recruitment Specialist",
        "Training and Development Officer",
        "Employee Relations Manager",
        "Compensation and Benefits Analyst",
      ],
      additionalRequirements: "Access to a computer and internet is essential for this programme.",
    },
    {
      id: "unisa-dip-logistics",
      name: "Diploma in Logistics",
      faculty: "College of Economic and Management Sciences",
      department: "Transport Economics, Logistics and Tourism",
      apsMin: 24,
      duration: "3 years",
      studyMode: "Distance Learning",
      subjectRequirements: {
        Mathematics: 3,
        "Mathematical Literacy": 4,
        English: 3,
      },
      careerOpportunities: [
        "Logistics Coordinator",
        "Supply Chain Analyst",
        "Inventory Controller",
        "Distribution Manager",
        "Procurement Specialist",
      ],
      additionalRequirements: "Access to a computer and internet is essential for this programme.",
    },

    // College of Human Sciences
    {
      id: "unisa-ba-communication",
      name: "Bachelor of Arts in Communication Science",
      faculty: "College of Human Sciences",
      department: "Communication Science",
      apsMin: 24,
      duration: "3 years",
      studyMode: "Distance Learning",
      subjectRequirements: {
        English: 4,
      },
      careerOpportunities: [
        "Communications Officer",
        "Media Liaison Officer",
        "Public Relations Specialist",
        "Corporate Communications Manager",
        "Media Analyst",
      ],
      additionalRequirements: "Access to a computer and internet is essential for this programme.",
    },
    {
      id: "unisa-ba-psychology",
      name: "Bachelor of Arts in Psychology",
      faculty: "College of Human Sciences",
      department: "Psychology",
      apsMin: 24,
      duration: "3 years",
      studyMode: "Distance Learning",
      subjectRequirements: {
        English: 4,
      },
      careerOpportunities: [
        "Counselor (with additional qualifications)",
        "Human Resource Practitioner",
        "Research Assistant",
        "Community Development Worker",
        "Social Services Assistant",
      ],
      additionalRequirements:
        "Note that this degree does not qualify you as a registered psychologist. Further postgraduate studies are required.",
    },
    {
      id: "unisa-ba-languages",
      name: "Bachelor of Arts in Languages",
      faculty: "College of Human Sciences",
      department: "African Languages",
      apsMin: 24,
      duration: "3 years",
      studyMode: "Distance Learning",
      subjectRequirements: {
        English: 4,
      },
      careerOpportunities: ["Translator", "Interpreter", "Language Teacher", "Editor", "Content Writer"],
      additionalRequirements: "Students can choose from a variety of African and European languages.",
    },

    // College of Law
    {
      id: "unisa-llb",
      name: "Bachelor of Laws (LLB)",
      faculty: "College of Law",
      department: "Law",
      apsMin: 30,
      duration: "4 years",
      studyMode: "Distance Learning",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
        "Mathematical Literacy": 4,
      },
      careerOpportunities: ["Attorney", "Advocate", "Legal Advisor", "Magistrate", "Prosecutor"],
      additionalRequirements:
        "After completing the LLB, graduates must complete articles of clerkship or pupillage to be admitted as attorneys or advocates.",
    },
    {
      id: "unisa-ba-law",
      name: "Bachelor of Arts in Law",
      faculty: "College of Law",
      department: "Law",
      apsMin: 28,
      duration: "3 years",
      studyMode: "Distance Learning",
      subjectRequirements: {
        English: 4,
      },
      careerOpportunities: [
        "Legal Assistant",
        "Paralegal",
        "Compliance Officer",
        "Legal Researcher",
        "Public Administrator",
      ],
      additionalRequirements: "This degree can be followed by an LLB to qualify as a legal practitioner.",
    },

    // College of Science, Engineering and Technology
    {
      id: "unisa-bsc-computing",
      name: "Bachelor of Science in Computing",
      faculty: "College of Science, Engineering and Technology",
      department: "Computing",
      apsMin: 28,
      duration: "3 years",
      studyMode: "Distance Learning",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 4,
      },
      careerOpportunities: [
        "Software Developer",
        "Systems Analyst",
        "Database Administrator",
        "Network Administrator",
        "IT Consultant",
      ],
      additionalRequirements:
        "Access to a computer and internet is essential for this programme. Practical components may require specific software.",
    },
    {
      id: "unisa-bsc-mathematics",
      name: "Bachelor of Science in Mathematics",
      faculty: "College of Science, Engineering and Technology",
      department: "Mathematical Sciences",
      apsMin: 28,
      duration: "3 years",
      studyMode: "Distance Learning",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 4,
      },
      careerOpportunities: ["Mathematician", "Statistician", "Data Analyst", "Researcher", "Financial Analyst"],
      additionalRequirements: "Access to a computer and internet is essential for this programme.",
    },
    {
      id: "unisa-bsc-physics",
      name: "Bachelor of Science in Physics",
      faculty: "College of Science, Engineering and Technology",
      department: "Physics",
      apsMin: 28,
      duration: "3 years",
      studyMode: "Distance Learning",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: [
        "Physicist",
        "Research Scientist",
        "Laboratory Technician",
        "Science Teacher",
        "Technical Writer",
      ],
      additionalRequirements: "Practical components may require attendance at specific venues.",
    },
    {
      id: "unisa-national-diploma-engineering",
      name: "National Diploma in Engineering",
      faculty: "College of Science, Engineering and Technology",
      department: "Mechanical and Industrial Engineering",
      apsMin: 26,
      duration: "3 years",
      studyMode: "Distance Learning",
      subjectRequirements: {
        Mathematics: 4,
        "Physical Sciences": 4,
      },
      careerOpportunities: [
        "Engineering Technician",
        "Technical Designer",
        "Production Supervisor",
        "Quality Controller",
        "Maintenance Technician",
      ],
      additionalRequirements:
        "Practical components require attendance at specific venues. Work-Integrated Learning (WIL) is a mandatory component.",
    },

    // Short Learning Programmes (highlighted from the brochure)
    {
      id: "unisa-slp-forensic-auditing",
      name: "Programme in Forensic and Investigative Auditing",
      faculty: "College of Accounting Sciences",
      department: "Auditing",
      apsMin: 22,
      duration: "1 year",
      studyMode: "Distance Learning",
      subjectRequirements: {},
      careerOpportunities: [
        "Forensic Auditor",
        "Fraud Examiner",
        "Forensic Accountant",
        "Compliance Officer",
        "Risk Management Specialist",
      ],
      additionalRequirements:
        "Requires a senior certificate and at least three years relevant working experience, or a relevant diploma, or degree.",
    },
    {
      id: "unisa-slp-project-management",
      name: "Programme in Basic, Intermediate and Advanced Project Management",
      faculty: "College of Economic and Management Sciences",
      department: "Business Management",
      apsMin: 22,
      duration: "1 year",
      studyMode: "Distance Learning",
      subjectRequirements: {},
      careerOpportunities: [
        "Project Manager",
        "Project Coordinator",
        "Project Administrator",
        "Team Leader",
        "Operations Manager",
      ],
      additionalRequirements: "Senior Certificate or an equivalent NQF level 4 qualification required.",
    },
    {
      id: "unisa-slp-disaster-management",
      name: "Programme in Disaster Management",
      faculty: "College of Economic and Management Sciences",
      department: "Public Administration and Management",
      apsMin: 22,
      duration: "1 year",
      studyMode: "Distance Learning",
      subjectRequirements: {},
      careerOpportunities: [
        "Disaster Management Coordinator",
        "Emergency Response Planner",
        "Risk Assessment Specialist",
        "Humanitarian Aid Worker",
        "Public Safety Officer",
      ],
      additionalRequirements: "Senior Certificate or an equivalent NQF level 4 qualification required.",
    },
    {
      id: "unisa-slp-children-rights",
      name: "Advanced Programme in Children's Rights",
      faculty: "College of Law",
      department: "Public, Constitutional and International Law",
      apsMin: 22,
      duration: "1 year",
      studyMode: "Distance Learning",
      subjectRequirements: {},
      careerOpportunities: [
        "Children's Rights Advocate",
        "Legal Advisor",
        "Policy Developer",
        "Social Services Coordinator",
        "NGO Programme Manager",
      ],
      additionalRequirements:
        "Formal qualification at NQF level 7 or successful completion of the Programme in Fundamental Aspects of Children's Rights through Unisa.",
    },
    {
      id: "unisa-slp-industrial-engineering",
      name: "Programme in Industrial Engineering",
      faculty: "College of Science, Engineering and Technology",
      department: "Mechanical and Industrial Engineering",
      apsMin: 22,
      duration: "1 year",
      studyMode: "Distance Learning",
      subjectRequirements: {},
      careerOpportunities: [
        "Industrial Engineer",
        "Process Improvement Specialist",
        "Operations Manager",
        "Quality Control Manager",
        "Facilities Planner",
      ],
      additionalRequirements: "A National Diploma in Engineering or other equivalent NQF-6 Engineering qualification.",
    },
  ]
}
