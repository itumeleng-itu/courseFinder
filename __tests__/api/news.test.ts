import { GET } from "@/app/api/news/route"
import { NextRequest } from "next/server"

describe("News API", () => {
  it("should return news articles", async () => {
    const request = new NextRequest("http://localhost:3000/api/news")
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty("success")
    expect(data).toHaveProperty("articles")
    expect(data).toHaveProperty("year")
    expect(Array.isArray(data.articles)).toBe(true)
  })

  it("should return only 2024 articles", async () => {
    const request = new NextRequest("http://localhost:3000/api/news")
    const response = await GET(request)
    const data = await response.json()

    expect(data.year).toBe(2024)

    // Check that all articles are from 2024
    if (data.articles && data.articles.length > 0) {
      data.articles.forEach((article: any) => {
        if (article.pubDate) {
          const year = new Date(article.pubDate).getFullYear()
          expect(year).toBe(2024)
        }
      })
    }
  })

  it("should return articles with required fields", async () => {
    const request = new NextRequest("http://localhost:3000/api/news")
    const response = await GET(request)
    const data = await response.json()

    if (data.articles && data.articles.length > 0) {
      const article = data.articles[0]
      expect(article).toHaveProperty("title")
      expect(article).toHaveProperty("description")
      expect(article).toHaveProperty("link")
      expect(article).toHaveProperty("pubDate")
      expect(article).toHaveProperty("image_url")
      expect(article).toHaveProperty("alt_text")
    }
  })

  it("should have proper cache headers", async () => {
    const request = new NextRequest("http://localhost:3000/api/news")
    const response = await GET(request)

    const cacheControl = response.headers.get("Cache-Control")
    expect(cacheControl).toBeTruthy()
    expect(cacheControl).toContain("s-maxage")
  })

  it("should limit articles to 8 or fewer", async () => {
    const request = new NextRequest("http://localhost:3000/api/news")
    const response = await GET(request)
    const data = await response.json()

    if (data.articles) {
      expect(data.articles.length).toBeLessThanOrEqual(8)
    }
  })
})
