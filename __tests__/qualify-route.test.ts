/**
 * @jest-environment node
 */
import { NextRequest } from "next/server"
import { POST } from "@/app/api/qualify/route"

function postRequest(body: unknown) {
  return new NextRequest("http://localhost:3000/api/qualify", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  })
}

function mockUpstream(response: { ok?: boolean; status?: number; jsonBody: unknown }) {
  ;(global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: response.ok ?? true,
    status: response.status ?? 200,
    json: async () => response.jsonBody,
  })
}

describe("POST /api/qualify (proxy to coursefind-data)", () => {
  it("forwards the request body verbatim to coursefind-data's /v1/qualify", async () => {
    mockUpstream({ jsonBody: { qualified: [] } })
    const requestBody = { subjects: [{ subject: "english_hl", percentage: 65 }] }

    await POST(postRequest(requestBody))

    const [url, init] = (global.fetch as jest.Mock).mock.calls[0]
    expect(url).toMatch(/\/v1\/qualify$/)
    expect(JSON.parse(init.body)).toEqual(requestBody)
  })

  it("returns the upstream JSON body verbatim on success", async () => {
    const upstreamBody = { qualified: [{ qualification_code: "B2M52Q" }], evaluated_count: 29 }
    mockUpstream({ jsonBody: upstreamBody })

    const response = await POST(postRequest({ subjects: [] }))

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual(upstreamBody)
  })

  it("returns 502 when coursefind-data is unreachable, without throwing", async () => {
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error("ECONNREFUSED"))

    const response = await POST(postRequest({ subjects: [] }))

    expect(response.status).toBe(502)
    const body = await response.json()
    expect(body.error).toMatch(/unreachable/i)
  })

  it("passes through coursefind-data's own status code on a rejected request", async () => {
    mockUpstream({ ok: false, status: 422, jsonBody: { detail: "invalid subject" } })

    const response = await POST(postRequest({ subjects: [] }))

    expect(response.status).toBe(422)
  })

  it("returns 400 for a request body that isn't valid JSON, without calling upstream", async () => {
    const malformed = new NextRequest("http://localhost:3000/api/qualify", {
      method: "POST",
      body: "{not json",
    })

    const response = await POST(malformed)

    expect(response.status).toBe(400)
    expect(global.fetch).not.toHaveBeenCalled()
  })
})
