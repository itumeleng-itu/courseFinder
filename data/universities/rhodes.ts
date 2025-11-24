import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * Rhodes University class
 */
export class Rhodes extends BaseUniversity {
  readonly id = "ru"
  readonly name = "Rhodes University"
  readonly shortName = "Rhodes"
  readonly website = "https://www.ru.ac.za"
  readonly logo = "/logos/rhodes.png"
  readonly location = {
    city: "Makhanda (Grahamstown)",
    province: "Eastern Cape",
    coordinates: {
      latitude: -33.311,
      longitude: 26.5225,
    },
  }

  protected readonly _courses: Course[] = [
    // Faculty of Commerce
    {
      id: "ru-bcom",
      name: "Bachelor of Commerce",
      faculty: "Commerce",
      apsMin: 38,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 5,
      },
      additionalRequirements: "APS of 45+ for automatic acceptance. APS of 38-44 considered at Dean's discretion.",
      careers: "Accounting, Economics, Information Systems, Management, Finance, Marketing",
    },
    {
      id: "ru-bcom-extended",
      name: "Bachelor of Commerce (Extended Studies)",
      faculty: "Commerce",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 5,
      },
      additionalRequirements:
        "For students from disadvantaged backgrounds who show potential. Additional literacy and numeracy courses.",
      careers: "Accounting, Economics, Information Systems, Management, Finance, Marketing",
    },
    {
      id: "ru-bbs",
      name: "Bachelor of Business Science",
      faculty: "Commerce",
      apsMin: 45,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 7,
      },
      additionalRequirements: "APS of 45+ for automatic acceptance. APS of 38-44 considered at Dean's discretion.",
      careers: "Computer Science, Economics, Information Systems, Management, Quantitative Management",
    },
    {
      id: "ru-beco",
      name: "Bachelor of Economics",
      faculty: "Commerce",
      apsMin: 38,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 5,
      },
      additionalRequirements: "APS of 45+ for automatic acceptance. APS of 38-44 considered at Dean's discretion.",
      careers: "Environmental Economics, Mineral Economics, Social Sciences, Business Sciences",
    },

    // Faculty of Science
    {
      id: "ru-bsc",
      name: "Bachelor of Science",
      faculty: "Science",
      apsMin: 38,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 6,
        "Physical Sciences": 5,
      },
      additionalRequirements:
        "APS of 45+ for automatic acceptance. APS of 38-44 considered at Dean's discretion. Life Sciences at 50% may be accepted instead of Physical Sciences for some majors.",
      careers: "Biological Sciences, Earth Sciences, Life Sciences, Research, Environmental Management",
    },
    {
      id: "ru-bsc-infosys",
      name: "Bachelor of Science (Information Systems)",
      faculty: "Science",
      apsMin: 38,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 7,
      },
      additionalRequirements: "APS of 45+ for automatic acceptance. APS of 38-44 considered at Dean's discretion.",
      careers: "Information Systems, Computer Science, Economics Management, IT Consulting",
    },

    // Faculty of Pharmacy
    {
      id: "ru-bpharm",
      name: "Bachelor of Pharmacy",
      faculty: "Pharmacy",
      apsMin: 40,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 5,
        "Life Sciences": 5,
        "Physical Sciences": 5,
      },
      additionalRequirements: "APS of 45+ for automatic acceptance. APS of 40-44 considered at Dean's discretion.",
      careers: "Retail Pharmacy, Hospital Pharmacy, Industrial Pharmacy, Research, Regulatory Affairs",
      courseStructure: [
        "Year 1: Anatomy & Physiology, Chemistry, Cell Biology, Introduction ICT, Mathematics IS, Biochemistry, Foundations of Pharmacy",
        "Year 2: Anatomy & Physiology 2, Pharmaceutical Chemistry 2, Pathology 2, Microbiology 2, Pharmaceutics 2, Biochemistry 2, Pharmacy Practice 2",
        "Year 3: Pharmaceutical Chemistry 3, Biostatistics, Pharmacology 3, Pharmaceutics 3, Pharmacy Practice 3",
        "Year 4: Research Project, Pharmacotherapy, Elective, Pharmacology 4, Pharmaceutics 4, Pharmacy Practice 4",
      ],
    },

    // Faculty of Law
    {
      id: "ru-llb",
      name: "Bachelor of Laws",
      faculty: "Law",
      apsMin: 38,
      duration: "4 years",
      subjectRequirements: {},
      additionalRequirements:
        "Limited number of students admitted directly to LLB1. Most students enter after completing a first degree.",
      careers: "Attorney, Advocate, Legal Advisor, Magistrate, Judge, Legal Consultant",
    },
    {
      id: "ru-llb-combined",
      name: "BA/BCom/BSc with Law",
      faculty: "Law",
      apsMin: 38,
      duration: "5 years",
      subjectRequirements: {},
      additionalRequirements: "3-year undergraduate degree plus 2-year LLB. Legal Theory 3 with minimum 60% required.",
      careers: "Commercial Law, Patent Law, Environmental Law, Human Rights Law, Corporate Law",
    },
    {
      id: "ru-llb-postgrad",
      name: "LLB (Postgraduate)",
      faculty: "Law",
      apsMin: 0,
      duration: "3 years",
      subjectRequirements: {},
      additionalRequirements: "Requires a completed Bachelor's degree without Law subjects.",
      careers: "Attorney, Advocate, Legal Advisor, Magistrate, Judge, Legal Consultant",
    },

    // Faculty of Education
    {
      id: "ru-bedfp",
      name: "Bachelor of Education (Foundation Phase)",
      faculty: "Education",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 4,
        "Additional Language": 4,
        Mathematics: 3,
      },
      additionalRequirements:
        "APS of 40+ for automatic acceptance. APS of 32-39 considered at Dean's discretion. Mathematical Literacy at level 4 accepted instead of Mathematics.",
      careers: "Foundation Phase Teaching (Grade R-3), Education Management, Educational Psychology",
    },
    {
      id: "ru-pgce",
      name: "Postgraduate Certificate in Education",
      faculty: "Education",
      apsMin: 0,
      duration: "1 year",
      subjectRequirements: {},
      additionalRequirements:
        "Requires a completed Bachelor's degree. Available for Foundation Phase, Intermediate Phase, Senior Phase, and FET Teaching.",
      careers: "Teaching, Education Management, Curriculum Development",
    },

    // Faculty of Humanities
    {
      id: "ru-ba",
      name: "Bachelor of Arts",
      faculty: "Humanities",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {},
      additionalRequirements: "APS of 45+ for automatic acceptance. APS of 34-44 considered at Dean's discretion.",
      careers: "Media, Publishing, Public Relations, Government, NGOs, Research, Education",
    },
    {
      id: "ru-bss",
      name: "Bachelor of Social Science",
      faculty: "Humanities",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {},
      additionalRequirements: "APS of 45+ for automatic acceptance. APS of 34-44 considered at Dean's discretion.",
      careers: "Psychology, Sociology, Politics, Anthropology, Economics, Management, Social Work",
    },
    {
      id: "ru-bfa",
      name: "Bachelor of Fine Art",
      faculty: "Humanities",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {},
      additionalRequirements:
        "APS of 45+ for automatic acceptance. APS of 34-44 considered at Dean's discretion. Portfolio may be required.",
      careers: "Fine Art Practice, Art History, Visual Culture, Curating, Art Education",
    },
    {
      id: "ru-bmus",
      name: "Bachelor of Music",
      faculty: "Humanities",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {},
      additionalRequirements:
        "APS of 45+ for automatic acceptance. APS of 34-44 considered at Dean's discretion. Audition required.",
      careers: "Instrumental Music, Music Theory, Music Education, Performance, Composition",
    },
    {
      id: "ru-bjourn",
      name: "Bachelor of Journalism",
      faculty: "Humanities",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {},
      additionalRequirements:
        "APS of 45+ for automatic acceptance. APS of 34-44 considered at Dean's discretion. Same as BA or BSS with Journalism in the 4th year.",
      careers: "Journalism, Media, Publishing, Public Relations, Communication, Digital Media",
    },
    {
      id: "ru-ba-extended",
      name: "BA/BSS Extended Studies",
      faculty: "Humanities",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {},
      additionalRequirements:
        "APS of 30-34 points. Limited curriculum (Journalism & Anthropology or Politics & Sociology in the first year).",
      careers: "Media, Publishing, Public Relations, Government, NGOs, Research, Education",
    },
  ]

  /**
   * Rhodes-specific APS calculation
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