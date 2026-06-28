import fs from 'fs'
import path from 'path'

const dir = 'e:\\personal projects\\cf\\courseFinder\\data\\universities'
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f !== 'base-university.ts' && f !== 'index.ts' && f !== 'ump.ts' && f !== 'stellenbosch.ts')

const complexKeys = new Set<string>()

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf-8')
  
  // Try to find subjectRequirements blocks
  const reqMatch = content.match(/subjectRequirements:\s*\{([^}]*)\}/g)
  if (reqMatch) {
    for (const match of reqMatch) {
      const keys = match.match(/(["']?[a-zA-Z0-9_\s/()&-]+["']?)\s*:/g)
      if (keys) {
        for (const k of keys) {
          const key = k.replace(/:$/, '').trim().replace(/^['"]/, '').replace(/['"]$/, '')
          if (
            key.includes('/') || 
            key.toLowerCase().includes(' or ') || 
            key.includes('(') || 
            key.toLowerCase().includes(' and ') ||
            key.toLowerCase().includes('language') ||
            key.toLowerCase().includes('literacy') ||
            key.toLowerCase().includes('maths') ||
            key.toLowerCase().includes('science')
          ) {
            complexKeys.add(key)
          }
        }
      }
    }
  }
}

console.log('Complex keys found:')
for (const key of complexKeys) {
  console.log(`- ${key}`)
}
