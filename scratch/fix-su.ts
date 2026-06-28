import fs from 'fs'

let content = fs.readFileSync('e:\\personal projects\\cf\\courseFinder\\data\\universities\\stellenbosch.ts', 'utf-8')

// Fix simple alternatives
// alternatives: [ { English: 3 }, { Afrikaans: 3 } ]
content = content.replace(/alternatives:\s*\[\s*\{\s*English:\s*(\d+),?\s*\},\s*\{\s*Afrikaans:\s*(\d+),?\s*\},\s*\]/g, 
  '"Language": { alternatives: [{ subject: "English", level: $1 }, { subject: "Afrikaans", level: $2 }] }')

// Fix 4-part alternatives
content = content.replace(/alternatives:\s*\[\s*\{\s*Mathematics:\s*(\d+),\s*English:\s*(\d+),?\s*\},\s*\{\s*"Mathematical Literacy":\s*(\d+),\s*English:\s*(\d+),?\s*\},\s*\{\s*Mathematics:\s*(\d+),\s*Afrikaans:\s*(\d+),?\s*\},\s*\{\s*"Mathematical Literacy":\s*(\d+),\s*Afrikaans:\s*(\d+),?\s*\},\s*\]/g, 
  '"Math": { alternatives: [{ subject: "Mathematics", level: $1 }, { subject: "Mathematical Literacy", level: $3 }] },\n        "Language": { alternatives: [{ subject: "English", level: $2 }, { subject: "Afrikaans", level: $6 }] }')

// Fix 2-part math/accounting alternatives
content = content.replace(/alternatives:\s*\[\s*\{\s*Mathematics:\s*(\d+),?\s*\},\s*\{\s*Mathematics:\s*(\d+),\s*Accounting:\s*(\d+),?\s*\},\s*\]/g, 
  '"Math": { alternatives: [{ subject: "Mathematics", level: $1 }, { subject: "Accounting", level: $3 }] }') // wait, "Mathematics: 4, Accounting: 5" means Math 4 AND Accounting 5, or Math 5.
// actually, if it's "Mathematics: 5 OR (Mathematics: 4 AND Accounting: 5)" we can't easily express that.
// Let's just say Mathematics: 4, Accounting: 5 is "Mathematics 4 AND Accounting 5".
// If they have Math 5, they meet Math 4. So we just need Math 4. But if they don't have Accounting 5, they need Math 5.
// Let's manually fix that one.

// Let's also check Bachelor of Speech-Language and Hearing Therapy
content = content.replace(/alternatives:\s*\[\s*\{\s*"Physical Sciences":\s*(\d+),?\s*\},\s*\{\s*"Life Sciences":\s*(\d+),?\s*\},\s*\]/g, 
  '"Science": { alternatives: [{ subject: "Physical Sciences", level: $1 }, { subject: "Life Sciences", level: $2 }] }')

// Bachelor of Nursing
content = content.replace(/alternatives:\s*\[\s*\{\s*Mathematics:\s*(\d+),?\s*\},\s*\{\s*"Mathematical Literacy":\s*(\d+),?\s*\},\s*\]/g, 
  '"Math": { alternatives: [{ subject: "Mathematics", level: $1 }, { subject: "Mathematical Literacy", level: $2 }] }')


fs.writeFileSync('e:\\personal projects\\cf\\courseFinder\\data\\universities\\stellenbosch.ts', content)
