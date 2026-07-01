import { BaseUniversity } from "./base-university";
import type { Course } from "@/lib/types";

/**
 * University of KwaZulu-Natal (UKZN) class
 */
export class UKZN extends BaseUniversity {
  readonly id = "ukzn";
  readonly name = "University of KwaZulu-Natal";
  readonly shortName = "UKZN";
  readonly website = "https://www.ukzn.ac.za";
  readonly logo = "/logos/ukzn.png";
  readonly location = {
    city: "Durban",
    province: "KwaZulu-Natal",
    coordinates: {
      latitude: -29.8674,
      longitude: 30.9802,
    },
  };

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
      name: "B Sc Eng: Agricultural",
      faculty: "College of Agriculture, Engineering and Science",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": 5,
        "physical sciences": 5,
      },
      careerOpportunities: ["Agricultural Engineer"],
    },
    {
      id: "ukzn-b-arch-studies",
      name: "B Architectural Studies",
      faculty: "College of Agriculture, Engineering and Science",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": 5,
      },
      additionalRequirements: ["Portfolio of creative work", "Essay", "Questionnaire"],
      careerOpportunities: ["Architect"],
    },
    {
      id: "ukzn-b-sc-agric-agri-econ",
      name: "B Sc. Agric. Agricultural Economics",
      faculty: "College of Agriculture, Engineering and Science",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": 4,
      },
      careerOpportunities: ["Agricultural Economist"],
    },
    {
      id: "ukzn-bachelor-architectural-studies",
      name: "Bachelor of Architectural Studies",
      faculty: "College of Agriculture, Engineering and Science",
      apsMin: 30,
      duration: "Not specified",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 5,
      },
      additionalRequirements: ["Portfolio of creative work", "Essay", "Questionnaire", "Selection based on portfolio and essay responses"],
      careerOpportunities: ["Architectural design professional", "Postgraduate studies in Architecture"],
    },
    {
      id: "ukzn-bsc-engineering",
      name: "Bachelor of Science in Engineering",
      faculty: "College of Agriculture, Engineering and Science",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "life orientation": 4,
        "mathematics": 5,
        "physical sciences": 5,
      },
      additionalRequirements: ["Practical experience in machine shops, industry or construction work during vacation"],
      careerOpportunities: ["Agricultural Engineer", "Computer Engineer", "Chemical Engineer", "Civil Engineer", "Electrical Engineer", "Electronic Engineer", "Mechanical Engineer"],
    },
    {
      id: "ukzn-bsc-land-surveying",
      name: "Bachelor of Science in Land Surveying",
      faculty: "College of Agriculture, Engineering and Science",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "life orientation": 4,
        "mathematics": 5,
        "physical sciences": 5,
      },
      additionalRequirements: ["Survey Camp in July vacation"],
      careerOpportunities: ["Land Surveyor", "Geomatics Specialist"],
    },

    // College of Health Sciences
    {
      id: "ukzn-b-medicine-surgery",
      name: "B Medicine & B Surgery",
      faculty: "College of Health Sciences",
      apsMin: 33,
      duration: "6 years",
      subjectRequirements: {
        "english home language": 5,
        "mathematics": 5,
        "physical sciences": 5,
        "life sciences": 5,
      },
      additionalRequirements: ["65% aggregate required"],
      careerOpportunities: ["Medical Doctor"],
    },
    {
      id: "ukzn-bachelor-nursing",
      name: "Bachelor of Nursing",
      faculty: "College of Health Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics Literacy": 3,
        "Life Sciences": 4,
      },
      additionalRequirements: ["Clinical training/placements"],
      careerOpportunities: ["General Nurse", "Psychiatric Nurse", "Midwife", "Community Health Nurse"],
    },
    {
      id: "ukzn-mbchb",
      name: "Bachelor of Medicine and Bachelor of Surgery",
      faculty: "College of Health Sciences",
      apsMin: 30,
      duration: "6 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Life Sciences": 5,
        "Physical Sciences": 5,
      },
      additionalRequirements: ["Minimum 60% in each subject", "65% aggregate"],
      careerOpportunities: ["Medical Practitioner", "General Practitioner", "Medical Specialist", "Medical Researcher"],
    },

    // College of Humanities
    {
      id: "ukzn-b-ed-foundation",
      name: "B Ed (Foundation Phase)",
      faculty: "College of Humanities",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "isizulu": 4,
      },
      careerOpportunities: ["Foundation Phase Teacher"],
    },
    {
      id: "ukzn-bachelor-education",
      name: "Bachelor of Education",
      faculty: "College of Humanities",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "english first additional language": 4,
        "life orientation": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Bachelors pass or NQF Level 4 National Certificate (Vocational) with degree endorsement"],
      careerOpportunities: ["Teacher"],
    },
    {
      id: "ukzn-bsocsc-geography-environmental-management",
      name: "Bachelor of Social Science (Geography and Environmental Management)",
      faculty: "College of Humanities",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "life orientation": 4,
      },
      additionalRequirements: ["Mathematics and Geography recommended"],
      careerOpportunities: ["Environmental consultant", "Environmental manager", "Policy analyst"],
    },
    {
      id: "ukzn-bsocsc-housing",
      name: "Bachelor of Social Science (Housing)",
      faculty: "College of Humanities",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
      },
      additionalRequirements: ["None"],
      careerOpportunities: ["Housing project manager", "Property manager", "Housing policy developer"],
    },
    {
      id: "ukzn-ba-music",
      name: "Bachelor of Art in Music",
      faculty: "College of Humanities",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "life orientation": 4,
      },
      additionalRequirements: ["None"],
      careerOpportunities: ["Music teacher", "Performer", "Composer", "Researcher"],
    },
    {
      id: "ukzn-ba-philosophy-politics-law",
      name: "Bachelor of Arts (Philosophy, Politics and Law)",
      faculty: "College of Humanities",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "life orientation": 4,
      },
      additionalRequirements: ["None"],
      careerOpportunities: ["Legal practitioner", "Management consultant", "Policy advisor"],
    },
    {
      id: "ukzn-ba-visual-art",
      name: "Bachelor of Arts (Visual Art)",
      faculty: "College of Humanities",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "life orientation": 4,
      },
      additionalRequirements: ["None"],
      careerOpportunities: ["Educator", "Designer", "Animator", "Illustrator", "Museologist"],
    },
    {
      id: "ukzn-bachelor-social-work",
      name: "Bachelor of Social Work",
      faculty: "College of Humanities",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
      },
      additionalRequirements: ["None"],
      careerOpportunities: ["Social worker", "Private practitioner", "Community development officer"],
    },

    // College of Law and Management Studies
    {
      id: "ukzn-bachelor-laws",
      name: "Bachelor of Laws",
      faculty: "College of Law and Management Studies",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        "English Home Language": 5,
        "Mathematics": 3,
      },
      careerOpportunities: ["Legal Practitioner", "Advocate", "Attorney"],
    },
    {
      id: "ukzn-bcom-extended-general",
      name: "B Com 4 Extended Curriculum (General)",
      faculty: "College of Law and Management Studies",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": 3,
        "english home language": 4,
        "life orientation": 4,
      },
      additionalRequirements: ["Preference given to students from Quintile 1-3 schools"],
    },
    {
      id: "ukzn-bcom-extended-accounting",
      name: "B Com 4 Extended Curriculum (Accounting)",
      faculty: "College of Law and Management Studies",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": 4,
        "english home language": 4,
        "life orientation": 4,
      },
      additionalRequirements: ["Preference given to students from Quintile 1-3 schools"],
    },
    {
      id: "ukzn-llb",
      name: "Bachelor of Laws (LLB)",
      faculty: "College of Law and Management Studies",
      apsMin: 32,
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
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Moot Court participation"],
      careerOpportunities: ["Advocate", "Attorney", "Legal advisor", "Magistrate"],
    },
    {
      id: "ukzn-bachelor-administration",
      name: "Bachelor of Administration",
      faculty: "College of Law and Management Studies",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
      },
      additionalRequirements: ["None"],
      careerOpportunities: ["Public administrator", "Human resource manager", "Government official"],
    },
    {
      id: "ukzn-bachelor-business-administration",
      name: "Bachelor of Business Administration",
      faculty: "College of Law and Management Studies",
      apsMin: 26,
      duration: "3-4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
      },
      additionalRequirements: ["Evening classes only"],
      careerOpportunities: ["Business manager", "Entrepreneur", "Operations manager"],
    },
    {
      id: "ukzn-b-commerce",
      name: "Bachelor of Commerce",
      faculty: "College of Law and Management Studies",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": 4,
      },
      additionalRequirements: ["None"],
      careerOpportunities: ["Economist", "Financial manager", "Marketing manager", "Supply chain manager"],
    },
    {
      id: "ukzn-b-commerce-accounting",
      name: "Bachelor of Commerce in Accounting",
      faculty: "College of Law and Management Studies",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": 5,
      },
      additionalRequirements: ["None"],
      careerOpportunities: ["Chartered Accountant", "Auditor", "Financial accountant"],
    },
    {
      id: "ukzn-b-business-science",
      name: "Bachelor of Business Science",
      faculty: "College of Law and Management Studies",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "life orientation": 4,
        "mathematics": 6,
      },
      additionalRequirements: ["None"],
      careerOpportunities: ["Chartered Financial Analyst", "Investment Analyst", "Economist"],
    },

    // Humanities and Social Sciences
    {
      id: "ukzn-bsocsc-extended",
      name: "B Soc Sc Extended Curriculum",
      faculty: "Humanities and Social Sciences",
      apsMin: 20,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "life orientation": 4,
      },
      additionalRequirements: ["Only applicants from schools with quintiles 1 and 2 will be considered"],
    },

    // Humanities
    {
      id: "ukzn-ba-music-foundation",
      name: "BA in Music Foundation",
      faculty: "Humanities",
      apsMin: 22,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "life orientation": 4,
      },
      additionalRequirements: ["Preference given to quintiles 1-3", "Applicants from other quintiles considered if they have no previous formal musical training and show exceptional potential"],
      careerOpportunities: ["Music theory", "Performance"],
    },
    {
      id: "ukzn-bed-foundation-phase",
      name: "Bachelor of Education (Foundation Phase)",
      faculty: "Humanities",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematical Literacy": 4,
        "isiZulu": 4,
      },
      additionalRequirements: ["Mathematics at level 3 can replace Mathematical Literacy"],
    },
    {
      id: "ukzn-bed-intermediate-phase",
      name: "Bachelor of Education (Intermediate Phase)",
      faculty: "Humanities",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
      },
      additionalRequirements: ["Level 5 in any two of Mathematics, Mathematical Literacy, Technology, Life Sciences, Physical Sciences"],
    },
    {
      id: "ukzn-bed-senior-phase-fet",
      name: "Bachelor of Education (Senior Phase/Further Education & Training)",
      faculty: "Humanities",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
      },
      additionalRequirements: ["Level 5 in any two NSC subjects pertaining to the package selected"],
    },
    {
      id: "ukzn-ba-general",
      name: "Bachelor of Arts (General Studies)",
      faculty: "Humanities",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
      },
      additionalRequirements: ["Level 5 in one of: Business Studies, Consumer Studies, Dramatic Arts, Economics, Geography, History, Information Technology, Life Sciences, Mathematics/Mathematical Literacy, Music, Religion Studies, Visual Arts, any language HL/FAL"],
    },
    {
      id: "ukzn-ba-cultural-heritage-tourism",
      name: "Bachelor of Arts (Cultural and Heritage Tourism)",
      faculty: "Humanities",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
      },
      additionalRequirements: ["Level 5 in one of: Business Studies, Consumer Studies, Dramatic Arts, Economics, Geography, History, Information Technology, Life Sciences, Mathematics/Mathematical Literacy, Music, Religion Studies, Visual Arts, any language HL/FAL"],
    },    {
      id: "ukzn-bsocsc-general",
      name: "Bachelor of Social Science (General Studies)",
      faculty: "Humanities",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
      },
      additionalRequirements: ["Level 5 in one of: Business Studies, Consumer Studies, Dramatic Arts, Economics, Geography, History, Information Technology, Life Sciences, Mathematics/Mathematical Literacy, Music, Religion Studies, Visual Arts, any language HL/FAL"],
    },
    // College of Health Science
    {
      id: "ukzn-bachelor-audiology",
      name: "Bachelor of Audiology",
      faculty: "College of Health Science",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
        "Life Sciences": 3,
      },
      careerOpportunities: ["Audiologist", "Hearing healthcare service delivery in public and private sectors", "Hospitals", "Special schools", "Private practice"],
    },
    {
      id: "ukzn-bachelor-speech-language-therapy",
      name: "Bachelor of Speech-Language Therapy",
      faculty: "College of Health Science",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
        "Life Sciences": 3,
      },
      careerOpportunities: ["Speech-Language Therapist", "Hospitals", "Special schools", "Private practice"],
    },
    {
      id: "ukzn-bachelor-dental-therapy",
      name: "Bachelor of Dental Therapy",
      faculty: "College of Health Science",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
        "Life Sciences": 3,
      },
      careerOpportunities: ["Dental Therapist", "Public sector", "Private practice"],
    },
    {
      id: "ukzn-bachelor-oral-hygiene",
      name: "Bachelor of Oral Hygiene",
      faculty: "College of Health Science",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
        "Life Sciences": 3,
      },
      careerOpportunities: ["Oral Hygienist", "Public sector", "Private practice"],
    },
    {
      id: "ukzn-bachelor-occupational-therapy",
      name: "Bachelor of Occupational Therapy",
      faculty: "College of Health Science",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
        "Life Sciences": 3,
      },
      additionalRequirements: ["Registration with the Health Professions Council of South Africa", "One year of community service"],
      careerOpportunities: ["Occupational Therapist", "Public and private health sectors"],
    },
    {
      id: "ukzn-bachelor-optometry",
      name: "Bachelor of Optometry",
      faculty: "College of Health Science",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Life Sciences": 4,
      },
      careerOpportunities: ["Optometrist"],
    },
    {
      id: "ukzn-bachelor-pharmacy",
      name: "Bachelor of Pharmacy",
      faculty: "College of Health Science",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Life Sciences": 4,
        "Physical Sciences": 4,
      },
      careerOpportunities: ["Pharmacist", "Custodian of medicines", "Pharmaceutical manufacturer", "Clinical services provider"],
    },
    {
      id: "ukzn-bachelor-physiotherapy",
      name: "Bachelor of Physiotherapy",
      faculty: "College of Health Science",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Life Sciences": 4,
        "Physical Sciences": 4,
      },
      careerOpportunities: ["Physiotherapist", "General, specialised, and community service facilities"],
    },
    {
      id: "ukzn-bachelor-dietetics-human-nutrition",
      name: "Bachelor of Science in Dietetics and Human Nutrition",
      faculty: "College of Health Science",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english": 4,
        "life orientation": 4,
        "mathematics": 4,
        "agricultural sciences": 4,
        "life sciences": 4,
        "physical sciences": 4,
      },
      careerOpportunities: ["Dietician"],
    },
    {
      id: "ukzn-bachelor-sports-science",
      name: "Bachelor of Sports Science",
      faculty: "College of Health Science",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "english first additional language": 4,
        "life orientation": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 3 },
          ],
        },
      },
      careerOpportunities: ["Personal trainer", "Sports coach", "Health and Wellness Centre manager", "Sport and recreation officer"],
    },

    // Agriculture, Engineering and Science   
    {
      id: "ukzn-bsc-eng-chemical",
      name: "BSc Engineering (Chemical)",
      faculty: "Agriculture, Engineering and Science",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 5,
        "Physical Sciences": 5,
        "English": 4,
      },
    },
    {
      id: "ukzn-bsc-eng-civil",
      name: "BSc Engineering (Civil)",
      faculty: "Agriculture, Engineering and Science",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 5,
        "Physical Sciences": 5,
        "English": 4,
      },
    },
    {
      id: "ukzn-bsc-eng-computer",
      name: "BSc Engineering (Computer)",
      faculty: "Agriculture, Engineering and Science",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 5,
        "Physical Sciences": 5,
        "English": 4,
      },
    },
    {
      id: "ukzn-bsc-eng-electrical",
      name: "BSc Engineering (Electrical)",
      faculty: "Agriculture, Engineering and Science",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 5,
        "Physical Sciences": 5,
        "English": 4,
      },
    },
    {
      id: "ukzn-bsc-eng-electronic",
      name: "BSc Engineering (Electronic)",
      faculty: "Agriculture, Engineering and Science",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 5,
        "Physical Sciences": 5,
        "English": 4,
      },
    },
    {
      id: "ukzn-bsc-eng-mechanical",
      name: "BSc Engineering (Mechanical)",
      faculty: "Agriculture, Engineering and Science",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 5,
        "Physical Sciences": 5,
        "English": 4,
      },
    },    {
      id: "ukzn-bsc-agric-economics",
      name: "BSc Agricultural Economics",
      faculty: "Agriculture, Engineering and Science",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 4,
        "English": 4,
        "Agricultural Sciences": 4,
      },
      additionalRequirements: ["Economics or Life Sciences or Physical Sciences at level 4 can replace Agricultural Sciences"],
    },
    {
      id: "ukzn-bsc-stream-les",
      name: "BSc Stream (Life and Earth Sciences)",
      faculty: "Agriculture, Engineering and Science",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 4,
        "English": 4,
        "Life Sciences": 4,
      },
      additionalRequirements: ["Agricultural Sciences or Physical Sciences at level 4 can replace Life Sciences"],
    },
    {
      id: "ukzn-bsc-stream-mathematics",
      name: "BSc Stream (Mathematics)",
      faculty: "Agriculture, Engineering and Science",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 5,
        "English": 4,
        "Life Sciences": 4,
      },
      additionalRequirements: ["Agricultural Sciences or Physical Sciences at level 4 can replace Life Sciences"],
    },

    // Health Sciences
    {
      id: "ukzn-bachelor-medical-science-anatomy",
      name: "Bachelor of Medical Science (Anatomy)",
      faculty: "Health Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Life Sciences": 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "ukzn-bachelor-medical-science-physiology",
      name: "Bachelor of Medical Science (Physiology)",
      faculty: "Health Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Life Sciences": 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "ukzn-bachelor-sport-science",
      name: "Bachelor of Sport Science",
      faculty: "Health Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics Literacy": 3,
      },
      additionalRequirements: ["Mathematics at level 3 can replace Mathematics Literacy"],
    },

    // Law and Management Studies
    {
      id: "ukzn-bcom-general",
      name: "Bachelor of Commerce (General)",
      faculty: "Law and Management Studies",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
      },
    },
    {
      id: "ukzn-bcom-accounting",
      name: "Bachelor of Commerce (Accounting)",
      faculty: "Law and Management Studies",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 5,
      },
    },
    {
      id: "ukzn-bachelor-business-science-finance",
      name: "Bachelor of Business Science in Finance",
      faculty: "Law and Management Studies",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 6,
      },
    },
    {
      id: "ukzn-bachelor-business-science-investment",
      name: "Bachelor of Business Science in Investment Science",
      faculty: "Law and Management Studies",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 6,
      },
    },
  ];

  /**
   * UKZN-specific APS calculation
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
