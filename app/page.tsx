"use client"

import { useState } from "react"
import type { Subject } from "@/components/SubjectSelect"
import { getAPSPoints } from "@/utils/calculations"
import { getAllCourses } from "@/data/universities"
import CoursesHeader from "@/components/CoursesHeader"
import SubjectsForm from "@/components/SubjectsForm"
import APSScoreDisplay from "@/components/APSScoreDisplay"
import QualifyingCourses from "@/components/QualifyingCourses"
import type { Course } from "@/lib/types"

export default function Home() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [apsScore, setApsScore] = useState<number | null>(null)
  const [qualifyingCourses, setQualifyingCourses] = useState<Array<Course & { university: string }>>([])
  const [loading, setLoading] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>(null)

  const selectedSubjects = subjects.map((s) => s.name).filter(Boolean)

  const addSubject = () => {
    setSubjects([...subjects, { name: "", percentage: "" }])
  }

  const removeSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index))
  }

  const updateSubject = (index: number, name: string) => {
    const newSubjects = [...subjects]
    newSubjects[index].name = name
    setSubjects(newSubjects)
  }

  const updatePercentage = (index: number, percentage: string) => {
    const newSubjects = [...subjects]
    newSubjects[index].percentage = percentage
    setSubjects(newSubjects)
  }

  const calculateQualifications = () => {
    setLoading(true)
    try {
      let totalPoints = 0
      const subjectLevels: Record<string, number> = {}
      let validSubjectsCount = 0

      subjects.forEach((subject) => {
        if (subject.name && subject.percentage) {
          const percentage = Number.parseInt(subject.percentage)
          const points = getAPSPoints(percentage)
          subjectLevels[subject.name] = points

          if (subject.name === "Life Orientation") {
            return
          }

          totalPoints += points
          validSubjectsCount++
        }
      })

      if (validSubjectsCount < 6) {
        alert("Please enter at least 6 subjects excluding Life Orientation for a valid APS calculation.")
        setLoading(false)
        return
      }

      setApsScore(totalPoints)

      // Get all courses from all universities
      const allCourses = getAllCourses()

      // Debug info
      const universityCounts: Record<string, number> = {}
      allCourses.forEach((course) => {
        if (!universityCounts[course.university]) {
          universityCounts[course.university] = 0
        }
        universityCounts[course.university]++
      })

      // Check specifically for TUT
      const tutCourses = allCourses.filter((course) => course.university === "Tshwane University of Technology")
      console.log(`Found ${tutCourses.length} TUT courses in all courses`)

      setDebugInfo({
        totalCourses: allCourses.length,
        universityCounts,
        apsScore: totalPoints,
        subjectLevels,
        tutCoursesCount: tutCourses.length,
      })

      // Filter courses based on APS score and subject requirements
      const qualifying = allCourses.filter((course) => {
        // First check APS score
        if (totalPoints < course.apsMin) {
          return false
        }

        // Then check subject requirements if they exist
        if (course.subjectRequirements && Object.keys(course.subjectRequirements).length > 0) {
          // Check if the student meets the subject requirements
          for (const [subject, requirement] of Object.entries(course.subjectRequirements)) {
            // Case 1: Simple requirement (e.g., Mathematics: 5)
            if (typeof requirement === "number") {
              // Check if any subject matches (case-insensitive and partial match)
              let foundMatch = false
              for (const [studentSubject, level] of Object.entries(subjectLevels)) {
                // Normalize subject names for comparison
                const normalizedRequirement = subject.toLowerCase()
                const normalizedStudentSubject = studentSubject.toLowerCase()

                // Check for exact match or if student subject contains the requirement
                if (
                  normalizedStudentSubject === normalizedRequirement ||
                  normalizedStudentSubject.includes(normalizedRequirement) ||
                  normalizedRequirement.includes(normalizedStudentSubject)
                ) {
                  if (level >= requirement) {
                    foundMatch = true
                    break
                  }
                }
              }

              if (!foundMatch) {
                return false
              }
            }
            // Case 2: Alternative requirements (e.g., Mathematics OR Mathematical Literacy)
            else if (requirement.alternatives) {
              // Check if at least one alternative is met
              let meetsAnyAlternative = false

              for (const alt of requirement.alternatives) {
                // Check if any subject matches (case-insensitive and partial match)
                for (const [studentSubject, level] of Object.entries(subjectLevels)) {
                  // Normalize subject names for comparison
                  const normalizedRequirement = alt.subject.toLowerCase()
                  const normalizedStudentSubject = studentSubject.toLowerCase()

                  // Check for exact match or if student subject contains the requirement
                  if (
                    normalizedStudentSubject === normalizedRequirement ||
                    normalizedStudentSubject.includes(normalizedRequirement) ||
                    normalizedRequirement.includes(normalizedStudentSubject)
                  ) {
                    if (level >= alt.level) {
                      meetsAnyAlternative = true
                      break
                    }
                  }
                }

                if (meetsAnyAlternative) break
              }

              if (!meetsAnyAlternative) {
                return false
              }
            }
          }
        }

        // If we get here, the student meets all requirements
        return true
      })

      // Check specifically for TUT in qualifying courses
      const qualifyingTutCourses = qualifying.filter(
        (course) => course.university === "Tshwane University of Technology",
      )
      console.log(`Found ${qualifyingTutCourses.length} qualifying TUT courses`)

      // Sort qualifying courses by university name for consistency
      const sortedQualifying = qualifying.sort((a, b) => a.university.localeCompare(b.university))

      setQualifyingCourses(sortedQualifying)
    } catch (error) {
      console.error("Error calculating qualifying courses:", error)
      alert("Failed to calculate qualifying courses. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const canCalculate =
    subjects.length >= 6 &&
    subjects.every((s) => s.name && s.percentage) &&
    new Set(selectedSubjects).size === selectedSubjects.length

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-4">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 shadow-lg w-full">
        <CoursesHeader />
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 shadow-lg">
        <SubjectsForm
          subjects={subjects}
          selectedSubjects={selectedSubjects}
          onAddSubject={addSubject}
          onCalculate={calculateQualifications}
          onSubjectChange={updateSubject}
          onPercentageChange={updatePercentage}
          onRemoveSubject={removeSubject}
          canCalculate={canCalculate}
          loading={loading}
        />
      </div>

      {apsScore !== null && (
        <div className="space-y-6">
          <APSScoreDisplay score={apsScore} />
          <QualifyingCourses courses={qualifyingCourses} loading={loading} />

          {/* Debug information - can be removed in production */}
          {debugInfo && (
            <div className="text-xs text-gray-500 mt-4">
              <details>
                <summary>Debug Info</summary>
                <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-60">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
