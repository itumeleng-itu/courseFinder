import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// OpenRouter API configuration
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || ""
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

export async function POST(request: Request) {
  try {
    const { message, conversationHistory = [], model } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ error: "Server is not configured with OpenRouter API key" }, { status: 500 })
    }

    const selectedModel = model || "google/gemini-2.0-flash-exp:free"

    // Build messages array for OpenRouter API
    const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = []
    
    // Add system prompt
    messages.push({
      role: "system",
      content: `You are an expert educational advisor specializing in South African universities and their admission requirements. 

You have comprehensive knowledge about:
- All 26 South African universities (Wits, UCT, UP, Stellenbosch, UJ, UKZN, etc.)
- APS (Admission Point Score) calculation and requirements
- Faculty programs and courses at each university
- Admission requirements including minimum APS, subject requirements, and NBT scores
- Application processes and deadlines
- Bursary and financial aid options
- Career paths and course outcomes

Your role is to:
1. Help students understand APS calculations and requirements
2. Guide them in choosing suitable courses based on their scores
3. Provide accurate information about university requirements
4. Suggest alternative options when students don't meet requirements
5. Explain the differences between universities and their programs
6. Be encouraging and supportive while being realistic about requirements

Always provide specific, actionable advice. When discussing APS requirements, be precise. If you don't have exact information, say so rather than guessing.
Properly structure your reply, do not reply in a paragraph and mix information.
Keep responses concise but informative. Use a friendly, supportive tone.`
    })

    // Add conversation history
    conversationHistory.forEach((msg: any) => {
      messages.push({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: String(msg.content || "")
      })
    })

    // Add current user message
    messages.push({
      role: "user",
      content: String(message)
    })

    const start = Date.now()
    // Make request to OpenRouter API
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://coursefinder-sa.vercel.app", // Your site URL
        "X-Title": "CourseFinder SA", // Your site name
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: selectedModel,
        messages,
        temperature: 0.7,
        max_tokens: 4096
      })
    })

    // Rate limit / error handling
    if (response.status === 429) {
      const errText = await response.text()
      console.warn("OpenRouter rate limit", { status: 429, body: errText?.slice(0, 200) })
      return NextResponse.json({
        success: false,
        error: "Rate limit exceeded. Please wait a moment and try again.",
      }, { status: 429 })
    }

    if (!response.ok) {
      const errText = await response.text()
      console.error("OpenRouter API error", { status: response.status, statusText: response.statusText, body: errText?.slice(0, 200) })
      return NextResponse.json({ success: false, error: `OpenRouter API error: ${response.status} ${response.statusText}` }, { status: 502 })
    }

    const data = await response.json()
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("Invalid OpenRouter response format", { keys: Object.keys(data || {}) })
      return NextResponse.json({ success: false, error: "Invalid response format from OpenRouter API" }, { status: 502 })
    }

    const assistantResponse = data.choices[0].message.content

    // Logging successful request
    console.info("Chat completion", {
      model: selectedModel,
      messagesCount: messages.length,
      durationMs: Date.now() - start,
      tokensUsed: data.usage?.total_tokens || undefined
    })

    return NextResponse.json({
      success: true,
      response: assistantResponse,
      _metadata: {
        model: selectedModel.includes("gemini") ? "Google Gemini 2.0 Flash" : selectedModel,
        modelType: selectedModel,
        timestamp: new Date().toISOString(),
        tokensUsed: data.usage?.total_tokens || 0
      }
    }, {
      headers: {
        "X-Model-Used": selectedModel,
      }
    })
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
