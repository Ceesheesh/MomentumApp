let settings = false

let settingContainer = document.querySelector("[data-settings=settingsContainer]");
let settingsModal = document.createElement('div');
settingsModal.classList.add('flex-row')
settingsModal.classList.add('settingsModal')
settingContainer?.appendChild(settingsModal);
settingContainer?.appendChild(document.getElementById('IoMdSettings'))

let settingsNavigation = document.createElement('div');
settingsNavigation.style.fontSize = "0";
settingsNavigation.style.borderRight = "1px solid rgb(255,255,255, 0.2) "
settingsModal.appendChild(settingsNavigation);

let quotesSettings = document.createElement('div');
quotesSettings.classList.add('nav-items');
quotesSettings.innerHTML = "Quotes";

settingsNavigation.appendChild(quotesSettings);

let settingsContent = document.createElement('div');
let addQuotes = document.createElement('button');
addQuotes.innerHTML = "Add Quotes";
addQuotes.classList.add('add-quotes-btn')
addQuotes.addEventListener('click', PushNewQuotes)
settingsContent.appendChild(addQuotes);

let newQuotes = document.createElement('input');
newQuotes.classList.add('newQuotes')
newQuotes.setAttribute('data-quote', 'newQuotes')
newQuotes.setAttribute('placeholder', 'Write new Quote here')
settingsContent.appendChild(newQuotes);

settingsModal.appendChild(settingsContent);
  
let quoteList = document.createElement('div')
quoteList.setAttribute('data-quote', 'AllQuotes')
quoteList.classList.add('allQuotes')
settingsContent.appendChild(quoteList)

document.getElementById('IoMdSettings')?.addEventListener('click', function() {
  this.classList.toggle('openSettings')
  settings = !settings;

  if (settings) {
    settingsModal.style.minHeight = "30rem"    
    settingsNavigation.style.padding = "1rem 0.5rem"
    settingsNavigation.style.fontSize = "";

    addQuotes.style.display = "block"
    settingsContent.style.padding = "0.5rem 0.5rem"
    settingsContent.style.width= "100%"

    newQuotes.style.padding = "0.5rem"
    newQuotes.style.display = "block"

    quoteList.style.display = "block"
    ListAllQuotes()
    
  } else {
    settingsModal.style.minHeight = "0" 
    settingsNavigation.style.padding = "0"
    settingsNavigation.style.fontSize = "0";
    
    addQuotes.style.display = "none"
    settingsContent.style.padding = "0"

    newQuotes.style.padding = "0"
    newQuotes.style.display = "none"

    quoteList.style.display = "none"

  }
});

function PushNewQuotes(e) {
  let newQuote = document.querySelector("[data-quote=newQuotes]")

  let quotesAr = localStorage.getItem("Quotes") === null || localStorage.getItem("Quotes")?.trim() === "" ? [] : JSON.parse(localStorage.getItem("Quotes"))
  quotesAr.push(newQuote.value);
  localStorage.setItem('Quotes', JSON.stringify(quotesAr));
  document.querySelector("[data-quote=newQuotes]").value = "";
  ListAllQuotes()
  GenerateRandomQuote();
}

function ListAllQuotes() {
 let AllQuotes = document.querySelector("[data-quote=AllQuotes]")
  let quotesArr = JSON.parse(localStorage.getItem("Quotes"));
  AllQuotes.innerHTML =  
    "<div>" +
    quotesArr
      .map(function (quote) {
        return `<div class=recordedQuote
          onclick= "setQuote('${quote}')"            
        >  "${quote}"  </div>`;

      })
      .join("") +
    "</div>";
}

function setQuote(quote) {
  document.querySelector("[data-quotes=displayQuote]").innerHTML = `"${quote}"`;
}
