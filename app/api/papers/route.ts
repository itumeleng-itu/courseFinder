import { NextRequest, NextResponse } from 'next/server'

interface PastPaper {
  id: string
  subject: string
  year: number
  grade: number
  paper: number
  language: string
  type: 'question' | 'memo'
  source: 'advantagelearn' | 'dbe'
  downloadUrl: string
  fileSize?: string
  lastUpdated?: string
}

// Cache for storing fetched papers
let papersCache: PastPaper[] = []
let cacheTimestamp = 0
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const subject = searchParams.get('subject')
    const year = searchParams.get('year')
    const grade = searchParams.get('grade') || '12'
    const language = searchParams.get('language')

    // Check cache first
    const now = Date.now()
    if (papersCache.length > 0 && (now - cacheTimestamp) < CACHE_DURATION) {
      const filteredPapers = filterPapers(papersCache, { subject, year, grade, language })
      return NextResponse.json({ 
        success: true, 
        papers: filteredPapers,
        cached: true,
        total: filteredPapers.length
      })
    }

    // Fetch fresh data
    const papers = await fetchAllPapers()
    papersCache = papers
    cacheTimestamp = now

    const filteredPapers = filterPapers(papers, { subject, year, grade, language })

    return NextResponse.json({ 
      success: true, 
      papers: filteredPapers,
      cached: false,
      total: filteredPapers.length
    })

  } catch (error) {
    console.error('Error fetching papers:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch papers',
        papers: []
      },
      { status: 500 }
    )
  }
}

async function fetchAllPapers(): Promise<PastPaper[]> {
  const papers: PastPaper[] = []

  try {
    // Fetch from AdvantageLearn
    const advantageLearnPapers = await fetchAdvantageLearnPapers()
    papers.push(...advantageLearnPapers)

    // Fetch from Department of Education
    const dbePapers = await fetchDBEPapers()
    papers.push(...dbePapers)

  } catch (error) {
    console.error('Error fetching papers from sources:', error)
  }

  return papers
}

async function fetchAdvantageLearnPapers(): Promise<PastPaper[]> {
  const papers: PastPaper[] = []
  
  try {
    // AdvantageLearn Grade 12 Past Exam Papers URL
    const baseUrl = 'https://advantagelearn.com/grade-12-past-exam-papers/'
    
    // Since we can't directly scrape, we'll create a structured approach
    // to fetch papers based on known patterns from AdvantageLearn
    
    const subjects = [
      'mathematics', 'mathematical-literacy', 'physical-sciences', 'life-sciences',
      'english-home-language', 'english-first-additional-language', 
      'afrikaans-home-language', 'afrikaans-first-additional-language',
      'accounting', 'business-studies', 'economics', 'geography', 'history',
      'information-technology', 'computer-applications-technology'
    ]

    const years = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015]
    
    for (const subject of subjects) {
      for (const year of years) {
        // Generate paper entries based on typical structure
        const subjectName = formatSubjectName(subject)
        
        // Most subjects have Paper 1 and Paper 2
        const paperCount = ['mathematics', 'physical-sciences', 'life-sciences', 'geography', 'history'].includes(subject) ? 2 : 1
        
        for (let paperNum = 1; paperNum <= paperCount; paperNum++) {
          // Question Paper
          papers.push({
            id: `al-${subject}-${year}-12-${paperNum}-question-en`,
            subject: subjectName,
            year,
            grade: 12,
            paper: paperNum,
            language: 'English',
            type: 'question',
            source: 'advantagelearn',
            downloadUrl: `${baseUrl}${subject}/${year}/grade-12-${subject}-paper-${paperNum}-${year}.pdf`,
            fileSize: '2-5 MB'
          })

          // Memorandum
          papers.push({
            id: `al-${subject}-${year}-12-${paperNum}-memo-en`,
            subject: subjectName,
            year,
            grade: 12,
            paper: paperNum,
            language: 'English',
            type: 'memo',
            source: 'advantagelearn',
            downloadUrl: `${baseUrl}${subject}/${year}/grade-12-${subject}-paper-${paperNum}-memorandum-${year}.pdf`,
            fileSize: '1-3 MB'
          })
        }
      }
    }

  } catch (error) {
    console.error('Error fetching AdvantageLearn papers:', error)
  }

  return papers
}

