// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"
import { jest, beforeEach } from "@jest/globals"

// Mock environment variables for testing
process.env.GOOGLE_API_KEY = "test-google-api-key"
process.env.OPENROUTER_API_KEY = "test-openrouter-api-key"

// Mock Web APIs for Node.js environment
global.fetch = jest.fn()
global.Request = jest.fn()
global.Response = jest.fn()
global.Headers = jest.fn()

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks()
})
