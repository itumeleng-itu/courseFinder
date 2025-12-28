import { SYSTEM_PROMPT } from "@/constants/prompts"
import { NextResponse } from "next/server"

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
        return null
    }
    cached.hitCount++
    console.log(`[Cache] HIT #${cached.hitCount}: "${normalizedQuestion.substring(0, 50)}..."`)
    return cached.response
}

function cacheResponse(question: string, response: string): void {
    const normalizedQuestion = normalizeQuestion(question)
    if (normalizedQuestion.length < 10 || normalizedQuestion.length > 200) return
    if (responseCache.size >= MAX_CACHE_SIZE) {
        let oldestKey = ''
        let oldestTime = Infinity
        for (const [key, value] of responseCache.entries()) {
            if (value.timestamp < oldestTime) {
                oldestTime = value.timestamp
                oldestKey = key
            }
        }
        if (oldestKey) responseCache.delete(oldestKey)
    }
    responseCache.set(normalizedQuestion, { response, timestamp: Date.now(), hitCount: 0 })
    console.log(`[Cache] Stored: "${normalizedQuestion.substring(0, 50)}..." (Total: ${responseCache.size})`)
}

function getCacheStats() {
    let totalHits = 0
    for (const cached of responseCache.values()) totalHits += cached.hitCount
    return { size: responseCache.size, totalHits, maxSize: MAX_CACHE_SIZE }
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
                }, { headers: { "X-Model-Used": "cache" } })
            }
        }

        if (!OPENROUTER_API_KEY) {
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
