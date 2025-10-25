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
import { BreadcrumbNavigation } from "@/components/breadcrumb-navigation"
import { ExternalLink, Search, Phone, Mail, AlertCircle, FileText, CheckCircle } from "lucide-react"
import { Chatbot } from "@/components/chatbot"

export default function MatricResultsPage() {
  const [examNumber, setExamNumber] = useState("")
  const [idNumber, setIdNumber] = useState("")
  const [error, setError] = useState("")

  const validateIdNumber = (id: string) => {
    // Basic SA ID number validation (13 digits)
    if (id.length !== 13 || !/^\d+$/.test(id)) {
      return false
    }
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!examNumber || !idNumber) {
      setError("Please enter both your examination number and ID number")
      return
    }

    if (!validateIdNumber(idNumber)) {
      setError("Please enter a valid 13-digit SA ID number")
      return
    }

    // Redirect to official DBE website with parameters
    window.open(
      `https://www.education.gov.za/MatricResults/ExamResults.aspx?exam=${examNumber}&id=${idNumber}`,
      "_blank",
    )
  }

  return (
    <>
      <DashboardSidebar />
      <SidebarInset>
        <div className="container mx-auto px-4 pt-3">
          <BreadcrumbNavigation />
        </div>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h1 className="text-lg font-semibold">Matric Results</h1>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-4 max-w-4xl mx-auto">

          {/* Official Portal Link */}
          <Alert>
            <FileText className="h-4 w-4" />
            <AlertTitle>Official Results Portal</AlertTitle>
            <AlertDescription className="mt-2">
              This page helps you access the official Department of Basic Education results portal. Your results will be
              retrieved securely from the government database.
            </AlertDescription>
          </Alert>

          {/* Main Form Card */}
          <Card>
            <CardHeader>
              <CardTitle>Check Your Matric Results</CardTitle>
              <CardDescription>
                Enter your examination number and ID number to view your National Senior Certificate results
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

                <div className="space-y-2">
                  <Label htmlFor="idNumber">ID Number</Label>
                  <Input
                    id="idNumber"
                    type="text"
                    placeholder="Enter your 13-digit ID number"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    maxLength={13}
                    required
                  />
                  <p className="text-xs text-gray-500">Enter your South African ID number (13 digits)</p>
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

          {/* Information Cards */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  What You Need
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    Your examination number (from admission slip)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    Your South African ID number
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    Stable internet connection
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
                  Results are typically available in early January each year
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  You can also receive your results via SMS by registering on the DBE portal
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  If you're unable to access your results online, contact your school directly
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  Keep your examination number and ID number confidential
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
