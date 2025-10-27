import type { Course } from "@/lib/types"

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

function buildPrompt(university?: string) {
  const context = university ? `for ${university}` : ""
  return `You are a data extractor. Given South African university prospectus text ${context}, extract an array of courses.
Return strict JSON with key \"courses\".
Each course item fields:
- name (string)
- faculty (string, optional)
- minimumAPS (number, required; if APS not present, estimate conservatively or set 0)
- requirements (string[] optional)
- duration (string optional)
- description (string optional)
Only include undergraduate programs. Ignore duplicates. Keep names concise.`
}

export async function extractCoursesFromText(
  text: string,
  options?: { university?: string }
): Promise<Course[]> {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) throw new Error("Missing OPENROUTER_API_KEY env var")

  const system = buildPrompt(options?.university)

  // Limit text size to avoid token limits
  const MAX_CHARS = 75_000
  const input = text.length > MAX_CHARS ? text.slice(0, MAX_CHARS) : text

  const body = {
    model: "deephermes-3-llama-3-8b-preview:free",
    messages: [
      { role: "system", content: system },
      { role: "user", content: input },
    ],
    response_format: { type: "json_object" },
    temperature: 0.2,
  }

  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const errText = await res.text().catch(() => "")
    throw new Error(`OpenRouter error: ${res.status} ${errText}`)
  }

  const json = await res.json()
  const content = json?.choices?.[0]?.message?.content ?? ""

  let parsed: { courses?: Course[] } = {}
  try {
    parsed = JSON.parse(content)
  } catch {
    throw new Error("Failed to parse LLM JSON output")
  }

  const courses = Array.isArray(parsed.courses) ? parsed.courses : []
  // Basic normalization
  return courses.map((c) => ({
    name: c.name?.trim() || "",
    faculty: c.faculty?.trim(),
    minimumAPS: typeof c.minimumAPS === "number" ? c.minimumAPS : 0,
    requirements: Array.isArray(c.requirements) ? c.requirements : undefined,
    duration: c.duration,
    description: c.description,
  }))
}