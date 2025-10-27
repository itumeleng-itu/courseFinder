// Node-side utility to query an NTP server over UDP and provide a fallback
import dgram from "dgram"

const NTP_PACKET_SIZE = 48
const NTP_PORT = 123
const NTP_DELTA = 2208988800 // seconds from 1900 to 1970
const DEFAULT_SERVER = "pool.ntp.org"

export async function queryNtp(server: string = DEFAULT_SERVER, timeoutMs: number = 2000): Promise<Date> {
  return new Promise((resolve, reject) => {
    const client = dgram.createSocket("udp4")
    const message = Buffer.alloc(NTP_PACKET_SIZE)
    message[0] = 0x1B // LI=0, VN=3, Mode=3 (client)

    let timedOut = false
    const timer = setTimeout(() => {
      timedOut = true
      try { client.close() } catch {}
      reject(new Error("NTP timeout"))
    }, timeoutMs)

    client.once("error", (err) => {
      clearTimeout(timer)
      try { client.close() } catch {}
      reject(err)
    })

    client.once("message", (buf) => {
      clearTimeout(timer)
      try { client.close() } catch {}
      if (timedOut) return
      try {
        const seconds = buf.readUInt32BE(40)
        const fraction = buf.readUInt32BE(44)
        const ms = (seconds - NTP_DELTA) * 1000 + Math.round((fraction / Math.pow(2, 32)) * 1000)
        resolve(new Date(ms))
      } catch (e) {
        reject(e as Error)
      }
    })

    client.send(message, 0, message.length, NTP_PORT, server)
  })
}

export async function fallbackHttpTime(): Promise<Date> {
  // worldtimeapi is a simple HTTP-based time source
  try {
    const res = await fetch("https://worldtimeapi.org/api/timezone/Etc/UTC", { cache: "no-store" })
    const json = await res.json()
    if (json?.utc_datetime) return new Date(json.utc_datetime)
    throw new Error("Invalid response from worldtimeapi")
  } catch (err) {
    // second fallback: cloudflare (HTTP header date)
    const res = await fetch("https://www.cloudflare.com", { cache: "no-store" })
    const dateHeader = res.headers.get("date")
    if (dateHeader) return new Date(dateHeader)
    throw err
  }
}

export async function getNetworkTime(): Promise<{ networkTime: Date; source: string }> {
  try {
    const ntp = await queryNtp()
    return { networkTime: ntp, source: "ntp:pool.ntp.org" }
  } catch (err) {
    const fb = await fallbackHttpTime()
    return { networkTime: fb, source: "http:fallback" }
  }
}