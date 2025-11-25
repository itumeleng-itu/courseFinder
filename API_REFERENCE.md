# API Reference Guide

Complete reference for all CourseFinder SA API endpoints.

**Base URL (Development)**: `http://localhost:3000`  
**Base URL (Production)**: `https://your-domain.vercel.app`

---

## Table of Contents

1. [Course & University APIs](#course--university-apis)
2. [Statistics APIs](#statistics-apis)
3. [Bursaries API](#bursaries-api)
4. [Past Papers API](#past-papers-api)
5. [AI Chatbot API](#ai-chatbot-api)
6. [Certificate & OCR APIs](#certificate--ocr-apis)
7. [News API](#news-api)
8. [NSC Results API](#nsc-results-api)
9. [Error Responses](#error-responses)

---

## Course & University APIs

### Get All Courses

Retrieve all available courses across all universities.

**Endpoint**: `GET /api/courses`

**Parameters**: None

**Response**:
```json
{
  "success": true,
  "count": 2500,
  "courses": [
    {
      "id": "uct-medicine",
      "name": "Bachelor of Medicine and Surgery (MBChB)",
      "university": "University of Cape Town",
      "universityId": "uct",
      "faculty": "Health Sciences",
      "apsRequired": 65,
      "apsMin": 60,
      "subjectRequirements": {
        "Mathematics": 6,
        "Physical Sciences": 6,
        "Life Sciences": 6
      },
      "duration": "6 years",
      "degreeType": "undergraduate",
      "description": "Professional medical degree...",
      "additionalRequirements": [
        "NBT Academic Literacy and Quantitative Literacy at proficient level"
      ]
    }
  ]
}
```

**Cache**: 1 hour  
**Status Codes**: 200 OK, 500 Internal Server Error

---

### Get Universities List

Retrieve all universities with basic information.

**Endpoint**: `GET /api/universities`

**Parameters**: None

**Response**:
```json
{
  "success": true,
  "count": 28,
  "universities": [
    {
      "id": "uct",
      "name": "University of Cape Town",
      "shortName": "UCT",
      "location": "Cape Town, Western Cape",
      "website": "https://www.uct.ac.za",
      "courseCount": 150,
      "coordinates": {
        "latitude": -33.9577,
        "longitude": 18.4611
      }
    }
  ]
}
```

**Cache**: 24 hours  
**Status Codes**: 200 OK, 500 Internal Server Error

---

### Recommend Courses

Get personalized course recommendations based on student profile.

**Endpoint**: `POST /api/recommend-courses`

**Request Body**:
```json
{
  "subjects": {
    "Mathematics": 7,
    "Physical Sciences": 6,
    "English Home Language": 6,
    "Life Sciences": 5,
    "Afrikaans First Additional Language": 4,
    "History": 4,
    "Geography": 3
  },
  "interests": ["Engineering", "Science"],
  "preferredUniversities": ["uct", "wits", "up"],
  "location": "Gauteng",
  "includeExtended": true
}
```

**Parameters**:
- `subjects` (required): Object mapping subject names to NSC levels (1-7)
- `interests` (optional): Array of interest areas
- `preferredUniversities` (optional): Array of university IDs
- `location` (optional): Preferred province/city
- `includeExtended` (optional): Include extended curriculum programs (default: true)

**Response**:
```json
{
  "success": true,
  "totalMatches": 45,
  "apsScore": 36,
  "recommendations": [
    {
      "course": {
        "id": "uct-engineering",
        "name": "Bachelor of Science in Engineering",
        "university": "University of Cape Town",
        "faculty": "Engineering",
        "apsRequired": 35,
        "duration": "4 years"
      },
      "matchScore": 95,
      "meetsRequirements": true,
      "yourApsScore": 36,
      "requiredApsScore": 35,
      "subjectMatches": {
        "Mathematics": { your: 7, required: 6, met: true },
        "Physical Sciences": { your: 6, required: 6, met: true }
      },
      "extendedAlternative": {
        "id": "uct-engineering-extended",
        "name": "Engineering (Extended Curriculum)",
        "apsRequired": 30,
        "duration": "5 years"
      }
    }
  ],
  "alternatives": [
    {
      "reason": "Just below APS requirement",
      "courses": [ /* Extended curriculum alternatives */ ]
    }
  ]
}
```

**Cache**: No cache (dynamic based on input)  
**Status Codes**: 200 OK, 400 Bad Request, 500 Internal Server Error

---

## Statistics APIs

### Get Matric Statistics

Comprehensive national and provincial matric statistics.

**Endpoint**: `GET /api/matric-stats`

**Parameters**:
- `model` (optional): AI model to use (`gemini-2.5-flash`, `gemini-2.5-pro`) - Default: `gemini-2.5-flash`
- `refresh` (optional): Force cache refresh (`true`/`false`) - Default: `false`

**Example**:
```
GET /api/matric-stats?model=gemini-2.5-flash&refresh=false
```

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
      "distinctions": 319651,
      "distinctionRate": 45.3
    },
    "provinces": [
      {
        "name": "KwaZulu-Natal",
        "passRate": 88.5,
        "candidates": 145000,
        "passed": 128325,
        "bachelorPasses": 84470,
        "distinctions": 15660,
        "distinctionRate": 10.8,
        "rank": 1
      },
      {
        "name": "Gauteng",
        "passRate": 88.2,
        "candidates": 152000,
        "passed": 134064,
        "bachelorPasses": 66979,
        "distinctions": 8056,
        "distinctionRate": 5.3,
        "rank": 2
      }
      // ... 7 more provinces
    ]
  },
  "_metadata": {
    "model": "Gemini 2.5 Flash",
    "modelType": "gemini-2.5-flash",
    "timestamp": "2025-11-25T13:49:00.000Z",
    "lastFetched": "2025-11-25T10:00:00.000Z",
    "year": 2024,
    "note": "Cached data for 2024. Stats are fetched once per year.",
    "source": "Google Gemini with Search Grounding"
  }
}
```

**Cache**: 1 year (in-memory, year-based invalidation)  
**Status Codes**: 200 OK, 500 Internal Server Error

**Note**: First request may take 5-10 seconds (AI search), subsequent requests are instant (cached).

---

### Clear Matric Statistics Cache

Manually clear cache to force fresh data fetch.

**Endpoint**: `POST /api/matric-stats`

**Authentication**: Optional (requires `ADMIN_SECRET` environment variable)

**Headers**:
```
Authorization: Bearer YOUR_ADMIN_SECRET
```

**Request Body**: None

**Response**:
```json
{
  "success": true,
  "message": "Cache cleared. Next GET request will fetch fresh data for 2025.",
  "timestamp": "2025-11-25T13:49:00.000Z"
}
```

**Status Codes**: 200 OK, 401 Unauthorized (if auth required), 500 Internal Server Error

---

### Get Provincial Pass Rates

Historical pass rates for a specific province.

**Endpoint**: `GET /api/provincial-pass-rates`

**Parameters**:
- `province` (required): Province name (e.g., "Gauteng", "Western Cape", "KwaZulu-Natal")
- `years` (optional): Number of years to fetch (1-10) - Default: 5

**Example**:
```
GET /api/provincial-pass-rates?province=Gauteng&years=5
```

**Response**:
```json
{
  "success": true,
  "province": "Gauteng",
  "startYear": 2020,
  "endYear": 2024,
  "provinceSeries": [
    { "year": 2020, "passRate": 77.1 },
    { "year": 2021, "passRate": 77.3 },
    { "year": 2022, "passRate": 81.0 },
    { "year": 2023, "passRate": 83.8 },
    { "year": 2024, "passRate": 88.2 }
  ],
  "nationalSeries": [
    { "year": 2020, "passRate": 76.2 },
    { "year": 2021, "passRate": 76.4 },
    { "year": 2022, "passRate": 80.1 },
    { "year": 2023, "passRate": 82.9 },
    { "year": 2024, "passRate": 87.3 }
  ],
  "provinceAvg": 81.5,
  "nationalAvg": 80.6,
  "trend": "improving",
  "comparisonToNational": "+0.9% above national average",
  "_metadata": {
    "source": "Google Gemini with Search Grounding",
    "timestamp": "2025-11-25T13:49:00.000Z",
    "note": "National rates verified from official sources"
  }
}
```

**Cache**: 6 hours  
**Status Codes**: 200 OK, 400 Bad Request (missing province), 500 Internal Server Error

**Valid Provinces**:
- Gauteng
- Western Cape
- KwaZulu-Natal
- Eastern Cape
- Limpopo
- Mpumalanga
- North West
- Free State
- Northern Cape

---

### Get Matric Pass Rate News

Latest news articles about matric pass rates.

**Endpoint**: `GET /api/matric-pass-rates-news`

**Parameters**: None

**Response**:
```json
{
  "success": true,
  "count": 10,
  "news": [
    {
      "title": "SA matric pass rate hits historic high of 87.3%",
      "description": "The Department of Basic Education announced...",
      "source": "News24",
      "url": "https://www.news24.com/...",
      "publishedDate": "2025-01-14",
      "category": "Education",
      "province": "National"
    }
  ],
  "_metadata": {
    "timestamp": "2025-11-25T13:49:00.000Z",
    "source": "Aggregated from news outlets"
  }
}
```

**Cache**: 12 hours  
**Status Codes**: 200 OK, 500 Internal Server Error

---

## Bursaries API

### Get Undergraduate Bursaries

Scrape and return undergraduate bursary information.

**Endpoint**: `GET /api/bursaries`

**Parameters**: None

**Response**:
```json
{
  "success": true,
  "count": 35,
  "lastUpdated": "2025-11-25T06:00:00.000Z",
  "bursaries": [
    {
      "id": "nsfas-2025",
      "title": "NSFAS Bursary 2025",
      "provider": "National Student Financial Aid Scheme",
      "description": "Full-cost bursary for students from low-income households pursuing higher education...",
      "eligibility": [
        "South African citizen",
        "Combined household income less than R350,000 per year",
        "Admitted to a public university or TVET college",
        "Studying towards a qualification on the NSFAS list"
      ],
      "amount": "Full tuition fees + accommodation + living allowance",
      "coverage": "Full-cost (tuition, accommodation, meals, books, transport)",
      "applicationDeadline": "2025-01-31",
      "applicationUrl": "https://www.nsfas.org.za/apply",
      "contactEmail": "info@nsfas.org.za",
      "contactPhone": "0800 067 327",
      "source": "https://www.zabursaries.co.za/nsfas-bursary-2025",
      "category": "Government",
      "fieldOfStudy": "All fields",
      "studyLevel": "Undergraduate"
    }
  ],
  "sourcesAndReferences": {
    "title": "Sources & References",
    "sources": [
      "https://www.zabursaries.co.za",
      "https://www.bursaries.co.za"
    ],
    "note": "Bursary information is updated daily. Please verify details on the official bursary provider website before applying.",
    "lastScraped": "2025-11-25T06:00:00.000Z",
    "scrapedCount": 35,
    "disclaimer": "CourseFinder SA aggregates bursary information from public sources. We are not responsible for the accuracy of bursary details. Always verify with the official provider."
  }
}
```

**Cache**: 24 hours (daily scraping at 6:00 AM)  
**Status Codes**: 200 OK, 500 Internal Server Error

**Notes**:
- Minimum 35 bursaries per day
- Scraped from zabursaries.co.za and bursaries.co.za
- "Sources & References" object is always the last item
- Cache refreshes daily to ensure current information

---

## Past Papers API

### Get Past Papers

Retrieve past papers metadata with optional filtering.

**Endpoint**: `GET /api/papers`

**Parameters**:
- `subject` (optional): Filter by subject (e.g., "Mathematics", "Physical Sciences")
- `year` (optional): Filter by year (2014-2024)
- `paper_type` (optional): Filter by type ("Paper 1", "Paper 2", "Memo")
- `session` (optional): Filter by session ("February/March", "May/June", "November")
- `language` (optional): Filter by language ("English", "Afrikaans")

**Example**:
```
GET /api/papers?subject=Mathematics&year=2024&paper_type=Paper 1
```

**Response**:
```json
{
  "success": true,
  "count": 3,
  "filters": {
    "subject": "Mathematics",
    "year": 2024,
    "paper_type": "Paper 1"
  },
  "papers": [
    {
      "id": "math-2024-p1-nov-eng",
      "subject": "Mathematics",
      "year": 2024,
      "paper_type": "Paper 1",
      "session": "November",
      "language": "English",
      "filename": "mathematics_p1_november_2024_english.pdf",
      "file_id": "file_abc123",
      "bucket_id": "papers_bucket",
      "downloadUrl": "https://cloud.appwrite.io/v1/storage/buckets/.../files/.../view?project=...",
      "previewUrl": "https://cloud.appwrite.io/v1/storage/buckets/.../files/.../preview?project=...",
      "fileSize": "2.4 MB",
      "uploadedAt": "2024-12-15T10:00:00.000Z"
    }
  ],
  "_metadata": {
    "totalPapers": 450,
    "subjects": ["Mathematics", "Physical Sciences", "Life Sciences", "English", "..."],
    "years": [2014, 2015, 2016, "...", 2024],
    "timestamp": "2025-11-25T13:49:00.000Z"
  }
}
```

**Cache**: 1 hour  
**Status Codes**: 200 OK, 400 Bad Request, 500 Internal Server Error

---

### Download Past Paper

Download a specific past paper PDF.

**Endpoint**: `GET /api/papers/[file_id]/download`

**Parameters**:
- `file_id` (path parameter): Appwrite file ID

**Example**:
```
GET /api/papers/file_abc123/download
```

**Response**: PDF file download

**Status Codes**: 200 OK, 404 Not Found, 500 Internal Server Error

---

## AI Chatbot API

### Chat with AI Assistant

Send messages to the AI chatbot and receive streaming responses.

**Endpoint**: `POST /api/chat`

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

**Parameters**:
- `messages` (required): Array of message objects with `role` ("user" or "assistant") and `content`

**Response**: Server-Sent Events (SSE) stream

```
data: {"type":"text","text":"To study"}
data: {"type":"text","text":" engineering"}
data: {"type":"text","text":" at UCT,"}
data: {"type":"text","text":" you typically"}
data: {"type":"text","text":" need an"}
data: {"type":"text","text":" APS score"}
data: {"type":"text","text":" of around"}
data: {"type":"text","text":" 60"}
data: {"type":"text","text":"-65"}
data: {"type":"text","text":" for most"}
data: {"type":"text","text":" engineering"}
data: {"type":"text","text":" programs."}
data: {"type":"done"}
```

**Status Codes**: 200 OK, 400 Bad Request, 500 Internal Server Error

**Notes**:
- Uses Vercel AI SDK for streaming
- Powered by Google Gemini 2.5 Flash
- Chatbot has knowledge of all system features, universities, and courses
- Context window: Last 10 messages

**System Prompt**:
The chatbot is configured with detailed knowledge about:
- All 28 South African universities
- Course requirements and APS scores
- Bursary information
- Study tips and exam preparation
- University application processes
- Extended curriculum programs

---

## Certificate & OCR APIs

### Upload Certificate

Upload matric certificate for APS calculation.

**Endpoint**: `POST /api/certificate`

**Request**: Multipart form data

**Form Fields**:
- `file` (required): PDF or image file (JPG, PNG)
- `examNumber` (optional): Student's examination number

**Example (using curl)**:
```bash
curl -X POST http://localhost:3000/api/certificate \
  -F "file=@/path/to/certificate.pdf" \
  -F "examNumber=12345678900"
```

**Response**:
```json
{
  "success": true,
  "fileId": "file_xyz789",
  "extractedData": {
    "examNumber": "12345678900",
    "subjects": {
      "Mathematics": 7,
      "English Home Language": 6,
      "Physical Sciences": 6,
      "Life Sciences": 5,
      "Afrikaans First Additional Language": 4,
      "History": 4,
      "Geography": 3
    },
    "apsScore": 35,
    "year": 2024
  },
  "downloadUrl": "https://cloud.appwrite.io/v1/storage/...",
  "_metadata": {
    "timestamp": "2025-11-25T13:49:00.000Z",
    "fileSize": "1.2 MB",
    "fileType": "application/pdf"
  }
}
```

**Status Codes**: 200 OK, 400 Bad Request, 413 Payload Too Large, 500 Internal Server Error

**Notes**:
- Max file size: 10 MB
- Supported formats: PDF, JPG, PNG
- Uses OCR.space API for text extraction
- Stores file in Appwrite Storage (private bucket)

---

### OCR Text Extraction

Extract text from a certificate image/PDF.

**Endpoint**: `POST /api/ocr`

**Request**: Multipart form data

**Form Fields**:
- `file` (required): Image or PDF file
- `language` (optional): OCR language code ("eng", "afr") - Default: "eng"

**Example (using curl)**:
```bash
curl -X POST http://localhost:3000/api/ocr \
  -F "file=@/path/to/certificate.jpg" \
  -F "language=eng"
```

**Response**:
```json
{
  "success": true,
  "text": "NATIONAL SENIOR CERTIFICATE\nExamination Number: 12345678900\n...",
  "parsedData": {
    "examNumber": "12345678900",
    "subjects": {
      "Mathematics": 85,
      "English": 78
    },
    "detectedFormat": "NSC Certificate"
  },
  "confidence": 92.5,
  "_metadata": {
    "ocrProvider": "OCR.space",
    "language": "eng",
    "processingTime": "3.2s",
    "timestamp": "2025-11-25T13:49:00.000Z"
  }
}
```

**Status Codes**: 200 OK, 400 Bad Request, 413 Payload Too Large, 500 Internal Server Error

**Notes**:
- Powered by OCR.space API
- Free tier: 500 requests/day
- Confidence score: 0-100 (higher is better)

---

## News API

### Get Education News

Latest education news and updates.

**Endpoint**: `GET /api/news`

**Parameters**:
- `category` (optional): Filter by category ("matric", "university", "bursaries", "general")
- `limit` (optional): Number of articles to return (1-50) - Default: 20

**Example**:
```
GET /api/news?category=matric&limit=10
```

**Response**:
```json
{
  "success": true,
  "count": 10,
  "category": "matric",
  "news": [
    {
      "id": "news_001",
      "title": "2024 Matric Results: Historic 87.3% Pass Rate",
      "description": "The Department of Basic Education announced...",
      "content": "Full article content here...",
      "source": "Department of Basic Education",
      "url": "https://www.education.gov.za/...",
      "imageUrl": "https://www.education.gov.za/images/...",
      "category": "matric",
      "publishedDate": "2025-01-14T09:00:00.000Z",
      "author": "DBE Communications",
      "tags": ["matric", "pass-rate", "2024", "results"]
    }
  ],
  "_metadata": {
    "totalNews": 150,
    "lastUpdated": "2025-11-25T13:49:00.000Z",
    "sources": ["DBE", "News24", "IOL", "SABC"]
  }
}
```

**Cache**: 6 hours  
**Status Codes**: 200 OK, 400 Bad Request, 500 Internal Server Error

---

## NSC Results API

### Get NSC Results

Retrieve NSC results by examination number.

**Endpoint**: `GET /api/nsc-2024`

**Parameters**:
- `examNumber` (required): Student's 11-digit examination number

**Example**:
```
GET /api/nsc-2024?examNumber=12345678900
```

**Response (when results are available)**:
```json
{
  "success": true,
  "examNumber": "12345678900",
  "year": 2024,
  "results": {
    "overallResult": "Pass with Bachelor's Endorsement",
    "apsScore": 36,
    "subjects": [
      {
        "name": "Mathematics",
        "mark": 85,
        "level": 7,
        "achievement": "Outstanding Achievement"
      },
      {
        "name": "English Home Language",
        "mark": 78,
        "level": 6,
        "achievement": "Meritorious Achievement"
      },
      {
        "name": "Physical Sciences",
        "mark": 72,
        "level": 6,
        "achievement": "Meritorious Achievement"
      }
    ],
    "distinctions": 1,
    "passRequirement": {
      "met": true,
      "type": "Bachelor's Pass",
      "requirements": {
        "language": "✓ Level 4+ (English: 6)",
        "subjects": "✓ 4 subjects at 50%+ (Level 4+)",
        "bachelorRequirement": "✓ 4 subjects at 60%+ (Level 5+)"
      }
    }
  },
  "_metadata": {
    "releaseDate": "2025-01-14",
    "timestamp": "2025-11-25T13:49:00.000Z"
  }
}
```

**Response (when results not yet released)**:
```json
{
  "success": false,
  "message": "Marks are not yet out",
  "expectedReleaseDate": "2026-01-14",
  "currentYear": 2025,
  "note": "NSC results are typically released in mid-January each year"
}
```

**Status Codes**: 200 OK, 400 Bad Request (invalid exam number), 404 Not Found (results not found), 503 Service Unavailable (results not yet released)

**Notes**:
- Results are typically released on January 14th each year
- Before release date, API shows "Marks are not yet out" message
- Exam number format: 11 digits (e.g., 12345678900)

---

## Error Responses

### Standard Error Format

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message describing what went wrong",
  "code": "ERROR_CODE",
  "statusCode": 400,
  "_metadata": {
    "timestamp": "2025-11-25T13:49:00.000Z",
    "endpoint": "/api/courses",
    "method": "GET"
  }
}
```

### Common Error Codes

| Status Code | Error Code | Description |
|-------------|------------|-------------|
| 400 | `BAD_REQUEST` | Invalid or missing parameters |
| 401 | `UNAUTHORIZED` | Missing or invalid authentication |
| 403 | `FORBIDDEN` | Insufficient permissions |
| 404 | `NOT_FOUND` | Resource not found |
| 413 | `PAYLOAD_TOO_LARGE` | Request body exceeds size limit |
| 429 | `RATE_LIMITED` | Too many requests |
| 500 | `INTERNAL_ERROR` | Server error |
| 503 | `SERVICE_UNAVAILABLE` | Service temporarily unavailable |

### Example Error Responses

**400 Bad Request**:
```json
{
  "success": false,
  "error": "Missing required parameter: province",
  "code": "MISSING_PARAMETER",
  "statusCode": 400,
  "hint": "Include 'province' query parameter (e.g., ?province=Gauteng)"
}
```

**401 Unauthorized**:
```json
{
  "success": false,
  "error": "Authentication required",
  "code": "UNAUTHORIZED",
  "statusCode": 401,
  "hint": "Include 'Authorization: Bearer YOUR_API_KEY' header"
}
```

**500 Internal Server Error**:
```json
{
  "success": false,
  "error": "Failed to fetch data from external API",
  "code": "EXTERNAL_API_ERROR",
  "statusCode": 500,
  "details": "Google Gemini API timeout"
}
```

---

## Rate Limiting

### Current Limits

- **General APIs**: No rate limiting (currently)
- **AI Chatbot**: 60 requests per minute per IP
- **OCR**: Limited by OCR.space free tier (500/day)
- **Bursaries**: Cached (24h), indirect rate limiting via cache

### Future Implementation

Planned rate limits for production:
- **Authenticated users**: 1000 requests/hour
- **Anonymous users**: 100 requests/hour
- **Admin**: Unlimited

---

## Authentication (Planned)

### API Key Authentication

Future implementation will use Bearer token authentication:

```
Authorization: Bearer YOUR_API_KEY
```

**Get API Key**:
1. Log in to CourseFinder SA
2. Go to Settings > API Keys
3. Generate new key
4. Include in all API requests

---

## Webhooks (Planned)

Future feature to notify external systems of events:

- New matric results released
- New bursaries available
- University application deadlines approaching
- Past papers added

---

## SDK & Libraries

### JavaScript/TypeScript

```typescript
import { CourseFinder } from 'coursefinder-sdk'

const cf = new CourseFinder({ apiKey: 'YOUR_API_KEY' })

// Get courses
const courses = await cf.courses.getAll()

// Get recommendations
const recs = await cf.courses.recommend({
  subjects: { Mathematics: 7, English: 6 }
})

// Get stats
const stats = await cf.stats.getMatricStats()
```

**Note**: SDK not yet published. Coming soon!

---

## Support

**Documentation**: 
- [System Documentation](./SYSTEM_DOCUMENTATION.md)
- [Developer Quick Start](./DEVELOPER_QUICKSTART.md)
- [API Debugging Guide](./API-DEBUGGING-SUMMARY.md)

**Issues**: Report bugs and request features on GitHub

**Contact**: [Contact development team]

---

*Last Updated: 2025-11-25*  
*API Version: 1.0.0*
