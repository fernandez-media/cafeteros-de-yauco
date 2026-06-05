## Hero Simplification Pass

### Goal
Strip the hero down to a minimal, cinematic composition: logo (preserved) → tagline → animated scroll chevrons. Remove all text headings and CTA buttons.

### Scope
`src/pages/Index.tsx` — hero `<section>` only. `src/index.css` — one new keyframe animation. No other files or sections touched.

### What to Remove
- The `<h1>` block containing "CAFETEROS" / "DE YAUCO" text.
- The "VER CALENDARIO" `<Link>` button.
- Any other secondary CTA if present in the hero content area.
- Clean up now-unused `Link` import if it becomes orphaned.

### What to Add

**1. Tagline**
- Text: `Explora el equipo campeón`
- Positioned centered, below the logo.
- Styles: `12px` size, `letter-spacing: 0.16em`, `text-transform: uppercase`, `color: rgba(255,255,255,0.3)`, `font-weight: 600`.

**2. Scroll Indicator — Three Stacked Chevron Icons**
- Use inline SVG `ChevronDown` icons (no icon library in project) wrapped in `<span>` elements with the requested class names for targeting.
- Visual stacking order from top to bottom:
  - Icon 1: `#C8A84B`, opacity `1`, size `22px`, delay `0s`
  - Icon 2: `#C8A84B`, opacity `0.5`, size `19px`, delay `0.2s`
  - Icon 3: `#C8A84B`, opacity `0.2`, size `16px`, delay `0.4s`
- CSS keyframe `cascade` added to `src/index.css`:
  ```css
  @keyframes cascade {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(6px); }
  }
  ```
- Apply `animation: cascade 1.6s ease-in-out infinite;` to each chevron, with per-element `animation-delay`.

### Layout Order (top to bottom inside hero content)
```
[logo]  (preserved as-is)
[tagline]
[three chevrons]
```

### Technical Notes
- Framer Motion is **not** installed, so all animation is pure CSS.
- The logo is not in the JSX hero block; it is assumed to be part of the video/background asset and must not be altered.
- No changes to navbar, background video, gradients, colors, or any other page section.