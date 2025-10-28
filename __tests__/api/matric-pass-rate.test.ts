import { GET } from "@/app/api/matric-pass-rate/route"
import { NextRequest } from "next/server"

process.env.OPENROUTER_API_KEY = "test-key"

describe("Matric Pass Rate API", () => {
  it("should return national pass rate data", async () => {
    const request = new NextRequest("http://localhost:3000/api/matric-pass-rate")
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty("success")
    expect(data).toHaveProperty("nationalPassRate")
    expect(data).toHaveProperty("year")
    expect(data).toHaveProperty("source")
    expect(typeof data.nationalPassRate).toBe("number")
    expect(typeof data.year).toBe("number")
  })

  it("should return fallback data when API fails", async () => {
    const originalKey = process.env.OPENROUTER_API_KEY
    delete process.env.OPENROUTER_API_KEY

    const request = new NextRequest("http://localhost:3000/api/matric-pass-rate")
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.nationalPassRate).toBeDefined()
    expect(data._metadata).toHaveProperty("model", "fallback")

    process.env.OPENROUTER_API_KEY = originalKey
  })

  it("should have appropriate cache headers", async () => {
    const request = new NextRequest("http://localhost:3000/api/matric-pass-rate")
    const response = await GET(request)

    expect(response.headers.get("Cache-Control")).toContain("s-maxage")
    expect(response.headers.get("X-Model-Used")).toBeTruthy()
  })

  it("should include metadata in response", async () => {
    const request = new NextRequest("http://localhost:3000/api/matric-pass-rate")
    const response = await GET(request)
    const data = await response.json()

    expect(data._metadata).toBeDefined()
    expect(data._metadata).toHaveProperty("model")
    expect(data._metadata).toHaveProperty("timestamp")
  })
})
