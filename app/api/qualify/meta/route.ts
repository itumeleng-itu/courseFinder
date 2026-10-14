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

export async function GET() {
  return NextResponse.json({
    data_version: DATA_VERSION,
    academic_years: academicYears(),
    institutions: institutionYears(),
    programme_count: PROGRAMMES.length,
  })
}
