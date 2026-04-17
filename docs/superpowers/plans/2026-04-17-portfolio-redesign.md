# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Full overhaul of `WebsitePortfolio/` into a creative-developer style portfolio with a typographic hero, new Experience timeline section, bento grid projects, updated Skills cards, and expressive red/yellow gradient mesh treatment throughout.

**Architecture:** Plain HTML/CSS/JS single-page site. All changes contained in three files — `index.html` (structure), `styles.css` (all visual design), `script.js` (interactions). No build step, no framework. Verification is visual: open `index.html` in a browser after each task and confirm the expected output.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, clip-path, keyframes), vanilla JS (IntersectionObserver, fetch), Space Grotesk + Inter (Google Fonts), Firebase (unchanged)

---

## File Map

| File | Role |
|------|------|
| `WebsitePortfolio/index.html` | Full restructure — new hero, Experience section, bento grid, updated skills/nav |
| `WebsitePortfolio/styles.css` | Full overhaul — new variables, hero two-col, mesh blob, noise texture, timeline, bento |
| `WebsitePortfolio/script.js` | Add typing animation, timeline draw-in, stagger exp cards; update nav link count |

---

## Task 1: CSS Variables & Global Foundation

**Files:**
- Modify: `WebsitePortfolio/styles.css` (lines 1–31 — `:root` and global resets)

- [ ] **Step 1: Replace `:root` variables block**

Open `styles.css`. Replace everything from `:root {` through the closing `}` of the global reset (lines 1–30) with:

```css
/* =========================================================
   ROOT VARIABLES & GLOBAL RESETS
========================================================= */
:root {
  --red:         #f60000;
  --red-deep:    #bd0000;
  --red-glow:    rgba(246, 0, 0, 0.35);
  --yellow:      #f7d31d;
  --yellow-dim:  rgba(247, 211, 29, 0.18);
  --bg:          #111010;
  --bg-raised:   #1a1918;
  --bg-card:     rgba(255, 255, 255, 0.04);
  --border:      rgba(255, 255, 255, 0.09);
  --text:        #ffffff;
  --text-muted:  rgba(255, 255, 255, 0.65);
  --font-head:   'Space Grotesk', system-ui, sans-serif;
  --font-body:   'Inter', system-ui, sans-serif;
  --radius-sm:   0.75rem;
  --radius-md:   1.2rem;
  --radius-lg:   1.8rem;
  --transition:  0.35s ease;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--text);
  line-height: 1.65;
  min-height: 100vh;
}

img {
  max-width: 100%;
  display: block;
}

/* Noise texture overlay — applied via ::after on sections that need it */
.noise::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  pointer-events: none;
  z-index: 0;
  opacity: 0.55;
}
```

- [ ] **Step 2: Verify in browser**

Open `WebsitePortfolio/index.html` in a browser. The page should look identical to before (variables renamed, no visual change yet). No broken layout, no white flash.

- [ ] **Step 3: Commit**

```bash
cd /Users/vincefernandez/Documents/GitHub/webport
git add WebsitePortfolio/styles.css
git commit -m "style: update CSS variables and add noise texture utility"
```

---

## Task 2: Navbar — Add Experience Link

**Files:**
- Modify: `WebsitePortfolio/index.html` (nav links, lines 25–31)

- [ ] **Step 1: Update nav links in index.html**

Find the `.nav__links` div (around line 26) and replace its contents:

```html
<div class="nav__links">
  <a href="#about">About</a>
  <a href="#experience">Experience</a>
  <a href="#projects">Projects</a>
  <a href="#skills">Skills</a>
  <a href="#contact">Contact</a>
</div>
```

- [ ] **Step 2: Verify in browser**

