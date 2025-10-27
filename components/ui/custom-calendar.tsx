'use client';

import React from 'react';
import { CalendarProvider, CalendarHeader, CalendarBody, CalendarDate, CalendarDatePagination, type Feature } from '@/components/ui/shadcn-io/calendar';
import { cn } from '@/lib/utils';

export type CalendarEvent = {
  id: string;
  name: string;
  startAt: Date;
  endAt: Date;
  status: {
    id: string;
    name: string;
    color: string;
  };
};

export type CalendarProps = {
  className?: string;
  events: Array<CalendarEvent>;
  onEventClick?: (event: CalendarEvent) => void;
  onDateClick?: (date: Date) => void;
};

export function CustomCalendar({ className, events, onEventClick, onDateClick }: CalendarProps) {
  return (
    <CalendarProvider className={cn('border rounded-md p-4', className)}>
      <div className="flex items-center justify-between mb-4">
        <CalendarDate>
          <CalendarDatePagination />
        </CalendarDate>
      </div>
      <CalendarHeader />
      <CalendarBody 
        features={events as unknown as Feature[]}
        children={({ feature }) => {
          const event = feature as unknown as CalendarEvent;
          return (
            <div 
              className="cursor-pointer hover:opacity-80"
              onClick={() => onEventClick?.(event)}
            >
              <div
                className="flex items-center gap-2"
              >
                <div
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: event.status.color }}
                />
                <span className="truncate text-xs">{event.name}</span>
              </div>
            </div>
          );
        }}
      />
    </CalendarProvider>
  );
}