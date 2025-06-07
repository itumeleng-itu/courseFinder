import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * North-West University (NWU) class
 */
export class NWU extends BaseUniversity {
  readonly id = "nwu"
  readonly name = "North-West University"
  readonly shortName = "NWU"
  readonly website = "https://www.nwu.ac.za"
  readonly logo = "/logos/nwu.png"
  readonly location = {
    city: "Potchefstroom",
    province: "North West",
    coordinates: {
      latitude: -26.6819,
      longitude: 27.0949,
    },
  }

  readonly campuses = [
    {
      name: "Potchefstroom Campus",
      abbreviation: "PC",
      location: {
        city: "Potchefstroom",
        province: "North West",
      },
    },
    {
      name: "Mahikeng Campus",
      abbreviation: "MC",
      location: {
        city: "Mahikeng",
        province: "North West",
      },
    },
    {
      name: "Vanderbijlpark Campus",
      abbreviation: "VC",
      location: {
        city: "Vanderbijlpark",
        province: "Gauteng",
      },
    },
  ]

  readonly apsCalculationMethod = `
    The Admission Point Score (APS) is calculated using six subjects, excluding Life Orientation.
    Each subject earns points depending on your percentage.
    
    APS Points:
    90-100%: 8 points
    80-89%: 7 points
    70-79%: 6 points
    60-69%: 5 points
    50-59%: 4 points
    40-49%: 3 points
    30-39%: 2 points
    0-29%: 1 point
  `

  readonly internationalRequirements = `
    International students need to calculate their APS based on their qualification:
    
    Cambridge International:
    - O/IGCSE Levels: Begin at a score of 5 for the lowest level
    - AS Levels: Equivalent to South African matric; grades above 90% earn an APS of 8
    - A Levels: Equivalent to first-year university level; grade A earns APS = 10
    
    International Baccalaureate (IB):
    - HL (Higher Level): 7 = 10 points, 6 = 9 points, 5 = 8 points, etc.
    - SL (Standard Level): 7 = 7 points, 6 = 6 points, 5 = 5 points, etc.
    
    Calculate APS based on six subjects, using the highest level passed in each subject.
  `

  readonly financialAid = `
    NWU offers various bursaries and financial aid options:
    
    Internal Bursaries:
    - Academic Merit Bursary: For students who complete their degree within its relevant duration
    - Family Discount: For families with two or more students registered simultaneously
    - Arts and Culture Bursary: Based on achievements in arts and culture
    - Leadership Bursary: For head boys, head girls, or chairpersons in Grade 12
    - Support Bursary: For students with physical disabilities or from orphanages/foster care
    - Sports Bursary: For students with provincial colors or contracted sports students
    
    External bursaries and NSFAS funding are also available.
  `

  readonly accommodationInfo = `
    NWU offers on-campus residences and day-houses (off-campus options).
    
    Residences are vibrant communities that provide:
    - A supportive community for your academic journey
    - Opportunities to form lifelong friendships
    - Convenient access to dining halls and campus facilities
    
    Each residence has its own unique experiences and sense of belonging.
  `

