/* ------------------------------
   TYPING EYEBROW ANIMATION
------------------------------ */
const eyebrow = document.querySelector('.hero__eyebrow');
const roles = ['Full-Stack Developer', 'AI Data Specialist', 'ERP Systems Builder', 'Flutter Engineer'];

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (eyebrow && !reducedMotion) {
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeRole() {
    const current = roles[roleIndex];

    if (!deleting) {
      eyebrow.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeRole, 1800);
        return;
      }
    } else {
      eyebrow.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(typeRole, deleting ? 45 : 80);
  }

  setTimeout(typeRole, 600);
}


/* ------------------------------
   HERO PARALLAX
------------------------------ */
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero__content');

if (hero && heroContent) {
  hero.addEventListener('pointermove', (e) => {
    const rect = hero.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    heroContent.style.transform = `translate3d(${relX * 10}px, ${relY * 8}px, 0)`;
  });

  hero.addEventListener('pointerleave', () => {
    heroContent.style.transform = '';
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
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (!response.ok) throw new Error('Request failed');
      const result = await response.json();
      contactStatus.textContent = result.message || "Thanks! I'll respond shortly.";
      contactForm.reset();
    } catch {
      contactStatus.textContent = 'Oops, failed to send. Please try again or email Vince.fernandezg@gmail.com.';
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


/* ------------------------------
   STAGGER CAP CARDS + TIMELINE
------------------------------ */
document.querySelectorAll('.cap-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.12 + 0.1}s`;
});

document.querySelectorAll('.timeline__item').forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.1}s`;
});
