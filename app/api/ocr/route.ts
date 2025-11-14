import { NextResponse } from "next/server"
import { generateText } from "ai"
import { createGroq } from "@ai-sdk/groq"
import Tesseract from "tesseract.js"
import { validateMatricResults, type Subject } from "@/lib/matric-validation"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    // Read environment variable at runtime
    const GROQ_API_KEY = process.env.GROQ_API_KEY

    if (!GROQ_API_KEY) {
      // Return a friendly "in development" message instead of an error
      return NextResponse.json(
        { 
          success: false,
          inDevelopment: true,
          message: "OCR feature is not yet available, still in development."
        },
        { status: 200 } // Return 200 to avoid error status
      )
    }

    // Initialize Groq client with API key
    const groq = createGroq({
      apiKey: GROQ_API_KEY,
    })

    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      )
    }

    const isPDF = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
    
    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const fileType = isPDF ? "PDF document" : "image"
    const basePrompt = `Extract all subject names and their corresponding percentages/marks from this matric results ${fileType}. 
      
Return the data in a structured JSON format like this:
{
  "subjects": [
    {"name": "Subject Name", "percentage": 85},
    {"name": "Another Subject", "percentage": 72}
  ]
}

Important:
- Extract subject names exactly as they appear (e.g., "Mathematics", "English Home Language", "Physical Sciences")
- Extract the percentage or mark for each subject
- If a percentage is not available, try to extract the mark and convert it if possible
- Only return valid JSON, no other text
- Include all subjects visible in the extracted text`

    let extractedText: string
    let text: string

    // For images: Use Tesseract OCR
    if (!isPDF) {
      const { data: { text: ocrText } } = await Tesseract.recognize(buffer, "eng")
      extractedText = ocrText

      const { text: groqText } = await generateText({
        model: groq("llama-3.1-8b-instant") as any,
        prompt: `${basePrompt}\n\nExtracted text:\n${extractedText}`,
      })
      text = groqText
    } 
    // For PDFs: Use pdf-parse
    else {
      // Use dynamic require for pdf-parse (CommonJS module)
      const pdfParse = require("pdf-parse")
      const pdfData = await pdfParse(buffer)
      extractedText = pdfData.text

      const { text: groqText } = await generateText({
        model: groq("llama-3.1-8b-instant") as any,
        prompt: `${basePrompt}\n\nExtracted text:\n${extractedText}`,
      })
      text = groqText
    }

    // Try to parse the JSON response
    let parsedData
    try {
      // Extract JSON from the response if it's wrapped in markdown or other text
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        parsedData = JSON.parse(jsonMatch[0])
      } else {
        parsedData = JSON.parse(text)
      }
    } catch (parseError) {
      // If parsing fails, return the raw text for manual processing
      return NextResponse.json({
        success: false,
        error: "Failed to parse OCR response",
        rawText: text,
      })
    }

    const extractedSubjects: Subject[] = (parsedData.subjects || []).map((s: any) => ({
      name: s.name,
      percentage: s.percentage,
      code: s.code,
      achievementLevel: s.achievementLevel,
    }))
    
    // Validate the extracted results against official Department of Education standards
    // Source: https://www.sanews.gov.za/south-africa/class-2024-achieves-historic-pass-rate
    const validation = validateMatricResults(extractedSubjects)
    
    return NextResponse.json({
      success: true,
      subjects: extractedSubjects.map(s => ({ name: s.name, percentage: s.percentage })), // Map to expected format
      rawText: text,
      validation: {
        isValid: validation.isValid,
        warnings: validation.warnings,
        errors: validation.errors,
        statistics: validation.statistics,
        subjectValidation: validation.subjectValidation.map(sv => ({
          subject: { name: sv.subject.name, percentage: sv.subject.percentage },
          isValid: sv.isValid,
          warnings: sv.warnings,
          errors: sv.errors,
        })),
      },
    })
  } catch (error) {
    console.error("OCR API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    )
  }
}

