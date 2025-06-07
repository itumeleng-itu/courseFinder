import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * University of Fort Hare (UFH) class
 */
export class UFH extends BaseUniversity {
  readonly id = "ufh"
  readonly name = "University of Fort Hare"
  readonly shortName = "UFH"
  readonly website = "https://www.ufh.ac.za"
  readonly logo = "/logos/ufh.png"
  readonly location = {
    city: "Alice",
    province: "Eastern Cape",
    coordinates: {
      latitude: -32.7833,
      longitude: 26.85,
    },
  }

  /**
   * Calculate APS score based on UFH's method
   * UFH uses NSC levels directly with Life Orientation capped at level 4
   */
  calculateAps(subjects: { name: string; percent: number }[]): number {
    // Sort subjects by percentage in descending order
    const sortedSubjects = [...subjects].sort((a, b) => b.percent - a.percent)

    let totalAps = 0
    let subjectsUsed = 0

    for (const subject of sortedSubjects) {
      // Skip Life Orientation for now, we'll add it separately with cap
      if (subject.name === "Life Orientation") continue

      // Get APS points based on percentage
      const points = this.getApsPoints(subject.percent)

      // Add points to total
      totalAps += points
      subjectsUsed++

      // Only use 6 subjects excluding Life Orientation
      if (subjectsUsed >= 6) break
    }

    // Add Life Orientation (capped at level 4)
    const lifeOrientation = subjects.find((s) => s.name === "Life Orientation")
    if (lifeOrientation) {
      const loPoints = Math.min(this.getApsPoints(lifeOrientation.percent), 4)
      totalAps += loPoints
    }

    return totalAps
  }

  /**
   * Convert percentage to APS points based on NSC levels
   */
  private getApsPoints(percent: number): number {
    if (percent >= 80) return 7
    if (percent >= 70) return 6
    if (percent >= 60) return 5
    if (percent >= 50) return 4
    if (percent >= 40) return 3
    if (percent >= 30) return 2
    return 1
  }

