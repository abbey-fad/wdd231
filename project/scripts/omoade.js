
// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    fetchItems();

    // Add event listener to the menu toggle button
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    // Make sure the elements exist on the page before adding event listener
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show'); // Toggle the 'show' class to display/hide nav
        });
    }
    

    const productContainer = document.getElementById("product");
    const gridViewBtn = document.getElementById("grid-view");
    const listViewBtn = document.getElementById("list-view");

    async function fetchItems() {
        try {
            const response = await fetch("data/items.json");
            if (!response.ok) {
                throw new Error("Failed to fetch items data");
            }
            const items = await response.json();
            displayItems(items, "grid");

            // Ensure buttons work only after data is loaded
            gridViewBtn.addEventListener("click", () => displayItems(items, "grid"));
            listViewBtn.addEventListener("click", () => displayItems(items, "list"));
        } catch (error) {
            console.error("Error loading items:", error);
            productContainer.innerHTML = `<p class="error-message">⚠️ Error loading product. Please try again later.</p>`;
        }
    }

    function formatPrice(priceStr) {
        if (priceStr.includes('#')) {
            return '&#8358;' + priceStr.replace('#', '').trim(); // Using HTML entity for Naira symbol
        }
        return priceStr;
    }

    function displayItems(items, viewMode) {
        productContainer.innerHTML = "";
        productContainer.className = viewMode;

        items.forEach(item => {
            const itemCard = document.createElement("div");
            itemCard.classList.add("item-card");

            const imagePath = item.image ? `images/${item.image}` : "images/default.webp";

            itemCard.innerHTML = `
                <img src="${imagePath}" alt="${item.name} logo" class="lazy-load">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>${formatPrice(item.price)}</p>
                    <p>${item.description}</p>
                </div>
            `;

            itemCard.addEventListener("click", () => openModal(item));

            productContainer.appendChild(itemCard);
        });
    }

      // Open modal with item details
function openModal(item) {
    const modal = document.getElementById('item-modal');
    const modalName = document.getElementById('modal-item-name');
    const modalImage = document.getElementById('modal-item-image');
    const modalPrice = document.getElementById('modal-item-price');
    const modalDescription = document.getElementById('modal-item-description');
    
    modalName.textContent = item.name;
    modalImage.src = item.image;
    modalPrice.textContent = item.price;
    modalDescription.textContent = item.description;

    modal.style.display = 'flex';

    // Store item in localStorage as favorite (optional)
    localStorage.setItem('favoriteItem', JSON.stringify(item));
}

// Close the modal
function closeModal() {
    const modal = document.getElementById('item-modal');
    modal.style.display = 'none';
}

// Event listener to close modal
const closeModalBtn = document.getElementById('close-modal');
closeModalBtn.addEventListener('click', closeModal);

                             
});

document.addEventListener("DOMContentLoaded", () => {
    const lazyImages = document.querySelectorAll('img.lazy-load');
    const config = {
        root: null, // use the viewport as the root
        rootMargin: '0px', // no margin
        threshold: 0.1 // load the image when 10% is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lazyImage = entry.target;
                // Log when the image starts loading
                console.log(`Image ${lazyImage.src} is about to load`);

                lazyImage.src = lazyImage.getAttribute('data-src'); // load the image
                lazyImage.classList.remove('lazy-load'); // remove the lazy-load class
                observer.unobserve(lazyImage); // stop observing after loading

                // Log after the image has loaded
                console.log(`Image ${lazyImage.src} has loaded`);
            }
        });
    }, config);

    lazyImages.forEach(image => {
        observer.observe(image); // start observing each lazy image

        // Log when each image is being observed
        console.log(`Observing image: ${image.src}`);
    });
});



    

