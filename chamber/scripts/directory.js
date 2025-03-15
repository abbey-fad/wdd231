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
