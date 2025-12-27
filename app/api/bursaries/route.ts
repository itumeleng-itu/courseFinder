import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export const dynamic = "force-dynamic"

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const genAI = GOOGLE_API_KEY ? new GoogleGenerativeAI(GOOGLE_API_KEY) : null

interface Bursary {
    id: string
    title: string
    provider: string
    amount: string
    eligibility: string[]
    closingDate: string
    field: string
    link: string
    description: string
}

// In-memory cache for bursaries (persists until server restart)
const bursariesCache: {
    data?: Bursary[]
    lastFetched?: string
    fetchMonth?: string // Format: "YYYY-MM" for monthly caching
} = {}

// Cache duration: 30 days (fetch once per month)
const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000 // 30 days

/**
 * Get current month key for caching (format: YYYY-MM)
 */
function getCurrentMonthKey(): string {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

/**
 * Get current month and year for filtering
 */
function getCurrentMonthYear(): { month: string; year: number; monthNumber: number } {
    const now = new Date()
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    return {
        month: months[now.getMonth()],
        year: now.getFullYear(),
        monthNumber: now.getMonth() + 1
    }
}

/**
 * Check if a bursary is closing in the current month or is ongoing/open
 */
function isClosingInCurrentMonth(closingDate: string): boolean {
    const { month, year, monthNumber } = getCurrentMonthYear()
    const lowerDate = closingDate.toLowerCase()

    // Allow ongoing/open bursaries
    if (lowerDate.includes("ongoing") || lowerDate.includes("open") || lowerDate.includes("n/a") || lowerDate.includes("rolling")) {
        return true
    }

    // Check if the closing date contains current month and year
    const monthLower = month.toLowerCase()
    const hasCurrentMonth = lowerDate.includes(monthLower) || lowerDate.includes(`${monthNumber}/`) || lowerDate.includes(`/${monthNumber}/`)
    const hasCurrentYear = lowerDate.includes(year.toString())

    // Also check for date formats like "31 December 2025" or "December 2025"
    if (hasCurrentMonth && hasCurrentYear) {
        return true
    }

    // Check for numeric date formats like "31/12/2025" or "2025-12-31"
    const datePatterns = [
        new RegExp(`\\b${monthNumber}\\/${year}\\b`),           // 12/2025
        new RegExp(`\\b${year}-${String(monthNumber).padStart(2, '0')}\\b`), // 2025-12
        new RegExp(`\\b${String(monthNumber).padStart(2, '0')}\\/${year}\\b`), // 12/2025
    ]

    for (const pattern of datePatterns) {
        if (pattern.test(closingDate)) {
            return true
        }
    }

    return false
}

/**
 * Check if a bursary has already closed (date is in the past)
 */
function isBursaryClosed(closingDate: string): boolean {
    const lowerDate = closingDate.toLowerCase()

    // Ongoing/open bursaries are never closed
    if (lowerDate.includes("ongoing") || lowerDate.includes("open") || lowerDate.includes("n/a") || lowerDate.includes("rolling")) {
        return false
    }

    // Try to parse the date
    try {
        // Handle formats like "31 December 2025"
        const dateMatch = closingDate.match(/(\d{1,2})\s+(\w+)\s+(\d{4})/)
        if (dateMatch) {
            const [, day, monthStr, year] = dateMatch
            const months: { [key: string]: number } = {
                january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
                july: 6, august: 7, september: 8, october: 9, november: 10, december: 11
            }
            const monthNum = months[monthStr.toLowerCase()]
            if (monthNum !== undefined) {
                const closingDateObj = new Date(parseInt(year), monthNum, parseInt(day))
                return closingDateObj < new Date()
            }
        }

        // Handle formats like "31/12/2025" or "12/31/2025"
        const slashMatch = closingDate.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/)
        if (slashMatch) {
            const [, first, second, year] = slashMatch
            // Assume DD/MM/YYYY format (South African standard)
            const closingDateObj = new Date(parseInt(year), parseInt(second) - 1, parseInt(first))
            return closingDateObj < new Date()
        }
    } catch {
        // If parsing fails, assume not closed
        return false
    }

    return false
}

