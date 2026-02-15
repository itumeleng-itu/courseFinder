/**
 * @jest-environment node
 */
import { GET } from "@/app/api/news/route"

describe("News API", () => {
  it("should return news articles", async () => {
    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty("success")
    expect(data).toHaveProperty("articles")
    expect(data).toHaveProperty("source")
    expect(data).toHaveProperty("count")
    expect(Array.isArray(data.articles)).toBe(true)
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

  it("should report correct source type", async () => {
    const response = await GET()
    const data = await response.json()

    expect(["Live Feed", "Cached", "Static Fallback"]).toContain(data.source)
  })
})
