import { NextResponse } from "next/server"
import { fetchCoursesForUniversity } from "@/lib/course-scraper"
import { getUniversityById } from "@/data/universities/index"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id?.toLowerCase()
  if (!id) {
    return NextResponse.json({ error: "Missing university id" }, { status: 400 })
  }

  const uni = getUniversityById(id)
  if (!uni) {
    return NextResponse.json({ error: `Unknown university id: ${id}` }, { status: 404 })
  }

  try {
    const result = await fetchCoursesForUniversity(id)
    return NextResponse.json({
      university: { id: uni.id, name: uni.name, shortName: uni.shortName, website: uni.website },
      source: result.source,
      prospectusUrl: result.prospectusUrl,
      courses: result.courses,
    })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to fetch courses" }, { status: 500 })
  }
}