import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * Central University of Technology (CUT) class
 */
export class CUT extends BaseUniversity {
  readonly id = "cut"
  readonly name = "Central University of Technology"
  readonly shortName = "CUT"
  readonly website = "https://www.cut.ac.za"
  readonly logo = "/logos/cut.png"
  readonly location = {
    city: "Bloemfontein",
    province: "Free State",
    coordinates: {
      latitude: -29.1188,
      longitude: 26.2147,
    },
  }

  readonly campuses = [
    {
      name: "Bloemfontein Campus",
      address: "20 President Brand Street, Bloemfontein, 9300",
      telephone: "+27 (0) 51 507 3911",
    },
    {
      name: "Welkom Campus",
      address: "Welkom, Free State",
      telephone: "+27 (0) 57 910 3500",
    },
  ]

  readonly apsCalculationInfo = `
    • Only seven (7) subjects can be used to calculate the student's APS
    • English, Mathematics, Science and Life Orientation are compulsory
    • Life Orientation is counted as 1 point
  `

  protected readonly _courses: Course[] = [
    // Faculty of Health & Environmental Science
    {
      id: "cut-clinical-technology",
      name: "Bachelor of Health Sciences in Clinical Technology",
      faculty: "Health & Environmental Science",
      apsMin: 30,
      duration: "4 years",
      campus: "Bloemfontein",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
        "Life Sciences": 5,
        English: 4,
      },
      additionalRequirements:
        "Students should have any two of the following subjects: Mathematics, Physical Sciences, Life Sciences",
      careers: [
        "Cardiology",
        "Pulmonology",
        "Critical care",
        "Nephrology",
        "Reproductive Biology",
        "Perfusion",
        "Neurophysiology",
      ],
      notes:
        "Qualified Clinical Technologists are employed in government or private practice selecting one of the seven specialisation areas",
    },
    {
      id: "cut-agricultural-management",
      name: "Diploma in Agricultural Management",
      faculty: "Health & Environmental Science",
      apsMin: 27,
      duration: "3 years",
      campus: "Bloemfontein",
      subjectRequirements: {},
      additionalRequirements:
        "Students should have any two of the following subjects: Agricultural Science, Life Sciences, Physical Science, Mathematics/Mathematical Literacy, Accountancy or Economics",
      careers: [
        "Farming/Farm manager",
        "Agricultural Scientists",
        "Research technicians",
        "Banking",
        "Seed & fertilizer companies",
        "Crop insurance",
        "Teaching",
      ],
      notes:
        "Potential employers include OVK, GWK, ARC, Land Bank & Standard Bank, Dairy Bell, Pannar, Omnia, Sidi Perani, Pioneer du Pont, Santam Agri",
    },
    {
      id: "cut-somatology",
      name: "Diploma in Somatology",
      faculty: "Health & Environmental Science",
      apsMin: 27,
      duration: "3 years",
      campus: "Bloemfontein",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
        "Life Sciences": 5,
        English: 4,
      },
      additionalRequirements: "Students should have Physical or Life Sciences",
      careers: [
        "Beauty or spa therapist",
        "Therapist on cruise ships",
        "Assistant to medical practitioners",
        "Spa manager",
        "Sales representative in health and beauty",
        "Researcher/lecturer",
      ],
      notes:
        "Career opportunities include Medical Aesthetics and Skin care, Slimming and body wellness, Alternative therapies, and Remedial therapies",
    },
    {
      id: "cut-medical-laboratory-sciences",
      name: "Bachelor of Health Sciences in Medical Laboratory Sciences",
      faculty: "Health & Environmental Science",
      apsMin: 30,
      duration: "4 years",
      campus: "Bloemfontein",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
        "Life Sciences": 5,
        English: 4,
      },
      careers: [
        "Clinical Analysis",
        "Immunology",
        "Drug testing",
        "Hematology",
        "Microbiology",
        "Molecular diagnostics",
        "Histopathology",
        "Cytopathology",
      ],
      notes:
        "Qualified Biomedical Technologists are employed in private pathology practices, South African National Blood Service (SANBS), National Health Laboratory Service (NHLS), Medical Research Council (MRC)",
    },
    {
      id: "cut-dental-assistant",
      name: "Higher Certificate in Dental Assisting",
      faculty: "Health & Environmental Science",
      apsMin: 27,
      duration: "1 year",
      campus: "Bloemfontein",
      subjectRequirements: {
        Mathematics: 3,
        "Mathematical Literacy": 6,
        "Information Technology": 5,
        English: 5,
      },
      additionalRequirements:
        "A minimum mark of 40% in Mathematics or 60% in Mathematical Literacy or Information Technology. For English, a minimum mark of 50%",
      careers: ["Dental assistant"],
      notes:
        "Career opportunities in private and public sector, military, medical aid companies, and dental product companies",
    },
    {
      id: "cut-environmental-health",
      name: "Bachelor of Health Sciences in Environmental Health",
      faculty: "Health & Environmental Science",
      apsMin: 30,
      duration: "4 years",
      campus: "Bloemfontein",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
        "Life Sciences": 5,
        English: 5,
      },
      careers: [
        "Environmental health practitioner",
        "Meat inspector",
        "Waste management officer",
        "Occupational health and safety officer",
        "Port Health officer",
      ],
      notes:
        "Career opportunities in municipalities, Department of Health, abattoirs, construction companies, private and public sectors",
    },
    {
      id: "cut-radiography",
      name: "Bachelor of Radiography in Diagnostics",
      faculty: "Health & Environmental Science",
      apsMin: 30,
      duration: "4 years",
      campus: "Bloemfontein",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
        "Life Sciences": 5,
        English: 4,
      },
      careers: [
        "Radiographers in diagnostic",
        "Therapy",
        "Nuclear medicine",
        "Ultrasound",
        "Representatives",
        "Lecturers",
        "Researchers",
      ],
      notes:
        "Career opportunities in X-ray departments of private and public hospitals in South Africa and abroad, representatives for companies providing x-ray equipment, and universities",
    },

    // Faculty of Engineering, Built Environment, and Information Technology
    {
      id: "cut-civil-engineering-diploma",
      name: "Diploma in Engineering Technology in Civil Engineering",
      faculty: "Engineering, Built Environment & Information Technology",
      apsMin: 27,
      duration: "2 years",
      campus: "Bloemfontein",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
        English: 4,
      },
      additionalRequirements: "Mathematical Literacy will NOT be accepted",
      careers: ["Technician in Civil Engineering"],
      notes:
        "Career opportunities in construction and building industry, consulting engineering industry, research institutions, entrepreneurial enterprises, governmental departments, local authorities & municipalities, water boards, national road & transportation agencies (SANRAL)",
    },
    {
      id: "cut-civil-engineering-bachelor",
      name: "Bachelor of Engineering Technology in Civil Engineering",
      faculty: "Engineering, Built Environment & Information Technology",
      apsMin: 32,
      duration: "3 years",
      campus: "Bloemfontein",
      subjectRequirements: {
        Mathematics: 6,
        "Physical Sciences": 5,
        English: 5,
      },
      additionalRequirements: "Mathematical Literacy will NOT be accepted",
      careers: ["Technologist", "Engineer in Civil Engineering"],
      notes:
        "Career opportunities in construction and building industry, consulting engineering industry, research institutions, entrepreneurial enterprises, governmental departments, local authorities & municipalities, water boards, national road & transportation agencies (SANRAL)",
    },
    {
      id: "cut-construction-certificate",
      name: "Higher Certificate in Construction",
      faculty: "Engineering, Built Environment & Information Technology",
      apsMin: 27,
      duration: "1 year",
      campus: "Bloemfontein",
      subjectRequirements: {
        Mathematics: 3,
        "Mathematical Literacy": 6,
        English: 4,
      },
      careers: ["Construction Technician"],
      notes:
        "Career opportunities in governmental departments, local authorities and municipalities, contractors, consultants",
    },
    {
      id: "cut-construction-management",
      name: "Bachelor of Construction in Construction Management",
      faculty: "Engineering, Built Environment & Information Technology",
      apsMin: 32,
      duration: "3 years",
      campus: "Bloemfontein",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
        English: 5,
      },
      careers: ["Construction Manager"],
      notes:
        "Career opportunities in governmental departments, local authorities and municipalities, contractors, consultants",
    },
    {
      id: "cut-health-safety-management",
      name: "Bachelor of Construction in Health and Safety Management",
      faculty: "Engineering, Built Environment & Information Technology",
      apsMin: 32,
      duration: "3 years",
      campus: "Bloemfontein",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
        English: 5,
      },
      careers: ["Health and Safety Manager"],
      notes:
        "Career opportunities in governmental departments, local authorities and municipalities, contractors, consultants",
    },
    {
      id: "cut-electrical-engineering-diploma",
      name: "Diploma in Engineering Technology in Electrical Engineering",
      faculty: "Engineering, Built Environment & Information Technology",
      apsMin: 27,
      duration: "2 years",
      campus: "Bloemfontein",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
        English: 4,
      },
      additionalRequirements: "Mathematical Literacy will NOT be accepted",
      careers: ["Technician in Electrical Engineering"],
      notes:
        "Career opportunities in automation, mining, transportation, reparations & maintenance, medical electrical technicians, sound and stage, data programmer. Potential employers include Rockwell automation, Siemens, ABB, Schneider, Allen Bradley, Honeywell, hospitals, theatres, MTN, VODACOM, TELKOM, Space agency, TV, ESKOM",
    },
    {
      id: "cut-electrical-engineering-bachelor",
      name: "Bachelor of Engineering Technology in Electrical Engineering",
      faculty: "Engineering, Built Environment & Information Technology",
      apsMin: 32,
      duration: "3 years",
      campus: "Bloemfontein",
      subjectRequirements: {
        Mathematics: 6,
        "Physical Sciences": 5,
        English: 5,
      },
      additionalRequirements: "Mathematical Literacy will NOT be accepted",
      careers: ["Technologist", "Engineer in Electrical Engineering"],
      notes:
        "Career opportunities in automation, mining, transportation, reparations & maintenance, medical electrical technicians, sound and stage, data programmer. Potential employers include Rockwell automation, Siemens, ABB, Schneider, Allen Bradley, Honeywell, hospitals, theatres, MTN, VODACOM, TELKOM, Space agency, TV, ESKOM",
    },
    {
      id: "cut-mechanical-engineering-diploma",
      name: "Diploma in Engineering Technology in Mechanical Engineering",
      faculty: "Engineering, Built Environment & Information Technology",
      apsMin: 27,
      duration: "2 years",
      campus: "Bloemfontein",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
        English: 4,
      },
      additionalRequirements: "Mathematical Literacy will NOT be accepted",
      careers: ["Technician in Mechanical Engineering"],
      notes:
        "Career opportunities in maintenance in mining, steel production, petrochemical, manufacturing and power generation. Potential employers include Columbus Stainless Steel, Arcelor Mittal, Sasol, PetroSA, Ford, Nissan, Toyota, Denel, BHP Billiton, Anglo American",
    },
    {
      id: "cut-mechanical-engineering-bachelor",
      name: "Bachelor of Engineering Technology in Mechanical Engineering",
      faculty: "Engineering, Built Environment & Information Technology",
      apsMin: 32,
      duration: "3 years",
      campus: "Bloemfontein",
      subjectRequirements: {
        Mathematics: 6,
        "Physical Sciences": 5,
        English: 5,
      },
      additionalRequirements: "Mathematical Literacy will NOT be accepted",
      careers: ["Technologist", "Engineer in Mechanical Engineering", "Project Engineer"],
      notes:
        "Career opportunities in maintenance in mining, steel production, petrochemical, manufacturing and power generation, develop, design and testing of mechanical devices. Potential employers include Columbus Stainless Steel, Arcelor Mittal, Sasol, PetroSA, Ford, Nissan, Toyota, Denel, BHP Billiton, Anglo American",
    },
    {
      id: "cut-quantity-surveying",
      name: "Bachelor of Construction in Quantity Surveying",
      faculty: "Engineering, Built Environment & Information Technology",
      apsMin: 32,
      duration: "3 years",
      campus: "Bloemfontein",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
        English: 5,
      },
      careers: ["Quantity Surveyor"],
      notes:
        "Career opportunities in governmental departments, local authorities and municipalities, contractors, consultants",
    },
    {
      id: "cut-renewable-energy",
      name: "Higher Certificate in Renewable Energy Technologies",
      faculty: "Engineering, Built Environment & Information Technology",
      apsMin: 27,
      duration: "1 year",
      campus: "Bloemfontein",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
        English: 4,
      },
      careers: ["Renewable Energy Technician"],
      notes:
        "Technicians will be able to assist technologists and engineers in the installation, commissioning and maintenance of RET systems. Potential employers include power generation companies, ESKOM, municipalities, independent power producers",
    },
    {
      id: "cut-it-certificate",
      name: "Higher Certificate in Information Technology",
      faculty: "Engineering, Built Environment & Information Technology",
      apsMin: 27,
      duration: "1 year",
      campus: ["Bloemfontein", "Welkom"],
      subjectRequirements: {
        Mathematics: 4,
        "Mathematical Literacy": 6,
        English: 4,
      },
      careers: ["IT Support Technician"],
      notes: "After completion, students may continue on to engineering and other STEM-related programmes",
    },
    {
      id: "cut-computer-networking",
      name: "Diploma in Computer Networking",
      faculty: "Engineering, Built Environment & Information Technology",
      apsMin: 27,
      duration: "3 years",
      campus: "Bloemfontein",
      subjectRequirements: {
        Mathematics: 4,
        "Mathematical Literacy": 6,
        English: 4,
      },
      careers: [
        "IT Network Technician/Technologist",
        "IT Network Analyst/Developer/Manager",
        "IT Network Infrastructure Analyst/Developer/Manager",
        "IT Network Project Leader",
      ],
      notes: "Career opportunities in any company, business, industry, governmental institution with a network",
    },
    {
      id: "cut-information-technology",
      name: "Diploma in Information Technology",
      faculty: "Engineering, Built Environment & Information Technology",
      apsMin: 27,
      duration: "3 years",
      campus: ["Bloemfontein", "Welkom"],
      subjectRequirements: {
        Mathematics: 4,
        "Mathematical Literacy": 6,
        English: 4,
      },
      careers: [
        "Software Analyst/Developer/Manager",
        "System Analyst/Developer/Manager",
        "Programming Analyst/Developer/Manager",
        "Web Analyst/Developer/Manager",
        "Mobile Application Analyst/Developer/Manager",
        "Database Analyst/Developer/Manager",
        "IT Project Leader",
      ],
      notes: "Career opportunities in any company, business, industry, governmental institution with IT needs",
    },
    {
      id: "cut-hydrology",
      name: "Bachelor of Science in Hydrology and Water Resources Management",
      faculty: "Engineering, Built Environment & Information Technology",
      apsMin: 28,
      duration: "3 years",
      campus: "Bloemfontein",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
        English: 5,
      },
      careers: ["Hydrologist", "Water Resources Manager", "Research Assistant"],
      notes:
        "Career opportunities in consulting engineering/environmental industry, mining industry, research institutions, entrepreneurial enterprises, governmental departments, local authorities and municipalities, water boards",
    },
    {
      id: "cut-mathematics-engineering",
      name: "Higher Certificate in Mathematics for Engineering Technology",
      faculty: "Engineering, Built Environment & Information Technology",
      apsMin: 25,
      duration: "1 year",
      campus: "Bloemfontein",
      subjectRequirements: {},
      additionalRequirements:
        "Minimum Senior Certificate (SC), National Senior Certificate (NSC) or the National Certificate (Vocational) (NCV) with appropriate subject combinations and levels of achievement",
      careers: ["Access to STEM-related qualifications"],
      notes: "After completion, students may continue on to engineering and other STEM-related programmes",
    },
  ]
}
