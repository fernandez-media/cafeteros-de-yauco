## Objetivo

Sustituir la imagen estática del hero en la página de inicio por el video que adjuntaste, manteniendo el mismo encuadre, overlay oscuro y el título "CAFETEROS DE YAUCO" + botón "Ver Calendario" encima.

## Cambios

1. **Subir el video como asset CDN**
   - Crear `src/assets/hero.mp4.asset.json` con `lovable-assets create` desde `/mnt/user-uploads/hf_20260605_033219_...mp4`.
   - El binario queda servido por CDN, no se commitea al repo.

2. **Reemplazar el `<ResponsiveImage name="hero" />` del hero** en `src/pages/Index.tsx` (líneas 56–95) por un `<video>`:
   - `autoPlay`, `muted`, `loop`, `playsInline` (requisitos para que reproduzca solo en móvil y Safari).
   - `preload="auto"`, `object-cover w-full h-full`.
   - `poster` apuntando al `hero` actual (`ResponsiveImage`) — se usa el JPG/WebP existente como primer frame mientras carga el video, para evitar parpadeo negro.
   - Conservar el overlay con gradiente a `#111111` y el contenedor con la animación `heroZoom` (o quitarla si el video ya tiene movimiento propio — recomiendo **quitar** `heroZoom` para no duplicar movimiento; el zoom CSS sobre video se siente raro).

3. **Mantener intacto**: título, botón CTA, slider de imágenes, resto de secciones, y la imagen `hero` original (sigue usándose como poster del video).

## Notas técnicas

- El video se sirve desde `/__l5e/assets-v1/...` (CDN Cloudflare), con caching agresivo.
- `muted` es obligatorio para que `autoPlay` funcione en todos los navegadores móviles.
- Si en el futuro quieres un control de play/pause o sonido opt-in, se puede añadir después; este plan deja el video en modo "ambient background" igual que la imagen actual.

## Archivos afectados

- `src/assets/hero.mp4.asset.json` (nuevo)
- `src/pages/Index.tsx` (editado: solo el bloque hero)
