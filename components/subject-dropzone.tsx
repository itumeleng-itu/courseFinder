"use client"

import { useCallback, useState } from "react"
import { Upload, X, Loader2, FileImage, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

interface SubjectDropzoneProps {
  onSubjectsExtracted: (subjects: Array<{ name: string; percentage: number }>) => void
}

export function SubjectDropzone({ onSubjectsExtracted }: SubjectDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const { toast } = useToast()

  const handleFile = useCallback(
    async (file: File) => {
      const isImage = file.type.startsWith("image/")
      const isPDF = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
      
      if (!isImage && !isPDF) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPG, PNG) or PDF",
          variant: "destructive",
        })
        return
      }

      setUploadedFile(file)
      setIsProcessing(true)

      try {
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/ocr", {
          method: "POST",
          body: formData,
        })

        const data = await response.json()

        // Check if OCR is in development
        if (data.inDevelopment) {
          toast({
            title: "Feature in Development",
            description: data.message || "OCR feature is not yet available, still in development.",
            variant: "default",
          })
          setIsProcessing(false)
          return
        }

        if (!response.ok || !data.success) {
          throw new Error(data.error || "Failed to process image")
        }

        if (data.subjects && Array.isArray(data.subjects) && data.subjects.length > 0) {
          // Filter and validate subjects
          const validSubjects = data.subjects
            .filter((s: any) => s.name && typeof s.percentage === "number")
            .map((s: any) => ({
              name: s.name.trim(),
              percentage: Math.max(0, Math.min(100, s.percentage)),
            }))

          if (validSubjects.length > 0) {
            onSubjectsExtracted(validSubjects)
            toast({
              title: "Subjects extracted successfully",
              description: `Found ${validSubjects.length} subject(s) from the image`,
            })
          } else {
            throw new Error("No valid subjects found in the image")
          }
        } else {
          throw new Error("No subjects found in the OCR response")
        }
      } catch (error) {
        console.error("OCR processing error:", error)
        toast({
          title: "Failed to extract subjects",
          description:
            error instanceof Error
              ? error.message
              : "Please try again or enter subjects manually",
          variant: "destructive",
        })
      } finally {
        setIsProcessing(false)
      }
    },
    [onSubjectsExtracted, toast]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)

      const file = e.dataTransfer.files[0]
      if (file) {
        handleFile(file)
      }
    },
    [handleFile]
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        handleFile(file)
      }
    },
    [handleFile]
  )

  const handleRemove = useCallback(() => {
    setUploadedFile(null)
  }, [])

  return (
    <Card className="glass-card">
      <CardContent className="pt-6">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative border-2 border-dashed rounded-lg p-6 transition-colors
            ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
            }
            ${isProcessing ? "opacity-50 cursor-wait" : "cursor-pointer"}
          `}
        >
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileInput}
            disabled={isProcessing}
            className="hidden"
            id="subject-image-upload"
          />

          {!uploadedFile ? (
            <label
              htmlFor="subject-image-upload"
              className="flex flex-col items-center justify-center gap-4 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <div className="text-center">
                    <p className="text-sm font-medium">Processing file...</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Extracting subjects from your results
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <div className="text-center">
                    <p className="text-sm font-medium">
                      Upload your matric results
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Drag and drop or click to select (Image or PDF)
                    </p>
                  </div>
                </>
              )}
            </label>
          ) : (
            <div className="flex items-center gap-4">
              {uploadedFile.type === "application/pdf" || uploadedFile.name.toLowerCase().endsWith(".pdf") ? (
                <FileText className="h-8 w-8 text-primary" />
              ) : (
                <FileImage className="h-8 w-8 text-primary" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{uploadedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {isProcessing ? "Processing..." : "Ready"}
                </p>
              </div>
              {!isProcessing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemove}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

