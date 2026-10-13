/**
 * The question the whole pipeline exists to answer: does a learner who
 * enters their marks end up looking at real Wits courses on screen?
 *
 * So this renders the REAL CourseMatchCard against a REAL API on port
 * 8099 -- no mocked payloads -- and asserts on the text a learner would
 * read. Everything upstream of the card (extraction, seeds, export,
 * qualify) is covered elsewhere; what no other test can see is whether
 * the courses survive the last few inches to the screen.
 *
 * Needs a coursefind-data API on port 8099. Override with
 * LIVE_QUALIFY_API_URL.
 */
import * as http from "http"
// fireEvent rather than user-event: that package is not a dependency
// here, and a collapsible trigger needs nothing it adds.
import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import { CourseMatchCard } from "@/components/find-course/course-match-card"
import type { CourseMatch } from "@/app/find-course/types"
import { clearProgrammeCourseCache } from "@/hooks/use-programme-courses"

const API = process.env.LIVE_QUALIFY_API_URL ?? "http://127.0.0.1:8099"
const realFetch = global.fetch

function nodeFetch(url: string, init?: any): Promise<any> {
  const t = new URL(url)
  return new Promise((res, rej) => {
    const r = http.request(
      { hostname: t.hostname, port: t.port, path: t.pathname + t.search,
        method: init?.method ?? "GET", headers: init?.headers ?? {} },
      (x) => { let d = ""
               x.on("data", (c) => (d += c))
               x.on("end", () => res({ ok: (x.statusCode ?? 500) < 400,
                                       status: x.statusCode,
                                       json: async () => JSON.parse(d),
                                       text: async () => d })) },
    )
    r.on("error", rej)
    if (init?.body) r.write(init.body)
    r.end()
  })
}

/** Stands in for the Next.js proxy route: same paths the browser would
 * request, forwarded to the real API. Wrapped in jest.fn so a test can
 * assert that NOTHING was requested, which is the whole point of
 * fetching lazily -- a real transport would otherwise give no way to
 * tell "not fetched" from "fetched and empty". */
const requests: string[] = []
beforeAll(() => {
  global.fetch = jest.fn((input: any, init?: any) => {
    const url = typeof input === "string" ? input : input.url
    requests.push(url)
    const m = url.match(/^\/api\/programmes\/([^/]+)\/([^/?]+)\/?(\?.*)?$/)
    if (m) return nodeFetch(`${API}/v1/programmes/${m[1]}/${m[2]}${m[3] ?? ""}`, init)
    return nodeFetch(url, init)
  }) as any
})
afterAll(() => { global.fetch = realFetch })
beforeEach(() => { clearProgrammeCourseCache(); requests.length = 0 })

function match(code: string, name: string, apiBacked = true): CourseMatch {
  return {
    course: { id: code, name, apsMin: 42 },
    university: { id: "wits", name: "University of the Witwatersrand",
                  shortName: "Wits", location: "", website: "", courses: [] },
    meetsRequirements: true,
    missingRequirements: [],
    metRequirements: ["APS 49 (required 42)"],
    apiBacked,
  }
}

describe("a learner looking at a Wits result card", () => {
  it("shows no course section until they ask for it", async () => {
    render(<CourseMatchCard match={match("FBA00", "Bachelor of Architectural Studies")} index={0} />)

    expect(screen.getByText(/what you'd study/i)).toBeInTheDocument()
    // The trigger is there; the courses are neither fetched nor shown.
    // A results page can carry ~90 of these cards, so fetching on mount
    // would mean ~90 requests for a learner who opens two.
    expect(screen.queryByText("Applied Mathematics")).not.toBeInTheDocument()
    expect(requests).toEqual([])
  })

  it("shows the real first-year courses when they open it", async () => {
    render(<CourseMatchCard match={match("FBA00", "Bachelor of Architectural Studies")} index={0} />)

    fireEvent.click(screen.getByText(/what you'd study/i))

    // Printed on prospectus page 70, under FIRST YEAR.
    await waitFor(() => expect(screen.getByText("Applied Mathematics")).toBeInTheDocument())
    expect(screen.getByText("Architectural Design and Theory I")).toBeInTheDocument()
    expect(screen.getByText(/First Year/i)).toBeInTheDocument()
    expect(screen.getByText(/Third Year/i)).toBeInTheDocument()
    expect(screen.getByText(/p70/)).toBeInTheDocument()
  })

  it("makes the learner pick a major when six share the degree", async () => {
    // SBA11's six majors each have their own curriculum. Showing them
    // merged would list "Introductory Life Sciences" six times.
    render(<CourseMatchCard match={match("SBA11", "BSc in the field of Biological Sciences")} index={0} />)

    fireEvent.click(screen.getByText(/what you'd study/i))
    await waitFor(() => expect(screen.getByText(/6 majors share this degree/i)).toBeInTheDocument())

    const first = screen.getByRole("button", { name: "Applied Ecology and Global Change" })
    const other = screen.getByRole("button", { name: "Microbiology and Biotechnology" })
    expect(first).toHaveAttribute("aria-pressed", "true")
    expect(other).toHaveAttribute("aria-pressed", "false")
    expect(screen.getByText(/p113/)).toBeInTheDocument()

    fireEvent.click(other)

    // The page citation follows the selected major, so the courses on
    // screen are that major's and are checkable against its own page.
    await waitFor(() => expect(screen.getByText(/p118/)).toBeInTheDocument())
    expect(other).toHaveAttribute("aria-pressed", "true")
  })

  it("renders an either/or requirement as one choice, not two courses", async () => {
    render(<CourseMatchCard match={match("CBA10", "BCom in Information Systems")} index={0} />)

    fireEvent.click(screen.getByText(/what you'd study/i))
    await waitFor(() => expect(screen.getByText(/First Year/i)).toBeInTheDocument())

    const choices = screen.queryAllByText(/^One of: /)
    for (const c of choices) {
      // A choice must read as one line offering alternatives, never as
      // separate compulsory courses.
      expect(c.parentElement?.textContent).toMatch(/ or /)
    }
  })

  it("says the outline is not published, rather than failing", async () => {
    // Prospectus page 89 prints requirements and careers for the BA and
    // no course outline at all.
    render(<CourseMatchCard match={match("ABA00", "Bachelor of Arts")} index={0} />)

    fireEvent.click(screen.getByText(/what you'd study/i))

    await waitFor(() =>
      expect(screen.getByText(/does not publish a course outline/i)).toBeInTheDocument())
    expect(screen.queryByText(/could not be loaded/i)).not.toBeInTheDocument()
  })

  it("offers nothing to open for a locally-sourced match", async () => {
    // Those ids are not qualification_codes; asking the API for their
    // courses would 404 on every card.
    render(<CourseMatchCard match={match("uj-bcom-acc", "BCom Accounting", false)} index={0} />)

    expect(screen.queryByText(/what you'd study/i)).not.toBeInTheDocument()
  })
})
