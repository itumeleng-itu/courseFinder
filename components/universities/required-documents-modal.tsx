import React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { ClipboardList, X, CheckCircle2, AlertCircle, Info } from "lucide-react"

export function RequiredDocumentsModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2 shadow-sm font-semibold w-full sm:w-auto">
          <ClipboardList className="h-4 w-4" />
          Required Documents
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl w-[95vw] sm:w-[90vw] p-4 sm:p-6">
        <DialogHeader className="border-b pb-3 sm:pb-4">
          <div className="flex items-start sm:items-center justify-between gap-2">
            <DialogTitle className="text-xl sm:text-2xl font-bold flex items-center gap-2 text-left">
              <ClipboardList className="h-5 w-5 sm:h-6 sm:w-6 text-primary shrink-0" />
              Required Documents
            </DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full shrink-0">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </div>
          <DialogDescription className="text-sm sm:text-base pt-2 text-left">
            Ensure you have all the necessary documents ready before starting your university application.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-2 sm:py-4">
          <section className="space-y-2 sm:space-y-3">
            <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2 text-primary">
              <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
              1. Essential Documents for All Applicants
            </h3>
            <ul className="space-y-2 ml-6 sm:ml-7 list-disc text-sm text-foreground/90">
              <li>
                <span className="font-semibold text-foreground">Certified Copy of Identity Document (ID):</span> RSA citizens must submit a certified copy of their ID document or card.
              </li>
              <li>
                <span className="font-semibold text-foreground">Passport:</span> International students must provide a certified copy of their valid passport.
              </li>
              <li>
                <span className="font-semibold text-foreground">School Leaving Results:</span>
                <ul className="mt-1 ml-4 list-[circle] space-y-1">
                  <li><span className="font-medium">Current Matriculants:</span> Final Grade 11 results and/or June/September Grade 12 results.</li>
                  <li><span className="font-medium">Already Matriculated:</span> Certified copy of the National Senior Certificate (NSC) or equivalent (e.g., IEB).</li>
                </ul>
              </li>
              <li>
                <span className="font-semibold text-foreground">Application Fee Payment:</span> Proof of payment of the non-refundable application fee (if applicable), which usually ranges from R100 to R550.
              </li>
            </ul>
          </section>

          <section className="space-y-2 sm:space-y-3">
            <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2 text-primary">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
              2. Specific Requirements
            </h3>
            <ul className="space-y-2 ml-6 sm:ml-7 list-disc text-sm text-foreground/90">
              <li>
                <span className="font-semibold text-foreground">Transfer Students:</span> If transferring from another university, you must provide an official academic transcript (record) and a certificate of conduct (good standing) from that institution.
              </li>
              <li>
                <span className="font-semibold text-foreground">Postgraduate Applicants:</span> Certified copies of all previous university degree certificates and academic transcripts.
              </li>
              <li>
                <span className="font-semibold text-foreground">International Students:</span>
                <ul className="mt-1 ml-4 list-[circle] space-y-1">
                  <li><span className="font-medium">SAQA/USAf Evaluation:</span> Foreign school-leaving certificates must be evaluated by Universities South Africa (USAf). Postgraduate qualifications must be evaluated by the South African Qualifications Authority (SAQA).</li>
                  <li><span className="font-medium">Study Visa:</span> Valid permit for studying in South Africa.</li>
                  <li><span className="font-medium">Medical Insurance:</span> Proof of medical cover with a South African medical scheme.</li>
                </ul>
              </li>
              <li>
                <span className="font-semibold text-foreground">Post-Matric Activity:</span> An affidavit describing your activities post-matric, if you have not been studying recently.
              </li>
            </ul>
          </section>

          <section className="space-y-2 sm:space-y-3">
            <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2 text-primary">
              <Info className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
              3. Important Application Information
            </h3>
            <ul className="space-y-2 ml-6 sm:ml-7 list-disc text-sm text-foreground/90">
              <li>
                <span className="font-semibold text-foreground">Certification:</span> All documents submitted must be certified (e.g., by a Commissioner of Oaths or police station).
              </li>
              <li>
                <span className="font-semibold text-foreground">Deadlines:</span> Most undergraduate applications close around September/October of the year preceding study.
              </li>
              <li>
                <span className="font-semibold text-foreground">Methods:</span> Many universities allow online applications, but some in KwaZulu-Natal use the Central Applications Office (CAO).
              </li>
              <li>
                <span className="font-semibold text-foreground">POPIA Consent:</span> Many universities now require a signed POPIA consent form, particularly for applicants under 18.
              </li>
            </ul>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}
