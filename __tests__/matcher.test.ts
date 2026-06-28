import { checkSubjectRequirements } from "@/app/find-course/utils"
import { getAllUniversityInstances } from "@/data/universities"
import { CourseMatch, Course } from "@/app/find-course/types"
import { SubjectEntry } from "@/lib/types"

describe("Course Matcher Logic", () => {
  it("should match correctly for a student with average marks", () => {
    const subjects: SubjectEntry[] = [
      { id: "1", name: "English Home Language", percentage: 65 },
      { id: "2", name: "Mathematics", percentage: 55 },
      { id: "3", name: "Physical Sciences", percentage: 50 },
      { id: "4", name: "Life Sciences", percentage: 70 },
      { id: "5", name: "Geography", percentage: 60 },
      { id: "6", name: "Afrikaans First Additional Language", percentage: 52 },
      { id: "7", name: "Life Orientation", percentage: 80 },
    ]

    const studentPercentages: Record<string, number> = Object.fromEntries(
      subjects.map((s) => [s.name, s.percentage])
    )

    const universityInstances = getAllUniversityInstances()
    const uniMatches: CourseMatch[] = []

    universityInstances.forEach((universityInstance) => {
      const calculatedAPS = universityInstance.calculateApsScore(studentPercentages)

      universityInstance.courses.forEach((course) => {
        const apsRequired = (course as Course).apsMin ?? (course as Course).apsRequired ?? 0
        if (apsRequired <= 0 || calculatedAPS <= 0) return

        const requirementCheck = checkSubjectRequirements(subjects, course.subjectRequirements)
        if (calculatedAPS >= apsRequired && requirementCheck.meets) {
          uniMatches.push({
            course: course as Course,
            university: {
              id: universityInstance.id,
              name: universityInstance.name,
              shortName: universityInstance.shortName,
              location: universityInstance.getLocationString(),
              website: universityInstance.website || "",
              courses: [],
            },
            meetsRequirements: true,
            missingRequirements: [],
            metRequirements: requirementCheck.met,
          })
        }
      })
    })

    console.log(`Found ${uniMatches.length} matching courses for the mock student.`)

    const matchesByUni = uniMatches.reduce((acc, match) => {
      acc[match.university.id] = (acc[match.university.id] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    console.log("Matches by university:", matchesByUni)

    expect(uniMatches.length).toBeGreaterThan(0)
  })

  it("should match more courses for a high-performing student", () => {
    const highSubjects: SubjectEntry[] = [
      { id: "1", name: "English Home Language", percentage: 85 },
      { id: "2", name: "Mathematics", percentage: 80 },
      { id: "3", name: "Physical Sciences", percentage: 78 },
      { id: "4", name: "Life Sciences", percentage: 82 },
      { id: "5", name: "Geography", percentage: 75 },
      { id: "6", name: "Afrikaans First Additional Language", percentage: 72 },
      { id: "7", name: "Life Orientation", percentage: 90 },
    ]
    const highPercentages: Record<string, number> = Object.fromEntries(
      highSubjects.map((s) => [s.name, s.percentage])
    )
    const lowSubjects: SubjectEntry[] = [
      { id: "1", name: "English Home Language", percentage: 45 },
      { id: "2", name: "Mathematics", percentage: 40 },
      { id: "3", name: "Physical Sciences", percentage: 35 },
      { id: "4", name: "Life Sciences", percentage: 42 },
      { id: "5", name: "Geography", percentage: 38 },
      { id: "6", name: "Afrikaans First Additional Language", percentage: 40 },
      { id: "7", name: "Life Orientation", percentage: 50 },
    ]
    const lowPercentages: Record<string, number> = Object.fromEntries(
      lowSubjects.map((s) => [s.name, s.percentage])
    )

    const universityInstances = getAllUniversityInstances()
    let highMatches = 0
    let lowMatches = 0

    universityInstances.forEach((universityInstance) => {
      const highAPS = universityInstance.calculateApsScore(highPercentages)
      const lowAPS = universityInstance.calculateApsScore(lowPercentages)

      universityInstance.courses.forEach((course) => {
        const apsRequired = (course as Course).apsMin ?? (course as Course).apsRequired ?? 0
        if (apsRequired <= 0) return
        if (highAPS >= apsRequired && checkSubjectRequirements(highSubjects, course.subjectRequirements).meets) highMatches++
        if (lowAPS >= apsRequired && checkSubjectRequirements(lowSubjects, course.subjectRequirements).meets) lowMatches++
      })
    })

    console.log(`High performer: ${highMatches} courses, Low performer: ${lowMatches} courses`)
    expect(highMatches).toBeGreaterThan(lowMatches)
  })
})
