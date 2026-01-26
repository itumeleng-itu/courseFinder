import { GoogleGenerativeAI } from "@google/generative-ai"
import { FALLBACK_DATA } from "@/data/fallback-matric-stats"

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const genAI = GOOGLE_API_KEY ? new GoogleGenerativeAI(GOOGLE_API_KEY) : null

export async function fetchMatricStatsWithGoogleSearch(modelName: string): Promise<typeof FALLBACK_DATA | null> {
    if (!genAI || !GOOGLE_API_KEY) return null
    try {
        const model = genAI.getGenerativeModel({ model: modelName })
        const prompt = `Search Google for the latest South African matric (NSC) pass rates for 2024 and provide JSON:
    { "national": { "passRate": number, "totalCandidates": number, "totalPassed": number, "year": 2024, "bachelorPassRate": number, "bachelorPasses": number, "distinctions": number }, 
      "provinces": [ { "name": string, "passRate": number, "candidates": number, "bachelorPasses": number, "distinctionRate": number } ] }
    Only return valid JSON.`
        const result = await model.generateContent(prompt)
        const text = result.response.text()
        const jsonMatch = text.match(/\{[\s\S]*\}/)
        return jsonMatch ? JSON.parse(jsonMatch[0]) : null
    } catch (error) {
        console.error("Gemini stats fetch error:", error)
        return null
    }
}
