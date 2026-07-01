import { BaseUniversity } from "./base-university";
import type { Course } from "@/lib/types";

/**
 * University of the Witwatersrand (Wits) class
 * Complete course listings for 2026 admissions
 */
export class Wits extends BaseUniversity {
  readonly id = "wits";
  readonly name = "University of the Witwatersrand";
  readonly shortName = "Wits";
  readonly website = "https://www.wits.ac.za";
  readonly logo = "/logos/wits.png";
  readonly location = {
    city: "Johannesburg",
    province: "Gauteng",
    coordinates: {
      latitude: -26.1929,
      longitude: 28.0305,
    },
  };

  readonly applicationDeadlines = {
    healthSciences: "2025-06-30",
    architecture: "2025-06-30",
    audiology: "2025-06-30",
    filmAndTelevision: "2025-06-30",
    speechLanguagePathology: "2025-06-30",
    allOtherProgrammes: "2025-09-30",
    residenceApplications: "2025-09-30",
  };

  readonly scholarships = [
    { aps: 51, amount: 42000, name: "University Entrance Scholarship" },
    { aps: 48, amount: 30000, name: "University Entrance Scholarship" },
    { aps: 45, amount: 15000, name: "University Entrance Scholarship" },
    { aps: 43, amount: 10000, name: "University Entrance Scholarship" },
    {
      amount: 50000,
      name: "Vice-Chancellor's Scholarship",
      description: "Top 10 matriculants",
    },
  ];

