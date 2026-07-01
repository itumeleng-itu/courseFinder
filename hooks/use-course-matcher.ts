import { useState, useCallback } from "react"
import { Subject, CourseMatch, Course } from "@/app/find-course/types"
import { checkSubjectRequirements } from "@/app/find-course/utils"
import { getAllUniversityInstances } from "@/data/universities"
import { getAllColleges, collegeToUniversityFormat } from "@/data/colleges"

export function useCourseMatcher(subjects: Subject[], calculatedDefaultAPS: number) {
    const [qualifyingCourses, setQualifyingCourses] = useState<CourseMatch[]>([])
    const [recommendedColleges, setRecommendedColleges] = useState<CourseMatch[]>([])
    const [extendedPrograms, setExtendedPrograms] = useState<CourseMatch[]>([])

    const isUndergraduateCourse = (name: string) => {
        const n = name.toLowerCase()
        const exclude = ["honours", "postgraduate", "pgdip", "pgcert", "master", "masters", "msc", "ma ", "llm", "phd", "doctor", "doctorate", "mba"]
        if (exclude.some((t) => n.includes(t))) return false
        const include = ["bachelor", "bsc", "ba ", "beng", "bcom", "diploma", "higher certificate", "national diploma", "advanced diploma", "undergraduate"]
        return include.some((t) => n.includes(t)) || !exclude.some((t) => n.includes(t))
    }

    const findCourses = useCallback(() => {
        if (!calculatedDefaultAPS || calculatedDefaultAPS <= 0) return

        const universityInstances = getAllUniversityInstances()
        const uniMatches: CourseMatch[] = []

        universityInstances.forEach((universityInstance) => {
            if (calculatedDefaultAPS <= 0) return

            const universityForDisplay = {
                id: universityInstance.id,
                name: universityInstance.name,
                shortName: universityInstance.shortName,
                location: universityInstance.getLocationString(),
                website: universityInstance.website || "",
                courses: [],
            }

            universityInstance.courses.forEach((course) => {
                const apsRequired = (course as Course).apsMin ?? (course as Course).apsRequired ?? 0
                if (apsRequired <= 0) return

                const requirementCheck = checkSubjectRequirements(subjects, course.subjectRequirements)
                if (calculatedDefaultAPS >= apsRequired && requirementCheck.meets && isUndergraduateCourse(course.name)) {
                    uniMatches.push({
                        course: course as Course,
                        university: universityForDisplay,
                        meetsRequirements: true,
                        missingRequirements: [],
                        metRequirements: requirementCheck.met,
                    })
                }
            })
        })

        // Extended curriculum programs (foundation year alternatives)
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

        // TVET colleges — only shown when degree matches are limited
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

        uniMatches.sort((a, b) =>
            ((b.course.apsMin ?? b.course.apsRequired ?? 0) - (a.course.apsMin ?? a.course.apsRequired ?? 0))
        )

        setQualifyingCourses(uniMatches)
        setRecommendedColleges(collegeMatches)
        setExtendedPrograms(extendedMatches)
    }, [subjects, calculatedDefaultAPS])

    return {
        qualifyingCourses,
        recommendedColleges,
        extendedPrograms,
        findCourses,
        setQualifyingCourses,
        setRecommendedColleges,
        setExtendedPrograms,
    }
}
