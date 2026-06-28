"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { UploadCloud, X, CheckCircle2 } from "lucide-react"

interface UploadDropzoneProps {
  onFileSelect: (file: File | null) => void
  accept?: Record<string, string[]>
  maxSize?: number
  label?: string
  disabled?: boolean
}

export function UploadDropzone({
  onFileSelect,
  accept = { "application/pdf": [".pdf"] },
  maxSize = 20 * 1024 * 1024,
  label = "Drag & drop a PDF here, or click to select",
  disabled = false,
}: UploadDropzoneProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string>("")

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setError("")
      if (rejectedFiles.length > 0) {
        const code = rejectedFiles[0].errors[0]?.code
        setError(
          code === "file-too-large"
            ? `File too large. Max size is ${Math.round(maxSize / 1024 / 1024)} MB.`
            : "Invalid file type. Please upload a supported file."
        )
        return
      }
      if (acceptedFiles.length > 0) {
        setSelectedFile(acceptedFiles[0])
        onFileSelect(acceptedFiles[0])
      }
    },
    [maxSize, onFileSelect]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles: 1,
    disabled,
  })

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedFile(null)
    onFileSelect(null)
    setError("")
  }

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={[
          "relative overflow-hidden border-2 border-dashed rounded-xl p-8 transition-all duration-200 cursor-pointer",
          disabled ? "opacity-50 cursor-not-allowed" : "",
          isDragActive ? "border-primary bg-primary/5 scale-[1.01]" : "border-border hover:border-primary/50 hover:bg-muted/40",
          selectedFile ? "border-emerald-500/60 bg-emerald-500/5" : "",
        ].join(" ")}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center justify-center text-center gap-3">
          {selectedFile ? (
            <>
              <div className="p-3 bg-emerald-500/10 rounded-full text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <p className="font-medium">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              {!disabled && (
                <button
                  onClick={handleRemove}
                  className="absolute top-3 right-3 p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </>
          ) : (
            <>
              <div className={`p-3 rounded-full transition-colors ${isDragActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                <UploadCloud className={`w-7 h-7 ${isDragActive ? "animate-bounce" : ""}`} />
              </div>
              <div>
                <p className="font-medium">{label}</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Supports PDF · Max {Math.round(maxSize / 1024 / 1024)} MB
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {error && (
        <p className="mt-2 text-sm text-destructive animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  )
}
