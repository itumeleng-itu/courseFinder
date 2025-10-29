import requests
from bs4 import BeautifulSoup
import json
import re
from urllib.parse import urljoin
import time

class NSCMetadataScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        
        self.exam_periods = {
            '2025_may_june': {
                'url': 'https://www.education.gov.za/Curriculum/NationalSeniorCertificate(NSC)Examinations/NSCPastExaminationpapers/2025MayJuneNSCSCExaminationPapers.aspx',
                'year': 2025,
                'period': 'May/June'
            },
            '2024_november': {
                'url': 'https://www.education.gov.za/Curriculum/NationalSeniorCertificate(NSC)Examinations/NSCPastExaminationpapers/2024NovemberNSCExaminationPapers.aspx',
                'year': 2024,
                'period': 'November'
            },
            '2024_may_june': {
                'url': 'https://www.education.gov.za/Curriculum/NationalSeniorCertificate(NSC)Examinations/NSCPastExaminationpapers/2024MayJuneNSCSCExamPapers.aspx',
                'year': 2024,
                'period': 'May/June'
            },
            '2023_november': {
                'url': 'https://www.education.gov.za/Curriculum/NationalSeniorCertificate(NSC)Examinations/NSCPastExaminationpapers/2023NSCNovemberExampapers.aspx',
                'year': 2023,
                'period': 'November'
            },
            '2023_may_june': {
                'url': 'https://www.education.gov.za/Curriculum/NationalSeniorCertificate(NSC)Examinations/NSCPastExaminationpapers/2023MayJuneNSCSCExamPapers.aspx',
                'year': 2023,
                'period': 'May/June'
            },
            '2022_november': {
                'url': 'https://www.education.gov.za/Curriculum/NationalSeniorCertificate(NSC)Examinations/NSCPastExaminationpapers/2022NSCNovemberExaminationPapers.aspx',
                'year': 2022,
                'period': 'November'
            },
            '2022_may_june': {
                'url': 'https://www.education.gov.za/Curriculum/NationalSeniorCertificate(NSC)Examinations/NSCPastExaminationpapers/2022MayJuneNSCSCExamPapers.aspx',
                'year': 2022,
                'period': 'May/June'
            },
            '2021_november': {
                'url': 'https://www.education.gov.za/Curriculum/NationalSeniorCertificate(NSC)Examinations/NSCPastExaminationpapers/2021NSCNovemberExaminationPapers.aspx',
                'year': 2021,
                'period': 'November'
            },
            '2021_may_june': {
                'url': 'https://www.education.gov.za/Curriculum/NationalSeniorCertificate(NSC)Examinations/NSCPastExaminationpapers/2021NSCSCMayJuneExaminations.aspx',
                'year': 2021,
                'period': 'May/June'
            },
            '2020_november': {
                'url': 'https://www.education.gov.za/Curriculum/NationalSeniorCertificate(NSC)Examinations/NSCPastExaminationpapers/2020NSCandSCExamPapers(November).aspx',
                'year': 2020,
                'period': 'November'
            },
        }
    
    def classify_paper(self, filename):
        """Extract metadata from filename"""
        filename_lower = filename.lower()
        
        # Determine paper type
        paper_type = 'unknown'
        if 'memo' in filename_lower or 'marking' in filename_lower:
            paper_type = 'memo'
        elif 'p1' in filename_lower or 'paper 1' in filename_lower or 'paper1' in filename_lower:
            paper_type = 'paper1'
        elif 'p2' in filename_lower or 'paper 2' in filename_lower or 'paper2' in filename_lower:
            paper_type = 'paper2'
        elif 'p3' in filename_lower or 'paper 3' in filename_lower or 'paper3' in filename_lower:
            paper_type = 'paper3'
        
        # Determine subject
        subjects = {
            'Mathematics': ['math', 'wiskunde'],
            'Physical Sciences': ['physical', 'fisiese wetenskappe'],
            'Life Sciences': ['life', 'lewenswetenskappe'],
            'Accounting': ['accounting', 'rekeningkunde'],
            'Economics': ['economics', 'ekonomie'],
            'Business Studies': ['business'],
            'Geography': ['geography', 'geografie'],
            'History': ['history', 'geskiedenis'],
            'English Home Language': ['english hl', 'english home'],
            'English First Additional Language': ['english fal', 'english first'],
            'Afrikaans Home Language': ['afrikaans hl', 'afrikaans huistaal'],
            'Afrikaans First Additional Language': ['afrikaans eat', 'afrikaans fal'],
            'Information Technology': ['information technology', 'it'],
            'Computer Applications Technology': ['cat', 'computer applications'],
            'Agricultural Sciences': ['agricultural', 'landbou'],
            'Tourism': ['tourism', 'toerisme'],
            'Visual Arts': ['visual arts', 'visuele kunste'],
            'Dramatic Arts': ['dramatic', 'dramatiese'],
            'Music': ['music', 'musiek'],
            'Design': ['design', 'ontwerp'],
            'Civil Technology': ['civil'],
            'Electrical Technology': ['electrical', 'elektries'],
            'Mechanical Technology': ['mechanical', 'meganiese'],
            'Engineering Graphics': ['engineering graphics', 'egdt'],
        }
        
        subject = 'Other'
        for subj, keywords in subjects.items():
            if any(keyword in filename_lower for keyword in keywords):
                subject = subj
                break
        
        # Determine language
        language = 'English'
        if any(word in filename_lower for word in ['afr', 'afrikaans', 'huistaal', 'eat']):
            language = 'Afrikaans'
        
        # Determine grade
        grade = 12  # Default to Grade 12
        if 'grade 11' in filename_lower or 'gr11' in filename_lower or 'g11' in filename_lower:
            grade = 11
        elif 'grade 10' in filename_lower or 'gr10' in filename_lower or 'g10' in filename_lower:
            grade = 10
        
        return {
            'subject': subject,
            'paper_type': paper_type,
            'language': language,
            'grade': grade
        }
    
    def fetch_page(self, url):
        """Fetch webpage"""
        try:
            print(f"Fetching: {url}")
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            return response
        except Exception as e:
            print(f"Error: {e}")
            return None
    
    def scrape_period(self, period_key):
        """Scrape all papers from a specific period"""
        period_info = self.exam_periods[period_key]
        url = period_info['url']
        
        print(f"\nScraping: {period_info['year']} {period_info['period']}")
        
        response = self.fetch_page(url)
        if not response:
            return []
        
        soup = BeautifulSoup(response.text, 'html.parser')
        papers = []
        
        for link in soup.find_all('a', href=True):
            href = link['href']
            
            if href.lower().endswith('.pdf'):
                full_url = urljoin(url, href)
                filename = link.get_text(strip=True) or href.split('/')[-1]
                
                metadata = self.classify_paper(filename)
                
                paper = {
                    'id': f"{period_key}_{len(papers)}",
                    'filename': filename,
                    'url': full_url,
                    'year': period_info['year'],
                    'period': period_info['period'],
                    **metadata
                }
                
                papers.append(paper)
                print(f"  Found: {filename}")
        
        print(f"Total papers found: {len(papers)}")
        return papers
    
    def scrape_all(self, output_file='papers_database.json'):
        """Scrape all periods and save to JSON"""
        all_papers = []
        
        for period_key in self.exam_periods.keys():
            papers = self.scrape_period(period_key)
            all_papers.extend(papers)
            time.sleep(2)  # Be respectful
        
        # Save to JSON
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(all_papers, f, indent=2, ensure_ascii=False)
        
        print(f"\n{'='*60}")
        print(f"Scraping complete!")
        print(f"Total papers: {len(all_papers)}")
        print(f"Saved to: {output_file}")
        print(f"{'='*60}")
        
        # Print summary
        subjects = set(p['subject'] for p in all_papers)
        years = set(p['year'] for p in all_papers)
        print(f"\nSubjects found: {len(subjects)}")
        print(f"Years: {sorted(years)}")
        
        return all_papers


