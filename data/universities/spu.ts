import { BaseUniversity } from "./base-university";
import type { Course } from "@/lib/types";
import { percentageToLevel } from "@/lib/aps/utils";

/**
 * Sol Plaatje University (SPU) class
 */
export class SPU extends BaseUniversity {
  readonly id = "spu";
  readonly name = "Sol Plaatje University";
  readonly shortName = "SPU";
  readonly website = "https://www.spu.ac.za";
  readonly logo = "/logos/spu.png";
  readonly location = {
    city: "Kimberley",
    province: "Northern Cape",
    coordinates: {
      latitude: -28.7454,
      longitude: 24.764,
    },
  };

  /**
   * Calculate APS score according to SPU's method
   * @param subjects Object containing subject names and their NSC levels
   * @returns The calculated APS score
   */
  calculateApsScore(subjects: Record<string, number>): number {
    let totalScore = 0;
    let lifeOrientationScore = 0;

    // Process each subject
    for (const [subject, rawVal] of Object.entries(subjects)) {
      const level = rawVal > 7 ? percentageToLevel(rawVal) : rawVal;
      let subjectScore = 0;

      // Convert NSC level to SPU points
      switch (level) {
        case 7:
          subjectScore = 8;
          break;
        case 6:
          subjectScore = 6;
          break;
        case 5:
          subjectScore = 5;
          break;
        case 4:
          subjectScore = 4;
          break;
        case 3:
          subjectScore = 3;
          break;
        case 2:
          subjectScore = 2;
          break;
        case 1:
          subjectScore = 1;
          break;
        default:
          subjectScore = 0;
      }

      // Add additional points for Mathematics and Home Language
      if (subject === "Mathematics" && level >= 4) {
        subjectScore += level >= 5 ? 2 : 1;
      } else if (subject.includes("Home Language") && level >= 4) {
        subjectScore += level >= 5 ? 2 : 1;
      }

      // Handle Life Orientation separately
      if (subject === "Life Orientation") {
        switch (level) {
          case 7:
            lifeOrientationScore = 4;
            break;
          case 6:
            lifeOrientationScore = 3;
            break;
          case 5:
            lifeOrientationScore = 2;
            break;
          case 4:
            lifeOrientationScore = 1;
            break;
          default:
            lifeOrientationScore = 0;
        }
      } else {
        totalScore += subjectScore;
      }
    }

    return totalScore + lifeOrientationScore;
  }

