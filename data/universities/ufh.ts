import { BaseUniversity } from "./base-university";
import type { Course } from "@/lib/types";

/**
 * University of Fort Hare (UFH) class
 */
export class UFH extends BaseUniversity {
  readonly id = "ufh";
  readonly name = "University of Fort Hare";
  readonly shortName = "UFH";
  readonly website = "https://www.ufh.ac.za";
  readonly logo = "/logos/ufh.png";
  readonly location = {
    city: "Alice",
    province: "Eastern Cape",
    coordinates: {
      latitude: -32.7833,
      longitude: 26.85,
    },
  };

  /**
   * Calculate APS score based on UFH's method
   * UFH uses NSC levels directly with Life Orientation capped at level 4
   */
  calculateAps(subjects: { name: string; percent: number }[]): number {
    // Sort subjects by percentage in descending order
    const sortedSubjects = [...subjects].sort((a, b) => b.percent - a.percent);

    let totalAps = 0;
    let subjectsUsed = 0;

    for (const subject of sortedSubjects) {
      // Skip Life Orientation for now, we'll add it separately with cap
      if (subject.name === "Life Orientation") continue;

      // Get APS points based on percentage
      const points = this.getApsPoints(subject.percent);

      // Add points to total
      totalAps += points;
      subjectsUsed++;

      // Only use 6 subjects excluding Life Orientation
      if (subjectsUsed >= 6) break;
    }

    // Add Life Orientation (capped at level 4)
    const lifeOrientation = subjects.find((s) => s.name === "Life Orientation");
    if (lifeOrientation) {
      const loPoints = Math.min(this.getApsPoints(lifeOrientation.percent), 4);
      totalAps += loPoints;
    }

    return totalAps;
  }

  /**
   * Convert percentage to APS points based on NSC levels
   */
  private getApsPoints(percent: number): number {
    if (percent >= 80) return 7;
    if (percent >= 70) return 6;
    if (percent >= 60) return 5;
    if (percent >= 50) return 4;
    if (percent >= 40) return 3;
    if (percent >= 30) return 2;
    return 1;
  }

