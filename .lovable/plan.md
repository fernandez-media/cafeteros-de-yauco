# Rediseño del card del calendario (preview en home)

## Cambios en `src/pages/Index.tsx` (cards del calendario)

**Logos más grandes y centralizados**
- Reemplazar la fila actual `flex items-center gap-3` por un bloque centrado: `flex items-center justify-center gap-4`.
- Aumentar el logo de Cafeteros de `w-9 h-9` a `w-16 h-16`.
- Aumentar el contenedor del rival (placeholder circular con el ícono de globo) de `w-9 h-9` a `w-16 h-16`, y agrandar el SVG interior de 18 a 32.
- Aumentar el "VS" central: de `text-xs` a `text-base font-display font-bold text-gold`.

**Nombres en tres líneas centradas**
- Reemplazar el `<p>` actual `Cafeteros de Yauco vs {game.opponent}` por un bloque de 3 líneas centradas:
  - Línea 1: `Cafeteros de Yauco`
  - Línea 2: `vs` (en minúsculas, color tenue, tipografía display)
  - Línea 3: `{game.opponent}`
- Usar `text-center`, mantener `font-display font-bold uppercase text-sm` para las líneas 1 y 3; la línea "vs" en `text-white/40 text-xs normal-case`.
- Quitar el `line-clamp-2`.

**Ajustes de altura**
- Subir la altura del card de `h-[230px]` a `h-[280px]` para acomodar logos más grandes y las 3 líneas sin recortes.

## Fuera de alcance
- No cambia `Calendario.tsx` (página completa), solo el preview del home.
- No cambia `src/data/calendar.ts`.
- Logo del rival sigue siendo el ícono genérico (solo más grande), según lo confirmado.
