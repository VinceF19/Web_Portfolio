# Projects Section Redesign — Split Card Grid

**Date:** 2026-05-11
**Status:** Approved

## Summary

Replace the existing asymmetric bento grid with a uniform 3-column equal-card layout. Each card uses a split layout: left 44% is the main project screenshot (or icon placeholder), right 56% contains category label, title, description, tech tags, and a mini thumbnail row.

## Layout

- **Grid:** `repeat(3, 1fr)`, 16px gap, desktop-first
- **Card height:** 196px fixed, `overflow: hidden`
- **Card background:** `var(--bg-raised)` (`#1a1918`), 1px border, 14px radius
- **Hover:** `translateY(-2px)` + red border glow

## Card Anatomy (left → right)

### Left — `.proj-img` (44% width)
- `object-fit: cover` on the main screenshot
- Fallback: centered SVG icon in muted color for projects without screenshots (GoDavao, Campaign)

### Right — `.proj-body`
- **Category label** (9px, red, uppercase, letter-spaced): e.g. "Thesis · GIS · Mobile"
- **Title** (13px, 700, Space Grotesk)
- **Description** (10.5px, muted, 1.5 line-height)
- **Tech tags** — small pill badges, muted border style (not red — red is reserved for category label)
- **Mini gallery** — up to 3 thumbs (32×20px), `+N` count label when more exist. Shows actual screenshots where available; short text label for single-image projects.

## Projects & Assets

| Project | Main image | Mini thumbs |
|---|---|---|
| SK Provincial Portal | `SK portal/Screenshot...5.14.39 PM.png` | 5.14.55, 5.15.03, 5.15.28 + "+4" |
| Youth Profiling Dashboard | `SK portal/Power BI.png` | same image, text label |
| Maviken Fleet ERP | `erp.png` | same image, text label |
| GoDavao | SVG map-pin icon | text label "Screenshots coming" |
| Pylon Energy Corp | `pylon.png` | same image, text label |
| Campaign Management | SVG grid icon | text label "Freelance · 2019" |

## Responsive

- **≤ 900px:** 2 columns
- **≤ 580px:** 1 column, card height auto

## Changes Required

1. Replace `.bento` HTML block in `index.html` with new `.projects-grid` markup
2. Replace `.bento*` CSS in `styles.css` with new `.proj-card*` rules
3. Remove old bento-specific classes entirely
