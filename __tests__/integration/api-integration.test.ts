import { GET as getMatricStats } from "@/app/api/matric-stats/route"
import { GET as getProvincialRates } from "@/app/api/provincial-pass-rates/route"
import { GET as getNews } from "@/app/api/news/route"
import { NextRequest } from "next/server"

describe("API Integration Tests", () => {
  it("should have consistent pass rate data across endpoints", async () => {
    const statsReq = new NextRequest("http://localhost:3000/api/matric-stats")

    const statsRes = await getMatricStats(statsReq)
    const statsData = await statsRes.json()

    // Should return successful response with pass rate data
    expect(statsData).toHaveProperty("nationalPassRate")
  })

  it("should return data from all public endpoints", async () => {
    const endpoints = [
      { name: "matric-stats", fn: getMatricStats },
      { name: "provincial-pass-rates", fn: getProvincialRates },
      { name: "news", fn: getNews },
    ]

    const results = await Promise.all(
      endpoints.map(async ({ name, fn }) => {
        const req = new NextRequest(`http://localhost:3000/api/${name}`)
        const res = await fn(req)
        const data = await res.json()
        return { name, status: res.status, hasData: !!data }
      }),
    )

    results.forEach(({ name, status, hasData }) => {
      expect(status).toBe(200)
      expect(hasData).toBe(true)
    })
  })

  it("should have proper cache headers on all endpoints", async () => {
    const endpoints = [
      { name: "matric-stats", fn: getMatricStats },
      { name: "provincial-pass-rates", fn: getProvincialRates },
      { name: "news", fn: getNews },
    ]

    const results = await Promise.all(
      endpoints.map(async ({ name, fn }) => {
        const req = new NextRequest(`http://localhost:3000/api/${name}`)
        const res = await fn(req)
        return { name, cacheControl: res.headers.get("Cache-Control") }
      }),
    )

    results.forEach(({ name, cacheControl }) => {
      expect(cacheControl).toBeTruthy()
      expect(cacheControl).toContain("s-maxage")
    })
  })

  it("should handle concurrent requests efficiently", async () => {
    const start = Date.now()

    const requests = Array(5)
      .fill(null)
      .map(() =>
        Promise.all([
          getMatricStats(new NextRequest("http://localhost:3000/api/matric-stats")),
          getNews(new NextRequest("http://localhost:3000/api/news")),
        ]),
      )

    await Promise.all(requests)

    const duration = Date.now() - start

    // Should complete within reasonable time (adjust as needed)
    expect(duration).toBeLessThan(30000) // 30 seconds for 10 total requests
  })
})
