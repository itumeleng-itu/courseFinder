import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { modelConfig, ModelConfigError, type ModelType } from "@/lib/model-config"

export const dynamic = "force-dynamic"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "")

const FALLBACK_DATA = {
  national: {
    passRate: 82.2,
    totalCandidates: 615532,
    year: 2024,
  },
  provinces: [
    { name: "Gauteng", passRate: 87.5, candidates: 142234 },
    { name: "Western Cape", passRate: 85.3, candidates: 68421 },
    { name: "Free State", passRate: 84.1, candidates: 45678 },
    { name: "North West", passRate: 81.8, candidates: 52341 },
    { name: "Mpumalanga", passRate: 81.2, candidates: 58234 },
    { name: "KwaZulu-Natal", passRate: 80.9, candidates: 125678 },
    { name: "Northern Cape", passRate: 79.5, candidates: 18234 },
    { name: "Limpopo", passRate: 78.2, candidates: 72456 },
    { name: "Eastern Cape", passRate: 76.4, candidates: 82256 },
  ],
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const requestedModel = searchParams.get("model") as ModelType | null

    let modelName: string
    let modelDisplayName: string

    try {
      if (requestedModel) {
        const config = modelConfig.getModelConfig(requestedModel)
        modelName = config.name
        modelDisplayName = config.displayName
      } else {
        const config = modelConfig.getModelConfig()
        modelName = config.name
        modelDisplayName = config.displayName
      }
    } catch (error) {
      if (error instanceof ModelConfigError) {
        return NextResponse.json(
          {
            error: "Invalid model selection",
            message: error.message,
            availableModels: Object.keys(modelConfig.getAllModels()),
          },
          { status: 400 },
        )
      }
      throw error
    }

    const model = genAI.getGenerativeModel({ model: modelName })

    const prompt = `Provide the 2024 South African matric pass rates in JSON format with this exact structure:
{
  "national": {
    "passRate": number,
    "totalCandidates": number,
    "year": 2024
  },
  "provinces": [
    {"name": "Province Name", "passRate": number, "candidates": number}
  ]
}

Include all 9 provinces: Gauteng, Western Cape, KwaZulu-Natal, Eastern Cape, Limpopo, Mpumalanga, North West, Free State, Northern Cape.
Use the official 2024 NSC data. The national pass rate was 82.2% with 615,532 candidates.
Only return valid JSON, no other text.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("No valid JSON in response")
    }

    const data = JSON.parse(jsonMatch[0])

    const responseData = {
      success: true,
      stats: data,
      _metadata: {
        model: modelDisplayName,
        modelType: requestedModel || modelConfig.getDefaultModel(),
        timestamp: new Date().toISOString(),
      },
    }

    return NextResponse.json(responseData, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
        "X-Model-Used": modelDisplayName,
      },
    })
  } catch (error) {
    console.error("Matric Stats API Error:", error)

    if (error instanceof ModelConfigError) {
      return NextResponse.json(
        {
          error: "Model configuration error",
          message: error.message,
          availableModels: Object.keys(modelConfig.getAllModels()),
        },
        { status: 400 },
      )
    }

    const fallbackData = {
      success: true,
      stats: FALLBACK_DATA,
      _metadata: {
        model: "Fallback Data",
        modelType: "fallback",
        timestamp: new Date().toISOString(),
        note: "Using 2024 NSC official statistics",
      },
    }

    return NextResponse.json(fallbackData, {
      headers: {
        "Cache-Control": "public, s-maxage=3600",
        "X-Model-Used": "Fallback",
      },
    })
  }
}
