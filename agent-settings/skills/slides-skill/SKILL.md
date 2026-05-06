---
name: slides-skill
description: "Create presentation slides (.pptx). Use this skill whenever the user wants to make presentation slides."
---
 
# Slides Skill

Create `.pptx` presentations that match the template style.

## Color philosophy — use the `FONTS` presets

The template primary color is blue (`1DA0FF`). Blue carries content emphasis — card titles, section subtitles, headings inside any content area. Dark text (`222222`) is reserved for slide-level chrome that `addContentSlide` already sets up for you: the header title at the top of the slide, and the page number. You should almost never need to hand-pick a title color.

Instead of typing hex codes, spread a preset from `FONTS`:

```javascript
const { FONTS } = require("./slides-base");
 
// Content titles (blue, brand emphasis):
slide.addText("Flight", { ...FONTS.cardTitle,   /* position, size */ });   // 16pt
slide.addText("Hotel", { ...FONTS.cardTitleSm, /* position, size */ });   // 14pt
slide.addText("Tour", { ...FONTS.subtitle,    /* position, size */ });   // 14pt
slide.addText("Overview",   { ...FONTS.title,       /* position, size */ });   // 16pt
 
// Body text (gray):
slide.addText("Description...", { ...FONTS.body,      /* position, size */ });   // 12pt
slide.addText("Description...", { ...FONTS.bodySmall, /* position, size */ });   // 10pt
 
// Rare: dark heading inside content area (slide-level subsection marker):
slide.addText("Section Title", { ...FONTS.slideSectionTitle, /* ... */ });
```

Each preset bundles `fontFace`, `fontSize`, `bold`, and the correct `color`. You still set `x`, `y`, `w`, `h`, `align`, `valign`, `margin` per call. If you find yourself reaching for a raw hex like `"1DA0FF"` or `"222222"` inside an `addText` call, stop and use the matching preset instead — that's the check.

## Complete Code Template — Copy This

Below is a ready-to-use template for creating a 2×3 grid of cards (the most common layout). Copy and modify this directly:

```javascript
const pptxgen = require("pptxgenjs");
const { addContentSlide, addTitleSlide, COLORS, FONTS } = require("./slides-base");
const LOGO = "./logo.png"; // adjust path
 
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
 
// ── Title slide ──
addTitleSlide(pres, { title: "title", date: "2025/07/01", author: "name", logoPath: LOGO });
 
// ── Card grid slide ──
const slide = addContentSlide(pres, { sectionLabel: "section", title: "title", pageNum: 2, logoPath: LOGO });
 
const cards = [
  { title: "title1", body: "body1" },
  { title: "title2", body: "body2" },
  { title: "title3", body: "body3" },
  { title: "title4", body: "body4" },
  { title: "title5", body: "body5" },
  { title: "title6", body: "body6" },
];
const cols = 3;
const gap = 0.2, startY = 0.95, x = 0.49, totalW = 9.0;
const cardW = (totalW - gap * (cols - 1)) / cols;
const cardH = 1.8, rowGap = 0.2;
 
cards.forEach((card, i) => {
  const col = i % cols;
  const row = Math.floor(i / cols);
  const cx = x + col * (cardW + gap);
  const cy = startY + row * (cardH + rowGap);
 
  // Card background
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: cx, y: cy, w: cardW, h: cardH,
    fill: { color: "FFFFFF" },
    line: { color: "E3E3E3", width: 1 },
    rectRadius: 0.05,
  });
  // Blue left accent
  slide.addShape(pres.shapes.RECTANGLE, {
    x: cx, y: cy, w: 0.06, h: cardH,
    fill: { color: "1DA0FF" },
    line: { color: "1DA0FF", width: 0.5 },  // match fill to hide outline
  });
  // Card title (blue, via FONTS preset)
  slide.addText(card.title, {
    x: cx + 0.25, y: cy + 0.15, w: cardW - 0.5, h: 0.35,
    ...FONTS.cardTitleSm,
    align: "left", valign: "middle", margin: 0,
  });
  // Body text
  slide.addText(card.body, {
    x: cx + 0.25, y: cy + 0.55, w: cardW - 0.5, h: cardH - 0.7,
    ...FONTS.bodySmall,
    align: "left", valign: "top", margin: 0,
  });
});
 
pres.writeFile({ fileName: "output.pptx" });
```

