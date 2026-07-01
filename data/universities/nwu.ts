import { BaseUniversity } from "./base-university";
import type { Course } from "@/lib/types";

/**
 * North-West University (NWU) class
 */
export class NWU extends BaseUniversity {
  readonly id = "nwu";
  readonly name = "North-West University";
  readonly shortName = "NWU";
  readonly website = "https://www.nwu.ac.za";
  readonly logo = "/logos/nwu.png";
  readonly location = {
    city: "Potchefstroom",
    province: "North West",
    coordinates: {
      latitude: -26.6819,
      longitude: 27.0949,
    },
  };

  readonly campuses = [
    {
      name: "Potchefstroom Campus",
      abbreviation: "PC",
      location: {
        city: "Potchefstroom",
        province: "North West",
      },
    },
    {
      name: "Mahikeng Campus",
      abbreviation: "MC",
      location: {
        city: "Mahikeng",
        province: "North West",
      },
    },
    {
      name: "Vanderbijlpark Campus",
      abbreviation: "VC",
      location: {
        city: "Vanderbijlpark",
        province: "Gauteng",
      },
    },
  ];

  readonly apsCalculationMethod = `
    The Admission Point Score (APS) is calculated using six subjects, excluding Life Orientation.
    Each subject earns points depending on your percentage.
    
    APS Points:
    90-100%: 8 points
    80-89%: 7 points
    70-79%: 6 points
    60-69%: 5 points
    50-59%: 4 points
    40-49%: 3 points
    30-39%: 2 points
    0-29%: 1 point
  `;

  readonly internationalRequirements = `
    International students need to calculate their APS based on their qualification:
    
    Cambridge International:
    - O/IGCSE Levels: Begin at a score of 5 for the lowest level
    - AS Levels: Equivalent to South African matric; grades above 90% earn an APS of 8
    - A Levels: Equivalent to first-year university level; grade A earns APS = 10
    
    International Baccalaureate (IB):
    - HL (Higher Level): 7 = 10 points, 6 = 9 points, 5 = 8 points, etc.
    - SL (Standard Level): 7 = 7 points, 6 = 6 points, 5 = 5 points, etc.
    
    Calculate APS based on six subjects, using the highest level passed in each subject.
  `;

  readonly financialAid = `
    NWU offers various bursaries and financial aid options:
    
    Internal Bursaries:
    - Academic Merit Bursary: For students who complete their degree within its relevant duration
    - Family Discount: For families with two or more students registered simultaneously
    - Arts and Culture Bursary: Based on achievements in arts and culture
    - Leadership Bursary: For head boys, head girls, or chairpersons in Grade 12
    - Support Bursary: For students with physical disabilities or from orphanages/foster care
    - Sports Bursary: For students with provincial colors or contracted sports students
    
    External bursaries and NSFAS funding are also available.
  `;

  readonly accommodationInfo = `
    NWU offers on-campus residences and day-houses (off-campus options).
    
    Residences are vibrant communities that provide:
    - A supportive community for your academic journey
    - Opportunities to form lifelong friendships
    - Convenient access to dining halls and campus facilities
    
    Each residence has its own unique experiences and sense of belonging.
  `;

