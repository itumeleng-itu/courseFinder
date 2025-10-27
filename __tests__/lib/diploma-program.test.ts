import {
  DiplomaProgram,
  createDiplomaProgram,
  validateDiplomaProgram,
  InstitutionAccreditation,
  ProgramFees
} from "../../lib/models/diploma-program";

describe("Diploma Program Model", () => {
  describe("createDiplomaProgram", () => {
    test("should create a diploma program with default values", () => {
      const program = createDiplomaProgram("Business Management", "University of Cape Town");
      
      expect(program).toHaveProperty("id", "university-of-cape-town-business-management");
      expect(program).toHaveProperty("name", "Business Management");
      expect(program).toHaveProperty("institutionName", "University of Cape Town");
      expect(program).toHaveProperty("durationYears", 3);
      expect(program).toHaveProperty("creditsTotal", 360);
      expect(program).toHaveProperty("studyMode", "Full-time");
      expect(program).toHaveProperty("nqfLevel", 6);
      expect(program).toHaveProperty("entryRequirements");
      expect(program.entryRequirements).toHaveProperty("minimumSubjects", 6);
      expect(program.entryRequirements).toHaveProperty("languageOfLearningPercentage", 30);
      expect(program.entryRequirements).toHaveProperty("numberOfSubjectsWithMinimumPercentage", 4);
      expect(program.entryRequirements).toHaveProperty("minimumPercentageForSubjects", 40);
      expect(program).toHaveProperty("lastUpdated");
    });
  });

  describe("validateDiplomaProgram", () => {
    test("should validate a valid diploma program", () => {
      const program = createDiplomaProgram("Business Management", "University of Cape Town");
      expect(validateDiplomaProgram(program)).toBe(true);
    });

    test("should fail validation if required fields are missing", () => {
      const program = createDiplomaProgram("Business Management", "University of Cape Town");
      
      // Test missing name
      const invalidProgram1 = { ...program, name: "" };
      expect(validateDiplomaProgram(invalidProgram1)).toBe(false);
      
      // Test missing institution
      const invalidProgram2 = { ...program, institutionName: "" };
      expect(validateDiplomaProgram(invalidProgram2)).toBe(false);
    });

    test("should fail validation if duration is invalid", () => {
      const program = createDiplomaProgram("Business Management", "University of Cape Town");
      const invalidProgram = { ...program, durationYears: 0 };
      expect(validateDiplomaProgram(invalidProgram)).toBe(false);
    });

    test("should fail validation if credits are invalid", () => {
      const program = createDiplomaProgram("Business Management", "University of Cape Town");
      const invalidProgram = { ...program, creditsTotal: 0 };
      expect(validateDiplomaProgram(invalidProgram)).toBe(false);
    });

    test("should fail validation if NQF level is not 6", () => {
      const program = createDiplomaProgram("Business Management", "University of Cape Town");
      const invalidProgram = { ...program, nqfLevel: 5 }; // Should be 6 for diplomas
      expect(validateDiplomaProgram(invalidProgram)).toBe(false);
    });
  });

  describe("DiplomaProgram Extensions", () => {
    test("should support full program details", () => {
      const program = createDiplomaProgram("Information Technology", "Cape Peninsula University of Technology");
      
      // Extend with full details
      const extendedProgram: DiplomaProgram = {
        ...program,
        code: "DIT2024",
        description: "A comprehensive diploma in Information Technology covering programming, systems analysis, and database design.",
        campus: "Cape Town",
        faculty: "Faculty of Informatics and Design",
        department: "Information Technology",
        durationMonths: 36,
        language: "English",
        applicationDeadline: "2024-10-31T00:00:00Z",
        startDate: "2025-01-15T00:00:00Z",
        graduationDate: "2027-12-15T00:00:00Z",
        accreditation: [
          {
            body: "CHE",
            number: "H/PR123/E002",
            expiryDate: "2030-12-31T00:00:00Z",
            status: "Full"
          },
          {
            body: "SAQA",
            number: "97142",
            status: "Full"
          }
        ],
        apsMinimum: 26,
        additionalRequirements: [
          "Mathematics (not Mathematical Literacy)",
          "English proficiency test for non-native speakers"
        ],
        fees: {
          domestic: 45000,
          international: 65000,
          applicationFee: 350,
          registrationFee: 1500,
          additionalCosts: {
            "Computer Equipment": 15000,
            "Software Licenses": 2500,
            "Study Materials": 3000
          }
        },
        careerOpportunities: [
          "Software Developer",
          "Systems Analyst",
          "Database Administrator",
          "IT Support Specialist"
        ],
        furtherStudyOptions: [
          "Advanced Diploma in Information Technology",
          "BTech in Information Technology",
          "Postgraduate Diploma in Computer Science"
        ],
        contactPerson: "Dr. Jane Smith",
        contactEmail: "admissions@cput.ac.za",
        contactPhone: "+27 21 123 4567",
        websiteUrl: "https://www.cput.ac.za/academic/faculties/informaticsdesign/departments/it",
        featured: true
      };
      
      // Validate the extended program
      expect(validateDiplomaProgram(extendedProgram)).toBe(true);
      expect(extendedProgram.code).toBe("DIT2024");
      expect(extendedProgram.fees?.domestic).toBe(45000);
      expect(extendedProgram.careerOpportunities?.length).toBe(4);
      expect(extendedProgram.accreditation.length).toBe(2);
    });
  });
});