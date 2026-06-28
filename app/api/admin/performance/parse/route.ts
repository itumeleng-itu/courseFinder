import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { parsePerformanceReport } from "@/lib/admin/performance-parser"

export const maxDuration = 300 // 5 minutes max for chunked parsing

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

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    if (!file.name.endsWith(".pdf") && !file.name.endsWith(".txt")) {
      return NextResponse.json(
        { error: "Only PDF or extracted text files are supported" },
        { status: 400 }
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    let pdfText = ""

    if (file.name.endsWith(".pdf")) {
      try {
        const pdfParse = (await import("pdf-parse")).default
        const pdfData = await pdfParse(buffer)
        pdfText = pdfData.text
      } catch (pdfError) {
        return NextResponse.json(
          {
            error: "Failed to extract text from PDF.",
            details: pdfError instanceof Error ? pdfError.message : "Unknown error",
          },
          { status: 422 }
        )
      }
    } else {
      pdfText = buffer.toString("utf-8")
    }

    if (!pdfText || pdfText.trim().length < 100) {
      return NextResponse.json(
        { error: "No readable text found in document." },
        { status: 422 }
      )
    }

    // Parse the performance report with AI
    const result = await parsePerformanceReport(pdfText, (province, idx, total) => {
      // Could stream progress back via SSE in the future
      console.log(`[Performance Parse] Processing ${province} (${idx}/${total})`)
    })

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Failed to parse performance report",
          details: result.errors,
          stats: result.stats,
        },
        { status: 422 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      stats: result.stats,
      errors: result.errors,
    })
  } catch (error) {
    console.error("Performance parse error:", error)
    return NextResponse.json(
      {
        error: "Internal server error during parsing",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
