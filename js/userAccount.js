let introForm = document.createElement('form');
introForm.addEventListener('submit', SubmitName);
let container = document.querySelector("[data-user=mainAcct]")
container?.appendChild(introForm);
HelloMessage();

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
  if (user === null) {
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

function SubmitName(e) {  
  localStorage.setItem("UserName", this.children[1].value.toUpperCase());
  e.preventDefault();
  HelloMessage();
}
