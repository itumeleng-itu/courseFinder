import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { validatePerformanceReport } from "@/lib/admin/validators"
import { mergePerformanceData } from "@/lib/admin/performance-parser"
import fs from "fs/promises"
import path from "path"

export async function POST(request: NextRequest) {
  // Auth check
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_session")?.value
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.json()

    if (!data || !Array.isArray(data)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 })
    }

    // 1. Validate incoming data
    const validation = validatePerformanceReport(data)

    if (!validation.valid) {
      return NextResponse.json(
        {
          error: "Data validation failed",
          issues: validation.issues,
        },
        { status: 400 }
      )
    }

    const parsedData = validation.data!
    const filePath = path.join(process.cwd(), "data/school-performance.json")

    // 2. Read existing data
    let existingData: any[] = []
    try {
      const existingContent = await fs.readFile(filePath, "utf-8")
      existingData = JSON.parse(existingContent)
    } catch {
      // File doesn't exist or is invalid, start fresh
      existingData = []
    }

    // 3. Merge data (keep last 3 years)
    const mergedData = mergePerformanceData(existingData, parsedData, 3)

    // 4. Save to file
    await fs.writeFile(filePath, JSON.stringify(mergedData, null, 2), "utf-8")

    return NextResponse.json({
      success: true,
      message: "Successfully updated school performance data",
      stats: {
        totalSchools: mergedData.length,
        newSchoolsAdded: mergedData.length - existingData.length,
      },
      warnings: validation.issues.filter((i) => i.severity === "warning"),
    })
  } catch (error) {
    console.error("Performance save error:", error)
    return NextResponse.json(
      {
        error: "Failed to save performance data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
