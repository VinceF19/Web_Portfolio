# Portfolio Redesign — Design Spec
**Date:** 2026-04-17  
**Project:** vincef.web.app — Personal Portfolio  
**Approach:** Full Overhaul (Option 1)  
**Style direction:** Creative Developer — bold typography, gradient meshes, glassmorphism, expressive red/yellow palette

---

## 1. Design Direction

**Vibe:** Creative developer — bolder typography, gradient meshes, glassmorphism cards, expressive color, more personality.

**Color palette:** Keep existing red (#f60000) and yellow (#f7d31d) as brand colors, used more expressively:
- Gradient mesh blobs (red fading to transparent)
- Glowing borders and box-shadows in red/yellow
- Glassmorphism cards with red-tinted borders on hover

**Typography:** Keep Space Grotesk (headings) + Inter (body). Increase heading scale dramatically — hero name renders at clamp(4rem, 8vw, 8rem).

**Texture:** Subtle CSS grain/noise overlay on hero and section backgrounds for depth. No additional image assets required.

**Animations:** Retain existing reveal (fade + translateY + blur) and floatHero. Add:
- Typing/cycling text in hero eyebrow
- Smooth bento card hover states (lift + glow)
- Timeline connector animation on Experience section scroll-in

---

## 2. Page Structure

```
Navbar (floating pill → sticky on scroll)
Hero (full bleed, typographic-first)
About (same content, refined layout)
Marquee (tools strip, unchanged)
Experience (NEW — work history timeline)
Projects (bento grid)
Skills (updated capabilities)
Contact (same form, minor polish)
Footer
```

Nav links: About · Experience · Projects · Skills · Contact

---

## 3. Section Designs

### 3.1 Navbar
No structural change. Add `#experience` link. Keep floating pill behavior and sticky shrink on scroll.

---

### 3.2 Hero

**Layout:** Two-column, left-aligned.

- **Left (~60% width):**
  - Small red pill badge: `Available for Work · Davao, PH`
  - Animated eyebrow (typed cycling text): `Full-Stack Developer` → `AI Data Specialist` → `ERP Systems Builder`
  - Massive name: `RAPHAEL VINCE FERNANDEZ` in Space Grotesk 800, clamp(4rem, 8vw, 8rem), white
  - One-liner tagline: "Building fast, scalable systems that solve real business problems."
  - Two CTA buttons:
    - Primary (filled red gradient): `View Projects` → scrolls to #projects
    - Secondary (outline): `Download CV` → links to PDF resume
  - Small social row: GitHub icon · Email icon

- **Right (~40% width):**
  - Existing rounded photo with conic glow ring animation + float animation
  - Photo sized at clamp(220px, 30vw, 360px)

- **Background:**
  - `#1a1715` base
  - Large radial gradient mesh blob: deep red → transparent, top-right
  - Subtle CSS noise texture overlay (using SVG filter or pseudo-element)
  - No background image (removes BG-hero.jpg dependency)

- **Bottom:** Animated scroll chevron (bouncing arrow)

**Mobile:** Stack vertically — photo first, then text. Name scales down to clamp(2.8rem, 7vw, 4rem).

---

### 3.3 About
Same content. Layout refinements:
- Add a left accent bar (3px red vertical line) beside the section heading
- The "How I work" list gets styled as inline tag chips instead of a plain bullet list
- Offline blurb rendered in a styled italic quote block

---

### 3.4 Marquee
No change to markup or behavior. Minor: background shifts from pure white to a near-white (#f5f5f5) to soften the contrast break.

---

### 3.5 Experience (NEW SECTION)

**Content — chronological (newest first):**

| Role | Company | Period |
|------|---------|--------|
| AI Audio Annotator | Chemin AI (Kaya Project) | March 2026 – Present |
| AI Data Analyst / Model Evaluation Specialist | Innodata Inc. | Jan – Mar 2026 |
| Web Developer | Sangguniang Kabataan Davao del Sur | Dec 2024 – Mar 2025 |
| Project Manager & AI-Assisted Full Stack Developer | MAVIKEN Fleet ERP | Aug 2023 – May 2025 |
| Web Developer | Pylon Energy Corporation | Nov 2023 – Jan 2024 |
| Campaign Management System Developer | Freelance | Feb – May 2019 |

**Layout:** Vertical timeline — left vertical line (red, 2px) with dot connectors. Each entry is a card to the right with:
- Role title (bold, white)
- Company + period (muted, small)
- 2–3 bullet points of key contributions
- Tech/tool tags (same `.tech` chip style as project cards)

**Animation:** Timeline line draws in on scroll using CSS clip-path or height animation triggered by IntersectionObserver.

---

### 3.6 Projects (Bento Grid)

**Layout:** CSS grid bento layout. 5 projects total (adding Campaign Management System).

```
┌──────────────────────┬──────────────┐
│  GoDavao (LARGE)     │  MAVIKEN ERP │
│  2 cols × 2 rows     │  (medium)    │
├───────────┬──────────┴──────────────┤
│  Pylon    │  SK Portal              │
│  (small)  │  (medium)               │
├───────────┴─────────────────────────┤
│  Campaign Management System (wide)  │
└─────────────────────────────────────┘
```

**Card anatomy:**
- Full bleed image with gradient overlay at bottom
- Title + description overlaid on the image
- Tech tag chips
- Hover: subtle lift (translateY -6px), red glow border, image brightens slightly
- No scale(1.15) — that caused layout disruption in the current design

**Campaign Management System card content:**
- Title: Campaign Management System
- Description: Excel-based vote-tracking system using INDEX-MATCH and lookup logic to merge voter and precinct data for campaign decision-making.
- Tech: Excel · INDEX-MATCH · Data Merging
- No project image — use a styled gradient placeholder card with a data/chart icon

**Mobile:** All cards stack to single column.

---

### 3.7 Skills

Keep the 2-column cap-card grid layout. Update card content to reflect full skill set including AI roles:

| Card | Title | Description |
|------|-------|-------------|
| 1 | Flutter App Development | Performant mobile & web apps with clean architecture and smooth UI. |
| 2 | ERP & Business Systems | Custom systems covering orders, delivery receipts, invoicing, billing & dashboards. |
| 3 | Database & Cloud (Supabase / SQL) | Secure auth, realtime data, SQL modeling, RLS policies, serverless functions. |
| 4 | GIS Routing & OSRM | Map routing, Dijkstra algorithm, travel optimization, and geo-data visualization. |
| 5 | Web Development | HTML/CSS/JS, WordPress, branded websites, responsive portals, and API integrations. |
| 6 | AI Data Annotation & QA (NEW) | Speech segmentation, accent tagging, transcription, and model evaluation for LLM training datasets. |

6 cards in a 2×3 grid (3 rows on desktop, stacked on mobile).

Emojis removed from card titles — replaced with a small colored icon or left bare for cleaner look.

---

### 3.8 Contact
No structural change. Polish only:
- Input focus ring changes from red border to red + faint glow (box-shadow)
- Button label changes from `CONNECT WITH ME!` to `Send Message`
- Add GitHub and email as inline links below the form

---

### 3.9 Footer
Update text to include all links clearly:
`© 2026 Raphael Vince Fernandez · vince.fernandezg@gmail.com · vincef.web.app · github.com/VinceF19`

---

## 4. Files Changed

| File | Change |
|------|--------|
| `index.html` | Full restructure — new hero layout, Experience section, bento grid, updated skills |
| `styles.css` | Full overhaul — new variables, hero two-col, bento grid, timeline, noise texture, updated cards |
| `script.js` | Add: typing animation, timeline draw-in observer, updated nav active links |
| `assets/` | No new images required. Gradient placeholder for Campaign card. |

---

## 5. Out of Scope
- No framework migration (stays plain HTML/CSS/JS)
- No dark/light mode toggle
- No blog or case study pages
- No new page routes — remains single-page
- Firebase integration unchanged
