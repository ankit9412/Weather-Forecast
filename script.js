const API_KEY = '54502b224f544e3594f43236250106'; // Replace with your WeatherAPI key

const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherResult = document.getElementById('weather-result');
const cityName = document.getElementById('city-name');
const temp = document.getElementById('temp');
const condition = document.getElementById('condition');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const weatherIcon = document.getElementById('weather-icon');
const errorMessage = document.getElementById('error-message');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (!city) {
    showError('Please enter a city name');
    return;
  }

  fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
    .then(response => {
      if (!response.ok) throw new Error('City not found');
      return response.json();
    })
    .then(data => {
      errorMessage.textContent = '';
      cityName.textContent = `${data.location.name}, ${data.location.country}`;
      temp.textContent = `Temperature: ${data.current.temp_c}°C`;
      condition.textContent = `Condition: ${data.current.condition.text}`;
      humidity.textContent = `Humidity: ${data.current.humidity}%`;
      wind.textContent = `Wind: ${data.current.wind_kph} kph`;
      weatherIcon.src = `https:${data.current.condition.icon}`;
      weatherResult.classList.remove('hidden');
    })
    .catch(err => {
      showError(err.message || 'Something went wrong');
    });
});

function showError(message) {
  weatherResult.classList.add('hidden');
  errorMessage.textContent = message;
}