import { University, SubjectEntry, Course } from "@/lib/types"

export type Subject = SubjectEntry;

export type { Course };

export interface CourseMatch {
    course: Course
    university: University
    meetsRequirements: boolean
    missingRequirements: string[]
    metRequirements: string[]
    /** True when this match came from coursefind-data's /v1/qualify, so
     * course.id is a real qualification_code the API can serve a course
     * list for. Locally-sourced matches (data/universities/*.ts,
     * colleges, extended-curriculum programmes) carry ids of their own
     * shape that the API knows nothing about -- asking it for their
     * courses would 404 every time, so the card must not ask. Absent
     * rather than false on those: most of this app predates the API and
     * nothing else needs to care. */
    apiBacked?: boolean
}
