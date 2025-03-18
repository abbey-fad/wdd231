const apiKey = "de46f337741c7c174dd8814223f9f738"; // OpenWeatherMap API key
const lat = 8.12; 
const lon = 4.24;
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) throw new Error("Weather data not available");

        const data = await response.json();
        console.log(data); // Debugging

        document.querySelector("#temp").textContent = `${data.main.temp.toFixed(1)}°C`;
        document.querySelector("#weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.querySelector("#weather-icon").alt = data.weather[0].description;
        document.querySelector("#description").textContent = data.weather[0].description;
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

document.addEventListener("DOMContentLoaded", getWeather);
