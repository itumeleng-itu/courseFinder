import { BaseUniversity } from "./base-university";
import type { Course } from "@/lib/types";

import { percentageToLevel } from "@/lib/aps/utils";

/**
 * University of Mpumalanga (UMP) class
 */
export class UMP extends BaseUniversity {
  readonly id = "ump";
  readonly name = "University of Mpumalanga";
  readonly shortName = "UMP";
  readonly website = "https://www.ump.ac.za";
  readonly logo = "/logos/ump.png";
  readonly location = {
    city: "Mbombela",
    province: "Mpumalanga",
    coordinates: {
      latitude: -25.439,
      longitude: 30.9818,
    },
  };

  protected readonly _courses: Course[] = [
    // Not specified
    {
      id: "ump-dip-hospitality",
      name: "Diploma in Hospitality Management",
      faculty: "Not specified",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 3,
      },
      additionalRequirements: ["Diploma Endorsement"],
    },
    {
      id: "ump-b-development-studies",
      name: "Bachelor of Development Studies",
      faculty: "Not specified",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 2,
        "Alternatives": {
          alternatives: [
            { subject: "History", level: 4 },
            { subject: "Geography and One Other Social or Commercial Subject", level: 4 },
          ],
        },
      },
    },
    {
      id: "ump-hcert-event-management",
      name: "Higher Certificate in Event Management",
      faculty: "Not specified",
      apsMin: 19,
      duration: "1 year",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 2,
      },
      additionalRequirements: ["Diploma/Higher Certificate Endorsement"],
    },
    {
      id: "ump-b-social-work",
      name: "Bachelor of Social Work",
      faculty: "Not specified",
      apsMin: 32,
      duration: "4 years",
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
      id: "ump-ba-general",
      name: "Bachelor of Arts (General)",
      faculty: "Not specified",
      apsMin: 28,
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
      id: "ump-b-laws",
      name: "Bachelor of Laws",
      faculty: "Not specified",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Additional Language": 4,
        "Mathematics": 3,
      },
      additionalRequirements: ["Bachelor Endorsement"],
    },
    {
      id: "ump-b-commerce",
      name: "Bachelor of Commerce (General)",
      faculty: "Not specified",
      apsMin: 30,
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
      id: "ump-b-administration",
      name: "Bachelor of Administration",
      faculty: "Not specified",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Second Language": 4,
        "Mathematics": 2,
      },
    },
    {
      id: "ump-dip-nature-conservation",
      name: "Diploma in Nature Conservation",
      faculty: "Not specified",
      apsMin: 30,
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
      id: "ump-hcert-ict-support",
      name: "Higher Certificate in ICT in User Support",
      faculty: "Not specified",
      apsMin: 20,
      duration: "1 year",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 2,
      },
      additionalRequirements: ["Diploma and/or Higher Certificate Endorsement"],
    },
    {
      id: "ump-dip-agriculture-plant",
      name: "Diploma in Agriculture in Plant Production",
      faculty: "Not specified",
      apsMin: 23,
      duration: "3 years",
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
      id: "ump-bsc-agriculture",
      name: "Bachelor of Science in Agriculture",
      faculty: "Not specified",
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
        "Alternatives": {
          alternatives: [
            { subject: "Life Sciences", level: 4 },
            { subject: "Biology", level: 4 },
            { subject: "Agriculture", level: 4 },
          ],
        },
        "Physical Sciences": 4,
      },
    },
    {
      id: "ump-bsc-forestry",
      name: "Bachelor of Science in Forestry",
      faculty: "Not specified",
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
        "Physical Sciences": 4,
      },
      additionalRequirements: ["Bachelor Pass"],
    },
    {
      id: "ump-dip-animal-production",
      name: "Diploma in Animal Production",
      faculty: "Not specified",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 3,
        "Physical Science": 3,
        "Alternatives": {
          alternatives: [
            { subject: "Life Sciences", level: 4 },
            { subject: "Agriculture", level: 4 },
          ],
        },
      },
    },
    {
      id: "ump-b-agriculture",
      name: "Bachelor of Agriculture in Agricultural Extension and Rural Resource Management",
      faculty: "Not specified",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 4,
        "Alternatives": {
          alternatives: [
            { subject: "Agriculture", level: 4 },
            { subject: "Life Science", level: 4 },
          ],
        },
        "Physical Science": 4,
      },
    },
    {
      id: "ump-bsc-environmental",
      name: "Bachelor of Science in Environmental Science",
      faculty: "Not specified",
      apsMin: 30,
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
      id: "ump-bsc-general",
      name: "Bachelor of Science Degree",
      faculty: "Not specified",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 4,
        "Alternatives": {
          alternatives: [
            { subject: "Life Science", level: 4 },
            { subject: "Physical Science", level: 4 },
            { subject: "Geography", level: 4 },
          ],
        },
      },
    },
    {
      id: "ump-dip-ict-applications",
      name: "Diploma in ICT in Applications Development",
      faculty: "Not specified",
      apsMin: 24,
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
      additionalRequirements: ["Diploma Endorsement"],
    },
    {
      id: "ump-b-ict",
      name: "Bachelor of ICT",
      faculty: "Not specified",
      apsMin: 32,
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
      additionalRequirements: ["Bachelor Endorsement"],
    },
    {
      id: "ump-bed-foundation",
      name: "Bachelor of Education in Foundation Phase Teaching",
      faculty: "Not specified",
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
    },
  ];

  /**
   * UMP-specific APS calculation
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
