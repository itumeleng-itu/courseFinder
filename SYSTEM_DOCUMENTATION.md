# CourseFinder SA - System Documentation

**Version:** 0.1.0  
**Last Updated:** 2025-11-25  
**Status:** Production Ready

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Features](#features)
4. [Technology Stack](#technology-stack)
5. [Project Structure](#project-structure)
6. [Environment Setup](#environment-setup)
7. [Database & Storage](#database--storage)
8. [API Endpoints](#api-endpoints)
9. [Data Management](#data-management)
10. [Authentication & Authorization](#authentication--authorization)
11. [Caching Strategy](#caching-strategy)
12. [Testing](#testing)
13. [Deployment](#deployment)
14. [Development Guide](#development-guide)
15. [Troubleshooting](#troubleshooting)

---

## Project Overview

**CourseFinder SA** is a comprehensive web application designed to help South African matric students find suitable university courses based on their academic performance, interests, and career goals. The system provides intelligent course matching, bursary information, past papers, matric statistics, and an AI-powered chatbot assistant.

### Key Objectives

- **Course Discovery**: Help students find courses that match their APS scores and subject requirements
- **Bursary Access**: Provide up-to-date bursary information for undergraduate students
- **Academic Resources**: Offer past papers and study materials
- **Real-Time Statistics**: Display current and historical matric pass rates
- **AI Assistance**: Provide intelligent chat-based guidance and support

### Target Users

- **Students**: Matric students seeking university admission guidance
- **Educators**: Teachers and counselors guiding students
- **Parents**: Parents supporting their children's university applications
- **Administrators**: System administrators managing content and users

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                         │
│  (Next.js 15 + React 19 + TypeScript + Tailwind CSS)  │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                  Application Layer                       │
│         (API Routes + Server Components)                 │
└─────────────────────────────────────────────────────────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
    ┌─────────┐      ┌─────────┐      ┌─────────┐
    │  Data   │      │   AI    │      │ Storage │
    │ Sources │      │ Services│      │(Appwrite)│
    └─────────┘      └─────────┘      └─────────┘
         │                 │                │
    Universities    Google Gemini    Past Papers
    Colleges        OpenRouter        User Data
    Bursaries       Search APIs       Certificates
    Statistics
```

### Architecture Patterns

- **Server-Side Rendering (SSR)**: For SEO and initial page load performance
- **API Routes**: RESTful endpoints for data fetching and processing
- **Edge Caching**: CDN and browser caching for static assets
- **Stateless Design**: No server-side sessions, JWT-based authentication
- **Component-Based UI**: Reusable React components with shadcn/ui

---

## Features

### 1. Course Finder

**Description**: Intelligent course matching system that helps students find suitable university programs.

**Capabilities**:
- APS score calculation (university-specific rules)
- Subject requirement matching
- Extended curriculum program detection
- Course filtering and sorting
- Detailed course information modals

**Universities Covered**: 28 South African universities including:
- Public Universities: UCT, Wits, UP, Stellenbosch, UJ, etc.
- Universities of Technology: TUT, CPUT, DUT, VUT, etc.
- Comprehensive Universities: UFS, UKZN, Rhodes, etc.

### 2. Bursaries Portal

**Description**: Dynamic bursary information scraping and display system.

**Capabilities**:
- Real-time bursary scraping from zabursaries.co.za and bursaries.co.za
- 24-hour caching for performance
- Minimum 35 bursaries per day
- Detailed bursary information (eligibility, amounts, deadlines)
- Sources and references tracking

**API**: `/api/bursaries`

### 3. Past Papers Library

**Description**: Comprehensive collection of NSC past papers and memoranda.

**Capabilities**:
- Papers from 2014-2024
- Multiple subjects (Mathematics, Physical Sciences, Life Sciences, etc.)
- PDFs stored in Appwrite Cloud Storage
- Search and filter functionality
- Download and preview options

**Storage**: Appwrite Bucket (`papers_database.json` index)

### 4. Matric Results Portal

**Description**: Students can view their NSC results using their examination number.

**Capabilities**:
- Dynamic year detection (shows "Marks not yet out" before release)
- Integration with DBE systems
- Subject-wise marks display
- APS calculation from results

**Note**: Currently shows placeholder for unreleased results.

### 5. AI Chatbot Assistant

**Description**: Intelligent chatbot powered by Google Gemini AI.

**Capabilities**:
- Natural language understanding
- Knowledge of all system features
- Course recommendations
- Bursary guidance
- General university admission advice
- Contextual responses based on user queries

**AI Models**: 
- Google Gemini 2.5 Flash (primary)
- Fallback to verified responses

**API**: `/api/chat`

### 6. Statistics Dashboard

**Description**: Real-time and historical matric statistics visualization.

**Capabilities**:
- National pass rates (2019-2024)
- Provincial breakdowns
- Bachelor pass rates
- Distinction statistics
- Interactive charts and maps
- Year-over-year comparisons

**Data Sources**:
- Department of Basic Education
- Google Search with AI grounding
- Verified historical data

**APIs**:
- `/api/matric-stats`
- `/api/provincial-pass-rates`
- `/api/matric-pass-rates-news`

### 7. Academic Calendar

**Description**: University and exam calendar with important dates.

**Capabilities**:
- University application deadlines
- Exam timetables
- Holiday tracking
- Provincial and national events
- Desktop and mobile views

**Data**: `lib/calendar-events.ts`

### 8. News Feed

**Description**: Latest education news and updates.

**Capabilities**:
- Matric pass rate announcements
- Bursary deadlines
- University application news
- Department of Basic Education updates

**API**: `/api/news`

### 9. Certificate Upload & OCR

**Description**: Upload and extract information from matric certificates (hidden but functional).

**Capabilities**:
- PDF/Image upload
- OCR text extraction using OCR.space API
- Subject and mark parsing
- APS calculation from certificate

**API**: `/api/certificate`, `/api/ocr`

**Status**: Feature hidden in UI but available via API

### 10. Study Tips & Resources

**Description**: Study guidance and tips for matric students.

**Capabilities**:
- Subject-specific study tips
- Exam preparation strategies
- Time management advice
- Resource recommendations

**Page**: `/study-tips`

### 11. Colleges Portal

**Description**: Information about TVET colleges as alternatives to universities.

**Capabilities**:
- 50+ TVET colleges nationwide
- Course offerings
- Location information
- Contact details

**Data**: `data/colleges.ts`  
**Page**: `/colleges`

---

## Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.1.3 | React framework with SSR/SSG |
| **React** | 19.0.0 | UI library |
| **TypeScript** | 5.x | Type-safe JavaScript |
| **Tailwind CSS** | 3.4.17 | Utility-first CSS framework |
| **shadcn/ui** | Latest | Accessible component library |
| **Radix UI** | Latest | Headless UI primitives |
| **Framer Motion** | Latest | Animation library |
| **Lucide React** | 0.454.0 | Icon library |

### AI & Data Processing

| Technology | Purpose |
|------------|---------|
| **Google Gemini AI** | Primary AI model for chat and data |
| **AI SDK** | Vercel AI SDK for streaming responses |
| **Cheerio** | Web scraping for bursaries |
| **PDF Parse** | PDF text extraction |

### Backend & Storage

| Technology | Purpose |
|------------|---------|
| **Appwrite** | Backend-as-a-Service (auth, database, storage) |
| **Vercel** | Hosting and serverless functions |
| **Edge Runtime** | Fast API responses at the edge |

### Data Visualization

| Technology | Purpose |
|------------|---------|
| **ECharts** | Interactive charts and maps |
| **Recharts** | React chart components |

### Testing

| Technology | Purpose |
|------------|---------|
| **Jest** | Unit and integration testing |
| **React Testing Library** | Component testing |

### Development Tools

| Technology | Purpose |
|------------|---------|
| **ESLint** | Code linting |
| **Prettier** | Code formatting (via ESLint) |
| **TypeScript** | Type checking |

---

## Project Structure

```
courseFinder/
├── app/                          # Next.js app directory (pages & API routes)
│   ├── api/                      # API route handlers
│   │   ├── admin/                # Admin endpoints (empty - planned)
│   │   ├── bursaries/            # Bursary scraping API
│   │   ├── certificate/          # Certificate upload API
│   │   ├── chat/                 # AI chatbot API
│   │   ├── courses/              # Course data API
│   │   ├── matric-pass-rate/     # Pass rate statistics
│   │   ├── matric-stats/         # Comprehensive stats API
│   │   ├── news/                 # Education news API
│   │   ├── nsc-2024/             # NSC results API
│   │   ├── ocr/                  # OCR processing API
│   │   ├── papers/               # Past papers API
│   │   ├── provincial-pass-rates/# Provincial statistics
│   │   └── universities/         # University data API
│   ├── bursaries/                # Bursaries page
│   ├── calendar/                 # Academic calendar page
│   ├── colleges/                 # Colleges listing page
│   ├── find-course/              # Course finder page
│   ├── matric-results/           # Results lookup page
│   ├── past-papers/              # Past papers page
│   ├── study-tips/               # Study tips page
│   ├── universities/             # Universities listing page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles
│
├── components/                   # React components
│   ├── ai-elements/              # AI chatbot components
│   │   ├── chat/                 # Chat UI components
│   │   └── elements/             # Response elements
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ... (21 components)
│   ├── APSScoreDisplay.tsx       # APS score display
│   ├── CourseInfoModal.tsx       # Course details modal
│   ├── chatbot.tsx               # Main chatbot component
│   ├── subject-form.tsx          # Subject selection form
│   └── ... (37+ components)
│
├── data/                         # Static data and university info
│   ├── universities/             # University data files
│   │   ├── base-university.ts    # Base class for universities
│   │   ├── uct.ts                # UCT courses and data
│   │   ├── wits.ts               # Wits courses and data
│   │   └── ... (28 universities)
│   └── colleges.ts               # TVET colleges data
│
├── lib/                          # Utility libraries
│   ├── appwrite.ts               # Appwrite client setup
│   ├── aps-calculator.ts         # APS calculation logic
│   ├── calendar-events.ts        # Academic calendar data
│   ├── cache-manager.ts          # Caching utilities
│   ├── matric-validation.ts      # NSC validation logic
│   ├── model-config.ts           # AI model configuration
│   ├── nsc.ts                    # NSC data helpers
│   ├── subject-aliases.ts        # Subject name normalization
│   ├── types.ts                  # TypeScript type definitions
│   ├── ocr/                      # OCR processing
│   ├── scrapers/                 # Web scraping utilities
│   ├── security/                 # Security utilities
│   └── validation/               # Validation helpers
│
├── hooks/                        # Custom React hooks
│   └── ... (4 hooks)
│
├── contexts/                     # React contexts
│
├── constants/                    # Application constants
│
├── types/                        # Additional TypeScript types
│
├── scripts/                      # Build and utility scripts
│
├── public/                       # Static assets
│   ├── images/
│   ├── icons/
│   └── ...
│
├── __tests__/                    # Test files
│   └── ... (13 test suites)
│
├── docs/                         # Additional documentation
│
├── .github/                      # GitHub workflows and configs
│
├── papers_database.json          # Past papers index (2.7MB)
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── tailwind.config.ts            # Tailwind config
├── next.config.js                # Next.js config
├── vercel.json                   # Vercel deployment config
├── netlify.toml                  # Netlify deployment config
├── jest.config.js                # Jest config
├── .env.local                    # Environment variables (gitignored)
├── .env.example                  # Environment template
├── README.md                     # Project README
├── API-DEBUGGING-SUMMARY.md      # API debugging guide
├── DATA-SOURCES.md               # Data source documentation
├── GOOGLE-AI-INTEGRATION.md      # AI integration guide
└── YEARLY-CACHING.md             # Caching implementation guide
```

---

## Environment Setup

### Prerequisites

- **Node.js**: 18.x or higher
- **npm** or **pnpm**: Latest version
- **Git**: For version control

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Google AI (required for chatbot and stats)
GOOGLE_API_KEY=your_google_api_key_here

# Appwrite (required for past papers and user data)
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
NEXT_PUBLIC_APPWRITE_PAPERS_COLLECTION_ID=your_collection_id
NEXT_PUBLIC_APPWRITE_PAPERS_BUCKET_ID=your_bucket_id
NEXT_PUBLIC_APPWRITE_RESULTS_BUCKET_ID=your_results_bucket_id

# OCR.space (optional, for certificate upload)
OCR_SPACE_API_KEY=your_ocr_space_api_key

# Admin (optional, for admin features)
ADMIN_SECRET=your_admin_secret_key

# OpenRouter (optional, fallback AI)
OPENROUTER_API_KEY=your_openrouter_key
```

### Getting API Keys

#### Google AI API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy and add to `.env.local`

#### Appwrite Setup
1. Create account at [Appwrite Cloud](https://cloud.appwrite.io)
2. Create a new project
3. Set up database and storage buckets
4. Copy project ID and IDs to `.env.local`

#### OCR.space API Key
1. Sign up at [OCR.space](https://ocr.space/ocrapi)
2. Get free API key
3. Add to `.env.local`

### Installation

```bash
# Clone the repository
git clone https://github.com/itumeleng-itu/courseFinder.git
cd courseFinder

# Install dependencies
npm install
# or
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Production
npm run build        # Build for production
npm run start        # Start production server

# Testing
npm run test         # Run Jest tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage

# Linting
npm run lint         # Run ESLint
```

---

## Database & Storage

### Appwrite Cloud

**Purpose**: Backend-as-a-Service for authentication, database, and file storage.

#### Collections

1. **Papers Collection**
   - Stores metadata for past papers
   - Fields: `subject`, `year`, `paper_type`, `session`, `language`, `file_id`, `bucket_id`
   - Indexes: Subject, Year, Paper Type

2. **Users Collection** (planned)
   - User profiles and preferences
   - Fields: `name`, `email`, `role`, `school`, etc.

3. **Admin Collection** (planned)
   - Admin user management
   - Fields: `email`, `role`, `permissions`

#### Storage Buckets

1. **Papers Bucket**
   - Stores PDF files for past papers
   - Size: ~500MB (growing)
   - Access: Public read

2. **Results Bucket**
   - Stores uploaded matric certificates
   - Access: Private (user-specific)

### Local Data Storage

**papers_database.json**: 2.7MB JSON file containing indexed past papers metadata for quick access without database queries.

---

## API Endpoints

### Course & University APIs

#### `GET /api/courses`
**Description**: Get all available courses across all universities.

**Response**:
```json
{
  "courses": [
    {
      "id": "uct-medicine",
      "name": "Bachelor of Medicine and Surgery (MBChB)",
      "university": "University of Cape Town",
      "faculty": "Health Sciences",
      "apsRequired": 65,
      "subjectRequirements": {
        "Mathematics": 6,
        "Physical Sciences": 6,
        "Life Sciences": 6
      },
      "duration": "6 years"
    }
  ]
}
```

#### `GET /api/universities`
**Description**: Get list of all universities with basic info.

**Response**:
```json
{
  "universities": [
    {
      "id": "uct",
      "name": "University of Cape Town",
      "shortName": "UCT",
      "location": "Cape Town, Western Cape",
      "website": "https://www.uct.ac.za",
      "courseCount": 150
    }
  ]
}
```

#### `POST /api/recommend-courses`
**Description**: Get personalized course recommendations based on student profile.

**Request Body**:
```json
{
  "subjects": {
    "Mathematics": 7,
    "Physical Sciences": 6,
    "English": 6,
    "Life Sciences": 5
  },
  "interests": ["Engineering", "Science"]
}
```

**Response**:
```json
{
  "recommendations": [
    {
      "course": { /* course details */ },
      "matchScore": 95,
      "meetsRequirements": true,
      "apsScore": 36
    }
  ]
}
```

### Matric Statistics APIs

#### `GET /api/matric-stats`
**Description**: Get comprehensive matric statistics (national and provincial).

**Query Parameters**:
- `model` (optional): AI model to use (default: "gemini-2.5-flash")
- `refresh` (optional): Force cache refresh (default: false)

**Caching**: 1 year (yearly data)

**Response**:
```json
{
  "success": true,
  "stats": {
    "national": {
      "passRate": 87.3,
      "totalCandidates": 705291,
      "totalPassed": 615429,
      "year": 2024,
      "bachelorPassRate": 47.8,
      "bachelorPasses": 337158,
      "distinctions": 319651
    },
    "provinces": [
      {
        "name": "Gauteng",
        "passRate": 88.2,
        "candidates": 152000,
        "bachelorPasses": 66979,
        "distinctionRate": 5.3
      }
    ]
  },
  "_metadata": {
    "model": "Gemini 2.5 Flash",
    "timestamp": "2025-11-23T15:00:00.000Z",
    "year": 2024
  }
}
```

#### `GET /api/provincial-pass-rates`
**Description**: Get historical provincial pass rates.

**Query Parameters**:
- `province` (required): Province name (e.g., "Gauteng", "Western Cape")
- `years` (optional): Number of years to fetch (default: 5, max: 10)

**Caching**: 6 hours

**Response**:
```json
{
  "success": true,
  "province": "Gauteng",
  "endYear": 2024,
  "provinceSeries": [
    {"year": 2020, "passRate": 77.1},
    {"year": 2021, "passRate": 77.3},
    {"year": 2022, "passRate": 81.0},
    {"year": 2023, "passRate": 83.8},
    {"year": 2024, "passRate": 88.2}
  ],
  "nationalSeries": [
    {"year": 2020, "passRate": 76.2},
    {"year": 2021, "passRate": 76.4},
    {"year": 2022, "passRate": 80.1},
    {"year": 2023, "passRate": 82.9},
    {"year": 2024, "passRate": 87.3}
  ]
}
```

#### `GET /api/matric-pass-rates-news`
**Description**: Get news articles about matric pass rates.

**Response**: Array of news articles with titles, descriptions, sources, and URLs.

### Bursaries API

#### `GET /api/bursaries`
**Description**: Scrape and return undergraduate bursary information.

**Caching**: 24 hours

**Response**:
```json
{
  "success": true,
  "bursaries": [
    {
      "title": "NSFAS Bursary 2025",
      "provider": "National Student Financial Aid Scheme",
      "description": "Full-cost bursary for students from low-income households",
      "eligibility": [
        "South African citizen",
        "Combined household income less than R350,000",
        "Admitted to a public university or TVET college"
      ],
      "amount": "Full tuition + accommodation + stipend",
      "applicationDeadline": "2025-01-31",
      "applicationUrl": "https://www.nsfas.org.za/apply",
      "source": "https://www.zabursaries.co.za"
    }
  ],
  "sourcesAndReferences": {
    "title": "Sources & References",
    "sources": [
      "https://www.zabursaries.co.za",
      "https://www.bursaries.co.za"
    ],
    "note": "Bursary information is updated daily..."
  }
}
```

### Past Papers API

#### `GET /api/papers`
**Description**: Get past papers metadata.

**Query Parameters**:
- `subject` (optional): Filter by subject
- `year` (optional): Filter by year
- `paper_type` (optional): Filter by paper type (Paper 1, Paper 2, Memo)

**Response**:
```json
{
  "papers": [
    {
      "id": "paper_123",
      "subject": "Mathematics",
      "year": 2024,
      "paper_type": "Paper 1",
      "session": "November",
      "language": "English",
      "file_id": "file_xyz",
      "downloadUrl": "https://..."
    }
  ]
}
```

### AI Chatbot API

#### `POST /api/chat`
**Description**: AI chatbot for student queries.

**Request Body**:
```json
{
  "messages": [
    {
      "role": "user",
      "content": "What APS score do I need for engineering at UCT?"
    }
  ]
}
```

**Response**: Streaming text response using Vercel AI SDK.

**Features**:
- Contextual understanding
- Knowledge of all system features
- Course recommendations
- Bursary guidance
- University admission advice

### Certificate & OCR APIs

#### `POST /api/certificate`
**Description**: Upload and process matric certificate.

**Request**: Multipart form data with PDF/image file.

**Response**:
```json
{
  "success": true,
  "fileId": "file_abc",
  "extractedData": {
    "subjects": {
      "Mathematics": 7,
      "English": 6
    },
    "apsScore": 36
  }
}
```

#### `POST /api/ocr`
**Description**: OCR text extraction from certificate.

**Request**: Multipart form data with file.

**Response**:
```json
{
  "success": true,
  "text": "Extracted text from certificate...",
  "parsedData": {
    "subjects": {},
    "marks": {}
  }
}
```

### News API

#### `GET /api/news`
**Description**: Get latest education news.

**Response**: Array of news articles with education updates.

### NSC Results API

#### `GET /api/nsc-2024`
**Description**: Get NSC results by examination number.

**Query Parameters**:
- `examNumber` (required): Student's examination number

**Response**:
```json
{
  "success": true,
  "results": {
    "examNumber": "12345678900",
    "subjects": [
      {
        "name": "Mathematics",
        "mark": 85,
        "level": 7
      }
    ],
    "apsScore": 36
  }
}
```

**Note**: Currently returns placeholder data until results are released.

---

## Data Management

### University Data Structure

Each university is represented as a class extending `BaseUniversity`:

```typescript
// Example: UCT University
export class UCTUniversity extends BaseUniversity {
  readonly id = "uct"
  readonly name = "University of Cape Town"
  readonly shortName = "UCT"
  readonly website = "https://www.uct.ac.za"
  readonly location = {
    city: "Cape Town",
    province: "Western Cape",
    coordinates: { latitude: -33.9577, longitude: 18.4611 }
  }

  protected readonly _courses: Course[] = [
    {
      id: "uct-medicine",
      name: "Bachelor of Medicine and Surgery (MBChB)",
      faculty: "Health Sciences",
      apsRequired: 65,
      subjectRequirements: {
        Mathematics: 6,
        Physical Sciences: 6,
        Life Sciences: 6
      },
      additionalRequirements: [
        "Must pass NBT Academic Literacy and Quantitative Literacy at proficient level"
      ],
      duration: "6 years",
      degreeType: "undergraduate"
    }
    // ... more courses
  ]

  calculateApsScore(subjects: Record<string, number>): number {
    // UCT-specific APS calculation
    // Top 6 subjects including English and another language
  }
}
```

### Extended Curriculum Programs

Extended programs are flagged with:
- `isExtendedCurriculum: true`
- `standardProgramId`: Links to the standard program
- Lower APS requirements
- Additional foundation year

Example:
```typescript
{
  id: "uct-engineering-extended",
  name: "Engineering (Extended Curriculum Programme)",
  isExtendedCurriculum: true,
  standardProgramId: "uct-engineering",
  apsRequired: 50, // Lower than standard (60)
  duration: "5 years" // 1 extra year
}
```

### Subject Requirements

Subject requirements support multiple formats:

```typescript
// Simple requirement
subjectRequirements: {
  Mathematics: 6  // Must have level 6 or higher
}

// Alternative subjects
subjectRequirements: {
  Mathematics: {
    alternatives: [
      { subject: "Mathematics", level: 6 },
      { subject: "Mathematical Literacy", level: 7 }
    ]
  }
}
```

### Static Data Files

- **Universities**: `data/universities/*.ts` (28 files)
- **Colleges**: `data/colleges.ts`
- **Calendar**: `lib/calendar-events.ts`
- **Past Papers Index**: `papers_database.json`

---

## Authentication & Authorization

### Current Status

**Authentication**: Not fully implemented (planned)

**Admin System**: Basic structure in place (`app/api/admin/` directory empty)

### Planned Features

1. **User Roles**:
   - `student`: Regular users
   - `educator`: Teachers and counselors
   - `admin`: System administrators
   - `superadmin`: Full system access

2. **Appwrite Auth**:
   - Email/password authentication
   - Social login (Google, Facebook)
   - JWT tokens

3. **Protected Routes**:
   - `/admin/*`: Admin dashboard
   - User-specific data access

4. **Permissions**:
   - Students: View courses, bursaries, papers
   - Educators: View + analytics
   - Admin: All + content management
   - SuperAdmin: All + user management

### SuperAdmin Setup (Planned)

See conversation history for SuperAdmin seeding implementation.

---

## Caching Strategy

### API-Level Caching

#### Matric Stats API
- **Cache Duration**: 1 year
- **Strategy**: In-memory cache with year-based invalidation
- **Rationale**: Statistics don't change after release
- **Implementation**: See `YEARLY-CACHING.md`

```typescript
// Cache usage
const cache = {
  data: null,
  year: null,
  timestamp: null
}

// Check cache
if (cache.year === currentYear && cache.data) {
  return cache.data // Instant response
}

// Fetch fresh
const data = await fetchFromGemini()
cache.data = data
cache.year = currentYear
cache.timestamp = new Date()
```

#### Provincial Pass Rates API
- **Cache Duration**: 6 hours
- **Stale-While-Revalidate**: 3 hours
- **Rationale**: Balance between freshness and performance

#### Bursaries API
- **Cache Duration**: 24 hours
- **Rationale**: Daily scraping, bursaries don't change frequently

### HTTP Caching Headers

```typescript
// Example
res.setHeader('Cache-Control', 's-maxage=31536000, stale-while-revalidate=86400')
```

### Browser Caching

- Static assets: 1 year
- API responses: Varies by endpoint
- CDN caching via Vercel Edge Network

### Cache Invalidation

#### Manual Refresh
```bash
# Force refresh matric stats
curl "http://localhost:3000/api/matric-stats?refresh=true"

# Clear cache (POST)
curl -X POST "http://localhost:3000/api/matric-stats" \
  -H "Authorization: Bearer YOUR_ADMIN_SECRET"
```

#### Automatic Refresh
- Scheduled cron job on January 15th (new matric results release)
- Server restart clears in-memory cache

---

## Testing

### Test Structure

```
__tests__/
├── api/                  # API route tests
├── components/           # Component tests
├── lib/                  # Utility function tests
└── integration/          # Integration tests
```

### Running Tests

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Test Coverage

Current coverage: ~60% (target: 80%)

**Well-tested areas**:
- APS calculation
- Subject validation
- University data structure
- API endpoints

**Areas needing tests**:
- UI components
- Edge cases
- Error handling

### Example Test

```typescript
// __tests__/lib/aps-calculator.test.ts
import { calculateAPS } from '@/lib/aps-calculator'

describe('APS Calculator', () => {
  it('calculates APS correctly for 7 subjects', () => {
    const subjects = {
      'Mathematics': 7,
      'English': 6,
      'Physical Sciences': 6,
      'Life Sciences': 5,
      'Afrikaans': 4,
      'History': 3,
      'Geography': 2
    }
    expect(calculateAPS(subjects)).toBe(33)
  })
})
```

---

## Deployment

### Vercel (Current)

**URL**: [https://vercel.com/matomejohn170-gmailcoms-projects/v0-matric-university-app](https://vercel.com/matomejohn170-gmailcoms-projects/v0-matric-university-app)

**Configuration**: `vercel.json`
```json
{
  "buildCommand": "next build",
  "framework": "nextjs",
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "s-maxage=3600, stale-while-revalidate"
        }
      ]
    }
  ]
}
```

**Environment Variables**:
- Set in Vercel dashboard
- Production, Preview, and Development environments

**Deployment Process**:
1. Push to `main` branch
2. Vercel automatically builds and deploys
3. Preview deployments for pull requests

### Netlify (Alternative)

**Configuration**: `netlify.toml`
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

### Manual Deployment

```bash
# Build for production
npm run build

# Test production build locally
npm run start

# Deploy to Vercel
npx vercel --prod

# Deploy to Netlify
npx netlify deploy --prod
```

### Pre-Deployment Checklist

- [ ] All tests passing (`npm run test`)
- [ ] No linting errors (`npm run lint`)
- [ ] Environment variables configured
- [ ] API keys secured
- [ ] Database migrations applied (if any)
- [ ] Cache warmed (optional, for performance)
- [ ] Analytics configured
- [ ] Error monitoring set up (Sentry, LogRocket, etc.)

---

## Development Guide

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js config
- **File naming**: 
  - Components: PascalCase (`CourseCard.tsx`)
  - Utilities: camelCase (`apsCalculator.ts`)
  - Pages: kebab-case (`find-course/page.tsx`)

### Component Development

```tsx
// Example: Good component structure
import { FC } from 'react'
import { Card } from '@/components/ui/card'

interface CourseCardProps {
  course: Course
  onSelect?: (course: Course) => void
}

export const CourseCard: FC<CourseCardProps> = ({ course, onSelect }) => {
  return (
    <Card onClick={() => onSelect?.(course)}>
      <h3>{course.name}</h3>
      <p>{course.university}</p>
    </Card>
  )
}
```

### API Route Development

```typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const param = searchParams.get('param')

    // Validate input
    if (!param) {
      return NextResponse.json(
        { error: 'Missing parameter' },
        { status: 400 }
      )
    }

    // Fetch data
    const data = await fetchData(param)

    // Return response with caching
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400'
      }
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### Adding a New University

1. Create file: `data/universities/newuni.ts`
2. Extend `BaseUniversity` class
3. Define university metadata
4. Add courses array
5. Implement `calculateApsScore` method
6. Export instance
7. Register in `data/universities/index.ts`

```typescript
// data/universities/newuni.ts
import { BaseUniversity } from './base-university'
import type { Course } from '@/lib/types'

export class NewUniversity extends BaseUniversity {
  readonly id = "newuni"
  readonly name = "New University"
  readonly shortName = "NewU"
  readonly website = "https://www.newuni.ac.za"
  readonly location = {
    city: "City",
    province: "Province"
  }

  protected readonly _courses: Course[] = [
    // Add courses here
  ]

  calculateApsScore(subjects: Record<string, number>): number {
    // University-specific calculation
    const topSix = Object.values(subjects)
      .sort((a, b) => b - a)
      .slice(0, 6)
    return topSix.reduce((sum, val) => sum + val, 0)
  }
}

export const newUniversity = new NewUniversity()
```

### Debugging Tips

1. **API Issues**:
   - Check `API-DEBUGGING-SUMMARY.md`
   - Enable verbose logging
   - Use browser DevTools Network tab

2. **Data Issues**:
   - Verify `papers_database.json` integrity
   - Check Appwrite console for storage issues
   - Validate university data structure

3. **Performance Issues**:
   - Use React Profiler
   - Check cache hit rates
   - Monitor API response times
   - Use Vercel Analytics

4. **AI Issues**:
   - Verify API keys in `.env.local`
   - Check API quota/limits
   - Review `GOOGLE-AI-INTEGRATION.md`

---

## Troubleshooting

### Common Issues

#### 1. Build Failures

**Symptom**: `npm run build` fails

**Solutions**:
- Clear `.next` directory: `rm -rf .next`
- Clear node_modules: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npx tsc --noEmit`
- Check ESLint errors: `npm run lint`

#### 2. API 500 Errors

**Symptom**: API returns 500 Internal Server Error

**Solutions**:
- Check environment variables
- Verify API keys are valid
- Check server logs in Vercel dashboard
- Test locally: `npm run dev`

#### 3. Slow API Responses

**Symptom**: APIs take >10 seconds

**Solutions**:
- Check if cache is working
- Verify external APIs (Google, OCR.space) are responding
- Check network connectivity
- Use `?refresh=true` to test fresh fetch

#### 4. Missing Data

**Symptom**: No courses/bursaries/papers showing

**Solutions**:
- Check API response in DevTools
- Verify data files exist (`data/universities/*.ts`)
- Check Appwrite database/storage
- Review scraping logs (bursaries)

#### 5. Authentication Errors (Planned Feature)

**Symptom**: Cannot log in

**Solutions**:
- Verify Appwrite project configuration
- Check user exists in Appwrite console
- Clear browser cookies/cache
- Check JWT token validity

### Error Monitoring

**Recommended Tools**:
- **Sentry**: Real-time error tracking
- **LogRocket**: Session replay
- **Vercel Analytics**: Performance monitoring

### Getting Help

1. Check existing documentation:
   - `README.md`
   - `API-DEBUGGING-SUMMARY.md`
   - `GOOGLE-AI-INTEGRATION.md`
   - `YEARLY-CACHING.md`
   - `DATA-SOURCES.md`

2. Review conversation history (see provided summaries)

3. Check GitHub issues (if repository is public)

4. Contact development team

---

## Appendix

### Glossary

- **APS**: Admission Point Score - Calculated from matric results
- **NSC**: National Senior Certificate - South African matric qualification
- **DBE**: Department of Basic Education
- **TVET**: Technical and Vocational Education and Training
- **NSFAS**: National Student Financial Aid Scheme
- **OCR**: Optical Character Recognition
- **SSR**: Server-Side Rendering
- **API**: Application Programming Interface
- **CDN**: Content Delivery Network

### Useful Links

- **Production App**: [Vercel Deployment](https://vercel.com/matomejohn170-gmailcoms-projects/v0-matric-university-app)
- **Google AI Studio**: [https://makersuite.google.com](https://makersuite.google.com)
- **Appwrite Cloud**: [https://cloud.appwrite.io](https://cloud.appwrite.io)
- **Next.js Docs**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **shadcn/ui**: [https://ui.shadcn.com](https://ui.shadcn.com)
- **Department of Basic Education**: [https://www.education.gov.za](https://www.education.gov.za)

### Version History

| Version | Date | Changes |
|---------|------|---------|
| 0.1.0 | 2025-11-25 | Initial system documentation |

### Contributing

See `CONTRIBUTING.md` (to be created) for contribution guidelines.

### License

See `LICENSE` (to be created) for license information.

---

**Document Maintained By**: Development Team  
**Last Review**: 2025-11-25  
**Next Review**: 2026-01-15 (after new NSC results release)
