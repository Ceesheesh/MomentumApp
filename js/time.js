
updateTime();

function updateTime() {  

  //save to local
  //getvalue
  // let militaryTime = localStorage.get(asdsad)

  // militaryTime ? document.querySelector("[data-time=timeSwitch]").checked = true : document.querySelector("[data-time=timeSwitch]").checked = false


  let isMilitary = document.querySelector("[data-time=timeSwitch]")?.checked;
  let currentHr = new Date().getHours();
  let currentSec = new Date().getSeconds();
  let currentMin = new Date().getMinutes();
  let officialHr = isMilitary ? currentHr : currentHr > 12 ? currentHr - 12 : currentHr;
  let officialMin = currentMin < 10 ? "0" + currentMin : currentMin; 
  let officialSec = currentSec < 10 ? "0" + currentSec : currentSec; 
  let isMorning = !isMilitary ? currentHr > 12 ? "PM" : "AM" : "";
  let military = `${officialHr < 10 ? "0" + officialHr : officialHr}:${officialMin}:${officialSec} ${isMorning}`;

  const miltaryTime = document.querySelector("[data-time=mainTime]");
  miltaryTime.textContent  = military;

};

document.querySelector("[data-time=timeSwitch]")?.addEventListener("click", updateTime)

setInterval(updateTime, 1000);
