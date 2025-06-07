import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * Sol Plaatje University (SPU) class
 */
export class SPU extends BaseUniversity {
  readonly id = "spu"
  readonly name = "Sol Plaatje University"
  readonly shortName = "SPU"
  readonly website = "https://www.spu.ac.za"
  readonly logo = "/logos/spu.png"
  readonly location = {
    city: "Kimberley",
    province: "Northern Cape",
    coordinates: {
      latitude: -28.7282,
      longitude: 24.7499,
    },
  }

  /**
   * Calculate APS score according to SPU's method
   * @param subjects Object containing subject names and their NSC levels
   * @returns The calculated APS score
   */
  calculateApsScore(subjects: Record<string, number>): number {
    let totalScore = 0
    let lifeOrientationScore = 0

    // Process each subject
    for (const [subject, level] of Object.entries(subjects)) {
      let subjectScore = 0

      // Convert NSC level to SPU points
      switch (level) {
        case 7:
          subjectScore = 8
          break
        case 6:
          subjectScore = 6
          break
        case 5:
          subjectScore = 5
          break
        case 4:
          subjectScore = 4
          break
        case 3:
          subjectScore = 3
          break
        case 2:
          subjectScore = 2
          break
        case 1:
          subjectScore = 1
          break
        default:
          subjectScore = 0
      }

      // Add additional points for Mathematics and Home Language
      if (subject === "Mathematics" && level >= 4) {
        subjectScore += level >= 5 ? 2 : 1
      } else if (subject.includes("Home Language") && level >= 4) {
        subjectScore += level >= 5 ? 2 : 1
      }

      // Handle Life Orientation separately
      if (subject === "Life Orientation") {
        switch (level) {
          case 7:
            lifeOrientationScore = 4
            break
          case 6:
            lifeOrientationScore = 3
            break
          case 5:
            lifeOrientationScore = 2
            break
          case 4:
            lifeOrientationScore = 1
            break
          default:
            lifeOrientationScore = 0
        }
      } else {
        totalScore += subjectScore
      }
    }

    return totalScore + lifeOrientationScore
  }

