import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * University of Mpumalanga (UMP) class
 */
export class UMP extends BaseUniversity {
  readonly id = "ump"
  readonly name = "University of Mpumalanga"
  readonly shortName = "UMP"
  readonly website = "https://www.ump.ac.za"
  readonly logo = "/logos/ump.png"
  readonly location = {
    city: "Mbombela",
    province: "Mpumalanga",
    coordinates: {
      latitude: -25.4478,
      longitude: 30.9699,
    },
  }

  protected readonly _courses: Course[] = [
    // Faculty of Agriculture, Science and Technology
    {
      id: "ump-bsc-agriculture",
      name: "Bachelor of Science in Agriculture",
      faculty: "Agriculture, Science and Technology",
      apsMin: 30,
      duration: "4 years",
      credits: 480,
      subjectRequirements: {
        "English (Home or First Additional)": 4,
        Mathematics: 4,
        "Life Sciences/Biology/Agriculture": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: "Mathematical Literacy (Level 6) can be accepted instead of Mathematics (Level 4).",
      careerOpportunities:
        "Agricultural scientist, agricultural researcher, agricultural extension officer, farm manager, agricultural consultant.",
    },
    {
      id: "ump-bsc-forestry",
      name: "Bachelor of Science in Forestry",
      faculty: "Agriculture, Science and Technology",
      apsMin: 30,
      duration: "4 years",
      credits: 498,
      subjectRequirements: {
        "English (Home or First Additional)": 4,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
      additionalRequirements:
        "Two of Life Science, Agricultural Science, or Geography at Level 4. NSC or IEB with Admission for Bachelor Pass.",
      careerOpportunities:
        "Forestry scientist, forest manager, environmental consultant, conservation officer, forestry researcher.",
    },
    {
      id: "ump-bsc-environmental",
      name: "Bachelor of Science in Environmental Science",
      faculty: "Agriculture, Science and Technology",
      apsMin: 30,
      duration: "3 years",
      credits: 360,
      subjectRequirements: {
        "English (Home or First Additional)": 4,
        Mathematics: 4,
      },
      additionalRequirements:
        "Mathematical Literacy (Level 6) can be accepted instead of Mathematics (Level 4). Two of Life Science, Physical Science, or Geography at Level 4. Students with a 360 credit Diploma in an appropriate field such as conservation will be considered for this degree.",
      careerOpportunities:
        "Environmental scientist, environmental consultant, conservation officer, environmental impact assessor, environmental policy analyst.",
    },
    {
      id: "ump-bsc-general",
      name: "Bachelor of Science Degree",
      faculty: "Agriculture, Science and Technology",
      apsMin: 30,
      duration: "3 years",
      credits: 360,
      subjectRequirements: {
        "English (Home or First Additional)": 4,
        Mathematics: 4,
        "Life Science/Physical Science/Geography": 4,
      },
      additionalRequirements:
        "Mathematical Literacy (Level 6) can be accepted instead of Mathematics (Level 4). Students with a 360 credit Diploma in an appropriate field such as conservation will be considered for this degree.",
      careerOpportunities: "Scientist, researcher, laboratory technician, environmental consultant, data analyst.",
    },
    {
      id: "ump-b-agriculture",
      name: "Bachelor of Agriculture in Agricultural Extension and Rural Resource Management",
      faculty: "Agriculture, Science and Technology",
      apsMin: 26,
      duration: "3 years",
      credits: 360,
      subjectRequirements: {
        "English (Home or First Additional)": 4,
        Mathematics: 4,
        "Agriculture/Life Science": 4,
        "Physical Science": 4,
      },
      additionalRequirements:
        "Mathematical Literacy (Level 6) can be accepted instead of Mathematics (Level 4). Minimum APS: 28 with Mathematical Literacy.",
      careerOpportunities:
        "Agricultural extension officer, rural development specialist, agricultural advisor, community development worker, agricultural project manager.",
    },
    {
      id: "ump-dip-nature-conservation",
      name: "Diploma in Nature Conservation",
      faculty: "Agriculture, Science and Technology",
      apsMin: 30,
      duration: "3 years",
      credits: 360,
      subjectRequirements: {
        "English (Home or First Additional)": 4,
        Mathematics: 2,
      },
      additionalRequirements:
        "Mathematical Literacy (Level 3) can be accepted instead of Mathematics (Level 2). Recommended subjects: Life Sciences and Geography at Level 4. NCV level 4 in Primary Agriculture with at least 50% for English, 30% for Mathematics or 40% for Mathematical Literacy.",
      careerOpportunities:
        "Nature conservation officer, game ranger, environmental educator, ecotourism guide, wildlife manager.",
    },
    {
      id: "ump-dip-agriculture-plant",
      name: "Diploma in Agriculture in Plant Production",
      faculty: "Agriculture, Science and Technology",
      apsMin: 23,
      duration: "3 years",
      credits: 360,
      subjectRequirements: {
        "English (Home or First Additional)": 4,
        Mathematics: 3,
      },
      additionalRequirements: "Minimum APS: 24 with Mathematical Literacy.",
      careerOpportunities:
        "Crop production manager, agricultural extension officer, farm manager, agricultural consultant, agribusiness specialist.",
    },
    {
      id: "ump-dip-animal-production",
      name: "Diploma in Animal Production",
      faculty: "Agriculture, Science and Technology",
      apsMin: 24,
      duration: "3 years",
      credits: 360,
      subjectRequirements: {
        "English (Home or First Additional)": 4,
        Mathematics: 3,
        "Physical Science": 3,
        "Life Sciences/Agriculture": 4,
      },
      additionalRequirements:
        "Mathematical Literacy (Level 6) can be accepted instead of Mathematics (Level 3). Minimum APS: 27 with Mathematical Literacy. NCV level 4 in Primary Agriculture with at least 50% for English, 40% for Mathematics or 70% for Mathematical Literacy.",
      careerOpportunities:
        "Animal production manager, livestock specialist, animal nutritionist, agricultural extension officer, farm manager.",
    },

    // Faculty of Economics, Development and Business Sciences
    {
      id: "ump-b-development-studies",
      name: "Bachelor of Development Studies",
      faculty: "Economics, Development and Business Sciences",
      apsMin: 32,
      duration: "3 years",
      credits: 360,
      subjectRequirements: {
        "English (Home or First Additional)": 4,
        Mathematics: 2,
        "History/Geography and One Other Social or Commercial Subject": 4,
      },
      additionalRequirements: "Mathematical Literacy (Level 3) can be accepted instead of Mathematics (Level 2).",
      careerOpportunities:
        "Development practitioner, policy analyst, project manager, community development worker, NGO coordinator.",
    },
    {
      id: "ump-b-commerce",
      name: "Bachelor of Commerce (General)",
      faculty: "Economics, Development and Business Sciences",
      apsMin: 30,
      duration: "3 years",
      credits: 360,
      subjectRequirements: {
        "English (Home or First Additional)": 4,
        Mathematics: 4,
      },
      additionalRequirements: "Mathematical Literacy is not accepted.",
      careerOpportunities: "Accountant, financial manager, business analyst, marketing specialist, entrepreneur.",
    },
    {
      id: "ump-b-administration",
      name: "Bachelor of Administration",
      faculty: "Economics, Development and Business Sciences",
      apsMin: 32,
      duration: "3 years",
      credits: 360,
      subjectRequirements: {
        "English (Home or First Additional)": 4,
        "Second Language": 4,
        Mathematics: 2,
      },
      additionalRequirements:
        "Mathematical Literacy (Level 3) can be accepted instead of Mathematics (Level 2). Students who wish to take Economics as an elective must have Mathematics Level 4.",
      careerOpportunities:
        "Public administrator, policy analyst, government official, municipal manager, public relations officer.",
    },
    {
      id: "ump-dip-hospitality",
      name: "Diploma in Hospitality Management",
      faculty: "Economics, Development and Business Sciences",
      apsMin: 24,
      duration: "3 years",
      credits: 360,
      subjectRequirements: {
        "English (Home or First Additional)": 4,
        Mathematics: 3,
      },
      additionalRequirements:
        "Mathematical Literacy (Level 4) can be accepted instead of Mathematics (Level 3). Minimum APS: 25 with Mathematical Literacy. Diploma Endorsement required.",
      careerOpportunities:
        "Hotel manager, restaurant manager, event coordinator, food and beverage manager, hospitality entrepreneur.",
    },
    {
      id: "ump-hcert-event-management",
      name: "Higher Certificate in Event Management",
      faculty: "Economics, Development and Business Sciences",
      apsMin: 19,
      duration: "1 year",
      credits: 120,
      subjectRequirements: {
        "English (Home or First Additional)": 4,
        Mathematics: 2,
      },
      additionalRequirements:
        "Mathematical Literacy or Technical Mathematics (Level 4) can be accepted instead of Mathematics (Level 2). Minimum APS: 21 with Mathematical Literacy. Higher Certificate/Diploma Endorsement required. Any three Additional Vocational Subjects at Level 2. NCV level 4 with the following recommended subject(s): Business Studies, Hospitality Studies, and Tourism Discipline.",
      careerOpportunities:
        "Event coordinator, event planner, conference organizer, wedding planner, festival coordinator.",
    },

    // Faculty of Humanities and Social Sciences
    {
      id: "ump-b-social-work",
      name: "Bachelor of Social Work",
      faculty: "Humanities and Social Sciences",
      apsMin: 32,
      duration: "4 years",
      credits: 480,
      subjectRequirements: {
        "English (Home or First Additional)": 4,
        Mathematics: 2,
      },
      additionalRequirements: "Mathematical Literacy (Level 3) can be accepted instead of Mathematics (Level 2).",
      careerOpportunities: "Social worker, community development worker, counselor, case manager, policy analyst.",
    },
    {
      id: "ump-ba-general",
      name: "Bachelor of Arts (General)",
      faculty: "Humanities and Social Sciences",
      apsMin: 28,
      duration: "3 years",
      credits: 360,
      subjectRequirements: {
        "English (Home or First Additional)": 4,
        Mathematics: 2,
      },
      additionalRequirements: "Mathematical Literacy (Level 3) can be accepted instead of Mathematics (Level 2).",
      careerOpportunities:
        "Journalist, public relations officer, communications specialist, researcher, cultural officer.",
    },
    {
      id: "ump-b-laws",
      name: "Bachelor of Laws",
      faculty: "Humanities and Social Sciences",
      apsMin: 33,
      duration: "4 years",
      credits: 480,
      subjectRequirements: {
        "English (Home or First Additional)": 4,
        "Additional Language": 4,
        Mathematics: 3,
      },
      additionalRequirements:
        "Mathematical Literacy (Level 4) can be accepted instead of Mathematics (Level 3). Bachelor Endorsement required. Selection will occur monthly. Applicants who exceed the minimum admission requirements and completed their NSC or equivalent will be made conditional offers. Those who meet the requirements will be placed on hold. Each month the new applicants will be considered along with those placed on hold. At least 50% of places will be reserved for applicants completing the NSC or equivalent.",
      careerOpportunities: "Attorney, advocate, legal advisor, magistrate, prosecutor.",
    },

    // Faculty of Education
    {
      id: "ump-bed-foundation",
      name: "Bachelor of Education in Foundation Phase Teaching",
      faculty: "Education",
      apsMin: 26,
      duration: "4 years",
      credits: 480,
      subjectRequirements: {
        "English (Home or First Additional)": 4,
      },
      additionalRequirements:
        "Minimum APS: 27 with Mathematical Literacy. Preliminary admission is based on the final Grade 11 examination results. Final admission is based on the final Grade 12 results. The seven prescribed subjects are the subjects to be used in calculating the APS. The APS achievement rating of Life Orientation is divided by two in the calculation of the APS. If an applicant included more than the minimum of three electives in the applicant's NSC, the four compulsories and the three best of the electives will be used.",
      careerOpportunities:
        "Foundation phase teacher, education specialist, curriculum developer, educational consultant, school administrator.",
    },

    // Faculty of Computing and Information Sciences
    {
      id: "ump-b-ict",
      name: "Bachelor of ICT",
      faculty: "Computing and Information Sciences",
      apsMin: 32,
      duration: "3 years",
      credits: 360,
      subjectRequirements: {
        "English (Home or First Additional)": 4,
        Mathematics: 4,
      },
      additionalRequirements:
        "Bachelor Endorsement required. NCV level 4 in fundamental subjects with at least 60% for English, 60% for Mathematics and 70% in four vocational subjects relevant to the field of Information Technology. Students with a Higher Certificate or Diploma in a relevant ICT Course may be able to progress or articulate into the BICT in some cases.",
      careerOpportunities:
        "Software developer, systems analyst, network administrator, IT consultant, database administrator.",
    },
    {
      id: "ump-dip-ict-applications",
      name: "Diploma in ICT in Applications Development",
      faculty: "Computing and Information Sciences",
      apsMin: 24,
      duration: "3 years",
      credits: 360,
      subjectRequirements: {
        "English (Home or First Additional)": 4,
        Mathematics: 4,
      },
      additionalRequirements: "Diploma Endorsement required. One Additional Language. Any Four other Modules.",
      careerOpportunities: "Applications developer, software tester, web developer, mobile app developer, programmer.",
    },
    {
      id: "ump-hcert-ict-support",
      name: "Higher Certificate in ICT in User Support",
      faculty: "Computing and Information Sciences",
      apsMin: 20,
      duration: "1 year",
      credits: 120,
      subjectRequirements: {
        "English (Home or First Additional)": 4,
        Mathematics: 2,
      },
      additionalRequirements:
        "Mathematical Literacy (Level 4) can be accepted instead of Mathematics (Level 2). Minimum APS: 22 with Mathematical Literacy. Any Three other Content Subjects at Level 2. Diploma and/or Higher Certificate Endorsement required. NCV: Applicants must have completed an NCV level 4 in Information Technology or a Computer Science/Studies Discipline.",
      careerOpportunities:
        "IT support technician, help desk analyst, technical support specialist, computer technician, IT customer service representative.",
    },
  ]

  /**
   * UMP-specific APS calculation
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