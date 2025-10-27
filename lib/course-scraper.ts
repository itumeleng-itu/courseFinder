import { getUniversityById } from "@/data/universities/index"
import type { Course } from "@/lib/types"
import { findLatestProspectusUrl } from "@/lib/scraper/prospectus-scraper"
import { downloadPdf, extractPdfText } from "@/lib/scraper/pdf"
import { extractCoursesFromText } from "@/lib/extractors/openrouter-course-extractor"

function mapIndexCourseToLibCourse(course: any): Course {
  return {
    name: course?.name ?? "",
    faculty: course?.faculty ?? undefined,
    minimumAPS: course?.apsRequired ?? course?.minimumAPS ?? 0,
    requirements: Array.isArray(course?.requirements) ? course.requirements : undefined,
    duration: course?.duration,
    description: course?.description,
  }
}

export async function fetchCoursesForUniversity(universityId: string): Promise<{ source: "scraped" | "fallback"; courses: Course[]; prospectusUrl?: string }> {
  const uni = getUniversityById(universityId)
  if (!uni) throw new Error(`Unknown university id: ${universityId}`)

  const website = uni.website || ""
  let prospectusUrl: string | null = null
  let scrapedCourses: Course[] = []

  try {
    if (website) {
      prospectusUrl = await findLatestProspectusUrl(website)
    }

    if (prospectusUrl) {
      const pdfBuf = await downloadPdf(prospectusUrl)
      const text = await extractPdfText(pdfBuf)
      scrapedCourses = await extractCoursesFromText(text, { university: uni.name })
    }
  } catch (e) {
    // swallow and move to fallback
    scrapedCourses = []
  }

  if (Array.isArray(scrapedCourses) && scrapedCourses.length > 0) {
    return { source: "scraped", courses: scrapedCourses, prospectusUrl: prospectusUrl || undefined }
  }

  // Fallback: local data index
  const fallbackCourses: Course[] = (uni.courses || []).map(mapIndexCourseToLibCourse)
  return { source: "fallback", courses: fallbackCourses, prospectusUrl: prospectusUrl || undefined }
}