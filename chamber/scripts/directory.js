document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    } else {
        console.error("Menu toggle or navigation menu not found!");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    } else {
        console.error("Menu toggle or navigation menu not found!");
    }

    const gridButton = document.getElementById("grid-view");
    const listButton = document.getElementById("list-view");
    const directory = document.getElementById("directory");

    gridButton.addEventListener("click", () => {
        directory.classList.add("grid");
        directory.classList.remove("list");
        gridButton.classList.add("active");
        listButton.classList.remove("active");
    });

    listButton.addEventListener("click", () => {
        directory.classList.add("list");
        directory.classList.remove("grid");
        listButton.classList.add("active");
        gridButton.classList.remove("active");
    });

    fetch("data/members.json")
        .then(res => res.json())
        .then(data => displayMembers(data))
        .catch(err => {
            console.error("Error loading data:", err);
            directory.innerHTML = `<p class="error">Unable to load directory data.</p>`;
        });

    function displayMembers(members) {
        members.forEach(member => {
            const card = document.createElement("section");
            card.classList.add("member-card");

            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy">
                <h2>${member.name}</h2>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Industry:</strong> ${member.industry}</p>
                <p><strong>Membership Level:</strong> ${getMembershipName(member.membership)}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            `;

            directory.appendChild(card);
        });
    }

    function getMembershipName(level) {
        switch (level) {
            case 1: return "Bronze";
            case 2: return "Silver";
            case 3: return "Gold";
            default: return "Member";
        }
    }
});

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

document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("last-modified").textContent = document.lastModified;

    // Function to get query parameters from the URL
    function getQueryParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            firstName: params.get('first-name'),
            lastName: params.get('last-name'),
            email: params.get('email'),
            phone: params.get('phone'),
            organization: params.get('organization'),
            timestamp: params.get('timestamp')
        };
    }

    // Populate the thank you page with the form data
    window.onload = function() {
        const data = getQueryParams();
        document.getElementById("first-name").textContent = data.firstName;
        document.getElementById("last-name").textContent = data.lastName;
        document.getElementById("email").textContent = data.email;
        document.getElementById("phone").textContent = data.phone;
        document.getElementById("organization").textContent = data.organization;
        document.getElementById("timestamp").textContent = data.timestamp;
    };

// When the page is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the current date and time
    const currentDate = new Date();

    // Format the date in a readable format
    const formattedDate = currentDate.toLocaleString();

    // Set the timestamp span to show the current date
    document.getElementById("timestamp").textContent = formattedDate;
});

// Form submission (if you have a form)
document.querySelector('#registration-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form submission if necessary

    // Get the current date and time
    const currentDate = new Date();
    
    // Format the date in a readable way
    const formattedDate = currentDate.toLocaleString();

    // Set the timestamp element's text to the current date and time
    document.getElementById("timestamp").textContent = formattedDate;

    // Submit the form if necessary after setting the timestamp
    event.target.submit();
});

