import { SubjectValidator } from "../../lib/utils/subject-validator"

describe("SubjectValidator", () => {
  const makeSubject = (id: string, name: string, percentage: number) => ({ id, name, percentage })

  it("disables adding a second Home Language with a clear reason", () => {
    const subjects = [
      makeSubject("hl", "English Home Language", 50),
      makeSubject("fal", "Afrikaans First Additional Language", 55),
      makeSubject("math", "Mathematics", 65),
      makeSubject("lo", "Life Orientation", 70),
      makeSubject("bus", "Business Studies", 60),
      makeSubject("phy", "Physical Sciences", 45),
      makeSubject("geo", "Geography", 52),
    ]

    const validator = new SubjectValidator(subjects)

    expect(validator.isSubjectDisabled("Afrikaans Home Language")).toBe(true)
    expect(validator.getDisabledReason("Afrikaans Home Language")).toContain(
      "You can only choose ONE home language",
    )
    expect(validator.getDisabledReason("Afrikaans Home Language")).toContain("English Home Language")
  })

  it("disables Mathematical Literacy when Mathematics is selected", () => {
    const subjects = [
      makeSubject("hl", "English Home Language", 50),
      makeSubject("fal", "Afrikaans First Additional Language", 55),
      makeSubject("math", "Mathematics", 65),
      makeSubject("lo", "Life Orientation", 70),
      makeSubject("bus", "Business Studies", 60),
      makeSubject("phy", "Physical Sciences", 45),
      makeSubject("geo", "Geography", 52),
    ]

    const validator = new SubjectValidator(subjects)

    expect(validator.isSubjectDisabled("Mathematical Literacy")).toBe(true)
    expect(validator.getDisabledReason("Mathematical Literacy")).toBe(
      "Cannot add Mathematical Literacy because Mathematics is already selected.",
    )
  })

  it("detects conflict when HL and FAL are the same language base", () => {
    const subjects = [
      makeSubject("hl", "English Home Language", 55),
      makeSubject("fal", "English First Additional Language", 60),
      makeSubject("math", "Mathematics", 65),
      makeSubject("lo", "Life Orientation", 70),
      makeSubject("bus", "Business Studies", 60),
      makeSubject("phy", "Physical Sciences", 45),
      makeSubject("geo", "Geography", 52),
    ]

    const validator = new SubjectValidator(subjects)
    expect(validator.hasConflicts()).toBe(true)
  })

  it("disables CAT when IT is already selected", () => {
    const subjects = [
      makeSubject("hl", "English Home Language", 55),
      makeSubject("fal", "Afrikaans First Additional Language", 60),
      makeSubject("it", "Information Technology", 70),
      makeSubject("lo", "Life Orientation", 70),
      makeSubject("bus", "Business Studies", 60),
      makeSubject("phy", "Physical Sciences", 45),
      makeSubject("geo", "Geography", 52),
    ]

    const validator = new SubjectValidator(subjects)
    expect(validator.isSubjectDisabled("Computer Applications Technology")).toBe(true)
    expect(validator.getDisabledReason("Computer Applications Technology")).toBe(
      "Cannot add Computer Applications Technology because Information Technology is already selected.",
    )
  })
})