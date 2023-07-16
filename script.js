const apiKey = "3f94a504b90027f060af0984ad600bce";

function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        displayWeatherData(data);
      } else {
        showError("City not found!");
      }
    })
    .catch(error => {
      showError("An error occurred. Please try again later.");
      console.error(error);
    });
}

function displayWeatherData(data) {
  const weatherInfoDiv = document.getElementById("weather-info");

  const cityName = data.name;
  const temperature = data.main.temp;
  const weatherDescription = data.weather[0].description;
  const humidity = data.main.humidity;
  const rainfallCondition = data.weather[0].main === 'Rain' ? 'Rainy' : 'Not Rainy';
  const windSpeed = data.wind.speed;

  const cityHeading = document.createElement("h2");
  cityHeading.textContent = cityName;

  const temperatureParagraph = document.createElement("p");
  temperatureParagraph.innerHTML = `Temperature: ${temperature}°C`;

  const weatherDescriptionParagraph = document.createElement("p");
  weatherDescriptionParagraph.innerHTML = `Description: ${weatherDescription} <i class="fas ${getWeatherIcon(data.weather[0].icon)}"></i>`;

  const humidityInfoParagraph = document.createElement("p");
  humidityInfoParagraph.id = "humidity-info";
  humidityInfoParagraph.textContent = `Humidity: ${humidity}%`;

  const rainfallInfoParagraph = document.createElement("p");
  rainfallInfoParagraph.textContent = `Rainfall Condition: ${rainfallCondition}`;

  const windInfoParagraph = document.createElement("p");
  windInfoParagraph.textContent = `Wind Speed: ${windSpeed} m/s`;

  weatherInfoDiv.innerHTML = "";
  weatherInfoDiv.appendChild(cityHeading);
  weatherInfoDiv.appendChild(temperatureParagraph);
  weatherInfoDiv.appendChild(weatherDescriptionParagraph);
  weatherInfoDiv.appendChild(humidityInfoParagraph);
  weatherInfoDiv.appendChild(rainfallInfoParagraph);
  weatherInfoDiv.appendChild(windInfoParagraph);
}

function searchWeather() {
  const cityInput = document.getElementById("city-input");
  const city = cityInput.value.trim();

  if (city) {
    getWeatherData(city);
  } else {
    showError("Please enter a city name!");
  }
}

function showError(message) {
  const weatherInfoDiv = document.getElementById("weather-info");
  weatherInfoDiv.innerHTML = "";

  const errorMessage = document.createElement("p");
  errorMessage.id = "error-message";
  errorMessage.textContent = message;

  weatherInfoDiv.appendChild(errorMessage);
}

function getWeatherIcon(iconCode) {
  switch (iconCode) {
    case '01d':
      return 'fa-sun';
    case '01n':
      return 'fa-moon';
    case '02d':
    case '02n':
    case '03d':
    case '03n':
    case '04d':
    case '04n':
      return 'fa-cloud';
    case '09d':
    case '09n':
    case '10d':
    case '10n':
      return 'fa-cloud-showers-heavy';
    case '11d':
    case '11n':
      return 'fa-bolt';
    case '13d':
    case '13n':
      return 'fa-snowflake';
    case '50d':
    case '50n':
      return 'fa-smog';
    default:
      return 'fa-question-circle';
  }
}

window.addEventListener("load", function () {
  const assignedCity = "Bracknell Forest";
  getWeatherData(assignedCity);
});
