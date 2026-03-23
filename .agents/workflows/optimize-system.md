---
description: Optimize the system by cleaning dead code, ensuring scalability, and improving performance
---

# Optimize System Workflow

## 1. Clean Dead Code

1. Search for unused components, hooks, and utility files using grep across the codebase
2. Verify each candidate has zero imports (exclude self-references)
3. Delete confirmed dead files
4. Remove unused npm dependencies (Node.js built-ins like `fs`, `path`, `child_process`, `https` shouldn't be in package.json)
5. Remove duplicate config files (e.g. dual postcss configs)

## 2. Ensure Functions and APIs Are Built for Scalability

1. Audit all API routes (`app/api/*/route.ts`) for proper caching strategy:
   - Static data → use `revalidate` (ISR) instead of `force-dynamic`
   - Dynamic data with query params → keep `force-dynamic` but set `Cache-Control` headers
   - Avoid mixing `revalidate` with `force-dynamic`
2. Check in-memory caches have proper eviction (LRU, not O(n) scans)
3. Verify rate limiting on AI/expensive endpoints
4. Ensure fallback data exists for all external API calls

## 3. Optimize System So It's Fast

1. Review `next.config.js`:
   - Remove unused variables
   - Don't use `generateBuildId` with `Date.now()` (breaks CDN caching)
   - Keep `images.unoptimized: true` if using wildcard remote patterns
2. Remove verbose `console.log` debug statements from production API routes
3. Verify build succeeds: `npx next build`
4. Check route table output for correct caching behavior (Static vs Dynamic)