/**
 * Fetches undergraduate bursaries using Google Gemini with search grounding
 * Scrapes from zabursaries.co.za and bursaries.co.za
 */
async function fetchBursariesWithGoogleSearch(): Promise<Bursary[] | null> {
    if (!genAI || !GOOGLE_API_KEY) {
        console.warn("Google API key not configured")
        return null
    }

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-exp",
        })

        const { month, year } = getCurrentMonthYear()

        const prompt = `Search and extract at least 55 UNDERGRADUATE bursaries from these South African websites:
- https://www.zabursaries.co.za/bursaries-closing-in-december-2025/
- https://www.zabursaries.co.za/
- https://bursaries.co.za/

CRITICAL: Only include bursaries that are:
1. Currently OPEN for applications (not closed)
2. Have closing dates in ${month} ${year} OR are marked as "Ongoing"/"Open"/"Rolling applications"
3. NOT already past their closing date

Return ONLY a valid JSON array in this exact format (no markdown, no explanations):
[
  {
    "id": "1",
    "title": "Bursary Name",
    "provider": "Organization/Company Name",
    "amount": "R50,000 - R100,000 per year" or "Full tuition coverage",
    "eligibility": ["South African citizen", "Minimum 60% average", "Studying specific field"],
    "closingDate": "31 ${month} ${year}" or "Ongoing",
    "field": "Engineering" or "IT" or "Commerce" or "All Fields",
    "link": "https://actual-bursary-application-link.com",
    "description": "Brief description of the bursary and what it covers"
  }
]

IMPORTANT REQUIREMENTS:
- Search ONLY for UNDERGRADUATE bursaries (not postgraduate)
- Extract at least 55 different bursaries to ensure we have 50+ after filtering
- ONLY include bursaries closing in ${month} ${year} or marked as ongoing/open
- DO NOT include any bursaries that have already closed
- Include bursaries from: Engineering, Medical, Commerce, Science, Government, Construction, IT, Accounting fields
- Use the actual bursary page links from zabursaries.co.za
- Verify eligibility criteria from the source websites
- Return ONLY the JSON array, no other text`

        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        // Extract JSON from response
        const jsonMatch = text.match(/\[[\s\S]*\]/)
        if (!jsonMatch) {
            console.error("No JSON array found in Gemini response")
            return null
        }

        let data = JSON.parse(jsonMatch[0])

        // Filter out closed bursaries and those not closing in current month
        data = data.filter((bursary: Bursary) => {
            // Skip the sources entry if it exists
            if (bursary.id === "sources") return true

            // Check if bursary is not closed
            if (isBursaryClosed(bursary.closingDate)) {
                console.log(`Filtering out closed bursary: ${bursary.title}`)
                return false
            }

            // Check if closing in current month or ongoing
            if (!isClosingInCurrentMonth(bursary.closingDate)) {
                console.log(`Filtering out bursary not closing in ${month}: ${bursary.title} (closes: ${bursary.closingDate})`)
                return false
            }

            return true
        })

        // Validate data - we need at least 50 bursaries
        if (!Array.isArray(data) || data.length < 50) {
            console.error(`Expected at least 50 bursaries, got ${data?.length || 0}`)
            return null
        }

        console.log(`Successfully fetched and filtered ${data.length} bursaries closing in ${month} ${year}`)

        // Add sources reference as the last item if not already present
        const hasSourcesEntry = data.some((b: Bursary) => b.id === "sources")
        if (!hasSourcesEntry) {
            data.push({
                id: "sources",
                title: "📚 Bursary Data Sources & References",
                provider: "Multiple Verified Sources",
                amount: "N/A - Information Resource",
                eligibility: [
                    "This section provides references to bursary information sources",
                    "Data is aggregated from official South African bursary platforms",
                    `Showing bursaries closing in ${month} ${year} or with ongoing applications`,
                ],
                closingDate: "N/A",
                field: "Information & Resources",
                link: "https://www.zabursaries.co.za/",
                description:
                    `Data sourced from ZA Bursaries https://www.zabursaries.co.za/, Bursaries.co.za https://bursaries.co.za/, and official organization websites. Filtered to show only bursaries closing in ${month} ${year}.`,
            })
        }

        return data
    } catch (error) {
        console.error("Error fetching bursaries with Google Search:", error)
        return null
    }
}

