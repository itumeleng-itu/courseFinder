import { BaseUniversity } from "./base-university"
import type { Course } from "@/lib/types"

/**
 * Nelson Mandela University (NMU) class
 */
export class NMU extends BaseUniversity {
  readonly id = "nmu"
  readonly name = "Nelson Mandela University"
  readonly shortName = "NMU"
  readonly website = "https://www.mandela.ac.za"
  readonly logo = "/logos/nmu.png"
  readonly location = {
    city: "Port Elizabeth",
    province: "Eastern Cape",
    coordinates: {
      latitude: -34.0007,
      longitude: 25.6735,
    },
  }

  readonly campuses = [
    {
      name: "Summerstrand Campus",
      location: "Port Elizabeth",
      programs: ["Most undergraduate programs"],
    },
    {
      name: "Second Avenue Campus",
      location: "Port Elizabeth",
      programs: ["Health Sciences programs"],
    },
    {
      name: "George Campus",
      location: "George",
      programs: ["Selected programs including Forestry, Nature Conservation"],
    },
    {
      name: "Missionvale Campus",
      location: "Port Elizabeth",
      programs: ["Community engagement programs"],
    },
  ]

  readonly admissionInfo = {
    apsCalculation:
      "Calculated using six subjects excluding Life Orientation. For quintile 1-3 schools with 50%+ in Life Orientation, 7 points are added.",
    minimumRequirements: {
      higherCertificate: "NSC with 30% in language of instruction",
      diploma: "NSC with 30% in language of instruction + 40-49% in four 20-credit subjects",
      degree: "NSC with 30% in language of instruction + 50-59% in four 20-credit subjects",
    },
    applicationDeadlines: {
      early: "August",
      late: "September",
      medical: "30 June (MBChB, BPharm, Radiography)",
    },
  }

  readonly financialAid = {
    nsfas: "Available for qualifying students",
    bursaries: "Merit awards and corporate donor funds available",
    contact: "financialaid@mandela.ac.za",
  }

  readonly accommodation = {
    onCampus: "Residences available on Summerstrand, Second Avenue and George campuses",
    offCampus: "Student Housing office assists with off-campus accommodation",
    contact: "resadmissions@mandela.ac.za",
  }

