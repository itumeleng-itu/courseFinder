import "@testing-library/jest-dom"
import { render, screen, within } from "@testing-library/react"

import { CampusList } from "@/components/universities/campus-list"
import { institutionCampusDetail, institutionCampuses } from "@/lib/campuses"

/**
 * The campus block on a university card, and the page it leads to.
 *
 * The card used to hide everything past two campuses behind a "Show N
 * more" expander. That pushed every card below it down the list when
 * opened, and it had nowhere to put the thing a learner wants next --
 * which programmes are actually taught there. TUT's Pretoria campus
 * alone has 69.
 */

describe("the campus block on a university card", () => {
  const campuses = institutionCampuses("tut")

  it("shows the first two campuses and links to the rest", () => {
    render(<CampusList campuses={campuses} universityId="tut" />)

    expect(screen.getByText("Pretoria Campus")).toBeInTheDocument()
    expect(screen.getByText("Arcadia Campus")).toBeInTheDocument()
    // The remaining eight live on the university's own page, not in
    // the card.
    expect(screen.queryByText("Polokwane Campus")).not.toBeInTheDocument()
  })

  it("sends the learner to the university page rather than expanding in place", () => {
    render(<CampusList campuses={campuses} universityId="tut" />)

    const link = screen.getByRole("link", { name: /view all \d+ campuses/i })
    expect(link).toHaveAttribute("href", "/universities/tut")
    // The old expander was a button that revealed the rest inline.
    expect(screen.queryByRole("button", { name: /show \d+ more/i })).not.toBeInTheDocument()
  })

  it("still offers the page for a university with a single campus", () => {
    render(<CampusList campuses={institutionCampuses("su")} universityId="su" />)

    expect(screen.getByText(/^Campus$/)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /view campus details/i })).toHaveAttribute(
      "href",
      "/universities/su",
    )
  })

  it("renders nothing when the source carries no campus data", () => {
    // Wits ships programmes with no campus at all. An empty
    // "Campuses" heading would read as though it had none.
    const { container } = render(
      <CampusList campuses={institutionCampuses("wits")} universityId="wits" />,
    )

    expect(container).toBeEmptyDOMElement()
  })
})

describe("the data behind a university page", () => {
  it("lists every programme taught on each campus", () => {
    for (const campus of institutionCampusDetail("tut")) {
      expect(campus.programmes).toHaveLength(campus.programmeCount)
    }
  })

  it("carries the regional campuses the card cannot show", () => {
    const names = institutionCampusDetail("tut").map((c) => c.name)

    expect(names).toEqual(expect.arrayContaining([
      "Polokwane Campus",
      "Mbombela Campus",
      "eMalahleni Campus",
      "Ga-Rankuwa Campus",
    ]))
  })

  it("names the actual programmes, not just a count", () => {
    const polokwane = institutionCampusDetail("tut").find((c) => c.name === "Polokwane Campus")!

    expect(polokwane.programmes.length).toBeGreaterThan(0)
    expect(polokwane.programmes.map((p) => p.name)).toContain("Dip (Accounting)")
    for (const programme of polokwane.programmes) {
      expect(programme.name).toBeTruthy()
      expect(programme.code).toBeTruthy()
    }
  })

  it("sorts programmes alphabetically so a long list can be scanned", () => {
    const pretoria = institutionCampusDetail("tut").find((c) => c.name === "Pretoria Campus")!
    const names = pretoria.programmes.map((p) => p.name)

    expect([...names].sort((a, b) => a.localeCompare(b))).toEqual(names)
  })

  it("returns nothing for an institution with no programme data", () => {
    expect(institutionCampusDetail("uct")).toEqual([])
  })
})
