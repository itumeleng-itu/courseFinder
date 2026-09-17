import { SUBJECT_SLUGS, toSubjectSlug } from "@/lib/subject-slugs"
import { SUBJECT_CATEGORIES } from "@/data/subjects"

describe("subject-slugs", () => {
  it("has a slug for every dropdown option a learner can actually select", () => {
    const allValues = SUBJECT_CATEGORIES.flatMap((c) => c.options).map((o) => o.value)
    for (const value of allValues) {
      expect(SUBJECT_SLUGS[value]).toBeDefined()
    }
  })

  it("keeps every slug lowercase snake_case (the API's own convention)", () => {
    for (const slug of Object.values(SUBJECT_SLUGS)) {
      expect(slug).toMatch(/^[a-z_]+$/)
    }
  })

  it("maps unknown subject names to undefined, never a guess", () => {
    expect(toSubjectSlug("Underwater Basket Weaving")).toBeUndefined()
  })

  // The three programmes the original investigation found the local
  // matcher could not evaluate correctly -- pinning their exact subject
  // mappings here so a future edit to this table can't silently break
  // the fix.
  describe("the three programmes this fix was built for", () => {
    it("B5BFPQ (BEd Foundation Phase): English HL and FAL map to distinct slugs", () => {
      expect(toSubjectSlug("English Home Language")).toBe("english_hl")
      expect(toSubjectSlug("English First Additional Language")).toBe("english_fal")
    })

    it("B5LAZQ (BEd isiZulu): both English and isiZulu HL/FAL map correctly", () => {
      expect(toSubjectSlug("English Home Language")).toBe("english_hl")
      expect(toSubjectSlug("English First Additional Language")).toBe("english_fal")
      expect(toSubjectSlug("IsiZulu Home Language")).toBe("isizulu_hl")
      expect(toSubjectSlug("IsiZulu First Additional Language")).toBe("isizulu_fal")
    })

    it("B4L03Q (LLB): a second language subject maps to a real slug, not a placeholder", () => {
      // The old local data required a literal "Additional Language"
      // subject that could never be selected from the dropdown. The API
      // instead evaluates "any additional language" server-side from
      // whichever real language subjects were sent -- this app just
      // needs to send them as themselves.
      expect(toSubjectSlug("Sesotho First Additional Language")).toBe("sesotho_fal")
    })
  })

  it("covers all 11 official languages in both HL and FAL variants (22 entries)", () => {
    const languageEntries = Object.keys(SUBJECT_SLUGS).filter(
      (k) => k.includes("Home Language") || k.includes("First Additional Language"),
    )
    expect(languageEntries).toHaveLength(22)
  })
})
