import { BaseUniversity } from "./base-university";
import type { Course } from "@/lib/types";

/**
 * Sefako Makgatho Health Sciences University (SMU) class
 *
 * SMU is a health sciences university located in Pretoria, Gauteng.
 * It offers a range of health sciences programs including Medicine, Dentistry,
 * Pharmacy, Nursing, and other allied health professions.
 */
export class SMU extends BaseUniversity {
  readonly id = "smu";
  readonly name = "Sefako Makgatho Health Sciences University";
  readonly shortName = "SMU";
  readonly website = "https://www.smu.ac.za";
  readonly logo = "/logos/smu.png";
  readonly location = {
    city: "Pretoria",
    province: "Gauteng",
    coordinates: {
      latitude: -25.627,
      longitude: 28.0199,
    },
  };

  /**
   * SMU APS Calculation Method:
   * - NSC Rating 7 (80-100%): 7 points
   * - NSC Rating 6 (70-79%): 6 points
   * - NSC Rating 5 (60-69%): 5 points
   * - NSC Rating 4 (50-59%): 4 points
   * - NSC Rating 3 (40-49%): 3 points
   * - NSC Rating 2 (30-39%): 2 points
   * - NSC Rating 1 (0-29%): 1 point
   *
   * Life Orientation is included in the APS calculation for most programs
   * APS is calculated by adding the performance ratings of all NSC subjects
   */
  protected readonly _courses: Course[] = [
    // School of Medicine
    {
      id: "smu-mbchb",
      name: "Bachelor of Medicine and Bachelor of Surgery (MBChB)",
      faculty: "School of Medicine",
      apsMin: 38,
      duration: "6 years",
      subjectRequirements: {
        "Mathematics": 6,
        "Physical Sciences": 6,
        "Life Sciences": 6,
        "English": 6,
      },
      careerOpportunities: ["Clinician/medical doctor", "Innovation and research", "Academic or administrator in the medical field"],
    },

    // School of Health Care Sciences
    {
      id: "smu-dip-emc",
      name: "Diploma in Emergency Medical Care (DIP EMC)",
      faculty: "School of Health Care Sciences",
      apsMin: 18,
      duration: "2 years",
      subjectRequirements: {
        "English": 3,
        "Mathematics": 3,
        "Life Sciences": 3,
        "Physical Sciences": 3,
      },
      additionalRequirements: ["Medical Fitness Evaluation", "Physical Fitness Evaluation"],
      careerOpportunities: ["Mid-level emergency care worker in EMS", "Registration with the HPCSA as a Paramedic", "Professional and personal development to a bachelor's degree in Emergency Medical Care"],
    },
    {
      id: "smu-hcert-emc",
      name: "Higher Certificate in Emergency Medical Care (HCERT EMC)",
      faculty: "School of Health Care Sciences",
      apsMin: 15,
      duration: "1 year",
      subjectRequirements: {
        "English": 3,
        "Mathematics": 3,
        "Life Sciences": 3,
      },
      additionalRequirements: ["Medical Fitness Evaluation", "Physical Fitness Evaluation"],
      careerOpportunities: ["Entry-level emergency care worker in EMS", "Registration with the HPCSA as an Emergency Care Assistant (ECA)", "Professional and personal development to a Diploma in EMC and a bachelor's degree in EMC"],
    },
    {
      id: "smu-b-rad",
      name: "Bachelor of Diagnostic Radiography (B RAD)",
      faculty: "School of Health Care Sciences",
      apsMin: 16,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
        "English": 4,
      },
      careerOpportunities: ["Public hospitals", "Private hospitals", "Mining industry", "Radiography Education", "Self-employment", "Corporate (Marketing App Specialist)"],
    },
    {
      id: "smu-hcert-vacc",
      name: "Higher Certificate in Vaccinology [HCERT (VACC)]",
      faculty: "School of Health Care Sciences",
      apsMin: 0,
      duration: "1 year",
      additionalRequirements: ["Registered General Nurse and Midwife with the SA Nursing Council OR 3-year qualification in health sciences", "Motivation letter"],
      careerOpportunities: ["Running an up-to-date clinic offering vaccination services"],
    },
    {
      id: "smu-bsc-dietetics",
      name: "Bachelor of Science in Dietetics",
      faculty: "School of Health Care Sciences",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": 4,
        "physical sciences": 4,
        "life sciences": 4,
        "english": 4,
        "additional subject 1": 3,
        "additional subject 2": 3,
        "life orientation": 3,
      },
      additionalRequirements: ["Registered with the Health Professions Council of South Africa (HPCSA) upon completion", "One year of community service required after training"],
      careerOpportunities: ["Hospitals and health care centres", "Medical and pharmaceutical companies", "Food services and catering companies", "Private practice"],
    },

    // School of Dentistry
    {
      id: "smu-bdt",
      name: "Bachelor of Dental Therapy (BDT)",
      faculty: "School of Dentistry",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
        "English": 4,
      },
      careerOpportunities: ["Private practice", "Public dental services", "Academic dentistry"],
    },
    {
      id: "smu-bds",
      name: "Bachelor of Dental Surgery (BDS)",
      faculty: "School of Dentistry",
      apsMin: 37,
      duration: "5 years",
      subjectRequirements: {
        "Mathematics": 6,
        "Physical Sciences": 6,
        "Life Sciences": 6,
        "English": 5,
      },
      careerOpportunities: ["Private practice", "Public dental oral health services", "Academic dentistry", "Specialist in oral surgery, orthodontics, perio and oral medicine, oral pathology, prosthodontics, and community dentistry"],
    },
    {
      id: "smu-boh",
      name: "Bachelor of Oral Hygiene (BOH)",
      faculty: "School of Dentistry",
      apsMin: 31,
      duration: "3 years",
      subjectRequirements: {
        "Mathematical Literacy": 7,
        "Physical Sciences": 4,
        "Life Sciences": 4,
        "English": 4,
      },
      careerOpportunities: ["Private practice", "Public dental services", "Academic dentistry"],
    },

    // Health Sciences
    {
      id: "smu-bnam",
      name: "Bachelor of Nursing and Midwifery",
      faculty: "Health Sciences",
      apsMin: 26,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": 4,
        "physical sciences": 4,
        "life sciences": 4,
        "english": 4,
        "life orientation": 3,
      },
      careerOpportunities: ["General Nurse", "Midwife", "Community Health Nurse", "Psychiatric Nurse", "Nursing Educator"],
    },
    {
      id: "smu-b-occ-ther",
      name: "Bachelor of Occupational Therapy",
      faculty: "Health Sciences",
      apsMin: 25,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": 4,
        "physical sciences": 4,
        "life sciences": 4,
        "english": 4,
        "life orientation": 3,
      },
      additionalRequirements: ["Registration with HPCSA"],
      careerOpportunities: ["Occupational Therapist", "Vocational Rehabilitation Consultant", "Researcher", "Academic"],
    },
    {
      id: "smu-bsc-physio",
      name: "Bachelor of Science in Physiotherapy (BSc Physio)",
      faculty: "Health Sciences",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
        "English": 4,
      },
      careerOpportunities: ["Self-employment (private practice)", "Public and private hospitals", "Clinics and health care centers", "Day-care centers, crèches, and schools for children with special needs", "Nursing homes and centers for people with physical disabilities", "Sports centers and sports teams", "Tertiary training institutions", "Research units", "Occupational health units"],
    },
    {
      id: "smu-b-aud",
      name: "Bachelor of Audiology (B AUD)",
      faculty: "Health Sciences",
      apsMin: 25,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 4,
        "English": 4,
        "Life Sciences": 4,
      },
      careerOpportunities: ["Prevention, identification, assessment, and treatment of individuals with hearing and/or balance disorders", "Private practice", "Private hospitals", "Government hospitals", "Rural clinics", "Tertiary institutions", "Schools", "Industries", "Communities", "Home environments"],
    },

    // School of Pharmacy
    {
      id: "smu-bpharm",
      name: "Bachelor of Pharmacy",
      faculty: "School of Pharmacy",
      apsMin: 25,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": 5,
        "physical sciences": 5,
        "life sciences": 5,
        "english": 5,
      },
      additionalRequirements: ["Registration with South African Pharmacy Council", "Internship required"],
      careerOpportunities: ["Pharmacist", "Community service pharmacist"],
    },

    // Speech-Language Pathology and Audiology
    {
      id: "smu-b-aud01",
      name: "Bachelor of Audiology",
      faculty: "Speech-Language Pathology and Audiology",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "mathematics": 4,
        "physical sciences": 4,
        "life sciences": 4,
        "english": 4,
        "life orientation": 4,
      },
      additionalRequirements: ["Clinical observation at hospitals/clinics required"],
      careerOpportunities: ["Audiologist", "Hearing and balance disorder specialist"],
    },
    {
      id: "smu-b-slp",
      name: "Bachelor of Speech-Language Pathology",
      faculty: "Speech-Language Pathology and Audiology",
      apsMin: 25,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 4,
        "English": 4,
        "Life Sciences": 4,
      },
      additionalRequirements: ["Clinical observation at hospitals/clinics required"],
      careerOpportunities: ["Speech-Language Pathologist", "Feeding and swallowing disorder specialist"],
    },

    // School of Science and Technology
    {
      id: "smu-bsc",
      name: "Bachelor of Science (BSc)",
      faculty: "School of Science and Technology",
      apsMin: 25,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 5,
        "Physical Sciences": 4,
        "Life Sciences": 4,
        "English": 4,
      },
      careerOpportunities: ["Academic institutions", "Pharmaceutical, mining, manufacturing, government, and private laboratories", "Biotechnology", "Medical physics", "Environmental impact assessments", "Data analysis", "Computer programming and system analysis"],
    },
    {
      id: "smu-bsc-ecp",
      name: "Bachelor of Science - Extended Curriculum Programme (BSc-ECP)",
      faculty: "School of Science and Technology",
      apsMin: 25,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
        "English": 4,
      },
      careerOpportunities: ["Academic institutions", "Pharmaceutical, mining, manufacturing, government, and private laboratories", "Biotechnology", "Medical physics", "Environmental impact assessments", "Data analysis", "Computer programming and system analysis"],
    },

    // Medicine
    {
      id: "smu-mbchb-ecp",
      name: "Bachelor of Medicine and Bachelor of Surgery Extended Curriculum (MBChB-ECP)",
      faculty: "Medicine",
      apsMin: 32,
      duration: "7 years",
      subjectRequirements: {
        "Mathematics": 5,
        "Physical Sciences": 5,
        "Life Sciences": 5,
        "English": 5,
      },
    },

    // Dentistry
    {
      id: "smu-boh-math",
      name: "Bachelor of Oral Hygiene (BOH) - Mathematics Route",
      faculty: "Dentistry",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 4,
        "Physical Sciences": 4,
        "Life Sciences": 4,
        "English": 4,
      },
    },

    // Pharmacy
  ];

  /**
   * SMU has specific selection processes for many programs, especially in Medicine and Dentistry.
   * For example, the BPharm selection process includes:
   *
   * 1. 90% of students from:
   *    - Pre-selected students who maintained their performance
   *    - Students selected from the remaining pool of applicants
   * 2. 4% who have completed their first degree at SMU
   * 3. 4% who have excelled in BSc or equivalent first-year courses at SMU
   * 4. 2% who have completed a first degree at another University
   *
   * Many programs also have alternative admission routes for mature students, graduates, and transfer students.
   */

  /**
   * Get courses by faculty
   * @param faculty Faculty name
   * @returns Array of courses in the specified faculty
   */
  getCoursesByFaculty(faculty: string): Course[] {
    return this._courses.filter((course) => course.faculty === faculty);
  }

  /**
   * Get all faculties
   * @returns Array of faculty names
   */
  get faculties(): string[] {
    return Array.from(
      new Set(this._courses.map((course) => course.faculty).filter((f): f is string => Boolean(f))),
    );
  }

  /**
   * SMU-specific APS calculation
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
