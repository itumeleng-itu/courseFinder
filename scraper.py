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