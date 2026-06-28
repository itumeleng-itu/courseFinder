/**
 * Prospectus PDF parser — extracts structured university data
 * using OpenRouter (Gemini) from raw PDF text with a hierarchical approach.
 */

import { normalizeExtractedSubjectNames, ProspectusData } from "./validators"

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || ""
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

const PARSING_MODELS = [
  "google/gemini-2.0-flash-exp:free",
  "google/gemini-flash-1.5:free",
  "meta-llama/llama-3.2-3b-instruct:free",
]

async function callOpenRouter(
  prompt: string,
  jsonFormat: boolean = true
): Promise<{ success: boolean; data?: string; error?: string; model?: string }> {
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
              content: jsonFormat 
                ? "You are a precise data extraction assistant. You ONLY output valid JSON. No markdown, no explanations."
                : "You are a precise data extraction assistant. You extract structured text exactly as requested.",
            },
            { role: "user", content: prompt },
          ],
          temperature: 0.1,
          max_tokens: 16384,
        }),
      })

      if (!response.ok) {
        if (response.status === 429 || response.status === 503) continue
        const errorText = await response.text()
        console.error(`OpenRouter error (${model}):`, errorText)
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

  return { success: false, error: "All AI models failed to process the document" }
}

function cleanJsonString(jsonStr: string): string {
  let cleaned = jsonStr.trim()
  if (cleaned.startsWith("```json")) cleaned = cleaned.slice(7)
  else if (cleaned.startsWith("```")) cleaned = cleaned.slice(3)
  if (cleaned.endsWith("```")) cleaned = cleaned.slice(0, -3)
  return cleaned.trim()
}

/**
 * PASS 1: Structure Discovery
 */
async function discoverStructure(pdfText: string, hint?: string) {
  // Use first 15k chars for structure discovery to find faculties
  const headText = pdfText.slice(0, 15000)
  const tailText = pdfText.slice(-5000)
  
  const prompt = `Identify the structure of this South African university prospectus.
${hint ? `Hint: This is for ${hint}` : ""}

Analyze the table of contents and introductory pages to find all academic faculties/schools.

Return ONLY a JSON object with this schema:
{
  "id": "short-lowercase-abbreviation (e.g. up, uct, tut)",
  "name": "Full University Name",
  "shortName": "ABBREVIATION",
  "location": {
    "city": "City",
    "province": "Province"
  },
  "faculties": ["Faculty of Science", "Faculty of Engineering", "Faculty of Humanities", "..."],
  "apsRules": {
    "life_orientation": "excluded | capped:4 | included",
    "level_1_exclusion": true,
    "subjects_counted": "all | top_6 | top_7",
    "additional_tests": "none | NBT"
  }
}

PROSPECTUS HEAD:
${headText}

PROSPECTUS TAIL:
${tailText}
`

  const res = await callOpenRouter(prompt, true)
  if (!res.success || !res.data) throw new Error("Failed to discover structure")
  
  try {
    return JSON.parse(cleanJsonString(res.data))
  } catch (e) {
    throw new Error("Invalid JSON in structure discovery")
  }
}

/**
 * PASS 2: Extract Courses (Chunked for full coverage)
 * Splits PDFs > 80k chars into overlapping chunks so no courses are missed.
 */
