import { useState, useEffect, useCallback } from 'react';
import { cacheManager } from '@/lib/cache-manager';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

interface UseCacheOptions {
  ttl?: number; // Default TTL in milliseconds (default: 5 minutes)
  storageKey?: string;
}

export function useCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: UseCacheOptions = {}
) {
  const { ttl = 5 * 60 * 1000, storageKey = 'coursefinder-cache' } = options; // Default 5 minutes TTL
  
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Set up automatic cache maintenance on mount
  useEffect(() => {
    const cleanup = cacheManager.setupAutoMaintenance(30); // Every 30 minutes
    return cleanup;
  }, []);

  // Get cache from localStorage
  const getFromCache = useCallback((cacheKey: string): T | null => {
    try {
      const cache = localStorage.getItem(storageKey);
      if (!cache) return null;

      const parsedCache = JSON.parse(cache);
      const item: CacheItem<T> = parsedCache[cacheKey];
      
      if (!item) return null;

      // Check if cache is expired
      const now = Date.now();
      if (now - item.timestamp > item.ttl) {
        // Remove expired item
        delete parsedCache[cacheKey];
        localStorage.setItem(storageKey, JSON.stringify(parsedCache));
        return null;
      }

      return item.data;
    } catch (error) {
      console.error('Error reading from cache:', error);
      return null;
    }
  }, [storageKey]);

  // Save to cache
  const saveToCache = useCallback((cacheKey: string, data: T) => {
    try {
      const cache = localStorage.getItem(storageKey);
      const parsedCache = cache ? JSON.parse(cache) : {};
      
      const item: CacheItem<T> = {
        data,
        timestamp: Date.now(),
        ttl
      };

      parsedCache[cacheKey] = item;
      localStorage.setItem(storageKey, JSON.stringify(parsedCache));
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  }, [storageKey, ttl]);

  // Clear specific cache entry
  const clearCache = useCallback((cacheKey?: string) => {
    try {
      if (cacheKey) {
        const cache = localStorage.getItem(storageKey);
        if (cache) {
          const parsedCache = JSON.parse(cache);
          delete parsedCache[cacheKey];
          localStorage.setItem(storageKey, JSON.stringify(parsedCache));
        }
      } else {
        // Clear all cache
        localStorage.removeItem(storageKey);
      }
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }, [storageKey]);

  // Fetch data with caching
  const fetchData = useCallback(async (forceRefresh = false) => {
    // Check cache first (unless force refresh)
    if (!forceRefresh) {
      const cachedData = getFromCache(key);
      if (cachedData) {
        setData(cachedData);
        setError(null);
        return cachedData;
      }
    }

    setLoading(true);
    setError(null);

    try {
      const result = await fetcher();
      setData(result);
      saveToCache(key, result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [key, fetcher, getFromCache, saveToCache]);

  // Load data on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Refresh function for manual cache refresh
  const refresh = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  // Invalidate cache for this key
  const invalidate = useCallback(() => {
    clearCache(key);
    setData(null);
  }, [clearCache, key]);

  return {
    data,
    loading,
    error,
    refresh,
    invalidate,
    clearAllCache: () => clearCache()
  };
}

// Hook specifically for papers data
export function usePapersCache() {
  const fetcher = useCallback(async () => {
    const response = await fetch('/papers_database.json');
    if (!response.ok) {
      throw new Error('Failed to fetch papers');
    }
    return response.json();
  }, []);

  return useCache('papers-database', fetcher, {
    ttl: 10 * 60 * 1000, // 10 minutes TTL for papers
    storageKey: 'coursefinder-cache'
  });
}
