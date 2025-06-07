import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * University of the Western Cape (UWC) class
 * Uses a custom UWC points system instead of standard APS
 */
export class UWC extends BaseUniversity {
  readonly id = "uwc"
  readonly name = "University of the Western Cape"
  readonly shortName = "UWC"
  readonly website = "https://www.uwc.ac.za"
  readonly logo = "/logos/uwc.png"
  readonly location = {
    city: "Cape Town",
    province: "Western Cape",
    coordinates: {
      latitude: -33.9333,
      longitude: 18.6333,
    },
  }

  /**
   * UWC uses a custom points system instead of standard APS
   * This method calculates UWC points based on their specific weighting
   */
  calculateAPS(subjects: Record<string, number>): number {
    let totalPoints = 0
    let subjectCount = 0

    // UWC Points allocation table
    const getUWCPoints = (level: number, subjectType: "english" | "math" | "lifeOrientation" | "other"): number => {
      const pointsTable = {
        english: [0, 1, 3, 5, 7, 9, 11, 13, 15],
        math: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        lifeOrientation: [0, 1, 1, 1, 2, 2, 2, 3, 3],
        other: [0, 1, 3, 5, 7, 9, 11, 13, 15],
      }
      return pointsTable[subjectType][level] || 0
    }

    for (const [subject, level] of Object.entries(subjects)) {
      if (level === 0) continue

      let points = 0
      const normalizedSubject = subject.toLowerCase()

      if (normalizedSubject.includes("english")) {
        points = getUWCPoints(level, "english")
      } else if (normalizedSubject.includes("mathematics") || normalizedSubject.includes("math")) {
        points = getUWCPoints(level, "math")
      } else if (normalizedSubject.includes("life orientation")) {
        points = getUWCPoints(level, "lifeOrientation")
      } else {
        points = getUWCPoints(level, "other")
      }

      totalPoints += points
      subjectCount++
    }

    return totalPoints
  }

