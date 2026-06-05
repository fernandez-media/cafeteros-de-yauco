# Subir el video del hero

## Problema
El video de fondo del hero usa `object-cover` con posición centrada por defecto. Esto hace que la estrella y el logo dentro del video queden muy abajo en pantallas verticales (móvil), porque el video se recorta por arriba y abajo equitativamente.

## Cambio
En `src/pages/Index.tsx` (línea 64), añadir `object-position` al `<video>` para correr el encuadre hacia arriba, de modo que el contenido importante (estrella + logo) suba visualmente.

**Edit:**
```tsx
className="absolute inset-0 w-full h-full object-cover"
style={{ objectPosition: 'center 30%' }}
```

Esto mueve el "ancla" del encuadre del 50% al 30% vertical: el video se recorta más por abajo y menos por arriba, subiendo la estrella y el logo dentro del cuadro visible.

## Pregunta antes de implementar
¿Te parece bien `center 30%` como punto de partida, o prefieres que lo suba más agresivo (`center 20%` o `center top`)? Si quieres puedo dejarlo en 30% y ajustamos después si se ve.

## Alcance
- Solo 1 línea cambia en `src/pages/Index.tsx`
- No se toca nada más (ni chevrons, ni overlays, ni header)
