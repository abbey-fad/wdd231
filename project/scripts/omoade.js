// Fetch product data from local JSON file
async function fetchProducts() {
    try {
        const response = await fetch('./data/products.json');
        const data = await response.json();
        displayProducts(data);  // Pass data to the display function
    } catch (error) {
        console.error("Error fetching product data:", error);
    }
}

// Display products dynamically
function displayProducts(products) {
    const productList = document.querySelector('.product-grid');

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        
        // Create HTML using template literals
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <button data-id="${product.id}">View Details</button>
        `;
        
        // Append the product item to the grid
        productList.appendChild(productItem);
    });

    displayProduct();
 
    // Add event listener for product buttons
    const buttons = document.querySelectorAll('.product-item button');
    buttons.forEach(button => {
        button.addEventListener('click', event => {
            const productId = event.target.dataset.id;
            const product = products.find(p => p.id == productId);
            openModal(product);
        });
    });
}

// Open modal with product details
function openModal(product) {
    const modal = document.getElementById('product-modal');
    const modalName = document.getElementById('modal-product-name');
    const modalImage = document.getElementById('modal-product-image');
    const modalPrice = document.getElementById('modal-product-price');
    const modalDescription = document.getElementById('modal-product-description');
    
    modalName.textContent = product.name;
    modalImage.src = product.image;
    modalPrice.textContent = product.price;
    modalDescription.textContent = product.description;

    modal.style.display = 'flex';

    // Store product in localStorage as favorite (optional)
    localStorage.setItem('favoriteProduct', JSON.stringify(product));
}

// Close the modal
function closeModal() {
    const modal = document.getElementById('product-modal');
    modal.style.display = 'none';
}

// Event listener to close modal
const closeModalBtn = document.getElementById('close-modal');
closeModalBtn.addEventListener('click', closeModal);

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();

    // Add event listener to the menu toggle button
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    // Make sure the elements exist on the page before adding event listener
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show'); // Toggle the 'show' class to display/hide nav
        });
    }
});
