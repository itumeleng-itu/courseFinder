// Backup Google Analytics implementation
;(() => {
  // Google Analytics
  var script = document.createElement("script")
  script.async = true
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-3C11RRX3FV"
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag() {
    dataLayer.push(arguments)
  }
  gtag("js", new Date())
  gtag("config", "G-3C11RRX3FV")

  // Make gtag globally available
  window.gtag = gtag
})()
