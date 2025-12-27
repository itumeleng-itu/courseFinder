# CourseFinder SA - Maintenance Guide

This guide contains all the commands and information you need to maintain, update, and understand the CourseFinder SA application. Written for beginners!

---

## Package Manager: pnpm

This project uses **pnpm** (Performant npm) as its package manager. It's faster and more efficient than npm.

### Why pnpm?
- **Faster** - Uses a content-addressable store, so packages are shared across projects
- **Disk efficient** - Doesn't duplicate packages
- **Strict** - Only allows access to packages you've declared as dependencies

---

## Updating Dependencies

### Check for Outdated Packages

```bash
# See which packages have newer versions available
npm outdated

# Or use npm-check-updates (more detailed)
npx -y npm-check-updates
```

### Update All Packages to Latest Versions

```bash
# Step 1: Update package.json with latest versions
npx -y npm-check-updates -u

# Step 2: Install the updated packages
pnpm install
```

### Update a Single Package

```bash
# Update a specific package
pnpm update <package-name>

# Example: Update Next.js
pnpm update next

# Update to a specific version
pnpm add next@16.1.1
```

### Fix Lockfile Issues (CI Errors)

If you see an error like `ERR_PNPM_OUTDATED_LOCKFILE`:

```bash
# Regenerate the lockfile
pnpm install --no-frozen-lockfile
```

---

## Running the Application

### Development Mode

```bash
# Start the development server (with hot reload)
pnpm dev
# or
npm run dev

# The app will be available at http://localhost:3000
```

### Production Build

```bash
# Build for production
pnpm build
# or
npm run build

# Start the production server
pnpm start
# or
npm run start
```

### Run Tests

```bash
# Run all tests
pnpm test
# or
npm test

# Run tests in watch mode (re-runs when files change)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Linting (Code Quality Check)

```bash
# Check for code issues
pnpm lint
# or
npm run lint
```

---

## Environment Variables

Create a `.env.local` file in the root directory with these variables:

```env
# Required for AI Chatbot
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Required for Bursary Scraping
GOOGLE_API_KEY=your_google_gemini_api_key_here
```

### How to Get API Keys

See the **API Documentation** section below for detailed instructions.

---

## API Documentation

This application uses several external APIs. Here's how to set them up:

---

### 1. OpenRouter API (AI Chatbot)

**What it does:** Powers the intelligent chatbot that answers questions about courses, APS calculations, and university admissions.

**Website:** https://openrouter.ai/

#### How to Get an API Key:

1. Go to https://openrouter.ai/
2. Click "Sign Up" or "Get Started"
3. Create an account (you can use Google or GitHub)
4. Go to https://openrouter.ai/keys
5. Click "Create Key"
6. Name your key (e.g., "CourseFinder")
7. Copy the key - it looks like: `sk-or-v1-xxxxxxxxxx`

#### How it's Used in the App:

```typescript
// File: app/api/chat/route.ts

// The API endpoint
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

// Making a request
const response = await fetch(OPENROUTER_API_URL, {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
    "HTTP-Referer": "https://coursefinder-sa.vercel.app",
    "X-Title": "CourseFinder SA",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "google/gemini-2.0-flash-exp:free",  // Free model
    messages: [
      { role: "system", content: "You are a helpful assistant..." },
      { role: "user", content: "What is APS?" }
    ],
    temperature: 0.5,  // Lower = more focused answers
    max_tokens: 4096   // Maximum response length
  })
})
```

#### Available Free Models:
- `google/gemini-2.0-flash-exp:free` (recommended)
- `meta-llama/llama-3.2-3b-instruct:free`
- `mistralai/mistral-7b-instruct:free`
- `google/gemini-flash-1.5:free`

#### Pricing:
- Free tier available with rate limits
- Pay-as-you-go for higher usage

---

### 2. Google Gemini API (Bursary Scraping)

**What it does:** Uses AI to scrape and extract bursary information from websites like zabursaries.co.za.

**Website:** https://aistudio.google.com/

#### How to Get an API Key:

1. Go to https://aistudio.google.com/
2. Sign in with your Google account
3. Click "Get API Key" in the left sidebar
4. Click "Create API Key"
5. Select a Google Cloud project (or create one)
6. Copy the key - it looks like: `AIzaSy...`

#### How it's Used in the App:

```typescript
// File: app/api/bursaries/route.ts

