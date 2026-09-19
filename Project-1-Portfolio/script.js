/* ================= MOBILE NAV ================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

function closeMenu() {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");

  const icon = menuToggle.querySelector("i");
  icon.classList.remove("fa-xmark");
  icon.classList.add("fa-bars");
}

menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute(
    "aria-label",
    open ? "Close navigation menu" : "Open navigation menu"
  );

  const icon = menuToggle.querySelector("i");
  icon.classList.toggle("fa-bars", !open);
  icon.classList.toggle("fa-xmark", open);
});

document.querySelectorAll(".nav-link, .nav-cta").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});


/* ================= ACTIVE NAV ================= */

const sections = document.querySelectorAll(".section-anchor");
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

sections.forEach((section) => observer.observe(section));


/* ================= CONTACT FORM ================= */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formMessage.textContent = "Please complete all fields.";
    return;
  }

  formMessage.textContent =
    `Thank you, ${name}! Your message has been submitted.`;

  contactForm.reset();
});


/* ================= PLACEHOLDER CV ================= */

document.getElementById("cvLink").addEventListener("click", (event) => {
  if (event.currentTarget.getAttribute("href") === "#") {
    event.preventDefault();
    alert("Add your CV file/link here before submitting your portfolio.");
  }
});