  protected readonly _courses: Course[] = [
    // Faculty of Business & Economic Sciences
    {
      id: "nmu-bcom-accounting",
      name: "Bachelor of Commerce in Accounting",
      faculty: "Business & Economic Sciences",
      apsMin: 41,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 6,
      },
      additionalRequirements: "Also offered on George Campus",
      careerOpportunities: ["Chartered Accountant", "Financial Manager", "Auditor"],
    },
    {
      id: "nmu-bcom-chartered-accounting",
      name: "Bachelor of Commerce in Chartered Accountancy",
      faculty: "Business & Economic Sciences",
      apsMin: 41,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 6,
      },
      additionalRequirements:
        "Mathematics 60% if took Grade 12 Accounting OR 65% if did not take Grade 12 Accounting. Also offered on George Campus",
      careerOpportunities: ["Chartered Accountant", "CA(SA)", "Financial Director"],
    },
    {
      id: "nmu-bcom-accounting-science-economics",
      name: "Bachelor of Commerce: Accounting Science (Economics & Business Management)",
      faculty: "Business & Economic Sciences",
      apsMin: 41,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 7,
      },
      careerOpportunities: ["Chartered Accountant", "Business Analyst", "Financial Consultant"],
    },
    {
      id: "nmu-bcom-accounting-science-law",
      name: "Bachelor of Commerce: Accounting Science (Law)",
      faculty: "Business & Economic Sciences",
      apsMin: 41,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 7,
        "English Home": 7,
      },
      additionalRequirements: "English (Home Lang) 65% or English (1st Add Lang) 70%",
      careerOpportunities: ["Chartered Accountant", "Legal Advisor", "Corporate Lawyer"],
    },
    {
      id: "nmu-bcom-accounting-science-cs",
      name: "Bachelor of Commerce: Accounting Science (Computer Science & Information Systems)",
      faculty: "Business & Economic Sciences",
      apsMin: 41,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 7,
      },
      careerOpportunities: ["Chartered Accountant", "IT Auditor", "Systems Analyst"],
    },
    {
      id: "nmu-bcom-marketing-business",
      name: "Bachelor of Commerce in Marketing & Business Management",
      faculty: "Business & Economic Sciences",
      apsMin: 39,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 5,
      },
      careerOpportunities: ["Marketing Manager", "Business Development Manager", "Brand Manager"],
    },
    {
      id: "nmu-bcom-logistics-transport",
      name: "Bachelor of Commerce in Logistics & Transport Economics",
      faculty: "Business & Economic Sciences",
      apsMin: 39,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 5,
      },
      careerOpportunities: ["Logistics Manager", "Supply Chain Analyst", "Transport Economist"],
    },
    {
      id: "nmu-bcom-economics-statistics",
      name: "Bachelor of Commerce in Economics & Statistics",
      faculty: "Business & Economic Sciences",
      apsMin: 39,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 6,
      },
      careerOpportunities: ["Economist", "Statistician", "Data Analyst"],
    },
    {
      id: "nmu-bcom-financial-planning",
      name: "Bachelor of Commerce in Financial Planning",
      faculty: "Business & Economic Sciences",
      apsMin: 39,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 5,
      },
      careerOpportunities: ["Financial Planner", "Investment Advisor", "Wealth Manager"],
    },
    {
      id: "nmu-bcom-hospitality",
      name: "Bachelor of Commerce in Hospitality Management",
      faculty: "Business & Economic Sciences",
      apsMin: 39,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 5,
      },
      careerOpportunities: ["Hotel Manager", "Event Manager", "Tourism Consultant"],
    },
    {
      id: "nmu-bcom-food-service",
      name: "Bachelor of Commerce in Food Service Management",
      faculty: "Business & Economic Sciences",
      apsMin: 39,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 5,
      },
      careerOpportunities: ["Restaurant Manager", "Food Service Director", "Catering Manager"],
    },

    // Faculty of Engineering, the Built Environment & Technology
    {
      id: "nmu-beng-civil",
      name: "Bachelor of Engineering Technology (Civil Engineering)",
      faculty: "Engineering, the Built Environment & Technology",
      apsMin: 37,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 6,
        "Physical Sciences": 5,
      },
      additionalRequirements:
        "Mathematics 60% or Technical Maths 60%, and Physical Science 50% or Technical Science 50%",
      careerOpportunities: ["Civil Engineer", "Structural Engineer", "Project Manager"],
    },
    {
      id: "nmu-beng-electrical",
      name: "Bachelor of Engineering Technology (Electrical Engineering)",
      faculty: "Engineering, the Built Environment & Technology",
      apsMin: 37,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 6,
        "Physical Sciences": 5,
      },
      additionalRequirements:
        "Mathematics 60% or Technical Maths 60%, and Physical Science 50% or Technical Science 50%",
      careerOpportunities: ["Electrical Engineer", "Power Systems Engineer", "Control Systems Engineer"],
    },
    {
      id: "nmu-beng-mechanical",
      name: "Bachelor of Engineering Technology (Mechanical Engineering)",
      faculty: "Engineering, the Built Environment & Technology",
      apsMin: 37,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 6,
        "Physical Sciences": 5,
      },
      additionalRequirements:
        "Mathematics 60% or Technical Maths 60%, and Physical Science 50% or Technical Science 50%",
      careerOpportunities: ["Mechanical Engineer", "Design Engineer", "Manufacturing Engineer"],
    },
    {
      id: "nmu-beng-industrial",
      name: "Bachelor of Engineering Technology (Industrial Engineering)",
      faculty: "Engineering, the Built Environment & Technology",
      apsMin: 37,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 6,
        "Physical Sciences": 5,
      },
      additionalRequirements:
        "Mathematics 60% or Technical Maths 60%, and Physical Science 50% or Technical Science 50%",
      careerOpportunities: ["Industrial Engineer", "Operations Manager", "Quality Engineer"],
    },
    {
      id: "nmu-beng-marine",
      name: "Bachelor of Engineering Technology (Marine Engineering)",
      faculty: "Engineering, the Built Environment & Technology",
      apsMin: 37,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 6,
        "Physical Sciences": 5,
      },
      additionalRequirements:
        "Mathematics 60% or Technical Maths 60%, and Physical Science 50% or Technical Science 50%",
      careerOpportunities: ["Marine Engineer", "Naval Architect", "Port Engineer"],
    },
    {
      id: "nmu-beng-mechatronics",
      name: "Bachelor of Engineering (Mechatronics)",
      faculty: "Engineering, the Built Environment & Technology",
      apsMin: 41,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 6,
        "Physical Sciences": 7,
      },
      additionalRequirements: "Mathematics 60% and Physical Sciences 65%",
      careerOpportunities: ["Mechatronics Engineer", "Robotics Engineer", "Automation Engineer"],
    },
    {
      id: "nmu-bas-architecture",
      name: "Bachelor of Architectural Studies",
      faculty: "Engineering, the Built Environment & Technology",
      apsMin: 37,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 6,
      },
      additionalRequirements: "Mathematics 55%. Admission is subject to departmental selection",
      careerOpportunities: ["Architect", "Urban Planner", "Architectural Technologist"],
    },
    {
      id: "nmu-bsc-construction-economics",
      name: "Bachelor of Science: Construction Economics",
      faculty: "Engineering, the Built Environment & Technology",
      apsMin: 37,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 6,
      },
      additionalRequirements: "Mathematics 55%",
      careerOpportunities: ["Quantity Surveyor", "Construction Economist", "Project Manager"],
    },
    {
      id: "nmu-bsc-construction-studies",
      name: "Bachelor of Science in Construction Studies",
      faculty: "Engineering, the Built Environment & Technology",
      apsMin: 37,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 6,
      },
      additionalRequirements: "Mathematics 55%",
      careerOpportunities: ["Construction Manager", "Site Manager", "Building Inspector"],
    },
    {
      id: "nmu-bit",
      name: "Bachelor of Information Technology",
      faculty: "Engineering, the Built Environment & Technology",
      apsMin: 37,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 5,
      },
      additionalRequirements: "Mathematics 50% or Technical Maths 50%",
      careerOpportunities: ["Software Developer", "Systems Analyst", "IT Consultant"],
    },

    // Faculty of Science
    {
      id: "nmu-bsc-biological-sciences",
      name: "Bachelor of Science in Biological Sciences",
      faculty: "Science",
      apsMin: 41,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 6,
      },
      additionalRequirements: "Mathematics 60%",
      careerOpportunities: ["Biologist", "Research Scientist", "Environmental Consultant"],
    },
    {
      id: "nmu-bsc-biochemistry-chemistry",
      name: "Bachelor of Science (Biochemistry, Chemistry, Microbiology & Physiology)",
      faculty: "Science",
      apsMin: 41,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 6,
      },
      additionalRequirements: "Mathematics 60%",
      careerOpportunities: ["Biochemist", "Laboratory Scientist", "Research Analyst"],
    },
    {
      id: "nmu-bsc-geosciences",
      name: "Bachelor of Science in Geosciences",
      faculty: "Science",
      apsMin: 41,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 6,
      },
      additionalRequirements: "Mathematics 60%",
      careerOpportunities: ["Geologist", "Environmental Scientist", "Mining Geologist"],
    },
    {
      id: "nmu-bsc-applied-maths",
      name: "Bachelor of Science (Applied Mathematics, Computer Science, Mathematical Statistics and Physics)",
      faculty: "Science",
      apsMin: 41,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 7,
      },
      additionalRequirements: "Mathematics 65%",
      careerOpportunities: ["Data Scientist", "Actuary", "Research Scientist"],
    },
    {
      id: "nmu-bsc-physical-science-maths",
      name: "Bachelor of Science (Physical Science and Mathematics)",
      faculty: "Science",
      apsMin: 41,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 7,
      },
      additionalRequirements: "Mathematics 65%",
      careerOpportunities: ["Physicist", "Research Scientist", "Data Analyst"],
    },

    // Faculty of Health Sciences
    {
      id: "nmu-mbchb",
      name: "Bachelor of Medicine and Bachelor of Surgery",
      faculty: "Health Sciences",
      apsMin: 43,
      duration: "6 years",
      subjectRequirements: {
        Mathematics: 6,
        "Physical Sciences": 6,
        "Life Sciences": 6,
        "English Home": 6,
      },
      additionalRequirements: "Online applications close 30 June. Admission is subject to departmental selection",
      careerOpportunities: ["Medical Doctor", "Specialist Physician", "Surgeon"],
    },
    {
      id: "nmu-bpharm",
      name: "Bachelor of Pharmacy",
      faculty: "Health Sciences",
      apsMin: 41,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 6,
        "Physical Sciences": 6,
      },
      additionalRequirements: "Online applications close 30 June. Admission is subject to departmental selection",
      careerOpportunities: ["Pharmacist", "Clinical Pharmacist", "Pharmaceutical Researcher"],
    },
    {
      id: "nmu-brad",
      name: "Bachelor of Radiography in Diagnostic",
      faculty: "Health Sciences",
      apsMin: 39,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
        "Life Sciences": 5,
      },
      additionalRequirements: "Online applications close 30 June. Admission is subject to departmental selection",
      careerOpportunities: ["Radiographer", "Medical Imaging Specialist", "Diagnostic Technologist"],
    },
    {
      id: "nmu-nursing",
      name: "Bachelor of Nursing",
      faculty: "Health Sciences",
      apsMin: 37,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
        "Life Sciences": 6,
      },
      additionalRequirements: "Mathematics 50% or Maths Lit 65%, Physical Sciences 50% and Life Sciences 60%",
      careerOpportunities: ["Registered Nurse", "Clinical Nurse", "Nurse Manager"],
    },
    {
      id: "nmu-bsw",
      name: "Bachelor of Social Work",
      faculty: "Health Sciences",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 4,
      },
      additionalRequirements: "Mathematics 40% or Maths Literacy 65%",
      careerOpportunities: ["Social Worker", "Community Development Worker", "Child Protection Officer"],
    },
    {
      id: "nmu-bhsc-biokinetics",
      name: "Bachelor of Health Science (Biokinetics)",
      faculty: "Health Sciences",
      apsMin: 37,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 5,
        "Life Sciences": 5,
      },
      additionalRequirements: "Mathematics 50% or Maths Literacy 65%, Life Sciences 50% and Medical Report",
      careerOpportunities: ["Biokineticist", "Exercise Physiologist", "Sports Scientist"],
    },
    {
      id: "nmu-bhms",
      name: "Bachelor of Human Movement Science",
      faculty: "Health Sciences",
      apsMin: 35,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 5,
      },
      additionalRequirements: "Mathematics 45% or Maths Literacy 65%",
      careerOpportunities: ["Sports Scientist", "Exercise Specialist", "Movement Analyst"],
    },
    {
      id: "nmu-bemc",
      name: "Bachelor of Emergency Medical Care",
      faculty: "Health Sciences",
      apsMin: 37,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
        "Life Sciences": 6,
      },
      additionalRequirements: "Admission subject to selection including interview and medical fitness report",
      careerOpportunities: ["Paramedic", "Emergency Medical Technician", "Critical Care Paramedic"],
    },
    {
      id: "nmu-bhsc-medical-lab",
      name: "Bachelor of Health Science: Medical Laboratory Science",
      faculty: "Health Sciences",
      apsMin: 39,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 6,
        "Physical Sciences": 5,
        "Life Sciences": 5,
      },
      additionalRequirements: "Admission is subject to departmental selection",
      careerOpportunities: ["Medical Laboratory Scientist", "Clinical Laboratory Technologist", "Research Technician"],
    },
    {
      id: "nmu-bsc-dietetics",
      name: "Bachelor of Science in Dietetics",
      faculty: "Health Sciences",
      apsMin: 39,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 6,
        "Physical Sciences": 6,
      },
      additionalRequirements: "Mathematics 60% and Physical Sciences 60%",
      careerOpportunities: ["Dietitian", "Clinical Nutritionist", "Sports Nutritionist"],
    },
    {
      id: "nmu-environmental-health",
      name: "Bachelor of Environmental Health",
      faculty: "Health Sciences",
      apsMin: 39,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 5,
        "Physical Sciences": 5,
        "Life Sciences": 5,
      },
      additionalRequirements: "Admission is subject to departmental selection",
      careerOpportunities: ["Environmental Health Officer", "Public Health Inspector", "Environmental Consultant"],
    },

    // Faculty of Education
    {
      id: "nmu-bed-foundation",
      name: "Bachelor of Education: Foundation Phase",
      faculty: "Education",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        Mathematics: 5,
      },
      additionalRequirements:
        "English (Home Lang or 1st Add Lang) 50% and Afrikaans or isiXhosa 50%. Mathematics 45% or Maths Literacy 60%",
      careerOpportunities: ["Foundation Phase Teacher", "Early Childhood Educator", "Primary School Teacher"],
    },
    {
      id: "nmu-bed-intermediate",
      name: "Bachelor of Education: Intermediate Phase",
      faculty: "Education",
      apsMin: 37,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        Mathematics: 5,
      },
      additionalRequirements:
        "English (Home Lang or 1st Add Lang) 50% and Afrikaans or isiXhosa 50%. Mathematics 45% or Maths Literacy 60%",
      careerOpportunities: ["Intermediate Phase Teacher", "Primary School Teacher", "Subject Specialist"],
    },
    {
      id: "nmu-bed-senior-commerce",
      name: "Bachelor of Education: Senior Phase and FET (Commerce Stream)",
      faculty: "Education",
      apsMin: 39,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        Mathematics: 6,
        Accounting: 6,
      },
      additionalRequirements: "English and Afrikaans/isiXhosa 50%. Mathematics 60%, Accounting 60%",
      careerOpportunities: ["High School Teacher", "Business Studies Teacher", "Economics Teacher"],
    },
    {
      id: "nmu-bed-senior-science",
      name: "Bachelor of Education: Senior Phase and FET (Science Stream)",
      faculty: "Education",
      apsMin: 39,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        Mathematics: 6,
        "Physical Sciences": 6,
        "Life Sciences": 6,
      },
      additionalRequirements:
        "English and Afrikaans/isiXhosa 50%. Mathematics 60%, Physical Science 60%, Life Science 60%",
      careerOpportunities: ["High School Teacher", "Science Teacher", "Mathematics Teacher"],
    },
    {
      id: "nmu-bed-senior-humanities",
      name: "Bachelor of Education: Senior Phase and FET (Humanities Stream)",
      faculty: "Education",
      apsMin: 39,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 5,
        Mathematics: 5,
      },
      additionalRequirements: "English and Afrikaans/isiXhosa 50%. Mathematics 45% (60% if Geography selected)",
      careerOpportunities: ["High School Teacher", "Language Teacher", "History Teacher"],
    },
    {
      id: "nmu-bmus-school",
      name: "Bachelor of Music (School Music)",
      faculty: "Education",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {},
      additionalRequirements:
        "Practical standard equivalent to Grade 6 and music theoretical standard equivalent to Grade 5. Admission subject to audition and theory test",
      careerOpportunities: ["Music Teacher", "Music Educator", "School Music Director"],
    },

    // Faculty of Humanities
    {
      id: "nmu-ba",
      name: "Bachelor of Arts",
      faculty: "Humanities",
      apsMin: 35,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 6,
        Mathematics: 4,
      },
      additionalRequirements: "Any one NSC (Home or 1st Add Lang) 60%, Mathematics 35% or Maths Literacy 55%",
      careerOpportunities: ["Journalist", "Social Worker", "Public Relations Officer"],
    },
    {
      id: "nmu-ba-media-communication",
      name: "Bachelor of Arts (Media, Communication & Culture)",
      faculty: "Humanities",
      apsMin: 35,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 6,
        Mathematics: 4,
      },
      additionalRequirements: "Any one NSC (Home or 1st Add Lang) 60%, Mathematics 35% or Maths Literacy 55%",
      careerOpportunities: ["Journalist", "Media Producer", "Communications Specialist"],
    },
    {
      id: "nmu-ba-psychology",
      name: "Bachelor of Arts (Psychology)",
      faculty: "Humanities",
      apsMin: 35,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 5,
      },
      additionalRequirements: "Mathematics 45% or Maths Literacy 65%",
      careerOpportunities: ["Psychologist", "Counselor", "Human Resources Specialist"],
    },
    {
      id: "nmu-ba-development-studies",
      name: "Bachelor of Arts (Development Studies)",
      faculty: "Humanities",
      apsMin: 35,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
      },
      additionalRequirements: "Mathematics 40% or Maths Literacy 70%",
      careerOpportunities: ["Development Worker", "Project Manager", "Policy Analyst"],
    },
    {
      id: "nmu-ba-politics-economics",
      name: "Bachelor of Arts (Politics & Economics)",
      faculty: "Humanities",
      apsMin: 35,
      duration: "3 years",
      subjectRequirements: {
        "English Home": 6,
        Mathematics: 4,
      },
      additionalRequirements:
        "Any one NSC (Home or 1st Add Lang) 60%, Mathematics 40% or Technical Mathematics/Mathematical Literacy 70%",
      careerOpportunities: ["Political Analyst", "Economist", "Policy Researcher"],
    },
    {
      id: "nmu-ba-hrm",
      name: "Bachelor of Arts (Human Resource Management)",
      faculty: "Humanities",
      apsMin: 35,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
      },
      additionalRequirements: "Mathematics 40% or Maths Literacy 70%",
      careerOpportunities: ["HR Manager", "Recruitment Specialist", "Training Coordinator"],
    },
    {
      id: "nmu-badmin-public",
      name: "Bachelor of Administration (Public Administration)",
      faculty: "Humanities",
      apsMin: 35,
      duration: "3 years",
      subjectRequirements: {
        Mathematics: 4,
      },
      additionalRequirements: "Mathematics 35% or Maths Literacy 55%",
      careerOpportunities: ["Public Administrator", "Government Official", "Policy Analyst"],
    },
    {
      id: "nmu-bva",
      name: "Bachelor of Visual Art",
      faculty: "Humanities",
      apsMin: 35,
      duration: "3 years",
      subjectRequirements: {},
      additionalRequirements:
        "Admission subject to departmental selection. Portfolio, interview and placement assessment required",
      careerOpportunities: ["Artist", "Graphic Designer", "Art Director"],
    },
    {
      id: "nmu-bmus-general",
      name: "Bachelor of Music (General)",
      faculty: "Humanities",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {},
      additionalRequirements:
        "Practical standard equivalent to Grade 6 and music theoretical standard equivalent to Grade 5. Admission subject to audition and theory test",
      careerOpportunities: ["Musician", "Music Producer", "Music Therapist"],
    },
    {
      id: "nmu-bmus-performing",
      name: "Bachelor of Music (Performing Arts)",
      faculty: "Humanities",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {},
      additionalRequirements:
        "Practical standard equivalent to Grade 6 and music theoretical standard equivalent to Grade 5. Admission subject to audition and theory test",
      careerOpportunities: ["Performer", "Music Director", "Arts Administrator"],
    },
    {
      id: "nmu-bmus-technology",
      name: "Bachelor of Music (Music Technology)",
      faculty: "Humanities",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {},
      additionalRequirements:
        "Practical standard equivalent to Grade 6 and music theoretical standard equivalent to Grade 5. Admission subject to audition and theory test",
      careerOpportunities: ["Sound Engineer", "Music Producer", "Audio Technician"],
    },
    {
      id: "nmu-bhsd",
      name: "Bachelor of Human Settlement Development",
      faculty: "Humanities",
      apsMin: 37,
      duration: "4 years",
      subjectRequirements: {
        Mathematics: 5,
      },
      additionalRequirements:
        "Mathematics 50% or Maths Literacy 70%. Admission subject to selection. Must be employed in related field",
      careerOpportunities: ["Urban Planner", "Housing Development Officer", "Community Development Specialist"],
    },

    // Faculty of Law
    {
      id: "nmu-llb",
      name: "Bachelor of Laws",
      faculty: "Law",
      apsMin: 39,
      duration: "4 years",
      subjectRequirements: {
        "English Home": 7,
        Mathematics: 5,
      },
      additionalRequirements: "English (Home Lang) 65% or English (1st Add Lang) 70% and Mathematics 50%",
      careerOpportunities: ["Lawyer", "Advocate", "Legal Advisor"],
    },
    {
      id: "nmu-llb-extended",
      name: "Bachelor of Laws - Extended Curriculum",
      faculty: "Law",
      apsMin: 37,
      duration: "5 years",
      subjectRequirements: {
        "English Home": 6,
        Mathematics: 5,
      },
      additionalRequirements:
        "English (Home Lang) 60% or English (1st Add Lang) 65% and Mathematics 45% or Maths Literacy 70%",
      careerOpportunities: ["Lawyer", "Advocate", "Legal Advisor"],
    },
    {
      id: "nmu-bcom-law",
      name: "Bachelor of Commerce (Law) + two-year post LLB degree",
      faculty: "Law",
      apsMin: 39,
      duration: "3 years + 2 years",
      subjectRequirements: {
        "English Home": 7,
        Mathematics: 6,
      },
      additionalRequirements: "English (Home Lang) 65% or English (1st Add Lang) 70% and Mathematics 60%",
      careerOpportunities: ["Commercial Lawyer", "Corporate Legal Advisor", "Business Attorney"],
    },
    {
      id: "nmu-ba-law",
      name: "Bachelor of Arts (Law) + two-year post LLB degree",
      faculty: "Law",
      apsMin: 39,
      duration: "3 years + 2 years",
      subjectRequirements: {
        "English Home": 7,
        Mathematics: 5,
      },
      additionalRequirements:
        "English (Home Lang) 65% or English (1st Add Lang) 70% and Mathematics 50% or Maths Literacy 75%",
      careerOpportunities: ["Lawyer", "Human Rights Lawyer", "Legal Researcher"],
    },
  ]

  // Additional methods for NMU-specific functionality
  getExtendedCurriculumPrograms(): Course[] {
    return this._courses.filter(
      (course) => course.name.includes("Extended Curriculum") || course.additionalRequirements?.includes("Extended"),
    )
  }

  getGeorgeCampusPrograms(): Course[] {
    return this._courses.filter((course) => course.additionalRequirements?.includes("George Campus"))
  }

  getMedicalPrograms(): Course[] {
    return this._courses.filter(
      (course) =>
        course.additionalRequirements?.includes("30 June") ||
        course.name.includes("Medicine") ||
        course.name.includes("Pharmacy") ||
        course.name.includes("Radiography"),
    )
  }

  getSelectionBasedPrograms(): Course[] {
    return this._courses.filter(
      (course) =>
        course.additionalRequirements?.includes("departmental selection") ||
        course.additionalRequirements?.includes("subject to selection"),
    )
  }

  /**
   * NMU-specific APS calculation
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