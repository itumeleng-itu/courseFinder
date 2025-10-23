import type { University } from "./base-university"

export const universities: University[] = [
  {
    id: "wits",
    name: "University of the Witwatersrand",
    shortName: "Wits",
    location: "Johannesburg",
    website: "https://www.wits.ac.za",
    courses: [
      {
        name: "Bachelor of Commerce",
        faculty: "Commerce, Law and Management",
        apsRequired: 38,
        description: "A comprehensive business degree",
        requirements: ["Mathematics 60%", "English 50%"],
      },
      {
        name: "Bachelor of Science in Engineering",
        faculty: "Engineering and the Built Environment",
        apsRequired: 40,
        description: "Engineering degree with multiple specializations",
        requirements: ["Mathematics 70%", "Physical Sciences 70%"],
      },
      {
        name: "Bachelor of Medicine and Surgery (MBBCh)",
        faculty: "Health Sciences",
        apsRequired: 42,
        description: "Medical degree program",
        requirements: ["Mathematics 70%", "Physical Sciences 70%", "Life Sciences 70%"],
      },
    ],
  },
  {
    id: "uct",
    name: "University of Cape Town",
    shortName: "UCT",
    location: "Cape Town",
    website: "https://www.uct.ac.za",
    courses: [
      {
        name: "Bachelor of Commerce",
        faculty: "Commerce",
        apsRequired: 39,
        requirements: ["Mathematics 65%", "English 60%"],
      },
      {
        name: "Bachelor of Science",
        faculty: "Science",
        apsRequired: 35,
        requirements: ["Mathematics 60%", "Physical Sciences 60%"],
      },
      {
        name: "Bachelor of Arts",
        faculty: "Humanities",
        apsRequired: 30,
        requirements: ["English 60%"],
      },
    ],
  },
  {
    id: "up",
    name: "University of Pretoria",
    shortName: "UP",
    location: "Pretoria",
    website: "https://www.up.ac.za",
    courses: [
      {
        name: "BEng Electrical Engineering",
        faculty: "Engineering, Built Environment and IT",
        apsRequired: 38,
        requirements: ["Mathematics 70%", "Physical Sciences 70%"],
      },
      {
        name: "Bachelor of Education",
        faculty: "Education",
        apsRequired: 28,
        requirements: ["English 50%"],
      },
      {
        name: "BSc Information Technology",
        faculty: "Engineering, Built Environment and IT",
        apsRequired: 32,
        requirements: ["Mathematics 60%"],
      },
    ],
  },
  {
    id: "stellenbosch",
    name: "Stellenbosch University",
    shortName: "Stellenbosch",
    location: "Stellenbosch",
    website: "https://www.sun.ac.za",
    courses: [
      {
        name: "BCom Accounting",
        faculty: "Economic and Management Sciences",
        apsRequired: 36,
        requirements: ["Mathematics 65%", "English 60%"],
      },
      {
        name: "Bachelor of Science in Agriculture",
        faculty: "AgriSciences",
        apsRequired: 30,
        requirements: ["Mathematics 55%", "Life Sciences 60%"],
      },
    ],
  },
  {
    id: "ukzn",
    name: "University of KwaZulu-Natal",
    shortName: "UKZN",
    location: "Durban",
    website: "https://www.ukzn.ac.za",
    courses: [
      {
        name: "Bachelor of Social Science",
        faculty: "Humanities",
        apsRequired: 28,
        requirements: ["English 55%"],
      },
      {
        name: "Bachelor of Laws (LLB)",
        faculty: "Law",
        apsRequired: 35,
        requirements: ["English 65%"],
      },
      {
        name: "BSc Computer Science",
        faculty: "Science and Agriculture",
        apsRequired: 33,
        requirements: ["Mathematics 65%"],
      },
    ],
  },
  {
    id: "uj",
    name: "University of Johannesburg",
    shortName: "UJ",
    location: "Johannesburg",
    website: "https://www.uj.ac.za",
    courses: [
      {
        name: "National Diploma in Marketing",
        faculty: "Economics and Financial Sciences",
        apsRequired: 26,
        requirements: ["English 50%", "Mathematics or Mathematical Literacy 50%"],
      },
      {
        name: "Bachelor of Arts in Graphic Design",
        faculty: "Art, Design and Architecture",
        apsRequired: 27,
        requirements: ["English 50%"],
      },
    ],
  },
  {
    id: "nwu",
    name: "North-West University",
    shortName: "NWU",
    location: "Potchefstroom",
    website: "https://www.nwu.ac.za",
    courses: [
      {
        name: "Bachelor of Commerce",
        faculty: "Economic and Management Sciences",
        apsRequired: 30,
        requirements: ["Mathematics 60%", "English 50%"],
      },
      {
        name: "BEd Foundation Phase",
        faculty: "Education",
        apsRequired: 26,
        requirements: ["English 50%"],
      },
    ],
  },
  {
    id: "rhodes",
    name: "Rhodes University",
    shortName: "Rhodes",
    location: "Makhanda (Grahamstown)",
    website: "https://www.ru.ac.za",
    courses: [
      {
        name: "Bachelor of Journalism and Media Studies",
        faculty: "Humanities",
        apsRequired: 30,
        requirements: ["English 60%"],
      },
      {
        name: "BSc Biochemistry",
        faculty: "Science",
        apsRequired: 32,
        requirements: ["Mathematics 60%", "Physical Sciences 65%"],
      },
    ],
  },
]

export function getAllUniversities(): University[] {
  return universities
}

export function getUniversityById(id: string): University | undefined {
  return universities.find((uni) => uni.id === id)
}

export type { University, Course } from "./base-university"
