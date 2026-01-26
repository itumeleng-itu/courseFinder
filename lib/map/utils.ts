import { SESSION_KEYS, PROVINCES } from "./constants"
import { SAProvincesGeoJSON, ProvinceSeriesResponse } from "./types"

export async function fetchJSON<T>(url: string): Promise<T> {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Request failed: ${res.status}`)
    return (await res.json()) as T
}

export async function loadZAProvincesGeoJSON(): Promise<SAProvincesGeoJSON> {
    if (typeof window !== "undefined") {
        const ttl = sessionStorage.getItem(SESSION_KEYS.geojsonTTL)
        const cached = sessionStorage.getItem(SESSION_KEYS.geojson)
        if (cached && ttl && Number(ttl) > Date.now()) return JSON.parse(cached)
    }

    const meta = await fetchJSON<Array<{ gjDownloadURL?: string }>>("https://www.geoboundaries.org/api/current/gbOpen/ZAF/ADM1/")
    const gj = meta?.[0]?.gjDownloadURL; if (!gj) throw new Error("No gjDownloadURL found")
    const geo = await fetchJSON<SAProvincesGeoJSON>(gj)

    if (typeof window !== "undefined") {
        sessionStorage.setItem(SESSION_KEYS.geojson, JSON.stringify(geo))
        sessionStorage.setItem(SESSION_KEYS.geojsonTTL, String(Date.now() + 24 * 60 * 60 * 1000))
    }
    return geo
}

export async function prefetchAllProvinceSeries(): Promise<Record<string, ProvinceSeriesResponse>> {
    if (typeof window !== "undefined") {
        const ttl = sessionStorage.getItem(SESSION_KEYS.dataTTL)
        const cached = sessionStorage.getItem(SESSION_KEYS.data)
        if (cached && ttl && Number(ttl) > Date.now()) return JSON.parse(cached)
    }

    const results = await Promise.all(PROVINCES.map(async (p) => {
        const r = await fetchJSON<ProvinceSeriesResponse>(`/api/provincial-pass-rates?province=${encodeURIComponent(p)}`)
        return [p, r] as const
    }))
    const map = Object.fromEntries(results)

    if (typeof window !== "undefined") {
        sessionStorage.setItem(SESSION_KEYS.data, JSON.stringify(map))
        sessionStorage.setItem(SESSION_KEYS.dataTTL, String(Date.now() + 2 * 60 * 60 * 1000))
    }
    return map
}
