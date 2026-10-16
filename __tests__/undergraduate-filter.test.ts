/** @jest-environment node */
/**
 * Which programmes the main course list is allowed to hide.
 *
 * The filter existed to keep postgraduate qualifications out of a feed
 * built for matriculants. It did it with substring matching, and one of
 * its terms was "ma " -- for "MA History". "Diploma Architecture"
 * contains "ma ", and so does every name of the form "Diploma <X>".
 *
 * When UJ's 2027 prospectus brought in 24 such diplomas, all 24 were
 * hidden: the matcher returned them as qualifying, and the list dropped
 * them on the way to the screen. These are exactly the programmes a
 * learner with a Diploma Pass most needs to see.
 */
import { isUndergraduateCourse } from "@/hooks/use-course-matcher"
import { PROGRAMMES } from "@/lib/qualify/data"

describe("isUndergraduateCourse", () => {
  it("keeps every diploma in the bundled dataset", () => {
    const hidden = PROGRAMMES
      .filter((p: any) => /^(extended )?diploma\b/i.test(p.name))
      .filter((p: any) => !isUndergraduateCourse(p.name))
      .map((p: any) => p.name)

    expect(hidden).toEqual([])
  })

  it("keeps the exact names that were being dropped", () => {
    for (const name of [
      "Diploma Architecture", "Diploma Marketing", "Diploma Analytical Chemistry",
      "Extended Diploma Transportation Management", "Diploma Business Information Technology",
    ]) {
      expect(isUndergraduateCourse(name)).toBe(true)
    }
  })

  it("still hides postgraduate qualifications", () => {
    for (const name of [
      "MA History", "BSc Honours in Zoology", "MSc Chemistry", "PhD Physics",
      "Master of Business Administration", "MBA", "LLM Tax Law",
      "Postgraduate Diploma in Accounting", "Doctor of Philosophy",
    ]) {
      expect(isUndergraduateCourse(name)).toBe(false)
    }
  })

  it("matches on whole words, which is the whole point", () => {
    // Each of these contains an exclusion term as a substring.
    expect(isUndergraduateCourse("Diploma Pharmacy")).toBe(true)       // "ma"
    expect(isUndergraduateCourse("BCom Human Resource Management")).toBe(true)
    expect(isUndergraduateCourse("BSc Mathematics")).toBe(true)        // "ma"
    expect(isUndergraduateCourse("Bachelor of Commerce")).toBe(true)
  })

  it("hides nothing at all from the bundled dataset", () => {
    // Every record in this dataset is an undergraduate programme by
    // construction -- the seeds come from undergraduate prospectuses --
    // so any name this filter rejects is a false positive.
    const hidden = PROGRAMMES.filter((p: any) => !isUndergraduateCourse(p.name))
    expect(hidden.map((p: any) => `${p.institution_id}/${p.name}`)).toEqual([])
  })
})
