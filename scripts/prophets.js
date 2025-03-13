const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json'; 
const cards = document.querySelector('#cards');
let allProphets = [];

// Fetch Prophet Data
async function getProphetData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        allProphets = data.prophets; // Store data globally
        displayProphets(allProphets);
    } catch (error) {
        console.error("Error fetching prophet data:", error);
    }
}

// Function to Display Prophets
const displayProphets = (prophets) => {
    cards.innerHTML = ''; // Clear previous content

    prophets.forEach((prophet) => {
        // Create card elements
        let card = document.createElement('section');
        let fullName = document.createElement('h2'); 
        let birthDate = document.createElement('p');
        let birthPlace = document.createElement('p');
        let portrait = document.createElement('img');

        // Populate text content
        fullName.textContent = `${prophet.name} ${prophet.lastname} – ${prophet.order}th President`;
        birthDate.textContent = `Born: ${prophet.birthdate}`;
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

        // Set portrait attributes
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} – ${prophet.order}th Latter-day President`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // Append elements to the card
        card.appendChild(fullName);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(portrait);

        // Append the card to the main container
        cards.appendChild(card);
    });
};

// Filter Event Listeners
document.querySelector('#bornInUtah').addEventListener('click', () => {
    displayProphets(allProphets.filter(prophet => prophet.birthplace.includes('Utah')));
});

document.querySelector('#bornOutsideUS').addEventListener('click', () => {
    displayProphets(allProphets.filter(prophet => !prophet.birthplace.includes('United States')));
});

document.querySelector('#livedTo95').addEventListener('click', () => {
    displayProphets(allProphets.filter(prophet => (prophet.death - prophet.birth) >= 95));
});

document.querySelector('#tenOrMoreChildren').addEventListener('click', () => {
    displayProphets(allProphets.filter(prophet => prophet.numofchildren >= 10));
});

document.querySelector('#served15Years').addEventListener('click', () => {
    displayProphets(allProphets.filter(prophet => parseInt(prophet.length) >= 15));
});

document.querySelector('#reset').addEventListener('click', () => displayProphets(allProphets));

// Fetch and display data on page load
getProphetData();
