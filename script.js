// Wait until page loads
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav-links");

  // 🔹 Create mobile menu toggle button
  const toggle = document.createElement("div");
  toggle.classList.add("menu-toggle");
  toggle.innerHTML = "☰"; // hamburger icon
  document.querySelector(".navbar").insertBefore(toggle, nav);

  // Toggle menu open/close on click
  toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  // 🔹 Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});