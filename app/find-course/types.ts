import { University, SubjectEntry, Course } from "@/lib/types"

export type Subject = SubjectEntry;

export type { Course };

export interface CourseMatch {
    course: Course
    university: University
    meetsRequirements: boolean
    missingRequirements: string[]
    metRequirements: string[]
}