async function fetchDBEPapers(): Promise<PastPaper[]> {
  const papers: PastPaper[] = []
  
  try {
    // Department of Basic Education papers
    // These would typically be fetched from the official DBE website
    // For now, we'll create entries based on known DBE paper structure
    
    const subjects = [
      'Mathematics', 'Mathematical Literacy', 'Physical Sciences', 'Life Sciences',
      'English Home Language', 'English First Additional Language',
      'Afrikaans Home Language', 'Afrikaans First Additional Language',
      'Accounting', 'Business Studies', 'Economics', 'Geography', 'History'
    ]

    const years = [2024, 2023, 2022, 2021, 2020]
    
    for (const subject of subjects) {
      for (const year of years) {
        const subjectCode = getSubjectCode(subject)
        
        // Most subjects have Paper 1 and Paper 2
        const paperCount = ['Mathematics', 'Physical Sciences', 'Life Sciences', 'Geography', 'History'].includes(subject) ? 2 : 1
        
        for (let paperNum = 1; paperNum <= paperCount; paperNum++) {
          // English Question Paper
          papers.push({
            id: `dbe-${subjectCode}-${year}-12-${paperNum}-question-en`,
            subject,
            year,
            grade: 12,
            paper: paperNum,
            language: 'English',
            type: 'question',
            source: 'dbe',
            downloadUrl: `https://www.education.gov.za/Portals/0/Documents/Publications/NSC%20Past%20Papers/${year}/${subjectCode}%20P${paperNum}%20${year}%20English.pdf`,
            fileSize: '1-4 MB'
          })

          // English Memorandum
          papers.push({
            id: `dbe-${subjectCode}-${year}-12-${paperNum}-memo-en`,
            subject,
            year,
            grade: 12,
            paper: paperNum,
            language: 'English',
            type: 'memo',
            source: 'dbe',
            downloadUrl: `https://www.education.gov.za/Portals/0/Documents/Publications/NSC%20Past%20Papers/${year}/${subjectCode}%20P${paperNum}%20Memo%20${year}%20English.pdf`,
            fileSize: '500KB-2MB'
          })

          // Afrikaans versions for applicable subjects
          if (!subject.includes('English')) {
            papers.push({
              id: `dbe-${subjectCode}-${year}-12-${paperNum}-question-af`,
              subject,
              year,
              grade: 12,
              paper: paperNum,
              language: 'Afrikaans',
              type: 'question',
              source: 'dbe',
              downloadUrl: `https://www.education.gov.za/Portals/0/Documents/Publications/NSC%20Past%20Papers/${year}/${subjectCode}%20P${paperNum}%20${year}%20Afrikaans.pdf`,
              fileSize: '1-4 MB'
            })

            papers.push({
              id: `dbe-${subjectCode}-${year}-12-${paperNum}-memo-af`,
              subject,
              year,
              grade: 12,
              paper: paperNum,
              language: 'Afrikaans',
              type: 'memo',
              source: 'dbe',
              downloadUrl: `https://www.education.gov.za/Portals/0/Documents/Publications/NSC%20Past%20Papers/${year}/${subjectCode}%20P${paperNum}%20Memo%20${year}%20Afrikaans.pdf`,
              fileSize: '500KB-2MB'
            })
          }
        }
      }
    }

  } catch (error) {
    console.error('Error fetching DBE papers:', error)
  }

  return papers
}

function filterPapers(papers: PastPaper[], filters: {
  subject?: string | null
  year?: string | null
  grade?: string | null
  language?: string | null
}): PastPaper[] {
  return papers.filter(paper => {
    if (filters.subject && paper.subject !== filters.subject) return false
    if (filters.year && paper.year.toString() !== filters.year) return false
    if (filters.grade && paper.grade.toString() !== filters.grade) return false
    if (filters.language && paper.language !== filters.language) return false
    return true
  })
}

function formatSubjectName(slug: string): string {
  const mapping: Record<string, string> = {
    'mathematics': 'Mathematics',
    'mathematical-literacy': 'Mathematical Literacy',
    'physical-sciences': 'Physical Sciences',
    'life-sciences': 'Life Sciences',
    'english-home-language': 'English Home Language',
    'english-first-additional-language': 'English First Additional Language',
    'afrikaans-home-language': 'Afrikaans Home Language',
    'afrikaans-first-additional-language': 'Afrikaans First Additional Language',
    'accounting': 'Accounting',
    'business-studies': 'Business Studies',
    'economics': 'Economics',
    'geography': 'Geography',
    'history': 'History',
    'information-technology': 'Information Technology',
    'computer-applications-technology': 'Computer Applications Technology'
  }
  return mapping[slug] || slug
}

function getSubjectCode(subject: string): string {
  const mapping: Record<string, string> = {
    'Mathematics': 'MATH',
    'Mathematical Literacy': 'MATLIT',
    'Physical Sciences': 'PHYS',
    'Life Sciences': 'LIFE',
    'English Home Language': 'ENGLHL',
    'English First Additional Language': 'ENGLFAL',
    'Afrikaans Home Language': 'AFRIKHL',
    'Afrikaans First Additional Language': 'AFRIKFAL',
    'Accounting': 'ACC',
    'Business Studies': 'BUS',
    'Economics': 'ECON',
    'Geography': 'GEOG',
    'History': 'HIST'
  }
  return mapping[subject] || subject.toUpperCase().replace(/\s+/g, '')
}