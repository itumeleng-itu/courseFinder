import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

import UniversitiesClient, { cycleIsHistorical, isOpeningDateUpcoming, type UniData } from "@/app/universities/UniversitiesClient"

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


/**
 * The closing dates go the same way the opening dates went.
 *
 * Within a cycle, striking through a passed deadline and marking it
 * "(Closed)" is correct and useful. The failure comes later: these dates
 * are hand-typed for one intake and never expire, so once the cycle is
 * over every one of the 26 cards reads "Closed" and the page tells a
 * matriculant that every university in South Africa is shut. What is
 * actually true is that next cycle's dates have not been entered.
 */
describe("a cycle that has ended", () => {
  it("is not detected while any application window is still open", () => {
    setToday("2026-10-17T09:00:00+02:00")
    // UMP closes 30 November 2026, so the 2027 cycle is still running.
    expect(cycleIsHistorical()).toBe(false)
  })

  it("is detected once every window has passed", () => {
    setToday("2027-03-01T09:00:00+02:00")
    expect(cycleIsHistorical()).toBe(true)
  })

  it("keeps saying Closed while the cycle is live", () => {
    setToday("2026-10-17T09:00:00+02:00")
    render(<UniversitiesClient universities={[WITS]} />)

    // Wits' windows closed in June and September 2026, and that is real.
    expect(screen.getAllByText(/Closed/i).length).toBeGreaterThan(0)
    expect(screen.queryByText(/last intake/i)).not.toBeInTheDocument()
  })

  it("stops saying Closed once the whole table is historical", () => {
    setToday("2027-03-01T09:00:00+02:00")
    render(<UniversitiesClient universities={[WITS]} />)

    expect(screen.queryByText(/\(Closed\)/i)).not.toBeInTheDocument()
    expect(screen.getByRole("status")).toHaveTextContent(/last intake/i)
    expect(screen.getByRole("status")).toHaveTextContent(/not that applications are shut everywhere/i)
  })

  it("still shows the dates, labelled as the previous intake", () => {
    // Suppressed, not deleted -- last year's dates are a useful guide to
    // roughly when the next ones land.
    setToday("2027-03-01T09:00:00+02:00")
    render(<UniversitiesClient universities={[WITS]} />)

    expect(screen.getByText(/Closing Dates \(last intake\)/i)).toBeInTheDocument()
    expect(screen.getByText(/30 September 2026/)).toBeInTheDocument()
  })
})
