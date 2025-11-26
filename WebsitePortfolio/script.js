/* ------------------------------
   HERO PARALLAX
------------------------------ */
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero__content');
const heroEyebrow = document.querySelector('.hero__eyebrow');
const heroSubtitle = document.querySelector('.hero__subtitle');

if (hero) {
  hero.addEventListener('pointermove', (e) => {
    const rect = hero.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    const x = relX * 14;
    const y = relY * 12;

    heroContent.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    heroEyebrow.style.transform = `translate3d(${x * 0.5}px, ${y * 0.5}px, 0)`;
    heroSubtitle.style.transform = `translate3d(${x * -0.4}px, ${y * -0.4}px, 0)`;
  });

  hero.addEventListener('pointerleave', () => {
    heroContent.style.transform = '';
    heroEyebrow.style.transform = '';
    heroSubtitle.style.transform = '';
  });
}

/* ------------------------------
   CONTACT FORM HANDLER
------------------------------ */
const contactForm = document.querySelector('.contact__form');
const contactStatus = document.querySelector('.contact__status');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    formData.append('_subject', 'New portfolio contact');

    contactStatus.textContent = 'Sending...';
    contactStatus.classList.remove('is-error');

    try {
      const response = await fetch('https://formsubmit.co/ajax/Vince.fernandezg@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (!response.ok) throw new Error('Request failed');

      const result = await response.json();
      contactStatus.textContent = result.message || "Thanks! I'll respond shortly.";
      contactForm.reset();
    } catch (error) {
      contactStatus.textContent =
        'Oops, failed to send. Please try again or email Vince.fernandezg@gmail.com.';
      contactStatus.classList.add('is-error');
    }
  });
}


/* ------------------------------
   YEAR AUTO UPDATE
------------------------------ */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();


/* ------------------------------
   NAVBAR SHRINK + ACTIVE LINKS
------------------------------ */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav__links a');
const sections = document.querySelectorAll('section');

if (navbar && navLinks.length) {
  let scrollTimeout;

  window.addEventListener('scroll', () => {
    if (scrollTimeout) return;

    scrollTimeout = setTimeout(() => {
      scrollTimeout = null;

      navbar.classList.toggle('sticky', window.scrollY > 80);

      let current = sections.length - 1;
      while (current >= 0 && window.scrollY + 200 < sections[current].offsetTop) {
        current--;
      }

      navLinks.forEach((link) => link.classList.remove('active'));
      if (navLinks[current]) navLinks[current].classList.add('active');
    }, 90);
  });
}


/* ------------------------------
   FADE-IN SCROLL REVEAL
------------------------------ */
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  revealElements.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight - 140) {
      el.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


// Stagger capability cards so they fade in sequentially with the reveal utility
document.querySelectorAll('.cap-card').forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.15 + 0.1}s`;
});