if __name__ == "__main__":
    scraper = NSCMetadataScraper()
    scraper.scrape_all('papers_database.json')




    // app/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { Search, Download, FileText, Filter, X } from 'lucide-react';

// This would be imported from your JSON file in production
// Place papers_database.json in /public folder and fetch it
interface Paper {
  id: string;
  filename: string;
  url: string;
  year: number;
  period: string;
  subject: string;
  paper_type: string;
  language: string;
  grade: number;
}

export default function NSCPapersBrowser() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedPaperType, setSelectedPaperType] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('12');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load papers on mount
  useState(() => {
    fetch('/papers_database.json')
      .then(res => res.json())
      .then(data => {
        setPapers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading papers:', err);
        setLoading(false);
      });
  });

  // Extract unique values for filters
  const years = useMemo(() => 
    Array.from(new Set(papers.map(p => p.year))).sort((a, b) => b - a),
    [papers]
  );

  const subjects = useMemo(() => 
    Array.from(new Set(papers.map(p => p.subject))).sort(),
    [papers]
  );

  const paperTypes = useMemo(() => 
    Array.from(new Set(papers.map(p => p.paper_type))).sort(),
    [papers]
  );

  // Filter papers
  const filteredPapers = useMemo(() => {
    return papers.filter(paper => {
      const matchesSearch = paper.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          paper.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesYear = selectedYear === 'all' || paper.year.toString() === selectedYear;
      const matchesSubject = selectedSubject === 'all' || paper.subject === selectedSubject;
      const matchesPaperType = selectedPaperType === 'all' || paper.paper_type === selectedPaperType;
      const matchesGrade = paper.grade.toString() === selectedGrade;

      return matchesSearch && matchesYear && matchesSubject && matchesPaperType && matchesGrade;
    });
  }, [papers, searchQuery, selectedYear, selectedSubject, selectedPaperType, selectedGrade]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedYear('all');
    setSelectedSubject('all');
    setSelectedPaperType('all');
  };

  const handleDownload = (paper: Paper) => {
    window.open(paper.url, '_blank');
  };

  const handlePreview = (paper: Paper) => {
    setPreviewUrl(paper.url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading exam papers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">NSC Exam Papers</h1>
          <p className="mt-2 text-gray-600">Browse and download past examination papers</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by subject or filename..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Grade Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Subject Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            {/* Paper Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={selectedPaperType}
                onChange={(e) => setSelectedPaperType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Types</option>
                <option value="paper1">Paper 1</option>
                <option value="paper2">Paper 2</option>
                <option value="paper3">Paper 3</option>
                <option value="memo">Memorandum</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition flex items-center justify-center gap-2"
              >
                <X className="h-4 w-4" />
                Clear
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredPapers.length} of {papers.length} papers
          </div>
        </div>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPapers.map(paper => (
            <div
              key={paper.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <FileText className="h-8 w-8 text-indigo-600" />
                <span className="text-xs font-semibold px-2 py-1 bg-indigo-100 text-indigo-800 rounded">
                  {paper.year}
                </span>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {paper.subject}
              </h3>

              <div className="space-y-1 text-sm text-gray-600 mb-4">
                <p>Grade {paper.grade} • {paper.period}</p>
                <p className="capitalize">{paper.paper_type.replace('_', ' ')}</p>
                <p className="text-xs text-gray-500 line-clamp-1">{paper.filename}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handlePreview(paper)}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition text-sm font-medium"
                >
                  Preview
                </button>
                <button
                  onClick={() => handleDownload(paper)}
                  className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPapers.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No papers found</h3>
            <p className="text-gray-600">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      {/* PDF Preview Modal */}
      {previewUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Preview</h3>
              <button
                onClick={() => setPreviewUrl(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe
                src={`${previewUrl}#view=FitH`}
                className="w-full h-full"
                title="PDF Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


# NSC Exam Papers Website - Setup Guide

## 📋 Overview
This solution creates a Next.js website where users can browse, search, filter, and download NSC exam papers directly from the DBE website without you having to store the PDFs.

## 🎯 How It Works
1. **Python script** scrapes metadata (links, subjects, years) from DBE website
2. **JSON database** stores all paper information (but NOT the PDFs)
3. **Next.js website** provides beautiful interface for browsing
4. **Users download directly** from DBE URLs when they click download

## 🚀 Setup Instructions

### Step 1: Scrape Paper Metadata

1. **Save the Python scraper** as `scraper.py`

2. **Install dependencies:**
```bash
pip install requests beautifulsoup4
```

3. **Run the scraper:**
```bash
python scraper.py
```

This creates `papers_database.json` with all paper metadata (~100KB file, not the actual PDFs!)

### Step 2: Create Next.js Project

1. **Create new Next.js app:**
```bash
npx create-next-app@latest nsc-papers-site
# Choose: TypeScript: Yes, Tailwind: Yes, App Router: Yes
cd nsc-papers-site
```

2. **Install icons library:**
```bash
npm install lucide-react
```

3. **Copy the papers database:**
```bash
# Place papers_database.json in the public folder
cp papers_database.json public/
```

4. **Replace app/page.tsx** with the code from the artifact

### Step 3: Deploy to Static Hosting

**Option A: Vercel (Recommended)**
```bash
npm install -g vercel
vercel
```

**Option B: Netlify**
```bash
npm run build
# Upload the 'out' folder to Netlify
```

**Option C: GitHub Pages**
```bash
# Add to next.config.js:
module.exports = {
  output: 'export',
  images: { unoptimized: true }
}

npm run build
# Deploy 'out' folder to GitHub Pages
```

## ✨ Features

### 1. **Smart Filtering**
- Filter by Grade (10, 11, 12)
- Filter by Year (2014-2025)
- Filter by Subject (Mathematics, Sciences, etc.)
- Filter by Paper Type (P1, P2, Memo)

### 2. **Search Functionality**
- Search by subject name
- Search by filename
- Real-time results

### 3. **PDF Preview**
- Click "Preview" to view papers in-browser
- Modal popup with embedded PDF viewer
- No download required to preview

### 4. **Direct Downloads**
- Downloads come directly from DBE website
- No storage costs for you
- Always up-to-date papers

## 🔄 Updating the Database

When new exam papers are released:

```bash
# Re-run the scraper
python scraper.py

# Replace the JSON file
cp papers_database.json public/

# Redeploy
vercel --prod  # or your deployment method
```

## 📊 Database Structure

```json
{
  "id": "2024_november_0",
  "filename": "Mathematics P1 Nov 2024",
  "url": "https://www.education.gov.za/Portals/0/CD/2024%20November%20past%20papers/Mathematics%20P1%20Nov%202024%20Eng.pdf?ver=2025-03-04-110202-327",
  "year": 2024,
  "period": "November",
  "subject": "Mathematics",
  "paper_type": "paper1",
  "language": "English",
  "grade": 12
}
```

## 🎨 Customization

### Change Colors
Edit the Tailwind classes in `page.tsx`:
- Primary color: Change `indigo-600` to your color
- Background: Change `from-blue-50 to-indigo-100`

### Add More Filters
Add filters for language, period, etc. in the filter section

### Custom Branding
Update the header section with your logo and branding

## 📱 Mobile Responsive
The site automatically adapts to:
- Desktop (3 columns)
- Tablet (2 columns)
- Mobile (1 column)

## ⚡ Performance
- JSON file: ~100-200KB (fast loading)
- No PDF storage (saves hosting costs)
- Static site (blazing fast)
- CDN compatible

## 🔒 Legal Notes
- Papers download directly from DBE (official source)
- You're providing a directory service, not hosting copyrighted material
- Always attribute to Department of Basic Education

## 🐛 Troubleshooting

**PDFs not loading?**
- Check DBE website is accessible
- Verify URLs in JSON are correct

**Filters not working?**
- Check JSON file is in `/public` folder
- Verify fetch path in code

**Preview not working?**
- Some browsers block iframe PDFs
- Provide download as fallback



## 💡 Tips
1. **Update regularly** - Run scraper monthly for new papers
2. **Monitor DBE website** - They may change structure
3. **Add analytics** - Track popular subjects/papers
4. **SEO optimize** - Add meta tags for each subject
5. **Cache JSON** - Use CDN for faster loads

