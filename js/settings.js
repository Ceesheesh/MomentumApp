let settings = false

let settingContainer = document.querySelector("[data-settings=settingsContainer]");
let settingsModal = document.createElement('div');
settingsModal.classList.add('flex-row')
settingsModal.classList.add('settingsModal')
settingContainer?.appendChild(settingsModal);
settingContainer?.appendChild(document.getElementById('IoMdSettings'))

let settingsNavigation = document.createElement('div');
settingsNavigation.classList.add('settingsNavigation')
settingsNavigation.style.fontSize = "0";
settingsModal.appendChild(settingsNavigation);

let quotesSettings = document.createElement('div');
quotesSettings.classList.add('nav-items');
quotesSettings.innerHTML = "Quotes";
quotesSettings.addEventListener('click', LoadQuoteSettings);
settingsNavigation.appendChild(quotesSettings);

let backgroundSettings = document.createElement('div');
backgroundSettings.classList.add('nav-items');
backgroundSettings.innerHTML = "Background";
backgroundSettings.addEventListener('click', LoadBackgroundSettings);
settingsNavigation.appendChild(backgroundSettings);

document.getElementById('IoMdSettings')?.addEventListener('click', function() {
  this.classList.toggle('openSettings')
  settings = !settings;

  if (settings) {
    settingsModal.style.minHeight = "30rem"    
    settingsNavigation.style.padding = "1rem 0.5rem"
    settingsNavigation.style.fontSize = "0.75rem";
    [...document.getElementsByClassName('nav-items')].forEach(el => {
      el.style.paddingBottom = "0.3rem";
    })    
    LoadQuoteSettings();
  } else {
    settingsModal.style.minHeight = "0" 
    settingsNavigation.style.padding = "0"
    settingsNavigation.style.fontSize = "0";
    [...document.getElementsByClassName('nav-items')].forEach(el => {
      el.style.paddingBottom = "0";
    })
    RemoveRemovableContent();
  }
});

function LoadQuoteSettings() {
  RemoveRemovableContent();
  let settingsContent = document.createElement('div');
  settingsContent.setAttribute('data-removable', 'RemovableContent')
  settingsContent.style.padding = "0.5rem 0.5rem"
  settingsContent.style.width= "100%"

  let addQuotes = document.createElement('button');
  addQuotes.innerHTML = "Add Quotes";
  addQuotes.classList.add('add-btn')
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
  ListAllQuotes()  
}

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

function LoadBackgroundSettings() {
  RemoveRemovableContent();
  let settingsContent = document.createElement('div');
  settingsContent.setAttribute('data-removable', 'RemovableContent')
  settingsContent.style.padding = "0.5rem 0.5rem"
  settingsContent.style.width= "100%"

  let defaultBackgroundLabel = document.createElement('label');
  defaultBackgroundLabel.innerHTML = "Public Wallpapers"
  settingsContent.appendChild(defaultBackgroundLabel);
  settingsModal.appendChild(settingsContent);

  
  let publicList = document.createElement('div')
  publicList.setAttribute('data-background', 'PublicBackground')
  settingsContent.appendChild(publicList)
  ListPublicBackground();

  let addPhoto = document.createElement('label');
  addPhoto.innerHTML = "Add Photo";
  addPhoto.classList.add('add-btn');
  addPhoto.classList.add('showTypeFile');
 
  let typeFile = document.createElement('input');
  typeFile.setAttribute('type','file');
  typeFile.setAttribute('accept','image/jpeg, image/png, image/jpg');
  typeFile.classList.add('hideTypeFile');
  typeFile.addEventListener('change',LoadCustomWallpaper)

  addPhoto.appendChild(typeFile)
  settingsContent.appendChild(addPhoto);

  let customList = document.createElement('div')
  customList.setAttribute('data-background', 'customBackground')
  settingsContent.appendChild(customList)
  ListCustomBackground();
}

function LoadCustomWallpaper() {
  const reader = new FileReader();
    reader.addEventListener('load', () => {
      const upload = reader.result;
      document.body.style.backgroundImage=`url(${upload})`;
      
      let customBackgroundArr = localStorage.getItem("CustomBackground") === null || localStorage.getItem("CustomBackground")?.trim() === "" ? [] : JSON.parse(localStorage.getItem("CustomBackground"))

      customBackgroundArr.push(upload);
      localStorage.setItem('CustomBackground', JSON.stringify(customBackgroundArr));
      ListCustomBackground();
    });
    reader.readAsDataURL(this.files[0]);
    
}

function ListPublicBackground() {
  let defaultBackgroundArr = [
    "background2.jpg",
    "background3.jpg",
    "background1.jpg",
  ];

  let publicBackground = document.querySelector(
    "[data-background=PublicBackground]"
  );
  publicBackground.innerHTML =
    "<div class='imageGallery'>" +
    defaultBackgroundArr
      .map(function (imgSrc) {
        return (
        `<div class="flex-column"  onclick="setWallpaper('${imgSrc}')">
          <img class="imagePanel" src="./Images/${imgSrc}"></img> 
         </div>`);
      })
      .join("") +
    "</div>";
 }

 function ListCustomBackground() {
  let customBackgroundArr = localStorage.getItem("CustomBackground") === null || localStorage.getItem("CustomBackground")?.trim() === "" ? [] : JSON.parse(localStorage.getItem("CustomBackground"))

  let customBackground = document.querySelector(
    "[data-background=customBackground]"
  );
  customBackground.innerHTML =
    "<div class='imageGallery'>" +
    customBackgroundArr
      .map(function (imgSrc) {
        return (
        `<div class="flex-column" onclick="customWallpaper('${imgSrc}') ">
          <img class="imagePanel" src="${imgSrc}"></img> 
         </div>`);
      })
      .join("") +
    "</div>";
 }

function setQuote(quote) {
  document.querySelector("[data-quotes=displayQuote]").innerHTML = `"${quote}"`;
}

function customWallpaper(imgName) {
  document.body.style.backgroundImage = `url('${imgName}')`
}

function setWallpaper(imgName) {
  document.body.style.backgroundImage = `url('./Images/${imgName}')`
}

function RemoveRemovableContent() {
  document.querySelector("[data-removable=RemovableContent]")?.remove();
}
