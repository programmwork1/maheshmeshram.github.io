// Load skills dynamically with animation
fetch("skills.json")
  .then(response => response.json())
  .then(data => {
    const skillsContainer = document.getElementById("skills-list");
    data.skills.forEach((skill, index) => {
      const span = document.createElement("span");
      span.textContent = skill;
      skillsContainer.appendChild(span);
      // Animate sequentially
      setTimeout(() => {
        span.style.opacity = "1";
        span.style.transform = "translateY(0)";
      }, index * 150);
    });
  })
  .catch(error => console.error("Error loading skills:", error));

// Hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Animate section titles on scroll
const sections = document.querySelectorAll("section h2");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.3 });

sections.forEach(section => observer.observe(section));