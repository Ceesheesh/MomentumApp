let introForm = document.createElement('form');
introForm.classList.add('introForm')
introForm.addEventListener('submit', SubmitName);
introForm.style.transition = "all 0.5s"

let locationForm = document.createElement('form');
locationForm.classList.add('locationForm')
locationForm.addEventListener('submit', SubmitLocation);
locationForm.style.transition = "all 0.5s"


let userContainer = document.querySelector("[data-user=mainAcct]")
userContainer?.appendChild(introForm);
userContainer?.appendChild(locationForm);

HelloMessage();
AskLocation();

function HelloMessage() {  
  document.getElementById('welcomeText')?.remove()
  document.getElementById('welcomeLabel')?.remove()

  let currentHr = new Date().getHours();
  let greeting = "Good"
  if (currentHr < 12) {
    greeting += " Morning"
  } else if  (currentHr > 12 && currentHr < 18) {
    greeting += " Afternoon"
  } else if  (currentHr > 12  && currentHr > 18) {
    greeting += " Evening"
  }
  else {
    greeting += " Noon"
  }
  let user = localStorage.getItem("UserName");
  if (user === null || user.trim() === "") {
    let introLabel = document.createElement('h1');
    introLabel.setAttribute('id', 'welcomeLabel')
    introLabel.innerHTML = "Hello, what's your name ?"
    introForm.appendChild(introLabel)
    
    let introduction = document.createElement('input');
    introduction.setAttribute('id', 'welcomeText')
    introduction.classList.add('userInput')
    introForm.appendChild(introduction);    

  } else {
    let introduction = document.createElement('h1');
    introduction.setAttribute('id', 'welcomeText')
    introduction.innerHTML = `${greeting} ${user}`;
    introForm.appendChild(introduction);
  }

}

function AskLocation() {
 
  let userLoc = localStorage.getItem("UserLocation");
  if (userLoc === null || userLoc.trim() === "") {
    document.getElementById('locationLabel')?.remove()
    document.getElementById('locationText')?.remove()
    let locLabel = document.createElement('h1');
    locLabel.setAttribute('id', 'locationLabel')
    locLabel.innerHTML = "Where are you located ?"
    locationForm.appendChild(locLabel)
    
    let location = document.createElement('input');
    location.setAttribute('id', 'locationText')
    location.classList.add('userInput')
    locationForm.appendChild(location);    
  } else {
    locationForm.style.opacity = "0"
    locationForm.style.height = "0"
  }
}

function SubmitName(e) {    
  localStorage.setItem("UserName", this.elements.welcomeText.value.toUpperCase());  
  e.preventDefault();
  HelloMessage();
}

function SubmitLocation(e) {
  localStorage.setItem("UserLocation", this.elements.locationText.value.toUpperCase());  
  // locationForm.style.height = "0"
  // locationForm.style.opacity = "0"
  e.preventDefault();
  AskLocation();
  getWeather();
}
