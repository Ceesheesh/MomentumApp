let defaultBackgroundArr = ['background1.jpg', 'background2.jpg', 'background3.jpg']

document.addEventListener("contextmenu", (event) => event.preventDefault());
// RandomBackground();

// function RandomBackground() {  
//   let customBackgroundArr = localStorage.getItem("CustomBackground") === null || localStorage.getItem("CustomBackground")?.trim() === "" ? [] : JSON.parse(localStorage.getItem("CustomBackground"));

//   if (customBackgroundArr.length > 0 ) {
//     let randomDefaultBackground = customBackgroundArr[Math.floor(Math.random() * customBackgroundArr.length)]
//     document.body.style.backgroundImage = `url('${randomDefaultBackground}')`
//   } else {   
//     let randomDefaultBackground = defaultBackgroundArr[Math.floor(Math.random() * defaultBackgroundArr.length)]
//     document.body.style.backgroundImage = `url('./Images/${randomDefaultBackground}')`
//   }

// }

DefaultBackground();
function DefaultBackground() {
  try {
    let customPanel = document.querySelectorAll("[data-backgroundSet=publicBackgrounds]");
     customPanel.forEach(panel => {
      panel.style.opacity = "0";
     })
  } catch {}
  defaultBackgroundArr.forEach((background, idx) => {
    let backgroundPanel = document.createElement('div');
    backgroundPanel.classList.add('backgroundPanel');
    backgroundPanel.setAttribute('data-background',`default${idx}`);
    backgroundPanel.setAttribute('data-backgroundSet','publicBackgrounds');

    backgroundPanel.style.backgroundImage = `url('./Images/${background}')`;
    document.querySelector('.backgroundContainer').appendChild(backgroundPanel);
  })
}
CustomBackground();
function CustomBackground() {
    try {
      let customPanel = document.querySelectorAll("[data-backgroundSet=customBackgrounds]");
       customPanel.forEach(panel => {
        panel.remove()
       })
    } catch {}

    let customBackgroundArr = localStorage.getItem("CustomBackground") === null || localStorage.getItem("CustomBackground")?.trim() === "" ? [] : JSON.parse(localStorage.getItem("CustomBackground"));
    customBackgroundArr.forEach((background, idx) => {
    let backgroundPanel = document.createElement('div');
    backgroundPanel.classList.add('backgroundPanel');
    backgroundPanel.setAttribute('data-background',`custom${idx}`);
    backgroundPanel.setAttribute('data-backgroundSet','customBackgrounds');
    backgroundPanel.style.backgroundImage = `url('${background}')`;
    document.querySelector('.backgroundContainer').appendChild(backgroundPanel);
  })
}

RandomBackgroundGenerator();
function RandomBackgroundGenerator() {
  let customPanel = document.querySelectorAll("[data-backgroundSet=customBackgrounds]") 
  if (customPanel.length > 0) {
    [...customPanel].forEach(panel => {
      panel.style.opacity = "0";
    })
    let randomCustomBackground = document.querySelector(`[data-background=custom${Math.floor(Math.random() * customPanel.length)}]`) 
    randomCustomBackground.style.opacity = "1";
  } else {
    let defaultPanel = document.querySelectorAll("[data-backgroundSet=publicBackgrounds]"); 
    [...defaultPanel].forEach(panel => {
      panel.style.opacity = "0";
    })
    let randomDefaultBackground = document.querySelector(`[data-background=default${Math.floor(Math.random() * defaultPanel.length)}]`) 
    randomDefaultBackground.style.opacity = "1";
  }
}

