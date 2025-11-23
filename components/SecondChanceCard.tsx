"use client"
import React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

const SECOND_CHANCE_URL = "https://www.education.gov.za/Programmes/SecondChanceProgramme.aspx"

export function SecondChanceCard({
  showUnlink = false,
  onUnlink,
}: {
  showUnlink?: boolean
  onUnlink?: () => void
}) {
  return (
    <Card aria-label="Second Chance Programme recommendation" className="second-chance-card w-full">
      <CardHeader className="sc-header">
        <CardTitle className="text-lg">Second Chance Programme</CardTitle>
        <CardDescription>
          Explore the Department of Education’s Second Chance Programme
          to improve your results and eligibility.
        </CardDescription>
      </CardHeader>
      <CardContent className="sc-content">
        <p className="text-sm text-muted-foreground">
          The programme offers support for learners to rewrite subjects and enhance admission prospects.
        </p>
      </CardContent>
      <CardFooter className="sc-footer flex items-center gap-2">
        <Button asChild aria-label="Open Second Chance Programme website">
          <a href={SECOND_CHANCE_URL} target="_blank" rel="noopener noreferrer">
            Visit Programme
            <ExternalLink aria-hidden className="ml-2" />
          </a>
        </Button>
        {showUnlink && (
          <Button
            type="button"
            variant="ghost"
            aria-label="Unlink Second Chance card"
            onClick={() => onUnlink?.()}
          >
            Unlink Card
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default SecondChanceCard
