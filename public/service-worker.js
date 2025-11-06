const CACHE_NAME = "coursefinder-v2"
const STATIC_ASSETS = ["/", "/offline.html", "/icons/icon-192.png", "/icons/icon-512.png"]

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Installing...")
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Caching static assets")
      return cache.addAll(STATIC_ASSETS)
    }),
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activating...")
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[ServiceWorker] Deleting old cache:", cacheName)
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
  self.clients.claim()
})

// Fetch event - network first, fallback to cache
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== "GET") {
    return
  }

  // Skip cross-origin requests
  if (!request.url.startsWith(self.location.origin)) {
    return
  }

  // IMPORTANT: Never intercept/caches Next.js build/dev assets or HMR
  // This prevents stale chunk caching that causes ChunkLoadError
  if (
    url.pathname.startsWith("/_next/") ||
    url.pathname.startsWith("/@vite") ||
    url.pathname.includes("/webpack") ||
    url.searchParams.has("v") // dev cache-busting param; let browser handle it
  ) {
    return
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200) {
          return response
        }

        // Clone the response
        const responseToCache = response.clone()

        // Cache successful responses
        caches
          .open(CACHE_NAME)
          .then((cache) => {
            // Avoid caching API responses with query params aggressively
            // but allow caching static pages and assets under root
            if (!url.pathname.startsWith("/api/") || !url.search) {
              cache.put(request, responseToCache).catch(() => {})
            }
          })

        return response
      })
      .catch(() => {
        // Return cached response or offline page
        return caches.match(request).then((response) => {
          return response || caches.match("/offline.html")
        })
      }),
  )
})

// Background sync for notifications (optional)
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-notifications") {
    event.waitUntil(syncNotifications())
  }
})

async function syncNotifications() {
  try {
    console.log("[ServiceWorker] Syncing notifications...")
    // Add notification sync logic here
  } catch (error) {
    console.error("[ServiceWorker] Sync failed:", error)
  }
}
