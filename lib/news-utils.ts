import { NewsArticle, STUDENT_RELEVANT_KEYWORDS } from "@/data/fallback-news"

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000

export function isWithinTimeWindow(pubDate: string): boolean {
    const now = Date.now()
    const date = new Date(pubDate).getTime()
    if (isNaN(date)) return false
    return now - date <= SEVEN_DAYS_MS && date <= now
}

// Keep the old function name for backward compatibility
export function isWithin48Hours(pubDate: string): boolean {
    return isWithinTimeWindow(pubDate)
}

export function isRelevantToStudents(article: { title?: string; description?: string; content?: string; category?: string[] }): boolean {
    // If article is already categorized as education, it's relevant
    if (article.category?.some(cat =>
        cat.toLowerCase().includes('education') ||
        cat.toLowerCase().includes('science') ||
        cat.toLowerCase().includes('technology')
    )) {
        return true
    }

    const title = article.title ?? ""
    const descriptionOrContent = article.description ?? article.content ?? ""
    const searchText = `${title} ${descriptionOrContent}`.toLowerCase()
    return STUDENT_RELEVANT_KEYWORDS.some((keyword) => searchText.includes(keyword.toLowerCase()))
}

export function buildImageForArticle(article: NewsArticle): { image_url: string; alt_text: string } {
    const fullText = `${article.title.toLowerCase()} ${article.description.toLowerCase()}`
    let imageDescription = "Education and learning"

    // Generate a consistent seed based on article title for consistent images
    const seed = article.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)

    if (fullText.includes("matric results") || fullText.includes("nsc results")) {
        imageDescription = "Students celebrating their results"
    } else if (fullText.includes("bursary") || fullText.includes("scholarship")) {
        imageDescription = "Student studying with scholarship opportunities"
    } else if (fullText.includes("university") || fullText.includes("college")) {
        imageDescription = "University campus and students"
    } else if (fullText.includes("exam") || fullText.includes("test")) {
        imageDescription = "Student preparing for exams"
    } else if (fullText.includes("career") || fullText.includes("job")) {
        imageDescription = "Career and professional development"
    }

    // Use picsum.photos with a seed for consistent but varied images
    return { image_url: `https://picsum.photos/seed/${seed}/800/600`, alt_text: imageDescription }
}
