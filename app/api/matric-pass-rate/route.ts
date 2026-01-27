import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || ""
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"
const MODEL = "google/gemini-2.0-flash-exp:free"

interface PassRateDataMeta {
  model: string
  timestamp: string
  durationMs?: number
  note?: string
}

interface PassRateData {
  nationalPassRate: number
  year: number
  source: string
  _metadata?: PassRateDataMeta
}

// Simple in-memory cache (auto-reset on server restart)
const cache: { data?: PassRateData; timestamp?: number } = {}
const TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

// Source: https://www.sanews.gov.za/south-africa/class-2024-achieves-historic-pass-rate
const FALLBACK = {
  nationalPassRate: 88.0, // Historic high - highest matric pass rate in history
  year: 2025,
  totalCandidates: 750000, // Full-time candidates
  totalPassed: 656000,
  bachelorPassRate: 46.0, // Percentage who qualified for Bachelor studies
  source: "Department of Basic Education (DBE) 2025 NSC Results - SAnews.gov.za"
}

export async function GET() {
  try {
    // Serve from cache if fresh
    if (cache.data && cache.timestamp && Date.now() - cache.timestamp < TTL_MS) {
      return NextResponse.json({ success: true, ...cache.data }, {
        headers: {
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
          "X-Model-Used": MODEL,
        }
      })
    }

    if (!OPENROUTER_API_KEY) {
      console.error("Missing OPENROUTER_API_KEY")
      return NextResponse.json({ success: true, ...FALLBACK, _metadata: { model: "fallback", timestamp: new Date().toISOString() } }, { status: 200 })
    }

    const prompt = `You are a data assistant. Provide South Africa's latest national matric pass rate for the most recent completed exam year (previous year relative to today). Use the Department of Basic Education official results. Respond with ONLY valid JSON in this shape:
{
  "nationalPassRate": <number>,
  "year": <number>,
  "source": "<short source description>"
}
Rules:
- Use the most recent completed year (e.g., if current year is 2025, use 2024 results).
- "nationalPassRate" should be a number (one decimal precision).
- Do not include any explanation outside the JSON.`

    const start = Date.now()
    const resp = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://coursefinder-sa.vercel.app",
        "X-Title": "CourseFinder SA",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: "You answer with strictly valid JSON only." },
          { role: "user", content: prompt }
        ],
        temperature: 0.2,
        max_tokens: 512
      })
    })

    if (resp.status === 429) {
      const body = await resp.text()
      console.warn("OpenRouter rate limit for matric-pass-rate", { status: 429, body: body?.slice(0, 200) })
      return NextResponse.json({ success: true, ...FALLBACK, _metadata: { model: "fallback", timestamp: new Date().toISOString(), note: "Rate limited; served fallback" } }, {
        headers: { "Cache-Control": "public, s-maxage=3600" },
        status: 200
      })
    }

    if (!resp.ok) {
      const body = await resp.text()
      console.error("OpenRouter error (matric-pass-rate)", { status: resp.status, statusText: resp.statusText, body: body?.slice(0, 200) })
      return NextResponse.json({ success: true, ...FALLBACK, _metadata: { model: "fallback", timestamp: new Date().toISOString(), note: "API error; served fallback" } }, {
        headers: { "Cache-Control": "public, s-maxage=3600" },
        status: 200
      })
    }

    const json = await resp.json()
    const content = json?.choices?.[0]?.message?.content || ""

    // Extract JSON block safely
    const match = typeof content === "string" ? content.match(/\{[\s\S]*\}/) : null
    if (!match) {
      console.error("No JSON found in OpenRouter response for matric-pass-rate")
      return NextResponse.json({ success: true, ...FALLBACK, _metadata: { model: "fallback", timestamp: new Date().toISOString(), note: "Malformed response; served fallback" } }, {
        headers: { "Cache-Control": "public, s-maxage=3600" },
        status: 200
      })
    }

    let data: unknown
    try {
      data = JSON.parse(match[0]) as unknown
    } catch (e) {
      console.error("Failed to parse JSON from OpenRouter matric-pass-rate", e)
      return NextResponse.json({ success: true, ...FALLBACK, _metadata: { model: "fallback", timestamp: new Date().toISOString(), note: "Parse error; served fallback" } }, {
        headers: { "Cache-Control": "public, s-maxage=3600" },
        status: 200
      })
    }

    const obj = (data ?? {}) as Record<string, unknown>
    const responseData: PassRateData = {
      nationalPassRate: Number(obj.nationalPassRate),
      year: Number(obj.year),
      source: String(obj.source ?? "Unknown"),
    }

    // Basic validation
    if (!responseData.nationalPassRate || !responseData.year) {
      console.warn("Validation failed for matric-pass-rate", responseData)
      return NextResponse.json({ success: true, ...FALLBACK, _metadata: { model: "fallback", timestamp: new Date().toISOString(), note: "Validation failed; served fallback" } }, {
        headers: { "Cache-Control": "public, s-maxage=3600" },
        status: 200
      })
    }

    // Cache and return
    cache.data = { ...responseData, _metadata: { model: MODEL, timestamp: new Date().toISOString(), durationMs: Date.now() - start } }
    cache.timestamp = Date.now()

    return NextResponse.json({ success: true, ...responseData, _metadata: { model: MODEL, timestamp: new Date().toISOString() } }, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
        "X-Model-Used": MODEL,
      },
      status: 200
    })
  } catch (error) {
    console.error("Matric Pass Rate API Error:", error)
    return NextResponse.json({ success: true, ...FALLBACK, _metadata: { model: "fallback", timestamp: new Date().toISOString(), note: "Unhandled error; served fallback" } }, {
      headers: { "Cache-Control": "public, s-maxage=3600" },
      status: 200
    })
  }
}
