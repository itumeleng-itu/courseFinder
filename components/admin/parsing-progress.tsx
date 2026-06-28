"use client"

import { Loader2, CheckCircle2, FileText, Cpu, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export type ParsingStep = "uploading" | "extracting" | "ai-parsing" | "validating" | "complete" | "error"

interface ParsingProgressProps {
  step: ParsingStep
  progress?: number
  message?: string
}

const steps = [
  { id: "uploading", label: "Uploading Document", icon: FileText },
  { id: "extracting", label: "Extracting Text", icon: FileText },
  { id: "ai-parsing", label: "AI Structural Extraction", icon: Cpu },
  { id: "validating", label: "Data Validation", icon: ShieldCheck },
]

export function ParsingProgress({ step, progress, message }: ParsingProgressProps) {
  const currentIndex =
    step === "complete" ? steps.length : steps.findIndex((s) => s.id === step)

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base">Processing Document</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {steps.map((s, idx) => {
          const isCompleted = idx < currentIndex || step === "complete"
          const isCurrent = idx === currentIndex && step !== "error" && step !== "complete"
          const isError = step === "error" && idx === currentIndex
          const isPending = idx > currentIndex && step !== "complete"

          return (
            <div key={s.id} className="flex items-start gap-3">
              <div
                className={[
                  "mt-0.5 p-1.5 rounded-full shrink-0 transition-colors",
                  isCompleted ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "",
                  isCurrent ? "bg-primary/10 text-primary ring-2 ring-primary/30" : "",
                  isPending ? "bg-muted text-muted-foreground" : "",
                  isError ? "bg-destructive/10 text-destructive" : "",
                ].join(" ")}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <s.icon className="w-4 h-4" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${isPending ? "text-muted-foreground" : ""}`}>
                  {s.label}
                </p>
                {isCurrent && (
                  <div className="mt-1.5">
                    {progress !== undefined && (
                      <div className="w-full h-1 bg-muted rounded-full overflow-hidden mb-1.5">
                        <div
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                    <p className="text-xs text-primary animate-pulse">{message || "Processing…"}</p>
                  </div>
                )}
                {isError && (
                  <p className="text-xs text-destructive mt-1">{message || "An error occurred"}</p>
                )}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
