// course.js

// Sample Course List Array
const courses = [
    { courseId: "CSE 110", type: "CSE", completed: true,  credits: 3 },
    { courseId: "WDD 130", type: "WDD", completed: false, credits: 3 },
    { courseId: "CSE 111", type: "CSE", completed: false, credits: 4 },
    { courseId: "CSE 210", type: "CSE", completed: true,  credits: 3 },
    { courseId: "WDD 131", type: "WDD", completed: false, credits: 3 },
    { courseId: "WDD 231", type: "WDD", completed: true,  credits: 4 }
  ];
  
  // Function to display courses
  function displayCourses(filterType = "all") {
    const courseListDiv = document.querySelector(".course-list");
    if (!courseListDiv) return;
  
    // Filter courses based on type
    let filteredCourses = courses;
    if (filterType !== "all") {
      filteredCourses = courses.filter(course => course.type === filterType);
    }
  
    // Build HTML for course buttons
    let html = "";
    filteredCourses.forEach(course => {
      // Apply a different CSS class for completed courses
      const completedClass = course.completed ? " completed-course" : "";
      html += `
        <button class="course-btn ${course.type.toLowerCase()}${completedClass}">
          ${course.courseId}
        </button>
      `;
    });
    courseListDiv.innerHTML = html;
  
    // Compute total credits using reduce
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
  
    // Update or create an element to display total credits
    let totalCreditsElement = document.getElementById("total-credits");
    if (!totalCreditsElement) {
      totalCreditsElement = document.createElement("p");
      totalCreditsElement.id = "total-credits";
      // Append the total credits element to the certificate section
      const certificateSection = document.querySelector(".Certificate");
      certificateSection.appendChild(totalCreditsElement);
    }
    totalCreditsElement.textContent = `Total Credits: ${totalCredits}`;
  }
  
  // Set up event listeners after DOM loads
  document.addEventListener("DOMContentLoaded", () => {
    // Display all courses on page load
    displayCourses("all");
  
    // Event listeners for filter buttons
    const showAllBtn = document.getElementById("show-all");
    const showCseBtn = document.getElementById("show-cse");
    const showWddBtn = document.getElementById("show-wdd");
  
    if (showAllBtn) {
      showAllBtn.addEventListener("click", () => displayCourses("all"));
    }
    if (showCseBtn) {
      showCseBtn.addEventListener("click", () => displayCourses("CSE"));
    }
    if (showWddBtn) {
      showWddBtn.addEventListener("click", () => displayCourses("WDD"));
    }
  });
  