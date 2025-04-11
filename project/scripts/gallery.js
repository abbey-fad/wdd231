// Data for the gallerys
const gallerys = [
  {
    "name": "Slide",
    "price": "#8,000",
    "description": "Size 42.",
    "photo_link": "slide1.webp"
  },
  {
    "name": "Fashion Sport",
    "price": "#6,500",
    "description": "Size 34.",
    "photo_link": "sport-fashion1.webp"
  },
  {
    "name": "Adidas Sandal",
    "price": "#15,000",
    "description": "Size 44.",
    "photo_link": "adidas-sandal.webp"
  },
  {
    "name": "Prada Sandal",
    "price": "#7,500",
    "description": "Size 41.",
    "photo_link": "prada-sandal.webp"
  },
  {
    "name": "White Sneakers",
    "price": "#11,000",
    "description": "Size 38, 40, 41, 45",
    "photo_link": "white-sneakers.webp"
  },
  {
    "name": "Gucci",
    "price": "#5,500",
    "description": "Size 37 (Lite).",
    "photo_link": "Gucci.webp"
  },   
  {
    "name": "Soccer Boot",
    "price": "#10,000",
    "description": "Size 43.",
    "photo_link": "soccer-boot.webp"
  } ,  
  {
    "name": "Cotton Boxer",
    "price": "#7,000",
    "description": "4in1 cotton boxers (L).",
    "photo_link": "cotton-boxer.webp"
  },
  {
    "name": "Cufflinks",
    "price": "#1,500",
    "description": "Cufflinks.",
    "photo_link": "cufflinks.webp"
  },
  {
    "name": "Layers Top",
    "price": "#4,500",
    "description": "Armless",
    "photo_link": "layers.webp"
  },
  {
    "name": "Iky Singlet",
    "price": "#8,000",
    "description": "3in1 singlet.",
    "photo_link": "lky-singlet.webp"
  },
  {
    "name": "Roundneck Top",
    "price": "#2,500",
    "description": "White round neck (XL).",
    "photo_link": "roundneck.webp"
  },
  {
    "name": "Towel",
    "price": "#5,000",
    "description": "2in1 towel, Brown",
    "photo_link": "towel.webp"
  },
  {
    "name": "Suede Polish Spray",
    "price": "#3,000",
    "description": "black, Brown, Oxblood",
    "photo_link": "shoe-polish.webp"
  },
  {
    "name": "Powerbank",
    "price": "#19,000",
    "description": "20000mAh",
    "photo_link": "powerbank.webp"
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

