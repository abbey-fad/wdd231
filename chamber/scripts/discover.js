// Data for the places
const places = [
    {
        "name": "Osun Osogbo Sacred Grove",
        "address": "Osogbo, Osun State, Nigeria",
        "description": "A UNESCO World Heritage site and sacred grove dedicated to the goddess of fertility, Osun.",
        "photo_link": "osun-osogbo-sacred-grove.webp"
    },
    {
        "name": "National Museum, Lagos",
        "address": "Awolowo Rd, Lagos, Nigeria",
        "description": "A museum showcasing Nigeria's rich cultural heritage and history.",
        "photo_link": "national-museum-lagos.webp"
    },
    {
        "name": "Kainji National Park",
        "address": "New Bussa, Niger State, Nigeria",
        "description": "A national park home to various wildlife, including elephants, lions, and hippos.",
        "photo_link": "kainji-national-park.webp"
    },
    {
        "name": "Benin City National Museum",
        "address": "Benin City, Edo State, Nigeria",
        "description": "A museum showcasing the history and culture of the Benin Empire.",
        "photo_link": "benin-city-national-museum .webp"
    },
    {
        "name": "Olumo Rock",
        "address": "Abeokuta, Ogun State, Nigeria",
        "description": "A historic rock formation and tourist attraction.",
        "photo_link": "olumo-rock.webp"
    },
    {
        "name": "Yankari Game Reserve",
        "address": "Bauchi, Bauchi State, Nigeria",
        "description": "A game reserve home to various wildlife, including elephants, lions, and buffalo.",
        "photo_link": "yankari-game-reserve.webp"
    },
    {
        "name": "Nike Art Gallery",
        "address": "Lagos, Nigeria",
        "description": "A gallery showcasing Nigerian art and culture.",
        "photo_link": "nike-art-gallery.webp"
    },
    {
        "name": "Erin Ijesha Waterfalls",
        "address": "Erin Ijesha, Osun State, Nigeria",
        "description": "A scenic waterfall and tourist attraction.",
        "photo_link": "erin-ijesha-waterfalls.webp"
    }
];

// Function to display places
function displayPlaces() {
    const allplaces = document.getElementById('allplaces');
    
    places.forEach(place => {
        const thecard = document.createElement('div');
        thecard.classList.add('place-card'); // Optional: Add a class for styling

        // Create the image element
        const thephoto = document.createElement('img');
        thephoto.src = `images/${place.photo_link}`;
        thephoto.alt = place.name;
        thecard.appendChild(thephoto);

        // Create the title element (h2)
        const thetitle = document.createElement('h2');
        thetitle.innerText = place.name;
        thecard.appendChild(thetitle);

        // Create the address element (address)
        const theaddress = document.createElement('address');
        theaddress.innerText = place.address;
        thecard.appendChild(theaddress);

        // Create the description element (p)
        const thedesc = document.createElement('p');
        thedesc.innerText = place.description;
        thecard.appendChild(thedesc);

        // Optionally, add a button or link to learn more
        const learnMoreButton = document.createElement('button');
        learnMoreButton.innerText = 'Learn More';
        thecard.appendChild(learnMoreButton);

        // Add the card to the 'allplaces' div
        allplaces.appendChild(thecard);
    });
}

// Function to check last visit and show appropriate message
function checkLastVisit() {
    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = new Date();
    const timeDiff = lastVisit ? (currentDate - new Date(lastVisit)) / (1000 * 3600 * 24) : 0;
    let message = "Welcome! Let us know if you have any questions.";

    if (timeDiff > 0 && timeDiff <= 7) {
        message = `Welcome back! You last visited ${Math.round(timeDiff)} day(s) ago.`;
    } else if (timeDiff > 7) {
        message = `It's been more than a week since your last visit. Welcome back!`;
    }

    // Show the message in the sidebar
    document.getElementById('sidebar').textContent = message;

    // Update the last visit time in localStorage
    localStorage.setItem('lastVisit', currentDate.toISOString());
}

// Menu toggle functionality
const menuToggleButton = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggleButton.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Call the functions on load
displayPlaces();
checkLastVisit();