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
  const [newsSource, setNewsSource] = useState<string>("")

  useEffect(() => {
    async function fetchNews() {
      try {
        console.log("Fetching news from /api/news...")
        const response = await fetch("/api/news")
        console.log("News API response status:", response.status)
        const data = await response.json()
        console.log("News API response data:", data)
        if (data.success || data.articles) {
          setNews(data.articles.slice(0, 4))
          setNewsSource(data.source || "News Source")
          console.log("News articles set:", data.articles.slice(0, 4))
        } else {
          console.error("News API returned no articles", data)
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
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4 md:grid-rows-2 auto-rows-fr">
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

  if (news.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No news articles available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {newsSource && (
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            Source: {newsSource}
          </Badge>
        </div>
      )}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4 md:grid-rows-2 auto-rows-fr">
        {news.map((article, index) => {
          // Bento grid layout: first article spans 2 columns, others are single column
          const isLarge = index === 0
          const gridClass = isLarge 
            ? "md:col-span-2 md:row-span-2" 
            : "md:col-span-1 md:row-span-1"
          
          return (
            <Card key={index} className={`group overflow-hidden hover:shadow-lg transition-shadow ${gridClass}`}>
              <div className={`relative overflow-hidden bg-muted ${isLarge ? 'aspect-[16/10]' : 'aspect-[16/9]'}`}>
                {article.image_url ? (
                  <Image
                    src={article.image_url || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes={isLarge ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
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
                <CardTitle className={`line-clamp-2 ${isLarge ? 'text-base' : 'text-sm'}`}>
                  {article.title}
                </CardTitle>
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
          )
        })}
      </div>
    </div>
  )
}
