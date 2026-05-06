/**
 * slides-base.js
 * 
 * Reusable helper functions for creating presentation slides.
 * Copy this file to your working directory and require() it.
 *
 * Usage:
 *   const { COLORS, FONTS, addContentSlide, addTitleSlide, addSectionDivider, addTableData } = require("./slides-base");
 */

const path = require("path");

// ─── Brand Colors ───────────────────────────────────────────────
const COLORS = {
    darkText: "222222",  // dk1 — primary text
    white: "FFFFFF",  // lt1
    gray: "A6A6A6",  // dk2 — section labels, captions
    lightGray: "E3E3E3",  // lt2 — borders
    darkBlue: "1C5DB5",  // accent1
    blue: "1DA0FF",  // accent2 — PRIMARY accent
    yellow: "FDC01A",  // accent3
    green: "168015",  // accent4
    nearWhite: "F3F3F3",  // accent5 — subtle bg
    paleBlue: "DBF0FE",  // accent6 — light fills
    linkBlue: "31A1FE",  // hlink
    bodyText: "4D4D4D",  // body text gray
};

// ─── Font specs ─────────────────────────────────────────────────
// ★ CRITICAL: The template uses BLUE titles inside cards/boxes.
//
// Most titles in slide content areas sit inside cards, grids, or feature boxes,
// so `title` and `subtitle` default to BLUE. The slide header (top of slide)
// is the only place that uses dark titles — handled by `headerTitle` and the
// addContentSlide() function automatically.
//
// If you ever need a dark title in the content area (rare), use `slideSectionTitle`.
const FONTS = {
    family: "Noto Sans",

    // ── Slide-level header (dark) — used by addContentSlide() automatically ──
    headerTitle: { fontFace: "Noto Sans", fontSize: 20, bold: true, color: COLORS.darkText },

    // ── Content titles (BLUE) — use for ANY title inside cards, boxes, grids ──
    title: { fontFace: "Noto Sans", fontSize: 16, bold: true, color: COLORS.blue },
    titleSmall: { fontFace: "Noto Sans", fontSize: 14, bold: true, color: COLORS.blue },
    subtitle: { fontFace: "Noto Sans", fontSize: 14, bold: true, color: COLORS.blue },
    subtitleSm: { fontFace: "Noto Sans", fontSize: 12, bold: true, color: COLORS.blue },
    cardTitle: { fontFace: "Noto Sans", fontSize: 16, bold: true, color: COLORS.blue },
    cardTitleSm: { fontFace: "Noto Sans", fontSize: 14, bold: true, color: COLORS.blue },

    // ── Dark section titles (rare) — only for slide-level subsection markers ──
    slideSectionTitle: { fontFace: "Noto Sans", fontSize: 16, bold: true, color: COLORS.darkText },
    slideSectionTitleSm: { fontFace: "Noto Sans", fontSize: 14, bold: true, color: COLORS.darkText },

    // ── Body text ──
    body: { fontFace: "Noto Sans", fontSize: 12, color: COLORS.bodyText },
    bodySmall: { fontFace: "Noto Sans", fontSize: 10, color: COLORS.bodyText },

    // ── UI elements ──
    sectionLabel: { fontFace: "Noto Sans", fontSize: 10, color: COLORS.blue },
    pageNum: { fontFace: "Noto Sans", fontSize: 10, color: COLORS.darkText },
    tableHeader: { fontFace: "Noto Sans", fontSize: 14, bold: true, color: COLORS.white },
    tableBody: { fontFace: "Noto Sans", fontSize: 10, color: COLORS.darkText },
};

