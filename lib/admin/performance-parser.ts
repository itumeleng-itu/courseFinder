/**
 * Performance report PDF parser — extracts school performance data
 * using OpenRouter (Gemini) from raw PDF text.
 * 
 * Handles large documents by chunking text by province sections.
 */

import type { SchoolPerformance } from "./validators"

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || ""
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

const PARSING_MODELS = [
  "google/gemini-2.0-flash-exp:free",
  "google/gemini-flash-1.5:free",
  "meta-llama/llama-3.2-3b-instruct:free",
]

const PROVINCES = [
  "EASTERN CAPE",
  "FREE STATE",
  "GAUTENG",
  "KWAZULU-NATAL",
  "LIMPOPO",
  "MPUMALANGA",
  "NORTHERN CAPE",
  "NORTH WEST",
  "WESTERN CAPE",
]

/**
 * Split performance report text into province-based chunks.
 */
function splitByProvince(text: string): Map<string, string> {
  const chunks = new Map<string, string>()

  // Try to find province sections
  for (let i = 0; i < PROVINCES.length; i++) {
    const province = PROVINCES[i]
    const nextProvince = PROVINCES[i + 1]

    // Find start of this province's data
    const startPattern = new RegExp(`${province}\\s*\\n`, "i")
    const startMatch = text.match(startPattern)

    if (!startMatch || startMatch.index === undefined) continue

    let endIndex = text.length
    if (nextProvince) {
      // Find where next province starts
      const endPattern = new RegExp(`\\n\\s*${nextProvince}\\s*\\n`, "i")
      const endMatch = text.slice(startMatch.index + startMatch[0].length).match(endPattern)
      if (endMatch && endMatch.index !== undefined) {
        endIndex = startMatch.index + startMatch[0].length + endMatch.index
      }
    }

    const chunk = text.slice(startMatch.index, endIndex)
    if (chunk.trim().length > 50) {
      chunks.set(province, chunk)
    }
  }

  // If no province sections found, use the whole text as a single chunk
  if (chunks.size === 0) {
    chunks.set("ALL", text)
  }

  return chunks
}

function buildPerformancePrompt(chunkText: string, province: string): string {
  return `Extract ALL school performance data from this South African NSC School Performance Report section.
${province !== "ALL" ? `This section is for: ${province}` : ""}

Return a JSON ARRAY of school objects with this EXACT schema:

[
  {
    "district": "DISTRICT NAME IN CAPS",
    "emis": "200500039",
    "centreNo": "4241001",
    "name": "School Name",
    "quintile": "3",
    "results": {
      "2023": {
        "progressed": "4",
        "wrote": "274",
        "achieved": "236",
        "percentage": "86.1"
      },
      "2024": {
        "progressed": "9",
        "wrote": "352",
        "achieved": "308",
        "percentage": "87.5"
      },
      "2025": {
        "progressed": "16",
        "wrote": "358",
        "achieved": "333",
        "percentage": "93.0"
      }
    }
  }
]

RULES:
1. Extract EVERY school listed. Do not skip any.
2. ALL numeric values must be STRINGS (wrapped in quotes).
3. The "district" field should be in UPPERCASE.
4. Include ALL years shown for each school (typically 3 years).
5. If a value is missing or blank, use "0".
6. The "quintile" should be "1"-"5" or "99" for independent/special schools.
7. Return ONLY the JSON array. No markdown, no explanation.
8. Preserve exact school names as they appear.

REPORT DATA:
${chunkText.slice(0, 80000)}`
}

async function callOpenRouter(prompt: string): Promise<{
  success: boolean
  data?: string
  error?: string
  model?: string
}> {
  if (!OPENROUTER_API_KEY) {
    return { success: false, error: "OpenRouter API key not configured" }
  }

  for (const model of PARSING_MODELS) {
    try {
      const response = await fetch(OPENROUTER_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://coursefinder-sa.vercel.app",
          "X-Title": "CourseFinder SA Admin",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "system",
              content:
                "You are a precise data extraction assistant. Extract tabular school performance data into JSON arrays. Output ONLY valid JSON.",
            },
            { role: "user", content: prompt },
          ],
          temperature: 0.05,
          max_tokens: 16384,
        }),
      })

      if (!response.ok) {
        if (response.status === 429 || response.status === 503) continue
        continue
      }

      const result = await response.json()
      const content = result.choices?.[0]?.message?.content
      if (!content) continue

      return { success: true, data: content, model }
    } catch (error) {
      console.error(`Model ${model} failed:`, error)
      continue
    }
  }

  return { success: false, error: "All AI models failed" }
}

