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

    const directoryContainer = document.getElementById("directory");
    const gridViewBtn = document.getElementById("grid-view");
    const listViewBtn = document.getElementById("list-view");

    async function fetchMembers() {
        try {
            const response = await fetch("data/members.json");
            if (!response.ok) {
                throw new Error("Failed to fetch members data");
            }
            const members = await response.json();
            displayMembers(members, "grid");

            // Ensure buttons work only after data is loaded
            gridViewBtn.addEventListener("click", () => displayMembers(members, "grid"));
            listViewBtn.addEventListener("click", () => displayMembers(members, "list"));
        } catch (error) {
            console.error("Error loading members:", error);
            directoryContainer.innerHTML = `<p class="error-message">⚠️ Error loading directory. Please try again later.</p>`;
        }
    }

    function displayMembers(members, viewMode) {
        directoryContainer.innerHTML = "";
        directoryContainer.className = viewMode;

        members.forEach(member => {
            const memberCard = document.createElement("div");
            memberCard.classList.add("member-card");

            const imagePath = member.image ? `images/${member.image}` : "images/default.png";

            memberCard.innerHTML = `
                <img src="${imagePath}" alt="${member.name} logo">
                <div class="member-details">
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                    <p class="membership-level">${getMembershipLevel(member.membership)}</p>
                </div>
            `;

            directoryContainer.appendChild(memberCard);
        });
    }

    function getMembershipLevel(level) {
        const levels = {
            1: "Member",
            2: "Silver Member",
            3: "Gold Member"
        };
        return levels[level] || "Member";
    }

    fetchMembers();
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

document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.querySelector(".grid-container");

    // Fetch places.json
    fetch("data/places.json")
        .then(response => response.json())
        .then(data => {
            displayPlaces(data); // FIX: No ".items", use "data" directly
        })
        .catch(error => console.error("Error loading places.json:", error));

    function displayPlaces(places) {
        gridContainer.innerHTML = ""; // Clear previous content
        places.forEach(place => {
            const card = document.createElement("div");
            card.classList.add("place-card");

            card.innerHTML = `
                <img src="${place.image ? place.image : 'placeholder.jpg'}" alt="${place.name}">
                <h3>${place.name}</h3>
                <p><strong>Location:</strong> ${place.address}</p>
                <p>${place.description}</p>
            `;

            gridContainer.appendChild(card);
        });
    }
});

// Check for last visit date and display the message
const lastVisit = localStorage.getItem('lastVisit');
const currentDate = new Date();
const sidebarMessage = document.getElementById('sidebar-message');

if (sidebarMessage) { // Ensure the element exists
    if (lastVisit) {
        const lastVisitDate = new Date(parseInt(lastVisit));
        const timeDifference = Math.floor((currentDate - lastVisitDate) / (1000 * 3600 * 24)); // in days

        let message = '';
        if (timeDifference === 0) {
            message = 'Back so soon! Awesome!';
        } else if (timeDifference === 1) {
            message = 'You last visited 1 day ago.';
        } else {
            message = `You last visited ${timeDifference} days ago.`;
        }
        sidebarMessage.textContent = message;
    } else {
        sidebarMessage.textContent = 'Welcome! Let us know if you have any questions.';
    }
}

// Store the current visit date
localStorage.setItem('lastVisit', currentDate.getTime());
