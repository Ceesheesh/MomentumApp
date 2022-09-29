let introForm = document.createElement('form');
introForm.addEventListener('submit', SubmitName);

let locationForm = document.createElement('form');
locationForm.addEventListener('submit', SubmitLocation);


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
    introduction.setAttribute('placeholder', 'Write Name Here')
    introForm.appendChild(introduction);    
  } else {
    let introduction = document.createElement('h1');
    introduction.setAttribute('id', 'welcomeText')
    introduction.innerHTML = `${greeting} ${user}`;
    introForm.appendChild(introduction);
  }

}

function AskLocation() {
  document.getElementById('locationLabel')?.remove()
  document.getElementById('locationText')?.remove()
  let userLoc = localStorage.getItem("UserLocation");
  if (userLoc === null || userLoc.trim() === "") {
    let locLabel = document.createElement('h1');
    locLabel.setAttribute('id', 'locationLabel')
    locLabel.innerHTML = "Where are you located ?"
    locationForm.appendChild(locLabel)
    
    let location = document.createElement('input');
    location.setAttribute('id', 'locationText')
    location.setAttribute('placeholder', 'Write Name Here')
    locationForm.appendChild(location);    
  }  
}

function SubmitName(e) {    
  localStorage.setItem("UserName", this.elements.welcomeText.value.toUpperCase());  
  e.preventDefault();
  HelloMessage();
}

function SubmitLocation(e) {
  localStorage.setItem("UserLocation", this.elements.locationText.value.toUpperCase());
  e.preventDefault();
  AskLocation();
  getWeather();
}
