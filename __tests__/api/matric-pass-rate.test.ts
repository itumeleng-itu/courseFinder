import { GET as matricPassGET } from '@/app/api/matric-pass-rate/route'

// Preserve environment
const ORIGINAL_ENV = { ...process.env }

describe('Matric Pass Rate API (OpenRouter)', () => {
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV }
    jest.restoreAllMocks()
    jest.resetModules()
  })

  test('returns fallback data when API key missing', async () => {
    delete process.env.OPENROUTER_API_KEY

    const { GET: matricPassGET } = require('@/app/api/matric-pass-rate/route')
    const res = await matricPassGET()
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.success).toBe(true)
    expect(typeof data.nationalPassRate).toBe('number')
    expect(typeof data.year).toBe('number')
    expect(typeof data.source).toBe('string')
    expect(data._metadata.model).toBe('fallback')
  })

  test('parses valid OpenRouter response and caches result', async () => {
    process.env.OPENROUTER_API_KEY = 'test_key'

    const mockJson = {
      id: 'cmpl_123',
      choices: [{ message: { role: 'assistant', content: '{"nationalPassRate": 83.7, "year": 2024, "source": "DBE Official"}' } }],
      usage: { total_tokens: 100 }
    }

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockJson
    } as any)

    const { GET: matricPassGET } = require('@/app/api/matric-pass-rate/route')

    const res1 = await matricPassGET()
    const data1 = await res1.json()

    expect(res1.status).toBe(200)
    expect(data1.success).toBe(true)
    expect(data1.nationalPassRate).toBe(83.7)
    expect(data1.year).toBe(2024)
    expect(data1.source).toContain('DBE')

    // Second call should serve from cache (same result)
    const res2 = await matricPassGET()
    const data2 = await res2.json()

    expect(data2.nationalPassRate).toBe(83.7)
    expect(data2.year).toBe(2024)
    expect(data2._metadata.model).toContain('gemini')
    expect(global.fetch).toHaveBeenCalledTimes(1)
  })

  test('serves fallback on rate limit', async () => {
    process.env.OPENROUTER_API_KEY = 'test_key'

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 429,
      text: async () => 'rate limited'
    } as any)

    const { GET: matricPassGET } = require('@/app/api/matric-pass-rate/route')

    const res = await matricPassGET()
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data._metadata.note).toContain('Rate limited')
  })
})