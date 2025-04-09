// Data for the gallerys
const gallerys = [
      {
        "name": "Slide1",
        "price": "#8,000",
        "description": "Size 42.",
        "photo_link": "slide1.webp"
      },
      {
        "name": "Sneaker 2",
        "price": "$129.99",
        "description": "Stylish sneaker with premium materials.",
        "image": "images/product2.jpg"
      },
      {
        "name": "Sneaker 3",
        "price": "$89.99",
        "description": "Affordable yet durable sneaker.",
        "image": "images/product3.jpg"
      },
      {
        "name": "Sneaker 4",
        "price": "$109.99",
        "description": "Sporty and comfortable for any workout.",
        "image": "images/product4.jpg"
      },
      {
        "name": "Sneaker 5",
        "price": "$159.99",
        "description": "Luxury sneaker with a sleek design.",
        "image": "images/product5.jpg"
      },
      {
        "name": "Sneaker 6",
        "price": "$159.99",
        "description": "Luxury sneaker with a sleek design.",
        "image": "images/product5.jpg"
      }
];

// Function to display gallerys
function displayGallerys() {
    const allgallerys = document.getElementById('allgallerys');
    
    gallerys.forEach(gallery => {
        const thecard = document.createElement('div');
        thecard.classList.add('gallery-card'); // Optional: Add a class for styling

        // Create the image element
        const thephoto = document.createElement('img');
        thephoto.src = `images/${gallery.photo_link}`;
        thephoto.alt = gallery.name;
        thecard.appendChild(thephoto);

        // Create the title element (h2)
        const thetitle = document.createElement('h2');
        thetitle.innerText = gallery.name;
        thecard.appendChild(thetitle);

        // Create the price element (price)
        const theprice = document.createElement('span');
        theprice.innerText = gallery.price;
        thecard.appendChild(theprice);

        // Create the description element (p)
        const thedesc = document.createElement('p');
        thedesc.innerText = gallery.description;
        thecard.appendChild(thedesc);

        // Add the card to the 'allgallerys' div
        allgallerys.appendChild(thecard);
    });
}


// Add event listener to the menu toggle button
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    // Make sure the elements exist before adding event listener
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show'); // Toggle the 'show' class to display/hide nav
        });
    }
});
// Call the functions on load
displayGallerys();

