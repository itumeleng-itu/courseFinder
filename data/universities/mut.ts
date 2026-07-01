import { BaseUniversity } from "./base-university";
import type { Course } from "@/lib/types";

/**
 * Mangosuthu University of Technology (MUT) class
 */
export class MUT extends BaseUniversity {
  readonly id = "mut";
  readonly name = "Mangosuthu University of Technology";
  readonly shortName = "MUT";
  readonly website = "https://www.mut.ac.za";
  readonly logo = "/logos/mut.png";
  readonly location = {
    city: "Durban",
    province: "KwaZulu-Natal",
    coordinates: {
      latitude: -29.9689,
      longitude: 30.9149,
    },
  };

  protected readonly _courses: Course[] = [
    // Management Sciences
    {
      id: "mut-dip-accounting",
      name: "Diploma: Accounting",
      faculty: "Management Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "english first additional language": 5,
        "accounting": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 6 },
          ],
        },
      },
      additionalRequirements: ["Further departmental screening processes"],
      careerOpportunities: ["Accountant", "Financial Clerk", "Bookkeeper"],
    },
    {
      id: "mut-dip-cost-management-accounting",
      name: "Diploma: Cost and Management Accounting",
      faculty: "Management Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "accounting": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 6 },
          ],
        },
      },
      additionalRequirements: ["Further departmental screening processes"],
      careerOpportunities: ["Cost Accountant", "Management Accountant"],
    },
    {
      id: "mut-dip-local-government-finance",
      name: "Diploma: Local Government Finance",
      faculty: "Management Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "accounting": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 6 },
          ],
        },
      },
      additionalRequirements: ["Further departmental screening processes"],
      careerOpportunities: ["Municipal Finance Officer", "Public Sector Accountant"],
    },
    {
      id: "mut-dip-public-finance-accounting",
      name: "Diploma: Finance & Accounting: Public",
      faculty: "Management Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "english first additional language": 5,
        "accounting": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 6 },
          ],
        },
      },
      additionalRequirements: ["Further departmental screening processes"],
      careerOpportunities: ["Public Finance Officer", "Auditor"],
    },
    {
      id: "mut-dip-human-resource-management",
      name: "Diploma: Human Resource Management",
      faculty: "Management Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 3,
        "english first additional language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Further departmental screening processes"],
      careerOpportunities: ["HR Practitioner", "Recruitment Consultant"],
    },
    {
      id: "mut-dip-marketing",
      name: "Diploma: Marketing",
      faculty: "Management Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "english first additional language": 5,
        "accounting": 3,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Further departmental screening processes"],
      careerOpportunities: ["Marketing Coordinator", "Sales Representative"],
    },
    {
      id: "mut-dip-office-management-technology",
      name: "Diploma: Office Management and Technology",
      faculty: "Management Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "any five accredited subjects": 1,
      },
      additionalRequirements: ["Further departmental screening processes", "Pass in typing or computer studies an advantage"],
      careerOpportunities: ["Office Manager", "Administrative Assistant"],
    },
    {
      id: "mut-dip-public-management",
      name: "Diploma: Public Management",
      faculty: "Management Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "english first additional language": 4,
      },
      additionalRequirements: ["Further departmental screening processes"],
      careerOpportunities: ["Public Administrator", "Government Official"],
    },

    // Natural Sciences
    {
      id: "mut-b-applied-science-nature-conservation",
      name: "Bachelor of Applied Sciences in Nature Conservation",
      faculty: "Natural Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 3,
        "english home language": 5,
        "life sciences": 5,
      },
      additionalRequirements: ["Further departmental screening processes"],
      careerOpportunities: ["Nature Conservator", "Environmental Officer"],
    },
    {
      id: "mut-b-health-sciences-medical-lab",
      name: "Bachelor of Health Sciences: Medical Laboratory Science",
      faculty: "Natural Sciences",
      apsMin: 25,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": 4,
        "english home language": 4,
        "life sciences": 4,
        "physical sciences": 4,
      },
      additionalRequirements: ["Further departmental screening processes", "HPCSA registration required"],
      careerOpportunities: ["Medical Laboratory Scientist"],
    },
    {
      id: "mut-b-science-environmental-health",
      name: "Bachelor of Science in Environmental Health",
      faculty: "Natural Sciences",
      apsMin: 25,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": 4,
        "english home language": 4,
        "life sciences": 4,
        "physical sciences": 4,
      },
      additionalRequirements: ["Further departmental screening processes", "HPCSA registration required"],
      careerOpportunities: ["Environmental Health Practitioner"],
    },
    {
      id: "mut-dip-agriculture",
      name: "Diploma: Agriculture",
      faculty: "Natural Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "agricultural science or life science": 4,
        "english home language or fal": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
        "physical sciences": 3,
      },
      additionalRequirements: ["Further departmental screening processes"],
      careerOpportunities: ["Agricultural Technician", "Farm Manager"],
    },
    {
      id: "mut-dip-analytical-chemistry",
      name: "Diploma: Analytical Chemistry",
      faculty: "Natural Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "english home language or fal": 4,
        "mathematics": 4,
        "physical sciences": 4,
      },
      additionalRequirements: ["Further departmental screening processes"],
      careerOpportunities: ["Laboratory Technician", "Quality Controller"],
    },
    {
      id: "mut-dip-community-extension",
      name: "Diploma: Community Extension",
      faculty: "Natural Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "agricultural science, consumer studies, life science, geography or economics": 4,
      },
      additionalRequirements: ["Further departmental screening processes"],
      careerOpportunities: ["Community Development Worker"],
    },
    {
      id: "mut-dip-information-technology",
      name: "Diploma: Information Technology",
      faculty: "Natural Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "english home language or fal": 3,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Further departmental screening processes"],
      careerOpportunities: ["IT Technician", "Software Developer"],
    },
    {
      id: "mut-dip-nature-conservation",
      name: "Diploma: Nature Conservation",
      faculty: "Natural Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "english first additional language": 4,
        "agricultural science or life science": 4,
        "mathematics": 3,
      },
      additionalRequirements: ["Further departmental screening processes"],
      careerOpportunities: ["Game Ranger", "Conservationist"],
    },
    {
      id: "mut-dip-biomedical-science",
      name: "Diploma: Biomedical Science",
      faculty: "Natural Sciences",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english home language or fal": 4,
        "mathematics": 4,
        "life sciences or physical science": 4,
      },
      additionalRequirements: ["Compulsory entrance test", "Further departmental screening processes"],
      careerOpportunities: ["Biomedical technician"],
    },

    // Engineering
    {
      id: "mut-dip-chemical-engineering",
      name: "Diploma: Chemical Engineering",
      faculty: "Engineering",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 4,
        "physical sciences": 4,
        "english first additional language": 4,
      },
      additionalRequirements: ["Further departmental screening processes"],
      careerOpportunities: ["Chemical Engineering Technician"],
    },
    {
      id: "mut-dip-civil-engineering",
      name: "Diploma: Civil Engineering",
      faculty: "Engineering",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 4,
        "physical sciences": 4,
        "english first additional language": 4,
      },
      additionalRequirements: ["Further departmental screening processes"],
      careerOpportunities: ["Civil Engineering Technician"],
    },
    {
      id: "mut-dip-building",
      name: "Diploma: Building",
      faculty: "Engineering",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 4,
        "physical sciences": 4,
        "english first additional language": 4,
      },
      additionalRequirements: ["Further departmental screening processes"],
      careerOpportunities: ["Construction Manager", "Building Inspector"],
    },
    {
      id: "mut-dip-electrical-engineering",
      name: "Diploma: Electrical Engineering",
      faculty: "Engineering",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 4,
        "physical sciences": 4,
        "english first additional language": 4,
      },
      additionalRequirements: ["Further departmental screening processes"],
      careerOpportunities: ["Electrical Engineering Technician"],
    },
    {
      id: "mut-dip-mechanical-engineering",
      name: "Diploma: Mechanical Engineering",
      faculty: "Engineering",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 4,
        "physical sciences": 4,
        "english first additional language": 4,
        "engineering graphics and design": 4,
      },
      additionalRequirements: ["Further departmental screening processes"],
      careerOpportunities: ["Mechanical Engineering Technician"],
    },
    {
      id: "mut-dip-surveying",
      name: "Diploma: Surveying",
      faculty: "Engineering",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 4,
        "physical sciences": 4,
        "english first additional language": 4,
      },
      additionalRequirements: ["Further departmental screening processes"],
      careerOpportunities: ["Land Surveyor"],
    },
  ];

  /**
   * MUT-specific APS calculation
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