async function extractCourses(pdfText: string, metadata: any) {
  const CHUNK_SIZE = 75000
  const OVERLAP = 5000

  const chunks: string[] = []
  if (pdfText.length <= CHUNK_SIZE) {
    chunks.push(pdfText)
  } else {
    for (let start = 0; start < pdfText.length; start += CHUNK_SIZE - OVERLAP) {
      chunks.push(pdfText.slice(start, start + CHUNK_SIZE))
      if (start + CHUNK_SIZE >= pdfText.length) break
    }
  }

  const allCourses: any[] = []

  for (let i = 0; i < chunks.length; i++) {
    const prompt = `You are extracting course admissions data from a South African university prospectus.
University: ${metadata.name}${chunks.length > 1 ? ` (chunk ${i + 1}/${chunks.length})` : ""}

EXTRACTION ORDER (follow EXACTLY):
1. Scan the text for every programme/qualification.
2. For EACH programme, extract in this EXACT order:
   a. QUALIFICATION TYPE: "Diploma", "Bachelor of...", "Higher Certificate"
   b. PROGRAMME NAME: Full official name
   c. DURATION: e.g. "3 years"
   d. APS/POINTS: Minimum admission point score (whole number)
   e. SUBJECT REQUIREMENTS TABLE: Read row by row.
      - If ONLY Mathematics is listed → { "Mathematics": level }
      - If "Mathematics OR Mathematical Literacy" → use alternatives format
      - The LEVEL is the NSC achievement level (1-7)
   f. ADDITIONAL REQUIREMENTS: NBT, portfolios, interviews
   g. CAREER OPPORTUNITIES

Return ONLY a JSON object with this schema:
{
  "courses": [
    {
      "id": "uni-prefix-course-slug (e.g. up-bsc-computer-science)",
      "name": "Full Degree/Diploma Name",
      "faculty": "Faculty Name",
      "apsMin": 30,
      "duration": "3 years",
      "subjectRequirements": {
        "English Home Language": 4,
        "Mathematics": {
          "alternatives": [
            { "subject": "Mathematics", "level": 5 },
            { "subject": "Technical Mathematics", "level": 5 },
            { "subject": "Mathematical Literacy", "level": 7 }
          ]
        }
      },
      "careerOpportunities": ["Career 1"],
      "additionalRequirements": ["NBT required"]
    }
  ]
}

RULES:
- Use EXACT South African NSC subject names (e.g. "English Home Language", "Physical Sciences", "Life Orientation")
- APS values MUST be standard 15-42 range. If percentages are shown, convert to 1-7 levels.
- If this chunk contains no course listings, return { "courses": [] }

TEXT TO PROCESS:
${chunks[i]}`

    const res = await callOpenRouter(prompt, true)
    if (!res.success || !res.data) {
      console.warn(`Chunk ${i + 1} extraction failed, skipping`)
      continue
    }

    try {
      const parsed = JSON.parse(cleanJsonString(res.data))
      if (Array.isArray(parsed.courses)) {
        allCourses.push(...parsed.courses)
      }
    } catch (e) {
      console.error(`Chunk ${i + 1} parse error:`, e)
    }
  }

  return allCourses
}

/**
 * Main Export: parseProspectus
 */
export async function parseProspectus(
  pdfText: string,
  universityHint?: string
): Promise<{
  success: boolean
  data?: ProspectusData
  rawResponse?: string
  model?: string
  error?: string
}> {
  if (!pdfText || pdfText.trim().length < 100) {
    return { success: false, error: "PDF text is too short or empty" }
  }

  try {
    // Pass 1: Structure
    const metadata = await discoverStructure(pdfText, universityHint)
    
    // Pass 2: Extract Courses (Since 80k chars covers most standard pdfs, we'll do one large pass for courses,
    // but guided by the structure rules). In a full enterprise app, we'd chunk by faculty.
    let courses = await extractCourses(pdfText, metadata)

    if (!courses || courses.length === 0) {
      return { success: false, error: "No courses extracted" }
    }

    // Pass 3: Validation & Deduplication
    const uniqueCoursesMap = new Map()
    for (const c of courses) {
      // Deduplicate by course name
      const key = c.name.toLowerCase().trim()
      if (!uniqueCoursesMap.has(key)) {
        // Normalize subject names
        const normalizedCourse = normalizeExtractedSubjectNames(c)
        
        // Ensure defaults
        normalizedCourse.id = normalizedCourse.id || `${metadata.id}-course-${uniqueCoursesMap.size}`
        normalizedCourse.faculty = normalizedCourse.faculty || "Unknown"
        normalizedCourse.duration = normalizedCourse.duration || "Not specified"
        normalizedCourse.apsMin = typeof normalizedCourse.apsMin === "number" ? normalizedCourse.apsMin : 0
        
        uniqueCoursesMap.set(key, normalizedCourse)
      }
    }

    const finalData: ProspectusData = {
      id: metadata.id || "uni",
      name: metadata.name || universityHint || "Unknown University",
      shortName: metadata.shortName || "UNI",
      location: metadata.location || { city: "Unknown", province: "Unknown" },
      apsRules: metadata.apsRules,
      courses: Array.from(uniqueCoursesMap.values()),
    }

    return {
      success: true,
      data: finalData,
      model: PARSING_MODELS[0] // Approximation since we used multiple calls
    }

  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown extraction error",
    }
  }
}
