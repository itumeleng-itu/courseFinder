import { BaseUniversity } from "./base-university";
import type { Course } from "@/lib/types";

/**
 * Tshwane University of Technology (TUT) class
 */
export class TUT extends BaseUniversity {
  readonly id = "tut";
  readonly name = "Tshwane University of Technology";
  readonly shortName = "TUT";
  readonly website = "https://www.tut.ac.za";
  readonly logo = "/logos/tut.png";
  readonly location = {
    city: "Pretoria",
    province: "Gauteng",
    coordinates: {
      latitude: -25.7312,
      longitude: 28.1642,
    },
  };

  protected readonly _courses: Course[] = [
    // Faculty of Arts and Design
    {
      id: "tut-dip-commercial-photography",
      name: "Diploma (Commercial Photography)",
      faculty: "Faculty of Arts and Design",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english": 3,
      },
      careerOpportunities: ["Photographer employed by an organisation or doing freelance work: portraiture, advertising, fashion, press, editorial, industrial, architecture, fine art"],
    },
    {
      id: "tut-dip-fashion-design-technology",
      name: "Diploma (Fashion Design and Technology)",
      faculty: "Faculty of Arts and Design",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "english": 3,
      },
      careerOpportunities: ["Fashion designer", "Digital & Manual pattern cutter", "Digital & Manual pattern grader", "Manual and digital pattern making", "Garment technologist", "Wardrobe assistant", "Visual retail merchandiser", "Fashion retail merchandiser", "Fashion retail buyer", "Fashion entrepreneur"],
    },
    {
      id: "tut-dip-fine-applied-arts",
      name: "Diploma (Fine and Applied Arts)",
      faculty: "Faculty of Arts and Design",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "english": 3,
      },
      careerOpportunities: ["Product developer in glass/ceramics/fibre", "Designer in glass/ceramics/fibre", "Crafter in glass/ceramics/fibre", "Painter", "Sculptor", "Installation artist", "Printmaker", "Ceramist", "Fibre artist", "Glass artist", "Muralist", "Museum/gallery guide", "Museum/gallery curator", "Illustrator"],
    },
    {
      id: "tut-dip-integrated-communication-design",
      name: "Diploma (Integrated Communication Design)",
      faculty: "Faculty of Arts and Design",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
      },
      careerOpportunities: ["Design artist in the public and private sectors", "Layout artist", "Visualiser", "Illustrator", "Package designer", "Producer", "Creative director", "Art director", "Technical director", "Games designer", "Interface designer", "Interactive writer"],
    },
    {
      id: "tut-dip-interior-design",
      name: "Diploma (Interior Design)",
      faculty: "Faculty of Arts and Design",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
      },
      careerOpportunities: ["Residential design", "Office design", "Community and education design", "Healthcare design", "Architectural and interior design consultancies", "Interior stylist", "Project manager", "Shopfitter draughtsman", "Independent interior design practice"],
    },
    {
      id: "tut-dip-jewellery-design-manufacture",
      name: "Diploma (Jewellery Design and Manufacture)",
      faculty: "Faculty of Arts and Design",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "english": 3,
      },
      careerOpportunities: ["CAD designer", "Advanced bench worker", "Product developer", "Setter", "CAM practitioner", "3D wax printer technician", "Artist jeweller", "Restorer", "Jewellery retailer", "Product representative", "Caster", "Wax carver", "Jewellery renderer", "Model maker"],
    },
    {
      id: "tut-dip-motion-picture-production",
      name: "Diploma (Motion Picture Production)",
      faculty: "Faculty of Arts and Design",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
      },
      careerOpportunities: ["Film producer", "Film director", "Scriptwriter", "VFX editor", "Camera operator", "Location manager", "Production assistant", "Broadcast journalist", "Production manager", "Assistant director", "Film editor", "Cinematographer", "Lighting technician", "Programme researcher", "Sound technician", "Production coordinator"],
    },
    {
      id: "tut-dip-performing-arts-dance",
      name: "Diploma (Performing Arts) (Dance)",
      faculty: "Faculty of Arts and Design",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
      },
      careerOpportunities: ["Choreographer", "Creative entrepreneur", "Dancer", "Dance captain", "Performing Arts maker", "Performing Arts reviewer", "Theatre maker"],
    },
    {
      id: "tut-dip-performing-arts-jazz",
      name: "Diploma (Performing Arts) (Jazz Music)",
      faculty: "Faculty of Arts and Design",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
      },
      careerOpportunities: ["Choral conductor", "Chorus member", "Composer", "Creative entrepreneur", "Film-score composer", "Jazz musician", "Jingle writer", "Music producer", "Opera singer", "Performing Arts maker", "Performing Arts reviewer", "Theatre maker"],
    },
    {
      id: "tut-dip-performing-arts-opera",
      name: "Diploma (Performing Arts) (Opera)",
      faculty: "Faculty of Arts and Design",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
      },
      careerOpportunities: ["Choral conductor", "Chorus member", "Composer", "Creative entrepreneur", "Film-score composer", "Jazz musician", "Jingle writer", "Music producer", "Opera singer", "Performing Arts maker", "Performing Arts reviewer", "Theatre maker"],
    },
    {
      id: "tut-dip-performing-arts-technical",
      name: "Diploma (Performing Arts) (Technical Theatre and Design)",
      faculty: "Faculty of Arts and Design",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
      },
      careerOpportunities: ["Actor", "Applied Theatre practitioner", "Creative entrepreneur", "Director", "Lighting/sound operator", "Media performer", "Musical Theatre performer", "Performing Arts maker", "Performing Arts reviewer", "Performing Arts technician", "Physical Theatre practitioner", "Production manager", "Scriptwriter", "Stage manager", "Stage technical crew", "Theatre maker", "Theatre technician", "Voice-over artist"],
    },
    {
      id: "tut-dip-performing-arts-theatre",
      name: "Diploma (Performing Arts) (Theatre Arts and Performance)",
      faculty: "Faculty of Arts and Design",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
      },
      careerOpportunities: ["Actor", "Applied Theatre practitioner", "Creative entrepreneur", "Director", "Lighting/sound operator", "Media performer", "Musical Theatre performer", "Performing Arts maker", "Performing Arts reviewer", "Performing Arts technician", "Physical Theatre practitioner", "Production manager", "Scriptwriter", "Stage manager", "Stage technical crew", "Theatre maker", "Theatre technician", "Voice-over artist"],
    },
    {
      id: "tut-hcert-music",
      name: "Higher Certificate (Music)",
      faculty: "Faculty of Arts and Design",
      apsMin: 18,
      duration: "1 year",
      subjectRequirements: {
        "english": 3,
      },
      careerOpportunities: ["Jazz Musician", "Music Producer", "Opera Singer"],
    },

    // Faculty of Economics and Finance
    {
      id: "tut-dip-accounting",
      name: "Diploma (Accounting)",
      faculty: "Faculty of Economics and Finance",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "accounting", level: 3 },
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Financial accountant", "Auditor", "Asset manager", "Administrative service manager"],
    },
    {
      id: "tut-dip-economics",
      name: "Diploma (Economics)",
      faculty: "Faculty of Economics and Finance",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 6 },
          ],
        },
      },
      careerOpportunities: ["Consultant", "Financial analyst", "Entrepreneur", "Economist", "Banking", "Insurance", "Investment", "Public sectors in economics and financial management", "Financial and management consultant"],
    },
    {
      id: "tut-dip-financial-management",
      name: "Diploma (Financial Management)",
      faculty: "Faculty of Economics and Finance",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "accounting", level: 3 },
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Cost and pricing accountant", "Project accountant", "Management accountant", "Financial controller", "Financial accountant/controllers", "Business operations manager", "Budget controller", "Finance consultants"],
    },
    {
      id: "tut-dip-financial-planning",
      name: "Diploma (Financial Planning)",
      faculty: "Faculty of Economics and Finance",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "accounting", level: 3 },
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Junior business analysts", "Research analysts", "Financial analysts", "Business performance analysts", "Performance and monitoring assistant/manager", "Financial planner", "Finance consultants", "Investment analysts"],
    },
    {
      id: "tut-dip-internal-auditing",
      name: "Diploma (Internal Auditing)",
      faculty: "Faculty of Economics and Finance",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "accounting", level: 3 },
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Auditor"],
    },
    {
      id: "tut-dip-public-finance",
      name: "Diploma (Public Finance)",
      faculty: "Faculty of Economics and Finance",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "accounting", level: 3 },
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 4 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      careerOpportunities: ["State accountant and accountant in central and provincial government sectors", "Statutory government institutions"],
    },
    {
      id: "tut-hcert-accounting",
      name: "Higher Certificate (Accounting)",
      faculty: "Faculty of Economics and Finance",
      apsMin: 22,
      duration: "1 year",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      careerOpportunities: ["Accounting technician", "Bookkeeper", "Accounts clerk", "Tax consultant", "Financial accountant"],
    },

    // Faculty of Engineering and the Built Environment
    {
      id: "tut-bachelor-architecture",
      name: "Bachelor of Architecture",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 25,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
      },
      careerOpportunities: ["Architectural technologist", "Property inspector", "Building product consultant", "Self-employed and private architect"],
    },
    {
      id: "tut-barch-architecture-extended",
      name: "Bachelor of Architecture (Extended)",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 25,
      duration: "5 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 4 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Architectural technologist", "Property inspector", "Building product consultant", "Self-employed and private architect"],
    },
    {
      id: "tut-bgeomatics",
      name: "BGeomatics",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
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
      careerOpportunities: ["Survey technologist", "Professional topographic or engineering surveyor", "Geographic information systems practitioner", "Photogrammetrist"],
    },
    {
      id: "tut-bengtech-chemical-engineering",
      name: "BEngTech (Chemical Engineering)",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 5 },
            { subject: "technical mathematics", level: 5 },
          ],
        },
        "physical sciences": {
          alternatives: [
            { subject: "physical sciences", level: 5 },
            { subject: "technical sciences", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Chemical engineering technician and technologist", "Researcher and developer", "Fuel-cell technologist", "Consultant"],
    },
    {
      id: "tut-bengtech-civil-engineering",
      name: "BEngTech (Civil Engineering)",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 5 },
            { subject: "technical mathematics", level: 5 },
          ],
        },
        "physical sciences": {
          alternatives: [
            { subject: "physical sciences", level: 5 },
            { subject: "technical sciences", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Construction manager or supervisor", "Project manager", "Technician in civil engineering", "Technologist", "Construction company", "Local, provincial or national government"],
    },
    {
      id: "tut-bengtech-electrical-engineering",
      name: "BEngTech (Electrical Engineering)",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 5 },
            { subject: "technical mathematics", level: 5 },
          ],
        },
        "physical sciences": {
          alternatives: [
            { subject: "physical sciences", level: 5 },
            { subject: "technical sciences", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Design, planning, construction and maintenance of specialised fields systems related to electrical engineering"],
    },
    {
      id: "tut-bengtech-industrial-engineering",
      name: "BEngTech (Industrial Engineering)",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 5 },
            { subject: "technical mathematics", level: 5 },
          ],
        },
        "physical sciences": {
          alternatives: [
            { subject: "physical sciences", level: 5 },
            { subject: "technical sciences", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Professional technologist", "Technician", "Manager", "Entrepreneur", "Consultant"],
    },
    {
      id: "tut-beng-materials-engineering",
      name: "BEng (Materials Engineering) (Polymer Technology)",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 5 },
            { subject: "technical mathematics", level: 5 },
          ],
        },
        "physical sciences": {
          alternatives: [
            { subject: "physical sciences", level: 5 },
            { subject: "technical sciences", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Management of production and processing of raw material", "Manufacturing and processing of products", "Development, characterisation and quality assurance of products and raw materials", "Development of new plastic products and material", "Marketing and sales of raw materials and products"],
    },
    {
      id: "tut-bengtech-mechanical-engineering",
      name: "BEngTech (Mechanical Engineering)",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 5 },
            { subject: "technical mathematics", level: 5 },
          ],
        },
        "physical sciences": {
          alternatives: [
            { subject: "physical sciences", level: 5 },
            { subject: "technical sciences", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Mechanical technologist", "Technician", "Manager", "Entrepreneur", "Consultant"],
    },
    {
      id: "tut-dip-building-science",
      name: "Diploma (Building Science)",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
          ],
        },
        "physical sciences": {
          alternatives: [
            { subject: "physical sciences", level: 3 },
            { subject: "technical sciences", level: 3 },
          ],
        },
      },
      careerOpportunities: ["Construction manager", "technician quality surveyor", "clerk of works", "building inspector"],
    },
    {
      id: "tut-dip-civil-engineering",
      name: "Diploma (Civil Engineering)",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
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
      careerOpportunities: ["Construction manager or supervisor", "project manager", "technician in civil engineering", "technologist"],
    },
    {
      id: "tut-dip-electrical-engineering",
      name: "Diploma (Electrical Engineering)",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
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
      careerOpportunities: ["Design, planning, construction and maintenance of specialised fields systems related to electrical engineering"],
    },
    {
      id: "tut-dip-geomatics",
      name: "Diploma (Geomatics)",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 23,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 4 },
          ],
        },
        "physical sciences": {
          alternatives: [
            { subject: "physical sciences", level: 3 },
            { subject: "technical sciences", level: 3 },
          ],
        },
      },
      careerOpportunities: ["Survey technologist", "geographic information systems practitioner", "photogrammetrist"],
    },
    {
      id: "tut-dip-industrial-design",
      name: "Diploma (Industrial Design)",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 3 },
          ],
        },
      },
      careerOpportunities: ["Junior industrial designer", "member of design and development team", "junior design entrepreneur"],
    },

    // Faculty of Management Sciences
    {
      id: "tut-dip-administrative-information-management",
      name: "Diploma (Administrative Information Management)",
      faculty: "Faculty of Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 3 },
          ],
        },
      },
      careerOpportunities: ["Secretary", "administration officer", "personal assistant", "office manager"],
    },
    {
      id: "tut-dip-adventure-tourism-management",
      name: "Diploma (Adventure Tourism Management)",
      faculty: "Faculty of Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      careerOpportunities: ["Adventure specialist", "planning and presenting outdoor activities", "providing outdoor equipment", "tourism operator"],
    },
    {
      id: "tut-dip-casino-resort-management",
      name: "Diploma (Casino Resort Management)",
      faculty: "Faculty of Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      careerOpportunities: ["Casino-, hotel- and resort managers", "supervisors", "VIP hosts"],
    },
    {
      id: "tut-dip-contact-centre-management",
      name: "Diploma (Contact Centre Management)",
      faculty: "Faculty of Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 3 },
          ],
        },
      },
      careerOpportunities: ["Agent", "call centre representative", "call centre officer", "team leader", "supervisor", "functional leader", "strategic manager"],
    },
    {
      id: "tut-dip-credit-management",
      name: "Diploma (Credit Management)",
      faculty: "Faculty of Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "accounting": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 3 },
          ],
        },
      },
      careerOpportunities: ["Financial credit analyst", "accounts receivable manager", "credit and litigation coordinator", "credit/debtor clerk in banking sector"],
    },
    {
      id: "tut-dip-ecotourism-management",
      name: "Diploma (Ecotourism Management)",
      faculty: "Faculty of Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      careerOpportunities: ["Field guide", "ecotourism guide", "tour operator", "planner", "developer", "manager", "entrepreneur", "eco-destination planner", "manager at eco-lodges"],
    },
    {
      id: "tut-dip-entrepreneurship",
      name: "Diploma (Entrepreneurship)",
      faculty: "Faculty of Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 3 },
          ],
        },
      },
      careerOpportunities: ["Creating and building a business", "business training consultant", "small business development officer"],
    },
    {
      id: "tut-dip-event-management",
      name: "Diploma (Event Management)",
      faculty: "Faculty of Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      careerOpportunities: ["Events coordinator", "events planner", "events manager"],
    },
    {
      id: "tut-dip-food-operations-management",
      name: "Diploma (Food Operations Management)",
      faculty: "Faculty of Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english": 3,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 3 },
          ],
        },
      },
      careerOpportunities: ["Food Management Industries", "Hospital kitchens", "Old Age Homes", "Prison Service Hostels", "Hotels and Boarding Schools", "Banqueting and Mass Catering Chefs"],
    },
    {
      id: "tut-dip-hospitality-management",
      name: "Diploma (Hospitality Management)",
      faculty: "Faculty of Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english": 3,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 3 },
          ],
        },
      },
      careerOpportunities: ["Manager in the hospitality industry", "entrepreneur", "researcher", "chef", "food and beverage manager", "industrial catering service/accommodation manager"],
    },
    {
      id: "tut-dip-human-resource-management",
      name: "Diploma (Human Resource Management)",
      faculty: "Faculty of Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 3 },
          ],
        },
      },
      careerOpportunities: ["Training officer", "personnel officer", "personnel manager", "labour relations officer"],
    },
    {
      id: "tut-dip-marketing",
      name: "Diploma (Marketing)",
      faculty: "Faculty of Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      careerOpportunities: ["Sales consultant", "sales manager", "marketing manager", "advertising manager", "researcher", "customer services", "product manager"],
    },
    {
      id: "tut-dip-operations-management",
      name: "Diploma (Operations Management)",
      faculty: "Faculty of Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english": 3,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Inventory controller", "materials manager", "operations manager", "production analyst", "process engineer"],
    },
    {
      id: "tut-dip-retail-business-management",
      name: "Diploma (Retail Business Management)",
      faculty: "Faculty of Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      careerOpportunities: ["Merchandising and sales representative for retail suppliers and wholesalers"],
    },
    {
      id: "tut-dip-sport-management",
      name: "Diploma (Sport Management)",
      faculty: "Faculty of Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      careerOpportunities: ["Sports administrator", "club manager", "sports marketing agent", "sports development officer", "promoter", "commentator", "entrepreneur", "sales consultant", "market researcher"],
    },
    {
      id: "tut-dip-supply-chain-management",
      name: "Diploma (Supply Chain Management)",
      faculty: "Faculty of Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      careerOpportunities: ["Buyer", "materials manager", "logistics manager", "distribution manager", "warehouse manager"],
    },
    {
      id: "tut-dip-tourism-management",
      name: "Diploma (Tourism Management)",
      faculty: "Faculty of Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      careerOpportunities: ["Travel agent", "tour operator", "guest services", "tourism information services", "education and training", "sight seeing tours and recreation"],
    },
    {
      id: "tut-dip-work-study",
      name: "Diploma (Work Study)",
      faculty: "Faculty of Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english": 3,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Work-study practitioner", "management services practitioner", "business analyst", "value-chain consultant"],
    },
    {
      id: "tut-hcert-administrative-information-management",
      name: "Higher Certificate (Administrative Information Management)",
      faculty: "Faculty of Management Sciences",
      apsMin: 20,
      duration: "1 year",
      subjectRequirements: {
        "english": 3,
      },
      careerOpportunities: ["Secretary", "administration officer", "personal assistant", "office manager"],
    },
    {
      id: "tut-hcert-contact-centre-management",
      name: "Higher Certificate (Contact Centre Management)",
      faculty: "Faculty of Management Sciences",
      apsMin: 20,
      duration: "1 year",
      subjectRequirements: {
        "english": 3,
      },
      careerOpportunities: ["Agent", "call centre representative", "call centre officer", "team leader", "supervisor", "functional leader", "strategic manager"],
    },

    // Faculty of Science
    {
      id: "tut-dip-animal-sciences",
      name: "Diploma (Animal Sciences)",
      faculty: "Faculty of Science",
      apsMin: 19,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
          ],
        },
        "physical sciences": 3,
      },
      careerOpportunities: ["Animal production manager", "animal production representative", "animal production technician", "researcher farmer", "feedlot manager", "lecturer", "agricultural journalist"],
    },
    {
      id: "tut-dip-crop-production",
      name: "Diploma (Crop Production)",
      faculty: "Faculty of Science",
      apsMin: 19,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      careerOpportunities: ["Commercial crop producer", "production manager", "extension service worker"],
    },
    {
      id: "tut-dip-equine-science",
      name: "Diploma (Equine Science)",
      faculty: "Faculty of Science",
      apsMin: 19,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
          ],
        },
        "physical sciences": 3,
      },
      careerOpportunities: ["Horse-stud manager", "horse seller", "riding-school owner", "equine breeder"],
    },
    {
      id: "tut-dip-horticulture",
      name: "Diploma (Horticulture)",
      faculty: "Faculty of Science",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
        "life sciences or physical sciences or technical sciences": 3,
      },
      careerOpportunities: ["Horticulturists", "maintenance managers", "site managers", "grounds superintendents", "researchers"],
    },
    {
      id: "tut-dip-landscape-technology",
      name: "Diploma (Landscape Technology)",
      faculty: "Faculty of Science",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
        "life sciences or physical sciences or technical sciences": 3,
      },
      careerOpportunities: ["Landscape consultants", "landscape designers", "landscape contractors", "site managers", "maintenance managers", "nursery managers", "researchers"],
    },
    {
      id: "tut-dip-nature-conservation",
      name: "Diploma (Nature Conservation)",
      faculty: "Faculty of Science",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      careerOpportunities: ["Conservation manager", "conservation researcher", "environmental educationist", "eco-destination planners", "guides", "nature conservator", "hunting operator"],
    },
    {
      id: "tut-dip-wildlife-management",
      name: "Diploma (Wildlife Management)",
      faculty: "Faculty of Science",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      careerOpportunities: ["Game-farm or ranch manager", "wildlife adviser", "professional hunter", "disease control", "habitat management", "game population dynamics", "game capture and translocation"],
    },
    {
      id: "tut-hcert-forestry-management",
      name: "Higher Certificate (Forestry Management)",
      faculty: "Faculty of Science",
      apsMin: 18,
      duration: "2 years",
      subjectRequirements: {
        "english": 3,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 6 },
          ],
        },
      },
    },
    {
      id: "tut-benvironmental-health",
      name: "Bachelor of Environmental Health",
      faculty: "Faculty of Science",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Technical Mathematics", level: 4 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 4 },
            { subject: "Technical Sciences", level: 4 },
          ],
        },
        "Life Sciences": 4,
      },
      careerOpportunities: ["Environmental health practitioner", "health advisor", "air-pollution control officer", "meat inspector", "occupational hygienist", "consultant", "inspector", "environmental officer/auditor", "food safety auditor", "risk officer", "researcher"],
    },
    {
      id: "tut-bnursing",
      name: "Bachelor of Nursing",
      faculty: "Faculty of Science",
      apsMin: 27,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Technical Mathematics", level: 4 },
          ],
        },
        "Life Sciences": 4,
      },
      careerOpportunities: ["Practice as nurse and midwife in public and private health care facilities or as private nurse practitioner"],
    },
    {
      id: "tut-bpharm",
      name: "Bachelor of Pharmacy",
      faculty: "Faculty of Science",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Technical Mathematics", level: 4 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 4 },
            { subject: "Technical Sciences", level: 4 },
          ],
        },
        "Life Sciences": 4,
      },
      careerOpportunities: ["Pharmacist"],
    },
    {
      id: "tut-b-radiography-diagnostics",
      name: "Bachelor of Radiography in Diagnostics",
      faculty: "Faculty of Science",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 4 },
          ],
        },
        "physical sciences or technical sciences": 4,
        "life sciences": 4,
      },
      careerOpportunities: ["Radiographer", "radiation control officer", "medical and pharmaceutical representative"],
    },
    {
      id: "tut-b-biokinetics",
      name: "Bachelor of Health Sciences (Biokinetics)",
      faculty: "Faculty of Science",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 4 },
          ],
        },
        "physical sciences or technical sciences": 4,
        "life sciences": 4,
      },
      careerOpportunities: ["Biokineticist in Corporate Sector, Correctional Facilities, Elite and Professional Sport, Fire Services, Industry, Local Authorities, Military Bases, Military Hospitals, Police Services, Private Practices"],
    },
    {
      id: "tut-b-clinical-technology",
      name: "Bachelor of Health Sciences (Clinical Technology)",
      faculty: "Faculty of Science",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 4 },
          ],
        },
        "physical sciences or technical sciences": 4,
        "life sciences": 4,
      },
      careerOpportunities: ["Clinical technologist", "private hospitals and private practices", "cardiology", "nephrology", "reproduction", "respiratory system", "neurophysiology", "cardiovascular perfusion", "pulmonology"],
    },
    {
      id: "tut-b-medical-laboratory-science",
      name: "Bachelor of Health Sciences (Medical Laboratory Science)",
      faculty: "Faculty of Science",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 4 },
          ],
        },
        "physical sciences or technical sciences": 4,
        "life sciences": 4,
      },
      careerOpportunities: ["Medical technologist", "analysing human tissue and blood", "pathology", "histology", "virology", "blood transfusion", "laboratory work"],
    },
    {
      id: "tut-b-medical-orthotics-prosthetics",
      name: "Bachelor of Health Sciences (Medical Orthotics and Prosthetics)",
      faculty: "Faculty of Science",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 4 },
          ],
        },
        "physical sciences or technical sciences": 4,
        "life sciences": 4,
      },
      careerOpportunities: ["Medical orthotist or prosthetist", "own practice", "medical representative"],
    },
    {
      id: "tut-b-veterinary-technology",
      name: "Bachelor of Health Sciences (Veterinary Technology)",
      faculty: "Faculty of Science",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 4 },
          ],
        },
        "physical sciences or technical sciences": 4,
        "life sciences or agricultural sciences": 4,
      },
      careerOpportunities: ["Veterinary technologist", "collection and processing of samples", "diagnostic work", "research", "vaccine production"],
    },
    {
      id: "tut-dip-kinesiology-coaching-science",
      name: "Diploma (Kinesiology and Coaching Science)",
      faculty: "Faculty of Science",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english": 3,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
        "life sciences": 3,
      },
      careerOpportunities: ["Sports scientists", "sports coaches", "sports managers", "sports researchers"],
    },
    {
      id: "tut-dip-somatic-therapy",
      name: "Diploma (Somatic Therapy)",
      faculty: "Faculty of Science",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 4 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
        "life sciences": 4,
      },
      careerOpportunities: ["Health and skin care professional", "somatologist", "aromatherapist", "reflexologist", "stress-relief and relaxation therapist", "representative of cosmetic firm", "own business"],
    },
    {
      id: "tut-hcert-dental-assisting",
      name: "Higher Certificate (Dental Assisting)",
      faculty: "Faculty of Science",
      apsMin: 20,
      duration: "1 year",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 4 },
          ],
        },
      },
      careerOpportunities: ["Assisting in a dental practice", "assisting a dentist", "infection control", "stock control", "accounts"],
    },
    {
      id: "tut-bsc-industrial-chemistry",
      name: "BSc (Industrial Chemistry)",
      faculty: "Faculty of Science",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": 5,
        "physical sciences": 5,
      },
      careerOpportunities: ["Industrial Chemists", "chemical manufacturing", "mining", "building materials", "paints/coatings", "paper", "petroleum", "plastics", "advanced materials manufacturing"],
    },
    {
      id: "tut-dip-analytical-chemistry",
      name: "Diploma (Analytical Chemistry)",
      faculty: "Faculty of Science",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 4 },
          ],
        },
        "physical sciences or technical sciences": 4,
      },
      careerOpportunities: ["Chemist", "laboratory analyst", "technologist", "manufacturing and mining industries", "research industries", "forensic departments", "national science councils"],
    },
    {
      id: "tut-dip-biotechnology",
      name: "Diploma (Biotechnology)",
      faculty: "Faculty of Science",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 4 },
          ],
        },
        "physical sciences or technical sciences": 4,
        "life sciences": 3,
      },
      careerOpportunities: ["Biotechnologist or microbiologist", "industry or research labs", "microbiology", "waste management", "beverage production", "food production", "research"],
    },
    {
      id: "tut-dip-environmental-sciences",
      name: "Diploma (Environmental Sciences)",
      faculty: "Faculty of Science",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 4 },
          ],
        },
        "physical sciences or technical sciences": 4,
      },
      careerOpportunities: ["Environmental officer or environmental technologist", "government departments", "state bodies"],
    },
    {
      id: "tut-dip-fire-technology",
      name: "Diploma (Fire Technology)",
      faculty: "Faculty of Science",
      apsMin: 0,
      duration: "3 years",
      additionalRequirements: ["National Senior Certificate with bachelor’s degree or diploma endorsement", "three years’ relevant work experience", "HAZMAT Awareness", "Fire Fighter I", "HAZMAT Operational", "Fire Fighter II certificates", "proof of employment"],
      careerOpportunities: ["Fire fighter", "fire prevention officer", "fire safety officer", "station officer", "divisional officer", "emergency services manager", "officer in SANDF"],
    },
    {
      id: "tut-dip-food-technology",
      name: "Diploma (Food Technology)",
      faculty: "Faculty of Science",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 4 },
          ],
        },
        "physical sciences or technical sciences": 4,
        "life sciences": 3,
      },
      careerOpportunities: ["Food technologist", "quality controller", "researcher", "developer of new products", "food processing", "canning", "meat or fish factories", "food quality and hygiene"],
    },
    {
      id: "tut-dip-geology",
      name: "Diploma (Geology)",
      faculty: "Faculty of Science",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 4 },
          ],
        },
        "physical sciences or technical sciences": 4,
      },
      careerOpportunities: ["Engineering geologist", "geological technician or technologist", "hydro-geological consultant", "mining companies", "Department of Minerals and Energy", "Department of Water Affairs and Forestry"],
    },
    {
      id: "tut-dip-industrial-physics",
      name: "Diploma (Industrial Physics)",
      faculty: "Faculty of Science",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 4 },
          ],
        },
        "physical sciences or technical sciences": 4,
      },
      careerOpportunities: ["Photonics", "optical instrument technicians", "lens-coating technicians", "laser technicians", "vacuum technicians", "metrologists", "non-destructive testing technicians", "Nuclear Technologist"],
    },
    {
      id: "tut-dip-water-science-technology",
      name: "Diploma (Water Science and Technology)",
      faculty: "Faculty of Science",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        "english": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "technical mathematics", level: 4 },
          ],
        },
        "physical sciences or technical sciences": 4,
      },
      careerOpportunities: ["Water care technician", "water care technologist", "process controller"],
    },
    {
      id: "tut-hcert-resource-waste-management",
      name: "Higher Certificate (Resource and Waste Management)",
      faculty: "Faculty of Science",
      apsMin: 18,
      duration: "1 year",
      subjectRequirements: {
        "english": 3,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 6 },
          ],
        },
      },
      careerOpportunities: ["Water care technician", "water care technologist", "process controller"],
    },
    {
      id: "tut-hcert-water-treatment",
      name: "Higher Certificate (Water Treatment)",
      faculty: "Faculty of Science",
      apsMin: 18,
      duration: "1 year",
      subjectRequirements: {
        "english": 3,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "technical mathematics", level: 3 },
            { subject: "mathematical literacy", level: 6 },
          ],
        },
        "physical sciences or technical sciences": 3,
      },
      careerOpportunities: ["Water care technician", "water care technologist", "process controller"],
    },

    // Arts and Design
    {
      id: "tut-dip-fashion-design",
      name: "Diploma in Fashion Design and Technology",
      faculty: "Arts and Design",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "English": 3,
      },
    },
    {
      id: "tut-dip-jewellery-design",
      name: "Diploma in Jewellery Design and Manufacture",
      faculty: "Arts and Design",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "English": 3,
      },
    },

    // Economics and Finance

    // Engineering and the Built Environment
    {
      id: "tut-bengtech-chemical",
      name: "Bachelor of Engineering Technology in Chemical Engineering",
      faculty: "Engineering and the Built Environment",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Technical Mathematics", level: 5 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 5 },
            { subject: "Technical Sciences", level: 5 },
          ],
        },
      },
    },
    {
      id: "tut-bengtech-civil",
      name: "Bachelor of Engineering Technology in Civil Engineering",
      faculty: "Engineering and the Built Environment",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Technical Mathematics", level: 5 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 5 },
            { subject: "Technical Sciences", level: 5 },
          ],
        },
      },
    },
    {
      id: "tut-bengtech-electrical",
      name: "Bachelor of Engineering Technology in Electrical Engineering",
      faculty: "Engineering and the Built Environment",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Technical Mathematics", level: 5 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 5 },
            { subject: "Technical Sciences", level: 5 },
          ],
        },
      },
    },
    {
      id: "tut-bengtech-industrial",
      name: "Bachelor of Engineering Technology in Industrial Engineering",
      faculty: "Engineering and the Built Environment",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Technical Mathematics", level: 5 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 5 },
            { subject: "Technical Sciences", level: 5 },
          ],
        },
      },
    },
    {
      id: "tut-bengtech-mechanical",
      name: "Bachelor of Engineering Technology in Mechanical Engineering",
      faculty: "Engineering and the Built Environment",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Technical Mathematics", level: 5 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 5 },
            { subject: "Technical Sciences", level: 5 },
          ],
        },
      },
    },

    // Humanities
    {
      id: "tut-bed-foundation-phase",
      name: "Bachelor of Education in Foundation Phase Teaching",
      faculty: "Humanities",
      apsMin: 25,
      duration: "4 years",
      subjectRequirements: {
        "Home Language": 5,
        "First Additional Language": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
    },
    {
      id: "tut-bed-intermediate-phase",
      name: "Bachelor of Education in Intermediate Phase Teaching",
      faculty: "Humanities",
      apsMin: 25,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
    },
    {
      id: "tut-bed-senior-phase-agriculture",
      name: "Bachelor of Education in Senior Phase and Further Education and Training Teaching (Agriculture)",
      faculty: "Humanities",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Technical Mathematics", level: 4 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
        "Agricultural Sciences": 4,
      },
    },
    {
      id: "tut-bed-senior-phase-consumer-sciences",
      name: "Bachelor of Education in Senior Phase and Further Education and Training Teaching (Consumer Sciences)",
      faculty: "Humanities",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Technical Mathematics", level: 4 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
      },
    },
    {
      id: "tut-bed-senior-phase-economics",
      name: "Bachelor of Education in Senior Phase and Further Education and Training Teaching (Economic and Management Sciences)",
      faculty: "Humanities",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Technical Mathematics", level: 4 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
      },
    },
    {
      id: "tut-bed-senior-phase-it",
      name: "Bachelor of Education in Senior Phase and Further Education and Training Teaching (Information Technology)",
      faculty: "Humanities",
      apsMin: 24,
      duration: "4 years",
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
    {
      id: "tut-bed-senior-phase-mathematics",
      name: "Bachelor of Education in Senior Phase and Further Education and Training Teaching (Mathematics)",
      faculty: "Humanities",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
      },
    },
    {
      id: "tut-dip-integrated-communication",
      name: "Diploma in Integrated Communication",
      faculty: "Humanities",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
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
      id: "tut-dip-journalism",
      name: "Diploma in Journalism",
      faculty: "Humanities",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
      },
    },
    {
      id: "tut-dip-language-practice",
      name: "Diploma in Language Practice",
      faculty: "Humanities",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "South African Language": 4,
      },
    },
    {
      id: "tut-dip-law",
      name: "Diploma in Law",
      faculty: "Humanities",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
      },
    },
    {
      id: "tut-dip-legal-support",
      name: "Diploma in Legal Support",
      faculty: "Humanities",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Additional Language": 3,
      },
    },
    {
      id: "tut-dip-policing",
      name: "Diploma in Policing",
      faculty: "Humanities",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "English": 3,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Technical Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 3 },
          ],
        },
      },
    },
    {
      id: "tut-dip-public-affairs",
      name: "Diploma in Public Affairs",
      faculty: "Humanities",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "English": 3,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 3 },
          ],
        },
      },
    },
    {
      id: "tut-dip-traffic-safety",
      name: "Diploma in Traffic Safety and Municipal Police Management",
      faculty: "Humanities",
      apsMin: 20,
      duration: "3 years",
      subjectRequirements: {
        "English": 3,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Technical Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 3 },
          ],
        },
      },
    },

    // Information and Communication Technology
    {
      id: "tut-dip-computer-science",
      name: "Diploma in Computer Science",
      faculty: "Information and Communication Technology",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Technical Mathematics", level: 5 },
            { subject: "Mathematical Literacy", level: 7 },
          ],
        },
      },
    },
    {
      id: "tut-dip-computer-systems-engineering",
      name: "Diploma in Computer Systems Engineering",
      faculty: "Information and Communication Technology",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Technical Mathematics", level: 5 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 4 },
            { subject: "Technical Sciences", level: 4 },
          ],
        },
      },
    },
    {
      id: "tut-dip-informatics",
      name: "Diploma in Informatics",
      faculty: "Information and Communication Technology",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Technical Mathematics", level: 5 },
            { subject: "Mathematical Literacy", level: 7 },
          ],
        },
      },
    },
    {
      id: "tut-dip-information-technology",
      name: "Diploma in Information Technology",
      faculty: "Information and Communication Technology",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Technical Mathematics", level: 5 },
            { subject: "Mathematical Literacy", level: 7 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 3 },
            { subject: "Technical Sciences", level: 3 },
          ],
        },
      },
    },
    {
      id: "tut-dip-multimedia-computing",
      name: "Diploma in Multimedia Computing",
      faculty: "Information and Communication Technology",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Technical Mathematics", level: 5 },
            { subject: "Mathematical Literacy", level: 7 },
          ],
        },
      },
    },

    // Management Sciences
    {
      id: "tut-dip-administrative-management-finance",
      name: "Diploma in Administrative Management (Finance)",
      faculty: "Management Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Technical Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
        "Accounting": 3,
      },
    },

    // Science - Agricultural Sciences

    // Science - Health Sciences
    {
      id: "tut-bhsci-biokinetics",
      name: "Bachelor of Health Science in Biokinetics",
      faculty: "Science - Health Sciences",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Technical Mathematics", level: 4 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 4 },
            { subject: "Technical Sciences", level: 4 },
          ],
        },
        "Life Sciences": 4,
      },
    },
    {
      id: "tut-bhsci-medical-laboratory-science",
      name: "Bachelor of Health Science in Medical Laboratory Science",
      faculty: "Science - Health Sciences",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Technical Mathematics", level: 4 },
          ],
        },
        "Physical Sciences": {
          alternatives: [
            { subject: "Physical Sciences", level: 4 },
            { subject: "Technical Sciences", level: 4 },
          ],
        },
        "Life Sciences": 4,
      },
    },

    // Science - Natural Sciences
  ];

  /**
   * TUT-specific APS calculation
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
