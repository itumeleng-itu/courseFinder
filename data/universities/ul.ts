import { BaseUniversity } from "./base-university";
import type { Course } from "@/lib/types";

/**
 * University of Limpopo (UL) class
 */
export class UL extends BaseUniversity {
  readonly id = "ul";
  readonly name = "University of Limpopo";
  readonly shortName = "UL";
  readonly website = "https://www.ul.ac.za";
  readonly logo = "/logos/ul.png";
  readonly location = {
    city: "Polokwane",
    province: "Limpopo",
    coordinates: {
      latitude: -23.8779,
      longitude: 29.7404,
    },
  };

  protected readonly _courses: Course[] = [
    // Faculty of Humanities
    {
      id: "ul-bed-sp-fet-languages-lo",
      name: "Bachelor of Education in Senior Phase & FET Teaching (majoring in Languages and Life Orientation)",
      faculty: "Faculty of Humanities",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "life orientation": 4,
      },
      additionalRequirements: ["Selection test required"],
      careerOpportunities: ["Life Orientation Teacher", "Language Teacher", "Research Assistant", "Laboratory Assistant"],
    },
    {
      id: "ul-bed-sp-fet-languages-ss",
      name: "Bachelor of Education in Senior Phase & FET Teaching (majoring in Languages and Social Sciences)",
      faculty: "Faculty of Humanities",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "life orientation": 4,
      },
      additionalRequirements: ["Selection test required"],
      careerOpportunities: ["Social Science Teacher", "Language Teacher", "Research Assistant", "Laboratory Assistant"],
    },
    {
      id: "ul-bed-sp-fet-econ-mgmt",
      name: "Bachelor of Education in Senior Phase & FET Teaching (majoring in Economics and Management Studies)",
      faculty: "Faculty of Humanities",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "life orientation": 4,
      },
      additionalRequirements: ["Selection test required"],
      careerOpportunities: ["Accounting Teacher", "Business Economics Teacher", "Economics Teacher", "Research Assistant", "Laboratory Assistant"],
    },
    {
      id: "ul-bed-sp-fet-math-sci",
      name: "Bachelor of Education in Senior Phase & FET Teaching (majoring in Mathematics, Science & Technology)",
      faculty: "Faculty of Humanities",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "life orientation": 4,
        "mathematics": 4,
      },
      additionalRequirements: ["Selection test required"],
      careerOpportunities: ["Mathematics Teacher", "Life Sciences Teacher", "Technology Teacher", "Physical Sciences Teacher", "Research Assistant", "Laboratory Assistant"],
    },

    // Faculty of Management & Law
    {
      id: "ul-bacc",
      name: "Bachelor of Accountancy",
      faculty: "Faculty of Management & Law",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": 4,
      },
      careerOpportunities: ["Management Accountants", "Internal Auditors", "Tax Consultants", "Business Entrepreneurs", "Accountants"],
    },
    {
      id: "ul-bcom-acc",
      name: "Bachelor of Commerce in Accountancy",
      faculty: "Faculty of Management & Law",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": 4,
      },
      careerOpportunities: ["Internal Auditors", "Consultants", "Business Entrepreneurs", "Accountants"],
    },
    {
      id: "ul-llb",
      name: "Bachelor of Laws",
      faculty: "Faculty of Management & Law",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 5,
      },
      careerOpportunities: ["Judge", "Magistrate", "Advocate", "Attorney", "Director of Public Prosecution", "Registrar", "Master of High Court", "Legal Advisor", "Legal Administrative Officer", "Labour Consultant", "Commissioner"],
    },

    // Faculty of Science & Agriculture
    {
      id: "ul-bagricman",
      name: "Bachelor of Agricultural Management",
      faculty: "Faculty of Science & Agriculture",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": 3,
        "physical sciences": 4,
        "life sciences": 4,
      },
      careerOpportunities: ["Agricultural Extension Offers", "Agricultural Officers", "Farm Manager", "Agriculture Technician", "Research Assistant"],
    },
    {
      id: "ul-bsc-agriculture-plant-production",
      name: "BSc (Agriculture) (Plant Production)",
      faculty: "Faculty of Science & Agriculture",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
      careerOpportunities: ["Agronomists", "Plant Breeders", "Farm Managers", "Consultants"],
    },
    {
      id: "ul-bsc-agriculture-animal-production",
      name: "BSc (Agriculture) (Animal Production)",
      faculty: "Faculty of Science & Agriculture",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
      careerOpportunities: ["Marketing Officers", "Livestock Scientists", "Animal Breeders & Nutritionists", "Farm Managers", "Consultants"],
    },
    {
      id: "ul-bsc-agriculture-soil-science",
      name: "BSc (Agriculture) (Soil Science)",
      faculty: "Faculty of Science & Agriculture",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 5,
        "Life Sciences": 4,
      },
      careerOpportunities: ["Soil Scientists", "Laboratory Managers", "Soil Analysts"],
    },
    {
      id: "ul-bsc-environmental-resource-studies",
      name: "BSc (Environmental & Resource Studies)",
      faculty: "Faculty of Science & Agriculture",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
        "Geography": 4,
      },
      careerOpportunities: ["Environmental Officers", "Development Planners", "Cartographers"],
    },
    {
      id: "ul-bsc-water-sanitation-sciences",
      name: "BSc (Water & Sanitation Sciences)",
      faculty: "Faculty of Science & Agriculture",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 5,
        "Physical Sciences": 5,
        "Life Sciences": 4,
      },
      careerOpportunities: ["Water Supply & Sanitation Scientist", "Community Water Supply Project Planner", "Community Sanitation Project Manager", "Water Catchment Manager", "Water Resources Planner", "Water Treatment Plant Manager", "Waste Water Treatment Manager"],
    },
    {
      id: "ul-bsc-mathematical-sciences-extended",
      name: "BSc (Mathematical Sciences stream) (Extended Curriculum Programme)",
      faculty: "Faculty of Science & Agriculture",
      apsMin: 22,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": 4,
      },
      careerOpportunities: ["Systems Analysts", "Computer Consultants", "Computer Programmers", "Computer Modelling Consultants", "Aerospace Engineers", "Network Specialists", "Statisticians"],
    },
    {
      id: "ul-bsc-life-sciences-extended",
      name: "BSc (Life Sciences Stream) (Extended Curriculum Programme)",
      faculty: "Faculty of Science & Agriculture",
      apsMin: 22,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": 4,
        "physical sciences": 4,
        "life sciences": 3,
      },
      careerOpportunities: ["Biotechnology and bio-informatics related occupations", "Consultancy", "Environmental Health and Occupational Hygiene", "Environmental Management", "Industrial Biochemistry and Microbiology", "Entomology"],
    },

    // Faculty of Health Sciences
    {
      id: "ul-mbchb",
      name: "MBChB - Bachelor of Medicine & Bachelor of Surgery",
      faculty: "Faculty of Health Sciences",
      apsMin: 27,
      duration: "6 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 5,
        "Physical Sciences": 5,
        "Life Sciences": 5,
      },
      careerOpportunities: ["General Medical Practitioner", "Medical Research Institutes"],
    },
    {
      id: "ul-bsc-dietetics",
      name: "BSc (Dietetics)",
      faculty: "Faculty of Health Sciences",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 5,
        "Life Sciences": 5,
      },
      careerOpportunities: ["Dietician in Hospital", "Community Dietician", "Food Service Manager", "Consultants for Food Production Companies", "Medical Representatives of Nutritional Companies", "Private Practice and Research Centres"],
    },
    {
      id: "ul-boptom",
      name: "BOptom - Bachelor of Optometry",
      faculty: "Faculty of Health Sciences",
      apsMin: 27,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 5,
        "Physical Sciences": 5,
        "Life Sciences": 5,
      },
      careerOpportunities: ["Optometrist in Private and Public Sector"],
    },
    {
      id: "ul-bsc-medical-sciences",
      name: "BSc (Medical Sciences)",
      faculty: "Faculty of Health Sciences",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 5,
        "Life Sciences": 5,
      },
      careerOpportunities: ["Medical Scientist", "Laboratory Researchers"],
    },
    {
      id: "ul-bnurs",
      name: "BNurs - Bachelor of Nursing",
      faculty: "Faculty of Health Sciences",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 5,
        "Life Sciences": 5,
      },
      careerOpportunities: ["General, Psychiatric, Community Nurse and Mid-Wife", "Occupational Health Nurse", "Old Age Homes / Home-Based Care", "Private Practice / Hospitals", "Pharmaceutical Companies", "Insurance & Medical Aid Companies"],
    },
    {
      id: "ul-bpharm",
      name: "BPharm - Bachelor of Pharmacy",
      faculty: "Faculty of Health Sciences",
      apsMin: 27,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 5,
        "Physical Sciences": 5,
        "Life Sciences": 5,
      },
      careerOpportunities: ["Retail Medicine", "Medicine Control Centre", "Departments of Health", "Industrial Environment", "Private Practice"],
    },

    // Faculty of Management and Law
    {
      id: "ul-bcom-human-resource-extended",
      name: "BCom (Human Resource Management) (Extended Curriculum Programme)",
      faculty: "Faculty of Management and Law",
      apsMin: 22,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": 3,
      },
      careerOpportunities: ["Marketing Officers", "Human Resource Practitioner", "Purchasing Officers", "Business Entrepreneurs"],
    },
    {
      id: "ul-bcom-business-management",
      name: "BCom (Business Management)",
      faculty: "Faculty of Management and Law",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
      },
      careerOpportunities: ["Marketing Officers", "Human Resource Practitioner", "Purchasing Officers", "Business Entrepreneurs"],
    },
    {
      id: "ul-bcom-business-management-extended",
      name: "BCom (Business Management) (Extended Curriculum Programme)",
      faculty: "Faculty of Management and Law",
      apsMin: 22,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": 3,
      },
      careerOpportunities: ["Financial Officers", "Marketing Officers", "Human Resource Practitioner", "Purchasing Officers", "Business Entrepreneurs"],
    },

    // Humanities - Education
    {
      id: "ul-bed-sp-fet-languages",
      name: "BEd (SP & FET Teaching) - Languages and Life Orientation",
      faculty: "Humanities - Education",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "Life Orientation": 3,
        "English": 4,
        "First Language": 5,
      },
    },
    {
      id: "ul-bed-sp-fet-social-sciences",
      name: "BEd (SP & FET Teaching) - Languages and Social Sciences",
      faculty: "Humanities - Education",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "Life Orientation": 3,
        "English": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "English Home", level: 4 },
          ],
        },
        "Social Sciences": 4,
      },
    },
    {
      id: "ul-bed-sp-fet-economics",
      name: "BEd (SP & FET Teaching) - Economics and Management Studies",
      faculty: "Humanities - Education",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "Life Orientation": 3,
        "English": 3,
        "Alternatives": {
          alternatives: [
            { subject: "Economics", level: 4 },
            { subject: "Business Studies", level: 4 },
          ],
        },
      },
    },
    {
      id: "ul-bed-sp-fet-mathematics",
      name: "BEd (SP & FET Teaching) - Mathematics, Science & Technology",
      faculty: "Humanities - Education",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "Life Orientation": 3,
        "English": 3,
        "Mathematics": 4,
        "Physical Sciences": 4,
      },
    },
    {
      id: "ul-bed-fp-teaching",
      name: "BEd (Foundation Phase Teaching)",
      faculty: "Humanities - Education",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "Life Orientation": 3,
        "English": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
      },
    },

    // Humanities - Social Sciences
    {
      id: "ul-ba-criminology-psychology",
      name: "BA (Criminology and Psychology)",
      faculty: "Humanities - Social Sciences",
      apsMin: 23,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Additional Language": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
    },
    {
      id: "ul-ba-cultural-studies",
      name: "BA (Cultural Studies)",
      faculty: "Humanities - Social Sciences",
      apsMin: 23,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Additional Language": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
    },
    {
      id: "ul-ba-sociology-anthropology",
      name: "BA (Sociology and Anthropology)",
      faculty: "Humanities - Social Sciences",
      apsMin: 23,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Additional Language": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
    },
    {
      id: "ul-ba-political-studies",
      name: "BA (Political Studies)",
      faculty: "Humanities - Social Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
      },
    },
    {
      id: "ul-bpsych",
      name: "BPsych (Bachelor of Psychology)",
      faculty: "Humanities - Social Sciences",
      apsMin: 23,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Additional Language": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
    },
    {
      id: "ul-bsw",
      name: "BSW (Bachelor of Social Work)",
      faculty: "Humanities - Social Sciences",
      apsMin: 23,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Additional Language": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
    },

    // Humanities - Language and Communication Studies
    {
      id: "ul-ba-languages",
      name: "BA (Languages stream)",
      faculty: "Humanities - Language and Communication Studies",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Another Language": 5,
      },
    },
    {
      id: "ul-ba-translation-linguistics",
      name: "BA (Translation and Linguistics)",
      faculty: "Humanities - Language and Communication Studies",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Another Language": 5,
      },
    },
    {
      id: "ul-ba-performing-arts",
      name: "BA (Performing Arts)",
      faculty: "Humanities - Language and Communication Studies",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Another Language": 5,
      },
    },
    {
      id: "ul-binfst",
      name: "BInfSt (Bachelor of Information Studies)",
      faculty: "Humanities - Language and Communication Studies",
      apsMin: 25,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Another Language": 5,
      },
    },
    {
      id: "ul-ba-contemporary-english",
      name: "BA (Contemporary English and Multilingual Studies)",
      faculty: "Humanities - Language and Communication Studies",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Another Language": 5,
      },
    },
    {
      id: "ul-ba-communication-studies",
      name: "BA (Communication Studies)",
      faculty: "Humanities - Language and Communication Studies",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Another Language": 5,
      },
    },
    {
      id: "ul-ba-media-studies",
      name: "BA (Media Studies)",
      faculty: "Humanities - Language and Communication Studies",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Another Language": 5,
      },
    },

    // Science & Agriculture - Physical & Mineral Sciences
    {
      id: "ul-bsc-physical-sciences",
      name: "BSc (Physical Sciences stream)",
      faculty: "Science & Agriculture - Physical & Mineral Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
    },
    {
      id: "ul-bsc-geology",
      name: "BSc (Geology)",
      faculty: "Science & Agriculture - Physical & Mineral Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
    },

    // Science & Agriculture - Mathematical and Computer Sciences
    {
      id: "ul-bsc-mathematical-sciences",
      name: "BSc (Mathematical Sciences stream)",
      faculty: "Science & Agriculture - Mathematical and Computer Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 5,
      },
    },

    // Science & Agriculture - Molecular & Life Sciences
    {
      id: "ul-bsc-life-sciences",
      name: "BSc (Life Sciences Stream)",
      faculty: "Science & Agriculture - Molecular & Life Sciences",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 5,
        "Physical Sciences": 5,
        "Life Sciences": 4,
      },
    },

    // Science & Agriculture - Agriculture and Environmental Sciences
    {
      id: "ul-bsc-agriculture-economics",
      name: "BSc (Agriculture) (Agricultural Economics)",
      faculty: "Science & Agriculture - Agriculture and Environmental Sciences",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
      },
    },

    // Management & Law - Accountancy
    {
      id: "ul-bcom-accountancy",
      name: "BCom (Accountancy)",
      faculty: "Management & Law - Accountancy",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
      },
    },

    // Management & Law - Economics and Management
    {
      id: "ul-bcom-human-resource-management",
      name: "BCom (Human Resource Management)",
      faculty: "Management & Law - Economics and Management",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
      },
    },
    {
      id: "ul-bcom-economics",
      name: "BCom (Economics)",
      faculty: "Management & Law - Economics and Management",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
        "Economics": 4,
      },
    },
    {
      id: "ul-badmin",
      name: "BAdmin (Bachelor of Administration)",
      faculty: "Management & Law - Economics and Management",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
      },
    },
    {
      id: "ul-badmin-local-government",
      name: "BAdmin (Local Government)",
      faculty: "Management & Law - Economics and Management",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
      },
    },
    {
      id: "ul-bdev-planning-management",
      name: "BDev (Planning and Management)",
      faculty: "Management & Law - Economics and Management",
      apsMin: 26,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
    },

    // Management & Law - Law
  ];

  /**
   * UL-specific APS calculation
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
