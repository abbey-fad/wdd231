// gallery.js

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
