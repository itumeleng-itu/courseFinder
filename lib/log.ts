/**
 * Logging that is quiet in production without going blind.
 *
 * The console was carrying a lot of traffic that is useful while
 * developing and noise to everyone else: a success line every time
 * the service worker registered, a warning each time an optional
 * geolocation lookup fell back, a note for every subject the slug
 * table skipped. None of it is actionable in a browser a learner is
 * using.
 *
 * The distinction drawn here is whether anyone can act on the
 * message, not how bad it sounds:
 *
 *   debug / warn  development only. Tracing and soft fallbacks --
 *                 the code already recovered, and the user is not
 *                 affected.
 *   error         always. Something failed that the person will
 *                 notice. Silencing these in production would mean
 *                 the one environment that matters reports nothing.
 *
 * So this reduces volume without removing the handlers: every catch
 * block that logged still logs, it just logs at the level that
 * matches what actually happened.
 */

const isDev = process.env.NODE_ENV !== "production"

export const log = {
  /** Tracing. Development only. */
  debug(...args: unknown[]): void {
    if (isDev) console.log(...args)
  },

  /** A soft fallback the code recovered from. Development only. */
  warn(...args: unknown[]): void {
    if (isDev) console.warn(...args)
  },

  /** A real failure the person will notice. Always reported. */
  error(...args: unknown[]): void {
    console.error(...args)
  },
}
