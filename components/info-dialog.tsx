"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

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

      // Prefer placing below the icon; if not enough space, place above.
      let top = rect.bottom + margin
      if (top + contentH > viewportH - margin) {
        top = rect.top - contentH - margin
        if (top < margin) {
          top = Math.max(margin, viewportH - contentH - margin)
        }
      }

      // Keep within viewport horizontally.
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
          <svg
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
            data-xmlns-xlink=" `http://www.w3.org/1999/xlink` "
            data-xmlns=" `http://www.w3.org/2000/svg` "
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="shrink-0 h-5 w-5"
            aria-hidden="true"
          >
            <path d="M9.72821 2.87934C10.0318 2.10869 10.9028 1.72933 11.6735 2.03266L14.4655 3.13226C15.236 3.43593 15.6145 4.30697 15.3112 5.07758L11.3903 15.0307C11.2954 15.2717 11.1394 15.4835 10.9391 15.6459L10.8513 15.7123L7.7077 17.8979C7.29581 18.1843 6.73463 17.9917 6.57294 17.5356L6.54657 17.4409L5.737 13.6987C5.67447 13.4092 5.69977 13.107 5.80829 12.8315L9.72821 2.87934ZM6.73798 13.1987C6.70201 13.2903 6.69385 13.3906 6.71454 13.4868L7.44501 16.8627L10.28 14.892L10.3376 14.8452C10.3909 14.7949 10.4325 14.7332 10.4597 14.6645L13.0974 7.96723L9.37567 6.50141L6.73798 13.1987ZM11.3073 2.96332C11.0504 2.86217 10.7601 2.98864 10.6589 3.24555L9.74188 5.57074L13.4636 7.03754L14.3806 4.71137C14.4817 4.45445 14.3552 4.16413 14.0983 4.06293L11.3073 2.96332Z" fill="#C2C0B6"></path>
          </svg>
        </button>
      </DialogTrigger>

      <DialogContent
        ref={contentRef}
        className={position === "anchor" ? "!left-auto !top-auto !translate-x-0 !translate-y-0" : ""}
        style={position === "anchor" ? anchorStyle : undefined}
      >
        <DialogHeader>
          <DialogTitle>POPIA Compliance Information</DialogTitle>
          <DialogDescription>
            Learn where your information is securely stored and processed after entry.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm leading-relaxed">
          <div>
            <p className="font-medium">Where your information is stored and processed</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Your identifiers (ID number and exam number) are transmitted over HTTPS to our backend services.</li>
              <li>Processing is limited to matching official records, deriving eligibility insights, and generating your results view.</li>
            </ul>
          </div>

          <div>
            <p className="font-medium">Retention and protection</p>
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

        </div>

        <div className="mt-4 flex justify-end">
          <DialogClose asChild>
            <Button variant="default">Got it</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
