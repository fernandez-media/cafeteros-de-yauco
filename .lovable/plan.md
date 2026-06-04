# Plan: Gold glow on active match card while scrolling Calendario

Replicate the home page calendar preview's "active card" highlight on the full Calendario page, but tracking vertical scroll (the page scrolls vertically, not horizontally like the home preview).

## Changes

**File:** `src/pages/Calendario.tsx`

1. Add `useRef`, `useState`, `useEffect` imports.
2. Track an `activeIndex` state and a `cardRefs` array of refs to each card.
3. On window `scroll` (and on mount/resize), compute which card's vertical center is closest to the viewport center. Set that as `activeIndex`. Use `{ passive: true }` and clean up on unmount.
4. Apply the same highlight styling used on the home page to the active card:
   - Border color: `rgba(255, 215, 0, 0.8)` when active, current `rgba(255, 215, 0, 0.08)` otherwise.
   - Box shadow: `0 0 24px rgba(255, 215, 0, 0.45)` when active, `none` otherwise.
   - Add `transition-[border-color,box-shadow] duration-300` to smooth the change.
5. Attach `ref={(el) => { cardRefs.current[i] = el; }}` to each card's root `div`.

No other styling, layout, content, badges, logos, venue text, or navigation changes.

## Notes

- Uses vertical-center proximity (instead of the home page's horizontal-center proximity) because the Calendario list scrolls vertically.
- No new dependencies.
