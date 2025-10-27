import { useEffect, useMemo, useRef, useState } from "react"

interface TimeSyncResult {
  syncing: boolean
  error: string | null
  networkTime: Date | null
  serverTime: Date | null
  driftMs: number | null
  timezone: string
}

const DEFAULT_INTERVAL_MS = Number(process.env.NEXT_PUBLIC_NTP_SYNC_INTERVAL_MS ?? 300_000) // 5 minutes

export function useTimeSync(intervalMs: number = DEFAULT_INTERVAL_MS): TimeSyncResult {
  const [syncing, setSyncing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [networkTime, setNetworkTime] = useState<Date | null>(null)
  const [serverTime, setServerTime] = useState<Date | null>(null)
  const [driftMs, setDriftMs] = useState<number | null>(null)
  const [timezone, setTimezone] = useState<string>(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || "Africa/Johannesburg"
    } catch {
      return "Africa/Johannesburg"
    }
  })
  const timerRef = useRef<number | null>(null)

  const fetchSync = async () => {
    if (syncing) return
    setSyncing(true)
    setError(null)
    try {
      const res = await fetch(`/api/time-sync?tz=${encodeURIComponent(timezone)}`, { cache: "no-store" })
      const json = await res.json()
      if (!json?.success) throw new Error(json?.message || "Time sync failed")
      const ntp = new Date(json.networkTimeUtc)
      const srv = new Date(json.serverLocalTimeUtc)
      setNetworkTime(ntp)
      setServerTime(srv)
      setDriftMs(Number(json.driftMs))
    } catch (err: any) {
      console.warn("Time sync error:", err?.message || err)
      setError(err?.message || "Time sync error")
    } finally {
      setSyncing(false)
    }
  }

  useEffect(() => {
    // Initial sync
    void fetchSync()

    timerRef.current = window.setInterval(() => {
      void fetchSync()
    }, Math.max(60_000, intervalMs)) // min 1 minute

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [intervalMs, timezone])

  return { syncing, error, networkTime, serverTime, driftMs, timezone }
}

export function formatInTimeZone(date: Date | null, tz: string, options: Intl.DateTimeFormatOptions = {}) {
  if (!date) return "—"
  try {
    return new Intl.DateTimeFormat(undefined, { timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit", day: "2-digit", month: "short", year: "numeric", ...options }).format(date)
  } catch {
    return date.toLocaleString()
  }
}