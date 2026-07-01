import { BaseUniversity } from "./base-university";
import type { Course } from "@/lib/types";

/**
 * Nelson Mandela University (NMU) class
 */
export class NMU extends BaseUniversity {
  readonly id = "nmu";
  readonly name = "Nelson Mandela University";
  readonly shortName = "NMU";
  readonly website = "https://www.mandela.ac.za";
  readonly logo = "/logos/nmu.png";
  readonly location = {
    city: "Port Elizabeth",
    province: "Eastern Cape",
    coordinates: {
      latitude: -34.0007,
      longitude: 25.6735,
    },
  };

  readonly campuses = [
    {
      name: "Summerstrand Campus",
      location: "Port Elizabeth",
      programs: ["Most undergraduate programs"],
    },
    {
      name: "Second Avenue Campus",
      location: "Port Elizabeth",
      programs: ["Health Sciences programs"],
    },
    {
      name: "George Campus",
      location: "George",
      programs: ["Selected programs including Forestry, Nature Conservation"],
    },
    {
      name: "Missionvale Campus",
      location: "Port Elizabeth",
      programs: ["Community engagement programs"],
    },
  ];

  readonly admissionInfo = {
    apsCalculation:
      "Calculated using six subjects excluding Life Orientation. For quintile 1-3 schools with 50%+ in Life Orientation, 7 points are added.",
    minimumRequirements: {
      higherCertificate: "NSC with 30% in language of instruction",
      diploma:
        "NSC with 30% in language of instruction + 40-49% in four 20-credit subjects",
      degree:
        "NSC with 30% in language of instruction + 50-59% in four 20-credit subjects",
    },
    applicationDeadlines: {
      early: "August",
      late: "September",
      medical: "30 June (MBChB, BPharm, Radiography)",
    },
  };

  readonly financialAid = {
    nsfas: "Available for qualifying students",
    bursaries: "Merit awards and corporate donor funds available",
    contact: "financialaid@mandela.ac.za",
  };

  readonly accommodation = {
    onCampus:
      "Residences available on Summerstrand, Second Avenue and George campuses",
    offCampus: "Student Housing office assists with off-campus accommodation",
    contact: "resadmissions@mandela.ac.za",
  };

