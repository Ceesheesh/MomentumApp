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

SetTextColor();
function SetTextColor() {
  let custTextColor = localStorage.getItem("ColorConfig");
  let introFrom = document.querySelector("#introForm .userInput");
  let dailyForm = document.querySelector("#dailyForm .userInput");
  let locationForm = document.querySelector("#locationForm .userInput");
  
  
  try {
  custTextColor === null || custTextColor.trim() === ""
    ? (document.body.style.color = "#fff")
    : (document.body.style.color = `${custTextColor}`);
  } catch {}

  try { 
  custTextColor === null || custTextColor.trim() === ""
    ? (dailyForm.style.color = "#fff")
    : (dailyForm.style.color = `${custTextColor}`);  
  } catch {}

  try {
  custTextColor === null || custTextColor.trim() === ""
    ? (introFrom.style.color = "#fff")
    : (introFrom.style.color = `${custTextColor}`);
  } catch{}
  
  try {
  custTextColor === null || custTextColor.trim() === ""
    ? (locationForm.style.color = " #fff")
    : (locationForm.style.color = `${custTextColor}`);
  } catch {}

  try { 
    custTextColor === null || custTextColor.trim() === ""
      ? (dailyForm.style.borderBottom = "2px solid #fff")
      : (dailyForm.style.borderBottom = `2px solid ${custTextColor}`);  
    } catch {}
  
    try {
    custTextColor === null || custTextColor.trim() === ""
      ? (introFrom.style.borderBottom = "2px solid  #fff")
      : (introFrom.style.borderBottom = `2px solid ${custTextColor}`);
    } catch{}
    
    try {
    custTextColor === null || custTextColor.trim() === ""
      ? (locationForm.style.borderBottom = "2px solid #fff")
      : (locationForm.style.borderBottom = `2px solid ${custTextColor}`);
    } catch {}
}