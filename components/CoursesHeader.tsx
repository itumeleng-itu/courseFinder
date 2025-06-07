import { SchoolIcon } from "lucide-react"

export default function CoursesHeader() {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <SchoolIcon className="h-8 w-8" />
        <h1 className="text-3xl font-bold">CourseFinder South Africa</h1>
      </div>
      <p className="text-xl">Find South African university courses you qualify for based on your NSC results</p>
    </div>
  )
}
