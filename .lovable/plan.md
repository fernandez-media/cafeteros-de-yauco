
## Cambios (solo desktop, excepto arreglo del preview)

### 1. Dock superior más grande y visible — `src/components/DesktopDock.tsx`
- Logo: `w-8 h-8` → `w-10 h-10` (32→40px).
- Padding del contenedor: `6px 10px` / `8px 14px` → `10px 16px` / `12px 20px`.
- Items del menú: texto `text-[12px]` → `text-[14px]`, padding `px-4 py-2` → `px-5 py-2.5`, tracking `0.14em` → `0.16em`.
- Separador: `h-6` → `h-7`.
- Fondo un poco más opaco (`rgba(10,10,10,0.9)` scrolled) y borde `rgba(255,215,0,0.25)` para mayor visibilidad.
- Ajustar `top` a 18/28 para acompañar el nuevo tamaño.

### 2. Calendario desktop estilo Barça a todo lo ancho — `src/pages/Index.tsx`
Problema: el `<div>` padre (línea 95) fuerza `max-w-[1200px]` y `px-12` sobre todas las secciones excepto la primera, lo que recorta el calendario aunque su grid diga `max-w-[1600px]`.

- La sección de calendario ya usa `lg:!max-w-none lg:!mx-0 lg:!px-0` en el patrón del slider — aplicar lo mismo al `<section>` del calendario para escaparse del wrapper.
- Header y grid: subir `max-w-[1600px]` → `max-w-[1760px]`, padding lateral `px-8 xl:px-12` → `px-10 2xl:px-16`, `gap-7` → `gap-8`.
- Cards más grandes:
  - Bloque navy: `min-h-[300px]` → `min-h-[340px]`, logos `w-28 h-28` → `w-32 h-32`, VS `text-4xl` → `text-5xl`, gap `gap-5` → `gap-6`.
  - Bloque blanco: `py-6` → `py-7`, fecha `text-lg` → `text-xl`, línea LVSM `text-sm` → `text-[15px]`.
  - Card imagen "Próximos Juegos": `min-h-[480px]` → alineado al alto real de las otras cards (`h-full` ya lo hace) y título `text-3xl` → `text-4xl`.
- Countdown header: `mb-10` → `mb-12`, sin cambios de tamaño más allá de mantener alineación.

### 3. Foto rotativa en el card de "Boletería Oficial" — `src/pages/Index.tsx`
- Reemplazar el `<img src="/__l5e/assets-v1/…/kevin-rodriguez.png">` (línea 526, ruta rota) por un componente que rote entre los `roster[].photo` disponibles.
- Añadir estado `ticketPlayerIndex` y `useEffect` con `setInterval` (cada 4s) que avanza el índice; usar `roster.filter(p => p.photo)` como pool.
- Transición: `opacity` con `transition-opacity duration-700` sobre dos capas cruzadas, o key + fade simple. Preferencia: una sola `<img>` con `key={index}` y clase de fade-in para simplicidad.
- Respetar `prefers-reduced-motion`: si está activo, no rotar.

### 4. Quitar bold al texto de noticias — `src/pages/Index.tsx` (grid desktop, líneas 902-931)
- `h3` de la card: `font-black` → `font-normal`, mantener tamaño y line-clamp.
- Source label: mantener como está (es una etiqueta).
- (No tocar mobile — el usuario dijo "el texto de las noticias", pero solo estamos en desktop; aplicamos únicamente al bloque `hidden lg:grid`.)

### 5. Nuevo UI de "Sobre Nosotros" desktop — `src/pages/Index.tsx` (líneas 934-985)
Reemplazar la card oscura + galería 4-col por un layout más legible tipo editorial:
- Grid `lg:grid-cols-12` con:
  - Columna izquierda (`col-span-5`): imagen grande (`dsc04710`) en `rounded-3xl aspect-[4/5]`.
  - Columna derecha (`col-span-7`): eyebrow "Cafeteros de Yauco", título grande `text-4xl xl:text-5xl font-display font-black uppercase`, párrafo con `text-white/85 text-lg leading-relaxed` (más grande que el actual `text-sm text-white/70` para que se lea), CTA "Conoce Más" a `/nosotros`.
  - Debajo, tira horizontal de 3 fotos pequeñas (`dsc01912`, `dsc04629`, `dsc04989`) `aspect-square rounded-2xl`.
- Mobile queda intacto.

### 6. Arreglar el bug del preview
Causa probable: `<img src="/__l5e/assets-v1/292465f5-69c7-44ad-a933-2bd3f36b21cb/kevin-rodriguez.png">` — ruta absoluta hacia un asset externo que no existe. En algunos entornos de preview, un 404 en un asset con `select-none` en `absolute` no rompe render pero puede causar comportamientos raros; sobre todo, se elimina al aplicar el punto 3 (usar `roster[].photo` que sí resuelven vía `${BASE}media/roster/…`).

Además, tras aplicar cambios se hará un smoke check del dev server / typecheck para asegurar que no queda ningún import roto.

## Notas técnicas
- Nada de business logic: sólo JSX + estilos + un `useState/useEffect` para la rotación.
- Todos los colores siguen usando tokens existentes (`gold`, `white/xx`, `#1a1a1a`, gradientes navy ya en uso).
- Sin cambios en mobile salvo lo mínimo colateral necesario.
