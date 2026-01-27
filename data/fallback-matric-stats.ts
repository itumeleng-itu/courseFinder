export const FALLBACK_DATA = {
    national: {
        passRate: 88.0,
        totalCandidates: 900000,
        totalPassed: 660000,
        year: 2025,
        bachelorPassRate: 46.0,
        bachelorPasses: 345000,
        diplomaPasses: 210000,
        higherCertificatePasses: 101000,
        distinctions: 350000, // Estimate
    },
    provinces: [
        { name: "KwaZulu-Natal", passRate: 90.6, candidates: 155000, bachelorPasses: 92000, distinctionRate: 11.2 },
        { name: "Free State", passRate: 89.3, candidates: 45000, bachelorPasses: 21000, distinctionRate: 19.1 },
        { name: "Gauteng", passRate: 89.1, candidates: 148000, bachelorPasses: 65000, distinctionRate: 5.8 },
        { name: "North West", passRate: 88.5, candidates: 52000, bachelorPasses: 23000, distinctionRate: 21.0 },
        { name: "Western Cape", passRate: 88.2, candidates: 79000, bachelorPasses: 43000, distinctionRate: 6.5 },
        { name: "Northern Cape", passRate: 87.8, candidates: 18000, bachelorPasses: 8000, distinctionRate: 10.5 },
        { name: "Mpumalanga", passRate: 86.5, candidates: 65000, bachelorPasses: 29000, distinctionRate: 38.0 },
        { name: "Limpopo", passRate: 86.2, candidates: 78000, bachelorPasses: 33000, distinctionRate: 42.0 },
        { name: "Eastern Cape", passRate: 84.2, candidates: 92000, bachelorPasses: 46000, distinctionRate: 40.0 },
    ],
}
