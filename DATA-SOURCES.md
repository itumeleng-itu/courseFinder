# South African Provincial Matric Pass Rates - Data Sources for Auto-Updates

## Primary Official Sources

### 1. **Department of Basic Education (DBE) - Official Website**
- **Main Site:** https://www.education.gov.za/
- **Exam Results Page:** https://www.education.gov.za/MatricResults/ExamResults.aspx
- **NSC Results Page:** https://www.education.gov.za/Curriculum/NationalSeniorCertificate(NSC)Examinations/ReleaseofNSCExamsResults.aspx
- **Release Schedule:** Results announced mid-January annually (usually 13th, available 14th)
- **Contains:** National pass rates, provincial breakdowns, distinction rates
- **Update Frequency:** Annual (January)

### 2. **South African Government Portal**
- **URL:** https://www.gov.za/services/services-residents/education-and-training/basic-education/check-matric-results
- **Contains:** Official results and statistics
- **Contact:** Call Centre: 0800 202 933 | callcentre@dbe.gov.za

### 3. **DBE Press Releases & Media Statements**
- **URL:** https://www.education.gov.za/ (News/Media section)
- **Contains:** Detailed provincial statistics, year-on-year comparisons, Minister's announcements
- **Best for:** Comprehensive breakdown with context

---

## Provincial Education Departments

### 4. **Gauteng Department of Education**
- **Results Portal:** https://results.gauteng.gov.za/
- **Contains:** Provincial-specific data and analysis

### 5. **Eastern Cape Department of Education**
- **URL:** https://eceducation.gov.za/learners/matric-results
- **Contains:** Provincial results and statistics

### 6. **Western Cape Education Department**
- **URL:** Check via https://wcedonline.westerncape.gov.za/
- **Contains:** Provincial data, often with additional analysis

### 7. **Other Provincial Departments**
- Each province has its own education department website
- Search pattern: "[Province name] Department of Education matric results"

---

## Secondary Reliable Sources

### 8. **South African Government News Agency (SANEWS)**
- **URL:** https://www.sanews.gov.za/
- **Search:** "matric results" + year
- **Contains:** Official government announcements and provincial data

### 9. **Parliamentary Monitoring Group (PMG)**
- **URL:** https://pmg.org.za/
- **Search:** "DBE matric results" or "Basic Education briefing"
- **Contains:** Detailed briefings with provincial performance insights and trends

### 10. **News24 Education Desk**
- **URL:** https://www.news24.com/news24/southafrica/news/education
- **Matric Results Page:** https://www.news24.com/tags/topics/matric-results
- **Contains:** Provincial rankings, historical comparisons, analysis
- **Reliability:** High - aggregates official DBE data

### 11. **eNCA Education Coverage**
- **URL:** https://www.enca.com/ (search "matric results")
- **Contains:** Live announcement coverage, provincial breakdowns

### 12. **Bizcommunity Education Section**
- **URL:** https://www.bizcommunity.com/ (search "matric results")
- **Contains:** Official announcements and analysis

---

## API & Data Scraping Recommendations

### For Automated Updates:

1. **Primary Scrape Target:** DBE official website (education.gov.za)
   - Scrape the NSC results announcement page annually in January
   - Look for press releases with provincial statistics

2. **Backup Sources:** 
   - SANEWS (structured government announcements)
   - News24 matric results page (reliable aggregation)

3. **Scraping Schedule:**
   - **Annual:** Mid-January (13-14th)
   - **Verification:** Cross-check at least 2 sources

4. **Data Points to Extract:**
   - National pass rate
   - Provincial pass rates (all 9 provinces)
   - Year
   - Bachelor pass rates (optional)
   - Distinction rates (optional)

### API Options:
- **No official DBE API exists** - scraping HTML/PDF is required
- Consider using web scraping libraries (BeautifulSoup, Puppeteer, etc.)
- Monitor RSS feeds if available

---

## Key Contact Information

- **DBE Call Centre:** 0800 202 933
- **DBE Email:** info@dbe.gov.za or callcentre@dbe.gov.za
- **DBE Twitter/X:** @DBE_SA
- **Physical Address:** 222 Struben Street, Pretoria

---

## Important Notes

- Results are typically announced by the Minister on **13 January** each year
- Individual results available **14 January** from 06:00
- All 9 provinces release simultaneously
- Provincial statistics included in Minister's announcement
- Official press releases contain complete provincial breakdown
- Data is stable after initial release (rarely revised)

---

## Automation Checklist

- [ ] Set annual scraper to run mid-January (13-15th)
- [ ] Scrape DBE press release page
- [ ] Extract national + 9 provincial pass rates
- [ ] Cross-verify with at least 2 sources (News24 or SANEWS)
- [ ] Update database/JSON file
- [ ] Log source URLs and timestamp
- [ ] Send alert if data variance > 1% from previous scrape
