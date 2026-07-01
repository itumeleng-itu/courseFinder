import { BaseUniversity } from "./base-university";
import type { Course } from "@/lib/types";

/**
 * Rhodes University class
 */
export class Rhodes extends BaseUniversity {
  readonly id = "ru";
  readonly name = "Rhodes University";
  readonly shortName = "Rhodes";
  readonly website = "https://www.ru.ac.za";
  readonly logo = "/logos/rhodes.png";
  readonly location = {
    city: "Makhanda (Grahamstown)",
    province: "Eastern Cape",
    coordinates: {
      latitude: -33.311,
      longitude: 26.5225,
    },
  };

  protected readonly _courses: Course[] = [
    // Commerce
    {
      id: "ru-bbs",
      name: "Bachelor of Business Science",
      faculty: "Commerce",
      apsMin: 38,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 7,
      },
      careerOpportunities: ["Computer Science", "Economics", "Information Systems", "Management", "Quantitative Management"],
    },
    {
      id: "ru-bcom-commerce",
      name: "Bachelor of Commerce (BCom)",
      faculty: "Commerce",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": 4,
      },
      careerOpportunities: ["Accounting", "General Curriculum"],
    },
    {
      id: "ru-beco-economics",
      name: "Bachelor of Economics (BEco)",
      faculty: "Commerce",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": 4,
      },
      careerOpportunities: ["Business Sciences", "Environmental Economics", "Mineral Economics", "Social Sciences"],
    },
    {
      id: "ru-bcom-extended",
      name: "BCom Extended Studies",
      faculty: "Commerce",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": 4,
      },
      additionalRequirements: ["Additional Literacy", "Numeracy Courses"],
      careerOpportunities: ["Business", "Commerce"],
    },
    {
      id: "ru-bcom",
      name: "Bachelor of Commerce",
      faculty: "Commerce",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 5,
      },
      careerOpportunities: ["Accounting", "General Curriculum"],
    },
    {
      id: "ru-beco",
      name: "Bachelor of Economics",
      faculty: "Commerce",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 5,
      },
      careerOpportunities: ["Business Sciences", "Environmental Economics", "Mineral Economics", "Social Sciences"],
    },
    // Humanities
    {
      id: "ru-ba-arts",
      name: "Bachelor of Arts (BA)",
      faculty: "Humanities",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "english home language": {
          alternatives: [
            { subject: "english home language", level: 5 },
            { subject: "english first additional language", level: 6 },
          ],
        },
      },
      careerOpportunities: ["Anthropology", "Drama", "English", "Languages", "Literature", "Politics", "Psychology", "Sociology"],
    },
    {
      id: "ru-bss-social-science",
      name: "Bachelor of Social Science (BSS)",
      faculty: "Humanities",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "english home language": {
          alternatives: [
            { subject: "english home language", level: 5 },
            { subject: "english first additional language", level: 6 },
          ],
        },
      },
      careerOpportunities: ["Anthropology", "Economics", "Management", "Politics", "Psychology", "Sociology"],
    },
    {
      id: "ru-bfa-fine-arts",
      name: "Bachelor of Fine Arts (BFA)",
      faculty: "Humanities",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "english home language": {
          alternatives: [
            { subject: "english home language", level: 5 },
            { subject: "english first additional language", level: 6 },
          ],
        },
      },
      additionalRequirements: ["Portfolios may be required"],
      careerOpportunities: ["Art History", "Fine Art Practice", "Visual Culture"],
    },
    {
      id: "ru-bmus-music",
      name: "Bachelor of Music (BMus)",
      faculty: "Humanities",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "english home language": {
          alternatives: [
            { subject: "english home language", level: 5 },
            { subject: "english first additional language", level: 6 },
          ],
        },
      },
      additionalRequirements: ["Portfolios may be required"],
      careerOpportunities: ["Instrumental Music", "Music Theory"],
    },
    {
      id: "ru-bjourn-journalism",
      name: "Bachelor of Journalism (BJourn)",
      faculty: "Humanities",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "english home language": {
          alternatives: [
            { subject: "english home language", level: 5 },
            { subject: "english first additional language", level: 6 },
          ],
        },
      },
      additionalRequirements: ["Portfolios may be required"],
      careerOpportunities: ["Journalism"],
    },
    {
      id: "ru-ba-bss-extended",
      name: "BA or BSS Extended Studies",
      faculty: "Humanities",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "english home language": {
          alternatives: [
            { subject: "english home language", level: 5 },
            { subject: "english first additional language", level: 6 },
          ],
        },
      },
      careerOpportunities: ["Journalism", "Anthropology", "Politics", "Sociology"],
    },
    {
      id: "ru-ba",
      name: "Bachelor of Arts",
      faculty: "Humanities",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "english home language": {
          alternatives: [
            { subject: "english home language", level: 5 },
            { subject: "english first additional language", level: 6 },
          ],
        },
      },
      careerOpportunities: ["Anthropology", "Drama", "English", "Languages", "Literature", "Politics", "Psychology", "Sociology"],
    },
    {
      id: "ru-bss",
      name: "Bachelor of Social Science",
      faculty: "Humanities",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "english home language": {
          alternatives: [
            { subject: "english home language", level: 5 },
            { subject: "english first additional language", level: 6 },
          ],
        },
      },
      careerOpportunities: ["Anthropology", "Economics", "Management", "Politics", "Psychology", "Sociology"],
    },    {
      id: "ru-bmus",
      name: "Bachelor of Music",
      faculty: "Humanities",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "english home language": {
          alternatives: [
            { subject: "english home language", level: 5 },
            { subject: "english first additional language", level: 6 },
          ],
        },
      },
      additionalRequirements: ["Portfolios may be required"],
      careerOpportunities: ["Instrumental Music", "Music Theory"],
    },
    {
      id: "ru-bjourn",
      name: "Bachelor of Journalism",
      faculty: "Humanities",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "english home language": {
          alternatives: [
            { subject: "english home language", level: 5 },
            { subject: "english first additional language", level: 6 },
          ],
        },
      },
      additionalRequirements: ["Portfolios may be required"],
      careerOpportunities: ["Journalism"],
    },
    {
      id: "ru-bfa",
      name: "Bachelor of Fine Art",
      faculty: "Humanities",
      apsMin: 34,
      duration: "4 years",
      additionalRequirements: ["APS of 45+ for automatic acceptance. APS of 34-44 considered at Dean's discretion. Portfolio may be required."],
    },
    {
      id: "ru-ba-extended",
      name: "BA/BSS Extended Studies",
      faculty: "Humanities",
      apsMin: 30,
      duration: "4 years",
      additionalRequirements: ["APS of 30-34 points. Limited curriculum (Journalism & Anthropology or Politics & Sociology in the first year)."],
    },

    // Education
    {
      id: "ru-bedfp-education",
      name: "Bachelor of Education (BEDFP)",
      faculty: "Education",
      apsMin: 39,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      careerOpportunities: ["Foundation Phase Teaching"],
    },    {
      id: "ru-bedfp",
      name: "Bachelor of Education (Foundation Phase)",
      faculty: "Education",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 4,
        "Additional Language": 4,
        "Mathematics": 3,
      },
      additionalRequirements: ["APS of 40+ for automatic acceptance. APS of 32-39 considered at Dean's discretion. Mathematical Literacy at level 4 accepted instead of Mathematics."],
    },
    {
      id: "ru-pgce",
      name: "Postgraduate Certificate in Education",
      faculty: "Education",
      apsMin: 0,
      duration: "1 year",
      additionalRequirements: ["Requires a completed Bachelor's degree. Available for Foundation Phase, Intermediate Phase, Senior Phase, and FET Teaching."],
    },

    // Law
    {
      id: "ru-llb-law",
      name: "Bachelor of Law (LLB)",
      faculty: "Law",
      apsMin: 40,
      duration: "4 years",
      subjectRequirements: {
        "english home language": {
          alternatives: [
            { subject: "english home language", level: 5 },
            { subject: "english first additional language", level: 6 },
          ],
        },
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Legal Practice"],
    },    {
      id: "ru-llb",
      name: "Bachelor of Laws",
      faculty: "Law",
      apsMin: 38,
      duration: "4 years",
      additionalRequirements: ["Limited number of students admitted directly to LLB1. Most students enter after completing a first degree."],
    },
    {
      id: "ru-llb-combined",
      name: "BA/BCom/BSc with Law",
      faculty: "Law",
      apsMin: 38,
      duration: "5 years",
      additionalRequirements: ["3-year undergraduate degree plus 2-year LLB. Legal Theory 3 with minimum 60% required."],
    },
    {
      id: "ru-llb-postgrad",
      name: "LLB (Postgraduate)",
      faculty: "Law",
      apsMin: 0,
      duration: "3 years",
      additionalRequirements: ["Requires a completed Bachelor's degree without Law subjects."],
    },

    // Pharmacy
    {
      id: "ru-bpharm-pharmacy",
      name: "Bachelor of Pharmacy (BPharm)",
      faculty: "Pharmacy",
      apsMin: 40,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": 5,
        "life sciences": 5,
        "physical sciences": 5,
      },
      careerOpportunities: ["Manufacturing", "Wholesale and Distribution", "Community Pharmacy", "Hospital Pharmacy", "Research", "Academia"],
    },
    {
      id: "ru-bpharm",
      name: "Bachelor of Pharmacy",
      faculty: "Pharmacy",
      apsMin: 40,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 5,
        "Life Sciences": 5,
        "Physical Sciences": 5,
      },
      additionalRequirements: ["NBT (MAT) required"],
      careerOpportunities: ["Manufacturing", "Wholesale and Distribution", "Community Pharmacy", "Hospital Pharmacy", "Research", "Academia"],
    },

    // Science
    {
      id: "ru-bsc-science",
      name: "Bachelor of Science (BSc)",
      faculty: "Science",
      apsMin: 39,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 5,
        "life sciences": 5,
        "mathematics": 4,
        "physical sciences": 5,
      },
      additionalRequirements: ["NBT Mathematics Test required"],
      careerOpportunities: ["Biological Sciences", "Computational Sciences", "Earth Sciences", "Life Sciences"],
    },
    {
      id: "ru-bsc-information-systems",
      name: "Bachelor of Information Systems (BScInfoSys)",
      faculty: "Science",
      apsMin: 40,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 5,
        "mathematics": 4,
        "physical sciences": 5,
      },
      additionalRequirements: ["NBT Mathematics Test required"],
      careerOpportunities: ["Computer Science", "Economics Management", "Information Systems"],
    },
    {
      id: "ru-bsc",
      name: "Bachelor of Science",
      faculty: "Science",
      apsMin: 39,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 6,
        "Physical Sciences": 5,
      },
      additionalRequirements: ["NBT (MAT) required"],
      careerOpportunities: ["Biological Sciences", "Computational Sciences", "Earth Sciences", "Life Sciences"],
    },
    {
      id: "ru-bscinfosys-information-systems",
      name: "Bachelor of Information Systems",
      faculty: "Science",
      apsMin: 40,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 5,
        "mathematics": 4,
        "physical sciences": 5,
      },
      additionalRequirements: ["NBT (MAT) required"],
      careerOpportunities: ["Computer Science", "Economics Management", "Information Systems"],
    },
    {
      id: "ru-bsc-infosys",
      name: "Bachelor of Science (Information Systems)",
      faculty: "Science",
      apsMin: 38,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 7,
      },
      additionalRequirements: ["APS of 45+ for automatic acceptance. APS of 38-44 considered at Dean's discretion."],
    },
  ];

  /**
   * Rhodes-specific APS calculation
   * Uses standard South African APS system
   * - Best 6 subjects excluding Life Orientation
   * - Standard 7-point NSC scale
   */
  calculateApsScore(subjects: Record<string, number>): number {
    const subjectScores: number[] = [];

    for (const [subjectName, percentage] of Object.entries(subjects)) {
      if (subjectName.toLowerCase().includes("life orientation")) {
        continue;
      }

      let points = 0;
      if (percentage >= 80) points = 7;
      else if (percentage >= 70) points = 6;
      else if (percentage >= 60) points = 5;
      else if (percentage >= 50) points = 4;
      else if (percentage >= 40) points = 3;
      else if (percentage >= 30) points = 2;
      else if (percentage >= 0) points = 1;

      subjectScores.push(points);
    }

    subjectScores.sort((a, b) => b - a);
    const top6 = subjectScores.slice(0, 6);

    return top6.reduce((sum, score) => sum + score, 0);
  }
}
