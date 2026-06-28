import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createHmac, randomBytes, timingSafeEqual } from "crypto"

const ADMIN_SECRET = process.env.ADMIN_SECRET || ""
const COOKIE_NAME = "admin_session"
const COOKIE_MAX_AGE = 60 * 60 * 24 // 24 hours

function generateSessionToken(): string {
  // Random opaque token signed with HMAC-SHA256 so we never embed the secret
  const nonce = randomBytes(16).toString("hex")
  const sig = createHmac("sha256", ADMIN_SECRET).update(nonce).digest("hex")
  return `${nonce}.${sig}`
}

function validateSessionToken(token: string): boolean {
  if (!token || !ADMIN_SECRET) return false
  try {
    const dot = token.lastIndexOf(".")
    if (dot === -1) return false
    const nonce = token.slice(0, dot)
    const sig = token.slice(dot + 1)
    const expected = createHmac("sha256", ADMIN_SECRET).update(nonce).digest("hex")
    // Constant-time comparison to prevent timing attacks
    return timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"))
  } catch {
    return false
  }
}

// POST — Login
export async function POST(request: NextRequest) {
  try {
    const { secret } = await request.json()

    if (!ADMIN_SECRET) {
      return NextResponse.json(
        { error: "Admin authentication is not configured" },
        { status: 500 }
      )
    }

    const secretStr = String(secret ?? "")
    const isValid = secretStr.length === ADMIN_SECRET.length &&
      timingSafeEqual(Buffer.from(secretStr), Buffer.from(ADMIN_SECRET))
    if (!secretStr || !isValid) {
      return NextResponse.json(
        { error: "Invalid admin secret" },
        { status: 401 }
      )
    }

    const token = generateSessionToken()

    const cookieStore = await cookies()
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    )
  }
}

// GET — Check session
export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value

  if (!token || !validateSessionToken(token)) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  return NextResponse.json({ authenticated: true })
}

// DELETE — Logout
export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
  return NextResponse.json({ success: true })
}
