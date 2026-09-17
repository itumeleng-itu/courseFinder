import { useState, useCallback } from "react"
import { Subject, CourseMatch, Course } from "@/app/find-course/types"
import type { University } from "@/lib/types"
import type { BaseUniversity } from "@/data/universities/base-university"
import { checkSubjectRequirements } from "@/app/find-course/utils"
import { getAllUniversityInstances } from "@/data/universities"
import { getAllColleges, collegeToUniversityFormat } from "@/data/colleges"
import { fetchQualification, fetchCoveredInstitutions, QualifyApiError, QualifyProgrammeResult } from "@/lib/qualify-api"

const isUndergraduateCourse = (name: string) => {
    const n = name.toLowerCase()
    const exclude = ["honours", "postgraduate", "pgdip", "pgcert", "master", "masters", "msc", "ma ", "llm", "phd", "doctor", "doctorate", "mba"]
    if (exclude.some((t) => n.includes(t))) return false
    const include = ["bachelor", "bsc", "ba ", "beng", "bcom", "diploma", "higher certificate", "national diploma", "advanced diploma", "undergraduate"]
    return include.some((t) => n.includes(t)) || !exclude.some((t) => n.includes(t))
}

/** Institution display metadata (short name, website, location) still
 * comes from the local per-university files -- coursefind-data's API
 * knows institution ids ("uj") but not marketing/contact details, and
 * duplicating those here is a display concern, not an eligibility one.
 * Institution ids match exactly between the two repos (both mirror the
 * 26 SA public universities' standard abbreviations), so this join is
 * reliable. */
function displayFor(instance: BaseUniversity): University {
    return {
        id: instance.id,
        name: instance.name,
        shortName: instance.shortName,
        location: instance.getLocationString(),
        website: instance.website || "",
        courses: [],
    }
}

function buildUniversityDisplayMap(): Map<string, University> {
    const map = new Map<string, University>()
    for (const instance of getAllUniversityInstances()) {
        map.set(instance.id, displayFor(instance))
    }
    return map
}

/** One API ProgrammeResult -> one CourseMatch, keeping the existing
 * card-rendering components (CourseMatchCard etc.) working unchanged.
 * Fields the API doesn't carry (careers, tuition, application deadlines)
 * are simply absent -- CourseMatchCard already renders those
 * conditionally, so this is a strictly narrower Course than the locally
 * -sourced ones, not a broken one. */
function toCourseMatch(result: QualifyProgrammeResult, universities: Map<string, University>): CourseMatch {
    const university = universities.get(result.institution) ?? {
        id: result.institution,
        name: result.institution.toUpperCase(),
        shortName: result.institution.toUpperCase(),
        location: "",
        website: "",
        courses: [],
    }
    return {
        course: {
            id: result.qualification_code,
            name: result.name,
            faculty: result.faculty ?? undefined,
            apsMin: result.score_required ?? undefined,
            duration: result.duration_years ? `${result.duration_years} years` : undefined,
            campus: result.campus,
        },
        university,
        meetsRequirements: true,
        missingRequirements: [],
        metRequirements: [`APS ${result.score_actual} (required ${result.score_required ?? "?"})`],
    }
}

