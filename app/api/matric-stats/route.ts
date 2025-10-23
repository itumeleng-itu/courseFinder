import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI("AIzaSyDW8jnKLbIJAZ0GXQlDxqSGYpqdc-iaBFA")

const FALLBACK_DATA = {
  nationalPassRate: 82.9,
  provinces: [
    { province: "Gauteng", passRate: 87.3, rank: 1 },
    { province: "Western Cape", passRate: 84.6, rank: 2 },
    { province: "Free State", passRate: 83.5, rank: 3 },
    { province: "North West", passRate: 81.2, rank: 4 },
    { province: "Mpumalanga", passRate: 80.7, rank: 5 },
    { province: "KwaZulu-Natal", passRate: 80.3, rank: 6 },
    { province: "Northern Cape", passRate: 79.1, rank: 7 },
    { province: "Limpopo", passRate: 77.6, rank: 8 },
    { province: "Eastern Cape", passRate: 75.4, rank: 9 },
  ],
  year: 2023,
}

export async function GET() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `Provide the 2023 South African matric pass rates in JSON format with this exact structure:
{
  "nationalPassRate": number,
  "provinces": [
    {"province": "Province Name", "passRate": number, "rank": number}
  ],
  "year": 2023
}

Include all 9 provinces: Gauteng, Western Cape, KwaZulu-Natal, Eastern Cape, Limpopo, Mpumalanga, North West, Free State, Northern Cape.
Rank them from highest to lowest pass rate (rank 1 = highest).
Use the official 2023 data. Only return valid JSON, no other text.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("No valid JSON in response")
    }

    const data = JSON.parse(jsonMatch[0])

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
      },
    })
  } catch (error) {
    console.error("Matric Stats API Error:", error)
    // Return fallback data
    return NextResponse.json(FALLBACK_DATA, {
      headers: {
        "Cache-Control": "public, s-maxage=3600",
      },
    })
  }
}
