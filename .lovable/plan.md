## Restructure calendar preview cards in `src/pages/Index.tsx`

Only layout changes inside the calendar preview card (lines ~83–168). No changes to data, colors, date/time, VISITANTE badge, logos, or team-name text content.

### 1. Replace the logos row + separate names block with two vertical team columns

Current structure (simplified):
```
[ logo Cafeteros ] [ VS ] [ logo opponent ]
[ "Cafeteros de Yauco" ]
[ vs ]
[ opponent name ]
```

New structure:
```
[ logo Cafeteros        VS        logo opponent ]
[ "Cafeteros de Yauco"            opponent name ]
```

Implementation:
- Wrap each logo + its team name in a `flex flex-col items-center` column (no gap between logo and name).
- Keep the central `VS` between the two columns, vertically centered with the logos (align row at logo height using `items-start` on the row and matching logo height, or center `VS` against the logo with a small top offset so it lines up with the logo, not the name).
- Team name styling: `text-center uppercase font-bold text-white text-[12px] leading-tight mt-1` (12–13px, tight line-height, directly under logo, no extra spacing).
- Remove the entire existing block that renders `Cafeteros de Yauco` / `vs` / `{game.opponent}` underneath.

### 2. Venue/location row — single line, icon centered with text

Current: `flex items-start gap-1`, icon has `mt-0.5`, text uses `line-clamp-2` (allows wrapping to 2 lines).

Change to:
- Container: `flex items-center gap-1.5` (vertical centering, never stacks).
- Icon: remove `mt-0.5`, keep `flex-shrink-0`.
- Text: replace `line-clamp-2` with `truncate` (single line, ellipsis if overflow). Add `min-w-0` on the text or container as needed for truncate to work inside flex.

### 3. Card height

Card stays at `h-[260px]`. With the names now inline under the logos and the venue row collapsed to one line, vertical spacing should still fit; `mt-auto` on the venue row keeps it pinned to the bottom.

### Out of scope
- No edits to `src/data/calendar.ts`, `src/pages/Calendario.tsx`, or any other file.
- No color, font-family, badge, date/time, or logo changes.
