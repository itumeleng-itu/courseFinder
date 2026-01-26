import { NewsArticle, STUDENT_RELEVANT_KEYWORDS } from "@/data/fallback-news"

const FORTY_EIGHT_HOURS_MS = 48 * 60 * 60 * 1000

export function isWithin48Hours(pubDate: string): boolean {
    const now = Date.now()
    const date = new Date(pubDate).getTime()
    if (isNaN(date)) return false
    return now - date <= FORTY_EIGHT_HOURS_MS && date <= now
}

export function isRelevantToStudents(article: { title?: string; description?: string; content?: string }): boolean {
    const title = article.title ?? ""
    const descriptionOrContent = article.description ?? article.content ?? ""
    const searchText = `${title} ${descriptionOrContent}`.toLowerCase()
    return STUDENT_RELEVANT_KEYWORDS.some((keyword) => searchText.includes(keyword.toLowerCase()))
}

export function buildImageForArticle(article: NewsArticle): { image_url: string; alt_text: string } {
    const fullText = `${article.title.toLowerCase()} ${article.description.toLowerCase()}`
    let query = "education,student,learning,school"
    let imageDescription = "Education and learning"

    if (fullText.includes("matric results") || fullText.includes("nsc results")) {
        query = "student,celebration,graduation,success"; imageDescription = "Students celebrating their results"
    } else if (fullText.includes("bursary") || fullText.includes("scholarship")) {
        query = "student,laptop,studying,books"; imageDescription = "Student studying with scholarship opportunities"
    } else if (fullText.includes("university") || fullText.includes("college")) {
        query = "university,campus,students"; imageDescription = "University campus and students"
    } else if (fullText.includes("exam") || fullText.includes("test")) {
        query = "student,exam,studying,focus"; imageDescription = "Student preparing for exams"
    } else if (fullText.includes("career") || fullText.includes("job")) {
        query = "career,professional,workplace"; imageDescription = "Career and professional development"
    }

    return { image_url: `https://source.unsplash.com/800x600/?${encodeURIComponent(query)}`, alt_text: imageDescription }
}
