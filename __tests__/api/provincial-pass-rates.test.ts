import { GET } from "@/app/api/provincial-pass-rates/route"
import { NextRequest } from "next/server"

describe("Provincial Pass Rates API", () => {
  it("should return provincial data with default parameters", async () => {
    const request = new NextRequest("http://localhost:3000/api/provincial-pass-rates")
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty("success")
    expect(data).toHaveProperty("province")
    expect(data).toHaveProperty("endYear")
    expect(data).toHaveProperty("provinceSeries")
    expect(data).toHaveProperty("nationalSeries")
    expect(data).toHaveProperty("provinceAvg")
    expect(data).toHaveProperty("nationalAvg")
  })

  it("should accept province parameter", async () => {
    const request = new NextRequest("http://localhost:3000/api/provincial-pass-rates?province=Western%20Cape")
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.province).toBe("Western Cape")
    expect(Array.isArray(data.provinceSeries)).toBe(true)
  })

  it("should accept years parameter", async () => {
    const request = new NextRequest("http://localhost:3000/api/provincial-pass-rates?province=Gauteng&years=7")
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.provinceSeries.length).toBe(7)
    expect(data.nationalSeries.length).toBe(7)
  })

  it("should normalize province names", async () => {
    const request = new NextRequest("http://localhost:3000/api/provincial-pass-rates?province=kzn")
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.province).toBe("KwaZulu-Natal")
  })

  it("should return valid year data", async () => {
    const request = new NextRequest("http://localhost:3000/api/provincial-pass-rates")
    const response = await GET(request)
    const data = await response.json()

    const currentYear = new Date().getFullYear()

    data.provinceSeries.forEach((item: any) => {
      expect(item).toHaveProperty("year")
      expect(item).toHaveProperty("passRate")
      expect(typeof item.year).toBe("number")
      expect(typeof item.passRate).toBe("number")
      expect(item.year).toBeLessThan(currentYear)
      expect(item.passRate).toBeGreaterThan(0)
      expect(item.passRate).toBeLessThan(100)
    })
  })

  it("should limit years between 3 and 10", async () => {
    const request1 = new NextRequest("http://localhost:3000/api/provincial-pass-rates?years=2")
    const response1 = await GET(request1)
    const data1 = await response1.json()
    expect(data1.provinceSeries.length).toBe(3) // Should clamp to minimum

    const request2 = new NextRequest("http://localhost:3000/api/provincial-pass-rates?years=15")
    const response2 = await GET(request2)
    const data2 = await response2.json()
    expect(data2.provinceSeries.length).toBe(10) // Should clamp to maximum
  })

  it("should have proper cache headers", async () => {
    const request = new NextRequest("http://localhost:3000/api/provincial-pass-rates")
    const response = await GET(request)

    const cacheControl = response.headers.get("Cache-Control")
    expect(cacheControl).toBeTruthy()
    expect(cacheControl).toContain("s-maxage=21600")
  })

  it("should return consistent averages", async () => {
    const request = new NextRequest("http://localhost:3000/api/provincial-pass-rates")
    const response = await GET(request)
    const data = await response.json()

    // Calculate average manually
    const sum = data.provinceSeries.reduce((acc: number, item: any) => acc + item.passRate, 0)
    const calculatedAvg = sum / data.provinceSeries.length

    expect(Math.abs(data.provinceAvg - calculatedAvg)).toBeLessThan(0.1)
  })
})