// ─── Layout constants ───────────────────────────────────────────
const LAYOUT = {
    // Logo
    logo: { x: 8.54, y: 0.21, w: 1.12, h: 0.35 },
    // Section label
    sectionLabel: { x: 0.39, y: 0.05, w: 7.87, h: 0.33 },
    // Blue header line
    headerLine: { x: 0.40, y: 0.38, w: 8.00 },
    // Blue accent bar next to title
    accentBar: { x: 0.35, y: 0.55, w: 0.08, h: 0.31 },
    // Slide title
    title: { x: 0.49, y: 0.51, w: 6.81, h: 0.42 },
    // Page number
    pageNum: { x: 9.26, y: 5.19, w: 0.51, h: 0.39 },
    // Content area
    content: { x: 0.49, y: 0.95, w: 9.0, h: 4.1 },
};

/**
 * Resolve the path to the logo image.
 * Looks for the logo in the skill's assets directory.
 * If running from a different directory, pass the skill path explicitly.
 *
 * @param {string} [skillDir] - Path to the slides-skill skill directory
 * @returns {string} Absolute path to logo.png
 */
function getLogoPath(skillDir) {
    if (skillDir) {
        return path.join(skillDir, "assets", "logo.png");
    }
    // Try common locations
    const candidates = [
        path.join(__dirname, "assets", "logo.png"),
        path.join(__dirname, "..", "assets", "logo.png"),
        "./assets/logo.png",
    ];
    const fs = require("fs");
    for (const p of candidates) {
        if (fs.existsSync(p)) return p;
    }
    return candidates[0]; // fallback
}

/**
 * Add standard header elements to a content slide.
 * This adds: logo, section label, blue header line, blue accent bar, title, page number.
 *
 * @param {object} pres - PptxGenJS presentation instance
 * @param {object} opts
 * @param {string} opts.sectionLabel - Section name shown at top-left (e.g. "課題/目標/マイルストーン")
 * @param {string} opts.title - Slide title text
 * @param {number|string} opts.pageNum - Page number
 * @param {string} [opts.logoPath] - Path to logo image (auto-resolved if omitted)
 * @param {string} [opts.skillDir] - Path to the skill directory (for finding logo)
 * @returns {object} The created slide, ready for content
 */
function addContentSlide(pres, { sectionLabel, title, pageNum, logoPath, skillDir }) {
    const slide = pres.addSlide();

    const logo = logoPath || getLogoPath(skillDir);

    // Logo (top-right)
    try {
        slide.addImage({
            path: logo,
            x: LAYOUT.logo.x, y: LAYOUT.logo.y,
            w: LAYOUT.logo.w, h: LAYOUT.logo.h,
        });
    } catch (e) {
        // If logo file not found, add text placeholder
        slide.addText("logo", {
            x: LAYOUT.logo.x, y: LAYOUT.logo.y,
            w: LAYOUT.logo.w, h: LAYOUT.logo.h,
            fontFace: "Noto Sans", fontSize: 12, color: COLORS.gray,
            align: "right",
        });
    }

    // Section label (top-left, small gray text)
    if (sectionLabel) {
        slide.addText(sectionLabel, {
            x: LAYOUT.sectionLabel.x, y: LAYOUT.sectionLabel.y,
            w: LAYOUT.sectionLabel.w, h: LAYOUT.sectionLabel.h,
            ...FONTS.sectionLabel,
            align: "left", valign: "middle", margin: 0,
        });
    }

    // Blue header line
    slide.addShape(pres.shapes.LINE, {
        x: LAYOUT.headerLine.x, y: LAYOUT.headerLine.y,
        w: LAYOUT.headerLine.w, h: 0,
        line: { color: COLORS.blue, width: 1 },
    });

    // Blue accent bar (left of title)
    slide.addShape(pres.shapes.RECTANGLE, {
        x: LAYOUT.accentBar.x, y: LAYOUT.accentBar.y,
        w: LAYOUT.accentBar.w, h: LAYOUT.accentBar.h,
        fill: { color: COLORS.blue },
        line: { color: COLORS.blue, width: 0.5 },
    });

    // Slide title
    slide.addText(title, {
        x: LAYOUT.title.x, y: LAYOUT.title.y,
        w: LAYOUT.title.w, h: LAYOUT.title.h,
        ...FONTS.headerTitle,
        align: "left", valign: "middle", margin: 0,
    });

    // Page number (bottom-right)
    slide.addText(String(pageNum), {
        x: LAYOUT.pageNum.x, y: LAYOUT.pageNum.y,
        w: LAYOUT.pageNum.w, h: LAYOUT.pageNum.h,
        ...FONTS.pageNum,
        align: "center", valign: "middle",
    });

    return slide;
}

