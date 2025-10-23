"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NewsArticle {
  title: string
  description: string
  link: string
  pubDate: string
  source_name: string
  image_url?: string
  category: string[]
}

export function NewsGrid() {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch("/api/news")
        const data = await response.json()

        if (data.success) {
          setNews(data.articles.slice(0, 4))
        } else {
          setError(true)
        }
      } catch (err) {
        console.error("Error fetching news:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

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
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error || news.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Unable to load news at this time</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {news.map((article, index) => (
        <Card key={index} className="flex flex-col hover:shadow-md transition-shadow">
          <CardHeader className="flex-1">
            <div className="space-y-2">
              {article.category && article.category.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {article.category[0]}
                </Badge>
              )}
              <CardTitle className="text-base line-clamp-2">{article.title}</CardTitle>
              <CardDescription className="flex items-center gap-1 text-xs">
                <Calendar className="h-3 w-3" />
                {new Date(article.pubDate).toLocaleDateString()}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{article.description}</p>
            <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
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
