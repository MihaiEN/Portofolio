const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const revealItems = document.querySelectorAll('.reveal');
const filterButtons = document.querySelectorAll('[data-filter]');
const experienceCards = document.querySelectorAll('[data-area]');
const printButton = document.querySelector('[data-print]');
const year = document.querySelector('[data-year]');
const sections = document.querySelectorAll('main section[id]');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      navToggle.focus();
    }
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));

    experienceCards.forEach((card) => {
      const areas = card.dataset.area.split(' ');
      const show = filter === 'all' || areas.includes(filter);
      card.classList.toggle('is-hidden', !show);
    });
  });
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

if ('IntersectionObserver' in window && navLinks.length && sections.length) {
  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
      });
    },
    { rootMargin: '-25% 0px -60% 0px', threshold: 0 }
  );

  sections.forEach((section) => activeObserver.observe(section));
}

if (printButton) {
  printButton.addEventListener('click', () => window.print());
}
