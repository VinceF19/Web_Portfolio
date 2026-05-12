# Projects Grid Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the asymmetric bento grid in the Featured Projects section with a clean 3-column equal-height split-card layout.

**Architecture:** Two files change — `styles.css` drops all `.bento*` rules and gains `.proj-card*` rules; `index.html` replaces the `.bento` div with a `.projects-grid` div containing six uniform `.proj-card` elements. No JavaScript needed.

**Tech Stack:** Vanilla HTML/CSS, existing CSS custom properties (`--bg-raised`, `--border`, `--red`, `--radius-md`, `--transition`).

---

### Task 1: Replace bento CSS with proj-card CSS

**Files:**
- Modify: `WebsitePortfolio/styles.css` lines 893–1050 (entire `.bento*` block)

- [ ] **Step 1: Delete all bento CSS rules**

In `styles.css`, find and remove the entire block from line 893 (`.bento {`) through line 1050 (`}` closing the last `@media (max-width: 600px)` block). Every selector starting with `.bento` gets removed.

- [ ] **Step 2: Add new proj-card CSS in its place**

At the same location (after the skills section, before the CONTACT FORM comment), insert:

```css
/* =========================================================
   PROJECTS GRID
========================================================= */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 2rem;
}

.proj-card {
  display: flex;
  height: 196px;
  background: var(--bg-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: transform var(--transition), border-color var(--transition), box-shadow var(--transition);
  cursor: default;
}

.proj-card:hover {
  transform: translateY(-3px);
  border-color: rgba(246, 0, 0, 0.45);
  box-shadow: 0 8px 32px rgba(246, 0, 0, 0.15);
}

/* Left: main screenshot */
.proj-img {
  width: 44%;
  flex-shrink: 0;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.03);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.1);
}

.proj-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.proj-card:hover .proj-img img {
  transform: scale(1.04);
}

/* Right: content */
.proj-body {
  flex: 1;
  padding: 1rem 0.9rem 0.85rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}

.proj-category {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--red);
  margin-bottom: 0.3rem;
}

.proj-title {
  font-family: var(--font-head);
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.3;
  margin-bottom: 0.35rem;
}

.proj-desc {
  font-size: 0.67rem;
  color: var(--text-muted);
  line-height: 1.5;
  flex: 1;
}

.proj-tags {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
  margin: 0.5rem 0 0.45rem;
}

.proj-tags span {
  font-size: 0.58rem;
  padding: 0.15rem 0.4rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  color: var(--text-muted);
  white-space: nowrap;
}

/* Mini gallery row */
.proj-mini-gallery {
  display: flex;
  gap: 0.25rem;
  align-items: center;
}

.proj-mini-thumb {
  width: 30px;
  height: 18px;
  border-radius: 3px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
}

.proj-mini-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.proj-mini-label {
  font-size: 0.58rem;
  color: rgba(255, 255, 255, 0.28);
  margin-left: 0.2rem;
  white-space: nowrap;
}

/* Responsive */
@media (max-width: 900px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 580px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }

  .proj-card {
    height: auto;
    min-height: 140px;
  }

  .proj-img {
    width: 40%;
  }
}
```

- [ ] **Step 3: Verify CSS is clean**

Open `styles.css` and confirm: no `.bento` class anywhere in the file. Run:
```bash
grep -n "bento" WebsitePortfolio/styles.css
```
Expected output: no results.

---

### Task 2: Replace bento HTML with proj-grid markup

**Files:**
- Modify: `WebsitePortfolio/index.html` — the `<div class="bento reveal">` block inside `#projects`

- [ ] **Step 1: Remove the entire bento div**

Find and delete from `<div class="bento reveal">` through its closing `</div><!-- /.bento -->` (includes all 6 article elements inside).

- [ ] **Step 2: Insert the new projects-grid markup**

Replace with:

