import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import fs from "fs/promises"
import path from "path"

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_session")?.value
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Check universities
    const universitiesDir = path.join(process.cwd(), "data/universities")
    let universityCount = 0
    let lastProspectusUpdate = null

    try {
      const files = await fs.readdir(universitiesDir)
      const tsFiles = files.filter(f => f.endsWith(".ts") && f !== "base-university.ts" && f !== "index.ts")
      universityCount = tsFiles.length
      
      // Get the most recently modified file's stats
      let latestTime = 0
      for (const file of tsFiles) {
        const stats = await fs.stat(path.join(universitiesDir, file))
        if (stats.mtimeMs > latestTime) {
          latestTime = stats.mtimeMs
        }
      }
      if (latestTime > 0) {
        lastProspectusUpdate = new Date(latestTime).toISOString()
      }
    } catch (e) {
      console.error("Error reading universities dir:", e)
    }

    // Check performance data
    const perfFile = path.join(process.cwd(), "data/school-performance.json")
    let schoolCount = 0
    let lastPerformanceUpdate = null
    let performanceYears: string[] = []

    try {
      const stats = await fs.stat(perfFile)
      lastPerformanceUpdate = stats.mtime.toISOString()
      
      const content = await fs.readFile(perfFile, "utf-8")
      const data = JSON.parse(content)
      schoolCount = Array.isArray(data) ? data.length : 0
      
      if (schoolCount > 0) {
        const years = new Set<string>()
        data[0].results && Object.keys(data[0].results).forEach(y => years.add(y))
        performanceYears = Array.from(years).sort()
      }
    } catch (e) {
      console.error("Error reading performance file:", e)
    }

    return NextResponse.json({
      universities: {
        count: universityCount,
        lastUpdate: lastProspectusUpdate
      },
      performance: {
        schoolCount,
        lastUpdate: lastPerformanceUpdate,
        yearsAvailable: performanceYears
      }
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch status" }, { status: 500 })
  }
}
