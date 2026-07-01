import { BaseUniversity } from "./base-university";
import type { Course } from "@/lib/types";
import { percentageToLevel } from "@/lib/aps/utils";

/**
 * Cape Peninsula University of Technology (CPUT) class
 */
export class CPUT extends BaseUniversity {
  readonly id = "cput";
  readonly name = "Cape Peninsula University of Technology";
  readonly shortName = "CPUT";
  readonly website = "https://www.cput.ac.za";
  readonly logo = "/logos/cput.png";
  readonly location = {
    city: "Cape Town",
    province: "Western Cape",
    coordinates: {
      latitude: -33.9308,
      longitude: 18.6428,
    },
  };

  /**
   * Calculate APS score according to CPUT's method
   * CPUT uses three different methods to calculate APS scores:
   * Method 1: Best of six subjects
   * Method 2: Double Maths and Science plus English and the next best subject
   * Method 3: Double Maths and Accounting, plus English and the 3 next best subjects
   * @param subjects Object containing subject names and their NSC levels
   * @returns The calculated APS score
   */
  calculateApsScore(subjects: Record<string, number>): number {
    // CPUT M1: best 6 subjects (excl. LO) on NSC 1-7 level scale
    return Object.entries(subjects)
      .filter(([name]) => name.toLowerCase() !== "life orientation")
      .map(([, pct]) => percentageToLevel(pct))
      .sort((a, b) => b - a)
      .slice(0, 6)
      .reduce((sum, level) => sum + level, 0);
  }

