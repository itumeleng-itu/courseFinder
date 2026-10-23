import {
  answerFromData,
  describeRequirements,
  institutionFromQuery,
  searchProgrammes,
} from "@/lib/chatbot-knowledge"
import { careerPathsFor } from "@/lib/career-paths"
import { PROGRAMMES } from "@/lib/qualify/data"

/**
 * The chatbot used to answer course questions by sending the learner
 * to /find-course. It had the data all along; the route only ever
 * handed the model a per-university summary, because the full course
 * list did not fit a free model's context window.
 *
 * These guard the behaviour that replaced it: answer from the records,
 * and only defer when the question genuinely is not about them.
 */

const findProgramme = (name: string) =>
  (PROGRAMMES as unknown as Array<Record<string, unknown>>).find((p) => p.name === name) as never

describe("answering course questions from the dataset", () => {
  it("gives real entry requirements instead of a link to another page", () => {
    const answer = answerFromData("what are the requirements for BEng Chemical at Stellenbosch")

    expect(answer).toBeTruthy()
    expect(answer).toContain("BEng (Chemical)")
    expect(answer).toContain("70%")
    expect(answer).toContain("Mathematics")
    // The old behaviour, and the thing this exists to prevent.
    expect(answer).not.toMatch(/find-course|visit our|check the .* page/i)
  })

  it("answers a question that never says the word requirements", () => {
    // "tell me about X" matched a real programme and still got a
    // redirect, because the intent patterns did not cover it.
    const answer = answerFromData("tell me about BCom Actuarial Science")

    expect(answer).toContain("BCom (Actuarial Science)")
    expect(answer).toContain("80%")
  })

  it("answers closing dates for a named university", () => {
    const answer = answerFromData("when does UJ close applications")

    expect(answer).toContain("University of Johannesburg")
    expect(answer).toContain("31 October 2026")
    expect(answer).toMatch(/opens/i)
  })

  it("lists the campuses of a university that has several", () => {
    const answer = answerFromData("what campuses does TUT have")

    expect(answer).toContain("Soshanguve")
    expect(answer).toContain("Pretoria")
  })

  it("answers where a subject can be studied across institutions", () => {
    const answer = answerFromData("where can I study law")

    expect(answer).toMatch(/law/i)
    // More than one institution teaches it, so more than one appears.
    expect(answer!.match(/University|Tshwane|Stellenbosch/g)!.length).toBeGreaterThan(1)
  })

  it("answers what a qualification leads to", () => {
    const answer = answerFromData("what can I do with a BSc Computer Science")

    expect(answer).toMatch(/software developer/i)
  })

  it("keeps a named university from answering with another one's degree", () => {
    const matches = searchProgrammes("does Stellenbosch offer law")

    expect(matches.length).toBeGreaterThan(0)
    for (const programme of matches) {
      expect((programme as unknown as Record<string, unknown>).institution_id).toBe("su")
    }
  })

  it("defers to the model for questions the data cannot answer", () => {
    expect(answerFromData("how do I calculate my APS")).toBeNull()
    expect(answerFromData("what is the weather in Durban")).toBeNull()
    expect(answerFromData("hello")).toBeNull()
  })
})

describe("rendering a requirement tree a learner can check themselves against", () => {
  it("brackets a nested alternative instead of flattening it", () => {
    // Engineering's language rule is an "any" whose last branch is an
    // "and". Flattened, the trailing "and Afrikaans..." reads as a
    // requirement for everyone rather than part of one alternative.
    const lines = describeRequirements(findProgramme("BEng (Chemical)"))
    const languages = lines.find((l) => l.includes("Afrikaans"))!

    expect(languages).toContain("(")
    // The opening bracket immediately before "English First
    // Additional Language" is the proof: flattened, that branch would
    // follow an "or" with no bracket of its own, and the trailing
    // "and Afrikaans..." would read as a condition on every applicant.
    expect(languages).toMatch(/\(English First Additional Language.*?and Afrikaans Home Language.*?\)/)
  })

  it("collapses an eleven-language fan into the sentence the booklet printed", () => {
    // "Home Language 50%" is stored as an `any` over every official
    // language. Exact, and unreadable as eleven alternatives.
    const lines = describeRequirements(findProgramme("BA in Music"))

    expect(lines.some((l) => /any Home Language level 4/.test(l))).toBe(true)
    expect(lines.join(" ")).not.toContain("isiNdebele")
  })

  it("states a percentage aggregate for SU and an APS for the others", () => {
    expect(describeRequirements(findProgramme("MBChB")).join(" ")).toMatch(/average of at least 75%/)

    const uj = (PROGRAMMES as unknown as Array<Record<string, unknown>>)
      .find((p) => p.institution_id === "uj" && (p.requirements as never as { nsc: { score?: unknown[] } }).nsc.score?.length)
    expect(describeRequirements(uj as never).join(" ")).toMatch(/APS of at least/)
  })
})

describe("career paths", () => {
  it("prefers what the institution published over our own mapping", () => {
    const published = (PROGRAMMES as unknown as Array<Record<string, unknown>>)
      .find((p) => p.career_text) as never
    const answer = careerPathsFor(published)!

    expect(answer.source).toBe("institution")
    expect(answer.published).toBeTruthy()
  })

  it("covers every programme, by field where the institution published none", () => {
    const uncovered = (PROGRAMMES as unknown as Array<Record<string, unknown>>)
      .filter((p) => !careerPathsFor(p as never))

    expect(uncovered).toEqual([])
  })

  it("does not answer a sport science degree with generic science careers", () => {
    const answer = careerPathsFor(findProgramme("BSc Sport Science"))!

    expect(answer.careers.join(" ")).toMatch(/biokineticist|sports/i)
  })
})

describe("recognising which university was meant", () => {
  it.each([
    ["uj", "does uj have engineering"],
    ["su", "stellenbosch closing dates"],
    ["su", "what does maties require"],
    ["wits", "wits application fee"],
    ["tut", "tshwane university of technology campuses"],
  ])("reads %s from %p", (expected, query) => {
    expect(institutionFromQuery(query)).toBe(expected)
  })

  it("does not see a university where none was named", () => {
    expect(institutionFromQuery("what can I study with 30 points")).toBeNull()
  })
})
