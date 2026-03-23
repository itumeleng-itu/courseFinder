"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Globe, Calendar, Info } from "lucide-react"

export type UniData = {
  id: string
  name: string
  shortName: string
  logo?: string
  website?: string
  city: string
  province: string
  courseCount: number
  locationString: string
}

export default function UniversitiesClient({ universities }: { universities: UniData[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const getDates = (id: string) => {
    switch(id) {
      case "uct": return { open: "1 April 2026", close: "31 July 2026" }
      case "up": return { open: "1 April 2026", close: "30 June 2026" }
      case "wits": return { open: "1 April 2026", close: "30 September 2026" }
      case "stellenbosch": return { open: "1 April 2026", close: "31 July 2026" }
      case "tut": return { open: "1 March 2026", close: "30 September 2026" }
      case "unisa": return { open: "1 September 2026", close: "15 October 2026" }
      case "uj": return { open: "1 April 2026", close: "31 October 2026" }
      case "nwu": return { open: "1 April 2026", close: "31 August 2026" }
      case "uwc": return { open: "15 May 2026", close: "30 September 2026" }
      default: return { open: "1 April 2026", close: "30 September 2026" }
    }
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">South African Universities</h1>
        <p className="text-muted-foreground text-lg">Browse application dates, overviews, and locations for public universities.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {universities.map((uni) => {
          const dates = getDates(uni.id)
          const isExpanded = expandedId === uni.id

          return (
            <Card 
              key={uni.id} 
              className={`transition-all duration-300 flex flex-col ${isExpanded ? "ring-2 ring-primary shadow-lg scale-[1.02] dark:bg-card dark:ring-primary/50" : "hover:border-primary/50"}`}
            >
              <CardHeader className="pb-3 flex-none">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <CardTitle className="text-xl">{uni.shortName}</CardTitle>
                    <CardDescription className="text-sm mt-1 line-clamp-2" title={uni.name}>{uni.name}</CardDescription>
                  </div>
                  {uni.logo && (
                    <div className="h-12 w-12 bg-white rounded-md flex px-1 py-1 shrink-0 items-center justify-center border shadow-sm">
                      <img 
                        src={uni.logo} 
                        alt={uni.shortName} 
                        className="object-contain w-full h-full" 
                        onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                      />
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="flex-grow flex flex-col">
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-primary font-medium bg-primary/10 dark:bg-primary/20 p-2.5 rounded-md">
                    <Calendar className="w-4 h-4 mr-2 shrink-0" />
                    <span className="truncate">Opens: {dates.open}</span>
                  </div>
                  
                  {isExpanded && (
                    <div className="pt-2 border-t space-y-3 animate-in slide-in-from-top-2 fade-in duration-300">
                       <div className="flex items-start text-sm">
                        <MapPin className="w-4 h-4 mr-2 mt-0.5 text-muted-foreground shrink-0" />
                        <span>{uni.locationString}</span>
                      </div>

                      {uni.website && (
                        <div className="flex items-center text-sm pt-1">
                          <Globe className="w-4 h-4 mr-2 text-muted-foreground shrink-0" />
                          <a href={uni.website} target="_blank" rel="noreferrer" className="text-primary hover:underline truncate">
                            {uni.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="pt-0 mt-auto">
                <Button 
                  variant={isExpanded ? "secondary" : "outline"} 
                  className="w-full flex items-center justify-center" 
                  onClick={() => setExpandedId(isExpanded ? null : uni.id)}
                >
                  <Info className="w-4 h-4 mr-2 shrink-0" />
                  <span className="truncate">{isExpanded ? "Hide Details" : "View Details"}</span>
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