For card-style layouts, you may also use the helper functions `addFeatureGrid()` or `addFeatureRows()` from `slides-base.js` — they apply `color: "1DA0FF"` automatically.

## Before you start

1. **Read the pptx skill** — this skill builds on top of it:
   - Read `/mnt/skills/public/pptx/pptxgenjs.md` for PptxGenJS API reference
   - Read `/mnt/skills/public/pptx/SKILL.md` for QA process
2. **Read the detailed style guide** — `references/style-guide.md` in this skill's directory has exact measurements, colors, and slide type catalog
3. **Use the helper script** — `scripts/slides-base.js` provides reusable functions for common slide elements

## Quick Style Summary

| Element | Spec |
|---------|------|
| Slide size | 10" × 5.625" (16:9) |
| Primary accent | `1DA0FF` (bright blue) |
| Secondary accent | `1C5DB5` (dark blue) |
| Light accent fill | `DBF0FE` (pale blue) |
| Dark text | `222222` |
| Gray text | `A6A6A6` |
| Light gray bg | `F3F3F3` |
| Font family | Noto Sans (all weights) |
| Slide header title | Noto Sans Bold 20pt, dark `222222` |
| **Content titles** | **Noto Sans Bold 14-16pt, BLUE `1DA0FF`** |
| Body text | Noto Sans Regular 12pt, `4D4D4D` |
| Logo | Top-right corner, logo wordmark |

`FONTS.title`, `FONTS.subtitle`, `FONTS.cardTitle` are all **blue** — safe to use for any content title. Only `FONTS.headerTitle` is dark (used by `addContentSlide()` automatically).

## Anatomy of a Content Slide

Every content slide (not the title slide) has these recurring elements:

```
┌──────────────────────────────────────────────────────┐
│ Section Label (10pt BLUE)                    [LOGO]  │  ← y=0.05"
│ ─────────────────────────────── (blue line)          │  ← y=0.38"
│ ▌ Slide Title (Bold 20pt, dark)                      │  ← y=0.51"
│                                                      │
│   [CONTENT AREA]                                     │
│   x: 0.49"  y: ~0.95"                               │
│   w: ~9.0"  h: ~4.0"                                │
│                                                      │
│                                                 [N]  │  ← page number
└──────────────────────────────────────────────────────┘
```

**Key positions (inches):**

- **Logo**: x=8.54, y=0.21, w=1.12, h=0.35
- **Section label**: x=0.39, y=0.05, w=7.87, h=0.33
- **Blue header line**: x=0.40, y=0.38, w=8.00 (1pt solid, color `1DA0FF`)
- **Blue accent bar**: x=0.35, y=0.55, w=0.08, h=0.31 (fill `1DA0FF`)
- **Slide title**: x=0.49, y=0.51, w=6.81, h=0.42
- **Page number**: x=9.26, y=5.19, w=0.51, h=0.39
- **Content area**: starts at approximately y=0.95, margins 0.49" from left

## Creating Slides — Workflow

### Step 1: Set up the presentation

```javascript
const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
```

### Step 2: Use the helper script

Copy `scripts/slides-base.js` to your working directory or inline the functions. The helper provides:

- `addContentSlide(pres, { sectionLabel, title, pageNum })` — returns a slide with logo, header line, accent bar, title, and page number pre-placed
- `addTitleSlide(pres, { title, date, author })` — creates the title/cover slide
- `addSectionDivider(pres, { sectionLabel, title, pageNum })` — creates a section divider slide
- `addFeatureRows(slide, pres, cards)` — stacked row cards with BLUE titles (like サービス特徴 slide 27)
- `addFeatureGrid(slide, pres, cards, { cols })` — grid cards with BLUE titles (like 活用例 2×2/3×3 layouts)
- `addTableData(headers, rows)` — brand-styled table data
- `getChartStyle()` — chart options matching brand colors
- `COLORS` — object with all brand colors
- `FONTS` — object with font specs (including `cardTitle` for blue card titles)

### Step 3: Add content to slides — Card Layouts

For any slide with cards, boxes, or feature items, ALWAYS use the card helper functions. They automatically apply the correct **blue title color (`1DA0FF`)**.