  /**
   * Wits APS Calculation:
   * - English and Mathematics get +2 bonus points
   * - Life Orientation: 80-100% = 4, 70-79% = 3, 60-69% = 2, 50-59% = 1
   * - Other subjects: 90-100% = 8, 80-89% = 7, 70-79% = 6, 60-69% = 5, 50-59% = 4, 40-49% = 3
   */
  protected readonly _courses: Course[] = [
    // Commerce, Law and Management
    {
      id: "wits-bcom-general",
      name: "Bachelor of Commerce (BCom) in the field of General",
      faculty: "Commerce, Law and Management",
      apsMin: 38,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 5,
      },
    },
    {
      id: "wits-bcom-ppe",
      name: "Bachelor of Commerce (BCom) in the field of Politics, Philosophy and Economics",
      faculty: "Commerce, Law and Management",
      apsMin: 38,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 5,
      },
    },
    {
      id: "wits-bcom-is",
      name: "Bachelor of Commerce (BCom) in the field of Information Systems",
      faculty: "Commerce, Law and Management",
      apsMin: 38,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 5,
      },
    },
    {
      id: "wits-baccsci",
      name: "Bachelor of Accounting Science (BAccSci)",
      faculty: "Commerce, Law and Management",
      apsMin: 44,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 6,
      },
    },
    {
      id: "wits-bcom-accounting",
      name: "Bachelor of Commerce (BCom) in the field of Accounting",
      faculty: "Commerce, Law and Management",
      apsMin: 38,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 5,
      },
    },
    {
      id: "wits-beconsci",
      name: "Bachelor of Economic Science (BEconSci)",
      faculty: "Commerce, Law and Management",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 7,
      },
    },
    {
      id: "wits-bcom-financial-sciences",
      name: "Bachelor of Commerce (BCom) in the field of Financial Sciences",
      faculty: "Commerce, Law and Management",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 7,
      },
    },
    {
      id: "wits-bcom-law",
      name: "Bachelor of Commerce (BCom) in the field of Law",
      faculty: "Commerce, Law and Management",
      apsMin: 43,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 5,
      },
    },
    {
      id: "wits-llb-two-year",
      name: "Two-year LLB",
      faculty: "Commerce, Law and Management",
      apsMin: 0,
      duration: "2 years",
      subjectRequirements: {
        "english home language or first additional language": 4,
      },
      additionalRequirements: ["For graduates only", "Subject to assessment criteria"],
    },
    {
      id: "wits-llb-three-year",
      name: "Three-year LLB",
      faculty: "Commerce, Law and Management",
      apsMin: 0,
      duration: "2 years",
      additionalRequirements: ["For graduates only", "Subject to assessment criteria"],
    },
    {
      id: "wits-bcom-information-systems",
      name: "Bachelor of Commerce (Information Systems)",
      faculty: "Commerce, Law and Management",
      apsMin: 38,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 5,
      },
    },

    // Faculty of Commerce, Law and Management
    {
      id: "wits-llb-four-year",
      name: "Four-year LLB",
      faculty: "Faculty of Commerce, Law and Management",
      apsMin: 46,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 6,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 5 },
            { subject: "mathematical literacy", level: 6 },
          ],
        },
      },
      additionalRequirements: ["Waitlisting for APS 40-45"],
    },

    // Faculty of Science
    {
      id: "wits-bsc-general",
      name: "Bachelor of Science (BSc) General",
      faculty: "Faculty of Science",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 4,
        "mathematics": 5,
        "physical sciences": 5,
      },
      additionalRequirements: ["National Benchmark Test (NBT) required"],
    },
    {
      id: "wits-bsc-biological-sciences",
      name: "Bachelor of Science in the field of Biological Sciences",
      faculty: "Faculty of Science",
      apsMin: 43,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 4,
        "mathematics": 5,
        "physical sciences": 5,
      },
      additionalRequirements: ["National Benchmark Test (NBT) required"],
    },
    {
      id: "wits-bsc-geographical-archaeological",
      name: "Bachelor of Science in the fields of Geographical and Archaeological Sciences",
      faculty: "Faculty of Science",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 4,
        "mathematics": 5,
        "physical sciences": 5,
      },
      additionalRequirements: ["National Benchmark Test (NBT) required"],
    },
    {
      id: "wits-bsc-geospatial",
      name: "Bachelor of Science in the field of Geospatial Sciences",
      faculty: "Faculty of Science",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 4,
        "mathematics": 5,
        "physical sciences": 5,
      },
      additionalRequirements: ["National Benchmark Test (NBT) required"],
    },
    {
      id: "wits-bsc-environmental",
      name: "Bachelor of Science in the field of Environmental Studies",
      faculty: "Faculty of Science",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 4,
        "mathematics": 5,
        "physical sciences": 5,
      },
      additionalRequirements: ["National Benchmark Test (NBT) required"],
    },
    {
      id: "wits-bsc-geological",
      name: "Bachelor of Science in the field of Geological Sciences",
      faculty: "Faculty of Science",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 4,
        "mathematics": 6,
        "physical sciences": 5,
      },
      additionalRequirements: ["National Benchmark Test (NBT) required"],
    },
    {
      id: "wits-bsc-actuarial",
      name: "Bachelor of Science in the field of Actuarial Science",
      faculty: "Faculty of Science",
      apsMin: 44,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 4,
        "mathematics": 7,
        "physical sciences": 7,
      },
      additionalRequirements: ["National Benchmark Test (NBT) required"],
    },
    {
      id: "wits-bsc-computational-applied-maths",
      name: "Bachelor of Science in the field of Computational and Applied Mathematics",
      faculty: "Faculty of Science",
      apsMin: 44,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 4,
        "mathematics": 6,
        "physical sciences": 5,
      },
      additionalRequirements: ["National Benchmark Test (NBT) required"],
    },
    {
      id: "wits-bsc-computer-science",
      name: "Bachelor of Science in the field of Computer Science",
      faculty: "Faculty of Science",
      apsMin: 44,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 4,
        "mathematics": 6,
        "physical sciences": 5,
      },
      additionalRequirements: ["National Benchmark Test (NBT) required"],
    },
    {
      id: "wits-bsc-mathematical-sciences",
      name: "Bachelor of Science in the field of Mathematical Sciences",
      faculty: "Faculty of Science",
      apsMin: 44,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 4,
        "mathematics": 7,
        "physical sciences": 7,
      },
      additionalRequirements: ["National Benchmark Test (NBT) required"],
    },
    {
      id: "wits-bsc-physical-sciences",
      name: "Bachelor of Science in the field of Physical Sciences (Chemistry/Physics)",
      faculty: "Faculty of Science",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 4,
        "mathematics": 6,
        "physical sciences": 5,
      },
      additionalRequirements: ["National Benchmark Test (NBT) required"],
    },
    {
      id: "wits-bsc-chemistry-chemical-eng",
      name: "Bachelor of Science in the field of Chemistry with Chemical Engineering",
      faculty: "Faculty of Science",
      apsMin: 43,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 4,
        "mathematics": 6,
        "physical sciences": 6,
      },
      additionalRequirements: ["National Benchmark Test (NBT) required"],
    },
    {
      id: "wits-bsc-astronomy-astrophysics",
      name: "Bachelor of Science in the field of Astronomy and Astrophysics",
      faculty: "Faculty of Science",
      apsMin: 43,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 4,
        "mathematics": 6,
        "physical sciences": 6,
      },
      additionalRequirements: ["National Benchmark Test (NBT) required"],
    },
    {
      id: "wits-bsc-applied-ecology",
      name: "Bachelor of Science in the field of Biological Sciences (Applied Ecology)",
      faculty: "Faculty of Science",
      apsMin: 43,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 5,
      },
      additionalRequirements: ["NBT required"],
      careerOpportunities: ["Agricultural Research Council (ARC)", "Biodiversity Planner", "Biology Education", "Department of Water Affairs and Forestry (DWA)", "Education Officer", "Herbaria", "Medical Research", "Nature Conversation", "Research for the Council for Scientific and Industrial Research (CSIR)", "Scientific Journalism", "Private Consulting Firms", "South African National Biodiversity Institute (SANBI)"],
    },
    {
      id: "wits-bsc-biodiversity",
      name: "Bachelor of Science in the field of Biological Sciences (Biodiversity)",
      faculty: "Faculty of Science",
      apsMin: 43,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 5,
      },
      additionalRequirements: ["NBT required"],
      careerOpportunities: ["Biodiversity Planner", "Biology Education", "Education Officer", "Private Consulting Firms", "Scientific Journalism", "Veterinary Research Institute", "Council for Scientific and Industrial Research (CSIR)", "Agricultural Research Council (ARC)", "Department of Water Affairs and Forestry (DWA)", "South African National Biodiversity Institute (SANBI)", "Nature conservation", "Museums"],
    },
    {
      id: "wits-bsc-applied-bioinformatics",
      name: "Bachelor of Science in the field of Biological Sciences (Applied Bioinformatics)",
      faculty: "Faculty of Science",
      apsMin: 43,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 5,
      },
      additionalRequirements: ["NBT required"],
      careerOpportunities: ["Biomechanics", "Biostatistics", "Conservation Genomics", "Data Management", "Drug Discovery", "Genomics", "Healthcare Scientist", "Molecular Modelling", "Pharmacogenomics", "Precision Medicine"],
    },
    {
      id: "wits-bsc-biochemistry-cell-biology",
      name: "Bachelor of Science in the field of Biological Sciences (Biochemistry and Cell Biology)",
      faculty: "Faculty of Science",
      apsMin: 43,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 5,
      },
      additionalRequirements: ["NBT required"],
      careerOpportunities: ["Analytical Biochemistry", "Biomedical Scientist", "Clinical Biochemistry", "Forensic Scientist", "Healthcare Scientist", "Industrial Enzymology", "Life Science Research Scientist", "Nanotechnologist", "Personalised Medicines", "Protein Biotechnology"],
    },
    {
      id: "wits-bsc-genetics-developmental-biology",
      name: "Bachelor of Science in the field of Biological Sciences (Genetics and Developmental Biology)",
      faculty: "Faculty of Science",
      apsMin: 43,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 5,
      },
      additionalRequirements: ["NBT required"],
      careerOpportunities: ["Clinical Research Associate", "Genetic Counselling", "Healthcare Scientist (Immunology)", "Medical Diagnostics", "Pharmacogenetics", "Plant and Animal Breeding", "Research Scientist (Life Sciences and Medical)", "Scientific and Medical Research"],
    },
    {
      id: "wits-bsc-microbiology-biotechnology",
      name: "Bachelor of Science in the field of Biological Sciences (Microbiology and Biotechnology)",
      faculty: "Faculty of Science",
      apsMin: 43,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 5,
      },
      additionalRequirements: ["NBT required"],
      careerOpportunities: ["Agricultural, Medical, Environmental and Veterinary Biotechnology", "Brewing", "Industrial Biotechnology", "Food Security", "Insecticides Research and Production", "Healthcare Scientist (Immunology)", "Microbiology", "Nanotechnology", "Pharmacology", "Production of Scientific Products", "Water Quality Research"],
    },
    {
      id: "wits-bsc-physical-sciences-chemistry",
      name: "Bachelor of Science in the field of Physical Sciences (Chemistry)",
      faculty: "Faculty of Science",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 6,
        "physical sciences": 5,
      },
      additionalRequirements: ["Waitlisting for 40-41 points"],
      careerOpportunities: ["Administrators", "Agricultural Research", "Applied Chemical Research", "Biotechnology", "Chemical Analysis", "Chemical Services", "Consultants", "Environmental Research", "Food and Drink Technology", "Forensic Science", "Forestry Research", "Hazardous Waste Management", "Materials Research", "Medical Research", "Patents", "Pesticides Industry", "Petrochemical Industry", "Personal Care Chemistry", "Sales of Scientific Equipment", "Science Publishing", "Science Teacher", "Textile Chemistry", "Water Treatment and Analysis", "Quality Control and Management"],
    },
    {
      id: "wits-bsc-physical-sciences-physics",
      name: "Bachelor of Science in the field of Physical Sciences (Physics)",
      faculty: "Faculty of Science",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 6,
        "physical sciences": 5,
      },
      additionalRequirements: ["Waitlisting for applicants with 40-41 points", "Closing date 30 September"],
      careerOpportunities: ["Communications", "Consultants and Administrators", "Education", "Environmental Science", "Law", "Physics Research", "Project Managers", "Software Engineers"],
    },

    // Faculty of Commerce, Law And Management
    {
      id: "wits-baccsc",
      name: "Bachelor of Accounting Science",
      faculty: "Faculty of Commerce, Law And Management",
      apsMin: 44,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 6,
      },
      additionalRequirements: ["Waitlisting for APS 39-43", "Closing date 30 September"],
      careerOpportunities: ["Chartered Accountant", "Fund Manager", "Internal Auditor", "Tax Specialist"],
    },
    {
      id: "wits-beconsc",
      name: "Bachelor of Economic Science",
      faculty: "Faculty of Commerce, Law And Management",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 7,
      },
      additionalRequirements: ["Waitlisting for APS 39-41", "Closing date 30 September"],
      careerOpportunities: ["Budget Analyst", "Economist", "Financial Analyst", "Industry Analyst", "Management Consultant", "Policy Analyst"],
    },
    {
      id: "wits-llb-2yr",
      name: "Bachelor of Laws (two-year stream)",
      faculty: "Faculty of Commerce, Law And Management",
      apsMin: 0,
      duration: "2 years",
      additionalRequirements: ["Must have completed a BA Law or BCom Law at Wits"],
      careerOpportunities: ["Advocate", "Arbitrator", "Attorney", "Conveyancer", "Judge", "Legal Advisor", "Legal Practitioner", "Legal, Risk and Compliance Consultant", "Magistrate", "Mediator", "Negotiator", "Professional Counsellor", "Prosecutor"],
    },
    {
      id: "wits-llb-3yr",
      name: "Bachelor of Laws (three-year stream)",
      faculty: "Faculty of Commerce, Law And Management",
      apsMin: 0,
      duration: "3 years",
      additionalRequirements: ["Undergraduate degree with at least 65% average"],
      careerOpportunities: ["Advocate", "Arbitrator", "Attorney", "Conveyancer", "Judge", "Legal Advisor", "Legal Practitioner", "Legal, Risk and Compliance Consultant", "Magistrate", "Mediator", "Negotiator", "Professional Counsellor", "Prosecutor"],
    },
    {
      id: "wits-llb-4year",
      name: "Bachelor of Laws (four-year stream)",
      faculty: "Faculty of Commerce, Law And Management",
      apsMin: 46,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 6 },
            { subject: "English First Additional Language", level: 6 },
          ],
        },
        "Math": {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Mathematical Literacy", level: 6 },
          ],
        },
      },
      additionalRequirements: ["Waitlisting for APS 40-45"],
      careerOpportunities: ["Advocate", "Arbitrator", "Attorney", "Conveyancer", "Judge", "Legal Advisor", "Legal Practitioner", "Legal, Risk and Compliance Consultant", "Magistrate", "Mediator", "Negotiator", "Professional Counsellor", "Prosecutor"],
    },

    // Faculty of Engineering and the Built Environment
    {
      id: "wits-bsc-chemical-engineering",
      name: "Bachelor of Science in Engineering in Chemical Engineering",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 42,
      duration: "4 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 5,
        "physical sciences": 5,
      },
      additionalRequirements: ["Computer literacy recommended"],
      careerOpportunities: ["Biochemical Engineer", "Environmental Engineer", "Food Processing Engineer", "Process Control Engineer", "Process Design Engineer", "Process Plant Manager", "Systems Engineer", "Technical Sales Engineer"],
    },
    {
      id: "wits-bsc-metallurgy-materials-engineering",
      name: "Bachelor of Science in Engineering in Metallurgy and Materials Engineering",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 42,
      duration: "4 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 5,
        "physical sciences": 5,
      },
      additionalRequirements: ["Waitlisting applies for applicants with Level 5 in core subjects", "Closing Date: 30 September"],
      careerOpportunities: ["Corrosion Engineer", "Extractive Metallurgist", "Failure Analysis Consultant", "Foundry Engineer", "Heat Treatment Engineer", "Metallurgical Plant Design Engineer", "Process Control Engineer", "Tribologist Materials Consultant"],
    },
    {
      id: "wits-bsc-civil-engineering",
      name: "Bachelor of Science in Engineering in Civil Engineering",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 42,
      duration: "4 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 5,
        "physical sciences": 5,
      },
      additionalRequirements: ["Waitlisting applies for applicants with Level 5 in core subjects", "Closing Date: 30 September"],
      careerOpportunities: ["Bridge Engineer", "Earthquake Design Engineer", "Consulting Engineer", "Construction Manager", "Environmental Engineer", "Geotechnical Engineer", "Hydrologist", "Structural Engineer", "Water Resource Manager"],
    },
    {
      id: "wits-bsc-electrical-engineering",
      name: "Bachelor of Science in Engineering in Electrical Engineering",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 42,
      duration: "4 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 5,
        "physical sciences": 5,
      },
      additionalRequirements: ["Waitlisting applies for applicants with Level 5 in core subjects", "Closing Date: 30 September"],
      careerOpportunities: ["Antennas Engineering", "Computer Engineer", "Control and Automation Engineer", "High Voltage Engineer", "Machines and Drives Engineer", "Power Engineer", "Power Systems Manager", "Telecommunications Engineer"],
    },
    {
      id: "wits-bsc-information-engineering",
      name: "Bachelor of Science in Engineering in Information Engineering",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 42,
      duration: "4 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 5,
        "physical sciences": 5,
      },
      additionalRequirements: ["Waitlisting applies for applicants with Level 5 in core subjects", "Closing Date: 30 September"],
      careerOpportunities: ["Computer Engineer", "Information Engineer", "Software Developer", "Software Engineer", "Software Project Manager", "Software Systems Architect", "Network Engineer", "Telecommunications Engineer", "Information Technology Consultant"],
    },
    {
      id: "wits-bengsc-biomedical-engineering",
      name: "Bachelor of Engineering Science in Biomedical Engineering",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 5,
        "physical sciences": 5,
      },
      additionalRequirements: ["Waitlisting applies for applicants with Level 5 in core subjects", "Closing Date: 30 September", "Pre-professional qualification; not eligible for professional registration alone"],
      careerOpportunities: ["Artificial organs", "Information Technology for Healthcare", "Medical Imaging System Design", "Modelling and simulation of physiological states and disease", "Therapeutic Equipment Design"],
    },
    {
      id: "wits-bengsc-digital-arts",
      name: "Bachelor of Engineering Science in Digital Arts",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 5,
        "physical sciences": 5,
      },
      additionalRequirements: ["Waitlisting applies for applicants with Level 5 in core subjects", "Closing Date: 30 September"],
      careerOpportunities: ["Animation", "Game Design", "Software Engineer", "Software Development"],
    },
    {
      id: "wits-bsc-mechanical-engineering",
      name: "Bachelor of Science in Engineering in Mechanical Engineering",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 42,
      duration: "4 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 5,
        "physical sciences": 5,
      },
      additionalRequirements: ["Waitlisting applies for applicants with Level 5 in core subjects", "Closing Date: 30 September"],
      careerOpportunities: ["Energy Engineer", "Mechanical Design and Development Engineer", "Manufacturing Engineer Systems Engineer", "Production Engineer", "Technical Marketing Manager", "Transport Engineer"],
    },
    {
      id: "wits-bsc-industrial-engineering",
      name: "Bachelor of Science in Engineering in Industrial Engineering",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 42,
      duration: "4 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 5,
        "physical sciences": 5,
      },
      additionalRequirements: ["Waitlisting applies for applicants with Level 5 in core subjects", "Closing Date: 30 September"],
      careerOpportunities: ["Enterprise Resource Planning Consultant", "Inventory Engineer", "IT Consultant", "Logistics Engineer", "Management Consultant", "Production and Operations Manager", "Process Engineer", "Quality Control Engineer", "Supply Chain Consultant", "Technical Manager"],
    },
    {
      id: "wits-bse-aeronautical-engineering",
      name: "Bachelor of Science in Engineering in Aeronautical Engineering",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 42,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 5,
        "mathematics": 5,
        "physical sciences": 5,
      },
      additionalRequirements: ["Waitlisting applies for applicants with level 5", "Closing date 30 September"],
      careerOpportunities: ["Aircraft Design Engineer", "Aircraft Systems Design Engineer", "Airline Manager", "Automotive Aerodynamics Engineer", "Research", "Production Manager", "Propulsion Engineer", "Technical Director"],
    },
    {
      id: "wits-bse-mining-engineering",
      name: "Bachelor of Science in Engineering in Mining Engineering",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 42,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 5,
        "mathematics": 5,
        "physical sciences": 5,
      },
      additionalRequirements: ["Waitlisting applies for applicants with level 5", "Closing date 30 September"],
      careerOpportunities: ["Blasting Engineer", "Consulting Mining Engineer", "Environmental, Safety and Health Manager", "Financial Analyst", "Mine Manager", "Mine Design Engineer", "Mineral Resources Manager", "Project Manager", "Rock Engineer"],
    },
    {
      id: "wits-bas",
      name: "Bachelor of Architectural Studies",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 34,
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
      additionalRequirements: ["Departmental selection", "Written and graphic exercise", "Interview may be required", "Closing date 30 June"],
      careerOpportunities: ["Architect", "Architectural Technologist", "Draughtsperson", "Landscape Designer", "Interior Designer Lecturer", "Researcher", "Urban Planner/Studies"],
    },
    {
      id: "wits-bsc-urban-regional-planning",
      name: "Bachelor of Science in Urban and Regional Planning",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 36,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 5,
        "mathematics": 5,
      },
      additionalRequirements: ["Waitlisting for APS 30-35", "Closing date 30 September"],
      careerOpportunities: ["Built Environment Analyst", "Consulting Damage Assessor", "Development and Corporate Real Estate", "Local, Provincial or National Government Planner", "Policy Analyst", "Property Management"],
    },
    {
      id: "wits-bsc-construction-studies",
      name: "Bachelor of Science in Construction Studies",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 36,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 5,
        "mathematics": 5,
      },
      additionalRequirements: ["Waitlisting for APS 30-35", "Closing date 30 September"],
      careerOpportunities: ["Careers within local Authorities and Government", "Commercial Trading as a Materials or Equipment Supplier", "Construction Management", "Project Management", "Quantity Surveying Practice", "Subcontractor in the Construction Industry"],
    },
    {
      id: "wits-bsc-property-studies",
      name: "Bachelor of Science in Property Studies",
      faculty: "Faculty of Engineering and the Built Environment",
      apsMin: 36,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 5,
        "mathematics": 5,
      },
      additionalRequirements: ["Waitlisting for APS 30-35", "Closing date 30 September"],
      careerOpportunities: ["Banking, Investment and Finance", "Built Environment Analyst Consulting", "Damage Assessor", "Development and Corporate Real Estate", "Policy Analyst Property Management", "Property Valuation"],
    },

    // Faculty of Health Sciences
    {
      id: "wits-bhsc-biokinetics",
      name: "Bachelor of Health Sciences in the field of Biokinetics",
      faculty: "Faculty of Health Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 5,
        "life sciences and/or physical sciences": 5,
      },
      additionalRequirements: ["NBT required"],
      careerOpportunities: ["Biokineticist", "Exercise and Healthcare Scientist/Researcher", "Exercise Physiologist", "Sports Massage Therapist", "Sports Scientist"],
    },
    {
      id: "wits-bhsc-biomedical-sciences",
      name: "Bachelor of Health Sciences in the field of Biomedical Sciences",
      faculty: "Faculty of Health Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 5,
        "life sciences and/or physical sciences": 5,
      },
      additionalRequirements: ["NBT required"],
      careerOpportunities: ["Biomedical Scientist", "Forensic Scientist", "Healthcare Scientist", "Medical Sales Representative", "Microbiologist", "Research Scientist", "Science Journalist/Writer"],
    },
    {
      id: "wits-bhsc-health-systems-sciences",
      name: "Bachelor of Health Sciences in the field of Health Systems Sciences",
      faculty: "Faculty of Health Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 5,
        "life sciences and/or physical sciences": 5,
      },
      additionalRequirements: ["NBT required"],
      careerOpportunities: ["Epidemiology", "Health Systems Management", "Public Health"],
    },
    {
      id: "wits-b-clinical-medical-practice",
      name: "Bachelor of Clinical Medical Practice",
      faculty: "Faculty of Health Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "mathematical literacy", level: 7 },
          ],
        },
        "life sciences and/or physical sciences": 4,
      },
      additionalRequirements: ["NBT required", "South African citizens only"],
      careerOpportunities: ["Clinical Associate"],
    },
    {
      id: "wits-bds",
      name: "Bachelor of Dental Science",
      faculty: "Faculty of Health Sciences",
      apsMin: 30,
      duration: "5 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 5,
        "Life Sciences": 5,
        "Physical Sciences": 5,
      },
      additionalRequirements: ["NBT required", "Job shadowing certificate of attendance (minimum 16 hours)", "Registration with the Health Professions Council of South Africa (HCPSA)"],
      careerOpportunities: ["Dentist"],
    },
    {
      id: "wits-b-oral-health-sciences",
      name: "Bachelor of Oral Health Sciences (Oral Hygiene)",
      faculty: "Faculty of Health Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 4 },
            { subject: "mathematical literacy", level: 7 },
          ],
        },
        "life sciences and/or physical sciences": 4,
      },
      additionalRequirements: ["NBT required", "Job shadowing certificate of attendance (minimum 16 hours)"],
      careerOpportunities: ["Oral Hygienist"],
    },
    {
      id: "wits-mbbch",
      name: "Bachelor of Medicine and Bachelor of Surgery",
      faculty: "Faculty of Health Sciences",
      apsMin: 30,
      duration: "6 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 5,
        "Life Sciences": 5,
      },
      additionalRequirements: ["NBT required"],
      careerOpportunities: ["Surgeon", "Paediatrician", "Pathologist", "Radiologist", "Family medicine practitioner"],
    },

    // Faculty of Health Science
    {
      id: "wits-bcur",
      name: "Bachelor of Nursing",
      faculty: "Faculty of Health Science",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 4 },
            { subject: "English First Additional Language", level: 4 },
          ],
        },
        "Mathematics": 4,
        "Life Sciences": 4,
      },
      additionalRequirements: ["NBT required (except for degree holders)"],
      careerOpportunities: ["General Nursing", "Child Nursing", "Intensive Care Nursing", "Nursing Education", "Nephrology Nursing", "Oncology and Palliative Nursing", "Psychiatric Nursing", "Research", "Trauma and Emergency Nursing", "Midwife"],
    },
    {
      id: "wits-bsc-occupational-therapy",
      name: "Bachelor of Science in Occupational Therapy",
      faculty: "Faculty of Health Science",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "english first additional language": 4,
        "mathematics": 4,
        "life sciences": 4,
        "physical sciences": 4,
      },
      additionalRequirements: ["NBT required", "Job shadowing certificate of attendance (minimum 16 hours)"],
      careerOpportunities: ["Aged Care Facilities", "Community Health Centres", "Home Care Services", "Hospitals and Rehabilitation Units", "Independent Living and Respite Centres", "Private Practice", "Psychiatric Clinics", "Schools and Education Facilities", "Vocational Rehabilitation Centres"],
    },
    {
      id: "wits-bpharm",
      name: "Bachelor of Pharmacy",
      faculty: "Faculty of Health Science",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 5,
        "Life Sciences": 5,
      },
      additionalRequirements: ["NBT required"],
      careerOpportunities: ["Academia and Research", "Community Pharmacy", "Hospital Pharmacy", "Industrial Pharmacy", "Managed Healthcare"],
    },
    {
      id: "wits-bsc-physiotherapy",
      name: "Bachelor of Science in Physiotherapy",
      faculty: "Faculty of Health Science",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 5,
        "mathematics": 5,
        "life sciences": 5,
        "physical sciences": 5,
      },
      additionalRequirements: ["NBT required", "Job shadowing certificate of attendance (minimum 16 hours)"],
      careerOpportunities: ["Cardiopulmonary", "Community Health", "Neuromusculo-skeletal", "Neurology", "Orthopaedic", "Paediatrics", "Sport Physiotherapy"],
    },

    // Faculty of Humanities
    {
      id: "wits-ba-general",
      name: "Bachelor of Arts (General)",
      faculty: "Faculty of Humanities",
      apsMin: 36,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Closing date 30 September", "Waitlisting for APS 30-35"],
      careerOpportunities: ["Teaching", "Writing", "Research", "Journalism", "Editing", "Publishing", "Human Resources", "Public Relations", "Diplomacy", "Non-governmental organisations", "Public sector", "Private business"],
    },
    {
      id: "wits-ba-law",
      name: "Bachelor of Arts (Law)",
      faculty: "Faculty of Humanities",
      apsMin: 43,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Math": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Closing date 30 September", "Waitlisting for APS 40-42"],
      careerOpportunities: ["Legal practice", "Human rights", "Family law"],
    },
    {
      id: "wits-ba-digital-arts",
      name: "Bachelor of Arts in Digital Arts",
      faculty: "Faculty of Humanities",
      apsMin: 36,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 5,
      },
      additionalRequirements: ["Waitlisting for APS 30-35", "Digital arts workshop", "Questionnaire"],
      careerOpportunities: ["Animator", "Game Developer", "Systems Administrator", "Game Writer", "VR Developer"],
    },
    {
      id: "wits-ba-film-television",
      name: "Bachelor of Arts in Film and Television",
      faculty: "Faculty of Humanities",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 5,
      },
      additionalRequirements: ["Waitlisting for APS 30-33", "Portfolio submission", "Interview"],
      careerOpportunities: ["Director", "Editor", "Film-Maker", "Producer", "Writer"],
    },
    {
      id: "wits-ba-fine-arts",
      name: "Bachelor of Arts in Fine Arts",
      faculty: "Faculty of Humanities",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 5,
      },
      additionalRequirements: ["Waitlisting for APS 30-33", "Questionnaire", "Portfolio of work"],
      careerOpportunities: ["Animator", "Art Historian", "Artist", "Curator", "Critic", "Designer", "Photographer", "Teacher"],
    },
    {
      id: "wits-bmus",
      name: "Bachelor of Music",
      faculty: "Faculty of Humanities",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Waitlisting for APS 30-33", "Interview", "Audition"],
      careerOpportunities: ["Arrangement", "Composing", "Conducting", "Education", "Entertainment Law", "Music Journalism", "Music Therapy", "Performance", "Radio/TV/Digital Media", "Recording Industry"],
    },
    {
      id: "wits-ba-theatre-performance",
      name: "Bachelor of Arts in Theatre and Performance",
      faculty: "Faculty of Humanities",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
        "english first additional language": 5,
      },
      additionalRequirements: ["Waitlisting for APS 30-33", "Auditions/Interviews"],
      careerOpportunities: ["Choreographer", "Critics", "Director", "Designer", "Performer", "Production and Arts Manager", "Teachers/Facilitators/Academics", "Theatre-Maker", "Theorists", "Writer"],
    },
    {
      id: "wits-bed-foundation",
      name: "Bachelor of Education: Foundation Phase Teaching",
      faculty: "Faculty of Humanities",
      apsMin: 37,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Math": {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
        "Technical Mathematics": 5,
      },
      additionalRequirements: ["Waitlisting for 34-36 APS"],
      careerOpportunities: ["Foundation Phase Teacher"],
    },
    {
      id: "wits-bed-intermediate",
      name: "Bachelor of Education: Intermediate Phase Teaching",
      faculty: "Faculty of Humanities",
      apsMin: 37,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Math": {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
        "Technical Mathematics": 5,
      },
      additionalRequirements: ["Waitlisting for 31-36 APS"],
      careerOpportunities: ["Intermediate Phase Teacher"],
    },
    {
      id: "wits-bed-senior-fet",
      name: "Bachelor of Education: Senior Phase and Further Education and Training Teaching",
      faculty: "Faculty of Humanities",
      apsMin: 37,
      duration: "4 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
      },
      additionalRequirements: ["Waitlisting for 31-36 APS"],
      careerOpportunities: ["Senior Phase Teacher", "FET Teacher"],
    },
    {
      id: "wits-baudiology",
      name: "Bachelor of Audiology",
      faculty: "Faculty of Humanities",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 4,
      },
      additionalRequirements: ["NBT required", "Waitlisting for 30-33 APS"],
      careerOpportunities: ["Community Work and Outreach", "Educational Setting", "Government Healthcare Settings", "Private Practice"],
    },
    {
      id: "wits-bslp",
      name: "Bachelor of Speech Language Pathology",
      faculty: "Faculty of Humanities",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "english home language or first additional language": 5,
        "mathematics": 4,
      },
      additionalRequirements: ["NBT required", "Waitlisting for 30-33 APS"],
      careerOpportunities: ["Community Work and Outreach", "Educational Settings", "Government Healthcare Settings", "Private Practice"],
    },
    {
      id: "wits-bsw",
      name: "Bachelor of Social Work",
      faculty: "Faculty of Humanities",
      apsMin: 36,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Waitlisting for 34-35 APS"],
      careerOpportunities: ["Marriage and Divorce Counsellor", "Substance Abuse Counsellor", "Development Planner", "Lecturer", "Personnel Manager", "Probation Officer", "Social Welfare Manager", "Social Welfare Researcher", "Social Worker"],
    },

    // Engineering and the Built Environment
    {
      id: "wits-bsc-eng-chemical",
      name: "Bachelor of Science in Engineering (Chemical Engineering)",
      faculty: "Engineering and the Built Environment",
      apsMin: 42,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "wits-bsc-eng-metallurgy",
      name: "Bachelor of Science in Engineering (Metallurgy and Materials Engineering)",
      faculty: "Engineering and the Built Environment",
      apsMin: 42,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "wits-bsc-eng-civil",
      name: "Bachelor of Science in Engineering (Civil Engineering)",
      faculty: "Engineering and the Built Environment",
      apsMin: 42,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "wits-bsc-eng-electrical",
      name: "Bachelor of Science in Engineering (Electrical Engineering)",
      faculty: "Engineering and the Built Environment",
      apsMin: 42,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "wits-bsc-biomedical-eng",
      name: "Bachelor of Science (Biomedical Engineering)",
      faculty: "Engineering and the Built Environment",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "wits-bsc-digital-arts",
      name: "Bachelor of Science (Digital Arts)",
      faculty: "Engineering and the Built Environment",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "wits-bsc-eng-aeronautical",
      name: "Bachelor of Science in Engineering (Aeronautical Engineering)",
      faculty: "Engineering and the Built Environment",
      apsMin: 42,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "wits-bsc-eng-industrial",
      name: "Bachelor of Science in Engineering (Industrial Engineering)",
      faculty: "Engineering and the Built Environment",
      apsMin: 42,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "wits-bsc-eng-mechanical",
      name: "Bachelor of Science in Engineering (Mechanical Engineering)",
      faculty: "Engineering and the Built Environment",
      apsMin: 42,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "wits-bsc-eng-mining",
      name: "Bachelor of Science in Engineering (Mining Engineering)",
      faculty: "Engineering and the Built Environment",
      apsMin: 42,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "wits-burp",
      name: "Bachelor of Science (Urban and Regional Planning)",
      faculty: "Engineering and the Built Environment",
      apsMin: 36,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 5,
      },
    },
    {
      id: "wits-bsc-construction",
      name: "Bachelor of Science (Construction Studies)",
      faculty: "Engineering and the Built Environment",
      apsMin: 36,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 5,
      },
    },
    {
      id: "wits-bsc-property",
      name: "Bachelor of Science (Property Studies)",
      faculty: "Engineering and the Built Environment",
      apsMin: 36,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 5,
      },
    },

    // Health Sciences
    {
      id: "wits-bsc-biomedical-sciences",
      name: "Bachelor of Science (Biomedical Sciences)",
      faculty: "Health Sciences",
      apsMin: 0,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 5,
        "Life Sciences": 5,
      },
      additionalRequirements: ["NBT by 18 August 2025"],
    },
    {
      id: "wits-bsc-biokinetics",
      name: "Bachelor of Science (Biokinetics)",
      faculty: "Health Sciences",
      apsMin: 0,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 5,
        "Life Sciences": 5,
      },
      additionalRequirements: ["NBT by 18 August 2025"],
    },
    {
      id: "wits-bsc-health-systems",
      name: "Bachelor of Science (Health Systems Sciences Clinical Medical Practice)",
      faculty: "Health Sciences",
      apsMin: 0,
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
            { subject: "Mathematics", level: 4 },
            { subject: "Mathematical Literacy", level: 7 },
          ],
        },
        "Life Sciences": 4,
      },
      additionalRequirements: ["NBT by 18 August 2025"],
    },
    {
      id: "wits-bohs",
      name: "Bachelor of Oral Health Sciences",
      faculty: "Health Sciences",
      apsMin: 0,
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
            { subject: "Mathematics", level: 4 },
            { subject: "Mathematical Literacy", level: 7 },
          ],
        },
        "Life Sciences": 4,
      },
      additionalRequirements: ["NBT by 18 August 2025, Job shadowing certificate (minimum 16 hours) between 1-31 July"],
    },

    // Humanities
    {
      id: "wits-ba-theatre",
      name: "Bachelor of Arts (Theatre and Performance)",
      faculty: "Humanities",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Audition, Portfolio or Written Assignment"],
    },
    {
      id: "wits-ba-film-tv",
      name: "Bachelor of Arts (Film and Television)",
      faculty: "Humanities",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Audition, Portfolio or Written Assignment"],
    },
    {
      id: "wits-bed-senior",
      name: "Bachelor of Education (Senior Phase and FET Teaching)",
      faculty: "Humanities",
      apsMin: 37,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Teaching subjects are compulsory: Physical Sciences, Life Sciences, Engineering Graphics & Design, Geography, History, IsiZulu, Sesotho, IT, Mechanical Technology, Mathematics 65%, Technical Mathematics 65%"],
    },
    {
      id: "wits-ba-speech-language",
      name: "Bachelor of Arts (Speech-Language Pathology)",
      faculty: "Humanities",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 4,
      },
      additionalRequirements: ["NBT by 18 August 2025"],
    },
    {
      id: "wits-ba-audiology",
      name: "Bachelor of Arts (Audiology)",
      faculty: "Humanities",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 4,
      },
      additionalRequirements: ["NBT by 18 August 2025"],
    },

    // Science
    {
      id: "wits-bsc-biological",
      name: "Bachelor of Science (Biological Sciences)",
      faculty: "Science",
      apsMin: 43,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 5,
      },
      additionalRequirements: ["NBT by 31 October 2025"],
    },
    {
      id: "wits-bsc-computational-maths",
      name: "Bachelor of Science (Computational and Applied Mathematics)",
      faculty: "Science",
      apsMin: 44,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 6,
      },
      additionalRequirements: ["NBT by 31 October 2025"],
    },
    {
      id: "wits-bsc-materials-science",
      name: "Bachelor of Science (Materials Science)",
      faculty: "Science",
      apsMin: 43,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English Home Language", level: 5 },
            { subject: "English First Additional Language", level: 5 },
          ],
        },
        "Mathematics": 6,
        "Physical Sciences": 5,
      },
      additionalRequirements: ["NBT by 31 October 2025"],
    },
  ];

  /**
   * Calculate APS for Wits-specific rules
   * @param subjects Object containing subject names and percentages
   * @returns Total APS score
   */
  calculateAPS(subjects: Record<string, number>): number {
    let totalAPS = 0;
    const apsScale = [
      { min: 90, max: 100, points: 8 },
      { min: 80, max: 89, points: 7 },
      { min: 70, max: 79, points: 6 },
      { min: 60, max: 69, points: 5 },
      { min: 50, max: 59, points: 4 },
      { min: 40, max: 49, points: 3 },
      { min: 30, max: 39, points: 0 },
      { min: 0, max: 29, points: 0 },
    ];

    const lifeOrientationScale = [
      { min: 80, max: 100, points: 4 },
      { min: 70, max: 79, points: 3 },
      { min: 60, max: 69, points: 2 },
      { min: 50, max: 59, points: 1 },
      { min: 0, max: 49, points: 0 },
    ];

    for (const [subject, percentage] of Object.entries(subjects)) {
      let points = 0;

      // Life Orientation special scoring (max 4 points)
      if (subject.toLowerCase().includes("life orientation")) {
        const scale = lifeOrientationScale.find(
          (s) => percentage >= s.min && percentage <= s.max,
        );
        points = scale ? scale.points : 0;
      }
      // English and Mathematics get +2 bonus
      else if (
        subject.toLowerCase().includes("english") ||
        subject.toLowerCase().includes("mathematics")
      ) {
        const scale = apsScale.find(
          (s) => percentage >= s.min && percentage <= s.max,
        );
        const basePoints = scale ? scale.points : 0;
        points = basePoints + 2; // Add 2 bonus points
      }
      // All other subjects
      else {
        const scale = apsScale.find(
          (s) => percentage >= s.min && percentage <= s.max,
        );
        points = scale ? scale.points : 0;
      }

      totalAPS += points;
    }

    return totalAPS;
  }

  /**
   * Get university statistics
   */
  getStats() {
    return {
      academics: 1667,
      employees: 5935,
      jointStaff: 2308,
      faculties: 5,
      schools: 33,
      courses: "over 3000",
      students: 38128,
      femalePercentage: 59,
      firstGenerationPercentage: 33,
      acceptanceRate: "6,000 out of 80,000 applicants",
      worldRanking: "Top 1% globally",
    };
  }

  /**
   * Get funding and financial aid information
   */
  getFundingInfo() {
    return {
      nsfas: {
        maxIncome: 350000,
        website: "https://www.nsfas.org.za",
        description: "Households with maximum annual income of R350,000",
      },
      otherFunding: {
        maxIncome: 600000,
        description:
          "Households with maximum annual income of R350,000 to R600,000 must complete online applications",
      },
      fundingSources: [
        "Self-funding",
        "Parent, Guardian / Religious Groups",
        "Bank Loan",
        "Bursaries",
        "NSFAS",
      ],
      note: "Don't forget to allocate funds for a monthly allowance or income to cover your personal expenses while studying",
    };
  }

  /**
   * Get residence information
   */
  getResidenceInfo() {
    return {
      numberOfResidences: 14,
      ratio: "1 in 5 Witsies live in residence",
      applicationDeadline: "2025-09-30",
      features: [
        "Modern, secure, professionally managed",
        "Well-maintained facilities",
        "One of the most rewarding experiences of university journey",
      ],
    };
  }

  /**
   * Wits-specific APS calculation
   * Based on Wits 2026 Undergraduate Prospectus
   *
   * Key differences from standard APS:
   * - English and Mathematics receive +2 bonus points each
   * - Life Orientation uses a 4-point scale (not the standard 7-point scale)
   * - Top 6 subjects excluding Life Orientation
   */
  calculateApsScore(subjects: Record<string, number>): number {
    const subjectScores: number[] = [];

    for (const [subjectName, percentage] of Object.entries(subjects)) {
      const normalizedName = subjectName.toLowerCase();

      // Life Orientation uses special 4-point scale
      if (normalizedName.includes("life orientation")) {
        if (percentage >= 80) subjectScores.push(4);
        else if (percentage >= 70) subjectScores.push(3);
        else if (percentage >= 60) subjectScores.push(2);
        else if (percentage >= 50) subjectScores.push(1);
        else subjectScores.push(0);
        continue;
      }

      // Standard 8-point scale for other subjects
      let points = 0;
      if (percentage >= 90) points = 8;
      else if (percentage >= 80) points = 7;
      else if (percentage >= 70) points = 6;
      else if (percentage >= 60) points = 5;
      else if (percentage >= 50) points = 4;
      else if (percentage >= 40) points = 3;
      else if (percentage >= 30) points = 2;
      else if (percentage >= 0) points = 1;

      // Add +2 bonus for English and Mathematics
      if (
        normalizedName.includes("english") ||
        normalizedName.includes("mathematics")
      ) {
        points += 2;
      }

      subjectScores.push(points);
    }

    // Sort descending and take top 6 subjects
    subjectScores.sort((a, b) => b - a);
    const top6 = subjectScores.slice(0, 6);

    return top6.reduce((sum, score) => sum + score, 0);
  }

  /**
   * Get scholarship information
   */
  getSportsFacilities() {
    return {
      sportingCodes: "Over 30",
      facilities: [
        "Two Olympic sized swimming pools",
        "Artificial hockey turf & futsal courts",
        "Wits Fitness & Wellness Centre",
        "Hard-court sports to field sports",
        "Martial arts and aquatics",
      ],
      brianZylstraComplex: {
        value: "250 million rands",
        openingYear: 2026,
        features: [
          "State-of-the-art training facilities",
          "Biokinetics rooms",
          "Outdoor training areas",
          "Sports residences with 44-bed apartments",
          "Chill lounges",
          "Olympic-size pool for elite training",
        ],
      },
    };
  }

  /**
   * Get Digital Dome information
   */
  getDigitalDomeInfo() {
    return {
      name: "Wits Anglo American Digital Dome",
      description:
        "State-of-the-art multidisciplinary facility with infinite possibilities",
      experience: "360° immersive experience for visitors of all ages",
      purpose: [
        "Modern teaching venue",
        "Collaborative research space",
        "Visualize scientific work",
      ],
      showSchedule: {
        startDate: "2025-02-01",
        days: "Tuesdays to Fridays",
        times: ["10:00 AM", "11:30 AM", "1:00 PM"],
      },
      website: "https://digitaldome.wits.ac.za",
    };
  }

  /**
   * Get Gateway to Success program information
   */
  getGatewayToSuccessInfo() {
    return {
      name: "Gateway to Success (GTS)",
      duration: "2 weeks",
      mandatory: true,
      target: "All new first-year students",
      format: "Blended (on-campus and online)",
      components: {
        academicSkills: [
          "Digital skills",
          "Academic writing",
          "Academic integrity",
          "Ulwazi online learning platform",
          "Faculty-specific offerings",
        ],
        campusActivities: [
          "Student wellness",
          "Holistic personal development",
          "Support services",
          "Appreciation of diversity",
          "Culture and social responsibility",
          "Community-building",
        ],
      },
    };
  }

  /**
   * Get contact information
   */
  getContactInfo() {
    return {
      callCentre: "011 717 1888",
      email: "ask.wits@wits.ac.za",
      website: "https://www.wits.ac.za",
      applicationWebsite: "https://www.wits.ac.za/undergraduate/apply-to-wits",
      virtualTour: "Available on website",
      chatbot: "Kudubot",
    };
  }

  /**
   * Get notable alumni information
   */
  getNotableAlumni() {
    return [
      { name: "Robert Brozin", company: "Nando's (founder)" },
      { name: "Adrian Gore", company: "Discovery (CEO)" },
      { name: "Maurice Radebe" },
      { name: "Joanne Joseph" },
      { name: "Thuli Madonsela", role: "Former Public Protector" },
      { name: "Thuso Mbedu", role: "Actress" },
    ];
  }
}
