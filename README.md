# CourseFinder SA

> Helping South African matric students find their perfect university course

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/matomejohn170-gmailcoms-projects/v0-matric-university-app)
[![Next.js](https://img.shields.io/badge/Next.js-15.1.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)

---

## 🎓 About CourseFinder SA

**CourseFinder SA** is a comprehensive web application designed to help South African matric students make informed decisions about their higher education. We provide intelligent course matching, bursary information, past papers, real-time statistics, and AI-powered guidance.

### Key Features

✅ **Course Finder** - Match students with suitable courses based on APS scores and subject requirements  
✅ **28 Universities** - Comprehensive coverage of South African public universities  
✅ **Bursary Portal** - Daily-updated undergraduate bursary information  
✅ **Past Papers** - 10+ years of NSC past papers and memoranda  
✅ **AI Chatbot** - Intelligent assistant powered by Google Gemini  
✅ **Real-Time Statistics** - Live matric pass rates (national & provincial)  
✅ **Extended Programs** - Foundation year alternatives for students just below APS requirements  
✅ **Academic Calendar** - Important dates and deadlines  
✅ **TVET Colleges** - Alternative educational pathways

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org))
- **npm** or **pnpm**
- **Google AI API Key** ([Get here](https://makersuite.google.com/app/apikey))

### Installation

```bash
# Clone the repository
git clone https://github.com/itumeleng-itu/courseFinder.git
cd courseFinder

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your GOOGLE_API_KEY

# Run development server
npm run dev

# Open http://localhost:3000
```

**That's it!** You're ready to start developing. 🎉

---

## 📚 Documentation

Comprehensive documentation is available to help you understand, develop, and maintain the system.

### Documentation Hub

📖 **[DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)** - Start here for navigation

### Quick Links

| Document | Purpose | Audience |
|----------|---------|----------|
| **[DEVELOPER_QUICKSTART.md](./DEVELOPER_QUICKSTART.md)** | Get started in 5 minutes | New Developers |
| **[SYSTEM_DOCUMENTATION.md](./SYSTEM_DOCUMENTATION.md)** | Complete system architecture & features | Developers, Architects |
| **[API_REFERENCE.md](./API_REFERENCE.md)** | All API endpoints and usage | Developers |
| **[MAINTENANCE_OPERATIONS.md](./MAINTENANCE_OPERATIONS.md)** | Daily/monthly operations guide | DevOps, SysAdmins |
| **[API-DEBUGGING-SUMMARY.md](./API-DEBUGGING-SUMMARY.md)** | Troubleshooting guide | Developers |
| **[GOOGLE-AI-INTEGRATION.md](./GOOGLE-AI-INTEGRATION.md)** | AI integration details | Developers |
| **[YEARLY-CACHING.md](./YEARLY-CACHING.md)** | Caching strategy | Developers |
| **[DATA-SOURCES.md](./DATA-SOURCES.md)** | Data source information | Data Teams |

---

## 🛠️ Technology Stack

**Frontend**
- Next.js 15.1.3 (React 19, App Router)
- TypeScript 5.x
- Tailwind CSS 3.4
- shadcn/ui components

**Backend**
- Next.js API Routes
- Google Gemini AI (chatbot & data)
- Appwrite (database & storage)
- Cheerio (web scraping)

**Deployment**
- Vercel (hosting & serverless)
- Appwrite Cloud (backend services)

---

## 📂 Project Structure

```
courseFinder/
├── app/                    # Next.js app directory (pages & API routes)
│   ├── api/                # API endpoints
│   ├── find-course/        # Course finder page
│   ├── bursaries/          # Bursaries page
│   └── ...
├── components/             # React components
│   ├── ui/                 # shadcn/ui components
│   ├── chatbot.tsx         # AI chatbot
│   └── ...
├── data/                   # Static data
│   ├── universities/       # 28 university data files
│   └── colleges.ts         # TVET colleges
├── lib/                    # Utilities & helpers
├── docs/                   # Documentation (this!)
└── __tests__/              # Test files
```

---

## 🧪 Development

### Available Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Run production build

# Testing
npm run test             # Run tests
npm run test:watch       # Watch mode
npm run test:coverage    # With coverage

# Code Quality
npm run lint             # Lint code
```

### Environment Variables

Required in `.env.local`:

```env
# Required
GOOGLE_API_KEY=your_google_ai_key

# Optional (for full features)
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
OCR_SPACE_API_KEY=your_ocr_key
```

---

## 🌐 Deployment

### Vercel (Recommended)

The application is deployed on Vercel:

**Production URL**: [https://vercel.com/matomejohn170-gmailcoms-projects/v0-matric-university-app](https://vercel.com/matomejohn170-gmailcoms-projects/v0-matric-university-app)

**Deploy Steps**:
1. Push to `main` branch
2. Vercel auto-deploys
3. Set environment variables in Vercel dashboard

See [SYSTEM_DOCUMENTATION.md - Deployment](./SYSTEM_DOCUMENTATION.md#deployment) for details.

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

**Before submitting**:
- Run tests: `npm run test`
- Lint code: `npm run lint`
- Update documentation if needed

---

## 📊 Key Statistics

- **28 Universities** - Complete coverage of SA public universities
- **2,500+ Courses** - Undergraduate programs across all fields
- **35+ Bursaries** - Updated daily
- **10 Years** - Past papers (2014-2024)
- **9 Provinces** - Statistics and pass rates

---

## 🎯 Roadmap

### Current Version (v0.1.0)

✅ Course finder with APS matching  
✅ 28 university database  
✅ AI chatbot assistant  
✅ Bursaries scraping  
✅ Past papers library  
✅ Statistics dashboard  

### Planned Features

- [ ] User authentication & profiles
- [ ] Saved favorite courses
- [ ] Application deadline reminders
- [ ] University comparison tool
- [ ] Career path recommendations
- [ ] Mobile application (Flutter)
- [ ] Admin CRM system

---

## 📞 Support

**Documentation**: See [DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)  
**Issues**: [GitHub Issues](https://github.com/itumeleng-itu/courseFinder/issues)  
**Contact**: Development Team

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **Department of Basic Education** - For official matric statistics
- **South African Universities** - For course information
- **Google** - For Gemini AI API
- **Appwrite** - For backend services
- **Vercel** - For hosting and deployment
- **shadcn/ui** - For beautiful UI components

---

## 📈 Project Status

**Status**: ✅ Production Ready  
**Version**: 0.1.0  
**Last Updated**: 2025-11-25  
**Maintained**: Active development

---

**Built with ❤️ for South African students**