  protected readonly _courses: Course[] = [
    // Faculty of Education
    {
      id: "spu-bed-foundation",
      name: "Bachelor of Education (Foundation Phase Teaching)",
      faculty: "Education",
      department: "School of Education",
      apsMin: 30,
      duration: "4 years",
      courseCode: "EDU720",
      description: "This programme targets potential students who want to teach learners in Grade R-3.",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 5,
      },
      additionalRequirements:
        "In addition to the English requirement, one of the following languages is required: Afrikaans HL/FAL (Level 4), Setswana HL/FAL (Level 4), or isiXhosa HL/FAL (Level 4). Also requires Mathematics (Level 3) OR Mathematical Literacy (Level 4).",
      careerOpportunities: [
        "Foundation Phase Teacher (Grade R-3)",
        "Education specialist",
        "Academic or administrator in the education field",
      ],
    },
    {
      id: "spu-bed-intermediate-math",
      name: "Bachelor of Education (Intermediate Phase Teaching - Languages, Mathematics, Natural Science and Technology)",
      faculty: "Education",
      department: "School of Education",
      apsMin: 30,
      duration: "4 years",
      courseCode: "EDU723",
      description:
        "This programme targets potential students who want to teach Languages, Mathematics, Natural Sciences to Grade 4-6 learners.",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 5,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
      additionalRequirements:
        "In addition to the English requirement, one of the following languages is required: Afrikaans HL/FAL (Level 4), Setswana HL/FAL (Level 4), or isiXhosa HL/FAL (Level 4).",
      careerOpportunities: [
        "Intermediate Phase Teacher (Grade 4-6)",
        "Education specialist",
        "Academic or administrator in the education field",
      ],
    },
    {
      id: "spu-bed-intermediate-social",
      name: "Bachelor of Education (Intermediate Phase Teaching - Languages, Social Sciences and Life Skills)",
      faculty: "Education",
      department: "School of Education",
      apsMin: 30,
      duration: "4 years",
      courseCode: "EDU724",
      description:
        "This programme targets potential students who want to teach Languages, Life Skills and Social Sciences to Grade 4-6 learners.",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 5,
      },
      additionalRequirements:
        "In addition to the English requirement, one of the following languages is required: Afrikaans HL/FAL (Level 4), Setswana HL/FAL (Level 4), or isiXhosa HL/FAL (Level 4). Also requires either Geography (Level 4) OR History (Level 4).",
      careerOpportunities: [
        "Intermediate Phase Teacher (Grade 4-6)",
        "Education specialist",
        "Academic or administrator in the education field",
      ],
    },
    {
      id: "spu-bed-senior-science",
      name: "Bachelor of Education (Senior Phase & FET Teaching - Life Sciences, Natural Sciences and Mathematics)",
      faculty: "Education",
      department: "School of Education",
      apsMin: 30,
      duration: "4 years",
      courseCode: "EDU740",
      description:
        "This programme targets potential students who want to teach Mathematics, Natural Sciences, and Life Sciences at Senior Phase and FET level.",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 5,
        Mathematics: 4,
        "Life Sciences": 4,
      },
      careerOpportunities: [
        "Senior Phase and FET Teacher (Grade 7-12)",
        "Education specialist",
        "Academic or administrator in the education field",
      ],
    },
    {
      id: "spu-bed-senior-languages",
      name: "Bachelor of Education (Senior Phase & FET Teaching - Languages OR Language and History)",
      faculty: "Education",
      department: "School of Education",
      apsMin: 30,
      duration: "4 years",
      courseCode: "EDU741",
      description:
        "This programme targets potential students who want to teach Languages or Language and History at Senior Phase and FET level.",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 5,
      },
      additionalRequirements:
        "In addition to the English requirement, one of the following languages is required: Afrikaans HL/FAL (Level 4) OR Setswana HL/FAL (Level 4). If History will be selected as an elective, History (Level 4) is required.",
      careerOpportunities: [
        "Senior Phase and FET Teacher (Grade 7-12)",
        "Education specialist",
        "Academic or administrator in the education field",
      ],
    },
    {
      id: "spu-bed-senior-history",
      name: "Bachelor of Education (Senior Phase & FET Teaching - History, Social Sciences and Language)",
      faculty: "Education",
      department: "School of Education",
      apsMin: 30,
      duration: "4 years",
      courseCode: "EDU742",
      description:
        "This programme targets potential students who want to teach History, Social Sciences and Language at Senior Phase and FET level.",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 5,
        Geography: 4,
        History: 4,
      },
      additionalRequirements:
        "In addition to the English requirement, one of the following languages is required: Afrikaans HL/FAL (Level 4) OR Setswana HL/FAL (Level 4).",
      careerOpportunities: [
        "Senior Phase and FET Teacher (Grade 7-12)",
        "Education specialist",
        "Academic or administrator in the education field",
      ],
    },
    {
      id: "spu-bed-senior-economics",
      name: "Bachelor of Education (Senior Phase & FET Teaching - Accounting, Economics, Business Studies plus Economic and Management Sciences)",
      faculty: "Education",
      department: "School of Education",
      apsMin: 30,
      duration: "4 years",
      courseCode: "EDU743",
      description:
        "This programme targets potential students who want to teach Accounting, Economics, Business Studies and Economic and Management Sciences at Senior Phase and FET level.",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 5,
      },
      additionalRequirements:
        "Any two of the following: Accounting (Level 4) OR Business Studies (Level 4) OR Economics (Level 4).",
      careerOpportunities: [
        "Senior Phase and FET Teacher (Grade 7-12)",
        "Education specialist",
        "Academic or administrator in the education field",
      ],
    },
    {
      id: "spu-pgce",
      name: "Postgraduate Certificate in Education",
      faculty: "Education",
      department: "School of Education",
      apsMin: 0, // Not applicable for postgraduate studies
      duration: "1 year",
      description:
        "The PGCE is a 1-year qualification, being offered on a full-time basis with face-to-face and online lectures on the SPU campus.",
      additionalRequirements:
        "An approved Bachelor's degree at NQF Level 7, or an appropriate 360-credit exit NQF Level 6 Diploma. The Bachelor's degree or the Diploma should include two recognised school subjects.",
      careerOpportunities: [
        "Teacher in various school phases",
        "Education specialist",
        "Academic or administrator in the education field",
      ],
    },

    // Faculty of Economic and Management Sciences
    {
      id: "spu-bcom-accounting",
      name: "Bachelor of Commerce in Accounting",
      faculty: "Economic and Management Sciences",
      apsMin: 30,
      duration: "3 years",
      courseCode: "SAQA ID: 118404",
      description:
        "The Bachelor of Commerce in Accounting provides a well-rounded, technically focused education that develops analytic and practical skills critical for accounting, tax, auditing, financial management and management control systems.",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 5,
        Mathematics: 5,
      },
      additionalRequirements: "Mathematics (Level 5) OR Mathematics (Level 4) AND Accounting (Level 3).",
      careerOpportunities: [
        "Financial Accountant",
        "Management Accountant",
        "Financial Manager",
        "Tax Practitioner",
        "Internal Auditor",
        "Project Manager",
        "Management Consultant",
        "Finance Director",
        "Chief Financial Officer",
        "Chief Executive",
        "Entrepreneur",
        "General Manager",
        "Academic",
      ],
    },
    {
      id: "spu-bcom-economics",
      name: "Bachelor of Commerce in Economics",
      faculty: "Economic and Management Sciences",
      apsMin: 30,
      duration: "3 years",
      courseCode: "SAQA ID: 118906",
      description:
        "The purpose of this qualification is to provide graduates with deep economics knowledge. The programme provides students with strong economic and quantitative competences through learning approaches that emphasise the use of technology.",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 5,
        Mathematics: 5,
      },
      additionalRequirements:
        "Mathematics (Level 5) OR Mathematics (Level 4) AND Economics/Business Studies (Level 3).",
      careerOpportunities: [
        "Economist",
        "Researcher",
        "Analyst",
        "Forecaster",
        "Economic Programmer",
        "Manager",
        "Financial Risk Analyst",
        "Financial Planner",
        "Investment Analyst",
        "Entrepreneur",
        "Consultant",
      ],
    },
    {
      id: "spu-dip-retail",
      name: "Diploma in Retail Business Management",
      faculty: "Economic and Management Sciences",
      apsMin: 25,
      duration: "3 years",
      courseCode: "SAQA ID: 93648",
      description:
        "This Diploma provides students with the knowledge, insight and skills needed to follow a successful management career in the retail or wholesale fields.",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 5,
        Mathematics: 3,
        "Mathematical Literacy": 5,
      },
      additionalRequirements:
        "At least one of the following at NSC Level 4: Accounting, Business Studies or Economics.",
      careerOpportunities: [
        "Trainee Manager",
        "Buyer",
        "Stock Controller",
        "Merchandiser",
        "Sales Manager",
        "Administrator",
        "Logistics Manager",
      ],
    },
    {
      id: "spu-adv-dip-management",
      name: "Advanced Diploma in Management",
      faculty: "Economic and Management Sciences",
      apsMin: 0, // Not applicable for advanced diploma
      duration: "1 year",
      courseCode: "SAQA ID: 108875",
      description:
        "This qualification seeks to prepare students for postgraduate studies through the deepening of their knowledge and understanding of theories, methodologies and practices in management and related fields.",
      additionalRequirements:
        "A relevant Diploma at NQF Level 6, Bachelor's degree or equivalent. The student must have passed subjects related to management. In addition, the student must have obtained an average of 60% of the qualification.",
      careerOpportunities: [
        "Strategic Manager",
        "Project Manager",
        "Human Resource Manager",
        "Financial Manager",
        "Business Researcher",
        "Management Consultant",
      ],
    },
    {
      id: "spu-hcert-entrepreneurship",
      name: "Higher Certificate in Entrepreneurship",
      faculty: "Economic and Management Sciences",
      apsMin: 25,
      duration: "1 year",
      courseCode: "SAQA ID: 123433",
      description:
        "The purpose of the Higher Certificate in Entrepreneurship is to provide the fundamentals of entrepreneurship and small business management, thereby making them more entrepreneurial and employable.",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 5,
        Mathematics: 3,
        "Mathematical Literacy": 4,
      },
      additionalRequirements:
        "At least one of the following at NSC level 3: Accounting, Business Studies or Economics.",
      careerOpportunities: [
        "Small Business Owner",
        "Start-Up Entrepreneur",
        "Business Consultant",
        "Franchise Manager",
        "Self-employed Professional",
        "Business Administrator",
        "Junior Management",
      ],
    },

    // Faculty of Humanities
    {
      id: "spu-ba",
      name: "Bachelor of Arts",
      faculty: "Humanities",
      apsMin: 30,
      duration: "3 years",
      courseCode: "SAQA ID: 98922",
      description:
        "The B.A. intends to develop skilled graduates who are able to engage critically with the world and apply disciplinary content to the resolution of problems. There is a strong focus on languages (Afrikaans, English and Setswana), History, Heritage Studies, Geography, Mathematics and Sociology.",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 5,
        Mathematics: 2,
        "Mathematical Literacy": 3,
      },
      additionalRequirements:
        "Students wishing to enroll for a major in Geography, NSC achievement Level 4 is required.",
      careerOpportunities: [
        "Researcher",
        "Educator",
        "Public Servant",
        "NGO Worker",
        "Heritage Manager",
        "Museum Curator",
        "Archivist",
        "Tourism Industry Professional",
      ],
    },
    {
      id: "spu-hcert-heritage",
      name: "Higher Certificate in Heritage Studies",
      faculty: "Humanities",
      apsMin: 25,
      duration: "1 year",
      courseCode: "SAQA ID: 94804",
      description:
        "This programme provides students with a theoretical and practical grounding of knowledge and skills about the heritage sector.",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 5,
        Mathematics: 2,
        "Mathematical Literacy": 3,
      },
      careerOpportunities: [
        "Heritage Management Assistant",
        "Museum Administrator",
        "Archivist Assistant",
        "Tourism Industry Worker",
      ],
    },
    {
      id: "spu-hcert-court-interpreting",
      name: "Higher Certificate in Court Interpreting",
      faculty: "Humanities",
      apsMin: 25,
      duration: "1 year",
      courseCode: "SAQA ID: 115460",
      description:
        "The purpose of the Higher Certificate in Court Interpreting is to provide an opportunity for court interpreters who are already in the profession as well as newcomers to the field of court interpreting to obtain a recognised formal and professional qualification.",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 5,
      },
      additionalRequirements:
        "Students should have at least one other African language taken as a home language (NSC level 4) OR 1st Additional Language (NSC level 5).",
      careerOpportunities: [
        "Court Interpreter",
        "Legal Interpreter",
        "Community Interpreter",
        "Conference Interpreter",
        "Medical Interpreter",
        "Government Agency Interpreter",
      ],
    },

    // Faculty of Natural and Applied Sciences
    {
      id: "spu-bsc",
      name: "Bachelor of Science",
      faculty: "Natural and Applied Sciences",
      apsMin: 30,
      duration: "3 years",
      courseCode: "SAQA ID: 97908",
      description:
        "The Bachelor of Science degree has been carefully designed to address a critical skills shortage in the country and will provide access to students to an advanced area of study in an essential contemporary discipline.",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 5,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
      additionalRequirements: "Mathematical Literacy is not acceptable.",
      careerOpportunities: [
        "Biologist",
        "Conservation Scientist",
        "Curator",
        "Ecologist",
        "Molecular Biologist",
        "Banker",
        "Insurance Professional",
        "Statistician",
        "Computer Programmer",
        "Operations Researcher",
        "Cyber Security Analyst",
        "Forensic Computer Analyst",
        "Software Analyst",
        "Physicist",
        "Chemical Analyst",
        "Quality Control Specialist",
        "Forensic GIS Analyst",
        "Geographer",
      ],
    },
    {
      id: "spu-bsc-data",
      name: "Bachelor of Science in Data Science",
      faculty: "Natural and Applied Sciences",
      apsMin: 30,
      duration: "3 years",
      courseCode: "SAQA ID: 96105",
      description:
        "The Bachelor of Science in Data Science degree has a strong mathematics core and focuses on data science and applications thereof. The degree is designed to develop highly skilled graduates in areas in which there are considerable shortages across the country.",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 5,
        Mathematics: 5,
      },
      additionalRequirements: "Mathematical Literacy is not acceptable.",
      careerOpportunities: [
        "Data Scientist",
        "Data Architect",
        "Data Analyst",
        "Data/Analytics Manager",
        "Data Engineer",
        "Intelligence Analyst",
        "Data Mining Engineer",
      ],
    },
    {
      id: "spu-bsc-environmental",
      name: "Bachelor of Environmental Science",
      faculty: "Natural and Applied Sciences",
      apsMin: 30,
      duration: "4 years",
      courseCode: "SAQA ID: 123429",
      description:
        "A Bachelor of Environmental Science degree is a four-year undergraduate programme that is intended to equip students with a groundwork in the fundamental principles of environmental sustainability, planning, and management.",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 5,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
      additionalRequirements: "Mathematical Literacy is not acceptable.",
      careerOpportunities: [
        "Environmental Scientist",
        "Environmental Consultant",
        "Conservation Specialist",
        "Sustainability Coordinator",
        "Environmental Impact Assessor",
        "Urban Planner",
        "Mining Environmental Specialist",
        "Agricultural Environmental Specialist",
        "Tourism Environmental Specialist",
      ],
    },
    {
      id: "spu-dip-ict",
      name: "Diploma in Information and Communication Technology in Applications Development",
      faculty: "Natural and Applied Sciences",
      apsMin: 25,
      duration: "3 years",
      courseCode: "SAQA ID: 93728",
      description:
        "The purpose of the Diploma is to provide a career-focused, professional qualification featuring industry-referenced knowledge and skills transfer, technological competencies, critical cross-field skills as well as attitudinal development.",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 5,
        Mathematics: 3,
        "Mathematical Literacy": 5,
      },
      additionalRequirements:
        "It is highly recommended that applicants should also have Computer Applications Technology (CAT) or Information Technology (IT) as subjects in their Matric curriculum.",
      careerOpportunities: [
        "Software Analyst",
        "Software Application Programmer",
        "Software Application Developer",
        "Web Administrator",
        "Solution Architect",
        "Web Designer",
        "Computer Network Professional",
        "Web Developer",
        "Network Administrator",
        "System Administrator",
        "Network Analyst",
      ],
    },
    {
      id: "spu-dip-agriculture",
      name: "Diploma in Agriculture",
      faculty: "Natural and Applied Sciences",
      apsMin: 25,
      duration: "3 years",
      courseCode: "SAQA ID: 120923",
      description:
        "The purpose of this Diploma is to produce students with a solid grounding in principles and practices of producing crops and livestock for commercial purposes, primarily, under water-stressed regions.",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 5,
        Mathematics: 3,
        "Mathematical Literacy": 5,
        "Physical Sciences": 3,
      },
      additionalRequirements: "Life Sciences (Level 3) OR Agricultural Sciences (Level 3).",
      careerOpportunities: [
        "Agricultural Entrepreneur",
        "Agricultural Technician",
        "Farm Manager",
        "Agricultural Advisor",
        "Agricultural Researcher",
      ],
    },
    {
      id: "spu-adv-dip-ict",
      name: "Advanced Diploma in Information and Communication Technology in Applications Development",
      faculty: "Natural and Applied Sciences",
      apsMin: 0, // Not applicable for advanced diploma
      duration: "1 year",
      courseCode: "SAQA ID: 111254",
      description:
        "The rationale of the qualification is to produce graduates that have a good theoretical knowledge and practical skills in systems analysis, design and applications development.",
      additionalRequirements:
        "Applicants must be in possession of a three-year Diploma in Information and Communication Technology or equivalent at NQF Level 6 within the same field of study. An average of at least 60% in the third-year exit modules of the NQF Level 6 qualification.",
      careerOpportunities: [
        "Senior Software Developer",
        "Systems Analyst",
        "Project Manager",
        "IT Consultant",
        "Software Engineer",
      ],
    },
  ]
}
