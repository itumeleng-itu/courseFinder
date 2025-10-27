"use client"

import React, { useState, useEffect } from 'react';
import { CustomCalendar } from "@/components/ui/custom-calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CalendarIcon, Plus, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { fetchSouthAfricanHolidays, getSouthAfricanHolidaysFallback, Holiday, validateHolidays } from "@/lib/services/holiday-service";
import { fetchExamDates, ExamEvent } from "@/lib/services/exam-service";

export default function CalendarPage() {
  const [examDates, setExamDates] = useState<Array<{id: number, date: Date, subject: string}>>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // UI state for selection and month navigation
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  
  const googleCalendarLink = "https://share.google/khFit9EVDBqCI6Eur";
  
  useEffect(() => {
    const fetchCalendarData = async () => {
      setIsLoading(true);
      setError("");
      
      try {
        // Fetch both holidays and exam dates
        const currentYear = new Date().getFullYear();
        
        // Fetch holidays from API
        const holidaysData = await fetchSouthAfricanHolidays(currentYear);
        const validation = validateHolidays(holidaysData, currentYear);
        if (!validation.valid) {
          console.warn("Holiday dataset incomplete, using fallback:", validation.missing);
        }
        setHolidays(validation.valid ? holidaysData : getSouthAfricanHolidaysFallback(currentYear));
        
        // Fetch exam dates from API
        const examData = await fetchExamDates();
        
        // Convert exam data to the format expected by the component
        setExamDates(examData.map((exam, index) => ({
          id: parseInt(exam.id),
          date: exam.date,
          subject: exam.subject
        })));
      } catch (err) {
        console.error("Failed to fetch calendar data:", err);
        setError("Failed to load calendar data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCalendarData();
  }, []);

  // Function to highlight dates with exams
  const isDayWithExam = (date: Date) => {
    return examDates.some(
      (examDate) => 
        examDate.date.getDate() === date.getDate() && 
        examDate.date.getMonth() === date.getMonth() && 
        examDate.date.getFullYear() === date.getFullYear()
    );
  };

  // Helper: compare two dates for same day
  const sameDay = (a: Date, b: Date) => (
    a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()
  );

  // Get events for a given date
  const getEventsForDate = (date: Date) => examDates.filter(e => sameDay(e.date, date));

  // Helper function to determine color based on subject
  const subjectColor = (subject: string) => {
    const subjectLower = subject.toLowerCase();
    if (subjectLower.includes('math')) return 'blue';
    if (subjectLower.includes('science') || subjectLower.includes('physics') || subjectLower.includes('chemistry')) return 'green';
    if (subjectLower.includes('english') || subjectLower.includes('language')) return 'purple';
    if (subjectLower.includes('history')) return 'amber';
    if (subjectLower.includes('geography')) return 'emerald';
    if (subjectLower.includes('life')) return 'lime';
    return 'gray';
  };

  // No longer need the custom DayContent component as the shadcn calendar handles this

  // Calculate events for the current month (both exams and holidays)
  const eventsThisMonth = examDates.filter(e => e.date.getMonth() === currentMonth.getMonth() && e.date.getFullYear() === currentMonth.getFullYear()).length + 
    holidays.filter(h => {
      const date = new Date(h.date);
      return date.getMonth() === currentMonth.getMonth() && date.getFullYear() === currentMonth.getFullYear();
    }).length;
  const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

  // Add/Edit event modal state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<{ id: number; subject: string; date: Date } | null>(null);
  const [formSubject, setFormSubject] = useState("");
  const [formDate, setFormDate] = useState<string>("");
  const [viewingHoliday, setViewingHoliday] = useState<Holiday | null>(null);

  const toInputDate = (d: Date) => d.toISOString().slice(0, 10);

  const handleSaveEvent = () => {
    const [y, m, dd] = formDate.split("-").map(Number);
    const d = new Date(y, m - 1, dd);
    if (!formSubject.trim() || isNaN(d.getTime())) {
      return; // basic validation
    }
    setExamDates(prev => {
      if (editingEvent) {
        return prev.map(e => (e.id === editingEvent.id ? { ...e, subject: formSubject, date: d } : e));
      }
      const nextId = prev.length ? Math.max(...prev.map(e => e.id)) + 1 : 1;
      return [...prev, { id: nextId, subject: formSubject, date: d }];
    });
    setDialogOpen(false);
    setEditingEvent(null);
  };

  const handleDeleteEvent = () => {
    if (editingEvent) {
      setExamDates(prev => prev.filter(e => e.id !== editingEvent.id));
    }
    setDialogOpen(false);
    setEditingEvent(null);
  };
  
  // Prepare combined events for the calendar
  const calendarEvents = [
    // Add exam dates
    ...examDates.map(exam => ({
      id: exam.id.toString(),
      name: exam.subject,
      startAt: exam.date,
      endAt: exam.date,
      status: {
        id: exam.id.toString(),
        name: exam.subject,
        color: subjectColor(exam.subject).replace('bg-', '')
      }
    })),
    // Add holidays (not editable)
    ...holidays.map(holiday => ({
      id: `holiday-${holiday.date}`,
      name: holiday.name,
      startAt: new Date(holiday.date),
      endAt: new Date(holiday.date),
      status: {
        id: `holiday-${holiday.date}`,
        name: 'Holiday',
        color: 'red'
      }
    }))
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Examination Calendar</h1>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
            <span className="text-xs font-bold uppercase">{(selectedDay ?? currentMonth).toLocaleString('en-US', { month: 'short' })}</span>
            <span className="text-xl font-semibold">{(selectedDay ?? new Date()).getDate()}</span>
          </div>
          <div className="text-xl font-semibold">
             {currentMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
           </div>
           <Badge variant="secondary" className="text-xs">{eventsThisMonth} events</Badge>
           <div className="flex items-center gap-2 ml-2">
             <Button variant="outline" size="icon" onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}>
               <ChevronLeft className="h-4 w-4" />
             </Button>
             <Button variant="outline" size="icon" onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}>
               <ChevronRight className="h-4 w-4" />
             </Button>
           </div>
           <div className="ml-4 text-sm text-muted-foreground">
             {monthStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - {monthEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
           </div>
         </div>
         <div className="flex items-center gap-3">
          <a 
            href={googleCalendarLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
          >
            Open in Google Calendar
            <ExternalLink className="h-3 w-3" />
          </a>
          <Button className="gap-2" onClick={() => {
            setEditingEvent(null);
            setFormSubject("");
            const d = selectedDay ?? new Date();
            setFormDate(d.toISOString().slice(0,10));
            setDialogOpen(true);
          }}>
            <Plus className="h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="w-full h-[calc(100vh-12rem)]">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle>Exam Schedule</CardTitle>
              <CardDescription>Track your upcoming examination dates</CardDescription>
            </CardHeader>
            <CardContent className="h-[calc(100%-5rem)]">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <CustomCalendar
                  className="w-full h-full"
                  events={calendarEvents}
                  onEventClick={(event) => {
                    if (event.id.startsWith('holiday-')) {
                      // Find the holiday
                      const holidayDate = event.id.replace('holiday-', '');
                      const holiday = holidays.find(h => h.date === holidayDate);
                      if (holiday) {
                        setViewingHoliday(holiday);
                        setDialogOpen(true);
                      }
                    } else {
                      const examEvent = examDates.find(e => e.id.toString() === event.id);
                      if (examEvent) {
                        setEditingEvent(examEvent);
                        setFormSubject(examEvent.subject);
                        setFormDate(toInputDate(examEvent.date));
                        setDialogOpen(true);
                      }
                    }
                  }}
                  onDateClick={(date) => setSelectedDay(date)}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingEvent ? "Edit Event" : "Add Event"}</DialogTitle>
            <DialogDescription>Events appear directly on the calendar grid.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="event-subject">Subject</Label>
              <Input id="event-subject" value={formSubject} onChange={(e) => setFormSubject(e.target.value)} placeholder="e.g., Mathematics" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="event-date">Date</Label>
              <Input id="event-date" type="date" value={formDate} onChange={(e) => setFormDate(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            {editingEvent && (
              <Button variant="destructive" onClick={handleDeleteEvent}>Delete</Button>
            )}
            <Button onClick={handleSaveEvent}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}