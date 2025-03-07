document.addEventListener("DOMContentLoaded", () => {
  const footerParagraph = document.querySelector("footer p:first-of-type");
  if (footerParagraph) {
    footerParagraph.innerHTML = footerParagraph.innerHTML.replace(/\d{4}/, new Date().getFullYear());
  }

  const lastModifiedElement = document.getElementById("lastModified");
  if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Update: ${document.lastModified}`;
  }
});
