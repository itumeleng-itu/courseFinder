import { SYSTEM_PROMPT } from "@/constants/prompts"
import { NextResponse } from "next/server"
import { generateLocalFallback } from "@/lib/chatbot-fallback"

export const dynamic = "force-dynamic"

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || ""
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

const MODELS = [
    "google/gemini-2.0-flash-exp:free",
    "meta-llama/llama-3.2-3b-instruct:free",
    "mistralai/mistral-7b-instruct:free",
    "google/gemini-flash-1.5:free"
]

// =============================================================================
// RESPONSE CACHE - Saves tokens by caching frequently asked questions
// =============================================================================

interface CachedResponse {
    response: string
    timestamp: number
    hitCount: number
}

const responseCache = new Map<string, CachedResponse>()
const CACHE_TTL = 24 * 60 * 60 * 1000
const MAX_CACHE_SIZE = 500
let _oldestCacheKey: string | null = null

function normalizeQuestion(question: string): string {
    return question
        .toLowerCase()
        .trim()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, ' ')
}

function getCachedResponse(question: string): string | null {
    const normalizedQuestion = normalizeQuestion(question)
    const cached = responseCache.get(normalizedQuestion)
    if (!cached) return null
    if (Date.now() - cached.timestamp > CACHE_TTL) {
        responseCache.delete(normalizedQuestion)
        if (_oldestCacheKey === normalizedQuestion) _oldestCacheKey = null
        return null
    }
    cached.hitCount++
    return cached.response
}

function cacheResponse(question: string, response: string): void {
    const normalizedQuestion = normalizeQuestion(question)
    if (normalizedQuestion.length < 10 || normalizedQuestion.length > 200) return
    if (responseCache.size >= MAX_CACHE_SIZE) {
        // Map preserves insertion order — first key is oldest
        const firstKey = _oldestCacheKey || responseCache.keys().next().value
        if (firstKey) {
            responseCache.delete(firstKey)
            _oldestCacheKey = null
        }
    }
    if (!_oldestCacheKey && responseCache.size === 0) _oldestCacheKey = normalizedQuestion
    responseCache.set(normalizedQuestion, { response, timestamp: Date.now(), hitCount: 0 })
}

function getCacheStats() {
    let totalHits = 0
    for (const cached of responseCache.values()) totalHits += cached.hitCount
    return { size: responseCache.size, totalHits, maxSize: MAX_CACHE_SIZE }
}

// =============================================================================
// PER-IP RATE LIMITING — 20 requests per minute
// =============================================================================

interface RateLimitEntry {
    count: number
    resetTime: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()
const RATE_LIMIT_MAX = 20
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute

// Clean stale entries every 5 minutes
setInterval(() => {
    const now = Date.now()
    for (const [ip, entry] of rateLimitMap.entries()) {
        if (now > entry.resetTime) rateLimitMap.delete(ip)
    }
}, 5 * 60 * 1000)

function checkRateLimit(request: Request): { allowed: boolean; remaining: number } {
    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown"
    const now = Date.now()

    let entry = rateLimitMap.get(ip)
    if (!entry || now > entry.resetTime) {
        entry = { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS }
        rateLimitMap.set(ip, entry)
    }

    entry.count++
    const remaining = Math.max(0, RATE_LIMIT_MAX - entry.count)
    return { allowed: entry.count <= RATE_LIMIT_MAX, remaining }
}

// =============================================================================
// API REQUEST HANDLING
// =============================================================================

async function makeOpenRouterRequest(
    model: string,
    messages: Array<{ role: "system" | "user" | "assistant"; content: string }>
) {
    const response = await fetch(OPENROUTER_API_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
            "HTTP-Referer": "https://coursefinder-sa.vercel.app",
            "X-Title": "CourseFinder SA",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ model, messages, temperature: 0.5, max_tokens: 4096 })
    })
    const responseText = await response.text()
    return { ok: response.ok, status: response.status, statusText: response.statusText, text: responseText, headers: response.headers }
}

function formatResponse(text: string): string {
    if (!text) return ''
    return text.replace(/\n{3,}/g, '\n\n').replace(/\*\*([^*]+)\*\*/g, '**$1**').trim()
}

type ChatHistoryItem = { role: "assistant" | "user"; content: unknown }

