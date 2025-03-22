document.addEventListener("DOMContentLoaded", () => {
    getWeather();
    getSpotlightMembers();
});

async function getWeather() {
    const apiKey = "de46f337741c7c174dd8814223f9f738"; // Replace with real key
    const city = "Ile-Ife"; // Replace with actual city
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch weather data");
        
        const data = await response.json();
        console.log("Weather Data:", data); // Debugging

        // Display current weather
        const currentWeather = data.list[0];
        document.querySelector("#current-temp").textContent = `${currentWeather.main.temp.toFixed(1)}°C`;

        const iconSrc = `https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`;
        document.querySelector("#weather-icon").src = iconSrc;
        document.querySelector("#weather-icon").alt = currentWeather.weather[0].description;
        document.querySelector("figcaption").textContent = currentWeather.weather[0].description;

        // Build 3-day forecast
        let forecastHTML = "";
        const forecastDays = [8, 16, 24]; // Pick correct indexes (every 24h)
        
        forecastDays.forEach((index) => {
            if (data.list[index]) {
                let dayData = data.list[index];
                let date = new Date(dayData.dt_txt).toLocaleDateString("en-US", { weekday: "long" });

                forecastHTML += `
                    <div>
                        <p>${date}</p>
                        <p>${dayData.main.temp.toFixed(1)}°C</p>
                    </div>
                `;
            }
        });
        document.querySelector("#forecast-info").innerHTML = forecastHTML;

    } catch (error) {
        console.error("Error fetching weather:", error);
        document.querySelector("#weather-info").innerHTML = "Error loading weather data.";
    }
}

async function getSpotlightMembers() {
    const url = "./data/members.json";  // ✅ Correct relative path

    console.log("Fetching from:", url); // Debugging

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch members data");

        const members = await response.json(); // ✅ Directly an array, no `members` key
        console.log("Fetched Members Data:", members); // Debugging

        // Filter Gold (3) and Silver (2) members
        const goldSilverMembers = members.filter(member => member.membership >= 2);
        
        // Select up to 3 random members
        const selectedMembers = goldSilverMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

        let spotlightHTML = "";
        selectedMembers.forEach(member => {
            const imagePath = member.image ? `images/${member.image}` : "images/default.png";

            spotlightHTML += `
                <div class="spotlight">
                    <img src="${imagePath}" alt="${member.name} logo"> 
                    <h4>${member.name}</h4>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                    <p class="membership">${member.membership === 3 ? "Gold" : "Silver"} Member</p>
                </div>
            `;
        });

        document.querySelector("#spotlight-container").innerHTML = spotlightHTML;
    } catch (error) {
        console.error("Error fetching members:", error);
        document.querySelector("#spotlight-container").innerHTML = "Error loading spotlight members.";
    }
}

// Call function when the page loads
getSpotlightMembers();
