export const PROVINCES = [
    "Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape", "Limpopo",
    "Mpumalanga", "North West", "Free State", "Northern Cape",
] as const

export const COLOR_SCHEMES: Record<string, string[]> = {
    Viridis: ["#440154", "#482878", "#3E4989", "#31688E", "#26828E", "#1F9E89", "#35B779", "#6CCE59", "#B8DE29", "#FDE725"],
    Warm: ["#5b1a18", "#8c2d04", "#cc4c02", "#ec7014", "#fe9929", "#fec44f", "#fee391", "#fff7bc"],
    Cool: ["#023858", "#045a8d", "#0570b0", "#3690c0", "#74a9cf", "#a6bddb", "#d0d1e6", "#e0e9f3"],
    HighContrast: ["#0b1026", "#193170", "#2657a6", "#2ea3f2", "#58d5ff", "#95e8ff", "#c2f3ff"],
}

export const SESSION_KEYS = {
    geojson: "evilcharts-provinces-geojson",
    geojsonTTL: "evilcharts-provinces-geojson-ttl",
    data: "evilcharts-provinces-data",
    dataTTL: "evilcharts-provinces-data-ttl",
}
