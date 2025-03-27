document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);

    document.getElementById("display-name").textContent = params.get("name") || "Not provided";
    document.getElementById("display-email").textContent = params.get("email") || "Not provided";
    document.getElementById("display-date").textContent = params.get("date") || "Not provided";
    document.getElementById("display-guests").textContent = params.get("guests") || "Not provided";
    document.getElementById("display-comments").textContent = params.get("comments") || "None";
});
