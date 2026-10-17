import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

import { MaintenanceNotice } from "@/components/maintenance-notice"
import { PROGRAMMES } from "@/lib/qualify/data"

describe("MaintenanceNotice", () => {
  it("tells learners the course data is under maintenance", () => {
    render(<MaintenanceNotice active />)

    const notice = screen.getByRole("status")
    expect(notice).toHaveTextContent(/under maintenance/i)
    expect(notice).toHaveTextContent(/incomplete or temporarily unavailable/i)
  })

  it("points learners to the university's own site before applying", () => {
    render(<MaintenanceNotice active />)

    expect(screen.getByRole("status")).toHaveTextContent(/official website/i)
  })

  it("renders nothing when maintenance is switched off", () => {
    const { container } = render(<MaintenanceNotice active={false} />)

    expect(container).toBeEmptyDOMElement()
  })

  it("is off by default, now the bundled data is verified", () => {
    // The default is the whole point of the flag: every programme shipped
    // carries confidence "verified" and a source document, so a learner must
    // not be told their results may be incomplete. Raising the notice again
    // is a deliberate act (NEXT_PUBLIC_COURSE_DATA_MAINTENANCE=on), not the
    // resting state.
    const { container } = render(<MaintenanceNotice />)

    expect(container).toBeEmptyDOMElement()
  })

  it("only earns that default while no bundled programme is unchecked", () => {
    // The pairing the test above depends on. Taking the notice down is a
    // claim about the data, so if an unchecked programme is ever bundled,
    // this fails and the honest fix is to raise the notice again rather
    // than to delete the assertion.
    //
    // "extracted" is the unchecked state: transcribed from a prospectus
    // and not reconciled against it. One of those and the notice goes
    // back up.
    const unchecked = PROGRAMMES.filter((p: any) => p.confidence === "extracted")
    expect(unchecked.map((p: any) => `${p.institution_id}/${p.qualification_code}`)).toEqual([])

    const sourceless = PROGRAMMES.filter((p: any) => !p.source_doc)
    expect(sourceless.map((p: any) => `${p.institution_id}/${p.qualification_code}`)).toEqual([])
  })

  it("requires every flagged programme to say what is approximate about it", () => {
    // "flagged" is NOT the unchecked state, and this is the distinction
    // the notice turns on. The notice warns that results "may be
    // incomplete or temporarily unavailable"; a flagged record is
    // complete and reconciled, with one value the data model cannot hold
    // exactly.
    //
    // Both current cases are Stellenbosch bars printed at 75%, which is
    // not an NSC band floor: BCom (Mathematical Sciences) Mathematics
    // 75%, and Bachelor of Data Science's First Additional Language 75%.
    // Each matches at level 6 and each carries the printed requirement
    // in selection_notes, so the learner is told the real bar on the
    // record itself rather than through a banner across the whole site.
    //
    // That disclosure is the entire reason this does not raise the
    // notice, so it is asserted rather than assumed: a flagged record
    // with nothing to show the learner fails here.
    const flagged = PROGRAMMES.filter((p: any) => p.confidence === "flagged")

    for (const programme of flagged) {
      expect(programme.selection_notes?.length ?? 0).toBeGreaterThan(0)
    }
  })
})
