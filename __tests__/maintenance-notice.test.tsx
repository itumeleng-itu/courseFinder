import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

import { MaintenanceNotice } from "@/components/maintenance-notice"

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

  it("is on by default", () => {
    render(<MaintenanceNotice />)

    expect(screen.getByRole("status")).toBeInTheDocument()
  })
})
