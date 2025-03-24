// Sample Course List Array
const courses = [
  { courseId: "CSE 110", type: "CSE", completed: true, credits: 3, subject: "Computer Science", number: 110, title: "Intro to Programming", description: "Basic programming concepts.", certificate: "No", technology: ["Python"] },
  { courseId: "WDD 130", type: "WDD", completed: false, credits: 3, subject: "Web Development", number: 130, title: "Web Fundamentals", description: "HTML, CSS basics.", certificate: "No", technology: ["HTML", "CSS"] },
  { courseId: "CSE 111", type: "CSE", completed: false, credits: 4, subject: "Computer Science", number: 111, title: "Intermediate Programming", description: "Advanced programming techniques.", certificate: "Yes", technology: ["Python", "OOP"] },
  { courseId: "CSE 210", type: "CSE", completed: true, credits: 3, subject: "Computer Science", number: 210, title: "Software Engineering", description: "Software development principles.", certificate: "Yes", technology: ["Java"] },
  { courseId: "WDD 131", type: "WDD", completed: false, credits: 3, subject: "Web Development", number: 131, title: "Advanced Web Design", description: "CSS Flexbox and Grid.", certificate: "No", technology: ["CSS", "JavaScript"] },
  { courseId: "WDD 231", type: "WDD", completed: true, credits: 4, subject: "Web Development", number: 231, title: "JavaScript Programming", description: "JavaScript fundamentals.", certificate: "Yes", technology: ["JavaScript", "DOM"] }
];

// Function to display courses
function displayCourses(filterType = "all") {
  const courseListDiv = document.querySelector(".course-list");
  if (!courseListDiv) return;

  let filteredCourses = courses;
  if (filterType !== "all") {
      filteredCourses = courses.filter(course => course.type === filterType);
  }

  let html = "";
  filteredCourses.forEach(course => {
      const completedClass = course.completed ? " completed-course" : "";
      html += `
          <button class="course-btn ${course.type.toLowerCase()}${completedClass}" data-course-id="${course.courseId}">
              ${course.courseId}
          </button>
      `;
  });
  courseListDiv.innerHTML = html;

  // Compute total credits
  const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
  let totalCreditsElement = document.getElementById("total-credits");
  if (!totalCreditsElement) {
      totalCreditsElement = document.createElement("p");
      totalCreditsElement.id = "total-credits";
      document.querySelector(".Certificate").appendChild(totalCreditsElement);
  }
  totalCreditsElement.textContent = `Total Credits: ${totalCredits}`;

  // Add event listeners to course buttons
  document.querySelectorAll(".course-btn").forEach(button => {
      button.addEventListener("click", () => {
          const courseId = button.getAttribute("data-course-id");
          const course = courses.find(c => c.courseId === courseId);
          if (course) {
              displayCourseDetails(course);
          }
      });
  });
}

// Function to display the modal with course details
function displayCourseDetails(course) {
  const courseDetails = document.getElementById("course-details");
  if (!courseDetails) return;

  courseDetails.innerHTML = `
      <button id="closeModal">❌</button>
      <h2>${course.subject} ${course.number}</h2>
      <h3>${course.title}</h3>
      <p><strong>Credits</strong>: ${course.credits}</p>
      <p><strong>Certificate</strong>: ${course.certificate}</p>
      <p>${course.description}</p>
      <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
  `;
  courseDetails.showModal();

  document.getElementById("closeModal").addEventListener("click", () => {
      courseDetails.close();
  });
}

// Event listeners after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  displayCourses("all");

  document.getElementById("show-all")?.addEventListener("click", () => displayCourses("all"));
  document.getElementById("show-cse")?.addEventListener("click", () => displayCourses("CSE"));
  document.getElementById("show-wdd")?.addEventListener("click", () => displayCourses("WDD"));
});
