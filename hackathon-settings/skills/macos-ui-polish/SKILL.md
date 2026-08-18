---
name: macos-ui-polish
description: >-
  Audits, refactors, and polishes web and desktop application user interfaces with macOS Tahoe and Dia-style liquid acrylic glassmorphism, floating pill toolbars, and tactile micro-interactions in English.
---

# macOS Tahoe & Dia UI Polish Skill

This skill provides step-by-step instructions to elevate web and desktop frontend applications (React, Tauri, Vue, Svelte) to the visual and tactile standards of macOS Tahoe, Dia browser, and Arc browser.

---

## 1. Automated UI Audit

1. **Check Component Structure**:
   - Inspect toolbars, canvases, modals, sidebars, and buttons in `src/components/` and `src/App.tsx`.
2. **Identify Anti-Patterns**:
   - Flat, solid opaque backgrounds on floating toolbars.
   - Harsh 1px solid borders with strong contrasts or plain gray colors.
   - Native default HTML form buttons and inputs.
   - Missing transition curves (`transition: all ...`) on hover/active states.

---

## 2. Applying macOS Tahoe Design Tokens

1. Link or import the design system tokens:
   - [macos-design-system.css](./resources/macos-design-system.css)
2. Use standardized CSS variables:
   - Floating surfaces: `background: var(--macos-surface-acrylic); backdrop-filter: var(--macos-blur-dock);`
   - Borders: `border: 1px solid var(--macos-border-subtle); box-shadow: var(--macos-inner-glow);`
   - Typography: `font-family: var(--macos-font-sans);`
   - Transition: `transition: all var(--macos-duration-fast) var(--macos-ease-spring);`

---

## 3. Component Refactoring Checklist

- [ ] **Toolbar**: Refactor into a floating capsule pill dock with segmented buttons and soft hover highlights.
- [ ] **Canvas / Workspace**: Add deep dark slate background with refined 24px dot-grid overlay.
- [ ] **Modal Dialogues**: Wrap in translucent backdrop blurs (`backdrop-filter: blur(12px)`) and spring entry animations.
- [ ] **Inputs & Controls**: Use rounded pill inputs (`border-radius: 8px` or `9999px`) with glowing focus rings (`#007aff`).
