# Course Matching System - Test Scenarios

## Purpose
Comprehensive test scenarios to verify perfect accuracy of APS calculations, subject matching, extended programs, and special requirements detection.

## Test Scenario 1: High Achiever - Engineering Focus

### Student Profile
```javascript
{
  subjects: [
    { name: "Mathematics", percentage: 85 },           // Level 7
    { name: "Physical Sciences", percentage: 82 },    // Level 7
    { name: "English Home Language", percentage: 78 }, // Level 6
    { name: "Life Sciences", percentage: 75 },        // Level 6
    { name: "Geography", percentage: 72 },            // Level 6
    { name: "Afrikaans FAL", percentage: 68 },        // Level 5
    { name: "Life Orientation", percentage: 80 }      // Excluded from APS
  ]
}
```

### Expected Results
- **Standard APS**: 7 + 7 + 6 + 6 + 6 + 5 = **37 points**
- **Wits APS**: (7+2) + (7+2) + 6 + 6 + 6 + 5 = **41 points** (bonuses for English & Maths)

### Should Qualify For:
- ✅ BSc Engineering at most universities (typically APS 35-38)
- ✅ BSc (General) programs
- ✅ Engineering programs at UP, Wits, UCT, Stellenbosch
- ❌ Medicine programs (typically require APS 42-45+)

### Subject Matching Verification:
- "Mathematics" should match "Maths", "Pure Mathematics"
- "Physical Sciences" should match "Physics"
- "English Home Language" should satisfy generic "English" requirements

---

## Test Scenario 2: Borderline Science Student

### Student Profile
```javascript
{
  subjects: [
    { name: "Mathematics", percentage: 62 },          // Level 5
    { name: "Physical Sciences", percentage: 59 },   // Level 4
    { name: "English FAL", percentage: 70 },         // Level 6
    { name: "Life Sciences", percentage: 65 },       // Level 5
    { name: "History", percentage: 68 },             // Level 5
    { name: "IsiZulu HL", percentage: 75 },          // Level 6
    { name: "Life Orientation", percentage: 65 }     // Excluded
  ]
}
```

### Expected Results
- **Standard APS**: 5 + 4 + 6 + 5 + 5 + 6 = **31 points**

### Should Qualify For:
- ✅ **Extended Curriculum Programmes** in Science/Engineering (typically APS 28-32)
- ✅ BSc programs at universities with lower APS requirements
- ✅ Diploma programmes in Science fields
- ❌ Standard BSc Engineering (too low APS + Physics Level 4 vs required Level 5)

### Extended Programs Expected:
- WSU Extended Science programs (should appear)
- SMU BSc-ECP (should appear if APS matches)
- Other universities' foundation programs

### Language Level Verification:
- "English FAL" Level 6 should satisfy "English FAL Level 5" requirements
- "English FAL" should NOT satisfy "English HL Level 5" requirements
- "IsiZulu HL" should satisfy generic "IsiZulu" requirements

---

## Test Scenario 3: Commerce Student with Math Literacy

### Student Profile
```javascript
{
  subjects: [
    { name: "Mathematical Literacy", percentage: 78 }, // Level 6
    { name: "Accounting", percentage: 80 },          // Level 7  
    { name: "Business Studies", percentage: 75 },    // Level 6
    { name: "Economics", percentage: 72 },           // Level 6
    { name: "English HL", percentage: 70 },          // Level 6
    { name: "Afrikaans HL", percentage: 68 },        // Level 5
    { name: "Life Orientation", percentage: 70 }     // Excluded
  ]
}
```

### Expected Results
- **Standard APS**: 6 + 7 + 6 + 6 + 6 + 5 = **36 points**

### Should Qualify For:
- ✅ BCom programs that accept Math Literacy
- ✅ BA in Economic and Management Sciences
- ✅ National Diplomas in Business/Commerce
- ❌ BCom Accounting (most require Mathematics, not Math Lit)
- ❌ BCom Economics (most require Mathematics, not Math Lit)

### OR Requirements Verification:
- Courses with "Mathematics Level 4 OR Mathematical Literacy Level 6" should match
- "Mathematical Literacy" should be treated as distinct from "Mathematics"
- Should not see Engineering programs (require Mathematics)

---

## Test Scenario 4: Arts & Humanities Student

### Student Profile
```javascript
{
  subjects: [
    { name: "English HL", percentage: 82 },          // Level 7
    { name: "History", percentage: 78 },             // Level 6
    { name: "Geography", percentage: 75 },           // Level 6
    { name: "Life Sciences", percentage: 70 },       // Level 6
    { name: "Afrikaans HL", percentage: 72 },        // Level 6
    { name: "Mathematical Literacy", percentage: 65 }, // Level 5
    { name: "Life Orientation", percentage: 75 }     // Excluded
  ]
}
```

### Expected Results
- **Standard APS**: 7 + 6 + 6 + 6 + 6 + 5 = **36 points**

### Should Qualify For:
- ✅ BA (Humanities) programs
- ✅ BA (Social Sciences)
- ✅ BSocSci programs
- ✅ Teaching degrees (Foundation/Intermediate Phase)
- ❌ BSc programs (no Mathematics/Physical Sciences)
- ❌ Engineering programs

---

## Test Scenario 5: Creative Arts with Special Requirements

### Student Profile
```javascript
{
  subjects: [
    { name: "Visual Arts", percentage: 85 },         // Level 7
    { name: "English HL", percentage: 75 },          // Level 6
    { name: "History", percentage: 70 },             // Level 6
    { name: "Mathematical Literacy", percentage: 68 }, // Level 5
    { name: "Life Sciences", percentage: 65 },       // Level 5
    { name: "Afrikaans FAL", percentage: 72 },       // Level 6
    { name: "Life Orientation", percentage: 80 }     // Excluded
  ]
}
```

