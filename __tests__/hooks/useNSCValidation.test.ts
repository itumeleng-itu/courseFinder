/** @jest-environment jsdom */
import { renderHook } from "@testing-library/react"
import { useNSCValidation } from "../../hooks/useNSCValidation"

type Subject = { id: string; name: string; percentage: number }

const makeSubject = (id: string, name: string, percentage: number): Subject => ({ id, name, percentage })

describe("useNSCValidation", () => {
  it("returns canCalculate=true and no errors for a valid NSC subject set", () => {
    const subjects: Subject[] = [
      makeSubject("hl", "English Home Language", 50),
      makeSubject("fal", "Afrikaans First Additional Language", 55),
      makeSubject("math", "Mathematics", 65),
      makeSubject("lo", "Life Orientation", 70),
      makeSubject("bus", "Business Studies", 60),
      makeSubject("phy", "Physical Sciences", 45),
      makeSubject("geo", "Geography", 52),
    ]

    const { result } = renderHook((props: { subjects: Subject[] }) => useNSCValidation(props.subjects), {
      initialProps: { subjects },
    })

    expect(result.current.canCalculate).toBe(true)
    expect(result.current.errors).toHaveLength(0)

    // Progress sanity checks
    const byKey = (key: string) => result.current.progress.find((p) => p.key === key)
    expect(byKey("hl")?.status).toBe("done")
    expect(byKey("fal")?.status).toBe("done")
    expect(byKey("math")?.status).toBe("done")
    expect(byKey("lo")?.status).toBe("done")
    expect(byKey("count")?.status).toBe("done")
    expect(byKey("electives")?.status).toBe("done")
    expect(byKey("nsc")?.status).toBe("done")
  })

  it("flags HL/FAL same-language conflict and prevents calculation", () => {
    const subjects: Subject[] = [
      makeSubject("hl", "English Home Language", 55),
      makeSubject("fal", "English First Additional Language", 50),
      makeSubject("math", "Mathematics", 60),
      makeSubject("lo", "Life Orientation", 70),
      makeSubject("bus", "Business Studies", 60),
      makeSubject("phy", "Physical Sciences", 45),
      makeSubject("geo", "Geography", 52),
    ]

    const { result } = renderHook((props: { subjects: Subject[] }) => useNSCValidation(props.subjects), {
      initialProps: { subjects },
    })

    expect(result.current.hasSelectionConflicts).toBe(true)
    expect(result.current.errors.some((e) => e.includes("must be different languages"))).toBe(true)
    expect(result.current.canCalculate).toBe(false)
  })

  it("flags selecting both Mathematics and Mathematical Literacy", () => {
    const subjects: Subject[] = [
      makeSubject("hl", "English Home Language", 50),
      makeSubject("fal", "Afrikaans First Additional Language", 55),
      makeSubject("math", "Mathematics", 65),
      makeSubject("ml", "Mathematical Literacy", 61),
      makeSubject("lo", "Life Orientation", 72),
      makeSubject("bus", "Business Studies", 60),
      makeSubject("phy", "Physical Sciences", 45),
    ]

    const { result } = renderHook((props: { subjects: Subject[] }) => useNSCValidation(props.subjects), {
      initialProps: { subjects },
    })

    expect(result.current.hasSelectionConflicts).toBe(true)
    expect(result.current.errors.some((e) => e.includes("not both"))).toBe(true)
    expect(result.current.canCalculate).toBe(false)
  })

  it("requires exactly 7 subjects and HL >= 40% to meet NSC minimums", () => {
    const subjects: Subject[] = [
      makeSubject("hl", "English Home Language", 39),
      makeSubject("fal", "Afrikaans First Additional Language", 55),
      makeSubject("math", "Mathematics", 65),
      makeSubject("lo", "Life Orientation", 70),
      makeSubject("bus", "Business Studies", 60),
      makeSubject("phy", "Physical Sciences", 45),
    ] // only 6 subjects and HL below 40

    const { result } = renderHook((props: { subjects: Subject[] }) => useNSCValidation(props.subjects), {
      initialProps: { subjects },
    })

    expect(result.current.meetsNSCMinimums).toBe(false)
    expect(result.current.errors.some((e) => e.includes("NSC minimums not met"))).toBe(true)
    expect(result.current.errors.some((e) => e.includes("exactly 7 subjects"))).toBe(true)
    expect(result.current.canCalculate).toBe(false)
  })
})
