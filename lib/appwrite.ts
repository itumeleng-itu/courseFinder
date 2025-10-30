// lib/appwrite.ts - Server-side Appwrite configuration for SSG

import { Client, Databases, Storage } from 'appwrite';

// Type definitions for question papers
export interface QuestionPaper {
  id: string;
  file_id: string;
  bucket_id: string;
  subject: string;
  year: number;
  paper_type: string;
  session: string;
  language: string;
  filename: string;
  url?: string; // This will be generated from file_id
}

// Environment variables validation
const requiredEnvVars = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
  apiKey: process.env.APPWRITE_API_KEY,
};

// Validate environment variables
function validateEnvironment() {
  const missing = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

// Initialize the client
const client = new Client();

try {
  validateEnvironment();
  
  client
    .setEndpoint(requiredEnvVars.endpoint!)
    .setProject(requiredEnvVars.projectId!);

  // Note: API Key is only used server-side in Node.js environment
  // Client-side operations use session-based authentication
} catch (error) {
  console.error('Appwrite configuration error:', error);
}

// Export the services
export const databases = new Databases(client);
export const storage = new Storage(client);

// Helper function to generate download URLs
export const getDownloadUrl = (fileId: string): string => {
  const endpoint = requiredEnvVars.endpoint;
  const projectId = requiredEnvVars.projectId;
  const bucketId = process.env.APPWRITE_PAPERS_BUCKET_ID;
  return `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
};

// Helper function to generate preview URLs
export const getPreviewUrl = (fileId: string): string => {
  const endpoint = requiredEnvVars.endpoint;
  const projectId = requiredEnvVars.projectId;
  const bucketId = process.env.APPWRITE_PAPERS_BUCKET_ID;
  return `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/preview?project=${projectId}`;
};

// Add these to your .env.local file:
// NEXT_PUBLIC_APPWRITE_ENDPOINT='https://cloud.appwrite.io/v1'
// NEXT_PUBLIC_APPWRITE_PROJECT_ID='[YOUR_PROJECT_ID]'
// APPWRITE_API_KEY='[YOUR_SECRET_API_KEY]'