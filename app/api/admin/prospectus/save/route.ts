import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { validateProspectusData } from "@/lib/admin/validators"
import {
  generateUniversityTS,
  generateImportLine,
  generateInstanceLine,
} from "@/lib/admin/prospectus-generator"
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

    if (!data) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 })
    }

    // 1. Validate the data structure
    const validation = validateProspectusData(data)

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

    // 2. Generate TypeScript file content
    const tsContent = generateUniversityTS(parsedData)
    const fileName = `${parsedData.id}.ts`
    const universitiesDir = path.join(process.cwd(), "data/universities")
    const filePath = path.join(universitiesDir, fileName)

    // 3. Check if file exists to determine if we need to update index.ts
    let isNewUniversity = true
    try {
      await fs.access(filePath)
      isNewUniversity = false
    } catch {
      // File doesn't exist, it's new
    }

    // 4. Write the university file
    await fs.writeFile(filePath, tsContent, "utf-8")

    // 5. Update index.ts if it's a new university
    if (isNewUniversity) {
      const indexPath = path.join(universitiesDir, "index.ts")
      try {
        let indexContent = await fs.readFile(indexPath, "utf-8")

        // Match the actual instances array declaration in index.ts
        const arrayStartMatch = indexContent.match(/const\s+instances\s*:\s*BaseUniversity\[\]\s*=\s*\[/)

        if (arrayStartMatch) {
          // Insert import after the last existing import line
          const lines = indexContent.split("\n")
          let lastImportIndex = -1
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith("import ")) lastImportIndex = i
          }

          const importLine = generateImportLine(parsedData)
          if (lastImportIndex >= 0) {
            lines.splice(lastImportIndex + 1, 0, importLine)
            indexContent = lines.join("\n")
          }

          // Add to instances array
          const instanceLine = generateInstanceLine(parsedData)
          indexContent = indexContent.replace(
            arrayStartMatch[0],
            `${arrayStartMatch[0]}\n${instanceLine}`
          )

          await fs.writeFile(indexPath, indexContent, "utf-8")
        }
      } catch (indexError) {
        console.error("Failed to update index.ts:", indexError)
        // Non-fatal, we still wrote the university file
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully saved ${parsedData.name}`,
      isNew: isNewUniversity,
      warnings: validation.issues.filter((i) => i.severity === "warning"),
    })
  } catch (error) {
    console.error("Prospectus save error:", error)
    return NextResponse.json(
      {
        error: "Failed to save university data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
