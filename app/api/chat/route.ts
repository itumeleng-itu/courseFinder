import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"
import { universities } from "@/data/universities"

const genAI = new GoogleGenerativeAI("AIzaSyDgwD-lxpnCK3Q0YgYwWig9KCJJA6NCWQg")

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    // Get all courses from all universities
    const allCourses = universities.flatMap((uni) =>
      uni.courses.map((course) => ({
        university: uni.name,
        course: course.name,
        faculty: course.faculty,
        apsMin: course.apsMin,
        duration: course.duration,
        requirements: course.subjectRequirements,
      })),
    )

    // Create context about universities
    const universitiesContext = universities.map((uni) => ({
      name: uni.name,
      location: `${uni.location.city}, ${uni.location.province}`,
      faculties: uni.faculties,
      totalCourses: uni.courses.length,
    }))

    const systemPrompt = `You are a helpful assistant for South African university admissions. You have access to information about ${universities.length} South African universities and their courses.

Available Universities:
${universitiesContext.map((u) => `- ${u.name} (${u.location}) - ${u.totalCourses} courses across ${u.faculties.length} faculties`).join("\n")}

Your role is to:
1. Help students find suitable courses based on their APS scores and interests
2. Explain admission requirements for specific courses
3. Provide information about different universities and their programs
4. Guide students through the APS calculation process
5. Answer questions about subjects, faculties, and career paths

Key Information:
- APS (Admission Point Score) ranges from 0-84 points
- Students need to achieve at least level 4 (50-59%) in 4 subjects
- Life Orientation is counted at 50% of the mark
- Different courses have different APS minimums and subject requirements

When answering:
- Be specific about APS requirements
- Mention relevant subject requirements
- Suggest multiple university options when possible
- Be encouraging and informative
- If you don't have specific information, suggest using the "Find Course" feature on the platform

Sample courses available (showing diversity):
${allCourses
  .slice(0, 10)
  .map((c) => `- ${c.course} at ${c.university} (APS: ${c.apsMin})`)
  .join("\n")}

Always format your responses clearly with bullet points or numbered lists when listing multiple items.`

    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    })

    // Convert messages to Gemini format
    const chat = model.startChat({
      history: messages.slice(0, -1).map((msg: any) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })),
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    })

    // Add system context as first message
    const userMessage = messages[messages.length - 1].content
    const contextualMessage = `${systemPrompt}\n\nUser question: ${userMessage}`

    const result = await chat.sendMessage(contextualMessage)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json({ error: "Failed to process chat message" }, { status: 500 })
  }
}
