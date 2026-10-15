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

  it("only earns that default while every bundled programme is verified", () => {
    // The pairing the test above depends on. Taking the notice down is a
    // claim about the data, so if an unverified programme is ever bundled,
    // this fails and the honest fix is to raise the notice again rather
    // than to delete the assertion.
    const unverified = PROGRAMMES.filter((p: any) => p.confidence !== "verified")
    expect(unverified.map((p: any) => `${p.institution_id}/${p.qualification_code}`)).toEqual([])

    const sourceless = PROGRAMMES.filter((p: any) => !p.source_doc)
    expect(sourceless.map((p: any) => `${p.institution_id}/${p.qualification_code}`)).toEqual([])
  })
})
