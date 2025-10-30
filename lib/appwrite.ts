import { Client, Databases, Storage } from "appwrite"

export interface QuestionPaper {
  id: string
  file_id: string
  bucket_id: string
  subject: string
  year: number
  paper_type: string
  session: string
  language: string
  filename: string
  url?: string
}

const requiredEnvVars = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
}

function validateEnvironment() {
  const missing = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key)

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`)
  }
}

const client = new Client()

try {
  validateEnvironment()
  client.setEndpoint(requiredEnvVars.endpoint!).setProject(requiredEnvVars.projectId!)
} catch (error) {
  console.error("Appwrite configuration error:", error)
}

export const databases = new Databases(client)
export const storage = new Storage(client)

export const getDownloadUrl = (fileId: string, bucketId?: string): string => {
  const endpoint = requiredEnvVars.endpoint
  const projectId = requiredEnvVars.projectId
  const bucket = bucketId || process.env.NEXT_PUBLIC_APPWRITE_PAPERS_BUCKET_ID
  return `${endpoint}/storage/buckets/${bucket}/files/${fileId}/view?project=${projectId}`
}

export const getPreviewUrl = (fileId: string, bucketId?: string): string => {
  const endpoint = requiredEnvVars.endpoint
  const projectId = requiredEnvVars.projectId
  const bucket = bucketId || process.env.NEXT_PUBLIC_APPWRITE_PAPERS_BUCKET_ID
  return `${endpoint}/storage/buckets/${bucket}/files/${fileId}/preview?project=${projectId}`
}
