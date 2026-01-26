"use client"

import { Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type QuestionPaper, getDownloadUrl } from "@/lib/appwrite"
import { getYearCardStyles, getYearBadgeStyles } from "@/data/past-papers"

interface PaperCardProps {
  paper: QuestionPaper
  isDownloading: boolean
  onDownload: (paper: QuestionPaper) => void
}

export function PaperCard({ paper, isDownloading, onDownload }: PaperCardProps) {
  return (
    <Card className={`transition-all duration-200 border-2 ${getYearCardStyles(paper.year)}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge className={`${getYearBadgeStyles(paper.year)} text-xs font-semibold`}>
            {paper.year}
          </Badge>
          <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </div>
        <CardTitle className="text-base line-clamp-2 leading-tight">{paper.subject}</CardTitle>
        <CardDescription className="text-xs">
          {paper.paper_type} • {paper.session}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Button
          onClick={() => onDownload(paper)}
          disabled={isDownloading}
          size="sm"
          className="w-full"
        >
          {isDownloading ? (
            <>
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current mr-2" />
              Downloading...
            </>
          ) : (
            <>
              <Download className="h-3 w-3 mr-2" />
              Download
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
