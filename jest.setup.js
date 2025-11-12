// Learn more: https://github.com/testing-library/jest-dom
require("@testing-library/jest-dom")
// Polyfill fetch/Request/Response/Headers only in browser-like (jsdom) tests
if (typeof window !== "undefined") {
  require("whatwg-fetch")
}

// Mock environment variables for testing
process.env.GOOGLE_API_KEY = "test-google-api-key"
process.env.OPENROUTER_API_KEY = "test-openrouter-api-key"
process.env.NEWSDATA_API_KEY = "test-newsdata-api-key"

// Polyfill minimal globals if missing in the Jest environment
if (typeof global.Request === "undefined") {
  global.Request = class Request {}
}
if (typeof global.Headers === "undefined") {
  global.Headers = class Headers {
    constructor(init = {}) {
      this._init = init
    }
    get(name) {
      return this._init[name] ?? null
    }
  }
}

// Provide a safe fetch mock that returns realistic responses for NewsData calls
// Do NOT override global Response/Request/Headers — Node 20 provides them
global.fetch = jest.fn(async (input, init) => {
  const url = typeof input === "string" ? input : input?.url

  // Stub for NewsData.io API used in the news route
  if (url && url.includes("newsdata.io")) {
    const sample = {
      results: [
        {
          title: "Matric results improve across provinces",
          description: "Education department reports improved performance.",
          link: "https://example.com/matric-results",
          pubDate: new Date().toISOString(),
          source_id: "example",
          category: ["education"],
          image_url: "",
          content: "...",
        },
        {
          title: "New bursary programs announced",
          description: "Scholarship opportunities for students.",
          link: "https://example.com/bursary",
          pubDate: new Date().toISOString(),
          source_id: "example",
          category: ["education"],
          image_url: "",
          content: "...",
        },
      ],
    }
    return new Response(JSON.stringify(sample), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  }

  // Generic stub for other requests
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
})

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks()
})
