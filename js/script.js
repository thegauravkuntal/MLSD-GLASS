
const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("overlay");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("translate-x-full");
  overlay.classList.remove("hidden");
});

closeMenu.addEventListener("click", closeNav);
overlay.addEventListener("click", closeNav);

function closeNav() {
  mobileMenu.classList.add("translate-x-full");
  overlay.classList.add("hidden");
}







const elements = document.querySelectorAll("[data-animate]");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      const el = entry.target;
      const type = el.getAttribute("data-animate");

      el.classList.remove(
        "opacity-0",
        "translate-y-10",
        "-translate-x-10",
        "translate-x-10",
        "scale-95"
      );

      el.classList.add("opacity-100");

      if (type === "left" || type === "right") {
        el.classList.add("translate-x-0");
      }

      if (type === "top") {
        el.classList.add("translate-y-0");
      }

      if (type === "zoom") {
        el.classList.add("scale-100");
      }

      observer.unobserve(el); // 🔥 IMPORTANT (performance + mobile fix)
    }
  });
}, {
  threshold: 0.1, // 🔥 mobile ke liye better
  rootMargin: "0px 0px -50px 0px" // 🔥 thoda pehle trigger
});

elements.forEach(el => observer.observe(el));


// 🔥 EXTRA FIX (page load pe jo already visible hain)
window.addEventListener("load", () => {
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.remove(
        "opacity-0",
        "translate-y-10",
        "-translate-x-10",
        "translate-x-10",
        "scale-95"
      );
      el.classList.add("opacity-100","translate-x-0","translate-y-0","scale-100");
    }
  });
});