import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)

// Get the model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

// Generate content (scrape bursaries)
const result = await model.generateContent(`
  Search and extract bursaries from https://www.zabursaries.co.za/
  Return as JSON array with: title, provider, amount, eligibility, closingDate, field, link
`)

const response = await result.response
const text = response.text()  // Contains the JSON data
```

#### Pricing:
- **Free tier:** 15 requests per minute, 1 million tokens per day
- Paid tier for higher usage

---

### 3. Next.js API Routes (Internal APIs)

These are the internal API endpoints created within the app:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat` | POST | AI chatbot responses |
| `/api/bursaries` | GET | Fetch bursary listings |
| `/api/news` | GET | Education news articles |
| `/api/matric-stats` | GET | Matric statistics |
| `/api/matric-pass-rate` | GET | Pass rate data |
| `/api/papers` | GET | Past exam papers |
| `/api/certificate` | GET | Certificate generation |

#### Example: Calling an Internal API

```typescript
// From a React component
const response = await fetch('/api/bursaries')
const data = await response.json()
console.log(data.bursaries)  // Array of bursary objects
```

---

## Project Structure

```
courseFinder/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (backend)
│   │   ├── bursaries/     # Bursary data API
│   │   ├── chat/          # Chatbot API
│   │   ├── news/          # News API
│   │   └── ...
│   ├── bursaries/         # Bursaries page
│   ├── find-course/       # Course finder page
│   ├── matric-results/    # Results page
│   └── ...
├── components/            # Reusable React components
├── data/                  # Static data (universities, courses)
├── constants/             # App constants (prompts, etc.)
├── lib/                   # Utility functions
├── styles/               # Global CSS
├── __tests__/            # Test files
├── package.json          # Dependencies
├── pnpm-lock.yaml        # Locked dependency versions
└── next.config.ts        # Next.js configuration
```

---

## Common Issues and Solutions

### Issue: "ERR_PNPM_OUTDATED_LOCKFILE"

**Cause:** The lockfile doesn't match package.json

**Solution:**
```bash
pnpm install --no-frozen-lockfile
git add pnpm-lock.yaml
git commit -m "Update lockfile"
```

### Issue: "Module not found"

**Cause:** Dependencies not installed

**Solution:**
```bash
pnpm install
```

### Issue: Build fails with TypeScript errors

**Solution:**
```bash
# Check for type errors
npx tsc --noEmit

# Fix the errors shown, then rebuild
pnpm build
```

### Issue: API returns 500 error

**Cause:** Missing environment variables

**Solution:**
1. Check `.env.local` exists
2. Verify API keys are correct
3. Restart the dev server after adding env vars

---

## Deployment (Vercel)

### Deploy to Vercel

1. Push your code to GitHub
2. Go to https://vercel.com/
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:
   - `OPENROUTER_API_KEY`
   - `GOOGLE_API_KEY`
6. Click "Deploy"

### Update Deployment

```bash
# Commit and push changes
git add .
git commit -m "Your changes"
git push

# Vercel automatically deploys on push!
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Install dependencies | `pnpm install` |
| Start dev server | `pnpm dev` |
| Build for production | `pnpm build` |
| Run tests | `pnpm test` |
| Check for updates | `npx -y npm-check-updates` |
| Update all packages | `npx -y npm-check-updates -u && pnpm install` |
| Update single package | `pnpm update <package-name>` |
| Fix lockfile | `pnpm install --no-frozen-lockfile` |
| Check TypeScript | `npx tsc --noEmit` |
| Lint code | `pnpm lint` |

---

## Recommended Maintenance Schedule

| Frequency | Task |
|-----------|------|
| Weekly | Run `pnpm lint` to check code quality |
| Monthly | Check for package updates with `npx -y npm-check-updates` |
| Monthly | Update security patches |
| Quarterly | Major version updates (test thoroughly!) |

---

## Getting Help

- **Next.js Docs:** https://nextjs.org/docs
- **pnpm Docs:** https://pnpm.io/
- **OpenRouter Docs:** https://openrouter.ai/docs
- **Google AI Docs:** https://ai.google.dev/docs

---

*Last updated: December 2025*
