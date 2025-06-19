// Force deployment script
const { execSync } = require("child_process")

console.log("🚀 Forcing new deployment...")

try {
  // Add a timestamp to force rebuild
  const timestamp = new Date().toISOString()
  const buildInfo = `// Build timestamp: ${timestamp}\nexport const BUILD_TIME = '${timestamp}';\n`

  require("fs").writeFileSync("lib/build-info.ts", buildInfo)

  console.log("📝 Updated build timestamp")

  // Commit and push
  execSync("git add .")
  execSync(`git commit -m "Force deployment - ${timestamp}"`)
  execSync("git push origin main")

  console.log("✅ Deployment triggered successfully")
  console.log("⏳ Wait 2-3 minutes for deployment to complete")
  console.log("🔗 Then test: https://www.coursefind.co.za")
} catch (error) {
  console.error("❌ Deployment failed:", error.message)
}
