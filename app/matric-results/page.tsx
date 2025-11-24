"use client"

import type React from "react"

import { useState } from "react"
import { DashboardSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FileText, Search, AlertCircle, ExternalLink, CheckCircle, Phone, Mail, Info } from "lucide-react"
import { Chatbot } from "@/components/chatbot"

export default function MatricResultsPage() {
  const [examNumber, setExamNumber] = useState("")
  const [error, setError] = useState("")
  const [showResult, setShowResult] = useState(false)

  // Calculate which year's results we're looking for
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() // 0-indexed (0 = January)
  const currentDay = now.getDate()
  
  // Results are released mid-January (around 14th)
  // If we're before Jan 14, we're waiting for previous year's results
  // If we're after Jan 14, we're waiting for current year's results
  const resultsYear = (currentMonth === 0 && currentDay < 14) ? currentYear - 1 : currentYear
  const releaseYear = resultsYear + 1
  const releaseDate = `January 14, ${releaseYear}`

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!examNumber || examNumber.trim().length === 0) {
      setError("Please enter your examination number")
      return
    }

    // Show the "results not available" message
    setShowResult(true)
  }

  const resetForm = () => {
    setShowResult(false)
    setExamNumber("")
    setError("")
  }

  return (
    <>
      <DashboardSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-green-600" />
            <h1 className="text-lg font-semibold">Matric Results</h1>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-4 max-w-4xl mx-auto">

          {/* Official Portal Link */}
          <Alert>
            <FileText className="h-4 w-4" />
            <AlertTitle>National Senior Certificate Results {resultsYear}</AlertTitle>
            <AlertDescription className="mt-2">
              Check your matric results by entering your examination number below. Results will be available from {releaseDate}.
            </AlertDescription>
          </Alert>

          {!showResult ? (
            <>
              {/* Main Form Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Check Your Matric Results</CardTitle>
                  <CardDescription>
                    Enter your examination number to view your National Senior Certificate results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="examNumber">Examination Number</Label>
                      <Input
                        id="examNumber"
                        type="text"
                        placeholder="Enter your exam number"
                        value={examNumber}
                        onChange={(e) => setExamNumber(e.target.value)}
                        required
                      />
                      <p className="text-xs text-gray-500">
                        Your examination number can be found on your exam admission slip
                      </p>
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button type="submit" className="w-full" size="lg">
                      <Search className="h-4 w-4 mr-2" />
                      View My Results
                    </Button>

                    <div className="text-center">
                      <Button variant="link" asChild>
                        <a
                          href="https://www.education.gov.za/MatricResults/ExamResults.aspx"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Go to Official DBE Portal
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              {/* Results Message Card */}
              <Card className="border-amber-200 bg-amber-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-amber-600" />
                    Results Not Yet Available
                  </CardTitle>
                  <CardDescription>
                    Examination Number: <strong>{examNumber}</strong>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Marks are not yet out</AlertTitle>
                    <AlertDescription className="mt-2 space-y-2">
                      <p>
                        The {resultsYear} National Senior Certificate results will be officially released on <strong>{releaseDate}</strong>.
                      </p>
                      <p className="text-sm">
                        Please check back on or after this date to view your results.
                      </p>
                    </AlertDescription>
                  </Alert>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={resetForm} variant="outline" className="flex-1">
                      Check Another Number
                    </Button>
                    <Button asChild className="flex-1">
                      <a
                        href="https://www.education.gov.za/MatricResults/ExamResults.aspx"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Official DBE Portal
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Information Cards */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  When Results Are Available
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    Results will be available from {releaseDate}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    Access via the DBE website using your examination number
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    Results also available via SMS to 45856 or USSD *120*45856#
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    Physical statements available at schools from 8:00 AM
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Phone className="h-5 w-5 text-blue-600" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <div className="text-sm font-medium">DBE Call Centre</div>
                  <div className="text-sm text-gray-600">0800 202 933 (Toll-free)</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    Email Support
                  </div>
                  <div className="text-sm text-gray-600">info@dbe.gov.za</div>
                </div>
                <div className="text-xs text-gray-500 mt-2">Operating hours: Monday to Friday, 8:00 AM - 4:30 PM</div>
              </CardContent>
            </Card>
          </div>

          {/* Important Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                Important Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  The Minister of Basic Education will officially announce results on January 13, {releaseYear}
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  Results accessible to candidates from 6:00 AM on {releaseDate}
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  Keep your examination number confidential and secure
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  If unable to access results online, contact your school directly
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  Download the MatricsMate app for mobile access to results
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <Chatbot />
      </SidebarInset>
    </>
  )
}
