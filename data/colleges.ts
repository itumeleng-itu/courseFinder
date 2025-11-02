import type { University } from "./universities/base-university"

// College data structure following the same format as universities
export interface College {
  id: string
  name: string
  shortName: string
  location: string
  website?: string
  courses: CollegeCourse[]
}

export interface CollegeCourse {
  name: string
  faculty: string
  apsRequired: number
  description?: string
  requirements?: string[]
}

export const colleges: College[] = [
  {
    id: "boston-city-campus",
    name: "Boston City Campus & Business College",
    shortName: "Boston",
    location: "Johannesburg, Gauteng",
    website: "https://www.boston.co.za",
    courses: [
      {
        name: "Diploma in Information Technology",
        faculty: "Information Technology",
        apsRequired: 20,
        description: "Comprehensive IT diploma covering programming, networking, and systems administration",
        requirements: ["Mathematics or Mathematical Literacy", "English"]
      },
      {
        name: "Diploma in Business Management",
        faculty: "Business Studies",
        apsRequired: 18,
        description: "Business management fundamentals with practical application",
        requirements: ["English", "Mathematics or Mathematical Literacy"]
      },
      {
        name: "Diploma in Marketing Management",
        faculty: "Business Studies",
        apsRequired: 18,
        description: "Marketing strategies and consumer behavior studies",
        requirements: ["English", "Mathematics or Mathematical Literacy"]
      }
    ]
  },
  {
    id: "rosebank-college",
    name: "Rosebank College",
    shortName: "Rosebank",
    location: "Cape Town, Western Cape",
    website: "https://www.rosebankcollege.co.za",
    courses: [
      {
        name: "Bachelor of Commerce in Marketing",
        faculty: "Commerce",
        apsRequired: 22,
        description: "Comprehensive marketing degree with industry exposure",
        requirements: ["English", "Mathematics", "Business Studies recommended"]
      },
      {
        name: "Bachelor of Arts in Psychology",
        faculty: "Humanities",
        apsRequired: 24,
        description: "Psychology degree with counseling and research focus",
        requirements: ["English", "Life Sciences recommended"]
      },
      {
        name: "Diploma in Graphic Design",
        faculty: "Creative Arts",
        apsRequired: 20,
        description: "Creative design program with digital media focus",
        requirements: ["English", "Visual Arts recommended"]
      }
    ]
  },
  {
    id: "damelin-college",
    name: "Damelin College",
    shortName: "Damelin",
    location: "Durban, KwaZulu-Natal",
    website: "https://www.damelin.co.za",
    courses: [
      {
        name: "Higher Certificate in Business Administration",
        faculty: "Business Studies",
        apsRequired: 16,
        description: "Foundation business skills and administration",
        requirements: ["English", "Mathematics or Mathematical Literacy"]
      },
      {
        name: "Diploma in Project Management",
        faculty: "Management",
        apsRequired: 20,
        description: "Project management methodologies and leadership skills",
        requirements: ["English", "Mathematics or Mathematical Literacy"]
      },
      {
        name: "Certificate in Digital Marketing",
        faculty: "Marketing",
        apsRequired: 18,
        description: "Modern digital marketing strategies and tools",
        requirements: ["English", "Computer literacy"]
      }
    ]
  },
  {
    id: "varsity-college",
    name: "Varsity College",
    shortName: "Varsity College",
    location: "Pretoria, Gauteng",
    website: "https://www.varsitycollege.co.za",
    courses: [
      {
        name: "Bachelor of Commerce in Accounting",
        faculty: "Commerce",
        apsRequired: 26,
        description: "Professional accounting qualification with CA pathway",
        requirements: ["English", "Mathematics", "Accounting recommended"]
      },
      {
        name: "Bachelor of Arts in Media Studies",
        faculty: "Media & Communication",
        apsRequired: 22,
        description: "Media production and communication studies",
        requirements: ["English", "Creative subjects recommended"]
      },
      {
        name: "Diploma in Interior Design",
        faculty: "Design",
        apsRequired: 20,
        description: "Interior design with 3D modeling and space planning",
        requirements: ["English", "Visual Arts or Technical Drawing"]
      }
    ]
  },
  {
    id: "milpark-education",
    name: "Milpark Education",
    shortName: "Milpark",
    location: "Johannesburg, Gauteng",
    website: "https://www.milpark.ac.za",
    courses: [
      {
        name: "Bachelor of Banking",
        faculty: "Finance",
        apsRequired: 24,
        description: "Specialized banking and financial services degree",
        requirements: ["English", "Mathematics", "Economics recommended"]
      },
      {
        name: "Diploma in Financial Planning",
        faculty: "Finance",
        apsRequired: 20,
        description: "Personal and corporate financial planning",
        requirements: ["English", "Mathematics"]
      },
      {
        name: "Certificate in Insurance",
        faculty: "Finance",
        apsRequired: 18,
        description: "Insurance industry fundamentals and regulations",
        requirements: ["English", "Mathematics or Mathematical Literacy"]
      }
    ]
  },
  {
    id: "ctc-college",
    name: "Cape Town College",
    shortName: "CTC",
    location: "Cape Town, Western Cape",
    website: "https://www.ctc.ac.za",
    courses: [
      {
        name: "Diploma in Hospitality Management",
        faculty: "Hospitality",
        apsRequired: 18,
        description: "Hotel and restaurant management with practical training",
        requirements: ["English", "Mathematics or Mathematical Literacy"]
      },
      {
        name: "Certificate in Culinary Arts",
        faculty: "Culinary Arts",
        apsRequired: 16,
        description: "Professional chef training with international cuisine",
        requirements: ["English", "Basic mathematics"]
      },
      {
        name: "Diploma in Tourism Management",
        faculty: "Tourism",
        apsRequired: 20,
        description: "Tourism industry management and operations",
        requirements: ["English", "Geography recommended"]
      }
    ]
  },
  {
    id: "richfield-college",
    name: "Richfield Graduate Institute",
    shortName: "Richfield",
    location: "Bloemfontein, Free State",
    website: "https://www.richfield.ac.za",
    courses: [
      {
        name: "Bachelor of Education Foundation Phase",
        faculty: "Education",
        apsRequired: 22,
        description: "Primary school teaching qualification",
        requirements: ["English", "Mathematics", "Life Sciences"]
      },
      {
        name: "Diploma in Early Childhood Development",
        faculty: "Education",
        apsRequired: 18,
        description: "Pre-school and daycare education",
        requirements: ["English", "Life Orientation"]
      },
      {
        name: "Certificate in Office Administration",
        faculty: "Business Studies",
        apsRequired: 16,
        description: "Administrative skills and office management",
        requirements: ["English", "Computer literacy"]
      }
    ]
  },
  {
    id: "mancosa",
    name: "Management College of Southern Africa",
    shortName: "MANCOSA",
    location: "Durban, KwaZulu-Natal",
    website: "https://www.mancosa.co.za",
    courses: [
      {
        name: "Bachelor of Commerce in Supply Chain Management",
        faculty: "Commerce",
        apsRequired: 24,
        description: "Logistics and supply chain optimization",
        requirements: ["English", "Mathematics", "Business Studies recommended"]
      },
      {
        name: "Diploma in Human Resource Management",
        faculty: "Management",
        apsRequired: 20,
        description: "HR practices and employment law",
        requirements: ["English", "Mathematics or Mathematical Literacy"]
      },
      {
        name: "Certificate in Entrepreneurship",
        faculty: "Business Studies",
        apsRequired: 18,
        description: "Small business development and startup strategies",
        requirements: ["English", "Basic business knowledge"]
      }
    ]
  },
  {
    id: "regent-college",
    name: "Regent Business School",
    shortName: "Regent",
    location: "Johannesburg, Gauteng",
    website: "https://www.regent.ac.za",
    courses: [
      {
        name: "Bachelor of Business Administration",
        faculty: "Business Administration",
        apsRequired: 22,
        description: "General business management with leadership focus",
        requirements: ["English", "Mathematics", "Economics recommended"]
      },
      {
        name: "Diploma in Public Relations",
        faculty: "Communication",
        apsRequired: 20,
        description: "Corporate communication and media relations",
        requirements: ["English", "Communication skills"]
      },
      {
        name: "Certificate in Event Management",
        faculty: "Management",
        apsRequired: 18,
        description: "Event planning and coordination skills",
        requirements: ["English", "Organizational skills"]
      }
    ]
  },
  {
    id: "stadio-college",
    name: "STADIO Higher Education",
    shortName: "STADIO",
    location: "Cape Town, Western Cape",
    website: "https://www.stadio.ac.za",
    courses: [
      {
        name: "Bachelor of Laws (LLB)",
        faculty: "Law",
        apsRequired: 28,
        description: "Professional law degree with practical training",
        requirements: ["English", "Mathematics", "History recommended"]
      },
      {
        name: "Bachelor of Social Work",
        faculty: "Social Sciences",
        apsRequired: 24,
        description: "Social work practice and community development",
        requirements: ["English", "Life Sciences", "History recommended"]
      },
      {
        name: "Diploma in Paralegal Studies",
        faculty: "Law",
        apsRequired: 20,
        description: "Legal assistant and paralegal training",
        requirements: ["English", "Mathematics or Mathematical Literacy"]
      }
    ]
  }
]

export function getAllColleges(): College[] {
  return colleges
}

export function getCollegeById(id: string): College | undefined {
  return colleges.find((college) => college.id === id)
}

// Convert college to university format for consistent rendering
export function collegeToUniversityFormat(college: College): University {
  return {
    id: college.id,
    name: college.name,
    shortName: college.shortName,
    location: college.location,
    website: college.website,
    courses: college.courses.map(course => ({
      name: course.name,
      faculty: course.faculty,
      apsRequired: course.apsRequired,
      description: course.description,
      requirements: course.requirements
    }))
  }
}