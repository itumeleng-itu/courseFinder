"use client"

import { DashboardSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  Brain, 
  Clock, 
  Users, 
  Target, 
  Lightbulb, 
  Calendar,
  CheckCircle2,
  Star,
  Timer,
  PenTool,
  Headphones,
  Eye,
  Repeat,
  FileText,
  Zap
} from "lucide-react"
import { Chatbot } from "@/components/chatbot"

const studyMethods = [
  {
    id: "active-recall",
    title: "Active Recall",
    description: "Test yourself regularly without looking at notes",
    icon: Brain,
    difficulty: "Medium",
    timeRequired: "15-30 min sessions",
    effectiveness: 5,
    techniques: [
      "Close your textbook and write down everything you remember",
      "Use flashcards to test key concepts",
      "Explain topics out loud without notes",
      "Create practice questions and answer them",
      "Use the Feynman Technique - explain concepts simply"
    ],
    bestFor: ["Memorization", "Concept understanding", "Exam preparation"],
    tips: [
      "Start with easier topics to build confidence",
      "Use spaced repetition for better retention",
      "Don't peek at answers too quickly"
    ]
  },
  {
    id: "spaced-repetition",
    title: "Spaced Repetition",
    description: "Review material at increasing intervals",
    icon: Repeat,
    difficulty: "Easy",
    timeRequired: "10-20 min daily",
    effectiveness: 5,
    techniques: [
      "Review new material after 1 day, then 3 days, then 1 week",
      "Use apps like Anki or Quizlet for automated scheduling",
      "Create a review calendar with specific dates",
      "Focus more time on difficult concepts",
      "Review before bed and again in the morning"
    ],
    bestFor: ["Long-term retention", "Language learning", "Factual information"],
    tips: [
      "Be consistent with daily reviews",
      "Don't skip sessions even if busy",
      "Adjust intervals based on difficulty"
    ]
  },
  {
    id: "pomodoro",
    title: "Pomodoro Technique",
    description: "Study in focused 25-minute intervals with breaks",
    icon: Timer,
    difficulty: "Easy",
    timeRequired: "25 min work + 5 min break",
    effectiveness: 4,
    techniques: [
      "Set timer for 25 minutes of focused study",
      "Take a 5-minute break after each session",
      "Take a longer 15-30 minute break after 4 sessions",
      "Eliminate all distractions during work time",
      "Track completed sessions for motivation"
    ],
    bestFor: ["Maintaining focus", "Avoiding burnout", "Time management"],
    tips: [
      "Turn off phone notifications",
      "Prepare materials before starting",
      "Use breaks for physical movement"
    ]
  },
  {
    id: "mind-mapping",
    title: "Mind Mapping",
    description: "Create visual diagrams connecting related concepts",
    icon: Eye,
    difficulty: "Medium",
    timeRequired: "30-60 minutes",
    effectiveness: 4,
    techniques: [
      "Start with main topic in the center",
      "Branch out with related subtopics",
      "Use colors and symbols for different categories",
      "Include keywords rather than full sentences",
      "Connect related ideas across different branches"
    ],
    bestFor: ["Visual learners", "Complex topics", "Essay planning"],
    tips: [
      "Use different colors for different subjects",
      "Keep it simple and clear",
      "Review and update regularly"
    ]
  },
  {
    id: "cornell-notes",
    title: "Cornell Note-Taking",
    description: "Structured note-taking system with cues and summary",
    icon: PenTool,
    difficulty: "Medium",
    timeRequired: "During lectures/reading",
    effectiveness: 4,
    techniques: [
      "Divide page into three sections: notes, cues, summary",
      "Take detailed notes in the main section",
      "Add keywords and questions in the cue column",
      "Write a summary at the bottom after class",
      "Review by covering notes and using cues to recall"
    ],
    bestFor: ["Lecture notes", "Textbook reading", "Organized review"],
    tips: [
      "Review notes within 24 hours",
      "Use abbreviations for speed",
      "Focus on main ideas, not every word"
    ]
  },
  {
    id: "group-study",
    title: "Group Study",
    description: "Collaborative learning with peers",
    icon: Users,
    difficulty: "Medium",
    timeRequired: "1-3 hours",
    effectiveness: 4,
    techniques: [
      "Form groups of 3-5 committed students",
      "Assign different topics to each member",
      "Teach your assigned topic to the group",
      "Quiz each other on different subjects",
      "Discuss difficult concepts together"
    ],
    bestFor: ["Complex subjects", "Motivation", "Different perspectives"],
    tips: [
      "Set clear goals for each session",
      "Choose serious study partners",
      "Rotate leadership roles"
    ]
  },
  {
    id: "feynman-technique",
    title: "Feynman Technique",
    description: "Explain concepts in simple terms as if teaching a child",
    icon: Lightbulb,
    difficulty: "Medium",
    timeRequired: "20-40 minutes per concept",
    effectiveness: 5,
    techniques: [
      "Choose a concept you want to understand",
      "Explain it in simple terms without jargon",
      "Identify gaps in your understanding",
      "Go back to source material to fill gaps",
      "Simplify and use analogies"
    ],
    bestFor: ["Deep understanding", "Complex concepts", "Exam preparation"],
    tips: [
      "Use everyday language",
      "Draw diagrams if helpful",
      "Practice with different concepts"
    ]
  },
  {
    id: "practice-testing",
    title: "Practice Testing",
    description: "Regular self-testing with past papers and mock exams",
    icon: FileText,
    difficulty: "Medium",
    timeRequired: "1-3 hours",
    effectiveness: 5,
    techniques: [
      "Use past examination papers",
      "Create your own practice questions",
      "Time yourself under exam conditions",
      "Analyze mistakes and weak areas",
      "Repeat difficult questions multiple times"
    ],
    bestFor: ["Exam preparation", "Identifying weak areas", "Time management"],
    tips: [
      "Simulate real exam conditions",
      "Review answers thoroughly",
      "Focus on question patterns"
    ]
  },
  {
    id: "interleaving",
    title: "Interleaving",
    description: "Mix different topics or subjects in one study session",
    icon: Zap,
    difficulty: "Hard",
    timeRequired: "1-2 hours",
    effectiveness: 4,
    techniques: [
      "Switch between different subjects every 20-30 minutes",
      "Mix problem types within the same subject",
      "Alternate between reading and practice problems",
      "Combine new material with review of old topics",
      "Use different study methods in one session"
    ],
    bestFor: ["Problem-solving skills", "Preventing boredom", "Real-world application"],
    tips: [
      "Start gradually with 2-3 topics",
      "Keep track of what you've covered",
      "Don't switch too frequently"
    ]
  },
  {
    id: "dual-coding",
    title: "Dual Coding",
    description: "Combine visual and verbal information for better retention",
    icon: Eye,
    difficulty: "Medium",
    timeRequired: "30-45 minutes",
    effectiveness: 4,
    techniques: [
      "Create diagrams while reading text",
      "Use both words and images in notes",
      "Draw concept maps with labels",
      "Watch videos while taking written notes",
      "Explain visual information verbally"
    ],
    bestFor: ["Visual and auditory learners", "Complex processes", "Science subjects"],
    tips: [
      "Use colors and symbols consistently",
      "Keep visuals simple and clear",
      "Practice describing images in words"
    ]
  }
]