  protected readonly _courses: Course[] = [
    // FACULTY OF ENGINEERING
    {
      id: "nwu-beng-chemical",
      name: "BEng (Chemical Engineering)",
      faculty: "Engineering",
      apsMin: 34,
      duration: "4 years",
      campus: "Potchefstroom",
      subjectRequirements: {
        Mathematics: 7,
        "Physical Sciences": 7,
        "English Home Language": 6,
        "English First Additional Language": 6,
        "Afrikaans Home Language": 6,
        "Afrikaans First Additional Language": 6,
      },
      additionalRequirements:
        "Conditional acceptance with Grade 11 results: APS 31, Mathematics 65%, Physical Sciences 65%, Language of instruction 60%",
      notes:
        "Alternative entry route: Students with 65% in both Mathematics AND Physical Sciences, and an APS of 31, may write an entry test. Students with 40%+ in both Mathematics and Physical Sciences and at least 60% in the language of instruction can apply for the 1-year Xcel bridging programme.",
    },
    {
      id: "nwu-beng-electrical",
      name: "BEng (Electrical and Electronic Engineering)",
      faculty: "Engineering",
      apsMin: 34,
      duration: "4 years",
      campus: "Potchefstroom",
      subjectRequirements: {
        Mathematics: 7,
        "Physical Sciences": 7,
        "English Home Language": 6,
        "English First Additional Language": 6,
        "Afrikaans Home Language": 6,
        "Afrikaans First Additional Language": 6,
      },
      additionalRequirements:
        "Conditional acceptance with Grade 11 results: APS 31, Mathematics 65%, Physical Sciences 65%, Language of instruction 60%",
      notes:
        "Alternative entry route: Students with 65% in both Mathematics AND Physical Sciences, and an APS of 31, may write an entry test. Students with 40%+ in both Mathematics and Physical Sciences and at least 60% in the language of instruction can apply for the 1-year Xcel bridging programme.",
    },
    {
      id: "nwu-beng-computer",
      name: "BEng (Computer and Electronic Engineering)",
      faculty: "Engineering",
      apsMin: 34,
      duration: "4 years",
      campus: "Potchefstroom",
      subjectRequirements: {
        Mathematics: 7,
        "Physical Sciences": 7,
        "English Home Language": 6,
        "English First Additional Language": 6,
        "Afrikaans Home Language": 6,
        "Afrikaans First Additional Language": 6,
      },
      additionalRequirements:
        "Conditional acceptance with Grade 11 results: APS 31, Mathematics 65%, Physical Sciences 65%, Language of instruction 60%",
      notes:
        "Alternative entry route: Students with 65% in both Mathematics AND Physical Sciences, and an APS of 31, may write an entry test. Students with 40%+ in both Mathematics and Physical Sciences and at least 60% in the language of instruction can apply for the 1-year Xcel bridging programme.",
    },
    {
      id: "nwu-beng-electromechanical",
      name: "BEng (Electromechanical Engineering)",
      faculty: "Engineering",
      apsMin: 34,
      duration: "4 years",
      campus: "Potchefstroom",
      subjectRequirements: {
        Mathematics: 7,
        "Physical Sciences": 7,
        "English Home Language": 6,
        "English First Additional Language": 6,
        "Afrikaans Home Language": 6,
        "Afrikaans First Additional Language": 6,
      },
      additionalRequirements:
        "Conditional acceptance with Grade 11 results: APS 31, Mathematics 65%, Physical Sciences 65%, Language of instruction 60%",
      notes:
        "Alternative entry route: Students with 65% in both Mathematics AND Physical Sciences, and an APS of 31, may write an entry test. Students with 40%+ in both Mathematics and Physical Sciences and at least 60% in the language of instruction can apply for the 1-year Xcel bridging programme.",
    },
    {
      id: "nwu-beng-mechanical",
      name: "BEng (Mechanical Engineering)",
      faculty: "Engineering",
      apsMin: 34,
      duration: "4 years",
      campus: "Potchefstroom",
      subjectRequirements: {
        Mathematics: 7,
        "Physical Sciences": 7,
        "English Home Language": 6,
        "English First Additional Language": 6,
        "Afrikaans Home Language": 6,
        "Afrikaans First Additional Language": 6,
      },
      additionalRequirements:
        "Conditional acceptance with Grade 11 results: APS 31, Mathematics 65%, Physical Sciences 65%, Language of instruction 60%",
      notes:
        "Alternative entry route: Students with 65% in both Mathematics AND Physical Sciences, and an APS of 31, may write an entry test. Students with 40%+ in both Mathematics and Physical Sciences and at least 60% in the language of instruction can apply for the 1-year Xcel bridging programme.",
    },
    {
      id: "nwu-beng-industrial",
      name: "BEng (Industrial Engineering)",
      faculty: "Engineering",
      apsMin: 34,
      duration: "4 years",
      campus: "Potchefstroom",
      subjectRequirements: {
        Mathematics: 7,
        "Physical Sciences": 7,
        "English Home Language": 6,
        "English First Additional Language": 6,
        "Afrikaans Home Language": 6,
        "Afrikaans First Additional Language": 6,
      },
      additionalRequirements:
        "Conditional acceptance with Grade 11 results: APS 31, Mathematics 65%, Physical Sciences 65%, Language of instruction 60%",
      notes:
        "Alternative entry route: Students with 65% in both Mathematics AND Physical Sciences, and an APS of 31, may write an entry test. Students with 40%+ in both Mathematics and Physical Sciences and at least 60% in the language of instruction can apply for the 1-year Xcel bridging programme.",
    },
    {
      id: "nwu-beng-mechatronic",
      name: "BEng (Mechatronic Engineering)",
      faculty: "Engineering",
      apsMin: 34,
      duration: "4 years",
      campus: "Potchefstroom",
      subjectRequirements: {
        Mathematics: 7,
        "Physical Sciences": 7,
        "English Home Language": 6,
        "English First Additional Language": 6,
        "Afrikaans Home Language": 6,
        "Afrikaans First Additional Language": 6,
      },
      additionalRequirements:
        "Conditional acceptance with Grade 11 results: APS 31, Mathematics 65%, Physical Sciences 65%, Language of instruction 60%",
      notes:
        "Alternative entry route: Students with 65% in both Mathematics AND Physical Sciences, and an APS of 31, may write an entry test. Students with 40%+ in both Mathematics and Physical Sciences and at least 60% in the language of instruction can apply for the 1-year Xcel bridging programme.",
    },

    // FACULTY OF LAW
    {
      id: "nwu-ba-law-psychology",
      name: "BA in Law with Psychology",
      faculty: "Law",
      apsMin: 28,
      duration: "3 years",
      campus: "Potchefstroom, Vanderbijlpark",
      subjectRequirements: {
        "Home Language": 5,
        "First Additional Language": 5,
      },
      additionalRequirements: "Selection process applies. Academic performance is important. Limited capacity.",
    },
    {
      id: "nwu-ba-law-politics",
      name: "BA in Law with Politics",
      faculty: "Law",
      apsMin: 28,
      duration: "3 years",
      campus: "Potchefstroom, Vanderbijlpark",
      subjectRequirements: {
        "Home Language": 5,
        "First Additional Language": 5,
      },
      additionalRequirements: "Selection process applies. Academic performance is important. Limited capacity.",
    },
    {
      id: "nwu-ba-law-industrial-psychology",
      name: "BA in Law with Industrial Psychology",
      faculty: "Law",
      apsMin: 28,
      duration: "3 years",
      campus: "Potchefstroom, Vanderbijlpark",
      subjectRequirements: {
        "Home Language": 5,
        "First Additional Language": 5,
      },
      additionalRequirements: "Selection process applies. Academic performance is important. Limited capacity.",
    },
    {
      id: "nwu-bcom-law",
      name: "BCom in Law",
      faculty: "Law",
      apsMin: 30,
      duration: "3 years",
      campus: "Potchefstroom, Vanderbijlpark",
      subjectRequirements: {
        "Home Language": 5,
        "First Additional Language": 5,
        Mathematics: 4,
      },
      additionalRequirements: "Selection process applies. Academic performance is important. Limited capacity.",
    },
    {
      id: "nwu-llb",
      name: "Bachelor of Laws (LLB)",
      faculty: "Law",
      apsMin: 30,
      duration: "4 years",
      campus: "Mahikeng, Potchefstroom",
      subjectRequirements: {
        "Home Language": 5,
        "First Additional Language": 5,
      },
      additionalRequirements: "Selection process applies. Academic performance is important. Limited capacity.",
    },
    {
      id: "nwu-llb-extended",
      name: "Extended Bachelor of Laws (LLB)",
      faculty: "Law",
      apsMin: 28,
      duration: "5 years",
      campus: "Mahikeng",
      subjectRequirements: {
        "Home Language": 4,
        "First Additional Language": 4,
        Mathematics: 3,
        "Mathematical Literacy": 5,
      },
      additionalRequirements: "Selection process applies. Academic performance is important. Limited capacity.",
      notes:
        "Language of instruction is English. Additional support will be provided to students in a form of peer mentoring, tutorials, and supplementary instruction in all official languages of NWU.",
    },

    // FACULTY OF NATURAL AND AGRICULTURAL SCIENCES
    {
      id: "nwu-bsc-chemistry-physics",
      name: "BSc with Chemistry and Physics",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 26,
      duration: "3 years",
      campus: "Mahikeng, Potchefstroom",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 4,
      },
    },
    {
      id: "nwu-bsc-physics-mathematics",
      name: "BSc with Physics and Mathematics",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 26,
      duration: "3 years",
      campus: "Mahikeng, Potchefstroom",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 4,
      },
    },
    {
      id: "nwu-bsc-computer-science-mathematics",
      name: "BSc with Computer Science and Mathematics",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 26,
      duration: "3 years",
      campus: "Mahikeng, Potchefstroom, Vanderbijlpark",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 4,
      },
    },
    {
      id: "nwu-bsc-biochemistry-chemistry",
      name: "BSc with Biochemistry and Chemistry",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 26,
      duration: "3 years",
      campus: "Mahikeng, Potchefstroom",
      subjectRequirements: {
        Mathematics: 4,
        "Technical Mathematics": 5,
        "Physical Sciences": 4,
      },
    },
    {
      id: "nwu-bsc-financial-mathematics",
      name: "BSc in Financial Mathematics",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      campus: "Potchefstroom, Vanderbijlpark",
      subjectRequirements: {
        Mathematics: 6,
      },
    },
    {
      id: "nwu-bsc-business-analytics",
      name: "BSc in Business Analytics",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      campus: "Potchefstroom, Vanderbijlpark",
      subjectRequirements: {
        Mathematics: 6,
      },
    },
    {
      id: "nwu-bsc-quantitative-risk-management",
      name: "BSc in Quantitative Risk Management",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      campus: "Potchefstroom, Vanderbijlpark",
      subjectRequirements: {
        Mathematics: 6,
      },
    },
    {
      id: "nwu-bsc-actuarial-sciences",
      name: "BSc in Actuarial Sciences",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      campus: "Potchefstroom",
      subjectRequirements: {
        Mathematics: 6,
      },
    },

    // FACULTY OF ECONOMIC AND MANAGEMENT SCIENCES
    {
      id: "nwu-bcom-chartered-accountancy",
      name: "BCom in Chartered Accountancy",
      faculty: "Economic and Management Sciences",
      apsMin: 32,
      duration: "3 years",
      campus: "Mahikeng, Potchefstroom, Vanderbijlpark",
      subjectRequirements: {
        Mathematics: 5,
      },
      additionalRequirements: "Mathematics level 6 (70-79%) if the student did not take Grade 12 Accounting",
    },
    {
      id: "nwu-bcom-financial-accountancy",
      name: "BCom in Financial Accountancy",
      faculty: "Economic and Management Sciences",
      apsMin: 28,
      duration: "3 years",
      campus: "Mahikeng, Potchefstroom, Vanderbijlpark",
      subjectRequirements: {
        Mathematics: 4,
      },
    },
    {
      id: "nwu-bcom-forensic-accountancy",
      name: "BCom in Forensic Accountancy",
      faculty: "Economic and Management Sciences",
      apsMin: 36,
      duration: "3 years",
      campus: "Potchefstroom",
      subjectRequirements: {
        Mathematics: 5,
        Afrikaans: 5,
        English: 5,
      },
      additionalRequirements: "Mathematics level 6 (70-79%) if the student did not take Grade 12 Accounting",
    },
    {
      id: "nwu-bcom-management-accountancy",
      name: "BCom in Management Accountancy",
      faculty: "Economic and Management Sciences",
      apsMin: 30,
      duration: "3 years",
      campus: "Potchefstroom, Vanderbijlpark",
      subjectRequirements: {
        Mathematics: 5,
      },
    },
    {
      id: "nwu-bcom-human-resource-management",
      name: "BCom in Human Resource Management",
      faculty: "Economic and Management Sciences",
      apsMin: 30,
      duration: "3 years",
      campus: "Mahikeng, Potchefstroom, Vanderbijlpark",
      subjectRequirements: {
        Mathematics: 4,
      },
    },
    {
      id: "nwu-bcom-marketing-management",
      name: "BCom in Management Sciences with Marketing Management",
      faculty: "Economic and Management Sciences",
      apsMin: 24,
      duration: "3 years",
      campus: "Mahikeng, Potchefstroom, Vanderbijlpark",
      subjectRequirements: {
        Mathematics: 3,
      },
    },

    // FACULTY OF HEALTH SCIENCES
    {
      id: "nwu-bpharm",
      name: "Bachelor of Pharmacy",
      faculty: "Health Sciences",
      apsMin: 32,
      duration: "4 years",
      campus: "Potchefstroom",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
        "Language of Tuition": 4,
      },
      additionalRequirements: "Life Sciences is recommended. Academic paper selection. Best average mark.",
      notes: "Late applications will be considered on merit, depending on capacity.",
    },
    {
      id: "nwu-bsc-dietetics",
      name: "BSc in Dietetics",
      faculty: "Health Sciences",
      apsMin: 30,
      duration: "4 years",
      campus: "Potchefstroom",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
        "Language of Tuition": 4,
      },
      additionalRequirements: "Academic paper selection. Best average mark.",
    },
    {
      id: "nwu-bnursing",
      name: "Bachelor of Nursing",
      faculty: "Health Sciences",
      apsMin: 25,
      duration: "4 years",
      campus: "Potchefstroom, Mahikeng",
      subjectRequirements: {
        "Physical Sciences": 4,
        Mathematics: 4,
        "Life Sciences": 4,
        "Language of Tuition": 4,
      },
      additionalRequirements: "Participation in the 'job shadowing programme' (40 hours) is recommended.",
      notes: "Due to high volumes of applications and limited capacity, a selection process will be followed.",
    },
    {
      id: "nwu-bsocial-work",
      name: "Bachelor of Social Work",
      faculty: "Health Sciences",
      apsMin: 28,
      duration: "4 years",
      campus: "Potchefstroom, Mahikeng, Vanderbijlpark",
      subjectRequirements: {
        "Language of Tuition": 4,
      },
      additionalRequirements: "Academic paper selection. Best average mark.",
      notes: "Late applications will be considered on merit.",
    },

    // FACULTY OF EDUCATION
    {
      id: "nwu-bed-foundation",
      name: "BEd in Foundation Phase (Grade R-3)",
      faculty: "Education",
      apsMin: 26,
      duration: "4 years",
      campus: "Mahikeng, Potchefstroom, Vanderbijlpark, Distance",
      subjectRequirements: {
        "Home Language": 4,
        "First Additional Language": 4,
      },
      notes: "Language options vary by campus. Distance learning available.",
    },
    {
      id: "nwu-bed-intermediate-mst",
      name: "BEd in Intermediate Phase (Grade 4-6) with Mathematics, Science and Technology",
      faculty: "Education",
      apsMin: 26,
      duration: "4 years",
      campus: "Potchefstroom, Vanderbijlpark",
      subjectRequirements: {
        "Home Language": 4,
        "First Additional Language": 4,
        Mathematics: 3,
        "Technical Mathematics": 4,
      },
    },
    {
      id: "nwu-bed-intermediate-ls",
      name: "BEd in Intermediate Phase (Grade 4-6) with Life Skills and Social Sciences",
      faculty: "Education",
      apsMin: 26,
      duration: "4 years",
      campus: "Potchefstroom, Vanderbijlpark, Distance",
      subjectRequirements: {
        "Home Language": 4,
        "First Additional Language": 4,
      },
    },
    {
      id: "nwu-bed-senior-mathematics",
      name: "BEd in Senior and Further Education and Training (Grade 7-12) with Mathematics",
      faculty: "Education",
      apsMin: 26,
      duration: "4 years",
      campus: "Mahikeng, Potchefstroom, Vanderbijlpark, Distance",
      subjectRequirements: {
        "Home Language": 4,
        "First Additional Language": 4,
        Mathematics: 5,
      },
    },
    {
      id: "nwu-bed-senior-physical-sciences",
      name: "BEd in Senior and Further Education and Training (Grade 7-12) with Physical Sciences",
      faculty: "Education",
      apsMin: 26,
      duration: "4 years",
      campus: "Mahikeng, Potchefstroom, Vanderbijlpark",
      subjectRequirements: {
        "Home Language": 4,
        "First Additional Language": 4,
        "Physical Sciences": 4,
        Mathematics: 4,
        "Technical Mathematics": 5,
      },
    },

    // FACULTY OF HUMANITIES
    {
      id: "nwu-ba-communication",
      name: "BA in Communication",
      faculty: "Humanities",
      apsMin: 24,
      duration: "3 years",
      campus: "Mahikeng, Potchefstroom, Vanderbijlpark",
      subjectRequirements: {
        "English Home Language": 5,
        "English First Additional Language": 5,
      },
    },
    {
      id: "nwu-ba-graphic-design",
      name: "BA in Graphic Design",
      faculty: "Humanities",
      apsMin: 24,
      duration: "4 years",
      campus: "Potchefstroom",
      subjectRequirements: {
        English: 5,
      },
      additionalRequirements:
        "A screening process including submission of a photo portfolio, academic record, and interview.",
    },
    {
      id: "nwu-ba-music-society",
      name: "BA in Music and Society",
      faculty: "Humanities",
      apsMin: 21,
      duration: "3 years",
      campus: "Potchefstroom",
      subjectRequirements: {
        English: 4,
      },
      additionalRequirements:
        "Successful completion of a practical audition (Grade 3 standard), a theoretical placement test (Grade 2 standard), and a language proficiency test.",
    },
    {
      id: "nwu-bmus",
      name: "Baccalaureus Musicae (BMus)",
      faculty: "Humanities",
      apsMin: 24,
      duration: "4 years",
      campus: "Potchefstroom",
      additionalRequirements:
        "Successful completion of a practical audition (Grade 6 standard), a theoretical placement test (Grade 5 standard), and a language proficiency test.",
    },

    // FACULTY OF THEOLOGY
    {
      id: "nwu-ba-ancient-languages",
      name: "BA in Ancient Languages",
      faculty: "Theology",
      apsMin: 24,
      duration: "3 years",
      campus: "Potchefstroom",
      subjectRequirements: {
        English: 4,
      },
    },
    {
      id: "nwu-ba-pastoral-psychology",
      name: "BA in Pastoral Psychology",
      faculty: "Theology",
      apsMin: 26,
      duration: "3 years",
      campus: "Mahikeng, Vanderbijlpark",
      subjectRequirements: {
        English: 4,
      },
      notes: "In consultation with Association of Christian Religious Practitioners (ACRP)",
    },
    {
      id: "nwu-bdiv",
      name: "Bachelor of Divinity (BDiv)",
      faculty: "Theology",
      apsMin: 24,
      duration: "4 years",
      campus: "Potchefstroom, Distance",
      subjectRequirements: {
        English: 4,
      },
      notes: "In consultation with Curators of Reformed Churches in SA, Hervormde Kerk, and Dutch Reformed Church",
    },
  ]
}