Navbar should now show 5 links. The `#experience` link scrolls nowhere yet (section doesn't exist), that's expected.

- [ ] **Step 3: Commit**

```bash
git add WebsitePortfolio/index.html
git commit -m "feat: add Experience link to navbar"
```

---

## Task 3: Hero Section — HTML Rebuild

**Files:**
- Modify: `WebsitePortfolio/index.html` (replace entire `<header class="hero">` block, lines 35–58)

- [ ] **Step 1: Replace the hero HTML**

Replace the entire `<header class="hero" id="hero">...</header>` with:

```html
<header class="hero noise" id="hero">
  <div class="hero__mesh" aria-hidden="true"></div>
  <div class="hero__content reveal">

    <!-- LEFT: Text column -->
    <div class="hero__text">
      <span class="hero__badge">Available for Work · Davao, PH</span>
      <p class="hero__eyebrow" aria-label="Role">Full-Stack Developer</p>
      <h1 class="hero__title">RAPHAEL<br>VINCE<br>FERNANDEZ</h1>
      <p class="hero__subtitle">
        Building fast, scalable systems that solve real business problems.
      </p>
      <div class="hero__ctas">
        <a href="#projects" class="btn btn--primary">View Projects</a>
        <a href="assets/resume.pdf" class="btn btn--outline" download>Download CV</a>
      </div>
      <div class="hero__socials">
        <a href="https://github.com/VinceF19" target="_blank" rel="noopener" aria-label="GitHub">
          <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.505.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.522 2 12 2z"/></svg>
        </a>
        <a href="mailto:vince.fernandezg@gmail.com" aria-label="Email">
          <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
        </a>
      </div>
    </div>

    <!-- RIGHT: Photo column -->
    <div class="hero__photo-wrap">
      <div class="hero__photo" aria-label="Portrait of Raphael Vince S. Fernandez">
        <div class="hero__photo-glow" aria-hidden="true"></div>
        <img src="assets/1x1.png" alt="Raphael Vince S. Fernandez smiling" loading="lazy" />
      </div>
    </div>

  </div>

  <!-- Scroll chevron -->
  <a href="#about" class="hero__scroll" aria-label="Scroll down">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
  </a>
</header>
```

- [ ] **Step 2: Verify structure in browser**

Open in browser. The hero will look broken (no CSS yet for the new classes) — that's expected. Confirm the HTML is valid: no console errors, photo still renders, nav links visible.

- [ ] **Step 3: Commit**

```bash
git add WebsitePortfolio/index.html
git commit -m "feat: rebuild hero HTML — two-column typographic layout"
```

---

## Task 4: Hero Section — CSS

**Files:**
- Modify: `WebsitePortfolio/styles.css` (replace entire HERO SECTION block)

- [ ] **Step 1: Replace the hero CSS block**

Find `/* HERO SECTION */` comment block in `styles.css` and replace everything up to the next `/* ===` comment with:

```css
/* =========================================================
   HERO SECTION
========================================================= */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 7rem 2rem 4rem;
}

/* Gradient mesh blob */
.hero__mesh {
  position: absolute;
  top: -10%;
  right: -5%;
  width: 65vw;
  height: 65vw;
  max-width: 800px;
  max-height: 800px;
  background: radial-gradient(ellipse at 60% 40%,
    rgba(246, 0, 0, 0.28) 0%,
    rgba(189, 0, 0, 0.12) 40%,
    transparent 70%
  );
  border-radius: 50%;
  filter: blur(60px);
  pointer-events: none;
  z-index: 0;
}

/* Two-column layout */
.hero__content {
  position: relative;
  z-index: 1;
  width: min(1100px, 100%);
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 3rem;
}

/* Badge */
.hero__badge {
  display: inline-block;
  background: rgba(246, 0, 0, 0.15);
  border: 1px solid rgba(246, 0, 0, 0.4);
  color: var(--yellow);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.35rem 0.9rem;
  border-radius: 2rem;
  margin-bottom: 1.2rem;
}

/* Typing eyebrow */
.hero__eyebrow {
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--text-muted);
  margin-bottom: 0.8rem;
  min-height: 1.5em;
}

/* Big name */
.hero__title {
  font-family: var(--font-head);
  font-size: clamp(3.2rem, 7vw, 7rem);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.02em;
  margin-bottom: 1.4rem;
  color: var(--text);
}

.hero__subtitle {
  font-size: 1.1rem;
  color: var(--text-muted);
  max-width: 480px;
  margin-bottom: 2rem;
}

/* CTA buttons */
.hero__ctas {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.6rem;
  border-radius: 2rem;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: var(--transition);
  cursor: pointer;
  border: none;
}

.btn--primary {
  background: linear-gradient(135deg, var(--red), var(--red-deep));
  color: #fff;
  box-shadow: 0 4px 20px rgba(246, 0, 0, 0.35);
}

.btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(246, 0, 0, 0.5);
}

.btn--outline {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border);
}

.btn--outline:hover {
  border-color: var(--yellow);
  color: var(--yellow);
  transform: translateY(-2px);
}

/* Social icons */
.hero__socials {
  display: flex;
  gap: 1.2rem;
  align-items: center;
}

.hero__socials a {
  color: var(--text-muted);
  transition: color var(--transition);
}

.hero__socials a:hover {
  color: var(--yellow);
}

/* Photo column */
.hero__photo-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero__photo {
  position: relative;
  width: clamp(200px, 28vw, 340px);
  aspect-ratio: 1;
  padding: 10px;
  background: radial-gradient(circle at 30% 30%, var(--yellow-dim), var(--red-glow));
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5), 0 0 40px var(--red-glow);
  animation: floatHero 8s ease-in-out infinite;
  isolation: isolate;
}

.hero__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: calc(var(--radius-lg) - 8px);
  position: relative;
  z-index: 2;
}

.hero__photo-glow {
  position: absolute;
  inset: -20%;
  background: conic-gradient(
    from 90deg,
    rgba(246, 0, 0, 0.5),
    rgba(247, 211, 29, 0.25),
    rgba(189, 0, 0, 0.45),
    rgba(246, 0, 0, 0.5)
  );
  filter: blur(14px);
  opacity: 0.7;
  border-radius: 50%;
  animation: spinRing 16s linear infinite;
  z-index: 1;
  mix-blend-mode: screen;
}

/* Scroll chevron */
.hero__scroll {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: var(--text-muted);
  animation: bounceChevron 2s ease-in-out infinite;
  z-index: 1;
  text-decoration: none;
}

.hero__scroll:hover {
  color: var(--yellow);
}

@keyframes bounceChevron {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50%       { transform: translateX(-50%) translateY(8px); }
}

@keyframes floatHero {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-12px); }
}

@keyframes spinRing {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* Hero responsive */
@media (max-width: 768px) {
  .hero {
    padding: 6rem 1.5rem 4rem;
  }

  .hero__content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero__photo-wrap {
    order: -1;
  }

  .hero__ctas {
    justify-content: center;
  }

  .hero__socials {
    justify-content: center;
  }

  .hero__subtitle {
    margin-inline: auto;
  }
}
```

- [ ] **Step 2: Remove old hero CSS references**

In `styles.css`, delete any remaining `.hero__bg`, `.hero__overlay` rules left over from the old hero (the old overlay and bg image styles — search for `.hero__bg` and `.hero__overlay` and delete those blocks).

- [ ] **Step 3: Verify in browser**

Hero should now show: two-column layout (text left, photo right), massive name, red badge, two buttons, social icons, animated chevron at bottom, red mesh blob top-right, floating photo with glow ring.

- [ ] **Step 4: Commit**

```bash
git add WebsitePortfolio/styles.css
git commit -m "style: hero two-column layout, mesh blob, badge, CTA buttons"
```

---

## Task 5: About Section Polish

**Files:**
- Modify: `WebsitePortfolio/index.html` (about section, lines ~62–85)
- Modify: `WebsitePortfolio/styles.css` (about block)

- [ ] **Step 1: Update about HTML**

Replace the `<section class="section about reveal" id="about">` block with:

```html
<section class="section about reveal" id="about">
  <div class="section__content">
    <p class="section__eyebrow">About</p>
    <h2>About Me</h2>
    <p>
      I build systems that help businesses earn more and run faster. Currently finishing my degree,
      I specialize in taking manual, messy processes and turning them into clean, digital solutions from scratch.
    </p>

    <div class="about__details">
      <p class="about__label">How I work</p>
      <div class="about__tags">
        <span class="tag">Flutter + Dart</span>
        <span class="tag">Supabase</span>
        <span class="tag">Clean Code</span>
        <span class="tag">Business-first thinking</span>
        <span class="tag">AI-assisted workflows</span>
      </div>
    </div>

    <blockquote class="about__quote">
      When I'm offline: I'm usually golfing, working on cars, or outdoors. I like things that are built well and run smoothly.
    </blockquote>
  </div>
</section>
```

- [ ] **Step 2: Add about polish CSS**

Find `/* GENERIC SECTION LAYOUT */` in `styles.css`. Just before that comment, add:

```css
/* =========================================================
   ABOUT SECTION
========================================================= */
.about {
  background: var(--bg-raised);
}

.about__label {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--yellow);
  margin: 1.8rem 0 0.8rem;
}

.about__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.tag {
  background: rgba(246, 0, 0, 0.1);
  border: 1px solid rgba(246, 0, 0, 0.3);
  color: var(--text-muted);
  font-size: 0.85rem;
  padding: 0.3rem 0.85rem;
  border-radius: 2rem;
}

.about__quote {
  margin-top: 1.8rem;
  padding: 1rem 1.4rem;
  border-left: 3px solid var(--red);
  background: var(--bg-card);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  font-style: italic;
  color: var(--text-muted);
  font-size: 0.98rem;
}
```

Also update the old `.about { background: #1f1c1a; }` rule — replace it with `/* moved above */` or delete it (the new rule above replaces it).

- [ ] **Step 3: Verify in browser**

About section should show: tag chips for tech stack, red-bordered blockquote for offline blurb.

- [ ] **Step 4: Commit**

```bash
git add WebsitePortfolio/index.html WebsitePortfolio/styles.css
git commit -m "style: about section — tag chips and quote block"
```

---

## Task 6: Experience Section — HTML

**Files:**
- Modify: `WebsitePortfolio/index.html` (insert new section after marquee, before projects)

- [ ] **Step 1: Add Experience section HTML**

In `index.html`, find the `<!-- PROJECTS -->` comment (around line 106). Insert the following block immediately before it:

```html
<!-- EXPERIENCE -->
<section class="section experience" id="experience">
  <div class="section__content">
    <p class="section__eyebrow">Experience</p>
    <h2 class="reveal">Work History</h2>

    <div class="timeline">

      <div class="timeline__item reveal">
        <div class="timeline__dot"></div>
        <div class="timeline__card">
          <div class="timeline__header">
            <h3>AI Audio Annotator</h3>
            <span class="timeline__period">March 2026 – Present</span>
          </div>
          <p class="timeline__company">Chemin AI (Kaya Project) · Remote</p>
          <ul class="timeline__bullets">
            <li>Segment audio clips by speaker to support structured speech datasets</li>
            <li>Identify and tag language and accent variations for speech recognition models</li>
            <li>Transcribe spoken English audio into high-accuracy text for AI training datasets</li>
          </ul>
          <div class="timeline__tags">
            <span class="tag">Speech Annotation</span>
            <span class="tag">Accent Tagging</span>
            <span class="tag">Transcription</span>
          </div>
        </div>
      </div>

      <div class="timeline__item reveal">
        <div class="timeline__dot"></div>
        <div class="timeline__card">
          <div class="timeline__header">
            <h3>AI Data Analyst / Model Evaluation Specialist</h3>
            <span class="timeline__period">Jan – Mar 2026</span>
          </div>
          <p class="timeline__company">Innodata Inc. · Remote</p>
          <ul class="timeline__bullets">
            <li>Performed high-accuracy AI data annotation and model evaluation for LLM training datasets</li>
            <li>Executed human-in-the-loop QA tasks under strict AHT and quality benchmarks</li>
            <li>Interpreted complex annotation guidelines and resolved edge cases requiring contextual reasoning</li>
          </ul>
          <div class="timeline__tags">
            <span class="tag">AI Annotation</span>
            <span class="tag">Model Evaluation</span>
            <span class="tag">Human-in-the-Loop QA</span>
          </div>
        </div>
      </div>

      <div class="timeline__item reveal">
        <div class="timeline__dot"></div>
        <div class="timeline__card">
          <div class="timeline__header">
            <h3>Project Manager &amp; AI-Assisted Full Stack Developer</h3>
            <span class="timeline__period">Aug 2023 – May 2025</span>
          </div>
          <p class="timeline__company">MAVIKEN Fleet ERP · Hybrid</p>
          <ul class="timeline__bullets">
            <li>Designed and developed a full ERP system covering order tracking, delivery receipts, invoicing, maintenance, and expense monitoring</li>
            <li>Built Flutter + Supabase architecture with structured relational database design</li>
            <li>Implemented real-time dashboards and automated paper-based workflows</li>
          </ul>
          <div class="timeline__tags">
            <span class="tag">Flutter</span>
            <span class="tag">Supabase</span>
            <span class="tag">SQL</span>
            <span class="tag">ERP</span>
          </div>
        </div>
      </div>

      <div class="timeline__item reveal">
        <div class="timeline__dot"></div>
        <div class="timeline__card">
          <div class="timeline__header">
            <h3>Web Developer</h3>
            <span class="timeline__period">Dec 2024 – Mar 2025</span>
          </div>
          <p class="timeline__company">Sangguniang Kabataan Davao del Sur · Hybrid</p>
          <ul class="timeline__bullets">
            <li>Designed and developed a mobile-responsive web portal</li>
            <li>Integrated Facebook Graph API for automated content updates</li>
          </ul>
          <div class="timeline__tags">
            <span class="tag">HTML/CSS/JS</span>
            <span class="tag">Facebook API</span>
            <span class="tag">Responsive Design</span>
          </div>
        </div>
      </div>

      <div class="timeline__item reveal">
        <div class="timeline__dot"></div>
        <div class="timeline__card">
          <div class="timeline__header">
            <h3>Web Developer</h3>
            <span class="timeline__period">Nov 2023 – Jan 2024</span>
          </div>
          <p class="timeline__company">Pylon Energy Corporation · Hybrid</p>
          <ul class="timeline__bullets">
            <li>Developed and launched corporate website aligned with brand identity</li>
            <li>Integrated Google Maps API and inquiry forms to support customer engagement</li>
          </ul>
          <div class="timeline__tags">
            <span class="tag">WordPress</span>
            <span class="tag">Google Maps API</span>
            <span class="tag">Web Design</span>
          </div>
        </div>
      </div>

      <div class="timeline__item reveal">
        <div class="timeline__dot"></div>
        <div class="timeline__card">
          <div class="timeline__header">
            <h3>Campaign Management System Developer</h3>
            <span class="timeline__period">Feb – May 2019</span>
          </div>
          <p class="timeline__company">Freelance · On-site</p>
          <ul class="timeline__bullets">
            <li>Developed a vote-tracking system using INDEX-MATCH and lookup logic to merge voter and precinct data</li>
            <li>Organized and cleaned datasets; created reports to support campaign decision-making</li>
          </ul>
          <div class="timeline__tags">
            <span class="tag">Excel</span>
            <span class="tag">INDEX-MATCH</span>
            <span class="tag">Data Processing</span>
          </div>
        </div>
      </div>

    </div><!-- /.timeline -->
  </div>
</section>
```

- [ ] **Step 2: Verify structure in browser**

Experience section appears below the marquee strip. Cards are unstyled but visible. No console errors.

- [ ] **Step 3: Commit**

```bash
git add WebsitePortfolio/index.html
git commit -m "feat: add Experience timeline section with all 6 roles"
```

---

## Task 7: Experience Section — CSS

**Files:**
- Modify: `WebsitePortfolio/styles.css` (add Experience block)

- [ ] **Step 1: Add timeline CSS**

Find the `/* PROJECTS SECTION */` comment in `styles.css`. Insert the following block immediately before it:

```css
/* =========================================================
   EXPERIENCE / TIMELINE SECTION
========================================================= */
.experience {
  background: var(--bg);
}

.timeline {
  position: relative;
  margin-top: 2.5rem;
  padding-left: 2rem;
}

/* Vertical line */
.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom, var(--red), rgba(246, 0, 0, 0.1));
}

.timeline__item {
  position: relative;
  margin-bottom: 2.5rem;
}

.timeline__item:last-child {
  margin-bottom: 0;
}

/* Dot connector */
.timeline__dot {
  position: absolute;
  left: -2.45rem;
  top: 1.1rem;
  width: 12px;
  height: 12px;
  background: var(--red);
  border-radius: 50%;
  box-shadow: 0 0 0 3px var(--bg), 0 0 0 5px rgba(246, 0, 0, 0.3);
}

.timeline__card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  transition: border-color var(--transition), box-shadow var(--transition);
}

.timeline__card:hover {
  border-color: rgba(246, 0, 0, 0.4);
  box-shadow: 0 4px 24px rgba(246, 0, 0, 0.1);
}

.timeline__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 0.3rem;
}

.timeline__header h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
}

.timeline__period {
  font-size: 0.82rem;
  color: var(--yellow);
  font-weight: 600;
  white-space: nowrap;
}

.timeline__company {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 0.8rem;
}

.timeline__bullets {
  padding-left: 1.2rem;
  margin-bottom: 1rem;
  color: var(--text-muted);
  font-size: 0.92rem;
  line-height: 1.6;
}

.timeline__bullets li {
  margin-bottom: 0.3rem;
}

.timeline__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .timeline {
    padding-left: 1.5rem;
  }

  .timeline__dot {
    left: -1.95rem;
  }

  .timeline__header {
    flex-direction: column;
    gap: 0.2rem;
  }
}
```

- [ ] **Step 2: Verify in browser**

Experience section shows: vertical red line on left, dot connectors, cards with role/company/period/bullets/tags. Hover state shows red border + subtle glow. Scroll reveal works (cards fade in as you scroll).

- [ ] **Step 3: Commit**

```bash
git add WebsitePortfolio/styles.css
git commit -m "style: experience timeline layout and card styles"
```

---

## Task 8: Projects — Bento Grid HTML

**Files:**
- Modify: `WebsitePortfolio/index.html` (replace `.feature-projects` block, lines ~107–168)

- [ ] **Step 1: Replace the projects HTML**

Replace the entire `<section class="section projects" ...>` block with:

```html
<!-- PROJECTS -->
<section class="section projects" id="projects">
  <div class="section__content">
    <p class="section__eyebrow">Projects</p>
    <h2 class="reveal">Featured Projects</h2>

    <div class="bento reveal">

      <!-- LARGE: GoDavao -->
      <article class="bento__card bento__card--large">
        <div class="bento__img">
          <img src="assets/projects/godavao.jpg" alt="GoDavao Screenshot" loading="lazy" />
        </div>
        <div class="bento__overlay">
          <span class="tech">Flutter · OSRM · GIS · Supabase</span>
          <h3>GoDavao – Ridesharing App</h3>
          <p>GIS-powered rideshare app with OSRM routing, Dijkstra algorithm, real-time tracking, and dynamic pricing.</p>
        </div>
      </article>

      <!-- MEDIUM: Maviken ERP -->
      <article class="bento__card bento__card--medium">
        <div class="bento__img">
          <img src="assets/projects/erp.png" alt="Maviken ERP Screenshot" loading="lazy" />
        </div>
        <div class="bento__overlay">
          <span class="tech">Flutter · Supabase · SQL · PDF</span>
          <h3>Maviken ERP System</h3>
          <p>Complete trucking business solution: orders, delivery receipts, billing, maintenance & dashboards.</p>
        </div>
      </article>

      <!-- SMALL: Pylon -->
      <article class="bento__card bento__card--small">
        <div class="bento__img">
          <img src="assets/projects/pylon.png" alt="Pylon Energy Corp Website" loading="lazy" />
        </div>
        <div class="bento__overlay">
          <span class="tech">WordPress · Hostinger · Web Design</span>
          <h3>PylonEnergyCorp Website</h3>
          <p>Corporate site with Google Maps, product listings, and branded sections.</p>
        </div>
      </article>

      <!-- MEDIUM: SK Portal -->
      <article class="bento__card bento__card--medium">
        <div class="bento__img">
          <img src="assets/projects/skportal.png" alt="SK Portal Screenshot" loading="lazy" />
        </div>
        <div class="bento__overlay">
          <span class="tech">HTML · CSS · JS · FB API</span>
          <h3>SK Portal</h3>
          <p>Youth council portal with dynamic project listings and auto-fetch Facebook posts via API.</p>
        </div>
      </article>

      <!-- WIDE: Campaign Management System (no image — gradient placeholder) -->
      <article class="bento__card bento__card--wide bento__card--placeholder">
        <div class="bento__placeholder-icon" aria-hidden="true">
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2"><path d="M3 3h18v4H3zM3 10h8v4H3zM3 17h8v4H3zM14 10h7v11h-7z"/></svg>
        </div>
        <div class="bento__overlay bento__overlay--always">
          <span class="tech">Excel · INDEX-MATCH · Data Merging</span>
          <h3>Campaign Management System</h3>
          <p>Excel-based vote-tracking system using INDEX-MATCH and lookup logic to merge voter and precinct data for campaign decision-making.</p>
        </div>
      </article>

    </div><!-- /.bento -->
  </div>
</section>
```

- [ ] **Step 2: Verify in browser**

Projects section renders cards (unstyled bento grid, no layout yet). All 5 cards visible. Campaign card shows no image but renders placeholder icon. No console errors.

- [ ] **Step 3: Commit**

```bash
git add WebsitePortfolio/index.html
git commit -m "feat: projects bento grid HTML — 5 cards including Campaign System"
```

---

## Task 9: Projects — Bento Grid CSS

**Files:**
- Modify: `WebsitePortfolio/styles.css` (replace `.feature-*` and `.projects` blocks with bento styles)

- [ ] **Step 1: Replace old projects CSS**

Find `/* PROJECTS SECTION */` and `/* FEATURED PROJECT SECTION */` blocks in `styles.css`. Delete everything from `/* PROJECTS SECTION */` down through `.feature-img img { ... }` and the `@media (max-width: 900px)` responsive block at the end. Replace with:

```css
/* =========================================================
   PROJECTS — BENTO GRID
========================================================= */
.projects {
  background: var(--bg-raised);
}

.bento {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 1.2rem;
  margin-top: 2rem;
}

/* Card base */
.bento__card {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border);
  background: var(--bg-card);
  cursor: default;
  transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);
}

.bento__card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(246, 0, 0, 0.2);
  border-color: rgba(246, 0, 0, 0.45);
}

/* Size variants */
.bento__card--large {
  grid-column: span 2;
  grid-row: span 2;
  min-height: 360px;
}

.bento__card--medium {
  grid-column: span 1;
  min-height: 220px;
}

.bento__card--small {
  grid-column: span 1;
  min-height: 180px;
}

.bento__card--wide {
  grid-column: span 3;
  min-height: 160px;
}

/* Image fills card */
.bento__img {
  position: absolute;
  inset: 0;
}

.bento__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease, filter 0.6s ease;
  filter: brightness(0.65);
}

.bento__card:hover .bento__img img {
  transform: scale(1.04);
  filter: brightness(0.5);
}

/* Text overlay */
.bento__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.4rem;
  background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%);
  opacity: 0;
  transition: opacity var(--transition);
}

.bento__card:hover .bento__overlay,
.bento__overlay--always {
  opacity: 1;
}

.bento__overlay h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.3rem;
}

.bento__overlay p {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.75);
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.bento__overlay .tech {
  font-size: 0.75rem;
  color: var(--yellow);
  font-weight: 600;
  letter-spacing: 0.04em;
  margin-bottom: 0.4rem;
}

/* Gradient placeholder card (Campaign System) */
.bento__card--placeholder {
  background: linear-gradient(135deg, rgba(246,0,0,0.12), rgba(247,211,29,0.06));
  display: flex;
  align-items: center;
  justify-content: center;
}

.bento__placeholder-icon {
  position: absolute;
  top: 50%;
  left: 2rem;
  transform: translateY(-50%);
  color: rgba(246,0,0,0.3);
}

.bento__card--placeholder .bento__overlay--always {
  background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 80%);
}

/* Bento responsive */
@media (max-width: 900px) {
  .bento {
    grid-template-columns: repeat(2, 1fr);
  }

  .bento__card--large { grid-column: span 2; min-height: 280px; }
  .bento__card--wide  { grid-column: span 2; }
}

@media (max-width: 600px) {
  .bento {
    grid-template-columns: 1fr;
  }

  .bento__card--large,
  .bento__card--medium,
  .bento__card--small,
  .bento__card--wide {
    grid-column: span 1;
    min-height: 220px;
  }

  .bento__overlay {
    opacity: 1;
  }
}
```

- [ ] **Step 2: Verify in browser**

Projects section shows bento grid: GoDavao is large (2 cols × 2 rows), ERP is medium, Pylon is small, SK Portal is medium, Campaign System is wide (full 3 cols) with gradient background and icon. Hover on any card reveals text overlay + lift + red glow.

- [ ] **Step 3: Commit**

```bash
git add WebsitePortfolio/styles.css
git commit -m "style: projects bento grid layout — 5 cards, hover overlay, responsive"
```

---

## Task 10: Skills Section — HTML Update

**Files:**
- Modify: `WebsitePortfolio/index.html` (skills section capabilities grid)

- [ ] **Step 1: Replace the skills HTML**

Find `<section class="section skills reveal" id="skills">` and replace the entire block with:

```html
<!-- SKILLS -->
<section class="section skills reveal" id="skills">
  <div class="section__content">
    <p class="section__eyebrow">Skills</p>
    <h2>Capabilities</h2>
    <div class="capabilities reveal">

      <div class="cap-card">
        <h3>Flutter App Development</h3>
        <p>Performant, scalable mobile and web applications with clean architecture and smooth UI.</p>
      </div>

      <div class="cap-card">
        <h3>ERP &amp; Business Systems</h3>
        <p>Custom systems covering orders, delivery receipts, invoicing, billing, and real-time dashboards.</p>
      </div>

      <div class="cap-card">
        <h3>Database &amp; Cloud</h3>
        <p>Supabase + SQL: secure auth, realtime data, SQL modeling, RLS policies, and serverless functions.</p>
      </div>

      <div class="cap-card">
        <h3>GIS Routing &amp; OSRM</h3>
        <p>Map routing, Dijkstra algorithm, travel optimization, and geo-data visualization.</p>
      </div>

      <div class="cap-card">
        <h3>Web Development</h3>
        <p>HTML/CSS/JS, WordPress, branded websites, responsive portals, and API integrations (Google Maps, Facebook).</p>
      </div>

      <div class="cap-card">
        <h3>AI Data Annotation &amp; QA</h3>
        <p>Speech segmentation, accent tagging, transcription, and model evaluation for large-scale LLM training datasets.</p>
      </div>

    </div>
  </div>
</section>
```

- [ ] **Step 2: Update capabilities grid CSS for 6 cards**

In `styles.css`, find `.capabilities { display: grid; ... grid-template-columns: 1fr 1fr; }` and confirm it already uses `1fr 1fr` — 6 cards will auto-flow into a 2×3 grid. No change needed to the grid CSS.

- [ ] **Step 3: Verify in browser**

Skills section shows 6 cards in a 2-column grid (3 rows). New "AI Data Annotation & QA" card appears. No emojis. Hover lifts card with red glow + yellow border.

- [ ] **Step 4: Commit**

```bash
git add WebsitePortfolio/index.html
git commit -m "feat: skills — 6 capabilities cards including AI annotation, remove emojis"
```

---

## Task 11: Contact & Footer Polish

**Files:**
- Modify: `WebsitePortfolio/index.html` (contact button label + footer text)
- Modify: `WebsitePortfolio/styles.css` (focus glow on inputs)

- [ ] **Step 1: Update contact HTML**

In `index.html`, find `<button type="submit">CONNECT WITH ME!</button>` and change to:

```html
<button type="submit" class="btn btn--primary">Send Message</button>
```

Also update the footer `<small>` text:

```html
<small>
  © <span id="year"></span> Raphael Vince Fernandez ·
  <a href="mailto:vince.fernandezg@gmail.com">vince.fernandezg@gmail.com</a> ·
  <a href="https://vincef.web.app" target="_blank" rel="noopener">vincef.web.app</a> ·
  <a href="https://github.com/VinceF19" target="_blank" rel="noopener">github.com/VinceF19</a>
</small>
```

- [ ] **Step 2: Update contact CSS**

In `styles.css`, find the `.contact__form input:focus` block and replace with:

```css
.contact__form input:focus,
.contact__form textarea:focus {
  outline: none;
  border-color: var(--red);
  box-shadow: 0 0 0 3px rgba(246, 0, 0, 0.18);
}
```

Also remove the old `button[type='submit']` block (it's now handled by `.btn.btn--primary`).

Add footer link styles after the footer block:

```css
.footer a {
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  transition: color var(--transition);
}

.footer a:hover {
  color: var(--yellow);
}
```

- [ ] **Step 3: Verify in browser**

Contact button says "Send Message" with red gradient. Input focus shows red glow ring. Footer links are clickable and turn yellow on hover.

- [ ] **Step 4: Commit**

```bash
git add WebsitePortfolio/index.html WebsitePortfolio/styles.css
git commit -m "style: contact and footer polish — button label, glow focus, footer links"
```

---

## Task 12: JavaScript — Typing Animation + Timeline Observer

**Files:**
- Modify: `WebsitePortfolio/script.js`

- [ ] **Step 1: Add typing animation and update script.js**

Replace the entire contents of `script.js` with:

```js
/* ------------------------------
   TYPING EYEBROW ANIMATION
------------------------------ */
const eyebrow = document.querySelector('.hero__eyebrow');
const roles = ['Full-Stack Developer', 'AI Data Specialist', 'ERP Systems Builder', 'Flutter Engineer'];

if (eyebrow) {
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let pauseTimer = null;

  function typeRole() {
    const current = roles[roleIndex];

    if (!deleting) {
      eyebrow.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        pauseTimer = setTimeout(typeRole, 1800);
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
```

- [ ] **Step 2: Verify in browser**

Open `index.html`. Hero eyebrow cycles through: "Full-Stack Developer" → "AI Data Specialist" → "ERP Systems Builder" → "Flutter Engineer" with typing/deleting animation. Timeline cards stagger on scroll-in. Navbar active link updates as you scroll. Contact form still submits.

- [ ] **Step 3: Commit**

```bash
git add WebsitePortfolio/script.js
git commit -m "feat: typing animation for hero eyebrow, timeline stagger, updated parallax"
```

---

## Task 13: General Section Layout Cleanup

**Files:**
- Modify: `WebsitePortfolio/styles.css` (section layout + marquee minor update)

- [ ] **Step 1: Update generic section CSS**

Find `/* GENERIC SECTION LAYOUT */` and update the `.section` rule to use the new bg variable and reduce `min-height`:

```css
.section {
  min-height: auto;
  padding: 5rem 1.5rem;
  display: flex;
  align-items: center;
}
```

Update `.section__eyebrow` color reference:

```css
.section__eyebrow {
  color: var(--yellow);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
}
```

- [ ] **Step 2: Update marquee background**

Find `.marquee-section { background: rgb(255,255,255); }` and change to:

```css
.marquee-section {
  min-height: auto;
  padding: 0.5rem 0;
  background: #f0efef;
  overflow: hidden;
}
```

- [ ] **Step 3: Verify full page scroll in browser**

Scroll through the entire page:
- Hero → About → Marquee strip → Experience → Projects → Skills → Contact → Footer
- All sections connect visually without jarring breaks
- Reveal animations trigger correctly on each section
- No layout overflow or horizontal scroll

- [ ] **Step 4: Commit**

```bash
git add WebsitePortfolio/styles.css
git commit -m "style: section layout cleanup, marquee background soften"
```

---

## Task 14: Resume PDF Reminder & Final Cleanup

**Files:**
- `WebsitePortfolio/assets/resume.pdf` — user must add this file manually

- [ ] **Step 1: Add placeholder note**

The "Download CV" button links to `assets/resume.pdf`. This file does not exist yet. Add your resume PDF at that exact path:

```
WebsitePortfolio/assets/resume.pdf
```

Until it's added, the Download CV button will 404 — that's expected. The button is wired and ready.

- [ ] **Step 2: Check for leftover old CSS rules**

In `styles.css`, search for these old class names and delete any orphaned rules:

- `.feature-card` (replaced by `.bento__card`)
- `.feature-img` (replaced by `.bento__img`)
- `.feature-content` (replaced by `.bento__overlay`)
- `.hero__bg` (removed — no longer used)
- `.hero__overlay` (removed — replaced by `.hero__mesh`)
- `button[type='submit']` (replaced by `.btn.btn--primary`)

- [ ] **Step 3: Final cross-browser check**

Open `index.html` in both Chrome and Safari (or Firefox). Verify:
- Grid layout renders correctly
- Animations run (typing, float, spin ring, chevron bounce)
- Hover states work on bento cards and cap cards
- Mobile: shrink window to 375px — hero stacks vertically, bento goes single column, timeline readable

- [ ] **Step 4: Final commit**

```bash
git add WebsitePortfolio/
git commit -m "chore: cleanup orphaned CSS rules and final layout verification"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Task |
|-----------------|------|
| Full overhaul approach (Option 1) | All tasks |
| CSS variables + global resets | Task 1 |
| Navbar + Experience link | Task 2 |
| Hero — two-column, text-forward, gradient mesh | Tasks 3–4 |
| Hero — badge, typing eyebrow, massive name, CTAs, socials, chevron | Tasks 3–4 |
| Hero — photo floats right with glow ring | Tasks 3–4 |
| About — tag chips, quote block | Task 5 |
| Marquee — soften background | Task 13 |
| Experience — 6 roles, timeline layout | Tasks 6–7 |
| Projects — bento grid 5 cards | Tasks 8–9 |
| Campaign System card with gradient placeholder | Tasks 8–9 |
| Skills — 6 cards, no emojis, AI annotation card | Task 10 |
| Contact — glow focus, button label | Task 11 |
| Footer — links | Task 11 |
| Typing animation | Task 12 |
| Timeline stagger | Task 12 |
| resume.pdf wired up | Task 14 |
| Orphaned CSS cleanup | Task 14 |

All spec requirements covered. No placeholders. Types and class names consistent across all tasks.
