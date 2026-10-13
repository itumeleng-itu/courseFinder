/** @jest-environment node */
/**
 * lib/aps/methods.ts's calculateWitsAPS must agree with the number
 * /v1/qualify actually judges a learner on. They are two implementations
 * of prospectus page 13 -- one in TypeScript here, one in
 * coursefind-data's custom_points_with_bonus -- and there is no shared
 * schema package to keep them honest, so this compares them directly
 * against a running API.
 *
 * A learner shown one APS here and admitted or refused on another is
 * being misled, which is why this asserts EQUALITY rather than recording
 * a drift.
 */
import * as http from "http"
import { calculateWitsAPS } from "@/lib/aps/methods"

const PORT = Number(process.env.LIVE_QUALIFY_API_PORT ?? 8099)

function apiAps(slugMarks: Record<string, number>): Promise<number> {
  const payload = JSON.stringify({
    subjects: Object.entries(slugMarks).map(([subject, percentage]) => ({ subject, percentage })),
    academic_year: 2027,
    institutions: ["wits"],
  })
  return new Promise((resolve, reject) => {
    const req = http.request(
      { hostname: "127.0.0.1", port: PORT, path: "/v1/qualify", method: "POST",
        headers: { "Content-Type": "application/json",
                   "Content-Length": Buffer.byteLength(payload) } },
      (res) => { let d = ""; res.on("data", (c) => (d += c))
                 res.on("end", () => { try { resolve(JSON.parse(d).scores.wits) }
                                       catch (e) { reject(new Error(d.slice(0, 200))) } }) },
    )
    req.on("error", reject); req.write(payload); req.end()
  })
}

