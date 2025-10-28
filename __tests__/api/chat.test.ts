/**
 * Unit tests for the chat API endpoint
 * Tests dynamic model selection, conversation handling, and error scenarios
 */

import { NextRequest } from "next/server"
import { POST } from "@/app/api/chat/route"
import jest from "jest"

// Mock Google Generative AI
jest.mock("@google/generative-ai", () => {
  const mockSendMessage = jest.fn()
  const mockStartChat = jest.fn().mockReturnValue({
    sendMessage: mockSendMessage,
  })

  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
      getGenerativeModel: jest.fn().mockReturnValue({
        startChat: mockStartChat,
      }),
    })),
    mockSendMessage,
    mockStartChat,
  }
})

// Get the mocked functions
const { mockSendMessage, mockStartChat } = require("@google/generative-ai")

// Mock environment variables
const originalEnv = process.env

// Use MockRequest from jest.setup.js
declare global {
  var MockRequest: any
}

beforeEach(() => {
  // Do not reset modules here to avoid breaking mocks
  process.env = { ...originalEnv, GOOGLE_API_KEY: "test-api-key", OPENROUTER_API_KEY: "test-key" }

  // Reset mocks
  mockSendMessage.mockClear()
  mockStartChat.mockClear()

  // Default mock implementation
  mockSendMessage.mockResolvedValue({
    response: {
      text: jest.fn().mockReturnValue("Hello! I can help you with university applications."),
      usageMetadata: {
        totalTokenCount: 25,
      },
    },
  })

  mockStartChat.mockReturnValue({
    sendMessage: mockSendMessage,
  })
})

afterAll(() => {
  process.env = originalEnv
})

