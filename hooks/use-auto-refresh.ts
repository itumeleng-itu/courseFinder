import { useCallback, useEffect, useRef, useState, useTransition } from "react"

interface AutoRefreshOptions {
  immediate?: boolean
  pauseWhenHidden?: boolean
  onEvent?: (event: string, detail?: any) => void
}

export function useAutoRefresh(
  refreshFn: (signal?: AbortSignal) => Promise<void>,
  intervalMs: number,
  options: AutoRefreshOptions = { immediate: true, pauseWhenHidden: true }
) {
  const { immediate = true, pauseWhenHidden = true, onEvent } = options
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [isPending, startTransition] = useTransition()
  const timerRef = useRef<number | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const clearTimer = useCallback(() => {
    if (timerRef.current != null) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const stop = useCallback(() => {
    clearTimer()
    abortRef.current?.abort()
    onEvent?.("autoRefresh:stop")
  }, [clearTimer, onEvent])

  const runRefresh = useCallback(async () => {
    if (refreshing) return
    setRefreshing(true)
    onEvent?.("autoRefresh:start")

    // Abort previous in-flight fetches
    if (abortRef.current) abortRef.current.abort()
    abortRef.current = new AbortController()

    try {
      await refreshFn(abortRef.current.signal)
      startTransition(() => {
        setLastUpdated(new Date())
      })
      onEvent?.("autoRefresh:success")
    } catch (err) {
      console.error("Auto refresh error:", err)
      onEvent?.("autoRefresh:error", err)
    } finally {
      setRefreshing(false)
    }
  }, [refreshFn, onEvent, refreshing])

  const start = useCallback(() => {
    stop() // ensure clean start
    if (immediate) {
      // Fire and forget; don't block UI
      void runRefresh()
    }
    timerRef.current = window.setInterval(() => {
      void runRefresh()
    }, Math.max(10_000, intervalMs)) // safety minimum: 10s
    onEvent?.("autoRefresh:startTimer", { intervalMs })
  }, [immediate, intervalMs, runRefresh, stop, onEvent])

  useEffect(() => {
    if (pauseWhenHidden) {
      const onVisibility = () => {
        if (document.visibilityState === "hidden") {
          stop()
        } else if (document.visibilityState === "visible") {
          start()
        }
      }
      document.addEventListener("visibilitychange", onVisibility)
      return () => document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [pauseWhenHidden, start, stop])

  useEffect(() => {
    return () => stop()
  }, [stop])

  return { refreshing: refreshing || isPending, lastUpdated, start, stop }
}