  protected readonly _courses: Course[] = [
    // Faculty of Community and Health Sciences
    {
      id: "uwc-bsw",
      name: "Bachelor of Social Work",
      faculty: "Community and Health Sciences",
      department: "Social Work",
      apsMin: 34,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 5,
        Mathematics: 3,
        "Mathematics Literacy": 4,
      },
      additionalRequirements: [
        "Another language (home or first additional) Code 4",
        "English home language Code 4 OR English first additional language Code 5",
      ],
      careerOpportunities: [
        "Social Worker",
        "Community Development Worker",
        "Child Protection Officer",
        "Family Counselor",
        "NGO Program Manager",
      ],
    },
    {
      id: "uwc-bcd",
      name: "Bachelor of Community Development",
      faculty: "Community and Health Sciences",
      department: "Social Work",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 3,
        "Mathematics Literacy": 4,
      },
      additionalRequirements: ["Another language Code 3 (home OR first additional language)"],
      careerOpportunities: [
        "Community Development Practitioner",
        "Project Coordinator",
        "Development Consultant",
        "NGO Manager",
        "Local Government Official",
      ],
    },
    {
      id: "uwc-ba-sres",
      name: "BA Sport, Recreation and Exercise Science",
      faculty: "Community and Health Sciences",
      department: "Sport, Recreation and Exercise Science",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 3,
        "Mathematics Literacy": 4,
      },
      additionalRequirements: ["Another language Code 3 (home OR first additional language)"],
      careerOpportunities: [
        "Sports Scientist",
        "Exercise Physiologist",
        "Sports Coach",
        "Fitness Consultant",
        "Recreation Manager",
      ],
    },
    {
      id: "uwc-bsc-dietetics",
      name: "BSc Dietetics and Nutrition",
      faculty: "Community and Health Sciences",
      department: "Dietetics and Nutrition",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
        "Mathematics Literacy": 6,
        "Life Sciences": 4,
      },
      additionalRequirements: ["Another language Code 3 (home OR first additional language)"],
      careerOpportunities: [
        "Dietitian",
        "Nutritionist",
        "Clinical Dietitian",
        "Sports Nutritionist",
        "Public Health Nutritionist",
      ],
    },
    {
      id: "uwc-bsc-sport-exercise",
      name: "BSc Sport and Exercise Science",
      faculty: "Community and Health Sciences",
      department: "Sport, Recreation and Exercise Science",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
        "Mathematics Literacy": 6,
        "Life Sciences": 4,
      },
      additionalRequirements: ["Another language Code 3 (home OR first additional language)"],
      careerOpportunities: [
        "Exercise Scientist",
        "Sports Performance Analyst",
        "Fitness Specialist",
        "Sports Researcher",
        "Athletic Performance Coach",
      ],
    },
    {
      id: "uwc-bsc-ot",
      name: "BSc Occupational Therapy",
      faculty: "Community and Health Sciences",
      department: "Occupational Therapy",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 3,
        "Mathematics Literacy": 5,
        "Life Sciences": 4,
      },
      additionalRequirements: ["Another language Code 3 (home OR first additional language)"],
      careerOpportunities: [
        "Occupational Therapist",
        "Rehabilitation Specialist",
        "Community Health Worker",
        "Assistive Technology Specialist",
        "Mental Health Practitioner",
      ],
    },
    {
      id: "uwc-bsc-physio",
      name: "BSc Physiotherapy",
      faculty: "Community and Health Sciences",
      department: "Physiotherapy",
      apsMin: 39,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
        "Mathematics Literacy": 6,
        "Life Sciences": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["Another language Code 3 (home OR first additional language)"],
      careerOpportunities: [
        "Physiotherapist",
        "Sports Physiotherapist",
        "Rehabilitation Specialist",
        "Private Practice Owner",
        "Hospital-based Therapist",
      ],
    },
    {
      id: "uwc-bnursing",
      name: "B Nursing and Midwifery",
      faculty: "Community and Health Sciences",
      department: "Nursing",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
        "Mathematics Literacy": 6,
        "Life Sciences": 4,
      },
      additionalRequirements: ["Another language Code 3 (home OR first additional language)"],
      careerOpportunities: ["Registered Nurse", "Midwife", "Community Health Nurse", "Hospital Nurse", "Nurse Manager"],
    },

    // Faculty of Economic and Management Sciences
    {
      id: "uwc-badmin",
      name: "BAdmin",
      faculty: "Economic and Management Sciences",
      department: "Public Administration and Management",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 3,
        "Mathematics Literacy": 5,
      },
      additionalRequirements: ["Another language Code 3 (home OR first additional language)"],
      careerOpportunities: [
        "Public Administrator",
        "Government Official",
        "Policy Analyst",
        "Municipal Manager",
        "Development Coordinator",
      ],
    },
    {
      id: "uwc-bcom",
      name: "BCom",
      faculty: "Economic and Management Sciences",
      department: "Economics and Finance",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
      },
      additionalRequirements: ["Another language Code 3 (home OR first additional language)"],
      careerOpportunities: [
        "Business Analyst",
        "Financial Consultant",
        "Marketing Manager",
        "Operations Manager",
        "Entrepreneur",
      ],
    },
    {
      id: "uwc-bcom-4yr",
      name: "BCom (4 year stream)",
      faculty: "Economic and Management Sciences",
      department: "Economics and Finance",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 3,
        "English First Additional": 3,
        Mathematics: 2,
        "Mathematics Literacy": 6,
      },
      additionalRequirements: ["Another language Code 3 (home OR first additional language)"],
      careerOpportunities: [
        "Business Analyst",
        "Financial Consultant",
        "Marketing Manager",
        "Operations Manager",
        "Entrepreneur",
      ],
    },
    {
      id: "uwc-bcom-financial-accounting",
      name: "BCom Financial Accounting",
      faculty: "Economic and Management Sciences",
      department: "Accounting",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
      },
      additionalRequirements: ["Another language Code 3 (home OR first additional language)"],
      careerOpportunities: [
        "Financial Accountant",
        "Auditor",
        "Financial Manager",
        "Tax Consultant",
        "Investment Analyst",
      ],
    },
    {
      id: "uwc-bcom-information-systems",
      name: "BCom Information Systems",
      faculty: "Economic and Management Sciences",
      department: "Information Systems",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
      },
      additionalRequirements: ["Another language Code 3 (home OR first additional language)"],
      careerOpportunities: [
        "Systems Analyst",
        "IT Consultant",
        "Business Intelligence Analyst",
        "Project Manager",
        "Database Administrator",
      ],
    },
    {
      id: "uwc-bcom-accounting-3yr",
      name: "BCom Accounting (3 years)",
      faculty: "Economic and Management Sciences",
      department: "Accounting",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
        Accounting: 5,
      },
      additionalRequirements: [
        "Another language Code 3 (home OR first additional language)",
        "Mathematics Code 4 AND Accounting Code 5 OR Mathematics Code 5",
      ],
      careerOpportunities: [
        "Chartered Accountant",
        "Financial Manager",
        "Auditor",
        "Tax Practitioner",
        "Management Accountant",
      ],
    },
    {
      id: "uwc-bcom-accounting-4yr",
      name: "BCom Accounting (4 years)",
      faculty: "Economic and Management Sciences",
      department: "Accounting",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 3,
        "English First Additional": 3,
        Mathematics: 4,
        Accounting: 5,
      },
      additionalRequirements: [
        "Another language Code 3 (home OR first additional language)",
        "Mathematics Code 4 AND Accounting Code 5 OR Mathematics Code 4",
      ],
      careerOpportunities: [
        "Chartered Accountant",
        "Financial Manager",
        "Auditor",
        "Tax Practitioner",
        "Management Accountant",
      ],
    },

    // Faculty of Natural Sciences
    {
      id: "uwc-bsc-environmental-water",
      name: "BSc Environmental and Water Science",
      faculty: "Natural Sciences",
      department: "Earth Sciences",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
      additionalRequirements: [
        "Another language Code 3 (home OR first additional language)",
        "Physical Sciences OR Life Sciences Code 4",
      ],
      careerOpportunities: [
        "Environmental Scientist",
        "Water Resource Manager",
        "Environmental Consultant",
        "Sustainability Specialist",
        "Climate Change Analyst",
      ],
    },
    {
      id: "uwc-bsc-biotechnology",
      name: "BSc Biotechnology",
      faculty: "Natural Sciences",
      department: "Biotechnology",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
      additionalRequirements: [
        "Another language Code 3 (home OR first additional language)",
        "Physical Sciences OR Life Sciences Code 4",
      ],
      careerOpportunities: [
        "Biotechnologist",
        "Research Scientist",
        "Quality Control Analyst",
        "Bioprocess Engineer",
        "Product Development Specialist",
      ],
    },
    {
      id: "uwc-bsc-biodiversity",
      name: "BSc Biodiversity and Conservation Biology",
      faculty: "Natural Sciences",
      department: "Biodiversity and Conservation Biology",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
      additionalRequirements: [
        "Another language Code 3 (home OR first additional language)",
        "Physical Sciences OR Life Sciences Code 4",
      ],
      careerOpportunities: [
        "Conservation Biologist",
        "Wildlife Manager",
        "Environmental Educator",
        "Park Ranger",
        "Research Scientist",
      ],
    },
    {
      id: "uwc-bsc-medical-bioscience",
      name: "BSc Medical Bioscience",
      faculty: "Natural Sciences",
      department: "Medical Bioscience",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
        "Life Sciences": 4,
      },
      additionalRequirements: ["Another language Code 3 (home OR first additional language)"],
      careerOpportunities: [
        "Medical Technologist",
        "Laboratory Scientist",
        "Research Assistant",
        "Quality Control Analyst",
        "Biomedical Researcher",
      ],
    },
    {
      id: "uwc-bsc-chemical-sciences",
      name: "BSc Chemical Sciences",
      faculty: "Natural Sciences",
      department: "Chemistry",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["Another language Code 3 (home OR first additional language)"],
      careerOpportunities: [
        "Chemist",
        "Chemical Analyst",
        "Quality Control Specialist",
        "Research Scientist",
        "Process Chemist",
      ],
    },
    {
      id: "uwc-bsc-applied-geology",
      name: "BSc Applied Geology",
      faculty: "Natural Sciences",
      department: "Earth Sciences",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["Another language Code 3 (home OR first additional language)"],
      careerOpportunities: [
        "Geologist",
        "Mining Geologist",
        "Environmental Geologist",
        "Hydrogeologist",
        "Geological Consultant",
      ],
    },
    {
      id: "uwc-bsc-physical-science",
      name: "BSc Physical Science",
      faculty: "Natural Sciences",
      department: "Physics and Astronomy",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 5,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["Another language Code 3 (home OR first additional language)"],
      careerOpportunities: [
        "Physicist",
        "Research Scientist",
        "Data Analyst",
        "Laboratory Technician",
        "Science Educator",
      ],
    },
    {
      id: "uwc-bsc-mathematical-statistical",
      name: "BSc Mathematical & Statistical Sciences",
      faculty: "Natural Sciences",
      department: "Mathematics and Applied Mathematics",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 5,
        "Physical Sciences": 4,
        "Life Sciences": 4,
        "Information Technology": 4,
      },
      additionalRequirements: [
        "Another language Code 3 (home OR first additional language)",
        "Physical Sciences OR Life Sciences OR Information Technology Code 4",
      ],
      careerOpportunities: ["Statistician", "Data Scientist", "Actuary", "Research Analyst", "Mathematical Modeler"],
    },
    {
      id: "uwc-bsc-computer-science",
      name: "BSc Computer Science",
      faculty: "Natural Sciences",
      department: "Computer Science",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 5,
        "Physical Sciences": 4,
        "Life Sciences": 4,
        "Information Technology": 4,
      },
      additionalRequirements: [
        "Another language Code 3 (home OR first additional language)",
        "Physical Sciences OR Life Sciences OR Information Technology Code 4",
      ],
      careerOpportunities: [
        "Software Developer",
        "Systems Analyst",
        "Database Administrator",
        "IT Consultant",
        "Cybersecurity Specialist",
      ],
    },
    {
      id: "uwc-bpharm",
      name: "Bachelor of Pharmacy",
      faculty: "Natural Sciences",
      department: "Pharmacy",
      apsMin: 38,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
      additionalRequirements: ["Another language Code 3 (home OR first additional language)"],
      careerOpportunities: [
        "Pharmacist",
        "Clinical Pharmacist",
        "Hospital Pharmacist",
        "Community Pharmacist",
        "Pharmaceutical Researcher",
      ],
    },

    // Faculty of Dentistry
    {
      id: "uwc-bds",
      name: "Bachelor of Dental Surgery (BDS)",
      faculty: "Dentistry",
      department: "Oral Health Sciences",
      apsMin: 40,
      duration: "5 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
      },
      additionalRequirements: [
        "Another language Code 3 (home OR first additional language)",
        "Application closing date: 31 August 2024",
      ],
      careerOpportunities: ["Dentist", "Oral Surgeon", "Orthodontist", "Periodontist", "Dental Specialist"],
    },
    {
      id: "uwc-boh",
      name: "Bachelor of Oral Health (BOH)",
      faculty: "Dentistry",
      department: "Oral Health Sciences",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 3,
        "Mathematics Literacy": 4,
        "Life Sciences": 4,
      },
      additionalRequirements: [
        "Another language Code 3 (home OR first additional language)",
        "Application closing date: 31 August 2024",
      ],
      careerOpportunities: [
        "Oral Hygienist",
        "Dental Therapist",
        "Community Oral Health Worker",
        "Dental Practice Manager",
        "Oral Health Educator",
      ],
    },

    // Faculty of Law
    {
      id: "uwc-llb",
      name: "Bachelor of Laws (LLB) (4 year)",
      faculty: "Law",
      department: "Private Law",
      apsMin: 37,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 3,
        "Mathematics Literacy": 5,
      },
      additionalRequirements: ["Another language Code 3 (home OR first additional language)"],
      careerOpportunities: ["Attorney", "Advocate", "Legal Advisor", "Magistrate", "Corporate Lawyer"],
    },
    {
      id: "uwc-bcom-law",
      name: "B Com Law",
      faculty: "Law",
      department: "Mercantile Law",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
      },
      additionalRequirements: ["Another language Code 3 (home OR first additional language)"],
      careerOpportunities: [
        "Legal Advisor",
        "Compliance Officer",
        "Corporate Legal Counsel",
        "Business Consultant",
        "Contract Specialist",
      ],
    },
    {
      id: "uwc-ba-law",
      name: "Bachelor of Arts in Law - BA (Law) (3 year)",
      faculty: "Law",
      department: "Public Law",
      apsMin: 37,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 3,
        "Mathematics Literacy": 5,
      },
      additionalRequirements: ["Another language Code 3 (home OR first additional language)"],
      careerOpportunities: ["Legal Researcher", "Paralegal", "Court Administrator", "Legal Advisor", "Policy Analyst"],
    },

    // Faculty of Education
    {
      id: "uwc-bed-accounting",
      name: "BEd Accounting (FET), Economic and Management Sciences (SP) and Mathematics (SP)",
      faculty: "Education",
      department: "Curriculum Studies",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
        "Mathematics Literacy": 6,
        Accounting: 4,
        "Business Studies": 4,
        Economics: 4,
      },
      additionalRequirements: [
        "Another language Code 3 (home OR first additional language)",
        "Accounting Code 4 OR Business Studies Code 4 OR Economics Code 4",
      ],
      careerOpportunities: [
        "High School Teacher",
        "Subject Advisor",
        "Curriculum Developer",
        "Educational Consultant",
        "Training Coordinator",
      ],
    },
    {
      id: "uwc-bed-mathematics",
      name: "BEd Mathematics (SP), Mathematical Literacy (SP & FET) and Natural Science (SP)",
      faculty: "Education",
      department: "Science and Technology Education",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 4,
        "Mathematics Literacy": 6,
        "Life Sciences": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: [
        "Another language Code 3 (home OR first additional language)",
        "Life Sciences Code 4 OR Physical Sciences Code 4",
      ],
      careerOpportunities: [
        "Mathematics Teacher",
        "Science Teacher",
        "Subject Advisor",
        "Curriculum Developer",
        "Educational Researcher",
      ],
    },
    {
      id: "uwc-bed-languages-lo",
      name: "BEd Languages (SP & FET) and Life Orientation (SP)",
      faculty: "Education",
      department: "Language Education",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 5,
        Mathematics: 3,
        "Mathematics Literacy": 5,
        "Life Orientation": 4,
      },
      additionalRequirements: ["Another language (home or first additional language) Code 4"],
      careerOpportunities: [
        "Language Teacher",
        "Life Orientation Teacher",
        "Subject Advisor",
        "Curriculum Developer",
        "Educational Consultant",
      ],
    },
    {
      id: "uwc-bed-languages-math",
      name: "BEd Languages (SP & FET) and Mathematics (SP)",
      faculty: "Education",
      department: "Language Education",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 5,
        Mathematics: 4,
        "Mathematics Literacy": 6,
      },
      additionalRequirements: ["Another language (home or first additional language) Code 4"],
      careerOpportunities: [
        "Language Teacher",
        "Mathematics Teacher",
        "Subject Advisor",
        "Curriculum Developer",
        "Educational Researcher",
      ],
    },
    {
      id: "uwc-bed-languages-social",
      name: "BEd Languages (SP & FET) and Social Sciences (SP)",
      faculty: "Education",
      department: "Language Education",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 5,
        Mathematics: 3,
        "Mathematics Literacy": 5,
        History: 4,
        Geography: 4,
      },
      additionalRequirements: [
        "Another language (home or first additional language) Code 4",
        "History Code 4 OR Geography Code 4",
      ],
      careerOpportunities: [
        "Language Teacher",
        "Social Sciences Teacher",
        "Subject Advisor",
        "Curriculum Developer",
        "Educational Consultant",
      ],
    },
    {
      id: "uwc-bed-foundation",
      name: "BEd Foundation Phase Teaching",
      faculty: "Education",
      department: "Foundation Phase Studies",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 3,
        "Mathematics Literacy": 5,
      },
      additionalRequirements: ["Another language Code 4 (home OR first additional language)"],
      careerOpportunities: [
        "Foundation Phase Teacher",
        "Early Childhood Development Specialist",
        "Curriculum Developer",
        "Educational Consultant",
        "Learning Support Specialist",
      ],
    },

    // Faculty of Arts and Humanities
    {
      id: "uwc-ba",
      name: "Bachelor of Arts (BA)",
      faculty: "Arts and Humanities",
      department: "Arts",
      apsMin: 35,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 3,
        "Mathematics Literacy": 4,
      },
      additionalRequirements: [
        "Code 4 in another subject from the NSC subject list",
        "Mathematics Code 3 OR Mathematics Literacy Code 4 required for specific majors",
      ],
      careerOpportunities: [
        "Journalist",
        "Writer",
        "Translator",
        "Museum Curator",
        "Cultural Officer",
        "Social Researcher",
        "Government Official",
        "NGO Worker",
      ],
    },
    {
      id: "uwc-bth",
      name: "Bachelor of Theology (BTh)",
      faculty: "Arts and Humanities",
      department: "Religion and Theology",
      apsMin: 35,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 3,
        "Mathematics Literacy": 4,
      },
      additionalRequirements: ["Code 4 in another subject from the NSC subject list"],
      careerOpportunities: ["Minister", "Chaplain", "Religious Educator", "Community Leader", "Counselor"],
    },
    {
      id: "uwc-blis",
      name: "Bachelor of Library and Information Science (BLIS)",
      faculty: "Arts and Humanities",
      department: "Library and Information Science",
      apsMin: 35,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 4,
        "English First Additional": 4,
        Mathematics: 3,
        "Mathematics Literacy": 4,
      },
      additionalRequirements: [
        "Code 4 in another subject from the NSC subject list",
        "Mathematics Code 3 OR Mathematics Literacy Code 4 required",
      ],
      careerOpportunities: [
        "Librarian",
        "Information Manager",
        "Knowledge Manager",
        "Digital Archivist",
        "Information Consultant",
      ],
    },
  ]
}