/**
 * Create a title/cover slide.
 *
 * @param {object} pres - PptxGenJS presentation instance
 * @param {object} opts
 * @param {string} opts.title - Main title (e.g. "MTG")
 * @param {string} opts.date - Date string (e.g. "2025/10/01")
 * @param {string} opts.author - Author name
 * @param {string} [opts.logoPath] - Path to logo image
 * @param {string} [opts.skillDir] - Path to skill directory
 * @returns {object} The created slide
 */
function addTitleSlide(pres, { title, date, author, logoPath, skillDir }) {
    const slide = pres.addSlide();

    const logo = logoPath || getLogoPath(skillDir);

    // Logo
    try {
        slide.addImage({
            path: logo,
            x: LAYOUT.logo.x, y: LAYOUT.logo.y,
            w: LAYOUT.logo.w, h: LAYOUT.logo.h,
        });
    } catch (e) {
        slide.addText("logo", {
            x: LAYOUT.logo.x, y: LAYOUT.logo.y,
            w: LAYOUT.logo.w, h: LAYOUT.logo.h,
            fontFace: "Noto Sans", fontSize: 12, color: COLORS.gray,
            align: "right",
        });
    }

    // Main title — centered
    slide.addText(title, {
        x: 0.22, y: 1.92, w: 9.57, h: 0.70,
        fontFace: "Noto Sans", fontSize: 36, bold: true,
        color: COLORS.darkText, align: "center", valign: "middle",
    });

    // Date
    slide.addText(date, {
        x: 1.66, y: 2.96, w: 6.68, h: 0.50,
        fontFace: "Noto Sans", fontSize: 16, color: COLORS.darkText,
        align: "center", valign: "middle",
    });

    // Author
    slide.addText(author, {
        x: 1.66, y: 3.52, w: 6.68, h: 0.43,
        fontFace: "Noto Sans", fontSize: 14, color: COLORS.darkText,
        align: "center", valign: "middle",
    });

    // Page number
    slide.addText("1", {
        x: LAYOUT.pageNum.x, y: LAYOUT.pageNum.y,
        w: LAYOUT.pageNum.w, h: LAYOUT.pageNum.h,
        ...FONTS.pageNum,
        align: "center", valign: "middle",
    });

    return slide;
}

/**
 * Create a section divider slide.
 *
 * @param {object} pres - PptxGenJS presentation instance
 * @param {object} opts
 * @param {string} opts.sectionLabel - Section label at top
 * @param {string} opts.title - Large section title
 * @param {number|string} opts.pageNum - Page number
 * @param {string} [opts.logoPath] - Path to logo image
 * @param {string} [opts.skillDir] - Path to skill directory
 * @returns {object} The created slide
 */
function addSectionDivider(pres, { sectionLabel, title, pageNum, logoPath, skillDir }) {
    // Use addContentSlide — section dividers have the same header elements
    // but the title is the only content (large, prominent)
    return addContentSlide(pres, { sectionLabel, title, pageNum, logoPath, skillDir });
}

/**
 * Build table data array with styling.
 * Returns an array suitable for slide.addTable().
 *
 * @param {string[]} headers - Column header texts
 * @param {string[][]} rows - 2D array of cell texts
 * @returns {object[][]} Formatted table data for addTable()
 */
