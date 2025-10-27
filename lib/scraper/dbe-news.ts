import * as cheerio from "cheerio"

export interface ScrapedArticle {
  title: string
  description: string
  link: string
  pubDate: string
  source_id: string
  category: string[]
  image_url: string
  alt_text?: string
}

const USER_AGENT = "CourseFinderBot/1.0 (+https://www.coursefind.co.za)"

function isAbsoluteUrl(url: string): boolean {
  try { new URL(url); return true } catch { return false }
}

function toAbsoluteUrl(base: string, href: string): string {
  if (!href) return ""
  if (isAbsoluteUrl(href)) return href
  try { return new URL(href, new URL(base).origin).toString() } catch { return href }
}

async function fetchHtml(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { headers: { "user-agent": USER_AGENT }, cache: "no-store" })
    if (!res.ok) return null
    return await res.text()
  } catch {
    return null
  }
}

function uniqueBy<T>(items: T[], keyFn: (t: T) => string): T[] {
  const seen = new Set<string>()
  const out: T[] = []
  for (const item of items) {
    const k = keyFn(item)
    if (k && !seen.has(k)) { seen.add(k); out.push(item) }
  }
  return out
}

function parseDateFromText(text: string): string | null {
  // Try patterns like: 12 January 2024, 2024-01-12
  const longMatch = text.match(/(\d{1,2}\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+20\d{2})/i)
  if (longMatch) {
    const d = Date.parse(longMatch[1])
    if (!isNaN(d)) return new Date(d).toISOString()
  }
  const isoMatch = text.match(/(20\d{2}-\d{2}-\d{2})/)
  if (isoMatch) {
    const d = Date.parse(isoMatch[1])
    if (!isNaN(d)) return new Date(d).toISOString()
  }
  return null
}

async function extractArticleDetails(url: string): Promise<ScrapedArticle | null> {
  const html = await fetchHtml(url)
  if (!html) return null
  const $ = cheerio.load(html)

  // Title heuristics
  const ogTitle = $('meta[property="og:title"]').attr('content')?.trim()
  const h1Title = $('h1').first().text().trim()
  const title = ogTitle || h1Title || $('title').text().trim() || "Untitled"

  // Description heuristics
  const ogDesc = $('meta[property="og:description"]').attr('content')?.trim()
  const metaDesc = $('meta[name="description"]').attr('content')?.trim()
  const firstP = $('article p').first().text().trim() || $('p').first().text().trim()
  const description = ogDesc || metaDesc || firstP || "No description available"

  // Date heuristics
  const ogDate = $('meta[property="article:published_time"]').attr('content')?.trim()
  let pubDate = ogDate || parseDateFromText($('time').first().text()) || parseDateFromText($('article').text()) || parseDateFromText($.text()) || new Date().toISOString()

  // Image heuristics
  const ogImage = $('meta[property="og:image"]').attr('content')?.trim()
  const firstImg = $('article img').first().attr('src') || $('img').first().attr('src') || ''
  const image_url = ogImage || toAbsoluteUrl(url, firstImg) || 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop&crop=center'

  const alt_text = $('img').first().attr('alt') || `DBE news image for ${title}`

  return {
    title,
    description,
    link: url,
    pubDate,
    source_id: 'DBE',
    category: ['education', 'government'],
    image_url,
    alt_text,
  }
}

function extractCandidateLinks(html: string, base: string): string[] {
  const $ = cheerio.load(html)
  const links: string[] = []
  $('a').each((_, el) => {
    const href = $(el).attr('href') || ''
    const text = $(el).text().trim().toLowerCase()
    if (!href) return
    const abs = toAbsoluteUrl(base, href)
    const s = `${text} ${href}`
    // Heuristics: prefer newsroom and media pages
    if (
      s.includes('newsroom') || s.includes('media') || s.includes('advisories') || s.includes('speeches') || s.includes('press') ||
      /tabid\/[0-9]+/i.test(href)
    ) {
      links.push(abs)
    }
    // Direct article pages often contain Default.aspx and tabid in DBE site
    if (href.toLowerCase().includes('default.aspx') && /tabid\/[0-9]+/i.test(href)) {
      links.push(abs)
    }
  })
  // Deduplicate and keep plausible article pages only
  return uniqueBy(links, (l) => l)
}

export async function scrapeDbeNews(limit = 12): Promise<ScrapedArticle[]> {
  const seedPages = [
    'https://www.education.gov.za/',
    'https://www.education.gov.za/Newsroom.aspx',
    'https://www.education.gov.za/Newsroom/MediaReleases/tabid/947/Default.aspx',
    'https://www.education.gov.za/Newsroom/MediaAdvisories/tabid/953/Default.aspx',
    'https://www.education.gov.za/Newsroom/Speeches/tabid/950/Default.aspx',
  ]

  let candidateLinks: string[] = []
  for (const page of seedPages) {
    const html = await fetchHtml(page)
    if (!html) continue
    const links = extractCandidateLinks(html, page)
    candidateLinks.push(...links)
  }

  // Deduplicate and trim
  candidateLinks = uniqueBy(candidateLinks, (l) => l)
  // Prefer likely article pages
  candidateLinks = candidateLinks.filter((l) => /tabid\/[0-9]+/i.test(l) || l.toLowerCase().includes('newsroom'))
  candidateLinks = candidateLinks.slice(0, limit)

  const articles: ScrapedArticle[] = []
  for (const link of candidateLinks) {
    const details = await extractArticleDetails(link)
    if (details) articles.push(details)
  }

  // Sort by date desc and limit final output
  const sorted = articles
    .filter(a => a && a.title && a.link)
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
    .slice(0, 12)

  return sorted
}