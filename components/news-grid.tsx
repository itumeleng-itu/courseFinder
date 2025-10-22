"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink, Calendar, RefreshCw, Newspaper } from "lucide-react"

interface NewsArticle {
  title: string
  description: string
  link: string
  image_url: string | null
  pubDate: string
  source_id: string
  category: string[]
}

export function NewsGrid() {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNews = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/news")

      if (!response.ok) {
        throw new Error("Failed to fetch news")
      }

      const data = await response.json()
      setNews(data.results || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const getCategoryColor = (categories: string[]) => {
    if (!categories || categories.length === 0) return "bg-blue-500"
    const category = categories[0].toLowerCase()
    if (category.includes("education")) return "bg-blue-500"
    if (category.includes("university")) return "bg-purple-500"
    if (category.includes("student")) return "bg-green-500"
    return "bg-blue-500"
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffTime = Math.abs(now.getTime() - date.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays === 0) return "Today"
      if (diffDays === 1) return "Yesterday"
      if (diffDays < 7) return `${diffDays} days ago`

      return date.toLocaleDateString("en-ZA", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    } catch {
      return dateString
    }
  }

  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Newspaper className="h-5 w-5" />
            Latest Education News
          </h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-32 w-full mb-2" />
                <Skeleton className="h-3 w-full mb-1" />
                <Skeleton className="h-3 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-red-500 mb-4">Error loading news: {error}</p>
          <Button onClick={fetchNews} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (news.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Newspaper className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500 mb-4">No news articles found</p>
          <Button onClick={fetchNews} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Newspaper className="h-5 w-5" />
          Latest Education News
        </h3>
        <Button onClick={fetchNews} variant="ghost" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {news.map((article, index) => (
          <Card
            key={index}
            className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => window.open(article.link, "_blank")}
          >
            {article.image_url && (
              <div className="relative h-40 w-full overflow-hidden bg-gray-100">
                <img
                  src={article.image_url || "/placeholder.svg"}
                  alt={article.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = "none"
                  }}
                />
              </div>
            )}
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2 mb-2">
                <Badge className={`${getCategoryColor(article.category)} text-white text-xs`}>
                  {article.category && article.category.length > 0 ? article.category[0] : "Education"}
                </Badge>
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDate(article.pubDate)}
                </div>
              </div>
              <CardTitle className="text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                {article.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-2 text-xs mb-3">{article.description}</CardDescription>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 truncate">{article.source_id}</span>
                <ExternalLink className="h-3 w-3 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
