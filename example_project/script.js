// Example capstone JS — several real features, all built with the exact
// querySelector + addEventListener + classList patterns from Weeks 5-6.

// ---------- 1. Mobile nav toggle ----------
const navToggle = document.querySelector('#nav-toggle');
const navLinksEl = document.querySelector('#nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinksEl.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinksEl.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

// ---------- 2. Scroll spy: highlight the nav link for the visible section ----------
const navLinkItems = document.querySelectorAll('[data-nav]');
const spySections = Array.from(navLinkItems)
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = `#${entry.target.id}`;
        navLinkItems.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === id);
        });
      }
    });
  },
  { rootMargin: '-45% 0px -45% 0px' } // "active" once a section is near the middle of the screen
);

spySections.forEach((section) => spyObserver.observe(section));

// ---------- 3. Scroll reveal: fade/slide elements in as they enter the viewport ----------
const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // only animate in once
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));

// ---------- 4. Gallery lightbox ----------
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('#lightbox');
const lightboxImg = document.querySelector('#lightbox-img');
const lightboxCaption = document.querySelector('#lightbox-caption');
const lightboxClose = document.querySelector('#lightbox-close');

function openLightbox(imgSrc, imgAlt, caption) {
  lightboxImg.src = imgSrc;
  lightboxImg.alt = imgAlt;
  lightboxCaption.textContent = caption;
  lightbox.hidden = false;
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.src = '';
}

galleryItems.forEach((item) => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const caption = item.getAttribute('data-caption') || '';
    openLightbox(img.src, img.alt, caption);
  });
});

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox(); // clicking the dark backdrop (not the image) closes it
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !lightbox.hidden) {
    closeLightbox();
  }
});

// ---------- 5. Random fun fact ----------
const facts = [
  "I taught myself three different dribble techniques.",
  "My chess online rating goes up every time I lose to my little sister — I study harder after.",
  "This website is the first project where I used localStorage.",
  "I once built a Minecraft redstone calculator instead of doing homework.",
  "My favorite part of coding is finally seeing a bug disappear.",
];

const factBtn = document.querySelector('#fact-btn');
const factOutput = document.querySelector('#fact-output');

factBtn.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * facts.length);
  factOutput.textContent = facts[randomIndex];
});

// ---------- 6. Contact form validation (client-side only — no backend here) ----------
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault(); // stop the page from reloading

  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const message = document.querySelector('#message').value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = 'Please fill in every field before sending.';
    formStatus.className = 'form-status error';
    return;
  }

  // A real site would send this to a server here. For this static
  // capstone example, we just confirm it to the user directly.
  formStatus.textContent = `Thanks, ${name} — your message is ready to send! (This demo form doesn't actually email anyone.)`;
  formStatus.className = 'form-status success';
  contactForm.reset();
});

// ---------- 7. Back-to-top button ----------
const backToTopBtn = document.querySelector('#back-to-top');

window.addEventListener('scroll', () => {
  backToTopBtn.hidden = window.scrollY < 500;
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
