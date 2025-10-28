import { GET } from "@/app/api/nsc-2024/route"
import { NextRequest } from "next/server"

describe("NSC 2024 API", () => {
  it("should return NSC 2024 statistics", async () => {
    const request = new NextRequest("http://localhost:3000/api/nsc-2024")
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty("success")
    expect(data).toHaveProperty("year")
    expect(data).toHaveProperty("passRate")
    expect(data).toHaveProperty("passes")
    expect(data).toHaveProperty("wrote")
    expect(data).toHaveProperty("failed")
    expect(data).toHaveProperty("source")
    expect(data.year).toBe(2024)
  })

  it("should have valid numeric data", async () => {
    const request = new NextRequest("http://localhost:3000/api/nsc-2024")
    const response = await GET(request)
    const data = await response.json()

    expect(typeof data.passRate).toBe("number")
    expect(typeof data.passes).toBe("number")
    expect(typeof data.wrote).toBe("number")
    expect(typeof data.failed).toBe("number")
    expect(data.passRate).toBeGreaterThan(0)
    expect(data.passRate).toBeLessThan(100)
    expect(data.passes).toBeGreaterThan(0)
    expect(data.wrote).toBeGreaterThan(data.passes)
  })

  it("should have mathematics consistency", async () => {
    const request = new NextRequest("http://localhost:3000/api/nsc-2024")
    const response = await GET(request)
    const data = await response.json()

    // passes + failed should equal wrote
    expect(data.passes + data.failed).toBe(data.wrote)

    // passRate should match passes/wrote ratio
    const calculatedPassRate = (data.passes / data.wrote) * 100
    expect(Math.abs(data.passRate - calculatedPassRate)).toBeLessThan(0.5)
  })

  it("should include DBE source reference", async () => {
    const request = new NextRequest("http://localhost:3000/api/nsc-2024")
    const response = await GET(request)
    const data = await response.json()

    expect(data.source).toContain("education.gov.za")
  })

  it("should have proper cache headers", async () => {
    const request = new NextRequest("http://localhost:3000/api/nsc-2024")
    const response = await GET(request)

    const cacheControl = response.headers.get("Cache-Control")
    expect(cacheControl).toBeTruthy()
    expect(cacheControl).toContain("s-maxage=86400")
  })
})
