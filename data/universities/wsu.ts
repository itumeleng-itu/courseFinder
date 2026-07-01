import { BaseUniversity } from "./base-university";
import type { Course } from "@/lib/types";

/**
 * Walter Sisulu University (WSU) class
 * Comprehensive data based on 2026 prospectus
 */
export class WSU extends BaseUniversity {
  readonly id = "wsu";
  readonly name = "Walter Sisulu University";
  readonly shortName = "WSU";
  readonly website = "https://www.wsu.ac.za";
  readonly logo = "/logos/wsu.png";
  readonly location = {
    city: "Mthatha",
    province: "Eastern Cape",
    coordinates: {
      latitude: -31.5889,
      longitude: 28.7731,
    },
  };

  protected readonly _courses: Course[] = [
    // Faculty of Economic & Financial Sciences
    {
      id: "wsu-dip-accountancy",
      name: "Diploma in Accountancy",
      faculty: "Faculty of Economic & Financial Sciences",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 3,
        "Mathematics": 3,
      },
      careerOpportunities: ["Financial accountant", "Taxation consultant", "Auditor", "Management accountant"],
    },
    {
      id: "wsu-dip-financial-info-sys",
      name: "Diploma in Financial Information Systems",
      faculty: "Faculty of Economic & Financial Sciences",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 3,
        "Mathematics": 3,
      },
      careerOpportunities: ["Financial information systems analyst", "Accounting clerk", "Tax assistant"],
    },
    {
      id: "wsu-dip-internal-auditing",
      name: "Diploma in Internal Auditing",
      faculty: "Faculty of Economic & Financial Sciences",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 3,
        "Alternatives": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Accounting", level: 3 },
          ],
        },
      },
      careerOpportunities: ["Internal auditor", "Financial auditor", "Compliance officer"],
    },
    {
      id: "wsu-bacc-accounting",
      name: "Bachelor of Accounting",
      faculty: "Faculty of Economic & Financial Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "Mathematics": 4,
      },
      careerOpportunities: ["Financial manager", "Accountant", "Business consultant"],
    },
    {
      id: "wsu-bacc-accounting-science",
      name: "Bachelor of Accounting Science",
      faculty: "Faculty of Economic & Financial Sciences",
      apsMin: 27,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        "Mathematics": 4,
      },
      careerOpportunities: ["Chartered Accountant", "Registered General Accountant"],
    },
    {
      id: "wsu-bcom",
      name: "Bachelor of Commerce",
      faculty: "Faculty of Economic & Financial Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "Alternatives": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematics Literacy", level: 3 },
          ],
        },
      },
      careerOpportunities: ["Business manager", "Economist", "Financial analyst"],
    },

    // Faculty of Education
    {
      id: "wsu-bed-foundation-phase",
      name: "Bachelor of Education in Foundation Phase Teaching",
      faculty: "Faculty of Education",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "IsiXhosa Home": 4,
        "English First Additional": 4,
        "Alternatives": {
          alternatives: [
            { subject: "Mathematics", level: 2 },
            { subject: "Mathematics Literacy", level: 2 },
          ],
        },
        "Life Orientation": 5,
      },
      careerOpportunities: ["Foundation Phase Teacher"],
    },
    {
      id: "wsu-bed-sp-fet-creative-arts-history",
      name: "Bachelor of Education in Senior Phase & FET Teaching (Creative Arts History)",
      faculty: "Faculty of Education",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "African Language": 4,
        "History": 4,
        "Music/Dance/Drama/Visual Arts": 4,
      },
      additionalRequirements: ["Auditions and Music Aptitude Test for applicants without Music at Matric"],
      careerOpportunities: ["Teacher"],
    },
    {
      id: "wsu-bed-sp-fet-languages",
      name: "Bachelor of Education in Senior Phase & FET Teaching (Languages)",
      faculty: "Faculty of Education",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "IsiXhosa": 4,
      },
      careerOpportunities: ["Teacher"],
    },
    {
      id: "wsu-bed-sp-fet-mst",
      name: "Bachelor of Education in Senior Phase & FET Teaching (Maths, Science and Technology)",
      faculty: "Faculty of Education",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "english first additional language": 4,
        "african language": 4,
        "mathematics": 4,
        "life sciences": 4,
        "physical sciences": 4,
      },
      careerOpportunities: ["Teacher"],
    },
    {
      id: "wsu-bed-sp-fet-tech",
      name: "Bachelor of Education in Senior Phase & FET Teaching (Technical and Vocational)",
      faculty: "Faculty of Education",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "english first additional language": 4,
        "african language": 4,
      },
      careerOpportunities: ["Teacher"],
    },

    // Faculty of Engineering, Built Environment & Information Technology
    {
      id: "wsu-dip-building-technology",
      name: "Diploma in Building Technology",
      faculty: "Faculty of Engineering, Built Environment & Information Technology",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics Alternatives": {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Technical Mathematics", level: 4 },
          ],
        },
        "Science Alternatives": {
          alternatives: [
            { subject: "Physical Science", level: 3 },
            { subject: "Technical Science", level: 3 },
          ],
        },
      },
      careerOpportunities: ["Quantity Surveyor", "Construction Manager"],
    },
    {
      id: "wsu-dip-civil-engineering",
      name: "Diploma in Civil Engineering",
      faculty: "Faculty of Engineering, Built Environment & Information Technology",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
      },
      careerOpportunities: ["Engineering Technician"],
    },
    {
      id: "wsu-dip-electrical-engineering",
      name: "Diploma in Electrical Engineering",
      faculty: "Faculty of Engineering, Built Environment & Information Technology",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
      },
      careerOpportunities: ["Electrical Engineering Technician"],
    },
    {
      id: "wsu-dip-mechanical-engineering",
      name: "Diploma in Mechanical Engineering",
      faculty: "Faculty of Engineering, Built Environment & Information Technology",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics Alternatives": {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Technical Mathematics", level: 4 },
          ],
        },
        "Science Alternatives": {
          alternatives: [
            { subject: "Physical Science", level: 4 },
            { subject: "Technical Science", level: 4 },
          ],
        },
      },
      careerOpportunities: ["Mechanical Engineering Technician"],
    },
    {
      id: "wsu-dip-ict-app-dev",
      name: "Diploma in Information and Communications Technology in Applications Development",
      faculty: "Faculty of Engineering, Built Environment & Information Technology",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "english first additional language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 3 },
            { subject: "mathematical literacy", level: 5 },
          ],
        },
      },
      careerOpportunities: ["Application Developer"],
    },

    // Faculty of Law, Humanities & Social Sciences
    {
      id: "wsu-dip-fashion",
      name: "Diploma in Fashion",
      faculty: "Faculty of Law, Humanities & Social Sciences",
      apsMin: 19,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Alternatives": {
          alternatives: [
            { subject: "Mathematics or Mathematics Literacy", level: 2 },
            { subject: "Accounting", level: 2 },
          ],
        },
      },
      additionalRequirements: ["Portfolio evaluation"],
      careerOpportunities: ["Fashion Designer", "Garment Manufacturer"],
    },
    {
      id: "wsu-dip-fine-art",
      name: "Diploma in Fine Art",
      faculty: "Faculty of Law, Humanities & Social Sciences",
      apsMin: 19,
      duration: "3 years",
      subjectRequirements: {
        "English": 3,
      },
      additionalRequirements: ["Portfolio of artworks", "Internal assessment/interview"],
      careerOpportunities: ["Artist", "Entrepreneur", "Gallery Manager"],
    },
    {
      id: "wsu-ba",
      name: "Bachelor of Arts",
      faculty: "Faculty of Law, Humanities & Social Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Any two of: IsiXhosa/Sesotho/Geography/History": 4,
      },
      careerOpportunities: ["Entertainment industry", "Education", "Media"],
    },
    {
      id: "wsu-llb",
      name: "Bachelor of Laws",
      faculty: "Faculty of Law, Humanities & Social Sciences",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Alternatives": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 3 },
          ],
        },
      },
      careerOpportunities: ["Attorney", "Advocate", "Prosecutor", "Magistrate", "Legal Advisor"],
    },

    // Humanities
    {
      id: "wsu-ba-english",
      name: "Bachelor of Arts (ENGLISH)",
      faculty: "Humanities",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Any one of: IsiXhosa/Sesotho/Geography/History": 4,
      },
      careerOpportunities: ["Education", "Media", "Public Relations", "Research"],
    },
    {
      id: "wsu-bachelor-of-social-sciences",
      name: "Bachelor of Social Sciences",
      faculty: "Humanities",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 3,
        "english first additional language": 3,
      },
      careerOpportunities: ["Government sectors", "Non-government sectors", "Human development"],
    },
    {
      id: "wsu-bpsych",
      name: "Bachelor of Psychology",
      faculty: "Humanities",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "African Language": 4,
        "Life Science": 4,
      },
      careerOpportunities: ["Psychology", "Human development", "Counseling"],
    },
    {
      id: "wsu-bsw",
      name: "Bachelor of Social Work",
      faculty: "Humanities",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "African Language": 5,
        "Any three other subjects": 4,
      },
      additionalRequirements: ["Character reference checks"],
      careerOpportunities: ["Social work", "Social justice", "Community development"],
    },

    // Management & Public Administration Sciences
    {
      id: "wsu-hc-broadcasting",
      name: "Higher Certificate in Versatile Broadcasting",
      faculty: "Management & Public Administration Sciences",
      apsMin: 18,
      duration: "1 year",
      subjectRequirements: {
        "English": 4,
        "Any other language": 3,
        "Any two additional subjects": 3,
      },
      careerOpportunities: ["Journalism", "Radio", "Television", "Film", "Digital media"],
    },
    {
      id: "wsu-dip-admin-mgmt",
      name: "Diploma in Administrative Management",
      faculty: "Management & Public Administration Sciences",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Alternatives": {
          alternatives: [
            { subject: "Mathematics", level: 2 },
            { subject: "Mathematics Literacy", level: 2 },
          ],
        },
        "Any two additional subjects": 4,
      },
      careerOpportunities: ["Administrative management", "Team leadership"],
    },

    // Medicine & Health Sciences
    {
      id: "wsu-bmedicine-surgery",
      name: "Bachelor of Medicine and Bachelor of Surgery",
      faculty: "Medicine & Health Sciences",
      apsMin: 30,
      duration: "6 years",
      subjectRequirements: {
        "English": 5,
        "African Language": 5,
        "Mathematics": 5,
        "Physical Sciences": 5,
        "Life Sciences": 5,
        "Any other subject": 5,
      },
      additionalRequirements: ["Additional selection criteria apply"],
      careerOpportunities: ["Medical practitioner"],
    },
    {
      id: "wsu-bmedical-sciences",
      name: "Bachelor of Medical Sciences",
      faculty: "Medicine & Health Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "African Language": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
        "Any other subject": 4,
      },
      additionalRequirements: ["Additional selection criteria"],
      careerOpportunities: ["Physiology", "Biochemistry", "Pre-medical sciences"],
    },
    {
      id: "wsu-bmedicine-clinical-practice",
      name: "Bachelor of Medicine in Clinical Practice",
      faculty: "Medicine & Health Sciences",
      apsMin: 24,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "African Language": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
        "Any other subject": 4,
      },
      additionalRequirements: ["Additional selection criteria"],
      careerOpportunities: ["Clinical Associate"],
    },
    {
      id: "wsu-bnursing",
      name: "Bachelor of Nursing",
      faculty: "Medicine & Health Sciences",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "African Language": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
        "Any other subject": 4,
      },
      additionalRequirements: ["Additional selection criteria"],
      careerOpportunities: ["Professional nurse", "Obstetric care", "Mental health"],
    },
    {
      id: "wsu-bhealth-sciences-orthotics-prosthetics",
      name: "Bachelor of Health Sciences in Medical Orthotics and Prosthetics",
      faculty: "Medicine & Health Sciences",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "African Language": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
        "Any other subject": 4,
      },
      additionalRequirements: ["Additional selection criteria"],
      careerOpportunities: ["Orthotic clinician", "Prosthetic clinician"],
    },

    // Faculty of Science
    {
      id: "wsu-dip-analytical-chemistry",
      name: "Diploma in Analytical Chemistry",
      faculty: "Faculty of Science",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
        "Physical Sciences": 4,
      },
      careerOpportunities: ["Laboratory technician", "Scientist", "Quality control manager", "Laboratory manager"],
    },
    {
      id: "wsu-diploma-consumer-science-food-nutrition",
      name: "Diploma in Consumer Science in Food and Nutrition",
      faculty: "Faculty of Science",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "english home language or first additional language": 4,
        "mathematics": 3,
        "physical sciences": 4,
      },
      careerOpportunities: ["Product/recipe developer", "Food buyer", "Food production manager", "Food journalist", "Market researcher", "Food service manager", "Food and nutrition compliance officer"],
    },
    {
      id: "wsu-dip-pest-management",
      name: "Diploma in Pest Management",
      faculty: "Faculty of Science",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
        "Life Sciences": 3,
        "Physical Sciences": 2,
      },
      careerOpportunities: ["Pest control technician", "Agricultural advisor"],
    },
    {
      id: "wsu-basc-applied-mathematics",
      name: "Bachelor of Science in Applied Mathematics",
      faculty: "Faculty of Science",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 5,
        "Physical Sciences": 4,
      },
      careerOpportunities: ["Technical analyst", "Mathematical modeller"],
    },
    {
      id: "wsu-basc-applied-statistical-sciences",
      name: "Bachelor of Science in Applied Statistical Sciences",
      faculty: "Faculty of Science",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 5,
        "Physical Sciences": 4,
      },
      careerOpportunities: ["Statistician", "Data analyst"],
    },
    {
      id: "wsu-basc-biological-sciences",
      name: "Bachelor of Science in Biological Sciences",
      faculty: "Faculty of Science",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 5,
        "Physical Sciences": 5,
        "Life Sciences": 5,
      },
      careerOpportunities: ["Biologist", "Research scientist", "Laboratory technician"],
    },
    {
      id: "wsu-basc-chemistry",
      name: "Bachelor of Science in Chemistry",
      faculty: "Faculty of Science",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["Chemist", "Research scientist", "Quality control analyst"],
    },
    {
      id: "wsu-basc-computer-science",
      name: "Bachelor of Science in Computer Science",
      faculty: "Faculty of Science",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 5,
        "Physical Sciences": 4,
      },
      careerOpportunities: ["Software developer", "Systems analyst", "Computer scientist"],
    },
    {
      id: "wsu-basc-environmental-studies",
      name: "Bachelor of Science in Environmental Studies",
      faculty: "Faculty of Science",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
        "Alternatives": {
          alternatives: [
            { subject: "Life Sciences or Agriculture", level: 4 },
            { subject: "Tourism", level: 4 },
          ],
        },
      },
      careerOpportunities: ["Environmental consultant", "Environmental impact assessor"],
    },
    {
      id: "wsu-basc-mathematics",
      name: "Bachelor of Science in Mathematics",
      faculty: "Faculty of Science",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 5,
        "Physical Sciences": 4,
      },
      careerOpportunities: ["Mathematician", "Academic researcher", "Data analyst"],
    },
    {
      id: "wsu-basc-pest-management",
      name: "Bachelor of Science in Pest Management",
      faculty: "Faculty of Science",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
      careerOpportunities: ["Pest management specialist", "Agricultural researcher"],
    },
    {
      id: "wsu-basc-physics",
      name: "Bachelor of Science in Physics",
      faculty: "Faculty of Science",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["Physicist", "Research scientist", "Technical consultant"],
    },

    // Economic and Financial Sciences
    {
      id: "wsu-dip-internal-auditing-ecp",
      name: "Diploma in Internal Auditing (ECP)",
      faculty: "Economic and Financial Sciences",
      apsMin: 20,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 3,
        "Alternatives": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Accounting", level: 3 },
          ],
        },
      },
      additionalRequirements: ["Mathematics Literacy level 4 acceptable"],
      careerOpportunities: ["Internal auditor", "Audit technician", "Compliance specialist"],
    },
    {
      id: "wsu-bcom-business-mgmt",
      name: "Bachelor of Commerce in Business Management",
      faculty: "Economic and Financial Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "Alternatives": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematics Literacy", level: 3 },
          ],
        },
      },
      additionalRequirements: ["Mathematics Literacy level 5 acceptable for Maths"],
      careerOpportunities: ["Business manager", "HR manager", "Operations manager", "Consultant"],
    },
    {
      id: "wsu-bcom-economics",
      name: "Bachelor of Commerce in Economics",
      faculty: "Economic and Financial Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "Alternatives": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematics Literacy", level: 3 },
          ],
        },
      },
      additionalRequirements: ["Mathematics Literacy level 6 acceptable for Maths"],
      careerOpportunities: ["Economist", "Policy analyst", "Financial analyst", "Development specialist"],
    },

    // Education
    {
      id: "wsu-bed-sp-fet-creative-arts-english",
      name: "Bachelor of Education in Senior Phase & FET Teaching (Creative Arts - English)",
      faculty: "Education",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "African Language": 4,
        "Music/Dance/Drama/Visual Arts": 4,
      },
      additionalRequirements: ["One additional subject at level 4", "Three additional subjects totalling 7 points", "Music aptitude test if no Music matric"],
      careerOpportunities: ["English teacher", "Arts teacher", "Drama educator", "Creative writing specialist"],
    },
    {
      id: "wsu-bed-sp-fet-consumer-mgmt-science",
      name: "Bachelor of Education in Senior Phase & FET Teaching (Consumer & Management Science)",
      faculty: "Education",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "African Language": 4,
        "Alternatives": {
          alternatives: [
            { subject: "Consumer Studies", level: 4 },
            { subject: "Hospitality", level: 4 },
            { subject: "Tourism", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Two additional subjects totalling 10 points"],
      careerOpportunities: ["Consumer science teacher", "Hospitality educator", "Life skills specialist"],
    },
    {
      id: "wsu-bed-sp-fet-economic-mgmt-science",
      name: "Bachelor of Education in Senior Phase & FET Teaching (Economic & Management Science)",
      faculty: "Education",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "African Language": 4,
        "Mathematics Alternatives": {
          alternatives: [
            { subject: "Mathematics", level: 2 },
            { subject: "Mathematics Literacy", level: 2 },
          ],
        },
        "Commerce Alternatives": {
          alternatives: [
            { subject: "Accounting", level: 4 },
            { subject: "Business Studies", level: 4 },
            { subject: "Economics", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Two of above subjects at level 4", "Mathematics Literacy level 4 acceptable", "Two additional subjects totalling 6 points"],
      careerOpportunities: ["Economics teacher", "Business studies teacher", "Accounting educator"],
    },
    {
      id: "wsu-bed-sp-fet-humanities",
      name: "Bachelor of Education in Senior Phase & FET Teaching (Humanities)",
      faculty: "Education",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "African Language": 4,
        "History": 4,
        "Geography": 4,
      },
      additionalRequirements: ["Three additional subjects totalling 8 points"],
      careerOpportunities: ["History teacher", "Geography teacher", "Humanities educator", "Social sciences specialist"],
    },
    {
      id: "wsu-bed-sp-fet-maths-science-tech",
      name: "Bachelor of Education in Senior Phase & FET Teaching (Maths, Science & Technology)",
      faculty: "Education",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "African Language": 4,
        "Mathematics": 4,
        "Alternatives": {
          alternatives: [
            { subject: "Life Sciences", level: 4 },
            { subject: "Physical Sciences", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Two additional subjects totalling 8 points"],
      careerOpportunities: ["Mathematics teacher", "Science teacher", "Technology educator", "STEM specialist"],
    },
    {
      id: "wsu-bed-sp-fet-technical-vocational",
      name: "Bachelor of Education in Senior Phase & FET Teaching (Technical and Vocational Education)",
      faculty: "Education",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "African Language": 4,
        "Technical Subjects": 4,
      },
      additionalRequirements: ["Two technical subjects at level 4", "Two additional subjects totalling 8 points"],
      careerOpportunities: ["Technical education teacher", "Vocational training educator", "Curriculum developer"],
    },

    // Engineering, Built Environment & IT
    {
      id: "wsu-dip-building-technology-ecp",
      name: "Diploma in Building Technology (ECP)",
      faculty: "Engineering, Built Environment & IT",
      apsMin: 22,
      duration: "4 years",
      subjectRequirements: {
        "English": 3,
        "Mathematics Alternatives": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Technical Mathematics", level: 3 },
          ],
        },
        "Science Alternatives": {
          alternatives: [
            { subject: "Physical Science", level: 3 },
            { subject: "Technical Science", level: 3 },
          ],
        },
      },
      additionalRequirements: ["One subject one level below requirements"],
      careerOpportunities: ["Building technician", "Quantity surveyor assistant", "Site coordinator"],
    },
    {
      id: "wsu-dip-civil-engineering-ecp",
      name: "Diploma in Civil Engineering (ECP)",
      faculty: "Engineering, Built Environment & IT",
      apsMin: 22,
      duration: "4 years",
      subjectRequirements: {
        "English": 3,
        "Mathematics": 3,
        "Physical Sciences": 3,
      },
      additionalRequirements: ["One subject one level below requirements"],
      careerOpportunities: ["Civil technician", "Site assistant", "Engineering support"],
    },
    {
      id: "wsu-dip-electrical-engineering-ecp",
      name: "Diploma in Electrical Engineering (ECP)",
      faculty: "Engineering, Built Environment & IT",
      apsMin: 22,
      duration: "4 years",
      subjectRequirements: {
        "English": 3,
        "Mathematics": 3,
        "Physical Sciences": 3,
      },
      additionalRequirements: ["One subject one level below requirements"],
      careerOpportunities: ["Electrical technician", "Support engineer", "Technical assistant"],
    },
    {
      id: "wsu-dip-mechanical-engineering-ecp",
      name: "Diploma in Mechanical Engineering (ECP)",
      faculty: "Engineering, Built Environment & IT",
      apsMin: 22,
      duration: "4 years",
      subjectRequirements: {
        "English": 3,
        "Mathematics Alternatives": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Technical Mathematics", level: 3 },
          ],
        },
        "Science Alternatives": {
          alternatives: [
            { subject: "Physical Science", level: 3 },
            { subject: "Technical Science", level: 3 },
          ],
        },
      },
      additionalRequirements: ["One subject one level below requirements"],
      careerOpportunities: ["Mechanical technician", "Engineering assistant", "Technical support"],
    },
    {
      id: "wsu-dip-ict-applications-dev",
      name: "Diploma in ICT in Applications Development",
      faculty: "Engineering, Built Environment & IT",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Alternatives": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematics Literacy", level: 3 },
          ],
        },
      },
      additionalRequirements: ["Mathematics Literacy level 5 acceptable"],
      careerOpportunities: ["Application developer", "Software developer", "Junior programmer", "Web developer"],
    },
    {
      id: "wsu-dip-ict-applications-dev-ecp",
      name: "Diploma in ICT in Applications Development (ECP)",
      faculty: "Engineering, Built Environment & IT",
      apsMin: 20,
      duration: "4 years",
      subjectRequirements: {
        "English": 3,
        "Alternatives": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematics Literacy", level: 3 },
          ],
        },
      },
      additionalRequirements: ["One subject one level below requirements"],
      careerOpportunities: ["Junior developer", "Programmer assistant", "IT technician"],
    },
    {
      id: "wsu-dip-ict-business-analysis",
      name: "Diploma in ICT in Business Analysis",
      faculty: "Engineering, Built Environment & IT",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Alternatives": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematics Literacy", level: 3 },
          ],
        },
      },
      additionalRequirements: ["Mathematics Literacy level 5 acceptable"],
      careerOpportunities: ["Business analyst", "Systems analyst", "IT consultant", "Requirements analyst"],
    },
    {
      id: "wsu-dip-ict-business-analysis-ecp",
      name: "Diploma in ICT in Business Analysis (ECP)",
      faculty: "Engineering, Built Environment & IT",
      apsMin: 20,
      duration: "4 years",
      subjectRequirements: {
        "English": 3,
        "Alternatives": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematics Literacy", level: 3 },
          ],
        },
      },
      additionalRequirements: ["One subject one level below requirements"],
      careerOpportunities: ["Junior business analyst", "Systems support", "IT support analyst"],
    },
    {
      id: "wsu-dip-ict-comm-networks",
      name: "Diploma in ICT in Communication Networks",
      faculty: "Engineering, Built Environment & IT",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Alternatives": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematics Literacy", level: 3 },
          ],
        },
      },
      additionalRequirements: ["Mathematics Literacy level 5 acceptable"],
      careerOpportunities: ["Network technician", "Network administrator", "IT support technician", "Systems administrator"],
    },
    {
      id: "wsu-dip-ict-comm-networks-ecp",
      name: "Diploma in ICT in Communication Networks (ECP)",
      faculty: "Engineering, Built Environment & IT",
      apsMin: 20,
      duration: "4 years",
      subjectRequirements: {
        "English": 3,
        "Alternatives": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematics Literacy", level: 3 },
          ],
        },
      },
      additionalRequirements: ["One subject one level below requirements"],
      careerOpportunities: ["Network support", "IT technician", "Tech support assistant"],
    },
    {
      id: "wsu-dip-ict-support-services",
      name: "Diploma in ICT in Support Services",
      faculty: "Engineering, Built Environment & IT",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Alternatives": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematics Literacy", level: 3 },
          ],
        },
      },
      additionalRequirements: ["Mathematics Literacy level 5 acceptable"],
      careerOpportunities: ["IT support technician", "Help desk specialist", "IT support manager", "System support specialist"],
    },
    {
      id: "wsu-dip-ict-support-services-ecp",
      name: "Diploma in ICT in Support Services (ECP)",
      faculty: "Engineering, Built Environment & IT",
      apsMin: 20,
      duration: "4 years",
      subjectRequirements: {
        "English": 3,
        "Alternatives": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematics Literacy", level: 3 },
          ],
        },
      },
      additionalRequirements: ["One subject one level below requirements"],
      careerOpportunities: ["IT support assistant", "Help desk support", "Technical support"],
    },

    // Law, Humanities & Social Sciences
    {
      id: "wsu-bsc-social-science",
      name: "Bachelor of Social Science",
      faculty: "Law, Humanities & Social Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Any four subjects": 4,
      },
      additionalRequirements: ["Specialisations: Anthropology, Criminology, Philosophy, Political Studies, Population Studies, Psychology, Sociology"],
      careerOpportunities: ["Social development officer", "Researcher", "Policy analyst", "Community liaison officer", "NGO professional"],
    },
    {
      id: "wsu-bsc-social-science-ecp",
      name: "Bachelor of Social Science (ECP)",
      faculty: "Law, Humanities & Social Sciences",
      apsMin: 24,
      duration: "4 years",
      subjectRequirements: {
        "English": 3,
        "Any four subjects": 4,
      },
      additionalRequirements: ["Extended curriculum support"],
      careerOpportunities: ["Social worker", "Researcher", "Development officer", "Policy advisor"],
    },

    // Management and Public Administration Sciences
    {
      id: "wsu-dip-hospitality-mgmt",
      name: "Diploma in Hospitality Management",
      faculty: "Management and Public Administration Sciences",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Alternatives": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematics Literacy", level: 3 },
          ],
        },
        "Any three relevant subjects": 3,
      },
      careerOpportunities: ["Hotel manager", "Restaurant manager", "Food and beverage manager", "Accommodation manager"],
    },
    {
      id: "wsu-dip-human-resources",
      name: "Diploma in Human Resources Management",
      faculty: "Management and Public Administration Sciences",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        "English": 3,
        "Alternatives": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematics Literacy", level: 3 },
          ],
        },
        "Any two subjects": 3,
      },
      careerOpportunities: ["HR officer", "Recruitment specialist", "Personnel administrator", "Training coordinator"],
    },
    {
      id: "wsu-dip-human-resources-ecp",
      name: "Diploma in Human Resources Management (ECP)",
      faculty: "Management and Public Administration Sciences",
      apsMin: 20,
      duration: "4 years",
      subjectRequirements: {
        "English": 3,
        "Alternatives": {
          alternatives: [
            { subject: "Mathematics", level: 2 },
            { subject: "Mathematics Literacy", level: 2 },
          ],
        },
        "Any two subjects": 3,
      },
      additionalRequirements: ["Extended curriculum support"],
      careerOpportunities: ["HR assistant", "Administrative officer", "Personnel coordinator"],
    },
    {
      id: "wsu-dip-journalism",
      name: "Diploma in Journalism",
      faculty: "Management and Public Administration Sciences",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Any other language": 4,
        "Any two additional subjects": 4,
      },
      careerOpportunities: ["Journalist", "Reporter", "Editor", "Content creator", "Media correspondent"],
    },
    {
      id: "wsu-dip-local-govt-finance",
      name: "Diploma in Local Government Finance",
      faculty: "Management and Public Administration Sciences",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        "English": 3,
        "Alternatives": {
          alternatives: [
            { subject: "Accounting or Mathematics", level: 3 },
            { subject: "Mathematics Literacy", level: 3 },
          ],
        },
      },
      additionalRequirements: ["Extended curriculum with lower APS (20)"],
      careerOpportunities: ["Municipal finance officer", "Budget analyst", "Finance administrator", "Audit officer"],
    },
    {
      id: "wsu-dip-management",
      name: "Diploma in Management",
      faculty: "Management and Public Administration Sciences",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        "English": 3,
        "Accounting": 3,
        "Alternatives": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematics Literacy", level: 3 },
          ],
        },
      },
      additionalRequirements: ["Extended curriculum with lower APS (20)"],
      careerOpportunities: ["Operations manager", "Project manager", "Department manager", "Business manager"],
    },
    {
      id: "wsu-dip-marketing-mgmt",
      name: "Diploma in Marketing Management",
      faculty: "Management and Public Administration Sciences",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        "English": 3,
        "Alternatives": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematics Literacy", level: 3 },
          ],
        },
        "Any two subjects": 3,
      },
      careerOpportunities: ["Marketing officer", "Sales manager", "Brand manager", "Digital marketing specialist"],
    },
    {
      id: "wsu-dip-policing",
      name: "Diploma in Policing",
      faculty: "Management and Public Administration Sciences",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        "English": 3,
        "Any four subjects": 3,
      },
      careerOpportunities: ["Police officer", "Law enforcement officer", "Community liaison officer", "Security manager"],
    },
    {
      id: "wsu-dip-office-mgmt-tech",
      name: "Diploma in Office Management and Technology",
      faculty: "Management and Public Administration Sciences",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Alternatives": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematics Literacy", level: 3 },
          ],
        },
        "Any two subjects": 4,
      },
      additionalRequirements: ["Extended curriculum with lower APS (19)"],
      careerOpportunities: ["Office administrator", "Executive secretary", "Office manager", "Administrative coordinator"],
    },
    {
      id: "wsu-dip-public-mgmt",
      name: "Diploma in Public Management",
      faculty: "Management and Public Administration Sciences",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        "English": 3,
        "Any four subjects": 3,
      },
      careerOpportunities: ["Public administrator", "Government officer", "Policy analyst", "Development officer"],
    },
    {
      id: "wsu-dip-public-relations",
      name: "Diploma in Public Relations Management",
      faculty: "Management and Public Administration Sciences",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Any other language": 4,
        "Any two subjects": 4,
      },
      additionalRequirements: ["Extended curriculum with lower APS (19)"],
      careerOpportunities: ["PR officer", "Communications specialist", "Brand manager", "Corporate communications officer"],
    },
    {
      id: "wsu-dip-small-business-mgmt",
      name: "Diploma in Small Business Management",
      faculty: "Management and Public Administration Sciences",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        "English": 3,
        "Alternatives": {
          alternatives: [
            { subject: "Mathematics or Accounting", level: 3 },
            { subject: "Mathematics Literacy", level: 3 },
          ],
        },
        "Any two subjects": 3,
      },
      careerOpportunities: ["Business owner", "Entrepreneur", "Small business consultant", "Business development officer"],
    },
    {
      id: "wsu-dip-sport-mgmt",
      name: "Diploma in Sport Management",
      faculty: "Management and Public Administration Sciences",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        "English": 3,
        "Any three subjects": 3,
      },
      careerOpportunities: ["Sports manager", "Sports administrator", "Coach", "Athletics coordinator"],
    },
    {
      id: "wsu-dip-tourism-mgmt",
      name: "Diploma in Tourism Management",
      faculty: "Management and Public Administration Sciences",
      apsMin: 21,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Alternatives": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematics Literacy", level: 3 },
          ],
        },
        "Any three relevant subjects": 3,
      },
      careerOpportunities: ["Tour operator", "Travel consultant", "Tourism officer", "Destination planner"],
    },
    {
      id: "wsu-bad-admin",
      name: "Bachelor of Administration",
      faculty: "Management and Public Administration Sciences",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Any four subjects": 4,
      },
      careerOpportunities: ["Senior administrator", "Administration manager", "Government administrator", "Executive director"],
    },

    // Natural Sciences
    {
      id: "wsu-dip-consumer-science-food-nutrition",
      name: "Diploma in Consumer Science (Food and Nutrition)",
      faculty: "Natural Sciences",
      apsMin: 22,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["Extended curriculum with lower APS (20)"],
      careerOpportunities: ["Food scientist", "Nutritionist", "Product developer", "Food service manager"],
    },
  ];

  /**
   * WSU uses a standard APS calculation method
   * Based on NSC achievement levels 1-7
   */
  calculateAPS(subjects: Record<string, number>): number {
    const validSubjects = Object.entries(subjects).filter(
      ([name, level]) => name !== "Life Orientation" && level > 0,
    );

    if (validSubjects.length < 6) {
      throw new Error(
        "At least 6 subjects required (excluding Life Orientation)",
      );
    }

    // Take best 6 subjects
    const best6 = validSubjects
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([, level]) => level);

    return best6.reduce((sum, level) => sum + level, 0);
  }

  /**
   * Get courses that match the calculated APS and subject requirements
   */
  getMatchingCourses(
    apsScore: number,
    subjects: Record<string, number>,
  ): Course[] {
    return this._courses.filter((course) => {
      // Check APS requirement
      if (apsScore < (course.apsMin ?? 0)) return false;

      // Check subject requirements
      for (const [subject, minLevel] of Object.entries(
        course.subjectRequirements ?? {},
      )) {
        const studentLevel = subjects[subject] || 0;
        if (typeof minLevel === "number" && studentLevel < minLevel) return false;
      }

      return true;
    });
  }

  /**
   * WSU-specific APS calculation
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
