"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BellIcon, Calendar, GraduationCap, Building } from "lucide-react";
import { CalendarNotification } from "@/lib/calendar-events";

type RegularNotification = {
  id: string;
  avatar: string;
  fallback: string;
  text: string;
  time: string;
  type?: "regular";
};

type Notification = RegularNotification | CalendarNotification;

export function NotificationsPopover({
  notifications,
}: {
  notifications: Notification[];
}) {
  const getEventTypeIcon = (eventType: CalendarNotification["eventType"]) => {
    switch (eventType) {
      case "public":
        return <Building className="size-3" />;
      case "academic":
        return <GraduationCap className="size-3" />;
      case "exam":
        return <Calendar className="size-3" />;
      default:
        return <Calendar className="size-3" />;
    }
  };

  const getEventTypeBadgeColor = (eventType: CalendarNotification["eventType"]) => {
    switch (eventType) {
      case "public":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "academic":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "exam":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full relative"
          aria-label="Open notifications"
        >
          <BellIcon className="size-5" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 size-4 bg-transparent text-white text-xs rounded-full flex items-center justify-center">
              {notifications.length > 9 ? "9+" : notifications.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="w-80 my-6">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <DropdownMenuItem className="justify-center text-sm text-muted-foreground">
            No notifications
          </DropdownMenuItem>
        ) : (
          notifications.map((notification) => {
            const isCalendarEvent = notification.type === "calendar";
            const calendarNotification = notification as CalendarNotification;
            
            return (
              <DropdownMenuItem key={notification.id} className="flex items-start gap-3 p-3">
                <Avatar className="size-8">
                  <AvatarImage src={notification.avatar} alt="Avatar" />
                  <AvatarFallback className="text-xs">
                    {notification.fallback}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1 gap-1">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-medium leading-tight">
                      {notification.text}
                    </span>
                    {isCalendarEvent && (
                      <Badge 
                        variant="secondary" 
                        className={`text-xs px-1.5 py-0.5 flex items-center gap-1 ${getEventTypeBadgeColor(calendarNotification.eventType)}`}
                      >
                        {getEventTypeIcon(calendarNotification.eventType)}
                        {calendarNotification.eventType}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {notification.time}
                  </span>
                </div>
              </DropdownMenuItem>
            );
          })
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
