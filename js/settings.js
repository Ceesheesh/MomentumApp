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

let generalSettings = document.createElement('div');
generalSettings.classList.add('nav-items');
generalSettings.innerHTML = "General";
generalSettings.addEventListener('click', LoadGeneralSettings);
settingsNavigation.appendChild(generalSettings);

let quotesSettings = document.createElement('div');
quotesSettings.classList.add('nav-items');
quotesSettings.innerHTML = "Quotes";
quotesSettings.addEventListener('click', LoadQuoteSettings);
settingsNavigation.appendChild(quotesSettings);

let backgroundSettings = document.createElement('div');
backgroundSettings.classList.add('nav-items');
backgroundSettings.innerHTML = "Photos";
backgroundSettings.addEventListener('click', LoadBackgroundSettings);
settingsNavigation.appendChild(backgroundSettings);

document.getElementById('IoMdSettings')?.addEventListener('click', function() {
  this.classList.toggle('openSettings')
  settings = !settings;

  if (settings) {
    settingsModal.style.minHeight = "30rem"    
    settingsNavigation.style.padding = "1rem 1.5rem"
    settingsNavigation.style.fontSize = "1.1rem";
    [...document.getElementsByClassName('nav-items')].forEach(el => {
      el.style.paddingBottom = "0.3rem";
    })    
    LoadGeneralSettings();
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

function LoadGeneralSettings() {
  RemoveRemovableContent();
  let settingsContent = AddRemovableContent();
  settingsContent.classList.add('flex-column');
  settingsContent.style.padding = "1.5rem"
 
  let clearPhoto = document.createElement('button');
  clearPhoto.classList.add('add-btn');
  clearPhoto.style.fontSize = "0.7rem";
  clearPhoto.style.width = "10rem"
  clearPhoto.innerHTML = "Clear Custom Photos";
  clearPhoto.addEventListener('click', () => { 
    localStorage.removeItem("CustomBackground") 
    // RandomBackground();
    try {
      CustomBackground();
      RandomBackgroundGenerator();
    } catch{}
  })

  let clearQuotes = document.createElement('button');
  clearQuotes.classList.add('add-btn');
  clearQuotes.style.fontSize = "0.7rem";
  clearQuotes.style.width = "10rem"
  clearQuotes.innerHTML = "Clear All Quotes";
  clearQuotes.addEventListener('click', () => { 
    localStorage.removeItem("Quotes")    
    document.querySelector("[data-quotes=displayQuote]").innerHTML = "";
  })

  let colorConfig = document.createElement('div');  
  colorConfig.classList.add('flex-row');
  colorConfig.style.justifyContent = "space-between";

  let setColor = document.createElement('button');
  setColor.classList.add('add-btn');
  setColor.style.fontSize = "0.7rem";
  setColor.style.width = "10rem"
  setColor.innerHTML = "Set Text Color";
  setColor.addEventListener('click', () => { 
    let selectedColor = `${document.getElementById('getColor').value}`;
    localStorage.setItem('ColorConfig',  `${selectedColor}`)
    try {
    SetTextColor();
    } catch {}
  }) 

  let getColor = document.createElement('input');
  getColor.setAttribute('type', 'color');
  let custTextColor = localStorage.getItem("ColorConfig");
  custTextColor === null || custTextColor.trim() === "" ? getColor.setAttribute('value', '#ffffff') : getColor.setAttribute('value', `${custTextColor}`);
  getColor.setAttribute('id', 'getColor');  
  
  colorConfig.appendChild(setColor);
  colorConfig.appendChild(getColor);

  let fontConfig = document.createElement('div');  
  fontConfig.classList.add('flex-row');
  fontConfig.style.justifyContent = "space-between";

  let fontLabel = document.createElement('label');
  fontLabel.style.fontSize = "1rem";
  fontLabel.innerHTML = "Text Font";

  let changeFont = document.createElement('input');
  changeFont.classList.add('userInput');
  changeFont.setAttribute('placeholder', 'Type your desired font');
  changeFont.value = `${localStorage.getItem("FontConfig") === null || localStorage.getItem("FontConfig")?.trim() === "" ? "Poppins" : localStorage.getItem("FontConfig") }`;
  changeFont.style.fontSize = "1rem";
  changeFont.addEventListener('keyup', function(e) {
    if (e.keyCode !== 13) return
    localStorage.setItem("FontConfig", this.value);
    this.value.trim() === "" && (changeFont.value = "Poppins");
    document.body.style.fontFamily = `${this.value},sans-serif`; 
    
  })

  fontConfig.appendChild(fontLabel);
  fontConfig.appendChild(changeFont);

  let locationConfig = document.createElement('div');  
  locationConfig.classList.add('flex-row');
  locationConfig.style.justifyContent = "space-between";

  let newLocation = document.createElement('label');
  newLocation.style.fontSize = "1rem";
  newLocation.innerHTML = "Location";

  let changeLocation = document.createElement('input');
  changeLocation.classList.add('userInput');
  changeLocation.setAttribute('placeholder', 'Type your new location')
  changeLocation.value = `${localStorage.getItem("UserLocation") === null ? "" : localStorage.getItem("UserLocation")}`;
  changeLocation.style.fontSize = "1rem";
  changeLocation.addEventListener('keyup', function(e) {
    if (e.keyCode !== 13) return
    let currentLocation = localStorage.getItem("UserLocation");
    if (currentLocation === null || currentLocation.trim() === "") return;
    localStorage.setItem("UserLocation",this.value)    
    GetWeather();
  })

  locationConfig.appendChild(newLocation);
  locationConfig.appendChild(changeLocation);

  let userConfig = document.createElement('div');  
  userConfig.classList.add('flex-row');
  userConfig.style.justifyContent = "space-between";

  let userLabel = document.createElement('label');
  userLabel.style.fontSize = "1rem";
  userLabel.innerHTML = "User Name";

  let changeUser = document.createElement('input');
  changeUser.classList.add('userInput');
  changeUser.setAttribute('placeholder', 'New User Name Here');
  changeUser.value = `${localStorage.getItem("UserName") === null ? "" : localStorage.getItem("UserName")}`
  changeUser.style.fontSize = "1rem";
  changeUser.addEventListener('keyup', function(e) {
    if (localStorage.getItem("UserName") === null || localStorage.getItem("UserName").trim() === "") return;
    if (this.value.toUpperCase().trim() === "" ) return
    if (e.keyCode !== 13) return
    let prevUser = localStorage.getItem("UserName");
    let currentWelcome = document.getElementById('welcomeText').innerHTML ;
    localStorage.setItem("UserName", this.value.toUpperCase());
    document.getElementById('welcomeText').innerHTML = currentWelcome.replace(`${prevUser}`, this.value.toUpperCase())
    
  })

  userConfig.appendChild(userLabel);
  userConfig.appendChild(changeUser);

  settingsContent.appendChild(clearPhoto);
  settingsContent.appendChild(CreateDivider());

  settingsContent.appendChild(clearQuotes);
  settingsContent.appendChild(CreateDivider());

  settingsContent.appendChild(colorConfig);
  settingsContent.appendChild(CreateDivider());

  settingsContent.appendChild(fontConfig);
  settingsContent.appendChild(CreateDivider());

  settingsContent.appendChild(locationConfig);
  settingsContent.appendChild(CreateDivider());

  settingsContent.appendChild(userConfig);
  settingsContent.appendChild(CreateDivider());

  settingsModal.appendChild(settingsContent);
}

function LoadQuoteSettings() {
  RemoveRemovableContent();
  let settingsContent = AddRemovableContent();

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
  let newQuote = document.querySelector("[data-quote=newQuotes]");

  if (newQuote.value === null || newQuote.value.trim() === "") return;

  let quotesAr =
    localStorage.getItem("Quotes") === null ||
    localStorage.getItem("Quotes")?.trim() === ""
      ? []
      : JSON.parse(localStorage.getItem("Quotes"));
      
  quotesAr.push(newQuote.value);
  localStorage.setItem("Quotes", JSON.stringify(quotesAr));
  document.querySelector("[data-quote=newQuotes]").value = "";
  LoadQuoteSettings();
  GenerateRandomQuote();
}

function ListAllQuotes() {
 let AllQuotes = document.querySelector("[data-quote=AllQuotes]")
  let quotesArr = JSON.parse(localStorage.getItem("Quotes"));

  let quotesContainer = document.createElement('div');
  AllQuotes.appendChild(quotesContainer);
  quotesArr.forEach(function (quote) {    
    quotesComparment(quotesContainer, quote);    
  })

}

function quotesComparment(quotesContainer, quote) {
  let quoteDiv = document.createElement('div');
  quoteDiv.classList.add('recordedQuote');
  quoteDiv.innerHTML = `"${quote}"`;
  quoteDiv.addEventListener('click', function () { document.querySelector("[data-quotes=displayQuote]").innerHTML = `"${quote}"`})
  quotesContainer.appendChild(quoteDiv);
}

function LoadBackgroundSettings() {
  RemoveRemovableContent();
  let settingsContent = AddRemovableContent();
  settingsContent.style.padding = "1rem 1.5rem"

  let defaultBackgroundLabel = document.createElement('label');
  defaultBackgroundLabel.innerHTML = "Public Wallpapers"
  defaultBackgroundLabel.style.fontSize = "1rem";
  settingsContent.appendChild(defaultBackgroundLabel);
  settingsModal.appendChild(settingsContent);
  
  let publicList = document.createElement('div')
  publicList.setAttribute('data-background', 'PublicBackground')
  settingsContent.appendChild(publicList)
  ListPublicBackground();

  let addPhoto = document.createElement('label');
  addPhoto.innerHTML = "Add Custom Photo";
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
      // document.body.style.backgroundImage=`url(${upload})`;      
      let customBackgroundArr = localStorage.getItem("CustomBackground") === null || localStorage.getItem("CustomBackground")?.trim() === "" ? [] : JSON.parse(localStorage.getItem("CustomBackground"))

      customBackgroundArr.push(upload);
      localStorage.setItem('CustomBackground', JSON.stringify(customBackgroundArr));
      try {
        DefaultBackground();
        CustomBackground();
        RandomBackgroundGenerator();
      } catch{ }
      LoadBackgroundSettings(); 
    });
  reader.readAsDataURL(this.files[0]);
  
}

function ListPublicBackground() {
  let defaultBackgroundArr = [
    "background1.jpg",
    "background2.jpg",
    "background3.jpg",
  ];

  let publicBackground = document.querySelector(
    "[data-background=PublicBackground]"
  );
  
  let imageGallery = document.createElement('div');
  imageGallery.classList.add('imageGallery')
  publicBackground?.appendChild(imageGallery);
  defaultBackgroundArr.forEach(function (imgSrc,idx) {    
    defaultImagePanel(imageGallery,imgSrc,idx);    
  })
 }

 function defaultImagePanel(imgGallery,imgSrc,idx) {
  let imageDiv = document.createElement('div');
  imageDiv.classList.add('flex-column');
  let imageFile = document.createElement('img');
  imageFile.classList.add("imagePanel")
  imageFile.setAttribute('src', `./Images/${imgSrc}`);
  imageFile.setAttribute('data-ImgCode', `default${idx}`);
  imageFile.addEventListener('click', ManualSettingWallpaper )
  imgGallery.appendChild(imageFile);
 }

 function ListCustomBackground() {
  let customBackgroundArr = localStorage.getItem("CustomBackground") === null || localStorage.getItem("CustomBackground")?.trim() === "" ? [] : JSON.parse(localStorage.getItem("CustomBackground"))

  let customBackground = document.querySelector(
    "[data-background=customBackground]"
  );
  
  let imageGallery = document.createElement('div');
  imageGallery.classList.add('imageGallery')
  customBackground?.appendChild(imageGallery);
  customBackgroundArr.forEach(function (imgSrc,idx) {    
    customImagePanel(imageGallery,imgSrc,idx);    
  })
 }

 function customImagePanel(imgGallery,imgSrc,idx) {
  let imageDiv = document.createElement('div');
  imageDiv.classList.add('flex-column');
  let imageFile = document.createElement('img');
  imageFile.classList.add("imagePanel")
  imageFile.setAttribute('src', `${imgSrc}`);
  imageFile.setAttribute('data-ImgCode', `custom${idx}`);
  imageFile.addEventListener('click', ManualSettingWallpaper )
  imgGallery.appendChild(imageFile);
 }

function RemoveRemovableContent() {
  document.querySelector("[data-removable=RemovableContent]")?.remove();
}

function AddRemovableContent() {
  let settingsContent = document.createElement('div');
  settingsContent.setAttribute('data-removable', 'RemovableContent')
  settingsContent.setAttribute('class', 'removableContent')
  settingsContent.style.padding = "0.5rem 0.5rem"
  settingsContent.style.width= "100%"
  return settingsContent
}

function CreateDivider() {
  let divider = document.createElement('div')
  divider.style.height = "0";
  divider.style.minWidth = "100%";
  divider.style.borderBottom = "1px solid rgb(255,255,255, 0.2)";
  divider.style.marginTop = "1.3rem";
  divider.style.marginBottom = "1.5rem";
  return divider;
}

function ManualSettingWallpaper() {
  let allImagePanel = document.querySelectorAll('.backgroundPanel');
  [...allImagePanel].forEach(panel => {
    panel.style.opacity = "0";
  })

  let setPanel =  document.querySelector(`[data-background=${this.dataset.imgcode}]`)
  setPanel.style.opacity = "1"

}

