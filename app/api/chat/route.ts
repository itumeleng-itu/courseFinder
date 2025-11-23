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
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 4096
    })
  })

  const responseText = await response.text()

  return {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    text: responseText,
    headers: response.headers
  }
}

function formatResponse(text: string): string {
  if (!text) return ''
  return text
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\*\*([^*]+)\*\*/g, '**$1**')
    .trim()
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

    if (!OPENROUTER_API_KEY) {
      console.error("OPENROUTER_API_KEY is not set in environment variables")
      return NextResponse.json({
        error: "Server is not configured with OpenRouter API key"
      }, { status: 500 })
    }

    const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = []
    messages.push({ role: "system", content: SYSTEM_PROMPT })

    ;(conversationHistory as unknown[]).forEach((msg) => {
      const item = msg as Partial<ChatHistoryItem>
      messages.push({
        role: item.role === "assistant" ? "assistant" : "user",
        content: String(item.content ?? "")
      })
    })

    messages.push({ role: "user", content: String(message) })

    const modelsToTry = model ? [model, ...MODELS] : MODELS
    let lastError: { model?: string; error?: string; status?: number } | null = null
    const attemptedModels: string[] = []

    for (const currentModel of modelsToTry) {
      try {
        attemptedModels.push(currentModel)
        const response = await makeOpenRouterRequest(currentModel, messages)

        if (response.status === 429) {
          console.warn(`Rate limit on ${currentModel}`)
          lastError = { model: currentModel, error: "Rate limited", status: 429 }
          continue
        }

        if (response.status === 502 || response.status === 503) {
          console.warn(`Provider error on ${currentModel}`)
          lastError = { model: currentModel, error: "Provider unavailable", status: response.status }
          continue
        }

        if (!response.ok) {
          try {
            const errorData = JSON.parse(response.text)
            console.error(`Error on ${currentModel}:`, errorData)
            if (errorData.error?.message?.toLowerCase().includes("provider")) {
              lastError = { model: currentModel, error: errorData.error.message, status: response.status }
              continue
            }
            lastError = { model: currentModel, error: errorData.error?.message || response.statusText, status: response.status }
          } catch {
            lastError = { model: currentModel, error: response.statusText, status: response.status }
          }
          continue
        }

        const data = JSON.parse(response.text)
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
          console.error(`Invalid response format from ${currentModel}`)
          lastError = { model: currentModel, error: "Invalid response format" }
          continue
        }

        const rawResponse = data.choices[0].message.content
        const formattedResponse = formatResponse(rawResponse)
        return NextResponse.json({
          success: true,
          response: formattedResponse,
          _metadata: {
            model: currentModel,
            modelType: currentModel,
            attemptedModels,
            timestamp: new Date().toISOString(),
            tokensUsed: data.usage?.total_tokens || 0
          }
        }, {
          headers: { "X-Model-Used": currentModel }
        })

      } catch (error) {
        console.error(`Exception with ${currentModel}:`, error)
        lastError = { model: currentModel, error: error instanceof Error ? error.message : "Unknown error" }
      }
    }

    console.error("All models failed", { attemptedModels, lastError })
    return NextResponse.json({
      success: false,
      error: "All available models are currently unavailable. Please try again in a few moments.",
      details: { attemptedModels, lastError: lastError?.error || "Unknown error" }
    }, { status: 503 })

  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json({
      success: false,
      error: "Failed to generate response. Please try again.",
      _metadata: {
        timestamp: new Date().toISOString(),
        errorType: error instanceof Error ? error.name : "Unknown",
        errorMessage: error instanceof Error ? error.message : "Unknown error"
      }
    }, { status: 500 })
  }
}
