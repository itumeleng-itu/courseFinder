import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

import UniversitiesClient, { isOpeningDateUpcoming, type UniData } from "@/app/universities/UniversitiesClient"

/**
 * The universities page advertised "Opens: 1 March 2026" in October 2026.
 *
 * Two separate faults produced that. The date came from a hand-maintained
 * table in the component with no freshness check of any kind, and any
 * university missing from that table fell back to a literal "1 April 2026" --
 * a date nobody had verified for that institution at all.
 *
 * Both are the same mistake: telling a learner an application window is
 * coming when we do not know that it is.
 */

const WITS: UniData = {
  id: "wits",
  name: "University of the Witwatersrand",
  shortName: "Wits",
  city: "Johannesburg",
  province: "Gauteng",
  courseCount: 60,
  locationString: "Johannesburg, Gauteng",
}

/** Not a key in the component's table -- this is what used to invent a date. */
const UNLISTED: UniData = {
  id: "some-new-university",
  name: "Some New University",
  shortName: "SNU",
  city: "Polokwane",
  province: "Limpopo",
  courseCount: 0,
  locationString: "Polokwane, Limpopo",
}

const setToday = (iso: string) => {
  jest.useFakeTimers().setSystemTime(new Date(iso))
}

afterEach(() => {
  jest.useRealTimers()
})

describe("isOpeningDateUpcoming", () => {
  beforeEach(() => setToday("2026-10-15T09:00:00+02:00"))

  it("rejects a date that has already passed", () => {
    expect(isOpeningDateUpcoming("1 March 2026")).toBe(false)
  })

  it("accepts a date still to come", () => {
    expect(isOpeningDateUpcoming("1 March 2027")).toBe(true)
  })

  it("accepts today itself, because applications open that morning", () => {
    expect(isOpeningDateUpcoming("15 October 2026")).toBe(true)
  })

  it("rejects a missing date rather than assuming one", () => {
    expect(isOpeningDateUpcoming(undefined)).toBe(false)
    expect(isOpeningDateUpcoming(null)).toBe(false)
    expect(isOpeningDateUpcoming("")).toBe(false)
  })

  it("rejects a date it cannot parse, instead of showing it unchecked", () => {
    expect(isOpeningDateUpcoming("TBA")).toBe(false)
    expect(isOpeningDateUpcoming("when the portal reopens")).toBe(false)
  })
})

describe("the universities page", () => {
  it("says nothing about opening once the cycle's dates are in the past", () => {
    setToday("2026-10-15T09:00:00+02:00")
    render(<UniversitiesClient universities={[WITS]} />)

    expect(screen.queryByText(/Opens:/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/1 March 2026/)).not.toBeInTheDocument()
  })

  it("shows the opening date while it is genuinely still ahead", () => {
    // The row is suppressed, not deleted -- filling in the next cycle's
    // dates must bring it back with no further code change.
    setToday("2026-02-01T09:00:00+02:00")
    render(<UniversitiesClient universities={[WITS]} />)

    expect(screen.getByText(/Opens:\s*1 March 2026/i)).toBeInTheDocument()
  })

  it("invents no date for a university it has no dates for", () => {
    setToday("2026-02-01T09:00:00+02:00")
    render(<UniversitiesClient universities={[UNLISTED]} />)

    expect(screen.queryByText(/Opens:/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/1 April 2026/)).not.toBeInTheDocument()
  })
})
