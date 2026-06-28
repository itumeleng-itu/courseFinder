"use client"

import { useState } from "react"
import { UploadDropzone } from "@/components/admin/upload-dropzone"
import { ParsingProgress, type ParsingStep } from "@/components/admin/parsing-progress"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, RefreshCw, Save, TrendingUp } from "lucide-react"
import type { SchoolPerformance } from "@/lib/admin/validators"

export default function PerformanceUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [step, setStep] = useState<ParsingStep | null>(null)
  const [progressMsg, setProgressMsg] = useState("")
  
  const [parsedData, setParsedData] = useState<SchoolPerformance[] | null>(null)
  const [stats, setStats] = useState<any>(null)
  const [errors, setErrors] = useState<string[]>([])
  
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveStats, setSaveStats] = useState<any>(null)

  const handleUploadAndParse = async () => {
    if (!file) return

    setStep("uploading")
    setProgressMsg("Sending file to server...")
    setParsedData(null)
    setErrors([])
    setSaveSuccess(false)
    setSaveStats(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      setStep("extracting")
      setProgressMsg("Extracting text from PDF (this may take a minute)...")
      
      const res = await fetch("/api/admin/performance/parse", {
        method: "POST",
        body: formData,
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || "Failed to parse document")
      }

      setStep("validating")
      setProgressMsg("Validating extracted data...")
      
      setParsedData(result.data || [])
      setStats(result.stats)
      if (result.errors && result.errors.length > 0) {
        setErrors(result.errors)
      }
      
      setStep("complete")
    } catch (error) {
      setStep("error")
      setProgressMsg(error instanceof Error ? error.message : "An unknown error occurred")
    }
  }

  const handleSave = async () => {
    if (!parsedData || parsedData.length === 0) return
    
    setIsSaving(true)
    try {
      const res = await fetch("/api/admin/performance/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      })
      
      const result = await res.json()
      
      if (!res.ok) {
        throw new Error(result.error || "Failed to save")
      }
      
      setSaveSuccess(true)
      setSaveStats(result.stats)
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
    setErrors([])
    setStats(null)
    setSaveStats(null)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Performance Report Upload</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Upload the National Senior Certificate School Performance Report. 
          The system will automatically extract and merge the data with the rolling 3-year window.
        </p>
      </div>

      {!parsedData && !step && (
        <div className="space-y-6 rounded-lg border bg-card p-6">
          <UploadDropzone 
            onFileSelect={setFile} 
            label="Drag & drop performance report PDF here" 
            maxSize={50 * 1024 * 1024} // 50MB for large reports
            accept={{ "application/pdf": [".pdf"], "text/plain": [".txt"] }}
          />

          <Button 
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white" 
            disabled={!file} 
            onClick={handleUploadAndParse}
          >
            Process Report
          </Button>
        </div>
      )}

      {step && !parsedData && (
        <ParsingProgress step={step} message={progressMsg} />
      )}

      {parsedData && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4">
          <div className="rounded-lg border bg-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <CheckCircle className="text-emerald-400 w-5 h-5" />
                Extraction Complete
              </h2>
              <p className="text-muted-foreground mt-1">
                Successfully parsed {stats?.totalSchools || parsedData.length} schools across {stats?.provincesProcessed || '?'} province sections.
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
                  className="bg-emerald-600 hover:bg-emerald-500"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Merging..." : "Merge & Save Data"}
                </Button>
              )}
            </div>
          </div>
          
          {saveSuccess && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">Data Merged Successfully!</p>
                <p className="text-sm opacity-80 mt-1">
                  The system now contains data for {saveStats?.totalSchools} schools. 
                  ({saveStats?.newSchoolsAdded} new schools added). The 3-year rolling window has been updated.
                </p>
              </div>
            </div>
          )}

          {errors.length > 0 && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <h3 className="text-red-400 font-medium flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4" />
                Processing Errors
              </h3>
              <div className="max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                <ul className="space-y-1 text-sm text-red-400/80">
                  {errors.map((error, i) => (
                    <li key={i}>• {error}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg border bg-card p-4 flex flex-col items-center justify-center text-center">
              <div className="p-3 bg-blue-500/20 text-blue-400 rounded-full mb-3">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold">{parsedData.length}</div>
              <div className="text-sm text-muted-foreground mt-1">Schools Extracted</div>
            </div>
            
            <div className="rounded-lg border bg-card p-4 flex flex-col items-center justify-center text-center">
              <div className="p-3 bg-purple-500/20 text-purple-400 rounded-full mb-3">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold">{stats?.provincesProcessed || 0} / {stats?.provincesTotal || 0}</div>
              <div className="text-sm text-muted-foreground mt-1">Provinces Processed</div>
            </div>

            <div className="rounded-lg border bg-card p-4 flex flex-col items-center justify-center text-center">
              <div className="p-3 bg-amber-500/20 text-amber-400 rounded-full mb-3">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold">{errors.length}</div>
              <div className="text-sm text-muted-foreground mt-1">Parsing Errors</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
