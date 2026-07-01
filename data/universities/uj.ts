import { BaseUniversity } from "./base-university";
import type { Course } from "@/lib/types";

/**
 * University of Johannesburg (UJ) class
 */
export class UJ extends BaseUniversity {
  readonly id = "uj";
  readonly name = "University of Johannesburg";
  readonly shortName = "UJ";
  readonly website = "https://www.uj.ac.za";
  readonly logo = "/logos/uj.png";
  readonly location = {
    city: "Johannesburg",
    province: "Gauteng",
    coordinates: {
      latitude: -26.1829,
      longitude: 27.9992,
    },
  };

  protected readonly _courses: Course[] = [
    // Faculty of Art, Design and Architecture
    {
      id: "uj-b-architecture",
      name: "B Architecture",
      faculty: "Faculty of Art, Design and Architecture",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 5,
        "mathematics": 5,
      },
      careerOpportunities: ["Architectural professionals involved in shaping our built environment, from low-cost housing to sophisticated skyscrapers", "Design, technological resolution and management of the design and construction process of buildings"],
    },
    {
      id: "uj-ba-communication-design",
      name: "BA (Communication Design)",
      faculty: "Faculty of Art, Design and Architecture",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Communication Designers", "Creative thinkers and problem solvers in posters, books, magazines, corporate identity programmes, packaging and web sites"],
    },
    {
      id: "uj-ba-digital-media-design",
      name: "BA (Digital Media Design)",
      faculty: "Faculty of Art, Design and Architecture",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Interaction designers, user experience designers, user interface designers, service designers, music video designers, multimedia animators, motion graphics designers, information designers, video editors, video compositors, digital photographers, digital media consultants, creative directors"],
    },
    {
      id: "uj-ba-industrial-design",
      name: "BA (Industrial Design)",
      faculty: "Faculty of Art, Design and Architecture",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Mathematical Literacy", level: 6 },
          ],
        },
      },
      careerOpportunities: ["Industrial Designers, furniture designers, product designers"],
    },
    {
      id: "uj-ba-interior-design",
      name: "BA (Interior Design)",
      faculty: "Faculty of Art, Design and Architecture",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Mathematical Literacy", level: 6 },
          ],
        },
      },
      careerOpportunities: ["Interior Designers, spatial solutions designers"],
    },
    {
      id: "uj-ba-fashion-design",
      name: "BA (Fashion Design)",
      faculty: "Faculty of Art, Design and Architecture",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Mathematical Literacy", level: 6 },
          ],
        },
      },
      careerOpportunities: ["Fashion designer, fashion entrepreneur, pattern engineer, fashion buyer, fashion stylist"],
    },
    {
      id: "uj-ba-visual-art",
      name: "BA (Visual Art)",
      faculty: "Faculty of Art, Design and Architecture",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 4 },
            { subject: "Technical Mathematics", level: 3 },
          ],
        },
      },
      careerOpportunities: ["Professional artist, art education and training, art gallery and museum curating and management, art consulting, arts writing, art criticism, research and journalism, printmaking and print studio management, paper making and paper production design, community and arts project management, visual events management"],
    },
    {
      id: "uj-diploma-architecture",
      name: "Diploma in Architecture",
      faculty: "Faculty of Art, Design and Architecture",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 5,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Architectural Practitioners"],
    },
    {
      id: "uj-diploma-fashion-production",
      name: "Diploma in Fashion Production",
      faculty: "Faculty of Art, Design and Architecture",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 5,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      careerOpportunities: ["Business, manufacturing, retail and quality assurance aspects of the clothing industry"],
    },
    {
      id: "uj-diploma-jewellery-design",
      name: "Diploma in Jewellery Design and Manufacture",
      faculty: "Faculty of Art, Design and Architecture",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 5,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
            { subject: "technical mathematics", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Jewellery Designers and Manufacturers"],
    },

    // College of Business and Economics
    {
      id: "uj-diploma-accountancy",
      name: "Diploma in Accountancy",
      faculty: "College of Business and Economics",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Accounting Technician", "Bookkeeper", "Cost Accountant"],
    },
    {
      id: "uj-diploma-business-information-technology",
      name: "Diploma in Business Information Technology",
      faculty: "College of Business and Economics",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 6 },
          ],
        },
      },
      careerOpportunities: ["IT practitioner"],
    },
    {
      id: "uj-diploma-financial-services-operations",
      name: "Diploma in Financial Services Operations",
      faculty: "College of Business and Economics",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Financial Operations Administrator", "Operations Analyst", "Risk and Compliance Officer"],
    },
    {
      id: "uj-diploma-food-and-beverage-operations",
      name: "Diploma in Food and Beverage Operations",
      faculty: "College of Business and Economics",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Food and beverage units", "Private and executive catering", "Marketing and promotions"],
    },
    {
      id: "uj-diploma-logistics",
      name: "Diploma in Logistics",
      faculty: "College of Business and Economics",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Purchasing Manager", "Warehouse Manager"],
    },
    {
      id: "uj-diploma-marketing",
      name: "Diploma in Marketing",
      faculty: "College of Business and Economics",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Additional department selection criteria apply"],
      careerOpportunities: ["Advertising", "Brand Management", "Marketing Manager"],
    },
    {
      id: "uj-diploma-people-management",
      name: "Diploma in People Management",
      faculty: "College of Business and Economics",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Human Resource Officer", "Employee Benefits Officer", "Training and Development Officer"],
    },
    {
      id: "uj-diploma-retail-business-management",
      name: "Diploma in Retail Business Management",
      faculty: "College of Business and Economics",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Buyers", "Store Managers", "Layout Specialists"],
    },
    {
      id: "uj-diploma-small-business-management",
      name: "Diploma in Small Business Management",
      faculty: "College of Business and Economics",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Recommended that applicants show a desire to start their own business"],
      careerOpportunities: ["Entrepreneur", "Business Owner", "Business Advisor"],
    },
    {
      id: "uj-diploma-tourism-management",
      name: "Diploma in Tourism Management",
      faculty: "College of Business and Economics",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Tourism related sectors"],
    },
    {
      id: "uj-diploma-transportation-management",
      name: "Diploma in Transportation Management",
      faculty: "College of Business and Economics",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Transportation Manager"],
    },

    // Faculty of Education
    {
      id: "uj-bed-foundation-phase",
      name: "BEd Degree in Foundation Phase Teaching",
      faculty: "Faculty of Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 6,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Educator focusing on primary school teaching"],
    },
    {
      id: "uj-bed-intermediate-phase",
      name: "BEd Degree in Intermediate Phase Teaching",
      faculty: "Faculty of Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 6,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Educator focusing on primary school teaching"],
    },
    {
      id: "uj-bed-commerce-accounting",
      name: "BEd Degree in Senior Phase and Further Education and Training - Commerce Education (Accounting)",
      faculty: "Faculty of Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 6,
        "mathematics": 4,
      },
      careerOpportunities: ["Educator focusing on high school teaching"],
    },
    {
      id: "uj-bed-commerce-business",
      name: "BEd Degree in Senior Phase and Further Education and Training - Commerce Education (Business Management)",
      faculty: "Faculty of Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 6,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Educator focusing on high school teaching"],
    },
    {
      id: "uj-bed-commerce-economics",
      name: "BEd Degree in Senior Phase and Further Education and Training - Commerce Education (Economics)",
      faculty: "Faculty of Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 6,
        "mathematics": 4,
      },
      careerOpportunities: ["Educator focusing on high school teaching"],
    },
    {
      id: "uj-bed-life-orientation",
      name: "BEd Degree in Senior Phase and Further Education and Training - Life Orientation",
      faculty: "Faculty of Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 6,
      },
      careerOpportunities: ["Educator focusing on high school teaching"],
    },
    {
      id: "uj-bed-geography",
      name: "BEd Degree in Senior Phase and Further Education and Training - Geography",
      faculty: "Faculty of Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 6,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "mathematical literacy", level: 6 },
          ],
        },
        "geography": 3,
        "physical sciences": 3,
      },
      careerOpportunities: ["Educator focusing on high school teaching"],
    },
    {
      id: "uj-bed-life-sciences",
      name: "BEd Degree in Senior Phase and Further Education and Training - Life Sciences",
      faculty: "Faculty of Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 6,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "mathematical literacy", level: 6 },
          ],
        },
        "life sciences": 4,
      },
      careerOpportunities: ["Educator focusing on high school teaching"],
    },
    {
      id: "uj-bed-mathematics",
      name: "BEd Degree in Senior Phase and Further Education and Training - Mathematics",
      faculty: "Faculty of Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 6,
        "mathematics": 4,
      },
      careerOpportunities: ["Educator focusing on high school teaching"],
    },
    {
      id: "uj-bed-physical-sciences",
      name: "BEd Degree in Senior Phase and Further Education and Training - Physical Sciences",
      faculty: "Faculty of Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 6,
        "mathematics": 4,
        "physical sciences": 4,
      },
      careerOpportunities: ["Educator focusing on high school teaching"],
    },
    {
      id: "uj-bed-english",
      name: "BEd Degree in Senior Phase and Further Education and Training - English",
      faculty: "Faculty of Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 6,
      },
      careerOpportunities: ["Educator focusing on high school teaching"],
    },
    {
      id: "uj-bed-afrikaans",
      name: "BEd Degree in Senior Phase and Further Education and Training - Afrikaans",
      faculty: "Faculty of Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 6,
        "afrikaans home language": 4,
        "afrikaans first additional language": 5,
      },
      careerOpportunities: ["Educator focusing on high school teaching"],
    },
    {
      id: "uj-bed-isizulu",
      name: "BEd Degree in Senior Phase and Further Education and Training - IsiZulu",
      faculty: "Faculty of Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 6,
        "isizulu home language": 4,
        "isizulu first additional language": 5,
      },
      careerOpportunities: ["Educator focusing on high school teaching"],
    },
    {
      id: "uj-bed-sepedi",
      name: "BEd Degree in Senior Phase and Further Education and Training - Sepedi",
      faculty: "Faculty of Education",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 6,
        "sepedi home language": 4,
        "sepedi first additional language": 5,
      },
      careerOpportunities: ["Educator focusing on high school teaching"],
    },

    // Faculty of Engineering and the Built Environment
    {
      id: "uj-beng-civil",
      name: "Bachelor of Engineering (BEng) in Civil Engineering",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 5,
        "mathematics": 5,
        "physical sciences": 5,
      },
      careerOpportunities: ["Plan, design and construction of infrastructure"],
    },
    {
      id: "uj-beng-electrical",
      name: "Bachelor of Engineering (BEng) in Electrical and Electronic Engineering",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 5,
        "mathematics": 5,
        "physical sciences": 5,
      },
      careerOpportunities: ["Electronic Design, Software System Design"],
    },
    {
      id: "uj-beng-mechanical",
      name: "Bachelor of Engineering (BEng) in Mechanical Engineering",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 5,
        "mathematics": 5,
        "physical sciences": 5,
      },
      careerOpportunities: ["Designing, manufacturing, and maintenance of machines"],
    },
    {
      id: "uj-bengtech-chemical",
      name: "Bachelor of Engineering Technology (BEngTech) in Chemical Engineering",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "english first additional language": 4,
        "mathematics": 5,
        "physical sciences": 5,
      },
      careerOpportunities: ["Design and manage industrial chemical processes for the manufacturing sector"],
    },
    {
      id: "uj-bengtech-civil",
      name: "Bachelor of Engineering Technology (BEngTech) in Civil Engineering",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "english first additional language": 4,
        "mathematics": 5,
        "physical sciences": {
          alternatives: [
            { subject: "physical sciences", level: 5 },
            { subject: "technical sciences", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Plan, design and construction of infrastructure"],
    },
    {
      id: "uj-bengtech-electrical",
      name: "Bachelor of Engineering Technology (BEngTech) in Electrical Engineering",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "english first additional language": 4,
        "mathematics": 5,
        "physical sciences": 5,
      },
      careerOpportunities: ["Electronic Design, Software System Design"],
    },
    {
      id: "uj-bengtech-metallurgy",
      name: "Bachelor of Engineering Technology (BEngTech) in Extraction Metallurgy",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "english first additional language": 4,
        "mathematics": 5,
        "physical sciences": 5,
      },
      careerOpportunities: ["Manage metallurgical plants that are designed to recover and refine metals"],
    },
    {
      id: "uj-bengtech-industrial",
      name: "Bachelor of Engineering Technology (BEngTech) in Industrial Engineering",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "english first additional language": 4,
        "mathematics": 5,
        "physical sciences": {
          alternatives: [
            { subject: "physical sciences", level: 5 },
            { subject: "technical sciences", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Design and implement systems in organisations to maximise production"],
    },
    {
      id: "uj-bengtech-mechanical",
      name: "Bachelor of Engineering Technology (BEngTech) in Mechanical Engineering",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "english first additional language": 4,
        "mathematics": 5,
        "physical sciences": {
          alternatives: [
            { subject: "physical sciences", level: 5 },
            { subject: "technical sciences", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Design, manufacture and maintain industrial machines and engines"],
    },
    {
      id: "uj-bengtech-mining",
      name: "Bachelor of Engineering Technology (BEngTech) in Mining Engineering",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 23,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "english first additional language": 4,
        "mathematics": 5,
        "physical sciences": {
          alternatives: [
            { subject: "physical sciences", level: 5 },
            { subject: "technical sciences", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Select and manage the correct method of mining in specific geological environments"],
    },
    {
      id: "uj-bengtech-physical-metallurgy",
      name: "Bachelor of Engineering Technology (BEngTech) in Physical Metallurgy",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "english first additional language": 4,
        "mathematics": 5,
        "physical sciences": 5,
      },
      careerOpportunities: ["Assesses the suitability of metals for their use in metallic goods"],
    },
    {
      id: "uj-bsc-mine-surveying",
      name: "Bachelor of Mine Surveying Degree",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 23,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "english first additional language": 4,
        "mathematics": 5,
        "physical sciences": {
          alternatives: [
            { subject: "physical sciences", level: 5 },
            { subject: "technical sciences", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Advise surveying mining engineers about geological areas that can be profitably mined"],
    },
    {
      id: "uj-bsc-construction",
      name: "Bachelor of Science in Construction (BSc) Degree",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "english first additional language": 4,
        "mathematics": 5,
        "physical sciences": {
          alternatives: [
            { subject: "physical sciences", level: 5 },
            { subject: "technical sciences", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Quantity Surveyors and Construction Managers"],
    },
    {
      id: "uj-b-urban-planning",
      name: "Bachelor of Urban and Regional Planning Degree",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 27,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "english first additional language": 4,
        "mathematics": 5,
        "geography": 5,
      },
      careerOpportunities: ["The allocation and spatial organisation of land uses"],
    },
    {
      id: "uj-dip-management-services",
      name: "Diploma in Management Services",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 19,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "english first additional language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Advise on improving the efficiency and the productivity of an organisation"],
    },
    {
      id: "uj-dip-operations-management",
      name: "Diploma in Operations Management",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "english first additional language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Plan, organise and control operational activities in an organisation"],
    },

    // Faculty of Health Sciences
    {
      id: "uj-biokinetics",
      name: "Bachelor of Biokinetics",
      faculty: "Faculty of Health Sciences",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 5,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Biokineticists treat orthopaedic injuries and chronic diseases"],
    },
    {
      id: "uj-diagnostic-radiography",
      name: "Bachelor of Diagnostic Radiography",
      faculty: "Faculty of Health Sciences",
      apsMin: 31,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 5,
        "mathematics": 4,
        "physical sciences": 4,
        "life sciences": 5,
      },
      additionalRequirements: ["Technical Mathematics and Technical Sciences not accepted"],
      careerOpportunities: ["Radiographers use x-ray equipment and MRI to produce images"],
    },
    {
      id: "uj-diagnostic-ultrasound",
      name: "Bachelor of Diagnostic Ultrasound",
      faculty: "Faculty of Health Sciences",
      apsMin: 31,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 5,
        "mathematics": 4,
        "physical sciences": 4,
        "life sciences": 5,
      },
      additionalRequirements: ["Technical Mathematics and Technical Sciences not accepted"],
      careerOpportunities: ["Practitioners use high frequency sound waves to produce images"],
    },
    {
      id: "uj-nuclear-medicine",
      name: "Bachelor of Nuclear Medicine",
      faculty: "Faculty of Health Sciences",
      apsMin: 31,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 5,
        "mathematics": 4,
        "physical sciences": 4,
        "life sciences": 5,
      },
      additionalRequirements: ["Technical Mathematics and Technical Sciences not accepted"],
      careerOpportunities: ["Practitioners use radioactive substances to diagnose and treat diseases"],
    },
    {
      id: "uj-radiation-therapy",
      name: "Bachelor of Radiation Therapy",
      faculty: "Faculty of Health Sciences",
      apsMin: 31,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 5,
        "mathematics": 4,
        "physical sciences": 4,
        "life sciences": 5,
      },
      additionalRequirements: ["Technical Mathematics and Technical Sciences not accepted"],
      careerOpportunities: ["Radiation therapists use high energy radiation to treat cancer"],
    },
    {
      id: "uj-chiropractic",
      name: "Bachelor of Health Science in Chiropractic",
      faculty: "Faculty of Health Sciences",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 5,
        "mathematics": 4,
        "physical sciences": 4,
        "life sciences": 4,
      },
      additionalRequirements: ["Selection process includes questionnaire, letters of recommendation and interview"],
      careerOpportunities: ["Chiropractors treat conditions and injuries that are nerve, muscle or joint related"],
    },
    {
      id: "uj-complementary-medicine",
      name: "Bachelor of Health Science in Complementary Medicine",
      faculty: "Faculty of Health Sciences",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 5,
        "mathematics": 4,
        "physical sciences": 4,
        "life sciences": 4,
      },
      additionalRequirements: ["Assignment, clinic visit and letter of recommendation required"],
      careerOpportunities: ["Acupuncturists, health and wellness industry"],
    },
    {
      id: "uj-emergency-medical-care",
      name: "Bachelor of Health Science in Emergency Medical Care",
      faculty: "Faculty of Health Sciences",
      apsMin: 27,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 5,
        "mathematics": 4,
        "physical sciences": 4,
        "life sciences": 4,
      },
      additionalRequirements: ["Fitness assessment, phobias evaluation and medical examination"],
      careerOpportunities: ["Emergency Care Practitioners"],
    },
    {
      id: "uj-medical-lab-science",
      name: "Bachelor of Health Science in Medical Laboratory Science",
      faculty: "Faculty of Health Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 5,
        "mathematics": 4,
        "physical sciences": 4,
        "life sciences": 5,
      },
      careerOpportunities: ["Medical laboratory scientists analyse clinical specimens"],
    },
    {
      id: "uj-podiatry",
      name: "Bachelor of Health Science in Podiatry",
      faculty: "Faculty of Health Sciences",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 5,
        "mathematics": 4,
        "physical sciences": 4,
        "life sciences": 4,
      },
      careerOpportunities: ["Podiatrists deal with the examination, diagnosis, prevention and treatment of foot conditions"],
    },
    {
      id: "uj-b-nursing",
      name: "Bachelor of Nursing",
      faculty: "Faculty of Health Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
      careerOpportunities: ["Professional nurse and midwife"],
    },
    {
      id: "uj-b-optometry",
      name: "Bachelor of Optometry",
      faculty: "Faculty of Health Sciences",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Physical Sciences": 5,
        "Life Sciences": 5,
      },
      careerOpportunities: ["Optometrists providing primary eye care"],
    },
    {
      id: "uj-b-environmental-health",
      name: "Bachelor of Environmental Health",
      faculty: "Faculty of Health Sciences",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
      careerOpportunities: ["Environmental Health Practitioners, Occupational Health and Safety Officers"],
    },
    {
      id: "uj-sport-exercise-science",
      name: "Bachelor of Health Sciences in Sport and Exercise Science",
      faculty: "Faculty of Health Sciences",
      apsMin: 27,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 5,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
        "physical sciences": 4,
        "life sciences": 4,
      },
      careerOpportunities: ["Sport scientist, sport coach, fitness instructor"],
    },

    // Health Sciences
    {
      id: "uj-bachelor-sport-exercise-science",
      name: "Bachelor of Health Sciences Degree (Sport and Exercise Science)",
      faculty: "Health Sciences",
      apsMin: 27,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 5,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
        "physical sciences": 4,
        "life sciences": 4,
      },
      careerOpportunities: ["Sport scientist", "Sport coach", "Fitness instructor", "Health and life style instructor/consultant", "Performance analyst"],
    },
    {
      id: "uj-bcom-sport-management",
      name: "BCom Degree (Sport Management)",
      faculty: "Health Sciences",
      apsMin: 23,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": 4,
      },
      careerOpportunities: ["Sport Manager", "Sport Marketer", "Sport Administrator", "Sport Events Organiser", "Sport Promoter", "Coach", "Researcher", "Exercise Scientist"],
    },
    {
      id: "uj-diploma-sport-management",
      name: "Diploma (Sport Management)",
      faculty: "Health Sciences",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 3,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      careerOpportunities: ["Sports Administrator", "Facilities Manager", "Professional Coach", "Fitness Trainer", "Sports Marketer", "Sports Sponsorship Manager", "Events Manager and Marketer"],
    },

    // Humanities
    {
      id: "uj-b-social-work",
      name: "Bachelor of Social Work",
      faculty: "Humanities",
      apsMin: 31,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
      },
      careerOpportunities: ["Social Worker in Private Sector", "Welfare Organisations", "Government or Non-Governmental Organisations"],
    },
    {
      id: "uj-ba-general",
      name: "Bachelor of Arts",
      faculty: "Humanities",
      apsMin: 27,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
      },
      careerOpportunities: ["Anthropologist", "Ethicist", "Social Responsibility Officer", "Journalist", "Researcher", "Psychologist"],
    },
    {
      id: "uj-ba-language-practice",
      name: "BA with specialisation in Language Practice",
      faculty: "Humanities",
      apsMin: 27,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 5,
      },
      careerOpportunities: ["Translator", "Text editor", "Interpreter", "Language planner", "Lexicographer", "Copy writer", "Journalist"],
    },
    {
      id: "uj-ba-politics-economics-technology",
      name: "BA with specialisation in Politics, Economics and Technology",
      faculty: "Humanities",
      apsMin: 27,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 5,
        "mathematics": 4,
      },
      careerOpportunities: ["Data analyst", "Researcher", "Account manager", "Business development", "Financial operations"],
    },
    {
      id: "uj-ba-community-development-leadership",
      name: "Community Development and Leadership",
      faculty: "Humanities",
      apsMin: 27,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 5,
      },
      careerOpportunities: ["Municipalities", "Government Departments", "Non-Government Organisations"],
    },
    {
      id: "uj-ba-development-studies-extended",
      name: "Bachelor of Arts with specialisation in Development Studies (Extended)",
      faculty: "Humanities",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
      },
      additionalRequirements: ["Interviews will be conducted"],
      careerOpportunities: ["Social development practitioner", "Researcher", "Activist", "Foreign service"],
    },
    {
      id: "uj-diploma-public-relations",
      name: "Diploma in Public Relations and Communication",
      faculty: "Humanities",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 5,
      },
      careerOpportunities: ["PR Practitioner"],
    },
    {
      id: "uj-diploma-public-relations-extended",
      name: "Extended Diploma in Public Relations and Communication",
      faculty: "Humanities",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
      },
      careerOpportunities: ["PR Practitioner"],
    },

    // Law
    {
      id: "uj-ba-law",
      name: "BA (Law)",
      faculty: "Law",
      apsMin: 31,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Additional Language": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
      },
      careerOpportunities: ["Legal Advisor", "Public Administration"],
    },
    {
      id: "uj-bcom-law",
      name: "BCom (Law)",
      faculty: "Law",
      apsMin: 31,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Additional Language": 4,
        "Mathematics": 4,
      },
      careerOpportunities: ["Legal Advisor", "Commerce"],
    },
    {
      id: "uj-llb",
      name: "LLB",
      faculty: "Law",
      apsMin: 31,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Additional Language": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
      },
      careerOpportunities: ["Advocate", "Attorney", "State Advocate", "Legal Advisor", "Magistrate", "Public Prosecutor"],
    },

    // Science
    {
      id: "uj-bsc-information-technology",
      name: "Bachelor of Science in Information Technology",
      faculty: "Science",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 5,
        "mathematics": 6,
      },
      careerOpportunities: ["Systems Analyst", "Network Manager", "Programmer", "Web Developer", "Database Administrator", "Software Engineer"],
    },
    {
      id: "uj-bsc-computer-science-informatics",
      name: "Computer Science and Informatics",
      faculty: "Science",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 5,
        "mathematics": 6,
      },
      careerOpportunities: ["Systems Analyst", "Network Manager", "Programmer", "Web Developer", "Database Administrator", "Software Engineer"],
    },
    {
      id: "uj-bsc-it",
      name: "BSc (Information Technology)",
      faculty: "Science",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 6,
      },
    },
    {
      id: "uj-bsc-computer-science",
      name: "BSc (Computer Science and Informatics)",
      faculty: "Science",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 6,
      },
    },
    {
      id: "uj-bsc-actuarial-science",
      name: "BSc (Actuarial Science)",
      faculty: "Science",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 7,
      },
    },
    {
      id: "uj-bsc-biochemistry-botany",
      name: "BSc (Biochemistry and Botany)",
      faculty: "Science",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Mathematics", level: 6 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 4 },
            { subject: "Physical Sciences", level: 5 },
          ],
        },
        "Life Sciences": 4,
      },
    },

    // Faculty of Science
    {
      id: "uj-bsc-computer-science-ai",
      name: "Bachelor of Science in Computer Science and Informatics specialising in AI",
      faculty: "Faculty of Science",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 5,
        "mathematics": 7,
      },
      careerOpportunities: ["Security Architect", "Knowledge Manager", "Cyber Crime Investigator", "All-Source Analyst", "IT Investment/Portfolio Manager", "Systems Analyst", "Network Manager", "Programmer", "Web Developer", "Web Master", "Database Administrator", "Software Engineer", "Computer Graphics Designer", "Information Technology Manager", "Researcher"],
    },
    {
      id: "uj-dip-analytical-chemistry",
      name: "Diploma in Analytical Chemistry (Extended)",
      faculty: "Faculty of Science",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
          ],
        },
        "physical sciences": 4,
      },
      careerOpportunities: ["Analytical Chemists"],
    },
    {
      id: "uj-dip-biotechnology",
      name: "Diploma in Biotechnology (Extended)",
      faculty: "Faculty of Science",
      apsMin: 23,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
          ],
        },
        "physical sciences": 3,
        "life sciences": 3,
      },
      careerOpportunities: ["Biotechnologists"],
    },
    {
      id: "uj-dip-food-technology",
      name: "Diploma in Food Technology (Extended)",
      faculty: "Faculty of Science",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
          ],
        },
        "physical sciences": 3,
        "life sciences": 3,
      },
      careerOpportunities: ["Food Technologists"],
    },

    // Business and Economics
    {
      id: "uj-b-accounting-ca",
      name: "Bachelor of Accounting (CA)",
      faculty: "Business and Economics",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 5,
      },
    },
    {
      id: "uj-b-hospitality-management",
      name: "Bachelor of Hospitality Management",
      faculty: "Business and Economics",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Technical Mathematics", level: 4 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
    },
    {
      id: "uj-b-human-resource-management",
      name: "Bachelor of Human Resource Management",
      faculty: "Business and Economics",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Technical Mathematics", level: 4 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
    },
    {
      id: "uj-b-tourism-development-management",
      name: "Bachelor of Tourism Development and Management",
      faculty: "Business and Economics",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Technical Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
      },
    },
    {
      id: "uj-bcom-accounting",
      name: "BCom (Accounting)",
      faculty: "Business and Economics",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
      },
    },
    {
      id: "uj-bcom-economics-econometrics",
      name: "BCom (Economics and Econometrics)",
      faculty: "Business and Economics",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
      },
    },
    {
      id: "uj-bcom-finance",
      name: "BCom (Finance)",
      faculty: "Business and Economics",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
      },
    },
    {
      id: "uj-bcom-information-systems",
      name: "BCom (Information Systems)",
      faculty: "Business and Economics",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Technical Mathematics", level: 4 },
          ],
        },
      },
    },

    // Engineering and the Built Environment
    {
      id: "uj-beng-electrical-electronic",
      name: "BEng (Electrical and Electronic Engineering)",
      faculty: "Engineering and the Built Environment",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
    },
  ];

  /**
   * UJ-specific APS calculation
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
