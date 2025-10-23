"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink, RefreshCw, Calendar, Building } from "lucide-react"

interface NewsArticle {
  title: string
  description: string
  link: string
  pubDate: string
  source_id: string
  category: string[]
  image_url?: string
}

export function NewsGrid() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNews = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/news")
      if (!response.ok) throw new Error("Failed to fetch news")
      const data = await response.json()
      setArticles(data.articles || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load news")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2 mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-32 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">{error}</p>
            <Button onClick={fetchNews} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {articles.map((article, index) => (
        <Card key={index} className="flex flex-col hover:shadow-lg transition-shadow">
          <CardHeader className="flex-1">
            <div className="flex items-start gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {article.category[0] || "Education"}
              </Badge>
            </div>
            <CardTitle className="text-base line-clamp-2">{article.title}</CardTitle>
            <CardDescription className="flex items-center gap-2 text-xs mt-2">
              <Calendar className="h-3 w-3" />
              {new Date(article.pubDate).toLocaleDateString()}
            </CardDescription>
            <CardDescription className="flex items-center gap-2 text-xs">
              <Building className="h-3 w-3" />
              {article.source_id}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{article.description}</p>
            <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                Read More
                <ExternalLink className="h-3 w-3 ml-2" />
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