### Expected Results
- **Standard APS**: 7 + 6 + 6 + 5 + 5 + 6 = **35 points**

### Special Requirements Expected:
- 🎨 **Portfolio Required** badges for:
  - BA Fine Arts
  - Design programs
  - Architecture (though APS may be too low)
  
- 🎵 **Audition Required** badges for:
  - Music programs
  - Drama/Theatre programs

- 📝 **Interview Required** badges for:
  - Some Arts programs

### Verification:
- Special requirement badges should appear on qualifying courses
- Portfolio courses should show purple badge: "Portfolio Required"
- Audition courses should show purple badge: "Audition Required"

---

## Test Scenario 6: Health Sciences with NBT Requirements

### Student Profile
```javascript
{
  subjects: [
    { name: "Life Sciences", percentage: 80 },       // Level 7
    { name: "Physical Sciences", percentage: 75 },   // Level 6
    { name: "Mathematics", percentage: 78 },         // Level 6
    { name: "English HL", percentage: 76 },          // Level 6
    { name: "Geography", percentage: 70 },           // Level 6
    { name: "Afrikaans FAL", percentage: 68 },       // Level 5
    { name: "Life Orientation", percentage: 82 }     // Excluded
  ]
}
```

### Expected Results
- **Standard APS**: 7 + 6 + 6 + 6 + 6 + 5 = **36 points**
- **Wits APS**: 7 + 6 + (6+2) + (6+2) + 6 + 5 = **40 points**

### Should Qualify For:
- ✅ BSc Health Sciences
- ✅ Some Nursing programs
- ✅ Biomedical Sciences
- ❌ Medicine/Dentistry (APS too low, typically need 42-45+)

### Special Requirements Expected:
- 📊 **NBT Required** badges for:
  - UCT Health Sciences programs
  - Wits Health Sciences programs
  - Most university Health Sciences programs

### Verification:
- NBT badge should appear on UCT/Wits health programs
- May also see job shadowing requirements for some programs

---

## Automated Verification Checklist

### APS Calculation Tests
- [ ] Standard APS correctly sums best 6 subjects (excluding LO)
- [ ] Wits APS adds +2 for English and +2 for Mathematics
- [ ] Wits Life Orientation uses 4-point scale (vs excluded)
- [ ] All 28 universities have working `calculateApsScore()` methods
- [ ] APS never includes more than 6 subjects

### Subject Matching Tests
- [ ] "Mathematics" matches "Maths", "Pure Mathematics"
- [ ] "Physical Sciences" matches "Physics"
- [ ] "Life Sciences" matches "Biology"
- [ ] "Mathematics" does NOT match "Mathematical Literacy"
- [ ] "Technical Mathematics" is treated as distinct subject
- [ ] English HL matches "English" (generic)
- [ ] English FAL does NOT match "English HL" (specific)
- [ ] IsiZulu HL matches "IsiZulu" (generic)

### Extended Programs Tests
- [ ] WSU extended programs detected (17 programs)
- [ ] SMU extended programs detected (2 programs)
- [ ] NMU extended programs detected (1 program)
- [ ] Extended programs appear in separate amber card
- [ ] Extended programs show lower APS requirements
- [ ] Foundation year descriptions display correctly

### Special Requirements Tests
- [ ] NBT requirements detected in UCT courses
- [ ] Portfolio requirements detected in Arts courses
- [ ] Audition requirements detected in Music/Drama courses
- [ ] Interview requirements detected correctly
- [ ] Special requirement badges appear in purple
- [ ] Multiple special requirements show multiple badges

### UI/UX Tests
- [ ] Qualifying courses show green checkmark
- [ ] Partial matches show amber alert icon
- [ ] Extended programs section has amber styling
- [ ] Special requirement badges are readable
- [ ] APS score displays prominently
- [ ] Duration information shows correctly
- [ ] Career paths display when available

---

## Manual Browser Testing Checklist

### Basic Flow
1. [ ] Open `/find-course` page
2. [ ] Add 7 subjects with percentages
3. [ ] Click "Calculate APS & Find Courses"
4. [ ] Verify APS calculation is correct
5. [ ] Verify courses appear
6. [ ] Verify subject requirements logic

### Search & Filter
1. [ ] Search for specific course names
2. [ ] Toggle "Fully Qualified Only" filter
3. [ ] Verify filtering works correctly
4. [ ] Search for university names
5. [ ] Search for faculty names

### Edge Cases
1. [ ] Try with exactly 7 subjects
2. [ ] Try with 8 subjects (Life Orientation + 7 others)
3. [ ] Try with very high marks (all 90%+)
4. [ ] Try with borderline marks (all 50-60%)
5. [ ] Try with Math Literacy instead of Mathematics
6. [ ] Try with  only English FAL (no HL)

---

## Expected Outcomes Summary

### All Test Scenarios Should:
- ✅ Calculate correct APS scores
- ✅ Match subjects accurately using aliases
- ✅ Respect language level requirements (HL vs FAL)
- ✅ Show extended programs when applicable
- ✅ Display special requirement badges
- ✅ Handle OR requirements correctly (Math OR Math Lit)
- ✅ Build without errors
- ✅ Load without console errors
- ✅ Provide clear feedback to students

### Zero Tolerance For:
- ❌ False positives (showing courses student doesn't qualify for)
- ❌ False negatives (hiding courses student DOES qualify for)
- ❌ Incorrect APS calculations
- ❌ Missing extended programs
- ❌ Missing special requirements
- ❌ Subject matching errors
