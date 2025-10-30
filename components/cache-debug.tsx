"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cacheManager } from '@/lib/cache-manager';
import { Trash2, RefreshCw, Database, Clock } from 'lucide-react';

interface CacheStats {
  totalItems: number;
  totalSize: number;
  oldestItem?: string;
  newestItem?: string;
}

export function CacheDebug() {
  const [stats, setStats] = useState<CacheStats>({ totalItems: 0, totalSize: 0 });
  const [keys, setKeys] = useState<string[]>([]);

  const refreshStats = () => {
    setStats(cacheManager.getStats());
    setKeys(cacheManager.getKeys());
  };

  useEffect(() => {
    refreshStats();
  }, []);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleClearExpired = () => {
    const cleared = cacheManager.clearExpired();
    alert(`Cleared ${cleared} expired items`);
    refreshStats();
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all cache?')) {
      cacheManager.clearAll();
      refreshStats();
    }
  };

  const handleClearItem = (key: string) => {
    if (confirm(`Clear cache for "${key}"?`)) {
      cacheManager.clearItem(key);
      refreshStats();
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Cache Debug Panel
        </CardTitle>
        <CardDescription>
          Monitor and manage application cache
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Cache Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm font-medium">Total Items</div>
            <Badge variant="secondary">{stats.totalItems}</Badge>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Cache Size</div>
            <Badge variant="secondary">{formatBytes(stats.totalSize)}</Badge>
          </div>
        </div>

        {/* Cache Actions */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={refreshStats}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Stats
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearExpired}
            className="flex items-center gap-2"
          >
            <Clock className="h-4 w-4" />
            Clear Expired
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleClearAll}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Clear All
          </Button>
        </div>

        {/* Cache Keys */}
        {keys.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Cached Items</div>
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {keys.map((key) => (
                <div key={key} className="flex items-center justify-between p-2 bg-muted rounded">
                  <span className="text-sm font-mono truncate flex-1">{key}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleClearItem(key)}
                    className="ml-2 h-6 w-6 p-0"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {keys.length === 0 && (
          <div className="text-center text-muted-foreground py-4">
            No cached items found
          </div>
        )}
      </CardContent>
    </Card>
  );
}