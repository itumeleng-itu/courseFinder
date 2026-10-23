import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

import {
  UpgradeRecommendation,
  THIN_RESULTS_THRESHOLD,
} from "@/components/find-course/upgrade-recommendation"

/**
 * The rewrite route is the only thing this page can offer a learner
 * whose marks do not reach what they want. It used to appear only
 * below five matches, which meant a learner with six — still almost
 * no choice — was shown nothing, and the button that did appear went
 * nowhere.
 */

describe("the second-chance panel", () => {
  it("appears for a learner with no options at all", () => {
    render(<UpgradeRecommendation nscResult={null} qualifiedCount={0} />)

    expect(screen.getByText(/second chance could widen this list/i)).toBeInTheDocument()
    expect(
      screen.getByText(/do not yet meet the requirements for any programme/i),
    ).toBeInTheDocument()
  })

  it("appears for a learner just under the threshold", () => {
    render(<UpgradeRecommendation nscResult={null} qualifiedCount={THIN_RESULTS_THRESHOLD - 1} />)

    expect(screen.getByText(/second chance could widen this list/i)).toBeInTheDocument()
  })

  it("still appears at six, which the old threshold of five missed", () => {
    render(<UpgradeRecommendation nscResult={null} qualifiedCount={6} />)

    expect(screen.getByText(/second chance could widen this list/i)).toBeInTheDocument()
  })

  it("stays out of the way once the learner has a real choice", () => {
    const { container } = render(
      <UpgradeRecommendation nscResult={null} qualifiedCount={THIN_RESULTS_THRESHOLD} />,
    )

    expect(container).toBeEmptyDOMElement()
  })

  it("counts programmes in the singular when there is one", () => {
    render(<UpgradeRecommendation nscResult={null} qualifiedCount={1} />)

    expect(screen.getByText(/qualify for 1 programme right now/i)).toBeInTheDocument()
  })

  it("links to the Department of Basic Education, not nowhere", () => {
    // The previous button had no href and no handler at all: it looked
    // like the way out and did nothing when pressed.
    render(<UpgradeRecommendation nscResult={null} qualifiedCount={2} />)

    const link = screen.getByRole("link", { name: /second chance matric programme/i })
    expect(link).toHaveAttribute("href", expect.stringContaining("education.gov.za"))
    expect(link).toHaveAttribute("target", "_blank")
  })
})
