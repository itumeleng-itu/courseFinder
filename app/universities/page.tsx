import { getAllUniversityInstances } from "@/data/universities"
import UniversitiesClient from "./UniversitiesClient"
import type { UniData } from "./UniversitiesClient"
import { DashboardSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Chatbot } from "@/components/chatbot"
import { Landmark } from "lucide-react"

export const metadata = {
  title: "Universities | CourseFinder",
  description: "Browse South African universities, their application dates, and locations.",
}

export default function UniversitiesPage() {
  const instances = getAllUniversityInstances()
  
  // Need to map the data to simple objects to pass down to Client Component
  // Passing class instances over the server-client boundary causes issues
  const universitiesData: UniData[] = instances.map(uni => ({
    id: uni.id,
    name: uni.name,
    shortName: uni.shortName,
    logo: uni.logo,
    website: uni.website,
    city: uni.location?.city || "",
    province: uni.location?.province || "",
    courseCount: uni.courses?.length || 0,
    // Safely get location string to prevent any class reference errors
    locationString: typeof (uni as any).getLocationString === "function" 
        ? (uni as any).getLocationString() 
        : String((uni as any).location?.city ?? "")
  }))

  return (
    <>
      <DashboardSidebar />
      <SidebarInset>
        <div className="flex flex-col h-full">
          {/* Header - Hidden on mobile/tablet */}
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6 hidden xl:flex">
            <div className="flex items-center gap-2 text-sm">
              <Landmark className="h-4 w-4" />
              <span className="font-semibold">Universities</span>
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
              <UniversitiesClient universities={universitiesData} />
            </div>
          </main>
        </div>
        <Chatbot />
      </SidebarInset>
    </>
  )
}
