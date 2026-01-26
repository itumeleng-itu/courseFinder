export const PROVINCES = [
    "Gauteng",
    "Western Cape",
    "KwaZulu-Natal",
    "Eastern Cape",
    "Limpopo",
    "Mpumalanga",
    "North West",
    "Free State",
    "Northern Cape",
]

export function normalizeProvince(name: string): string | null {
    if (!name) return null
    const n = name.trim().toLowerCase()
    const map: Record<string, string> = {
        "gauteng": "Gauteng",
        "western cape": "Western Cape",
        "wc": "Western Cape",
        "kwazulu-natal": "KwaZulu-Natal",
        "kwazulu natal": "KwaZulu-Natal",
        "kzn": "KwaZulu-Natal",
        "eastern cape": "Eastern Cape",
        "ec": "Eastern Cape",
        "limpopo": "Limpopo",
        "lp": "Limpopo",
        "mpumalanga": "Mpumalanga",
        "mp": "Mpumalanga",
        "north west": "North West",
        "nw": "North West",
        "free state": "Free State",
        "fs": "Free State",
        "northern cape": "Northern Cape",
        "nc": "Northern Cape",
    }

    if (map[n]) return map[n]

    const found = PROVINCES.find((p) => {
        const pl = p.toLowerCase()
        return n === pl || n.includes(pl) || pl.includes(n)
    })

    return found || null
}

export function rateFormat(v: number) {
    return `${v.toFixed(1)}%`
}
