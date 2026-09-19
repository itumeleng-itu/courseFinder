import type { University, Course } from "./base-university";
import { BaseUniversity } from "./base-university";
import { UNIVERSITY_DIRECTORY, type UniversityDirectoryEntry } from "./directory";

/**
 * This app no longer carries per-institution COURSE data of its own --
 * admission eligibility is coursefind-data's job (see
 * hooks/use-course-matcher.ts and lib/qualify-api.ts). The 26
 * per-university classes that used to live in this directory (uj.ts,
 * wits.ts, ...) carried both directory metadata (name, location,
 * website, logo) AND admission data (_courses, calculateApsScore) in one
 * class; only the admission half was the problem, so it was deleted
 * outright rather than emptied out. The directory half is restored here
 * from ./directory.ts (id/name/location/website/logo only, no
 * _courses) -- app/universities (the institution browsing page) and
 * every other caller of getAllUniversityInstances() need a real
 * institution list to exist at all, and a university's name/location is
 * a display concern, not an eligibility one. As each institution is
 * verified and onboarded to coursefind-data, it becomes visible through
 * /v1/meta -- nothing in this file needs to change for that to happen.
 */

class DirectoryUniversity extends BaseUniversity {
  readonly id: string;
  readonly name: string;
  readonly shortName: string;
  readonly website: string;
  readonly logo: string;
  readonly location: { city: string; province: string };

  constructor(entry: UniversityDirectoryEntry) {
    super();
    this.id = entry.id;
    this.name = entry.name;
    this.shortName = entry.shortName;
    this.website = entry.website;
    this.logo = entry.logo;
    this.location = { city: entry.city, province: entry.province };
  }

  /** Directory-only entries carry no course data, so there is nothing to
   * score against -- 0, not a throw, so a caller iterating every
   * institution never crashes on the ones the API hasn't covered yet. */
  calculateApsScore(): number {
    return 0;
  }
}

const instances: BaseUniversity[] = UNIVERSITY_DIRECTORY.map((entry) => new DirectoryUniversity(entry));

export const universities: University[] = instances.map((uni) => ({
  id: uni.id,
  name: uni.name,
  shortName: uni.shortName,
  location: uni.getLocationString(),
  website: uni.website,
  courses: [],
}));

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
