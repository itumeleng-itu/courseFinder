/**
 * sync-prospectuses.ts
 *
 * CLI script to download university prospectus PDFs, extract course data
 * via AI, and write the result directly to data/universities/<id>.ts.
 *
 * For EXISTING university files: merges AI-extracted courses with the current
 * _courses array — preserving IDs, subjectRequirements, and all hand-crafted
 * class code (calculateApsScore, website, logo, coordinates, etc.).
 * For NEW universities: generates a full class file.
 *
 * Usage:
 *   npm run sync:prospectus                               # all configured
 *   npm run sync:prospectus -- --university tut           # single
 *   npm run sync:prospectus -- --university tut --url https://...
 *   npm run sync:prospectus -- --dry-run
 *
 * Requires OPENROUTER_API_KEY in .env or .env.local
 */

import fs from "fs/promises"
import path from "path"
import { pathToFileURL } from "url"
import { parseArgs } from "util"
import { createRequire } from "module"

const require = createRequire(import.meta.url)

import { parseProspectus } from "../lib/admin/prospectus-parser"
import {
  generateUniversityTS,
  generateCoursesBlock,
  generateImportLine,
  generateInstanceLine,
} from "../lib/admin/prospectus-generator"
import { PROSPECTUS_URLS } from "./prospectus-urls"
import type { ProspectusData } from "../lib/admin/validators"

const UNIVERSITIES_DIR = path.join(process.cwd(), "data/universities")

// ─── Load env ────────────────────────────────────────────────────────────────

async function loadEnv(): Promise<void> {
  for (const name of [".env.local", ".env"]) {
    try {
      const content = await fs.readFile(path.join(process.cwd(), name), "utf-8")
      for (const line of content.split("\n")) {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith("#")) continue
        const eq = trimmed.indexOf("=")
        if (eq === -1) continue
        const key = trimmed.slice(0, eq).trim()
        const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "")
        if (!process.env[key]) process.env[key] = val
      }
      break
    } catch { /* next */ }
  }
}

// ─── PDF helpers ──────────────────────────────────────────────────────────────

async function downloadPdf(url: string): Promise<Buffer> {
  console.log(`  Downloading: ${url}`)
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; CourseFinder/1.0)" },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`)
  const ct = res.headers.get("content-type") || ""
  if (!ct.includes("pdf") && !ct.includes("octet-stream"))
    throw new Error(`Unexpected content-type "${ct}" — URL may not point to a PDF`)
  return Buffer.from(await res.arrayBuffer())
}

async function extractText(pdfBuffer: Buffer): Promise<string> {
  const { PDFParse } = require("pdf-parse") as {
    PDFParse: new (opts: { data: Buffer }) => {
      load: () => Promise<void>
      getText: () => Promise<{ text: string }>
    }
  }
  const parser = new PDFParse({ data: pdfBuffer })
  await parser.load()
  return (await parser.getText()).text
}

// ─── File helpers ─────────────────────────────────────────────────────────────

async function fileExists(filePath: string): Promise<boolean> {
  try { await fs.access(filePath); return true } catch { return false }
}

// ─── Merge helpers ────────────────────────────────────────────────────────────

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, " ").replace(/\s+/g, " ").trim()
}

type AICourse = ProspectusData["courses"][0]

function existingCourseToAICourse(c: any, universityId: string): AICourse {
  return {
    id: c.id ?? `${universityId}-${normalizeName(c.name).replace(/ /g, "-")}`,
    name: c.name,
    faculty: c.faculty ?? "Other",
    apsMin: c.apsMin ?? c.minimumAPS ?? c.apsRequired ?? 0,
    duration: c.duration ?? "Not specified",
    subjectRequirements: c.subjectRequirements ?? {},
    careerOpportunities: c.careerOpportunities
      ? (Array.isArray(c.careerOpportunities) ? c.careerOpportunities : [c.careerOpportunities])
      : [],
    additionalRequirements: c.additionalRequirements
      ? (Array.isArray(c.additionalRequirements) ? c.additionalRequirements : [c.additionalRequirements])
      : [],
  }
}

function mergeCourses(existing: any[], aiCourses: AICourse[], universityId: string): AICourse[] {
  const existingByName = new Map<string, any>()
  for (const c of existing) existingByName.set(normalizeName(c.name), c)

  const handled = new Set<string>()
  const result: AICourse[] = []

  for (const ai of aiCourses) {
    const key = normalizeName(ai.name)
    const ex = existingByName.get(key)
    if (ex) {
      const hasExSubjects = ex.subjectRequirements && Object.keys(ex.subjectRequirements).length > 0
      result.push({
        ...ai,
        id: ex.id ?? ai.id,
        subjectRequirements: hasExSubjects ? ex.subjectRequirements : ai.subjectRequirements,
      })
      handled.add(key)
    } else {
      result.push(ai)
    }
  }

  // Keep existing courses the AI didn't find (manual additions)
  for (const [key, ex] of existingByName) {
    if (!handled.has(key)) {
      result.push(existingCourseToAICourse(ex, universityId))
    }
  }

  return result
}