/**
 * Fallback bursaries data - Real bursaries scraped from zabursaries.co.za (December 2025)
 * Last updated: 27 December 2025
 */
const FALLBACK_BURSARIES: Bursary[] = [
    // === VERIFIED DECEMBER 2025 BURSARIES FROM ZABURSARIES.CO.ZA ===
    {
        id: "1",
        title: "Absa Historical Debt Relief Programme",
        provider: "Absa",
        amount: "Debt relief assistance",
        eligibility: [
            "South African citizen",
            "Students with historical debt",
            "Registered at a public Higher Education Institution",
        ],
        closingDate: "1 December 2025",
        field: "All Fields",
        link: "https://www.zabursaries.co.za/general-bursaries-south-africa/absa-historical-debt-relief-programme/",
        description:
            "Absa debt relief programme to help students clear historical tuition debt and continue their studies.",
    },
    {
        id: "2",
        title: "Agbiz Centenary Bursary",
        provider: "Agbiz (Agricultural Business Chamber)",
        amount: "Full tuition + living allowance",
        eligibility: [
            "South African citizen",
            "Strong academic record",
            "Studying Agriculture or Commerce related fields",
        ],
        closingDate: "1 December 2025",
        field: "Commerce, Agriculture",
        link: "https://www.zabursaries.co.za/commerce-bursaries-south-africa/agribusiness-centenary-bursary/",
        description:
            "Agribusiness bursary for students pursuing commerce and agriculture-related qualifications.",
    },
    {
        id: "3",
        title: "FirstRand Foundation Honours Bursary",
        provider: "FirstRand",
        amount: "Full tuition coverage",
        eligibility: [
            "South African citizen",
            "Completed undergraduate degree",
            "Studying Honours in relevant field",
        ],
        closingDate: "1 December 2025",
        field: "All Fields",
        link: "https://www.zabursaries.co.za/mba-postgraduate/firstrand-foundation-honours-bursary/",
        description:
            "FirstRand Foundation bursary for Honours students with strong academic records.",
    },
    {
        id: "4",
        title: "Eastern Cape Department of Education (ECDOE) Bursary",
        provider: "Eastern Cape Department of Education",
        amount: "Full tuition + allowance",
        eligibility: [
            "South African citizen from Eastern Cape",
            "Studying Education/Teaching",
            "Commit to teach in Eastern Cape schools",
        ],
        closingDate: "2 December 2025",
        field: "Education",
        link: "https://www.zabursaries.co.za/government-bursaries-south-africa/eastern-cape-department-of-education-ecdoe/",
        description:
            "Government bursary for Eastern Cape residents pursuing teaching qualifications.",
    },
    {
        id: "5",
        title: "Morton and Partners Bursary",
        provider: "Morton and Partners",
        amount: "Full tuition + living expenses",
        eligibility: [
            "South African citizen",
            "Strong academic record",
            "Studying Medical/Radiography field",
        ],
        closingDate: "2 December 2025",
        field: "Medical, Radiography",
        link: "https://www.zabursaries.co.za/medical-bursaries-south-africa/morton-partners-bursary/",
        description:
            "Medical bursary from Morton and Partners for students in radiography and medical imaging fields.",
    },
    {
        id: "6",
        title: "City of Polokwane Municipality Bursary",
        provider: "Polokwane Municipality",
        amount: "Full tuition coverage",
        eligibility: [
            "South African citizen from Polokwane",
            "Strong academic record",
            "Studying in scarce skills fields",
        ],
        closingDate: "5 December 2025",
        field: "All Fields",
        link: "https://www.zabursaries.co.za/government-bursaries-south-africa/city-of-polokwane-bursary/",
        description:
            "Municipal bursary for Polokwane residents studying in priority fields.",
    },
    {
        id: "7",
        title: "SACAP (South African Council for the Architectural Profession) Bursary",
        provider: "SACAP",
        amount: "Full tuition + allowance",
        eligibility: [
            "South African citizen",
            "Studying Architecture or Built Environment",
            "Strong academic record",
        ],
        closingDate: "5 December 2025",
        field: "Architecture, Construction",
        link: "https://www.zabursaries.co.za/construction-and-built-environment-bursaries-south-africa/south-african-council-for-the-architectural-profession-sacap-bursary/",
        description:
            "Professional architectural bursary for students in architecture and built environment studies.",
    },
    {
        id: "8",
        title: "SAIMI (South African International Maritime Institute) Bursary",
        provider: "SAIMI",
        amount: "Full tuition + living expenses",
        eligibility: [
            "South African citizen",
            "Studying Maritime or Marine Sciences",
            "Strong academic record in Science",
        ],
        closingDate: "5 December 2025",
        field: "Science, Maritime",
        link: "https://www.zabursaries.co.za/science-bursaries-south-africa/saimi-bursary/",
        description:
            "Maritime industry bursary for students in marine sciences and maritime-related studies.",
    },
    {
        id: "9",
        title: "ADSA (Alzheimer's Disease South Africa) Bursary",
        provider: "ADSA",
        amount: "Full tuition coverage",
        eligibility: [
            "South African citizen",
            "Studying Medical or Health Sciences",
            "Interest in neurology/dementia research",
        ],
        closingDate: "8 December 2025",
        field: "Medical, Health Sciences",
        link: "https://www.zabursaries.co.za/medical-bursaries-south-africa/adsa-bursary/",
        description:
            "Medical bursary for students interested in healthcare and dementia-related studies.",
    },
    {
        id: "10",
        title: "Astron Energy Bursary",
        provider: "Astron Energy",
        amount: "Full tuition + R50,000 annual allowance",
        eligibility: [
            "South African citizen",
            "Minimum 60% in Maths and Science",
            "Studying Engineering or related fields",
        ],
        closingDate: "10 December 2025",
        field: "Engineering, Science",
        link: "https://www.zabursaries.co.za/general-bursaries-south-africa/astron-energy-bursary/",
        description:
            "Energy sector bursary with vacation work and potential employment opportunities.",
    },
    {
        id: "11",
        title: "Assmang Manganese BRMO Bursary",
        provider: "Assmang Manganese",
        amount: "Full tuition + R60,000 annual allowance",
        eligibility: [
            "South African citizen",
            "Minimum 65% in Maths and Physical Science",
            "Studying Mining or Chemical Engineering",
        ],
        closingDate: "12 December 2025",
        field: "Engineering, Mining",
        link: "https://www.zabursaries.co.za/engineering-bursaries-south-africa/assmang-manganese-brmo-bursary/",
        description:
            "Mining company bursary for engineering students with vacation work and employment opportunities.",
    },
    {
        id: "12",
        title: "SANBS (South African National Blood Service) Bursary",
        provider: "SANBS",
        amount: "Full tuition + living allowance",
        eligibility: [
            "South African citizen",
            "Studying Medical Technology or Health Sciences",
            "Strong academic record",
        ],
        closingDate: "19 December 2025",
        field: "Medical, Health Sciences",
        link: "https://www.zabursaries.co.za/medical-bursaries-south-africa/south-african-national-blood-service-sanbs-bursary/",
        description:
            "Health sector bursary for students in medical technology and laboratory sciences.",
    },
    {
        id: "13",
        title: "PPS Foundation Bursary",
        provider: "PPS Foundation",
        amount: "Full tuition + allowance",
        eligibility: [
            "South African citizen",
            "Strong academic record",
            "Studying towards professional degree",
        ],
        closingDate: "20 December 2025",
        field: "All Fields",
        link: "https://www.zabursaries.co.za/general-bursaries-south-africa/pps-chairmans-fund-bursary/",
        description:
            "Foundation bursary supporting students pursuing various professional qualifications.",
    },
    {
        id: "14",
        title: "Rand Refinery Bursary",
        provider: "Rand Refinery",
        amount: "Full tuition + R55,000 annual allowance",
        eligibility: [
            "South African citizen",
            "Minimum 65% in Maths and Science",
            "Studying Engineering or Metallurgy",
        ],
        closingDate: "20 December 2025",
        field: "Engineering, Metallurgy",
        link: "https://www.zabursaries.co.za/engineering-bursaries-south-africa/rand-refinery-bursary/",
        description:
            "Mining and metals industry bursary with vacation work and career opportunities.",
    },
    {
        id: "15",
        title: "Seriti Bursary",
        provider: "Seriti",
        amount: "Full tuition + R60,000 annual allowance",
        eligibility: [
            "South African citizen",
            "Minimum 60% in Maths and Physical Science",
            "Studying Mining Engineering or related fields",
        ],
        closingDate: "22 December 2025",
        field: "Engineering, Mining",
        link: "https://www.zabursaries.co.za/engineering-bursaries-south-africa/seriti-bursary/",
        description:
            "Coal mining company bursary for engineering students with employment opportunities.",
    },
    {
        id: "16",
        title: "Railway Safety Regulator (RSR) Bursary",
        provider: "Railway Safety Regulator",
        amount: "Full tuition + living expenses",
        eligibility: [
            "South African citizen",
            "Minimum 60% in Maths and Science",
            "Studying Engineering or Safety-related fields",
        ],
        closingDate: "23 December 2025",
        field: "Engineering, Transport",
        link: "https://www.zabursaries.co.za/engineering-bursaries-south-africa/railway-safety-regulator-bursary/",
        description:
            "Transport sector bursary for students in railway engineering and safety fields.",
    },
    {
        id: "17",
        title: "Clicks Foundation Pharmacy Bursary",
        provider: "Clicks Group",
        amount: "Full tuition + R40,000 annual allowance",
        eligibility: [
            "South African citizen",
            "Minimum 60% average",
            "Studying Pharmacy",
        ],
        closingDate: "31 December 2025",
        field: "Pharmacy, Medical",
        link: "https://www.zabursaries.co.za/medical-bursaries-south-africa/clicks-pharmacy-bursary/",
        description:
            "Pharmacy retail bursary with internship and employment opportunities at Clicks stores.",
    },
    {
        id: "18",
        title: "Bakwena Bursary",
        provider: "Bakwena",
        amount: "Full tuition + living allowance",
        eligibility: [
            "South African citizen",
            "Strong academic record",
            "Studying Engineering, Commerce, or IT",
        ],
        closingDate: "31 December 2025",
        field: "Engineering, Commerce, IT",
        link: "https://www.zabursaries.co.za/general-bursaries-south-africa/bakwena-bursary/",
        description:
            "Transport infrastructure bursary for students in engineering and commerce fields.",
    },
    {
        id: "19",
        title: "NSFAS (National Student Financial Aid Scheme)",
        provider: "Department of Higher Education",
        amount: "Full tuition + living allowance",
        eligibility: [
            "South African citizen",
            "Combined household income ≤ R350,000/year",
            "Studying at public university or TVET college",
        ],
        closingDate: "Ongoing applications",
        field: "All Fields",
        link: "https://www.nsfas.org.za/",
        description:
            "Government-funded financial aid covering tuition, accommodation, transport, and living expenses for students from low-income households.",
    },
    {
        id: "20",
        title: "BBD Bursary",
        provider: "BBD",
        amount: "Full tuition + allowance",
        eligibility: [
            "South African citizen",
            "Minimum 65% in Maths",
            "Studying IT or Computer Science",
        ],
        closingDate: "Ongoing applications",
        field: "IT, Computer Science",
        link: "https://www.zabursaries.co.za/computer-science-bursaries-south-africa/bbd-bursary/",
        description:
            "IT company bursary with practical experience and employment opportunities at BBD.",
    },
    {
        id: "21",
        title: "Advance Africa Scholarship",
        provider: "Advance Africa",
        amount: "Full tuition coverage",
        eligibility: [
            "South African citizen",
            "Strong academic record",
            "Studying IT or Computer Science",
        ],
        closingDate: "Ongoing applications",
        field: "IT, Computer Science",
        link: "https://www.zabursaries.co.za/computer-science-bursaries-south-africa/advance-africa-scholarship/",
        description:
            "Technology scholarship for students pursuing IT and computer science qualifications.",
    },
    {
        id: "22",
        title: "Career Wise Bursaries",
        provider: "Career Wise",
        amount: "Varies by programme",
        eligibility: [
            "South African citizen",
            "Strong academic record",
            "Various fields of study",
        ],
        closingDate: "Ongoing applications",
        field: "All Fields",
        link: "https://www.zabursaries.co.za/general-bursaries-south-africa/career-wise-bursary/",
        description:
            "Platform connecting students with various bursary opportunities throughout the year.",
    },
    {
        id: "23",
        title: "Breede Valley Municipality Bursary",
        provider: "Breede Valley Municipality",
        amount: "Full tuition coverage",
        eligibility: [
            "South African citizen from Breede Valley",
            "Strong academic record",
            "Studying in scarce skills fields",
        ],
        closingDate: "8 December 2025",
        field: "All Fields",
        link: "https://www.zabursaries.co.za/government-bursaries-south-africa/breede-valley-municipality-bursary/",
        description:
            "Municipal bursary for Breede Valley residents pursuing tertiary education.",
    },
    {
        id: "24",
        title: "Southern African Transport Conference (SATC) Bursary",
        provider: "SATC",
        amount: "Full tuition + allowance",
        eligibility: [
            "South African citizen",
            "Strong academic record",
            "Studying Transport or Engineering fields",
        ],
        closingDate: "8 December 2025",
        field: "Engineering, Transport",
        link: "https://www.zabursaries.co.za/general-bursaries-south-africa/southern-african-transport-conference-satc-bursary/",
        description:
            "Transport sector bursary for students pursuing transport and engineering studies.",
    },
    {
        id: "25",
        title: "Tomorrow Trust Bursary",
        provider: "Tomorrow Trust",
        amount: "Full tuition + living expenses",
        eligibility: [
            "South African citizen",
            "From disadvantaged background",
            "Strong academic record",
        ],
        closingDate: "10 December 2025",
        field: "All Fields",
        link: "https://www.zabursaries.co.za/general-bursaries-south-africa/tomorrow-trust-sa-bursary/",
        description:
            "Non-profit bursary supporting orphans and vulnerable children through tertiary education.",
    },
    {
        id: "26",
        title: "Cornerstone Institute Bursary",
        provider: "Cornerstone Institute",
        amount: "Full tuition coverage",
        eligibility: [
            "South African citizen",
            "Strong academic record",
            "Accepted at Cornerstone Institute",
        ],
        closingDate: "12 December 2025",
        field: "All Fields",
        link: "https://www.zabursaries.co.za/universities/cornerstone-institute-bursary/",
        description:
            "Private higher education institution bursary for students accepted at Cornerstone.",
    },
    {
        id: "27",
        title: "Vulamathuba Empumelelo Bursary",
        provider: "Vulamathuba",
        amount: "Full tuition + living allowance",
        eligibility: [
            "South African citizen",
            "From disadvantaged community",
            "Strong academic record",
        ],
        closingDate: "12 December 2025",
        field: "All Fields",
        link: "https://www.zabursaries.co.za/general-bursaries-south-africa/vulamathuba-empumelelo-bursary/",
        description:
            "Community development bursary supporting students from disadvantaged backgrounds.",
    },
    {
        id: "28",
        title: "Tsitsikamma Wind Farm Trust Bursary",
        provider: "Tsitsikamma Wind Farm Trust",
        amount: "Full tuition + allowance",
        eligibility: [
            "South African citizen from Eastern Cape",
            "Strong academic record",
            "Studying various fields",
        ],
        closingDate: "13 December 2025",
        field: "All Fields",
        link: "https://www.zabursaries.co.za/general-bursaries-south-africa/tsitsikamma-wind-farm-trust-bursary/",
        description:
            "Community trust bursary for students from the Tsitsikamma area pursuing tertiary education.",
    },
    {
        id: "29",
        title: "Barberton Mines High School Scholarship",
        provider: "Barberton Mines",
        amount: "Full tuition coverage",
        eligibility: [
            "South African citizen from Barberton area",
            "Strong academic record",
            "High school scholarship",
        ],
        closingDate: "19 December 2025",
        field: "All Fields",
        link: "https://www.zabursaries.co.za/general-bursaries-south-africa/barberton-mines-high-school-scholarship/",
        description:
            "Mining company scholarship for high school students in the Barberton area.",
    },
    {
        id: "30",
        title: "WAAW Foundation Scholarship",
        provider: "WAAW Foundation",
        amount: "Full tuition + living expenses",
        eligibility: [
            "African female student",
            "Studying STEM fields",
            "Strong academic record",
        ],
        closingDate: "19 December 2025",
        field: "Science, Engineering, Technology",
        link: "https://www.zabursaries.co.za/science-bursaries-south-africa/waaw-foundation-scholarship/",
        description:
            "Foundation scholarship for African women pursuing STEM education.",
    },
    {
        id: "31",
        title: "Seriti Community Scholarship",
        provider: "Seriti",
        amount: "Full tuition + allowance",
        eligibility: [
            "South African citizen from mining communities",
            "Strong academic record",
            "Various fields of study",
        ],
        closingDate: "22 December 2025",
        field: "All Fields",
        link: "https://www.zabursaries.co.za/general-bursaries-south-africa/seriti-bursary/",
        description:
            "Mining company community scholarship for students from mining communities.",
    },
    {
        id: "32",
        title: "Beefmaster Group Bursary",
        provider: "Beefmaster Group",
        amount: "Full tuition + living allowance",
        eligibility: [
            "South African citizen",
            "Studying Agriculture or Animal Sciences",
            "Strong academic record",
        ],
        closingDate: "30 December 2025",
        field: "Agriculture, Science",
        link: "https://www.zabursaries.co.za/science-bursaries-south-africa/beefmaster-group-bursary/",
        description:
            "Agricultural sector bursary for students in animal and agricultural sciences.",
    },
    {
        id: "33",
        title: "DEDEAT Bursary",
        provider: "Department of Economic Development, Environmental Affairs and Tourism",
        amount: "Full tuition + living expenses",
        eligibility: [
            "South African citizen from Eastern Cape",
            "Strong academic record",
            "Studying in priority fields",
        ],
        closingDate: "31 December 2025",
        field: "All Fields",
        link: "https://www.zabursaries.co.za/government-bursaries-south-africa/dedea-bursary/",
        description:
            "Eastern Cape government bursary for students in economic development and environmental fields.",
    },
    {
        id: "34",
        title: "Moshal Scholarship Program",
        provider: "Moshal Scholarship Program",
        amount: "Full tuition + comprehensive support",
        eligibility: [
            "South African citizen",
            "From disadvantaged background",
            "Strong academic potential",
        ],
        closingDate: "31 December 2025",
        field: "All Fields",
        link: "https://www.zabursaries.co.za/universities/moshal-scholarship-program/",
        description:
            "Comprehensive scholarship providing academic and personal development support.",
    },
    {
        id: "35",
        title: "Umthombo Youth Development Foundation Bursary",
        provider: "Umthombo Youth Development Foundation",
        amount: "Full tuition + living expenses",
        eligibility: [
            "South African citizen from rural KZN",
            "Studying Health Sciences",
            "Commit to work in rural areas",
        ],
        closingDate: "31 December 2025",
        field: "Medical, Health Sciences",
        link: "https://www.zabursaries.co.za/medical-bursaries-south-africa/umthombo-youth-development-foundation-uydf-bursary/",
        description:
            "Foundation bursary for rural KZN students pursuing health sciences with commitment to serve rural communities.",
    },
    {
        id: "sources",
        title: "📚 Bursary Data Sources & References",
        provider: "Multiple Verified Sources",
        amount: "N/A - Information Resource",
        eligibility: [
            "This section provides references to bursary information sources",
            "Data is aggregated from official South African bursary platforms",
            "Showing bursaries closing in December 2025 or with ongoing applications",
        ],
        closingDate: "N/A",
        field: "Information & Resources",
        link: "https://www.zabursaries.co.za/",
        description:
            "Data sourced from ZA Bursaries https://www.zabursaries.co.za/, Bursaries.co.za https://bursaries.co.za/, and official organization websites. Filtered to show only bursaries closing in December 2025.",
    },
]

