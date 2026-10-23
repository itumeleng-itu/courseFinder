const CACHE_NAME = "coursefinder-v3"
const PRECACHE = ["/", "/find-course/", "/universities/"]

/**
 * Paths this worker must not intercept.
 *
 * /api/ because a stale cached qualification result is worse than no
 * result -- the whole point of that endpoint is that it reflects the
 * marks just entered.
 *
 * /_vercel/ because it is analytics. It was being intercepted, and
 * when a content blocker refused the request the worker turned a
 * blocked script into an uncaught exception on every page load.
 */
const BYPASS = [/^\/api\//, /^\/_vercel\//]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  )
})

/**
 * Network first, cache as a fallback -- and ALWAYS a Response.
 *
 * The previous version ended with:
 *
 *     .catch(() => caches.match(event.request))
 *
 * caches.match resolves to `undefined` when nothing matches, and
 * respondWith(undefined) throws "TypeError: Failed to convert value
 * to 'Response'". So any request that failed on the network and was
 * not already cached became an uncaught promise rejection in the
 * console. A content blocker refusing the analytics script was enough
 * to trigger it on every single page load, twice.
 *
 * Every path out of here now resolves to a real Response.
 */
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return

  const url = new URL(event.request.url)
  if (url.origin !== self.location.origin) return
  if (BYPASS.some((pattern) => pattern.test(url.pathname))) return

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone)).catch(() => {})
        }
        return response
      })
      .catch(async () => {
        const cached = await caches.match(event.request)
        if (cached) return cached

        // A navigation with nothing cached for it still deserves the
        // app shell rather than a dead tab.
        if (event.request.mode === "navigate") {
          const shell = await caches.match("/")
          if (shell) return shell
        }

        return new Response("", {
          status: 504,
          statusText: "Offline and not cached",
          headers: { "Content-Type": "text/plain" },
        })
      })
  )
})
