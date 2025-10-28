import { GET } from "@/app/api/matric-stats/route"
import { NextRequest } from "next/server"

// Mock environment variables
process.env.GOOGLE_API_KEY = "test-key"

describe("Matric Stats API", () => {
  it("should return matric statistics with default model", async () => {
    const request = new NextRequest("http://localhost:3000/api/matric-stats")
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty("nationalPassRate")
    expect(data).toHaveProperty("provinces")
    expect(data).toHaveProperty("year")
    expect(data).toHaveProperty("_metadata")
    expect(Array.isArray(data.provinces)).toBe(true)
    expect(data.provinces.length).toBe(9)
  })

  it("should include all required province fields", async () => {
    const request = new NextRequest("http://localhost:3000/api/matric-stats")
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)

    if (data.provinces && data.provinces.length > 0) {
      const province = data.provinces[0]
      expect(province).toHaveProperty("province")
      expect(province).toHaveProperty("passRate")
      expect(province).toHaveProperty("rank")
    }
  })

  it("should accept model parameter", async () => {
    const request = new NextRequest("http://localhost:3000/api/matric-stats?model=gemini-1.5-flash")
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data._metadata).toHaveProperty("modelType")
  })

  it("should return 400 for invalid model", async () => {
    const request = new NextRequest("http://localhost:3000/api/matric-stats?model=invalid-model")
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data).toHaveProperty("error")
    expect(data).toHaveProperty("availableModels")
  })

  it("should have proper cache headers", async () => {
    const request = new NextRequest("http://localhost:3000/api/matric-stats")
    const response = await GET(request)

    expect(response.headers.get("Cache-Control")).toBeTruthy()
    expect(response.headers.get("X-Model-Used")).toBeTruthy()
  })
})
