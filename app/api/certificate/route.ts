import { type NextRequest, NextResponse } from "next/server"

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || ""

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

// 13 free vision-capable models available on OpenRouter (in priority order)
// Cascading fallback system: tries each model in sequence until one succeeds
// Models are ordered by reliability and vision capability
const VISION_MODELS = [
  // Google Gemini models (excellent vision capabilities, highest priority)
  "google/gemini-2.0-flash-exp:free",
  "google/gemini-flash-1.5:free",
  "google/gemini-pro-vision:free",
  "google/gemini-1.5-flash:free",

  // Qwen models (strong vision performance)
  "qwen/qwen-2-vl-7b-instruct:free",
  "qwen/qwen-vl-plus:free",

  // Llama models with vision capabilities
  "meta-llama/llama-3.2-11b-vision-instruct:free",
  "meta-llama/llama-3.1-8b-instruct:free",

  // Mistral models (some support vision)
  "mistralai/mistral-7b-instruct:free",

  // Additional free vision models
  "deepseek/deepseek-v2:free",
  "perplexity/llama-3.1-sonar-large-128k-online:free",
  "anthropic/claude-3-haiku:free",
  "openai/gpt-4o-mini:free", // GPT-4o mini with vision support
]

type ChatCompletion = {
  choices?: Array<{
    message?: {
      content?: string
    }
  }>
}

interface ExtractedSubject {
  name: string
  percentage: number
}

async function makeOpenRouterRequest(model: string, imageBase64: string, mimeType: string) {
  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "HTTP-Referer": "https://coursefinder-sa.vercel.app",
      "X-Title": "CourseFinder SA",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are analyzing a South African National Senior Certificate (Matric Certificate).

Extract ALL subjects and their percentage marks from this certificate.

Return ONLY a valid JSON array in this exact format, with no additional text or explanation:

[
  {"name": "Mathematics", "percentage": 85},
  {"name": "English Home Language", "percentage": 72}
]

Important guidelines:
- Include ALL subjects shown on the certificate (typically 7 subjects)
- Use the full subject names (e.g., "Mathematics", "Physical Sciences", "Life Sciences")
- For languages, include "Home Language" or "First Additional Language" in the name
- Extract only the final percentage mark (not the symbol like "A" or "B")
- If you see both a percentage and a symbol, use the percentage
- Ensure the percentage is a number between 0 and 100
- If a subject or percentage is unclear, make your best estimation
- Return ONLY the JSON array, no other text`,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${imageBase64}`,
              },
            },
          ],
        },
      ],
      temperature: 0.1,
      max_tokens: 1000,
    }),
  })

  return {
    ok: response.ok,
    status: response.status,
    text: await response.text(),
  }
}

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("certificate") as File

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 })
    }

    if (!OPENROUTER_API_KEY) {
      console.error("[certificate] OPENROUTER_API_KEY is not set")
      return NextResponse.json({ success: false, error: "Server configuration error" }, { status: 500 })
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = buffer.toString("base64")
    const mimeType = file.type || "image/jpeg"



    let lastError: string | null = null
    const attemptedModels: string[] = []

    // Try each vision model in sequence until one succeeds
    for (const model of VISION_MODELS) {
      try {
        attemptedModels.push(model)


        const response = await makeOpenRouterRequest(model, base64Image, mimeType)

        if (!response.ok) {
          console.warn(`[certificate] Model ${model} failed with status: ${response.status}`)
          lastError = `Model ${model} failed with status ${response.status}`

          // If it's a rate limit (429), continue to next model
          if (response.status === 429) {

            continue
          }

          // If it's a 400/401, the model might not support vision or API key issue
          if (response.status === 400 || response.status === 401) {
            console.warn(`[certificate] Model ${model} may not support vision or API key issue, trying next...`)
            continue
          }

          continue
        }

        let data: ChatCompletion
        try {
          data = JSON.parse(response.text) as ChatCompletion
        } catch {
          console.error(`[certificate] Failed to parse response from ${model}:`, response.text.slice(0, 200))
          lastError = "Invalid JSON response"
          continue
        }

        if (!data.choices?.[0]?.message?.content) {
          console.error(`[certificate] Invalid response format from ${model}`)
          lastError = "Invalid response format"
          continue
        }

        const text = data.choices[0].message.content.trim()


        // Parse the AI response
        let subjectsData: unknown
        try {
          // Try to extract JSON from the response
          const jsonMatch = text.match(/\[[\s\S]*\]/)
          if (jsonMatch) {
            subjectsData = JSON.parse(jsonMatch[0])
          } else {
            subjectsData = JSON.parse(text)
          }

          // Validate the structure
          if (!Array.isArray(subjectsData)) {
            throw new Error("Response is not an array")
          }

          // Validate each subject
          const isExtractedSubject = (subject: unknown): subject is ExtractedSubject => {
            if (!subject || typeof subject !== "object") return false
            const obj = subject as Record<string, unknown>
            return (
              typeof obj.name === "string" &&
              obj.name.length > 0 &&
              typeof obj.percentage === "number" &&
              (obj.percentage as number) >= 0 &&
              (obj.percentage as number) <= 100
            )
          }
          const subjects = (subjectsData as unknown[]).filter(isExtractedSubject)

          if (subjects.length === 0) {
            throw new Error("No valid subjects found")
          }



          return NextResponse.json({
            success: true,
            subjects: subjects.map((s: ExtractedSubject, index: number) => ({
              id: Date.now().toString() + index,
              name: s.name,
              percentage: s.percentage,
            })),
            modelUsed: model,
            attemptNumber: attemptedModels.length,
          })
        } catch (parseError) {
          console.error(`[certificate] Failed to parse AI response from ${model}:`, text.slice(0, 200))
          lastError = `Failed to parse response: ${parseError instanceof Error ? parseError.message : "Unknown parse error"}`
          continue
        }
      } catch (error) {
        console.error(`[certificate] Error with model ${model}:`, error)
        lastError = error instanceof Error ? error.message : "Unknown error"
        continue
      }
    }

    // All models failed
    console.error(`[certificate] ❌ All ${VISION_MODELS.length} vision models failed. Last error: ${lastError}`)
    console.error(`[certificate] Attempted models: ${attemptedModels.join(", ")}`)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to extract subjects from certificate. The image may be unclear or not a valid certificate.",
        details: `Tried ${attemptedModels.length} models. Last error: ${lastError}`,
        attemptedModels: attemptedModels.length,
      },
      { status: 422 },
    )
  } catch (error: unknown) {
    console.error("[certificate] Certificate extraction error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to process certificate",
      },
      { status: 500 },
    )
  }
}

