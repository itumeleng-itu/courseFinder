/**
 * GET /api/qualify/meta — which institutions and years the bundled
 * dataset covers.
 *
 * Previously a proxy to a hosted coursefind-data API; now answered from
 * data/qualify/programmes.json in this repo. The response shape is
 * unchanged, which matters: lib/qualify-api.ts's
 * fetchCoveredInstitutions() decides per institution whether to trust
 * the matcher's list or fall back to local data, so a changed shape
 * would silently empty the main course list.
 */
import { NextResponse } from "next/server"
import {
  DATA_VERSION, PROGRAMMES, academicYears, institutionYears,
} from "@/lib/qualify/data"

export const dynamic = "force-dynamic"
export const revalidate = 0

/** force-dynamic stops Next from PRE-RENDERING this route. It does not
 * stop a CDN in front of it from caching the response, and nothing here
 * told one not to.
 *
 * That bit after TUT shipped. The deploy was healthy and the data was
 * live -- /api/programmes/tut/... returned real TUT records -- while
 * this route kept answering with the previous release's 89 programmes
 * and no `tut`, because it had been requested for months and sat in an
 * edge cache, where the newly-added programmes path had no entry and
 * came straight from the new deployment. Two routes of one app
 * disagreeing about which dataset was deployed cost an hour of looking
 * for a broken build that was never broken.
 *
 * So the route now says so explicitly. It describes which data the
 * server is holding RIGHT NOW; a cached copy of that answer is worse
 * than no answer. */
const NO_STORE = "no-store, no-cache, must-revalidate, max-age=0"

export async function GET() {
  return NextResponse.json(
    {
      data_version: DATA_VERSION,
      academic_years: academicYears(),
      institutions: institutionYears(),
      programme_count: PROGRAMMES.length,
    },
    { headers: { "Cache-Control": NO_STORE, "CDN-Cache-Control": NO_STORE } },
  )
}
