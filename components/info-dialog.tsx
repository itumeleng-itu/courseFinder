"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

type InfoDialogProps = {
  position?: "center" | "anchor"
}

export function InfoDialog({ position = "center" }: InfoDialogProps) {
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const [open, setOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const [anchorStyle, setAnchorStyle] = useState<React.CSSProperties | undefined>(undefined)

  useLayoutEffect(() => {
    if (!open || position !== "anchor") return
    const trigger = triggerRef.current
    const content = contentRef.current
    if (!trigger) return

    const compute = () => {
      const rect = trigger.getBoundingClientRect()
      const margin = 8
      const viewportW = window.innerWidth
      const viewportH = window.innerHeight
      const contentW = content?.offsetWidth ?? 420
      const contentH = content?.offsetHeight ?? 300

      let top = rect.bottom + margin
      if (top + contentH > viewportH - margin) {
        top = rect.top - contentH - margin
        if (top < margin) top = Math.max(margin, viewportH - contentH - margin)
      }

      let left = rect.left
      const maxLeft = viewportW - contentW - margin
      if (left > maxLeft) left = maxLeft
      if (left < margin) left = margin

      setAnchorStyle({ left, top, transform: "none" })
    }

    compute()
    window.addEventListener("resize", compute)
    window.addEventListener("scroll", compute, true)
    return () => {
      window.removeEventListener("resize", compute)
      window.removeEventListener("scroll", compute, true)
    }
  }, [open, position])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          ref={triggerRef}
          type="button"
          aria-label="POPIA Compliance Information"
          className="inline-flex items-center justify-center rounded-md p-1 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
          title="POPIA Compliance Information"
        >
          {/* ℹ️ info icon using SVG for consistent sizing */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="shrink-0 h-5 w-5"
            aria-hidden="true"
          >
            <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <rect x="9.25" y="8" width="1.5" height="6" rx="0.75" />
            <circle cx="10" cy="5.5" r="1" />
          </svg>
        </button>
      </DialogTrigger>

      <DialogContent
        ref={contentRef}
        className={position === "anchor" ? "left-auto top-auto translate-x-0 translate-y-0" : undefined}
        style={position === "anchor" ? anchorStyle : undefined}
        aria-modal="true"
        aria-labelledby="info-dialog-title"
        aria-describedby="info-dialog-description"
      >
        {/* Top-right close control */}
        <DialogClose asChild>
          <button
            type="button"
            aria-label="Close dialog"
            className="absolute right-3 top-3 rounded-md p-2 text-muted-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </DialogClose>

        <DialogHeader>
          <DialogTitle id="info-dialog-title">POPIA Compliance Information</DialogTitle>
          <DialogDescription id="info-dialog-description">
            Learn where your information is securely stored and processed after entry.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm leading-relaxed break-words">
          <div>
            <p className="font-medium">What data we collect</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Examination number and South African ID number (13 digits).</li>
              <li>Basic usage data for security and service reliability.</li>
            </ul>
          </div>

          <div>
            <p className="font-medium">Where your information is stored and processed</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Your identifiers are transmitted over HTTPS to backend services.</li>
              <li>We use managed infrastructure (e.g., Appwrite) with encryption-at-rest and role-based access controls in the configured region.</li>
              <li>Processing is limited to matching official records, deriving eligibility insights, and generating your results view.</li>
            </ul>
          </div>

          <div>
            <p className="font-medium">Usage and retention</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Identifiers are retained only as long as necessary to provide services and comply with legal requirements.</li>
              <li>We do not sell or share personal data with third parties for marketing purposes.</li>
              <li>Access is logged and monitored to prevent misuse and ensure compliance.</li>
            </ul>
          </div>

          <div>
            <p className="font-medium">Your POPIA rights</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Access, correct, or request deletion of your data where legally permissible.</li>
              <li>Withdraw consent for specific processing activities.</li>
              <li>Contact us for our full privacy policy.</li>
            </ul>
          </div>

          <div>
            <p className="font-medium">Contact</p>
            <p className="mt-2 text-muted-foreground">
              For privacy queries or to exercise your rights, contact support via the app or email
              <a href="mailto:privacy@coursefinder.local" className="ml-1 underline underline-offset-2 hover:text-foreground">privacy@coursefinder.local</a>.
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <DialogClose asChild>
            <Button variant="default">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}