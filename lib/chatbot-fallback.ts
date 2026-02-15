/**
 * Chatbot Local Fallback
 *
 * When all external AI models are unavailable (rate-limited, down, or tokens
 * exhausted), this module generates responses from the app's own data so the
 * user still gets useful information instead of a generic error.
 */

import { universities } from "@/data/universities"
import { studyMethods, generalStudyTips } from "@/data/study-data"

// ---------------------------------------------------------------------------
// Keyword-based topic detection
// ---------------------------------------------------------------------------

interface TopicMatch {
    topic: string
    score: number
}

const TOPIC_KEYWORDS: Record<string, string[]> = {
    aps: ["aps", "admission point", "point score", "calculate aps", "aps score"],
    medicine: ["medicine", "mbchb", "medical", "doctor", "health sciences"],
    engineering: ["engineering", "beng", "bsc eng"],
    law: ["law", "llb", "legal"],
    commerce: ["bcom", "commerce", "accounting", "business", "finance"],
    computerScience: ["computer science", "bsc computer", "it", "information technology", "software", "programming"],
    education: ["bed", "education", "teaching", "teacher"],
    nursing: ["nursing", "nurse"],
    studyTips: ["study", "study tips", "study method", "how to study", "exam preparation", "revision", "exam tips"],
    university: ["university", "universities", "campus", "institution"],
    bursary: ["bursary", "bursaries", "scholarship", "scholarships", "nsfas", "funding", "financial aid"],
    pastPapers: ["past paper", "past papers", "previous exam", "old exam", "exam paper"],
    matric: ["matric", "matric results", "nsc", "grade 12", "final exam"],
}

function detectTopics(message: string): TopicMatch[] {
    const lower = message.toLowerCase()
    const matches: TopicMatch[] = []

    for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS)) {
        let score = 0
        for (const kw of keywords) {
            if (lower.includes(kw)) score++
        }
        if (score > 0) matches.push({ topic, score })
    }

    return matches.sort((a, b) => b.score - a.score)
}

// ---------------------------------------------------------------------------
// Topic response builders
// ---------------------------------------------------------------------------

function buildApsResponse(): string {
    return `**APS (Admission Point Score) Calculation**

1. Take your **best 6 subjects** (excluding Life Orientation)
2. Convert each percentage to points:
   - 80-100% = 7 points
   - 70-79% = 6 points
   - 60-69% = 5 points
   - 50-59% = 4 points
   - 40-49% = 3 points
   - 30-39% = 2 points
   - 0-29% = 1 point
3. Add up all 6 values
4. **Maximum APS = 42** (7 × 6)

**Typical APS requirements by field:**
- Medicine (MBChB): 38-42 + Maths 70%+ + Science 70%+
- Engineering: 32-38 + Maths 70%+ + Science 60%+
- Law: 30-36 + English 60%+
- BCom Accounting: 30-34 + Maths 60%+
- BSc Computer Science: 28-34 + Maths 60%+
- Education (BEd): 26-30
- Nursing: 24-28

You can use our **APS calculator** on the [Find Course](/find-course) page for an exact calculation!`
}

function buildUniversityListResponse(): string {
    const uniList = universities
        .map((u) => `- **${u.name}** (${u.shortName}) — ${u.location} — ${u.courses.length} courses`)
        .join("\n")

    return `**South African Universities on CourseFinder**

We have data for **${universities.length}** universities:

${uniList}

Browse courses and APS requirements on our [Find Course](/find-course) page!`
}

function buildMedicineResponse(): string {
    const medUnis = universities
        .filter((u) =>
            u.courses.some((c) =>
                c.name.toLowerCase().includes("medicine") || c.name.toLowerCase().includes("mbchb")
            )
        )
        .map((u) => {
            const med = u.courses.find(
                (c) => c.name.toLowerCase().includes("medicine") || c.name.toLowerCase().includes("mbchb")
            )
            return `- **${u.shortName}**: ${med?.name} — APS: ${med?.apsRequired || "Contact university"}`
        })

    return `**Medicine (MBChB) Requirements**

General requirements:
- APS: 38-42 (highly competitive)
- Mathematics: Level 6+ (70%+)
- Physical Science: Level 6+ (70%+)
- English: Level 5+ (60%+)
- NBT: Usually required

${medUnis.length > 0 ? `Universities offering Medicine:\n${medUnis.join("\n")}` : ""}

⚠️ Medicine is extremely competitive. Consider backup options like BSc Health Sciences or BSc Biomedical Sciences.

Check specific requirements on our [Find Course](/find-course) page.`
}

