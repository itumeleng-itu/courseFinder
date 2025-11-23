import { NextResponse } from "next/server"
import { validateMatricResults, type Subject, getOfficialSubjects } from "@/lib/matric-validation"
import { HOME_LANGUAGES, FIRST_ADDITIONAL_LANGUAGES } from "@/lib/utils/subject-validator"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const API_KEY = process.env.ocrSpaceApiKey || process.env.OCRSPACE_API_KEY || process.env.OCR_SPACE_API_KEY

    if (!API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing OCR.space API key",
          inDevelopment: true,
          message: "Configure ocrSpaceApiKey in .env.local",
        },
        { status: 200 },
      )
    }

    const formData = await request.formData()
    const single = formData.get("file") as File | null
    const multiple = formData.getAll("files").filter((f) => f instanceof File) as File[]
    const files: File[] = [...multiple, ...(single ? [single] : [])]

    if (files.length === 0) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 })
    }

    const requestedLang = (formData.get("language") as string | null) || "eng"
    const results: { text: string; meanConfidence?: number; searchablePdfUrl?: string }[] = []

    for (const file of files) {
      const fd = new FormData()
      fd.append("apikey", API_KEY)
      fd.append("language", requestedLang === "auto" ? "eng" : requestedLang)
      fd.append("isOverlayRequired", "true")
      fd.append("OCREngine", "2")
      const buf = Buffer.from(await file.arrayBuffer())
      const upload = new File([buf], file.name, { type: file.type || "application/octet-stream" })
      fd.append("file", upload)

      const resp = await fetch("https://api.ocr.space/parse/image", {
        method: "POST",
        body: fd,
      })

      if (!resp.ok) {
        const msg = `OCR.space request failed: ${resp.status}`
        return NextResponse.json({ success: false, error: msg }, { status: 502 })
      }

      let json = await resp.json()
      if (requestedLang === "auto" && (!json?.ParsedResults || (json.ParsedResults[0]?.MeanConfidence ?? 0) < 60)) {
        const fd2 = new FormData()
        fd2.append("apikey", API_KEY)
        fd2.append("language", "afr")
        fd2.append("isOverlayRequired", "true")
        fd2.append("OCREngine", "2")
        fd2.append("file", upload)
        const resp2 = await fetch("https://api.ocr.space/parse/image", { method: "POST", body: fd2 })
        if (resp2.ok) json = await resp2.json()
      }
      if (json?.IsErroredOnProcessing) {
        const detail = json?.ErrorMessage || json?.ErrorDetails || "Unknown OCR.space error"
        return NextResponse.json({ success: false, error: String(detail) }, { status: 502 })
      }

      type OCRParsedResult = {
        ParsedText?: string
        MeanConfidence?: number
        SearchablePDFURL?: string
      }
      const rawParsed = Array.isArray(json?.ParsedResults) ? (json.ParsedResults as unknown[]) : []
      const parsed: OCRParsedResult[] = rawParsed.map((p) => {
        const obj = p as Record<string, unknown>
        return {
          ParsedText: typeof obj.ParsedText === "string" ? obj.ParsedText : undefined,
          MeanConfidence: typeof obj.MeanConfidence === "number" ? obj.MeanConfidence : undefined,
          SearchablePDFURL: typeof obj.SearchablePDFURL === "string" ? obj.SearchablePDFURL : undefined,
        }
      })
      const combinedText = parsed.map((p) => String(p.ParsedText || "")).join("\n\n")
      const meanConfidence = parsed.reduce((acc: number, p) => acc + Number(p.MeanConfidence || 0), 0) / (parsed.length || 1)
      const searchablePdfUrl = (json as Record<string, unknown>)?.SearchablePDFURL as string | undefined || parsed.find((p) => p.SearchablePDFURL)?.SearchablePDFURL
      results.push({ text: combinedText, meanConfidence: Number.isFinite(meanConfidence) ? meanConfidence : undefined, searchablePdfUrl })
    }

    const fullText = results.map((r) => r.text).join("\n\n")
    const extracted = extractSubjects(fullText)
    const subjects = applyNSCRules(extracted)
    const validation = validateMatricResults(subjects)

    const confidence = average(
      results
        .map((r) => r.meanConfidence)
        .filter((x): x is number => typeof x === "number" && Number.isFinite(x)),
    )

    if (!subjects.length) {
      return NextResponse.json({
        success: false,
        error: "No subjects extracted",
        rawText: fullText,
        confidence,
        pagesProcessed: results.length,
        searchablePdfUrl: results.find((r) => r.searchablePdfUrl)?.searchablePdfUrl || null,
      })
    }
    return NextResponse.json({
      success: true,
      subjects,
      confidence,
      pagesProcessed: results.length,
      searchablePdfUrl: results.find((r) => r.searchablePdfUrl)?.searchablePdfUrl || null,
      validation,
    })
  } catch {
  return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
}
}

function average(nums: number[]): number | undefined {
  if (!nums.length) return undefined
  return nums.reduce((a, b) => a + b, 0) / nums.length
}

