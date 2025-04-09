document.addEventListener("DOMContentLoaded", () => {
    // Get URL parameters
    const params = new URLSearchParams(window.location.search);
  
    // Display each form value
    document.getElementById("first-name-display").textContent = params.get("first-name") || "Not provided";
    document.getElementById("last-name-display").textContent = params.get("last-name") || "Not provided";
    document.getElementById("email-display").textContent = params.get("email") || "Not provided";
    document.getElementById("phone-display").textContent = params.get("phone") || "Not provided";
    document.getElementById("date-display").textContent = params.get("date") || "Not provided";
    document.getElementById("message-display").textContent = params.get("membership-level") || "Not provided";
  
    // Set the current year
    document.getElementById("year").textContent = new Date().getFullYear();
  
    // Set the last modified date
    const lastModified = document.lastModified;
    document.getElementById("last-modified").textContent = lastModified;
  
    // Optional: Menu toggle logic
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
  
    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
      });
    }
  });
  