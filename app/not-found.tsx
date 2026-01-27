"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Home, Search, ArrowLeft, GraduationCap, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background p-4">
      <div className="max-w-xl w-full text-center flex flex-col items-center">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
          <h1 className="text-[150px] sm:text-[180px] font-bold text-foreground leading-none select-none">
            404
          </h1>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-4 -mt-4"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Page Not Found
          </h2>
          <p className="text-muted-foreground text-base max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="h-5 w-5" />
              Go to Dashboard
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/find-course">
              <Search className="h-5 w-5" />
              Find a Course
            </Link>
          </Button>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 pt-8 border-t border-border"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Quick links
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link 
              href="/past-papers" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 hover:bg-secondary text-sm transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              Past Papers
            </Link>
            <Link 
              href="/matric-results" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 hover:bg-secondary text-sm transition-colors"
            >
              <Search className="h-4 w-4" />
              Matric Results
            </Link>
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8"
        >
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="text-muted-foreground hover:text-foreground gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
