import { POST as ocrPost } from "@/app/api/ocr/route"
import { NextRequest } from "next/server"

describe("OCR.space OCR API", () => {
  const originalFetch = global.fetch
  const API_SUCCESS = {
    ParsedResults: [
      {
        ParsedText: `Mathematics 85%\nEnglish Home Language 72%\nPhysical Sciences 63%\nLife Orientation 80%`,
        MeanConfidence: 92.5,
      },
    ],
    OCRExitCode: 1,
    IsErroredOnProcessing: false,
    ProcessingTimeInMilliseconds: "1234",
  }

  beforeAll(() => {
    process.env.ocrSpaceApiKey = "test-key"
  })

  afterEach(() => {
    global.fetch = originalFetch
  })

  it("extracts subjects successfully", async () => {
    global.fetch = jest.fn(async () =>
      new Response(JSON.stringify(API_SUCCESS), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    ) as unknown as typeof fetch

    const file = new File([Buffer.from("dummy")], "matric.png", { type: "image/png" })
    const fd = new FormData()
    fd.append("file", file)
    const req = new NextRequest("http://localhost:3000/api/ocr", { method: "POST", body: fd as any })
    const res = await ocrPost(req as unknown as Request)
    const json = await res.json()

    expect(res.status).toBe(200)
    expect(json.success).toBe(true)
    expect(Array.isArray(json.subjects)).toBe(true)
    expect(json.subjects.length).toBeGreaterThanOrEqual(3)
    const math = json.subjects.find((s: any) => s.name.includes("Mathematics"))
    expect(math.percentage).toBe(85)
    expect(json.confidence).toBeGreaterThan(0)
  })

  it("handles API error response", async () => {
    global.fetch = jest.fn(async () =>
      new Response(
        JSON.stringify({ IsErroredOnProcessing: true, ErrorMessage: "Invalid API key" }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    ) as unknown as typeof fetch

    const file = new File([Buffer.from("dummy")], "matric.pdf", { type: "application/pdf" })
    const fd = new FormData()
    fd.append("file", file)
    const req = new NextRequest("http://localhost:3000/api/ocr", { method: "POST", body: fd as any })
    const res = await ocrPost(req as unknown as Request)
    const json = await res.json()
    expect(res.status).toBe(502)
    expect(json.success).toBe(false)
    expect(String(json.error)).toContain("Invalid API key")
  })

  it("rejects when no file provided", async () => {
    const fd = new FormData()
    const req = new NextRequest("http://localhost:3000/api/ocr", { method: "POST", body: fd as any })
    const res = await ocrPost(req as unknown as Request)
    const json = await res.json()
    expect(res.status).toBe(400)
    expect(json.success).toBe(false)
  })
})