  protected readonly _courses: Course[] = [
    // Faculty of Education
    {
      id: "ufh-bed-senior-fet-agriculture",
      name: "Bachelor of Education Senior and FET Phase (Agriculture specialisation)",
      faculty: "Faculty of Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 4,
        "Agricultural Science": 4,
        "Life Sciences": 4,
      },
    },
    {
      id: "ufh-bed-senior-fet-commerce",
      name: "Bachelor of Education Senior and FET Phase (Commerce specialisation)",
      faculty: "Faculty of Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 3,
        "Accounting": 4,
        "Economics": 4,
        "Business Studies": 4,
      },
    },
    {
      id: "ufh-bed-senior-fet-science",
      name: "Bachelor of Education Senior and FET Phase (Science specialisation)",
      faculty: "Faculty of Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
        "Geography": 4,
        "Computer Applications Technology": 4,
      },
    },
    {
      id: "ufh-bed-senior-fet-social-science",
      name: "Bachelor of Education Senior and FET Phase (Social Science specialisation)",
      faculty: "Faculty of Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "isiXhosa Home Language": 4,
        "isiXhosa First Additional Language": 4,
        "Afrikaans Home Language": 4,
        "Afrikaans First Additional Language": 4,
        "History": 4,
        "Geography": 4,
      },
    },
    {
      id: "ufh-bed-foundation-phase",
      name: "Bachelor of Education in Foundation Phase Teaching",
      faculty: "Faculty of Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 4,
        "isiXhosa Home Language": 4,
        "isiXhosa First Additional Language": 4,
        "Afrikaans Home Language": 4,
        "Afrikaans First Additional Language": 4,
      },
    },
    {
      id: "ufh-bed-intermediate-phase",
      name: "Bachelor of Education in Intermediate Phase Teaching",
      faculty: "Faculty of Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 4,
        "isiXhosa Home Language": 4,
        "isiXhosa First Additional Language": 4,
        "Afrikaans Home Language": 4,
        "Afrikaans First Additional Language": 4,
      },
    },

    // Faculty of Law
    {
      id: "ufh-llb",
      name: "Bachelor of Laws",
      faculty: "Faculty of Law",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 3,
      },
    },
    {
      id: "ufh-llb-extended",
      name: "Bachelor of Laws (Extended Programme)",
      faculty: "Faculty of Law",
      apsMin: 28,
      duration: "5 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 2,
      },
    },
    {
      id: "ufh-bcom-law",
      name: "Bachelor of Commerce in Law",
      faculty: "Faculty of Law",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 4,
      },
    },

    // Faculty of Health Sciences
    {
      id: "ufh-bhsc-human-movement",
      name: "Bachelor of Health Sciences in Human Movement Science",
      faculty: "Faculty of Health Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 4,
        "Life Sciences": 4,
      },
    },
    {
      id: "ufh-bsc-speech-language",
      name: "Bachelor of Science in Speech Language Pathology",
      faculty: "Faculty of Health Sciences",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
    },
    {
      id: "ufh-bnursing",
      name: "Bachelor of Nursing",
      faculty: "Faculty of Health Sciences",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
    },

    // Faculty of Management and Commerce
    {
      id: "ufh-badmin-public-admin",
      name: "Bachelor of Administration in Public Administration",
      faculty: "Faculty of Management and Commerce",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 2,
      },
    },
    {
      id: "ufh-bcom",
      name: "Bachelor of Commerce",
      faculty: "Faculty of Management and Commerce",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 4,
      },
    },
    {
      id: "ufh-bachelor-of-commerce-extended-curriculum-programme",
      name: "Bachelor of Commerce: Extended Curriculum Programme",
      faculty: "Faculty of Management and Commerce",
      apsMin: 27,
      duration: "4 years",
      subjectRequirements: {
        "english home language": {
          alternatives: [
            { subject: "english home language", level: 4 },
            { subject: "english first additional language", level: 4 },
          ],
        },
        "mathematics": 3,
        "life orientation": 4,
      },
    },
    {
      id: "ufh-bachelor-of-commerce-economics",
      name: "Bachelor of Commerce (Economics)",
      faculty: "Faculty of Management and Commerce",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "english home language": {
          alternatives: [
            { subject: "english home language", level: 4 },
            { subject: "english first additional language", level: 4 },
          ],
        },
        "mathematics": 4,
        "life orientation": 4,
      },
    },
    {
      id: "ufh-bachelor-of-commerce-economics-extended-curriculum-programme",
      name: "Bachelor of Commerce (Economics) Extended Curriculum Programme",
      faculty: "Faculty of Management and Commerce",
      apsMin: 27,
      duration: "4 years",
      subjectRequirements: {
        "english home language": {
          alternatives: [
            { subject: "english home language", level: 4 },
            { subject: "english first additional language", level: 4 },
          ],
        },
        "mathematics": 3,
        "life orientation": 4,
      },
    },
    {
      id: "ufh-bachelor-of-commerce-industrial-psychology",
      name: "Bachelor of Commerce (Industrial Psychology)",
      faculty: "Faculty of Management and Commerce",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "english home language": {
          alternatives: [
            { subject: "english home language", level: 4 },
            { subject: "english first additional language", level: 4 },
          ],
        },
        "mathematics": 4,
        "life orientation": 4,
      },
    },
    {
      id: "ufh-bachelor-of-commerce-industrial-psychology-extended-curriculum-programme",
      name: "Bachelor of Commerce: (Industrial Psychology) Extended Curriculum Programme",
      faculty: "Faculty of Management and Commerce",
      apsMin: 27,
      duration: "4 years",
      subjectRequirements: {
        "english home language": {
          alternatives: [
            { subject: "english home language", level: 4 },
            { subject: "english first additional language", level: 4 },
          ],
        },
        "mathematics": 3,
        "life orientation": 4,
      },
    },
    {
      id: "ufh-bcom-information-systems",
      name: "Bachelor of Commerce in Information Systems",
      faculty: "Faculty of Management and Commerce",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 4,
      },
    },
    {
      id: "ufh-bachelor-of-commerce-in-information-systems-extended-curriculum-programme",
      name: "Bachelor of Commerce in Information Systems Extended Curriculum Programme",
      faculty: "Faculty of Management and Commerce",
      apsMin: 27,
      duration: "4 years",
      subjectRequirements: {
        "english home language": {
          alternatives: [
            { subject: "english home language", level: 4 },
            { subject: "english first additional language", level: 4 },
          ],
        },
        "mathematics": 3,
        "life orientation": 4,
      },
    },

    // Management and Commerce
    {
      id: "ufh-bcom-extended",
      name: "Bachelor of Commerce (Extended Programme)",
      faculty: "Management and Commerce",
      apsMin: 27,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 3,
      },
      additionalRequirements: ["Life Orientation at level 4 (50-59%)."],
    },
    {
      id: "ufh-bcom-accounting",
      name: "Bachelor of Commerce in Accounting",
      faculty: "Management and Commerce",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 5,
      },
      additionalRequirements: ["Life Orientation at level 4 (50-59%). Two additional subjects at level 5 (60-69%)."],
    },
    {
      id: "ufh-bcom-accounting-extended",
      name: "Bachelor of Commerce in Accounting (Extended Programme)",
      faculty: "Management and Commerce",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 4,
      },
      additionalRequirements: ["Life Orientation at level 4 (50-59%). Two additional subjects at level 5 (60-69%)."],
    },
    {
      id: "ufh-bcom-information-systems-extended",
      name: "Bachelor of Commerce in Information Systems (Extended Programme)",
      faculty: "Management and Commerce",
      apsMin: 27,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 3,
      },
      additionalRequirements: ["Life Orientation at level 4 (50-59%)."],
    },

    // Social Science and Humanities
    {
      id: "ufh-ba",
      name: "Bachelor of Arts",
      faculty: "Social Science and Humanities",
      apsMin: 27,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Life Orientation at level 4 (50-59%). Another language at level 4 (50-59%)."],
    },
    {
      id: "ufh-ba-extended",
      name: "Bachelor of Arts (Extended Programme)",
      faculty: "Social Science and Humanities",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Life Orientation at level 4 (50-59%). Another language at level 4 (50-59%)."],
    },
    {
      id: "ufh-bfa",
      name: "Bachelor of Fine Art",
      faculty: "Social Science and Humanities",
      apsMin: 27,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Life Orientation at level 4 (50-59%). Another language at level 4 (50-59%). Portfolio submission required."],
    },
    {
      id: "ufh-blis",
      name: "Bachelor of Library and Information Science",
      faculty: "Social Science and Humanities",
      apsMin: 27,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Life Orientation at level 4 (50-59%). Another language at level 4 (50-59%)."],
    },
    {
      id: "ufh-bmusic",
      name: "Bachelor of Music",
      faculty: "Social Science and Humanities",
      apsMin: 27,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Life Orientation at level 4 (50-59%). Another language at level 4 (50-59%). Audition and music theory test required."],
    },
    {
      id: "ufh-bsocsc",
      name: "Bachelor of Social Science",
      faculty: "Social Science and Humanities",
      apsMin: 27,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Life Orientation at level 4 (50-59%). Another language at level 4 (50-59%)."],
    },
    {
      id: "ufh-bsocsc-extended",
      name: "Bachelor of Social Science (Extended Programme)",
      faculty: "Social Science and Humanities",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Life Orientation at level 4 (50-59%). Another language at level 4 (50-59%)."],
    },
    {
      id: "ufh-bsocsc-communication",
      name: "Bachelor of Social Science in Communication",
      faculty: "Social Science and Humanities",
      apsMin: 27,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Life Orientation at level 4 (50-59%). Another language at level 4 (50-59%)."],
    },
    {
      id: "ufh-bsocsc-human-settlement",
      name: "Bachelor of Social Science in Human Settlement",
      faculty: "Social Science and Humanities",
      apsMin: 27,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Life Orientation at level 4 (50-59%). Another language at level 4 (50-59%)."],
    },
    {
      id: "ufh-bsw",
      name: "Bachelor of Social Work",
      faculty: "Social Science and Humanities",
      apsMin: 27,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Life Orientation at level 4 (50-59%). Another language at level 4 (50-59%)."],
    },
    {
      id: "ufh-bth",
      name: "Bachelor of Theology",
      faculty: "Social Science and Humanities",
      apsMin: 27,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Life Orientation at level 4 (50-59%). Another language at level 4 (50-59%)."],
    },

    // Science and Agriculture
    {
      id: "ufh-bsc",
      name: "Bachelor of Science",
      faculty: "Science and Agriculture",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["Life Orientation at level 4 (50-59%). One of Life Sciences, Geography, Agriculture or Information Technology at level 4."],
    },
    {
      id: "ufh-bsc-extended",
      name: "Bachelor of Science (Extended Programme)",
      faculty: "Science and Agriculture",
      apsMin: 27,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 3,
        "Physical Sciences": 3,
      },
      additionalRequirements: ["Life Orientation at level 4 (50-59%). Level 3 in either Mathematics or Physical Science, but the other must be at Level 4. One of Life Sciences, Geography, Agriculture or Information Technology at level 4."],
    },
    {
      id: "ufh-bsc-agric-soil-science",
      name: "Bachelor of Science in Agriculture (in) Soil Science",
      faculty: "Science and Agriculture",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["Life Orientation at level 4 (50-59%). One of Life Sciences, Geography, Agriculture or Information Technology at level 4."],
    },
    {
      id: "ufh-bsc-agric-horticulture",
      name: "Bachelor of Science in Agriculture (in) Horticulture",
      faculty: "Science and Agriculture",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["Life Orientation at level 4 (50-59%). One of Life Sciences, Geography, Agriculture or Information Technology at level 4."],
    },
    {
      id: "ufh-bsc-agric-crops",
      name: "Bachelor of Science in Agriculture (in) Crops",
      faculty: "Science and Agriculture",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["Life Orientation at level 4 (50-59%). One of Life Sciences, Geography, Agriculture or Information Technology at level 4."],
    },
    {
      id: "ufh-bsc-agric-animal-production",
      name: "Bachelor of Science in Agriculture (in) Animal Production",
      faculty: "Science and Agriculture",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["Life Orientation at level 4 (50-59%). One of Life Sciences, Geography, Agriculture or Information Technology at level 4."],
    },
    {
      id: "ufh-bsc-agric-pasture-science",
      name: "Bachelor of Science in Agriculture (in) Pasture Science",
      faculty: "Science and Agriculture",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["Life Orientation at level 4 (50-59%). One of Life Sciences, Geography, Agriculture or Information Technology at level 4."],
    },
    {
      id: "ufh-bsc-agric-agricultural-economics",
      name: "Bachelor of Science in Agriculture (in) Agricultural Economics",
      faculty: "Science and Agriculture",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 4,
        "Life Sciences": 4,
      },
      additionalRequirements: ["Life Orientation at level 4 (50-59%). One of Agriculture, Geography or Information Technology at level 4."],
    },
    {
      id: "ufh-bagric",
      name: "Bachelor of Agriculture",
      faculty: "Science and Agriculture",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 4,
        "Agriculture": 4,
      },
      additionalRequirements: ["Life Orientation at level 4 (50-59%). With Mathematical Literacy at level 5 (60-69%), minimum APS is 29."],
    },
    {
      id: "ufh-bagric-agricultural-extension",
      name: "Bachelor of Agriculture (in) Agricultural Extension",
      faculty: "Science and Agriculture",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 4,
        "Agriculture": 4,
      },
      additionalRequirements: ["Life Orientation at level 4 (50-59%). With Mathematical Literacy at level 5 (60-69%), minimum APS is 29."],
    },
  ];

  /**
   * UFH-specific APS calculation
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
