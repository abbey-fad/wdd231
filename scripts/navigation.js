document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navUl = document.querySelector("nav ul");
  
    if (!menuToggle || !navUl) return;
  
    menuToggle.addEventListener("click", () => {
      // Use computed style to check display property
      const currentDisplay = window.getComputedStyle(navUl).display;
      if (currentDisplay === "none") {
        navUl.style.display = "flex";
        navUl.style.flexDirection = "column"; // For vertical layout on small screens
      } else {
        navUl.style.display = "none";
      }
    });
  });
  