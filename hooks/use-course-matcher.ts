import { useState, useCallback } from "react"
import { Subject, CourseMatch, ExtendedCourse } from "@/app/find-course/types"
import { checkSubjectRequirements, percentageToNSCLevel } from "@/app/find-course/utils"
import { getAllUniversities, getAllUniversityInstances } from "@/data/universities"
import { getAllColleges, collegeToUniversityFormat } from "@/data/colleges"
import { BaseUniversity, Course, University } from "@/data/universities/base-university"

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

    const meetsAdditionalAcademicRequirements = (reqs: string[] | string | undefined, studentSubjects: Subject[]): boolean => {
        if (!reqs) return true
        const reqList = Array.isArray(reqs) ? reqs : [reqs]
        const findSubject = (needle: string) => studentSubjects.find((s) => s.name.toLowerCase().includes(needle.toLowerCase()))
        for (const r of reqList) {
            const text = r.toLowerCase()
            if (/(portfolio|interview|assessment|admission test|entrance test)/.test(text)) continue
            const percMatch = text.match(/(mathematics|mathematical literacy|english|afrikaans|physical sciences|life sciences)[^\d]*(\d{2})%/)
            if (percMatch) {
                const subj = percMatch[1]
                const minPerc = Number(percMatch[2])
                const student = findSubject(subj)
                if (!student || student.percentage < minPerc) return false
                continue
            }
            const levelMatch = text.match(/(mathematics|mathematical literacy|english|afrikaans|physical sciences|life sciences)[^\d]*level\s*(\d+)/)
            if (levelMatch) {
                const subj = levelMatch[1]
                const minLevel = Number(levelMatch[2])
                const student = findSubject(subj)
                const studentLevel = student ? percentageToNSCLevel(student.percentage) : 0
                if (studentLevel < minLevel) return false
                continue
            }
        }
        return true
    }

    const findCourses = useCallback(() => {
        if (!calculatedDefaultAPS || calculatedDefaultAPS <= 0) return

        const studentLevels: Record<string, number> = Object.fromEntries(
            subjects.map((s) => [s.name, percentageToNSCLevel(s.percentage)])
        )

        const universities = getAllUniversities()
        const uniMatches: CourseMatch[] = []

        universities.forEach((university) => {
            university.courses.forEach((course) => {
                const extendedCourse = course as ExtendedCourse
                const calculatedAPS = (university as unknown as BaseUniversity).calculateApsScore
                    ? (university as unknown as BaseUniversity).calculateApsScore(studentLevels, extendedCourse as Course)
                    : calculatedDefaultAPS

                const apsRequired = extendedCourse.apsMin ?? extendedCourse.apsRequired ?? 0
                const requirementCheck = checkSubjectRequirements(subjects, extendedCourse.subjectRequirements)
                const additionalReqs = extendedCourse.requirements ?? extendedCourse.additionalRequirements

                if (apsRequired <= 0 || calculatedAPS <= 0) return
                const apsMet = calculatedAPS >= apsRequired
                const meetsAll = apsMet && requirementCheck.meets && meetsAdditionalAcademicRequirements(additionalReqs, subjects)

                if (isUndergraduateCourse(extendedCourse.name)) {
                    uniMatches.push({
                        course: extendedCourse,
                        university,
                        meetsRequirements: meetsAll,
                        missingRequirements: requirementCheck.missing,
                        metRequirements: requirementCheck.met,
                    })
                }
            })
        })

        // College processing
        const collegeMatches: CourseMatch[] = []
        const fullyQualifiedUniCount = uniMatches.filter((m) => m.meetsRequirements).length
        if (fullyQualifiedUniCount < 30) {
            const colleges = getAllColleges()
            colleges.forEach((college) => {
                const universityFormatCollege = collegeToUniversityFormat(college)
                universityFormatCollege.courses.forEach((course) => {
                    const extendedCourse = course as ExtendedCourse
                    const calculatedAPS = (universityFormatCollege as unknown as BaseUniversity).calculateApsScore
                        ? (universityFormatCollege as unknown as BaseUniversity).calculateApsScore(studentLevels, extendedCourse as Course)
                        : calculatedDefaultAPS
                    const apsRequired = extendedCourse.apsMin ?? extendedCourse.apsRequired ?? 0
                    const requirementCheck = checkSubjectRequirements(subjects, extendedCourse.subjectRequirements)
                    const additionalReqs = extendedCourse.requirements ?? extendedCourse.additionalRequirements
                    if (isUndergraduateCourse(extendedCourse.name) && apsRequired > 0 && calculatedAPS > 0 && calculatedAPS >= apsRequired && requirementCheck.meets && meetsAdditionalAcademicRequirements(additionalReqs, subjects)) {
                        collegeMatches.push({ course: extendedCourse, university: universityFormatCollege, meetsRequirements: true, missingRequirements: [], metRequirements: requirementCheck.met })
                    }
                })
            })
        }

        // Extended programs
        const extendedMatches: CourseMatch[] = []
        const universityInstances = getAllUniversityInstances()
        universityInstances.forEach((universityInstance) => {
            const extendedCourses = universityInstance.getExtendedCurriculumPrograms()
            extendedCourses.forEach((course) => {
                const extendedCourse = course as ExtendedCourse
                const apsMin = extendedCourse.apsMin ?? extendedCourse.apsRequired ?? 0
                if (apsMin > 0 && calculatedDefaultAPS >= apsMin) {
                    const requirementCheck = checkSubjectRequirements(subjects, extendedCourse.subjectRequirements)
                    const additionalReqs = extendedCourse.requirements ?? extendedCourse.additionalRequirements
                    if (requirementCheck.meets && meetsAdditionalAcademicRequirements(additionalReqs, subjects)) {
                        const universityForDisplay: University = { id: universityInstance.id, name: universityInstance.name, shortName: universityInstance.shortName, location: universityInstance.getLocationString(), website: universityInstance.website, courses: [] }
                        extendedMatches.push({ course: extendedCourse, university: universityForDisplay, meetsRequirements: true, missingRequirements: [], metRequirements: requirementCheck.met })
                    }
                }
            })
        })

        uniMatches.sort((a, b) => {
            if (a.meetsRequirements && !b.meetsRequirements) return -1
            if (!a.meetsRequirements && b.meetsRequirements) return 1
            return (b.course.apsMin ?? b.course.apsRequired ?? 0) - (a.course.apsMin ?? a.course.apsRequired ?? 0)
        })

        setQualifyingCourses(uniMatches.filter(m => !!m.course.name && (m.course.apsMin ?? m.course.apsRequired ?? 0) > 0))
        setRecommendedColleges(collegeMatches.filter(m => !!m.course.name && (m.course.apsMin ?? m.course.apsRequired ?? 0) > 0))
        setExtendedPrograms(extendedMatches)
    }, [subjects, calculatedDefaultAPS])

    return {
        qualifyingCourses,
        recommendedColleges,
        extendedPrograms,
        findCourses,
        setQualifyingCourses,
        setRecommendedColleges,
        setExtendedPrograms
    }
}