// ─── Load existing university courses via dynamic import ──────────────────────

async function loadExistingCourses(id: string): Promise<any[] | null> {
  const filePath = path.join(UNIVERSITIES_DIR, `${id}.ts`)
  if (!await fileExists(filePath)) return null
  try {
    const url = pathToFileURL(filePath).href
    const mod = await import(url)
    for (const val of Object.values(mod)) {
      if (typeof val !== "function") continue
      try {
        const inst = new (val as any)()
        if (Array.isArray(inst.courses) && inst.courses.length > 0) return inst.courses
      } catch { /* not instantiable */ }
    }
    return null
  } catch (err) {
    console.warn(`  Could not import existing file: ${(err as Error).message}`)
    return null
  }
}

// ─── Patch only the _courses array in an existing file ───────────────────────

function findCoursesArrayBounds(content: string): { start: number; end: number } | null {
  const marker = "_courses"
  const markerIdx = content.indexOf(marker)
  if (markerIdx === -1) return null
  // Skip the type annotation bracket (Course[] or Course[]) — find "= [" after the marker
  const assignIdx = content.indexOf("=", markerIdx)
  if (assignIdx === -1) return null
  const arrayOpen = content.indexOf("[", assignIdx)
  if (arrayOpen === -1) return null

  let depth = 0
  let inString = false
  let escape = false
  let quote = ""

  for (let i = arrayOpen; i < content.length; i++) {
    const ch = content[i]
    if (escape) { escape = false; continue }
    if (ch === "\\") { escape = true; continue }
    if (!inString && (ch === '"' || ch === "'" || ch === "`")) {
      inString = true; quote = ch; continue
    }
    if (inString && ch === quote) { inString = false; continue }
    if (inString) continue
    if (ch === "[") depth++
    else if (ch === "]") {
      depth--
      if (depth === 0) return { start: arrayOpen, end: i }
    }
  }
  return null
}

async function patchCoursesArray(filePath: string, courses: AICourse[]): Promise<void> {
  const content = await fs.readFile(filePath, "utf-8")
  const bounds = findCoursesArrayBounds(content)
  if (!bounds) throw new Error("Could not locate _courses array in existing file")

  const newBlock = generateCoursesBlock(courses)
  const patched =
    content.slice(0, bounds.start) +
    `[${newBlock}\n  ]` +
    content.slice(bounds.end + 1)

  await fs.writeFile(filePath, patched, "utf-8")
}

// ─── index.ts updater ─────────────────────────────────────────────────────────