  protected readonly _courses: Course[] = [
    // Faculty of Business and Economic Sciences
    {
      id: "nmu-hcert-accountancy",
      name: "Higher Certificate (Accountancy)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 29,
      duration: "1 year",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for higher certificate entry"],
      careerOpportunities: ["Bookkeeper", "Accounting clerk"],
    },
    {
      id: "nmu-hcert-business-studies",
      name: "Higher Certificate (Business Studies)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 29,
      duration: "1 year",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 2 },
            { subject: "technical mathematics", level: 2 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for higher certificate entry"],
      careerOpportunities: ["Marketing intern", "Marketing officer", "Office manager", "Entrepreneur"],
    },
    {
      id: "nmu-dip-accountancy",
      name: "Diploma (Accountancy)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 35,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 4 },
            { subject: "mathematical literacy", level: 6 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for diploma entry", "Alternatively: Higher Certificate in Accountancy or equivalent"],
      careerOpportunities: ["Accountant", "Internal auditor", "Cost accountant", "Financial and management accountant", "Tax consultant"],
    },
    {
      id: "nmu-dip-economics",
      name: "Diploma (Economics)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 4 },
            { subject: "mathematical literacy", level: 6 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for diploma entry"],
      careerOpportunities: ["Economic research assistant", "Economic report writer", "Economic journalist"],
    },
    {
      id: "nmu-dip-economics-extended",
      name: "Diploma (Economics) Extended Curriculum",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 310,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 2 },
            { subject: "technical mathematics", level: 2 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Minimum NSC statutory requirements for diploma entry", "Higher Certificate in Business Studies or equivalent for alternative entry"],
      careerOpportunities: ["economist", "economic researcher", "economic report writer", "economic journalist"],
    },
    {
      id: "nmu-dip-human-resource-management",
      name: "Diploma (Human Resource Management)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 330,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 2 },
            { subject: "technical mathematics", level: 2 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Minimum NSC statutory requirements for diploma entry"],
      careerOpportunities: ["HR officer", "employee relations officer", "training officer", "talent development specialist", "learning and development specialist", "HR consultant", "HR administrator", "employment relations specialist", "recruitment consultant", "HR business partner", "organisational development specialist"],
    },
    {
      id: "nmu-dip-human-resource-management-extended",
      name: "Diploma (Human Resource Management) Extended Curriculum",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 310,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 2 },
            { subject: "technical mathematics", level: 2 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Minimum NSC statutory requirements for diploma entry"],
      careerOpportunities: ["HR officer", "employee relations officer", "training officer", "talent development specialist", "learning and development specialist", "HR consultant", "HR administrator", "employment relations specialist", "recruitment consultant", "HR business partner", "organisational development specialist"],
    },
    {
      id: "nmu-dip-inventory-stores-management",
      name: "Diploma (Inventory & Stores Management)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 290,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 2 },
            { subject: "technical mathematics", level: 2 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Minimum NSC statutory requirements for diploma entry"],
      careerOpportunities: ["stores manager", "warehouse manager", "materials handling manager", "distribution planner", "inventory controller", "materials manager"],
    },
    {
      id: "nmu-dip-logistics",
      name: "Diploma (Logistics)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 330,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Minimum NSC statutory requirements for diploma entry", "Higher Certificate in Business Studies or equivalent for alternative entry"],
      careerOpportunities: ["purchaser", "logistics manager", "buyer", "supply chain manager", "expeditor", "materials controller", "production planner", "bill-of-material specialist", "materials requirement planner", "export/import controller"],
    },
    {
      id: "nmu-dip-logistics-extended",
      name: "Diploma (Logistics) Extended Curriculum",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 310,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 2 },
            { subject: "technical mathematics", level: 2 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Minimum NSC statutory requirements for diploma entry", "Higher Certificate in Business Studies or equivalent for alternative entry"],
      careerOpportunities: ["purchaser", "logistics manager", "buyer", "supply chain manager", "expeditor", "materials controller", "production planner", "bill-of-material specialist", "materials requirement planner", "export/import controller"],
    },
    {
      id: "nmu-dip-management",
      name: "Diploma (Management)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 330,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Minimum NSC statutory requirements for diploma entry", "Higher Certificate in Business Studies or equivalent for alternative entry"],
      careerOpportunities: ["retail store management", "retail buying", "financial management", "business administration", "production management"],
    },
    {
      id: "nmu-dip-management-extended",
      name: "Diploma (Management) Extended Curriculum",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 310,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 2 },
            { subject: "technical mathematics", level: 2 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Minimum NSC statutory requirements for diploma entry", "Higher Certificate in Business Studies or equivalent for alternative entry"],
      careerOpportunities: ["retail store management", "retail buying", "financial management", "business administration", "production management"],
    },
    {
      id: "nmu-dip-marketing",
      name: "Diploma (Marketing)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 330,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Minimum NSC statutory requirements for diploma entry", "Higher Certificate in Business Studies or equivalent for alternative entry"],
      careerOpportunities: ["advertising", "personal selling", "sales management", "product and brand management", "customer relationship management", "merchandising", "media management", "marketing communications", "public relations", "marketing research"],
    },
    {
      id: "nmu-dip-marketing-extended",
      name: "Diploma (Marketing) Extended Curriculum",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 310,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 2 },
            { subject: "technical mathematics", level: 2 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Minimum NSC statutory requirements for diploma entry", "Higher Certificate in Business Studies or equivalent for alternative entry"],
      careerOpportunities: ["advertising", "personal selling", "sales management", "product and brand management", "customer relationship management", "merchandising", "media management", "marketing communications", "public relations", "marketing research"],
    },
    {
      id: "nmu-dip-tourism-management",
      name: "Diploma (Tourism Management)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 330,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Minimum NSC statutory requirements for diploma entry", "Higher Certificate in Business Studies or equivalent for alternative entry"],
      careerOpportunities: ["transport services", "travel agencies", "tour operators", "hospitality services", "national parks", "theme parks", "conference centres"],
    },
    {
      id: "nmu-dip-tourism-management-extended",
      name: "Diploma (Tourism Management) Extended Curriculum",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 310,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 2 },
            { subject: "technical mathematics", level: 2 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Minimum NSC statutory requirements for diploma entry", "Higher Certificate in Business Studies or equivalent for alternative entry"],
      careerOpportunities: ["transport services", "travel agencies", "tour operators", "hospitality services", "national parks", "theme parks", "conference centres"],
    },
    {
      id: "nmu-adv-dip-business-studies",
      name: "Advanced Diploma: Business Studies (Financial Planning and Services)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 0,
      duration: "1 year full-time, 2 years part-time",
      additionalRequirements: ["A relevant 360-credit Diploma in the chosen field of specialisation or equivalent qualification", "Must have majored in Business Management, Economics, Financial Accounting, Internal Auditing, Management Accounting, or Administrative Management"],
      careerOpportunities: ["Banking institutions", "Investment institutions"],
    },
    {
      id: "nmu-adv-dip-accountancy-professional",
      name: "Advanced Diploma: Accountancy (Professional Accounting)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 0,
      duration: "1 year full-time, 2 years part-time",
      additionalRequirements: ["A relevant 360-credit Diploma in Accountancy or equivalent NQF Exit Level 6 qualification"],
      careerOpportunities: ["financial accountants", "management accountants", "internal auditors", "tax consultants"],
    },
    {
      id: "nmu-adv-dip-accountancy-internal",
      name: "Advanced Diploma: Accountancy (Internal Auditing)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 0,
      duration: "1 year full-time, 2 years part-time",
      additionalRequirements: ["A relevant 360-credit Diploma in Accountancy or equivalent NQF Exit Level 6 qualification"],
      careerOpportunities: ["financial accountants", "management accountants", "internal auditors", "tax consultants"],
    },
    {
      id: "nmu-bcom-economics",
      name: "BCom: General (Economics)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 390,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 4,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["Banker", "business manager", "financier", "economist", "training manager", "teacher", "financial manager", "accountant", "insurance broker", "management consultant", "small business consultant", "entrepreneur"],
    },
    {
      id: "nmu-bcom-economics-extended",
      name: "BCom: General (Economics) Extended Curriculum",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 370,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": 3,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["Banker", "business manager", "financier", "economist", "training manager", "teacher", "financial manager", "accountant", "insurance broker", "management consultant", "small business consultant", "entrepreneur"],
    },
    {
      id: "nmu-bcom-accounting",
      name: "BCom: General (Accounting)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 390,
      duration: "3 years full-time, 5 years part-time",
      subjectRequirements: {
        "mathematics": 4,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["financial accountant", "financial manager", "management accountant", "bookkeeper", "tax accountant", "practitioner"],
    },
    {
      id: "nmu-bcom-accounting-extended",
      name: "BCom: General (Accounting) Extended Curriculum",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 370,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": 3,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["financial accountant", "financial manager", "management accountant", "bookkeeper", "tax accountant", "practitioner"],
    },
    {
      id: "nmu-bcom-business-management",
      name: "BCom: General (Business Management)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 390,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 4,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["Banker", "business manager", "financier", "economist", "industrial psychologist", "human resources manager", "marketing manager", "training manager", "teacher", "statistician", "financial manager", "accountant", "insurance broker", "mathematician", "management consultant", "auditor", "entrepreneur"],
    },
    {
      id: "nmu-bcom-business-management-extended",
      name: "BCom: General (Business Management) Extended Curriculum",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 370,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": 3,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["Banker", "business manager", "financier", "economist", "industrial psychologist", "human resources manager", "marketing manager", "training manager", "teacher", "statistician", "financial manager", "accountant", "insurance broker", "mathematician", "management consultant", "auditor", "entrepreneur"],
    },
    {
      id: "nmu-bcom-financial-planning",
      name: "BCom (Financial Planning)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 390,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 4,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["Financial advisor", "financial planner", "financial services industry", "banks", "insurance companies"],
    },
    {
      id: "nmu-bcom-financial-planning-extended",
      name: "BCom: Financial Planning Extended Curriculum",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 370,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": 3,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["Financial advisor", "financial planner", "financial services industry", "banks", "insurance companies"],
    },
    {
      id: "nmu-bcom-tourism",
      name: "BCom: General (Tourism)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 390,
      duration: "3 years",
      subjectRequirements: {

      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["tour operations", "tourism planning and consulting", "entrepreneurial opportunities", "destination marketing and planning", "event management", "tourism management"],
    },
    {
      id: "nmu-bcom-tourism-extended",
      name: "BCom: General (Tourism) Extended Curriculum",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 370,
      duration: "4 years",
      subjectRequirements: {

      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["tour operations", "tourism planning and consulting", "entrepreneurial opportunities", "destination marketing and planning", "event management", "tourism management"],
    },
    {
      id: "nmu-bcom-marketing-business",
      name: "BCom (Marketing & Business Management)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 390,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 4,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["Marketing management", "market researcher", "product development", "brand management", "advertising", "communication manager", "customer relations manager", "promotions", "retailing", "merchandising", "direct response marketing", "personal selling"],
    },
    {
      id: "nmu-bcom-hospitality",
      name: "BCom (Hospitality Management)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 390,
      duration: "3 years",
      subjectRequirements: {

      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["accommodation management", "food and beverage management", "events management"],
    },
    {
      id: "nmu-bcom-statistics",
      name: "BCom: General (Statistics)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 390,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 5,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["Banker", "business manager", "financier", "economist", "industrial psychologist", "human resources manager", "marketing manager", "training manager", "teacher", "statistician", "financial manager", "accountant", "insurance broker", "mathematician", "management consultant", "auditor", "law advisor", "labour relations expert", "income tax consultant", "small business consultant", "entrepreneur"],
    },
    {
      id: "nmu-bcom-accounting-ca",
      name: "BCom (Accounting)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 410,
      duration: "3 years full-time, 5 years part-time",
      subjectRequirements: {
        "mathematics": 5,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["Chartered accountant", "financial manager", "chief financial officer", "financial accountant", "registered auditor", "cost and management accountant", "tax consultant", "internal auditor", "banker"],
    },
    {
      id: "nmu-bcom-computer-science",
      name: "BCom (Computer Science & Information Systems)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 390,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 5,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["programmers", "network specialists", "project managers", "internet specialists", "web developers", "business analysts"],
    },
    {
      id: "nmu-bcom-economics-statistics",
      name: "BCom (Economics & Statistics)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 390,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 5,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["economists", "financial and statistical analysts", "financial consultants"],
    },
    {
      id: "nmu-bcom-industrial-psychology",
      name: "BCom (Industrial Psychology & Human Resource Management)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 390,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 4,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["Human resource practitioner", "personnel consultant/manager", "training manager", "labour relations manager", "marketing practitioner", "industrial psychologist"],
    },
    {
      id: "nmu-bcom-information-systems",
      name: "BCom: Information Systems (Business Management)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 390,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 5,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["business and database programming", "business and systems analysis", "financial modelling", "project management", "Enterprise Resource Planning (ERP) consulting"],
    },
    {
      id: "nmu-bcom-logistics-transport",
      name: "BCom (Logistics & Transport Economics)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 390,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 4,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["Supply Chain manager", "logistics manager", "resource planner", "transport coordinator", "expediter", "materials controller", "warehouse manager"],
    },
    {
      id: "nmu-bcom-food-service",
      name: "BCom (Food Service Management)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 390,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 4,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["Food service manager"],
    },
    {
      id: "nmu-bcom-accsc-economics-business",
      name: "BCom: Accounting Science (Economics/Business Management)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 0,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": 5,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry must be met"],
      careerOpportunities: ["Chartered accountant with additional specialist skills in the field of economy and business management"],
    },
    {
      id: "nmu-bcom-accsc-law",
      name: "BCom: Accounting Science (Law)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 0,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 6,
        "mathematics": 5,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry must be met"],
      careerOpportunities: ["Chartered accountant or registered auditors with additional specialist skills in law"],
    },
    {
      id: "nmu-bcom-accsc-computer-science",
      name: "BCom: Accounting Science (Computer Science & Information Systems)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 0,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": 5,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry must be met"],
      careerOpportunities: ["Chartered accountant with additional specialist skills in the information technology environment", "programmers", "network specialists", "project managers", "internet specialists", "web developers", "business analysts"],
    },
    {
      id: "nmu-ba-human-resource-management",
      name: "BA (Human Resource Management)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 0,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 6 },
          ],
        },
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry must be met"],
      careerOpportunities: ["Human resource practitioners", "personnel consultant", "industrial psychologist", "marketing practitioner", "labour relations manager", "trainers or managers"],
    },
    {
      id: "nmu-ba-development-studies",
      name: "BA (Development Studies)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 0,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 6 },
          ],
        },
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry must be met", "Course offered only if minimum 25 applicants admitted"],
      careerOpportunities: ["Development consultants", "economist & development economists", "development finance and banking", "development planning officers"],
    },
    {
      id: "nmu-bcom-general",
      name: "Bachelor of Commerce (General)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 390,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 4,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["Banker", "Business manager", "Financier", "Economist", "Training manager", "Teacher", "Financial manager", "Accountant", "Insurance broker", "Management consultant", "Entrepreneur"],
    },
    {
      id: "nmu-bcom-general-extended",
      name: "BCom: General Extended Curriculum",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 370,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": 3,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["Banker", "Business manager", "Financier", "Economist", "Training manager", "Teacher", "Financial manager", "Accountant", "Insurance broker", "Management consultant", "Entrepreneur"],
    },
    {
      id: "nmu-bcom-general-accounting",
      name: "BCom (General Accounting)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 390,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 4,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["Financial accountant", "Financial manager", "Management accountant", "Bookkeeper", "Tax accountant"],
    },
    {
      id: "nmu-bcom-general-accounting-extended",
      name: "BCom (General Accounting) Extended Curriculum",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 370,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": 3,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["Financial accountant", "Financial manager", "Management accountant", "Bookkeeper", "Tax accountant"],
    },
    {
      id: "nmu-bcom-business-management-iop",
      name: "BCom: General (Business Management and Industrial & Organisational Psychology)",
      faculty: "Faculty of Business and Economic Sciences",
      apsMin: 390,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 4,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["Business manager", "Economist", "Human resources manager", "Marketing manager", "Training manager", "Teacher", "Statistician", "Financial manager", "Accountant", "Insurance broker", "Mathematician", "Management consultant", "Auditor", "Entrepreneur", "Labour relations manager", "Industrial psychologist"],
    },

    // Faculty of Education
    {
      id: "nmu-bed-foundation-phase",
      name: "BEd: Foundation Phase (Grades R-3)",
      faculty: "Faculty of Education",
      apsMin: 0,
      duration: "4 years",
      subjectRequirements: {
        "english": 4,
        "afrikaans or isixhosa": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 5 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Minimum NSC requirements for degree entry must be met"],
      careerOpportunities: ["Foundation phase teacher"],
    },
    {
      id: "nmu-bed-intermediate-phase",
      name: "BEd: Intermediate Phase (Grades 4-6)",
      faculty: "Faculty of Education",
      apsMin: 0,
      duration: "4 years",
      subjectRequirements: {
        "english": 4,
        "afrikaans or isixhosa": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 5 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Minimum NSC requirements for degree entry must be met"],
      careerOpportunities: ["Intermediate phase teacher"],
    },
    {
      id: "nmu-bed-sp-fet-commerce",
      name: "BEd: Senior Phase and Further Education & Training (Commerce Stream)",
      faculty: "Faculty of Education",
      apsMin: 0,
      duration: "4 years",
      subjectRequirements: {
        "english": 4,
        "afrikaans or isixhosa": 4,
        "mathematics": 4,
      },
      additionalRequirements: ["Minimum NSC requirements for degree entry must be met", "Specific subject pass requirements for FET specialisations"],
      careerOpportunities: ["Secondary school teacher"],
    },
    {
      id: "nmu-bed-sp-fet-science",
      name: "BEd: Senior Phase and Further Education & Training (Science Stream)",
      faculty: "Faculty of Education",
      apsMin: 0,
      duration: "4 years",
      subjectRequirements: {
        "english": 4,
        "afrikaans or isixhosa": 4,
        "mathematics": 4,
      },
      additionalRequirements: ["Minimum NSC requirements for degree entry must be met", "Specific subject pass requirements for FET specialisations"],
      careerOpportunities: ["Secondary school teacher"],
    },
    {
      id: "nmu-bed-sp-fet-humanities",
      name: "BEd: Senior Phase and Further Education & Training (Humanities Stream)",
      faculty: "Faculty of Education",
      apsMin: 0,
      duration: "4 years",
      subjectRequirements: {
        "english": 4,
        "afrikaans or isixhosa": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Minimum NSC requirements for degree entry must be met", "Specific subject pass requirements for FET specialisations"],
      careerOpportunities: ["Secondary school teacher"],
    },
    {
      id: "nmu-adv-dip-technical-vocational-teaching",
      name: "Advanced Diploma in Technical and Vocational Teaching",
      faculty: "Faculty of Education",
      apsMin: 0,
      duration: "1-2 years",
      additionalRequirements: ["Appropriate 360-credit NQF Level 6 undergraduate diploma or bachelor’s degree", "Benchmark tests for academic literacies"],
      careerOpportunities: ["TVET college lecturer"],
    },
    {
      id: "nmu-pgce-fet",
      name: "PGCE: FET",
      faculty: "Faculty of Education",
      apsMin: 0,
      duration: "1-2 years",
      additionalRequirements: ["Approved bachelor’s degree at NQF Level 7 or 8 with sufficient disciplinary knowledge"],
      careerOpportunities: ["High school teacher"],
    },
    {
      id: "nmu-pgce-sp-fet",
      name: "PGCE: SP & FET",
      faculty: "Faculty of Education",
      apsMin: 0,
      duration: "1-2 years",
      additionalRequirements: ["Approved bachelor’s degree at NQF Level 7 or 8 with sufficient disciplinary knowledge"],
      careerOpportunities: ["High school teacher"],
    },

    // Faculty of Engineering, the Built Environment and Technology
    {
      id: "nmu-hcert-mechatronic-engineering",
      name: "Higher Certificate (Mechatronic Engineering)",
      faculty: "Faculty of Engineering, the Built Environment and Technology",
      apsMin: 33,
      duration: "1 year",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 4 },
          ],
        },
        "physical sciences": {
          alternatives: [
            { subject: "physical sciences", level: 4 },
            { subject: "technical sciences", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for higher certificate entry"],
      careerOpportunities: ["Artisan support", "Technician support", "Technologist support", "Engineering team support in automated manufacturing"],
    },
    {
      id: "nmu-hcert-renewable-energy-engineering",
      name: "Higher Certificate (Renewable Energy Engineering)",
      faculty: "Faculty of Engineering, the Built Environment and Technology",
      apsMin: 33,
      duration: "1 year",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 4 },
          ],
        },
        "physical sciences": {
          alternatives: [
            { subject: "physical sciences", level: 4 },
            { subject: "technical sciences", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for higher certificate entry"],
      careerOpportunities: ["Artisan support", "Technician support", "Technologist support", "Engineering team support in renewable energy sector"],
    },
    {
      id: "nmu-dip-operations-management",
      name: "Diploma (Operations Management)",
      faculty: "Faculty of Engineering, the Built Environment and Technology",
      apsMin: 31,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Full-time employment in a related field", "Comprehensive CV", "Departmental selection"],
      careerOpportunities: ["Production planner", "Operations manager", "Supervisor", "Team leader", "Work study practitioner", "Quality practitioner", "Operations analyst", "Logistics and stores manager"],
    },
    {
      id: "nmu-advdip-quality",
      name: "Advanced Diploma (Quality)",
      faculty: "Faculty of Engineering, the Built Environment and Technology",
      apsMin: 0,
      duration: "2 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics i or equivalent at nqf level 5", level: 0 },
          ],
        },
      },
      additionalRequirements: ["65% average for relevant Diploma/Degree or 60% with 2 years work experience", "Employment in relevant field", "English proficiency for non-English speakers"],
      careerOpportunities: ["Quality practitioner", "Manager", "Supervisor", "Foreman"],
    },
    {
      id: "nmu-advdip-operations-management",
      name: "Advanced Diploma (Operations Management)",
      faculty: "Faculty of Engineering, the Built Environment and Technology",
      apsMin: 0,
      duration: "2 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics i or equivalent at nqf level 5", level: 0 },
          ],
        },
      },
      additionalRequirements: ["65% average for relevant Diploma/Degree or 60% with 2 years work experience", "Employment in relevant field", "English proficiency for non-English speakers"],
      careerOpportunities: ["Production planner", "Operations manager", "Supervisor", "Foreman", "Work study practitioner", "Quality practitioner", "Operations analyst"],
    },
    {
      id: "nmu-beng-mechatronics",
      name: "Bachelor of Engineering (Mechatronics)",
      faculty: "Faculty of Engineering, the Built Environment and Technology",
      apsMin: 41,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 6,
        "Physical Sciences": 7,
      },
      additionalRequirements: ["Minimum statutory NSC requirements for degree entry", "Recommended: Engineering Graphics & Design and/or Information Technology"],
      careerOpportunities: ["Mechatronic engineer", "Robotics designer", "Automated plant developer"],
    },
    {
      id: "nmu-beng-electrical",
      name: "Bachelor of Engineering Technology (Electrical Engineering)",
      faculty: "Faculty of Engineering, the Built Environment and Technology",
      apsMin: 37,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 6,
        "Physical Sciences": 5,
      },
      additionalRequirements: ["Minimum statutory NSC requirements for degree entry"],
      careerOpportunities: ["Electrical engineering technologist", "Power generation specialist", "Control systems designer"],
    },
    {
      id: "nmu-beng-industrial",
      name: "Bachelor of Engineering Technology (Industrial Engineering)",
      faculty: "Faculty of Engineering, the Built Environment and Technology",
      apsMin: 37,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 6,
        "Physical Sciences": 5,
      },
      additionalRequirements: ["Minimum statutory NSC requirements for degree entry"],
      careerOpportunities: ["Industrial engineering technologist", "Manufacturing process designer"],
    },
    {
      id: "nmu-beng-mechanical",
      name: "Bachelor of Engineering Technology (Mechanical Engineering)",
      faculty: "Faculty of Engineering, the Built Environment and Technology",
      apsMin: 37,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 6,
        "Physical Sciences": 5,
      },
      additionalRequirements: ["Minimum statutory NSC requirements for degree entry"],
      careerOpportunities: ["Mechanical engineering technologist", "Product designer", "Maintenance engineer"],
    },
    {
      id: "nmu-beng-marine",
      name: "Bachelor of Engineering Technology (Marine Engineering)",
      faculty: "Faculty of Engineering, the Built Environment and Technology",
      apsMin: 37,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 6,
        "Physical Sciences": 5,
      },
      additionalRequirements: ["Minimum statutory NSC requirements for degree entry"],
      careerOpportunities: ["Naval architect", "Shore-based marine engineer", "Engine officer (Seafarer)"],
    },
    {
      id: "nmu-dip-architectural-technology",
      name: "Diploma (Architectural Technology)",
      faculty: "Faculty of Engineering, the Built Environment and Technology",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 4 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Prescribed portfolio", "Interview", "Possible 3-week preparation course"],
      careerOpportunities: ["Architectural technologist", "Construction consultant"],
    },
    {
      id: "nmu-dip-interior-design",
      name: "Diploma in Interior Design",
      faculty: "Faculty of Engineering, the Built Environment and Technology",
      apsMin: 315,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 2 },
            { subject: "technical mathematics", level: 2 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for diploma entry", "Departmental selection", "Creative portfolio", "Interview"],
      careerOpportunities: ["Interior design firms", "Architectural practices", "Furniture manufacturers and suppliers", "Property developers", "Self-employed consultants"],
    },
    {
      id: "nmu-advdip-architectural-design",
      name: "Advanced Diploma (Architectural Design)",
      faculty: "Faculty of Engineering, the Built Environment and Technology",
      apsMin: 0,
      duration: "1 year",
      additionalRequirements: ["Diploma in Architectural Technology", "Specific module average requirements", "Portfolio for non-standard applicants"],
      careerOpportunities: ["Architectural practices", "Government institutions", "Property developers", "Self-employed consultants"],
    },
    {
      id: "nmu-advdip-architectural-technology",
      name: "Advanced Diploma (Architectural Technology)",
      faculty: "Faculty of Engineering, the Built Environment and Technology",
      apsMin: 0,
      duration: "1 year",
      additionalRequirements: ["Diploma in Architectural Technology", "Specific module average requirements", "Portfolio for non-standard applicants"],
      careerOpportunities: ["Architects’ offices", "Public sector", "Property developers", "Self-employed consultants"],
    },
    {
      id: "nmu-advdip-interior-design",
      name: "Advanced Diploma (Interior Design)",
      faculty: "Faculty of Engineering, the Built Environment and Technology",
      apsMin: 0,
      duration: "1 year",
      additionalRequirements: ["Diploma in Interior Design", "Specific module average requirements", "Entrance examination for non-qualifying applicants", "Portfolio"],
      careerOpportunities: ["Interior design firms", "Architectural practices", "Furniture manufacturers and suppliers", "Property developers", "Self-employed consultants"],
    },
    {
      id: "nmu-bas-architecture",
      name: "Bachelor of Architectural Studies (BAS)",
      faculty: "Faculty of Engineering, the Built Environment and Technology",
      apsMin: 370,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 4,
      },
      additionalRequirements: ["Minimum statutory NSC requirements for degree entry", "Creative portfolio", "Interview"],
      careerOpportunities: ["Architectural design and production"],
    },
    {
      id: "nmu-hcert-human-settlement-development",
      name: "Higher Certificate (Human Settlement Development)",
      faculty: "Faculty of Engineering, the Built Environment and Technology",
      apsMin: 0,
      duration: "1 year",
      additionalRequirements: ["Minimum statutory NSC requirements for higher certificate entry", "Must be employed in the field for at least one year"],
      careerOpportunities: ["Public and private sector human settlement policy and project management"],
    },
    {
      id: "nmu-dip-building",
      name: "Diploma (Building)",
      faculty: "Faculty of Engineering, the Built Environment and Technology",
      apsMin: 330,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for diploma entry", "Departmental selection"],
      careerOpportunities: ["Supervisory and middle management in building industry", "Technical support in quantity surveying"],
    },
    {
      id: "nmu-advdip-quantity-surveying",
      name: "Advanced Diploma (Quantity Surveying)",
      faculty: "Faculty of Engineering, the Built Environment and Technology",
      apsMin: 0,
      duration: "1 year",
      additionalRequirements: ["Diploma: Building", "Weighted average of 60% in final year", "60% for core module"],
      careerOpportunities: ["Construction companies", "Quantity surveying firms", "Financial institutions", "Local authorities", "State departments"],
    },
    {
      id: "nmu-advdip-construction-management",
      name: "Advanced Diploma (Construction Management)",
      faculty: "Faculty of Engineering, the Built Environment and Technology",
      apsMin: 0,
      duration: "1 year",
      additionalRequirements: ["Diploma: Building", "Weighted average of 60% in final year", "60% for core module"],
      careerOpportunities: ["Private building contractors", "Local authorities", "State departments"],
    },
    {
      id: "nmu-bsc-construction-economics",
      name: "BSc in Construction Economics",
      faculty: "Faculty of Engineering, the Built Environment and Technology",
      apsMin: 370,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 4,
      },
      additionalRequirements: ["Minimum statutory NSC requirements for degree entry", "Departmental selection"],
      careerOpportunities: ["Quantity surveyor", "Civil engineering construction", "Facilities management", "Mining", "Government administration", "Property finance"],
    },
    {
      id: "nmu-bsc-construction-studies",
      name: "BSc (Construction Studies)",
      faculty: "Faculty of Engineering, the Built Environment and Technology",
      apsMin: 370,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 4,
      },
      additionalRequirements: ["Minimum statutory NSC requirements for degree entry"],
      careerOpportunities: ["Site agents", "Site managers", "Contract managers", "Estimators", "Planners", "Managers", "Directors"],
    },
    {
      id: "nmu-bhsd-human-settlement-development",
      name: "Bachelor of Human Settlement Development (BHSD)",
      faculty: "Faculty of Engineering, the Built Environment and Technology",
      apsMin: 370,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 4 },
            { subject: "mathematical literacy", level: 6 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for degree entry", "Four months (one month per year) of work integrated learning (WIL)"],
      careerOpportunities: ["managing organisations", "developing and implementing human settlement policy, strategies, programmes, and projects in the public and private sectors"],
    },
    {
      id: "nmu-bengtech-civil-engineering",
      name: "BEngTech (Civil Engineering)",
      faculty: "Faculty of Engineering, the Built Environment and Technology",
      apsMin: 370,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 5 },
            { subject: "technical mathematics", level: 5 },
          ],
        },
        "physical sciences": {
          alternatives: [
            { subject: "physical sciences", level: 4 },
            { subject: "technical sciences", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for degree entry", "Alternatively: Higher Certificate in Mechatronics Engineering or Renewable Energy Engineering with 60% average and 60% for Mathematics"],
      careerOpportunities: ["governmental agencies", "municipalities", "construction companies", "consultants"],
    },
    {
      id: "nmu-hcert-it-user-support",
      name: "Higher Certificate (HCert): IT (User Support Services)",
      faculty: "Faculty of Engineering, the Built Environment and Technology",
      apsMin: 290,
      duration: "1 year",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 2 },
            { subject: "technical mathematics", level: 2 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for higher certificate entry"],
      careerOpportunities: ["IT Technician"],
    },
    {
      id: "nmu-dip-it-software-development",
      name: "Diploma (Dip): IT (Software Development)",
      faculty: "Faculty of Engineering, the Built Environment and Technology",
      apsMin: 330,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for diploma entry"],
      careerOpportunities: ["Software Developer", "Application Systems Analysis"],
    },
    {
      id: "nmu-dip-it-communication-networks",
      name: "Diploma (Dip): IT (Communication Networks)",
      faculty: "Faculty of Engineering, the Built Environment and Technology",
      apsMin: 330,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for diploma entry"],
      careerOpportunities: ["network and communication infrastructure design specialist"],
    },
    {
      id: "nmu-dip-it-support-services",
      name: "Diploma (Dip): IT (Support Services)",
      faculty: "Faculty of Engineering, the Built Environment and Technology",
      apsMin: 330,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for diploma entry", "Alternatively: Higher Certificate in IT (User Support Services) with 60% average"],
      careerOpportunities: ["IT Support Services specialist"],
    },
    {
      id: "nmu-bit-information-technology",
      name: "Bachelor of Information Technology (BIT)",
      faculty: "Faculty of Engineering, the Built Environment and Technology",
      apsMin: 370,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for degree entry"],
      careerOpportunities: ["Solution Architect", "Information Technology Consultant", "Systems Analyst", "Chief Information Officer"],
    },
    {
      id: "nmu-advdip-it",
      name: "Advanced Diploma (Information Technology)",
      faculty: "Faculty of Engineering, the Built Environment and Technology",
      apsMin: 0,
      duration: "1 year",
      additionalRequirements: ["NQF level 6 (Diploma in IT of 360 credits)", "60% average for final year major modules"],
      careerOpportunities: ["Networking", "Software Development", "User Support Management"],
    },

    // Faculty of Health Sciences
    {
      id: "nmu-environmental-health",
      name: "Bachelor of Environmental Health",
      faculty: "Faculty of Health Sciences",
      apsMin: 390,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 5,
        "Physical Sciences": 5,
        "Life Sciences": 5,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry", "Departmental selection"],
      careerOpportunities: ["Environmental Health Practitioner", "Inspector for Department of Employment & Labour", "Meat inspector", "Occupational Hygienist", "Occupational Health and Safety Practitioner", "Auditor", "Risk Assessor", "Pollution Control Practitioner", "Waste Specialist", "Training Specialist", "Academia"],
    },
    {
      id: "nmu-ba-psychology",
      name: "Bachelor of Arts in Psychology",
      faculty: "Faculty of Health Sciences",
      apsMin: 350,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["Clinical/counselling psychology", "Industrial and organisational psychology", "NGO sectors", "Childcare", "Lay counselling", "Human resource management", "Organisational development"],
    },
    {
      id: "nmu-bsw-social-work",
      name: "Bachelor of Social Work (BSW)",
      faculty: "Faculty of Health Sciences",
      apsMin: 350,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry", "Departmental selection", "Registration with SACSSP", "Police clearance certificate"],
      careerOpportunities: ["Family and child welfare organisations", "Government departments (health and welfare)", "Prisons", "Hospitals", "Schools", "Industry", "Police and defence force"],
    },
    {
      id: "nmu-bsc-dietetics",
      name: "BSc (Dietetics)",
      faculty: "Faculty of Health Sciences",
      apsMin: 390,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": 5,
        "physical sciences": 5,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry", "Registration with HPCSA"],
      careerOpportunities: ["Private practice", "Therapeutic settings", "Health care industry", "Food or pharmaceutical industries", "Community health facilities", "Food service management"],
    },
    {
      id: "nmu-dip-sport-management",
      name: "Diploma (Sport Management)",
      faculty: "Faculty of Health Sciences",
      apsMin: 330,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Minimum NSC statutory requirements for diploma entry", "Active participation in competitive sport", "Sport CV and letter of involvement"],
      careerOpportunities: ["Sport administrator", "Sport marketer", "Sport agent", "Sport manager", "Sport development officer", "Sport commentator", "Sport entrepreneur"],
    },
    {
      id: "nmu-bhms-human-movement-science",
      name: "Bachelor of Human Movement Science (BHMS)",
      faculty: "Faculty of Health Sciences",
      apsMin: 350,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry", "Medical examination"],
      careerOpportunities: ["Teaching"],
    },
    {
      id: "nmu-bhsc-biokinetics",
      name: "Bachelor of Health Science in Biokinetics",
      faculty: "Faculty of Health Sciences",
      apsMin: 370,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 4 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
        "life sciences": 4,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry", "Satisfactory medical report"],
      careerOpportunities: ["clinical practice management", "school health and wellness", "government departments", "corporate wellness"],
    },
    {
      id: "nmu-bnursing-extended",
      name: "Bachelor of Nursing Extended curriculum",
      faculty: "Faculty of Health Sciences",
      apsMin: 330,
      duration: "5 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 2 },
            { subject: "technical mathematics", level: 2 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
        "life sciences": 4,
        "physical sciences": 3,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry", "Registered as student nurse with South African Nursing Council", "Satisfactory medical report", "Proof of professional indemnity insurance"],
      careerOpportunities: ["private or public hospitals", "comprehensive health care clinics", "communities", "private practice"],
    },
    {
      id: "nmu-nursing",
      name: "Bachelor of Nursing",
      faculty: "Faculty of Health Sciences",
      apsMin: 370,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 5,
        "Physical Sciences": 5,
        "Life Sciences": 6,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry", "Registered as student nurse with South African Nursing Council", "Satisfactory medical report", "Proof of professional indemnity insurance"],
      careerOpportunities: ["private or public hospitals", "comprehensive health care clinics", "communities", "private practice"],
    },
    {
      id: "nmu-brad-diagnostic",
      name: "Bachelor of Radiography in Diagnostic (BRad)",
      faculty: "Faculty of Health Sciences",
      apsMin: 390,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": 4,
        "life sciences": 4,
        "physical sciences": 4,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry", "Physically fit", "Satisfactory medical report", "Departmental selection", "Visit to an X-Ray department"],
      careerOpportunities: ["Diagnostic radiographer"],
    },
    {
      id: "nmu-bemc",
      name: "Bachelor of Emergency Medical Care (BEMC)",
      faculty: "Faculty of Health Sciences",
      apsMin: 370,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 4 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
        "life sciences": 5,
        "physical sciences": 4,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry", "Departmental selection", "Interview", "Medical fitness report", "Physical assessment"],
      careerOpportunities: ["ambulance services", "training environment", "aeromedical services", "military", "event management", "mining industry", "disaster relief"],
    },
    {
      id: "nmu-bhsc-medical-lab",
      name: "Bachelor of Health Sciences in Medical Laboratory Science",
      faculty: "Faculty of Health Sciences",
      apsMin: 390,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": 5,
        "life sciences": 4,
        "physical sciences": 4,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry", "Departmental selection", "Interview and/or practical assessment", "Visit to a pathology laboratory"],
      careerOpportunities: ["Medical diagnostic laboratories", "Private pathology practices", "National Health Laboratory Services", "Blood transfusion services", "Forensic laboratories", "Medical research"],
    },
    {
      id: "nmu-bpharm",
      name: "Bachelor of Pharmacy (BPharm)",
      faculty: "Faculty of Health Sciences",
      apsMin: 410,
      duration: "4 years",
      subjectRequirements: {
        "english home language or first additional language": 4,
        "mathematics": 5,
        "physical sciences": 5,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry", "Departmental selection"],
      careerOpportunities: ["Community (retail) pharmacy", "Hospital pharmacy", "Pharmaceutical manufacturing", "Academia"],
    },
    {
      id: "nmu-mbchb",
      name: "Bachelor of Medicine and Bachelor of Surgery (MBChB)",
      faculty: "Faculty of Health Sciences",
      apsMin: 430,
      duration: "6 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 5,
        "physical sciences": 5,
        "life sciences": 5,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry", "Departmental selection", "HPCSA registration", "Professional indemnity insurance"],
      careerOpportunities: ["General practitioner", "Medical researcher", "Medical lecturer"],
    },

    // Faculty of Humanities
    {
      id: "nmu-bva",
      name: "Bachelor of Visual Art (BVA)",
      faculty: "Faculty of Humanities",
      apsMin: 350,
      duration: "3 years",
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry", "Prescribed portfolio", "Interview", "Departmental selection"],
      careerOpportunities: ["Fashion and Textiles", "Graphic Design", "Photography", "Fine Art"],
    },
    {
      id: "nmu-dip-music-curriculum-1",
      name: "Diploma in Music (Curriculum 1)",
      faculty: "Faculty of Humanities",
      apsMin: 290,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 4 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for diploma entry", "Audition in chosen First Instrument"],
      careerOpportunities: ["Private music teaching", "Music technology", "Choral conducting"],
    },
    {
      id: "nmu-dip-music-curriculum-2",
      name: "Diploma in Music (Curriculum 2)",
      faculty: "Faculty of Humanities",
      apsMin: 290,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 4 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for diploma entry", "Audition in chosen First Instrument", "Minimum standard of musical performance equivalent to grade 2 or 6 depending on module"],
      careerOpportunities: ["Performer", "Composer", "Programme compiler", "Music journalist", "Arts administrator", "Music librarian or archivist", "Researcher"],
    },
    {
      id: "nmu-bmus-school-music",
      name: "BMus (School Music)",
      faculty: "Faculty of Humanities",
      apsMin: 350,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 5 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for degree entry", "Grade 6 practical music standard", "Grade 5 music theory standard", "Audition and music theory entrance test"],
      careerOpportunities: ["Music teachers"],
    },
    {
      id: "nmu-bmus-school-music-extended",
      name: "BMus (School Music) Extended curriculum",
      faculty: "Faculty of Humanities",
      apsMin: 330,
      duration: "5 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 5 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for degree entry", "Departmental selection"],
      careerOpportunities: ["Music teachers"],
    },
    {
      id: "nmu-bmus-performing-arts",
      name: "BMus (Performing Arts)",
      faculty: "Faculty of Humanities",
      apsMin: 350,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 5 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for degree entry", "Grade 6 practical music standard", "Grade 5 music theory standard", "Audition and music theory entrance test"],
      careerOpportunities: ["Performing musicians (solo or ensemble)"],
    },
    {
      id: "nmu-bmus-performing-arts-extended",
      name: "BMus (Performing Arts) Extended curriculum",
      faculty: "Faculty of Humanities",
      apsMin: 330,
      duration: "5 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 5 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for degree entry", "Departmental selection"],
      careerOpportunities: ["Performing musicians (solo or ensemble)"],
    },
    {
      id: "nmu-bmus-music-technology",
      name: "BMus (Music Technology)",
      faculty: "Faculty of Humanities",
      apsMin: 350,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 5 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for degree entry", "Grade 6 practical music standard", "Grade 5 music theory standard", "Audition and music theory entrance test"],
      careerOpportunities: ["Music technologist", "Producer", "Arranger", "Composer", "Electro-acoustic musician", "Sound engineer", "Independent record label owner", "Acoustics and sound installation consultant", "Technology-enabled music teacher"],
    },
    {
      id: "nmu-bmus-music-technology-extended",
      name: "BMus (Music Technology) Extended curriculum",
      faculty: "Faculty of Humanities",
      apsMin: 330,
      duration: "5 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 5 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for degree entry", "Departmental selection"],
      careerOpportunities: ["Music technologist", "Producer", "Arranger", "Composer", "Electro-acoustic musician", "Sound engineer", "Independent record label owner", "Acoustics and sound installation consultant", "Technology-enabled music teacher"],
    },
    {
      id: "nmu-bmus-general",
      name: "BMus (General)",
      faculty: "Faculty of Humanities",
      apsMin: 350,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 5 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for degree entry", "Grade 6 practical music standard", "Grade 5 music theory standard", "Audition and music theory entrance test"],
    },
    {
      id: "nmu-bmus-general-extended",
      name: "BMus (General) Extended curriculum",
      faculty: "Faculty of Humanities",
      apsMin: 330,
      duration: "5 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 5 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for degree entry", "Departmental selection"],
    },
    {
      id: "nmu-dip-public-relations",
      name: "Diploma in Public Relations Management",
      faculty: "Faculty of Humanities",
      apsMin: 330,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 2 },
            { subject: "technical mathematics", level: 4 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for diploma entry", "1 year in-service training"],
      careerOpportunities: ["Public relations practitioners"],
    },
    {
      id: "nmu-advdip-public-relations",
      name: "Advanced Diploma in Public Relations Management",
      faculty: "Faculty of Humanities",
      apsMin: 0,
      duration: "1 year",
      additionalRequirements: ["Diploma in Public Relations Management or equivalent with at least 60% final mark"],
      careerOpportunities: ["Public Relations Officer", "Communications Officer", "Corporate Communication Officer", "Media Liaison", "Brand Consultant"],
    },
    {
      id: "nmu-ba",
      name: "Bachelor of Arts (BA)",
      faculty: "Faculty of Humanities",
      apsMin: 350,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
      },
      additionalRequirements: ["Minimum statutory NSC requirements for degree entry", "60% pass in any NSC language"],
    },
    {
      id: "nmu-ba-mcc",
      name: "BA (Media, Communication & Culture)",
      faculty: "Faculty of Humanities",
      apsMin: 350,
      duration: "3 years",
      subjectRequirements: {
        "english": {
          alternatives: [
            { subject: "english home language", level: 5 },
            { subject: "english first additional language", level: 5 },
          ],
        },
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 2 },
            { subject: "technical mathematics", level: 4 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for degree entry"],
      careerOpportunities: ["Copywriter", "Video producer", "Video editor", "Journalist", "Digital content creator", "Strategic communications professional", "Visual communication designer", "Social media manager", "Media researcher", "Entrepreneur"],
    },
    {
      id: "nmu-dip-public-management",
      name: "Diploma (Public Management)",
      faculty: "Faculty of Humanities",
      apsMin: 310,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 2 },
            { subject: "technical mathematics", level: 4 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for diploma entry"],
      careerOpportunities: ["General manager", "Financial manager", "Personnel manager"],
    },
    {
      id: "nmu-dip-public-management-extended",
      name: "Diploma (Public Management) Extended curriculum",
      faculty: "Faculty of Humanities",
      apsMin: 290,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 2 },
            { subject: "technical mathematics", level: 4 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for diploma entry"],
      careerOpportunities: ["General manager", "Financial manager", "Personnel manager"],
    },
    {
      id: "nmu-advdip-public-admin",
      name: "Advanced Diploma (Public Administration & Management)",
      faculty: "Faculty of Humanities",
      apsMin: 0,
      duration: "1 year",
      additionalRequirements: ["Diploma (Public Management) or equivalent with 60% average", "Interview for candidates with 55-60% average and 2 years work experience"],
      careerOpportunities: ["General manager", "Financial manager", "Personnel manager"],
    },
    {
      id: "nmu-ba-politics-economics",
      name: "BA (Politics & Economics)",
      faculty: "Faculty of Humanities",
      apsMin: 350,
      duration: "3 years",
      subjectRequirements: {
        "english": {
          alternatives: [
            { subject: "english home language", level: 5 },
            { subject: "english first additional language", level: 5 },
          ],
        },
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 6 },
            { subject: "mathematical literacy", level: 6 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for degree entry"],
      careerOpportunities: ["Government", "Private sector", "Research", "Academia", "Journalism", "International Organisations", "Non-Governmental Organisations", "Non-Profit Organisations"],
    },
    {
      id: "nmu-badmin-public-admin",
      name: "Bachelor of Administration (BAdmin) (Public Administration)",
      faculty: "Faculty of Humanities",
      apsMin: 350,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 2 },
            { subject: "technical mathematics", level: 4 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Minimum statutory NSC requirements for degree entry"],
      careerOpportunities: ["Facilitator", "Psychologist", "Human relations practitioner", "Consultant", "Entrepreneur"],
    },

    // Faculty of Law
    {
      id: "nmu-hcert-law-enforcement",
      name: "Higher Certificate (Law Enforcement)",
      faculty: "Faculty of Law",
      apsMin: 310,
      duration: "1 year",
      subjectRequirements: {
        "english": {
          alternatives: [
            { subject: "english home language", level: 4 },
            { subject: "english first additional language", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Minimum NSC statutory requirements for higher certificate entry"],
      careerOpportunities: ["Law enforcement officer (municipalities, SANParks, SAPS, correctional services)"],
    },
    {
      id: "nmu-dip-law-enforcement",
      name: "Diploma (Law Enforcement)",
      faculty: "Faculty of Law",
      apsMin: 330,
      duration: "3 years",
      subjectRequirements: {
        "english": {
          alternatives: [
            { subject: "english home language", level: 4 },
            { subject: "english first additional language", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Minimum NSC statutory requirements for diploma entry", "Departmental selection"],
      careerOpportunities: ["Municipal law enforcement", "Building control", "Forestry", "Fisheries", "SANParks", "Environmental agencies", "Transport"],
    },
    {
      id: "nmu-ba-law",
      name: "BA (Law)",
      faculty: "Faculty of Law",
      apsMin: 390,
      duration: "3 years",
      subjectRequirements: {
        "english": {
          alternatives: [
            { subject: "english home language", level: 5 },
            { subject: "english first additional language", level: 6 },
          ],
        },
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 6 },
            { subject: "mathematical literacy", level: 6 },
          ],
        },
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["Legal practitioner", "Public prosecutor", "Public defender", "Legal adviser", "Magistrate", "Judge", "Family advocate"],
    },
    {
      id: "nmu-bcom-law",
      name: "BCom (Law)",
      faculty: "Faculty of Law",
      apsMin: 390,
      duration: "3 years",
      subjectRequirements: {
        "english": {
          alternatives: [
            { subject: "english home language", level: 5 },
            { subject: "english first additional language", level: 6 },
          ],
        },
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["Corporate legal advisor", "Legal practitioner", "Labour dispute specialist", "Risk and compliance consultant", "Company secretary", "Liquidator", "Business rescue practitioner"],
    },
    {
      id: "nmu-llb",
      name: "LLB (Law)",
      faculty: "Faculty of Law",
      apsMin: 390,
      duration: "4 years",
      subjectRequirements: {
        "english": {
          alternatives: [
            { subject: "english home language", level: 5 },
            { subject: "english first additional language", level: 6 },
          ],
        },
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["Attorney", "Advocate", "Public prosecutor", "Public defender", "Legal adviser", "Magistrate", "Judge", "Company secretary", "Liquidator", "Business rescue practitioner"],
    },
    {
      id: "nmu-llb-extended",
      name: "LLB (Extended Curriculum)",
      faculty: "Faculty of Law",
      apsMin: 370,
      duration: "5 years",
      subjectRequirements: {
        "english": {
          alternatives: [
            { subject: "english home language", level: 5 },
            { subject: "english first additional language", level: 5 },
          ],
        },
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 6 },
            { subject: "mathematical literacy", level: 6 },
          ],
        },
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["Attorney", "Advocate", "Public prosecutor", "Public defender", "Legal adviser", "Magistrate", "Judge", "Company secretary", "Liquidator", "Business rescue practitioner"],
    },

    // Faculty of Science
    {
      id: "nmu-dip-agricultural-management",
      name: "Diploma (Agricultural Management)",
      faculty: "Faculty of Science",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
        "additional": {
          alternatives: [
            { subject: "physical sciences", level: 3 },
            { subject: "technical sciences", level: 3 },
            { subject: "life sciences", level: 4 },
            { subject: "agricultural sciences", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Minimum NSC statutory requirements for diploma entry"],
      careerOpportunities: ["Farm manager", "Work in cooperatives", "Chemical companies", "Civil service", "Agricultural product/service companies"],
    },
    {
      id: "nmu-dip-analytical-chemistry",
      name: "Diploma (Analytical Chemistry)",
      faculty: "Faculty of Science",
      apsMin: 35,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 4,
        "physical sciences": 4,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for diploma entry", "11 months work integrated learning"],
      careerOpportunities: ["Analytical chemist", "Chemical technician", "Research and process development", "Laboratory overseer"],
    },
    {
      id: "nmu-dip-game-ranch-management",
      name: "Diploma (Game Ranch Management)",
      faculty: "Faculty of Science",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Minimum NSC statutory requirements for diploma entry"],
      careerOpportunities: ["Game rancher", "Nature reserve manager", "Ecotourism manager", "Provincial nature conservation official"],
    },
    {
      id: "nmu-dip-polymer-technology",
      name: "Diploma (Polymer Technology)",
      faculty: "Faculty of Science",
      apsMin: 35,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 4,
        "physical sciences": 4,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for diploma entry", "11 months work integrated learning"],
      careerOpportunities: ["Motor manufacturing industry", "Paint industry", "Tyre industry", "Plastic-component industry"],
    },
    {
      id: "nmu-dip-chemical-process-technology",
      name: "Diploma (Chemical Process Technology)",
      faculty: "Faculty of Science",
      apsMin: 35,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 4,
        "physical sciences": 4,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for diploma entry", "Medical screening for asthma or lung diseases"],
      careerOpportunities: ["Chemical Process Technician", "Chemical industry", "Petroleum industry"],
    },
    {
      id: "nmu-bsc-biological-sciences",
      name: "BSc (Biological Sciences)",
      faculty: "Faculty of Science",
      apsMin: 41,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 5,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["Marine biology", "Conservation biology", "Ecology", "Environmental management", "Coastal zone management"],
    },
    {
      id: "nmu-bsc-biological-sciences-extended",
      name: "BSc (Biological Sciences) Extended Curriculum",
      faculty: "Faculty of Science",
      apsMin: 37,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": 4,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["Marine biology", "Conservation biology", "Ecology", "Environmental management", "Coastal zone management"],
    },
    {
      id: "nmu-bsc-biochemistry-chemistry-microbiology-physiology",
      name: "BSc (Biochemistry, Chemistry, Microbiology & Physiology)",
      faculty: "Faculty of Science",
      apsMin: 41,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 5,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["Chemical industry", "Food industry", "Biotechnological industry", "Teaching", "Research"],
    },
    {
      id: "nmu-bsc-environmental-sciences",
      name: "BSc (Environmental Sciences)",
      faculty: "Faculty of Science",
      apsMin: 41,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 5,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["Mining", "Water affairs", "Environmental affairs", "Consulting", "Civil engineering"],
    },
    {
      id: "nmu-bsc-geosciences",
      name: "BSc: Geosciences (Geology & Geography)",
      faculty: "Faculty of Science",
      apsMin: 41,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 5,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["Geographer", "Geologist", "Mining", "Research and exploration", "Environmental management"],
    },
    {
      id: "nmu-bsc-computer-science",
      name: "BSc (Computer Science)",
      faculty: "Faculty of Science",
      apsMin: 41,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 6,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["Industrial Mathematics", "Computational Physics", "Data Science", "Business Intelligence Analyst", "Data Scientist"],
    },
    {
      id: "nmu-bsc-physical-science-mathematics",
      name: "BSc (Physical Science & Mathematics)",
      faculty: "Faculty of Science",
      apsMin: 41,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 6,
      },
      additionalRequirements: ["Minimum NSC statutory requirements for degree entry"],
      careerOpportunities: ["Researcher", "Scientist", "Chemist", "Mathematician", "Physicist", "Teacher"],
    },
    {
      id: "nmu-dip-forestry",
      name: "Diploma (Forestry)",
      faculty: "Faculty of Science",
      apsMin: 330,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Admission is subject to departmental selection", "Minimum NSC statutory requirements for diploma entry"],
      careerOpportunities: ["forestry companies", "pulpwood and mining timber growers", "municipalities", "local authorities"],
    },
    {
      id: "nmu-dip-nature-conservation",
      name: "Diploma (Nature Conservation)",
      faculty: "Faculty of Science",
      apsMin: 330,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Admission is subject to departmental selection", "Minimum NSC statutory requirements for diploma entry"],
      careerOpportunities: ["nature conservators", "game ranch managers", "conservation management", "parks boards", "forestry companies"],
    },
    {
      id: "nmu-dip-wood-technology",
      name: "Diploma (Wood Technology)",
      faculty: "Faculty of Science",
      apsMin: 330,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Admission is subject to departmental selection", "Minimum NSC statutory requirements for diploma entry"],
      careerOpportunities: ["sawmill companies", "mining timber mills", "furniture industry", "SABS", "CSIR"],
    },

    // Faculty of Engineering, the Built Environment & Technology

    // Business & Economic Sciences
    {
      id: "nmu-bcom-chartered-accounting",
      name: "Bachelor of Commerce in Chartered Accountancy",
      faculty: "Business & Economic Sciences",
      apsMin: 41,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 6,
      },
      additionalRequirements: ["Mathematics 60% if took Grade 12 Accounting OR 65% if did not take Grade 12 Accounting. Also offered on George Campus"],
      careerOpportunities: ["Chartered Accountant", "CA(SA)", "Financial Director"],
    },
    {
      id: "nmu-bcom-accounting-science-economics",
      name: "Bachelor of Commerce: Accounting Science (Economics & Business Management)",
      faculty: "Business & Economic Sciences",
      apsMin: 41,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 7,
      },
      careerOpportunities: ["Chartered Accountant", "Business Analyst", "Financial Consultant"],
    },
    {
      id: "nmu-bcom-accounting-science-law",
      name: "Bachelor of Commerce: Accounting Science (Law)",
      faculty: "Business & Economic Sciences",
      apsMin: 36,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 7,
        "English Home": 7,
      },
      additionalRequirements: ["English (Home Lang) 65% or English (1st Add Lang) 70%"],
      careerOpportunities: ["Chartered Accountant", "Legal Advisor", "Corporate Lawyer"],
    },
    {
      id: "nmu-bcom-accounting-science-cs",
      name: "Bachelor of Commerce: Accounting Science (Computer Science & Information Systems)",
      faculty: "Business & Economic Sciences",
      apsMin: 36,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 7,
      },
      careerOpportunities: ["Chartered Accountant", "IT Auditor", "Systems Analyst"],
    },

    // Engineering, the Built Environment & Technology
    {
      id: "nmu-beng-civil",
      name: "Bachelor of Engineering Technology (Civil Engineering)",
      faculty: "Engineering, the Built Environment & Technology",
      apsMin: 37,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 6,
        "Physical Sciences": 5,
      },
      additionalRequirements: ["Mathematics 60% or Technical Maths 60%, and Physical Science 50% or Technical Science 50%"],
      careerOpportunities: ["Civil Engineer", "Structural Engineer", "Project Manager"],
    },
    {
      id: "nmu-bit",
      name: "Bachelor of Information Technology",
      faculty: "Engineering, the Built Environment & Technology",
      apsMin: 37,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 5,
      },
      additionalRequirements: ["Mathematics 50% or Technical Maths 50%"],
      careerOpportunities: ["Software Developer", "Systems Analyst", "IT Consultant"],
    },

    // Science
    {
      id: "nmu-bsc-biochemistry-chemistry",
      name: "Bachelor of Science (Biochemistry, Chemistry, Microbiology & Physiology)",
      faculty: "Science",
      apsMin: 41,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 6,
      },
      additionalRequirements: ["Mathematics 60%"],
      careerOpportunities: ["Biochemist", "Laboratory Scientist", "Research Analyst"],
    },
    {
      id: "nmu-bsc-applied-maths",
      name: "Bachelor of Science (Applied Mathematics, Computer Science, Mathematical Statistics and Physics)",
      faculty: "Science",
      apsMin: 41,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 7,
      },
      additionalRequirements: ["Mathematics 65%"],
      careerOpportunities: ["Data Scientist", "Actuary", "Research Scientist"],
    },
    {
      id: "nmu-bsc-physical-science-maths",
      name: "Bachelor of Science (Physical Science and Mathematics)",
      faculty: "Science",
      apsMin: 41,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 7,
      },
      additionalRequirements: ["Mathematics 65%"],
      careerOpportunities: ["Physicist", "Research Scientist", "Data Analyst"],
    },

    // Health Sciences
    {
      id: "nmu-brad",
      name: "Bachelor of Radiography in Diagnostic",
      faculty: "Health Sciences",
      apsMin: 39,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 5,
        "Physical Sciences": 5,
        "Life Sciences": 5,
      },
      additionalRequirements: ["Online applications close 30 June. Admission is subject to departmental selection"],
      careerOpportunities: ["Radiographer", "Medical Imaging Specialist", "Diagnostic Technologist"],
    },
    {
      id: "nmu-bsw",
      name: "Bachelor of Social Work",
      faculty: "Health Sciences",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 4,
      },
      additionalRequirements: ["Mathematics 40% or Maths Literacy 65%"],
      careerOpportunities: ["Social Worker", "Community Development Worker", "Child Protection Officer"],
    },
    {
      id: "nmu-bhms",
      name: "Bachelor of Human Movement Science",
      faculty: "Health Sciences",
      apsMin: 35,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 5,
      },
      additionalRequirements: ["Mathematics 45% or Maths Literacy 65%"],
      careerOpportunities: ["Sports Scientist", "Exercise Specialist", "Movement Analyst"],
    },

    // Education
    {
      id: "nmu-bed-foundation",
      name: "Bachelor of Education: Foundation Phase",
      faculty: "Education",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "Mathematics": 5,
      },
      additionalRequirements: ["English (Home Lang or 1st Add Lang) 50% and Afrikaans or isiXhosa 50%. Mathematics 45% or Maths Literacy 60%"],
      careerOpportunities: ["Foundation Phase Teacher", "Early Childhood Educator", "Primary School Teacher"],
    },
    {
      id: "nmu-bed-intermediate",
      name: "Bachelor of Education: Intermediate Phase",
      faculty: "Education",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "Mathematics": 5,
      },
      additionalRequirements: ["English (Home Lang or 1st Add Lang) 50% and Afrikaans or isiXhosa 50%. Mathematics 45% or Maths Literacy 60%"],
      careerOpportunities: ["Intermediate Phase Teacher", "Primary School Teacher", "Subject Specialist"],
    },
    {
      id: "nmu-bed-senior-commerce",
      name: "Bachelor of Education: Senior Phase and FET (Commerce Stream)",
      faculty: "Education",
      apsMin: 39,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "Mathematics": 6,
        "Accounting": 6,
      },
      additionalRequirements: ["English and Afrikaans/isiXhosa 50%. Mathematics 60%, Accounting 60%"],
      careerOpportunities: ["High School Teacher", "Business Studies Teacher", "Economics Teacher"],
    },
    {
      id: "nmu-bed-senior-science",
      name: "Bachelor of Education: Senior Phase and FET (Science Stream)",
      faculty: "Education",
      apsMin: 39,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "Mathematics": 6,
        "Physical Sciences": 6,
        "Life Sciences": 6,
      },
      additionalRequirements: ["English and Afrikaans/isiXhosa 50%. Mathematics 60%, Physical Science 60%, Life Science 60%"],
      careerOpportunities: ["High School Teacher", "Science Teacher", "Mathematics Teacher"],
    },
    {
      id: "nmu-bed-senior-humanities",
      name: "Bachelor of Education: Senior Phase and FET (Humanities Stream)",
      faculty: "Education",
      apsMin: 39,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "Mathematics": 5,
      },
      additionalRequirements: ["English and Afrikaans/isiXhosa 50%. Mathematics 45% (60% if Geography selected)"],
      careerOpportunities: ["High School Teacher", "Language Teacher", "History Teacher"],
    },
    {
      id: "nmu-bmus-school",
      name: "Bachelor of Music (School Music)",
      faculty: "Education",
      apsMin: 35,
      duration: "4 years",
      additionalRequirements: ["Practical standard equivalent to Grade 6 and music theoretical standard equivalent to Grade 5. Admission subject to audition and theory test"],
      careerOpportunities: ["Music Teacher", "Music Educator", "School Music Director"],
    },

    // Humanities
    {
      id: "nmu-ba-media-communication",
      name: "Bachelor of Arts (Media, Communication & Culture)",
      faculty: "Humanities",
      apsMin: 35,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 6,
        "Mathematics": 4,
      },
      additionalRequirements: ["Any one NSC (Home or 1st Add Lang) 60%, Mathematics 35% or Maths Literacy 55%"],
      careerOpportunities: ["Journalist", "Media Producer", "Communications Specialist"],
    },
    {
      id: "nmu-ba-hrm",
      name: "Bachelor of Arts (Human Resource Management)",
      faculty: "Humanities",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 4,
      },
      additionalRequirements: ["Mathematics 40% or Maths Literacy 70%"],
      careerOpportunities: ["HR Manager", "Recruitment Specialist", "Training Coordinator"],
    },
    {
      id: "nmu-badmin-public",
      name: "Bachelor of Administration (Public Administration)",
      faculty: "Humanities",
      apsMin: 35,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 4,
      },
      additionalRequirements: ["Mathematics 35% or Maths Literacy 55%"],
      careerOpportunities: ["Public Administrator", "Government Official", "Policy Analyst"],
    },
    {
      id: "nmu-bmus-performing",
      name: "Bachelor of Music (Performing Arts)",
      faculty: "Humanities",
      apsMin: 35,
      duration: "4 years",
      additionalRequirements: ["Practical standard equivalent to Grade 6 and music theoretical standard equivalent to Grade 5. Admission subject to audition and theory test"],
      careerOpportunities: ["Performer", "Music Director", "Arts Administrator"],
    },
    {
      id: "nmu-bmus-technology",
      name: "Bachelor of Music (Music Technology)",
      faculty: "Humanities",
      apsMin: 35,
      duration: "4 years",
      additionalRequirements: ["Practical standard equivalent to Grade 6 and music theoretical standard equivalent to Grade 5. Admission subject to audition and theory test"],
      careerOpportunities: ["Sound Engineer", "Music Producer", "Audio Technician"],
    },
    {
      id: "nmu-bhsd",
      name: "Bachelor of Human Settlement Development",
      faculty: "Humanities",
      apsMin: 37,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 5,
      },
      additionalRequirements: ["Mathematics 50% or Maths Literacy 70%. Admission subject to selection. Must be employed in related field"],
      careerOpportunities: ["Urban Planner", "Housing Development Officer", "Community Development Specialist"],
    },

    // Law
  ];

  // Additional methods for NMU-specific functionality
  getExtendedCurriculumPrograms(): Course[] {
    return this._courses.filter(
      (course) =>
        course.name.includes("Extended Curriculum") ||
        course.additionalRequirements?.includes("Extended"),
    );
  }

  getGeorgeCampusPrograms(): Course[] {
    return this._courses.filter((course) =>
      course.additionalRequirements?.includes("George Campus"),
    );
  }

  getMedicalPrograms(): Course[] {
    return this._courses.filter(
      (course) =>
        course.additionalRequirements?.includes("30 June") ||
        course.name.includes("Medicine") ||
        course.name.includes("Pharmacy") ||
        course.name.includes("Radiography"),
    );
  }

  getSelectionBasedPrograms(): Course[] {
    return this._courses.filter(
      (course) =>
        course.additionalRequirements?.includes("departmental selection") ||
        course.additionalRequirements?.includes("subject to selection"),
    );
  }

  /**
   * NMU-specific APS calculation
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
