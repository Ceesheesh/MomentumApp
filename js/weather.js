GetWeather();

function GetWeather() {
  try {
    [
      ...document.getElementsByClassName("weatherContainer")[0].children,
    ].forEach((el) => {
      el.remove();
    });
  } catch {}
  

  let weatherContainer = document.querySelector(
    "[data-weather=weatherContainer]"
  );

  GetDate(weatherContainer);

  let user = localStorage.getItem("UserName");
  if (user === null || user.trim() === "") return;
  let location = localStorage.getItem("UserLocation");
  if (location === null || location.trim() === "") return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=2b18378cb28e6ab030a10b3a12ea6b22&units=metric#`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let weatherCity = document.createElement("label");
      weatherCity.innerHTML = data.name;

      let weatherTemp = document.createElement("label");
      weatherTemp.innerHTML = `${data.main.temp}\u00B0C`;

      let weatherDesc = document.createElement("label");
      weatherDesc.innerHTML = data.weather[0].description;

      let weatherIcon = document.createElement("img");
      weatherIcon.setAttribute(
        "src",
        "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
      );
      weatherIcon.classList.add("weatherIcon");

      let weatherDiv = document.createElement('div')
      weatherDiv.style.display= "flex";
      weatherDiv.style.flexDirection = "column";
      weatherDiv.style.alignItems = "end";
      weatherContainer?.appendChild(weatherDiv);
      weatherDiv?.appendChild(weatherCity);  
      weatherDiv?.appendChild(weatherTemp);
      
      weatherDiv?.appendChild(weatherDesc);
      weatherDiv?.appendChild(weatherIcon);
    });
}

function GetDate(weatherContainer) {

  let dateDiv = document.createElement('div')
  dateDiv.style.display= "flex";
  dateDiv.style.flexDirection = "column";

  let fullDate = new Date();
  let weekDay = fullDate.toLocaleString("default", { weekday: "long" });
  let currMonth =  fullDate.toLocaleString("default", { month: "long" });
  let currYear = fullDate.getFullYear();
  let currDay = fullDate.getDay() < 10 ? `0${fullDate.getDay()}` : fullDate.getDay();
  let dateToday = document.createElement("label");
  dateToday.innerHTML = `${weekDay}, ${currMonth} ${currDay} ${currYear}`;

  dateDiv.appendChild(dateToday)
  weatherContainer.appendChild(dateDiv);
}