  protected readonly _courses: Course[] = [
    // Faculty of Health Sciences
    {
      id: "nwu-dip-coaching-science",
      name: "Diploma in Coaching Science",
      faculty: "Faculty of Health Sciences",
      apsMin: 18,
      duration: "2 years",
      subjectRequirements: {
        "language of tuition": 4,
      },
      additionalRequirements: ["Academic paper selection", "Best average mark"],
      careerOpportunities: ["Sport Coaching"],
    },
    {
      id: "nwu-bhs-sport-coaching",
      name: "Bachelor of Health Sciences in Sport Coaching and Human Movement Sciences",
      faculty: "Faculty of Health Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "language of tuition": 4,
      },
      additionalRequirements: ["Academic paper selection", "Best average mark"],
      careerOpportunities: ["Sport Coaching", "Human Movement Sciences"],
    },
    {
      id: "nwu-bhs-recreation-science",
      name: "Bachelor of Health Sciences in Recreation Science and Tourism Management",
      faculty: "Faculty of Health Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "language of tuition": 4,
      },
      additionalRequirements: ["Academic paper selection", "Best average mark"],
      careerOpportunities: ["Sport and Recreation Administration"],
    },
    {
      id: "nwu-bhs-biokinetics",
      name: "Bachelor of Health Sciences in Biokinetics",
      faculty: "Faculty of Health Sciences",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        "language of tuition": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
        "physical sciences or life sciences": 4,
      },
      additionalRequirements: ["Medically fit for physical component", "Academic paper selection", "Best average mark"],
      careerOpportunities: ["Biokinetics"],
    },
    {
      id: "nwu-bpharm",
      name: "Bachelor of Pharmacy",
      faculty: "Faculty of Health Sciences",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 5,
        "Physical Sciences": 5,
        "Language of Tuition": 4,
      },
      additionalRequirements: ["Academic paper selection", "Best average mark"],
      careerOpportunities: ["Pharmacy"],
    },
    {
      id: "nwu-bhs-physiology-biochemistry",
      name: "Bachelor of Health Sciences in Physiology and Biochemistry",
      faculty: "Faculty of Health Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 5,
        "physical sciences": 4,
        "language of tuition": 4,
      },
      additionalRequirements: ["Academic paper selection", "Best average mark"],
      careerOpportunities: ["Physiology", "Biochemistry"],
    },
    {
      id: "nwu-bhs-physiology-psychology",
      name: "Bachelor of Health Sciences in Physiology and Psychology",
      faculty: "Faculty of Health Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 3,
        "physical sciences": 4,
        "language of tuition": 4,
      },
      additionalRequirements: ["Academic paper selection", "Best average mark"],
      careerOpportunities: ["Physiology", "Psychology"],
    },
    {
      id: "nwu-bcs-consumer-studies",
      name: "Bachelor of Consumer Studies",
      faculty: "Faculty of Health Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "natural sciences": 4,
        "language of tuition": 4,
      },
      additionalRequirements: ["Academic paper selection", "Best average mark"],
      careerOpportunities: ["Consumer Studies"],
    },
    {
      id: "nwu-bcs-food-product-management",
      name: "Bachelor of Consumer Studies in Food Product Management",
      faculty: "Faculty of Health Sciences",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": 4,
        "natural sciences": 4,
        "language of tuition": 4,
      },
      additionalRequirements: ["Academic paper selection", "Best average mark"],
      careerOpportunities: ["Food Product Management"],
    },
    {
      id: "nwu-bcs-fashion-retail-management",
      name: "Bachelor of Consumer Studies in Fashion Retail Management",
      faculty: "Faculty of Health Sciences",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": 4,
        "natural sciences": 4,
        "language of tuition": 4,
      },
      additionalRequirements: ["Academic paper selection", "Best average mark"],
      careerOpportunities: ["Fashion Retail Management"],
    },
    {
      id: "nwu-bsc-dietetics",
      name: "Bachelor of Science in Dietetics",
      faculty: "Faculty of Health Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": 5,
        "physical sciences": 5,
        "language of tuition": 4,
      },
      additionalRequirements: ["Academic paper selection", "Best average mark"],
      careerOpportunities: ["Dietetics"],
    },
    {
      id: "nwu-bhs-occupational-hygiene",
      name: "Bachelor of Health Sciences in Occupational Hygiene",
      faculty: "Faculty of Health Sciences",
      apsMin: 27,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": 5,
        "physical sciences": 5,
        "language of tuition": 4,
      },
      additionalRequirements: ["Academic paper selection", "Best average mark"],
      careerOpportunities: ["Occupational Hygiene"],
    },
    {
      id: "nwu-ba-psychology-labour",
      name: "Bachelor of Arts in Psychology and Labour Relations Management",
      faculty: "Faculty of Health Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
        "language of tuition": 4,
      },
      additionalRequirements: ["Academic paper selection"],
      careerOpportunities: ["Psychology", "Labour Relations Management"],
    },
    {
      id: "nwu-bss-psychology",
      name: "Bachelor of Social Science in Psychology",
      faculty: "Faculty of Health Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "language of tuition": 4,
      },
      additionalRequirements: ["Academic paper selection"],
      careerOpportunities: ["Psychology"],
    },
    {
      id: "nwu-bsocial-work",
      name: "Bachelor of Social Work",
      faculty: "Faculty of Health Sciences",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "Language of Tuition": 4,
      },
      additionalRequirements: ["Academic paper selection", "Best average mark"],
      careerOpportunities: ["Social Work"],
    },
    {
      id: "nwu-bnursing",
      name: "Bachelor of Nursing",
      faculty: "Faculty of Health Sciences",
      apsMin: 25,
      duration: "4 years",
      subjectRequirements: {
        "Physical Sciences": 4,
        "Mathematics": 4,
        "Life Sciences": 4,
        "Language of Tuition": 4,
      },
      additionalRequirements: ["Job shadowing programme (40 hours) recommended"],
      careerOpportunities: ["Nursing"],
    },

    // Faculty of Natural and Agricultural Sciences
    {
      id: "nwu-dip-animal-health",
      name: "Diploma in Animal Health",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english": 3,
        "physical science or life science": 3,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 4 },
          ],
        },
      },
      careerOpportunities: ["Animal Health"],
    },
    {
      id: "nwu-dip-animal-science",
      name: "Diploma in Animal Science",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english": 3,
        "physical science or life science or agricultural science": 3,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 4 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Animal Science"],
    },
    {
      id: "nwu-dip-plant-science",
      name: "Diploma in Plant Science with Crop Production",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english": 3,
        "physical science or life science or agricultural science": 3,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 4 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Crop Production"],
    },
    {
      id: "nwu-bsc-physical-sciences",
      name: "Bachelor of Science (Various Specialisations)",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 5,
        "physical sciences": 4,
      },
      careerOpportunities: ["Chemistry", "Physics", "Mathematics", "Computer Science", "Applied Mathematics", "Electronics"],
    },
    {
      id: "nwu-bsc-extended",
      name: "Extended Bachelor of Science",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 4 },
          ],
        },
        "physical sciences": 3,
      },
      careerOpportunities: ["Biological Sciences", "Environmental Sciences", "Mathematical Sciences"],
    },
    {
      id: "nwu-bsc-it",
      name: "Bachelor of Science in Information Technology",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Information Technology"],
    },
    {
      id: "nwu-bsc-it-extended",
      name: "Extended Bachelor of Science in Information Technology",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 4 },
          ],
        },
      },
      careerOpportunities: ["Information Technology"],
    },
    {
      id: "nwu-bsc-math-sciences",
      name: "Bachelor of Science in Mathematical Sciences",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 5,
        "physical sciences": 4,
      },
      careerOpportunities: ["Statistics", "Mathematics", "Applied Mathematics"],
    },
    {
      id: "nwu-bsc-biological-sciences",
      name: "Bachelor of Science in Biological Sciences",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 5 },
          ],
        },
        "physical sciences": 4,
      },
      careerOpportunities: ["Microbiology", "Botany", "Biochemistry", "Chemistry", "Physiology", "Zoology"],
    },
    {
      id: "nwu-bsc-financial-math",
      name: "Bachelor of Science in Financial Mathematics",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 6,
      },
    },

    // Faculty of Economic and Management Sciences
    {
      id: "nwu-bcom-accounting",
      name: "Bachelor of Commerce (BCom) in Accounting",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 3,
        "english home language": 4,
      },
    },
    {
      id: "nwu-bcom-chartered-accountancy",
      name: "Bachelor of Commerce (BCom) in Chartered Accountancy",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 5,
      },
    },

    // Faculty of Humanities
    {
      id: "nwu-ba-communication",
      name: "Bachelor of Arts (BA) Communication",
      faculty: "Faculty of Humanities",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 5,
      },
    },

    // Faculty of Education
    {
      id: "nwu-bed-foundation-phase",
      name: "Bachelor of Education (BEd) in Foundation Phase (Grade R – 3)",
      faculty: "Faculty of Education",
      apsMin: 26,
      duration: "4 years",
    },
    {
      id: "nwu-bed-intermediate-math-science",
      name: "Bachelor of Education (BEd) in Intermediate Phase (Grade 4 – 6) with Mathematics, Science and Technology",
      faculty: "Faculty of Education",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        "home language": 4,
        "first additional language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 4 },
          ],
        },
      },
      careerOpportunities: ["Intermediate Phase Teacher"],
    },
    {
      id: "nwu-bed-intermediate-life-skills",
      name: "Bachelor of Education (BEd) in Intermediate Phase (Grade 4 – 6) with Life Skills and Social Sciences",
      faculty: "Faculty of Education",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        "home language": 4,
        "first additional language": 4,
      },
      careerOpportunities: ["Intermediate Phase Teacher"],
    },
    {
      id: "nwu-bed-fet-economics",
      name: "Bachelor of Education (BEd) in Senior and Further Education and Training (Grade 7 – 12) with Economics",
      faculty: "Faculty of Education",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        "home language": 4,
        "first additional language": 4,
      },
      careerOpportunities: ["Senior and FET Phase Teacher"],
    },
    {
      id: "nwu-bed-fet-physical-sciences",
      name: "Bachelor of Education (BEd) in Senior and Further Education and Training (Grade 7 – 12) with Physical Sciences",
      faculty: "Faculty of Education",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        "home language": 4,
        "first additional language": 4,
        "physical sciences": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Senior and FET Phase Teacher"],
    },

    // Faculty of Engineering
    {
      id: "nwu-beng-engineering",
      name: "Bachelor of Engineering (BEng)",
      faculty: "Faculty of Engineering",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": 6,
        "physical sciences": 6,
        "english or afrikaans": 5,
      },
      additionalRequirements: ["70% in Grade 12 Mathematics", "70% in Grade 12 Physical Sciences"],
      careerOpportunities: ["Chemical Engineer", "Electrical and Electronic Engineer", "Computer and Electronic Engineer", "Mechanical Engineer", "Industrial Engineer", "Mechatronic Engineer"],
    },

    // Faculty of Law
    {
      id: "nwu-ba-law",
      name: "Bachelor of Arts (BA) in Law",
      faculty: "Faculty of Law",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "home language": 5,
        "first additional language": 5,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Selection process", "Full matriculation exemption"],
      careerOpportunities: ["Legal Practitioner", "Legal Advisor"],
    },
    {
      id: "nwu-bcom-law",
      name: "Bachelor of Commerce (BCom) in Law",
      faculty: "Faculty of Law",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "home language": 5,
        "first additional language": 5,
        "mathematics": 3,
      },
      additionalRequirements: ["Selection process", "Full matriculation exemption"],
      careerOpportunities: ["Legal Practitioner", "Corporate Legal Advisor"],
    },
    {
      id: "nwu-llb",
      name: "Bachelor of Laws (LLB)",
      faculty: "Faculty of Law",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "Home Language": 5,
        "First Additional Language": 5,
      },
      additionalRequirements: ["Selection process", "Full matriculation exemption"],
      careerOpportunities: ["Advocate", "Attorney", "Magistrate"],
    },

    // Faculty of Theology
    {
      id: "nwu-ba-ancient-languages",
      name: "BA in Ancient Languages",
      faculty: "Faculty of Theology",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
      },
      additionalRequirements: ["Full matriculation exemption"],
      careerOpportunities: ["Researcher", "Academic"],
    },

    // Engineering
    {
      id: "nwu-beng-chemical",
      name: "BEng (Chemical Engineering)",
      faculty: "Engineering",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 7,
        "Physical Sciences": 7,
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 6 },
            { subject: "English First Additional Language", level: 6 },
          ],
        },
        "Afrikaans Home Language": 6,
        "Afrikaans First Additional Language": 6,
      },
      additionalRequirements: ["Conditional acceptance with Grade 11 results: APS 31, Mathematics 65%, Physical Sciences 65%, Language of instruction 60%"],
    },
    {
      id: "nwu-beng-electrical",
      name: "BEng (Electrical and Electronic Engineering)",
      faculty: "Engineering",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 7,
        "Physical Sciences": 7,
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 6 },
            { subject: "English First Additional Language", level: 6 },
          ],
        },
        "Afrikaans Home Language": 6,
        "Afrikaans First Additional Language": 6,
      },
      additionalRequirements: ["Conditional acceptance with Grade 11 results: APS 31, Mathematics 65%, Physical Sciences 65%, Language of instruction 60%"],
    },
    {
      id: "nwu-beng-computer",
      name: "BEng (Computer and Electronic Engineering)",
      faculty: "Engineering",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 7,
        "Physical Sciences": 7,
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 6 },
            { subject: "English First Additional Language", level: 6 },
          ],
        },
        "Afrikaans Home Language": 6,
        "Afrikaans First Additional Language": 6,
      },
      additionalRequirements: ["Conditional acceptance with Grade 11 results: APS 31, Mathematics 65%, Physical Sciences 65%, Language of instruction 60%"],
    },
    {
      id: "nwu-beng-electromechanical",
      name: "BEng (Electromechanical Engineering)",
      faculty: "Engineering",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 7,
        "Physical Sciences": 7,
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 6 },
            { subject: "English First Additional Language", level: 6 },
          ],
        },
        "Afrikaans Home Language": 6,
        "Afrikaans First Additional Language": 6,
      },
      additionalRequirements: ["Conditional acceptance with Grade 11 results: APS 31, Mathematics 65%, Physical Sciences 65%, Language of instruction 60%"],
    },
    {
      id: "nwu-beng-mechanical",
      name: "BEng (Mechanical Engineering)",
      faculty: "Engineering",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 7,
        "Physical Sciences": 7,
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 6 },
            { subject: "English First Additional Language", level: 6 },
          ],
        },
        "Afrikaans Home Language": 6,
        "Afrikaans First Additional Language": 6,
      },
      additionalRequirements: ["Conditional acceptance with Grade 11 results: APS 31, Mathematics 65%, Physical Sciences 65%, Language of instruction 60%"],
    },
    {
      id: "nwu-beng-industrial",
      name: "BEng (Industrial Engineering)",
      faculty: "Engineering",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 7,
        "Physical Sciences": 7,
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 6 },
            { subject: "English First Additional Language", level: 6 },
          ],
        },
        "Afrikaans Home Language": 6,
        "Afrikaans First Additional Language": 6,
      },
      additionalRequirements: ["Conditional acceptance with Grade 11 results: APS 31, Mathematics 65%, Physical Sciences 65%, Language of instruction 60%"],
    },
    {
      id: "nwu-beng-mechatronic",
      name: "BEng (Mechatronic Engineering)",
      faculty: "Engineering",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 7,
        "Physical Sciences": 7,
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 6 },
            { subject: "English First Additional Language", level: 6 },
          ],
        },
        "Afrikaans Home Language": 6,
        "Afrikaans First Additional Language": 6,
      },
      additionalRequirements: ["Conditional acceptance with Grade 11 results: APS 31, Mathematics 65%, Physical Sciences 65%, Language of instruction 60%"],
    },

    // Law
    {
      id: "nwu-ba-law-psychology",
      name: "BA in Law with Psychology",
      faculty: "Law",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "Home Language": 5,
        "First Additional Language": 5,
      },
      additionalRequirements: ["Selection process applies. Academic performance is important. Limited capacity."],
    },
    {
      id: "nwu-ba-law-politics",
      name: "BA in Law with Politics",
      faculty: "Law",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "Home Language": 5,
        "First Additional Language": 5,
      },
      additionalRequirements: ["Selection process applies. Academic performance is important. Limited capacity."],
    },
    {
      id: "nwu-ba-law-industrial-psychology",
      name: "BA in Law with Industrial Psychology",
      faculty: "Law",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "Home Language": 5,
        "First Additional Language": 5,
      },
      additionalRequirements: ["Selection process applies. Academic performance is important. Limited capacity."],
    },
    {
      id: "nwu-llb-extended",
      name: "Extended Bachelor of Laws (LLB)",
      faculty: "Law",
      apsMin: 28,
      duration: "5 years",
      subjectRequirements: {
        "Home Language": 4,
        "First Additional Language": 4,
        "Math": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Selection process applies. Academic performance is important. Limited capacity."],
    },

    // Natural and Agricultural Sciences
    {
      id: "nwu-bsc-chemistry-physics",
      name: "BSc with Chemistry and Physics",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 5,
        "Physical Sciences": 4,
      },
    },
    {
      id: "nwu-bsc-physics-mathematics",
      name: "BSc with Physics and Mathematics",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 5,
        "Physical Sciences": 4,
      },
    },
    {
      id: "nwu-bsc-computer-science-mathematics",
      name: "BSc with Computer Science and Mathematics",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 5,
        "Physical Sciences": 4,
      },
    },
    {
      id: "nwu-bsc-biochemistry-chemistry",
      name: "BSc with Biochemistry and Chemistry",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 4,
        "Technical Mathematics": 5,
        "Physical Sciences": 4,
      },
    },
    {
      id: "nwu-bsc-financial-mathematics",
      name: "BSc in Financial Mathematics",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 6,
      },
    },
    {
      id: "nwu-bsc-business-analytics",
      name: "BSc in Business Analytics",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 6,
      },
    },
    {
      id: "nwu-bsc-quantitative-risk-management",
      name: "BSc in Quantitative Risk Management",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 6,
      },
    },
    {
      id: "nwu-bsc-actuarial-sciences",
      name: "BSc in Actuarial Sciences",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 6,
      },
    },

    // Economic and Management Sciences
    {
      id: "nwu-bcom-financial-accountancy",
      name: "BCom in Financial Accountancy",
      faculty: "Economic and Management Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 4,
      },
    },
    {
      id: "nwu-bcom-forensic-accountancy",
      name: "BCom in Forensic Accountancy",
      faculty: "Economic and Management Sciences",
      apsMin: 36,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 5,
        "Afrikaans": 5,
        "English": 5,
      },
      additionalRequirements: ["Mathematics level 6 (70-79%) if the student did not take Grade 12 Accounting"],
    },
    {
      id: "nwu-bcom-management-accountancy",
      name: "BCom in Management Accountancy",
      faculty: "Economic and Management Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 5,
      },
    },
    {
      id: "nwu-bcom-human-resource-management",
      name: "BCom in Human Resource Management",
      faculty: "Economic and Management Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 4,
      },
    },
    {
      id: "nwu-bcom-marketing-management",
      name: "BCom in Management Sciences with Marketing Management",
      faculty: "Economic and Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 3,
      },
    },

    // Education
    {
      id: "nwu-bed-foundation",
      name: "BEd in Foundation Phase (Grade R-3)",
      faculty: "Education",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        "Home Language": 4,
        "First Additional Language": 4,
      },
    },
    {
      id: "nwu-bed-intermediate-mst",
      name: "BEd in Intermediate Phase (Grade 4-6) with Mathematics, Science and Technology",
      faculty: "Education",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        "Home Language": 4,
        "First Additional Language": 4,
        "Mathematics": 3,
        "Technical Mathematics": 4,
      },
    },
    {
      id: "nwu-bed-intermediate-ls",
      name: "BEd in Intermediate Phase (Grade 4-6) with Life Skills and Social Sciences",
      faculty: "Education",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        "Home Language": 4,
        "First Additional Language": 4,
      },
    },
    {
      id: "nwu-bed-senior-mathematics",
      name: "BEd in Senior and Further Education and Training (Grade 7-12) with Mathematics",
      faculty: "Education",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        "Home Language": 4,
        "First Additional Language": 4,
        "Mathematics": 5,
      },
    },
    {
      id: "nwu-bed-senior-physical-sciences",
      name: "BEd in Senior and Further Education and Training (Grade 7-12) with Physical Sciences",
      faculty: "Education",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        "Home Language": 4,
        "First Additional Language": 4,
        "Physical Sciences": 4,
        "Mathematics": 4,
        "Technical Mathematics": 5,
      },
    },

    // Humanities
    {
      id: "nwu-ba-graphic-design",
      name: "BA in Graphic Design",
      faculty: "Humanities",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
      },
      additionalRequirements: ["A screening process including submission of a photo portfolio, academic record, and interview."],
    },
    {
      id: "nwu-ba-music-society",
      name: "BA in Music and Society",
      faculty: "Humanities",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
      },
      additionalRequirements: ["Successful completion of a practical audition (Grade 3 standard), a theoretical placement test (Grade 2 standard), and a language proficiency test."],
    },
    {
      id: "nwu-bmus",
      name: "Baccalaureus Musicae (BMus)",
      faculty: "Humanities",
      apsMin: 24,
      duration: "4 years",
      additionalRequirements: ["Successful completion of a practical audition (Grade 6 standard), a theoretical placement test (Grade 5 standard), and a language proficiency test."],
    },

    // Theology
    {
      id: "nwu-ba-pastoral-psychology",
      name: "BA in Pastoral Psychology",
      faculty: "Theology",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
      },
    },
    {
      id: "nwu-bdiv",
      name: "Bachelor of Divinity (BDiv)",
      faculty: "Theology",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
      },
    },
  ];

  /**
   * NWU-specific APS calculation
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