function addTableData(headers, rows) {
    const headerRow = headers.map(h => ({
        text: h,
        options: {
            fill: { color: COLORS.blue },
            color: COLORS.white,
            bold: true,
            fontFace: FONTS.family,
            fontSize: 14,
            align: "left",
            valign: "middle",
        }
    }));

    const dataRows = rows.map((row, i) => {
        const isEven = i % 2 === 0;
        return row.map(cell => ({
            text: cell,
            options: {
                fill: { color: isEven ? COLORS.paleBlue : COLORS.white },
                color: COLORS.darkText,
                fontFace: FONTS.family,
                fontSize: 10,
                align: "left",
                valign: "middle",
            }
        }));
    });

    return [headerRow, ...dataRows];
}

/**
 * Get chart styling options.
 * Merge these into your addChart() options.
 *
 * @returns {object} Chart styling options
 */
function getChartStyle() {
    return {
        chartColors: [COLORS.blue, COLORS.darkBlue, COLORS.paleBlue, COLORS.linkBlue, COLORS.gray],
        catAxisLabelColor: COLORS.gray,
        valAxisLabelColor: COLORS.gray,
        catAxisLabelFontFace: FONTS.family,
        valAxisLabelFontFace: FONTS.family,
        catAxisLabelFontSize: 10,
        valAxisLabelFontSize: 10,
        valGridLine: { color: COLORS.lightGray, size: 0.5 },
        catGridLine: { style: "none" },
        dataLabelColor: COLORS.darkText,
        dataLabelFontFace: FONTS.family,
        dataLabelFontSize: 10,
    };
}

/**
 * Add feature cards in a vertical stacked layout (like サービス特徴 slide 27).
 * Each card is a pale-blue row with an icon area on the left, a BLUE title, and body text.
 * This is the "rows" variant — cards stacked vertically, full width.
 *
 * @param {object} slide - The slide to add cards to
 * @param {object} pres - PptxGenJS presentation instance
 * @param {Array<{title: string, body: string, iconPath?: string}>} cards - Card data
 * @param {object} [opts] - Optional overrides
 * @param {number} [opts.startY=0.95] - Y position of first card
 * @param {number} [opts.x=0.49] - X position
 * @param {number} [opts.w=9.0] - Card width
 */
function addFeatureRows(slide, pres, cards, opts = {}) {
    const startY = opts.startY || 0.95;
    const x = opts.x || 0.49;
    const w = opts.w || 9.0;
    const cardH = opts.cardH || (3.9 / Math.max(cards.length, 1));
    const gap = 0.1;

    cards.forEach((card, i) => {
        const y = startY + i * (cardH + gap);

        // Pale blue background rectangle
        slide.addShape(pres.shapes.RECTANGLE, {
            x, y, w, h: cardH,
            fill: { color: COLORS.paleBlue },
            line: { color: COLORS.paleBlue, width: 0.5 },
        });

        // Icon area (if icon path provided)
        const textX = card.iconPath ? x + 1.2 : x + 0.3;
        const textW = card.iconPath ? w - 1.5 : w - 0.6;

        if (card.iconPath) {
            // Blue circle for icon background
            const circleSize = Math.min(cardH * 0.6, 0.8);
            const circleX = x + 0.3;
            const circleY = y + (cardH - circleSize) / 2;
            slide.addShape(pres.shapes.OVAL, {
                x: circleX, y: circleY, w: circleSize, h: circleSize,
                fill: { color: COLORS.blue }, line: { color: COLORS.blue, width: 0.5 },
            });
            try {
                const iconSize = circleSize * 0.5;
                slide.addImage({
                    path: card.iconPath,
                    x: circleX + (circleSize - iconSize) / 2,
                    y: circleY + (circleSize - iconSize) / 2,
                    w: iconSize, h: iconSize,
                });
            } catch (e) { /* icon not found, circle alone is fine */ }
        }

        // ★ BLUE title — this is the key brand pattern
        slide.addText(card.title, {
            x: textX, y: y + cardH * 0.1, w: textW, h: cardH * 0.35,
            fontFace: FONTS.family, fontSize: 14, bold: true,
            color: COLORS.blue,  // ← BLUE, not dark
            align: "left", valign: "middle", margin: 0,
        });

        // Body text
        slide.addText(card.body, {
            x: textX, y: y + cardH * 0.45, w: textW, h: cardH * 0.5,
            fontFace: FONTS.family, fontSize: 12,
            color: COLORS.bodyText,
            align: "left", valign: "top", margin: 0,
        });
    });
}

