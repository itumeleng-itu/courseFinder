"use client"
import { useToast as useToastOriginal } from "@/components/ui/use-toast"

export function useToast() {
  const originalToast = useToastOriginal()

  return originalToast
}
