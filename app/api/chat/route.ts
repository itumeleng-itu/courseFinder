import { SYSTEM_PROMPT } from "@/constants/prompts"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// OpenRouter API configuration
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || ""
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

// Fallback models in priority order
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

// Format the AI response for better display
function formatResponse(text: string): string {
  if (!text) return ''
  
  return text
    .replace(/\n{3,}/g, '\n\n') // Replace 3+ newlines with double newlines
    .replace(/\*\*([^*]+)\*\*/g, '**$1**') // Normalize bold formatting
    .trim()
}

export async function POST(request: Request) {
  try {
    const { message, conversationHistory = [], model } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    if (!OPENROUTER_API_KEY) {
      console.error("OPENROUTER_API_KEY is not set in environment variables")
      return NextResponse.json({ 
        error: "Server is not configured with OpenRouter API key" 
      }, { status: 500 })
    }

    // Build messages array
    const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = []
    
    messages.push({
      role: "system",
      content: SYSTEM_PROMPT
    })

    conversationHistory.forEach((msg: any) => {
      messages.push({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: String(msg.content || "")
      })
    })

    messages.push({
      role: "user",
      content: String(message)
    })

    const start = Date.now()
    
    // Determine which models to try
    const requestedModel = model || MODELS[0]
    const modelsToTry = model ? [model, ...MODELS] : MODELS
    
    let lastError: any = null
    let attemptedModels: string[] = []

    // Try each model until one succeeds
    for (const currentModel of modelsToTry) {
      try {
        attemptedModels.push(currentModel)
        console.log(`Attempting model: ${currentModel}`)
        
        const response = await makeOpenRouterRequest(currentModel, messages)
        
        console.log(`Model ${currentModel} response:`, {
          status: response.status,
          statusText: response.statusText,
          bodyPreview: response.text.slice(0, 300)
        })

        // Handle rate limits
        if (response.status === 429) {
          console.warn(`Rate limit on ${currentModel}`)
          lastError = { model: currentModel, error: "Rate limited", status: 429 }
          continue // Try next model
        }

        // Handle provider errors (usually status 502 or 503)
        if (response.status === 502 || response.status === 503) {
          console.warn(`Provider error on ${currentModel}`)
          lastError = { model: currentModel, error: "Provider unavailable", status: response.status }
          continue // Try next model
        }

        // Handle other errors
        if (!response.ok) {
          try {
            const errorData = JSON.parse(response.text)
            console.error(`Error on ${currentModel}:`, errorData)
            
            // Check if it's a provider error in the response body
            if (errorData.error?.message?.toLowerCase().includes("provider")) {
              lastError = { model: currentModel, error: errorData.error.message, status: response.status }
              continue // Try next model
            }
            
            lastError = { model: currentModel, error: errorData.error?.message || response.statusText, status: response.status }
          } catch {
            lastError = { model: currentModel, error: response.statusText, status: response.status }
          }
          continue // Try next model
        }

        // Success! Parse response
        const data = JSON.parse(response.text)
        
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
          console.error(`Invalid response format from ${currentModel}`)
          lastError = { model: currentModel, error: "Invalid response format" }
          continue // Try next model
        }

        // Format the response for better display
        const rawResponse = data.choices[0].message.content
        const formattedResponse = formatResponse(rawResponse)

        console.info("Chat completion successful", {
          model: currentModel,
          attemptedModels,
          messagesCount: messages.length,
          durationMs: Date.now() - start,
          tokensUsed: data.usage?.total_tokens || undefined
        })

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
          headers: {
            "X-Model-Used": currentModel,
          }
        })

      } catch (error) {
        console.error(`Exception with ${currentModel}:`, error)
        lastError = { 
          model: currentModel, 
          error: error instanceof Error ? error.message : "Unknown error" 
        }
        // Continue to next model
      }
    }

    // All models failed
    console.error("All models failed", { attemptedModels, lastError })
    
    return NextResponse.json({
      success: false,
      error: "All available models are currently unavailable. Please try again in a few moments.",
      details: {
        attemptedModels,
        lastError: lastError?.error || "Unknown error"
      }
    }, { status: 503 })

  } catch (error) {
    console.error("Chat API Error:", error)
    
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate response. Please try again.",
        _metadata: {
          timestamp: new Date().toISOString(),
          errorType: error instanceof Error ? error.name : "Unknown",
          errorMessage: error instanceof Error ? error.message : "Unknown error"
        }
      },
      { status: 500 },
    )
  }
}