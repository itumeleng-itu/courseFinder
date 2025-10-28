import { GET } from "@/app/api/bursaries/route"
import { NextRequest } from "next/server"

describe("Bursaries API", () => {
  it("should return list of bursaries", async () => {
    const request = new NextRequest("http://localhost:3000/api/bursaries")
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty("success")
    expect(data).toHaveProperty("bursaries")
    expect(data).toHaveProperty("totalCount")
    expect(data).toHaveProperty("lastUpdated")
    expect(Array.isArray(data.bursaries)).toBe(true)
  })

  it("should return bursaries with required fields", async () => {
    const request = new NextRequest("http://localhost:3000/api/bursaries")
    const response = await GET(request)
    const data = await response.json()

    expect(data.bursaries.length).toBeGreaterThan(0)

    const bursary = data.bursaries[0]
    expect(bursary).toHaveProperty("id")
    expect(bursary).toHaveProperty("title")
    expect(bursary).toHaveProperty("provider")
    expect(bursary).toHaveProperty("amount")
    expect(bursary).toHaveProperty("field")
    expect(bursary).toHaveProperty("description")
    expect(bursary).toHaveProperty("eligibility")
    expect(bursary).toHaveProperty("deadline")
    expect(bursary).toHaveProperty("link")
    expect(Array.isArray(bursary.eligibility)).toBe(true)
  })

  it("should return exactly 10 bursaries", async () => {
    const request = new NextRequest("http://localhost:3000/api/bursaries")
    const response = await GET(request)
    const data = await response.json()

    expect(data.bursaries.length).toBe(10)
    expect(data.totalCount).toBe(10)
  })

  it("should include popular bursaries like NSFAS", async () => {
    const request = new NextRequest("http://localhost:3000/api/bursaries")
    const response = await GET(request)
    const data = await response.json()

    const nsfas = data.bursaries.find((b: any) => b.id === "1")
    expect(nsfas).toBeDefined()
    expect(nsfas.title).toContain("NSFAS")
  })

  it("should have proper cache headers", async () => {
    const request = new NextRequest("http://localhost:3000/api/bursaries")
    const response = await GET(request)

    const cacheControl = response.headers.get("Cache-Control")
    expect(cacheControl).toBeTruthy()
    expect(cacheControl).toContain("s-maxage=3600")
  })
})
