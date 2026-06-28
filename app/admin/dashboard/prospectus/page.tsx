"use client"

import { useState } from "react"
import { UploadDropzone } from "@/components/admin/upload-dropzone"
import { UniversitySelector } from "@/components/admin/university-selector"
import { ParsingProgress, type ParsingStep } from "@/components/admin/parsing-progress"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, RefreshCw, Save } from "lucide-react"
import type { ProspectusData } from "@/lib/admin/validators"
import type { ValidationIssue } from "@/lib/admin/validators"

export default function ProspectusUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [universityHint, setUniversityHint] = useState<string>("")
  const [step, setStep] = useState<ParsingStep | null>(null)
  const [progressMsg, setProgressMsg] = useState("")
  
  const [parsedData, setParsedData] = useState<ProspectusData | null>(null)
  const [validationIssues, setValidationIssues] = useState<ValidationIssue[]>([])
  
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleUploadAndParse = async () => {
    if (!file) return

    setStep("uploading")
    setProgressMsg("Sending file to server...")
    setParsedData(null)
    setValidationIssues([])
    setSaveSuccess(false)

    try {
      const formData = new FormData()
      formData.append("file", file)
      if (universityHint) {
        formData.append("universityHint", universityHint)
      }

      setStep("extracting")
      setProgressMsg("Extracting text from PDF (this may take a minute)...")
      
      const res = await fetch("/api/admin/prospectus/parse", {
        method: "POST",
        body: formData,
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || "Failed to parse document")
      }

      setStep("validating")
      setProgressMsg("Validating extracted data...")
      
      // Data is returned from AI, now we validate it locally before review
      setParsedData(result.data)
      setStep("complete")
      
    } catch (error) {
      setStep("error")
      setProgressMsg(error instanceof Error ? error.message : "An unknown error occurred")
    }
  }

  const handleSave = async () => {
    if (!parsedData) return
    
    setIsSaving(true)
    try {
      const res = await fetch("/api/admin/prospectus/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      })
      
      const result = await res.json()
      
      if (!res.ok) {
        throw new Error(result.error || "Failed to save")
      }
      
      setSaveSuccess(true)
      // Show any server-side validation issues/warnings
      if (result.warnings && result.warnings.length > 0) {
        setValidationIssues(result.warnings)
      }
    } catch (error) {
      alert(`Save failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsSaving(false)
    }
  }

  const reset = () => {
    setFile(null)
    setStep(null)
    setParsedData(null)
    setSaveSuccess(false)
    setValidationIssues([])
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Prospectus Upload</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Upload a university prospectus PDF. AI will automatically extract and structure all course data.
        </p>
      </div>

      {!parsedData && !step && (
        <div className="space-y-6 rounded-lg border bg-card p-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">University (Optional)</label>
            <UniversitySelector value={universityHint} onChange={setUniversityHint} />
            <p className="text-xs text-muted-foreground">
              Providing this helps the AI identify the correct university if the PDF doesn't state it clearly on the first page.
            </p>
          </div>

          <UploadDropzone onFileSelect={setFile} label="Drag & drop prospectus PDF here" />

          <Button 
            className="w-full" 
            disabled={!file} 
            onClick={handleUploadAndParse}
          >
            Process Document
          </Button>
        </div>
      )}

      {step && !parsedData && (
        <ParsingProgress step={step} message={progressMsg} />
      )}

      {parsedData && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4">
          <div className="rounded-lg border bg-card p-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <CheckCircle className="text-green-400 w-5 h-5" />
                Extraction Successful
              </h2>
              <p className="text-muted-foreground mt-1">
                Found {parsedData.courses.length} courses for {parsedData.name} ({parsedData.shortName}).
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={reset} disabled={isSaving}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Start Over
              </Button>
              {!saveSuccess && (
                <Button 
                  onClick={handleSave} 
                  disabled={isSaving}
                  className="bg-blue-600 hover:bg-blue-500"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Saving..." : "Confirm & Save"}
                </Button>
              )}
            </div>
          </div>
          
          {saveSuccess && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">Saved Successfully!</p>
                <p className="text-sm opacity-80 mt-1">
                  The data for {parsedData.name} has been updated in the system. The changes will be live immediately.
                </p>
              </div>
            </div>
          )}

          {validationIssues.length > 0 && (
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <h3 className="text-yellow-400 font-medium flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4" />
                Validation Warnings
              </h3>
              <ul className="space-y-2 text-sm text-yellow-400/80">
                {validationIssues.map((issue, i) => (
                  <li key={i}>• <span className="font-mono text-xs opacity-70">[{issue.path}]</span> {issue.message}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-lg border bg-card overflow-hidden">
            <div className="p-4 bg-muted/50 border-b font-medium">
              Extracted Courses Preview
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/40">
                  <tr>
                    <th className="px-4 py-3">Faculty</th>
                    <th className="px-4 py-3">Course Name</th>
                    <th className="px-4 py-3 text-center">Min APS</th>
                    <th className="px-4 py-3">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {parsedData.courses.map((course) => (
                    <tr key={course.id} className="hover:bg-muted/50">
                      <td className="px-4 py-3 text-white/70">{course.faculty}</td>
                      <td className="px-4 py-3 font-medium">{course.name}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-block px-2 py-1 bg-white/10 rounded-md text-blue-400 font-mono text-xs">
                          {course.apsMin}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white/70">{course.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
