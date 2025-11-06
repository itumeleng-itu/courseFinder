"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Settings, Sun, Moon, Monitor, ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"
import * as React from "react"

export function Personalise() {
  const { isMobile } = useSidebar()
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const getThemeIcon = () => {
    const current = mounted ? (resolvedTheme ?? theme) : "system"
    switch (current) {
      case "light":
        return <Sun className="size-3" />
      case "dark":
        return <Moon className="size-3" />
      default:
        return <Monitor className="size-3" />
    }
  }

  const getThemeLabel = () => {
    const current = mounted ? (resolvedTheme ?? theme) : "system"
    switch (current) {
      case "light":
        return "Light"
      case "dark":
        return "Dark"
      default:
        return "System"
    }
  }

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
                <span className="truncate text-xs flex items-center gap-1">
                  {getThemeIcon()}
                  {getThemeLabel()} theme
                </span>
              </div>
              <ChevronDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Theme Preferences
            </DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={mounted ? (theme ?? "system") : "system"}
              onValueChange={(val) => setTheme(val as "light" | "dark" | "system")}
            >
              <DropdownMenuRadioItem value="system" className="flex items-center gap-2">
                <Monitor className="size-4" />
                System
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="light" className="flex items-center gap-2">
                <Sun className="size-4" />
                Light
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dark" className="flex items-center gap-2">
                <Moon className="size-4" />
                Dark
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
