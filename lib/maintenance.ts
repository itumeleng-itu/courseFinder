/**
 * Whether the course listings are flagged as under maintenance.
 *
 * OFF by default. The notice went up while the dataset was being rebuilt from
 * the university prospectuses; it came down once every bundled programme
 * carried confidence: "verified" and a source document -- Wits and TUT through
 * the extract/verify loop, UJ hand-checked against its prospectus. Leaving it
 * up past that point told learners their results might be incomplete when they
 * were not, which is its own kind of wrong.
 *
 * Set NEXT_PUBLIC_COURSE_DATA_MAINTENANCE=on (and rebuild -- NEXT_PUBLIC_
 * values are inlined at build time) to raise it again while a new institution
 * is mid-import and the data in front of learners is genuinely in flux.
 */
export const COURSE_DATA_MAINTENANCE: boolean =
  process.env.NEXT_PUBLIC_COURSE_DATA_MAINTENANCE === "on"
