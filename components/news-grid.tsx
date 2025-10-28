"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface NewsArticle {
  title: string
  description: string
  link: string
  pubDate: string
  source_id: string
  image_url: string
  category: string[]
}

export function NewsGrid() {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch("/api/news")
        const data = await response.json()
        if (data.success) {
          setNews(data.articles.slice(0, 4))
        }
      } catch (err) {
        console.error("Error fetching news:", err)
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
          <Card key={i} className="overflow-hidden">
            <div className="aspect-[16/9] relative">
              <Skeleton className="h-full w-full" />
            </div>
            <CardHeader className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </CardHeader>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {news.map((article, index) => (
        <Card key={index} className="group overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-[16/9] relative overflow-hidden bg-muted">
            {article.image_url ? (
              <Image
                src={article.image_url || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50" />
            )}
          </div>
          <CardHeader className="space-y-2">
            {article.category?.[0] && (
              <Badge variant="secondary" className="w-fit text-xs">
                {article.category[0]}
              </Badge>
            )}
            <CardTitle className="text-sm line-clamp-2">{article.title}</CardTitle>
            <CardDescription className="text-xs">
              {new Date(article.pubDate).toLocaleDateString()} • {article.source_id}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="ghost" size="sm" className="w-full justify-start px-0 h-auto font-normal">
              <a href={article.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                Read article
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
