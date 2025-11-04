"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PlusCircle, FileText } from "lucide-react"
import { calculateAPS } from "@/lib/aps-calculator"
import type { SubjectEntry, CourseResult } from "@/lib/types"
import CourseList from "@/components/course-list"
import SubjectList from "@/components/subject-list"

export default function SubjectForm() {
  const [subjects, setSubjects] = useState<SubjectEntry[]>([])
  const [currentSubject, setCurrentSubject] = useState<{ name: string; percentage: string }>({
    name: "",
    percentage: "",
  })
  const [apsScore, setApsScore] = useState<number | null>(null)
  const [qualifyingCourses, setQualifyingCourses] = useState<CourseResult[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleAddSubject = () => {
    if (!currentSubject.name || !currentSubject.percentage) {
      alert("Please select a subject and enter a percentage")
      return
    }

    const percentage = Number(currentSubject.percentage)
    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      alert("Please enter a valid percentage between 0 and 100")
      return
    }

    // Check if subject already exists
    if (subjects.some((s) => s.name === currentSubject.name)) {
      alert("This subject has already been added")
      return
    }

    const newId = subjects.length > 0 ? Math.max(...subjects.map((s) => s.id)) + 1 : 1
    setSubjects([...subjects, { id: newId, ...currentSubject }])
    setCurrentSubject({ name: "", percentage: "" })
  }

  const handleRemoveSubject = (id: number) => {
    setSubjects(subjects.filter((subject) => subject.id !== id))
  }

  const findCourses = () => {
    if (subjects.length < 6) {
      alert("Please add at least 6 subjects excluding Life Orientation")
      return
    }

    // Calculate APS score
    const score = calculateAPS(subjects)
    setApsScore(score)

    // Get qualifying courses
    import("@/lib/course-matcher").then(({ findQualifyingCourses }) => {
      const courses = findQualifyingCourses(score, subjects)
      setQualifyingCourses(courses)
      setShowResults(true)
    })
  }

  const resetForm = () => {
    setShowResults(false)
    setApsScore(null)
    setQualifyingCourses([])
  }

  return (
    <>
      {!showResults ? (
        <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
          <CardHeader>
            <CardTitle className="text-2xl">Enter your NSC Subject Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Select
                    value={currentSubject.name}
                    onValueChange={(value) => setCurrentSubject({ ...currentSubject, name: value })}
                  >
                    <SelectTrigger className="bg-white/20 border-none text-white">
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Languages</SelectLabel>
                        <SelectItem value="english-home">English Home Language</SelectItem>
                        <SelectItem value="english-fal">English First Additional Language</SelectItem>
                        <SelectItem value="afrikaans-home">Afrikaans Home Language</SelectItem>
                        <SelectItem value="afrikaans-fal">Afrikaans First Additional Language</SelectItem>
                        <SelectItem value="isizulu-home">IsiZulu Home Language</SelectItem>
                        <SelectItem value="isizulu-fal">IsiZulu First Additional Language</SelectItem>
                        <SelectItem value="isixhosa-home">IsiXhosa Home Language</SelectItem>
                        <SelectItem value="isixhosa-fal">IsiXhosa First Additional Language</SelectItem>
                        <SelectItem value="sepedi-home">Sepedi Home Language</SelectItem>
                        <SelectItem value="sepedi-fal">Sepedi First Additional Language</SelectItem>
                        <SelectItem value="setswana-home">Setswana Home Language</SelectItem>
                        <SelectItem value="setswana-fal">Setswana First Additional Language</SelectItem>
                        <SelectItem value="sesotho-home">Sesotho Home Language</SelectItem>
                        <SelectItem value="sesotho-fal">Sesotho First Additional Language</SelectItem>
                        <SelectItem value="xitsonga-home">Xitsonga Home Language</SelectItem>
                        <SelectItem value="xitsonga-fal">Xitsonga First Additional Language</SelectItem>
                        <SelectItem value="siswati-home">SiSwati Home Language</SelectItem>
                        <SelectItem value="siswati-fal">SiSwati First Additional Language</SelectItem>
                        <SelectItem value="tshivenda-home">Tshivenda Home Language</SelectItem>
                        <SelectItem value="tshivenda-fal">Tshivenda First Additional Language</SelectItem>
                        <SelectItem value="ndebele-home">isiNdebele Home Language</SelectItem>
                        <SelectItem value="ndebele-fal">isiNdebele First Additional Language</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Mathematics</SelectLabel>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="mathematical-literacy">Mathematical Literacy</SelectItem>
                        <SelectItem value="technical-mathematics">Technical Mathematics</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Sciences</SelectLabel>
                        <SelectItem value="physical-sciences">Physical Sciences</SelectItem>
                        <SelectItem value="life-sciences">Life Sciences</SelectItem>
                        <SelectItem value="agricultural-sciences">Agricultural Sciences</SelectItem>
                        <SelectItem value="technical-sciences">Technical Sciences</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Commerce</SelectLabel>
                        <SelectItem value="accounting">Accounting</SelectItem>
                        <SelectItem value="business-studies">Business Studies</SelectItem>
                        <SelectItem value="economics">Economics</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Humanities</SelectLabel>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="geography">Geography</SelectItem>
                        <SelectItem value="religion-studies">Religion Studies</SelectItem>
                        <SelectItem value="life-orientation">Life Orientation</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Other</SelectLabel>
                        <SelectItem value="consumer-studies">Consumer Studies</SelectItem>
                        <SelectItem value="tourism">Tourism</SelectItem>
                        <SelectItem value="cat">Computer Applications Technology</SelectItem>
                        <SelectItem value="information-technology">Information Technology</SelectItem>
                        <SelectItem value="engineering-graphics-design">Engineering Graphics & Design</SelectItem>
                        <SelectItem value="visual-arts">Visual Arts</SelectItem>
                        <SelectItem value="music">Music</SelectItem>
                        <SelectItem value="dramatic-arts">Dramatic Arts</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-24">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="%"
                    value={currentSubject.percentage}
                    onChange={(e) => setCurrentSubject({ ...currentSubject, percentage: e.target.value })}
                    className="bg-white/20 border-none text-white placeholder:text-white/70"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <Button onClick={handleAddSubject} className="bg-white/20 hover:bg-white/30 text-white" size="lg">
                  <PlusCircle className="mr-2 h-5 w-5" /> Add Subject
                </Button>

                <Button
                  onClick={findCourses}
                  className="bg-white/20 hover:bg-white/30 text-white"
                  size="lg"
                  disabled={subjects.length < 6}
                >
                  <FileText className="mr-2 h-5 w-5" /> Find Courses
                </Button>
              </div>

              <p className="text-sm text-white/80">
                Add at least 6 subjects excluding Life Orientation for APS calculation
              </p>

              {subjects.length > 0 && (
                <div className="mt-6">
                  <SubjectList subjects={subjects} onRemove={handleRemoveSubject} />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your APS Score: {apsScore}</CardTitle>
            </CardHeader>
            <CardContent>
              <CourseList courses={qualifyingCourses} />
              <Button onClick={resetForm} className="mt-6">
                Calculate Another Score
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
