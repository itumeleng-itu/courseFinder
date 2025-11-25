"use client"
import React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, CheckCircle2 } from "lucide-react"

const SECOND_CHANCE_URL = "https://www.education.gov.za/Programmes/SecondChanceProgramme.aspx"

export function SecondChanceCard() {
  return (
    <Card 
      className="glass-card border-green-200 bg-green-50/50 transition-all duration-300 hover:shadow-lg hover:scale-[1.01]"
      aria-label="Second Chance Programme recommendation"
    >
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
              <CardTitle className="text-base md:text-lg">Second Chance Programme</CardTitle>
            </div>
            <CardDescription className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
              <span className="font-medium">Department of Education</span>
              <span className="hidden sm:inline">•</span>
              <span className="block sm:inline w-full sm:w-auto">National Programme</span>
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 self-start sm:ml-4">
            <Badge variant="secondary" className="glass-button bg-green-100 text-green-800 border-green-300">
              Available Now
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-3">
            Explore the Department of Education's Second Chance Programme to improve your results and eligibility. 
            The programme offers support for learners to rewrite subjects and enhance admission prospects.
          </p>

          {/* Programme details styled like course information */}
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">Benefits: </span>
            Rewrite subjects, improve APS score, enhance university admission prospects
          </div>

          <div className="text-xs text-muted-foreground">
            <span className="font-medium">Duration: </span>
            Flexible scheduling based on subject selection
          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <Button 
              asChild 
              size="sm"
              className="w-full sm:w-auto transition-all duration-300 hover:scale-105"
              aria-label="Open Second Chance Programme website"
            >
              <a 
                href={SECOND_CHANCE_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                Learn More & Apply
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default SecondChanceCard
