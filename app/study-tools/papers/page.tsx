import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookMarked, FlaskConical, Notebook, Download } from "lucide-react";

export default function PastPapersPage() {
  const subjects = [
    "Mathematics", 
    "Physical Sciences", 
    "Life Sciences", 
    "Geography", 
    "History", 
    "English", 
    "Accounting"
  ];

  const years = ["2023", "2022", "2021", "2020", "2019"];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Past Question Papers</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Select Subject</CardTitle>
            <CardDescription>Choose a subject to view available papers</CardDescription>
          </CardHeader>
          <CardContent>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject.toLowerCase()}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Select Year</CardTitle>
            <CardDescription>Choose examination year</CardDescription>
          </CardHeader>
          <CardContent>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="flashcards" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="flashcards" className="flex items-center gap-2">
            <BookMarked className="h-4 w-4" />
            Flashcards
          </TabsTrigger>
          <TabsTrigger value="quizzes" className="flex items-center gap-2">
            <FlaskConical className="h-4 w-4" />
            Quizzes
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-2">
            <Notebook className="h-4 w-4" />
            Notes
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="flashcards" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Subject Flashcards</CardTitle>
              <CardDescription>Study with interactive flashcards</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Select a subject and year above to view available flashcard sets.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="mr-2">Create New Set</Button>
              <Button>View Available Sets</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="quizzes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Subject Quizzes</CardTitle>
              <CardDescription>Test your knowledge with practice quizzes</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Select a subject and year above to view available quizzes.</p>
            </CardContent>
            <CardFooter>
              <Button>Start Quiz</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Study Notes</CardTitle>
              <CardDescription>Access comprehensive study notes</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Select a subject and year above to view available notes.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="mr-2">Create Notes</Button>
              <Button>View Notes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Download Question Papers</CardTitle>
            <CardDescription>Download past papers for offline study</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Select a subject and year above, then click to download.</p>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}