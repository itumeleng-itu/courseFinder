import { serverDatabases } from '@/lib/appwrite-server'
import { type QuestionPaper } from '@/lib/appwrite'
import { Query } from 'node-appwrite'
import { PastPapersClient } from '@/components/past-papers-client'

// Server-side data fetching for App Router
async function getPapers(): Promise<QuestionPaper[]> {
  try {
    const response = await serverDatabases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_PAPERS_COLLECTION_ID!,
      [
        Query.orderDesc('year'),
        Query.orderAsc('subject'),
        Query.orderAsc('paper_type'),
        Query.limit(1000)
      ]
    )

    return response.documents.map(doc => ({
      id: doc.$id,
      file_id: doc.file_id,
      bucket_id: doc.bucket_id,
      subject: doc.subject,
      year: doc.year,
      paper_type: doc.paper_type,
      session: doc.session,
      language: doc.language,
      filename: doc.filename,
      url: doc.file_id // This will be used to generate download URLs
    }))
  } catch (error) {
    console.error('Error fetching papers:', error)
    return []
  }
}

export default async function PastPapersPage() {
  const papers = await getPapers()
  
  return <PastPapersClient papers={papers} />
}