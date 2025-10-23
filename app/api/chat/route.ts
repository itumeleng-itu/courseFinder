import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI("AIzaSyDgwD-lxpnCK3Q0YgYwWig9KCJJA6NCWQg")

export async function POST(request: Request) {
  try {
    const { message, conversationHistory = [] } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const systemPrompt = `You are an expert educational advisor specializing in South African universities and their admission requirements. 

You have comprehensive knowledge about:
- All 26 South African universities (Wits, UCT, UP, Stellenbosch, UJ, UKZN, etc.)
- APS (Admission Point Score) calculation and requirements
- Faculty programs and courses at each university
- Admission requirements including minimum APS, subject requirements, and NBT scores
- Application processes and deadlines
- Bursary and financial aid options
- Career paths and course outcomes

Your role is to:
1. Help students understand APS calculations and requirements
2. Guide them in choosing suitable courses based on their scores
3. Provide accurate information about university requirements
4. Suggest alternative options when students don't meet requirements
5. Explain the differences between universities and their programs
6. Be encouraging and supportive while being realistic about requirements

Always provide specific, actionable advice. When discussing APS requirements, be precise. If you don't have exact information, say so rather than guessing.

Keep responses concise but informative. Use a friendly, supportive tone.`

    const chat = model.startChat({
      history: conversationHistory.map((msg: any) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })),
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    })

    const result = await chat.sendMessage(systemPrompt + "\n\nUser: " + message)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({
      response: text,
    })
  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json(
      {
        error: "Failed to generate response. Please try again.",
      },
      { status: 500 },
    )
  }
}
