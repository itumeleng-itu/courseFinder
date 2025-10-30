import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const paperId = searchParams.get('id')

    if (!paperId) {
      return NextResponse.json(
        { success: false, error: 'Paper ID is required' },
        { status: 400 }
      )
    }

    // Parse paper ID to get download URL
    const downloadUrl = await getDownloadUrl(paperId)
    
    if (!downloadUrl) {
      return NextResponse.json(
        { success: false, error: 'Paper not found' },
        { status: 404 }
      )
    }

    try {
      // Attempt to fetch the file
      const response = await fetch(downloadUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      })

      if (!response.ok) {
        // If direct fetch fails, return the URL for client-side download
        return NextResponse.json({
          success: false,
          error: 'Direct download not available',
          downloadUrl,
          message: 'Please use the direct link to download'
        }, { status: 302 })
      }

      // Get the file content
      const fileBuffer = await response.arrayBuffer()
      const contentType = response.headers.get('content-type') || 'application/pdf'
      const contentLength = response.headers.get('content-length')

      // Create response with file content
      const fileResponse = new NextResponse(fileBuffer)
      fileResponse.headers.set('Content-Type', contentType)
      fileResponse.headers.set('Content-Disposition', `attachment; filename="${getFilename(paperId)}"`)
      
      if (contentLength) {
        fileResponse.headers.set('Content-Length', contentLength)
      }

      return fileResponse

    } catch (fetchError) {
      console.error('Error fetching file:', fetchError)
      
      // Return the direct URL as fallback
      return NextResponse.json({
        success: false,
        error: 'File fetch failed',
        downloadUrl,
        message: 'Please use the direct link to download'
      }, { status: 302 })
    }

  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { success: false, error: 'Download failed' },
      { status: 500 }
    )
  }
}

async function getDownloadUrl(paperId: string): Promise<string | null> {
  try {
    // Parse the paper ID to reconstruct the download URL
    const parts = paperId.split('-')
    
    if (parts.length < 6) {
      return null
    }

    const [source, subject, year, grade, paper, type, language] = parts
    
    if (source === 'al') {
      // AdvantageLearn URL structure
      const subjectSlug = formatSubjectSlug(subject)
      const baseUrl = 'https://advantagelearn.com/grade-12-past-exam-papers/'
      
      if (type === 'question') {
        return `${baseUrl}${subjectSlug}/${year}/grade-12-${subjectSlug}-paper-${paper}-${year}.pdf`
      } else {
        return `${baseUrl}${subjectSlug}/${year}/grade-12-${subjectSlug}-paper-${paper}-memorandum-${year}.pdf`
      }
    } else if (source === 'dbe') {
      // Department of Basic Education URL structure
      const subjectCode = getSubjectCodeFromSlug(subject)
      const languageCode = language === 'en' ? 'English' : 'Afrikaans'
      
      if (type === 'question') {
        return `https://www.education.gov.za/Portals/0/Documents/Publications/NSC%20Past%20Papers/${year}/${subjectCode}%20P${paper}%20${year}%20${languageCode}.pdf`
      } else {
        return `https://www.education.gov.za/Portals/0/Documents/Publications/NSC%20Past%20Papers/${year}/${subjectCode}%20P${paper}%20Memo%20${year}%20${languageCode}.pdf`
      }
    }

    return null
  } catch (error) {
    console.error('Error constructing download URL:', error)
    return null
  }
}

function getFilename(paperId: string): string {
  try {
    const parts = paperId.split('-')
    const [source, subject, year, grade, paper, type, language] = parts
    
    const subjectName = formatSubjectName(subject)
    const typeLabel = type === 'question' ? 'Question' : 'Memorandum'
    const languageLabel = language === 'en' ? 'English' : 'Afrikaans'
    
    return `${subjectName}_Grade${grade}_${year}_Paper${paper}_${typeLabel}_${languageLabel}.pdf`
  } catch (error) {
    return `paper_${paperId}.pdf`
  }
}

function formatSubjectSlug(subject: string): string {
  const mapping: Record<string, string> = {
    'mathematics': 'mathematics',
    'mathematical': 'mathematical-literacy',
    'physical': 'physical-sciences',
    'life': 'life-sciences',
    'english': 'english-home-language',
    'afrikaans': 'afrikaans-home-language',
    'accounting': 'accounting',
    'business': 'business-studies',
    'economics': 'economics',
    'geography': 'geography',
    'history': 'history',
    'information': 'information-technology',
    'computer': 'computer-applications-technology'
  }
  return mapping[subject] || subject
}

function formatSubjectName(slug: string): string {
  const mapping: Record<string, string> = {
    'mathematics': 'Mathematics',
    'mathematical': 'Mathematical Literacy',
    'physical': 'Physical Sciences',
    'life': 'Life Sciences',
    'english': 'English Home Language',
    'afrikaans': 'Afrikaans Home Language',
    'accounting': 'Accounting',
    'business': 'Business Studies',
    'economics': 'Economics',
    'geography': 'Geography',
    'history': 'History',
    'information': 'Information Technology',
    'computer': 'Computer Applications Technology'
  }
  return mapping[slug] || slug
}

function getSubjectCodeFromSlug(slug: string): string {
  const mapping: Record<string, string> = {
    'mathematics': 'MATH',
    'mathematical': 'MATLIT',
    'physical': 'PHYS',
    'life': 'LIFE',
    'english': 'ENGLHL',
    'afrikaans': 'AFRIKHL',
    'accounting': 'ACC',
    'business': 'BUS',
    'economics': 'ECON',
    'geography': 'GEOG',
    'history': 'HIST'
  }
  return mapping[slug] || slug.toUpperCase()
}
