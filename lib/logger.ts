export type LogPayload = Record<string, any>

export function logEvent(event: string, detail?: LogPayload) {
  const entry = { event, detail: detail ?? {}, ts: new Date().toISOString() }
  try {
    // Console log
    console.log(`[AppLog] ${event}`, detail ?? {})

    // Browser-side storage and dispatch
    if (typeof window !== "undefined") {
      const key = "app:events"
      const existing: any[] = JSON.parse(localStorage.getItem(key) || "[]")
      existing.push(entry)
      const MAX = 200
      if (existing.length > MAX) existing.splice(0, existing.length - MAX)
      localStorage.setItem(key, JSON.stringify(existing))
      window.dispatchEvent(new CustomEvent("app:event", { detail: entry }))
    }
  } catch (e) {
    // ignore
  }
}