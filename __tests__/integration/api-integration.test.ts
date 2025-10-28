import { GET as getMatricStats } from "@/app/api/matric-stats/route"
import { GET as getPassRate } from "@/app/api/matric-pass-rate/route"
import { GET as getNSC2024 } from "@/app/api/nsc-2024/route"
import { GET as getProvincialRates } from "@/app/api/provincial-pass-rates/route"
import { GET as getNews } from "@/app/api/news/route"
import { GET as getBursaries } from "@/app/api/bursaries/route"
import { NextRequest } from "next/server"

describe("API Integration Tests", () => {
  it("should have consistent pass rate data across endpoints", async () => {
    const statsReq = new NextRequest("http://localhost:3000/api/matric-stats")
    const passRateReq = new NextRequest("http://localhost:3000/api/matric-pass-rate")
    const nsc2024Req = new NextRequest("http://localhost:3000/api/nsc-2024")

    const [statsRes, passRateRes, nsc2024Res] = await Promise.all([
      getMatricStats(statsReq),
      getPassRate(passRateReq),
      getNSC2024(nsc2024Req),
    ])

    const [statsData, passRateData, nsc2024Data] = await Promise.all([
      statsRes.json(),
      passRateRes.json(),
      nsc2024Res.json(),
    ])

    // All should return successful responses
    expect(statsData).toHaveProperty("nationalPassRate")
    expect(passRateData).toHaveProperty("nationalPassRate")
    expect(nsc2024Data).toHaveProperty("passRate")

    // Year consistency
    expect(passRateData.year).toBeDefined()
    expect(nsc2024Data.year).toBe(2024)
  })

  it("should return data from all public endpoints", async () => {
    const endpoints = [
      { name: "matric-stats", fn: getMatricStats },
      { name: "matric-pass-rate", fn: getPassRate },
      { name: "nsc-2024", fn: getNSC2024 },
      { name: "provincial-pass-rates", fn: getProvincialRates },
      { name: "news", fn: getNews },
      { name: "bursaries", fn: getBursaries },
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
      { name: "matric-pass-rate", fn: getPassRate },
      { name: "nsc-2024", fn: getNSC2024 },
      { name: "provincial-pass-rates", fn: getProvincialRates },
      { name: "news", fn: getNews },
      { name: "bursaries", fn: getBursaries },
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

  it("should return 2024 data where applicable", async () => {
    const nsc2024Req = new NextRequest("http://localhost:3000/api/nsc-2024")
    const newsReq = new NextRequest("http://localhost:3000/api/news")

    const [nsc2024Res, newsRes] = await Promise.all([getNSC2024(nsc2024Req), getNews(newsReq)])

    const [nsc2024Data, newsData] = await Promise.all([nsc2024Res.json(), newsRes.json()])

    expect(nsc2024Data.year).toBe(2024)
    expect(newsData.year).toBe(2024)
  })

  it("should handle concurrent requests efficiently", async () => {
    const start = Date.now()

    const requests = Array(5)
      .fill(null)
      .map(() =>
        Promise.all([
          getMatricStats(new NextRequest("http://localhost:3000/api/matric-stats")),
          getPassRate(new NextRequest("http://localhost:3000/api/matric-pass-rate")),
          getNews(new NextRequest("http://localhost:3000/api/news")),
        ]),
      )

    await Promise.all(requests)

    const duration = Date.now() - start

    // Should complete within reasonable time (adjust as needed)
    expect(duration).toBeLessThan(30000) // 30 seconds for 15 total requests
  })
})
