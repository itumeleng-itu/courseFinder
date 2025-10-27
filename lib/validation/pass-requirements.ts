/**
 * Validation module for NSC pass requirements
 * Based on official Department of Basic Education criteria
 */

import { percentageToLevel } from "../aps-calculator";

export interface Subject {
  name: string;
  percentage: number;
  level?: number;
}

export interface DiplomaRequirements {
  // Institution-specific requirements
  institutionName?: string;
  programDuration?: string; // e.g., "3 years"
  graduationDate?: string;
  accreditationStatus?: "Full" | "Provisional" | "None";
  
  // Standard NSC requirements for Diploma pass
  minimumSubjects: number;
  languageOfLearningPercentage: number;
  numberOfSubjectsWithMinimumPercentage: number;
  minimumPercentageForSubjects: number;
}

export interface HigherCertificateRequirements {
  // Subject-specific requirements
  requiredSubjects?: string[];
  minimumGrades?: Record<string, number>; // e.g., { "Mathematics": 30, "English": 40 }
  additionalCertifications?: string[];
  
  // Standard NSC requirements for Higher Certificate pass
  minimumSubjects: number;
  languageOfLearningPercentage: number;
}

// Default requirements based on DBE standards
export const DEFAULT_BACHELOR_REQUIREMENTS = {
  minimumSubjects: 7,
  languageOfLearningPercentage: 30,
  numberOfSubjectsWithMinimumPercentage: 4,
  minimumPercentageForSubjects: 50,
};

export const DEFAULT_DIPLOMA_REQUIREMENTS: DiplomaRequirements = {
  minimumSubjects: 6,
  languageOfLearningPercentage: 30,
  numberOfSubjectsWithMinimumPercentage: 4,
  minimumPercentageForSubjects: 40,
};

export const DEFAULT_HC_REQUIREMENTS: HigherCertificateRequirements = {
  minimumSubjects: 6,
  languageOfLearningPercentage: 30,
};

/**
 * Validates if a student's subjects meet Bachelor pass requirements
 * @param subjects List of subjects with percentages
 * @param languageOfLearning The subject that is the language of learning
 * @returns Boolean indicating if requirements are met
 */
export function validateBachelorPass(
  subjects: Subject[],
  languageOfLearning: string
): boolean {
  if (subjects.length < DEFAULT_BACHELOR_REQUIREMENTS.minimumSubjects) {
    return false;
  }

  // Check language of learning requirement
  const lolSubject = subjects.find(
    (s) => s.name.toLowerCase() === languageOfLearning.toLowerCase()
  );
  if (
    !lolSubject ||
    lolSubject.percentage < DEFAULT_BACHELOR_REQUIREMENTS.languageOfLearningPercentage
  ) {
    return false;
  }

  // Count subjects meeting minimum percentage requirement
  const subjectsWithMinPercentage = subjects.filter(
    (s) => s.percentage >= DEFAULT_BACHELOR_REQUIREMENTS.minimumPercentageForSubjects
  );

  return (
    subjectsWithMinPercentage.length >=
    DEFAULT_BACHELOR_REQUIREMENTS.numberOfSubjectsWithMinimumPercentage
  );
}

/**
 * Validates if a student's subjects meet Diploma pass requirements
 * @param subjects List of subjects with percentages
 * @param languageOfLearning The subject that is the language of learning
 * @param customRequirements Optional custom requirements for specific institutions
 * @returns Boolean indicating if requirements are met
 */
export function validateDiplomaPass(
  subjects: Subject[],
  languageOfLearning: string,
  customRequirements?: Partial<DiplomaRequirements>
): boolean {
  const requirements = {
    ...DEFAULT_DIPLOMA_REQUIREMENTS,
    ...customRequirements,
  };

  if (subjects.length < requirements.minimumSubjects) {
    return false;
  }

  // Check language of learning requirement
  const lolSubject = subjects.find(
    (s) => s.name.toLowerCase() === languageOfLearning.toLowerCase()
  );
  if (
    !lolSubject ||
    lolSubject.percentage < requirements.languageOfLearningPercentage
  ) {
    return false;
  }

  // Count subjects meeting minimum percentage requirement
  const subjectsWithMinPercentage = subjects.filter(
    (s) => s.percentage >= requirements.minimumPercentageForSubjects
  );

  return (
    subjectsWithMinPercentage.length >=
    requirements.numberOfSubjectsWithMinimumPercentage
  );
}

/**
 * Validates if a student's subjects meet Higher Certificate pass requirements
 * @param subjects List of subjects with percentages
 * @param languageOfLearning The subject that is the language of learning
 * @param customRequirements Optional custom requirements for specific programs
 * @returns Boolean indicating if requirements are met
 */
export function validateHigherCertificatePass(
  subjects: Subject[],
  languageOfLearning: string,
  customRequirements?: Partial<HigherCertificateRequirements>
): boolean {
  const requirements = {
    ...DEFAULT_HC_REQUIREMENTS,
    ...customRequirements,
  };

  if (subjects.length < requirements.minimumSubjects) {
    return false;
  }

  // Check language of learning requirement
  const lolSubject = subjects.find(
    (s) => s.name.toLowerCase() === languageOfLearning.toLowerCase()
  );
  if (
    !lolSubject ||
    lolSubject.percentage < requirements.languageOfLearningPercentage
  ) {
    return false;
  }

  // Check required subjects if specified
  if (requirements.requiredSubjects && requirements.requiredSubjects.length > 0) {
    for (const requiredSubject of requirements.requiredSubjects) {
      const subject = subjects.find(
        (s) => s.name.toLowerCase() === requiredSubject.toLowerCase()
      );
      if (!subject) {
        return false;
      }

      // Check minimum grade for this subject if specified
      if (
        requirements.minimumGrades &&
        requirements.minimumGrades[requiredSubject] &&
        subject.percentage < requirements.minimumGrades[requiredSubject]
      ) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Determines the highest qualification level a student qualifies for
 * @param subjects List of subjects with percentages
 * @param languageOfLearning The subject that is the language of learning
 * @returns "Bachelor" | "Diploma" | "Higher Certificate" | "Fail"
 */
export function determineQualificationLevel(
  subjects: Subject[],
  languageOfLearning: string
): "Bachelor" | "Diploma" | "Higher Certificate" | "Fail" {
  if (validateBachelorPass(subjects, languageOfLearning)) {
    return "Bachelor";
  }

  if (validateDiplomaPass(subjects, languageOfLearning)) {
    return "Diploma";
  }

  if (validateHigherCertificatePass(subjects, languageOfLearning)) {
    return "Higher Certificate";
  }

  return "Fail";
}

/**
 * Calculates the NSC levels for all subjects
 * @param subjects List of subjects with percentages
 * @returns The same subjects with NSC levels added
 */
export function calculateSubjectLevels(subjects: Subject[]): Subject[] {
  return subjects.map((subject) => ({
    ...subject,
    level: percentageToLevel(subject.percentage),
  }));
}