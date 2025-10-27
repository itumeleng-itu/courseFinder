/**
 * Diploma Program Model
 * Represents a diploma program with institution-specific metadata and requirements
 */

import { DiplomaRequirements } from "../validation/pass-requirements";

export interface InstitutionAccreditation {
  body: string; // Accreditation body name (e.g., "CHE", "SAQA")
  number: string; // Accreditation reference number
  expiryDate?: string; // ISO date string for accreditation expiry
  status: "Full" | "Provisional" | "Conditional" | "None";
}

export interface ProgramFees {
  domestic: number; // Annual fees for domestic students in ZAR
  international?: number; // Annual fees for international students in ZAR
  applicationFee?: number; // One-time application fee
  registrationFee?: number; // Registration fee per year/semester
  additionalCosts?: Record<string, number>; // Other costs like materials, lab fees, etc.
}

export interface DiplomaProgram {
  // Basic program information
  id: string;
  name: string;
  code?: string; // Program code used by the institution
  description?: string;
  
  // Institution details
  institutionName: string;
  institutionLogo?: string;
  campus?: string;
  faculty?: string;
  department?: string;
  
  // Program duration and structure
  durationYears: number;
  durationMonths?: number; // For programs not exactly in years
  creditsTotal: number;
  studyMode: "Full-time" | "Part-time" | "Distance" | "Hybrid";
  language?: string; // Language of instruction
  
  // Dates and deadlines
  applicationDeadline?: string; // ISO date string
  startDate?: string; // ISO date string
  graduationDate?: string; // ISO date string for next expected graduation
  
  // Accreditation information
  accreditation: InstitutionAccreditation[];
  nqfLevel: number; // National Qualifications Framework level
  
  // Entry requirements
  entryRequirements: DiplomaRequirements;
  apsMinimum?: number; // Minimum APS score if applicable
  additionalRequirements?: string[]; // Any additional entry requirements
  
  // Financial information
  fees?: ProgramFees;
  
  // Career and progression
  careerOpportunities?: string[];
  furtherStudyOptions?: string[];
  
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
 * Creates a new diploma program with default values
 * @param name Program name
 * @param institution Institution name
 * @returns A new DiplomaProgram object with default values
 */
export function createDiplomaProgram(name: string, institution: string): DiplomaProgram {
  return {
    id: `${institution.toLowerCase().replace(/\s+/g, "-")}-${name.toLowerCase().replace(/\s+/g, "-")}`,
    name,
    institutionName: institution,
    durationYears: 3, // Most diplomas are 3 years
    creditsTotal: 360, // Standard for a 3-year diploma
    studyMode: "Full-time",
    accreditation: [
      {
        body: "CHE",
        number: "Pending",
        status: "Full"
      }
    ],
    nqfLevel: 6, // Standard for diplomas
    entryRequirements: {
      minimumSubjects: 6,
      languageOfLearningPercentage: 30,
      numberOfSubjectsWithMinimumPercentage: 4,
      minimumPercentageForSubjects: 40,
    },
    lastUpdated: new Date().toISOString()
  };
}

/**
 * Validates if a diploma program has all required fields
 * @param program The diploma program to validate
 * @returns Boolean indicating if the program is valid
 */
export function validateDiplomaProgram(program: DiplomaProgram): boolean {
  // Check required fields
  if (!program.id || !program.name || !program.institutionName) {
    return false;
  }
  
  // Check duration
  if (program.durationYears <= 0) {
    return false;
  }
  
  // Check credits
  if (program.creditsTotal <= 0) {
    return false;
  }
  
  // Check NQF level (diplomas are typically level 6)
  if (program.nqfLevel !== 6) {
    return false;
  }
  
  // Check entry requirements
  if (!program.entryRequirements) {
    return false;
  }
  
  return true;
}