export async function POST(request: Request) {
    try {
        // --- Rate limiting ---
        const rateLimit = checkRateLimit(request)
        if (!rateLimit.allowed) {
            return NextResponse.json(
                { success: false, error: "Too many requests. Please wait a moment before sending another message." },
                { status: 429, headers: { "Retry-After": "60", "X-RateLimit-Remaining": "0" } }
            )
        }

        const { message, conversationHistory = [], model } = (await request.json()) as {
            message: unknown
            conversationHistory?: unknown[]
            model?: string
        }

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 })
        }

        const userMessage = String(message)

        // Check cache first
        if (conversationHistory.length <= 1) {
            const cachedResponse = getCachedResponse(userMessage)
            if (cachedResponse) {
                return NextResponse.json({
                    success: true,
                    response: cachedResponse,
                    _metadata: { model: "cache", cached: true, cacheStats: getCacheStats(), timestamp: new Date().toISOString(), tokensUsed: 0 }
                }, { headers: { "X-Model-Used": "cache", "X-RateLimit-Remaining": String(rateLimit.remaining) } })
            }
        }

        // If no API key, try local fallback instead of returning an error
        if (!OPENROUTER_API_KEY) {
            const localResponse = generateLocalFallback(userMessage)
            if (localResponse) {
                return NextResponse.json({
                    success: true,
                    response: localResponse,
                    _metadata: { model: "local-fallback", cached: false, timestamp: new Date().toISOString(), tokensUsed: 0 }
                }, { headers: { "X-Model-Used": "local-fallback", "X-RateLimit-Remaining": String(rateLimit.remaining) } })
            }
            return NextResponse.json({ error: "Server is not configured with OpenRouter API key" }, { status: 500 })
        }

        const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = []
        messages.push({ role: "system", content: SYSTEM_PROMPT })
            ; (conversationHistory as unknown[]).forEach((msg) => {
                const item = msg as Partial<ChatHistoryItem>
                messages.push({ role: item.role === "assistant" ? "assistant" : "user", content: String(item.content ?? "") })
            })
        messages.push({ role: "user", content: userMessage })

        const modelsToTry = model ? [model, ...MODELS] : MODELS
        let lastError: { model?: string; error?: string; status?: number } | null = null
        const attemptedModels: string[] = []

        for (const currentModel of modelsToTry) {
            try {
                attemptedModels.push(currentModel)
                const response = await makeOpenRouterRequest(currentModel, messages)

                if (response.status === 429) { lastError = { model: currentModel, error: "Rate limited", status: 429 }; continue }
                if (response.status === 502 || response.status === 503) { lastError = { model: currentModel, error: "Provider unavailable", status: response.status }; continue }

                if (!response.ok) {
                    try {
                        const errorData = JSON.parse(response.text)
                        lastError = { model: currentModel, error: errorData.error?.message || response.statusText, status: response.status }
                    } catch { lastError = { model: currentModel, error: response.statusText, status: response.status } }
                    continue
                }

                const data = JSON.parse(response.text)
                if (!data.choices?.[0]?.message) { lastError = { model: currentModel, error: "Invalid response format" }; continue }

                const formattedResponse = formatResponse(data.choices[0].message.content)
                if (conversationHistory.length <= 1) cacheResponse(userMessage, formattedResponse)

                return NextResponse.json({
                    success: true,
                    response: formattedResponse,
                    _metadata: { model: currentModel, attemptedModels, cached: false, timestamp: new Date().toISOString(), tokensUsed: data.usage?.total_tokens || 0 }
                }, { headers: { "X-Model-Used": currentModel } })

            } catch (error) {
                lastError = { model: currentModel, error: error instanceof Error ? error.message : "Unknown error" }
            }
        }

        // All models failed — try local fallback from app data
        const localResponse = generateLocalFallback(userMessage)
        if (localResponse) {
            return NextResponse.json({
                success: true,
                response: localResponse,
                _metadata: { model: "local-fallback", attemptedModels, cached: false, timestamp: new Date().toISOString(), tokensUsed: 0 }
            }, { headers: { "X-Model-Used": "local-fallback" } })
        }

        return NextResponse.json({
            success: false,
            error: "All available models are currently unavailable. Please try again in a few moments.",
            details: { attemptedModels, lastError: lastError?.error || "Unknown error" }
        }, { status: 503 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: "Failed to generate response. Please try again.",
            _metadata: { timestamp: new Date().toISOString(), errorType: error instanceof Error ? error.name : "Unknown" }
        }, { status: 500 })
    }
}
