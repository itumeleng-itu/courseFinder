"use client"

import { useEffect, useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink, RefreshCw, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface NewsArticle {
  title: string
  description: string
  link: string
  pubDate: string
  source_id: string
  image_url: string
  alt_text?: string
  category: string[]
}

interface NewsResponse {
  success: boolean
  articles: NewsArticle[]
  cached?: boolean
  fallback?: boolean
  error?: boolean
}

export function NewsGrid() {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())

  const fetchNews = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }
      
      setError(false)
      
      const response = await fetch("/api/news", {
        cache: 'no-store', // Ensure fresh data on manual refresh
      })
      const data: NewsResponse = await response.json()

      if (data.success) {
        setNews(data.articles.slice(0, 4))
        setLastUpdated(new Date())
        setImageErrors(new Set()) // Reset image errors on new data
      } else {
        setError(true)
      }
    } catch (err) {
      console.error("Error fetching news:", err)
      setError(true)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  // Auto-refresh mechanism
  useEffect(() => {
    fetchNews()
    
    // Set up auto-refresh every 15 minutes
    const interval = setInterval(() => {
      fetchNews(true)
    }, 15 * 60 * 1000) // 15 minutes

    return () => clearInterval(interval)
  }, [fetchNews])

  // Handle image loading errors
  const handleImageError = useCallback((index: number) => {
    setImageErrors(prev => new Set(prev).add(index))
  }, [])

  // Generate fallback image for failed loads
  const getFallbackImage = useCallback(() => {
    return "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop&crop=center"
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-start">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-[2/1] relative">
                <Skeleton className="h-full w-full" />
              </div>
              <CardHeader className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-16 w-full mb-4" />
                <Skeleton className="h-8 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error || news.length === 0) {
    return (
      <Card className="text-center p-8">
        <CardContent className="space-y-4">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
          <div>
            <h3 className="text-lg font-semibold mb-2">Unable to load news</h3>
            <p className="text-muted-foreground mb-4">
              There was an issue loading the latest education news. Please try again.
            </p>
            <Button onClick={() => fetchNews()} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header with refresh button and last updated info */}
      <div className="flex items-center justify-start gap-3">
        <Badge variant="outline">2024 Only</Badge>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {lastUpdated && (
            <>
              <Calendar className="h-4 w-4" />
              <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            </>
          )}
        </div>
      </div>

      {/* News Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {news.map((article, index) => (
          <Card key={index} className="flex flex-col hover:shadow-md transition-all duration-200 hover:scale-[1.02] overflow-hidden group">
            {/* Image Section */}
            <div className="aspect-[2/1] relative overflow-hidden bg-muted">
              {!imageErrors.has(index) ? (
                <Image
                  src={article.image_url}
                  alt={article.alt_text || `Image for ${article.title}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  onError={() => handleImageError(index)}
                  priority={index < 2} // Prioritize first 2 images
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <Calendar className="h-6 w-6 text-primary/60" />
                    </div>
                    <p className="text-xs text-muted-foreground">Education News</p>
                  </div>
                </div>
              )}
              
              {/* Category Badge Overlay */}
              {article.category && article.category.length > 0 && (
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="text-xs bg-background/90 backdrop-blur-sm">
                    {article.category[0]}
                  </Badge>
                </div>
              )}
            </div>

            {/* Content Section */}
            <CardHeader className="flex-1 pb-2">
              <CardTitle className="text-sm md:text-base line-clamp-2 leading-tight">
                {article.title}
              </CardTitle>
              <CardDescription className="flex items-center gap-1 text-xs">
                <Calendar className="h-3 w-3" />
                {new Date(article.pubDate).toLocaleDateString()}
                {article.source_id && (
                  <>
                    <span className="mx-1">•</span>
                    <span>{article.source_id}</span>
                  </>
                )}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                {article.description}
              </p>
              <Button 
                asChild 
                variant="outline" 
                size="sm" 
                className="w-full bg-transparent hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <a 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  Read More
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
