import { useState, useCallback, useEffect, useMemo } from "react"
import { normalizeProvince } from "@/lib/geo-constants"

export interface SeriesPoint { year: number; passRate: number }
export interface ApiResponse {
    success: boolean
    province: string
    endYear: number
    provinceSeries: SeriesPoint[]
    nationalSeries: SeriesPoint[]
    provinceAvg: number
    nationalAvg: number
}

export type GeoPhase = "idle" | "locating" | "geocoding" | "fetching" | "done" | "error"

export function useGeoStats() {
    const [loading, setLoading] = useState(true)
    const [phase, setPhase] = useState<GeoPhase>("idle")
    const [error, setError] = useState<string | null>(null)
    const [province, setProvince] = useState<string | null>(null)
    const [data, setData] = useState<ApiResponse | null>(null)

    const cacheKey = "geoProvince:v1"
    const cacheTTL = 4 * 60 * 60 * 1000 // 4 hours

    const loadFromCache = useCallback(() => {
        try {
            const raw = sessionStorage.getItem(cacheKey)
            if (!raw) return null
            const parsed = JSON.parse(raw)
            if (Date.now() - parsed.timestamp > cacheTTL) return null
            return typeof parsed.province === "string" ? parsed.province : null
        } catch { return null }
    }, [cacheTTL])

    const saveToCache = useCallback((prov: string) => {
        try {
            sessionStorage.setItem(cacheKey, JSON.stringify({ province: prov, timestamp: Date.now() }))
        } catch { }
    }, [])

    const detectLocation = useCallback(async () => {
        setPhase("locating")
        setError(null)
        return new Promise<GeolocationPosition>((resolve, reject) => {
            if (!("geolocation" in navigator)) {
                reject(new Error("Geolocation is not supported on this device."))
                return
            }
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000,
            })
        })
    }, [])

    const reverseGeocode = useCallback(async (lat: number, lon: number) => {
        setPhase("geocoding")
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1&extratags=1`
        const resp = await fetch(url, {
            headers: {
                "Accept": "application/json",
                "X-App-Name": "CourseFinder SA"
            },
        })
        if (!resp.ok) throw new Error(`Reverse geocoding failed (${resp.status})`)
        const json = await resp.json()
        const candidates = [json?.address?.state, json?.address?.county, json?.address?.region, json?.address?.province]
            .filter((s): s is string => Boolean(s))
            .map((s) => normalizeProvince(s))
            .filter((s): s is string => Boolean(s))
        const prov = candidates[0] || null
        if (!prov) throw new Error("Unable to determine province from coordinates.")
        return prov
    }, [])

    const detectLocationByIP = useCallback(async () => {
        try {
            setPhase("locating")
            const resp = await fetch("https://ipapi.co/json/")
            if (!resp.ok) throw new Error("IP location service unavailable")
            const json = await resp.json()
            const prov = normalizeProvince(json.region || json.region_name || "")
            if (!prov) {
                console.warn("IP region not recognized:", json.region)
                return null
            }
            return prov
        } catch (e) {
            console.error("IP detection error:", e)
            return null
        }
    }, [])

    const fetchSeries = useCallback(async (prov: string) => {
        setPhase("fetching")
        const resp = await fetch(`/api/provincial-pass-rates?province=${encodeURIComponent(prov)}&years=5`)
        if (!resp.ok) throw new Error("Failed to load provincial pass rates.")
        const json = await resp.json()
        if (!json?.success) throw new Error("Provincial data unavailable.")
        return json as ApiResponse
    }, [])

    const handleRetry = useCallback(() => {
        setError(null)
        setLoading(true)
        setData(null)
        setProvince(null)
        setPhase("idle")
    }, [])

    const handleManualSelect = useCallback(async (prov: string) => {
        try {
            setLoading(true)
            setError(null)
            setProvince(prov)
            saveToCache(prov)
            const series = await fetchSeries(prov)
            setData(series)
            setPhase("done")
        } catch (e: unknown) {
            console.error("Manual selection error:", e)
            setError(e instanceof Error ? e.message : "Failed to load data for selected province.")
            setPhase("error")
        } finally {
            setLoading(false)
        }
    }, [fetchSeries, saveToCache])

    useEffect(() => {
        let cancelled = false
        async function run() {
            if (phase !== "idle") return
            try {
                setLoading(true)
                const cached = loadFromCache()
                let prov = cached
                if (!prov) {
                    try {
                        const pos = await detectLocation()
                        prov = await reverseGeocode(pos.coords.latitude, pos.coords.longitude)
                    } catch (geoErr) {
                        console.warn("Geolocation fallback to IP")
                        prov = await detectLocationByIP()
                    }
                    if (prov) saveToCache(prov)
                }
                if (cancelled) return
                if (!prov) {
                    setPhase("error")
                    setLoading(false)
                    return
                }
                setProvince(prov)
                const series = await fetchSeries(prov)
                if (cancelled) return
                setData(series)
                setPhase("done")
            } catch (e: unknown) {
                console.error("GeoProvincialPass error:", e)
                setError(e instanceof Error ? e.message : "Unable to detect location.")
                setPhase("error")
            } finally {
                if (!cancelled) setLoading(false)
            }
        }
        run()
        return () => { cancelled = true }
    }, [phase, detectLocation, detectLocationByIP, reverseGeocode, fetchSeries, loadFromCache, saveToCache])

    const yoy = useMemo(() => {
        if (!data?.provinceSeries) return [] as Array<{ year: number; delta: number }>
        const arr: Array<{ year: number; delta: number }> = []
        for (let i = 1; i < data.provinceSeries.length; i++) {
            const prev = data.provinceSeries[i - 1]
            const curr = data.provinceSeries[i]
            arr.push({ year: curr.year, delta: Number((curr.passRate - prev.passRate).toFixed(1)) })
        }
        return arr
    }, [data])

    return {
        loading,
        phase,
        error,
        province,
        data,
        yoy,
        handleRetry,
        handleManualSelect
    }
}
