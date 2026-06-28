import fs from 'fs'
import path from 'path'

const dir = 'e:\\personal projects\\cf\\courseFinder\\data\\universities'
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f !== 'base-university.ts' && f !== 'index.ts' && f !== 'stellenbosch.ts')

let totalReplaced = 0

for (const file of files) {
  const filePath = path.join(dir, file)
  let content = fs.readFileSync(filePath, 'utf-8')

  // Combine Mathematics and Mathematical Literacy
  content = content.replace(/"?Mathematics"?:?\s*(\d+),\s*"?(Mathematical Literacy|Mathematics Literacy)"?:?\s*(\d+),?/g,
    '"Math": { alternatives: [{ subject: "Mathematics", level: $1 }, { subject: "Mathematical Literacy", level: $3 }] },')

  // Combine English Home Language and English First Additional Language
  content = content.replace(/"?English Home(?: Language)?"?:?\s*(\d+),\s*"?English First Additional(?: Language)?"?:?\s*(\d+),?/g,
    '"Language": { alternatives: [{ subject: "English Home Language", level: $1 }, { subject: "English First Additional Language", level: $2 }] },')

  // Combine generic English / English FAL
  content = content.replace(/"?English(?: Language)?"?:?\s*(\d+),\s*"?English First Additional(?: Language)?"?:?\s*(\d+),?/g,
    '"Language": { alternatives: [{ subject: "English", level: $1 }, { subject: "English First Additional Language", level: $2 }] },')

  // Slash separated
  // "Physical Sciences/Life Sciences": 4  -> "Science": { alternatives: [{ subject: "Physical Sciences", level: 4 }, { subject: "Life Sciences", level: 4 }] }
  // We can do this with a generic regex for 2 slash separated words.
  content = content.replace(/"([a-zA-Z\s]+)\/([a-zA-Z\s]+)":\s*(\d+),?/g, (match, sub1, sub2, level) => {
    return `"Alternatives": { alternatives: [{ subject: "${sub1.trim()}", level: ${level} }, { subject: "${sub2.trim()}", level: ${level} }] },`
  })

  // Three slash separated
  content = content.replace(/"([a-zA-Z\s]+)\/([a-zA-Z\s]+)\/([a-zA-Z\s]+)":\s*(\d+),?/g, (match, sub1, sub2, sub3, level) => {
    return `"Alternatives": { alternatives: [{ subject: "${sub1.trim()}", level: ${level} }, { subject: "${sub2.trim()}", level: ${level} }, { subject: "${sub3.trim()}", level: ${level} }] },`
  })

  // Fix "Mathematics or Mathematical Literacy": 4
  content = content.replace(/"([a-zA-Z\s]+)\s+or\s+([a-zA-Z\s]+)":\s*(\d+),?/ig, (match, sub1, sub2, level) => {
    return `"Alternatives": { alternatives: [{ subject: "${sub1.trim()}", level: ${level} }, { subject: "${sub2.trim()}", level: ${level} }] },`
  })

  fs.writeFileSync(filePath, content)
  totalReplaced++
}

console.log(`Processed ${totalReplaced} files.`)
