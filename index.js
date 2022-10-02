const loadScript = (src) =>  {
  const script = document.createElement('script')
  script.src = src
  document.body.appendChild(script)
}

document.body.style.backgroundColor = "#E3BC9A" //"#dedede" // remove when background color / design is decided


loadScript('./js/weather.js')
loadScript('./js/time.js')
loadScript('./js/userAccount.js')
loadScript('./js/settings.js')
loadScript('./js/quotes.js')
loadScript('./js/daily.js')
loadScript('./js/todo.js')


