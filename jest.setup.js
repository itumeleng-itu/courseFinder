// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Mock environment variables for tests
process.env.GOOGLE_API_KEY = 'test-api-key'

// Mock Next.js NextRequest properly
jest.mock('next/server', () => ({
  NextRequest: jest.fn().mockImplementation((url, options = {}) => {
    const parsedUrl = new URL(url)
    return {
      url,
      method: options.method || 'GET',
      headers: new Map(Object.entries(options.headers || {})),
      nextUrl: {
        searchParams: parsedUrl.searchParams
      },
      json: jest.fn(() => {
        try { return Promise.resolve(JSON.parse(options.body || '{}')); }
        catch (err) { return Promise.reject(err); }
      }),
      _body: options.body
    }
  }),
  NextResponse: {
    json: jest.fn().mockImplementation((data, options = {}) => ({
      json: jest.fn().mockResolvedValue(data),
      status: options.status || 200,
      headers: new Map(Object.entries(options.headers || {}))
    }))
  }
}))

// Global test utilities
global.fetch = jest.fn()

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks()
})