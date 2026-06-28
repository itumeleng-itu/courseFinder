import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { parseProspectus } from "@/lib/admin/prospectus-parser"

export const maxDuration = 60 // Allow up to 60s for AI processing

export async function POST(request: NextRequest) {
  // Auth check
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_session")?.value
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const universityHint = formData.get("universityHint") as string | null

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    if (!file.name.endsWith(".pdf")) {
      return NextResponse.json({ error: "Only PDF files are supported" }, { status: 400 })
    }

    // File size limit: 20MB
    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 20MB)" }, { status: 400 })
    }

    // Extract text from PDF
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    let pdfText: string
    try {
      // Dynamic import to avoid issues with edge runtime
      const pdfParse = (await import("pdf-parse")).default
      const pdfData = await pdfParse(buffer)
      pdfText = pdfData.text
    } catch (pdfError) {
      return NextResponse.json(
        {
          error: "Failed to extract text from PDF. The file may be corrupted or image-only.",
          details: pdfError instanceof Error ? pdfError.message : "Unknown PDF error",
        },
        { status: 422 }
      )
    }

    if (!pdfText || pdfText.trim().length < 100) {
      return NextResponse.json(
        { error: "No readable text found in PDF. It may be a scanned/image-only document." },
        { status: 422 }
      )
    }

    // Parse with AI
    const result = await parseProspectus(pdfText, universityHint || undefined)

    if (!result.success) {
      return NextResponse.json(
        {
          error: result.error || "Failed to parse prospectus",
          rawResponse: result.rawResponse,
        },
        { status: 422 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      model: result.model,
      textLength: pdfText.length,
      coursesFound: result.data?.courses.length || 0,
    })
  } catch (error) {
    console.error("Prospectus parse error:", error)
    return NextResponse.json(
      {
        error: "Internal server error during parsing",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