  protected readonly _courses: Course[] = [
    // Faculty of Applied Sciences
    {
      id: "cput-dip-mathematical-sciences",
      name: "Diploma in Mathematical Sciences",
      faculty: "Faculty of Applied Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
      },
      additionalRequirements: ["40% or above in Physical Sciences (3) or Accounting (3) or Business Studies (3) or Economics (3) or Geography (3)"],
      careerOpportunities: ["Financial sector (banks, investment firms, insurance companies)", "Manufacturing industries", "Commerce sector", "Science and technology sector", "Research organisations"],
    },
    {
      id: "cput-bachelor-food-science-technology",
      name: "Bachelor of Food Science & Technology",
      faculty: "Faculty of Applied Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
        "Life Sciences": 3,
      },
      additionalRequirements: ["Plus any two other subjects (excl. languages) – each at a minimum of a Level 3 pass (40–49%) (corresponding with an APS of 4)"],
      careerOpportunities: ["Food processing and manufacturing companies", "Regulatory and research environments", "Self-employment"],
    },
    {
      id: "cput-dip-nature-conservation",
      name: "Diploma in Nature Conservation",
      faculty: "Faculty of Applied Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
        "Life Sciences": 4,
      },
      careerOpportunities: ["National parks", "Game and nature reserves", "Botanical gardens", "Environmental NGO’s", "Environmental consultancy firms"],
    },
    {
      id: "cput-dip-marine-science",
      name: "Diploma in Marine Science",
      faculty: "Faculty of Applied Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["45% or above in Maths or Physical Sciences if the other one is 50% or above"],
      careerOpportunities: ["Government departments", "Nonprofit organisations", "Consultancies", "Private and national parks", "Marine and coastal reserves", "Research and training organisations", "Marine companies"],
    },
    {
      id: "cput-dip-environmental-management",
      name: "Diploma in Environmental Management",
      faculty: "Faculty of Applied Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
        "Life Sciences": 4,
      },
      additionalRequirements: ["At least 40% (3) for Mathematics, 60% (5) for Maths Literacy and 50% (4) for Technical Maths", "50% (4) for Geography or Life Sciences", "Any other 2 subjects at 40% (3) except Life Orientation"],
      careerOpportunities: ["Government departments (Environmental Affairs, Water Affairs, Forestry)", "Manufacturing and processing industries", "Consulting companies"],
    },
    {
      id: "cput-bachelor-environmental-health",
      name: "Bachelor of Environmental Health",
      faculty: "Faculty of Applied Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
      additionalRequirements: ["Plus any other two subjects (4) except Life Orientation"],
      careerOpportunities: ["District health system", "Local authorities", "Industry", "Consultants", "Government departments"],
    },
    {
      id: "cput-dip-horticulture",
      name: "Diploma in Horticulture",
      faculty: "Faculty of Applied Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
        "Life Sciences": 4,
      },
      additionalRequirements: ["Subject to space, students may be admitted to the Foundation Programme if they have at least 40% (3) for Life Sciences"],
      careerOpportunities: ["Private sector nurseries", "Landscape industry", "Departments of Agriculture and Public Works", "SANBI", "SANPARKS", "Municipalities"],
    },
    {
      id: "cput-dip-landscape-architecture",
      name: "Diploma in Landscape Architecture",
      faculty: "Faculty of Applied Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
        "Life Sciences": 4,
      },
      additionalRequirements: ["Subject to space, students may be admitted to the Foundation Programme if they have at least 40% (3) for Life Sciences"],
      careerOpportunities: ["Architectural firms", "Landscape project developments"],
    },
    {
      id: "cput-dip-agriculture",
      name: "Diploma in Agriculture",
      faculty: "Faculty of Applied Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
      additionalRequirements: ["Life Sciences or Physical Sciences"],
      careerOpportunities: ["Private and commercial farms", "Government organisations", "Laboratories", "Agricultural research", "Quality control", "Production and marketing"],
    },
    {
      id: "cput-dip-agricultural-management",
      name: "Diploma in Agricultural Management",
      faculty: "Faculty of Applied Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
      additionalRequirements: ["Life Sciences or Physical Sciences"],
      careerOpportunities: ["Private and commercial farms", "Government organisations", "Laboratories", "Agricultural research", "Quality control", "Production and marketing"],
    },
    {
      id: "cput-dip-biotechnology",
      name: "Diploma in Biotechnology",
      faculty: "Faculty of Applied Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
      additionalRequirements: ["45% or above in Maths or Physical Sciences or Life Sciences if the other three are 50% or above"],
      careerOpportunities: ["Pharmaceutical companies", "Chemical manufacturers", "Food industry"],
    },
    {
      id: "cput-dip-analytical-chemistry",
      name: "Diploma in Analytical Chemistry",
      faculty: "Faculty of Applied Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["45% or above in Maths or Physical Sciences if the other one is 50% or above"],
      careerOpportunities: ["Mining", "Pharmaceutical", "Forensics", "Education", "Petrochemical", "Agriculture", "Food companies", "Environmental companies"],
    },
    {
      id: "cput-dip-consumer-science-food-nutrition",
      name: "Diploma in Consumer Science: Food & Nutrition",
      faculty: "Faculty of Applied Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["45% or above in Maths or Physical Sciences if the other three are 50% and above"],
      careerOpportunities: ["Convenience food manufacturing industry", "Retail industry", "Food service industry"],
    },

    // Faculty of Business and Management Sciences
    {
      id: "cput-dip-event-management",
      name: "Diploma in Event Management",
      faculty: "Faculty of Business and Management Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 2 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Motivation letter detailing reasons for applying and understanding of the industry"],
      careerOpportunities: ["Event companies", "marketing companies", "corporate environments", "hospitality industry"],
    },
    {
      id: "cput-dip-public-administration",
      name: "Diploma in Public Administration",
      faculty: "Faculty of Business and Management Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 2,
      },
      additionalRequirements: ["Part-time applicants should preferably be employed full-time in the public sector"],
      careerOpportunities: ["National, provincial and local government", "public entities", "non-profit organisations"],
    },
    {
      id: "cput-dip-hospitality-hotel-management",
      name: "Diploma in Hospitality and Hotel Management",
      faculty: "Faculty of Business and Management Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 2,
      },
      additionalRequirements: ["Work experience recommended", "Informative one-on-one or telephonic discussion"],
      careerOpportunities: ["Hotels", "guesthouses", "bed and breakfast establishments", "game lodges"],
    },
    {
      id: "cput-dip-hospitality-food-beverage-management",
      name: "Diploma in Hospitality and Food & Beverage Management",
      faculty: "Faculty of Business and Management Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 2,
      },
      careerOpportunities: ["Restaurants", "entertainment and conference venues", "banqueting facilities", "events companies", "catering companies"],
    },
    {
      id: "cput-dip-hospitality-management-professional-cookery",
      name: "Diploma in Hospitality Management and Professional Cookery",
      faculty: "Faculty of Business and Management Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 2,
      },
      careerOpportunities: ["Restaurants", "coffee shops", "bakeries", "entertainment and conference venues", "banqueting facilities"],
    },
    {
      id: "cput-dip-real-estate",
      name: "Diploma in Real Estate",
      faculty: "Faculty of Business and Management Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 2,
      },
      additionalRequirements: ["Distance students must be full-time employed in the industry"],
      careerOpportunities: ["Real estate agencies", "private sector", "financial sector"],
    },
    {
      id: "cput-dip-retail-business-management",
      name: "Diploma in Retail Business Management",
      faculty: "Faculty of Business and Management Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 2,
      },
      additionalRequirements: ["Three years relevant retail experience will also be considered"],
      careerOpportunities: ["Department stores", "hypermarkets", "shopping centres", "speciality stores", "supermarkets"],
    },
    {
      id: "cput-dip-banking",
      name: "Diploma in Banking",
      faculty: "Faculty of Business and Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
      },
      additionalRequirements: ["Part-time students must provide a letter of full-time employment in a banking environment"],
      careerOpportunities: ["Credit manager", "risk manager", "personal banker", "finance administrator"],
    },
    {
      id: "cput-dip-tourism-management",
      name: "Diploma in Tourism Management",
      faculty: "Faculty of Business and Management Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 2,
      },
      additionalRequirements: ["Motivation letter detailing reasons for applying and understanding of the industry"],
      careerOpportunities: ["Travel agents", "tour guides", "accommodation and hospitality", "marketing"],
    },
    {
      id: "cput-dip-human-resources-management",
      name: "Diploma in Human Resource Management",
      faculty: "Faculty of Business and Management Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 2,
      },
      additionalRequirements: ["Part-time applicants must provide a letter of full-time employment"],
      careerOpportunities: ["Small and large private organisations", "public sector"],
    },
    {
      id: "cput-dip-management",
      name: "Diploma in Management",
      faculty: "Faculty of Business and Management Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 2,
      },
      additionalRequirements: ["Part-time applicants must provide a letter of full-time employment and relevant experience"],
      careerOpportunities: ["Small and large businesses", "public sector", "consulting companies"],
    },
    {
      id: "cput-dip-sport-leisure-management",
      name: "Diploma in Sport and Leisure Management",
      faculty: "Faculty of Business and Management Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 2,
      },
      additionalRequirements: ["Non-Academic Review Component form required"],
      careerOpportunities: ["Sport marketing", "digital marketing", "sport and recreation centre manager"],
    },
    {
      id: "cput-dip-marketing",
      name: "Diploma in Marketing",
      faculty: "Faculty of Business and Management Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 2,
      },
      additionalRequirements: ["Part-time applicants must be employed full-time in marketing-related role"],
      careerOpportunities: ["Brand Management", "Marketing & Sales", "Advertising Agencies", "Digital Marketing"],
    },
    {
      id: "cput-dip-business-information-administration",
      name: "Diploma in Business & Information Administration",
      faculty: "Faculty of Business and Management Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 2,
      },
      additionalRequirements: ["Part-time applicants must submit CV and letter of employment"],
      careerOpportunities: ["Business", "government", "corporate and private sectors"],
    },
    {
      id: "cput-dip-operations-management",
      name: "Diploma in Operations Management",
      faculty: "Faculty of Business and Management Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
      },
      careerOpportunities: ["Production sector", "engineering companies"],
    },
    {
      id: "cput-bachelor-paralegal-studies",
      name: "Bachelor of Paralegal Studies",
      faculty: "Faculty of Business and Management Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
      },
      additionalRequirements: ["Including one official language at level 4 (Excluding English)"],
      careerOpportunities: ["Government departments", "courts", "community-based advice offices", "law offices"],
    },
    {
      id: "cput-bachelor-business-informatics",
      name: "Bachelor of Business Informatics",
      faculty: "Faculty of Business and Management Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
      },
      additionalRequirements: ["NCV requirements apply for vocational applicants"],
      careerOpportunities: ["Systems Analyst", "Business Analyst", "IT Consultant", "Risk Manager"],
    },

    // Faculty of Education
    {
      id: "cput-bed-foundation-phase",
      name: "Bachelor in Education: Foundation Phase Teaching",
      faculty: "Faculty of Education",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Selection based on Grade 11 results", "Limited space"],
      careerOpportunities: ["Foundation Phase Teacher"],
    },
    {
      id: "cput-bed-intermediate-phase",
      name: "Bachelor in Education: Intermediate Phase Teaching",
      faculty: "Faculty of Education",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Selection based on Grade 11 results", "Limited space"],
      careerOpportunities: ["Intermediate Phase Teacher"],
    },
    {
      id: "cput-bed-senior-fet",
      name: "Bachelor in Education: Senior Phase and Further Education & Training Teaching",
      faculty: "Faculty of Education",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Selection based on Grade 11 results", "Limited space"],
      careerOpportunities: ["Senior Phase Teacher", "FET Teacher"],
    },

    // Health & Wellness Sciences
    {
      id: "cput-higher-certificate-dental-assisting",
      name: "Higher Certificate in Dental Assisting",
      faculty: "Health & Wellness Sciences",
      apsMin: 25,
      duration: "Not specified",
      subjectRequirements: {
        "English": 3,
        "Mathematics": 2,
        "Life Sciences": 3,
      },
      careerOpportunities: ["Dental clinics in the state and provincial structures", "Private practices"],
    },
    {
      id: "cput-bachelor-health-sciences-medical-laboratory-science",
      name: "Bachelor of Health Sciences in Medical Laboratory Science",
      faculty: "Health & Wellness Sciences",
      apsMin: 38,
      duration: "Not specified",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
      careerOpportunities: ["Blood transfusion services", "Private pathology practices", "National Health Laboratory Services", "Medical Research Council", "Forensic laboratories", "Veterinary practices", "Pharmaceutical companies"],
    },
    {
      id: "cput-higher-certificate-emergency-medical-care",
      name: "Higher Certificate in Emergency Medical Care",
      faculty: "Health & Wellness Sciences",
      apsMin: 26,
      duration: "Not specified",
      subjectRequirements: {
        "English": 3,
        "Mathematics": 3,
        "Life Sciences": 3,
        "Physical Sciences": 3,
      },
      additionalRequirements: ["Selection interview", "Medical assessment", "Physical assessment", "Environmental assessment"],
      careerOpportunities: ["Emergency and rescue services", "Private emergency services", "South African National Defence Force", "Mining industry", "International occupational health and safety"],
    },
    {
      id: "cput-diploma-emergency-care",
      name: "Diploma in Emergency Care",
      faculty: "Health & Wellness Sciences",
      apsMin: 28,
      duration: "Not specified",
      subjectRequirements: {
        "English": 3,
        "Mathematics": 3,
        "Life Sciences": 3,
        "Physical Sciences": 3,
      },
      additionalRequirements: ["Selection interview", "Medical assessment", "Physical assessment", "Environmental assessment"],
      careerOpportunities: ["Emergency and rescue services", "Private emergency services", "South African National Defence Force", "Mining industry", "International occupational health and safety"],
    },
    {
      id: "cput-bachelor-emergency-medical-care",
      name: "Bachelor of Emergency Medical Care",
      faculty: "Health & Wellness Sciences",
      apsMin: 35,
      duration: "Not specified",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Life Sciences": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["Selection interview", "Medical assessment", "Physical assessment", "Environmental assessment"],
      careerOpportunities: ["Emergency and rescue services", "Private emergency services", "South African National Defence Force", "Mining industry", "International occupational health and safety"],
    },
    {
      id: "cput-diploma-somatology",
      name: "Diploma in Somatology",
      faculty: "Health & Wellness Sciences",
      apsMin: 24,
      duration: "Not specified",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
        "Life Sciences": 4,
      },
      additionalRequirements: ["Hepatitis inoculation"],
      careerOpportunities: ["Health and skincare clinics", "Cruise liners", "Spas"],
    },
    {
      id: "cput-bachelor-nursing",
      name: "Bachelor of Nursing",
      faculty: "Health & Wellness Sciences",
      apsMin: 30,
      duration: "Not specified",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Life Sciences": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["Online interview"],
      careerOpportunities: ["Hospitals", "Private emergency services", "Private practices", "Physician offices", "Hospices", "Private companies", "Clinics"],
    },
    {
      id: "cput-bachelor-health-science-opticianry",
      name: "Bachelor of Health Science in Opticianry",
      faculty: "Health & Wellness Sciences",
      apsMin: 32,
      duration: "Not specified",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Life Sciences": 4,
        "Physical Sciences": 4,
      },
      careerOpportunities: ["Private practices", "Wholesale laboratories", "Optical companies", "Public sector hospitals and clinics"],
    },
    {
      id: "cput-bsc-diagnostic-radiography",
      name: "BSc in Diagnostic Radiography",
      faculty: "Health & Wellness Sciences",
      apsMin: 30,
      duration: "Not specified",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
        "life sciences": 4,
        "physical sciences": 4,
      },
      additionalRequirements: ["Online digital health screening questionnaire"],
      careerOpportunities: ["Academic hospitals", "Community health centres", "Private and public practice", "Research institutes"],
    },
    {
      id: "cput-bachelor-health-sciences-dental-technology",
      name: "Bachelor of Health Sciences in Dental Technology",
      faculty: "Health & Wellness Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
      careerOpportunities: ["Dental laboratories in state and provincial structures", "Private laboratories"],
    },
    {
      id: "cput-bachelor-science-diagnostic-radiography",
      name: "Bachelor of Science in Diagnostic Radiography",
      faculty: "Health & Wellness Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Life Sciences": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["In addition to the application form you may be required to complete a health screening questionnaire"],
      careerOpportunities: ["Academic hospitals", "Community health centres", "Private and public practice", "Research institutes"],
    },
    {
      id: "cput-bachelor-science-diagnostic-ultrasound",
      name: "Bachelor of Science in Diagnostic Ultrasound",
      faculty: "Health & Wellness Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Life Sciences": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["In addition to the application form you may be required to complete a health screening questionnaire"],
      careerOpportunities: ["Academic hospitals", "Community health centres", "Private and public practice", "Research institutes"],
    },
    {
      id: "cput-bachelor-science-radiation-therapy",
      name: "Bachelor of Science in Radiation Therapy",
      faculty: "Health & Wellness Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Life Sciences": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["In addition to the application form you may be required to complete a health screening questionnaire"],
      careerOpportunities: ["Academic hospitals", "Community health centres", "Private and public practice", "Research institutes"],
    },
    {
      id: "cput-bachelor-science-nuclear-medicine-technology",
      name: "Bachelor of Science in Nuclear Medicine Technology",
      faculty: "Health & Wellness Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Life Sciences": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["In addition to the application form you may be required to complete a health screening questionnaire"],
      careerOpportunities: ["Academic hospitals", "Community health centres", "Private and public practice", "Research institutes"],
    },

    // Faculty of Engineering & the Built Environment
    {
      id: "cput-dip-chemical-engineering",
      name: "Diploma in Chemical Engineering",
      faculty: "Faculty of Engineering & the Built Environment",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 5 },
          ],
        },
        "physical sciences": 4,
      },
      additionalRequirements: ["N4 Mathematics 60%", "N4 Engineering Science 60%"],
      careerOpportunities: ["Chemical processing industry", "Manufacturing"],
    },
    {
      id: "cput-bet-chemical-engineering",
      name: "Bachelor of Engineering Technology in Chemical Engineering",
      faculty: "Faculty of Engineering & the Built Environment",
      apsMin: 36,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 5,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 5 },
            { subject: "technical mathematics", level: 5 },
          ],
        },
        "physical sciences": 5,
      },
      additionalRequirements: ["N4 Mathematics 60%", "N4 Engineering Science 60%"],
      careerOpportunities: ["Chemical engineering consulting", "Process design"],
    },
    {
      id: "cput-diploma-civil-engineering",
      name: "Diploma in Civil Engineering",
      faculty: "Faculty of Engineering & the Built Environment",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["N4 Mathematics 60%", "N4 Engineering Science 60%"],
      careerOpportunities: ["Construction", "Civil engineering consulting"],
    },
    {
      id: "cput-bachelor-engineering-technology-civil",
      name: "Bachelor of Engineering Technology in Civil Engineering",
      faculty: "Faculty of Engineering & the Built Environment",
      apsMin: 36,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["N4 Mathematics 60%", "N4 Engineering Science 60%"],
      careerOpportunities: ["Civil engineering design", "Project management"],
    },
    {
      id: "cput-dip-clothing-textile",
      name: "Diploma in Clothing & Textile Technology",
      faculty: "Faculty of Engineering & the Built Environment",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Online selection test", "N4 Mathematics 50%", "N4 Clothing Production 60%"],
      careerOpportunities: ["Clothing production", "Textile manufacturing"],
    },
    {
      id: "cput-dip-construction-management",
      name: "Diploma in Construction",
      faculty: "Faculty of Engineering & the Built Environment",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["N4 Mathematics 60%"],
      careerOpportunities: ["Construction management", "Quantity surveying"],
    },
    {
      id: "cput-diploma-engineering-technology-electrical",
      name: "Diploma in Engineering Technology in Electrical Engineering",
      faculty: "Faculty of Engineering & the Built Environment",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["N4 Mathematics 60%", "N4 Engineering Science 60%", "N4 Electrotechnics 60%"],
      careerOpportunities: ["Electrical engineering", "Power systems"],
    },
    {
      id: "cput-bachelor-engineering-technology-electrical",
      name: "Bachelor of Engineering Technology in Electrical Engineering",
      faculty: "Faculty of Engineering & the Built Environment",
      apsMin: 36,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["N4 Mathematics 60%", "N4 Engineering Science 60%", "N4 Electrotechnics 60%"],
      careerOpportunities: ["Electrical systems design", "Automation"],
    },
    {
      id: "cput-dip-industrial-engineering",
      name: "Diploma: Engineering: Industrial",
      faculty: "Faculty of Engineering & the Built Environment",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 5 },
          ],
        },
        "physical sciences": 4,
        "technical sciences": 5,
      },
      additionalRequirements: ["N4 English 60%", "N4 Mathematics 60%", "N4 Engineering Science 60%"],
      careerOpportunities: ["Systems optimization", "Manufacturing management"],
    },
    {
      id: "cput-dip-mechanical-engineering",
      name: "Diploma in Mechanical Engineering",
      faculty: "Faculty of Engineering & the Built Environment",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 5 },
          ],
        },
        "physical sciences": 4,
        "technical sciences": 5,
      },
      additionalRequirements: ["N4 English 60%", "N4 Mathematics 60%", "N4 Engineering Science 60%"],
      careerOpportunities: ["Mechanical design", "Maintenance engineering"],
    },
    {
      id: "cput-b-marine-engineering",
      name: "Bachelor of Marine Engineering",
      faculty: "Faculty of Engineering & the Built Environment",
      apsMin: 36,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 5 },
          ],
        },
        "physical sciences": 5,
        "technical sciences": 5,
      },
      additionalRequirements: ["SAMSA Medical Practitioner approval", "N4 Mathematics 70%", "N4 Physical Science 70%"],
      careerOpportunities: ["Shipping industry", "Maritime engineering"],
    },

    // Business & Management Sciences
    {
      id: "cput-dip-accountancy",
      name: "Diploma in Accountancy",
      faculty: "Business & Management Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
      },
      additionalRequirements: ["English (4) and one of the following: Maths(3), Maths Lit(5) or Acc(4)"],
      careerOpportunities: ["Most businesses and organisations", "Private and governmental", "Fast Moving Consumer Goods (FMCG)", "State departments", "Retail industries"],
    },
    {
      id: "cput-dip-entrepreneurship",
      name: "Diploma in Entrepreneurship",
      faculty: "Business & Management Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 2,
      },
      additionalRequirements: ["Including one of the following at level 4 (50%) Business Studies, Economics, Accounting and Consumer Studies"],
      careerOpportunities: ["Self-employment", "Non-profit organisations (NPOs)", "Non-governmental organisations (NGOs)", "Government organisations or departments", "Finance/investment sector"],
    },
    {
      id: "cput-dip-events-management",
      name: "Diploma in Events Management",
      faculty: "Business & Management Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 2,
      },
      additionalRequirements: ["Including one of the following: TOUR, ECO, HS, BUS, ACC, CAT, IT (no rating required)"],
      careerOpportunities: ["Event companies", "Marketing companies", "Corporate environments", "Hospitality industry"],
    },

    // Education
    {
      id: "cput-bachelor-education-foundation-phase",
      name: "Bachelor of Education: Foundation Phase Teaching",
      faculty: "Education",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 2,
      },
      additionalRequirements: ["Home Language (4): Afrikaans, English or isiXhosa; First Additional Language (3): Afrikaans, English or isiXhosa (One of the languages must be the language of instruction)"],
      careerOpportunities: ["Teaching in Foundation Phase (Grade R-3)"],
    },
    {
      id: "cput-bachelor-education-intermediate-phase",
      name: "Bachelor of Education: Intermediate Phase Teaching",
      faculty: "Education",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
      },
      additionalRequirements: ["Home Language (4): Afrikaans, English or isiXhosa; First Additional Language (3): Afrikaans, English or isiXhosa (One of the languages must be the language of instruction)"],
      careerOpportunities: ["Teaching in Intermediate Phase (Grade 4-6)"],
    },
    {
      id: "cput-bachelor-education-senior-phase-fet",
      name: "Bachelor of Education: Senior Phase and Further Education & Training Teaching",
      faculty: "Education",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
      },
      additionalRequirements: ["Home Language (4): Afrikaans, English or isiXhosa; First Additional Language (3): Afrikaans, English or isiXhosa (One of the languages must be the language of instruction)"],
      careerOpportunities: ["Teaching in Senior Phase (Grade 7-9) and Further Education & Training (Grade 10-12)"],
    },
    {
      id: "cput-diploma-grade-r-teaching",
      name: "Diploma in Grade R Teaching",
      faculty: "Education",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
      },
      additionalRequirements: ["Matric with ECD Level (4) and/or (5); Experience with age groups 4-6 years; Matric with Educare Level (5)"],
      careerOpportunities: ["Grade R teaching"],
    },
    {
      id: "cput-diploma-early-childhood-care-education",
      name: "Diploma in Early Childhood Care and Education",
      faculty: "Education",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
      },
      additionalRequirements: ["Matric with ECD Level (4) and/or (5); Experience with age groups 4-6 years; Matric with Educare Level (5)"],
      careerOpportunities: ["Early Childhood Development teaching"],
    },

    // Informatics & Design
    {
      id: "cput-diploma-architectural-technology",
      name: "Diploma in Architectural Technology",
      faculty: "Informatics & Design",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
      },
      careerOpportunities: ["Architectural firms", "Property developers", "Government departments"],
    },
    {
      id: "cput-diploma-interior-design",
      name: "Diploma in Interior Design",
      faculty: "Informatics & Design",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
      },
      careerOpportunities: ["Property developers", "Interior design firms", "Architecture firms", "Self-employment"],
    },
    {
      id: "cput-diploma-fashion",
      name: "Diploma in Fashion",
      faculty: "Informatics & Design",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
      },
      careerOpportunities: ["Clothing retail stores", "Clothing manufacturers", "Self employment"],
    },
    {
      id: "cput-diploma-visual-communication-design",
      name: "Diploma in Visual Communication Design",
      faculty: "Informatics & Design",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
      },
      careerOpportunities: ["Advertising agencies", "Design studios", "Printing and publishing houses", "Brand agencies", "In-house design", "Desk top publishing", "Promotional design", "Illustration", "Interactive", "Freelance design"],
    },
    {
      id: "cput-diploma-product-design",
      name: "Diploma in Product Design",
      faculty: "Informatics & Design",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
      },
      careerOpportunities: ["Manufacturing companies", "Design-related fields", "Furniture design", "Special effects", "Props for the film industry"],
    },
    {
      id: "cput-diploma-jewellery-design-manufacture",
      name: "Diploma in Jewellery Design & Manufacture",
      faculty: "Informatics & Design",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
      },
      careerOpportunities: ["Jewellery retail stores", "Boutiques", "Jewellery design studios"],
    },
    {
      id: "cput-diploma-film-production",
      name: "Diploma in Film Production",
      faculty: "Informatics & Design",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
      },
      careerOpportunities: ["Feature film industry", "Commercial industry", "Video industry", "Television industry", "Sound industry"],
    },
    {
      id: "cput-diploma-photography",
      name: "Diploma in Photography",
      faculty: "Informatics & Design",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
      },
      careerOpportunities: ["Commercial photography", "News photography", "Photojournalism", "Documentary photography", "Fine art photography", "Photographic post-production"],
    },
    {
      id: "cput-diploma-journalism",
      name: "Diploma in Journalism",
      faculty: "Informatics & Design",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 3,
      },
      additionalRequirements: ["HL or FAL: 50% (Excl. English)"],
      careerOpportunities: ["Newspapers", "Magazines", "Marketing companies", "Public relations companies", "Government"],
    },
    {
      id: "cput-diploma-public-relations-communication",
      name: "Diploma in Public Relations & Communication",
      faculty: "Informatics & Design",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 2,
      },
      additionalRequirements: ["HL or FAL: 50% (Excl. English)"],
      careerOpportunities: ["Media", "Private and public companies", "Shopping malls", "Welfare groups", "Consultancies", "Government departments"],
    },
    {
      id: "cput-diploma-applications-development",
      name: "Diploma in Applications Development",
      faculty: "Informatics & Design",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
      },
      careerOpportunities: ["Information technology companies", "Computer programming", "IT business solutions", "Software development", "Systems analysis design"],
    },
    {
      id: "cput-diploma-communication-networks",
      name: "Diploma in Communication Networks",
      faculty: "Informatics & Design",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
      },
      careerOpportunities: ["Information technology companies", "Network design", "Network administration"],
    },
    {
      id: "cput-diploma-multimedia-applications",
      name: "Diploma in Multimedia Applications",
      faculty: "Informatics & Design",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
      },
      careerOpportunities: ["Electronic media design", "Website design", "Interactive media", "Virtual reality industry"],
    },
    {
      id: "cput-higher-certificate-ict",
      name: "Higher Certificate in Information & Communication Technology",
      faculty: "Informatics & Design",
      apsMin: 24,
      duration: "1 year",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
      },
      careerOpportunities: ["IT Service Desk Trainee", "IT Service Manager"],
    },
    {
      id: "cput-diploma-urban-regional-planning",
      name: "Diploma in Urban & Regional Planning",
      faculty: "Informatics & Design",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
      },
      additionalRequirements: ["Compulsory: Geography (4) or Economics (4) or Business Studies (4) or Tourism (4)"],
      careerOpportunities: ["Private planning firms", "Property developers", "Local and provincial authorities", "State departments", "Non-governmental organisations"],
    },

    // Engineering & the Built Environment
    {
      id: "cput-diploma-clothing-textile-technology",
      name: "Diploma in Clothing and Textile Technology",
      faculty: "Engineering & the Built Environment",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
      },
      careerOpportunities: ["Clothing industry", "Textile industry", "Retail sector"],
    },
    {
      id: "cput-diploma-engineering-technology-computer",
      name: "Diploma in Engineering Technology in Computer Engineering",
      faculty: "Engineering & the Built Environment",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
      },
      careerOpportunities: ["Electrical and computer engineering industry"],
    },
    {
      id: "cput-bachelor-engineering-technology-computer",
      name: "Bachelor of Engineering Technology in Computer Engineering",
      faculty: "Engineering & the Built Environment",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
      },
      careerOpportunities: ["Electrical and computer engineering industry"],
    },
  ];
}
