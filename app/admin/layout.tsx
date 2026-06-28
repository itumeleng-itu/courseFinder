import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard | CourseFinder SA",
  description: "Administrative dashboard for CourseFinder SA data management.",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* 
        We use a separate clean layout for the admin area,
        isolated from the main user-facing app navigation.
      */}
      {children}
    </div>
  )
}
