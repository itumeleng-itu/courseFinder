/**
 * @jest-environment node
 */
import { GET } from "@/app/api/qualify/meta/route"

function mockUpstream(response: { ok?: boolean; status?: number; jsonBody: unknown }) {
  ;(global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: response.ok ?? true,
    status: response.status ?? 200,
    json: async () => response.jsonBody,
  })
}

describe("GET /api/qualify/meta (proxy to coursefind-data's /v1/meta)", () => {
  it("forwards to coursefind-data's /v1/meta", async () => {
    mockUpstream({ jsonBody: { institutions: { uj: [2027] } } })

    await GET()

    const [url] = (global.fetch as jest.Mock).mock.calls[0]
    expect(url).toMatch(/\/v1\/meta$/)
  })

  it("returns the upstream JSON body verbatim on success", async () => {
    const upstreamBody = { data_version: "v1", academic_years: [2027], institutions: { uj: [2027] }, programme_count: 29 }
    mockUpstream({ jsonBody: upstreamBody })

    const response = await GET()

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual(upstreamBody)
  })

  it("returns 502 when coursefind-data is unreachable, without throwing", async () => {
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error("ECONNREFUSED"))

    const response = await GET()

    expect(response.status).toBe(502)
    const body = await response.json()
    expect(body.error).toMatch(/unreachable/i)
  })

  it("passes through coursefind-data's own status code on failure", async () => {
    mockUpstream({ ok: false, status: 500, jsonBody: { detail: "boom" } })

    const response = await GET()

    expect(response.status).toBe(500)
  })
})