function extractSubjects(text: string): Subject[] {
  const official = getOfficialSubjects()
  const names = Object.values(official).flat()
  const textLower = text.toLowerCase()
  const percentRe = /(?:(?:score|mark|percent(?:age)?)\s*[:\-]?\s*)?(\d{1,3})\s*%/i
  const numberRe = /(?:\b|\s)(\d{1,3})(?:\s*\/\s*100)?\b/

  const synMap: Record<string, string> = {
    "english hl": "English Home Language",
    "afrikaans hl": "Afrikaans Home Language",
    "english fal": "English First Additional Language",
    "afrikaans fal": "Afrikaans First Additional Language",
    "maths": "Mathematics",
    "physical science": "Physical Sciences",
    "life science": "Life Sciences",
  }

  const candidates: Array<{ pattern: string; canonical: string }> = []
  for (const n of names) candidates.push({ pattern: n.toLowerCase(), canonical: normalizeSubjectName(n) })
  for (const [k, v] of Object.entries(synMap)) candidates.push({ pattern: k, canonical: v })

  const found: Subject[] = []

  for (const c of candidates) {
    let idx = textLower.indexOf(c.pattern)
    while (idx >= 0) {
      const start = Math.max(0, idx)
      const end = Math.min(text.length, idx + 200)
      const slice = text.slice(start, end)
      let pct: number | null = null
      const m1 = slice.match(percentRe)
      if (m1) {
        const v = Number(m1[1])
        if (!Number.isNaN(v) && v >= 0 && v <= 100) pct = v
      }
      if (pct === null) {
        const m2 = slice.match(numberRe)
        if (m2) {
          const v = Number(m2[1])
          if (!Number.isNaN(v) && v >= 0 && v <= 100) pct = v
        }
      }
      if (pct !== null) {
        found.push({ name: c.canonical, percentage: pct })
      }
      idx = textLower.indexOf(c.pattern, idx + c.pattern.length)
    }
  }

  if (!found.length) {
    const lines = text.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length)
    for (const line of lines) {
      const norm = line.replace(/\s{2,}/g, " ")
      const matchName = names.find((n) => norm.toLowerCase().includes(n.toLowerCase()))
      if (!matchName) continue
      let pct: number | null = null
      const m1 = norm.match(percentRe)
      if (m1) {
        const v = Number(m1[1])
        if (!Number.isNaN(v) && v >= 0 && v <= 100) pct = v
      }
      if (pct === null) {
        const m2 = norm.match(numberRe)
        if (m2) {
          const v = Number(m2[1])
          if (!Number.isNaN(v) && v >= 0 && v <= 100) pct = v
        }
      }
      if (pct !== null) {
        found.push({ name: normalizeSubjectName(matchName), percentage: pct })
      }
    }
  }

  const dedup = new Map<string, Subject>()
  for (const s of found) {
    const k = s.name
    const prev = dedup.get(k)
    if (!prev || s.percentage > prev.percentage) dedup.set(k, s)
  }
  return Array.from(dedup.values())
}

function normalizeSubjectName(name: string): string {
  const map: Record<string, string> = {
    "English HL": "English Home Language",
    "Afrikaans HL": "Afrikaans Home Language",
    "English FAL": "English First Additional Language",
    "Afrikaans FAL": "Afrikaans First Additional Language",
    "Zulu Home Language": "IsiZulu Home Language",
    "Maths": "Mathematics",
    "Physical Science": "Physical Sciences",
    "Life Science": "Life Sciences",
  }
  return map[name] || name
}

function applyNSCRules(subjects: Subject[]): Subject[] {
  const byName = new Map<string, Subject>()
  for (const s of subjects) {
    const k = s.name
    const prev = byName.get(k)
    if (!prev || s.percentage > prev.percentage) byName.set(k, s)
  }
  const unique = Array.from(byName.values())

  const isHL = (n: string) => HOME_LANGUAGES.includes(n)
  const isFAL = (n: string) => FIRST_ADDITIONAL_LANGUAGES.includes(n)
  const isMath = (n: string) => n === "Mathematics"
  const isMathLit = (n: string) => n === "Mathematical Literacy"
  const isLO = (n: string) => n === "Life Orientation"
  const isEngAfr = (n: string) => /English|Afrikaans/i.test(n)

  const hlCandidates = unique.filter((s) => isHL(s.name)).sort((a, b) => b.percentage - a.percentage)
  const falCandidates = unique.filter((s) => isFAL(s.name)).sort((a, b) => b.percentage - a.percentage)
  const mathCandidates = unique.filter((s) => isMath(s.name) || isMathLit(s.name)).sort((a, b) => b.percentage - a.percentage)
  const loCandidates = unique.filter((s) => isLO(s.name)).sort((a, b) => b.percentage - a.percentage)

  const hl: Subject | undefined = hlCandidates.find((s) => s.percentage >= 40) || hlCandidates[0]
  const fal: Subject | undefined = falCandidates.find((s) => isEngAfr(s.name)) || falCandidates[0]
  const mathOrLit: Subject | undefined = mathCandidates[0]
  const lo: Subject | undefined = loCandidates[0]

  const takenNames = new Set<string>([hl?.name || "", fal?.name || "", mathOrLit?.name || "", lo?.name || ""]) 
  takenNames.delete("")

  const electivesPool = unique
    .filter((s) => !takenNames.has(s.name))
    .sort((a, b) => b.percentage - a.percentage)

  const selected: Subject[] = []
  if (hl) selected.push(hl)
  if (fal) selected.push(fal)
  if (mathOrLit) selected.push(mathOrLit)
  if (lo) selected.push(lo)

  for (const s of electivesPool) {
    if (selected.length >= 7) break
    selected.push(s)
  }

  if (selected.length > 7) {
    return selected.slice(0, 7)
  }
  return selected
}
