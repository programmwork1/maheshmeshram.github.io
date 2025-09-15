// Hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Load skills dynamically from skills.json
const skillsContainer = document.getElementById("skills-list");

if (skillsContainer) {
  fetch("skills.json")
    .then(response => response.json())
    .then(skills => {
      skills.forEach(skill => {
        const span = document.createElement("span");
        span.textContent = skill;
        skillsContainer.appendChild(span);
      });
    })
    .catch(err => console.error("Failed to load skills:", err));
}