let defaultBackgroundArr = ['background2.jpg', 'background3.jpg']

document.addEventListener("contextmenu", (event) => event.preventDefault());
RandomBackground();

function RandomBackground() {  

  let customBackgroundArr = localStorage.getItem("CustomBackground") === null || localStorage.getItem("CustomBackground")?.trim() === "" ? [] : JSON.parse(localStorage.getItem("CustomBackground"));

  if (customBackgroundArr.length > 0 ) {
    let randomDefaultBackground = customBackgroundArr[Math.floor(Math.random() * customBackgroundArr.length)]
    document.body.style.backgroundImage = `url('${randomDefaultBackground}')`
  } else {   
    let randomDefaultBackground = defaultBackgroundArr[Math.floor(Math.random() * defaultBackgroundArr.length)]
    document.body.style.backgroundImage = `url('./Images/${randomDefaultBackground}')`
  }

}