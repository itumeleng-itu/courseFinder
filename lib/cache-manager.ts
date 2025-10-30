interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

interface CacheStats {
  totalItems: number;
  totalSize: number; // in bytes (approximate)
  oldestItem?: string;
  newestItem?: string;
}

export class CacheManager {
  private storageKey: string;

  constructor(storageKey = 'coursefinder-cache') {
    this.storageKey = storageKey;
  }

  // Get cache statistics
  getStats(): CacheStats {
    try {
      const cache = localStorage.getItem(this.storageKey);
      if (!cache) {
        return { totalItems: 0, totalSize: 0 };
      }

      const parsedCache = JSON.parse(cache);
      const items = Object.entries(parsedCache);
      
      let oldestTimestamp = Infinity;
      let newestTimestamp = 0;
      let oldestKey = '';
      let newestKey = '';

      items.forEach(([key, item]: [string, any]) => {
        if (item.timestamp < oldestTimestamp) {
          oldestTimestamp = item.timestamp;
          oldestKey = key;
        }
        if (item.timestamp > newestTimestamp) {
          newestTimestamp = item.timestamp;
          newestKey = key;
        }
      });

      return {
        totalItems: items.length,
        totalSize: new Blob([cache]).size,
        oldestItem: oldestKey || undefined,
        newestItem: newestKey || undefined
      };
    } catch (error) {
      console.error('Error getting cache stats:', error);
      return { totalItems: 0, totalSize: 0 };
    }
  }

  // Clear expired items
  clearExpired(): number {
    try {
      const cache = localStorage.getItem(this.storageKey);
      if (!cache) return 0;

      const parsedCache = JSON.parse(cache);
      const now = Date.now();
      let removedCount = 0;

      Object.keys(parsedCache).forEach(key => {
        const item: CacheItem<any> = parsedCache[key];
        if (now - item.timestamp > item.ttl) {
          delete parsedCache[key];
          removedCount++;
        }
      });

      if (removedCount > 0) {
        localStorage.setItem(this.storageKey, JSON.stringify(parsedCache));
      }

      return removedCount;
    } catch (error) {
      console.error('Error clearing expired cache:', error);
      return 0;
    }
  }

  // Clear all cache
  clearAll(): void {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error('Error clearing all cache:', error);
    }
  }

  // Clear specific cache entry
  clearItem(key: string): boolean {
    try {
      const cache = localStorage.getItem(this.storageKey);
      if (!cache) return false;

      const parsedCache = JSON.parse(cache);
      if (key in parsedCache) {
        delete parsedCache[key];
        localStorage.setItem(this.storageKey, JSON.stringify(parsedCache));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error clearing cache item:', error);
      return false;
    }
  }

  // Get all cache keys
  getKeys(): string[] {
    try {
      const cache = localStorage.getItem(this.storageKey);
      if (!cache) return [];

      const parsedCache = JSON.parse(cache);
      return Object.keys(parsedCache);
    } catch (error) {
      console.error('Error getting cache keys:', error);
      return [];
    }
  }

  // Check if cache is getting too large and clean up if needed
  maintainCache(maxSizeBytes = 5 * 1024 * 1024): void { // Default 5MB
    try {
      const stats = this.getStats();
      
      if (stats.totalSize > maxSizeBytes) {
        // First, clear expired items
        const expiredCleared = this.clearExpired();
        
        // If still too large, remove oldest items
        const newStats = this.getStats();
        if (newStats.totalSize > maxSizeBytes) {
          const cache = localStorage.getItem(this.storageKey);
          if (cache) {
            const parsedCache = JSON.parse(cache);
            const items = Object.entries(parsedCache)
              .map(([key, item]: [string, any]) => ({ key, timestamp: item.timestamp }))
              .sort((a, b) => a.timestamp - b.timestamp);

            // Remove oldest 25% of items
            const itemsToRemove = Math.ceil(items.length * 0.25);
            for (let i = 0; i < itemsToRemove; i++) {
              delete parsedCache[items[i].key];
            }

            localStorage.setItem(this.storageKey, JSON.stringify(parsedCache));
          }
        }
      }
    } catch (error) {
      console.error('Error maintaining cache:', error);
    }
  }

  // Set up automatic cache maintenance
  setupAutoMaintenance(intervalMinutes = 30): () => void {
    const interval = setInterval(() => {
      this.maintainCache();
    }, intervalMinutes * 60 * 1000);

    // Return cleanup function
    return () => clearInterval(interval);
  }
}

// Global cache manager instance
export const cacheManager = new CacheManager();
