import type { University, Course } from "./base-university";
import { BaseUniversity } from "./base-university";

/**
 * This app no longer carries per-institution course data of its own --
 * admission eligibility is coursefind-data's job (see
 * hooks/use-course-matcher.ts and lib/qualify-api.ts). The 26
 * per-university classes that used to live in this directory (uj.ts,
 * wits.ts, ...) have been deleted outright, not just stopped being read:
 * an unverified local copy sitting next to the real backend was the
 * thing this migration was for. As each institution is verified and
 * onboarded to coursefind-data, it becomes visible through
 * /v1/meta -- nothing in this file needs to change for that to happen.
 *
 * getAllUniversityInstances() / getAllUniversities() intentionally
 * return an empty list, not a hardcoded stand-in -- every caller
 * (app/universities/page.tsx, the AI chat assistant, the extended-
 * curriculum/TVET matcher) already handles an empty list without
 * crashing, since none of them can assume a fixed institution set going
 * forward.
 */

const instances: BaseUniversity[] = [];

export const universities: University[] = [];

export function getAllUniversities(): University[] {
  return universities;
}

/**
 * Get actual BaseUniversity instances with methods (for extended programs, etc.)
 */
export function getAllUniversityInstances(): BaseUniversity[] {
  return instances;
}

export function getUniversityById(id: string): University | undefined {
  return universities.find((uni) => uni.id === id);
}

export type {
  University as UniversityIndexType,
  Course as UniversityIndexCourse,
} from "./base-university";
