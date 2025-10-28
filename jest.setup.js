// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"
import { jest, beforeEach } from "@jest/globals"

// Mock environment variables for testing
process.env.GOOGLE_API_KEY = "test-google-api-key"
process.env.OPENROUTER_API_KEY = "test-openrouter-api-key"

// Mock fetch globally
global.fetch = jest.fn()

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks()
})
