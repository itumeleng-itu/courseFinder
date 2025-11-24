import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * University of the Free State (UFS) class
 */
export class UFS extends BaseUniversity {
  readonly id = "ufs"
  readonly name = "University of the Free State"
  readonly shortName = "UFS"
  readonly website = "https://www.ufs.ac.za"
  readonly logo = "/logos/ufs.png"
  readonly location = {
    city: "Bloemfontein",
    province: "Free State",
    coordinates: {
      latitude: -29.1076,
      longitude: 26.1857,
    },
  }

  protected readonly _courses: Course[] = [
    // Faculty of Economic and Management Sciences
    {
      id: "ufs-badmin",
      name: "Bachelor of Administration (BAdmin)",
      faculty: "Economic and Management Sciences",
      department: "Public Sector Management",
      apsMin: 28,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
        Mathematics: 2,
      },
      alternativeRequirements: "Mathematical Literacy at Level 5 (60%) is acceptable as alternative to Mathematics",
      additionalRequirements: "Meeting minimum requirements does not guarantee admission due to limited space",
      careerOpportunities: [
        "Public Administration",
        "Government Management",
        "Municipal Management",
        "Policy Analysis",
        "Public Service",
      ],
    },
    {
      id: "ufs-bcom",
      name: "Bachelor of Commerce (BCom)",
      faculty: "Economic and Management Sciences",
      department: "Private Sector Management",
      apsMin: 28,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
      },
      careerOpportunities: ["Business Management", "Financial Management", "Marketing", "Human Resources", "Economics"],
    },
    {
      id: "ufs-bcom-economics",
      name: "BCom with specialisation in Economics",
      faculty: "Economic and Management Sciences",
      department: "Private Sector Management",
      apsMin: 28,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
      },
      careerOpportunities: ["Economic Analysis", "Financial Services", "Government Economics", "Research", "Banking"],
    },
    {
      id: "ufs-bcom-finance",
      name: "BCom with specialisation in Finance",
      faculty: "Economic and Management Sciences",
      department: "Private Sector Management",
      apsMin: 28,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
      },
      careerOpportunities: [
        "Financial Planning",
        "Investment Banking",
        "Corporate Finance",
        "Risk Management",
        "Financial Analysis",
      ],
    },
    {
      id: "ufs-bcom-analytics",
      name: "BCom with specialisation in Business and Financial Analytics",
      faculty: "Economic and Management Sciences",
      department: "Private Sector Management",
      apsMin: 34,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
        Mathematics: 5,
      },
      careerOpportunities: [
        "Data Analytics",
        "Business Intelligence",
        "Financial Modeling",
        "Quantitative Analysis",
        "Risk Analytics",
      ],
    },
    {
      id: "ufs-bcom-marketing",
      name: "BCom with specialisation in Marketing",
      faculty: "Economic and Management Sciences",
      department: "Private Sector Management",
      apsMin: 28,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
      },
      careerOpportunities: [
        "Marketing Management",
        "Digital Marketing",
        "Brand Management",
        "Market Research",
        "Advertising",
      ],
    },
    {
      id: "ufs-bcom-business",
      name: "BCom with specialisation in Business Management",
      faculty: "Economic and Management Sciences",
      department: "Private Sector Management",
      apsMin: 28,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
      },
      careerOpportunities: [
        "General Management",
        "Operations Management",
        "Strategic Planning",
        "Entrepreneurship",
        "Consulting",
      ],
    },
    {
      id: "ufs-bcom-hr",
      name: "BCom with specialisation in Human Resource Management",
      faculty: "Economic and Management Sciences",
      department: "Private Sector Management",
      apsMin: 28,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
      },
      careerOpportunities: [
        "Human Resources Management",
        "Talent Acquisition",
        "Training and Development",
        "Labour Relations",
        "Organizational Development",
      ],
    },
    {
      id: "ufs-bcom-law",
      name: "BCom (Law)",
      faculty: "Economic and Management Sciences",
      department: "Private Sector Management",
      apsMin: 33,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
      },
      careerOpportunities: ["Corporate Law", "Business Law", "Legal Consulting", "Compliance", "Commercial Law"],
    },
    {
      id: "ufs-bacc",
      name: "Bachelor of Accounting (BAcc)",
      faculty: "Economic and Management Sciences",
      department: "Professional Accountants",
      apsMin: 34,
      duration: "4 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
        Mathematics: 5,
      },
      additionalRequirements: "SAICA accredited programme for aspiring Chartered Accountants",
      careerOpportunities: [
        "Chartered Accountant (CA)",
        "Auditing",
        "Financial Reporting",
        "Tax Consulting",
        "Corporate Finance",
      ],
    },
    {
      id: "ufs-bcom-accounting",
      name: "BCom (Accounting)",
      faculty: "Economic and Management Sciences",
      department: "Professional Accountants",
      apsMin: 28,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
      },
      careerOpportunities: [
        "General Accounting",
        "Management Accounting",
        "Financial Accounting",
        "Cost Accounting",
        "Bookkeeping",
      ],
    },

    // Faculty of Education
    {
      id: "ufs-bed-foundation",
      name: "Bachelor of Education in Foundation Phase Teaching",
      faculty: "Education",
      department: "Foundation Phase",
      apsMin: 30,
      duration: "4 years",
      studyMode: "Full-time",
      campus: "Bloemfontein/Qwaqwa/South",
      subjectRequirements: {
        English: 4,
      },
      additionalRequirements: "Specialisation options: Afrikaans HL, Sesotho HL, isiZulu HL, English HL",
      careerOpportunities: [
        "Foundation Phase Teacher (Grades R-3)",
        "Early Childhood Development",
        "Educational Specialist",
        "Curriculum Development",
        "Educational Management",
      ],
    },
    {
      id: "ufs-bed-intermediate",
      name: "Bachelor of Education in Intermediate Phase Teaching",
      faculty: "Education",
      department: "Intermediate Phase",
      apsMin: 30,
      duration: "4 years",
      studyMode: "Full-time",
      campus: "Bloemfontein/Qwaqwa",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
      },
      additionalRequirements: "Various specialisation combinations available",
      careerOpportunities: [
        "Intermediate Phase Teacher (Grades 4-6)",
        "Subject Specialist",
        "Educational Coordinator",
        "Curriculum Advisor",
        "School Management",
      ],
    },
    {
      id: "ufs-bed-senior",
      name: "Bachelor of Education in Senior and FET Phase Teaching",
      faculty: "Education",
      department: "Senior and FET Phase",
      apsMin: 30,
      duration: "4 years",
      studyMode: "Full-time",
      campus: "Bloemfontein/Qwaqwa",
      subjectRequirements: {
        English: 4,
      },
      additionalRequirements: "Subject combinations include Mathematics, Sciences, Languages, and Social Sciences",
      careerOpportunities: [
        "High School Teacher (Grades 7-12)",
        "Subject Head",
        "Educational Leadership",
        "Curriculum Development",
        "Educational Research",
      ],
    },

    // Faculty of Health Sciences
    {
      id: "ufs-mbchb",
      name: "Bachelor of Medicine and Bachelor of Surgery (MB ChB)",
      faculty: "Health Sciences",
      department: "Clinical Medicine",
      apsMin: 36,
      duration: "6 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Life Sciences": 5,
        "Physical Sciences": 5,
      },
      additionalRequirements: "Subject to selection. Closing date: 31 May 2025",
      careerOpportunities: [
        "Medical Doctor",
        "Specialist Physician",
        "Surgeon",
        "General Practitioner",
        "Medical Research",
      ],
    },
    {
      id: "ufs-bmedsci",
      name: "Bachelor of Medical Science with specialisation in Radiation Science (BMedSc)",
      faculty: "Health Sciences",
      department: "Clinical Medicine",
      apsMin: 30,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 5,
        Mathematics: 5,
        "Life Sciences": 5,
        "Physical Sciences": 5,
      },
      additionalRequirements: "Subject to selection",
      careerOpportunities: [
        "Radiographer",
        "Medical Imaging Specialist",
        "Radiation Therapy",
        "Nuclear Medicine",
        "Medical Technology",
      ],
    },
    {
      id: "ufs-boptom",
      name: "Bachelor of Optometry (BOptom)",
      faculty: "Health Sciences",
      department: "Health and Rehabilitation Sciences",
      apsMin: 33,
      duration: "4 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 5,
        Mathematics: 4,
        "Life Sciences": 5,
        "Physical Sciences": 5,
      },
      additionalRequirements: "Subject to selection. Closing date: 31 May 2025",
      careerOpportunities: [
        "Optometrist",
        "Eye Care Specialist",
        "Vision Therapy",
        "Contact Lens Specialist",
        "Low Vision Rehabilitation",
      ],
    },
    {
      id: "ufs-bsc-physio",
      name: "Bachelor of Science in Physiotherapy",
      faculty: "Health Sciences",
      department: "Health and Rehabilitation Sciences",
      apsMin: 33,
      duration: "4 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 5,
        Mathematics: 4,
        "Life Sciences": 5,
        "Physical Sciences": 4,
      },
      additionalRequirements: "Subject to selection. Closing date: 31 May 2025",
      careerOpportunities: [
        "Physiotherapist",
        "Sports Rehabilitation",
        "Neurological Rehabilitation",
        "Pediatric Physiotherapy",
        "Private Practice",
      ],
    },
    {
      id: "ufs-bsc-dietetics",
      name: "Bachelor of Science in Dietetics",
      faculty: "Health Sciences",
      department: "Health and Rehabilitation Sciences",
      apsMin: 33,
      duration: "4 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 5,
        Mathematics: 4,
        "Life Sciences": 5,
        "Physical Sciences": 4,
      },
      additionalRequirements: "Subject to selection. Closing date: 31 May 2025",
      careerOpportunities: [
        "Dietitian",
        "Clinical Nutrition",
        "Sports Nutrition",
        "Community Nutrition",
        "Food Service Management",
      ],
    },
    {
      id: "ufs-boccther",
      name: "Bachelor of Occupational Therapy (BOccTher)",
      faculty: "Health Sciences",
      department: "Health and Rehabilitation Sciences",
      apsMin: 33,
      duration: "4 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 5,
        Mathematics: 4,
        "Life Sciences": 5,
        "Physical Sciences": 4,
      },
      additionalRequirements: "Subject to selection. Closing date: 31 May 2025",
      careerOpportunities: [
        "Occupational Therapist",
        "Rehabilitation Specialist",
        "Pediatric Therapy",
        "Mental Health Therapy",
        "Community Health",
      ],
    },
    {
      id: "ufs-bbiok",
      name: "Bachelor of Biokinetics (BBiok)",
      faculty: "Health Sciences",
      department: "Health and Rehabilitation Sciences",
      apsMin: 30,
      duration: "4 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 5,
        Mathematics: 4,
        "Life Sciences": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: "Subject to selection. Closing date: 31 May 2025",
      careerOpportunities: [
        "Biokineticist",
        "Exercise Specialist",
        "Sports Science",
        "Rehabilitation",
        "Wellness Programs",
      ],
    },
    {
      id: "ufs-bsportcoach",
      name: "Bachelor of Sport Coaching (B SportCoach)",
      faculty: "Health Sciences",
      department: "Health and Rehabilitation Sciences",
      apsMin: 30,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
      },
      additionalRequirements: "Subject to selection. Closing date: 31 May 2025",
      careerOpportunities: [
        "Sports Coach",
        "Athletic Development",
        "Sports Management",
        "Performance Analysis",
        "Youth Development",
      ],
    },
    {
      id: "ufs-bnursing",
      name: "Bachelor of Nursing",
      faculty: "Health Sciences",
      department: "Nursing",
      apsMin: 30,
      duration: "4 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
        "Mathematical Literacy": 6,
        "Life Sciences": 5,
        "Physical Sciences": 4,
      },
      additionalRequirements: "Subject to selection. Closing date: 31 July 2025",
      careerOpportunities: [
        "Professional Nurse",
        "Clinical Specialist",
        "Community Health Nurse",
        "Nurse Manager",
        "Nurse Educator",
      ],
    },

    // Faculty of Law
    {
      id: "ufs-llb",
      name: "Bachelor of Laws (LLB)",
      faculty: "Law",
      department: "Law",
      apsMin: 33,
      duration: "4 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 6,
        Mathematics: 4,
        "Mathematical Literacy": 6,
      },
      alternativeRequirements: "Either Mathematics (50%) or Mathematical Literacy (70%) required",
      careerOpportunities: [
        "Attorney",
        "Advocate",
        "Legal Advisor",
        "Magistrate",
        "Corporate Legal Counsel",
        "Prosecutor",
        "Academic Law",
      ],
    },

    // Faculty of Natural and Agricultural Sciences - BSc Programs
    {
      id: "ufs-bsc-biological",
      name: "Bachelor of Science specialising in Biological Sciences",
      faculty: "Natural and Agricultural Sciences",
      department: "Biological Sciences",
      apsMin: 32,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein/Qwaqwa",
      subjectRequirements: {
        English: 4,
        Mathematics: 5,
        "Life Sciences": 5,
        "Physical Sciences": 5,
      },
      additionalRequirements:
        "Various major combinations available including Biochemistry, Botany, Genetics, Microbiology, Zoology",
      careerOpportunities: [
        "Research Scientist",
        "Biotechnology",
        "Environmental Consulting",
        "Laboratory Technologist",
        "Conservation Biology",
      ],
    },
    {
      id: "ufs-bsc-forensic",
      name: "Bachelor of Science specialising in Forensic Science",
      faculty: "Natural and Agricultural Sciences",
      department: "Biological Sciences",
      apsMin: 34,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
        Mathematics: 6,
        "Life Sciences": 6,
        "Physical Sciences": 5,
      },
      additionalRequirements:
        "Subject to selection. Minimum cumulative AP of 17 for Maths, Life Sciences, and Physical Sciences. No criminal record allowed",
      careerOpportunities: [
        "Forensic Scientist",
        "Crime Scene Investigation",
        "Laboratory Analysis",
        "Expert Witness",
        "Law Enforcement",
      ],
    },
    {
      id: "ufs-bsc-mathematical",
      name: "Bachelor of Science specialising in Mathematical Sciences",
      faculty: "Natural and Agricultural Sciences",
      department: "Mathematical Sciences",
      apsMin: 32,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
        Mathematics: 6,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["Mathematician", "Data Scientist", "Actuarial Science", "Research", "Financial Analysis"],
    },
    {
      id: "ufs-bsc-actuarial",
      name: "Bachelor of Science specialising in Actuarial Sciences",
      faculty: "Natural and Agricultural Sciences",
      department: "Mathematical Sciences",
      apsMin: 34,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
        Mathematics: 6,
      },
      additionalRequirements: "Subject to selection based on academic performance",
      careerOpportunities: ["Actuary", "Risk Management", "Insurance", "Investment Analysis", "Financial Consulting"],
    },
    {
      id: "ufs-bsc-chemical",
      name: "Bachelor of Science specialising in Chemical Sciences",
      faculty: "Natural and Agricultural Sciences",
      department: "Chemical Sciences",
      apsMin: 32,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein/Qwaqwa",
      subjectRequirements: {
        English: 4,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: [
        "Chemist",
        "Chemical Engineer",
        "Research and Development",
        "Quality Control",
        "Environmental Chemistry",
      ],
    },
    {
      id: "ufs-bsc-physical",
      name: "Bachelor of Science specialising in Physical Sciences",
      faculty: "Natural and Agricultural Sciences",
      department: "Physical Sciences",
      apsMin: 32,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
        Mathematics: 6,
        "Physical Sciences": 5,
      },
      careerOpportunities: [
        "Physicist",
        "Research Scientist",
        "Engineering Physics",
        "Astrophysics",
        "Medical Physics",
      ],
    },
    {
      id: "ufs-bsc-engineering",
      name: "Bachelor of Science specialising in Physical Sciences with Engineering Subjects",
      faculty: "Natural and Agricultural Sciences",
      department: "Physical Sciences",
      apsMin: 30,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
        Mathematics: 6,
        "Physical Sciences": 5,
      },
      additionalRequirements: "Subject to selection",
      careerOpportunities: [
        "Engineering Physics",
        "Technical Consulting",
        "Research and Development",
        "Industrial Physics",
        "Technology Development",
      ],
    },
    {
      id: "ufs-bsc-geography",
      name: "Bachelor of Science specialising in Geography",
      faculty: "Natural and Agricultural Sciences",
      department: "Geography",
      apsMin: 32,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein/Qwaqwa",
      subjectRequirements: {
        English: 4,
        Mathematics: 5,
        "Life Sciences": 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: [
        "Geographer",
        "Environmental Consultant",
        "GIS Specialist",
        "Urban Planning",
        "Climate Research",
      ],
    },
    {
      id: "ufs-bsc-geology",
      name: "Bachelor of Science specialising in Geology",
      faculty: "Natural and Agricultural Sciences",
      department: "Geology",
      apsMin: 30,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["Geologist", "Mining Industry", "Environmental Geology", "Hydrogeology", "Geochemistry"],
    },
    {
      id: "ufs-bsc-it",
      name: "Bachelor of Science in Information Technology",
      faculty: "Natural and Agricultural Sciences",
      department: "Computer Science and Informatics",
      apsMin: 32,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein/Qwaqwa",
      subjectRequirements: {
        English: 4,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: [
        "Software Developer",
        "Systems Analyst",
        "IT Consultant",
        "Database Administrator",
        "Network Specialist",
      ],
    },
    {
      id: "ufs-bcis",
      name: "Bachelor of Computer Information Systems",
      faculty: "Natural and Agricultural Sciences",
      department: "Computer Science and Informatics",
      apsMin: 30,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
      },
      careerOpportunities: [
        "Information Systems Analyst",
        "Business Analyst",
        "IT Project Manager",
        "Systems Designer",
        "Technology Consultant",
      ],
    },
    {
      id: "ufs-bsfs",
      name: "Bachelor of Sustainable Food Systems",
      faculty: "Natural and Agricultural Sciences",
      department: "Sustainable Food Systems",
      apsMin: 30,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
        Mathematics: 2,
      },
      alternativeRequirements: "Mathematical Literacy at Level 5 (60%) acceptable",
      careerOpportunities: [
        "Food Systems Specialist",
        "Sustainability Consultant",
        "Food Security Analyst",
        "Agricultural Development",
        "Environmental Management",
      ],
    },

    // Agricultural Sciences
    {
      id: "ufs-bagric",
      name: "Bachelor of Agriculture",
      faculty: "Natural and Agricultural Sciences",
      department: "Agricultural Sciences",
      apsMin: 30,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
        Mathematics: 3,
      },
      alternativeRequirements: "Mathematical Literacy at Level 7 (80%) acceptable if AP is 31 or above",
      additionalRequirements:
        "Various majors available including Animal Production, Crop Production, Mixed Farming, Agricultural Extension",
      careerOpportunities: [
        "Farm Manager",
        "Agricultural Consultant",
        "Extension Officer",
        "Agricultural Economist",
        "Agribusiness",
      ],
    },
    {
      id: "ufs-bsc-agric",
      name: "Bachelor of Science in Agriculture",
      faculty: "Natural and Agricultural Sciences",
      department: "Agricultural Sciences",
      apsMin: 32,
      duration: "4 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
        Mathematics: 5,
        "Life Sciences": 5,
        "Physical Sciences": 5,
      },
      additionalRequirements: "Majors include Animal Science, Agronomy, Soil Science, Plant Breeding, Plant Pathology",
      careerOpportunities: [
        "Agricultural Scientist",
        "Research and Development",
        "Plant Breeding",
        "Soil Science",
        "Agricultural Technology",
      ],
    },
    {
      id: "ufs-bsc-agric-econ",
      name: "Bachelor of Science in Agricultural Economics",
      faculty: "Natural and Agricultural Sciences",
      department: "Agricultural Economics",
      apsMin: 32,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
        Mathematics: 5,
      },
      careerOpportunities: [
        "Agricultural Economist",
        "Market Analyst",
        "Policy Analyst",
        "Agricultural Finance",
        "Development Economics",
      ],
    },

    // Building Sciences
    {
      id: "ufs-barch",
      name: "Bachelor of Architecture",
      faculty: "Natural and Agricultural Sciences",
      department: "Architecture",
      apsMin: 30,
      duration: "5 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
        Mathematics: 4,
      },
      additionalRequirements: "Subject to selection. Portfolio and selection form required. Closing date: 31 July 2025",
      careerOpportunities: [
        "Architect",
        "Urban Designer",
        "Building Designer",
        "Project Manager",
        "Construction Management",
      ],
    },
    {
      id: "ufs-bsc-construction",
      name: "Bachelor of Science in Construction Economics and Management",
      faculty: "Natural and Agricultural Sciences",
      department: "Quantity Surveying and Construction Management",
      apsMin: 30,
      duration: "4 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
        Mathematics: 5,
      },
      additionalRequirements: "Subject to selection",
      careerOpportunities: [
        "Quantity Surveyor",
        "Construction Manager",
        "Project Manager",
        "Cost Consultant",
        "Property Developer",
      ],
    },

    // Faculty of The Humanities
    {
      id: "ufs-ba-general",
      name: "Bachelor of Arts (General)",
      faculty: "The Humanities",
      department: "Humanities",
      apsMin: 30,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein/Qwaqwa",
      subjectRequirements: {
        English: 4,
      },
      additionalRequirements:
        "Various major combinations available including Languages, History, Philosophy, Psychology, Political Science",
      careerOpportunities: ["Education", "Media and Communications", "Public Service", "Research", "Cultural Heritage"],
    },
    {
      id: "ufs-ba-languages",
      name: "BA specialising in Languages",
      faculty: "The Humanities",
      department: "Languages",
      apsMin: 30,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
      },
      careerOpportunities: ["Translator", "Interpreter", "Language Teaching", "Publishing", "International Relations"],
    },
    {
      id: "ufs-ba-language-practice",
      name: "BA (Language Practice)",
      faculty: "The Humanities",
      department: "Languages",
      apsMin: 30,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 5,
      },
      additionalRequirements: "Subject to selection. Home language Level 5 (60%) and FAL Level 65% required",
      careerOpportunities: ["Language Practitioner", "Editor", "Translator", "Communications Specialist", "Publishing"],
    },
    {
      id: "ufs-ba-governance",
      name: "BA (Governance and Political Transformation)",
      faculty: "The Humanities",
      department: "Political Science",
      apsMin: 30,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
      },
      careerOpportunities: [
        "Public Administration",
        "Policy Analysis",
        "Political Research",
        "Government Relations",
        "International Organizations",
      ],
    },
    {
      id: "ufs-ba-communication",
      name: "BA (Integrated Organisational Communication)",
      faculty: "The Humanities",
      department: "Communication",
      apsMin: 30,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
      },
      careerOpportunities: [
        "Communications Manager",
        "Public Relations",
        "Corporate Communications",
        "Marketing Communications",
        "Media Relations",
      ],
    },
    {
      id: "ufs-ba-journalism",
      name: "BA (Journalism)",
      faculty: "The Humanities",
      department: "Journalism",
      apsMin: 30,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
      },
      careerOpportunities: ["Journalist", "News Reporter", "Editor", "Media Producer", "Digital Media Specialist"],
    },
    {
      id: "ufs-ba-fine-arts",
      name: "BA (Fine Arts)",
      faculty: "The Humanities",
      department: "Fine Arts",
      apsMin: 30,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
      },
      additionalRequirements: "Subject to selection. Portfolio required. Closing date: 30 September 2025",
      careerOpportunities: ["Visual Artist", "Art Director", "Gallery Curator", "Art Teacher", "Graphic Designer"],
    },
    {
      id: "ufs-ba-drama",
      name: "BA (Drama and Theatre Arts)",
      faculty: "The Humanities",
      department: "Drama",
      apsMin: 30,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
      },
      additionalRequirements: "Subject to selection. Audition and interview required. Closing date: 30 September 2025",
      careerOpportunities: ["Actor", "Theatre Director", "Drama Teacher", "Arts Administrator", "Performance Artist"],
    },
    {
      id: "ufs-bmusic",
      name: "Bachelor of Music",
      faculty: "The Humanities",
      department: "Music",
      apsMin: 30,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
      },
      additionalRequirements: "Subject to selection. Music Theory Grade 5, Performance Grade 7, audition required",
      careerOpportunities: [
        "Professional Musician",
        "Music Teacher",
        "Composer",
        "Music Therapist",
        "Arts Administrator",
      ],
    },
    {
      id: "ufs-bsocsci",
      name: "Bachelor of Social Sciences (BSocSci)",
      faculty: "The Humanities",
      department: "Social Sciences",
      apsMin: 30,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein/Qwaqwa",
      subjectRequirements: {
        English: 4,
      },
      additionalRequirements:
        "Majors include Psychology, Sociology, Anthropology, Criminology, Political Science, Industrial Psychology",
      careerOpportunities: [
        "Social Researcher",
        "Community Development",
        "Human Resources",
        "Social Services",
        "Policy Analysis",
      ],
    },
    {
      id: "ufs-bsocwork",
      name: "Bachelor of Social Work",
      faculty: "The Humanities",
      department: "Social Work",
      apsMin: 30,
      duration: "4 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 5,
      },
      additionalRequirements: "Subject to selection. Closing date: 31 July 2025",
      careerOpportunities: [
        "Social Worker",
        "Community Development Worker",
        "Child and Family Services",
        "Healthcare Social Work",
        "Policy Development",
      ],
    },
    {
      id: "ufs-bcommdev",
      name: "Bachelor of Community Development (BCommDev)",
      faculty: "The Humanities",
      department: "Community Development",
      apsMin: 30,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Qwaqwa",
      subjectRequirements: {
        English: 5,
      },
      additionalRequirements: "Subject to selection. AP 30 OR Diploma in Vocational Skills with Level 4 English",
      careerOpportunities: [
        "Community Development Practitioner",
        "Project Manager",
        "NGO Management",
        "Rural Development",
        "Social Development",
      ],
    },

    // Faculty of Theology and Religion
    {
      id: "ufs-bdiv",
      name: "Bachelor of Divinity (BDiv)",
      faculty: "Theology and Religion",
      department: "Theology",
      apsMin: 28,
      duration: "4 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
      },
      additionalRequirements: "Selection form required. All applicants must complete selection form",
      careerOpportunities: [
        "Minister/Pastor",
        "Chaplain",
        "Religious Education",
        "Theological Research",
        "Community Ministry",
      ],
    },

    // Diplomas and Higher Certificates
    {
      id: "ufs-hcert-music",
      name: "Higher Certificate in Music Performance",
      faculty: "The Humanities",
      department: "Music",
      apsMin: 20,
      duration: "1 year",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
      },
      additionalRequirements: "Subject to selection. Audition and musical aptitude test required",
      careerOpportunities: [
        "Music Performer",
        "Music Teacher",
        "Session Musician",
        "Music Therapy Assistant",
        "Arts Administration",
      ],
    },
    {
      id: "ufs-dip-music",
      name: "Diploma in Music",
      faculty: "The Humanities",
      department: "Music",
      apsMin: 25,
      duration: "3 years",
      studyMode: "Full-time",
      campus: "Bloemfontein",
      subjectRequirements: {
        English: 4,
      },
      additionalRequirements: "Grade 5 principal instrument/voice, Grade 3 Music Theory advised. Audition required",
      careerOpportunities: ["Professional Musician", "Music Educator", "Music Director", "Composer", "Music Producer"],
    },
  ]

  /**
   * Calculate APS using UFS method
   * Uses 6 best subjects (excluding Life Orientation) + 1 point for Life Orientation if Level 5+
   */
  calculateAPS(subjects: Record<string, number>): number {
    // Convert percentage-based subjects to UFS levels
    const convertToLevel = (percentage: number): number => {
      if (percentage >= 90) return 8
      if (percentage >= 80) return 7
      if (percentage >= 70) return 6
      if (percentage >= 60) return 5
      if (percentage >= 50) return 4
      if (percentage >= 40) return 3
      if (percentage >= 30) return 2
      return 0
    }

    const levels: number[] = []
    let lifeOrientationPoints = 0

    for (const [subject, mark] of Object.entries(subjects)) {
      const level = convertToLevel(mark)

      if (subject === "Life Orientation") {
        // Life Orientation: 1 point if Level 5 (60%) or higher
        lifeOrientationPoints = level >= 5 ? 1 : 0
      } else if (level >= 2) {
        // Only include subjects with Level 2 (30%) or higher
        levels.push(level)
      }
    }

    // Take the 6 best subjects (excluding Life Orientation)
    const bestSix = levels.sort((a, b) => b - a).slice(0, 6)

    // Calculate total APS
    const totalAPS = bestSix.reduce((sum, level) => sum + level, 0) + lifeOrientationPoints

    return totalAPS
  }

  /**
   * UFS-specific APS calculation
   * Uses standard South African APS system
   * - Best 6 subjects excluding Life Orientation
   * - Standard 7-point NSC scale
   */
  calculateApsScore(subjects: Record<string, number>): number {
    const subjectScores: number[] = []
    
    for (const [subjectName, percentage] of Object.entries(subjects)) {
      if (subjectName.toLowerCase().includes('life orientation')) {
        continue
      }
      
      let points = 0
      if (percentage >= 80) points = 7
      else if (percentage >= 70) points = 6
      else if (percentage >= 60) points = 5
      else if (percentage >= 50) points = 4
      else if (percentage >= 40) points = 3
      else if (percentage >= 30) points = 2
      else if (percentage >= 0) points = 1
      
      subjectScores.push(points)
    }
    
    subjectScores.sort((a, b) => b - a)
    const top6 = subjectScores.slice(0, 6)
    
    return top6.reduce((sum, score) => sum + score, 0)
  }
}