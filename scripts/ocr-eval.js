/* eslint-disable */
async function run() {
  const tests = [
    {
      name: 'English PNG',
      url: 'http://dl.a9t9.com/ocrbenchmark/eng.png',
      params: { language: 'eng' },
    },
    {
      name: 'Chinese table JPG',
      url: 'https://ocr.space/Content/Images/table-ocr-original.jpg',
      params: { language: 'chs', isTable: true },
    },
  ]

  for (const t of tests) {
    const q = new URL('https://api.ocr.space/parse/imageurl')
    q.searchParams.set('apikey', 'helloworld')
    q.searchParams.set('url', t.url)
    for (const [k, v] of Object.entries(t.params)) q.searchParams.set(k, String(v))
    const start = Date.now()
    const r = await fetch(q, { method: 'GET' })
    const ms = Date.now() - start
    const j = await r.json()
    const pr = Array.isArray(j.ParsedResults) ? j.ParsedResults[0] : null
    const pt = (pr && pr.ParsedText) || ''
    const conf = pr && pr.MeanConfidence
    console.log(`TEST: ${t.name}`)
    console.log(`status=${r.status} time_ms=${ms} mean_conf=${conf}`)
    console.log(pt.slice(0, 200).replace(/\n/g, ' '))
    console.log('---')
  }
}

run().catch((e) => {
  console.error('ERR', e)
  process.exit(1)
})