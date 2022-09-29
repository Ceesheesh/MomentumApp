getWeather()

function getWeather() {
  let user = localStorage.getItem("UserName");
  if (user === null || user.trim() === "") return;
  let location = localStorage.getItem("UserLocation");
  if (location === null || location.trim() === "") return;
    
  const weatherContainer = document.querySelector("[data-weather=weatherContainer]")
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=2b18378cb28e6ab030a10b3a12ea6b22&units=metric#`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      let weatherCity = document.createElement('label');
      weatherCity.innerHTML = data.name;

      let weatherTemp = document.createElement('label');
      weatherTemp.innerHTML = data.main.temp;

      let weatherDesc = document.createElement('label');
      weatherDesc.innerHTML = data.weather[0].description;

      let weatherIcon = document.createElement('img');
      weatherIcon.setAttribute('src',"http://openweathermap.org/img/wn/"+ data.weather[0].icon +"@2x.png")

      weatherContainer?.appendChild(weatherCity);
      weatherContainer?.appendChild(weatherTemp);
      weatherContainer?.appendChild(weatherDesc);
      weatherContainer?.appendChild(weatherIcon);
    })
}