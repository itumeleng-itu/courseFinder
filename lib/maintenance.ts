/**
 * Whether the course listings are flagged as under maintenance.
 *
 * On by default. Set NEXT_PUBLIC_COURSE_DATA_MAINTENANCE=off (and rebuild --
 * NEXT_PUBLIC_ values are inlined at build time) to lift the notice once the
 * course data has been re-verified.
 */
export const COURSE_DATA_MAINTENANCE: boolean =
  process.env.NEXT_PUBLIC_COURSE_DATA_MAINTENANCE !== "off"
