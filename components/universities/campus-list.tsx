"use client"

import React from "react"
import { Building2, ChevronDown } from "lucide-react"
import type { CampusOffering } from "@/lib/campuses"

/**
 * The campuses of one university and what each one teaches.
 *
 * Renders nothing when the list is empty. Several institutions in the
 * directory have no programme data behind them yet, and Wits ships
 * programmes with no campus on them at all — in both cases the honest
 * output is silence, not an empty "Campuses" heading that reads as
 * though the university has none.
 *
 * Faculties are capped at four per campus with a count for the rest,
 * because a learner scanning twenty-six cards wants to know whether
 * their field is on that campus, not to read a full faculty register.
 */
export function CampusList({ campuses }: { campuses: CampusOffering[] }) {
  const [expanded, setExpanded] = React.useState(false)

  if (campuses.length === 0) return null

  const single = campuses.length === 1
  const shown = expanded || single ? campuses : campuses.slice(0, 2)
  const hidden = campuses.length - shown.length

  return (
    <div className="rounded-md border bg-muted/30 p-3 space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {single ? "Campus" : `Campuses (${campuses.length})`}
      </p>

      {shown.map((campus) => (
        <div key={campus.name} className="space-y-1">
          <div className="flex items-start justify-between gap-3">
            <span className="flex items-center gap-1.5 text-sm font-medium leading-snug">
              <Building2 className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
              {campus.name}
            </span>
            <span className="text-xs text-muted-foreground shrink-0">
              {campus.programmeCount} {campus.programmeCount === 1 ? "programme" : "programmes"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed pl-5">
            {campus.faculties.slice(0, 4).map((f) => f.name).join(" · ")}
            {campus.faculties.length > 4 && ` · +${campus.faculties.length - 4} more`}
          </p>
        </div>
      ))}

      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          Show {hidden} more {hidden === 1 ? "campus" : "campuses"}
          <ChevronDown className="w-3 h-3" />
        </button>
      )}
    </div>
  )
}
