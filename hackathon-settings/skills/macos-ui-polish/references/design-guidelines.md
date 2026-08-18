# macOS Tahoe & Dia UI Design Guidelines

Detailed design rules for engineering web and Tauri desktop user interfaces.

---

## 1. Material Layers & Acrylic Surfaces

| Element | Background | Blur Filter | Border / Highlight |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `#0f1117` or `#161821` | None (with subtle dot grid) | None |
| **Floating Dock / Toolbar** | `rgba(22, 25, 35, 0.72)` | `blur(28px) saturate(190%)` | `1px solid rgba(255,255,255,0.08)` + inner glow |
| **Sidebars & Drawers** | `rgba(18, 20, 28, 0.6)` | `blur(24px) saturate(180%)` | Right border `rgba(255,255,255,0.06)` |
| **Modal Sheets** | `rgba(30, 34, 48, 0.75)` | `blur(36px) saturate(200%)` | `1px solid rgba(255,255,255,0.16)` |

---

## 2. Interactive Control Styles

### Floating Pill Toolbar (Dia Style)
- Capsule shaped (`border-radius: 9999px`).
- Centered at the top or bottom of the viewport with a floating offset (e.g. `top: 16px`).
- Subtle drop shadow with ambient elevation: `0 12px 32px rgba(0, 0, 0, 0.35)`.

### Segmented Controls & Icons
- Default state: transparent background, semi-transparent text/icon (`rgba(235, 235, 245, 0.65)`).
- Hover state: soft luminous pill background (`rgba(255, 255, 255, 0.08)`).
- Active / Selected state: macOS Accent Blue (`#0a84ff`) or high-contrast solid white pill with dark icon.
- Press state: smooth micro-scale `scale(0.96)`.

---

## 3. Window & Canvas Header Controls
- **Traffic Light Controls**:
  - Close: `#ff5f56`
  - Minimize: `#ffbd2e`
  - Zoom: `#27c93f`
  - Size: 12px circle with 8px spacing.
- **Canvas Dot Grid**:
  ```css
  background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 24px 24px;
  ```
