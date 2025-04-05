import { places } from '../data/places.mjs';

document.addEventListener("DOMContentLoaded", () => {
    console.log(places);

    const showHere = document.querySelector("#allplaces");

    function displayItems(places) {
        places.forEach(x => {
            const thecard = document.createElement('div');
            const thephoto = document.createElement('img');

            thephoto.src = `images/${x.photo_link}`;
            thephoto.alt = x.name;
            thecard.appendChild(thephoto);

            const thetitle = document.createElement('h2');
            thetitle.innerText = x.name;
            thecard.appendChild(thetitle);

            const theaddress = document.createElement('address');
            theaddress.innerText = x.address;
            thecard.appendChild(theaddress);

            const thedesc = document.createElement('p');
            thedesc.innerText = x.description;
            thecard.appendChild(thedesc);

            showHere.appendChild(thecard);
        });
    }

    displayItems(places);

    // --- Sidebar Visit Message ---
    const sidebar = document.querySelector("#sidebar");
    const now = new Date();
    const lastVisit = localStorage.getItem("lastVisit");

    function getDaysBetween(date1, date2) {
        const msPerDay = 1000 * 60 * 60 * 24;
        const diffTime = date2 - date1;
        return Math.floor(diffTime / msPerDay);
    }

    let message = "";

    if (!lastVisit) {
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const previousVisit = new Date(lastVisit);
        const daysBetween = getDaysBetween(previousVisit, now);

        if (daysBetween < 1) {
            message = "Back so soon! Awesome!";
        } else if (daysBetween === 1) {
            message = "You last visited 1 day ago.";
        } else {
            message = `You last visited ${daysBetween} days ago.`;
        }
    }

    sidebar.innerHTML = `<p>${message}</p>`;
    localStorage.setItem("lastVisit", now.toString());

    // Hamburger menu
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