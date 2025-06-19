// Test analytics loading
const https = require("https")

function testAnalytics() {
  console.log("🔍 Testing Google Analytics on live site...")

  const options = {
    hostname: "www.coursefind.co.za",
    port: 443,
    path: "/",
    method: "GET",
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
  }

  const req = https.request(options, (res) => {
    let data = ""

    res.on("data", (chunk) => {
      data += chunk
    })

    res.on("end", () => {
      console.log(`📊 Response status: ${res.statusCode}`)

      // Check for Google Analytics
      if (data.includes("gtag.js?id=G-3C11RRX3FV")) {
        console.log("✅ Google Analytics script found in HTML")
      } else {
        console.log("❌ Google Analytics script NOT found")
      }

      if (data.includes("gtag(")) {
        console.log("✅ gtag function found")
      } else {
        console.log("❌ gtag function NOT found")
      }

      if (data.includes("G-3C11RRX3FV")) {
        console.log("✅ Analytics ID found")
      } else {
        console.log("❌ Analytics ID NOT found")
      }

      // Check cache headers
      console.log("📋 Cache headers:")
      console.log("  Cache-Control:", res.headers["cache-control"])
      console.log("  ETag:", res.headers["etag"])
      console.log("  Last-Modified:", res.headers["last-modified"])
    })
  })

  req.on("error", (e) => {
    console.error("❌ Request failed:", e.message)
  })

  req.end()
}

testAnalytics()
