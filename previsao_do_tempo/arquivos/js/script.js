// Variáveis e seleção de elementos
const apiKey = "0316d7f3affa881c6c341ef51d404c8f";
const apiFlags = "https://flagsapi.com/BR/shiny/64.png";
const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search");
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const flagElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data");

// Funções
const getWeatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL)
    const data = await res.json();
    
    return data;
}

const showWeatherData =  async (city) => {
  const data = await getWeatherData(city);  
  cityElement.innerText = data.name;
  tempElement.innerText = data.main.temp.toFixed(0);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
  flagElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/shiny/64.png`);
  humidityElement.innerText = data.main.humidity + "%";
  windElement.innerText = data.wind.speed + "km/h"; 
  weatherContainer.classList.remove("hide");
}


// Eventos
searchButton.addEventListener("click", (e)=>{
  e.preventDefault();
  
  const city = cityInput.value;

  showWeatherData(city);
});

cityInput.addEventListener("keyup", (e)=>{
  if(e.code === "Enter"){
    const city = e.target.value;
    showWeatherData(city);
  }
});