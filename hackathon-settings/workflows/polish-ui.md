---
description: Run an automated UI design audit and polish components to match macOS Tahoe and Dia/Arc browser aesthetics.
---

# 🎨 macOS Tahoe UI Polish Workflow

This workflow guides the agent through auditing, styling, and polishing the frontend user interface to achieve the aesthetics of macOS Tahoe and Dia browser.

---

## Step 1: Discover & Audit Frontend Components

1. Inspect `src/App.tsx`, `src/App.css`, and components in `src/components/`.
2. Check for existing styling approaches (Vanilla CSS, CSS modules).

---

## Step 2: Integrate Design System Tokens

1. Review [macos-design-system.css](../skills/macos-ui-polish/resources/macos-design-system.css) and [design-guidelines.md](../skills/macos-ui-polish/references/design-guidelines.md).
2. Incorporate CSS variables for acrylic surfaces, micro-borders, backdrop blurs, and spring transitions into `src/App.css` or global style sheets.

---

## Step 3: Polish Components

1. Refactor toolbars into floating pill docks.
2. Polish buttons with tactile scale effects on `:active` and smooth hover glows.
3. Enhance modals and popovers with blurred sheet backdrops and spring entrance animations.

---

## Step 4: Verification

1. Verify layout responsiveness and visual contrast.
2. Confirm smooth transitions on hover and active states.
