#!/usr/bin/env tsx
/**
 * Removes duplicate course entries (keeping first occurrence) from university .ts files.
 * Runs multiple passes until no duplicates remain (handles IDs appearing 3+ times).
 * Usage: npx tsx scripts/dedup-courses.ts --universities "ufs,ukzn,up,spu,ul,univen,vut,wits,tut,nmu,rhodes"
 */

import * as fs from "fs";
import * as path from "path";

const dataDir = path.join(process.cwd(), "data", "universities");

function hasDuplicates(content: string): boolean {
  const ids: string[] = [];
  for (const m of content.matchAll(/id: "([^"]+)"/g)) {
    if (ids.includes(m[1])) return true;
    ids.push(m[1]);
  }
  return false;
}

/** Single pass: removes ONE occurrence of each duplicate ID (the second occurrence). */
function deduplicatePass(content: string): { result: string; removed: number } {
  const idPattern = /id: "([^"]+)"/g;
  const seenIds = new Set<string>();
  const duplicateIds = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = idPattern.exec(content)) !== null) {
    if (seenIds.has(m[1])) duplicateIds.add(m[1]);
    else seenIds.add(m[1]);
  }

  if (duplicateIds.size === 0) return { result: content, removed: 0 };

  let result = content;

  for (const id of duplicateIds) {
    const pattern = `id: "${id}"`;
    const first = result.indexOf(pattern);
    if (first === -1) continue;
    const second = result.indexOf(pattern, first + pattern.length);
    if (second === -1) continue;

    // Walk backward from `second` to find the opening `{` of this course block.
    let blockOpen = second;
    while (blockOpen > 0 && result[blockOpen] !== "{") blockOpen--;

    // Walk forward from blockOpen to find the matching closing `}`, respecting strings.
    let depth = 0;
    let blockClose = blockOpen;
    let inString = false;
    let stringChar = "";
    while (blockClose < result.length) {
      const ch = result[blockClose];
      if (inString) {
        if (ch === "\\") { blockClose++; } // skip escaped char
        else if (ch === stringChar) inString = false;
      } else {
        if (ch === '"' || ch === "'") { inString = true; stringChar = ch; }
        else if (ch === "{") depth++;
        else if (ch === "}") {
          depth--;
          if (depth === 0) { blockClose++; break; }
        }
      }
      blockClose++;
    }

    // Find the start of the line containing the opening `{`
    // (walk back past indentation spaces only — keep the preceding \n so the
    //  next block stays on its own line instead of being appended to the prev line)
    let blockStart = blockOpen;
    while (blockStart > 0 && result[blockStart - 1] === " ") blockStart--;

    // Include trailing comma and the newline that follows
    if (result[blockClose] === ",") blockClose++;
    if (result[blockClose] === "\r") blockClose++;
    if (result[blockClose] === "\n") blockClose++;

    result = result.slice(0, blockStart) + result.slice(blockClose);
  }

  return { result, removed: duplicateIds.size };
}

function deduplicateFile(uni: string): void {
  const filePath = path.join(dataDir, `${uni}.ts`);
  let content = fs.readFileSync(filePath, "utf-8");

  let totalRemoved = 0;
  let passes = 0;

  while (hasDuplicates(content)) {
    const { result, removed } = deduplicatePass(content);
    if (removed === 0) break;
    content = result;
    totalRemoved += removed;
    passes++;
    if (passes > 20) { console.error(`  ${uni}: too many passes, aborting`); break; }
  }

  if (totalRemoved === 0) {
    console.log(`  ${uni}: no duplicates`);
    return;
  }

  const finalIds = [...content.matchAll(/id: "([^"]+)"/g)].map((x) => x[1]);
  const stillDupes = finalIds.filter((id, i) => finalIds.indexOf(id) !== i);
  if (stillDupes.length > 0) {
    console.error(`  ${uni}: WARNING — still has duplicates after ${passes} passes: ${stillDupes.join(", ")}`);
  }

  fs.writeFileSync(filePath, content);
  console.log(`  ${uni}: removed ${totalRemoved} duplicate(s) in ${passes} pass(es), now ${finalIds.length} courses`);
}

const args = process.argv.slice(2);
const flag = args.findIndex((a) => a === "--universities");
const unis = flag !== -1 ? args[flag + 1].split(",") : [];

if (unis.length === 0) {
  console.error('Usage: npx tsx scripts/dedup-courses.ts --universities "uni1,uni2,..."');
  process.exit(1);
}

console.log(`Deduplicating ${unis.length} universities...`);
for (const uni of unis) {
  deduplicateFile(uni.trim());
}
console.log("Done.");