const studyTips = [
  {
    category: "Environment",
    tips: [
      "Find a quiet, well-lit study space",
      "Keep your study area organized and clutter-free",
      "Use comfortable but not too comfortable seating",
      "Ensure good ventilation and temperature control",
      "Have all necessary materials within reach"
    ]
  },
  {
    category: "Time Management",
    tips: [
      "Create a realistic study schedule",
      "Break large tasks into smaller, manageable chunks",
      "Use a planner or digital calendar",
      "Prioritize subjects based on difficulty and importance",
      "Allow buffer time for unexpected challenges"
    ]
  },
  {
    category: "Health & Wellness",
    tips: [
      "Get 7-9 hours of sleep each night",
      "Take regular breaks to avoid mental fatigue",
      "Stay hydrated and eat nutritious meals",
      "Exercise regularly to improve focus and memory",
      "Practice stress management techniques"
    ]
  },
  {
    category: "Motivation",
    tips: [
      "Set specific, achievable goals",
      "Reward yourself for completing tasks",
      "Track your progress visually",
      "Study with motivated peers",
      "Remember your long-term objectives"
    ]
  }
]

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
            {/* Header Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Study Methods & Tips</h2>
              <p className="text-gray-600 text-lg">
                Discover proven study techniques and strategies to improve your academic performance
              </p>
            </div>

            {/* Study Methods Grid */}
            <section className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Brain className="h-6 w-6 text-blue-600" />
                Study Methods
              </h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {studyMethods.map((method) => {
                  const IconComponent = method.icon
                  return (
                    <Card key={method.id} className="h-full">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <IconComponent className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{method.title}</CardTitle>
                              <CardDescription className="text-sm">
                                {method.description}
                              </CardDescription>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge variant="outline" className="text-xs">
                            {method.difficulty}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {method.timeRequired}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            <Star className="h-3 w-3 mr-1" />
                            {method.effectiveness}/5
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2">How to do it:</h4>
                          <ul className="space-y-1">
                            {method.techniques.slice(0, 3).map((technique, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                                <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                {technique}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-sm mb-2">Best for:</h4>
                          <div className="flex flex-wrap gap-1">
                            {method.bestFor.map((item, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm mb-2">Pro Tips:</h4>
                          <ul className="space-y-1">
                            {method.tips.slice(0, 2).map((tip, index) => (
                              <li key={index} className="text-xs text-gray-600 flex items-start gap-2">
                                <Lightbulb className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </section>

            {/* General Study Tips */}
            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Target className="h-6 w-6 text-green-600" />
                General Study Tips
              </h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {studyTips.map((category, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{category.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {category.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="text-sm text-gray-600 flex items-start gap-2">
                            <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Quick Reference Card */}
            <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  Quick Study Session Planner
                </CardTitle>
                <CardDescription>
                  Use this guide to structure your study sessions effectively
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Before You Start (5 min)</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Set specific goals</li>
                      <li>• Gather all materials</li>
                      <li>• Eliminate distractions</li>
                      <li>• Choose your method</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">During Study (25-50 min)</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Stay focused on one topic</li>
                      <li>• Take notes actively</li>
                      <li>• Test yourself regularly</li>
                      <li>• Ask questions</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">After Study (5-10 min)</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Review what you learned</li>
                      <li>• Plan next session</li>
                      <li>• Take a proper break</li>
                      <li>• Reward yourself</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Chatbot />
      </SidebarInset>
    </>
  )
}
