import { BaseUniversity } from "./base-university";
import type { Course } from "@/lib/types";

/**
 * University of Pretoria (UP) class
 */
export class UP extends BaseUniversity {
  readonly id = "up";
  readonly name = "University of Pretoria";
  readonly shortName = "UP";
  readonly website = "https://www.up.ac.za";
  readonly logo = "/logos/up.png";
  readonly location = {
    city: "Pretoria",
    province: "Gauteng",
    coordinates: {
      latitude: -25.7545,
      longitude: 28.2314,
    },
  };

  protected readonly _courses: Course[] = [
    // Faculty of Economic and Management Sciences
    {
      id: "up-badmin-public-admin-int-relations",
      name: "Bachelor of Administration specialising in Public Administration and International Relations",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "english home language or english first additional language": 5,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      careerOpportunities: ["Diplomats", "political analysts", "managers in the public sector", "local government and the private sector", "non-governmental organisations", "international organisations and embassies", "human resources sections", "planning and general administrative divisions"],
    },
    {
      id: "up-bcom-accounting",
      name: "Bachelor of Commerce in Accounting Sciences",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 6,
      },
      careerOpportunities: ["Chartered accountants", "external auditors", "government auditors", "taxation professionals and advisors", "financial directors or managers"],
    },
    {
      id: "up-bcom-investment",
      name: "Bachelor of Commerce specialising in Investment Management",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 6,
      },
      careerOpportunities: ["Portfolio/fund managers", "investment analysts", "risk managers/analysts", "quantitative analysts", "financial advisors/planners", "wealth managers", "investment strategists"],
    },
    {
      id: "up-bcom-financial",
      name: "Bachelor of Commerce specialising in Financial Management Sciences",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
      },
      careerOpportunities: ["Financial reporting specialists", "management accountants", "management consultants", "financial advisors", "cost accountants", "financial managers", "tax advisors", "tax auditors", "internal auditors", "risk and compliance officers"],
    },
    {
      id: "up-bcom-econometrics",
      name: "Bachelor of Commerce specialising in Econometrics",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 6,
      },
      careerOpportunities: ["Econometricians", "analysts", "consultants", "researchers", "traders or brokers", "academics"],
    },
    {
      id: "up-bcom-economics",
      name: "Bachelor of Commerce specialising in Economics",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
      },
      careerOpportunities: ["Economists", "analysts", "consultants", "researchers", "traders", "academics"],
    },
    {
      id: "up-bcom-law",
      name: "Bachelor of Commerce specialising in Law",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
      },
      careerOpportunities: ["Attorneys", "legal advisors", "advocates", "prosecutors", "presiding officers", "academics in the legal field"],
    },
    {
      id: "up-bcom-stats",
      name: "Bachelor of Commerce specialising in Statistics and Data Science",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
      },
      careerOpportunities: ["Data scientists", "statistical analysts", "researchers", "consultants", "lecturers"],
    },
    {
      id: "up-bcom-is",
      name: "Bachelor of Commerce specialising in Information Systems",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
      },
      careerOpportunities: ["Managers in IT", "computer software or hardware support", "computer systems analysts", "financial information systems analysts", "business analysts", "information facilitators", "IT training officers", "systems developers", "business systems analysts"],
    },
    {
      id: "up-bcom-agribusiness",
      name: "Bachelor of Commerce specialising in Agribusiness Management",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
      },
      careerOpportunities: ["Banking, finance and insurance", "policy design", "research and consultation", "food processing and manufacturing", "commodity trading", "logistics and supply chain", "business management in agricultural companies"],
    },
    {
      id: "up-bcom-business",
      name: "Bachelor of Commerce specialising in Business Management",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 4,
      },
      careerOpportunities: ["Administration", "finance", "marketing", "human resources management", "teachers", "lecturers", "general managers", "management consultants"],
    },
    {
      id: "up-bcom-supply",
      name: "Bachelor of Commerce specialising in Supply Chain Management",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 4,
      },
      careerOpportunities: ["Supply management", "production and operations management", "warehousing", "transport management", "supply chain strategy"],
    },
    {
      id: "up-bcom-marketing",
      name: "Bachelor of Commerce specialising in Marketing Management",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 4,
      },
      careerOpportunities: ["Product management", "customer service management", "customer relationship management", "strategic marketing", "sales management", "brand management", "advertising management", "media planning", "marketing research management", "promotions management"],
    },
    {
      id: "up-bcom-hr",
      name: "Bachelor of Commerce specialising in Human Resource Management",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 4,
      },
      careerOpportunities: ["Human resources practitioners", "human resources consultants", "mediators", "labour relations specialists", "human resources managers", "personnel managers", "training officers", "liaison officers", "psychometrists", "industrial psychologists"],
    },
    {
      id: "up-bcom-general",
      name: "Bachelor of Commerce",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 4,
      },
      careerOpportunities: ["Flexible career paths across various sectors"],
    },
    {
      id: "up-bcom-4year",
      name: "Bachelor of Commerce (4-year programme)",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
      },
      additionalRequirements: ["Selection programme"],
      careerOpportunities: ["Flexible career paths across various sectors"],
    },

    // Faculty of Education
    {
      id: "up-bed-ece",
      name: "Bachelor of Education in Early Childhood Care and Education",
      faculty: "Faculty of Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
      },
      additionalRequirements: ["Police clearance certificate recommended"],
      careerOpportunities: ["Teachers and training officials at pre-primary or primary schools"],
    },
    {
      id: "up-bed-foundation",
      name: "Bachelor of Education in Foundation Phase Teaching",
      faculty: "Faculty of Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
      },
      additionalRequirements: ["Police clearance certificate recommended"],
      careerOpportunities: ["Teachers and training officials at pre-primary or primary schools"],
    },
    {
      id: "up-bed-intermediate",
      name: "Bachelor of Education in Intermediate Phase Teaching",
      faculty: "Faculty of Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
      },
      additionalRequirements: ["Police clearance certificate recommended"],
      careerOpportunities: ["Teachers and training officials at primary schools"],
    },
    {
      id: "up-bed-senior",
      name: "Bachelor of Education in Senior Phase and Further Education and Training Teaching",
      faculty: "Faculty of Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
      },
      additionalRequirements: ["Police clearance certificate recommended"],
      careerOpportunities: ["Teachers and training officials at primary or secondary schools"],
    },
    {
      id: "up-higher-cert-sports-sciences",
      name: "Higher Certificate in Sports Sciences",
      faculty: "Faculty of Education",
      apsMin: 20,
      duration: "1 year",
      subjectRequirements: {
        "english home language or english first additional language": 4,
      },
      additionalRequirements: ["Selection process based on sports achievements"],
      careerOpportunities: ["Sports coaching and roles in the sports and exercise industry"],
    },
    {
      id: "up-higher-cert-sports-sciences-online",
      name: "Higher Certificate in Sports Sciences (Online)",
      faculty: "Faculty of Education",
      apsMin: 20,
      duration: "2 years",
      subjectRequirements: {
        "english home language or english first additional language": 4,
      },
      additionalRequirements: ["Must have access to schools, sports clubs or training facilities"],
      careerOpportunities: ["Trainers and coaches across various sporting disciplines", "community sports clubs", "school sports programmes"],
    },

    // Faculty of Engineering, Built Environment and Information Technology
    {
      id: "up-beng-chemical",
      name: "Bachelor of Engineering in Chemical Engineering",
      faculty: "Faculty of Engineering, Built Environment and Information Technology",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 6,
        "Physical Sciences": 6,
      },
      careerOpportunities: ["research and development", "plant design", "process control", "operations and management"],
    },
    {
      id: "up-beng-civil",
      name: "Bachelor of Engineering in Civil Engineering",
      faculty: "Faculty of Engineering, Built Environment and Information Technology",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 6,
        "Physical Sciences": 6,
      },
      careerOpportunities: ["design, build and maintain constructions", "financial modelling", "feasibility studies", "management and rehabilitation of large asset portfolios"],
    },
    {
      id: "up-beng-computer",
      name: "Bachelor of Engineering in Computer Engineering",
      faculty: "Faculty of Engineering, Built Environment and Information Technology",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 6,
        "Physical Sciences": 6,
      },
      careerOpportunities: ["computer systems", "software engineering", "networks", "embedded software", "electronics", "automation", "data security", "e-commerce", "pattern recognition", "artificial intelligence"],
    },
    {
      id: "up-beng-electrical",
      name: "Bachelor of Engineering in Electrical Engineering",
      faculty: "Faculty of Engineering, Built Environment and Information Technology",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 6,
        "Physical Sciences": 6,
      },
      careerOpportunities: ["power generation", "storage", "transmission", "distribution", "renewable energy", "electrical installations management"],
    },
    {
      id: "up-beng-electronic",
      name: "Bachelor of Engineering in Electronic Engineering",
      faculty: "Faculty of Engineering, Built Environment and Information Technology",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 6,
        "Physical Sciences": 6,
      },
      careerOpportunities: ["telecommunications", "medical technology", "integrated circuit design", "bioengineering", "military systems", "transport technology", "security systems", "banking", "robotics", "environmental management"],
    },
    {
      id: "up-beng-industrial",
      name: "Bachelor of Engineering in Industrial Engineering",
      faculty: "Faculty of Engineering, Built Environment and Information Technology",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 6,
        "Physical Sciences": 6,
      },
      careerOpportunities: ["design and manage production and service delivery systems", "facility layout", "manufacturing", "inventory control", "supply chain management", "quality management", "cost control", "maintenance", "information systems", "human resources"],
    },
    {
      id: "up-beng-mechanical",
      name: "Bachelor of Engineering in Mechanical Engineering",
      faculty: "Faculty of Engineering, Built Environment and Information Technology",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 6,
        "Physical Sciences": 6,
      },
      careerOpportunities: ["power-generating machines", "product design and manufacturing", "marine and naval architecture", "biomedical engineering", "air-conditioning", "aerospace systems", "vehicle engineering", "energy management"],
    },
    {
      id: "up-beng-metallurgical",
      name: "Bachelor of Engineering in Metallurgical Engineering",
      faculty: "Faculty of Engineering, Built Environment and Information Technology",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 6,
        "Physical Sciences": 6,
      },
      careerOpportunities: ["minerals processing", "extractive metallurgy", "materials engineering", "advanced manufacturing", "failure analysis"],
    },
    {
      id: "up-beng-mining",
      name: "Bachelor of Engineering in Mining Engineering",
      faculty: "Faculty of Engineering, Built Environment and Information Technology",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 6,
        "Physical Sciences": 6,
      },
      careerOpportunities: ["mine management", "technical operations", "financial evaluation and mine design", "mining contracting", "mining research", "equipment design and manufacture", "mining administration"],
    },
    {
      id: "up-beng-5year",
      name: "Bachelor of Engineering [5 years]",
      faculty: "Faculty of Engineering, Built Environment and Information Technology",
      apsMin: 33,
      duration: "5 years",
      subjectRequirements: {
        "english home language or english first additional language": 65,
        "mathematics": 65,
        "physical sciences": 65,
      },
      additionalRequirements: ["Admission determined by Grade 12 results"],
      careerOpportunities: ["Various engineering disciplines"],
    },

    // School for the Built Environment
    {
      id: "up-bsc-architecture",
      name: "Bachelor of Science in Architecture",
      faculty: "School for the Built Environment",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["Will only be considered as first study choice", "Selection includes an interview"],
      careerOpportunities: ["candidate architectural technologists", "candidate senior architectural technologist", "candidate architect"],
    },
    {
      id: "up-bsc-construction",
      name: "Bachelor of Science in Construction Management",
      faculty: "School for the Built Environment",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Accounting", level: 4 },
          ],
        },
      },
      careerOpportunities: ["construction site management", "subcontracting", "property development", "portfolio management", "commercial marketing", "corporate management"],
    },
    {
      id: "up-bsc-real-estate",
      name: "Bachelor of Science in Real Estate",
      faculty: "School for the Built Environment",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Accounting", level: 4 },
          ],
        },
      },
      careerOpportunities: ["property investment", "finance", "facilities management", "property management", "professional property valuers"],
    },
    {
      id: "up-bsc-quantity",
      name: "Bachelor of Science in Quantity Surveying",
      faculty: "School for the Built Environment",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Accounting", level: 4 },
          ],
        },
      },
      careerOpportunities: ["financial and contractual services", "candidate professional quantity surveyors", "property, banking, insurance, mining and manufacturing industries"],
    },
    {
      id: "up-btrp",
      name: "Bachelor of Town and Regional Planning",
      faculty: "School for the Built Environment",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 4,
      },
      careerOpportunities: ["town and regional planners", "development practitioners", "urban managers", "real estate analysts"],
    },

    // School of Information Technology
    {
      id: "up-bis",
      name: "Bachelor of Information Science",
      faculty: "School of Information Technology",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
      },
      additionalRequirements: ["If specialising in Information Systems is selected as a subject at the first-year level, an achievement level of 5 is required in Mathematics."],
      careerOpportunities: ["information and knowledge managers", "information or e-commerce specialists", "consultants on information products and systems", "information brokers", "system specialists"],
    },
    {
      id: "up-bis-publishing",
      name: "Bachelor of Information Science specialising in Publishing",
      faculty: "School of Information Technology",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
      },
      careerOpportunities: ["assisting publishing house managers", "commissioning editors", "production or marketing managers", "market research", "copyright negotiations", "copy-editing", "proofreading", "marketing and promotion", "distribution"],
    },
    {
      id: "up-bis-multimedia",
      name: "Bachelor of Information Science specialising in Multimedia",
      faculty: "School of Information Technology",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 5,
      },
      careerOpportunities: ["programmers", "web designers", "animation specialists", "video editors", "electronic artists"],
    },
    {
      id: "up-bit-is",
      name: "Bachelor of Information Technology in Information Systems",
      faculty: "School of Information Technology",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
      },
      careerOpportunities: ["Data scientists", "IT auditors", "IT entrepreneurs", "IT tax specialists", "e-business consultants", "programmers", "business analysts", "project managers", "CIOs", "CTOs", "knowledge managers"],
    },
    {
      id: "up-bsc-cs",
      name: "Bachelor of Science in Computer Science",
      faculty: "School of Information Technology",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 6,
      },
      careerOpportunities: ["Programmers", "systems analysts", "systems architects", "consultants", "database administrators", "network analysts", "researchers"],
    },
    {
      id: "up-bsc-it-iks",
      name: "Bachelor of Science in Information Technology in Information and Knowledge Systems",
      faculty: "School of Information Technology",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 6,
      },
      careerOpportunities: ["data science", "genetics", "geographical information systems", "IT and enterprises", "IT and law", "IT and music", "software development"],
    },

    // School of Dentistry
    {
      id: "up-bds",
      name: "Bachelor of Dental Surgery",
      faculty: "School of Dentistry",
      apsMin: 35,
      duration: "5 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 6,
        "Physical Sciences": 5,
      },
      additionalRequirements: ["Selection is based on a candidates’ final Grade 11 examination results"],
      careerOpportunities: ["Dentists", "specialists", "academics", "researchers"],
    },
    {
      id: "up-boh",
      name: "Bachelor of Oral Hygiene",
      faculty: "School of Dentistry",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["Selection is based on a candidates’ final Grade 11 examination results"],
      careerOpportunities: ["Oral hygienists"],
    },

    // School of Healthcare Sciences
    {
      id: "up-bdiet",
      name: "Bachelor of Dietetics",
      faculty: "School of Healthcare Sciences",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["Selection is based on a candidates’ final Grade 11 examination results"],
      careerOpportunities: ["Dieticians", "academics", "researchers"],
    },
    {
      id: "up-bnurs",
      name: "Bachelor of Nursing Science",
      faculty: "School of Healthcare Sciences",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Life Sciences": 4,
      },
      additionalRequirements: ["Selection is based on a candidates’ final Grade 11 examination results"],
      careerOpportunities: ["General nursing", "midwifery"],
    },
    {
      id: "up-bot",
      name: "Bachelor of Occupational Therapy",
      faculty: "School of Healthcare Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["Selection is based on a candidates’ final Grade 11 examination results"],
      careerOpportunities: ["Occupational therapists", "academics", "researchers"],
    },
    {
      id: "up-bphysio",
      name: "Bachelor of Physiotherapy",
      faculty: "School of Healthcare Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["Selection is based on a candidates’ final Grade 11 examination results"],
      careerOpportunities: ["Physiotherapists", "academics", "researchers"],
    },
    {
      id: "up-brad",
      name: "Bachelor of Radiography in Diagnostics",
      faculty: "School of Healthcare Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["Selection is based on a candidates’ final Grade 11 examination results"],
      careerOpportunities: ["Radiographers", "academics", "researchers"],
    },

    // School of Medicine
    {
      id: "up-bcmp",
      name: "Bachelor of Clinical Medical Practice",
      faculty: "School of Medicine",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 4 },
            { subject: "Life Sciences", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Selection is based on a candidates’ final Grade 11 examination results and the Biographical Information Form"],
      careerOpportunities: ["Clinical associates", "academics", "researchers"],
    },
    {
      id: "up-b-medicine-surgery",
      name: "Bachelor of Medicine and Surgery",
      faculty: "School of Medicine",
      apsMin: 35,
      duration: "6 years",
      subjectRequirements: {
        "english home language or english first additional language": 5,
        "mathematics": 6,
        "physical sciences": 5,
      },
      additionalRequirements: ["Selection is based on a candidates’ final Grade 11 examination results"],
      careerOpportunities: ["General medical practitioners", "specialists"],
    },
    {
      id: "up-bsports",
      name: "Bachelor of Sports Science",
      faculty: "School of Medicine",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 4 },
            { subject: "Life Sciences", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Selection is based on a candidates’ final Grade 11 examination results"],
      careerOpportunities: ["Sports scientists", "biokineticists", "personal trainers", "strength and conditioning specialists", "fitness instructors", "exercise scientists", "gym managers/owners", "academics", "researchers"],
    },

    // Faculty of Humanities
    {
      id: "up-ba-slp",
      name: "Bachelor of Arts in Speech-Language Pathology",
      faculty: "Faculty of Humanities",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 4,
      },
      additionalRequirements: ["Selection is based on academic achievement", "Only 50 students admitted"],
      careerOpportunities: ["education and special education", "hospitals", "clinics", "rural communities", "private practices", "government", "military", "academic institutions"],
    },
    {
      id: "up-ba-audiology",
      name: "Bachelor of Arts in Audiology",
      faculty: "Faculty of Humanities",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 4,
      },
      additionalRequirements: ["Selection is based on academic achievement", "Only 50 students admitted"],
      careerOpportunities: ["Diagnostic audiometry", "rehabilitative audiology", "education", "special education", "private and public hospitals and clinics", "private practice", "military", "community"],
    },
    {
      id: "up-ba-info-design",
      name: "Bachelor of Arts in Information Design",
      faculty: "Faculty of Humanities",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
      },
      additionalRequirements: ["Submit an online portfolio to the Information Design division by 30 June"],
      careerOpportunities: ["Animators", "Graphic designers", "Illustrators", "Art directors", "Typographers"],
    },
    {
      id: "up-ba",
      name: "Bachelor of Arts",
      faculty: "Faculty of Humanities",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
      },
      careerOpportunities: ["Community engagement and development", "Counselling", "Cultural studies", "Diplomacy and politics", "Education", "Governance", "Heritage conservation", "Journalism", "Language services", "Media studies", "Policy analysis", "Psychology", "Societal analysis", "Work and organisational studies"],
    },
    {
      id: "up-bsw",
      name: "Bachelor of Social Work",
      faculty: "Faculty of Humanities",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
      },
      additionalRequirements: ["Departmental selection at the end of first year", "Aptitude test and interview", "Complete Form 30 in Part B of the National Child Protection Register (NCPR)"],
      careerOpportunities: ["Social worker"],
    },
    {
      id: "up-ba-law",
      name: "Bachelor of Arts specialising in Law",
      faculty: "Faculty of Humanities",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
      },
      careerOpportunities: ["Lawyer"],
    },
    {
      id: "up-ba-languages",
      name: "Bachelor of Arts specialising in Languages",
      faculty: "Faculty of Humanities",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
      },
      careerOpportunities: ["Advertising", "Media", "Copywriting", "Editing", "Language teaching", "Lexicography", "Technical writing", "Public relations", "Translation", "Publishing", "Diplomacy", "Tourism"],
    },
    {
      id: "up-bss-industrial",
      name: "Bachelor of Social Science specialising in Industrial Sociology and Labour Studies",
      faculty: "Faculty of Humanities",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
      },
      careerOpportunities: ["Labour relations practice", "Arbitration", "Conflict management and resolution", "Labour administration and research", "Gender issues and dismissals", "Government institutions", "Parastatals", "Private sector", "Trade union organisations"],
    },
    {
      id: "up-bss-heritage",
      name: "Bachelor of Social Science in Heritage and Cultural Sciences",
      faculty: "Faculty of Humanities",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
      },
      careerOpportunities: ["Travel", "Tourism", "Tourist guides", "Management", "Hospitality", "Marketing", "Journalism", "Government", "Education", "Museum and heritage fields"],
    },
    {
      id: "up-b-music-4yr",
      name: "Bachelor of Music",
      faculty: "Faculty of Humanities",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "english home language or english first additional language": 5,
        "music": {
          alternatives: [
            { subject: "music grade vii practical and grade v theory", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Practical audition", "Theoretical test passed with 60%"],
      careerOpportunities: ["Music teachers", "Music technicians", "Solo and/or chamber music performers", "Orchestral musicians", "Composers"],
    },
    {
      id: "up-b-drama-3yr",
      name: "Bachelor of Drama",
      faculty: "Faculty of Humanities",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "english home language or english first additional language": 5,
      },
      careerOpportunities: ["Actors", "Physical theatre artists", "Theatre critics", "Radio and television presenters", "Directors", "Educational theatre practitioners", "Light and sound operators", "Voice artists", "Stage managers", "Performing arts administrators", "Documentary film-makers", "Digital media creators", "Playwrights", "Scriptwriters", "Researchers"],
    },
    {
      id: "up-ba-ppe",
      name: "Bachelor of Arts specialising in Philosophy, Politics and Economics",
      faculty: "Faculty of Humanities",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
      },
      careerOpportunities: ["Economic or political policy-making", "Journalism", "Diplomatic service"],
    },
    {
      id: "up-bps-international",
      name: "Bachelor of Political Science specialising in International Studies",
      faculty: "Faculty of Humanities",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
      },
      careerOpportunities: ["International relations", "Diplomatic service", "Political consultation", "Conflict resolution", "Policy analysis", "Strategic intelligence", "Governance", "International political economics", "Risk analysis"],
    },
    {
      id: "up-bps-political",
      name: "Bachelor of Political Science specialising in Political Studies",
      faculty: "Faculty of Humanities",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
      },
      careerOpportunities: ["Policy analysis and consultation", "Political analysis and communication", "Governance", "Conflict resolution", "Strategic intelligence", "Political development and mobilisation", "Risk analysis"],
    },
    {
      id: "up-ba-fine-arts-4yr",
      name: "Bachelor of Arts in Fine Arts",
      faculty: "Faculty of Humanities",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "english home language or english first additional language": 5,
      },
      additionalRequirements: ["A4 portfolio", "UP competency test (Conceptualisation, Drawing, Interview)"],
      careerOpportunities: ["Gallery managers", "Art facilitators", "Art consultants/advisors", "Art educators", "Artists in the fine arts", "Artists in new media", "Artists in applied arts"],
    },
    {
      id: "up-ba-visual",
      name: "Bachelor of Arts specialising in Visual Studies",
      faculty: "Faculty of Humanities",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
      },
      careerOpportunities: ["Art and film critics", "Visual culture specialists", "Art and culture educators", "Academics", "Art historians", "Curators", "Visual analysts", "Visual consultants", "Media and communication analysts", "Social media coordinators", "Gallery managers"],
    },

    // Faculty of Law
    {
      id: "up-llb",
      name: "Bachelor of Laws",
      faculty: "Faculty of Law",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        "english home language or english first additional language": 6,
      },
      careerOpportunities: ["Attorneys", "Legal advisors", "Advocates", "Prosecutors", "Presiding officers", "Academics"],
    },

    // Faculty of Theology and Religion
    {
      id: "up-bth",
      name: "Bachelor of Theology",
      faculty: "Faculty of Theology and Religion",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
      },
      careerOpportunities: ["Ministers", "Pastors", "Priests", "Preachers", "Missionaries", "Youth counsellors", "Ethics consultants"],
    },
    {
      id: "up-bdiv",
      name: "Bachelor of Divinity",
      faculty: "Faculty of Theology and Religion",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
      },
      careerOpportunities: ["Ministers", "Pastors", "Priests", "Preachers", "Missionaries", "Youth counsellors", "Ethics consultants"],
    },
    {
      id: "up-dip-theology",
      name: "Diploma in Theology",
      faculty: "Faculty of Theology and Religion",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "English": 3,
      },
      careerOpportunities: ["Ministers", "Pastors", "Priests", "Lay preachers", "Missionaries", "Youth counsellors"],
    },

    // Faculty of Natural and Agricultural Sciences
    {
      id: "up-bsc-agric-agri-econ",
      name: "Bachelor of Science in Agriculture in Agricultural Economics and Agribusiness Management",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        "english home language or english first additional language": 5,
        "mathematics": 5,
        "physical sciences": 5,
      },
      careerOpportunities: ["Agricultural economists", "Government", "Commercial banks", "Multinational agribusiness companies", "Farmer cooperatives", "Commodity trading houses", "Food processors and manufacturers", "Research councils"],
    },
    {
      id: "up-bsc-agric-animal",
      name: "Bachelor of Science in Agriculture in Animal Science",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["Research and development", "Commercial farming", "Public sector", "Livestock and feed industries", "Nutrition and breeding consulting", "Technical and managerial positions", "Policy and advisory roles"],
    },
    {
      id: "up-bsc-agric-plant",
      name: "Bachelor of Science in Agriculture in Applied Plant and Soil Sciences",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["Teachers and lecturers", "Researchers and managers", "Public sector roles", "Private sector (seed, fertiliser, plant protection)", "Extension services", "Entrepreneurial"],
    },
    {
      id: "up-bsc-agric-pathology",
      name: "Bachelor of Science in Agriculture in Plant Pathology",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["education and training", "plant pathologists", "research and management", "extension services", "consultants"],
    },
    {
      id: "up-bsc-food-management-culinary",
      name: "Bachelor of Science in Food Management Option: Culinary Science",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        "english home language or english first additional language": 5,
        "mathematics": 5,
        "physical sciences": 5,
      },
      careerOpportunities: ["culinary scientists", "culinologists", "sensory analysts", "food researchers", "food product developers", "food safety and quality assurance managers", "food service managers"],
    },
    {
      id: "up-bsc-food-management-nutritional",
      name: "Bachelor of Science in Food Management Option: Nutritional Science",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        "english home language or english first additional language": 5,
        "mathematics": 5,
        "physical sciences": 5,
      },
      careerOpportunities: ["food or related industries", "pharmaceutical and food manufacturing", "government departments", "international organisations", "NGOs", "research organisations", "project managers and advisors"],
    },
    {
      id: "up-bsc-food-science",
      name: "Bachelor of Science in Food Science",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["food risk investigators", "quality and safety assurance managers", "food chemists", "food microbiologists and biotechnologists", "packaging and shelf-life specialists", "safety auditors", "product and process development managers", "technical sales and marketing advisors", "sensory scientists", "food bio-scientists"],
    },
    {
      id: "up-bsc-biochemistry",
      name: "Bachelor of Science in Biochemistry",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["food, pharmaceutical, fine chemical and waste-processing industries", "research councils", "academic institutions", "forensic and pathology laboratories", "researcher", "teacher", "lecturer", "medical representative"],
    },
    {
      id: "up-bsc-biotechnology",
      name: "Bachelor of Science in Biotechnology",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["laboratory-based researchers", "bio-entrepreneurs", "patent law", "pharmaceutical sales and marketing", "project management", "computer programming", "science journalism"],
    },
    {
      id: "up-bsc-ecology",
      name: "Bachelor of Science in Ecology",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["conservation organisations", "companies using natural resources", "environmental consultancies", "education initiatives", "academic institutions and research"],
    },
    {
      id: "up-bsc-entomology",
      name: "Bachelor of Science in Entomology",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["insect management specialists", "researchers in agriculture", "nature reserves", "environmental consultancies", "conservation planning agencies", "medical and veterinary research", "education", "museums", "invasive species management", "quarantine and inspection services", "biotechnology", "IT", "corporate sector"],
    },
    {
      id: "up-bsc-genetics",
      name: "Bachelor of Science in Genetics",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["molecular biologists", "medical or clinical geneticists", "cytogeneticists", "biotechnologists", "agricultural scientists", "molecular ecologists", "forensic scientists", "genetic counsellors", "bioinformaticists", "computational analysts", "veterinary scientists", "teachers", "lecturers"],
    },
    {
      id: "up-bsc-human-genetics",
      name: "Bachelor of Science in Human Genetics",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["molecular biologists", "medical or clinical geneticists", "cytogeneticists", "biotechnologists", "agricultural scientists", "molecular ecologists", "forensic scientists", "genetic counsellors", "bioinformaticists", "computational analysts", "veterinary scientists", "teachers", "lecturers"],
    },
    {
      id: "up-bsc-human-physiology",
      name: "Bachelor of Science in Human Physiology",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["research roles", "medical teams", "private and government laboratories", "pharmaceutical companies", "universities", "veterinary or industrial institutions", "teaching", "sports physiology", "biostatistics", "bioengineering", "biotechnology", "microbiology", "virology", "industrial hygiene", "scientific journalism", "medical technology", "pharmaceutical sales"],
    },
    {
      id: "up-bsc-human-physiology-gp",
      name: "Bachelor of Science in Human Physiology, Genetics and Psychology",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["research roles", "medical teams", "private and government laboratories", "pharmaceutical companies", "universities", "veterinary or industrial institutions", "teaching", "sports physiology", "biostatistics", "bioengineering", "biotechnology", "microbiology", "virology", "industrial hygiene", "scientific journalism", "medical technology", "pharmaceutical sales"],
    },
    {
      id: "up-bsc-medical-sciences",
      name: "Bachelor of Science in Medical Sciences",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["research in anatomy subdisciplines", "academia", "forensic science", "health science industry", "sports sciences", "virology", "chemical pathology", "immunology", "health administration", "ergonomics"],
    },
    {
      id: "up-bsc-microbiology",
      name: "Bachelor of Science in Microbiology",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["food, dairy, beer, wine, baker’s yeast and fermentation industries", "mining for corrosion control", "medical and veterinary microbiology", "microbial genomics and ecology", "research and teaching"],
    },
    {
      id: "up-bsc-plant-science",
      name: "Bachelor of Science in Plant Science",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["biotechnology and pharmaceutical firms", "SANParks", "private ecological companies", "research institutions"],
    },
    {
      id: "up-bsc-zoology",
      name: "Bachelor of Science in Zoology",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["public and private nature conservancies", "environmental consultancies", "conservation agencies", "medical and veterinary research", "biotechnology", "education", "data management", "corporate sector"],
    },
    {
      id: "up-bcs-clothing",
      name: "Bachelor of Consumer Science specialising in Clothing Retail Management",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 4,
      },
      careerOpportunities: ["retail management", "brand managers", "clothing buyers and planners", "fashion designers", "fashion marketers", "fashion product developers", "quality controllers and assurance managers", "store managers", "image consultants", "textile technologists", "visual merchandisers", "pattern technologists", "entrepreneurs"],
    },
    {
      id: "up-bcs-food",
      name: "Bachelor of Consumer Science specialising in Food Management",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 4,
      },
      careerOpportunities: ["brand managers", "sales people", "store managers", "food stylists", "quality assurance officers", "consumer insight specialists", "entrepreneurs"],
    },
    {
      id: "up-bsc-actuarial",
      name: "Bachelor of Science in Actuarial and Financial Mathematics",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 36,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 7,
      },
      careerOpportunities: ["banks", "insurance companies", "investment institutions", "brokerage firms", "actuaries", "actuarial technicians", "financial engineers"],
    },
    {
      id: "up-bsc-mathematics",
      name: "Bachelor of Science in Mathematics",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 6,
      },
      careerOpportunities: ["research institutions", "education", "government", "medical institutions", "engineering", "finance", "computer industry"],
    },
    {
      id: "up-bsc-applied-math",
      name: "Bachelor of Science in Applied Mathematics",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 6,
      },
      careerOpportunities: ["research institutions", "education", "government", "medical institutions", "engineering", "finance", "computer industry"],
    },
    {
      id: "up-bsc-math-stats",
      name: "Bachelor of Science in Mathematical Statistics",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 6,
      },
      careerOpportunities: ["data scientist", "data analyst", "financial analyst", "financial risk analyst", "geospatial information analyst", "biostatistician", "statistical software engineer"],
    },
    {
      id: "up-bsc-chemistry",
      name: "Bachelor of Science in Chemistry",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["laboratories", "industrial, research and academic institutions", "education", "journalism", "environmental protection", "food and beverages", "energy", "water", "health", "sports", "pharmaceuticals", "cosmetics", "geology", "mining", "law enforcement"],
    },
    {
      id: "up-bsc-env-geology",
      name: "Bachelor of Science in Environmental and Engineering Geology",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["engineering and environmental geologists", "hydrogeologist"],
    },
    {
      id: "up-bsc-geography-environmental-science",
      name: "Bachelor of Science in Geography Option: Geography and Environmental Science",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "english home language or english first additional language": 5,
        "mathematics": 5,
        "physical sciences": 5,
      },
      careerOpportunities: ["teaching", "research", "environmental management", "urban and regional development", "environmental health", "biodiversity conservation", "consultancy"],
    },
    {
      id: "up-bsc-geoinformatics",
      name: "Bachelor of Science in Geoinformatics",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
      additionalRequirements: ["South African Geomatics Council endorsement"],
      careerOpportunities: ["geospatial companies", "satellite and GIS consulting firms", "government agencies", "local municipalities", "civil engineering", "tourism", "environmental conservation", "mining", "agriculture", "retail", "utilities", "banking", "food industry"],
    },
    {
      id: "up-bsc-geology",
      name: "Bachelor of Science in Geology",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["international mining companies", "CSIR", "MINTEK", "government departments", "museums", "engineering firms", "consulting companies", "laboratory specialists", "environmental and engineering geologists", "hydrogeologists"],
    },
    {
      id: "up-bsc-meteorology",
      name: "Bachelor of Science in Meteorology",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["South African Weather Service", "CSIR", "universities", "agricultural institutions", "municipalities", "private industries", "weather forecasting", "climate research", "air quality monitoring", "atmospheric models", "consultants", "academic researchers", "television presenters"],
    },
    {
      id: "up-bsc-physics",
      name: "Bachelor of Science in Physics",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["university academics", "researchers", "industry", "science advisory roles", "renewable energy development", "radiation scientists", "medical scientists", "biophysicists", "climatologists", "geophysicists", "computational scientists", "innovators", "entrepreneurs"],
    },

    // Faculty of Veterinary Science
    {
      id: "up-bvsc",
      name: "Bachelor of Veterinary Science",
      faculty: "Faculty of Veterinary Science",
      apsMin: 35,
      duration: "6 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
      additionalRequirements: ["Interviews or additional tests may be required", "Selection based on merit", "Only Mathematics considered (no Mathematical Literacy or Technical Mathematics)"],
      careerOpportunities: ["Private practice (small animals, farm animals, equine and wildlife)", "State veterinary services", "Diagnostic laboratories", "Veterinary public health", "Technical services", "Research and product development", "Consultancy", "Laboratory animal management", "Wildlife management", "Poultry and pig production", "Animal welfare", "Research and academia"],
    },
    {
      id: "up-bvet-nursing",
      name: "Bachelor of Veterinary Nursing",
      faculty: "Faculty of Veterinary Science",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 4 },
            { subject: "Life Sciences", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Interviews or additional tests may be required", "Selection based on merit", "Only Mathematics considered (no Mathematical Literacy or Technical Mathematics)"],
      careerOpportunities: ["Veterinary clinics and hospitals", "Specialist veterinary facilities", "Pharmaceutical industry", "Animal food industry", "Animal welfare societies", "Zoological gardens", "Game parks", "Laboratory animal units", "Rehabilitation centres", "Research centres", "Animal boarding establishments", "Organised agriculture", "Dairies", "Farming operations"],
    },

    // Economic and Management Sciences
    {
      id: "up-badmin-public",
      name: "Bachelor of Administration specialising in Public Administration",
      faculty: "Economic and Management Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
      },
    },

    // Education
    {
      id: "up-hcss-1year",
      name: "Higher Certificate in Sports Sciences (1 year)",
      faculty: "Education",
      apsMin: 20,
      duration: "1 year",
      subjectRequirements: {
        "English": 4,
      },
    },
    {
      id: "up-hcss-2year",
      name: "Higher Certificate in Sports Sciences (2 years online)",
      faculty: "Education",
      apsMin: 20,
      duration: "2 years",
      subjectRequirements: {
        "English": 4,
      },
    },

    // Engineering, Built Environment and Information Technology
    // Health Sciences
    {
      id: "up-mbchb",
      name: "Bachelor of Medicine and Surgery (MBChB)",
      faculty: "Health Sciences",
      apsMin: 35,
      duration: "6 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 6,
        "Physical Sciences": 5,
      },
    },

    // Humanities
    {
      id: "up-bmus-4year",
      name: "Bachelor of Music (4 years)",
      faculty: "Humanities",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
      },
    },
    {
      id: "up-bmus-5year",
      name: "Bachelor of Music (5 years)",
      faculty: "Humanities",
      apsMin: 26,
      duration: "5 years",
      subjectRequirements: {
        "English": 4,
      },
    },
    {
      id: "up-bdrama-3year",
      name: "Bachelor of Drama (3 years)",
      faculty: "Humanities",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
      },
    },
    {
      id: "up-bdrama-4year",
      name: "Bachelor of Drama (4 years)",
      faculty: "Humanities",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
      },
    },
    {
      id: "up-bfa-4year",
      name: "Bachelor of Arts in Fine Arts (4 years)",
      faculty: "Humanities",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
      },
    },
    {
      id: "up-bfa-5year",
      name: "Bachelor of Arts in Fine Arts (5 years)",
      faculty: "Humanities",
      apsMin: 26,
      duration: "5 years",
      subjectRequirements: {
        "English": 4,
      },
    },

    // Law
    // Natural and Agricultural Sciences
    {
      id: "up-bsc-agric-econ",
      name: "Bachelor of Science in Agriculture in Agricultural Economics in Agribusiness Management",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "up-bsc-food-culinary",
      name: "Bachelor of Science in Food Management (Culinary Science)",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "up-bsc-food-nutrition",
      name: "Bachelor of Science in Food Management (Nutritional Science)",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "up-bsc-geography",
      name: "Bachelor of Science in Geography (Geography and Environmental Science)",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "up-bsc-math-extended",
      name: "Bachelor of Science in Mathematics (4-year extended)",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 6,
      },
    },
  ];

  /**
   * UP-specific APS calculation
   * Uses  standard South African APS system
   * - Best 6 subjects excluding Life Orientation
   * - Standard 7-point NSC scale
   */
  calculateApsScore(subjects: Record<string, number>): number {
    const subjectScores: number[] = [];

    for (const [subjectName, percentage] of Object.entries(subjects)) {
      // Skip Life Orientation
      if (subjectName.toLowerCase().includes("life orientation")) {
        continue;
      }

      // Standard 7-point scale
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

    // Sort descending and take top 6 subjects
    subjectScores.sort((a, b) => b - a);
    const top6 = subjectScores.slice(0, 6);

    return top6.reduce((sum, score) => sum + score, 0);
  }
}
