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