  protected readonly _courses: Course[] = [
    // FACULTY OF EDUCATION
    {
      id: "ufh-bed-senior-fet-agriculture",
      name: "Bachelor of Education Senior and FET Phase (Agriculture specialisation)",
      faculty: "Education",
      apsMin: 28,
      duration: "4 years",
      studyMode: "Full-time",
      location: "Alice Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 4,
        "Agricultural Science": 4,
        "Life Sciences": 4,
      },
      additionalRequirements:
        "Life Orientation at level 4 (50-59%). With Mathematical Literacy, minimum APS is 29 with level 5 (60-69%).",
      careers:
        "Secondary school teacher specializing in agricultural subjects, agricultural education specialist, curriculum developer.",
    },
    {
      id: "ufh-bed-senior-fet-commerce",
      name: "Bachelor of Education Senior and FET Phase (Commerce specialisation)",
      faculty: "Education",
      apsMin: 28,
      duration: "4 years",
      studyMode: "Full-time",
      location: "Alice Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 3,
        Accounting: 4,
        Economics: 4,
        "Business Studies": 4,
      },
      additionalRequirements:
        "Life Orientation at level 4 (50-59%). With Mathematics, minimum APS is 27. Any two of Accounting, Economics or Business Studies at level 4.",
      careers:
        "Secondary school teacher specializing in commercial subjects, business education specialist, curriculum developer.",
    },
    {
      id: "ufh-bed-senior-fet-science",
      name: "Bachelor of Education Senior and FET Phase (Science specialisation)",
      faculty: "Education",
      apsMin: 28,
      duration: "4 years",
      studyMode: "Full-time",
      location: "Alice Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
        Geography: 4,
        "Computer Applications Technology": 4,
      },
      additionalRequirements:
        "Life Orientation at level 4 (50-59%). One of Physical Science, Life Science, Geography or Computer Science at level 4.",
      careers:
        "Secondary school teacher specializing in science subjects, science education specialist, curriculum developer.",
    },
    {
      id: "ufh-bed-senior-fet-social-science",
      name: "Bachelor of Education Senior and FET Phase (Social Science specialisation)",
      faculty: "Education",
      apsMin: 28,
      duration: "4 years",
      studyMode: "Full-time",
      location: "Alice Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        "isiXhosa Home Language": 4,
        "isiXhosa First Additional Language": 4,
        "Afrikaans Home Language": 4,
        "Afrikaans First Additional Language": 4,
        History: 4,
        Geography: 4,
      },
      additionalRequirements:
        "Life Orientation at level 4 (50-59%). Either isiXhosa or Afrikaans (Home or First Additional) at level 4. Either History or Geography at level 4.",
      careers:
        "Secondary school teacher specializing in social science subjects, history or geography teacher, curriculum developer.",
    },
    {
      id: "ufh-bed-foundation-phase",
      name: "Bachelor of Education in Foundation Phase Teaching",
      faculty: "Education",
      apsMin: 28,
      duration: "4 years",
      studyMode: "Full-time",
      location: "East London Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 4,
        "isiXhosa Home Language": 4,
        "isiXhosa First Additional Language": 4,
        "Afrikaans Home Language": 4,
        "Afrikaans First Additional Language": 4,
      },
      additionalRequirements:
        "Life Orientation at level 4 (50-59%). With Mathematical Literacy, minimum APS is 29 with level 5 (60-69%). Either isiXhosa or Afrikaans (Home or First Additional) at level 4.",
      careers:
        "Foundation phase teacher (Grade R-3), early childhood development specialist, curriculum developer for early learning.",
    },
    {
      id: "ufh-bed-intermediate-phase",
      name: "Bachelor of Education in Intermediate Phase Teaching",
      faculty: "Education",
      apsMin: 28,
      duration: "4 years",
      studyMode: "Full-time",
      location: "East London Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 4,
        "isiXhosa Home Language": 4,
        "isiXhosa First Additional Language": 4,
        "Afrikaans Home Language": 4,
        "Afrikaans First Additional Language": 4,
      },
      additionalRequirements:
        "Life Orientation at level 4 (50-59%). With Mathematical Literacy, minimum APS is 29 with level 5 (60-69%). Either isiXhosa or Afrikaans (Home or First Additional) at level 4.",
      careers: "Intermediate phase teacher (Grade 4-6), curriculum specialist, educational consultant.",
    },

    // FACULTY OF LAW
    {
      id: "ufh-llb",
      name: "Bachelor of Laws",
      faculty: "Law",
      apsMin: 30,
      duration: "4 years",
      studyMode: "Full-time",
      location: "East London Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 3,
      },
      additionalRequirements:
        "Life Orientation at level 4 (50-59%). Mathematical Literacy or Technical Mathematics at level 4 can substitute for Mathematics.",
      careers: "Attorney, advocate, legal advisor, magistrate, prosecutor, legal researcher, human rights lawyer.",
    },
    {
      id: "ufh-llb-extended",
      name: "Bachelor of Laws (Extended Programme)",
      faculty: "Law",
      apsMin: 26,
      duration: "5 years",
      studyMode: "Full-time",
      location: "East London Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 2,
      },
      additionalRequirements:
        "Life Orientation at level 4 (50-59%). With Mathematical Literacy or Technical Mathematics at level 4, minimum APS is 28.",
      careers: "Attorney, advocate, legal advisor, magistrate, prosecutor, legal researcher, human rights lawyer.",
    },
    {
      id: "ufh-bcom-law",
      name: "Bachelor of Commerce in Law",
      faculty: "Law",
      apsMin: 28,
      duration: "4 years",
      studyMode: "Full-time",
      location: "East London Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 4,
      },
      additionalRequirements:
        "Life Orientation at level 4 (50-59%). With Mathematical Literacy or Technical Mathematics at level 5 (60-69%), minimum APS is 29.",
      careers:
        "Corporate lawyer, legal advisor to businesses, compliance officer, tax consultant, banking and finance law specialist.",
    },

    // FACULTY OF HEALTH SCIENCES
    {
      id: "ufh-bhsc-human-movement",
      name: "Bachelor of Health Sciences in Human Movement Science",
      faculty: "Health Sciences",
      apsMin: 28,
      duration: "3 years",
      studyMode: "Full-time",
      location: "Alice Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 4,
        "Life Sciences": 4,
      },
      additionalRequirements:
        "Life Orientation at level 4 (50-59%). With Mathematical Literacy at level 5 (60-69%), minimum APS is 29.",
      careers:
        "Sports scientist, exercise physiologist, biokineticist, fitness instructor, sports coach, physical education teacher.",
    },
    {
      id: "ufh-bsc-speech-language",
      name: "Bachelor of Science in Speech Language Pathology",
      faculty: "Health Sciences",
      apsMin: 28,
      duration: "4 years",
      studyMode: "Full-time",
      location: "East London Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
      additionalRequirements:
        "Life Orientation at level 4 (50-59%). With Mathematical Literacy at level 5 (60-69%), minimum APS is 29.",
      careers:
        "Speech-language pathologist, audiologist, speech therapist, rehabilitation specialist, special needs educator.",
    },
    {
      id: "ufh-bnursing",
      name: "Bachelor of Nursing",
      faculty: "Health Sciences",
      apsMin: 28,
      duration: "4 years",
      studyMode: "Full-time",
      location: "East London Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
      additionalRequirements:
        "Life Orientation at level 4 (50-59%). With Mathematical Literacy at level 5 (60-69%), minimum APS is 29.",
      careers:
        "Registered nurse, midwife, community health nurse, psychiatric nurse, nursing educator, nursing manager.",
    },

    // FACULTY OF MANAGEMENT AND COMMERCE
    {
      id: "ufh-badmin-public-admin",
      name: "Bachelor of Administration in Public Administration",
      faculty: "Management and Commerce",
      apsMin: 26,
      duration: "3 years",
      studyMode: "Full-time",
      location: "Alice Campus, East London Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 2,
      },
      additionalRequirements:
        "Life Orientation at level 4 (50-59%). With Mathematics or Mathematical Literacy, minimum APS is 28.",
      careers: "Public administrator, government official, policy analyst, municipal manager, public service manager.",
    },
    {
      id: "ufh-bcom",
      name: "Bachelor of Commerce",
      faculty: "Management and Commerce",
      apsMin: 28,
      duration: "3 years",
      studyMode: "Full-time",
      location: "Alice Campus, East London Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 4,
      },
      additionalRequirements: "Life Orientation at level 4 (50-59%).",
      careers: "Business manager, entrepreneur, marketing specialist, human resource manager, business consultant.",
    },
    {
      id: "ufh-bcom-extended",
      name: "Bachelor of Commerce (Extended Programme)",
      faculty: "Management and Commerce",
      apsMin: 27,
      duration: "4 years",
      studyMode: "Full-time",
      location: "Alice Campus, East London Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 3,
      },
      additionalRequirements: "Life Orientation at level 4 (50-59%).",
      careers: "Business manager, entrepreneur, marketing specialist, human resource manager, business consultant.",
    },
    {
      id: "ufh-bcom-accounting",
      name: "Bachelor of Commerce in Accounting",
      faculty: "Management and Commerce",
      apsMin: 32,
      duration: "3 years",
      studyMode: "Full-time",
      location: "Alice Campus, East London Campus",
      subjectRequirements: {
        "English Home Language": 5,
        "English First Additional Language": 5,
        Mathematics: 5,
      },
      additionalRequirements: "Life Orientation at level 4 (50-59%). Two additional subjects at level 5 (60-69%).",
      careers: "Chartered accountant, financial manager, auditor, tax consultant, financial analyst.",
    },
    {
      id: "ufh-bcom-accounting-extended",
      name: "Bachelor of Commerce in Accounting (Extended Programme)",
      faculty: "Management and Commerce",
      apsMin: 30,
      duration: "4 years",
      studyMode: "Full-time",
      location: "Alice Campus, East London Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 4,
      },
      additionalRequirements: "Life Orientation at level 4 (50-59%). Two additional subjects at level 5 (60-69%).",
      careers: "Chartered accountant, financial manager, auditor, tax consultant, financial analyst.",
    },
    {
      id: "ufh-bcom-information-systems",
      name: "Bachelor of Commerce in Information Systems",
      faculty: "Management and Commerce",
      apsMin: 28,
      duration: "3 years",
      studyMode: "Full-time",
      location: "Alice Campus, East London Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 4,
      },
      additionalRequirements: "Life Orientation at level 4 (50-59%).",
      careers: "IT manager, systems analyst, business analyst, database administrator, IT consultant.",
    },
    {
      id: "ufh-bcom-information-systems-extended",
      name: "Bachelor of Commerce in Information Systems (Extended Programme)",
      faculty: "Management and Commerce",
      apsMin: 27,
      duration: "4 years",
      studyMode: "Full-time",
      location: "Alice Campus, East London Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 3,
      },
      additionalRequirements: "Life Orientation at level 4 (50-59%).",
      careers: "IT manager, systems analyst, business analyst, database administrator, IT consultant.",
    },

    // FACULTY OF SOCIAL SCIENCE AND HUMANITIES
    {
      id: "ufh-ba",
      name: "Bachelor of Arts",
      faculty: "Social Science and Humanities",
      apsMin: 27,
      duration: "3 years",
      studyMode: "Full-time",
      location: "Alice Campus, East London Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
      },
      additionalRequirements: "Life Orientation at level 4 (50-59%). Another language at level 4 (50-59%).",
      careers: "Journalist, translator, writer, researcher, public relations specialist, communications officer.",
    },
    {
      id: "ufh-ba-extended",
      name: "Bachelor of Arts (Extended Programme)",
      faculty: "Social Science and Humanities",
      apsMin: 26,
      duration: "4 years",
      studyMode: "Full-time",
      location: "Alice Campus, East London Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
      },
      additionalRequirements: "Life Orientation at level 4 (50-59%). Another language at level 4 (50-59%).",
      careers: "Journalist, translator, writer, researcher, public relations specialist, communications officer.",
    },
    {
      id: "ufh-bfa",
      name: "Bachelor of Fine Art",
      faculty: "Social Science and Humanities",
      apsMin: 27,
      duration: "4 years",
      studyMode: "Full-time",
      location: "East London Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
      },
      additionalRequirements:
        "Life Orientation at level 4 (50-59%). Another language at level 4 (50-59%). Portfolio submission required.",
      careers: "Artist, art director, curator, art teacher, graphic designer, illustrator.",
    },
    {
      id: "ufh-blis",
      name: "Bachelor of Library and Information Science",
      faculty: "Social Science and Humanities",
      apsMin: 27,
      duration: "4 years",
      studyMode: "Full-time",
      location: "Alice Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
      },
      additionalRequirements: "Life Orientation at level 4 (50-59%). Another language at level 4 (50-59%).",
      careers: "Librarian, information specialist, archivist, records manager, knowledge manager.",
    },
    {
      id: "ufh-bmusic",
      name: "Bachelor of Music",
      faculty: "Social Science and Humanities",
      apsMin: 27,
      duration: "4 years",
      studyMode: "Full-time",
      location: "Alice Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
      },
      additionalRequirements:
        "Life Orientation at level 4 (50-59%). Another language at level 4 (50-59%). Audition and music theory test required.",
      careers: "Musician, music teacher, composer, music producer, sound engineer, music therapist.",
    },
    {
      id: "ufh-bsocsc",
      name: "Bachelor of Social Science",
      faculty: "Social Science and Humanities",
      apsMin: 27,
      duration: "3 years",
      studyMode: "Full-time",
      location: "Alice Campus, East London Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
      },
      additionalRequirements: "Life Orientation at level 4 (50-59%). Another language at level 4 (50-59%).",
      careers: "Social researcher, policy analyst, development worker, community development practitioner.",
    },
    {
      id: "ufh-bsocsc-extended",
      name: "Bachelor of Social Science (Extended Programme)",
      faculty: "Social Science and Humanities",
      apsMin: 26,
      duration: "4 years",
      studyMode: "Full-time",
      location: "Alice Campus, East London Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
      },
      additionalRequirements: "Life Orientation at level 4 (50-59%). Another language at level 4 (50-59%).",
      careers: "Social researcher, policy analyst, development worker, community development practitioner.",
    },
    {
      id: "ufh-bsocsc-communication",
      name: "Bachelor of Social Science in Communication",
      faculty: "Social Science and Humanities",
      apsMin: 27,
      duration: "3 years",
      studyMode: "Full-time",
      location: "East London Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
      },
      additionalRequirements: "Life Orientation at level 4 (50-59%). Another language at level 4 (50-59%).",
      careers:
        "Communications specialist, media liaison officer, public relations practitioner, journalist, content creator.",
    },
    {
      id: "ufh-bsocsc-human-settlement",
      name: "Bachelor of Social Science in Human Settlement",
      faculty: "Social Science and Humanities",
      apsMin: 27,
      duration: "3 years",
      studyMode: "Full-time",
      location: "Alice Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
      },
      additionalRequirements: "Life Orientation at level 4 (50-59%). Another language at level 4 (50-59%).",
      careers: "Human settlements practitioner, housing policy analyst, urban planner, community development worker.",
    },
    {
      id: "ufh-bsw",
      name: "Bachelor of Social Work",
      faculty: "Social Science and Humanities",
      apsMin: 27,
      duration: "4 years",
      studyMode: "Full-time",
      location: "Alice Campus, East London Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
      },
      additionalRequirements: "Life Orientation at level 4 (50-59%). Another language at level 4 (50-59%).",
      careers: "Social worker, community development worker, counselor, case manager, child welfare specialist.",
    },
    {
      id: "ufh-bth",
      name: "Bachelor of Theology",
      faculty: "Social Science and Humanities",
      apsMin: 27,
      duration: "3 years",
      studyMode: "Full-time",
      location: "Alice Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
      },
      additionalRequirements: "Life Orientation at level 4 (50-59%). Another language at level 4 (50-59%).",
      careers: "Minister of religion, pastoral counselor, religious educator, chaplain, religious studies researcher.",
    },

    // FACULTY OF SCIENCE AND AGRICULTURE
    {
      id: "ufh-bsc",
      name: "Bachelor of Science",
      faculty: "Science and Agriculture",
      apsMin: 28,
      duration: "3 years",
      studyMode: "Full-time",
      location: "Alice Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
      additionalRequirements:
        "Life Orientation at level 4 (50-59%). One of Life Sciences, Geography, Agriculture or Information Technology at level 4.",
      careers: "Scientist, researcher, laboratory technician, environmental consultant, data analyst.",
    },
    {
      id: "ufh-bsc-extended",
      name: "Bachelor of Science (Extended Programme)",
      faculty: "Science and Agriculture",
      apsMin: 27,
      duration: "4 years",
      studyMode: "Full-time",
      location: "Alice Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 3,
        "Physical Sciences": 3,
      },
      additionalRequirements:
        "Life Orientation at level 4 (50-59%). Level 3 in either Mathematics or Physical Science, but the other must be at Level 4. One of Life Sciences, Geography, Agriculture or Information Technology at level 4.",
      careers: "Scientist, researcher, laboratory technician, environmental consultant, data analyst.",
    },
    {
      id: "ufh-bsc-agric-soil-science",
      name: "Bachelor of Science in Agriculture (in) Soil Science",
      faculty: "Science and Agriculture",
      apsMin: 28,
      duration: "4 years",
      studyMode: "Full-time",
      location: "Alice Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
      additionalRequirements:
        "Life Orientation at level 4 (50-59%). One of Life Sciences, Geography, Agriculture or Information Technology at level 4.",
      careers:
        "Soil scientist, agricultural researcher, environmental consultant, land use planner, agricultural extension officer.",
    },
    {
      id: "ufh-bsc-agric-horticulture",
      name: "Bachelor of Science in Agriculture (in) Horticulture",
      faculty: "Science and Agriculture",
      apsMin: 28,
      duration: "4 years",
      studyMode: "Full-time",
      location: "Alice Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
      additionalRequirements:
        "Life Orientation at level 4 (50-59%). One of Life Sciences, Geography, Agriculture or Information Technology at level 4.",
      careers: "Horticulturist, plant breeder, nursery manager, landscape designer, agricultural consultant.",
    },
    {
      id: "ufh-bsc-agric-crops",
      name: "Bachelor of Science in Agriculture (in) Crops",
      faculty: "Science and Agriculture",
      apsMin: 28,
      duration: "4 years",
      studyMode: "Full-time",
      location: "Alice Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
      additionalRequirements:
        "Life Orientation at level 4 (50-59%). One of Life Sciences, Geography, Agriculture or Information Technology at level 4.",
      careers: "Crop scientist, agronomist, plant breeder, agricultural researcher, farm manager.",
    },
    {
      id: "ufh-bsc-agric-animal-production",
      name: "Bachelor of Science in Agriculture (in) Animal Production",
      faculty: "Science and Agriculture",
      apsMin: 28,
      duration: "4 years",
      studyMode: "Full-time",
      location: "Alice Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
      additionalRequirements:
        "Life Orientation at level 4 (50-59%). One of Life Sciences, Geography, Agriculture or Information Technology at level 4.",
      careers:
        "Animal scientist, livestock production manager, animal nutritionist, agricultural extension officer, animal breeding specialist.",
    },
    {
      id: "ufh-bsc-agric-pasture-science",
      name: "Bachelor of Science in Agriculture (in) Pasture Science",
      faculty: "Science and Agriculture",
      apsMin: 28,
      duration: "4 years",
      studyMode: "Full-time",
      location: "Alice Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
      additionalRequirements:
        "Life Orientation at level 4 (50-59%). One of Life Sciences, Geography, Agriculture or Information Technology at level 4.",
      careers: "Pasture scientist, rangeland manager, agricultural researcher, conservation specialist, farm advisor.",
    },
    {
      id: "ufh-bsc-agric-agricultural-economics",
      name: "Bachelor of Science in Agriculture (in) Agricultural Economics",
      faculty: "Science and Agriculture",
      apsMin: 28,
      duration: "4 years",
      studyMode: "Full-time",
      location: "Alice Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 4,
        "Life Sciences": 4,
      },
      additionalRequirements:
        "Life Orientation at level 4 (50-59%). One of Agriculture, Geography or Information Technology at level 4.",
      careers:
        "Agricultural economist, agribusiness manager, agricultural policy analyst, farm financial manager, agricultural marketing specialist.",
    },
    {
      id: "ufh-bagric",
      name: "Bachelor of Agriculture",
      faculty: "Science and Agriculture",
      apsMin: 28,
      duration: "3 years",
      studyMode: "Full-time",
      location: "Alice Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 4,
        Agriculture: 4,
      },
      additionalRequirements:
        "Life Orientation at level 4 (50-59%). With Mathematical Literacy at level 5 (60-69%), minimum APS is 29.",
      careers: "Farm manager, agricultural extension officer, agricultural technician, agribusiness manager.",
    },
    {
      id: "ufh-bagric-agricultural-extension",
      name: "Bachelor of Agriculture (in) Agricultural Extension",
      faculty: "Science and Agriculture",
      apsMin: 28,
      duration: "3 years",
      studyMode: "Full-time",
      location: "Alice Campus",
      subjectRequirements: {
        "English Home Language": 4,
        "English First Additional Language": 4,
        Mathematics: 4,
        Agriculture: 4,
      },
      additionalRequirements:
        "Life Orientation at level 4 (50-59%). With Mathematical Literacy at level 5 (60-69%), minimum APS is 29.",
      careers:
        "Agricultural extension officer, rural development specialist, agricultural trainer, community development worker.",
    },
  ]
}
