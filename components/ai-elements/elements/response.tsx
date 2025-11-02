"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type ResponseProps = React.PropsWithChildren<{
  className?: string
}>

// Minimal Response component inspired by AI Elements docs.
// Renders rich text content with sensible defaults for chat responses.
export function Response({ className, children }: ResponseProps) {
  return (
    <div
      className={cn(
        "prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap break-words",
        className
      )}
    >
      {children}
    </div>
  )
}

export default Response