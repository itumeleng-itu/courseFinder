import { serverStorage } from "@/lib/appwrite-server"
import type { QuestionPaper } from "@/lib/appwrite"
import { PastPapersClient } from "@/components/past-papers-client"

function parseFilename(filename: string): Partial<QuestionPaper> | null {
  // Remove .pdf extension
  const cleanName = filename.replace(/\.pdf$/i, "")

  // Try to extract year (4-digit number starting with 20)
  const yearMatch = cleanName.match(/\b(20\d{2})\b/)
  const year = yearMatch ? Number.parseInt(yearMatch[1]) : new Date().getFullYear()

  // Try to extract paper number (Paper 1, Paper 2, P1, P2, etc.)
  const paperMatch = cleanName.match(/(?:Paper|P)[\s_-]*([123])/i)
  const paperNumber = paperMatch ? paperMatch[1] : "1"

  // Check if it's a memo/memorandum
  const isMemo = /memo|memorandum|mark|marking/i.test(cleanName)
  const paperType = isMemo ? `Paper ${paperNumber} Memo` : `Paper ${paperNumber}`

  // Extract subject - everything before the year or paper indicator
  let subject = cleanName
  if (yearMatch) {
    subject = cleanName.substring(0, cleanName.indexOf(yearMatch[0])).trim()
  } else if (paperMatch) {
    subject = cleanName.substring(0, cleanName.indexOf(paperMatch[0])).trim()
  }

  // Clean up subject name
  subject = subject.replace(/[_-]/g, " ").replace(/\s+/g, " ").trim()

  // If subject is still empty or too short, use the full filename
  if (!subject || subject.length < 3) {
    subject = cleanName.replace(/[_-]/g, " ").replace(/\s+/g, " ").trim()
  }

  // Detect language
  let language = "English"
  if (/\bHL\b/i.test(cleanName)) language = "Home Language"
  else if (/\bFAL\b/i.test(cleanName)) language = "First Additional Language"
  else if (/\bSAL\b/i.test(cleanName)) language = "Second Additional Language"
  else if (/afrikaans/i.test(cleanName)) language = "Afrikaans"

  // Detect session
  const session = /feb|march/i.test(cleanName) ? "February/March" : "November"

  return {
    subject,
    year,
    paper_type: paperType,
    session,
    language,
    filename,
  }
}

async function getPapers(): Promise<QuestionPaper[]> {
  try {
    const bucketId = process.env.APPWRITE_PAPERS_BUCKET_ID || process.env.NEXT_PUBLIC_APPWRITE_PAPERS_BUCKET_ID

    if (!bucketId) {
      console.error("Bucket ID not configured")
      return []
    }

    const response = await serverStorage.listFiles(bucketId, [])

    const papers: QuestionPaper[] = response.files
      .filter((file) => file.name.toLowerCase().endsWith(".pdf"))
      .map((file) => {
        const metadata = parseFilename(file.name)

        return {
          id: file.$id,
          file_id: file.$id,
          bucket_id: bucketId,
          subject: metadata?.subject || file.name.replace(/\.pdf$/i, ""),
          year: metadata?.year || new Date().getFullYear(),
          paper_type: metadata?.paper_type || "Paper 1",
          session: metadata?.session || "November",
          language: metadata?.language || "English",
          filename: file.name,
          url: file.$id,
        }
      })
      .sort((a, b) => {
        if (b.year !== a.year) return b.year - a.year
        if (a.subject !== b.subject) return a.subject.localeCompare(b.subject)
        return a.paper_type.localeCompare(b.paper_type)
      })

    return papers
  } catch (error) {
    console.error("Error fetching papers from storage:", error)
    return []
  }
}

export default async function PastPapersPage() {
  const papers = await getPapers()

  return <PastPapersClient papers={papers} />
}