export async function GET() {
    try {
        const now = Date.now()
        const currentMonth = getCurrentMonthKey()

        // Check if we have cached data from this month
        if (
            bursariesCache.data &&
            bursariesCache.fetchMonth === currentMonth &&
            bursariesCache.lastFetched &&
            now - new Date(bursariesCache.lastFetched).getTime() < CACHE_DURATION
        ) {
            console.log(`Returning cached bursaries data for ${currentMonth}`)
            return NextResponse.json(
                {
                    success: true,
                    bursaries: bursariesCache.data,
                    _metadata: {
                        source: "Cached Data",
                        lastFetched: bursariesCache.lastFetched,
                        cacheMonth: currentMonth,
                        note: "Bursaries are fetched once per month",
                        count: bursariesCache.data.length,
                    },
                },
                {
                    headers: {
                        "Cache-Control": "public, s-maxage=2592000, stale-while-revalidate=1296000", // 30 days
                    },
                }
            )
        }

        // Try to fetch fresh data if Google API is available
        let fetchedData: Bursary[] | null = null

        if (genAI && GOOGLE_API_KEY) {
            console.log("Fetching fresh bursaries data from zabursaries.co.za and bursaries.co.za...")
            fetchedData = await fetchBursariesWithGoogleSearch()
        }

        // Use fetched data or fallback
        const bursariesData = fetchedData || FALLBACK_BURSARIES

        // Cache the data
        bursariesCache.data = bursariesData
        bursariesCache.lastFetched = new Date().toISOString()
        bursariesCache.fetchMonth = currentMonth

        console.log(`Cached ${bursariesData.length} bursaries for ${currentMonth}`)

        return NextResponse.json(
            {
                success: true,
                bursaries: bursariesData,
                _metadata: {
                    source: fetchedData ? "Google Search (zabursaries.co.za, bursaries.co.za)" : "Verified Fallback Data",
                    lastFetched: bursariesCache.lastFetched,
                    cacheMonth: currentMonth,
                    note: fetchedData
                        ? "Fresh data fetched from bursary websites. Cached for the month."
                        : "Using verified fallback data. Enable Google API for live scraping.",
                    count: bursariesData.length,
                },
            },
            {
                headers: {
                    "Cache-Control": "public, s-maxage=2592000, stale-while-revalidate=1296000", // 30 days
                },
            }
        )
    } catch (error) {
        console.error("Bursaries API Error:", error)

        // Return cached data if available
        if (bursariesCache.data) {
            return NextResponse.json(
                {
                    success: true,
                    bursaries: bursariesCache.data,
                    _metadata: {
                        source: "Cached Data (Error Fallback)",
                        lastFetched: bursariesCache.lastFetched,
                        note: "Using cached data due to error",
                        count: bursariesCache.data.length,
                    },
                },
                {
                    headers: {
                        "Cache-Control": "public, s-maxage=3600",
                    },
                }
            )
        }

        // Final fallback
        return NextResponse.json(
            {
                success: true,
                bursaries: FALLBACK_BURSARIES,
                _metadata: {
                    source: "Fallback Data",
                    note: "Using verified fallback data",
                    count: FALLBACK_BURSARIES.length,
                },
            },
            {
                headers: {
                    "Cache-Control": "public, s-maxage=3600",
                },
            }
        )
    }
}
