import { PROVINCES } from "./constants"

export type ProvinceValueMap = Record<(typeof PROVINCES)[number], number>

export interface ProvinceSeriesPoint {
    year: number
    passRate: number
}

export interface ProvinceSeriesResponse {
    success: boolean
    province: string
    endYear: number
    provinceSeries: ProvinceSeriesPoint[]
    nationalSeries: ProvinceSeriesPoint[]
    provinceAvg: number
    nationalAvg: number
}

export type SAProvincesGeoJSON = { type: string } & Record<string, unknown>
