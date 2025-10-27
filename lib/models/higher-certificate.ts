/**
 * Higher Certificate Program Model
 * Represents a higher certificate program with subject requirements and certification details
 */

import { HigherCertificateRequirements } from "../validation/pass-requirements";

export interface CertificationBody {
  name: string; // Name of the certification body
  website?: string;
  contactEmail?: string;
  verificationUrl?: string; // URL to verify certification
}

export interface SubjectRequirement {
  subject: string;
  minimumPercentage: number;
  recommended?: boolean; // If true, preferred but not mandatory
  alternatives?: string[]; // Alternative subjects that can fulfill this requirement
}

export interface AdditionalCertification {
  name: string;
  issuer: string;
  description?: string;
  validityPeriod?: number; // In months
  cost?: number; // In ZAR
  obtainmentMethod: "Prior" | "During" | "After"; // When the certification should be obtained
  mandatory: boolean;
  verificationProcess?: string;
}

export interface HigherCertificateProgram {
  // Basic program information
  id: string;
  name: string;
  code?: string;
  description?: string;
  
  // Institution details
  institutionName: string;
  institutionLogo?: string;
  campus?: string;
  department?: string;
  
  // Program duration and structure
  durationMonths: number;
  creditsTotal: number;
  studyMode: "Full-time" | "Part-time" | "Distance" | "Hybrid" | "Online";
  
  // Dates and deadlines
  applicationDeadline?: string; // ISO date string
  startDate?: string; // ISO date string
  completionDate?: string; // ISO date string for expected completion
  
  // Accreditation and certification
  nqfLevel: number; // National Qualifications Framework level (typically 5 for HC)
  certificationBodies: CertificationBody[];
  industryRecognition?: string[];
  
  // Entry requirements
  entryRequirements: HigherCertificateRequirements;
  subjectRequirements: SubjectRequirement[];
  additionalCertifications: AdditionalCertification[];
  
  // Financial information
  tuitionFee?: number;
  materialsFee?: number;
  certificationFee?: number;
  totalCost?: number;
  
  // Career and progression
  careerPathways?: string[];
  articulationOptions?: string[]; // Pathways to further education
  
  // Contact information
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  websiteUrl?: string;
  
  // Metadata
  lastUpdated: string; // ISO date string
  featured?: boolean;
}

/**
 * Creates a new higher certificate program with default values
 * @param name Program name
 * @param institution Institution name
 * @returns A new HigherCertificateProgram object with default values
 */
export function createHigherCertificateProgram(name: string, institution: string): HigherCertificateProgram {
  return {
    id: `${institution.toLowerCase().replace(/\s+/g, "-")}-${name.toLowerCase().replace(/\s+/g, "-")}`,
    name,
    institutionName: institution,
    durationMonths: 12, // Most higher certificates are 1 year
    creditsTotal: 120, // Standard for a 1-year higher certificate
    studyMode: "Full-time",
    nqfLevel: 5, // Standard for higher certificates
    certificationBodies: [
      {
        name: "SAQA",
        website: "https://www.saqa.org.za"
      }
    ],
    entryRequirements: {
      minimumSubjects: 6,
      languageOfLearningPercentage: 30,
    },
    subjectRequirements: [],
    additionalCertifications: [],
    lastUpdated: new Date().toISOString()
  };
}

/**
 * Adds a subject requirement to a higher certificate program
 * @param program The higher certificate program
 * @param subject Subject name
 * @param minimumPercentage Minimum percentage required
 * @param recommended Whether the subject is recommended but not mandatory
 * @param alternatives Alternative subjects that can fulfill this requirement
 * @returns The updated program
 */
export function addSubjectRequirement(
  program: HigherCertificateProgram,
  subject: string,
  minimumPercentage: number,
  recommended: boolean = false,
  alternatives: string[] = []
): HigherCertificateProgram {
  const updatedProgram = { ...program };
  
  updatedProgram.subjectRequirements = [
    ...updatedProgram.subjectRequirements,
    {
      subject,
      minimumPercentage,
      recommended,
      alternatives
    }
  ];
  
  return updatedProgram;
}

/**
 * Adds an additional certification requirement to a higher certificate program
 * @param program The higher certificate program
 * @param certification The certification details
 * @returns The updated program
 */
export function addCertificationRequirement(
  program: HigherCertificateProgram,
  certification: AdditionalCertification
): HigherCertificateProgram {
  const updatedProgram = { ...program };
  
  updatedProgram.additionalCertifications = [
    ...updatedProgram.additionalCertifications,
    certification
  ];
  
  return updatedProgram;
}

/**
 * Validates if a higher certificate program has all required fields
 * @param program The higher certificate program to validate
 * @returns Boolean indicating if the program is valid
 */
export function validateHigherCertificateProgram(program: HigherCertificateProgram): boolean {
  // Check required fields
  if (!program.id || !program.name || !program.institutionName) {
    return false;
  }
  
  // Check duration
  if (program.durationMonths <= 0) {
    return false;
  }
  
  // Check credits
  if (program.creditsTotal <= 0) {
    return false;
  }
  
  // Check NQF level (higher certificates are typically level 5)
  if (program.nqfLevel !== 5) {
    return false;
  }
  
  // Check entry requirements
  if (!program.entryRequirements) {
    return false;
  }
  
  return true;
}