  protected readonly _courses: Course[] = [
    // Faculty of Education
    {
      id: "spu-bed-foundation",
      name: "Bachelor of Education (Foundation Phase Teaching)",
      faculty: "Faculty of Education",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
      },
      additionalRequirements: ["NSC Pass with Bachelor’s Degree requirements", "Afrikaans/Setswana/isiXhosa HL/FAL Level 4"],
      careerOpportunities: ["Teacher (Grade R-3)"],
    },
    {
      id: "spu-bed-intermediate-phase-723",
      name: "Bachelor of Education (Intermediate Phase Teaching) - Languages, Mathematics, Natural Sciences and Technology",
      faculty: "Faculty of Education",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "english first additional language": 5,
        "mathematics": 4,
        "physical sciences": 4,
        "life sciences": 4,
      },
      additionalRequirements: ["NSC Pass with Bachelor’s Degree requirements", "Afrikaans/Setswana/isiXhosa HL/FAL Level 4"],
      careerOpportunities: ["Teacher (Grade 4-6)"],
    },
    {
      id: "spu-bed-intermediate-social",
      name: "Bachelor of Education (Intermediate Phase Teaching) - Languages, Social Sciences and Life Skills",
      faculty: "Faculty of Education",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
      },
      additionalRequirements: ["NSC Pass with Bachelor’s Degree requirements", "Afrikaans/Setswana/isiXhosa HL/FAL Level 4"],
      careerOpportunities: ["Teacher (Grade 4-6)"],
    },
    {
      id: "spu-bed-senior-fet-731",
      name: "Bachelor of Education (Senior and FET Phase Teaching) - Life Sciences, Natural Sciences, Mathematics",
      faculty: "Faculty of Education",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": 4,
        "life sciences": 4,
      },
      additionalRequirements: ["NSC Pass with Bachelor’s Degree requirements"],
      careerOpportunities: ["Teacher (Grade 7-12)"],
    },
    {
      id: "spu-bed-senior-fet-735",
      name: "Bachelor of Education (Senior and FET Phase Teaching) - Languages OR Language and History",
      faculty: "Faculty of Education",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "history": 4,
      },
      additionalRequirements: ["NSC Pass with Bachelor’s Degree requirements", "Afrikaans/Setswana HL/FAL Level 4"],
      careerOpportunities: ["Teacher (Grade 7-12)"],
    },
    {
      id: "spu-bed-senior-fet-738",
      name: "Bachelor of Education (Senior and FET Phase Teaching) - Accounting, Economics, Business Studies",
      faculty: "Faculty of Education",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "accounting": {
          alternatives: [
            { subject: "accounting", level: 4 },
            { subject: "business studies", level: 4 },
            { subject: "economics", level: 4 },
          ],
        },
      },
      additionalRequirements: ["NSC Pass with Bachelor’s Degree requirements"],
      careerOpportunities: ["Teacher (Grade 7-12)"],
    },

    // Faculty of Economic and Management Sciences
    {
      id: "spu-bcom-accounting",
      name: "Bachelor of Commerce in Accounting",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 5,
      },
      additionalRequirements: ["NSC Pass with Bachelor’s Degree requirements", "If Mathematics level 4, Accounting must be level 3"],
      careerOpportunities: ["Financial Accountant", "Management Accountant", "Financial Manager", "Tax Practitioner", "Internal Auditor", "Project Manager", "Management Consultant", "Finance Director", "Chief Financial Officer", "Chief Executive", "Entrepreneur", "General Manager", "Academic"],
    },
    {
      id: "spu-bcom-economics",
      name: "Bachelor of Commerce in Economics",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 5,
      },
      additionalRequirements: ["NSC Pass with Bachelor’s Degree requirements", "If Mathematics level 4, Economics/Business Studies must be level 3"],
      careerOpportunities: ["Economist", "Researcher", "Analyst", "Forecaster", "Economic Programmer", "Manager", "Financial Risk Analyst", "Financial Planner", "Investment Analyst", "Entrepreneur", "Consultant"],
    },
    {
      id: "spu-dip-retail",
      name: "Diploma in Retail Business Management",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Math": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["NSC Pass with Diploma requirements", "Accounting/Business Studies/Economics Level 4"],
      careerOpportunities: ["Trainee Manager", "Buying", "Stock Control", "Merchandising", "Sales", "Administration", "Logistics", "Housekeeping", "Finance"],
    },
    {
      id: "spu-hcert-entrepreneurship",
      name: "Higher Certificate in Entrepreneurship",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 25,
      duration: "1 year",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Math": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["NSC Pass with Higher Certificate requirements", "Accounting/Business Studies/Economics Level 3"],
      careerOpportunities: ["Small Business Owner", "Start-Up Entrepreneur", "Business Consultant", "Franchise Manager", "Business Administrator", "Junior Management"],
    },
    {
      id: "spu-adv-dip-management",
      name: "Advanced Diploma in Management",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 0,
      duration: "1 year",
      additionalRequirements: ["Relevant Diploma at NQF Level 6 or Bachelor’s degree", "Average of 60% in previous qualification"],
      careerOpportunities: ["Strategic management", "Project management", "Human resource management", "Managerial finance", "Business research"],
    },

    // Faculty of Humanities
    {
      id: "spu-ba",
      name: "Bachelor of Arts (B.A.)",
      faculty: "Faculty of Humanities",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "english first additional language": 5,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 2 },
            { subject: "mathematical literacy", level: 3 },
          ],
        },
      },
      careerOpportunities: ["Public sector roles", "Private sector roles", "NPOs and NGOs", "Strategic management", "Project management", "Human resource management", "Managerial finance", "Business research"],
    },
    {
      id: "spu-hcert-heritage",
      name: "Higher Certificate in Heritage Studies",
      faculty: "Faculty of Humanities",
      apsMin: 25,
      duration: "1 year",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Math": {
          alternatives: [
            { subject: "Mathematics", level: 2 },
            { subject: "Mathematical Literacy", level: 3 },
          ],
        },
      },
      careerOpportunities: ["Heritage management", "Museum administration", "Archival work", "Tourism industry"],
    },
    {
      id: "spu-hcert-court-interpreting",
      name: "Higher Certificate in Court Interpreting",
      faculty: "Faculty of Humanities",
      apsMin: 25,
      duration: "1 year",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
      },
      additionalRequirements: ["At least one other African language (Home Language level 4 or 1st Additional Language level 5)", "Mature age applicants may be approved by Registrar", "Recognition of Prior Learning (RPL) applied"],
      careerOpportunities: ["Court or legal interpreting", "Community-based interpreting", "Meetings and conferences", "Health and medical settings", "Government agencies"],
    },

    // Faculty of Natural and Applied Sciences
    {
      id: "spu-bsc",
      name: "Bachelor of Science (B.Sc.)",
      faculty: "Faculty of Natural and Applied Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "english first additional language": 5,
        "mathematics": 4,
        "physical sciences": 4,
        "life sciences": 4,
      },
      careerOpportunities: ["Biologist", "Conservation Science", "Curator", "Ecologist", "Molecular Biologist", "Banking", "Insurance", "Statistician", "Computer Programming", "Operations Research", "Cyber Security Analyst", "Forensic Computer Analyst", "Software Analyst", "Physicist", "Chemical Analyst", "Quality Control", "Forensic GIS Analyst", "Geographer"],
    },
    {
      id: "spu-bsc-data",
      name: "Bachelor of Science in Data Science",
      faculty: "Faculty of Natural and Applied Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 5,
      },
      careerOpportunities: ["Data Scientist", "Data Architect", "Data Analyst", "Data/Analytics Manager", "Data Engineer", "Intelligence Analyst", "Data Mining Engineer"],
    },
    {
      id: "spu-bsc-environmental",
      name: "Bachelor of Environmental Science",
      faculty: "Faculty of Natural and Applied Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
      careerOpportunities: ["Environmental management", "Urban sustainability", "Rural resource planning", "Public health initiatives", "Private consultant", "Academia", "Government agencies", "NGOs"],
    },
    {
      id: "spu-dip-ict",
      name: "Diploma in Information and Communication Technology in Applications Development",
      faculty: "Faculty of Natural and Applied Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Math": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Recommended: Computer Applications Technology (CAT) or Information Technology (IT)"],
      careerOpportunities: ["Software Analyst", "Software Application Programmer", "Software Application Developer", "Web Administrator", "Solution Architecture", "Web Designer", "Computer Network Professional", "Web Developer", "Network Administrator", "System Administrator", "Network Analyst"],
    },
    {
      id: "spu-dip-agriculture",
      name: "Diploma in Agriculture",
      faculty: "Faculty of Natural and Applied Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Math": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
        "Physical Sciences": 3,
      },
      careerOpportunities: ["Agricultural research", "Extension farming production", "Farmer enterprises", "Marketing", "Agricultural entrepreneurs", "Technicians", "Farm managers", "Agricultural advisors"],
    },
    {
      id: "spu-adv-diploma-ict-apps-dev",
      name: "Advanced Diploma in Information and Communication Technology (ICT) in Applications Development",
      faculty: "Faculty of Natural and Applied Sciences",
      apsMin: 0,
      duration: "1 year",
      additionalRequirements: ["Three-year Diploma in ICT or equivalent at NQF Level 6", "Average of at least 60% in third-year exit modules", "Recognition of Prior Learning (RPL) applied"],
    },

    // Education
    {
      id: "spu-bed-intermediate-math",
      name: "Bachelor of Education (Intermediate Phase Teaching - Languages, Mathematics, Natural Science and Technology)",
      faculty: "Education",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
      additionalRequirements: ["In addition to the English requirement, one of the following languages is required: Afrikaans HL/FAL (Level 4), Setswana HL/FAL (Level 4), or isiXhosa HL/FAL (Level 4)."],
      careerOpportunities: ["Intermediate Phase Teacher (Grade 4-6)", "Education specialist", "Academic or administrator in the education field"],
    },
    {
      id: "spu-bed-senior-science",
      name: "Bachelor of Education (Senior Phase & FET Teaching - Life Sciences, Natural Sciences and Mathematics)",
      faculty: "Education",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 4,
        "Life Sciences": 4,
      },
      careerOpportunities: ["Senior Phase and FET Teacher (Grade 7-12)", "Education specialist", "Academic or administrator in the education field"],
    },
    {
      id: "spu-bed-senior-languages",
      name: "Bachelor of Education (Senior Phase & FET Teaching - Languages OR Language and History)",
      faculty: "Education",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
      },
      additionalRequirements: ["In addition to the English requirement, one of the following languages is required: Afrikaans HL/FAL (Level 4) OR Setswana HL/FAL (Level 4). If History will be selected as an elective, History (Level 4) is required."],
      careerOpportunities: ["Senior Phase and FET Teacher (Grade 7-12)", "Education specialist", "Academic or administrator in the education field"],
    },
    {
      id: "spu-bed-senior-history",
      name: "Bachelor of Education (Senior Phase & FET Teaching - History, Social Sciences and Language)",
      faculty: "Education",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Geography": 4,
        "History": 4,
      },
      additionalRequirements: ["In addition to the English requirement, one of the following languages is required: Afrikaans HL/FAL (Level 4) OR Setswana HL/FAL (Level 4)."],
      careerOpportunities: ["Senior Phase and FET Teacher (Grade 7-12)", "Education specialist", "Academic or administrator in the education field"],
    },
    {
      id: "spu-bed-senior-economics",
      name: "Bachelor of Education (Senior Phase & FET Teaching - Accounting, Economics, Business Studies plus Economic and Management Sciences)",
      faculty: "Education",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Any two of the following: Accounting (Level 4) OR Business Studies (Level 4) OR Economics (Level 4)."],
      careerOpportunities: ["Senior Phase and FET Teacher (Grade 7-12)", "Education specialist", "Academic or administrator in the education field"],
    },
    {
      id: "spu-pgce",
      name: "Postgraduate Certificate in Education",
      faculty: "Education",
      apsMin: 0,
      duration: "1 year",
      additionalRequirements: ["An approved Bachelor's degree at NQF Level 7, or an appropriate 360-credit exit NQF Level 6 Diploma. The Bachelor's degree or the Diploma should include two recognised school subjects."],
      careerOpportunities: ["Teacher in various school phases", "Education specialist", "Academic or administrator in the education field"],
    },

    // Humanities
    // Natural and Applied Sciences   
    {
      id: "spu-adv-dip-ict",
      name: "Advanced Diploma in Information and Communication Technology in Applications Development",
      faculty: "Natural and Applied Sciences",
      apsMin: 0,
      duration: "1 year",
      additionalRequirements: ["Applicants must be in possession of a three-year Diploma in Information and Communication Technology or equivalent at NQF Level 6 within the same field of study. An average of at least 60% in the third-year exit modules of the NQF Level 6 qualification."],
      careerOpportunities: ["Senior Software Developer", "Systems Analyst", "Project Manager", "IT Consultant", "Software Engineer"],
    },
  ];
}