describe("/api/chat", () => {
  describe("POST", () => {
    test("should return chat response with default model", async () => {
      const request = new NextRequest("http://localhost:3000/api/chat", {
        method: "POST",
        body: JSON.stringify({
          message: "Hello",
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toHaveProperty("response")
      expect(data).toHaveProperty("_metadata")
      expect(data._metadata.model).toBe("Gemini 2.5 Flash")
      expect(data._metadata.modelType).toBe("flash")
      expect(response.headers.get("X-Model-Used")).toBe("Gemini 2.5 Flash")
    })

    test("should return chat response with flash model", async () => {
      const request = new NextRequest("http://localhost:3000/api/chat", {
        method: "POST",
        body: JSON.stringify({
          message: "Hello",
          model: "flash",
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data._metadata.model).toBe("Gemini 2.5 Flash")
      expect(data._metadata.modelType).toBe("flash")
      expect(response.headers.get("X-Model-Used")).toBe("Gemini 2.5 Flash")
    })

    test("should return chat response with pro model", async () => {
      const request = new NextRequest("http://localhost:3000/api/chat", {
        method: "POST",
        body: JSON.stringify({
          message: "Hello",
          model: "2.5",
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data._metadata.model).toBe("Gemini 2.5 Pro")
      expect(data._metadata.modelType).toBe("2.5")
      expect(response.headers.get("X-Model-Used")).toBe("Gemini 2.5 Pro")
    })

    test("should return chat response with auto model", async () => {
      const request = new NextRequest("http://localhost:3000/api/chat", {
        method: "POST",
        body: JSON.stringify({
          message: "Hello",
          model: "auto",
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data._metadata.model).toBe("Auto Selection")
      expect(data._metadata.modelType).toBe("auto")
      expect(response.headers.get("X-Model-Used")).toBe("Auto Selection")
    })

    test("should return 400 error for invalid model", async () => {
      const request = new NextRequest("http://localhost:3000/api/chat", {
        method: "POST",
        body: JSON.stringify({
          message: "Hello",
          model: "invalid",
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data).toHaveProperty("error")
      expect(data.error).toBe("Invalid model selection")
      expect(data).toHaveProperty("availableModels")
      expect(data.availableModels).toContain("flash")
      expect(data.availableModels).toContain("2.5")
      expect(data.availableModels).toContain("auto")
    })

    test("should return 400 error for missing message", async () => {
      const request = new NextRequest("http://localhost:3000/api/chat", {
        method: "POST",
        body: JSON.stringify({}),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe("Message is required")
    })

    test("should handle conversation history", async () => {
      const conversationHistory = [
        { role: "user", content: "What is APS?" },
        { role: "assistant", content: "APS stands for Admission Point Score..." },
      ]

      const request = new NextRequest("http://localhost:3000/api/chat", {
        method: "POST",
        body: JSON.stringify({
          message: "How is it calculated?",
          conversationHistory,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(mockStartChat).toHaveBeenCalledWith({
        history: [
          { role: "user", parts: [{ text: "What is APS?" }] },
          { role: "model", parts: [{ text: "APS stands for Admission Point Score..." }] },
        ],
        generationConfig: {
          maxOutputTokens: 8192, // Flash model default
          temperature: 0.7,
        },
      })
    })

    test("should use correct model configuration for generation", async () => {
      const request = new NextRequest("http://localhost:3000/api/chat", {
        method: "POST",
        body: JSON.stringify({
          message: "Hello",
          model: "2.5",
        }),
      })

      await POST(request)

      expect(mockStartChat).toHaveBeenCalledWith({
        history: [],
        generationConfig: {
          maxOutputTokens: 32768, // Pro model tokens
          temperature: 0.7,
        },
      })
    })

    test("should include token usage in metadata", async () => {
      const request = new NextRequest("http://localhost:3000/api/chat", {
        method: "POST",
        body: JSON.stringify({
          message: "Hello",
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(data._metadata).toHaveProperty("tokensUsed")
      expect(data._metadata.tokensUsed).toBe(25)
    })

    test("should handle missing token usage metadata", async () => {
      mockSendMessage.mockResolvedValue({
        response: {
          text: jest.fn().mockReturnValue("Hello!"),
          usageMetadata: undefined,
        },
      })

      const request = new NextRequest("http://localhost:3000/api/chat", {
        method: "POST",
        body: JSON.stringify({
          message: "Hello",
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(data._metadata.tokensUsed).toBe(0)
    })

    test("should return 500 error on API failure", async () => {
      mockSendMessage.mockRejectedValue(new Error("API Error"))

      const request = new NextRequest("http://localhost:3000/api/chat", {
        method: "POST",
        body: JSON.stringify({
          message: "Hello",
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe("Failed to generate response. Please try again.")
      expect(data._metadata).toHaveProperty("timestamp")
      expect(data._metadata.errorType).toBe("Error")
    })

    test("should include timestamp in metadata", async () => {
      const request = new NextRequest("http://localhost:3000/api/chat", {
        method: "POST",
        body: JSON.stringify({
          message: "Hello",
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(data._metadata).toHaveProperty("timestamp")
      expect(new Date(data._metadata.timestamp)).toBeInstanceOf(Date)
    })

    test("should handle empty conversation history", async () => {
      const request = new NextRequest("http://localhost:3000/api/chat", {
        method: "POST",
        body: JSON.stringify({
          message: "Hello",
          conversationHistory: [],
        }),
      })

      const response = await POST(request)

      expect(response.status).toBe(200)
      expect(mockStartChat).toHaveBeenCalledWith({
        history: [],
        generationConfig: expect.any(Object),
      })
    })

    test("should transform conversation history roles correctly", async () => {
      const conversationHistory = [
        { role: "user", content: "Hello" },
        { role: "assistant", content: "Hi there!" },
        { role: "user", content: "How are you?" },
      ]

      const request = new NextRequest("http://localhost:3000/api/chat", {
        method: "POST",
        body: JSON.stringify({
          message: "Great!",
          conversationHistory,
        }),
      })

      await POST(request)

      expect(mockStartChat).toHaveBeenCalledWith({
        history: [
          { role: "user", parts: [{ text: "Hello" }] },
          { role: "model", parts: [{ text: "Hi there!" }] },
          { role: "user", parts: [{ text: "How are you?" }] },
        ],
        generationConfig: expect.any(Object),
      })
    })

    test("should accept valid message with conversation history", async () => {
      const request = new NextRequest("http://localhost:3000/api/chat", {
        method: "POST",
        body: JSON.stringify({
          message: "What is the APS requirement for Engineering at Wits?",
          conversationHistory: [
            { role: "user", content: "Hello" },
            { role: "assistant", content: "Hi! How can I help you?" },
          ],
          model: "google/gemini-2.0-flash-exp:free",
        }),
      })

      // This will fail without a real API key, but we're testing the structure
      const response = await POST(request)
      const data = await response.json()

      // Check that the response has the expected structure
      expect(data).toHaveProperty("success")
      expect(data).toHaveProperty("_metadata")
    })

    test("should use default model when not specified", async () => {
      const request = new NextRequest("http://localhost:3000/api/chat", {
        method: "POST",
        body: JSON.stringify({
          message: "Test message",
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(data).toHaveProperty("_metadata")
      if (data._metadata) {
        expect(data._metadata.modelType).toBeDefined()
      }
    })
  })

  describe("Request body validation", () => {
    test("should handle malformed JSON", async () => {
      const request = new NextRequest("http://localhost:3000/api/chat", {
        method: "POST",
        body: "invalid json",
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe("Failed to generate response. Please try again.")
    })

    test("should handle empty message string", async () => {
      const request = new NextRequest("http://localhost:3000/api/chat", {
        method: "POST",
        body: JSON.stringify({
          message: "",
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe("Message is required")
    })

    test("should handle null message", async () => {
      const request = new NextRequest("http://localhost:3000/api/chat", {
        method: "POST",
        body: JSON.stringify({
          message: null,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe("Message is required")
    })

    test("should return error when API key is missing", async () => {
      const originalKey = process.env.OPENROUTER_API_KEY
      delete process.env.OPENROUTER_API_KEY

      const request = new NextRequest("http://localhost:3000/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toContain("not configured")

      process.env.OPENROUTER_API_KEY = originalKey
    })
  })
})
