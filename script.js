const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");
const revealItems = document.querySelectorAll(".reveal");
const pageLinks = document.querySelectorAll(".page-link");
const pageTransition = document.querySelector(".page-transition");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  navAnchors.forEach((anchor) => {
    anchor.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    });
  });
}

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion) {
  revealItems.forEach((item) => item.classList.add("visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

if (!reducedMotion && pageTransition) {
  pageLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || !href.startsWith("#")) return;

      const target = document.querySelector(href);

      if (!target) return;

      event.preventDefault();

      document.body.classList.add("is-changing");
      pageTransition.classList.remove("active");
      void pageTransition.offsetWidth;
      pageTransition.classList.add("active");

      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 250);

      setTimeout(() => {
        document.body.classList.remove("is-changing");
      }, 560);
    });
  });
}

const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);

      if (!activeLink) return;

      if (entry.isIntersecting) {
        navAnchors.forEach((anchor) => anchor.classList.remove("active"));
        activeLink.classList.add("active");
      }
    });
  },
  {
    threshold: 0.35
  }
);

sections.forEach((section) => sectionObserver.observe(section));