/** [label, UI subject names, the same marks as API slugs] */
const CASES: [string, { name: string; percentage: number }[], Record<string, number>][] = [
  ["NSC 2017 (real)", [
    { name: "IsiZulu Home Language", percentage: 77 },
    { name: "English First Additional Language", percentage: 75 },
    { name: "Mathematics", percentage: 8 },
    { name: "Life Orientation", percentage: 83 },
    { name: "Geography", percentage: 72 },
    { name: "History", percentage: 78 },
    { name: "Life Sciences", percentage: 50 }],
   { isizulu_hl: 77, english_fal: 75, mathematics: 8, life_orientation: 83,
     geography: 72, history: 78, life_sciences: 50 }],
  ["NSC 2022 (real, Maths Lit)", [
    { name: "IsiZulu Home Language", percentage: 76 },
    { name: "English First Additional Language", percentage: 61 },
    { name: "Mathematical Literacy", percentage: 40 },
    { name: "Life Orientation", percentage: 73 },
    { name: "Business Studies", percentage: 67 },
    { name: "Economics", percentage: 64 },
    { name: "Tourism", percentage: 48 }],
   { isizulu_hl: 76, english_fal: 61, mathematical_literacy: 40, life_orientation: 73,
     business_studies: 67, economics: 64, tourism: 48 }],
  ["NSC 2024 (real, 30% Phys Sci)", [
    { name: "IsiZulu Home Language", percentage: 83 },
    { name: "English First Additional Language", percentage: 75 },
    { name: "Mathematics", percentage: 41 },
    { name: "Life Orientation", percentage: 87 },
    { name: "Geography", percentage: 51 },
    { name: "Life Sciences", percentage: 54 },
    { name: "Physical Sciences", percentage: 30 }],
   { isizulu_hl: 83, english_fal: 75, mathematics: 41, life_orientation: 87,
     geography: 51, life_sciences: 54, physical_sciences: 30 }],
  ["strong English + Maths (bonus bites)", [
    { name: "English Home Language", percentage: 82 },
    { name: "Afrikaans First Additional Language", percentage: 74 },
    { name: "Mathematics", percentage: 78 },
    { name: "Physical Sciences", percentage: 71 },
    { name: "Life Sciences", percentage: 68 },
    { name: "Geography", percentage: 66 },
    { name: "Life Orientation", percentage: 85 }],
   { english_hl: 82, afrikaans_fal: 74, mathematics: 78, physical_sciences: 71,
     life_sciences: 68, geography: 66, life_orientation: 85 }],
  ["top of every band", [
    { name: "English Home Language", percentage: 95 },
    { name: "IsiZulu First Additional Language", percentage: 92 },
    { name: "Mathematics", percentage: 95 },
    { name: "Physical Sciences", percentage: 93 },
    { name: "Life Sciences", percentage: 91 },
    { name: "Geography", percentage: 90 },
    { name: "Life Orientation", percentage: 95 }],
   { english_hl: 95, isizulu_fal: 92, mathematics: 95, physical_sciences: 93,
     life_sciences: 91, geography: 90, life_orientation: 95 }],
  ["bonus just below and just above 60%", [
    { name: "English First Additional Language", percentage: 59 },
    { name: "Mathematics", percentage: 60 },
    { name: "IsiZulu Home Language", percentage: 88 },
    { name: "Geography", percentage: 85 },
    { name: "History", percentage: 86 },
    { name: "Life Sciences", percentage: 84 },
    { name: "Life Orientation", percentage: 90 }],
   { english_fal: 59, mathematics: 60, isizulu_hl: 88, geography: 85,
     history: 86, life_sciences: 84, life_orientation: 90 }],
  ["every mark in the 30-39 zero band", [
    { name: "English First Additional Language", percentage: 35 },
    { name: "Mathematics", percentage: 39 },
    { name: "IsiZulu Home Language", percentage: 30 },
    { name: "Geography", percentage: 38 },
    { name: "History", percentage: 31 },
    { name: "Life Sciences", percentage: 37 },
    { name: "Life Orientation", percentage: 36 }],
   { english_fal: 35, mathematics: 39, isizulu_hl: 30, geography: 38,
     history: 31, life_sciences: 37, life_orientation: 36 }],
  ["eight subjects, Life Orientation would be dropped", [
    { name: "English Home Language", percentage: 85 },
    { name: "IsiZulu First Additional Language", percentage: 88 },
    { name: "Life Orientation", percentage: 90 },
    { name: "History", percentage: 86 },
    { name: "Geography", percentage: 84 },
    { name: "Business Studies", percentage: 82 },
    { name: "Accounting", percentage: 80 },
    { name: "Tourism", percentage: 78 }],
   { english_hl: 85, isizulu_fal: 88, life_orientation: 90, history: 86,
     geography: 84, business_studies: 82, accounting: 80, tourism: 78 }],
]

describe("calculateWitsAPS agrees with the API that judges the learner", () => {
  it.each(CASES)("%s", async (_label, uiSubjects, slugMarks) => {
    const [fromApi, fromLocal] = [await apiAps(slugMarks), calculateWitsAPS(uiSubjects as any).aps]
    expect(fromLocal).toBe(fromApi)
  })

  it("does not hand the +2 to a non-English Home Language", () => {
    const zulu = calculateWitsAPS([{ name: "IsiZulu Home Language", percentage: 77 }] as any).aps
    const english = calculateWitsAPS([{ name: "English First Additional Language", percentage: 75 }] as any).aps
    // Higher percentage, lower score -- the whole point of the bonus rule.
    expect(zulu).toBe(6)
    expect(english).toBe(8)
  })

  it("pays nothing for a mark in the 30-39 band", () => {
    expect(calculateWitsAPS([{ name: "Geography", percentage: 39 }] as any).aps).toBe(0)
    expect(calculateWitsAPS([{ name: "Geography", percentage: 40 }] as any).aps).toBe(3)
  })

  it("scores Life Orientation on its own compressed scale", () => {
    // NSC level 7 at 83%, but Wits pays 3.
    expect(calculateWitsAPS([{ name: "Life Orientation", percentage: 83 }] as any).aps).toBe(3)
  })
})
