// import { POST as chatPOST } from '@/app/api/chat/route'

const ORIGINAL_ENV = { ...process.env }

describe('Chat API (OpenRouter)', () => {
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV }
    jest.restoreAllMocks()
    jest.resetModules()
  })

  test('returns 500 when API key missing', async () => {
    delete process.env.OPENROUTER_API_KEY

    const { POST: chatPOST } = require('@/app/api/chat/route')
    const req = { json: jest.fn().mockResolvedValue({ message: 'Hello' }) } as any
    const res = await chatPOST(req)
    const data = await res.json()

    expect(res.status).toBe(500)
    expect(data.error).toContain('OpenRouter API key')
  })

  test('returns assistant response on success', async () => {
    process.env.OPENROUTER_API_KEY = 'test_key'

    const mockJson = {
      id: 'cmpl_abc',
      choices: [{ message: { role: 'assistant', content: 'Hi there! How can I help you?' } }],
      usage: { total_tokens: 42 }
    }

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockJson
    } as any)

    const { POST: chatPOST } = require('@/app/api/chat/route')
    const req = { json: jest.fn().mockResolvedValue({ message: 'Hello', conversationHistory: [] }) } as any
    const res = await chatPOST(req)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.response).toContain('Hi there')
    expect(data._metadata.tokensUsed).toBe(42)
  })

  test('handles rate limit (429) with error', async () => {
    process.env.OPENROUTER_API_KEY = 'test_key'

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 429,
      text: async () => 'Too Many Requests'
    } as any)

    const { POST: chatPOST } = require('@/app/api/chat/route')
    const req = { json: jest.fn().mockResolvedValue({ message: 'Hello' }) } as any
    const res = await chatPOST(req)
    const data = await res.json()

    expect(res.status).toBe(429)
    expect(data.success).toBe(false)
    expect(data.error).toContain('Rate limit')
  })
})