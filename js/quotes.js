let quotesContainer = document.querySelector("[data-quotes=quotesContainer]");

GenerateRandomQuote();


function GenerateRandomQuote() {
  let quotesArr = JSON.parse(localStorage.getItem("Quotes") === null || localStorage.getItem("Quotes")?.trim() === "" ? "[]" : localStorage.getItem("Quotes"))

  if (quotesArr.length === 0) return
  document.querySelector("[data-quotes=displayQuote]")?.remove();
  let randomQuote = quotesArr[Math.floor(Math.random() * quotesArr.length)]

  let displayQuote = document.createElement('label');
  displayQuote.innerHTML = `"${randomQuote}"`;
  displayQuote.setAttribute("data-quotes", "displayQuote")
  quotesContainer?.appendChild(displayQuote)
}