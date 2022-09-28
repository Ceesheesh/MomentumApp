const loadScript = (src) =>  {
  const script = document.createElement('script')
  script.src = src
  document.body.appendChild(script)
}

loadScript('./js/time.js')
loadScript('./js/userAccount.js')