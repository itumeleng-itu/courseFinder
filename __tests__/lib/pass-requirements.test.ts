import {
  Subject,
  validateBachelorPass,
  validateDiplomaPass,
  validateHigherCertificatePass,
  determineQualificationLevel,
  calculateSubjectLevels,
} from "../../lib/validation/pass-requirements";

describe("NSC Pass Requirements Validation", () => {
  // Sample subject data for testing
  const bachelorPassSubjects: Subject[] = [
    { name: "English Home Language", percentage: 65 },
    { name: "Mathematics", percentage: 70 },
    { name: "Physical Sciences", percentage: 65 },
    { name: "Life Sciences", percentage: 60 },
    { name: "Geography", percentage: 55 },
    { name: "Life Orientation", percentage: 80 },
    { name: "History", percentage: 60 },
  ];

  const diplomaPassSubjects: Subject[] = [
    { name: "English Home Language", percentage: 55 },
    { name: "Mathematics", percentage: 45 },
    { name: "Physical Sciences", percentage: 45 },
    { name: "Life Sciences", percentage: 40 },
    { name: "Geography", percentage: 35 },
    { name: "Life Orientation", percentage: 70 },
    { name: "History", percentage: 40 },
  ];

  const higherCertPassSubjects: Subject[] = [
    { name: "English Home Language", percentage: 40 },
    { name: "Mathematics", percentage: 35 },
    { name: "Physical Sciences", percentage: 35 },
    { name: "Life Sciences", percentage: 35 },
    { name: "Geography", percentage: 30 },
    { name: "Life Orientation", percentage: 60 },
    { name: "History", percentage: 30 },
  ];

  const failSubjects: Subject[] = [
    { name: "English Home Language", percentage: 25 },
    { name: "Mathematics", percentage: 30 },
    { name: "Physical Sciences", percentage: 30 },
    { name: "Life Sciences", percentage: 30 },
    { name: "Geography", percentage: 25 },
    { name: "Life Orientation", percentage: 50 },
    { name: "History", percentage: 25 },
  ];

  describe("Bachelor Pass Validation", () => {
    test("should validate a valid Bachelor pass", () => {
      expect(validateBachelorPass(bachelorPassSubjects, "English Home Language")).toBe(true);
    });

    test("should fail if language of learning is below 30%", () => {
      const subjects = [...bachelorPassSubjects];
      subjects[0].percentage = 25; // Set English below 30%
      expect(validateBachelorPass(subjects, "English Home Language")).toBe(false);
    });

    test("should fail if fewer than 4 subjects at 50% or higher", () => {
      const subjects = [...bachelorPassSubjects];
      subjects[2].percentage = 45; // Physical Sciences
      subjects[3].percentage = 45; // Life Sciences
      expect(validateBachelorPass(subjects, "English Home Language")).toBe(false);
    });

    test("should fail if fewer than 7 subjects passed", () => {
      const subjects = bachelorPassSubjects.slice(0, 6); // Only 6 subjects
      expect(validateBachelorPass(subjects, "English Home Language")).toBe(false);
    });
  });

  describe("Diploma Pass Validation", () => {
    test("should validate a valid Diploma pass", () => {
      expect(validateDiplomaPass(diplomaPassSubjects, "English Home Language")).toBe(true);
    });

    test("should fail if language of learning is below 30%", () => {
      const subjects = [...diplomaPassSubjects];
      subjects[0].percentage = 25; // Set English below 30%
      expect(validateDiplomaPass(subjects, "English Home Language")).toBe(false);
    });

    test("should fail if fewer than 4 subjects at 40% or higher", () => {
      const subjects = [...diplomaPassSubjects];
      subjects[2].percentage = 35; // Physical Sciences
      subjects[3].percentage = 35; // Life Sciences
      subjects[6].percentage = 35; // History
      expect(validateDiplomaPass(subjects, "English Home Language")).toBe(false);
    });

    test("should fail if fewer than 6 subjects passed", () => {
      const subjects = diplomaPassSubjects.slice(0, 5); // Only 5 subjects
      expect(validateDiplomaPass(subjects, "English Home Language")).toBe(false);
    });

    test("should validate with custom institution requirements", () => {
      const customRequirements = {
        minimumPercentageForSubjects: 45, // Higher requirement
        numberOfSubjectsWithMinimumPercentage: 3, // Fewer subjects needed
      };
      
      // This should pass with custom requirements but fail with default
      const subjects = [...diplomaPassSubjects];
      subjects[3].percentage = 35; // Life Sciences below 40%
      subjects[6].percentage = 35; // History below 40%
      
      expect(validateDiplomaPass(subjects, "English Home Language")).toBe(false); // Fails default
      expect(validateDiplomaPass(subjects, "English Home Language", customRequirements)).toBe(true); // Passes custom
    });
  });

  describe("Higher Certificate Pass Validation", () => {
    test("should validate a valid Higher Certificate pass", () => {
      expect(validateHigherCertificatePass(higherCertPassSubjects, "English Home Language")).toBe(true);
    });

    test("should fail if language of learning is below 30%", () => {
      const subjects = [...higherCertPassSubjects];
      subjects[0].percentage = 25; // Set English below 30%
      expect(validateHigherCertificatePass(subjects, "English Home Language")).toBe(false);
    });

    test("should fail if fewer than 6 subjects passed", () => {
      const subjects = higherCertPassSubjects.slice(0, 5); // Only 5 subjects
      expect(validateHigherCertificatePass(subjects, "English Home Language")).toBe(false);
    });

    test("should validate with required subjects", () => {
      const customRequirements = {
        requiredSubjects: ["Mathematics", "Physical Sciences"],
        minimumGrades: { "Mathematics": 40 }
      };
      
      // Should fail because Math is only 35%
      expect(validateHigherCertificatePass(
        higherCertPassSubjects, 
        "English Home Language", 
        customRequirements
      )).toBe(false);
      
      // Fix Math to 40% and it should pass
      const updatedSubjects = [...higherCertPassSubjects];
      updatedSubjects[1].percentage = 40; // Mathematics now meets requirement
      
      expect(validateHigherCertificatePass(
        updatedSubjects, 
        "English Home Language", 
        customRequirements
      )).toBe(true);
    });
  });

  describe("Qualification Level Determination", () => {
    test("should determine Bachelor level for qualifying subjects", () => {
      expect(determineQualificationLevel(bachelorPassSubjects, "English Home Language")).toBe("Bachelor");
    });

    test("should determine Diploma level for qualifying subjects", () => {
      expect(determineQualificationLevel(diplomaPassSubjects, "English Home Language")).toBe("Diploma");
    });

    test("should determine Higher Certificate level for qualifying subjects", () => {
      expect(determineQualificationLevel(higherCertPassSubjects, "English Home Language")).toBe("Higher Certificate");
    });

    test("should determine Fail level for non-qualifying subjects", () => {
      expect(determineQualificationLevel(failSubjects, "English Home Language")).toBe("Fail");
    });
  });

  describe("Subject Level Calculation", () => {
    test("should calculate correct NSC levels for subjects", () => {
      const subjectsWithLevels = calculateSubjectLevels(bachelorPassSubjects);
      
      // Check a few examples
      expect(subjectsWithLevels[0].level).toBe(6); // 65% = Level 6
      expect(subjectsWithLevels[1].level).toBe(6); // 70% = Level 6
      expect(subjectsWithLevels[5].level).toBe(7); // 80% = Level 7
    });
  });
});