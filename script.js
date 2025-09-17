// ======================
// Navbar Scroll Effect
// ======================
const navbar = document.querySelector("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("solid");
    navbar.classList.remove("transparent");
  } else {
    navbar.classList.add("transparent");
    navbar.classList.remove("solid");
  }
});

// ======================
// Hamburger Menu Toggle
// ======================
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("show");
  });
}

// Close menu when clicking a link (on mobile)
if (navLinks) {
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("show");
    });
  });
}

// ======================
// Resume Download Button
// ======================
const resumeBtn = document.querySelector("#downloadResume");
if (resumeBtn) {
  resumeBtn.addEventListener("click", () => {
    // Change this path if your resume.pdf is stored elsewhere
    window.open("resume.pdf", "_blank");
  });
}

// ======================
// Smooth Scrolling (internal links)
// ======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// ======================
// Debug Info (optional)
// ======================
// console.log("Portfolio script.js loaded successfully ✅");