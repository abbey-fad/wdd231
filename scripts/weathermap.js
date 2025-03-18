// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const url = `https://api.openweathermap.org/data/2.5/weather?lat=49.76&lon=6.64&units=metric&appid=de46f337741c7c174dd8814223f9f738`;
async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // testing only
        displayResults(data); // uncomment when ready
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }
  
  // Function to update the webpage with the weather data
  function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`; // Set temperature in Celsius
    const iconsrc = `https://openweathermap.org/img/w/01d.png`; // Construct icon URL
    let desc = data.weather[0].description; // Get weather description
    weatherIcon.setAttribute('src', iconsrc); // Set the icon source
    weatherIcon.setAttribute('alt', desc); // Set alt text for accessibility
    captionDesc.textContent = `${desc}`; // Display the weather description
  }
  apiFetch();
