"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"

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
  const { toast } = useToast()

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch("/api/news")
        const data = await response.json()
        if (data.success || data.articles) {
          setNews(data.articles.slice(0, 5))
        }
      } catch (err) {
        console.error("Error fetching news:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const handleShare = async (article: NewsArticle) => {
    const shareData = {
      title: article.title,
      text: article.description,
      url: article.link,
    }

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData)
        toast({
          title: "Shared successfully",
          description: "Article shared!",
        })
      } else if (navigator.share) {
        // Web Share API exists but can't share this data, try anyway
        await navigator.share(shareData)
        toast({
          title: "Shared successfully",
          description: "Article shared!",
        })
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(article.link)
        toast({
          title: "Link copied",
          description: "Article link copied to clipboard!",
        })
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Share error:", error)
        // Try clipboard as final fallback
        try {
          await navigator.clipboard.writeText(article.link)
          toast({
            title: "Link copied instead",
            description: "Couldn't share, but link copied to clipboard!",
          })
        } catch (clipboardError) {
          toast({
            title: "Share failed",
            description: "Unable to share article. Please try again.",
            variant: "destructive",
          })
        }
      }
    }
  }

  if (loading) {
    return (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 auto-rows-fr">
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
        <p className="text-sm sm:text-base text-muted-foreground">No news articles available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 auto-rows-fr">
        {news.map((article, index) => {
          const isLarge = index === 0
          const gridClass = isLarge ? "sm:col-span-2 sm:row-span-2" : "sm:col-span-1 sm:row-span-1"

          return (
            <Card key={index} className={`group overflow-hidden hover:shadow-lg transition-shadow ${gridClass}`}>
              <div className={`relative overflow-hidden bg-muted ${isLarge ? "aspect-[16/10]" : "aspect-[16/9]"}`}>
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
              <CardHeader className="space-y-2 p-4 sm:p-6">
                {article.category?.[0] && (
                  <Badge variant="secondary" className="w-fit text-xs">
                    {article.category[0]}
                  </Badge>
                )}
                <CardTitle className={`line-clamp-2 ${isLarge ? "text-sm sm:text-base" : "text-xs sm:text-sm"}`}>
                  {article.title}
                </CardTitle>
                <CardDescription className="text-xs">
                  {new Date(article.pubDate).toLocaleDateString()}
                  {article.source_id && !article.source_id.includes("Fallback") && <> • {article.source_id}</>}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="flex items-center gap-2">
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="flex-1 justify-start px-0 h-auto font-normal text-xs sm:text-sm"
                  >
                    <a href={article.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      Read article
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare(article)}
                    className="h-auto p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Share article"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
