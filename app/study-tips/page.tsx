"use client"

import { DashboardSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Brain } from "lucide-react"
import { Chatbot } from "@/components/chatbot"
import { studyMethods, generalStudyTips } from "@/data/study-data"
import { StudyMethodCard } from "@/components/study-tips/study-method-card"
import { GeneralTipsSection } from "@/components/study-tips/general-tips"
import { SessionPlanner } from "@/components/study-tips/session-planner"

export default function StudyTipsPage() {
  return (
    <>
      <DashboardSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-green-600" />
            <h1 className="text-lg font-semibold">Study Tips</h1>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 max-w-7xl">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Study Methods & Tips</h2>
              <p className="text-gray-600 text-lg">Discover proven study techniques to improve your academic performance</p>
            </div>

            <section className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Brain className="h-6 w-6 text-blue-600" /> Study Methods
              </h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {studyMethods.map((method) => (
                  <StudyMethodCard key={method.id} method={method as any} />
                ))}
              </div>
            </section>

            <GeneralTipsSection tips={generalStudyTips} />
            <SessionPlanner />
          </div>
        </main>
        <Chatbot />
      </SidebarInset>
    </>
  )
}
