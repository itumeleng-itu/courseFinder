const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, "tut_prospectus.json");

app.use(express.json());
app.use((_, res, next) => { res.setHeader("Content-Type", "application/json"); next(); });

// ─── Load data ────────────────────────────────────────────────────────────────
function loadData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

// ─── TUT APS Calculation ──────────────────────────────────────────────────────
/**
 * TUT APS rules:
 * 1. Life Orientation is EXCLUDED entirely
 * 2. Achievement level 1 in any subject is EXCLUDED
 * 3. Sum the remaining subject levels
 */
function calculateAPS(subjects) {
  let total = 0;
  for (const [subject, level] of Object.entries(subjects)) {
    if (subject.toLowerCase().includes("life orientation")) continue;
    const lvl = parseInt(level);
    if (lvl <= 1) continue;
    total += lvl;
  }
  return total;
}

// ─── Flexible subject lookup ──────────────────────────────────────────────────
function findSubjectLevel(subjectsLower, searchName) {
  if (subjectsLower[searchName] !== undefined) return subjectsLower[searchName];
  for (const [key, val] of Object.entries(subjectsLower)) {
    if (key.includes(searchName) || searchName.includes(key)) return val;
  }
  return null;
}

// ─── TUT Eligibility Checker ──────────────────────────────────────────────────
function checkEligibility(programme, studentSubjects) {
  const subjectsLower = {};
  for (const [k, v] of Object.entries(studentSubjects)) {
    subjectsLower[k.toLowerCase()] = parseInt(v);
  }

  const issues = [];

  // 1) Check compulsory subjects
  for (const req of programme.admission_requirements.compulsory_subjects) {
    if (req.subject_group === "one of" || req.subject_group === "one of the combinations") {
      let groupMet = false;
      for (const option of req.subjects) {
        const lvl = findSubjectLevel(subjectsLower, option.subject.toLowerCase());
        if (lvl !== null && lvl >= option.min_level) { groupMet = true; break; }
      }
      if (!groupMet) {
        const opts = req.subjects.map(s => `${s.subject} (L${s.min_level}+)`).join(" OR ");
        issues.push(`Missing: ${opts}`);
      }
    } else if (req.subject) {
      const name = req.subject.toLowerCase();
      if (name.includes("two other") || name.includes("any")) continue;
      const lvl = findSubjectLevel(subjectsLower, name);
      if (lvl === null) {
        issues.push(`Missing compulsory: ${req.subject} (L${req.min_level}+)`);
      } else if (lvl < req.min_level) {
        issues.push(`${req.subject}: got L${lvl}, need L${req.min_level}+`);
      }
    }
  }

  // 2) Determine applicable APS threshold
  const studentAPS = calculateAPS(studentSubjects);
  let requiredAPS = programme.admission_requirements.min_aps;
  let appliedCondition = null;

  if (programme.admission_requirements.aps_conditions.length > 0) {
    const hasMathLit = findSubjectLevel(subjectsLower, "mathematical literacy") !== null;
    const hasAccounting = findSubjectLevel(subjectsLower, "accounting") !== null;

    for (const cond of programme.admission_requirements.aps_conditions) {
      const c = cond.condition.toLowerCase();
      if (hasMathLit && c.includes("mathematical literacy")) {
        requiredAPS = cond.min_aps; appliedCondition = cond.condition; break;
      }
      if (hasAccounting && c.includes("accounting") && !c.includes("mathematics")) {
        requiredAPS = cond.min_aps; appliedCondition = cond.condition; break;
      }
      if (!hasMathLit && c.includes("mathematics") && !c.includes("mathematical literacy")) {
        requiredAPS = cond.min_aps; appliedCondition = cond.condition; break;
      }
    }
  }

  // 3) Check APS
  if (studentAPS < requiredAPS) {
    issues.push(`APS: got ${studentAPS}, need ${requiredAPS}${appliedCondition ? " (" + appliedCondition + ")" : ""}`);
  }

  return {
    eligible: issues.length === 0,
    programme_id: programme.id,
    programme_name: programme.name,
    faculty: programme.faculty,
    qualification_type: programme.qualification_type,
    duration_years: programme.duration_years,
    main_campus: programme.main_campus,
    other_campuses: programme.other_campuses,
    application_deadline: programme.application_deadline,
    aps_achieved: studentAPS,
    aps_required: requiredAPS,
    aps_margin: studentAPS - requiredAPS,
    aps_condition_applied: appliedCondition,
    issues,
    careers: programme.careers,
    further_studies: programme.further_studies,
    special_requirements: programme.admission_requirements.special_requirements || null
  };
}

// ─── Routes ───────────────────────────────────────────────────────────────────

app.get("/", (_, res) => {
  res.json({
    name: "TUT Prospectus API",
    university: "Tshwane University of Technology",
    year: 2027,
    endpoints: {
      "POST /match": "Find all programmes a student qualifies for",
      "POST /aps":   "Calculate a student's TUT APS score with breakdown",
      "GET /programmes": "List/filter all programmes",
      "GET /programmes/:id": "Get a single programme by ID",
      "GET /faculties": "List faculties with programme counts"
    },
    aps_rules: {
      excluded: ["Life Orientation", "Any subject at achievement level 1"],
      bachelor_min: "At least 4 subjects at level 4",
      diploma_min:  "At least 4 subjects at level 3"
    }
  });
});

