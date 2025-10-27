import * as cheerio from "cheerio"

function isAbsoluteUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

function toAbsoluteUrl(base: string, href: string): string {
  if (!href) return ""
  if (isAbsoluteUrl(href)) return href
  try {
    const u = new URL(base)
    // Ensure base ends without trailing slash handling
    return new URL(href, u.origin).toString()
  } catch {
    return href
  }
}

function extractYearScore(text: string): number {
  // Prefer years 2018-2030 range; higher is better
  const years = Array.from(text.matchAll(/(20[1-3][0-9])/g)).map((m) => parseInt(m[1], 10))
  if (years.length === 0) return 0
  return Math.max(...years)
}

function heuristicProspectusScore(linkText: string, href: string): number {
  let score = 0
  const s = `${linkText} ${href}`.toLowerCase()
  if (s.includes("prospectus")) score += 50
  if (s.includes("undergraduate")) score += 10
  if (s.includes("202")) score += 5
  if (href.endsWith(".pdf")) score += 20
  score += extractYearScore(s)
  return score
}

export async function findLatestProspectusUrl(website: string): Promise<string | null> {
  try {
    const res = await fetch(website, { headers: { "user-agent": "CourseFinderBot/1.0 (+https://www.coursefind.co.za)" } })
    if (!res.ok) return null
    const html = await res.text()
    const $ = cheerio.load(html)
    const candidates: { url: string; score: number }[] = []

    $("a").each((_, el) => {
      const href = $(el).attr("href") || ""
      const text = $(el).text() || ""
      if (!href) return
      const abs = toAbsoluteUrl(website, href)
      const lower = `${text} ${href}`.toLowerCase()
      if (lower.includes("prospectus") || href.toLowerCase().includes("prospectus")) {
        const score = heuristicProspectusScore(text, href)
        candidates.push({ url: abs, score })
      }
      // Also catch explicit PDF links that might be prospectuses
      if (href.toLowerCase().endsWith(".pdf")) {
        const score = heuristicProspectusScore(text, href) - 10 // penalize if not explicitly prospectus
        candidates.push({ url: abs, score })
      }
    })

    // Additional common paths to probe
    const commonPaths = [
      "/prospectus",
      "/admissions/prospectus",
      "/study/prospectus",
      "/downloads/prospectus",
      "/admissions",
      "/study",
    ]

    for (const path of commonPaths) {
      try {
        const url = new URL(path, new URL(website).origin).toString()
        const r = await fetch(url, { headers: { "user-agent": "CourseFinderBot/1.0" } })
        if (!r.ok) continue
        const h = await r.text()
        const _$ = cheerio.load(h)
        _$("a").each((_, el) => {
          const href = _$(el).attr("href") || ""
          const text = _$(el).text() || ""
          if (!href) return
          const abs = toAbsoluteUrl(url, href)
          const lower = `${text} ${href}`.toLowerCase()
          if (lower.includes("prospectus") || href.toLowerCase().includes("prospectus")) {
            const score = heuristicProspectusScore(text, href)
            candidates.push({ url: abs, score })
          }
          if (href.toLowerCase().endsWith(".pdf")) {
            const score = heuristicProspectusScore(text, href) - 10
            candidates.push({ url: abs, score })
          }
        })
      } catch {
        // ignore path fetch errors
      }
    }

    if (candidates.length === 0) return null
    candidates.sort((a, b) => b.score - a.score)
    return candidates[0].url
  } catch (e) {
    return null
  }
}