```html
<div class="projects-grid reveal">

  <!-- SK Provincial Portal -->
  <article class="proj-card">
    <div class="proj-img">
      <img src="assets/projects/SK portal/Screenshot 2026-05-11 at 5.14.39 PM.png" alt="SK Provincial Portal homepage" loading="lazy" />
    </div>
    <div class="proj-body">
      <div>
        <p class="proj-category">Gov · Web</p>
        <h3 class="proj-title">SK Provincial Portal</h3>
        <p class="proj-desc">Government youth council portal with live Facebook feed sync, news grid, and government officials directory.</p>
      </div>
      <div>
        <div class="proj-tags">
          <span>React</span><span>Vite</span><span>Express.js</span><span>FB API</span>
        </div>
        <div class="proj-mini-gallery">
          <div class="proj-mini-thumb"><img src="assets/projects/SK portal/Screenshot 2026-05-11 at 5.14.55 PM.png" alt="" loading="lazy" /></div>
          <div class="proj-mini-thumb"><img src="assets/projects/SK portal/Screenshot 2026-05-11 at 5.15.03 PM.png" alt="" loading="lazy" /></div>
          <div class="proj-mini-thumb"><img src="assets/projects/SK portal/Screenshot 2026-05-11 at 5.15.28 PM.png" alt="" loading="lazy" /></div>
          <span class="proj-mini-label">+4 screens</span>
        </div>
      </div>
    </div>
  </article>

  <!-- Youth Profiling Dashboard -->
  <article class="proj-card">
    <div class="proj-img">
      <img src="assets/projects/SK portal/Power BI.png" alt="Youth Profiling Power BI Dashboard" loading="lazy" />
    </div>
    <div class="proj-body">
      <div>
        <p class="proj-category">Analytics · Internship</p>
        <h3 class="proj-title">Youth Profiling Dashboard</h3>
        <p class="proj-desc">Power BI dashboard visualizing SK community engagement data from 1,240 respondents across Davao del Sur.</p>
      </div>
      <div>
        <div class="proj-tags">
          <span>Power BI</span><span>Google Forms</span><span>SQL</span>
        </div>
        <div class="proj-mini-gallery">
          <div class="proj-mini-thumb"><img src="assets/projects/SK portal/Power BI.png" alt="" loading="lazy" /></div>
          <span class="proj-mini-label">486hr internship</span>
        </div>
      </div>
    </div>
  </article>

  <!-- Maviken ERP -->
  <article class="proj-card">
    <div class="proj-img">
      <img src="assets/projects/erp.png" alt="Maviken Fleet ERP" loading="lazy" />
    </div>
    <div class="proj-body">
      <div>
        <p class="proj-category">ERP · Flutter</p>
        <h3 class="proj-title">Maviken Fleet ERP</h3>
        <p class="proj-desc">Full logistics ERP: orders, billing, expenses, rentals, inventory, PDF invoicing, and real-time dashboards.</p>
      </div>
      <div>
        <div class="proj-tags">
          <span>Flutter</span><span>Supabase</span><span>SQL</span><span>Firebase</span>
        </div>
        <div class="proj-mini-gallery">
          <div class="proj-mini-thumb"><img src="assets/projects/erp.png" alt="" loading="lazy" /></div>
          <span class="proj-mini-label">Production system</span>
        </div>
      </div>
    </div>
  </article>

  <!-- GoDavao -->
  <article class="proj-card">
    <div class="proj-img" aria-hidden="true">
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>
    </div>
    <div class="proj-body">
      <div>
        <p class="proj-category">Thesis · GIS · Mobile</p>
        <h3 class="proj-title">GoDavao – Ridesharing App</h3>
        <p class="proj-desc">Dynamic rideshare with MapLibre GL, OSRM routing, surge pricing, Supabase Realtime, Docker &amp; CI/CD.</p>
      </div>
      <div>
        <div class="proj-tags">
          <span>Flutter</span><span>MapLibre</span><span>OSRM</span><span>Docker</span>
        </div>
        <div class="proj-mini-gallery">
          <span class="proj-mini-label">Ateneo thesis · 2025–2026</span>
        </div>
      </div>
    </div>
  </article>

  <!-- Pylon Energy -->
  <article class="proj-card">
    <div class="proj-img">
      <img src="assets/projects/pylon.png" alt="Pylon Energy Corp website" loading="lazy" />
    </div>
    <div class="proj-body">
      <div>
        <p class="proj-category">Corporate · Web</p>
        <h3 class="proj-title">Pylon Energy Corp</h3>
        <p class="proj-desc">Solar energy corporate site with Google Maps API integration, inquiry forms, and responsive UI.</p>
      </div>
      <div>
        <div class="proj-tags">
          <span>WordPress</span><span>Google Maps</span><span>Web Design</span>
        </div>
        <div class="proj-mini-gallery">
          <div class="proj-mini-thumb"><img src="assets/projects/pylon.png" alt="" loading="lazy" /></div>
          <span class="proj-mini-label">Corporate site</span>
        </div>
      </div>
    </div>
  </article>

  <!-- Campaign Management System -->
  <article class="proj-card">
    <div class="proj-img" aria-hidden="true">
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2"><path d="M3 3h18v4H3zM3 10h8v4H3zM3 17h8v4H3zM14 10h7v11h-7z"/></svg>
    </div>
    <div class="proj-body">
      <div>
        <p class="proj-category">Data · Freelance</p>
        <h3 class="proj-title">Campaign Management System</h3>
        <p class="proj-desc">Excel vote-tracking system using INDEX-MATCH and lookup logic to merge voter and precinct data for decision-making.</p>
      </div>
      <div>
        <div class="proj-tags">
          <span>Excel</span><span>INDEX-MATCH</span><span>Data Processing</span>
        </div>
        <div class="proj-mini-gallery">
          <span class="proj-mini-label">Freelance · 2019</span>
        </div>
      </div>
    </div>
  </article>

</div><!-- /.projects-grid -->
```

- [ ] **Step 3: Verify no bento classes remain in index.html**

```bash
grep -n "bento" WebsitePortfolio/index.html
```
Expected output: no results.

---

### Task 3: Visual check and commit

- [ ] **Step 1: Open the portfolio in a browser**

Open `WebsitePortfolio/index.html` directly in a browser (or run a local server). Navigate to the Projects section and verify:
- 3 equal columns on desktop
- Each card is the same height with left image + right content
- SK Portal shows 3 mini thumbs + "+4 screens" label
- GoDavao and Campaign show SVG icon in left panel (no broken image)
- Hover lifts card and shows red border glow
- Tags use the muted style (not red)
- Category label is red

- [ ] **Step 2: Check mobile at 580px**

In browser dev tools, resize to 375px wide. Verify:
- Cards stack to 1 column
- Left image still shows at ~40% width
- Content is readable

- [ ] **Step 3: Commit**

```bash
git add WebsitePortfolio/index.html WebsitePortfolio/styles.css
git commit -m "feat: replace bento grid with equal split-card projects layout"
```
