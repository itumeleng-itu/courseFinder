import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * University of KwaZulu-Natal (UKZN) class
 */
export class UKZN extends BaseUniversity {
  readonly id = "ukzn"
  readonly name = "University of KwaZulu-Natal"
  readonly shortName = "UKZN"
  readonly website = "https://www.ukzn.ac.za"
  readonly logo = "/logos/ukzn.png"
  readonly location = {
    city: "Durban",
    province: "KwaZulu-Natal",
    coordinates: {
      latitude: -29.8674,
      longitude: 30.9802,
    },
  }

  /**
   * UKZN APS Calculation Method
   * - NSC Rating 7 (80-100%): 7 points
   * - NSC Rating 6 (70-79%): 6 points
   * - NSC Rating 5 (60-69%): 5 points
   * - NSC Rating 4 (50-59%): 4 points
   * - NSC Rating 3 (40-49%): 3 points
   * - NSC Rating 2 (30-39%): 2 points
   * - NSC Rating 1 (0-29%): 1 point
   *
   * Life Orientation is not included in the APS calculation
   * APS is calculated by adding the performance ratings of six NSC subjects
   */

  protected readonly _courses: Course[] = [
    // College of Agriculture, Engineering and Science
    {
      id: "ukzn-bsc-eng-agricultural",
      name: "BSc Engineering (Agricultural)",
      faculty: "Agriculture, Engineering and Science",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
        English: 4,
      },
      campus: "Pietermaritzburg",
    },
    {
      id: "ukzn-bsc-eng-chemical",
      name: "BSc Engineering (Chemical)",
      faculty: "Agriculture, Engineering and Science",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
        English: 4,
      },
      campus: "Howard College",
    },
    {
      id: "ukzn-bsc-eng-civil",
      name: "BSc Engineering (Civil)",
      faculty: "Agriculture, Engineering and Science",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
        English: 4,
      },
      campus: "Howard College/Pietermaritzburg",
    },
    {
      id: "ukzn-bsc-eng-computer",
      name: "BSc Engineering (Computer)",
      faculty: "Agriculture, Engineering and Science",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
        English: 4,
      },
      campus: "Howard College/Pietermaritzburg",
    },
    {
      id: "ukzn-bsc-eng-electrical",
      name: "BSc Engineering (Electrical)",
      faculty: "Agriculture, Engineering and Science",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
        English: 4,
      },
      campus: "Howard College/Pietermaritzburg",
    },
    {
      id: "ukzn-bsc-eng-electronic",
      name: "BSc Engineering (Electronic)",
      faculty: "Agriculture, Engineering and Science",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
        English: 4,
      },
      campus: "Howard College/Pietermaritzburg",
    },
    {
      id: "ukzn-bsc-eng-mechanical",
      name: "BSc Engineering (Mechanical)",
      faculty: "Agriculture, Engineering and Science",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
        English: 4,
      },
      campus: "Howard College/Pietermaritzburg",
    },
    {
      id: "ukzn-bsc-land-surveying",
      name: "BSc Land Surveying",
      faculty: "Agriculture, Engineering and Science",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
        English: 4,
      },
      campus: "Howard College",
    },
    {
      id: "ukzn-bsc-agric-economics",
      name: "BSc Agricultural Economics",
      faculty: "Agriculture, Engineering and Science",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 4,
        English: 4,
        "Agricultural Sciences": 4,
      },
      campus: "Pietermaritzburg",
      additionalRequirements:
        "Economics or Life Sciences or Physical Sciences at level 4 can replace Agricultural Sciences",
    },
    {
      id: "ukzn-bsc-stream-les",
      name: "BSc Stream (Life and Earth Sciences)",
      faculty: "Agriculture, Engineering and Science",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
        English: 4,
        "Life Sciences": 4,
      },
      campus: "Pietermaritzburg/Westville",
      additionalRequirements: "Agricultural Sciences or Physical Sciences at level 4 can replace Life Sciences",
    },
    {
      id: "ukzn-bsc-stream-mathematics",
      name: "BSc Stream (Mathematics)",
      faculty: "Agriculture, Engineering and Science",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 5,
        English: 4,
        "Life Sciences": 4,
      },
      campus: "Pietermaritzburg/Westville",
      additionalRequirements: "Agricultural Sciences or Physical Sciences at level 4 can replace Life Sciences",
    },

    // College of Health Sciences
    {
      id: "ukzn-bachelor-audiology",
      name: "Bachelor of Audiology",
      faculty: "Health Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
        "Life Sciences": 3,
      },
      campus: "Westville",
      additionalRequirements: "Physical Sciences at level 3 can replace Life Sciences",
    },
    {
      id: "ukzn-bachelor-speech-language-therapy",
      name: "Bachelor of Speech-Language Therapy",
      faculty: "Health Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
        "Life Sciences": 3,
      },
      campus: "Westville",
      additionalRequirements: "Physical Sciences at level 3 can replace Life Sciences",
    },
    {
      id: "ukzn-bachelor-dental-therapy",
      name: "Bachelor of Dental Therapy",
      faculty: "Health Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
        "Life Sciences": 3,
      },
      campus: "Westville",
    },
    {
      id: "ukzn-bachelor-medical-science-anatomy",
      name: "Bachelor of Medical Science (Anatomy)",
      faculty: "Health Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Life Sciences": 4,
        "Physical Sciences": 4,
      },
      campus: "Westville",
    },
    {
      id: "ukzn-bachelor-medical-science-physiology",
      name: "Bachelor of Medical Science (Physiology)",
      faculty: "Health Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Life Sciences": 4,
        "Physical Sciences": 4,
      },
      campus: "Westville",
    },
    {
      id: "ukzn-bachelor-occupational-therapy",
      name: "Bachelor of Occupational Therapy",
      faculty: "Health Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
        "Life Sciences": 3,
      },
      campus: "Westville",
      additionalRequirements: "Physical Sciences at level 3 can replace Life Sciences",
    },
    {
      id: "ukzn-bachelor-optometry",
      name: "Bachelor of Optometry",
      faculty: "Health Sciences",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Life Sciences": 4,
      },
      campus: "Westville",
      additionalRequirements: "Physical Sciences at level 4 can replace Life Sciences",
    },
    {
      id: "ukzn-bachelor-oral-hygiene",
      name: "Bachelor of Oral Hygiene",
      faculty: "Health Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
        "Life Sciences": 3,
      },
      campus: "Westville",
    },
    {
      id: "ukzn-bachelor-pharmacy",
      name: "Bachelor of Pharmacy",
      faculty: "Health Sciences",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Life Sciences": 4,
        "Physical Sciences": 4,
      },
      campus: "Westville",
    },
    {
      id: "ukzn-bachelor-physiotherapy",
      name: "Bachelor of Physiotherapy",
      faculty: "Health Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
        "Life Sciences": 4,
        "Physical Sciences": 4,
      },
      campus: "Westville",
    },
    {
      id: "ukzn-bachelor-sport-science",
      name: "Bachelor of Sport Science",
      faculty: "Health Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        "Mathematics Literacy": 3,
      },
      campus: "Westville",
      additionalRequirements: "Mathematics at level 3 can replace Mathematics Literacy",
    },
    {
      id: "ukzn-bachelor-nursing",
      name: "Bachelor of Nursing",
      faculty: "Health Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        "Mathematics Literacy": 3,
        "Life Sciences": 4,
      },
      campus: "Howard College",
      additionalRequirements: "Mathematics at level 3 can replace Mathematics Literacy",
    },
    {
      id: "ukzn-mbchb",
      name: "Bachelor of Medicine and Bachelor of Surgery",
      faculty: "Health Sciences",
      apsMin: 33,
      duration: "6 years",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Life Sciences": 5,
        "Physical Sciences": 5,
      },
      campus: "Medical School",
      additionalRequirements: "Minimum aggregate of 65%",
    },

    // College of Humanities
    {
      id: "ukzn-bed-foundation-phase",
      name: "Bachelor of Education (Foundation Phase)",
      faculty: "Humanities",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        "Mathematical Literacy": 4,
        isiZulu: 4,
      },
      campus: "Edgewood",
      additionalRequirements: "Mathematics at level 3 can replace Mathematical Literacy",
    },
    {
      id: "ukzn-bed-intermediate-phase",
      name: "Bachelor of Education (Intermediate Phase)",
      faculty: "Humanities",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
      },
      campus: "Edgewood",
      additionalRequirements:
        "Level 5 in any two of Mathematics, Mathematical Literacy, Technology, Life Sciences, Physical Sciences",
    },
    {
      id: "ukzn-bed-senior-phase-fet",
      name: "Bachelor of Education (Senior Phase/Further Education & Training)",
      faculty: "Humanities",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
      },
      campus: "Edgewood",
      additionalRequirements: "Level 5 in any two NSC subjects pertaining to the package selected",
    },
    {
      id: "ukzn-ba-general",
      name: "Bachelor of Arts (General Studies)",
      faculty: "Humanities",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
      },
      campus: "Howard College/Pietermaritzburg",
      additionalRequirements:
        "Level 5 in one of: Business Studies, Consumer Studies, Dramatic Arts, Economics, Geography, History, Information Technology, Life Sciences, Mathematics/Mathematical Literacy, Music, Religion Studies, Visual Arts, any language HL/FAL",
    },
    {
      id: "ukzn-ba-cultural-heritage-tourism",
      name: "Bachelor of Arts (Cultural and Heritage Tourism)",
      faculty: "Humanities",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
      },
      campus: "Howard College",
      additionalRequirements:
        "Level 5 in one of: Business Studies, Consumer Studies, Dramatic Arts, Economics, Geography, History, Information Technology, Life Sciences, Mathematics/Mathematical Literacy, Music, Religion Studies, Visual Arts, any language HL/FAL",
    },
    {
      id: "ukzn-ba-music",
      name: "Bachelor of Arts in Music",
      faculty: "Humanities",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
      },
      campus: "Howard College",
      additionalRequirements: "Audition required",
    },
    {
      id: "ukzn-bsocsc-general",
      name: "Bachelor of Social Science (General Studies)",
      faculty: "Humanities",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
      },
      campus: "Howard College/Pietermaritzburg",
      additionalRequirements:
        "Level 5 in one of: Business Studies, Consumer Studies, Dramatic Arts, Economics, Geography, History, Information Technology, Life Sciences, Mathematics/Mathematical Literacy, Music, Religion Studies, Visual Arts, any language HL/FAL",
    },
    {
      id: "ukzn-bsocsc-geography-environmental-management",
      name: "Bachelor of Social Science (Geography & Environmental Management)",
      faculty: "Humanities",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
      },
      campus: "Howard College/Pietermaritzburg",
      additionalRequirements:
        "Level 5 in one of: Business Studies, Consumer Studies, Dramatic Arts, Economics, Geography, History, Information Technology, Life Sciences, Mathematics/Mathematical Literacy, Music, Religion Studies, Visual Arts, any language HL/FAL",
    },
    {
      id: "ukzn-bsocsc-housing",
      name: "Bachelor of Social Science (Housing)",
      faculty: "Humanities",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
      },
      campus: "Howard College",
    },
    {
      id: "ukzn-bachelor-architectural-studies",
      name: "Bachelor of Architectural Studies",
      faculty: "Humanities",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 5,
      },
      campus: "Howard College",
      additionalRequirements:
        "Level 5 in one of: Business Studies, Consumer Studies, Dramatic Arts, Economics, Geography, History, Information Technology, Life Sciences, Music, Religion Studies, Visual Arts, any language HL/FAL. Portfolio submission required.",
    },
    {
      id: "ukzn-bachelor-social-work",
      name: "Bachelor of Social Work",
      faculty: "Humanities",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
      },
      campus: "Howard College",
      additionalRequirements:
        "Level 5 in one of: Business Studies, Consumer Studies, Dramatic Arts, Economics, Geography, History, Information Technology, Life Sciences, Mathematics/Mathematical Literacy, Music, Religion Studies, Visual Arts, any language HL/FAL",
    },

    // College of Law and Management Studies
    {
      id: "ukzn-bachelor-laws",
      name: "Bachelor of Laws",
      faculty: "Law and Management Studies",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        "English Home Language": 5,
        Mathematics: 3,
      },
      campus: "Howard College/Pietermaritzburg",
      additionalRequirements:
        "English First Additional Language at level 6 and Mathematical Literacy at level 5 can replace the requirements",
    },
    {
      id: "ukzn-bachelor-administration",
      name: "Bachelor of Administration",
      faculty: "Law and Management Studies",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
      },
      campus: "Westville",
    },
    {
      id: "ukzn-bachelor-business-administration",
      name: "Bachelor of Business Administration",
      faculty: "Law and Management Studies",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
      },
      campus: "Westville/Pietermaritzburg",
      additionalRequirements: "Evening classes only",
    },
    {
      id: "ukzn-bcom-general",
      name: "Bachelor of Commerce (General)",
      faculty: "Law and Management Studies",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
      },
      campus: "Westville/Pietermaritzburg",
    },
    {
      id: "ukzn-bcom-accounting",
      name: "Bachelor of Commerce (Accounting)",
      faculty: "Law and Management Studies",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 5,
      },
      campus: "Westville/Pietermaritzburg",
    },
    {
      id: "ukzn-bachelor-business-science-finance",
      name: "Bachelor of Business Science in Finance",
      faculty: "Law and Management Studies",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 6,
      },
      campus: "Westville",
    },
    {
      id: "ukzn-bachelor-business-science-investment",
      name: "Bachelor of Business Science in Investment Science",
      faculty: "Law and Management Studies",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        English: 4,
        Mathematics: 6,
      },
      campus: "Westville",
    },
  ]
}
