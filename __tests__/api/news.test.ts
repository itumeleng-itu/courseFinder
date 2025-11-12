/**
 * @jest-environment node
 */
import { GET } from "@/app/api/news/route"
// No request object needed; GET() doesn’t use it

describe("News API", () => {
  it("should return news articles", async () => {
    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty("success")
    expect(data).toHaveProperty("articles")
    expect(data).toHaveProperty("year")
    expect(Array.isArray(data.articles)).toBe(true)
  })

  it("should return only current-year articles", async () => {
    const response = await GET()
    const data = await response.json()

    const currentYear = new Date().getFullYear()
    expect(data.year).toBe(currentYear)

    // Check that all articles are from 2024
    if (data.articles && data.articles.length > 0) {
      data.articles.forEach((article: any) => {
        if (article.pubDate) {
          const year = new Date(article.pubDate).getFullYear()
          expect(year).toBe(currentYear)
        }
      })
    }
  })

  it("should return articles with required fields", async () => {
    const response = await GET()
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
    const response = await GET()

    const cacheControl = response.headers.get("Cache-Control")
    expect(cacheControl).toBeTruthy()
    expect(cacheControl).toContain("s-maxage")
  })

  it("should limit articles to 8 or fewer", async () => {
    const response = await GET()
    const data = await response.json()

    if (data.articles) {
      expect(data.articles.length).toBeLessThanOrEqual(8)
    }
  })
})