function buildCourseFieldResponse(field: string, fieldName: string): string {
    const matchingUnis = universities
        .filter((u) =>
            u.courses.some((c) => c.name.toLowerCase().includes(field) || c.faculty?.toLowerCase().includes(field))
        )
        .slice(0, 10)
        .map((u) => {
            const courses = u.courses
                .filter((c) => c.name.toLowerCase().includes(field) || c.faculty?.toLowerCase().includes(field))
                .slice(0, 3)
            return `**${u.shortName}**:\n${courses.map((c) => `  - ${c.name} (APS: ${c.apsRequired || "N/A"})`).join("\n")}`
        })

    return `**${fieldName} Courses**

${matchingUnis.length > 0 ? matchingUnis.join("\n\n") : `No specific ${fieldName.toLowerCase()} courses found in our database.`}

For complete listings and requirements, visit our [Find Course](/find-course) page.`
}

function buildStudyTipsResponse(): string {
    const methodsList = studyMethods
        .filter((m) => m.effectiveness >= 4)
        .slice(0, 5)
        .map((m) => `- **${m.title}**: ${m.description} (${m.timeRequired})`)
        .join("\n")

    const tipsList = generalStudyTips
        .map((cat) => `**${cat.category}:**\n${cat.tips.slice(0, 3).map((t) => `  - ${t}`).join("\n")}`)
        .join("\n\n")

    return `**Top Study Methods**

${methodsList}

**General Tips**

${tipsList}

For detailed study guides, visit our [Study Tips](/study-tips) page!`
}

function buildBursaryResponse(): string {
    return `**Bursaries & Financial Aid**

Here are key resources for South African students:

- **NSFAS** — National Student Financial Aid Scheme for qualifying students
- **Funza Lushaka** — Bursary for students studying teaching/education
- **University-specific bursaries** — Most universities offer merit and need-based bursaries

**Tips for applying:**
1. Apply early — deadlines are strict
2. Prepare your academic records and financial documents
3. Check multiple sources — government, corporate, and university bursaries
4. Meet the minimum APS and subject requirements

Visit our [Bursaries](/bursaries) page for current opportunities!`
}

function buildPastPapersResponse(): string {
    return `**Past Papers**

Past examination papers are one of the best ways to prepare for exams. We have a collection of previous NSC and university papers available.

**How to use past papers effectively:**
1. Start with the most recent papers
2. Time yourself under exam conditions
3. Mark your answers honestly
4. Focus on question patterns and common topics
5. Review the marking memo to understand what examiners expect

Browse our collection on the [Past Papers](/past-papers) page!`
}

function buildMatricResponse(): string {
    return `**Matric / NSC Information**

The National Senior Certificate (NSC) is your Grade 12 qualification. Key things to know:

- **Pass requirements:** At least 40% in 3 subjects + 30% in 3 others
- **Bachelor's pass:** At least 50% in 4 subjects (for university admission)
- **Diploma pass:** At least 40% in 4 subjects (for diploma programmes)

**After receiving results:**
1. Calculate your APS score
2. Check university requirements for your preferred courses
3. Apply before closing dates

Check your results and next steps on our [Matric Results](/matric-results) page.`
}

// ---------------------------------------------------------------------------
// Main fallback function
// ---------------------------------------------------------------------------

/**
 * Generate a response from local app data when AI models are unavailable.
 * Returns null if the question can't be answered locally.
 */
export function generateLocalFallback(message: string): string | null {
    const topics = detectTopics(message)

    if (topics.length === 0) {
        // Generic fallback for unrecognized questions
        return `I'm currently running in offline mode, so I can only answer questions about topics available in our app.

**I can help with:**
- 📊 APS calculations and requirements
- 🎓 University courses and admissions
- 📚 Study tips and methods
- 💰 Bursary information
- 📝 Past papers
- 📋 Matric results information

Try asking about one of these topics, or browse the app directly:
- [Find Course](/find-course) — APS calculator & course matching
- [Study Tips](/study-tips) — Proven study methods
- [Past Papers](/past-papers) — Previous exam papers
- [Matric Results](/matric-results) — Results & next steps

*Note: I'm using local data because the AI service is temporarily unavailable. Responses may be more limited than usual.*`
    }

    const primary = topics[0].topic
    let response: string

    switch (primary) {
        case "aps":
            response = buildApsResponse()
            break
        case "medicine":
            response = buildMedicineResponse()
            break
        case "engineering":
            response = buildCourseFieldResponse("engineering", "Engineering")
            break
        case "law":
            response = buildCourseFieldResponse("law", "Law")
            break
        case "commerce":
            response = buildCourseFieldResponse("commerce", "Commerce / Business")
            break
        case "computerScience":
            response = buildCourseFieldResponse("computer", "Computer Science / IT")
            break
        case "education":
            response = buildCourseFieldResponse("education", "Education")
            break
        case "nursing":
            response = buildCourseFieldResponse("nursing", "Nursing")
            break
        case "studyTips":
            response = buildStudyTipsResponse()
            break
        case "university":
            response = buildUniversityListResponse()
            break
        case "bursary":
            response = buildBursaryResponse()
            break
        case "pastPapers":
            response = buildPastPapersResponse()
            break
        case "matric":
            response = buildMatricResponse()
            break
        default:
            return null
    }

    return response + "\n\n*ℹ️ This response was generated from local data because the AI service is temporarily unavailable.*"
}