async function updateIndexFile(data: ProspectusData): Promise<void> {
  const indexPath = path.join(UNIVERSITIES_DIR, "index.ts")
  let content = await fs.readFile(indexPath, "utf-8")

  const arrayMatch = content.match(/const\s+instances\s*:\s*BaseUniversity\[\]\s*=\s*\[/)
  if (!arrayMatch) {
    console.warn("  Warning: could not find instances array in index.ts")
    return
  }

  const importLine = generateImportLine(data)
  if (!content.includes(importLine)) {
    const lines = content.split("\n")
    let lastImport = -1
    for (let i = 0; i < lines.length; i++) if (lines[i].startsWith("import ")) lastImport = i
    if (lastImport >= 0) { lines.splice(lastImport + 1, 0, importLine); content = lines.join("\n") }
  }

  const instanceLine = generateInstanceLine(data)
  if (!content.includes(instanceLine.trim())) {
    content = content.replace(arrayMatch[0], `${arrayMatch[0]}\n${instanceLine}`)
  }

  await fs.writeFile(indexPath, content, "utf-8")
  console.log(`  Updated: data/universities/index.ts`)
}

// ─── Core sync ────────────────────────────────────────────────────────────────

async function syncUniversity(id: string, url: string, dryRun: boolean): Promise<boolean> {
  console.log(`\n▶ ${id.toUpperCase()}`)

  // 1. Download
  let pdfBuffer: Buffer
  try {
    pdfBuffer = await downloadPdf(url)
  } catch (err) {
    console.error(`  ✗ Download failed: ${(err as Error).message}`)
    return false
  }
  console.log(`  PDF size: ${(pdfBuffer.length / 1024).toFixed(0)} KB`)

  // 2. Extract text
  let pdfText: string
  try {
    pdfText = await extractText(pdfBuffer)
  } catch (err) {
    console.error(`  ✗ Text extraction failed: ${(err as Error).message}`)
    return false
  }
  console.log(`  Text: ${pdfText.length.toLocaleString()} chars`)

  if (pdfText.trim().length < 100) {
    console.error("  ✗ Too little text — likely a scanned/image-only PDF")
    return false
  }

  // 3. AI parse
  console.log("  Parsing with AI...")
  const result = await parseProspectus(pdfText, id)

  if (!result.success || !result.data) {
    console.error(`  ✗ AI parsing failed: ${result.error}`)
    return false
  }

  const { data } = result
  console.log(`  AI found ${data.courses.length} courses across ${new Set(data.courses.map(c => c.faculty)).size} faculties`)

  if (data.courses.length === 0) {
    console.error("  ✗ No courses extracted — skipping write")
    return false
  }

  const filePath = path.join(UNIVERSITIES_DIR, `${id}.ts`)
  const isNew = !await fileExists(filePath)

  // 4. Merge with existing (if file exists)
  let finalCourses = data.courses
  if (!isNew) {
    const existingCourses = await loadExistingCourses(id)
    if (existingCourses && existingCourses.length > 0) {
      finalCourses = mergeCourses(existingCourses, data.courses, id)
      console.log(`  Merged: ${existingCourses.length} existing + ${data.courses.length} AI → ${finalCourses.length} total`)
    }
  }

  data.courses = finalCourses

  if (dryRun) {
    console.log(`  [dry-run] Would ${isNew ? "create" : "patch"} data/universities/${id}.ts`)
    console.log(`  Courses: ${finalCourses.length}`)
    return true
  }

  // 5. Write
  if (isNew) {
    await fs.writeFile(filePath, generateUniversityTS(data), "utf-8")
    console.log(`  Created: data/universities/${id}.ts`)
    await updateIndexFile(data)
    console.log("  ✓ New university registered")
  } else {
    await patchCoursesArray(filePath, finalCourses)
    console.log(`  Patched: data/universities/${id}.ts (${finalCourses.length} courses)`)
    console.log("  ✓ Updated")
  }
  return true
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  await loadEnv()

  const { values } = parseArgs({
    args: process.argv.slice(2),
    options: {
      university:  { type: "string" },
      universities: { type: "string" },
      url:         { type: "string" },
      "dry-run":   { type: "boolean", default: false },
    },
  })

  const dryRun = values["dry-run"] ?? false

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY && !process.env.OPENROUTER_API_KEY) {
    console.error("Error: No AI key set. Add GOOGLE_GENERATIVE_AI_API_KEY or OPENROUTER_API_KEY to .env")
    process.exit(1)
  }

  const targets: Array<{ id: string; url: string }> = []

  if (values.university) {
    const id = values.university.toLowerCase()
    const url = values.url ?? PROSPECTUS_URLS[id]
    if (!url) {
      console.error(`No URL configured for "${id}". Pass --url or add it to scripts/prospectus-urls.ts`)
      process.exit(1)
    }
    targets.push({ id, url })
  } else if (values.universities) {
    for (const id of values.universities.split(",").map(s => s.trim().toLowerCase())) {
      const url = PROSPECTUS_URLS[id]
      if (!url) { console.error(`No URL configured for "${id}", skipping`); continue }
      targets.push({ id, url })
    }
  } else {
    for (const [id, url] of Object.entries(PROSPECTUS_URLS)) {
      if (url) targets.push({ id, url })
    }
  }

  console.log(`CourseFinder Prospectus Sync${dryRun ? " (DRY RUN)" : ""}`)
  console.log(`Syncing ${targets.length} universit${targets.length === 1 ? "y" : "ies"}\n`)

  const report: Array<{ id: string; status: "ok" | "fail"; detail: string }> = []

  for (const { id, url } of targets) {
    try {
      const ok = await syncUniversity(id, url, dryRun)
      report.push({ id, status: ok ? "ok" : "fail", detail: ok ? "synced" : "see errors above" })
    } catch (err) {
      console.error(`  ✗ Unexpected error: ${err}`)
      report.push({ id, status: "fail", detail: String(err) })
    }
  }

  console.log("\n─────────────────────────────────────")
  console.log("REPORT")
  console.log("─────────────────────────────────────")
  for (const r of report) {
    console.log(`  ${r.status === "ok" ? "✓" : "✗"} ${r.id.toUpperCase().padEnd(12)} ${r.detail}`)
  }
  const ok = report.filter(r => r.status === "ok").length
  console.log(`\n${ok}/${report.length} succeeded`)
}

main().catch((err) => {
  console.error("Fatal:", err)
  process.exit(1)
})
