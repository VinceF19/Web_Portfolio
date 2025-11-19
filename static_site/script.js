const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero__content');
const heroEyebrow = document.querySelector('.hero__eyebrow');
const heroSubtitle = document.querySelector('.hero__subtitle');

if (hero && heroContent) {
  const parallax = (event) => {
    const rect = hero.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    const translateX = relX * 14;
    const translateY = relY * 12;

    heroContent.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
    heroEyebrow.style.transform = `translate3d(${translateX * 0.3}px, ${translateY * 0.3}px, 0)`;
    heroSubtitle.style.transform = `translate3d(${translateX * -0.2}px, ${translateY * -0.2}px, 0)`;
  };

  hero.addEventListener('pointermove', parallax);
  hero.addEventListener('pointerleave', () => {
    heroContent.style.transform = '';
    heroEyebrow.style.transform = '';
    heroSubtitle.style.transform = '';
  });
}

const skillElements = document.querySelectorAll('.skill');
if (skillElements.length) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const percent = entry.target.dataset.skill;
        const bar = entry.target.querySelector('.skill__value');
        requestAnimationFrame(() => {
          bar.style.width = `${percent}%`;
        });
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  skillElements.forEach((skill) => observer.observe(skill));
}

const contactForm = document.querySelector('.contact__form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    contactForm.reset();
    const message = name ? `Thanks, ${name}! I'll respond shortly.` : 'Message sent!';
    alert(message);
  });
}

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
