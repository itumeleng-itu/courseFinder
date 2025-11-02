import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * University of Cape Town (UCT) class
 * Based on 2026 Undergraduate Prospectus
 */
export class UCT extends BaseUniversity {
  readonly id = "uct"
  readonly name = "University of Cape Town"
  readonly shortName = "UCT"
  readonly website = "https://www.uct.ac.za"
  readonly logo = "/logos/uct.png"
  readonly location = {
    city: "Cape Town",
    province: "Western Cape",
    coordinates: {
      latitude: -33.9579,
      longitude: 18.4611,
    },
  }

  protected readonly _courses: Course[] = [
    // FACULTY OF COMMERCE
    {
      id: "uct-bcom-general",
      name: "Bachelor of Commerce (General)",
      faculty: "Commerce",
      apsRequired: 435, // Updated FPS from 35 to 435 (out of 600) per 2026 prospectus Band A
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 60,
        English: 50, // HL or 60 for FAL
      },
      additionalRequirements: [
        "NBT scores of Upper Intermediate or above for AL & QL",
        "Various specializations available including Accounting, Economics, Finance, Management Studies, Marketing",
      ],
      careerOpportunities: [
        "Chartered Accountant (CA)",
        "Financial Analyst",
        "Investment Manager",
        "Marketing Manager",
        "Management Consultant",
        "Economist",
      ],
    },
    {
      id: "uct-bbussc-general",
      name: "Bachelor of Business Science (General)",
      faculty: "Commerce",
      apsRequired: 435, // Updated to 435 FPS Band A per 2026 prospectus
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 60,
        English: 50, // HL or 60 for FAL
      },
      additionalRequirements: [
        "NBT scores of Upper Intermediate or above for AL & QL",
        "Various specializations available including Actuarial Science, Computer Science, Finance",
      ],
      careerOpportunities: [
        "Business Analyst",
        "Strategic Consultant",
        "Investment Banking",
        "Corporate Finance",
        "Risk Management",
      ],
    },
    {
      id: "uct-bbussc-actuarial",
      name: "Bachelor of Business Science in Actuarial Science",
      faculty: "Commerce",
      apsRequired: 435, // Updated to 435 FPS Band A per 2026 prospectus
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 80,
        English: 60, // HL or 80 for FAL
      },
      additionalRequirements: [
        "NBT scores of Proficient for AL & QL (FAL applicants)",
        "Extremely competitive program",
        "Strong mathematical aptitude required",
      ],
      careerOpportunities: [
        "Actuary (FASSA qualification)",
        "Risk Management",
        "Insurance Industry",
        "Pension Fund Management",
        "Investment Banking",
        "Quantitative Finance",
      ],
    },
    {
      id: "uct-bcom-computer-science",
      name: "Bachelor of Commerce in Computer Science",
      faculty: "Commerce",
      apsRequired: 435, // Updated to 435 FPS Band A
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 70,
        English: 50, // HL or 60 for FAL
      },
      additionalRequirements: [
        "NBT scores of Upper Intermediate or above for AL & QL",
        "Strong programming and analytical skills",
      ],
      careerOpportunities: [
        "Software Developer",
        "Systems Analyst",
        "IT Consultant",
        "Data Scientist",
        "Business Intelligence Analyst",
      ],
    },

    // FACULTY OF ENGINEERING & THE BUILT ENVIRONMENT
    {
      id: "uct-bsc-eng-civil",
      name: "BSc Engineering (Civil)",
      faculty: "Engineering & the Built Environment",
      apsRequired: 500, // FPS 500 Band A per 2026 prospectus
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 75,
        "Physical Sciences": 70,
      },
      additionalRequirements: [
        "NBT in Mathematics, AL & QL required",
        "ECSA accredited program",
        "Washington Accord recognized",
      ],
      careerOpportunities: [
        "Civil Engineer",
        "Structural Engineer",
        "Water Resources Engineer",
        "Transportation Engineer",
        "Construction Manager",
        "Project Manager",
      ],
    },
    {
      id: "uct-bsc-eng-electrical",
      name: "BSc Engineering (Electrical, Electrical and Computer Engineering and Mechatronics)",
      faculty: "Engineering & the Built Environment",
      apsRequired: 500, // FPS 500 Band A per 2026 prospectus
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 80,
        "Physical Sciences": 75,
      },
      additionalRequirements: [
        "NBT in Mathematics, AL & QL required",
        "ECSA accredited program",
        "Specialization options available in multiple disciplines",
      ],
      careerOpportunities: [
        "Electrical Engineer",
        "Power Systems Engineer",
        "Electronics Engineer",
        "Telecommunications Engineer",
        "Control Systems Engineer",
        "Mechatronics Engineer",
      ],
    },
    {
      id: "uct-bsc-eng-mechanical",
      name: "BSc Engineering (Mechanical)",
      faculty: "Engineering & the Built Environment",
      apsRequired: 500, // FPS 500 Band A per 2026 prospectus
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 80,
        "Physical Sciences": 75,
      },
      additionalRequirements: [
        "NBT in Mathematics, AL & QL required",
        "ECSA accredited program",
        "Foundation for aeronautical and biomedical engineering",
      ],
      careerOpportunities: [
        "Mechanical Engineer",
        "Aeronautical Engineer",
        "Automotive Engineer",
        "Manufacturing Engineer",
        "Energy Systems Engineer",
      ],
    },
    {
      id: "uct-bsc-eng-chemical",
      name: "BSc Engineering (Chemical)",
      faculty: "Engineering & the Built Environment",
      apsRequired: 500, // FPS 500 Band A per 2026 prospectus
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 80,
        "Physical Sciences": 70,
      },
      additionalRequirements: [
        "NBT in Mathematics, AL & QL required",
        "ECSA accredited program",
        "Focus on process industries",
      ],
      careerOpportunities: [
        "Chemical Engineer",
        "Process Engineer",
        "Environmental Engineer",
        "Petrochemical Engineer",
        "Food Process Engineer",
      ],
    },
    {
      id: "uct-bas",
      name: "Bachelor of Architectural Studies",
      faculty: "Engineering & the Built Environment",
      apsRequired: 400, // Updated from 40 to 400 FPS (out of 600)
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 50,
        English: 50,
      },
      additionalRequirements: [
        "Portfolio submission required (75% or above for guaranteed admission)",
        "Creative exercises must be completed",
        "Foundation for Master of Architecture",
      ],
      careerOpportunities: [
        "Architectural Technologist",
        "Urban Designer",
        "Landscape Architect",
        "Conservation Specialist",
        "City Planner",
      ],
    },
    {
      id: "uct-bsc-construction",
      name: "BSc Construction Studies",
      faculty: "Engineering & the Built Environment",
      apsRequired: 450, // Updated to 450 FPS Band A
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 65,
        "Physical Sciences": 60,
      },
      additionalRequirements: [
        "NBT in Mathematics, AL & QL required",
        "SACQSP and RICS accredited",
        "Leads to Quantity Surveying Honours",
      ],
      careerOpportunities: [
        "Quantity Surveyor",
        "Construction Manager",
        "Project Manager",
        "Cost Consultant",
        "Contract Administrator",
      ],
    },

    // FACULTY OF HEALTH SCIENCES
    {
      id: "uct-mbchb",
      name: "Bachelor of Medicine and Bachelor of Surgery (MBChB)",
      faculty: "Health Sciences",
      apsRequired: 628, // Updated from 810 to 628 FPS (out of 900) Band A per 2026 prospectus
      duration: "6 years",
      subjectRequirements: {
        Mathematics: 70,
        "Physical Sciences": 70,
        English: 65,
      },
      additionalRequirements: [
        "NBT scores of Proficient for AL, QL and Mathematics",
        "Extremely competitive program (240 places available)",
        "Followed by 2 years internship and 1 year community service",
      ],
      careerOpportunities: [
        "Medical Doctor",
        "Specialist Physician",
        "Surgeon",
        "General Practitioner",
        "Medical Researcher",
        "Public Health Specialist",
      ],
    },
    {
      id: "uct-bsc-physiotherapy",
      name: "BSc Physiotherapy",
      faculty: "Health Sciences",
      apsRequired: 550, // Updated from 730 to 550 FPS (out of 900) Band A
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 60,
        "Physical Sciences": 65, // or Life Sciences
        English: 65,
      },
      additionalRequirements: [
        "NBT scores of Intermediate or above for AL, QL and Mathematics",
        "70 places available",
        "Followed by 1 year community service",
      ],
      careerOpportunities: [
        "Physiotherapist",
        "Sports Physiotherapist",
        "Rehabilitation Specialist",
        "Private Practice Owner",
        "Hospital-based Therapist",
      ],
    },
    {
      id: "uct-bsc-occupational-therapy",
      name: "BSc Occupational Therapy",
      faculty: "Health Sciences",
      apsRequired: 540, // Updated from 730 to 540 FPS (out of 900) Band A
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 60, // or Mathematical Literacy 70%
        "Physical Sciences": 65, // or Life Sciences
        English: 65,
      },
      additionalRequirements: [
        "NBT scores of Intermediate or above for AL, QL and Mathematics",
        "70 places available",
        "Mathematical Literacy accepted with higher percentage",
      ],
      careerOpportunities: [
        "Occupational Therapist",
        "Rehabilitation Specialist",
        "Community Health Worker",
        "School-based Therapist",
        "Mental Health Specialist",
      ],
    },
    {
      id: "uct-bsc-audiology",
      name: "BSc Audiology",
      faculty: "Health Sciences",
      apsRequired: 530, // Updated from 720 to 530 FPS (out of 900) Band A
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 60, // or Mathematical Literacy 70%
        "Physical Sciences": 65, // or Life Sciences
        English: 65,
      },
      additionalRequirements: [
        "NBT scores of Intermediate or above for AL, QL and Mathematics",
        "37 places available",
        "Followed by 1 year community service",
      ],
      careerOpportunities: [
        "Audiologist",
        "Hearing Aid Specialist",
        "Noise Control Specialist",
        "School Audiologist",
        "Hospital-based Audiologist",
      ],
    },
    {
      id: "uct-bsc-speech-language",
      name: "BSc Speech-Language Pathology",
      faculty: "Health Sciences",
      apsRequired: 525, // Updated from 715 to 525 FPS (out of 900) Band A
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 60, // or Mathematical Literacy 70%
        "Physical Sciences": 65, // or Life Sciences
        English: 65,
      },
      additionalRequirements: [
        "NBT scores of Intermediate or above for AL, QL and Mathematics",
        "40 places available",
        "Followed by 1 year community service",
      ],
      careerOpportunities: [
        "Speech-Language Therapist",
        "Communication Disorders Specialist",
        "School-based Therapist",
        "Voice Therapist",
        "Swallowing Disorders Specialist",
      ],
    },

    // FACULTY OF HUMANITIES
    {
      id: "uct-ba",
      name: "Bachelor of Arts",
      faculty: "Humanities",
      apsRequired: 435, // Updated from 450 to 435 FPS Band A per 2026 prospectus
      duration: "3 years",
      subjectRequirements: {
        English: 50, // HL or 60 for FAL
      },
      additionalRequirements: [
        "NBT AL: Proficient for guaranteed admission",
        "Wide range of majors available",
        "Flexible degree structure",
      ],
      careerOpportunities: [
        "Teacher",
        "Journalist",
        "Social Worker",
        "Museum Curator",
        "Translator",
        "Cultural Analyst",
        "Government Official",
      ],
    },
    {
      id: "uct-bsocsci",
      name: "Bachelor of Social Science",
      faculty: "Humanities",
      apsRequired: 435, // Updated from 450 to 435 FPS Band A
      duration: "3 years",
      subjectRequirements: {
        English: 50, // HL or 60 for FAL
      },
      additionalRequirements: [
        "NBT AL: Proficient for guaranteed admission",
        "Social science focused majors",
        "Research-oriented approach",
      ],
      careerOpportunities: [
        "Social Researcher",
        "Policy Analyst",
        "NGO Worker",
        "Community Development Officer",
        "Market Researcher",
        "Human Resources Specialist",
      ],
    },
    {
      id: "uct-bsocsci-ppe",
      name: "Bachelor of Social Science in Philosophy, Politics and Economics",
      faculty: "Humanities",
      apsRequired: 435, // Updated from 450 to 435 FPS Band A
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 60,
        English: 50, // HL or 60 for FAL
      },
      additionalRequirements: [
        "NBT AL: Proficient",
        "NBT QL: Upper Intermediate or above",
        "Classic combination degree",
      ],
      careerOpportunities: [
        "Policy Analyst",
        "Political Advisor",
        "Economist",
        "Journalist",
        "Diplomat",
        "Management Consultant",
      ],
    },
    {
      id: "uct-bsw",
      name: "Bachelor of Social Work",
      faculty: "Humanities",
      apsRequired: 435, // Updated from 450 to 435 FPS Band A
      duration: "4 years",
      subjectRequirements: {
        English: 50, // HL or 60 for FAL
      },
      additionalRequirements: [
        "NBT AL: Proficient for guaranteed admission",
        "May require admissions interview",
        "Professional qualification",
      ],
      careerOpportunities: [
        "Social Worker",
        "Community Development Worker",
        "Child Protection Officer",
        "Family Therapist",
        "NGO Program Manager",
      ],
    },
    {
      id: "uct-ba-fine-art",
      name: "Bachelor of Arts in Fine Art",
      faculty: "Humanities",
      apsRequired: 380, // Kept at 380 as no update found in prospectus
      duration: "4 years",
      subjectRequirements: {
        English: 50, // HL or 60 for FAL
      },
      additionalRequirements: [
        "Portfolio evaluation required",
        "NBT AL: Intermediate or above",
        "Leading indicator is portfolio performance",
      ],
      careerOpportunities: [
        "Visual Artist",
        "Curator",
        "Art Teacher",
        "Gallery Manager",
        "Art Critic",
        "Arts Administrator",
      ],
    },
    {
      id: "uct-bmus",
      name: "Bachelor of Music",
      faculty: "Humanities",
      apsRequired: 380, // Kept at 380 as no update found in prospectus
      duration: "4 years",
      subjectRequirements: {
        English: 50, // HL or 60 for FAL
        Music: 60,
      },
      additionalRequirements: [
        "Audition, interview and music theory test required",
        "Unisa Music Theory Grade V or above",
        "Unisa Music Practical Grade VII or above",
      ],
      careerOpportunities: [
        "Professional Musician",
        "Music Teacher",
        "Composer",
        "Music Producer",
        "Audio Technologist",
        "Music Therapist",
      ],
    },

    // FACULTY OF LAW
    {
      id: "uct-llb-undergraduate",
      name: "Bachelor of Laws (LLB) - 4 year",
      faculty: "Law",
      apsRequired: 470, // Updated from 500 to 470 FPS Band A per 2026 prospectus
      duration: "4 years",
      subjectRequirements: {
        English: 50, // HL or 60 for FAL
      },
      additionalRequirements: [
        "NBT scores of proficient for AL and intermediate or above for QL",
        "Highly competitive program",
        "Professional legal qualification",
      ],
      careerOpportunities: [
        "Attorney",
        "Advocate",
        "Magistrate",
        "Judge",
        "Legal Advisor",
        "Corporate Lawyer",
        "Human Rights Lawyer",
      ],
    },

    // FACULTY OF SCIENCE
    {
      id: "uct-bsc",
      name: "Bachelor of Science",
      faculty: "Science",
      apsRequired: 550, // Updated from 660 to 550 FPS Band A (out of 800) per 2026 prospectus
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 70,
        "Physical Sciences": 60,
      },
      additionalRequirements: [
        "NBT in Mathematics, AL & QL required",
        "Wide range of majors available",
        "Some majors have limited places",
      ],
      careerOpportunities: [
        "Research Scientist",
        "Laboratory Technician",
        "Environmental Consultant",
        "Data Scientist",
        "Science Teacher",
        "Medical Researcher",
      ],
    },
    {
      id: "uct-bsc-computer-science",
      name: "BSc Computer Science",
      faculty: "Science",
      apsRequired: 550, // Updated from 660 to 550 FPS Band A
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 70,
        "Physical Sciences": 60, // or Information Technology
      },
      additionalRequirements: [
        "NBT in Mathematics, AL & QL required",
        "Strong programming foundation",
        "BCS accredited program",
      ],
      careerOpportunities: [
        "Software Developer",
        "Systems Analyst",
        "Data Scientist",
        "Cybersecurity Specialist",
        "AI/ML Engineer",
        "Research Scientist",
      ],
    },
    {
      id: "uct-bsc-mathematics",
      name: "BSc Mathematics",
      faculty: "Science",
      apsRequired: 550, // Updated from 660 to 550 FPS Band A
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 70,
        "Physical Sciences": 60,
      },
      additionalRequirements: [
        "NBT in Mathematics, AL & QL required",
        "Strong analytical skills required",
        "Foundation for various careers",
      ],
      careerOpportunities: [
        "Mathematician",
        "Statistician",
        "Actuary",
        "Data Analyst",
        "Financial Analyst",
        "Research Scientist",
      ],
    },
    {
      id: "uct-bsc-physics",
      name: "BSc Physics",
      faculty: "Science",
      apsRequired: 550, // Updated from 660 to 550 FPS Band A
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 70,
        "Physical Sciences": 60,
      },
      additionalRequirements: [
        "NBT in Mathematics, AL & QL required",
        "Strong mathematical foundation",
        "Research opportunities available",
      ],
      careerOpportunities: [
        "Physicist",
        "Research Scientist",
        "Engineer",
        "Data Scientist",
        "Medical Physicist",
        "Science Teacher",
      ],
    },
    {
      id: "uct-bsc-chemistry",
      name: "BSc Chemistry",
      faculty: "Science",
      apsRequired: 550, // Updated from 660 to 550 FPS Band A
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 70,
        "Physical Sciences": 60,
      },
      additionalRequirements: [
        "NBT in Mathematics, AL & QL required",
        "Laboratory work intensive",
        "Central science foundation",
      ],
      careerOpportunities: [
        "Chemist",
        "Research Scientist",
        "Quality Control Analyst",
        "Environmental Consultant",
        "Pharmaceutical Scientist",
        "Science Teacher",
      ],
    },
    {
      id: "uct-bsc-biology",
      name: "BSc Biology",
      faculty: "Science",
      apsRequired: 550, // Updated from 660 to 550 FPS Band A
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 70,
        "Physical Sciences": 60,
      },
      additionalRequirements: [
        "NBT in Mathematics, AL & QL required",
        "Limited places available",
        "Field work opportunities",
      ],
      careerOpportunities: [
        "Biologist",
        "Conservation Scientist",
        "Research Scientist",
        "Environmental Consultant",
        "Science Teacher",
        "Wildlife Manager",
      ],
    },
    {
      id: "uct-bsc-geology",
      name: "BSc Geology",
      faculty: "Science",
      apsRequired: 550, // Updated from 660 to 550 FPS Band A
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 70,
        "Physical Sciences": 60,
      },
      additionalRequirements: [
        "NBT in Mathematics, AL & QL required",
        "Limited places available",
        "Field work component",
      ],
      careerOpportunities: [
        "Geologist",
        "Mining Engineer",
        "Environmental Consultant",
        "Petroleum Geologist",
        "Hydrogeologist",
        "Research Scientist",
      ],
    },
  ]

  /**
   * Custom APS calculation for UCT
   * UCT uses different FPS calculations for different faculties
   */
  calculateAPS(subjects: Record<string, number>): number {
    // Standard APS calculation (sum of best 6 subjects excluding LO)
    const validSubjects = Object.entries(subjects)
      .filter(([subject]) => subject !== "Life Orientation")
      .map(([, mark]) => mark)
      .sort((a, b) => b - a)
      .slice(0, 6)

    return validSubjects.reduce((sum, mark) => sum + mark, 0)
  }

  /**
   * Calculate Faculty Points Score for different faculties
   */
  calculateFPS(subjects: Record<string, number>, faculty: string): number {
    const aps = this.calculateAPS(subjects)

    switch (faculty) {
      case "Science":
        // Science FPS = APS + doubled Math and Physical Science (out of 800)
        const mathScore = subjects["Mathematics"] || 0
        const physicsScore = subjects["Physical Sciences"] || 0
        return aps + mathScore + physicsScore

      case "Health Sciences":
        // Health Sciences FPS = APS + NBT scores (out of 900)
        // Note: NBT scores would need to be added separately
        return aps

      default:
        // Commerce, Engineering, Humanities, Law use APS as FPS
        return aps
    }
  }

  /**
   * Get qualifying courses based on subjects and APS
   */
  getQualifyingCourses(subjects: Record<string, number>): Course[] {
    const aps = this.calculateAPS(subjects)

    return this._courses.filter((course) => {
      // Check minimum APS
      if (aps < course.apsMin) return false

      // Check subject requirements
      for (const [subject, minMark] of Object.entries(course.subjectRequirements)) {
        const studentMark = subjects[subject] || 0
        if (studentMark < minMark) return false
      }

      return true
    })
  }

  /**
   * Get courses by faculty
   */
  getCoursesByFaculty(faculty: string): Course[] {
    return this._courses.filter((course) => course.faculty === faculty)
  }

  /**
   * Get all available faculties
   */
  getFaculties(): string[] {
    return [...new Set(this._courses.map((course) => course.faculty))]
  }

  /**
   * Get detailed admission information
   */
  getAdmissionInfo(): string[] {
    return [
      "UCT uses a comprehensive admissions policy with redress measures",
      "Applications open 1 April and close 31 July",
      "NBT tests required for most programs",
      "International students require matriculation exemption",
      "Early conditional offers available for strong candidates",
      "Selection based on Faculty Points Score (FPS) and redress categories",
      "Some programs require portfolios, auditions, or interviews",
    ]
  }

  /**
   * Get financial aid information
   */
  getFinancialAidInfo(): string[] {
    return [
      "NSFAS funding available for eligible South African students",
      "UCT entrance scholarships up to R100,000",
      "Sports scholarships for provincial/national representatives",
      "Vice-Chancellor's scholarships for top achievers",
      "GAP funding for families earning R350,000-R600,000",
      "Various external bursaries and scholarships available",
      "Work-study opportunities on campus",
    ]
  }

  /**
   * Get campus and facilities information
   */
  getCampusInfo(): string[] {
    return [
      "Four campuses: Upper, Middle, Lower, and Health Sciences",
      "Located on the slopes of Devil's Peak in Cape Town",
      "Extensive library system with 24/7 study areas",
      "Modern sports facilities including gym, pools, and fields",
      "Student housing available in three-tier system",
      "Free shuttle service between campuses and residences",
      "Over 40 sports clubs and 100+ student societies",
      "Comprehensive student support services",
    ]
  }
}
