import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * University of the Witwatersrand (Wits) class
 * Complete course listings for 2026 admissions
 */
export class Wits extends BaseUniversity {
  readonly id = "wits"
  readonly name = "University of the Witwatersrand"
  readonly shortName = "Wits"
  readonly website = "https://www.wits.ac.za"
  readonly logo = "/logos/wits.png"
  readonly location = {
    city: "Johannesburg",
    province: "Gauteng",
    coordinates: {
      latitude: -26.1929,
      longitude: 28.0305,
    },
  }

  readonly applicationDeadlines = {
    healthSciences: "2025-06-30",
    architecture: "2025-06-30",
    audiology: "2025-06-30",
    filmAndTelevision: "2025-06-30",
    speechLanguagePathology: "2025-06-30",
    allOtherProgrammes: "2025-09-30",
    residenceApplications: "2025-09-30",
  }

  readonly scholarships = [
    { aps: 51, amount: 42000, name: "University Entrance Scholarship" },
    { aps: 48, amount: 30000, name: "University Entrance Scholarship" },
    { aps: 45, amount: 15000, name: "University Entrance Scholarship" },
    { aps: 43, amount: 10000, name: "University Entrance Scholarship" },
    { amount: 50000, name: "Vice-Chancellor's Scholarship", description: "Top 10 matriculants" },
  ]

