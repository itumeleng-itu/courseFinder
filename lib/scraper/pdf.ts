import pdf from "pdf-parse"

export async function downloadPdf(url: string): Promise<Buffer> {
  const res = await fetch(url, {
    headers: { "user-agent": "CourseFinderBot/1.0 (+https://www.coursefind.co.za)" },
  })
  if (!res.ok) throw new Error(`Failed to download PDF: ${res.status}`)
  const arrayBuffer = await res.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

export async function extractPdfText(buffer: Buffer): Promise<string> {
  const data = await pdf(buffer)
  const text = data.text || ""
  return text.replace(/\u0000/g, "").trim()
}