import { type NextRequest, NextResponse } from "next/server"
import { serverStorage } from "@/lib/appwrite-server"
import { ID } from "node-appwrite"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const type = formData.get("type") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const bucketId = process.env.APPWRITE_PAPERS_BUCKET_ID!

    // Convert File to Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Appwrite
    const result = await serverStorage.createFile(bucketId, ID.unique(), file)

    return NextResponse.json({
      success: true,
      fileId: result.$id,
      fileName: file.name,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
