/**
 * GET /api/programmes/{institution}/{code} — one programme's course
 * lists, served from the bundled dataset.
 *
 * Previously a proxy to a hosted coursefind-data API. The split between
 * this and /api/qualify survives the move and still earns its keep:
 * qualify answers ~90 programmes at once and carries no curricula,
 * because inlining ~1,700 courses into every search is the cost that
 * split exists to avoid. The course lists are fetched one programme at
 * a time, when a learner opens a card.
 *
 * A 404 here is an ordinary answer, not a fault: three Wits records
 * publish no course outline at all (p89 and p94 print requirements and
 * careers only, and WITS-BSC-GEN appears solely in the admissions
 * table), so the client says "not published" rather than "failed".
 */
import { NextRequest, NextResponse } from "next/server"
import { findProgramme } from "@/lib/qualify/data"

/** The stored data omits keys that are absent; the Python API this
 * replaced emitted every field with an explicit null, because Pydantic
 * serialises declared optionals rather than dropping them. A client
 * reading `entry.name` would therefore get `undefined` here where it
 * used to get `null` -- a silent contract change, and exactly the kind
 * of drift this whole move risks. So the shape is normalised to match
 * what the API returned, field for field. */
function normaliseStreams(streams: any[]): any[] {
  return (streams ?? []).map((s) => ({
    name: s.name ?? null,
    source_page: s.source_page ?? null,
    curriculum: Object.fromEntries(
      Object.entries(s.curriculum ?? {}).map(([stage, entries]) => [
        stage,
        (entries as any[]).map((e) => ({
          choice: Boolean(e.choice),
          name: e.name ?? null,
          options: e.options ?? null,
        })),
      ]),
    ),
    curriculum_notes: s.curriculum_notes ?? [],
    transcription_withheld: s.transcription_withheld ?? null,
  }))
}

/** A programme's courses change when the prospectus does, i.e. once a
 * year, and nothing here depends on what the learner typed -- so unlike
 * /api/qualify this is cacheable. */
const CACHE_CONTROL = "public, max-age=3600, stale-while-revalidate=86400"

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ institution: string; code: string }> },
) {
  const { institution, code } = await context.params

  const yearParam = request.nextUrl.searchParams.get("academic_year")
  const academicYear = yearParam !== null ? Number(yearParam) : null
  if (yearParam !== null && !Number.isFinite(academicYear)) {
    return NextResponse.json({ error: "academic_year must be a number" }, { status: 400 })
  }

  const p = findProgramme(institution, code, academicYear)
  if (!p) {
    return NextResponse.json(
      { error: "No course list is available for this programme." },
      { status: 404 },
    )
  }

  return NextResponse.json(
    {
      institution: p.institution_id,
      academic_year: p.academic_year,
      qualification_code: p.qualification_code,
      name: p.name,
      faculty: p.faculty ?? null,
      campus: p.campus ?? [],
      duration_years: p.duration_years ?? null,
      extended: p.extended ?? false,
      selection_notes: p.selection_notes ?? [],
      career_text: p.career_text ?? null,
      streams: normaliseStreams(p.streams ?? []),
      source_doc: p.source_doc ?? null,
      source_page: p.source_page ?? null,
      confidence: p.confidence ?? "extracted",
    },
    { headers: { "Cache-Control": CACHE_CONTROL } },
  )
}
