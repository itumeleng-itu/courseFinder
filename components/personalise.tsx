"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Settings } from "lucide-react"
import { useTheme } from "next-themes"
import * as React from "react"

export function Personalise() {
  const { isMobile } = useSidebar()
  const { theme, setTheme } = useTheme()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-background text-foreground">
                <Settings className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Personalise</span>
                <span className="truncate text-xs">App settings</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Theme
            </DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={theme}
              onValueChange={(val) => setTheme(val as "light" | "dark" | "system")}
            >
              <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>

            <DropdownMenuSeparator />

            <DropdownMenuLabel className="text-xs text-muted-foreground">
              About
            </DropdownMenuLabel>
            <DropdownMenuItem className="whitespace-normal leading-snug text-sm">
              CourseFinder helps you discover South African university courses you
              qualify for based on your NSC subjects and APS. It aggregates
              program requirements, provides APS calculators, and surfaces
              bursary information.
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}