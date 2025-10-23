import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 3600 // 1 hour

const BURSARIES_DATA = [
  {
    id: "1",
    title: "NSFAS Bursary",
    provider: "National Student Financial Aid Scheme",
    amount: "Full tuition + accommodation + allowances",
    field: "All Fields",
    description:
      "NSFAS provides comprehensive financial aid to students from poor and working-class families. Covers tuition, accommodation, transport, and living allowances.",
    eligibility: [
      "South African citizen",
      "Combined household income of R350,000 or less per year",
      "Accepted at a public university or TVET college",
      "SASSA grant recipient automatically qualifies",
    ],
    deadline: "Various deadlines throughout the year",
    link: "https://www.nsfas.org.za",
  },
  {
    id: "2",
    title: "Funza Lushaka Bursary",
    provider: "Department of Basic Education",
    amount: "Full tuition + R27,000 annual allowance",
    field: "Teaching",
    description:
      "For students studying to become teachers. Covers full tuition and provides annual allowances. Recipients must teach for the same number of years they received the bursary.",
    eligibility: [
      "South African citizen",
      "Studying teaching at a public higher education institution",
      "Maintain 60% average",
      "Willing to teach in a public school after graduation",
    ],
    deadline: "31 January 2024",
    link: "https://www.funzalushaka.doe.gov.za",
  },
  {
    id: "3",
    title: "Eskom Tertiary Education Support Programme",
    provider: "Eskom",
    amount: "Full tuition + R75,000 annual allowance",
    field: "Engineering, Science, Technology",
    description:
      "Comprehensive bursary for students pursuing careers in engineering and technical fields. Includes vacation work opportunities and potential employment after graduation.",
    eligibility: [
      "South African citizen",
      "Studying Engineering, Finance, IT, or related fields",
      "Academic achievement of 60%+",
      "Financially needy students prioritized",
    ],
    deadline: "30 September 2024",
    link: "https://www.eskom.co.za/careers/bursaries",
  },
  {
    id: "4",
    title: "Anglo American Bursary",
    provider: "Anglo American",
    amount: "Full tuition + accommodation + allowances",
    field: "Mining Engineering, Metallurgy, Geology",
    description:
      "Prestigious bursary for students in mining-related fields. Includes mentorship, vacation work, and excellent employment prospects.",
    eligibility: [
      "South African citizen",
      "Studying at a recognized SA university",
      "65% average minimum",
      "Strong Mathematics and Physical Sciences results",
    ],
    deadline: "31 August 2024",
    link: "https://www.angloamerican.com/careers/bursaries",
  },
  {
    id: "5",
    title: "Sasol Bursary Programme",
    provider: "Sasol",
    amount: "Full tuition + R70,000 annual allowance",
    field: "Chemical Engineering, Chemistry, Mechanical Engineering",
    description:
      "Comprehensive support for students in engineering and science. Includes vacation work, mentorship, and potential employment.",
    eligibility: [
      "South African citizen",
      "Studying Chemical, Mechanical, Electrical Engineering or related",
      "60% average minimum",
      "From a disadvantaged background",
    ],
    deadline: "31 July 2024",
    link: "https://www.sasol.com/careers/bursaries",
  },
  {
    id: "6",
    title: "Allan Gray Orbis Foundation",
    provider: "Allan Gray Orbis Foundation",
    amount: "Full cost of study + development programs",
    field: "All Fields (Business focus)",
    description:
      "Highly competitive bursary with entrepreneurial focus. Includes mentorship, leadership development, and networking opportunities.",
    eligibility: [
      "South African citizen",
      "Outstanding academic record (70%+)",
      "Demonstrated leadership potential",
      "Entrepreneurial mindset",
    ],
    deadline: "30 June 2024",
    link: "https://www.allangrayorbis.org",
  },
  {
    id: "7",
    title: "Transnet Bursary Scheme",
    provider: "Transnet",
    amount: "Full tuition + accommodation + R30,000 allowance",
    field: "Engineering, Logistics, Finance",
    description:
      "For students pursuing careers in transport and logistics-related fields. Includes vacation work and potential permanent employment.",
    eligibility: [
      "South African citizen",
      "Studying Engineering, Transport, Logistics, Finance",
      "60% average minimum",
      "Financially needy",
    ],
    deadline: "31 August 2024",
    link: "https://www.transnet.net/careers/Pages/Bursaries.aspx",
  },
  {
    id: "8",
    title: "Sibanye-Stillwater Bursary",
    provider: "Sibanye-Stillwater",
    amount: "Full tuition + accommodation + allowances",
    field: "Mining Engineering, Geology, Metallurgy",
    description:
      "Comprehensive bursary for mining and engineering students. Strong focus on practical experience and career development.",
    eligibility: [
      "South African citizen",
      "Studying Mining Engineering or related fields",
      "65% average minimum",
      "Strong Mathematics and Physical Sciences",
    ],
    deadline: "30 September 2024",
    link: "https://www.sibanyestillwater.com/careers/bursaries",
  },
  {
    id: "9",
    title: "Shoprite Checkers Bursary",
    provider: "Shoprite Holdings",
    amount: "Full tuition + R25,000 annual allowance",
    field: "Retail, Supply Chain, Finance, IT",
    description:
      "For students interested in retail, supply chain management, and business-related fields. Includes vacation work opportunities.",
    eligibility: [
      "South African citizen",
      "Studying BCom, IT, Engineering, Supply Chain",
      "60% average minimum",
      "Passion for retail industry",
    ],
    deadline: "31 July 2024",
    link: "https://www.shopriteholdings.co.za/careers/bursaries.html",
  },
  {
    id: "10",
    title: "Clicks Bursary Programme",
    provider: "Clicks Group",
    amount: "Full tuition + R20,000 annual allowance",
    field: "Pharmacy, Nursing, Retail Management",
    description:
      "For students pursuing careers in healthcare and pharmacy. Excellent opportunity for future employment in the Clicks Group.",
    eligibility: [
      "South African citizen",
      "Studying Pharmacy, Nursing, or Healthcare Management",
      "60% average minimum",
      "Financially needy students prioritized",
    ],
    deadline: "31 August 2024",
    link: "https://www.clicksgroup.co.za/careers/bursaries",
  },
]

export async function GET() {
  try {
    // In a real implementation, this would scrape https://www.zabursaries.co.za/
    // For now, we return curated data
    return NextResponse.json(
      {
        success: true,
        bursaries: BURSARIES_DATA,
        totalCount: BURSARIES_DATA.length,
        lastUpdated: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
        },
      },
    )
  } catch (error) {
    console.error("Bursaries API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch bursaries",
      },
      { status: 500 },
    )
  }
}