function cleanJsonResponse(raw: string): string {
  let jsonStr = raw.trim()
  if (jsonStr.startsWith("```json")) jsonStr = jsonStr.slice(7)
  else if (jsonStr.startsWith("```")) jsonStr = jsonStr.slice(3)
  if (jsonStr.endsWith("```")) jsonStr = jsonStr.slice(0, -3)
  return jsonStr.trim()
}

/**
 * Parse performance report PDF text into structured school data.
 * Processes large reports by splitting into province chunks.
 */
export async function parsePerformanceReport(
  pdfText: string,
  onProgress?: (province: string, index: number, total: number) => void
): Promise<{
  success: boolean
  data?: SchoolPerformance[]
  errors: string[]
  stats: {
    totalSchools: number
    provincesProcessed: number
    provincesTotal: number
    model?: string
  }
}> {
  if (!pdfText || pdfText.trim().length < 100) {
    return {
      success: false,
      errors: ["PDF text is too short or empty"],
      stats: { totalSchools: 0, provincesProcessed: 0, provincesTotal: 0 },
    }
  }

  const chunks = splitByProvince(pdfText)
  const allSchools: SchoolPerformance[] = []
  const errors: string[] = []
  let processedCount = 0
  let lastModel: string | undefined

  const entries = Array.from(chunks.entries())

  for (let i = 0; i < entries.length; i++) {
    const [province, chunkText] = entries[i]
    onProgress?.(province, i + 1, entries.length)

    const prompt = buildPerformancePrompt(chunkText, province)
    const result = await callOpenRouter(prompt)

    if (!result.success || !result.data) {
      errors.push(`Failed to parse ${province}: ${result.error || "No response"}`)
      continue
    }

    lastModel = result.model

    try {
      const jsonStr = cleanJsonResponse(result.data)
      const schools = JSON.parse(jsonStr) as SchoolPerformance[]

      if (!Array.isArray(schools)) {
        errors.push(`${province}: Response was not an array`)
        continue
      }

      allSchools.push(...schools)
      processedCount++
    } catch (parseError) {
      errors.push(
        `${province}: JSON parse error — ${parseError instanceof Error ? parseError.message : "Unknown"}`
      )
    }

    // Rate limit: small delay between chunks
    if (i < entries.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }

  return {
    success: allSchools.length > 0,
    data: allSchools.length > 0 ? allSchools : undefined,
    errors,
    stats: {
      totalSchools: allSchools.length,
      provincesProcessed: processedCount,
      provincesTotal: entries.length,
      model: lastModel,
    },
  }
}

/**
 * Merge new performance data with existing data (rolling 3-year window).
 */
export function mergePerformanceData(
  existing: SchoolPerformance[],
  incoming: SchoolPerformance[],
  maxYears: number = 3
): SchoolPerformance[] {
  // Build a map of existing schools by EMIS
  const schoolMap = new Map<string, SchoolPerformance>()

  for (const school of existing) {
    schoolMap.set(school.emis, { ...school, results: { ...school.results } })
  }

  // Merge incoming data
  for (const school of incoming) {
    const existing = schoolMap.get(school.emis)

    if (existing) {
      // Merge results (new years override old ones)
      for (const [year, result] of Object.entries(school.results)) {
        existing.results[year] = result
      }

      // Update other fields if they've changed
      existing.district = school.district || existing.district
      existing.name = school.name || existing.name
      existing.quintile = school.quintile || existing.quintile
      existing.centreNo = school.centreNo || existing.centreNo
    } else {
      // New school
      schoolMap.set(school.emis, { ...school, results: { ...school.results } })
    }
  }

  // Apply rolling window — keep only the latest N years
  const result: SchoolPerformance[] = []

  for (const school of schoolMap.values()) {
    const years = Object.keys(school.results).sort()

    if (years.length > maxYears) {
      const keepYears = years.slice(-maxYears)
      const trimmedResults: typeof school.results = {}
      for (const year of keepYears) {
        trimmedResults[year] = school.results[year]
      }
      school.results = trimmedResults
    }

    result.push(school)
  }

  // Sort by district, then school name
  result.sort((a, b) => {
    const distCmp = a.district.localeCompare(b.district)
    if (distCmp !== 0) return distCmp
    return a.name.localeCompare(b.name)
  })

  return result
}