/**
 * Add feature cards in a grid layout (like サービス特徴 slide 26, or 活用例 cards).
 * Cards are arranged in a 2-column or 3-column grid, each with a BLUE title.
 *
 * @param {object} slide - The slide to add cards to
 * @param {object} pres - PptxGenJS presentation instance
 * @param {Array<{title: string, body: string, iconPath?: string}>} cards - Card data
 * @param {object} [opts] - Optional overrides
 * @param {number} [opts.cols=2] - Number of columns (2 or 3)
 * @param {number} [opts.startY=0.95] - Y position of first row
 * @param {number} [opts.x=0.49] - X position of grid
 * @param {number} [opts.w=9.0] - Total width of grid
 */
function addFeatureGrid(slide, pres, cards, opts = {}) {
    const cols = opts.cols || 2;
    const startY = opts.startY || 0.95;
    const x = opts.x || 0.49;
    const totalW = opts.w || 9.0;
    const gap = 0.2;
    const cardW = (totalW - gap * (cols - 1)) / cols;
    const cardH = opts.cardH || 1.5;
    const rowGap = 0.2;

    cards.forEach((card, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const cx = x + col * (cardW + gap);
        const cy = startY + row * (cardH + rowGap);

        // Card background — white with light gray border (or pale blue fill)
        slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
            x: cx, y: cy, w: cardW, h: cardH,
            fill: { color: COLORS.white },
            line: { color: COLORS.lightGray, width: 1 },
            rectRadius: 0.08,
        });

        // Blue left accent stripe
        slide.addShape(pres.shapes.RECTANGLE, {
            x: cx, y: cy, w: 0.06, h: cardH,
            fill: { color: COLORS.blue }, line: { color: COLORS.blue, width: 0.5 },
        });

        // Icon (if provided)
        const textX = card.iconPath ? cx + 1.1 : cx + 0.25;
        const textW = card.iconPath ? cardW - 1.3 : cardW - 0.5;

        if (card.iconPath) {
            const circleSize = 0.7;
            const circleX = cx + 0.25;
            const circleY = cy + (cardH - circleSize) / 2;
            slide.addShape(pres.shapes.OVAL, {
                x: circleX, y: circleY, w: circleSize, h: circleSize,
                fill: { color: COLORS.blue }, line: { color: COLORS.blue, width: 0.5 },
            });
            try {
                const iconSz = circleSize * 0.5;
                slide.addImage({
                    path: card.iconPath,
                    x: circleX + (circleSize - iconSz) / 2,
                    y: circleY + (circleSize - iconSz) / 2,
                    w: iconSz, h: iconSz,
                });
            } catch (e) { }
        }

        // ★ BLUE title — brand pattern
        slide.addText(card.title, {
            x: textX, y: cy + 0.15, w: textW, h: 0.35,
            fontFace: FONTS.family, fontSize: 14, bold: true,
            color: COLORS.blue,  // ← BLUE title inside cards
            align: "left", valign: "middle", margin: 0,
        });

        // Body text
        slide.addText(card.body, {
            x: textX, y: cy + 0.55, w: textW, h: cardH - 0.7,
            fontFace: FONTS.family, fontSize: 11,
            color: COLORS.bodyText,
            align: "left", valign: "top", margin: 0,
        });
    });
}

module.exports = {
    COLORS,
    FONTS,
    LAYOUT,
    addContentSlide,
    addTitleSlide,
    addSectionDivider,
    addTableData,
    getChartStyle,
    getLogoPath,
    addFeatureRows,
    addFeatureGrid,
};