  /**
   * Wits APS Calculation:
   * - English and Mathematics get +2 bonus points
   * - Life Orientation: 80-100% = 4, 70-79% = 3, 60-69% = 2, 50-59% = 1
   * - Other subjects: 90-100% = 8, 80-89% = 7, 70-79% = 6, 60-69% = 5, 50-59% = 4, 40-49% = 3
   */
  protected readonly _courses: Course[] = [
    // FACULTY OF COMMERCE, LAW & MANAGEMENT
    // School of Business Sciences
    {
      id: "wits-bcom-general",
      name: "Bachelor of Commerce (General)",
      faculty: "Commerce, Law and Management",
      school: "School of Business Sciences",
      apsMin: 38,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
      },
    },
    {
      id: "wits-bcom-information-systems",
      name: "Bachelor of Commerce (Information Systems)",
      faculty: "Commerce, Law and Management",
      school: "School of Business Sciences",
      apsMin: 38,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
      },
    },
    {
      id: "wits-bcom-ppe",
      name: "Bachelor of Commerce (Politics, Philosophy and Economics)",
      faculty: "Commerce, Law and Management",
      school: "School of Business Sciences",
      apsMin: 38,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
      },
    },

    // The Wits Margo Steele School of Accountancy
    {
      id: "wits-baccsc",
      name: "Bachelor of Accounting Science",
      faculty: "Commerce, Law and Management",
      school: "The Wits Margo Steele School of Accountancy",
      apsMin: 44,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 6,
      },
    },
    {
      id: "wits-bcom-accounting",
      name: "Bachelor of Commerce (Accounting)",
      faculty: "Commerce, Law and Management",
      school: "The Wits Margo Steele School of Accountancy",
      apsMin: 38,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
      },
    },

    // School of Economics and Finance
    {
      id: "wits-beconsc",
      name: "Bachelor of Economic Science",
      faculty: "Commerce, Law and Management",
      school: "School of Economics and Finance",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 7,
      },
    },

    // School of Law
    {
      id: "wits-bcom-law",
      name: "Bachelor of Commerce with Law",
      faculty: "Commerce, Law and Management",
      school: "School of Law",
      apsMin: 43,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
      },
    },
    {
      id: "wits-llb-4year",
      name: "Bachelor of Laws (Four-year stream)",
      faculty: "Commerce, Law and Management",
      school: "School of Law",
      apsMin: 46,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 6,
        "English First Additional": 6,
        Mathematics: 4,
        "Mathematical Literacy": 6,
      },
    },

    // FACULTY OF ENGINEERING AND THE BUILT ENVIRONMENT
    // School of Chemical and Metallurgical Engineering
    {
      id: "wits-bsc-eng-chemical",
      name: "Bachelor of Science in Engineering (Chemical Engineering)",
      faculty: "Engineering and the Built Environment",
      school: "School of Chemical and Metallurgical Engineering",
      apsMin: 42,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "wits-bsc-eng-metallurgy",
      name: "Bachelor of Science in Engineering (Metallurgy and Materials Engineering)",
      faculty: "Engineering and the Built Environment",
      school: "School of Chemical and Metallurgical Engineering",
      apsMin: 42,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },

    // School of Civil and Environmental Engineering
    {
      id: "wits-bsc-eng-civil",
      name: "Bachelor of Science in Engineering (Civil Engineering)",
      faculty: "Engineering and the Built Environment",
      school: "School of Civil and Environmental Engineering",
      apsMin: 42,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },

    // School of Electrical and Information Engineering
    {
      id: "wits-bsc-eng-electrical",
      name: "Bachelor of Science in Engineering (Electrical Engineering)",
      faculty: "Engineering and the Built Environment",
      school: "School of Electrical and Information Engineering",
      apsMin: 42,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "wits-bsc-biomedical-eng",
      name: "Bachelor of Science (Biomedical Engineering)",
      faculty: "Engineering and the Built Environment",
      school: "School of Electrical and Information Engineering",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "wits-bsc-digital-arts",
      name: "Bachelor of Science (Digital Arts)",
      faculty: "Engineering and the Built Environment",
      school: "School of Electrical and Information Engineering",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },

    // School of Mechanical, Industrial and Aeronautical Engineering
    {
      id: "wits-bsc-eng-aeronautical",
      name: "Bachelor of Science in Engineering (Aeronautical Engineering)",
      faculty: "Engineering and the Built Environment",
      school: "School of Mechanical, Industrial and Aeronautical Engineering",
      apsMin: 42,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "wits-bsc-eng-industrial",
      name: "Bachelor of Science in Engineering (Industrial Engineering)",
      faculty: "Engineering and the Built Environment",
      school: "School of Mechanical, Industrial and Aeronautical Engineering",
      apsMin: 42,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "wits-bsc-eng-mechanical",
      name: "Bachelor of Science in Engineering (Mechanical Engineering)",
      faculty: "Engineering and the Built Environment",
      school: "School of Mechanical, Industrial and Aeronautical Engineering",
      apsMin: 42,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },

    // School of Mining Engineering
    {
      id: "wits-bsc-eng-mining",
      name: "Bachelor of Science in Engineering (Mining Engineering)",
      faculty: "Engineering and the Built Environment",
      school: "School of Mining Engineering",
      apsMin: 42,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
        "Physical Sciences": 5,
      },
    },

    // School of Architecture and Planning
    {
      id: "wits-bas",
      name: "Bachelor of Architectural Studies",
      faculty: "Engineering and the Built Environment",
      school: "School of Architecture and Planning",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
      },
      additionalRequirements: "Written and graphic drawing exercise required",
      applicationDeadline: "2025-06-30",
    },
    {
      id: "wits-burp",
      name: "Bachelor of Science (Urban and Regional Planning)",
      faculty: "Engineering and the Built Environment",
      school: "School of Architecture and Planning",
      apsMin: 36,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
      },
    },

    // School of Construction Economics and Management
    {
      id: "wits-bsc-construction",
      name: "Bachelor of Science (Construction Studies)",
      faculty: "Engineering and the Built Environment",
      school: "School of Construction Economics and Management",
      apsMin: 36,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
      },
    },
    {
      id: "wits-bsc-property",
      name: "Bachelor of Science (Property Studies)",
      faculty: "Engineering and the Built Environment",
      school: "School of Construction Economics and Management",
      apsMin: 36,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
      },
    },

    // FACULTY OF HEALTH SCIENCES
    {
      id: "wits-bsc-biomedical-sciences",
      name: "Bachelor of Science (Biomedical Sciences)",
      faculty: "Health Sciences",
      apsMin: 0,
      duration: "3 years",
      selectionProcess: "Composite Index",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
        "Life Sciences": 5,
      },
      additionalRequirements: "NBT by 18 August 2025",
      applicationDeadline: "2025-06-30",
    },
    {
      id: "wits-bsc-biokinetics",
      name: "Bachelor of Science (Biokinetics)",
      faculty: "Health Sciences",
      apsMin: 0,
      duration: "3 years",
      selectionProcess: "Composite Index",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
        "Life Sciences": 5,
      },
      additionalRequirements: "NBT by 18 August 2025",
      applicationDeadline: "2025-06-30",
    },
    {
      id: "wits-bsc-health-systems",
      name: "Bachelor of Science (Health Systems Sciences Clinical Medical Practice)",
      faculty: "Health Sciences",
      apsMin: 0,
      duration: "3 years",
      selectionProcess: "Composite Index",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
        "Mathematical Literacy": 7,
        "Life Sciences": 4,
      },
      additionalRequirements: "NBT by 18 August 2025",
      applicationDeadline: "2025-06-30",
    },
    {
      id: "wits-mbbch",
      name: "Bachelor of Medicine and Bachelor of Surgery",
      faculty: "Health Sciences",
      apsMin: 0,
      duration: "6 years",
      selectionProcess: "Composite Index",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
        "Life Sciences": 5,
      },
      additionalRequirements: "NBT by 18 August 2025",
      applicationDeadline: "2025-06-30",
    },
    {
      id: "wits-bds",
      name: "Bachelor of Dental Science",
      faculty: "Health Sciences",
      apsMin: 0,
      duration: "5 years",
      selectionProcess: "Composite Index",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
        "Life Sciences": 5,
        "Physical Sciences": 5,
      },
      additionalRequirements: "NBT by 18 August 2025, Job shadowing certificate (minimum 16 hours) between 1-31 July",
      applicationDeadline: "2025-06-30",
    },
    {
      id: "wits-bohs",
      name: "Bachelor of Oral Health Sciences",
      faculty: "Health Sciences",
      apsMin: 0,
      duration: "3 years",
      selectionProcess: "Composite Index",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
        "Mathematical Literacy": 7,
        "Life Sciences": 4,
      },
      additionalRequirements: "NBT by 18 August 2025, Job shadowing certificate (minimum 16 hours) between 1-31 July",
      applicationDeadline: "2025-06-30",
    },
    {
      id: "wits-bcur",
      name: "Bachelor of Nursing",
      faculty: "Health Sciences",
      apsMin: 0,
      duration: "4 years",
      selectionProcess: "Composite Index",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
        "Life Sciences": 4,
      },
      additionalRequirements: "NBT by 18 August 2025",
      applicationDeadline: "2025-06-30",
    },
    {
      id: "wits-bpharm",
      name: "Bachelor of Pharmacy",
      faculty: "Health Sciences",
      apsMin: 0,
      duration: "4 years",
      selectionProcess: "Composite Index",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
        "Life Sciences": 5,
      },
      additionalRequirements: "NBT by 18 August 2025",
      applicationDeadline: "2025-06-30",
    },
    {
      id: "wits-bsc-occupational-therapy",
      name: "Bachelor of Science (Occupational Therapy)",
      faculty: "Health Sciences",
      apsMin: 0,
      duration: "4 years",
      selectionProcess: "Composite Index",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
        "Life Sciences": 4,
      },
      additionalRequirements: "NBT by 18 August 2025, Job shadowing certificate (minimum 16 hours) between 1-31 July",
      applicationDeadline: "2025-06-30",
    },
    {
      id: "wits-bsc-physiotherapy",
      name: "Bachelor of Science (Physiotherapy)",
      faculty: "Health Sciences",
      apsMin: 0,
      duration: "4 years",
      selectionProcess: "Composite Index",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
        "Life Sciences": 5,
      },
      additionalRequirements: "NBT by 18 August 2025, Job shadowing certificate (minimum 16 hours) between 1-31 July",
      applicationDeadline: "2025-06-30",
    },

    // FACULTY OF HUMANITIES
    {
      id: "wits-ba-general",
      name: "Bachelor of Arts (General)",
      faculty: "Humanities",
      apsMin: 36,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
      },
    },
    {
      id: "wits-ba-law",
      name: "Bachelor of Arts (Law)",
      faculty: "Humanities",
      apsMin: 43,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 3,
        "Mathematical Literacy": 4,
      },
    },

    // Wits School of Arts (WSoA)
    {
      id: "wits-ba-digital-arts",
      name: "Bachelor of Arts (Digital Arts)",
      faculty: "Humanities",
      school: "Wits School of Arts (WSoA)",
      apsMin: 36,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
      },
      additionalRequirements: "Audition, Portfolio or Written Assignment",
    },
    {
      id: "wits-ba-theatre",
      name: "Bachelor of Arts (Theatre and Performance)",
      faculty: "Humanities",
      school: "Wits School of Arts (WSoA)",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
      },
      additionalRequirements: "Audition, Portfolio or Written Assignment",
    },
    {
      id: "wits-ba-film-tv",
      name: "Bachelor of Arts (Film and Television)",
      faculty: "Humanities",
      school: "Wits School of Arts (WSoA)",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
      },
      additionalRequirements: "Audition, Portfolio or Written Assignment",
      applicationDeadline: "2025-06-30",
    },
    {
      id: "wits-ba-fine-arts",
      name: "Bachelor of Arts (Fine Arts)",
      faculty: "Humanities",
      school: "Wits School of Arts (WSoA)",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
      },
      additionalRequirements: "Audition, Portfolio or Written Assignment",
    },
    {
      id: "wits-bmus",
      name: "Bachelor of Music",
      faculty: "Humanities",
      school: "Wits School of Arts (WSoA)",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
      },
      additionalRequirements: "Audition, Portfolio or Written Assignment",
    },

    // Wits School of Education (WSoE)
    {
      id: "wits-bed-foundation",
      name: "Bachelor of Education (Foundation Phase Teaching)",
      faculty: "Humanities",
      school: "Wits School of Education (WSoE)",
      apsMin: 37,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 4,
        "Mathematical Literacy": 5,
        "Technical Mathematics": 5,
      },
    },
    {
      id: "wits-bed-intermediate",
      name: "Bachelor of Education (Intermediate Phase Teaching)",
      faculty: "Humanities",
      school: "Wits School of Education (WSoE)",
      apsMin: 37,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 4,
        "Mathematical Literacy": 5,
        "Technical Mathematics": 5,
      },
    },
    {
      id: "wits-bed-senior",
      name: "Bachelor of Education (Senior Phase and FET Teaching)",
      faculty: "Humanities",
      school: "Wits School of Education (WSoE)",
      apsMin: 37,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
      },
      additionalRequirements: "Teaching subjects are compulsory: Physical Sciences, Life Sciences, Engineering Graphics & Design, Geography, History, IsiZulu, Sesotho, IT, Mechanical Technology, Mathematics 65%, Technical Mathematics 65%",
    },

    // School of Human and Community Development (SHCD)
    {
      id: "wits-ba-speech-language",
      name: "Bachelor of Arts (Speech-Language Pathology)",
      faculty: "Humanities",
      school: "School of Human and Community Development (SHCD)",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 4,
      },
      additionalRequirements: "NBT by 18 August 2025",
      applicationDeadline: "2025-06-30",
    },
    {
      id: "wits-ba-audiology",
      name: "Bachelor of Arts (Audiology)",
      faculty: "Humanities",
      school: "School of Human and Community Development (SHCD)",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 4,
      },
      additionalRequirements: "NBT by 18 August 2025",
      applicationDeadline: "2025-06-30",
    },
    {
      id: "wits-bsw",
      name: "Bachelor of Social Work",
      faculty: "Humanities",
      school: "School of Human and Community Development (SHCD)",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
      },
    },

    // FACULTY OF SCIENCE
    {
      id: "wits-bsc-general",
      name: "Bachelor of Science (General)",
      faculty: "Science",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
      },
      additionalRequirements: "NBT by 31 October 2025",
    },

    // Biological Sciences
    {
      id: "wits-bsc-biological",
      name: "Bachelor of Science (Biological Sciences)",
      faculty: "Science",
      school: "Biological Sciences",
      apsMin: 43,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
      },
      additionalRequirements: "NBT by 31 October 2025",
    },

    // Earth Sciences
    {
      id: "wits-bsc-geographical-archaeological",
      name: "Bachelor of Science (Geographical and Archaeological Sciences)",
      faculty: "Science",
      school: "Earth Sciences",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
      },
      additionalRequirements: "NBT by 31 October 2025",
    },
    {
      id: "wits-bsc-geospatial",
      name: "Bachelor of Science (Geospatial Sciences)",
      faculty: "Science",
      school: "Earth Sciences",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
      },
      additionalRequirements: "NBT by 31 October 2025",
    },
    {
      id: "wits-bsc-environmental",
      name: "Bachelor of Science (Environmental Studies)",
      faculty: "Science",
      school: "Earth Sciences",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 5,
      },
      additionalRequirements: "NBT by 31 October 2025",
    },
    {
      id: "wits-bsc-geological",
      name: "Bachelor of Science (Geological Sciences)",
      faculty: "Science",
      school: "Earth Sciences",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 6,
        "Physical Sciences": 5,
      },
      additionalRequirements: "NBT by 31 October 2025",
    },

    // Mathematical Sciences
    {
      id: "wits-bsc-actuarial",
      name: "Bachelor of Science (Actuarial Science)",
      faculty: "Science",
      school: "Mathematical Sciences",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 7,
        "English First Additional": 7,
        Mathematics: 7,
        "Physical Sciences": 7,
      },
      additionalRequirements: "NBT by 31 October 2025",
    },
    {
      id: "wits-bsc-computational-maths",
      name: "Bachelor of Science (Computational and Applied Mathematics)",
      faculty: "Science",
      school: "Mathematical Sciences",
      apsMin: 44,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 6,
      },
      additionalRequirements: "NBT by 31 October 2025",
    },
    {
      id: "wits-bsc-computer-science",
      name: "Bachelor of Science (Computer Science)",
      faculty: "Science",
      school: "Mathematical Sciences",
      apsMin: 44,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 6,
      },
      additionalRequirements: "NBT by 31 October 2025",
    },
    {
      id: "wits-bsc-mathematical-sciences",
      name: "Bachelor of Science (Mathematical Sciences)",
      faculty: "Science",
      school: "Mathematical Sciences",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 7,
        "English First Additional": 7,
        Mathematics: 7,
        "Physical Sciences": 7,
      },
      additionalRequirements: "NBT by 31 October 2025",
    },

    // Physical Sciences
    {
      id: "wits-bsc-physical-sciences",
      name: "Bachelor of Science (Physical Sciences - Chemistry/Physics)",
      faculty: "Science",
      school: "Physical Sciences",
      apsMin: 42,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 6,
        "Physical Sciences": 5,
      },
      additionalRequirements: "NBT by 31 October 2025",
    },
    {
      id: "wits-bsc-chemistry-chemical-eng",
      name: "Bachelor of Science (Chemistry with Chemical Engineering)",
      faculty: "Science",
      school: "Physical Sciences",
      apsMin: 43,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 6,
        "Physical Sciences": 6,
      },
      additionalRequirements: "NBT by 31 October 2025",
    },
    {
      id: "wits-bsc-materials-science",
      name: "Bachelor of Science (Materials Science)",
      faculty: "Science",
      school: "Physical Sciences",
      apsMin: 43,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 6,
        "Physical Sciences": 5,
      },
      additionalRequirements: "NBT by 31 October 2025",
    },
    {
      id: "wits-bsc-astronomy-astrophysics",
      name: "Bachelor of Science (Astronomy and Astrophysics)",
      faculty: "Science",
      school: "Physical Sciences",
      apsMin: 43,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 5,
        "English First Additional": 5,
        Mathematics: 6,
        "Physical Sciences": 6,
      },
      additionalRequirements: "NBT by 31 October 2025",
    },
  ]

  /**
   * Calculate APS for Wits-specific rules
   * @param subjects Object containing subject names and percentages
   * @returns Total APS score
   */
  calculateAPS(subjects: Record<string, number>): number {
    let totalAPS = 0
    const apsScale = [
      { min: 90, max: 100, points: 8 },
      { min: 80, max: 89, points: 7 },
      { min: 70, max: 79, points: 6 },
      { min: 60, max: 69, points: 5 },
      { min: 50, max: 59, points: 4 },
      { min: 40, max: 49, points: 3 },
      { min: 30, max: 39, points: 0 },
      { min: 0, max: 29, points: 0 },
    ]

    const lifeOrientationScale = [
      { min: 80, max: 100, points: 4 },
      { min: 70, max: 79, points: 3 },
      { min: 60, max: 69, points: 2 },
      { min: 50, max: 59, points: 1 },
      { min: 0, max: 49, points: 0 },
    ]

    for (const [subject, percentage] of Object.entries(subjects)) {
      let points = 0

      // Life Orientation special scoring (max 4 points)
      if (subject.toLowerCase().includes("life orientation")) {
        const scale = lifeOrientationScale.find(
          (s) => percentage >= s.min && percentage <= s.max
        )
        points = scale ? scale.points : 0
      }
      // English and Mathematics get +2 bonus
      else if (
        subject.toLowerCase().includes("english") ||
        subject.toLowerCase().includes("mathematics")
      ) {
        const scale = apsScale.find(
          (s) => percentage >= s.min && percentage <= s.max
        )
        const basePoints = scale ? scale.points : 0
        points = basePoints + 2 // Add 2 bonus points
      }
      // All other subjects
      else {
        const scale = apsScale.find(
          (s) => percentage >= s.min && percentage <= s.max
        )
        points = scale ? scale.points : 0
      }

      totalAPS += points
    }

    return totalAPS
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
    }
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
    }
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
    }
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
    const subjectScores: number[] = []

    for (const [subjectName, percentage] of Object.entries(subjects)) {
      const normalizedName = subjectName.toLowerCase()

      // Life Orientation uses special 4-point scale
      if (normalizedName.includes('life orientation')) {
        if (percentage >= 80) subjectScores.push(4)
        else if (percentage >= 70) subjectScores.push(3)
        else if (percentage >= 60) subjectScores.push(2)
        else if (percentage >= 50) subjectScores.push(1)
        else subjectScores.push(0)
        continue
      }

      // Standard 8-point scale for other subjects
      let points = 0
      if (percentage >= 90) points = 8
      else if (percentage >= 80) points = 7
      else if (percentage >= 70) points = 6
      else if (percentage >= 60) points = 5
      else if (percentage >= 50) points = 4
      else if (percentage >= 40) points = 3
      else if (percentage >= 30) points = 2
      else if (percentage >= 0) points = 1

      // Add +2 bonus for English and Mathematics
      if (normalizedName.includes('english') || normalizedName.includes('mathematics')) {
        points += 2
      }

      subjectScores.push(points)
    }

    // Sort descending and take top 6 subjects
    subjectScores.sort((a, b) => b - a)
    const top6 = subjectScores.slice(0, 6)

    return top6.reduce((sum, score) => sum + score, 0)
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
    }
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
    }
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
    }
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
    }
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
    ]
  }
}