**Vertical stacked rows** (like Use Cases):

```javascript
const slide = addContentSlide(pres, { sectionLabel: "Use Cases", title: "Case Study", pageNum: 5, logoPath });
addFeatureRows(slide, pres, [
  { title: "Information collection・Research", body: "Collect information from multiple sources and generate summary reports." },
  { title: "Customer Support", body: "Understand the content of the inquiry and execute appropriate answers and escalations." },
  { title: "Data Analysis", body: "Extract insights from large amounts of data and automatically create reports." },
]);
```

**Grid layout** (2-column or 3-column cards):

```javascript
const slide = addContentSlide(pres, { sectionLabel: "Use Cases", title: "Agent AI use cases", pageNum: 5, logoPath });
addFeatureGrid(slide, pres, [
  { title: "Information collection・Research", body: "Collect information from multiple sources and generate summary reports." },
  { title: "Customer Support", body: "Understand the content of the inquiry and execute appropriate answers and escalations." },
  { title: "Data Analysis", body: "Extract insights from large amounts of data and automatically create reports." },
  { title: "Workflow Automation", body: "Automate routine tasks and promote efficiency." },
], { cols: 2 });
```

If you need to write cards manually (without the helpers), follow the pattern from the "Color philosophy" section above — spread `FONTS.cardTitle` or `FONTS.cardTitleSm` into your `addText` options.

### Step 4: QA

Follow the QA process from the pptx skill — generate thumbnails, visually inspect, fix issues.

## Slide Types Reference

The company template includes ~38 slide types. The most commonly used ones:

| Type | Use for | Key layout |
|------|---------|------------|
| Title slide | Cover page | Centered title, date, author name |
| TOC (目次) | Agenda/contents | Numbered list or colored table |
| Background (背景) | Meeting context | Two-section: background + content |
| Section divider | Chapter breaks | Large title with accent bar |
| Theme/Purpose (テーマ) | Goals overview | Three boxes: theme, purpose, expected effect |
| Milestone | Timeline/roadmap | Steps with dates, horizontal flow |
| Action items (やるべきこと) | Task lists | Icon circles or timeline bars |
| Process (プロセス) | Workflow | Connected boxes with arrows |
| Analysis (分析) | Data/comparison | Horizontal bar chart layout |
| Proposal (提案) | Recommendations | Vertical stacked bars with text |
| Matrix (マトリックス) | 2×2 comparison | Four quadrants with axis labels |
| Table (表) | Tabular data | Alternating blue/white rows |
| Q&A | FAQ format | Q/A pairs with blue dividers |
| Chart slides | Data visualization | Bar, pie, line charts |
| Org chart (組織図) | Team structure | Hierarchy boxes |

See `references/style-guide.md` for detailed specs on each slide type.

## Important Style Rules

1. **Always use Noto Sans** — never substitute with Arial or other fonts
2. **Blue accent bar** — every content slide title gets the small blue vertical bar to its left
3. **Consistent header** — section label + blue line + logo on every content slide
4. **White background** — content slides use white (`FFFFFF`), never cream or beige
5. **Color palette** — stick to the defined colors; the primary visual accent is always `1DA0FF`
6. **Light blue fills** — use `DBF0FE` for subtle background fills on cards/boxes, `F3F3F3` for neutral backgrounds
7. **Two title color modes** — slide-level titles use dark text (`222222`), but titles **inside cards/boxes/grid items** use bright blue (`1DA0FF`). Use `FONTS.cardTitle` / `FONTS.cardTitleSm` for titles within visual containers (feature cards, matrix quadrants, service rows, icon cards). This is a key brand pattern — see `references/style-guide.md` for details.
8. **Tables** — header row uses `1DA0FF` fill with white text; alternating rows use `DBF0FE` and white
9. **No decorative bars** — the only recurring bars are the header line and the title accent bar
10. **Page numbers** — dark text, bottom-right corner, every slide
11. **Japanese text** — the template is designed for Japanese content; ensure font supports JP characters
12. **Removing shape outlines** — PptxGenJS renders a default black border even with `line: { width: 0 }`. To make a shape borderless, set the line color to match the fill: `line: { color: "1DA0FF", width: 0.5 }`. The helper functions already handle this correctly.
