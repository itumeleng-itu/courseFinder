"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useEffect, useMemo, useState } from "react"

function Countdown({ createdAt, duration = 30000 }: { createdAt?: number; duration?: number }) {
  const [now, setNow] = useState<number>(Date.now())
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(i)
  }, [])
  const leftMs = useMemo(() => {
    const start = createdAt || Date.now()
    const end = start + duration
    return Math.max(0, end - now)
  }, [createdAt, duration, now])
  const s = Math.ceil(leftMs / 1000)
  return <span className="text-xs text-muted-foreground">Auto-dismiss in {s}s</span>
}

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, createdAt, duration, ...props }) {
        return (
          <Toast key={id} {...props} duration={duration}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
              <Countdown createdAt={createdAt} duration={duration} />
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
