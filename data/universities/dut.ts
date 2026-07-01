import { BaseUniversity } from "./base-university";
import type { Course } from "@/lib/types";
import { percentageToLevel } from "@/lib/aps/utils";

/**
 * Durban University of Technology (DUT) class
 */
export class DUT extends BaseUniversity {
  readonly id = "dut";
  readonly name = "Durban University of Technology";
  readonly shortName = "DUT";
  readonly website = "https://www.dut.ac.za";
  readonly logo = "/logos/dut.png";
  readonly location = {
    city: "Durban",
    province: "KwaZulu-Natal",
    coordinates: {
      latitude: -29.8536,
      longitude: 31.0066,
    },
  };

  /**
   * Calculate APS score based on DUT's requirements
   * DUT uses NSC points system where each subject level contributes to the total
   */
  calculateApsScore(subjects: Record<string, number>): number {
    // DUT APS: best 6 subjects (excl. LO) on NSC 1-7 level scale
    return Object.entries(subjects)
      .filter(([name]) => name.toLowerCase() !== "life orientation")
      .map(([, pct]) => percentageToLevel(pct))
      .sort((a, b) => b - a)
      .slice(0, 6)
      .reduce((sum, level) => sum + level, 0);
  }

  protected readonly _courses: Course[] = [
    // Faculty of Accounting and Informatics
    {
      id: "dut-accounting-bridging-course",
      name: "Accounting Bridging Course",
      faculty: "Faculty of Accounting and Informatics",
      apsMin: 20,
      duration: "1 year",
      subjectRequirements: {
        "english": 3,
        "accounting": {
          alternatives: [
            { subject: "accounting", level: 3 },
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["NSC Diploma Entry required", "Not NSFAS funded"],
    },
    {
      id: "dut-bachelor-ict",
      name: "Bachelor of Information and Communication Technology (BICT)",
      faculty: "Faculty of Accounting and Informatics",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": 4,
      },
    },
    {
      id: "dut-bachelor-ict-iot",
      name: "Bachelor of Information and Communication Technology: Internet of Things (IoT)",
      faculty: "Faculty of Accounting and Informatics",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": 4,
        "physical sciences or information technology": 4,
      },
    },
    {
      id: "dut-dip-accounting",
      name: "Diploma in Accounting",
      faculty: "Faculty of Accounting and Informatics",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 3 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Math": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
        "Accounting": 4,
      },
      additionalRequirements: ["May include an interview"],
      careerOpportunities: ["Accounting Technician", "Bookkeeper", "Accounts Clerk", "Assistant Financial Accountant", "Financial Accountant"],
    },
    {
      id: "dut-diploma-business-information-management",
      name: "Diploma in Business and Information Management",
      faculty: "Faculty of Accounting and Informatics",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english or english 1st additional": {
          alternatives: [
            { subject: "english", level: 3 },
            { subject: "english first additional language", level: 4 },
          ],
        },
        "mathematics or mathematical literacy": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["4 months of Work Integrated Learning in third year"],
    },
    {
      id: "dut-diploma-ict-applications-development",
      name: "Diploma in Information and Communications Technology: Applications Development",
      faculty: "Faculty of Accounting and Informatics",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 3,
        "english first additional language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 6 },
          ],
        },
      },
      additionalRequirements: ["Selection based on ranking system"],
      careerOpportunities: ["Software Developer", "Web Developer", "Systems Analyst"],
    },
    {
      id: "dut-diploma-ict-applications-development-4yr",
      name: "Diploma in Information and Communications Technology: Applications Development (4-year Extended Curriculum Programme)",
      faculty: "Faculty of Accounting and Informatics",
      apsMin: 20,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 3,
        "english first additional language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 6 },
          ],
        },
      },
      additionalRequirements: ["Selection based on ranking system"],
      careerOpportunities: ["Software Developer", "Web Developer", "Systems Analyst"],
    },
    {
      id: "dut-diploma-ict-business-analysis",
      name: "Diploma in Information and Communications Technology: Business Analysis",
      faculty: "Faculty of Accounting and Informatics",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 3,
        "english first additional language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 6 },
          ],
        },
      },
      additionalRequirements: ["Selection based on academic merit and/or work experience"],
      careerOpportunities: ["Business Analyst", "ICT Consultant"],
    },
    {
      id: "dut-dip-internal-auditing",
      name: "Diploma in Internal Auditing",
      faculty: "Faculty of Accounting and Informatics",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 3 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Math": {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
        "Accounting": 4,
      },
      additionalRequirements: ["Interview may be required", "Ranking system based on combined score"],
      careerOpportunities: ["Internal Auditor"],
    },
    {
      id: "dut-diploma-library-information-studies",
      name: "Diploma in Library and Information Studies",
      faculty: "Faculty of Accounting and Informatics",
      apsMin: 20,
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
      additionalRequirements: ["English test", "Aptitude test", "One-on-one interview"],
      careerOpportunities: ["Library and Information Professional", "Information Specialist"],
    },
    {
      id: "dut-dip-management-accounting",
      name: "Diploma in Management Accounting",
      faculty: "Faculty of Accounting and Informatics",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 3 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Math": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
        "Accounting": 4,
      },
      additionalRequirements: ["None"],
      careerOpportunities: ["Cost Clerk", "Assistant Financial Accountant", "Management Accountant", "Budget Officer", "Finance Officer"],
    },
    {
      id: "dut-diploma-taxation",
      name: "Diploma in Taxation",
      faculty: "Faculty of Accounting and Informatics",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "english": {
          alternatives: [
            { subject: "english home language", level: 3 },
            { subject: "english first additional language", level: 4 },
          ],
        },
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
        "accounting": 4,
      },
      additionalRequirements: ["Selection based on merit", "Interview may be required"],
      careerOpportunities: ["Tax practitioners", "Financial department employees"],
    },
    // Faculty of Applied Sciences
    {
      id: "dut-bachelor-biotechnology",
      name: "Bachelor of Applied Science in Biotechnology",
      faculty: "Faculty of Applied Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Life Sciences": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["Selection based on availability of places and academic results"],
      careerOpportunities: ["Drug and pharmaceutical research", "Public funded laboratories", "Chemicals", "Environmental control", "Water and waste management", "Energy", "Food processing", "Bioprocessing industries"],
    },
    {
      id: "dut-bachelor-food-science",
      name: "Bachelor of Applied Science in Food Science and Technology",
      faculty: "Faculty of Applied Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Life Sciences": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["Selection based on availability of places and academic results"],
      careerOpportunities: ["Quality inspectors", "Laboratory analysts", "Researchers", "Product development scientists", "Packaging scientists", "Auditors of food factories and suppliers"],
    },
    {
      id: "dut-bachelor-applied-science-industrial-chemistry",
      name: "Bachelor of Applied Science in Industrial Chemistry",
      faculty: "Faculty of Applied Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": 4,
        "physical sciences": 4,
      },
      additionalRequirements: ["Selection based on availability of places and academic results"],
      careerOpportunities: ["Laboratory or production process", "Chemical and laboratory sales", "Detergent, petroleum, plastics, food, pharmaceutical, mining, water treatment, and metallurgy industries", "Quality control and testing", "Research and development"],
    },
    {
      id: "dut-dip-consumer-sciences",
      name: "Diploma in Consumer Sciences in Food and Nutrition",
      faculty: "Faculty of Applied Sciences",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 3 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Math": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Pass suitability and selection tests", "Hepatitis vaccination", "Prescribed chef’s uniform and equipment kit"],
      careerOpportunities: ["Customer development consultant in sales", "Product development", "Recipe development", "Fresh produce development technology", "Innovation chefs", "Consumer affairs consultant", "Food safety and quality assurance", "Food Production Managers", "Food buying", "Food product management", "Delicatessen management", "Fresh product development", "Brand development", "Fresh Food, Delicatessen and Bakery Managers", "Food Service Supervisor", "Food Service managers", "Cookery assistant", "Assistant food journalist"],
    },
    {
      id: "dut-diploma-sustainable-horticulture-landscaping",
      name: "Diploma in Sustainable Horticulture and Landscaping",
      faculty: "Faculty of Applied Sciences",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
        "life sciences": 4,
      },
      additionalRequirements: ["Preference given to applicants with practical experience"],
      careerOpportunities: ["Greenhouses", "Nurseries", "Garden Centres", "Golf courses", "Municipal parks departments", "Government departments", "Orchards", "Floral design shops", "Grounds maintenance operations", "Vegetable and fruit production and marketing", "Self-employment", "Wholesale or retail trade", "Researchers", "Grounds superintendents", "Green Keepers"],
    },

    // Faculty of Management Sciences
    {
      id: "dut-bachelor-sport-science-management",
      name: "Bachelor of Sport Science and Management",
      faculty: "Faculty of Management Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": 4,
        "physical science or life science or sports science": 4,
      },
      careerOpportunities: ["Exercise and Conditioning", "Anatomy and Kinesiology", "High Performance Testing and Program Design", "Sports Coaching", "Sport Marketing and Management", "Sport Science Research"],
    },
    {
      id: "dut-diploma-management-sciences-business-law",
      name: "Diploma in Management Sciences: Business Law",
      faculty: "Faculty of Management Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "english home language": {
          alternatives: [
            { subject: "english home language", level: 3 },
            { subject: "english first additional language", level: 4 },
          ],
        },
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["NSC Diploma Entry", "Ranking system applied if applications exceed places"],
      careerOpportunities: ["Compliance officers/managers", "Contract officers/managers", "Business roles requiring legal knowledge"],
    },
    {
      id: "dut-diploma-management-sciences-human-resources-management",
      name: "Diploma in Management Sciences: Human Resources Management",
      faculty: "Faculty of Management Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "english home language": {
          alternatives: [
            { subject: "english home language", level: 3 },
            { subject: "english first additional language", level: 4 },
          ],
        },
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["NSC Diploma Entry", "Ranking system applied if applications exceed places"],
      careerOpportunities: ["Personnel Officer", "Human Resources Manager", "Training specialist", "Industrial relations specialist"],
    },
    {
      id: "dut-dip-management-marketing",
      name: "Diploma in Management Sciences: Marketing",
      faculty: "Faculty of Management Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 3 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Math": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["NSC Diploma Entry", "Ranking system applied if applications exceed places"],
      careerOpportunities: ["Marketing Manager", "Sales Manager", "Sales Consultant", "Advertising Manager", "Researcher"],
    },
    {
      id: "dut-diploma-management-sciences-operations-management",
      name: "Diploma in Management Sciences: Operations Management",
      faculty: "Faculty of Management Sciences",
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
      additionalRequirements: ["Experiential training is compulsory", "Ranking system applied if applications exceed capacity"],
      careerOpportunities: ["trainee production/operations manager", "work-study officer", "quality controller", "customer services", "materials manager", "production foreman/superintendent", "quality consultant"],
    },
    {
      id: "dut-diploma-management-sciences-public-relations-communication-management",
      name: "Diploma in Management Sciences: Public Relations and Communication Management",
      faculty: "Faculty of Management Sciences",
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
      additionalRequirements: ["Work-based learning included", "Must rank programme as choice 1, 2 or 3"],
      careerOpportunities: ["Public Relations Practitioner", "Media Officer", "Events Manager", "Communication Officer", "Promotions Officer", "Strategist", "Fund Raiser", "Social Media Strategist", "Digital Account Manager", "Brand Manager", "Copywriter", "Corporate Communications"],
    },
    {
      id: "dut-diploma-management-sciences-retail-management",
      name: "Diploma in Management Sciences: Retail Management",
      faculty: "Faculty of Management Sciences",
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
      additionalRequirements: ["Ranking system applied if applications exceed capacity"],
      careerOpportunities: ["store operations", "finance and administration", "buying and planning", "logistics", "human resources", "marketing", "IT"],
    },
    {
      id: "dut-diploma-public-administration",
      name: "Diploma in Public Administration",
      faculty: "Faculty of Management Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "english": 3,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Specialisations available in Disaster & Risk Management, Local Government, Public Management, Supply Chain Management"],
      careerOpportunities: ["Administrative officer", "Manager (Human Resources, Supply chain)", "Procurement Officer", "Disaster & Risk Practitioner", "Local Government Consultant", "Divisional Head", "Assistant Director"],
    },

    // Department of Clothing and Textile Studies
    {
      id: "dut-bachelor-applied-science-textile-science",
      name: "Bachelor of Applied Science in Textile Science",
      faculty: "Department of Clothing and Textile Studies",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": 4,
        "physical sciences": 4,
      },
      additionalRequirements: ["Interview process"],
      careerOpportunities: ["Production planning", "Fabric development", "Marketing", "Quality control", "Fashion retail", "Government sectors", "Clothing industry", "Salesperson and Advisor"],
    },
    {
      id: "dut-diploma-clothing-management",
      name: "Diploma in Clothing Management",
      faculty: "Department of Clothing and Textile Studies",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "english": 3,
      },
      additionalRequirements: ["DUT SATAP English Literacy test", "Industry accepted numeracy assessment", "Interview"],
      careerOpportunities: ["Management", "Product development", "Production", "Work-study", "Planning", "Quality", "Garment technology", "Retail buying and store management"],
    },

    // Department of Chemistry
    {
      id: "dut-dip-analytical-chemistry",
      name: "Diploma in Analytical Chemistry",
      faculty: "Department of Chemistry",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 3,
      },
      additionalRequirements: ["Nine month Work Integrated Learning (WIL) component"],
      careerOpportunities: ["Quality control and testing", "Research and development", "Chemical and Allied Industries (detergents, petroleum, plastics, food, pharmaceuticals, mining, water treatment, metallurgy)"],
    },

    // Faculty of Engineering and the Built Environment
    {
      id: "dut-diploma-nautical-studies",
      name: "Diploma in Nautical Studies (Sea Going)",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": 4,
        "physical sciences": 4,
      },
      additionalRequirements: ["SAMSA eyesight test"],
      careerOpportunities: ["Deck Cadet", "Ocean-going vessel command", "Tugs, pilotage, dredging and vessel traffic services", "South African Navy officer", "Surveying", "Technical management", "Education, training and development", "Crewing management"],
    },
    {
      id: "dut-diploma-shipping-logistics",
      name: "Diploma in Shipping and Logistics (Shore-based)",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": 3,
        "business, commerce or management subject": 4,
      },
      additionalRequirements: ["SATAP test in English and numeracy"],
      careerOpportunities: ["Port agency", "Stevedoring", "Clearing and forwarding", "Surveying", "Warehousing", "Project management", "Terminal management"],
    },
    {
      id: "dut-beng-tech-industrial-engineering",
      name: "Bachelor of Engineering Technology in Industrial Engineering",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": 4,
        "technical mathematics": 5,
        "physical sciences": 4,
        "technical sciences": 5,
      },
      additionalRequirements: ["Must qualify for degree study", "Ranking based on sum of Mathematics and Physical Science (min 100%)", "N4 subjects may be presented if requirements not met"],
      careerOpportunities: ["Manufacturing sector", "Retail sector", "Banking sector"],
    },
    {
      id: "dut-bachelor-mechanical-engineering",
      name: "Bachelor of Engineering Technology in Mechanical Engineering",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["Must qualify for degree study", "Ranking based on sum of Mathematics and Physical Science (min 100%)", "N4 subjects may be presented if requirements not met"],
      careerOpportunities: ["Production engineer", "Maintenance engineer", "Design engineer", "Sales of hi-tech equipment"],
    },
    {
      id: "dut-beng-tech-power-engineering",
      name: "Bachelor of Engineering Technology in Power Engineering",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": 4,
        "technical mathematics": 5,
        "physical sciences": 4,
        "technical sciences": 5,
      },
      additionalRequirements: ["Must qualify for degree study", "Ranking based on sum of Mathematics and Physical Science (min 100%)", "N4 subjects may be presented if requirements not met"],
      careerOpportunities: ["Electrical Power Technologist", "Consultant", "Contractor"],
    },
    {
      id: "dut-bachelor-architecture",
      name: "Bachelor of the Built Environment in Architecture",
      faculty: "Faculty of Engineering and the Built Environment",
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
      additionalRequirements: ["Must qualify for degree study", "Top 300 applicants required to undergo a selection test", "Preference given to 1st choice applicants"],
      careerOpportunities: ["Candidate Architectural Technologist", "Candidate Senior Architectural Technologist"],
    },
    {
      id: "dut-bbe-construction-studies",
      name: "Bachelor of the Built Environment in Construction Studies",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 5 },
          ],
        },
        "physical sciences": {
          alternatives: [
            { subject: "physical sciences", level: 4 },
            { subject: "technical sciences", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Minimum combined score of 100% for Mathematics and Physical Science", "N4 subjects accepted for those not meeting departmental requirements"],
      careerOpportunities: ["Quantity Surveying", "Construction Management", "Construction Project Management"],
    },
    {
      id: "dut-bbe-geomatics",
      name: "Bachelor of the Built Environment in Geomatics",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 5 },
          ],
        },
        "physical sciences": {
          alternatives: [
            { subject: "physical sciences", level: 4 },
            { subject: "technical sciences", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Minimum combined score of 100% for Mathematics and Physical Science", "Only 1st-4th choice CAO applicants considered"],
      careerOpportunities: ["Land Surveying", "Engineering Surveying", "Mining", "Hydrographic surveying"],
    },
    {
      id: "dut-bburp-urban-regional-planning",
      name: "Bachelor of the Built Environment in Urban and Regional Planning",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "english first additional language": 5,
        "mathematics": 4,
      },
      additionalRequirements: ["Placement test required"],
      careerOpportunities: ["Urban and Regional Planning", "Government departments", "Private planning firms", "Property development"],
    },
    {
      id: "dut-dip-civil-engineering",
      name: "Diploma in Engineering Technology in Civil Engineering",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 5 },
          ],
        },
        "physical sciences": {
          alternatives: [
            { subject: "physical sciences", level: 4 },
            { subject: "technical sciences", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Only 1st and 2nd choice applicants considered"],
      careerOpportunities: ["Civil Engineering Technician", "Construction industry", "Consulting offices"],
    },

    // Faculty of Applied Sciences / Faculty of Engineering and the Built Environment
    {
      id: "dut-higher-certificate-applied-sciences",
      name: "Higher Certificate in Applied Sciences",
      faculty: "Faculty of Applied Sciences / Faculty of Engineering and the Built Environment",
      apsMin: 18,
      duration: "1 year",
      subjectRequirements: {
        "english": 4,
        "mathematics": 3,
        "physical sciences": 3,
      },
      careerOpportunities: ["Access to further studies in Engineering and Applied Sciences"],
    },

    // Department of Sport Studies
    {
      id: "dut-hc-sport-management-science",
      name: "Higher Certificate in Sport Management Science",
      faculty: "Department of Sport Studies",
      apsMin: 24,
      duration: "1 year",
      subjectRequirements: {
        "english": {
          alternatives: [
            { subject: "english", level: 3 },
          ],
        },
        "life sciences": {
          alternatives: [
            { subject: "life sciences", level: 3 },
            { subject: "life sciences", level: 3 },
            { subject: "mathematics", level: 3 },
            { subject: "physical sciences", level: 3 },
            { subject: "sports science", level: 3 },
          ],
        },
      },
      careerOpportunities: ["Sport Marketing and Management", "Sport Business Administration", "Coaching Principles and Teaching", "Physical Activity to Children", "National Federation Coaching", "Anatomy and Physiology", "Entrepreneurship", "Project Management"],
    },

    // Department of Visual Communication Design
    {
      id: "dut-b-applied-arts-commercial-photography",
      name: "Bachelor of Applied Arts in Commercial Photography",
      faculty: "Department of Visual Communication Design",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english": 3,
        "recognised 20 credit subjects": 4,
      },
      additionalRequirements: ["Comprehensive test based on Photographic knowledge", "Portfolio of 3 photographic images"],
      careerOpportunities: ["Commercial, industrial and architecture photography", "Advertising and fashion photography", "Press, documentary, and photojournalism", "Editorial, food, and lifestyle photography", "Portraiture and social photography", "Medical and scientific photography"],
    },

    // Department of Video Technology
    {
      id: "dut-b-applied-arts-screen-arts-technology",
      name: "Bachelor of Applied Arts in Screen Arts and Technology",
      faculty: "Department of Video Technology",
      apsMin: 36,
      duration: "3 years",
      subjectRequirements: {
        "english home language": {
          alternatives: [
            { subject: "english home language", level: 4 },
            { subject: "english first additional language", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Interview"],
      careerOpportunities: ["Director", "Camera operator", "Writer", "Production manager"],
    },

    // Faculty of Arts and Design
    {
      id: "dut-bachelor-design-visual-communication-design",
      name: "Bachelor of Design in Visual Communication Design",
      faculty: "Faculty of Arts and Design",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 3,
        "english first additional language": 3,
      },
      additionalRequirements: ["Entrance test", "Portfolio of recent art/design work", "Interview"],
      careerOpportunities: ["Design and illustration for print media and advertising", "Animation", "Web- and multi-media design", "Online design", "Product design"],
    },
    {
      id: "dut-diploma-interior-design",
      name: "Diploma in Interior Design",
      faculty: "Faculty of Arts and Design",
      apsMin: 18,
      duration: "3 years",
      subjectRequirements: {
        "english": {
          alternatives: [
            { subject: "english home language", level: 3 },
            { subject: "english first additional language", level: 3 },
          ],
        },
      },
      additionalRequirements: ["Portfolio of 10 original drawings", "Personal interview", "Drawing test", "Written questionnaire", "Must be 1st or 2nd choice on CAO"],
      careerOpportunities: ["Interior design studios", "Architectural practices", "Retail and exhibition design", "Furniture or product design", "Independent consultant"],
    },
    {
      id: "dut-diploma-jewellery-design-manufacture",
      name: "Diploma in Jewellery Design and Manufacture",
      faculty: "Faculty of Arts and Design",
      apsMin: 18,
      duration: "3 years",
      subjectRequirements: {
        "english": {
          alternatives: [
            { subject: "english home language", level: 3 },
            { subject: "english first additional language", level: 3 },
          ],
        },
      },
      additionalRequirements: ["Portfolio of artwork", "Programme selection test", "Personal interview"],
      careerOpportunities: ["Jewellery designer", "Jewellery manufacturer", "Model maker", "Casting specialist", "Jewellery marketer", "Business owner"],
    },
    {
      id: "dut-higher-certificate-performing-arts-technology",
      name: "Higher Certificate in Performing Arts Technology",
      faculty: "Faculty of Arts and Design",
      apsMin: 18,
      duration: "1 year",
      subjectRequirements: {
        "english": 3,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 3 },
          ],
        },
      },
      additionalRequirements: ["Online interview", "Assessment of aptitude for backstage and technical theatre practice"],
      careerOpportunities: ["Theatre lighting technician", "Sound operator", "Assistant stage manager", "General stage crew", "Technical production assistant", "Event production crew"],
    },

    // School of Education
    {
      id: "dut-bed-sp-fet-economics-management-sciences",
      name: "Bachelor of Education in Senior Phase and Further Education and Training Teaching: Economics & Management Sciences",
      faculty: "School of Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english": 4,
        "accounting": 4,
      },
      additionalRequirements: ["None specified"],
      careerOpportunities: ["Government school teacher", "Private institution teacher"],
    },
    {
      id: "dut-bed-sp-fet-natural-sciences",
      name: "Bachelor of Education in Senior Phase and Further Education and Training Teaching: Natural Sciences",
      faculty: "School of Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": 4,
        "physical sciences": {
          alternatives: [
            { subject: "physical sciences", level: 4 },
            { subject: "life sciences", level: 4 },
          ],
        },
      },
      additionalRequirements: ["None specified"],
      careerOpportunities: ["Government school teacher", "Private institution teacher"],
    },
    {
      id: "dut-bed-sp-fet-languages",
      name: "Bachelor of Education in Senior Phase and Further Education and Training Teaching: Languages",
      faculty: "School of Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english": 5,
        "isizulu": {
          alternatives: [
            { subject: "isizulu", level: 5 },
            { subject: "isixhosa", level: 5 },
          ],
        },
      },
      additionalRequirements: ["None specified"],
      careerOpportunities: ["Government school teacher", "Private institution teacher"],
    },
    {
      id: "dut-bed-sp-fet-technology",
      name: "Bachelor of Education in Senior Phase and Further Education and Training Teaching: Technology",
      faculty: "School of Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 4 },
            { subject: "technical sciences", level: 4 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["None specified"],
      careerOpportunities: ["Government school teacher", "Private institution teacher"],
    },

    // Department of Media, Language & Communication
    {
      id: "dut-bachelor-journalism",
      name: "Bachelor of Journalism",
      faculty: "Department of Media, Language & Communication",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Another Official Language": 4,
      },
      additionalRequirements: ["Selection test", "Interview", "Mature age exemption route available for candidates 23+"],
      careerOpportunities: ["News and feature writing", "Radio and television production", "Advertising", "Public relations"],
    },

    // Department of Drama and Production Studies
    {
      id: "dut-diploma-drama",
      name: "Diploma in Drama",
      faculty: "Department of Drama and Production Studies",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "second language": 3,
      },
      additionalRequirements: ["Online video audition", "On-campus audition", "English proficiency assessment (SATAP)"],
      careerOpportunities: ["Performer", "Director", "Theatre maker", "Arts facilitator", "Voice artist", "Theatre educator"],
    },

    // Department of Fashion and Textiles
    {
      id: "dut-dip-fashion-design",
      name: "Diploma in Fashion Design",
      faculty: "Department of Fashion and Textiles",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "English": 3,
      },
      additionalRequirements: ["Departmental entrance test", "Portfolio of minimum 10 recent fashion/art related work", "In-depth interview"],
      careerOpportunities: ["Bespoke designer", "Freelance pattern technologist", "CAD artist", "Commercial designer", "Buyer or merchandiser", "Trend forecaster", "Visual merchandiser"],
    },

    // Department of Fine Art
    {
      id: "dut-dip-fine-art",
      name: "Diploma in Fine Art",
      faculty: "Department of Fine Art",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "English": 3,
      },
      additionalRequirements: ["Portfolio of at least 20 drawings", "Interview", "40-minute visual-comprehension test"],
      careerOpportunities: ["Professional artist", "Lecturer", "Technical art advisor", "Textile designer", "Gallery assistant", "Illustrator", "Advertising designer"],
    },

    // Faculty of Media, Language & Communication
    {
      id: "dut-diploma-language-practice",
      name: "Diploma in Language Practice",
      faculty: "Faculty of Media, Language & Communication",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "english": {
          alternatives: [
            { subject: "english home language", level: 4 },
            { subject: "english first additional language", level: 5 },
          ],
        },
        "african language": {
          alternatives: [
            { subject: "isizulu/isixhosa home language", level: 4 },
            { subject: "isizulu/isixhosa first additional language", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Language proficiency test", "Interview in first language", "Interview in second language", "Total aggregate of 60%"],
      careerOpportunities: ["Language facilitator", "Translator", "Interpreter", "Editor", "Junior Language Practitioner"],
    },

    // Department of Chemical Engineering
    {
      id: "dut-beng-tech-chemical-engineering",
      name: "Bachelor of Engineering Technology in Chemical Engineering",
      faculty: "Department of Chemical Engineering",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 5 },
          ],
        },
        "physical sciences": {
          alternatives: [
            { subject: "physical sciences", level: 4 },
            { subject: "technical sciences", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Degree entry pass required", "Minimum combined score of 100% for Mathematics and Physical Science"],
      careerOpportunities: ["Research and development", "Economic evaluation", "Chemical engineering design", "Plant operations and management", "Project management", "Product marketing"],
    },
    {
      id: "dut-dip-pulp-paper-technology",
      name: "Diploma in Pulp and Paper Technology",
      faculty: "Department of Chemical Engineering",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english": 3,
        "mathematics": 4,
        "physical sciences": 4,
      },
      additionalRequirements: ["30 months theoretical tuition and 6 months industrial training"],
      careerOpportunities: ["Process Controller", "Supervisor", "Pulp and Paper Technologist"],
    },

    // Department of Civil Engineering and Geomatics
    {
      id: "dut-bachelor-civil-engineering",
      name: "Bachelor of Engineering Technology in Civil Engineering",
      faculty: "Department of Civil Engineering and Geomatics",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["Degree entry pass required", "Minimum combined score of 120% for Mathematics and Physical Science", "First or second choice CAO applicants only"],
      careerOpportunities: ["Civil engineering planning", "Designing", "Consulting", "Construction"],
    },

    // Department of Electronic Engineering
    {
      id: "dut-beng-tech-electronic-engineering",
      name: "Bachelor of Engineering Technology in Electronic Engineering",
      faculty: "Department of Electronic Engineering",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": 4,
        "physical sciences": 4,
      },
      additionalRequirements: ["Degree entry pass required", "Minimum combined score of 100 for Mathematics and Physical Science"],
      careerOpportunities: ["Microelectronics", "Fixed and wireless communications", "Networking", "Automation and robotics", "Intelligent systems", "Automotive", "Rail", "Renewable and green energy", "Software and ICT", "Systems analysis and machine learning"],
    },

    {
      id: "dut-dip-construction-studies",
      name: "Diploma in Built Environment in Construction Studies",
      faculty: "Department of Civil Engineering",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "english first additional language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 5 },
          ],
        },
        "physical sciences": {
          alternatives: [
            { subject: "physical sciences", level: 4 },
            { subject: "technical sciences", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Alternative entry via N4 subjects: Mathematics and Engineering Science, plus Building and Structural Construction OR Building and Structural Surveying"],
      careerOpportunities: ["Quantity Surveying", "Construction Project Management", "Construction Management", "Public Service"],
    },

    // Department of Community Health Studies
    {
      id: "dut-bhs-child-youth-care",
      name: "Bachelor of Child & Youth Care",
      faculty: "Department of Community Health Studies",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english": 4,
      },
      additionalRequirements: ["Interview and entrance assessment", "Proof of 20 hours voluntary work or employment with children/youth/families", "Must be 1st, 2nd or 3rd choice"],
      careerOpportunities: ["Residential child and youth care worker", "Probation officer", "Street shelter worker", "Educare centre worker", "Community development project worker"],
    },

    // Faculty of Health Sciences
    {
      id: "dut-bhsc-chiropractic",
      name: "Bachelor of Health Sciences in Chiropractic",
      faculty: "Faculty of Health Sciences",
      apsMin: 28,
      duration: "5 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": 4,
        "life orientation": 4,
        "life sciences": 4,
        "physical sciences": 4,
      },
      additionalRequirements: ["Applicants must be over 17 years of age and physically fit", "Interviews required after extensive screening process", "Initial shortlisting based on Grade 11 and/or Grade 12 subject selection profile"],
      careerOpportunities: ["Private practice", "Partnership with existing practitioners"],
    },
    {
      id: "dut-bhsc-clinical-technology",
      name: "Bachelor of Health Sciences in Clinical Technology",
      faculty: "Faculty of Health Sciences",
      apsMin: 25,
      duration: "4 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": 4,
        "physical sciences": 4,
        "life sciences": 4,
      },
      additionalRequirements: ["Applicants are required to have industrial knowledge", "Interviews required", "May be required to appear before a Selection Committee and/or sit for an Aptitude Test"],
      careerOpportunities: ["Clinical Technologist in provincial and private hospitals", "Critical Care units", "Lung Function units", "Renal/Dialysis units", "EEG and Sleep Laboratories", "Cardio-thoracic surgery", "Cardiac Catheterisation Laboratory & Cardiac Clinic", "Assisted Reproductive Biology Laboratories"],
    },
    {
      id: "dut-bhsc-emergency-medical-care",
      name: "Bachelor of Health Sciences in Emergency Medical Care and Rescue",
      faculty: "Faculty of Health Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": 4,
        "life sciences": 4,
        "physical sciences": 4,
      },
      additionalRequirements: ["Pass Medical Fitness Evaluation", "Pass Physical Fitness Evaluation", "Pass Environmental Fitness evaluations", "Obtain a driver's licence by the end of the first year"],
      careerOpportunities: ["Private emergency medical services", "Public emergency medical services", "Fire departments", "Military", "Support industries"],
    },
    {
      id: "dut-bhsc-environmental-health",
      name: "Bachelor of Health Sciences in Environmental Health",
      faculty: "Faculty of Health Sciences",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": 4,
        "physical sciences": 4,
        "life sciences": 4,
      },
      additionalRequirements: ["Interviews required", "Assessment test required"],
      careerOpportunities: ["Private companies", "Municipal health departments", "State health", "Parastatals", "Provincial government departments", "National government departments", "Large food manufacturers", "Industries", "Mines", "Hotel groups", "Environmental consultancies"],
    },
    {
      id: "dut-bhsc-homoeopathy",
      name: "Bachelor of Health Sciences in Homoeopathy",
      faculty: "Faculty of Health Sciences",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": 4,
        "physical sciences": 4,
        "life sciences": 4,
      },
    },
    {
      id: "dut-bhsc-medical-laboratory-science",
      name: "Bachelor of Health Sciences in Medical Laboratory Science",
      faculty: "Faculty of Health Sciences",
      apsMin: 25,
      duration: "4 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": 4,
        "physical sciences": 4,
        "life sciences": 4,
      },
      additionalRequirements: ["Interview", "Registration with HPCSA as a student Medical Laboratory Scientist"],
      careerOpportunities: ["Government pathology laboratories", "Private health care laboratories", "Research health care laboratories"],
    },
    {
      id: "dut-bhsc-medical-orthotics-prosthetics",
      name: "Bachelor of Health Sciences in Medical Orthotics and Prosthetics",
      faculty: "Faculty of Health Sciences",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english": 3,
        "mathematics": 4,
        "physical sciences": 4,
        "life sciences": 4,
      },
      additionalRequirements: ["Interview", "Placement test", "Voluntary practice report (minimum 8 hours)"],
      careerOpportunities: ["Hospitals", "Government departments", "Rehabilitation facilities", "Specialty clinics", "Universities and Universities of Technology"],
    },
    {
      id: "dut-bhs-diagnostic-sonography",
      name: "Bachelor of Health Sciences in Diagnostic Sonography",
      faculty: "Faculty of Health Sciences",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": 4,
        "physical sciences": 4,
        "life sciences": 4,
      },
      additionalRequirements: ["May be required to write an entrance test", "Visit clinical training centres and spend at least 8 hours in the discipline specific department (proof required)", "Attend interviews prior to final acceptance", "Only considered for interview if Diagnostic Sonography is placed as 1st choice", "Placement testing required", "Compulsory registration with the Health Professions Council of South Africa (HPCSA) throughout training"],
      careerOpportunities: ["Work in provincial and private institutions in South Africa and abroad", "Open own practice (in accordance with HPCSA requirements)"],
    },
    {
      id: "dut-bhs-radiotherapy",
      name: "Bachelor of Health Sciences in Radiotherapy",
      faculty: "Faculty of Health Sciences",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": 4,
        "physical sciences": 4,
        "life sciences": 4,
      },
      additionalRequirements: ["May be required to write an entrance test", "Visit clinical training centres and spend at least 8 hours in the discipline specific department (proof required)", "Attend interviews prior to final acceptance", "Only considered for interview if Radiotherapy is placed as 1st choice", "Placement testing required", "Compulsory registration with the Health Professions Council of South Africa (HPCSA) throughout training"],
      careerOpportunities: ["Work in provincial and private institutions in South Africa and abroad", "Open own practice (in accordance with HPCSA requirements)"],
    },
    {
      id: "dut-bhs-diagnostic-radiography",
      name: "Bachelor of Health Sciences in Diagnostic Radiography",
      faculty: "Faculty of Health Sciences",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": 4,
        "physical sciences": 4,
        "life sciences": 4,
        "any other nsc 20-credit subject": 4,
      },
      additionalRequirements: ["May be required to write an entrance test", "Visit clinical training centres and spend at least 8 hours in the discipline specific department (proof required)", "Attend interviews prior to final acceptance", "Only considered for interview if Diagnostic Radiography is placed as 1st, 2nd or 3rd choice", "Placement testing required", "Compulsory registration with the Health Professions Council of South Africa (HPCSA) throughout training"],
      careerOpportunities: ["Work in provincial and private institutions in South Africa and abroad", "Open own practice (in accordance with HPCSA requirements)"],
    },
    {
      id: "dut-bachelor-nursing",
      name: "Bachelor of Nursing",
      faculty: "Faculty of Health Sciences",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english": 3,
        "life sciences": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "mathematical literacy", level: 6 },
          ],
        },
        "physical sciences": 4,
      },
      additionalRequirements: ["APS excludes Life Orientation", "Standardized Assessment Test for Access and Placement (SATAP) required", "Interview required", "Sign a contract to practice in South Africa for four years after graduation (inclusive of one-year community service)", "Students who are pregnant or less than six weeks postpartum/termination of pregnancy need to declare to facilitate proper guidance"],
      careerOpportunities: ["General nurse and midwife (community, psychiatry)", "Work as a general nurse in any clinical setting", "Postgraduate studies specialising in clinical nursing, management, or academia"],
    },
    {
      id: "dut-dip-somatology",
      name: "Diploma in Somatology",
      faculty: "Faculty of Health Sciences",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 3 },
            { subject: "English First Additional Language", level: 3 },
          ],
        },
        "Life Sciences": 4,
        "Math": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Medical Report required (clean bill of health, high standard of physical fitness essential)", "Assessment test required (entrance test)", "Extended curriculum programme available for students not fulfilling all tertiary admission requirements (first year over two years, 20 places available, selection based on entrance test)"],
      careerOpportunities: ["Owning, running, or working in a spa/salon/clinic or health hydro", "International and national shipping liners", "Game lodges and wellness centres", "Exercise and advising clients on nutritionally balanced eating programmes", "Marketing and training positions in national and international cosmetic companies, equipment houses and retail outlets"],
    },

    // Department of Dental Sciences
    {
      id: "dut-hc-dental-assisting",
      name: "Higher Certificate in Dental Assisting",
      faculty: "Department of Dental Sciences",
      apsMin: 18,
      duration: "1 year",
      subjectRequirements: {
        "english": 3,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
        "physical science or life science": 3,
      },
      additionalRequirements: ["Registration with the Health Professions Council of South Africa (HPCSA) as student dental assistants", "Interviews", "Entrance tests"],
      careerOpportunities: ["Private practice", "Public hospitals", "Medical division of the defence force", "Medical aid companies", "Sales representatives for dental supply companies", "Dental laboratories"],
    },

    // Department of Hospitality and Tourism
    {
      id: "dut-diploma-catering-management",
      name: "Diploma in Catering Management",
      faculty: "Department of Hospitality and Tourism",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 2 },
            { subject: "mathematical literacy", level: 3 },
          ],
        },
        "accounting": 3,
      },
      additionalRequirements: ["Departmental suitability test", "Interview", "Hepatitis A vaccination"],
      careerOpportunities: ["Catering manager/supervisor", "Chef de parties", "Restaurant supervisors", "Event coordinators"],
    },
    {
      id: "dut-dip-hospitality-management",
      name: "Diploma in Hospitality Management",
      faculty: "Department of Hospitality and Tourism",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Math": {
          alternatives: [
            { subject: "Mathematics", level: 2 },
            { subject: "Mathematical Literacy", level: 3 },
          ],
        },
        "Accounting": 3,
      },
      additionalRequirements: ["Interview", "Hepatitis A vaccination"],
      careerOpportunities: ["Chefs", "Food service supervisors", "Front office personnel", "Guest relations", "Event co-ordinators", "Housekeepers", "Catering supervisors", "Bartenders", "Sommeliers"],
    },
    {
      id: "dut-diploma-tourism",
      name: "Diploma in Tourism",
      faculty: "Department of Hospitality and Tourism",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 2 },
            { subject: "mathematical literacy", level: 3 },
            { subject: "accounting", level: 3 },
          ],
        },
      },
      additionalRequirements: ["Preference given to applicants with experience in Tourism, Hospitality and Food Industries", "Preference given to those with completed hospitality/catering subjects at TVET or accredited training organizations", "Preference given to those with CATHSSETA recognized units/levels", "Preference given to those with an NQF Level 4 Further Education and Training Certificate"],
      careerOpportunities: ["Travel Retailer", "Tour Operator", "Tour Guide", "Tourism Promoter", "Tourism Educator", "Research and Enterprise"],
    },

    // Department of Ecotourism
    {
      id: "dut-diploma-ecotourism",
      name: "Diploma in Ecotourism",
      faculty: "Department of Ecotourism",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "english 1st additional language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
        "agricultural sciences or life sciences or geography": 4,
      },
      careerOpportunities: ["Tourism Project Officers", "Heritage Site Managers", "Park Rangers", "Trainee tour/field guides", "Trainee conservation officers"],
    },

    // Department of Management Sciences
    {
      id: "dut-dip-management-business-admin",
      name: "Diploma in Management Sciences: Business Administration",
      faculty: "Department of Management Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 3 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Math": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
      },
      careerOpportunities: ["Entrepreneur", "Administration", "Banking", "Wholesale and retail", "Financial management", "Government services", "Education management", "Hospital administration", "Customer service", "Transportation", "Property and real estate", "Supply chain management", "Insurance"],
    },

    {
      id: "dut-dip-app-dev-indumiso",
      name: "Diploma ICT: Applications Development (Indumiso Campus)",
      faculty: "Faculty of Accounting and Informatics",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 3,
        "english first additional language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 6 },
          ],
        },
      },
      additionalRequirements: ["Three 20 credit subjects (not more than one language) at level 3"],
    },
  ];
}
