export interface NewsArticle {
    title: string
    description: string
    link: string
    pubDate: string
    source_id: string
    category: string[]
    image_url: string
    alt_text?: string
}

export const STUDENT_RELEVANT_KEYWORDS = [
    "matric", "grade 11", "grade 12", "education", "school", "university",
    "student", "exam", "tertiary", "bursary", "scholarship", "study",
    "career", "apprenticeship", "learner", "graduation", "college", "nsc",
    "subject choice", "career guidance", "tvet", "learnership", "youth unemployment",
    "gap year", "study tips", "final exam", "university application", "nbts", "university acceptance",
]

export const FALLBACK_ARTICLES: NewsArticle[] = [
    {
        title: "Matric results: What to do next",
        description: "Guidance for students on options after receiving results.",
        link: "/study-tips",
        pubDate: new Date().toISOString(),
        source_id: "coursefinder",
        category: ["education"],
        image_url: "",
        alt_text: "Students planning next steps",
    },
    {
        title: "New bursaries and scholarships for 2025",
        description: "Explore funding options and deadlines for applications.",
        link: "/bursaries",
        pubDate: new Date().toISOString(),
        source_id: "coursefinder",
        category: ["education"],
        image_url: "",
        alt_text: "Student reading bursary info",
    },
    {
        title: "University application timelines",
        description: "Check key dates and how to apply effectively.",
        link: "/universities",
        pubDate: new Date().toISOString(),
        source_id: "coursefinder",
        category: ["education"],
        image_url: "",
        alt_text: "Campus walkway",
    },
    {
        title: "Study tips to boost performance",
        description: "Practical strategies for exam preparation and retention.",
        link: "/study-tips",
        pubDate: new Date().toISOString(),
        source_id: "coursefinder",
        category: ["education"],
        image_url: "",
        alt_text: "Student studying",
    },
]