/**
 * POST /match
 * Body: { subjects: { "English": 4, "Mathematics": 5, ... }, faculty?, qualification_type? }
 */
app.post("/match", (req, res) => {
  const { subjects, faculty, qualification_type } = req.body;
  if (!subjects || typeof subjects !== "object" || !Object.keys(subjects).length) {
    return res.status(400).json({
      error: "Provide a 'subjects' object with subject names and levels (1-7).",
      example: {
        subjects: { "English": 4, "Mathematics": 5, "Physical Sciences": 5, "Life Sciences": 4, "History": 3, "Life Orientation": 6 },
        faculty: "ICT",
        qualification_type: "Diploma"
      }
    });
  }

  let { programmes } = loadData();
  if (faculty) programmes = programmes.filter(p => p.faculty.toLowerCase().includes(faculty.toLowerCase()));
  if (qualification_type) programmes = programmes.filter(p => p.qualification_type.toLowerCase().includes(qualification_type.toLowerCase()));

  const results = programmes.map(p => checkEligibility(p, subjects));
  const eligible   = results.filter(r => r.eligible).sort((a, b) => b.aps_margin - a.aps_margin);
  const ineligible = results.filter(r => !r.eligible).sort((a, b) => b.aps_margin - a.aps_margin);

  res.json({
    student_aps: calculateAPS(subjects),
    subjects_submitted: subjects,
    summary: {
      total_checked: results.length,
      eligible_count: eligible.length,
      ineligible_count: ineligible.length
    },
    eligible_programmes: eligible,
    ineligible_programmes: ineligible
  });
});

/**
 * POST /aps
 * Body: { subjects: { "English": 4, ... } }
 */
app.post("/aps", (req, res) => {
  const { subjects } = req.body;
  if (!subjects) return res.status(400).json({ error: "'subjects' object required" });

  const breakdown = {};
  let total = 0;
  for (const [subject, level] of Object.entries(subjects)) {
    const lvl = parseInt(level);
    const isLO = subject.toLowerCase().includes("life orientation");
    const excluded = isLO || lvl <= 1;
    const contribution = excluded ? 0 : lvl;
    total += contribution;
    breakdown[subject] = {
      level: lvl,
      counted: !excluded,
      reason: isLO ? "Life Orientation excluded by TUT policy" : lvl <= 1 ? "Level 1 excluded by TUT policy" : null,
      contribution
    };
  }
  res.json({ aps_score: total, breakdown });
});

/**
 * GET /programmes
 * Query: faculty, qualification_type, min_aps, campus, search
 */
app.get("/programmes", (req, res) => {
  const { faculty, qualification_type, min_aps, campus, search } = req.query;
  let { programmes } = loadData();

  if (faculty) programmes = programmes.filter(p => p.faculty.toLowerCase().includes(faculty.toLowerCase()));
  if (qualification_type) programmes = programmes.filter(p => p.qualification_type.toLowerCase().includes(qualification_type.toLowerCase()));
  if (min_aps) programmes = programmes.filter(p => p.admission_requirements.min_aps <= parseInt(min_aps));
  if (campus) programmes = programmes.filter(p =>
    p.main_campus.toLowerCase().includes(campus.toLowerCase()) ||
    p.other_campuses.some(c => c.toLowerCase().includes(campus.toLowerCase()))
  );
  if (search) {
    const t = search.toLowerCase();
    programmes = programmes.filter(p =>
      p.name.toLowerCase().includes(t) ||
      p.faculty.toLowerCase().includes(t) ||
      p.careers.some(c => c.toLowerCase().includes(t))
    );
  }

  res.json({ total: programmes.length, programmes });
});

/** GET /programmes/:id */
app.get("/programmes/:id", (req, res) => {
  const { programmes } = loadData();
  const prog = programmes.find(p => p.id === req.params.id);
  if (!prog) return res.status(404).json({ error: `Programme '${req.params.id}' not found.` });
  res.json(prog);
});

/** GET /faculties */
app.get("/faculties", (_, res) => {
  const { programmes } = loadData();
  const map = {};
  for (const p of programmes) {
    if (!map[p.faculty]) map[p.faculty] = { faculty: p.faculty, programme_count: 0, programmes: [] };
    map[p.faculty].programme_count++;
    map[p.faculty].programmes.push({ id: p.id, name: p.name, qualification_type: p.qualification_type, min_aps: p.admission_requirements.min_aps });
  }
  res.json(Object.values(map).sort((a, b) => b.programme_count - a.programme_count));
});

app.use((req, res) => res.status(404).json({ error: `Route '${req.path}' not found.` }));

app.listen(PORT, () => {
  console.log(`\n🎓 TUT Prospectus API on port ${PORT} — http://localhost:${PORT}\n`);
});

module.exports = app;
