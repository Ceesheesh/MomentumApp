
SetTextColor();
function SetTextColor() {
  let custTextColor = localStorage.getItem("ColorConfig");
  let introFrom = document.querySelector("#introForm .userInput");
  let dailyForm = document.querySelector("#dailyForm .userInput");
  let locationForm = document.querySelector("#locationForm .userInput");
  let editFocus = document.querySelector("#editFocus");
  
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
      ? (editFocus.style.borderBottom = "2px solid #fff")
      : (editFocus.style.borderBottom = `2px solid ${custTextColor}`);  
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
    
    try {
      custTextColor === null || custTextColor.trim() === ""
        ? (editFocus.style.borderBottom = "2px solid #fff")
        : (editFocus.style.borderBottom = `2px solid ${custTextColor}`);
      } catch {}
    
}

SetTextFont();
function SetTextFont() {
  let customFont = localStorage.getItem("FontConfig");
  customFont === null || customFont.trim() === "" && (customFont = "Poppins");
  document.body.style.fontFamily = `${customFont}, sans-serif`
}