export function useCourseMatcher(subjects: Subject[], calculatedDefaultAPS: number) {
    const [qualifyingCourses, setQualifyingCourses] = useState<CourseMatch[]>([])
    const [recommendedColleges, setRecommendedColleges] = useState<CourseMatch[]>([])
    const [extendedPrograms, setExtendedPrograms] = useState<CourseMatch[]>([])
    const [isMatching, setIsMatching] = useState(false)
    const [matchError, setMatchError] = useState<string | null>(null)

    /** Returns the error message if the /v1/qualify call failed, or null
     * on success -- returned directly (not just set into state) because
     * a caller awaiting this in the same tick would otherwise read the
     * pre-update, stale value of the `matchError` state variable. */
    const findCourses = useCallback(async (): Promise<string | null> => {
        setMatchError(null)
        let error: string | null = null

        // --- Main university course list. coursefind-data's /v1/qualify is
        // the single source of truth for admission eligibility (subject
        // requirements including Home Language/First Additional Language
        // distinctions, and per-institution APS scoring) for whichever
        // institutions it actually has data for -- found via /v1/meta, NOT
        // hardcoded, since that set grows as more institutions are
        // onboarded. Every OTHER institution still uses the local
        // checkSubjectRequirements() loop against data/universities/*.ts's
        // own subjectRequirements, exactly as before this integration --
        // without this split, every institution the API doesn't cover yet
        // would silently lose its main course list the moment the API
        // integration went live, instead of falling back to the (locally
        // sourced, but present) list it had before.
        setIsMatching(true)
        const coveredInstitutions = await fetchCoveredInstitutions()
        const universities = buildUniversityDisplayMap()
        let apiMatches: CourseMatch[] = []
        let localMainListMatches: CourseMatch[] = []

        if (coveredInstitutions.size > 0) {
            try {
                const response = await fetchQualification(subjects)
                apiMatches = response.qualified
                    .filter((r) => isUndergraduateCourse(r.name))
                    .map((r) => toCourseMatch(r, universities))
            } catch (err) {
                error = err instanceof QualifyApiError ? err.message : "Could not check course eligibility."
                console.error("[useCourseMatcher] qualify request failed:", err)
                setMatchError(error)
                // Deliberately not cleared to [] and not silently backfilled
                // from local data for a covered institution -- an institution
                // the API is supposed to be authoritative for should show a
                // visible error, not a quietly wrong local answer, if the API
                // call itself fails. Institutions the API doesn't cover are
                // unaffected by this failure; see localMainListMatches below.
            }
        }

        for (const universityInstance of getAllUniversityInstances()) {
            if (coveredInstitutions.has(universityInstance.id)) continue
            const universityForDisplay = universities.get(universityInstance.id) ?? displayFor(universityInstance)
            universityInstance.courses.forEach((course) => {
                const apsRequired = (course as Course).apsMin ?? (course as Course).apsRequired ?? 0
                if (apsRequired <= 0) return
                const requirementCheck = checkSubjectRequirements(subjects, course.subjectRequirements)
                if (calculatedDefaultAPS >= apsRequired && requirementCheck.meets && isUndergraduateCourse(course.name)) {
                    localMainListMatches.push({
                        course: course as Course,
                        university: universityForDisplay,
                        meetsRequirements: true,
                        missingRequirements: [],
                        metRequirements: requirementCheck.met,
                    })
                }
            })
        }

        setQualifyingCourses(
            [...apiMatches, ...localMainListMatches].sort(
                (a, b) => (b.course.apsMin ?? 0) - (a.course.apsMin ?? 0),
            ),
        )
        setIsMatching(false)

        // --- Extended curriculum programs (foundation year alternatives)
        // and TVET colleges: coursefind-data's dataset does not yet carry
        // an "extended" flag in its /v1/qualify response, and does not
        // cover TVET colleges at all -- both stay locally computed until
        // that data exists server-side.
        if (!calculatedDefaultAPS || calculatedDefaultAPS <= 0) {
            setExtendedPrograms([])
            setRecommendedColleges([])
            return error
        }

        const universityInstances = getAllUniversityInstances()
        const extendedMatches: CourseMatch[] = []
        universityInstances.forEach((universityInstance) => {
            const universityForDisplay = {
                id: universityInstance.id,
                name: universityInstance.name,
                shortName: universityInstance.shortName,
                location: universityInstance.getLocationString(),
                website: universityInstance.website || "",
                courses: [],
            }

            universityInstance.getExtendedCurriculumPrograms().forEach((course) => {
                const apsRequired = (course as Course).apsMin ?? (course as Course).apsRequired ?? 0
                if (apsRequired <= 0) return

                const requirementCheck = checkSubjectRequirements(subjects, course.subjectRequirements)
                if (calculatedDefaultAPS >= apsRequired && requirementCheck.meets) {
                    extendedMatches.push({
                        course: course as Course,
                        university: universityForDisplay,
                        meetsRequirements: true,
                        missingRequirements: [],
                        metRequirements: requirementCheck.met,
                    })
                }
            })
        })

        const collegeMatches: CourseMatch[] = []
        const colleges = getAllColleges()
        colleges.forEach((college) => {
            const universityFormatCollege = collegeToUniversityFormat(college)
            universityFormatCollege.courses.forEach((course) => {
                const apsRequired = (course as Course).apsMin ?? (course as Course).apsRequired ?? 0
                if (apsRequired <= 0 || calculatedDefaultAPS <= 0) return

                const requirementCheck = checkSubjectRequirements(subjects, course.subjectRequirements)
                if (calculatedDefaultAPS >= apsRequired && requirementCheck.meets && isUndergraduateCourse(course.name)) {
                    collegeMatches.push({
                        course: course as Course,
                        university: { ...universityFormatCollege, website: universityFormatCollege.website || "" },
                        meetsRequirements: true,
                        missingRequirements: [],
                        metRequirements: requirementCheck.met,
                    })
                }
            })
        })

        setRecommendedColleges(collegeMatches)
        setExtendedPrograms(extendedMatches)
        return error
    }, [subjects, calculatedDefaultAPS])

    return {
        qualifyingCourses,
        recommendedColleges,
        extendedPrograms,
        findCourses,
        isMatching,
        matchError,
        setQualifyingCourses,
        setRecommendedColleges,
        setExtendedPrograms,
    }
}
